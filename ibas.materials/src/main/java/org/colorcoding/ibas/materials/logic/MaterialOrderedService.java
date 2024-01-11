package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialOrderedContract.class)
public class MaterialOrderedService extends MaterialInventoryBusinessLogic<IMaterialOrderedContract, IMaterial> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialOrderedContract) {
			IMaterialOrderedContract contract = (IMaterialOrderedContract) data;
			if (contract.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
			if (contract.getStatus() == emBOStatus.CLOSED) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Status",
						contract.getStatus());
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterial fetchBeAffected(IMaterialOrderedContract contract) {
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
		if ((times - this.timesRevoke) > 1) {
			return false;
		}
		return true;
	}

	private int timesRevoke;

	@Override
	protected boolean onRepeatedRevoke(int times) {
		this.timesRevoke = times;
		return true;
	}

	@Override
	protected void impact(IMaterialOrderedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onOrdered = material.getOnOrdered();
		onOrdered = onOrdered.add(contract.getQuantity());
		material.setOnOrdered(onOrdered);
	}

	@Override
	protected void revoke(IMaterialOrderedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onOrdered = material.getOnOrdered();
		onOrdered = onOrdered.subtract(contract.getQuantity());
		material.setOnOrdered(onOrdered);
	}
}
