package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.accounting.logic.ApplicationConfigLocalCurrencyService;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
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
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialReceiptContract.class)
public class MaterialReceiptService
		extends MaterialInventoryBusinessLogic<IMaterialReceiptContract, IMaterialInventoryJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialReceiptContract) {
			IMaterialReceiptContract contract = (IMaterialReceiptContract) data;
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
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialReceiptContract contract) {
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
		// 检查物料收货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(emDirection.IN);

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
			materialJournal = new MaterialInventoryJournal();
			materialJournal.setBaseDocumentType(contract.getDocumentType());
			materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
			materialJournal.setDirection(emDirection.IN);
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialReceiptContract contract) {
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getVersionManagement() == emYesNo.YES) {
			if (DataConvert.isNullOrEmpty(contract.getItemVersion())) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_specified_material_version", contract.getIdentifiers()));
			}
		}
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false)) {
			// 开启物料成本计算
			if (!materialJournal.isNew()) {
				if (!materialJournal.getItemCode().equals(contract.getItemCode())
						|| !materialJournal.getWarehouse().equals(contract.getWarehouse())
						|| materialJournal.getQuantity().compareTo(contract.getQuantity()) != 0
						|| materialJournal.getPrice().compareTo(contract.getPrice()) != 0) {
					// 修改入库物料、仓库、价格，影响成本计算，不允许
					throw new BusinessLogicException(I18N.prop(
							"msg_mm_document_completed_material_cost_calculation_not_support_operation",
							String.format("{[%s].[DocEntry = %s]%s}", materialJournal.getBaseDocumentType(),
									materialJournal.getBaseDocumentEntry(),
									materialJournal.getBaseDocumentLineId() > 0 ? String.format(" && [LineId = %s]",
											materialJournal.getBaseDocumentLineId()) : "")));
				}
			}
			if (materialJournal.getItemCode() == null || !materialJournal.getItemCode().equals(contract.getItemCode())
					|| materialJournal.getWarehouse() == null
					|| !materialJournal.getWarehouse().equals(contract.getWarehouse())) {
				// 记录时点仓库数量及价值
				if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
						true)) {
					// 物料仓库个别管理
					IMaterialInventory materialInventory = this.checkMaterialInventory(contract.getItemCode(),
							contract.getWarehouse());
					if (materialInventory != null) {
						// 库存价值 = 当前仓库库存价值
						materialJournal.setInventoryQuantity(materialInventory.getOnHand());
						materialJournal.setInventoryValue(materialInventory.getInventoryValue());
					}
				} else {
					// 物料管理
					if (material != null) {
						// 库存价值 = 当前仓库库存价值
						materialJournal.setInventoryQuantity(material.getOnHand());
						materialJournal.setInventoryValue(material.getInventoryValue());
					}
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
					if (item.getDirection() != emDirection.IN) {
						continue;
					}
					// 增加，其他行增加的量
					materialJournal.setInventoryValue(materialJournal.getInventoryValue()
							.add(Decimal.multiply(item.getPrice(), item.getQuantity())));
					materialJournal
							.setInventoryQuantity(materialJournal.getInventoryQuantity().add(item.getQuantity()));
				}
				// 交易币转为本位币
				BigDecimal price = contract.getPrice();
				if (!DataConvert.isNullOrEmpty(contract.getCurrency())) {
					if (!contract.getCurrency().equalsIgnoreCase(org.colorcoding.ibas.accounting.MyConfiguration
							.getConfigValue(ApplicationConfigLocalCurrencyService.CONFIG_ITEM_LOCAL_CURRENCY))) {
						// 非本币
						if (contract.getRate() == null || Decimal.ZERO.compareTo(contract.getRate()) >= 0) {
							// 未设置有效汇率
							throw new BusinessLogicException(
									I18N.prop(
											"msg_mm_document_no_valid_exchange_rate_specified", String
													.format("{[%s].[DocEntry = %s]%s}",
															materialJournal.getBaseDocumentType(),
															materialJournal.getBaseDocumentEntry(),
															materialJournal.getBaseDocumentLineId() > 0
																	? String.format(" && [LineId = %s]",
																			materialJournal.getBaseDocumentLineId())
																	: "")));
						}
					} else {
						// 本币
						if (contract.getRate() != null && Decimal.ZERO.compareTo(contract.getRate()) != 0
								&& Decimal.ONE.compareTo(contract.getRate()) != 0) {
							// 汇率不是1
							throw new BusinessLogicException(
									I18N.prop(
											"msg_mm_document_no_valid_exchange_rate_specified", String
													.format("{[%s].[DocEntry = %s]%s}",
															materialJournal.getBaseDocumentType(),
															materialJournal.getBaseDocumentEntry(),
															materialJournal.getBaseDocumentLineId() > 0
																	? String.format(" && [LineId = %s]",
																			materialJournal.getBaseDocumentLineId())
																	: "")));
						}
					}
					if (contract.getRate() != null && Decimal.ZERO.compareTo(contract.getRate()) != 0) {
						price = Decimal.divide(price, contract.getRate());
					}
				}
				// 库存总价值 = 时点库存价值 + (本次入库价格 * 本次入库数量)
				BigDecimal inventoryValue = materialJournal.getInventoryValue()
						.add(Decimal.multiply(price, contract.getQuantity()));
				// 库存总数量 = 时点库存数量 + 本次入库数量
				BigDecimal inventoryQuantity = materialJournal.getInventoryQuantity().add(contract.getQuantity());
				// 成本价格 = 总价值 / 总数量
				if (!Decimal.isZero(inventoryQuantity)) {
					materialJournal.setCalculatedPrice(Decimal.divide(inventoryValue, inventoryQuantity));
				} else {
					materialJournal.setCalculatedPrice(Decimal.ZERO);
				}
			}
		} else {
			// 不计算物料成本
			materialJournal.setCalculatedPrice(Decimal.ZERO);
			materialJournal.setInventoryQuantity(Decimal.ZERO);
			materialJournal.setInventoryValue(Decimal.ZERO);
		}
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
		materialJournal.setPrice(contract.getPrice());
		materialJournal.setCurrency(contract.getCurrency());
		materialJournal.setRate(contract.getRate());
		materialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
		materialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
		materialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
	}

	@Override
	protected void revoke(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		materialJournal.delete();
	}

}
