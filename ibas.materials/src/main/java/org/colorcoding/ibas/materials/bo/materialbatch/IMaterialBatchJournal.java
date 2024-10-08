package org.colorcoding.ibas.materials.bo.materialbatch;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;

/**
 * 物料批次日记账 接口
 * 
 */
public interface IMaterialBatchJournal extends IBOSimple {

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
	 * 获取-方向
	 * 
	 * @return 值
	 */
	emDirection getDirection();

	/**
	 * 设置-方向
	 * 
	 * @param value 值
	 */
	void setDirection(emDirection value);

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
	 * 获取-价格
	 * 
	 * @return 值
	 */
	BigDecimal getPrice();

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setPrice(BigDecimal value);

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setPrice(String value);

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setPrice(int value);

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setPrice(double value);

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
	 * 获取-汇率
	 * 
	 * @return 值
	 */
	BigDecimal getRate();

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	void setRate(BigDecimal value);

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	void setRate(String value);

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	void setRate(int value);

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	void setRate(double value);

	/**
	 * 获取-计算价格
	 * 
	 * @return 值
	 */
	BigDecimal getCalculatedPrice();

	/**
	 * 设置-计算价格
	 * 
	 * @param value 值
	 */
	void setCalculatedPrice(BigDecimal value);

	/**
	 * 获取-交易值
	 * 
	 * @return 值
	 */
	BigDecimal getTransactionValue();

	/**
	 * 设置-交易值
	 * 
	 * @param value 值
	 */
	void setTransactionValue(BigDecimal value);

	/**
	 * 获取-过账日期
	 * 
	 * @return 值
	 */
	DateTime getPostingDate();

	/**
	 * 设置-过账日期
	 * 
	 * @param value 值
	 */
	void setPostingDate(DateTime value);

	/**
	 * 获取-到期日
	 * 
	 * @return 值
	 */
	DateTime getDeliveryDate();

	/**
	 * 设置-到期日
	 * 
	 * @param value 值
	 */
	void setDeliveryDate(DateTime value);

	/**
	 * 获取-凭证日期
	 * 
	 * @return 值
	 */
	DateTime getDocumentDate();

	/**
	 * 设置-凭证日期
	 * 
	 * @param value 值
	 */
	void setDocumentDate(DateTime value);

	/**
	 * 获取-库存数量
	 * 
	 * @return 值
	 */
	BigDecimal getInventoryQuantity();

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	void setInventoryQuantity(BigDecimal value);

	/**
	 * 获取-库存价值
	 * 
	 * @return 值
	 */
	BigDecimal getInventoryValue();

	/**
	 * 设置-库存价值
	 * 
	 * @param value 值
	 */
	void setInventoryValue(BigDecimal value);

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
	* 获取-基于索引
	* 
	* @return 值
	*/
	Integer getBaseDocumentIndex();

	/**
	* 设置-基于索引
	* 
	* @param value 值
	*/
	void setBaseDocumentIndex(Integer value);

	/**
	 * 获取-原始类型
	 * 
	 * @return 值
	 */
	String getOriginalDocumentType();

	/**
	 * 设置-原始类型
	 * 
	 * @param value 值
	 */
	void setOriginalDocumentType(String value);

	/**
	 * 获取-原始标识
	 * 
	 * @return 值
	 */
	Integer getOriginalDocumentEntry();

	/**
	 * 设置-原始标识
	 * 
	 * @param value 值
	 */
	void setOriginalDocumentEntry(Integer value);

	/**
	 * 获取-原始行号
	 * 
	 * @return 值
	 */
	Integer getOriginalDocumentLineId();

	/**
	 * 设置-原始行号
	 * 
	 * @param value 值
	 */
	void setOriginalDocumentLineId(Integer value);

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
