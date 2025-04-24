package org.colorcoding.ibas.materials.logic;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.logic.IMaterialPriceCheckContract.IMaterialPrice;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialPriceCheckContract.class)
public class MaterialPriceCheckService extends MaterialBusinessLogic<IMaterialPriceCheckContract, IBusinessObject> {

	@Override
	protected boolean checkDataStatus(Object data) {
		// 无价格清单属性不执行逻辑
		if (data instanceof IMaterialPriceCheckContract) {
			IMaterialPriceCheckContract contract = (IMaterialPriceCheckContract) data;
			if (contract.getPriceList() == null || Integer.compare(contract.getPriceList(), 0) <= 0) {
				return false;
			}
		}
		// 审批中也执行
		if (data instanceof IApprovalData) {
			if (((IApprovalData) data).getApprovalStatus() == emApprovalStatus.PROCESSING) {
				return true;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IBusinessObject fetchBeAffected(IMaterialPriceCheckContract contract) {
		return BOUtilities.VALUE_EMPTY;
	}

	@Override
	protected void impact(IMaterialPriceCheckContract contract) {
		// 检查物料价格项目
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialPrice.CONDITION_ALIAS_PRICELIST);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getPriceList());
		// 子表-物料编码
		Iterator<IMaterialPrice> iterator = contract.getMaterialPrices();
		while (iterator.hasNext()) {
			IMaterialPrice item = iterator.next();
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(item.getItemCode());
			if (criteria.getConditions().size() > 1) {
				condition.setRelationship(ConditionRelationship.OR);
			}
		}
		try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
			boRepository.setTransaction(this.getTransaction());
			IOperationResult<org.colorcoding.ibas.materials.bo.material.IMaterialPrice> operationResult = boRepository
					.fetchMaterialPrice(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			iterator = contract.getMaterialPrices();
			while (iterator.hasNext()) {
				IMaterialPrice item = iterator.next();
				org.colorcoding.ibas.materials.bo.material.IMaterialPrice priceItem = operationResult.getResultObjects()
						.firstOrDefault(c -> c.getItemCode().equals(item.getItemCode()));
				if (priceItem != null) {
					if (priceItem.getCurrency() != null && !priceItem.getCurrency().equals(item.getCurrency())) {
						throw new BusinessLogicException(I18N.prop("msg_mm_material_price_currency_mismatch",
								Strings.isNullOrEmpty(priceItem.getItemName()) ? priceItem.getItemCode()
										: priceItem.getItemName()));
					}
					if (priceItem.getPrice() != null && priceItem.getPrice().compareTo(Decimals.VALUE_ZERO) >= 0) {
						if (contract.getDirection() == emDirection.OUT) {
							if (item.getPrice().compareTo(priceItem.getPrice()) < 0) {
								throw new BusinessLogicException(I18N.prop("msg_mm_material_price_too_low",
										Strings.isNullOrEmpty(priceItem.getItemName()) ? priceItem.getItemCode()
												: priceItem.getItemName()));
							}
						} else if (contract.getDirection() == emDirection.IN) {
							if (item.getPrice().compareTo(priceItem.getPrice()) > 0) {
								throw new BusinessLogicException(I18N.prop("msg_mm_material_price_too_high",
										Strings.isNullOrEmpty(priceItem.getItemName()) ? priceItem.getItemCode()
												: priceItem.getItemName()));
							}
						}
					}
				}
			}
		}
	}

	@Override
	protected void revoke(IMaterialPriceCheckContract contract) {
	}

}
