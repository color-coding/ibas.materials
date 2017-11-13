package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 获取生成物料价格清单的契约
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

}
