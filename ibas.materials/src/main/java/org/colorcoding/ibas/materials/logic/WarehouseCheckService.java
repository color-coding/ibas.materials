package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;

/**
 * 供应商检查服务
 * 
 * @author Niuren.Zhu
 *
 */
@LogicContract(IWarehouseCheckContract.class)
public class WarehouseCheckService extends MaterialInventoryBusinessLogic<IWarehouseCheckContract, IWarehouse> {

	@Override
	protected IWarehouse fetchBeAffected(IWarehouseCheckContract contract) {
		IWarehouse warehouse = this.checkWarehouse(contract.getWarehouseCode());
		if (warehouse.getActivated() == emYesNo.NO) {
			throw new BusinessLogicException(String.format(I18N.prop("msg_mm_warehouse_is_unavailable"),
					warehouse.getCode(), warehouse.getName()));
		}
		if (warehouse.getDeleted() == emYesNo.YES) {
			throw new BusinessLogicException(String.format(I18N.prop("msg_mm_warehouse_is_unavailable"),
					warehouse.getCode(), warehouse.getName()));
		}
		return warehouse;
	}

	@Override
	protected void impact(IWarehouseCheckContract contract) {
		if (this.getBeAffected().getReferenced() == emYesNo.NO) {
			this.getBeAffected().setReferenced(emYesNo.YES);
		}
	}

	@Override
	protected void revoke(IWarehouseCheckContract contract) {
	}

}
