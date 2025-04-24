package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchInventoryContract.class)
public class MaterialBatchInventorySerivce
		extends MaterialInventoryBusinessLogic<IMaterialBatchInventoryContract, IMaterialBatch> {
	@Override
	protected IMaterialBatch fetchBeAffected(IMaterialBatchInventoryContract contract) {
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

		IMaterialBatch materialBatch = this.fetchBeAffected(IMaterialBatch.class, criteria);
		if (materialBatch == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialBatch> operationResult = boRepository.fetchMaterialBatch(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialBatch = operationResult.getResultObjects().firstOrDefault();
			}
		}
		if (materialBatch == null) {
			materialBatch = new MaterialBatch();
			materialBatch.setBatchCode(contract.getBatchCode());
			materialBatch.setItemCode(contract.getItemCode());
			materialBatch.setWarehouse(contract.getWarehouse());
		}
		if (materialBatch.getLocked() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_is_unavailable",
					materialBatch.getWarehouse(), materialBatch.getItemCode(), materialBatch.getBatchCode()));
		}
		return materialBatch;
	}

	@Override
	protected void impact(IMaterialBatchInventoryContract contract) {
		IMaterialBatch materialBatch = this.getBeAffected();
		BigDecimal quantity = materialBatch.getQuantity();
		if (contract.getDirection() == emDirection.IN) {
			quantity = quantity.add(contract.getQuantity());
			if (this.checkMaterial(materialBatch.getItemCode())
					.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
				BigDecimal avgPrice = contract.getCalculatedPrice();
				if (contract.getQuantity().compareTo(Decimals.VALUE_ZERO) > 0 && avgPrice != null) {
					materialBatch.setAvgPrice(avgPrice);
				}
			}
		} else if (contract.getDirection() == emDirection.OUT) {
			quantity = quantity.subtract(contract.getQuantity());
			if (this.checkMaterial(materialBatch.getItemCode())
					.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
				BigDecimal avgPrice = contract.getCalculatedPrice();
				if (contract.getQuantity().compareTo(Decimals.VALUE_ZERO) < 0 && avgPrice != null) {
					materialBatch.setAvgPrice(avgPrice);
				}
			}
		}
		if (Decimals.VALUE_ZERO.compareTo(quantity) > 0) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_not_enough_in_stock",
					contract.getWarehouse(), contract.getItemCode(), contract.getBatchCode(), quantity));
		}
		materialBatch.setQuantity(quantity);
	}

	@Override
	protected void revoke(IMaterialBatchInventoryContract contract) {
		IMaterialBatch materialBatch = this.getBeAffected();
		BigDecimal quantity = materialBatch.getQuantity();
		if (contract.getDirection().equals(emDirection.IN)) {
			quantity = quantity.subtract(contract.getQuantity());
		} else {
			quantity = quantity.add(contract.getQuantity());
		}
		if (Decimals.VALUE_ZERO.compareTo(quantity) > 0 && !this.isSafeUpdate()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_not_enough_in_stock",
					contract.getWarehouse(), contract.getItemCode(), contract.getBatchCode(), quantity));
		}
		materialBatch.setQuantity(quantity);
	}

	private boolean isSafeUpdate() {
		if (this.getTrigger() instanceof IMaterialBatchJournal) {
			IMaterialBatchJournal triggerJournal = (IMaterialBatchJournal) this.getTrigger();
			if (!triggerJournal.isDeleted()) {
				return true;
			}
		}
		return false;
	}
}
