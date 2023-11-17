package org.colorcoding.ibas.materials.bo.picklists;

import java.math.*;

import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.materials.data.emPickStatus;

/**
 * 拣配清单 接口
 */
public interface IPickLists extends IBOSimple {

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
	 * 获取-参考1
	 *
	 * @return 值
	 */
	String getReference1();

	/**
	 * 设置-参考1
	 *
	 * @param value 值
	 */
	void setReference1(String value);


	/**
	 * 获取-参考2
	 *
	 * @return 值
	 */
	String getReference2();

	/**
	 * 设置-参考2
	 *
	 * @param value 值
	 */
	void setReference2(String value);


	/**
	 * 获取-备注
	 *
	 * @return 值
	 */
	String getRemarks();

	/**
	 * 设置-备注
	 *
	 * @param value 值
	 */
	void setRemarks(String value);


	/**
	 * 获取-拣配员
	 *
	 * @return 值
	 */
	String getPicker();

	/**
	 * 设置-拣配员
	 *
	 * @param value 值
	 */
	void setPicker(String value);


	/**
	 * 获取-拣配日期
	 *
	 * @return 值
	 */
	DateTime getPickDate();

	/**
	 * 设置-拣配日期
	 *
	 * @param value 值
	 */
	void setPickDate(DateTime value);


	/**
	 * 获取-拣配状态
	 *
	 * @return 值
	 */
	emPickStatus getPickStatus();

	/**
	 * 设置-拣配状态
	 *
	 * @param value 值
	 */
	void setPickStatus(emPickStatus value);


	/**
	 * 获取-拣配清单-行集合
	 *
	 * @return 值
	 */
	IPickListsLines getPickListsLines();

	/**
	 * 设置-拣配清单-行集合
	 *
	 * @param value 值
	 */
	void setPickListsLines(IPickListsLines value);


}
