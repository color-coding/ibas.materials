package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectProxy;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialWarehouseCheckContract.class)
public class MaterialWarehouseCheckService
		extends MaterialInventoryBusinessLogic<IMaterialWarehouseCheckContract, IBusinessObjectProxy> {

	@Override
	protected IBusinessObjectProxy fetchBeAffected(IMaterialWarehouseCheckContract contract) {
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
	protected void impact(IMaterialWarehouseCheckContract contract) {
		if (DataConvert.isNullOrEmpty(contract.getItemCode())) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_document_not_specified_material", contract.getIdentifiers()));
		}
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (!material.getCode().equals(contract.getItemCode())) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_exist", contract.getItemCode()));
		}
		// 库存物料、非服务物料
		if (material.getInventoryItem() == emYesNo.YES || material.getItemType() != emItemType.SERVICES) {
			// 检查仓库是否有效
			if (DataConvert.isNullOrEmpty(contract.getWarehouse())) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_specified_warehouse", contract.getIdentifiers()));
			}
			IWarehouse warehouse = this.checkWarehouse(contract.getWarehouse());
			if (!warehouse.getCode().equals(contract.getWarehouse())) {
				throw new BusinessLogicException(I18N.prop("msg_mm_warehouse_is_not_exist", contract.getWarehouse()));
			}
			// 批次管理物料
			if (material.getBatchManagement() == emYesNo.YES) {
				// 检查管理标记
				if (material.getBatchManagement() != contract.getBatchManagement()) {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_document_batchmanagement_is_not_same_material_setting",
									contract.getIdentifiers(), contract.getItemCode()));
				}
				if (material.getVersionManagement() == emYesNo.YES) {
					if (DataConvert.isNullOrEmpty(contract.getItemVersion())) {
						throw new BusinessLogicException(
								I18N.prop("msg_mm_document_not_specified_material_version", contract.getIdentifiers()));
					}
				}
			}
			// 序列号管理物料
			if (material.getSerialManagement() == emYesNo.YES) {
				// 检查管理标记
				if (material.getSerialManagement() != contract.getSerialManagement()) {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_document_serialmanagement_is_not_same_material_setting",
									contract.getIdentifiers(), contract.getItemCode()));
				}
				if (material.getVersionManagement() == emYesNo.YES) {
					if (DataConvert.isNullOrEmpty(contract.getItemVersion())) {
						throw new BusinessLogicException(
								I18N.prop("msg_mm_document_not_specified_material_version", contract.getIdentifiers()));
					}
				}
			}
		}

	}

	@Override
	protected void revoke(IMaterialWarehouseCheckContract contract) {

	}

}
