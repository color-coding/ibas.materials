package org.colorcoding.ibas.materials.bo.materialinventory;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 物料库存 接口
 * 
 */
public interface IMaterialInventory extends IBOSimple {

	/**
	 * 获取-物料编码
	 * 
	 * @return 值
	 */
	String getItemCode();

	/**
	 * 设置-物料编码
	 * 
	 * @param value 值
	 */
	void setItemCode(String value);

	/**
	 * 获取-仓库编号
	 * 
	 * @return 值
	 */
	String getWarehouse();

	/**
	 * 设置-仓库编号
	 * 
	 * @param value 值
	 */
	void setWarehouse(String value);

	/**
	 * 获取-冻结的
	 * 
	 * @return 值
	 */
	emYesNo getFrozen();

	/**
	 * 设置-冻结的
	 * 
	 * @param value 值
	 */
	void setFrozen(emYesNo value);

	/**
	 * 获取-价格
	 * 
	 * @return 值
	 */
	BigDecimal getAvgPrice();

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setAvgPrice(BigDecimal value);

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setAvgPrice(String value);

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setAvgPrice(int value);

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setAvgPrice(double value);

	/**
	 * 获取-库存
	 * 
	 * @return 值
	 */
	BigDecimal getOnHand();

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	void setOnHand(BigDecimal value);

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	void setOnHand(String value);

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	void setOnHand(int value);

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	void setOnHand(double value);

	/**
	 * 获取-已承诺
	 * 
	 * @return 值
	 */
	BigDecimal getOnCommited();

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	void setOnCommited(BigDecimal value);

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	void setOnCommited(String value);

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	void setOnCommited(int value);

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	void setOnCommited(double value);

	/**
	 * 获取-已订购
	 * 
	 * @return 值
	 */
	BigDecimal getOnOrdered();

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	void setOnOrdered(BigDecimal value);

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	void setOnOrdered(String value);

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	void setOnOrdered(int value);

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	void setOnOrdered(double value);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	Integer getObjectKey();

	/**
	 * 设置-对象编号
	 * 
	 * @param value 值
	 */
	void setObjectKey(Integer value);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-对象类型
	 * 
	 * @param value 值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	DateTime getCreateDate();

	/**
	 * 设置-创建日期
	 * 
	 * @param value 值
	 */
	void setCreateDate(DateTime value);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	Short getCreateTime();

	/**
	 * 设置-创建时间
	 * 
	 * @param value 值
	 */
	void setCreateTime(Short value);

	/**
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	DateTime getUpdateDate();

	/**
	 * 设置-修改日期
	 * 
	 * @param value 值
	 */
	void setUpdateDate(DateTime value);

	/**
	 * 获取-修改时间
	 * 
	 * @return 值
	 */
	Short getUpdateTime();

	/**
	 * 设置-修改时间
	 * 
	 * @param value 值
	 */
	void setUpdateTime(Short value);

	/**
	 * 获取-版本
	 * 
	 * @return 值
	 */
	Integer getLogInst();

	/**
	 * 设置-版本
	 * 
	 * @param value 值
	 */
	void setLogInst(Integer value);

	/**
	 * 获取-服务系列
	 * 
	 * @return 值
	 */
	Integer getSeries();

	/**
	 * 设置-服务系列
	 * 
	 * @param value 值
	 */
	void setSeries(Integer value);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	String getDataSource();

	/**
	 * 设置-数据源
	 * 
	 * @param value 值
	 */
	void setDataSource(String value);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	Integer getCreateUserSign();

	/**
	 * 设置-创建用户
	 * 
	 * @param value 值
	 */
	void setCreateUserSign(Integer value);

	/**
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	Integer getUpdateUserSign();

	/**
	 * 设置-修改用户
	 * 
	 * @param value 值
	 */
	void setUpdateUserSign(Integer value);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	String getCreateActionId();

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value 值
	 */
	void setCreateActionId(String value);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	String getUpdateActionId();

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value 值
	 */
	void setUpdateActionId(String value);

	/**
	 * 获取-可用数量（库存数+已订购-已承诺）
	 * 
	 * @return
	 */
	BigDecimal getOnAvailable();
}
