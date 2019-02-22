package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料仓库订购数量契约
 */
public interface IMaterialWarehouseOrderedContract extends IBusinessLogicContract {

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
	 * 数量
	 *
	 * @return
	 */
	BigDecimal getQuantity();

	/**
	 * 方向
	 *
	 * @return
	 */
	default emDirection getDirection() {
		return emDirection.IN;
	}
}
