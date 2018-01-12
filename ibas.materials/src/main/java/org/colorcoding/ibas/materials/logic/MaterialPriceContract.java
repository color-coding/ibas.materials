package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 影响物料价格清单的契约
 * 
 */
@LogicContract(IMaterialPriceContract.class)
public class MaterialPriceContract extends MaterialBusinessLogic<IMaterialPriceContract, IMaterialPriceList> {

	@Override
	protected IMaterialPriceList fetchBeAffected(IMaterialPriceContract contract) {
		// 检查物料
		this.checkMaterial(contract.getItemCode());
		// 检查物料价格项目
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getPriceList());
		// 子表查询条件
		IChildCriteria childCriteria = criteria.getChildCriterias().create();
		childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
		childCriteria.setOnlyHasChilds(false);
		// 子表-物料编码
		ICondition childCondition = childCriteria.getConditions().create();
		childCondition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
		childCondition.setOperation(ConditionOperation.EQUAL);
		childCondition.setValue(contract.getItemCode());

		IMaterialPriceList materialPriceList = super.fetchBeAffected(criteria, IMaterialPriceList.class);
		if (materialPriceList == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialPriceList> operationResult = boRepository.fetchMaterialPriceList(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialPriceList = operationResult.getResultObjects().firstOrDefault();
			if (materialPriceList != null) {
				// 不更新已经存在价格清单
				BusinessObject<?> bo = (BusinessObject<?>) materialPriceList;
				bo.unsavable();
			}
		}
		if (materialPriceList == null) {
			// 物料价格清单不存在
			throw new BusinessLogicException(
					I18N.prop("msg_mm_not_found_material_price_list", contract.getPriceList()));
		}
		return materialPriceList;
	}

	@Override
	protected void impact(IMaterialPriceContract contract) {
		IMaterialPriceList materialPriceList = this.getBeAffected();
		if (contract.getCurrency() != null && !contract.getCurrency().isEmpty()) {
			// 设置了币种，则比较币种是否匹配
			if (!contract.getCurrency().equals(materialPriceList.getCurrency())) {
				throw new BusinessLogicException(I18N.prop("msg_mm_wrong_currency_of_price_list",
						materialPriceList.getName() != null ? materialPriceList.getName()
								: materialPriceList.getObjectKey()));
			}
		}
		IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems()
				.firstOrDefault(c -> c.getItemCode().equals(contract.getItemCode()));
		if (materialPriceItem == null) {
			materialPriceItem = materialPriceList.getMaterialPriceItems().create();
			materialPriceItem.setItemCode(contract.getItemCode());
		}
		materialPriceItem.setPrice(contract.getPrice());
	}

	@Override
	protected void revoke(IMaterialPriceContract contract) {
		// 价格不存在反向处理
	}
}
