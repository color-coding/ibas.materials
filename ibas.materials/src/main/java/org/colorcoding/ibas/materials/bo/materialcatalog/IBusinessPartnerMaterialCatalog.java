package org.colorcoding.ibas.materials.bo.materialcatalog;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.businesspartner.data.emBusinessPartnerType;

/**
* 业务伙伴物料目录 接口
* 
*/
public interface IBusinessPartnerMaterialCatalog extends IBOSimple {

	/**
	* 获取-业务伙伴类型
	* 
	* @return 值
	*/
	emBusinessPartnerType getBusinessPartnerType();

	/**
	* 设置-业务伙伴类型
	* 
	* @param value 值
	*/
	void setBusinessPartnerType(emBusinessPartnerType value);

	/**
	* 获取-业务伙伴代码
	* 
	* @return 值
	*/
	String getBusinessPartnerCode();

	/**
	* 设置-业务伙伴代码
	* 
	* @param value 值
	*/
	void setBusinessPartnerCode(String value);

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
	* 获取-目录编码
	* 
	* @return 值
	*/
	String getCatalogCode();

	/**
	* 设置-目录编码
	* 
	* @param value 值
	*/
	void setCatalogCode(String value);

	/**
	* 获取-目录名称
	* 
	* @return 值
	*/
	String getCatalogName();

	/**
	* 设置-目录名称
	* 
	* @param value 值
	*/
	void setCatalogName(String value);

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
}
