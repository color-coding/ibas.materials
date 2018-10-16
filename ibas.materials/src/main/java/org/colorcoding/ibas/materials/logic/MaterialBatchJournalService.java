package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchJournalContract.class)
public class MaterialBatchJournalService extends BusinessLogic<IMaterialBatchJournalContract, IMaterialBatchJournal> {
	@Override
	protected IMaterialBatchJournal fetchBeAffected(IMaterialBatchJournalContract contract) {
		// 检查物料批次记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBatchCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());

		IMaterialBatchJournal materialBatchJournal = this.fetchBeAffected(criteria, IMaterialBatchJournal.class);
		if (materialBatchJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialBatchJournal> operationResult = boRepository.fetchMaterialBatchJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialBatchJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialBatchJournal == null) {
			materialBatchJournal = new MaterialBatchJournal();
			materialBatchJournal.setBatchCode(contract.getBatchCode());
			materialBatchJournal.setDirection(contract.getDirection());
			materialBatchJournal.setBaseDocumentType(contract.getDocumentType());
			materialBatchJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialBatchJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialBatchJournal;
	}

	@Override
	protected void impact(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		materialBatchJournal.setItemCode(contract.getItemCode());
		materialBatchJournal.setWarehouse(contract.getWarehouse());
		materialBatchJournal.setQuantity(materialBatchJournal.getQuantity().add(contract.getQuantity()));
	}

	@Override
	protected void revoke(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		materialBatchJournal.setQuantity(materialBatchJournal.getQuantity().subtract(contract.getQuantity()));
		if (materialBatchJournal.getQuantity().isZero()) {
			materialBatchJournal.delete();
		}
	}

}