package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialPriceContract.class)
public class MaterialPriceService extends MaterialBusinessLogic<IMaterialPriceContract, IMaterialPriceList> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialPriceContract) {
			IMaterialPriceContract contract = (IMaterialPriceContract) data;
			if (contract.getPrice() == null) {
				// 无价格，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Non Price",
						contract.getPrice());
				return false;
			}
			if (contract.getPriceList() == null) {
				// 无价格清单，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"Non PriceList", contract.getPriceList());
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

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

		IMaterialPriceList materialPriceList = this.fetchBeAffected(IMaterialPriceList.class, criteria);
		if (materialPriceList == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
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
		if (!Strings.isNullOrEmpty(contract.getCurrency())) {
			// 设置了货币，则比较货币是否匹配
			if (!contract.getCurrency().equals(materialPriceList.getCurrency())) {
				throw new BusinessLogicException(I18N.prop("msg_mm_wrong_currency_of_price_list",
						materialPriceList.getName() != null ? materialPriceList.getName()
								: materialPriceList.getObjectKey()));
			}
		}
		IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems()
				.firstOrDefault(c -> c.getItemCode().equals(contract.getItemCode())
						// 提供单位，则要求单位一致
						&& ((!Strings.isNullOrEmpty(contract.getUOM()) && contract.getUOM().equals(c.getUOM())
								|| Strings.isNullOrEmpty(contract.getUOM()))));
		if (materialPriceItem == null) {
			materialPriceItem = materialPriceList.getMaterialPriceItems().create();
			materialPriceItem.setItemCode(contract.getItemCode());
		}
		materialPriceItem.setUOM(Strings.isNullOrEmpty(contract.getUOM()) ? Strings.VALUE_EMPTY : contract.getUOM());
		materialPriceItem.setPrice(contract.getPrice());
		materialPriceItem.setCurrency(
				Strings.isNullOrEmpty(contract.getCurrency()) ? Strings.VALUE_EMPTY : contract.getCurrency());
	}

	@Override
	protected void revoke(IMaterialPriceContract contract) {
		// 价格不存在反向处理
	}
}
