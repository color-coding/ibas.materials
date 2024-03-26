package org.colorcoding.ibas.materials.bo.picklists;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.data.emPickStatus;

/**
 * 拣配清单-行 接口
 */
public interface IPickListsLine extends IBOSimpleLine {

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
	 * 获取-对象行号
	 *
	 * @return 值
	 */
	Integer getLineId();

	/**
	 * 设置-对象行号
	 *
	 * @param value 值
	 */
	void setLineId(Integer value);

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
	 * 获取-交货/到期日期
	 *
	 * @return 值
	 */
	DateTime getDeliveryDate();

	/**
	 * 设置-交货/到期日期
	 *
	 * @param value 值
	 */
	void setDeliveryDate(DateTime value);

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
	 * 获取-库存单位
	 *
	 * @return 值
	 */
	String getInventoryUOM();

	/**
	 * 设置-库存单位
	 *
	 * @param value 值
	 */
	void setInventoryUOM(String value);

	/**
	 * 获取-单位换算率
	 *
	 * @return 值
	 */
	BigDecimal getUOMRate();

	/**
	 * 设置-单位换算率
	 *
	 * @param value 值
	 */
	void setUOMRate(BigDecimal value);

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
	 * 获取-拣配数量
	 *
	 * @return 值
	 */
	BigDecimal getPickQuantity();

	/**
	 * 设置-拣配数量
	 *
	 * @param value 值
	 */
	void setPickQuantity(BigDecimal value);

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
	 * 获取-拣配清单-序号集合
	 * 
	 * @return 值
	 */
	IPickListsNumbers getPickListsNumbers();

	/**
	 * 设置-拣配清单-序号集合
	 * 
	 * @param value 值
	 */
	void setPickListsNumbers(IPickListsNumbers value);

}
