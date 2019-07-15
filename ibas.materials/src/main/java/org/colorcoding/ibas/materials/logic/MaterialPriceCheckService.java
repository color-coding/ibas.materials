package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectProxy;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.logic.IMaterialPriceCheckContract.IMaterialPrice;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialPriceCheckContract.class)
public class MaterialPriceCheckService
		extends MaterialBusinessLogic<IMaterialPriceCheckContract, IBusinessObjectProxy> {

	@Override
	protected IBusinessObjectProxy fetchBeAffected(IMaterialPriceCheckContract contract) {
		return new IBusinessObjectProxy() {
			private static final long serialVersionUID = 1L;

			@Override
			public String getIdentifiers() {
				return this.toString();
			}

			@Override
			public void delete() {
			}

			@Override
			public void undelete() {
			}

			@Override
			public String toString(String type) {
				return this.toString();
			}

			@Override
			public ICriteria getCriteria() {
				return null;
			}

			@Override
			public boolean isValid() {
				return false;
			}

			@Override
			public boolean isDirty() {
				return false;
			}

			@Override
			public boolean isDeleted() {
				return false;
			}

			@Override
			public boolean isNew() {
				return false;
			}

			@Override
			public boolean isSavable() {
				return false;
			}

			@Override
			public boolean isBusy() {
				return false;
			}

			@Override
			public boolean isLoading() {
				return false;
			}
		};
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
		for (IMaterialPrice item : contract.getMaterialPrices()) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(item.getItemCode());
			if (criteria.getConditions().size() > 1) {
				condition.setRelationship(ConditionRelationship.OR);
			}
		}
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		boRepository.setRepository(super.getRepository());
		IOperationResult<org.colorcoding.ibas.materials.bo.material.IMaterialPrice> operationResult = boRepository
				.fetchMaterialPrice(criteria);
		if (operationResult.getError() != null) {
			throw new BusinessLogicException(operationResult.getError());
		}
		for (IMaterialPrice item : contract.getMaterialPrices()) {
			org.colorcoding.ibas.materials.bo.material.IMaterialPrice priceItem = operationResult.getResultObjects()
					.firstOrDefault(c -> c.getItemCode().equals(item.getItemCode()));
			if (priceItem != null) {
				if (Decimal.ZERO.compareTo(priceItem.getFloorPrice()) < 0) {
					if (priceItem.getFloorPrice().compareTo(item.getPrice()) > 0) {
						throw new BusinessLogicException(I18N.prop("msg_mm_material_price_too_low",
								priceItem.getItemName() == null ? priceItem.getItemCode() : priceItem.getItemName()));
					}
				}
				if (!priceItem.getCurrency().equals(item.getCurrency())) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_price_currency_mismatch",
							priceItem.getItemName() == null ? priceItem.getItemCode() : priceItem.getItemName()));
				}
			}
		}
	}

	@Override
	protected void revoke(IMaterialPriceCheckContract contract) {
		// TODO Auto-generated method stub

	}

}
