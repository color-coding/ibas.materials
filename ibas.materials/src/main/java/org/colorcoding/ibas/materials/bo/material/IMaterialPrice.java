package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.Decimal;

/**
 * @author Fancy
 */
public interface IMaterialPrice {
	/**
	 * 获取-价格来源
	 *
	 * @return
	 */
	String getSource();

	/**
	 * 设置-价格来源
	 *
	 * @param value
	 */
	void setSource(String value);

	/**
	 * 获取-物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 设置物料编码
	 *
	 * @param value
	 */
	void setItemCode(String value);

	/**
	 * 获取-物料名称
	 * 
	 * @return 值
	 */
	String getItemName();

	/**
	 * 设置-物料名称
	 * 
	 * @param value
	 *            值
	 */
	void setItemName(String value);

	/**
	 * 获取-价格
	 *
	 * @return
	 */
	Decimal getPrice();

	/**
	 * 设置价格
	 *
	 * @param value
	 */
	void setPrice(Decimal value);

	/**
	 * 设置价格
	 *
	 * @param value
	 */
	void setPrice(int value);

	/**
	 * 设置价格
	 *
	 * @param value
	 */
	void setPrice(double value);

	/**
	 * 获取-货币
	 *
	 * @return
	 */
	String getCurrency();

	/**
	 * 设置-货币
	 *
	 * @param value
	 */
	void setCurrency(String value);

}
