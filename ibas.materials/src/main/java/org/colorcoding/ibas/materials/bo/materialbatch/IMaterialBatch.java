package org.colorcoding.ibas.materials.bo.materialbatch;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 物料批次 接口
 *
 */
public interface IMaterialBatch extends IBOSimple {

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
	 * 获取-批次编码
	 *
	 * @return 值
	 */
	String getBatchCode();

	/**
	 * 设置-批次编码
	 *
	 * @param value 值
	 */
	void setBatchCode(String value);

	/**
	 * 获取-仓库编码
	 *
	 * @return 值
	 */
	String getWarehouse();

	/**
	 * 设置-仓库编码
	 *
	 * @param value 值
	 */
	void setWarehouse(String value);

	/**
	 * 获取-数量
	 *
	 * @return 值
	 */
	BigDecimal getQuantity();

	/**
	 * 设置-数量
	 *
	 * @param value 值
	 */
	void setQuantity(BigDecimal value);

	/**
	 * 设置-数量
	 *
	 * @param value 值
	 */
	void setQuantity(String value);

	/**
	 * 设置-数量
	 *
	 * @param value 值
	 */
	void setQuantity(int value);

	/**
	 * 设置-数量
	 *
	 * @param value 值
	 */
	void setQuantity(double value);

	/**
	 * 获取-锁定
	 *
	 * @return 值
	 */
	emYesNo getLocked();

	/**
	 * 设置-锁定
	 *
	 * @param value 值
	 */
	void setLocked(emYesNo value);

	/**
	 * 获取-预留数量
	 * 
	 * @return 值
	 */
	BigDecimal getReservedQuantity();

	/**
	 * 设置-预留数量
	 * 
	 * @param value 值
	 */
	void setReservedQuantity(BigDecimal value);

	/**
	 * 获取-供应商序号
	 *
	 * @return 值
	 */
	String getSupplierSerial();

	/**
	 * 设置-供应商序号
	 *
	 * @param value 值
	 */
	void setSupplierSerial(String value);

	/**
	 * 获取-过期日期
	 *
	 * @return 值
	 */
	DateTime getExpirationDate();

	/**
	 * 设置-过期日期
	 *
	 * @param value 值
	 */
	void setExpirationDate(DateTime value);

	/**
	 * 获取-生产日期
	 *
	 * @return 值
	 */
	DateTime getManufacturingDate();

	/**
	 * 设置-生产日期
	 *
	 * @param value 值
	 */
	void setManufacturingDate(DateTime value);

	/**
	 * 获取-准入日期
	 *
	 * @return 值
	 */
	DateTime getAdmissionDate();

	/**
	 * 设置-准入日期
	 *
	 * @param value 值
	 */
	void setAdmissionDate(DateTime value);

	/**
	 * 获取-物料规格
	 * 
	 * @return 值
	 */
	Integer getSpecification();

	/**
	 * 设置-物料规格
	 * 
	 * @param value 值
	 */
	void setSpecification(Integer value);

	/**
	 * 获取-物料版本
	 * 
	 * @return 值
	 */
	String getVersion();

	/**
	 * 设置-物料版本
	 * 
	 * @param value 值
	 */
	void setVersion(String value);

	/**
	 * 获取-位置
	 * 
	 * @return 值
	 */
	String getLocation();

	/**
	 * 设置-位置
	 * 
	 * @param value 值
	 */
	void setLocation(String value);

	/**
	 * 获取-备注
	 *
	 * @return 值
	 */
	String getNotes();

	/**
	 * 设置-备注
	 *
	 * @param value 值
	 */
	void setNotes(String value);

	/**
	 * 获取-基于类型
	 * 
	 * @return 值
	 */
	String getBaseDocumentType();

	/**
	 * 设置-基于类型
	 * 
	 * @param value 值
	 */
	void setBaseDocumentType(String value);

	/**
	 * 获取-基于标识
	 * 
	 * @return 值
	 */
	Integer getBaseDocumentEntry();

	/**
	 * 设置-基于标识
	 * 
	 * @param value 值
	 */
	void setBaseDocumentEntry(Integer value);

	/**
	 * 获取-基于行号
	 * 
	 * @return 值
	 */
	Integer getBaseDocumentLineId();

	/**
	 * 设置-基于行号
	 * 
	 * @param value 值
	 */
	void setBaseDocumentLineId(Integer value);

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

}
