package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.Strings;
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
	 * 单位
	 *
	 * @return
	 */
	default String getUOM() {
		return Strings.VALUE_EMPTY;
	}

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
	default String getCurrency() {
		return Strings.VALUE_EMPTY;
	}
}
