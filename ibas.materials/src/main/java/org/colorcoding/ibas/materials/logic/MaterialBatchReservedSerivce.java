package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchReservedContract.class)
public class MaterialBatchReservedSerivce
		extends MaterialInventoryBusinessLogic<IMaterialBatchReservedContract, IMaterialBatch> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialBatchReservedContract) {
			IMaterialBatchReservedContract contract = (IMaterialBatchReservedContract) data;
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
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialBatch fetchBeAffected(IMaterialBatchReservedContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 非批次管理物料
		if (material.getBatchManagement() != emYesNo.YES) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_material_is_not_batchmanagement", contract.getItemCode()));
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
			throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_is_unavailable", contract.getWarehouse(),
					contract.getItemCode(), contract.getBatchCode()));
		}
		return materialBatch;
	}

	@Override
	protected void impact(IMaterialBatchReservedContract contract) {
		IMaterialBatch materialBatch = this.getBeAffected();
		BigDecimal onReserved = materialBatch.getReservedQuantity();
		onReserved = onReserved.add(contract.getQuantity());
		/*
		if (onReserved.compareTo(materialBatch.getQuantity()) > 0) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_not_enough_in_stock",
					contract.getWarehouse(), contract.getItemCode(), contract.getBatchCode()));
		}
		*/
		materialBatch.setReservedQuantity(onReserved);
	}

	@Override
	protected void revoke(IMaterialBatchReservedContract contract) {
		IMaterialBatch materialBatch = this.getBeAffected();
		BigDecimal onReserved = materialBatch.getReservedQuantity();
		onReserved = onReserved.subtract(contract.getQuantity());
		if (Decimal.ZERO.compareTo(onReserved) >= 0) {
			onReserved = Decimal.ZERO;
		}
		materialBatch.setReservedQuantity(onReserved);
	}

}
