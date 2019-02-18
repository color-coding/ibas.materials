package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialWarehouseFrozenContract.class)
public class MaterialWarehouseFrozenService
		extends MaterialInventoryBusinessLogic<IMaterialWarehouseFrozenContract, IMaterialInventory> {
	@Override
	protected IMaterialInventory fetchBeAffected(IMaterialWarehouseFrozenContract contract) {
		// 检查物料
		this.checkMaterial(contract.getItemCode());
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
			throw new BusinessLogicException(String.format(I18N.prop("msg_mm_material_is_frozen_in_warehouse"),
					materialInventory.getItemCode(), materialInventory.getWarehouse()));
		}
		return materialInventory;
	}

	@Override
	protected void impact(IMaterialWarehouseFrozenContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		if (contract.getFreeze() == emYesNo.YES) {
			materialInventory.setFrozen(emYesNo.YES);
		}
	}

	@Override
	protected void revoke(IMaterialWarehouseFrozenContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		if (contract.getFreeze() == emYesNo.YES) {
			materialInventory.setFrozen(emYesNo.NO);
		}
	}
}
