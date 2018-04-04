package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;

@LogicContract(IMaterialCommitedContract.class)
public class MaterialCommitedService extends MaterialInventoryBusinessLogic<IMaterialCommitedContract, IMaterial> {
	@Override
	protected IMaterial fetchBeAffected(IMaterialCommitedContract contract) {
		return this.checkMaterial(contract.getItemCode());
	}

	@Override
	protected void impact(IMaterialCommitedContract contract) {
		IMaterial material = this.getBeAffected();
		Decimal onCommited = material.getOnCommited();
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
		Decimal onCommited = material.getOnCommited();
		if (contract.getDirection() == emDirection.OUT) {
			onCommited = onCommited.add(contract.getQuantity());
		} else {
			onCommited = onCommited.subtract(contract.getQuantity());
		}
		material.setOnCommited(onCommited);
	}
}
