package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialBusinessLogic<L extends IBusinessLogicContract, B extends IBusinessObject>
		extends BusinessLogic<L, B> {

	protected IMaterial checkMaterial(String itemCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterial material = super.fetchBeAffected(criteria, IMaterial.class);
		if (material == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			material = operationResult.getResultObjects().firstOrDefault();
		}
		// 物料不存在
		if (material == null) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_material_is_not_exist", itemCode == null ? "" : itemCode));
		}
		// 检查物料可用状态
		if (material.getActivated() == emYesNo.NO || material.getDeleted() == emYesNo.YES) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_material_is_unavailable", material.getCode(), material.getName()));
		}
		return material;
	}

}
