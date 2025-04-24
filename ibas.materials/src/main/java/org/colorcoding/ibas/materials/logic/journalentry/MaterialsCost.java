package org.colorcoding.ibas.materials.logic.journalentry;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialsCost extends JournalEntrySmartContent {

	public MaterialsCost(Object sourceData) {
		super(sourceData);
	}

	protected boolean isInventoryMaterial(String itemCode) {
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
			boRepository.setTransaction(this.getService().getTransaction());
			IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IMaterial item : operationResult.getResultObjects()) {
				if (!item.getCode().equals(itemCode)) {
					continue;
				}
				if (item.getItemType() == emItemType.SERVICES) {
					return false;
				}
				if (item.getInventoryItem() == emYesNo.NO) {
					// 非库存物料，成本返回0.
					// return false;
				}
			}
		}
		return true;
	}
}
