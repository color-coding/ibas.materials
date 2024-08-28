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
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialSerialJournalContract.class)
public class MaterialSerialJournalService
		extends MaterialInventoryBusinessLogic<IMaterialSerialJournalContract, IMaterialSerialJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialSerialJournalContract) {
			IMaterialSerialJournalContract contract = (IMaterialSerialJournalContract) data;
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
					throw new BusinessLogicException(
							I18N.prop("msg_mm_material_serial_uom_is_not_same_material_setting",
									contract.getSerialCode(), contract.getItemCode()));
				}
			}
			// 非批次移动平均，不计算成本
			if (material.getSerialManagement() == emYesNo.YES) {
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
	protected IMaterialSerialJournal fetchBeAffected(IMaterialSerialJournalContract contract) {
		// 检查物料序列记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerialJournal.PROPERTY_SERIALCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSerialCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 计算成本，且取消逻辑
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialSerialJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		} else {
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(MaterialSerialJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialSerialJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setRelationship(ConditionRelationship.OR);
			condition = criteria.getConditions().create();
			condition.setBracketClose(1);
			condition.setAlias(MaterialSerialJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DataConvert.STRING_VALUE_EMPTY);
			condition.setRelationship(ConditionRelationship.OR);
		}

		IMaterialSerialJournal materialSerialJournal = this.fetchBeAffected(criteria, IMaterialSerialJournal.class);
		if (materialSerialJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialSerialJournal> operationResult = boRepository
					.fetchMaterialSerialJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialSerialJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialSerialJournal == null) {
			if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 取消的，查正向
				condition.setBracketOpen(1);
				condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialSerialJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition.setRelationship(ConditionRelationship.OR);
				condition = criteria.getConditions().create();
				condition.setBracketClose(1);
				condition.setAlias(MaterialSerialJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(DataConvert.STRING_VALUE_EMPTY);
				condition.setRelationship(ConditionRelationship.OR);
				BORepositoryMaterials boRepository = new BORepositoryMaterials();
				boRepository.setRepository(super.getRepository());
				IOperationResult<IMaterialSerialJournal> operationResult = boRepository
						.fetchMaterialSerialJournal(criteria);
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
				materialSerialJournal = operationResult.getResultObjects().firstOrDefault();
				materialSerialJournal = ((MaterialSerialJournal) materialSerialJournal).clone();
				materialSerialJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
				materialSerialJournal.setQuantity(materialSerialJournal.getQuantity().negate());
				materialSerialJournal.setTransactionValue(materialSerialJournal.getTransactionValue().negate());
			} else {
				materialSerialJournal = new MaterialSerialJournal();
				materialSerialJournal.setSerialCode(contract.getSerialCode());
				materialSerialJournal.setDirection(contract.getDirection());
				materialSerialJournal.setBaseDocumentType(contract.getDocumentType());
				materialSerialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
				materialSerialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
				materialSerialJournal.setDataSource(DATASOURCE_SIGN_REGULAR_JOURNAL);
			}
		}
		return materialSerialJournal;
	}

	@Override
	protected void impact(IMaterialSerialJournalContract contract) {
		IMaterialSerialJournal materialSerialJournal = this.getBeAffected();
		// 开启物料成本计算
		if (this.isEnableMaterialCosts()) {
			if (!materialSerialJournal.isNew() || (contract.isOffsetting() && materialSerialJournal.isNew())) {
				// 更新的或取消的
				if (!materialSerialJournal.getItemCode().equals(contract.getItemCode())
						|| !materialSerialJournal.getWarehouse().equals(contract.getWarehouse())
						|| !materialSerialJournal.getSerialCode().equals(contract.getSerialCode())
						|| materialSerialJournal.getPrice().compareTo(contract.getPrice()) != 0) {
					// 修改入库物料、仓库、价格，影响成本计算，不允许
					throw new BusinessLogicException(
							I18N.prop(
									"msg_mm_document_completed_material_cost_calculation_not_support_operation", String
											.format("{[%s].[DocEntry = %s]%s}",
													materialSerialJournal.getBaseDocumentType(),
													materialSerialJournal.getBaseDocumentEntry(),
													materialSerialJournal.getBaseDocumentLineId() > 0
															? String.format("&&[LineId = %s]",
																	materialSerialJournal.getBaseDocumentLineId())
															: "")));
				}
			}
			// 仅新建时（首次）计算成本
			if (materialSerialJournal.isNew()) {
				// 交易币转为本位币
				if (!DataConvert.isNullOrEmpty(contract.getCurrency())) {
					if (!contract.getCurrency()
							.equalsIgnoreCase(org.colorcoding.ibas.accounting.MyConfiguration.getConfigValue(
									org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY))) {
						// 非本币
						if (contract.getRate() == null || Decimal.ZERO.compareTo(contract.getRate()) >= 0) {
							// 未设置有效汇率
							throw new BusinessLogicException(
									I18N.prop("msg_mm_document_no_valid_exchange_rate_specified",
											String.format("{[%s].[DocEntry = %s]%s}",
													materialSerialJournal.getBaseDocumentType(),
													materialSerialJournal.getBaseDocumentEntry(),
													materialSerialJournal.getBaseDocumentLineId() > 0
															? String.format("&&[LineId = %s]",
																	materialSerialJournal.getBaseDocumentLineId())
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
													materialSerialJournal.getBaseDocumentType(),
													materialSerialJournal.getBaseDocumentEntry(),
													materialSerialJournal.getBaseDocumentLineId() > 0
															? String.format("&&[LineId = %s]",
																	materialSerialJournal.getBaseDocumentLineId())
															: "")));
						}
					}
				}
				// 本币价格
				BigDecimal price = contract.getPrice();
				if (price == null) {
					price = Decimal.ZERO;
				}
				if (contract.getRate() != null && !Decimal.isZero(contract.getRate())) {
					price = Decimal.multiply(price, contract.getRate());
				}
				// 查询时点库存及价值
				BigDecimal inventoryValue = Decimal.ZERO;
				BigDecimal inventoryQuantity = Decimal.ZERO;
				BigDecimal calculatedPrice = Decimal.ZERO;
				IMaterialSerial materialInventory = this.checkMaterialSerial(contract.getItemCode(),
						contract.getWarehouse(), contract.getSerialCode());
				if (materialInventory != null) {
					// 库存价值 = 当前仓库库存价值
					inventoryQuantity = materialInventory.getInStock() == emYesNo.YES ? Decimal.ONE : Decimal.ZERO;
					inventoryValue = materialInventory.getInStock() == emYesNo.YES
							? materialInventory.getInventoryValue()
							: Decimal.ZERO;
					calculatedPrice = materialInventory.getAvgPrice();
				}
				if (contract.getDirection() == emDirection.IN && contract.isOffsetting()) {
					// 入库反向，加载内存中数据（同单同物料）
					Criteria criteria = new Criteria();
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerialJournal.PROPERTY_ITEMCODE.getName());
					condition.setValue(contract.getItemCode());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerialJournal.PROPERTY_WAREHOUSE.getName());
					condition.setValue(contract.getWarehouse());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerialJournal.PROPERTY_SERIALCODE.getName());
					condition.setValue(contract.getSerialCode());
					for (IMaterialSerialJournal item : this.getLogicChain().fetchBeAffected(criteria,
							IMaterialSerialJournal.class, true)) {
						if (item == materialSerialJournal) {
							continue;
						}
						if (item.getDirection() != contract.getDirection()) {
							continue;
						}
						// 增加，其他行增加的量
						inventoryQuantity = inventoryQuantity.add(item.getQuantity());
						inventoryValue = inventoryValue.add(item.getTransactionValue());
					}
					// 记录时点库存及价值
					materialSerialJournal.setInventoryQuantity(inventoryQuantity);
					materialSerialJournal.setInventoryValue(inventoryValue);
					// 库存总价值 = 时点库存价值 - (本次入库价格 * 本次入库数量)
					inventoryValue = inventoryValue.subtract(Decimal.multiply(price, Decimal.ONE));
					// 库存总数量 = 时点库存数量 - 本次入库数量
					inventoryQuantity = inventoryQuantity.subtract(Decimal.ONE);
					// 成本价格 = 总价值 / 总数量
					if (!Decimal.isZero(inventoryQuantity)) {
						materialSerialJournal.setCalculatedPrice(Decimal.divide(inventoryValue, inventoryQuantity));
					} else {
						materialSerialJournal.setCalculatedPrice(Decimal.ZERO);
					}
				} else if (contract.getDirection() == emDirection.IN
						|| (contract.getDirection() == emDirection.OUT && contract.isOffsetting())) {
					// 入库或出库反向，加载内存中数据（同单同物料）
					Criteria criteria = new Criteria();
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerialJournal.PROPERTY_ITEMCODE.getName());
					condition.setValue(contract.getItemCode());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerialJournal.PROPERTY_WAREHOUSE.getName());
					condition.setValue(contract.getWarehouse());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerialJournal.PROPERTY_SERIALCODE.getName());
					condition.setValue(contract.getSerialCode());
					for (IMaterialSerialJournal item : this.getLogicChain().fetchBeAffected(criteria,
							IMaterialSerialJournal.class, true)) {
						if (item == materialSerialJournal) {
							continue;
						}
						if (item.getDirection() != contract.getDirection()) {
							continue;
						}
						if (Decimal.ZERO.compareTo(item.getQuantity()) <= 0) {
							continue;
						}
						// 增加，其他行增加的量
						inventoryQuantity = inventoryQuantity.add(item.getQuantity());
						inventoryValue = inventoryValue.add(Decimal.multiply(Decimal.multiply(item.getPrice(),
								item.getRate() == null || Decimal.isZero(item.getRate()) ? Decimal.ONE
										: item.getRate()),
								item.getQuantity()));
					}
					// 记录时点库存及价值
					materialSerialJournal.setInventoryQuantity(inventoryQuantity);
					materialSerialJournal.setInventoryValue(inventoryValue);
					if (contract.getDirection() == emDirection.OUT && contract.isOffsetting()) {
						// 库存总价值 = 时点库存价值 + (正向出库价格 * 本次入库数量)
						inventoryValue = inventoryValue
								.add(Decimal.multiply(materialSerialJournal.getCalculatedPrice(), Decimal.ONE));
					} else {
						// 库存总价值 = 时点库存价值 + (本次入库价格 * 本次入库数量)
						inventoryValue = inventoryValue.add(Decimal.multiply(price, Decimal.ONE));
					}
					// 库存总数量 = 时点库存数量 + 本次入库数量
					inventoryQuantity = inventoryQuantity.add(Decimal.ONE);
					// 成本价格 = 总价值 / 总数量
					if (!Decimal.isZero(inventoryQuantity)) {
						materialSerialJournal.setCalculatedPrice(Decimal.divide(inventoryValue, inventoryQuantity));
					} else {
						materialSerialJournal.setCalculatedPrice(Decimal.ZERO);
					}
				} else if (contract.getDirection() == emDirection.OUT) {
					// 出库
					materialSerialJournal.setCalculatedPrice(calculatedPrice);
					materialSerialJournal.setInventoryQuantity(inventoryQuantity);
					materialSerialJournal.setInventoryValue(inventoryValue);
				}
				// 触发成本价计算完成
				contract.onCalculatedCostPrice(materialSerialJournal.getCalculatedPrice());
			}
		} else {
			// 不计算物料成本
			materialSerialJournal.setCalculatedPrice(Decimal.ZERO);
			materialSerialJournal.setInventoryQuantity(Decimal.ZERO);
			materialSerialJournal.setInventoryValue(Decimal.ZERO);
			if (contract.isOffsetting() && !materialSerialJournal.isNew()) {
				// 非新建的抵消逻辑，删除
				materialSerialJournal.delete();
			}
		}
		// 赋值
		if (!contract.isOffsetting()) {
			// 非取消逻辑
			materialSerialJournal.setItemCode(contract.getItemCode());
			materialSerialJournal.setWarehouse(contract.getWarehouse());
			materialSerialJournal.setPostingDate(contract.getPostingDate());
			materialSerialJournal.setDocumentDate(contract.getDocumentDate());
			materialSerialJournal.setDeliveryDate(contract.getDeliveryDate());
			materialSerialJournal.setQuantity(Decimal.ONE);
			materialSerialJournal.setPrice(contract.getPrice());
			materialSerialJournal.setCurrency(contract.getCurrency());
			materialSerialJournal.setRate(contract.getRate());
			materialSerialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
			materialSerialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
			materialSerialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		} else {
			materialSerialJournal.setPostingDate(contract.getPostingDate());
			materialSerialJournal.setDocumentDate(contract.getDocumentDate());
			materialSerialJournal.setDeliveryDate(contract.getDeliveryDate());
		}
	}

	@Override
	protected void revoke(IMaterialSerialJournalContract contract) {
		IMaterialSerialJournal materialSerialJournal = this.getBeAffected();
		if (!this.isEnableMaterialCosts() || contract.isOffsetting()) {
			// 未开启成本的，删除
			materialSerialJournal.delete();
		} else if (this.getLogicChain().getTrigger().isDeleted() == true) {
			// 触发对象删除（正向逻辑不被执行），删除
			materialSerialJournal.delete();
		}
	}

}