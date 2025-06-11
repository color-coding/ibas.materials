package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
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
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialIssueContract.class)
public class MaterialIssueService
		extends MaterialInventoryBusinessLogic<IMaterialIssueContract, IMaterialInventoryJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialIssueContract) {
			IMaterialIssueContract contract = (IMaterialIssueContract) data;
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
					throw new BusinessLogicException(I18N.prop("msg_mm_document_uom_is_not_same_material_setting",
							contract.getIdentifiers(), contract.getItemCode()));
				}
			}
		}
		boolean status = super.checkDataStatus(data);
		if (status == false && this.isEnableMaterialCosts()) {
			// 取消和标记删除时，执行逻辑
			if (this.getRoot() == data || this.getHost() == data) {
				status = super.checkDataStatus(data, ITrackStatus.class, IBOTagCanceled.class, IBOTagDeleted.class,
						IBODocument.class, IBODocumentLine.class);
			} else {
				status = super.checkDataStatus(data, ITrackStatus.class, IBOTagCanceled.class, IBOTagDeleted.class);
			}
		}
		return status;
	}

	@Override
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialIssueContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getBatchManagement() != contract.getBatchManagement()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_batchmanagement_is_not_same_material_setting",
					contract.getIdentifiers(), contract.getItemCode()));
		}
		if (material.getSerialManagement() != contract.getSerialManagement()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_serialmanagement_is_not_same_material_setting",
					contract.getIdentifiers(), contract.getItemCode()));
		}
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料发货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(emDirection.OUT);
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 计算成本，且取消逻辑
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		} else {
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setRelationship(ConditionRelationship.OR);
			condition = criteria.getConditions().create();
			condition.setBracketClose(1);
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DataConvert.STRING_VALUE_EMPTY);
			condition.setRelationship(ConditionRelationship.OR);
		}

		IMaterialInventoryJournal materialJournal = this.fetchBeAffected(criteria, IMaterialInventoryJournal.class);
		if (materialJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
					.fetchMaterialInventoryJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialJournal == null) {
			if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 取消的，查正向
				condition.setBracketOpen(1);
				condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition.setRelationship(ConditionRelationship.OR);
				condition = criteria.getConditions().create();
				condition.setBracketClose(1);
				condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(DataConvert.STRING_VALUE_EMPTY);
				condition.setRelationship(ConditionRelationship.OR);
				BORepositoryMaterials boRepository = new BORepositoryMaterials();
				boRepository.setRepository(super.getRepository());
				IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
						.fetchMaterialInventoryJournal(criteria);
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
				materialJournal = operationResult.getResultObjects().firstOrDefault();
				materialJournal = ((MaterialInventoryJournal) materialJournal).clone();
				materialJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
				materialJournal.setQuantity(materialJournal.getQuantity().negate());
				materialJournal.setTransactionValue(materialJournal.getTransactionValue().negate());
			} else {
				materialJournal = new MaterialInventoryJournal();
				materialJournal.setBaseDocumentType(contract.getDocumentType());
				materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
				materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
				materialJournal.setDirection(emDirection.OUT);
				materialJournal.setDataSource(DATASOURCE_SIGN_REGULAR_JOURNAL);
			}
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialIssueContract contract) {
		if (contract.getQuantity().compareTo(Decimal.ZERO) < 0) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_document_material_quantity_invaild", contract.getIdentifiers()));

		}
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getVersionManagement() == emYesNo.YES) {
			if (DataConvert.isNullOrEmpty(contract.getItemVersion())) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_specified_material_version", contract.getIdentifiers()));
			}
		}
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		// 开启物料成本计算
		if (this.isEnableMaterialCosts()) {
			if (!materialJournal.isNew() || (contract.isOffsetting() && materialJournal.isNew())) {
				// 更新的或取消的
				if (!materialJournal.getItemCode().equals(contract.getItemCode())
						|| !materialJournal.getWarehouse().equals(contract.getWarehouse())
						|| materialJournal.getQuantity().abs().compareTo(contract.getQuantity()) != 0
						|| materialJournal.getPrice().compareTo(contract.getPrice()) != 0) {
					// 修改入库物料、仓库、价格，影响成本计算，不允许
					throw new BusinessLogicException(I18N.prop(
							"msg_mm_document_completed_material_cost_calculation_not_support_operation",
							String.format("{[%s].[DocEntry = %s]%s}", materialJournal.getBaseDocumentType(),
									materialJournal.getBaseDocumentEntry(),
									materialJournal.getBaseDocumentLineId() > 0
											? String.format("&&[LineId = %s]", materialJournal.getBaseDocumentLineId())
											: "")));
				}
			}
			// 仅新建时（首次）计算成本
			if (materialJournal.isNew()) {
				// 查询时点库存及价值
				BigDecimal inventoryValue = Decimal.ZERO;
				BigDecimal inventoryQuantity = Decimal.ZERO;
				BigDecimal calculatedPrice = Decimal.ZERO;
				if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
						true)) {
					// 按仓库管理成本
					IMaterialInventory materialInventory = this.checkMaterialInventory(contract.getItemCode(),
							contract.getWarehouse());
					if (materialInventory != null) {
						// 成本价格 = 库存均价
						calculatedPrice = materialInventory.getAvgPrice();
						inventoryQuantity = materialInventory.getOnHand();
						inventoryValue = materialInventory.getInventoryValue();
					}
				} else {
					// 库存价值
					if (material != null) {
						// 成本价格 = 库存均价
						calculatedPrice = material.getAvgPrice();
						inventoryQuantity = material.getOnHand();
						inventoryValue = material.getInventoryValue();
					}
				}
				if (contract.isOffsetting()) {
					// 出库的取消，价格使用出库价格
					calculatedPrice = materialJournal.getCalculatedPrice();
				}
				if (contract.getPrice().compareTo(Decimal.ZERO) < 0) {
					// 价格小于0，通过基于单据查询
					Criteria criteria = new Criteria();
					criteria.setResultCount(1);
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
					condition.setValue(contract.getBaseDocumentType());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
					condition.setValue(contract.getBaseDocumentEntry());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
					condition.setValue(contract.getBaseDocumentLineId());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_QUANTITY.getName());
					condition.setOperation(ConditionOperation.GRATER_EQUAL);
					condition.setValue(Decimal.ZERO);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
					condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
					BORepositoryMaterials boRepository = new BORepositoryMaterials();
					boRepository.setRepository(this.getRepository());
					IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
							.fetchMaterialInventoryJournal(criteria);
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
					for (IMaterialInventoryJournal item : operationResult.getResultObjects()) {
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
				condition.setAlias(MaterialInventoryJournal.PROPERTY_ITEMCODE.getName());
				condition.setValue(contract.getItemCode());
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventoryJournal.PROPERTY_WAREHOUSE.getName());
				condition.setValue(contract.getWarehouse());
				for (IMaterialInventoryJournal item : this.getLogicChain().fetchBeAffected(criteria,
						IMaterialInventoryJournal.class, true)) {
					if (item == materialJournal) {
						continue;
					}
					if (item.getDirection() != emDirection.OUT) {
						continue;
					}
					if (contract.isOffsetting() && Decimal.ZERO.compareTo(item.getQuantity()) < 0) {
						continue;
					} else if (!contract.isOffsetting() && Decimal.ZERO.compareTo(item.getQuantity()) > 0) {
						continue;
					}
					// 减少，其他行的量
					inventoryQuantity = inventoryQuantity.subtract(item.getQuantity());
					inventoryValue = inventoryValue.subtract(item.getTransactionValue());
				}
				// 记录时点库存及价值
				materialJournal.setInventoryQuantity(inventoryQuantity);
				materialJournal.setInventoryValue(inventoryValue);
				materialJournal.setCalculatedPrice(calculatedPrice);
				// 本次交易价值 = 本次入库价格 * 本次入库数量
				materialJournal.setTransactionValue(Decimal.multiply(calculatedPrice, contract.getQuantity()));
				// 取消则负数
				if (contract.isOffsetting()) {
					materialJournal.setTransactionValue(materialJournal.getTransactionValue().negate());
				}
				// 触发成本价计算完成
				contract.onCalculatedCostPrice(materialJournal.getCalculatedPrice());
			}
		} else {
			// 不计算物料成本
			materialJournal.setCalculatedPrice(Decimal.ZERO);
			materialJournal.setInventoryQuantity(Decimal.ZERO);
			materialJournal.setInventoryValue(Decimal.ZERO);
			if (contract.isOffsetting() && !materialJournal.isNew()) {
				// 非新建的抵消逻辑，删除
				materialJournal.delete();
			}
		}
		// 赋值
		if (!contract.isOffsetting()) {
			// 非取消逻辑
			materialJournal.setItemCode(contract.getItemCode());
			materialJournal.setItemName(contract.getItemName());
			if (DataConvert.isNullOrEmpty(materialJournal.getItemName())
					|| materialJournal.getItemCode().equals(materialJournal.getItemName())) {
				materialJournal.setItemName(material.getName());
			}
			materialJournal.setWarehouse(contract.getWarehouse());
			materialJournal.setPostingDate(contract.getPostingDate());
			materialJournal.setDocumentDate(contract.getDocumentDate());
			materialJournal.setDeliveryDate(contract.getDeliveryDate());
			materialJournal.setQuantity(contract.getQuantity());
			materialJournal.setPrice(contract.getPrice().abs());
			materialJournal.setCurrency(contract.getCurrency());
			materialJournal.setRate(contract.getRate());
			materialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
			materialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
			materialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		} else {
			materialJournal.setPostingDate(contract.getPostingDate());
			materialJournal.setDocumentDate(contract.getDocumentDate());
			materialJournal.setDeliveryDate(contract.getDeliveryDate());
		}
	}

	@Override
	protected void revoke(IMaterialIssueContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		if (!this.isEnableMaterialCosts() || contract.isOffsetting()) {
			// 未开启成本的，删除
			materialJournal.delete();
		} else if (this.getLogicChain().getTrigger().isDeleted() == true) {
			// 触发对象删除（正向逻辑不被执行），删除
			materialJournal.delete();
		} else if (this.getLogicChain().getTrigger() instanceof IApprovalData) {
			// 重新进入审批的数据，删除
			IApprovalData approvalData = (IApprovalData) this.getLogicChain().getTrigger();
			if (!(approvalData.getApprovalStatus() == emApprovalStatus.APPROVED
					|| approvalData.getApprovalStatus() == emApprovalStatus.UNAFFECTED)) {
				materialJournal.delete();
			}
		}
	}

}
