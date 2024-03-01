package org.colorcoding.ibas.materials.logic.journalentry;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
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
import org.colorcoding.ibas.materials.logic.MaterialInventoryBusinessLogic;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialReceiptReverse extends JournalEntrySmartContent {

	public MaterialReceiptReverse(Object sourceData) {
		super(sourceData);
	}

	protected IMaterialInventoryJournal getMaterialJournal(String docType, int docEntry, int lineId) {
		// 检查物料收货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(docType);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(docEntry);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(lineId);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(emDirection.IN);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(MaterialInventoryBusinessLogic.DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		boRepository.setRepository(this.getService().getRepository());
		IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
				.fetchMaterialInventoryJournal(criteria);
		if (operationResult.getError() != null) {
			throw new BusinessLogicException(operationResult.getError());
		}
		for (IMaterialInventoryJournal journal : operationResult.getResultObjects()) {
			return journal;
		}
		return null;
	}

	protected IMaterialInventory getMaterialInventory(String itemCode, String warehouse) {
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
				return materialInventory;
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
				MaterialInventory inventory = new MaterialInventory();
				inventory.setItemCode(material.getCode());
				inventory.setOnCommited(material.getOnCommited());
				inventory.setOnHand(material.getOnHand());
				inventory.setOnOrdered(material.getOnOrdered());
				inventory.setOnReserved(material.getOnReserved());
				inventory.setAvgPrice(material.getAvgPrice());
				inventory.setInventoryValue(material.getInventoryValue());
				return inventory;
			}
		}
		return null;
	}
}
