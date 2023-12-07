package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

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
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialWarehouseInventoryContract.class)
public class MaterialWarehouseInventoryService
		extends MaterialInventoryBusinessLogic<IMaterialWarehouseInventoryContract, IMaterialInventory> {
	@Override
	protected IMaterialInventory fetchBeAffected(IMaterialWarehouseInventoryContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 服务物料，不执行此逻辑
		if (material.getItemType() == emItemType.SERVICES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_service_item", material.getCode()));
		}
		// 虚拟物料，不执行此逻辑
		if (material.getPhantomItem() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_phantom_item", material.getCode()));
		}
		// 非库存物料，不执行此逻辑
		if (material.getInventoryItem() == emYesNo.NO) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_inventory_item", material.getCode()));
		}
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料库存记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getWarehouse());

		IMaterialInventory materialInventory = this.fetchBeAffected(criteria, IMaterialInventory.class);
		if (materialInventory == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialInventory = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialInventory == null) {
			materialInventory = new MaterialInventory();
			materialInventory.setItemCode(contract.getItemCode());
			materialInventory.setWarehouse(contract.getWarehouse());
		}
		if (materialInventory.getFrozen() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_frozen_in_warehouse",
					materialInventory.getItemCode(), materialInventory.getWarehouse()));
		}
		return materialInventory;
	}

	@Override
	protected void impact(IMaterialWarehouseInventoryContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		BigDecimal onHand = materialInventory.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.subtract(contract.getQuantity());
			if (Decimal.ZERO.compareTo(onHand.subtract(materialInventory.getOnReserved())) > 0) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_not_enough_is_reserved",
						contract.getWarehouse(), contract.getItemCode()));
			}
		} else {
			onHand = onHand.add(contract.getQuantity());
			if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true)) {
				materialInventory.setAvgPrice(contract.getCalculatedPrice());
			} else {
				materialInventory.setAvgPrice(Decimal.ZERO);
			}
		}
		if (Decimal.ZERO.compareTo(onHand) > 0) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_material_not_enough_in_stock", contract.getWarehouse(), contract.getItemCode()));
		}
		materialInventory.setOnHand(onHand);
	}

	@Override
	protected void revoke(IMaterialWarehouseInventoryContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		BigDecimal onHand = materialInventory.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.add(contract.getQuantity());
		} else {
			onHand = onHand.subtract(contract.getQuantity());
			if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true)) {
				materialInventory.setAvgPrice(contract.getCalculatedPrice());
			} else {
				materialInventory.setAvgPrice(Decimal.ZERO);
			}
			if (Decimal.ZERO.compareTo(onHand.subtract(materialInventory.getOnReserved())) > 0
					&& this.getLogicChain().getTrigger().isDeleted()) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_not_enough_is_reserved",
						contract.getWarehouse(), contract.getItemCode()));
			}
		}
		if (Decimal.ZERO.compareTo(onHand) > 0 && this.getLogicChain().getTrigger().isDeleted()) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_material_not_enough_in_stock", contract.getWarehouse(), contract.getItemCode()));
		}
		materialInventory.setOnHand(onHand);
	}
}
