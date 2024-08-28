package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;

/**
 * 物料数量
 */
public interface IMaterialQuantity {
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
	 * 设置-物料编码
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
	 * @param value 值
	 */
	void setItemName(String value);

	/**
	 * 获取-物料标识
	 * 
	 * @return 值
	 */
	String getItemSign();

	/**
	 * 设置-物料标识
	 * 
	 * @param value 值
	 */
	void setItemSign(String value);

	/**
	 * 获取-库存
	 *
	 * @return
	 */
	BigDecimal getOnHand();

	/**
	 * 设置-库存
	 *
	 * @param value
	 */
	void setOnHand(BigDecimal value);

	/**
	 * 设置-库存
	 *
	 * @param value
	 */
	void setOnHand(int value);

	/**
	 * 设置-库存
	 *
	 * @param value
	 */
	void setOnHand(double value);

	/**
	 * 获取-已承诺
	 *
	 * @return
	 */
	BigDecimal getOnCommited();

	/**
	 * 设置-已承诺
	 *
	 * @param value
	 */
	void setOnCommited(BigDecimal value);

	/**
	 * 设置-已承诺
	 *
	 * @param value
	 */
	void setOnCommited(int value);

	/**
	 * 设置-已承诺
	 *
	 * @param value
	 */
	void setOnCommited(double value);

	/**
	 * 获取-已订购
	 *
	 * @return
	 */
	BigDecimal getOnOrdered();

	/**
	 * 设置-已订购
	 *
	 * @param value
	 */
	void setOnOrdered(BigDecimal value);

	/**
	 * 设置-已订购
	 *
	 * @param value
	 */
	void setOnOrdered(int value);

	/**
	 * 设置-已订购
	 *
	 * @param value
	 */
	void setOnOrdered(double value);

	/**
	 * 获取-已预留
	 *
	 * @return
	 */
	BigDecimal getOnReserved();

	/**
	 * 设置-已预留
	 *
	 * @param value
	 */
	void setOnReserved(BigDecimal value);

	/**
	 * 设置-已预留
	 *
	 * @param value
	 */
	void setOnReserved(int value);

	/**
	 * 设置-已预留
	 *
	 * @param value
	 */
	void setOnReserved(double value);

	/**
	 * 获取-库存单位
	 * 
	 * @return
	 */
	String getUOM();

	/**
	 * 设置-库存单位
	 * 
	 * @param uom
	 */
	void setUOM(String uom);

	/**
	 * 获取-可用数量（库存数+已订购-已承诺）
	 * 
	 * @return
	 */
	BigDecimal getOnAvailable();

	/**
	 * 获取-全部库存
	 *
	 * @return
	 */
	BigDecimal getTotalHand();

	/**
	 * 设置-全部库存
	 *
	 * @param value
	 */
	void setTotalHand(BigDecimal value);

	/**
	 * 设置-全部库存
	 *
	 * @param value
	 */
	void setTotalHand(int value);

	/**
	 * 设置-全部库存
	 *
	 * @param value
	 */
	void setTotalHand(double value);

	/**
	 * 获取-全部已承诺
	 *
	 * @return
	 */
	BigDecimal getTotalCommited();

	/**
	 * 设置-全部已承诺
	 *
	 * @param value
	 */
	void setTotalCommited(BigDecimal value);

	/**
	 * 设置-全部已承诺
	 *
	 * @param value
	 */
	void setTotalCommited(int value);

	/**
	 * 设置-全部已承诺
	 *
	 * @param value
	 */
	void setTotalCommited(double value);

	/**
	 * 获取-全部已订购
	 *
	 * @return
	 */
	BigDecimal getTotalOrdered();

	/**
	 * 设置-全部已订购
	 *
	 * @param value
	 */
	void setTotalOrdered(BigDecimal value);

	/**
	 * 设置-全部已订购
	 *
	 * @param value
	 */
	void setTotalOrdered(int value);

	/**
	 * 设置-全部已订购
	 *
	 * @param value
	 */
	void setTotalOrdered(double value);

	/**
	 * 获取-全部已预留
	 *
	 * @return
	 */
	BigDecimal getTotalReserved();

	/**
	 * 设置-全部已预留
	 *
	 * @param value
	 */
	void setTotalReserved(BigDecimal value);

	/**
	 * 设置-全部已预留
	 *
	 * @param value
	 */
	void setTotalReserved(int value);

	/**
	 * 设置-全部已预留
	 *
	 * @param value
	 */
	void setTotalReserved(double value);
}
