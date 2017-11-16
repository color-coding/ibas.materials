package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.Decimal;

public interface IProduct extends IMaterialBase {

	/**
	 * 获取-价格
	 *
	 * @return
	 */
	Decimal getPrice();

	/**
	 * 设置-价格
	 *
	 * @param value
	 */
	void setPrice(Decimal value);
}
