package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialSerialInventoryContract.class)
public class MaterialSerialInventoryService
		extends MaterialInventoryBusinessLogic<IMaterialSerialInventoryContract, IMaterialSerial> {
	@Override
	protected IMaterialSerial fetchBeAffected(IMaterialSerialInventoryContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 非序列编码管理物料
		if (material.getSerialManagement() != emYesNo.YES) {
			throw new BusinessLogicException(
					String.format(I18N.prop("msg_mm_material_is_not_serialmanagement"), contract.getItemCode()));
		}
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料序列库存记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSerialCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerial.PROPERTY_ITEMCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerial.PROPERTY_WAREHOUSE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getWarehouse());

		IMaterialSerial materialSerial = this.fetchBeAffected(criteria, IMaterialSerial.class);
		if (materialSerial == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialSerial> operationResult = boRepository.fetchMaterialSerial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialSerial = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialSerial == null) {
			materialSerial = new MaterialSerial();
			materialSerial.setSerialCode(contract.getSerialCode());
			materialSerial.setItemCode(contract.getItemCode());
			materialSerial.setWarehouse(contract.getWarehouse());
			materialSerial.setInStock(emYesNo.NO);
		}
		if (materialSerial.getLocked() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_is_unavailable",
					materialSerial.getWarehouse(), materialSerial.getItemCode(), materialSerial.getSerialCode()));
		}
		return materialSerial;
	}

	@Override
	protected void impact(IMaterialSerialInventoryContract contract) {
		IMaterialSerial materialSerial = this.getBeAffected();
		if (contract.getDirection() == emDirection.IN) {
			if (materialSerial.getInStock() == emYesNo.YES) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_in_stock", contract.getWarehouse(),
						contract.getItemCode(), contract.getSerialCode()));
			}
			materialSerial.setInStock(emYesNo.YES);
		} else {
			if (materialSerial.getInStock() == emYesNo.NO) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_not_in_stock",
						contract.getItemCode(), contract.getSerialCode(), contract.getWarehouse()));
			}
			materialSerial.setInStock(emYesNo.NO);
		}
	}

	@Override
	protected void revoke(IMaterialSerialInventoryContract contract) {
		IMaterialSerial materialSerial = this.getBeAffected();
		if (contract.getDirection() == emDirection.IN) {
			if (materialSerial.getInStock() == emYesNo.NO) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_not_in_stock",
						contract.getItemCode(), contract.getSerialCode(), contract.getWarehouse()));
			}
			materialSerial.setInStock(emYesNo.NO);
		} else {
			if (materialSerial.getInStock() == emYesNo.YES) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_in_stock", contract.getWarehouse(),
						contract.getItemCode(), contract.getSerialCode()));
			}
			materialSerial.setInStock(emYesNo.YES);
		}
	}

}