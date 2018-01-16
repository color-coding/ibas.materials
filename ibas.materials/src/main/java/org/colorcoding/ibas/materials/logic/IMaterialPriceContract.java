package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料价格契约，记录价格到价格清单
 */
public interface IMaterialPriceContract extends IBusinessLogicContract {
	/**
	 * 价格清单编号
	 *
	 * @return
	 */
	Integer getPriceList();

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 价格
	 *
	 * @return
	 */
	Decimal getPrice();

	/**
	 * 币种
	 * 
	 * @return 值
	 */
	String getCurrency();
}
