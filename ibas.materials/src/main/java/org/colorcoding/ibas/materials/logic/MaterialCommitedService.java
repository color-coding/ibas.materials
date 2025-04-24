package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialCommitedContract.class)
public class MaterialCommitedService extends MaterialInventoryBusinessLogic<IMaterialCommitedContract, IMaterial> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialCommitedContract) {
			IMaterialCommitedContract contract = (IMaterialCommitedContract) data;
			if (contract.getQuantity().compareTo(Decimals.VALUE_ZERO) <= 0) {
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
	protected IMaterial fetchBeAffected(IMaterialCommitedContract contract) {
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
		if (done) {
			return false;
		}
		return true;
	}

	@Override
	protected boolean onRepeatedRevoke(int times) {
		if (done) {
			return false;
		}
		return true;
	}

	private boolean done;

	@Override
	protected void impact(IMaterialCommitedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onCommited = material.getOnCommited();
		onCommited = onCommited.add(contract.getQuantity());
		material.setOnCommited(onCommited);
		if (this.getTrigger() instanceof IBusinessObject && ((IBusinessObject) this.getTrigger()).isBusy()) {
			this.done = true;
		}
	}

	@Override
	protected void revoke(IMaterialCommitedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onCommited = material.getOnCommited();
		onCommited = onCommited.subtract(contract.getQuantity());
		material.setOnCommited(onCommited);
		if (this.getTrigger() instanceof IBusinessObject && ((IBusinessObject) this.getTrigger()).isBusy()) {
			this.done = true;
		}
	}
}
