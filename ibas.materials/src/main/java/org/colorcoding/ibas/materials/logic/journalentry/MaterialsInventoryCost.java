package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.businesspartner.logic.journalentry.JournalEntrySmartContent;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchReceiptParent;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialReceiptParent;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料库存成本计算（非库存物料不重新计算）
 */
public class MaterialsInventoryCost extends MaterialsCost {

	/**
	 * 构造函数
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 */
	public MaterialsInventoryCost(Object sourceData, BigDecimal quantity) {
		super(sourceData);
		this.setQuantity(quantity);
		this.setNegate(false);
	}

	/**
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 * @param negate     负数（默认：false）
	 */
	public MaterialsInventoryCost(Object sourceData, BigDecimal quantity, Boolean negate) {
		this(sourceData, quantity);
		this.setNegate(negate);
	}

	private boolean negate = false;

	public final boolean isNegate() {
		return negate;
	}

	public final void setNegate(boolean negate) {
		this.negate = negate;
	}

	private BigDecimal quantity;

	public final BigDecimal getQuantity() {
		if (this.quantity == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_not_specified_quantity"));
		}
		return quantity;
	}

	public final void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	protected BigDecimal getAvgPrice(String itemCode, String warehouse) {
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		boRepository.setRepository(this.getService().getRepository());
		IMaterial material = boRepository.fetchMaterial(criteria).getResultObjects().firstOrDefault();
		if (material == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_exist", itemCode));
		}
		if (material.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
			criteria = new Criteria();
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE.getName());
			condition.setValue(itemCode);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE.getName());
			condition.setValue(warehouse);
			// 计算总数量，去平均价格
			BigDecimal quantities = Decimal.ZERO;
			BigDecimal totals = Decimal.ZERO;
			if (material.getBatchManagement() == emYesNo.YES
					&& this.getSourceData() instanceof IMaterialBatchItemParent) {
				IOperationResult<IMaterialBatch> operationResult;
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE.getName());
				IMaterialBatchItemParent batchItemParent = (IMaterialBatchItemParent) this.getSourceData();
				for (IMaterialBatchItem journal : batchItemParent.getMaterialBatches()) {
					condition.setValue(journal.getBatchCode());
					operationResult = boRepository.fetchMaterialBatch(criteria);
					quantities = quantities.add(journal.getQuantity());
					totals = totals.add(Decimal.multiply(journal.getQuantity(),
							operationResult.getResultObjects().isEmpty() ? Decimal.ZERO
									: operationResult.getResultObjects().firstOrDefault().getAvgPrice()));
				}
			} else if (material.getSerialManagement() == emYesNo.YES) {
				IOperationResult<IMaterialSerial> operationResult;
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
				IMaterialSerialItemParent serialItemParent = (IMaterialSerialItemParent) this.getSourceData();
				for (IMaterialSerialItem journal : serialItemParent.getMaterialSerials()) {
					condition.setValue(journal.getSerialCode());
					operationResult = boRepository.fetchMaterialSerial(criteria);
					if (operationResult.getResultObjects().isEmpty()) {
						throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_is_unavailable", warehouse,
								itemCode, journal.getSerialCode()));
					}
					quantities = quantities.add(Decimal.ONE);
					totals = totals.add(Decimal.multiply(Decimal.ONE,
							operationResult.getResultObjects().firstOrDefault().getAvgPrice()));
				}
			} else {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_batchmanagement", material.getCode())
						+ "\n" + I18N.prop("msg_mm_material_is_not_serialmanagement", material.getCode()));
			}
			quantities.setScale(this.getQuantity().scale(), Decimal.ROUNDING_MODE_DEFAULT);
			if (Decimal.isZero(quantities)) {
				// 避免0除
				return Decimal.ZERO;
			}
			return Decimal.divide(totals, quantities);
		} else {
			if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true)) {
				/* 按仓库核算成本 */
				criteria = new Criteria();
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
				condition.setValue(itemCode);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
				condition.setValue(warehouse);
				IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				for (IMaterialInventory materialInventory : operationResult.getResultObjects()) {
					return materialInventory.getAvgPrice();
				}
			} else {
				/* 按物料核算成本 */
				return material.getAvgPrice();
			}
		}
		return null;
	}

	protected BigDecimal getJournalsAvgPrice(String itemCode, String warehouse) {
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		boRepository.setRepository(this.getService().getRepository());
		IMaterial material = boRepository.fetchMaterial(criteria).getResultObjects().firstOrDefault();
		if (material == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_exist", itemCode));
		}
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setValue(emDirection.OUT);
		if (this.getSourceData() instanceof IMaterialBatchReceiptParent
				|| this.getSourceData() instanceof IMaterialSerialReceiptParent) {
			condition.setValue(emDirection.IN);
		}
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setValue(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_OBJECTCODE));
		if (this.getSourceData() instanceof IBODocument) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBODocument) this.getSourceData()).getDocEntry());
		} else if (this.getSourceData() instanceof IBODocumentLine) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBODocumentLine) this.getSourceData()).getDocEntry());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
			condition.setValue(((IBODocumentLine) this.getSourceData()).getLineId());
		} else if (this.getSourceData() instanceof IBOSimple) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBOSimple) this.getSourceData()).getObjectKey());
		} else if (this.getSourceData() instanceof IBOSimpleLine) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBOSimpleLine) this.getSourceData()).getObjectKey());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
			condition.setValue(((IBOSimpleLine) this.getSourceData()).getLineId());
		}
		if (criteria.getConditions().size() < 3) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_document_not_found_receipt_journal", this.getSourceData()));
		}
		boolean noJournals = true;
		BigDecimal quantities = Decimal.ZERO;
		BigDecimal totals = Decimal.ZERO;
		if (material.getValuationMethod() == emValuationMethod.MOVING_AVERAGE) {
			// 移动平均物料
			for (IMaterialInventoryJournal journal : boRepository.fetchMaterialInventoryJournal(criteria)
					.getResultObjects()) {
				if (!journal.getItemCode().equals(itemCode)) {
					continue;
				}
				if (!journal.getWarehouse().equals(warehouse)) {
					continue;
				}
				quantities = quantities.add(journal.getInventoryQuantity());
				totals = totals.add(Decimal.multiply(journal.getInventoryQuantity(), journal.getCalculatedPrice()));
				noJournals = false;
			}
		} else if (material.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
			// 批次平均物料
			if (material.getBatchManagement() == emYesNo.YES) {
				for (IMaterialBatchJournal journal : boRepository.fetchMaterialBatchJournal(criteria)
						.getResultObjects()) {
					if (!journal.getItemCode().equals(itemCode)) {
						continue;
					}
					if (!journal.getWarehouse().equals(warehouse)) {
						continue;
					}
					quantities = quantities.add(journal.getInventoryQuantity());
					totals = totals.add(Decimal.multiply(journal.getInventoryQuantity(), journal.getCalculatedPrice()));
					noJournals = false;
				}
			} else if (material.getSerialManagement() == emYesNo.YES) {
				for (IMaterialSerialJournal journal : boRepository.fetchMaterialSerialJournal(criteria)
						.getResultObjects()) {
					if (!journal.getItemCode().equals(itemCode)) {
						continue;
					}
					if (!journal.getWarehouse().equals(warehouse)) {
						continue;
					}
					quantities = quantities.add(journal.getInventoryQuantity());
					totals = totals.add(Decimal.multiply(journal.getInventoryQuantity(), journal.getCalculatedPrice()));
					noJournals = false;
				}
			} else {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_batchmanagement", material.getCode())
						+ "\n" + I18N.prop("msg_mm_material_is_not_serialmanagement", material.getCode()));
			}
		}
		quantities.setScale(this.getQuantity().scale(), Decimal.ROUNDING_MODE_DEFAULT);
		if (noJournals && Decimal.isZero(quantities) && Decimal.isZero(totals)) {
			// 都是0，则无记录
			return null;
		}
		if (Decimal.isZero(quantities)) {
			// 避免0除
			return Decimal.ZERO;
		}
		return Decimal.divide(totals, quantities);
	}

	@Override
	public final void caculate() throws Exception {
		String material = String.valueOf(super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
		if (JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(material)) {
			throw new BusinessLogicException(I18N.prop("msg_mm_not_specified_material"));
		}
		// 库存物料时，重新计算成本
		if (this.isInventoryMaterial(material)) {
			if (!this.caculate(material,
					String.valueOf(super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_WAREHOUSE)))) {
				// 计算不成功，报错
				throw new Exception(I18N.prop("msg_bobas_not_support_the_compute"));
			}
			if (this.getAmount() != null && this.getAmount().compareTo(Decimal.ZERO) > 0) {
				if (this.isNegate()) {
					this.setAmount(this.getAmount().negate());
				}
			}
		}
	}

	/**
	 * 计算物料成本
	 * 
	 * @param itemCode
	 * @param warehouse
	 * @return true，计算完成；false，计算不成功
	 */
	protected boolean caculate(String itemCode, String warehouse) {
		BigDecimal avaPrice = null;
		if (this.getSourceData() instanceof IBusinessObject) {
			IBusinessObject bo = (IBusinessObject) this.getSourceData();
			if (bo.isNew()) {
				// 新建的取物料上的
				avaPrice = this.getAvgPrice(itemCode, warehouse);
			} else {
				// 从交易记录上取
				avaPrice = this.getJournalsAvgPrice(itemCode, warehouse);
				if (avaPrice == null) {
					// 库存记录没有
					avaPrice = this.getAvgPrice(itemCode, warehouse);
				}
			}
			if (avaPrice != null) {
				this.setAmount(Decimal.multiply(this.getQuantity(), avaPrice));
			} else {
				this.setAmount(Decimal.ZERO);
			}
		}
		return true;
	}
}
