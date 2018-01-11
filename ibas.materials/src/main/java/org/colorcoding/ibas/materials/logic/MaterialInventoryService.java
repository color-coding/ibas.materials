package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;

@LogicContract(IMaterialInventoryContract.class)
public class MaterialInventoryService extends MaterialInventoryBusinessLogic<IMaterialInventoryContract, IMaterial> {
	@Override
	protected IMaterial fetchBeAffected(IMaterialInventoryContract contract) {
		return this.checkMaterial(contract.getItemCode());
	}

	@Override
	protected void impact(IMaterialInventoryContract contract) {
		IMaterial material = this.getBeAffected();
		Decimal onHand = material.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.subtract(contract.getQuantity());
		} else {
			onHand = onHand.add(contract.getQuantity());
		}
		material.setOnHand(onHand);
	}

	@Override
	protected void revoke(IMaterialInventoryContract contract) {
		IMaterial material = this.getBeAffected();
		Decimal onHand = material.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.add(contract.getQuantity());
		} else {
			onHand = onHand.subtract(contract.getQuantity());
		}
		material.setOnHand(onHand);
	}
}
