package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

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
	BigDecimal getPrice();

	/**
	 * 货币
	 * 
	 * @return 值
	 */
	String getCurrency();
}
