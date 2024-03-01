package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialInventoryBusinessLogic<L extends IBusinessLogicContract, B extends IBusinessObject>
		extends MaterialBusinessLogic<L, B> {

	/**
	 * 正常记录
	 */
	public static final String DATASOURCE_SIGN_REGULAR_JOURNAL = "JNL-REG";
	/**
	 * 冲销记录
	 */
	public static final String DATASOURCE_SIGN_OFFSETTING_JOURNAL = "JNL-OFF";

	public MaterialInventoryBusinessLogic() {
		this.setEnableMaterialCosts(
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false));
	}

	private boolean enableMaterialCosts;

	public final boolean isEnableMaterialCosts() {
		return enableMaterialCosts;
	}

	public final void setEnableMaterialCosts(boolean value) {
		this.enableMaterialCosts = value;
	}

	protected IWarehouse checkWarehouse(String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Warehouse.PROPERTY_CODE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setBracketOpen(1);
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setValue(emYesNo.YES);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setValue(emYesNo.NO);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setRelationship(ConditionRelationship.OR);
		condition = criteria.getConditions().create();
		condition.setBracketClose(1);
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setOperation(ConditionOperation.IS_NULL);
		condition.setRelationship(ConditionRelationship.OR);
		IWarehouse warehouse = super.fetchBeAffected(criteria, IWarehouse.class);
		if (warehouse == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IWarehouse> operationResult = boRepository.fetchWarehouse(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			warehouse = operationResult.getResultObjects().firstOrDefault();
		}
		// 仓库不存在
		if (warehouse == null) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_warehouse_is_not_exist", whsCode == null ? "" : whsCode));
		}
		// 检查仓库可用状态
		if (warehouse.getActivated() == emYesNo.NO || warehouse.getDeleted() == emYesNo.YES) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_warehouse_is_unavailable", warehouse.getCode(), warehouse.getName()));
		}
		return warehouse;
	}

	protected IMaterialInventory checkMaterialInventory(String itemCode, String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialInventory materialInventory = super.fetchBeAffected(criteria, IMaterialInventory.class);
		if (materialInventory == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialInventory = operationResult.getResultObjects().firstOrDefault();
		}
		return materialInventory;
	}
}
