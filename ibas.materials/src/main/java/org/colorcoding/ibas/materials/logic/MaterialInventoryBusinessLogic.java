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
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialInventoryBusinessLogic<L extends IBusinessLogicContract, B extends IBusinessObject>
		extends MaterialBusinessLogic<L, B> {

	protected IMaterial checkMaterial(String itemCode) {
		// 检查物料
		IMaterial material = super.checkMaterial(itemCode);
		// 虚拟物料，不生成库存记录
		if (material.getPhantomItem() == emYesNo.YES) {
			throw new BusinessLogicException(String
					.format(I18N.prop("msg_mm_material_is_phantom_item_can't_create_journal"), material.getCode()));
		}
		// 非库存物料，不生成库存记录
		if (material.getInventoryItem() == emYesNo.NO) {
			throw new BusinessLogicException(String.format(
					I18N.prop("msg_mm_material_is_not_inventory_item_can't_create_journal"), material.getCode()));
		}
		// 服务物料，不生成库存记录
		if (material.getItemType() == emItemType.SERVICES) {
			throw new BusinessLogicException(String
					.format(I18N.prop("msg_mm_material_is_service_item_can't_create_journal"), material.getCode()));
		}
		return material;
	}

	protected IWarehouse checkWarehose(String whsCode) {
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
			throw new BusinessLogicException(String.format(I18N.prop("msg_mm_warehouse_is_not_exist"), whsCode));
		}
		return warehouse;
	}

}
