package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料订购数量契约
 */
public interface IMaterialOrderedContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 数量
	 *
	 * @return
	 */
	Decimal getQuantity();

	/**
	 * 方向
	 *
	 * @return
	 */
	default emDirection getDirection() {
		return emDirection.IN;
	}
}
