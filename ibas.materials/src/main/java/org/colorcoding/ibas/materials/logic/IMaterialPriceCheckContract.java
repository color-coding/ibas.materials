package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料价格检查
 */
public interface IMaterialPriceCheckContract extends IBusinessLogicContract {
	/**
	 * 价格清单编号
	 *
	 * @return
	 */
	Integer getPriceList();

	/**
	 * 物料价格集合
	 * 
	 * @return
	 */
	Iterable<IMaterialPrice> getMaterialPrices();

	/**
	 * 物料价格
	 * 
	 * @author Niuren.Zhu
	 *
	 */
	public interface IMaterialPrice {
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
}
