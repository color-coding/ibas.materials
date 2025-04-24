package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialReservedContract.class)
public class MaterialReservedService extends MaterialInventoryBusinessLogic<IMaterialReservedContract, IMaterial> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialReservedContract) {
			IMaterialReservedContract contract = (IMaterialReservedContract) data;
			if (contract.getStatus() == emBOStatus.CLOSED && this.impactReserved.compareTo(Decimals.VALUE_ZERO) == 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Status",
						contract.getStatus());
				return false;
			}
			if (contract.getQuantity().compareTo(Decimals.VALUE_ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES) {
				// 服务物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "ItemType",
						material.getItemType());
				return false;
			}
			if (material.getPhantomItem() == emYesNo.YES) {
				// 虚拟物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"PhantomItem", material.getPhantomItem());
				return false;
			}
			if (material.getInventoryItem() == emYesNo.NO) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				// 非库存物料，不执行此逻辑
				return false;
			}
			if (this.checkWarehouse(contract.getWarehouse()).getReservable() == emYesNo.NO) {
				// 不可预留仓库
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"Warehouse Reservable", "NO");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterial fetchBeAffected(IMaterialReservedContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 服务物料，不执行此逻辑
		if (material.getItemType() == emItemType.SERVICES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_service_item", material.getCode()));
		}
		// 虚拟物料，不执行此逻辑
		if (material.getPhantomItem() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_phantom_item", material.getCode()));
		}
		// 非库存物料，不执行此逻辑
		if (material.getInventoryItem() == emYesNo.NO) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_inventory_item", material.getCode()));
		}
		return material;
	}

	@Override
	protected boolean onRepeatedImpact(int times) {
		return true;
	}

	@Override
	protected boolean onRepeatedRevoke(int times) {
		return true;
	}

	BigDecimal impactReserved = Decimals.VALUE_ZERO;

	@Override
	protected void impact(IMaterialReservedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onReserved = material.getOnReserved();
		// 减去上次增加值（同物料多行时）,关闭时数量零
		onReserved = onReserved.subtract(this.impactReserved)
				.add(contract.getStatus() == emBOStatus.CLOSED ? Decimals.VALUE_ZERO : contract.getQuantity());
		material.setOnReserved(onReserved);
		// 记录本次增加值,关闭时数量零
		this.impactReserved = impactReserved
				.add(contract.getStatus() == emBOStatus.CLOSED ? Decimals.VALUE_ZERO : contract.getQuantity());
	}

	BigDecimal revokeReserved = Decimals.VALUE_ZERO;

	@Override
	protected void revoke(IMaterialReservedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onReserved = material.getOnReserved();
		// 减去上次增加值（同物料多行时）
		onReserved = onReserved.add(this.revokeReserved).subtract(contract.getQuantity());
		material.setOnReserved(onReserved);
		// 记录本次增加值
		this.revokeReserved = revokeReserved.add(contract.getQuantity());
	}
}
