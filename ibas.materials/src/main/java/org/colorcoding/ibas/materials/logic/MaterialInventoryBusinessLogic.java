package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialInventoryBusinessLogic<L extends IBusinessLogicContract, B extends IBusinessObject>
		extends MaterialBusinessLogic<L, B> {

	protected IWarehouse checkWarehouse(String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
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

}
