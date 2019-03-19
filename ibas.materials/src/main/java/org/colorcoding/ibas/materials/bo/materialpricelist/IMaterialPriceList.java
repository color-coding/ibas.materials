package org.colorcoding.ibas.materials.bo.materialpricelist;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;

/**
 * 物料价格清单 接口
 * 
 */
public interface IMaterialPriceList extends IBOSimple {

	/**
	 * 获取-名称
	 * 
	 * @return 值
	 */
	String getName();

	/**
	 * 设置-名称
	 * 
	 * @param value 值
	 */
	void setName(String value);

	/**
	 * 获取-分组
	 * 
	 * @return 值
	 */
	String getGroup();

	/**
	 * 设置-分组
	 * 
	 * @param value 值
	 */
	void setGroup(String value);

	/**
	 * 获取-货币
	 * 
	 * @return 值
	 */
	String getCurrency();

	/**
	 * 设置-货币
	 * 
	 * @param value 值
	 */
	void setCurrency(String value);

	/**
	 * 获取-基于的清单
	 * 
	 * @return 值
	 */
	Integer getBasedOnList();

	/**
	 * 设置-基于的清单
	 * 
	 * @param value 值
	 */
	void setBasedOnList(Integer value);

	/**
	 * 获取-系数
	 * 
	 * @return 值
	 */
	BigDecimal getFactor();

	/**
	 * 设置-系数
	 * 
	 * @param value 值
	 */
	void setFactor(BigDecimal value);

	/**
	 * 设置-系数
	 * 
	 * @param value 值
	 */
	void setFactor(String value);

	/**
	 * 设置-系数
	 * 
	 * @param value 值
	 */
	void setFactor(int value);

	/**
	 * 设置-系数
	 * 
	 * @param value 值
	 */
	void setFactor(double value);

	/**
	 * 获取-生效日期
	 * 
	 * @return 值
	 */
	DateTime getValidDate();

	/**
	 * 设置-生效日期
	 * 
	 * @param value 值
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
	 * @param value 值
	 */
	void setInvalidDate(DateTime value);

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
	 * 获取-实例号
	 * 
	 * @return 值
	 */
	Integer getLogInst();

	/**
	 * 设置-实例号
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
	 * 获取-更新日期
	 * 
	 * @return 值
	 */
	DateTime getUpdateDate();

	/**
	 * 设置-更新日期
	 * 
	 * @param value 值
	 */
	void setUpdateDate(DateTime value);

	/**
	 * 获取-更新时间
	 * 
	 * @return 值
	 */
	Short getUpdateTime();

	/**
	 * 设置-更新时间
	 * 
	 * @param value 值
	 */
	void setUpdateTime(Short value);

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
	 * 获取-更新用户
	 * 
	 * @return 值
	 */
	Integer getUpdateUserSign();

	/**
	 * 设置-更新用户
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
	 * 获取-数据所有者
	 * 
	 * @return 值
	 */
	Integer getDataOwner();

	/**
	 * 设置-数据所有者
	 * 
	 * @param value 值
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
	 * @param value 值
	 */
	void setOrganization(String value);

	/**
	 * 获取-物料价格项目集合
	 * 
	 * @return 值
	 */
	IMaterialPriceItems getMaterialPriceItems();

	/**
	 * 设置-物料价格项目集合
	 * 
	 * @param value 值
	 */
	void setMaterialPriceItems(IMaterialPriceItems value);

}
