package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;

public abstract class MaterialEstimateService<L extends IBusinessLogicContract>
		extends MaterialInventoryBusinessLogic<L, IMaterialEstimateJournal> {

	private IMaterial material;

	@Override
	protected IMaterial checkMaterial(String itemCode) {
		if (this.material != null) {
			if (this.material.getCode().equals(itemCode)) {
				return this.material;
			}
		}
		this.material = super.checkMaterial(itemCode);
		return this.material;
	}

}

class _MaterialEstimateJournal extends MaterialEstimateJournal {

	private static final long serialVersionUID = 1L;

	public _MaterialEstimateJournal() {
		this.setSavable(false);
	}
}