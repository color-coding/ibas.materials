package org.colorcoding.ibas.materials.logic;

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
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchInventoryContract.class)
public class MaterialBatchInventorySerivce
		extends MaterialInventoryBusinessLogic<IMaterialBatchInventoryContract, IMaterialBatch> {
	@Override
	protected IMaterialBatch fetchBeAffected(IMaterialBatchInventoryContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 非批次管理物料
		if (material.getBatchManagement() != emYesNo.YES) {
			throw new BusinessLogicException(
					String.format(I18N.prop("msg_mm_material_is_not_batchmanagement"), contract.getItemCode()));
		}
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料批次库存记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBatchCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getWarehouse());

		IMaterialBatch materialBatch = this.fetchBeAffected(criteria, IMaterialBatch.class);
		if (materialBatch == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialBatch> operationResult = boRepository.fetchMaterialBatch(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialBatch = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialBatch == null) {
			materialBatch = new MaterialBatch();
			materialBatch.setBatchCode(contract.getBatchCode());
			materialBatch.setItemCode(contract.getItemCode());
			materialBatch.setWarehouse(contract.getWarehouse());
		}
		return materialBatch;
	}

	@Override
	protected void impact(IMaterialBatchInventoryContract contract) {
		IMaterialBatch materialBatch = this.getBeAffected();
		Decimal quantity = materialBatch.getQuantity();
		if (contract.getDirection().equals(emDirection.IN)) {
			quantity = quantity.add(contract.getQuantity());
		} else {
			quantity = quantity.subtract(contract.getQuantity());
		}
		materialBatch.setQuantity(quantity);
	}

	@Override
	protected void revoke(IMaterialBatchInventoryContract contract) {
		IMaterialBatch materialBatch = this.getBeAffected();
		Decimal quantity = materialBatch.getQuantity();
		if (contract.getDirection().equals(emDirection.IN)) {
			quantity = quantity.subtract(contract.getQuantity());
		} else {
			quantity = quantity.add(contract.getQuantity());
		}
		materialBatch.setQuantity(quantity);
	}
}
