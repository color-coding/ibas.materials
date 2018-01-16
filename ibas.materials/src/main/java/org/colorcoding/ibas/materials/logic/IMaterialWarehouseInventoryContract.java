package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料仓库库存契约，影响仓库库存
 */
public interface IMaterialWarehouseInventoryContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 仓库编码
	 *
	 * @return
	 */
	String getWarehouse();

	/**
	 * 收货数量
	 *
	 * @return
	 */
	Decimal getQuantity();

	/**
	 * 收/发货方向
	 *
	 * @return
	 */
	emDirection getDirection();
}
