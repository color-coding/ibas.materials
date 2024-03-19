package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.Iterator;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料价格检查
 */
public interface IMaterialPriceCheckContract extends IBusinessLogicContract {

	/**
	 * 比较方向（OUT：不低于；IN：不高于）
	 * 
	 * @return
	 */
	default emDirection getDirection() {
		return emDirection.OUT;
	}

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
	Iterator<IMaterialPrice> getMaterialPrices();

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
