package org.colorcoding.ibas.materials.bo.inventorycounting;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;

/**
 * 库存盘点-行 接口
 * 
 */
public interface IInventoryCountingLine extends IBODocumentLine, IMaterialBatchItemParent, IMaterialSerialItemParent {

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	Integer getDocEntry();

	/**
	 * 设置-编码
	 * 
	 * @param value 值
	 */
	void setDocEntry(Integer value);

	/**
	 * 获取-行号
	 * 
	 * @return 值
	 */
	Integer getLineId();

	/**
	 * 设置-行号
	 * 
	 * @param value 值
	 */
	void setLineId(Integer value);

	/**
	 * 获取-显示顺序
	 * 
	 * @return 值
	 */
	Integer getVisOrder();

	/**
	 * 设置-显示顺序
	 * 
	 * @param value 值
	 */
	void setVisOrder(Integer value);

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
	 * 获取-类型
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-类型
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
	 * 获取-物料/服务描述
	 * 
	 * @return 值
	 */
	String getItemDescription();

	/**
	 * 设置-物料/服务描述
	 * 
	 * @param value 值
	 */
	void setItemDescription(String value);

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
	 * 获取-序号管理
	 * 
	 * @return 值
	 */
	emYesNo getSerialManagement();

	/**
	 * 设置-序号管理
	 * 
	 * @param value 值
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
	 * @param value 值
	 */
	void setBatchManagement(emYesNo value);

	/**
	 * 获取-仓库
	 * 
	 * @return 值
	 */
	String getWarehouse();

	/**
	 * 设置-仓库
	 * 
	 * @param value 值
	 */
	void setWarehouse(String value);

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
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	void setInventoryQuantity(String value);

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	void setInventoryQuantity(int value);

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	void setInventoryQuantity(double value);

	/**
	 * 获取-盘点数量
	 * 
	 * @return 值
	 */
	BigDecimal getCountQuantity();

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	void setCountQuantity(BigDecimal value);

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	void setCountQuantity(String value);

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	void setCountQuantity(int value);

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	void setCountQuantity(double value);

	/**
	 * 获取-差额
	 * 
	 * @return 值
	 */
	BigDecimal getDifference();

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	void setDifference(BigDecimal value);

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	void setDifference(String value);

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	void setDifference(int value);

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	void setDifference(double value);

	/**
	 * 获取-单位
	 * 
	 * @return 值
	 */
	String getUOM();

	/**
	 * 设置-单位
	 * 
	 * @param value 值
	 */
	void setUOM(String value);

	/**
	 * 获取-已盘点
	 * 
	 * @return 值
	 */
	emYesNo getCounted();

	/**
	 * 设置-已盘点
	 * 
	 * @param value 值
	 */
	void setCounted(emYesNo value);

	/**
	 * 获取-冻结物料
	 * 
	 * @return 值
	 */
	emYesNo getFreeze();

	/**
	 * 设置-冻结物料
	 * 
	 * @param value 值
	 */
	void setFreeze(emYesNo value);
}
