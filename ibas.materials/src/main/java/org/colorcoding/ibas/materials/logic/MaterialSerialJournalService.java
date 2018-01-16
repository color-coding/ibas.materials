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
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialSerialJournalContract.class)
public class MaterialSerialJournalService
		extends BusinessLogic<IMaterialSerialJournalContract, IMaterialSerialJournal> {
	@Override
	protected IMaterialSerialJournal fetchBeAffected(IMaterialSerialJournalContract contract) {
		// 检查物料序列记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerialJournal.PROPERTY_SERIALCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSerialCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());

		IMaterialSerialJournal materialSerialJournal = this.fetchBeAffected(criteria, IMaterialSerialJournal.class);
		if (materialSerialJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialSerialJournal> operationResult = boRepository
					.fetchMaterialSerialJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialSerialJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialSerialJournal == null) {
			materialSerialJournal = new MaterialSerialJournal();
			materialSerialJournal.setSerialCode(contract.getSerialCode());
			materialSerialJournal.setItemCode(contract.getItemCode());
			materialSerialJournal.setWarehouse(contract.getWarehouse());
			materialSerialJournal.setDirection(contract.getDirection());
			materialSerialJournal.setBaseDocumentType(contract.getDocumentType());
			materialSerialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialSerialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialSerialJournal;
	}

	@Override
	protected void impact(IMaterialSerialJournalContract contract) {
		IMaterialSerialJournal materialSerialJournal = this.getBeAffected();
		materialSerialJournal.setItemCode(contract.getItemCode());
		materialSerialJournal.setWarehouse(contract.getWarehouse());
	}

	@Override
	protected void revoke(IMaterialSerialJournalContract contract) {
		IMaterialSerialJournal materialSerialJournal = this.getBeAffected();
		materialSerialJournal.delete();
	}

}