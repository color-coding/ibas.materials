package org.colorcoding.ibas.materials.logic.journalentry;

import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.ArrayList;
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
			String material = String.valueOf(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
			if (!JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(material)) {
				ICondition condition;
				Criteria criteria = new Criteria();
				if (material.startsWith("[") && material.endsWith("]")) {
					for (String item : material.substring(1, material.length() - 1).split(",")) {
						condition = criteria.getConditions().create();
						condition.setAlias(Material.PROPERTY_CODE.getName());
						condition.setValue(item.trim());
						if (criteria.getConditions().size() > 1) {
							condition.setRelationship(ConditionRelationship.OR);
						}
					}
				} else {
					condition = criteria.getConditions().create();
					condition.setAlias(Material.PROPERTY_CODE.getName());
					condition.setValue(material);
				}
				if (!criteria.getConditions().isEmpty()) {
					try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
						boRepository.setTransaction(this.getService().getTransaction());
						IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
						if (operationResult.getError() != null) {
							throw new BusinessLogicException(operationResult.getError());
						}
						ArrayList<String> groups = new ArrayList<>();
						for (IMaterial item : operationResult.getResultObjects()) {
							if (Strings.isNullOrEmpty(item.getGroup())) {
								continue;
							}
							if (groups.firstOrDefault(c -> c.equalsIgnoreCase(item.getGroup())) == null) {
								groups.add(item.getGroup());
							}
						}
						StringBuilder builder = new StringBuilder();
						for (String item : groups) {
							if (builder.length() > 0) {
								builder.append(",");
							}
							builder.append(item);
						}
						return builder.toString();
					}
				}
			}
		} else if (Ledgers.CONDITION_PROPERTY_MATERIAL_TYPE.equals(property)) {
			String material = String.valueOf(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
			if (!JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(material)) {
				ICondition condition;
				Criteria criteria = new Criteria();
				if (material.startsWith("[") && material.endsWith("]")) {
					for (String item : material.substring(1, material.length() - 1).split(",")) {
						condition = criteria.getConditions().create();
						condition.setAlias(Material.PROPERTY_CODE.getName());
						condition.setValue(item.trim());
						if (criteria.getConditions().size() > 1) {
							condition.setRelationship(ConditionRelationship.OR);
						}
					}
				} else {
					condition = criteria.getConditions().create();
					condition.setAlias(Material.PROPERTY_CODE.getName());
					condition.setValue(material);
				}
				if (!criteria.getConditions().isEmpty()) {
					try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
						boRepository.setTransaction(this.getService().getTransaction());
						IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
						if (operationResult.getError() != null) {
							throw new BusinessLogicException(operationResult.getError());
						}
						ArrayList<String> itemTypes = new ArrayList<>();
						for (IMaterial item : operationResult.getResultObjects()) {
							String value = String.valueOf(item.getItemType());
							if (itemTypes.firstOrDefault(c -> c.equalsIgnoreCase(value)) == null) {
								itemTypes.add(value);
							}
						}
						StringBuilder builder = new StringBuilder();
						for (String item : itemTypes) {
							if (builder.length() > 0) {
								builder.append(",");
							}
							builder.append(item);
						}
						return builder.toString();
					}
				}
			}
		}
		return super.getSourceDataPropertyValue(property);
	}
}
