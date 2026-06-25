package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.Iterator;

import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.document.DocumentFetcherManager;
import org.colorcoding.ibas.document.IDocumentCloseQuantityOperator;
import org.colorcoding.ibas.document.IDocumentClosingQuantityItem;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItems;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItems;

/**
 * 单据数量关闭服务
 */
@LogicContract(IDocumentQuantityClosingContract.class)
public class DocumentQuantityClosingService extends DocumentQuantityService<IDocumentQuantityClosingContract> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IDocumentQuantityClosingContract) {
			IDocumentQuantityClosingContract contract = (IDocumentQuantityClosingContract) data;
			if (contract.checkDataStatus(this.getTransaction()) == false) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "DataStatus",
						String.format("%s-%s-%s", contract.getBaseDocumentType(), contract.getBaseDocumentEntry(),
								contract.getBaseDocumentLineId()));
				return false;
			}
			if (Strings.isNullOrEmpty(contract.getBaseDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"BaseDocumentType", "EMPTY");
				return false;
			}
			if (Integer.compare(0, contract.getBaseDocumentEntry()) >= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"BaseDocumentEntry", "EMPTY");
				return false;
			}
			if (!DocumentFetcherManager.create().getFetcherMap().containsKey(contract.getBaseDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						String.format("BO [%s] Fetcher", contract.getBaseDocumentType()), "NOT FOUND");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IDocumentCloseQuantityOperator fetchBeAffected(IDocumentQuantityClosingContract contract) {
		return super.fetchBeAffected(contract.getBaseDocumentType(), contract.getBaseDocumentEntry());
	}

	@Override
	protected void impact(IDocumentQuantityClosingContract contract) {
		String documents = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_LIMIT_CLOSED_QUANTIT_DOCUMENTS,
				"");
		if (!documents.isEmpty() && !documents.endsWith(";")) {
			documents = documents + ";";
		}
		Iterator<IDocumentClosingQuantityItem> iterator = this.getBeAffected().getQuantityItems();
		while (iterator.hasNext()) {
			IDocumentClosingQuantityItem item = iterator.next();
			if (!item.getObjectCode().equalsIgnoreCase(contract.getBaseDocumentType())) {
				continue;
			}
			if (item.getLineId().compareTo(contract.getBaseDocumentLineId()) != 0) {
				continue;
			}
			BigDecimal closedQuantity = item.getClosedQuantity();
			if (closedQuantity == null) {
				closedQuantity = Decimals.VALUE_ZERO;
			}
			closedQuantity = closedQuantity.add(contract.getQuantity());
			if (closedQuantity.compareTo(item.getQuantity()) > 0) {
				if (documents.indexOf(item.getObjectCode() + ";") >= 0) {
					throw new BusinessLogicException(I18N.prop("msg_mm_document_closed_quantity_exceeds_quantity",
							String.format("{[%s].[DocEntry = %s]%s}", this.getBeAffected().getObjectCode(),
									this.getBeAffected().getDocEntry(),
									item.getLineId() > 0 ? String.format("&&[LineId = %s]", item.getLineId()) : "")));
				}
			}
			item.setClosedQuantity(closedQuantity);
			// 关闭批次数量
			IMaterialBatchItems batchItems = contract.getMaterialBatches();
			if (batchItems != null && item instanceof IMaterialBatchItemParent) {
				IMaterialBatchItems targetItems = ((IMaterialBatchItemParent) item).getMaterialBatches();
				if (targetItems != null) {
					for (IMaterialBatchItem batchItem : batchItems) {
						for (IMaterialBatchItem targetItem : targetItems) {
							if (Strings.equals(batchItem.getBatchCode(), targetItem.getBatchCode())) {
								closedQuantity = targetItem.getClosedQuantity();
								if (closedQuantity == null) {
									closedQuantity = Decimals.VALUE_ZERO;
								}
								closedQuantity = closedQuantity.add(batchItem.getQuantity());
								targetItem.setClosedQuantity(closedQuantity);
								break;
							}
						}
					}
				}
			}
			batchItems = null;
			// 关闭序列号
			IMaterialSerialItems serialItems = contract.getMaterialSerials();
			if (serialItems != null && item instanceof IMaterialSerialItemParent) {
				IMaterialSerialItems targetItems = ((IMaterialSerialItemParent) item).getMaterialSerials();
				if (targetItems != null) {
					for (IMaterialSerialItem serialItem : serialItems) {
						for (IMaterialSerialItem targetItem : targetItems) {
							if (Strings.equals(serialItem.getSerialCode(), targetItem.getSerialCode())) {
								targetItem.setClosed(emYesNo.YES);
								break;
							}
						}
					}
				}
			}
			serialItems = null;

			if (contract.isSmartDocumentStatus() == true) {
				// 处理单据状态
				if (item.getLineStatus() == emDocumentStatus.RELEASED
						&& closedQuantity.compareTo(item.getQuantity()) >= 0) {
					item.setLineStatus(emDocumentStatus.FINISHED);
				}
			}
			if (item.getClosedQuantity().compareTo(Decimals.VALUE_ZERO) > 0) {
				item.setReferenced(emYesNo.YES);
			}
		}
	}

	@Override
	protected void revoke(IDocumentQuantityClosingContract contract) {
		Iterator<IDocumentClosingQuantityItem> iterator = this.getBeAffected().getQuantityItems();
		while (iterator.hasNext()) {
			IDocumentClosingQuantityItem item = iterator.next();
			if (!item.getObjectCode().equalsIgnoreCase(contract.getBaseDocumentType())) {
				continue;
			}
			if (item.getLineId().compareTo(contract.getBaseDocumentLineId()) != 0) {
				continue;
			}
			BigDecimal closedQuantity = item.getClosedQuantity();
			if (closedQuantity == null) {
				closedQuantity = Decimals.VALUE_ZERO;
			}
			closedQuantity = closedQuantity.subtract(contract.getQuantity());
			item.setClosedQuantity(closedQuantity);
			// 关闭批次数量
			IMaterialBatchItems batchItems = contract.getMaterialBatches();
			if (batchItems != null && item instanceof IMaterialBatchItemParent) {
				IMaterialBatchItems targetItems = ((IMaterialBatchItemParent) item).getMaterialBatches();
				if (targetItems != null) {
					for (IMaterialBatchItem batchItem : batchItems) {
						for (IMaterialBatchItem targetItem : targetItems) {
							if (Strings.equals(batchItem.getBatchCode(), targetItem.getBatchCode())) {
								closedQuantity = targetItem.getClosedQuantity();
								if (closedQuantity == null) {
									closedQuantity = Decimals.VALUE_ZERO;
								}
								closedQuantity = closedQuantity.subtract(batchItem.getQuantity());
								targetItem.setClosedQuantity(closedQuantity);
								break;
							}
						}
					}
				}
			}
			batchItems = null;
			// 关闭序列号
			IMaterialSerialItems serialItems = contract.getMaterialSerials();
			if (serialItems != null && item instanceof IMaterialSerialItemParent) {
				IMaterialSerialItems targetItems = ((IMaterialSerialItemParent) item).getMaterialSerials();
				if (targetItems != null) {
					for (IMaterialSerialItem serialItem : serialItems) {
						for (IMaterialSerialItem targetItem : targetItems) {
							if (Strings.equals(serialItem.getSerialCode(), targetItem.getSerialCode())) {
								targetItem.setClosed(emYesNo.NO);
								break;
							}
						}
					}
				}
			}
			serialItems = null;

			if (contract.isSmartDocumentStatus() == true) {
				// 处理单据状态
				if (item.getLineStatus() == emDocumentStatus.FINISHED
						&& closedQuantity.compareTo(item.getQuantity()) < 0) {
					item.setLineStatus(emDocumentStatus.RELEASED);
				}
			}
			if (item.getClosedQuantity().compareTo(Decimals.VALUE_ZERO) <= 0) {
				item.setReferenced(emYesNo.NO);
			}
		}
	}

}
