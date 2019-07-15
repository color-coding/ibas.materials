package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectProxy;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;

@LogicContract(IMaterialCompletionContract.class)
public class MaterialCompletionService
		extends MaterialBusinessLogic<IMaterialCompletionContract, IBusinessObjectProxy> {
	private static final IBusinessObjectProxy BO_PROXY = new IBusinessObjectProxy() {

		private static final long serialVersionUID = 1L;

		@Override
		public boolean isValid() {
			return false;
		}

		@Override
		public boolean isSavable() {
			return false;
		}

		@Override
		public boolean isNew() {
			return false;
		}

		@Override
		public boolean isLoading() {
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
		public boolean isBusy() {
			return false;
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
		public void undelete() {
		}

		@Override
		public String getIdentifiers() {
			return this.toString();
		}

		@Override
		public void delete() {
		}
	};

	@Override
	protected IBusinessObjectProxy fetchBeAffected(IMaterialCompletionContract contract) {
		return BO_PROXY;
	}

	@Override
	protected void impact(IMaterialCompletionContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (contract.getItemSign() == null || contract.getItemSign().isEmpty()) {
			contract.setItemSign(material.getSign());
		}
		if (contract.getItemDescription() == null || contract.getItemDescription().isEmpty()) {
			contract.setItemDescription(material.getName());
		}
	}

	@Override
	protected void revoke(IMaterialCompletionContract contract) {
	}

}
