package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料仓库冻结契约，冻结后不可修改库存数量
 */
public interface IMaterialWarehouseFrozenContract extends IBusinessLogicContract {

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
	 * 冻结
	 *
	 * @return
	 */
	emYesNo getFreeze();
}
