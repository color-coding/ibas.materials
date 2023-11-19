package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.accounting.logic.JournalEntrySmartContent;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialsCost extends JournalEntrySmartContent {

	public MaterialsCost(Object sourceData) {
		super(sourceData);
	}

	protected BigDecimal getAvgPrice(String baseType, Integer baseEntry, Integer baseLine, String itemCode,
			String warehouse) {
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setValue(emDirection.OUT);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setValue(baseType);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setValue(baseEntry);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setValue(baseLine);
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		boRepository.setRepository(this.getService().getRepository());
		IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
				.fetchMaterialInventoryJournal(criteria);
		if (operationResult.getError() != null) {
			throw new BusinessLogicException(operationResult.getError());
		}
		for (IMaterialInventoryJournal journal : operationResult.getResultObjects()) {
			if (!journal.getItemCode().equals(itemCode)) {
				continue;
			}
			if (!journal.getWarehouse().equals(warehouse)) {
				continue;
			}
			return journal.getCalculatedPrice();
		}
		return null;
	}

	protected BigDecimal getAvgPrice(String itemCode, String warehouse) {
		if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true)) {
			/* 按仓库核算成本 */
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
			condition.setValue(itemCode);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
			condition.setValue(warehouse);
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(this.getService().getRepository());
			IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IMaterialInventory materialInventory : operationResult.getResultObjects()) {
				return materialInventory.getAvgPrice();
			}
		} else {
			/* 按物料核算成本 */
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(Material.PROPERTY_CODE.getName());
			condition.setValue(itemCode);
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(this.getService().getRepository());
			IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IMaterial material : operationResult.getResultObjects()) {
				return material.getAvgPrice();
			}
		}
		return null;
	}
}
