package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.ITrackStatus;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchJournalContract.class)
public class MaterialBatchJournalService
		extends MaterialInventoryBusinessLogic<IMaterialBatchJournalContract, IMaterialBatchJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialBatchJournalContract) {
			IMaterialBatchJournalContract contract = (IMaterialBatchJournalContract) data;
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES) {
				// 服务物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "ItemType",
						material.getItemType());
				return false;
			}
			if (material.getPhantomItem() == emYesNo.YES) {
				// 虚拟物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"PhantomItem", material.getPhantomItem());
				return false;
			}
			if (material.getInventoryItem() == emYesNo.NO) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				// 非库存物料，不执行此逻辑
				return false;
			}
			if (!DataConvert.isNullOrEmpty(material.getInventoryUOM())
					&& !DataConvert.isNullOrEmpty(contract.getUOM())) {
				// 检查库存单位是否一致
				if (!material.getInventoryUOM().equalsIgnoreCase(contract.getUOM())) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_uom_is_not_same_material_setting",
							contract.getBatchCode(), contract.getItemCode()));
				}
			}
			// 非批次移动平均，不计算成本
			if (material.getBatchManagement() == emYesNo.YES) {
				if (material.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
					this.setEnableMaterialCosts(true);
					// 全局未开启，则也未开启
					if (!MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false)) {
						this.setEnableMaterialCosts(false);
					}
				}
			}
		}
		boolean status = super.checkDataStatus(data);
		if (status == false && this.isEnableMaterialCosts()) {
			// 取消和标记删除时，执行逻辑
			status = super.checkDataStatus(data, ITrackStatus.class, IBOTagCanceled.class, IBOTagDeleted.class);
		}
		return status;
	}

	@Override
	protected IMaterialBatchJournal fetchBeAffected(IMaterialBatchJournalContract contract) {
		// 检查物料批次记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBatchCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 计算成本，且取消逻辑
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		} else {
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setRelationship(ConditionRelationship.OR);
			condition = criteria.getConditions().create();
			condition.setBracketClose(1);
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DataConvert.STRING_VALUE_EMPTY);
			condition.setRelationship(ConditionRelationship.OR);
		}

		IMaterialBatchJournal materialBatchJournal = this.fetchBeAffected(criteria, IMaterialBatchJournal.class);
		if (materialBatchJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialBatchJournal> operationResult = boRepository.fetchMaterialBatchJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialBatchJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialBatchJournal == null) {
			if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 取消的，查正向
				condition.setBracketOpen(1);
				condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition.setRelationship(ConditionRelationship.OR);
				condition = criteria.getConditions().create();
				condition.setBracketClose(1);
				condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(DataConvert.STRING_VALUE_EMPTY);
				condition.setRelationship(ConditionRelationship.OR);
				BORepositoryMaterials boRepository = new BORepositoryMaterials();
				boRepository.setRepository(super.getRepository());
				IOperationResult<IMaterialBatchJournal> operationResult = boRepository
						.fetchMaterialBatchJournal(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				if (operationResult.getResultObjects().isEmpty()) {
					throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_receipt_journal",
							String.format("{[%s].[DocEntry = %s]%s}", contract.getDocumentType(),
									contract.getDocumentEntry(),
									contract.getDocumentLineId() > 0
											? String.format("&&[LineId = %s]", contract.getDocumentLineId())
											: "")));
				}
				materialBatchJournal = operationResult.getResultObjects().firstOrDefault();
				materialBatchJournal = ((MaterialBatchJournal) materialBatchJournal).clone();
				materialBatchJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
				materialBatchJournal.setQuantity(materialBatchJournal.getQuantity().negate());
				materialBatchJournal.setTransactionValue(materialBatchJournal.getTransactionValue().negate());
			} else {
				materialBatchJournal = new MaterialBatchJournal();
				materialBatchJournal.setBatchCode(contract.getBatchCode());
				materialBatchJournal.setDirection(contract.getDirection());
				materialBatchJournal.setBaseDocumentType(contract.getDocumentType());
				materialBatchJournal.setBaseDocumentEntry(contract.getDocumentEntry());
				materialBatchJournal.setBaseDocumentLineId(contract.getDocumentLineId());
				materialBatchJournal.setDataSource(DATASOURCE_SIGN_REGULAR_JOURNAL);
			}
		}
		return materialBatchJournal;
	}

	@Override
	protected void impact(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		// 开启物料成本计算
		if (this.isEnableMaterialCosts()) {
			String localCurrency = org.colorcoding.ibas.accounting.MyConfiguration
					.getConfigValue(org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY);
			if (!materialBatchJournal.isNew() || (contract.isOffsetting() && materialBatchJournal.isNew())) {
				// 更新的或取消的
				if (!materialBatchJournal.getItemCode().equals(contract.getItemCode())
						|| !materialBatchJournal.getWarehouse().equals(contract.getWarehouse())
						|| !materialBatchJournal.getBatchCode().equals(contract.getBatchCode())
						|| materialBatchJournal.getQuantity().abs().compareTo(contract.getQuantity()) != 0
						|| materialBatchJournal.getPrice().compareTo(contract.getPrice().abs()) != 0) {
					// 修改入库物料、仓库、价格，影响成本计算，不允许
					throw new BusinessLogicException(
							I18N.prop(
									"msg_mm_document_completed_material_cost_calculation_not_support_operation", String
											.format("{[%s].[DocEntry = %s]%s}",
													materialBatchJournal.getBaseDocumentType(),
													materialBatchJournal.getBaseDocumentEntry(),
													materialBatchJournal.getBaseDocumentLineId() > 0
															? String.format("&&[LineId = %s]",
																	materialBatchJournal.getBaseDocumentLineId())
															: "")));
				}
			}
			// 仅新建时（首次）计算成本
			if (materialBatchJournal.isNew()) {
				// 交易币转为本位币
				if (!DataConvert.isNullOrEmpty(contract.getCurrency())) {
					if (!contract.getCurrency().equalsIgnoreCase(localCurrency)) {
						// 非本币
						if (contract.getRate() == null || Decimal.ZERO.compareTo(contract.getRate()) >= 0) {
							// 未设置有效汇率
							throw new BusinessLogicException(
									I18N.prop("msg_mm_document_no_valid_exchange_rate_specified",
											String.format("{[%s].[DocEntry = %s]%s}",
													materialBatchJournal.getBaseDocumentType(),
													materialBatchJournal.getBaseDocumentEntry(),
													materialBatchJournal.getBaseDocumentLineId() > 0
															? String.format("&&[LineId = %s]",
																	materialBatchJournal.getBaseDocumentLineId())
															: "")));
						}
					} else {
						// 本币
						if (contract.getRate() != null && Decimal.ZERO.compareTo(contract.getRate()) != 0
								&& Decimal.ONE.compareTo(contract.getRate()) != 0) {
							// 汇率不是1
							throw new BusinessLogicException(
									I18N.prop("msg_mm_document_no_valid_exchange_rate_specified",
											String.format("{[%s].[DocEntry = %s]%s}",
													materialBatchJournal.getBaseDocumentType(),
													materialBatchJournal.getBaseDocumentEntry(),
													materialBatchJournal.getBaseDocumentLineId() > 0
															? String.format("&&[LineId = %s]",
																	materialBatchJournal.getBaseDocumentLineId())
															: "")));
						}
					}
				}
				// 查询时点库存及价值
				BigDecimal inventoryValue = Decimal.ZERO;
				BigDecimal inventoryQuantity = Decimal.ZERO;
				BigDecimal calculatedPrice = Decimal.ZERO;
				IMaterialBatch materialBatch = this.checkMaterialBatch(contract.getItemCode(), contract.getWarehouse(),
						contract.getBatchCode());
				if (materialBatch != null) {
					// 库存价值 = 当前仓库库存价值
					inventoryQuantity = materialBatch.getQuantity();
					inventoryValue = materialBatch.getInventoryValue();
					calculatedPrice = materialBatch.getAvgPrice();
				}
				// 根据情况调整价格
				if (contract.getDirection() == emDirection.OUT && contract.isOffsetting()) {
					// 出库的取消，价格使用出库价格
					calculatedPrice = materialBatchJournal.getCalculatedPrice();
				} else if (contract.getDirection() == emDirection.IN && !contract.isOffsetting()) {
					// 入库，使用单据价格
					calculatedPrice = contract.getPrice();
					if (calculatedPrice == null) {
						calculatedPrice = Decimal.ZERO;
					}
					if (contract.getRate() != null && !Decimal.isZero(contract.getRate())) {
						calculatedPrice = Decimal.multiply(calculatedPrice, contract.getRate());
					}
				}
				// 价格小于0，通过基于单据查询
				if (contract.getPrice().compareTo(Decimal.ZERO) < 0) {
					Criteria criteria = new Criteria();
					criteria.setResultCount(1);
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
					condition.setValue(contract.getBaseDocumentType());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
					condition.setValue(contract.getBaseDocumentEntry());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
					condition.setValue(contract.getBaseDocumentLineId());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_QUANTITY.getName());
					condition.setOperation(ConditionOperation.GRATER_EQUAL);
					condition.setValue(Decimal.ZERO);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
					condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
					condition.setValue(contract.getBatchCode());
					BORepositoryMaterials boRepository = new BORepositoryMaterials();
					boRepository.setRepository(this.getRepository());
					IOperationResult<IMaterialBatchJournal> operationResult = boRepository
							.fetchMaterialBatchJournal(criteria);
					if (operationResult.getError() != null) {
						throw new BusinessLogicException(operationResult.getError());
					}
					if (operationResult.getResultObjects().isEmpty()) {
						throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_receipt_journal",
								String.format("{[%s].[DocEntry = %s]%s}", contract.getBaseDocumentEntry(),
										contract.getBaseDocumentEntry(),
										contract.getBaseDocumentLineId() > 0
												? String.format("&&[LineId = %s]", contract.getBaseDocumentLineId())
												: "")));
					}
					for (IMaterialBatchJournal item : operationResult.getResultObjects()) {
						calculatedPrice = item.getCalculatedPrice();
					}
				}
				if (calculatedPrice == null || calculatedPrice.compareTo(Decimal.ZERO) < 0) {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_document_material_price_invaild", contract.getIdentifiers()));
				}
				// 加载内存中数据（同单同物料）
				Criteria criteria = new Criteria();
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_ITEMCODE.getName());
				condition.setValue(contract.getItemCode());
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_WAREHOUSE.getName());
				condition.setValue(contract.getWarehouse());
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
				condition.setValue(contract.getBatchCode());
				for (IMaterialBatchJournal item : this.getLogicChain().fetchBeAffected(criteria,
						IMaterialBatchJournal.class, true)) {
					if (item == materialBatchJournal) {
						continue;
					}
					if (item.getDirection() != contract.getDirection()) {
						continue;
					}
					if (contract.isOffsetting() && Decimal.ZERO.compareTo(item.getQuantity()) < 0) {
						continue;
					} else if (!contract.isOffsetting() && Decimal.ZERO.compareTo(item.getQuantity()) > 0) {
						continue;
					}
					if (contract.getDirection() == emDirection.IN) {
						// 增加，其他行的量
						inventoryQuantity = inventoryQuantity.add(item.getQuantity());
						inventoryValue = inventoryValue.add(item.getTransactionValue());
					} else if (contract.getDirection() == emDirection.OUT) {
						// 减少，其他行的量
						inventoryQuantity = inventoryQuantity.subtract(item.getQuantity());
						inventoryValue = inventoryValue.subtract(item.getTransactionValue());
					}
				}
				// 记录时点库存及价值
				materialBatchJournal.setInventoryQuantity(inventoryQuantity);
				materialBatchJournal.setInventoryValue(inventoryValue);
				materialBatchJournal.setCalculatedPrice(calculatedPrice);
				// 本次交易价值 = 本次入库价格 * 本次入库数量
				materialBatchJournal.setTransactionValue(Decimal.multiply(calculatedPrice, contract.getQuantity()));
				// 取消则负数
				if (contract.isOffsetting()) {
					materialBatchJournal.setTransactionValue(materialBatchJournal.getTransactionValue().negate());
				}
				// 触发成本价计算完成
				contract.onCalculatedCostPrice(materialBatchJournal.getCalculatedPrice());
			}
		} else {
			// 不计算物料成本
			materialBatchJournal.setCalculatedPrice(Decimal.ZERO);
			materialBatchJournal.setInventoryQuantity(Decimal.ZERO);
			materialBatchJournal.setInventoryValue(Decimal.ZERO);
			if (contract.isOffsetting() && !materialBatchJournal.isNew()) {
				// 非新建的抵消逻辑，删除
				materialBatchJournal.delete();
			}
		}
		// 赋值
		if (!contract.isOffsetting()) {
			// 非取消逻辑
			materialBatchJournal.setItemCode(contract.getItemCode());
			materialBatchJournal.setWarehouse(contract.getWarehouse());
			materialBatchJournal.setPostingDate(contract.getPostingDate());
			materialBatchJournal.setDocumentDate(contract.getDocumentDate());
			materialBatchJournal.setDeliveryDate(contract.getDeliveryDate());
			materialBatchJournal.setQuantity(contract.getQuantity());
			materialBatchJournal.setPrice(contract.getPrice().abs());
			materialBatchJournal.setCurrency(contract.getCurrency());
			materialBatchJournal.setRate(contract.getRate());
			materialBatchJournal.setOriginalDocumentType(contract.getBaseDocumentType());
			materialBatchJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
			materialBatchJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		} else {
			materialBatchJournal.setPostingDate(contract.getPostingDate());
			materialBatchJournal.setDocumentDate(contract.getDocumentDate());
			materialBatchJournal.setDeliveryDate(contract.getDeliveryDate());
		}
	}

	@Override
	protected void revoke(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		if (!this.isEnableMaterialCosts() || contract.isOffsetting()) {
			// 未开启成本的，删除
			materialBatchJournal.delete();
		} else if (this.getLogicChain().getTrigger().isDeleted() == true) {
			// 触发对象删除（正向逻辑不被执行），删除
			materialBatchJournal.delete();
		}
	}

}