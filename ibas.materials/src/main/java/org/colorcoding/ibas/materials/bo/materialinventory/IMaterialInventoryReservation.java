package org.colorcoding.ibas.materials.bo.materialinventory;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emBOStatus;

/**
 * 物料库存预留 接口
 * 
 */
public interface IMaterialInventoryReservation extends IBOSimple {

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
	 * 获取-序列编码
	 * 
	 * @return 值
	 */
	String getSerialCode();

	/**
	 * 设置-序列编码
	 * 
	 * @param value 值
	 */
	void setSerialCode(String value);

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
	 * 获取-失效时间
	 * 
	 * @return 值
	 */
	Short getInvalidTime();

	/**
	 * 设置-失效时间
	 * 
	 * @param value 值
	 */
	void setInvalidTime(Short value);

	/**
	 * 获取-目标单据类型
	 * 
	 * @return 值
	 */
	String getTargetDocumentType();

	/**
	 * 设置-目标单据类型
	 * 
	 * @param value 值
	 */
	void setTargetDocumentType(String value);

	/**
	 * 获取-目标单据编号
	 * 
	 * @return 值
	 */
	Integer getTargetDocumentEntry();

	/**
	 * 设置-目标单据编号
	 * 
	 * @param value 值
	 */
	void setTargetDocumentEntry(Integer value);

	/**
	 * 获取-目标单据行号
	 * 
	 * @return 值
	 */
	Integer getTargetDocumentLineId();

	/**
	 * 设置-目标单据行号
	 * 
	 * @param value 值
	 */
	void setTargetDocumentLineId(Integer value);

	/**
	 * 获取-原因
	 * 
	 * @return 值
	 */
	String getCauses();

	/**
	 * 设置-原因
	 * 
	 * @param value 值
	 */
	void setCauses(String value);

	/**
	 * 获取-状态
	 * 
	 * @return 值
	 */
	emBOStatus getStatus();

	/**
	 * 设置-状态
	 * 
	 * @param value 值
	 */
	void setStatus(emBOStatus value);

	/**
	 * 获取-已清数量
	 * 
	 * @return 值
	 */
	BigDecimal getClosedQuantity();

	/**
	 * 设置-已清数量
	 * 
	 * @param value 值
	 */
	void setClosedQuantity(BigDecimal value);

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

}
