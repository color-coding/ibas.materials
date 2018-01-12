package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialWarehouseInventoryContract.class)
public class MaterialWarehouseInventoryService
		extends MaterialInventoryBusinessLogic<IMaterialWarehouseInventoryContract, IMaterialInventory> {
	@Override
	protected IMaterialInventory fetchBeAffected(IMaterialWarehouseInventoryContract contract) {
		// 检查物料
		this.checkMaterial(contract.getItemCode());
		// 检查仓库
		this.checkWarehose(contract.getWarehouse());
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
		return materialInventory;
	}

	@Override
	protected void impact(IMaterialWarehouseInventoryContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		Decimal onHand = materialInventory.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.subtract(contract.getQuantity());
		} else {
			onHand = onHand.add(contract.getQuantity());
		}
		materialInventory.setOnHand(onHand);
	}

	@Override
	protected void revoke(IMaterialWarehouseInventoryContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		Decimal onHand = materialInventory.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.add(contract.getQuantity());
		} else {
			onHand = onHand.subtract(contract.getQuantity());
		}
		materialInventory.setOnHand(onHand);
	}
}
