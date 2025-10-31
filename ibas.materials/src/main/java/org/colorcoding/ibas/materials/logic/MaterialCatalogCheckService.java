package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.materialcatalog.BusinessPartnerMaterialCatalog;
import org.colorcoding.ibas.materials.bo.materialcatalog.IBusinessPartnerMaterialCatalog;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialCatalogCheckContract.class)
public class MaterialCatalogCheckService
		extends BusinessLogic<IMaterialCatalogCheckContract, IBusinessPartnerMaterialCatalog> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IBusinessPartnerMaterialCatalog) {
			IBusinessPartnerMaterialCatalog contract = (IBusinessPartnerMaterialCatalog) data;
			if (Strings.isNullOrEmpty(contract.getBusinessPartnerCode())) {
				// 无业务伙伴编码
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERCODE.getName(), "EMPTY");
				return false;
			}
			if (Strings.isNullOrEmpty(contract.getItemCode())) {
				// 无物料编码
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						BusinessPartnerMaterialCatalog.PROPERTY_ITEMCODE, "EMPTY");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IBusinessPartnerMaterialCatalog fetchBeAffected(IMaterialCatalogCheckContract contract) {
		Criteria criteria = new Criteria();
		criteria.setResultCount(1);
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERTYPE);
		condition.setValue(contract.getBusinessPartnerType());
		condition = criteria.getConditions().create();
		condition.setAlias(BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERCODE);
		condition.setValue(contract.getBusinessPartnerCode());
		condition = criteria.getConditions().create();
		condition.setAlias(BusinessPartnerMaterialCatalog.PROPERTY_ITEMCODE);
		condition.setValue(contract.getItemCode());

		IBusinessPartnerMaterialCatalog materialCatalog = this.fetchBeAffected(IBusinessPartnerMaterialCatalog.class,
				criteria);
		if (materialCatalog == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IBusinessPartnerMaterialCatalog> operationResult = boRepository
						.fetchBusinessPartnerMaterialCatalog(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialCatalog = operationResult.getResultObjects().firstOrDefault();
				if (materialCatalog instanceof BusinessObject) {
					((BusinessObject<?>) materialCatalog).setSavable(false);
				}
			}
		}
		if (materialCatalog == null) {
			materialCatalog = new BusinessPartnerMaterialCatalog();
			materialCatalog.setBusinessPartnerType(contract.getBusinessPartnerType());
			materialCatalog.setBusinessPartnerCode(contract.getBusinessPartnerCode());
			materialCatalog.setItemCode(contract.getItemCode());
			if (materialCatalog instanceof BusinessObject) {
				((BusinessObject<?>) materialCatalog).setSavable(false);
			}
		}
		return materialCatalog;
	}

	@Override
	protected void impact(IMaterialCatalogCheckContract contract) {
		IBusinessPartnerMaterialCatalog materialCatalog = this.getBeAffected();
		if (materialCatalog.isNew()) {
			return;
		}
		if (!Strings.equals(materialCatalog.getCatalogCode(), contract.getCatalogCode())) {
			contract.setCatalogCode(materialCatalog.getCatalogCode());
		}
	}

	@Override
	protected void revoke(IMaterialCatalogCheckContract contract) {

	}

}
