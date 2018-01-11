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
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialReceiptContract.class)
public class MaterialReceiptService
		extends MaterialInventoryBusinessLogic<IMaterialReceiptContract, IMaterialInventoryJournal> {
	@Override
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialReceiptContract contract) {
		// 检查物料
		this.checkMaterial(contract.getItemCode());
		// 检查仓库
		this.checkWarehose(contract.getWarehouse());
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
			materialJournal = MaterialInventoryJournal.create(contract);
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		Decimal receiptQuantity = materialJournal.getQuantity();
		receiptQuantity = receiptQuantity.add(contract.getQuantity());
		materialJournal.setQuantity(receiptQuantity);
	}

	@Override
	protected void revoke(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		Decimal receiptQuantity = materialJournal.getQuantity();
		receiptQuantity = receiptQuantity.subtract(contract.getQuantity());
		materialJournal.setQuantity(receiptQuantity);
	}

}
