package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialCommitedContract.class)
public class MaterialCommitedService extends MaterialInventoryBusinessLogic<IMaterialCommitedContract, IMaterial> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialCommitedContract) {
			IMaterialCommitedContract contract = (IMaterialCommitedContract) data;
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
			if (contract.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterial fetchBeAffected(IMaterialCommitedContract contract) {
		return this.checkMaterial(contract.getItemCode());
	}

	@Override
	protected void impact(IMaterialCommitedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onCommited = material.getOnCommited();
		if (contract.getDirection() == emDirection.OUT) {
			onCommited = onCommited.subtract(contract.getQuantity());
		} else {
			onCommited = onCommited.add(contract.getQuantity());
		}
		material.setOnCommited(onCommited);
	}

	@Override
	protected void revoke(IMaterialCommitedContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onCommited = material.getOnCommited();
		if (contract.getDirection() == emDirection.OUT) {
			onCommited = onCommited.add(contract.getQuantity());
		} else {
			onCommited = onCommited.subtract(contract.getQuantity());
		}
		material.setOnCommited(onCommited);
	}
}
