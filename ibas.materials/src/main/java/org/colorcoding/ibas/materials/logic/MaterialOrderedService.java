package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;

@LogicContract(IMaterialOrderedContract.class)
public class MaterialOrderedService extends MaterialInventoryBusinessLogic<IMaterialOrderedContract, IMaterial> {
	@Override
	protected IMaterial fetchBeAffected(IMaterialOrderedContract contract) {
		return this.checkMaterial(contract.getItemCode());
	}

	@Override
	protected void impact(IMaterialOrderedContract contract) {
		IMaterial material = this.getBeAffected();
		Decimal onOrdered = material.getOnOrdered();
		if (contract.getDirection() == emDirection.OUT) {
			onOrdered = onOrdered.subtract(contract.getQuantity());
		} else {
			onOrdered = onOrdered.add(contract.getQuantity());
		}
		material.setOnOrdered(onOrdered);
	}

	@Override
	protected void revoke(IMaterialOrderedContract contract) {
		IMaterial material = this.getBeAffected();
		Decimal onOrdered = material.getOnOrdered();
		if (contract.getDirection() == emDirection.OUT) {
			onOrdered = onOrdered.add(contract.getQuantity());
		} else {
			onOrdered = onOrdered.subtract(contract.getQuantity());
		}
		material.setOnOrdered(onOrdered);
	}
}
