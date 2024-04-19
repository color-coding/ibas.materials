package org.colorcoding.ibas.materials.logic.journalentry;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public class JournalEntrySmartContent
		extends org.colorcoding.ibas.businesspartner.logic.journalentry.JournalEntrySmartContent {

	public JournalEntrySmartContent(Object sourceData) {
		super(sourceData);
	}

	@Override
	public Object getSourceDataPropertyValue(String property) {
		if (Ledgers.CONDITION_PROPERTY_MATERIAL_GROUP.equals(property)) {
			String material = String.valueOf(super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
			if (!JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(material)) {
				Criteria criteria = new Criteria();
				criteria.setResultCount(1);
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(Material.PROPERTY_CODE.getName());
				condition.setValue(material);
				BORepositoryMaterials boRepository = new BORepositoryMaterials();
				boRepository.setRepository(this.getService().getRepository());
				IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				for (IMaterial item : operationResult.getResultObjects()) {
					return item.getGroup();
				}
			}
		} else if (Ledgers.CONDITION_PROPERTY_MATERIAL_TYPE.equals(property)) {
			String material = String.valueOf(super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
			if (!JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(material)) {
				Criteria criteria = new Criteria();
				criteria.setResultCount(1);
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(Material.PROPERTY_CODE.getName());
				condition.setValue(material);
				BORepositoryMaterials boRepository = new BORepositoryMaterials();
				boRepository.setRepository(this.getService().getRepository());
				IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				for (IMaterial item : operationResult.getResultObjects()) {
					return item.getItemType();
				}
			}

		}
		return super.getSourceDataPropertyValue(property);
	}
}
