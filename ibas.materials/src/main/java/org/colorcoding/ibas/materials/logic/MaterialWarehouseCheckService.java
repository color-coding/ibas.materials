package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialWarehouseCheckContract.class)
public class MaterialWarehouseCheckService
		extends MaterialInventoryBusinessLogic<IMaterialWarehouseCheckContract, IBusinessObject> {

	@Override
	protected IBusinessObject fetchBeAffected(IMaterialWarehouseCheckContract contract) {
		return BOUtilities.VALUE_EMPTY;
	}

	@Override
	protected void impact(IMaterialWarehouseCheckContract contract) {
		if (Strings.isNullOrEmpty(contract.getItemCode())) {
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
			if (contract.getWarehouse() == null) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_specified_warehouse", contract.getIdentifiers()));
			}
			// 空值则不检查
			if (!Strings.isNullOrEmpty(contract.getWarehouse())) {
				IWarehouse warehouse = this.checkWarehouse(contract.getWarehouse());
				if (!warehouse.getCode().equals(contract.getWarehouse())) {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_warehouse_is_not_exist", contract.getWarehouse()));
				}
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
					if (Strings.isNullOrEmpty(contract.getItemVersion())) {
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
					if (Strings.isNullOrEmpty(contract.getItemVersion())) {
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
