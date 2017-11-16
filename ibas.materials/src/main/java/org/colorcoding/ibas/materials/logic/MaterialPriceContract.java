package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
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
 * @author Allen.Zhang
 *
 */
@LogicContract(IMaterialPriceContract.class)
public class MaterialPriceContract extends BusinessLogic<IMaterialPriceContract, IMaterialPriceList> {
	/**
	 * 查找被影响的物料价格清单 目前规则：若不存在此价格清单就添加,否则就更新
	 * 实际规则：若不存在此价格清单就报错，否则更新（实际业务场景中，第一张价格清单是手工新建的）
	 * 
	 * @return
	 */
	@Override
	protected IMaterialPriceList fetchBeAffected(IMaterialPriceContract Contract) {
		// region 主表查询条件
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
		condition.setValue(Contract.getPriceList());
		condition.setOperation(ConditionOperation.EQUAL);

		// region 子表查询条件
		IChildCriteria childCriteria = criteria.getChildCriterias().create();
		childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
		childCriteria.setOnlyHasChilds(false);
		// 子表-物料编码
		ICondition childCondition = childCriteria.getConditions().create();
		childCondition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
		childCondition.setValue(Contract.getItemCode());
		childCondition.setOperation(ConditionOperation.EQUAL);
		// endregion

		// 先在事物缓存里查
		IMaterialPriceList materialPriceList = super.fetchBeAffected(criteria, IMaterialPriceList.class);
		if (materialPriceList == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialPriceList> operationResult = boRepository.fetchMaterialPriceList(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialPriceList = operationResult.getResultObjects().firstOrDefault();
			if (materialPriceList == null) {
				materialPriceList = MaterialPriceList.create(Contract);
			} else {
				// 不更新已经存在价格清单
				BusinessObject<?> bo = (BusinessObject<?>) materialPriceList;
				bo.unsavable();
			}
		}
		return materialPriceList;
	}

	@Override
	protected void impact(IMaterialPriceContract contract) {
		IMaterialPriceList materialPriceList = this.getBeAffected();
		IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems()
				.firstOrDefault(c -> c.getItemCode().equals(contract.getItemCode()));
		if (materialPriceItem == null) {
			materialPriceItem = materialPriceList.getMaterialPriceItems().create();
		}
		materialPriceItem.setItemCode(contract.getItemCode());
		materialPriceItem.setPrice(contract.getPrice());
	}

	@Override
	protected void revoke(IMaterialPriceContract contract) {
		IMaterialPriceList materialPriceList = this.getBeAffected();
		IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems()
				.firstOrDefault(c -> c.getItemCode().equals(contract.getItemCode()));
		if (materialPriceItem == null) {
			materialPriceItem = materialPriceList.getMaterialPriceItems().create();
		}
		materialPriceItem.setItemCode(contract.getItemCode());
		materialPriceItem.setPrice(0);
	}
}
