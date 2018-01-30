package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.data.emItemType;

/**
 * 物料 接口
 * 
 */
public interface IProduct {

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	String getCode();

	/**
	 * 设置-编码
	 * 
	 * @param value
	 *            值
	 */
	void setCode(String value);

	/**
	 * 获取-名称
	 * 
	 * @return 值
	 */
	String getName();

	/**
	 * 设置-名称
	 * 
	 * @param value
	 *            值
	 */
	void setName(String value);

	/**
	 * 获取-外文名称
	 * 
	 * @return 值
	 */
	String getForeignName();

	/**
	 * 设置-外文名称
	 * 
	 * @param value
	 *            值
	 */
	void setForeignName(String value);

	/**
	 * 获取-物料组
	 * 
	 * @return 值
	 */
	String getGroup();

	/**
	 * 设置-物料组
	 * 
	 * @param value
	 *            值
	 */
	void setGroup(String value);

	/**
	 * 获取-激活
	 * 
	 * @return 值
	 */
	emYesNo getActivated();

	/**
	 * 设置-激活
	 * 
	 * @param value
	 *            值
	 */
	void setActivated(emYesNo value);

	/**
	 * 获取-条形码
	 * 
	 * @return 值
	 */
	String getBarCode();

	/**
	 * 设置-条形码
	 * 
	 * @param value
	 *            值
	 */
	void setBarCode(String value);

	/**
	 * 获取-物料类型
	 * 
	 * @return 值
	 */
	emItemType getItemType();

	/**
	 * 设置-物料类型
	 * 
	 * @param value
	 *            值
	 */
	void setItemType(emItemType value);

	/**
	 * 获取-采购物料
	 * 
	 * @return 值
	 */
	emYesNo getPurchaseItem();

	/**
	 * 设置-采购物料
	 * 
	 * @param value
	 *            值
	 */
	void setPurchaseItem(emYesNo value);

	/**
	 * 获取-销售物料
	 * 
	 * @return 值
	 */
	emYesNo getSalesItem();

	/**
	 * 设置-销售物料
	 * 
	 * @param value
	 *            值
	 */
	void setSalesItem(emYesNo value);

	/**
	 * 获取-库存物料
	 * 
	 * @return 值
	 */
	emYesNo getInventoryItem();

	/**
	 * 设置-库存物料
	 * 
	 * @param value
	 *            值
	 */
	void setInventoryItem(emYesNo value);

	/**
	 * 获取-虚拟物料
	 * 
	 * @return 值
	 */
	emYesNo getPhantomItem();

	/**
	 * 设置-虚拟物料
	 * 
	 * @param value
	 *            值
	 */
	void setPhantomItem(emYesNo value);

	/**
	 * 获取-仓库
	 * 
	 * @return 值
	 */
	String getWarehouse();

	/**
	 * 设置-仓库
	 * 
	 * @param value
	 *            值
	 */
	void setWarehouse(String value);

	/**
	 * 获取-库存单位
	 * 
	 * @return 值
	 */
	String getInventoryUOM();

	/**
	 * 设置-库存单位
	 * 
	 * @param value
	 *            值
	 */
	void setInventoryUOM(String value);

	/**
	 * 获取-价格
	 * 
	 * @return 值
	 */
	Decimal getPrice();

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	void setPrice(Decimal value);

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	void setPrice(String value);

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	void setPrice(int value);

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
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

	/**
	 * 获取-库存
	 * 
	 * @return 值
	 */
	Decimal getOnHand();

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	void setOnHand(Decimal value);

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	void setOnHand(String value);

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	void setOnHand(int value);

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	void setOnHand(double value);

	/**
	 * 获取-已承诺
	 * 
	 * @return 值
	 */
	Decimal getOnCommited();

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	void setOnCommited(Decimal value);

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	void setOnCommited(String value);

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	void setOnCommited(int value);

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	void setOnCommited(double value);

	/**
	 * 获取-已订购
	 * 
	 * @return 值
	 */
	Decimal getOnOrdered();

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	void setOnOrdered(Decimal value);

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	void setOnOrdered(String value);

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	void setOnOrdered(int value);

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	void setOnOrdered(double value);

	/**
	 * 获取-序号管理
	 * 
	 * @return 值
	 */
	emYesNo getSerialManagement();

	/**
	 * 设置-序号管理
	 * 
	 * @param value
	 *            值
	 */
	void setSerialManagement(emYesNo value);

	/**
	 * 获取-批号管理
	 * 
	 * @return 值
	 */
	emYesNo getBatchManagement();

	/**
	 * 设置-批号管理
	 * 
	 * @param value
	 *            值
	 */
	void setBatchManagement(emYesNo value);

	/**
	 * 获取-生效日期
	 * 
	 * @return 值
	 */
	DateTime getValidDate();

	/**
	 * 设置-生效日期
	 * 
	 * @param value
	 *            值
	 */
	void setValidDate(DateTime value);

	/**
	 * 获取-失效日期
	 * 
	 * @return 值
	 */
	DateTime getInvalidDate();

	/**
	 * 设置-失效日期
	 * 
	 * @param value
	 *            值
	 */
	void setInvalidDate(DateTime value);

	/**
	 * 获取-图片
	 * 
	 * @return 值
	 */
	String getPicture();

	/**
	 * 设置-图片
	 * 
	 * @param value
	 *            值
	 */
	void setPicture(String value);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	Integer getDocEntry();

	/**
	 * 设置-对象编号
	 * 
	 * @param value
	 *            值
	 */
	void setDocEntry(Integer value);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-对象类型
	 * 
	 * @param value
	 *            值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-数据所有者
	 * 
	 * @return 值
	 */
	Integer getDataOwner();

	/**
	 * 设置-数据所有者
	 * 
	 * @param value
	 *            值
	 */
	void setDataOwner(Integer value);

	/**
	 * 获取-数据所属组织
	 * 
	 * @return 值
	 */
	String getOrganization();

	/**
	 * 设置-数据所属组织
	 * 
	 * @param value
	 *            值
	 */
	void setOrganization(String value);

}
