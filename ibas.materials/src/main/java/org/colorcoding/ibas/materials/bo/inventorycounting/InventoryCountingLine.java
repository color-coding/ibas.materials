package org.colorcoding.ibas.materials.bo.inventorycounting;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.accounting.logic.IJECPropertyValueGetter;
import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicsHost;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.ICheckRules;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMinValue;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMultiplication;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItems;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItems;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.logic.IMaterialIssueContract;
import org.colorcoding.ibas.materials.logic.IMaterialReceiptContract;
import org.colorcoding.ibas.materials.logic.IMaterialWarehouseFrozenContract;

/**
 * 库存盘点-行
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = InventoryCountingLine.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class InventoryCountingLine extends BusinessObject<InventoryCountingLine>
		implements IInventoryCountingLine, IBusinessLogicsHost, ICheckRules, IBOUserFields, IJECPropertyValueGetter {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 6920363009520616509L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = InventoryCountingLine.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_INC1";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_INVENTORYCOUNTING";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "InventoryCountingLine";

	/**
	 * 属性名称-编码
	 */
	private static final String PROPERTY_DOCENTRY_NAME = "DocEntry";

	/**
	 * 编码 属性
	 */
	@DbField(name = "DocEntry", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_DOCENTRY = registerProperty(PROPERTY_DOCENTRY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DOCENTRY_NAME)
	public final Integer getDocEntry() {
		return this.getProperty(PROPERTY_DOCENTRY);
	}

	/**
	 * 设置-编码
	 * 
	 * @param value 值
	 */
	public final void setDocEntry(Integer value) {
		this.setProperty(PROPERTY_DOCENTRY, value);
	}

	/**
	 * 属性名称-行号
	 */
	private static final String PROPERTY_LINEID_NAME = "LineId";

	/**
	 * 行号 属性
	 */
	@DbField(name = "LineId", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_LINEID = registerProperty(PROPERTY_LINEID_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINEID_NAME)
	public final Integer getLineId() {
		return this.getProperty(PROPERTY_LINEID);
	}

	/**
	 * 设置-行号
	 * 
	 * @param value 值
	 */
	public final void setLineId(Integer value) {
		this.setProperty(PROPERTY_LINEID, value);
	}

	/**
	 * 属性名称-显示顺序
	 */
	private static final String PROPERTY_VISORDER_NAME = "VisOrder";

	/**
	 * 显示顺序 属性
	 */
	@DbField(name = "VisOrder", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_VISORDER = registerProperty(PROPERTY_VISORDER_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-显示顺序
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VISORDER_NAME)
	public final Integer getVisOrder() {
		return this.getProperty(PROPERTY_VISORDER);
	}

	/**
	 * 设置-显示顺序
	 * 
	 * @param value 值
	 */
	public final void setVisOrder(Integer value) {
		this.setProperty(PROPERTY_VISORDER, value);
	}

	/**
	 * 属性名称-状态
	 */
	private static final String PROPERTY_STATUS_NAME = "Status";

	/**
	 * 状态 属性
	 */
	@DbField(name = "Status", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emBOStatus> PROPERTY_STATUS = registerProperty(PROPERTY_STATUS_NAME,
			emBOStatus.class, MY_CLASS);

	/**
	 * 获取-状态
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STATUS_NAME)
	public final emBOStatus getStatus() {
		return this.getProperty(PROPERTY_STATUS);
	}

	/**
	 * 设置-状态
	 * 
	 * @param value 值
	 */
	public final void setStatus(emBOStatus value) {
		this.setProperty(PROPERTY_STATUS, value);
	}

	/**
	 * 属性名称-单据状态
	 */
	private static final String PROPERTY_LINESTATUS_NAME = "LineStatus";

	/**
	 * 单据状态 属性
	 */
	@DbField(name = "LineStatus", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emDocumentStatus> PROPERTY_LINESTATUS = registerProperty(PROPERTY_LINESTATUS_NAME,
			emDocumentStatus.class, MY_CLASS);

	/**
	 * 获取-单据状态
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINESTATUS_NAME)
	public final emDocumentStatus getLineStatus() {
		return this.getProperty(PROPERTY_LINESTATUS);
	}

	/**
	 * 设置-单据状态
	 * 
	 * @param value 值
	 */
	public final void setLineStatus(emDocumentStatus value) {
		this.setProperty(PROPERTY_LINESTATUS, value);
	}

	/**
	 * 属性名称-类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 类型 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-类型
	 * 
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-创建日期
	 */
	private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

	/**
	 * 创建日期 属性
	 */
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEDATE_NAME)
	public final DateTime getCreateDate() {
		return this.getProperty(PROPERTY_CREATEDATE);
	}

	/**
	 * 设置-创建日期
	 * 
	 * @param value 值
	 */
	public final void setCreateDate(DateTime value) {
		this.setProperty(PROPERTY_CREATEDATE, value);
	}

	/**
	 * 属性名称-创建时间
	 */
	private static final String PROPERTY_CREATETIME_NAME = "CreateTime";

	/**
	 * 创建时间 属性
	 */
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATETIME_NAME)
	public final Short getCreateTime() {
		return this.getProperty(PROPERTY_CREATETIME);
	}

	/**
	 * 设置-创建时间
	 * 
	 * @param value 值
	 */
	public final void setCreateTime(Short value) {
		this.setProperty(PROPERTY_CREATETIME, value);
	}

	/**
	 * 属性名称-修改日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 修改日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-修改日期
	 * 
	 * @param value 值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-修改时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 修改时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-修改时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-修改时间
	 * 
	 * @param value 值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
	}

	/**
	 * 属性名称-版本
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 版本 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-版本
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-版本
	 * 
	 * @param value 值
	 */
	public final void setLogInst(Integer value) {
		this.setProperty(PROPERTY_LOGINST, value);
	}

	/**
	 * 属性名称-服务系列
	 */
	private static final String PROPERTY_SERIES_NAME = "Series";

	/**
	 * 服务系列 属性
	 */
	@DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_SERIES = registerProperty(PROPERTY_SERIES_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-服务系列
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIES_NAME)
	public final Integer getSeries() {
		return this.getProperty(PROPERTY_SERIES);
	}

	/**
	 * 设置-服务系列
	 * 
	 * @param value 值
	 */
	public final void setSeries(Integer value) {
		this.setProperty(PROPERTY_SERIES, value);
	}

	/**
	 * 属性名称-数据源
	 */
	private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

	/**
	 * 数据源 属性
	 */
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATASOURCE_NAME)
	public final String getDataSource() {
		return this.getProperty(PROPERTY_DATASOURCE);
	}

	/**
	 * 设置-数据源
	 * 
	 * @param value 值
	 */
	public final void setDataSource(String value) {
		this.setProperty(PROPERTY_DATASOURCE, value);
	}

	/**
	 * 属性名称-创建用户
	 */
	private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

	/**
	 * 创建用户 属性
	 */
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(PROPERTY_CREATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEUSERSIGN_NAME)
	public final Integer getCreateUserSign() {
		return this.getProperty(PROPERTY_CREATEUSERSIGN);
	}

	/**
	 * 设置-创建用户
	 * 
	 * @param value 值
	 */
	public final void setCreateUserSign(Integer value) {
		this.setProperty(PROPERTY_CREATEUSERSIGN, value);
	}

	/**
	 * 属性名称-修改用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 修改用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-修改用户
	 * 
	 * @param value 值
	 */
	public final void setUpdateUserSign(Integer value) {
		this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
	}

	/**
	 * 属性名称-创建动作标识
	 */
	private static final String PROPERTY_CREATEACTIONID_NAME = "CreateActionId";

	/**
	 * 创建动作标识 属性
	 */
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(PROPERTY_CREATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEACTIONID_NAME)
	public final String getCreateActionId() {
		return this.getProperty(PROPERTY_CREATEACTIONID);
	}

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value 值
	 */
	public final void setCreateActionId(String value) {
		this.setProperty(PROPERTY_CREATEACTIONID, value);
	}

	/**
	 * 属性名称-更新动作标识
	 */
	private static final String PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";

	/**
	 * 更新动作标识 属性
	 */
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(PROPERTY_UPDATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEACTIONID_NAME)
	public final String getUpdateActionId() {
		return this.getProperty(PROPERTY_UPDATEACTIONID);
	}

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value 值
	 */
	public final void setUpdateActionId(String value) {
		this.setProperty(PROPERTY_UPDATEACTIONID, value);
	}

	/**
	 * 属性名称-参考1
	 */
	private static final String PROPERTY_REFERENCE1_NAME = "Reference1";

	/**
	 * 参考1 属性
	 */
	@DbField(name = "Ref1", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_REFERENCE1 = registerProperty(PROPERTY_REFERENCE1_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-参考1
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_REFERENCE1_NAME)
	public final String getReference1() {
		return this.getProperty(PROPERTY_REFERENCE1);
	}

	/**
	 * 设置-参考1
	 * 
	 * @param value 值
	 */
	public final void setReference1(String value) {
		this.setProperty(PROPERTY_REFERENCE1, value);
	}

	/**
	 * 属性名称-参考2
	 */
	private static final String PROPERTY_REFERENCE2_NAME = "Reference2";

	/**
	 * 参考2 属性
	 */
	@DbField(name = "Ref2", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_REFERENCE2 = registerProperty(PROPERTY_REFERENCE2_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-参考2
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_REFERENCE2_NAME)
	public final String getReference2() {
		return this.getProperty(PROPERTY_REFERENCE2);
	}

	/**
	 * 设置-参考2
	 * 
	 * @param value 值
	 */
	public final void setReference2(String value) {
		this.setProperty(PROPERTY_REFERENCE2, value);
	}

	/**
	 * 属性名称-物料编码
	 */
	private static final String PROPERTY_ITEMCODE_NAME = "ItemCode";

	/**
	 * 物料编码 属性
	 */
	@DbField(name = "ItemCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ITEMCODE = registerProperty(PROPERTY_ITEMCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-物料编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ITEMCODE_NAME)
	public final String getItemCode() {
		return this.getProperty(PROPERTY_ITEMCODE);
	}

	/**
	 * 设置-物料编码
	 * 
	 * @param value 值
	 */
	public final void setItemCode(String value) {
		this.setProperty(PROPERTY_ITEMCODE, value);
	}

	/**
	 * 属性名称-物料/服务描述
	 */
	private static final String PROPERTY_ITEMDESCRIPTION_NAME = "ItemDescription";

	/**
	 * 物料/服务描述 属性
	 */
	@DbField(name = "Dscription", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ITEMDESCRIPTION = registerProperty(PROPERTY_ITEMDESCRIPTION_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-物料/服务描述
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ITEMDESCRIPTION_NAME)
	public final String getItemDescription() {
		return this.getProperty(PROPERTY_ITEMDESCRIPTION);
	}

	/**
	 * 设置-物料/服务描述
	 * 
	 * @param value 值
	 */
	public final void setItemDescription(String value) {
		this.setProperty(PROPERTY_ITEMDESCRIPTION, value);
	}

	/**
	 * 属性名称-物料标识
	 */
	private static final String PROPERTY_ITEMSIGN_NAME = "ItemSign";

	/**
	 * 物料标识 属性
	 */
	@DbField(name = "ItemSign", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ITEMSIGN = registerProperty(PROPERTY_ITEMSIGN_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-物料标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ITEMSIGN_NAME)
	public final String getItemSign() {
		return this.getProperty(PROPERTY_ITEMSIGN);
	}

	/**
	 * 设置-物料标识
	 * 
	 * @param value 值
	 */
	public final void setItemSign(String value) {
		this.setProperty(PROPERTY_ITEMSIGN, value);
	}

	/**
	 * 属性名称-序号管理
	 */
	private static final String PROPERTY_SERIALMANAGEMENT_NAME = "SerialManagement";

	/**
	 * 序号管理 属性
	 */
	@DbField(name = "SerialMgment", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_SERIALMANAGEMENT = registerProperty(
			PROPERTY_SERIALMANAGEMENT_NAME, emYesNo.class, MY_CLASS);

	/**
	 * 获取-序号管理
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIALMANAGEMENT_NAME)
	public final emYesNo getSerialManagement() {
		return this.getProperty(PROPERTY_SERIALMANAGEMENT);
	}

	/**
	 * 设置-序号管理
	 * 
	 * @param value 值
	 */
	public final void setSerialManagement(emYesNo value) {
		this.setProperty(PROPERTY_SERIALMANAGEMENT, value);
	}

	/**
	 * 属性名称-批号管理
	 */
	private static final String PROPERTY_BATCHMANAGEMENT_NAME = "BatchManagement";

	/**
	 * 批号管理 属性
	 */
	@DbField(name = "BatchMgment", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_BATCHMANAGEMENT = registerProperty(
			PROPERTY_BATCHMANAGEMENT_NAME, emYesNo.class, MY_CLASS);

	/**
	 * 获取-批号管理
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BATCHMANAGEMENT_NAME)
	public final emYesNo getBatchManagement() {
		return this.getProperty(PROPERTY_BATCHMANAGEMENT);
	}

	/**
	 * 设置-批号管理
	 * 
	 * @param value 值
	 */
	public final void setBatchManagement(emYesNo value) {
		this.setProperty(PROPERTY_BATCHMANAGEMENT, value);
	}

	/**
	 * 属性名称-仓库
	 */
	private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

	/**
	 * 仓库 属性
	 */
	@DbField(name = "WhsCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_WAREHOUSE = registerProperty(PROPERTY_WAREHOUSE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-仓库
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_WAREHOUSE_NAME)
	public final String getWarehouse() {
		return this.getProperty(PROPERTY_WAREHOUSE);
	}

	/**
	 * 设置-仓库
	 * 
	 * @param value 值
	 */
	public final void setWarehouse(String value) {
		this.setProperty(PROPERTY_WAREHOUSE, value);
	}

	/**
	 * 属性名称-库存数量
	 */
	private static final String PROPERTY_INVENTORYQUANTITY_NAME = "InventoryQuantity";

	/**
	 * 库存数量 属性
	 */
	@DbField(name = "InvtQty", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_INVENTORYQUANTITY = registerProperty(
			PROPERTY_INVENTORYQUANTITY_NAME, BigDecimal.class, MY_CLASS);

	/**
	 * 获取-库存数量
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_INVENTORYQUANTITY_NAME)
	public final BigDecimal getInventoryQuantity() {
		return this.getProperty(PROPERTY_INVENTORYQUANTITY);
	}

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	public final void setInventoryQuantity(BigDecimal value) {
		this.setProperty(PROPERTY_INVENTORYQUANTITY, value);
	}

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	public final void setInventoryQuantity(String value) {
		this.setInventoryQuantity(Decimal.valueOf(value));
	}

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	public final void setInventoryQuantity(int value) {
		this.setInventoryQuantity(Decimal.valueOf(value));
	}

	/**
	 * 设置-库存数量
	 * 
	 * @param value 值
	 */
	public final void setInventoryQuantity(double value) {
		this.setInventoryQuantity(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-盘点数量
	 */
	private static final String PROPERTY_COUNTQUANTITY_NAME = "CountQuantity";

	/**
	 * 盘点数量 属性
	 */
	@DbField(name = "CountQty", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_COUNTQUANTITY = registerProperty(PROPERTY_COUNTQUANTITY_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-盘点数量
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_COUNTQUANTITY_NAME)
	public final BigDecimal getCountQuantity() {
		return this.getProperty(PROPERTY_COUNTQUANTITY);
	}

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	public final void setCountQuantity(BigDecimal value) {
		this.setProperty(PROPERTY_COUNTQUANTITY, value);
	}

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	public final void setCountQuantity(String value) {
		this.setCountQuantity(Decimal.valueOf(value));
	}

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	public final void setCountQuantity(int value) {
		this.setCountQuantity(Decimal.valueOf(value));
	}

	/**
	 * 设置-盘点数量
	 * 
	 * @param value 值
	 */
	public final void setCountQuantity(double value) {
		this.setCountQuantity(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-差额
	 */
	private static final String PROPERTY_DIFFERENCE_NAME = "Difference";

	/**
	 * 差额 属性
	 */
	@DbField(name = "Difference", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_DIFFERENCE = registerProperty(PROPERTY_DIFFERENCE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-差额
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DIFFERENCE_NAME)
	public final BigDecimal getDifference() {
		return this.getProperty(PROPERTY_DIFFERENCE);
	}

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	public final void setDifference(BigDecimal value) {
		this.setProperty(PROPERTY_DIFFERENCE, value);
	}

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	public final void setDifference(String value) {
		this.setDifference(Decimal.valueOf(value));
	}

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	public final void setDifference(int value) {
		this.setDifference(Decimal.valueOf(value));
	}

	/**
	 * 设置-差额
	 * 
	 * @param value 值
	 */
	public final void setDifference(double value) {
		this.setDifference(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-单位
	 */
	private static final String PROPERTY_UOM_NAME = "UOM";

	/**
	 * 单位 属性
	 */
	@DbField(name = "UOM", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_UOM = registerProperty(PROPERTY_UOM_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-单位
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UOM_NAME)
	public final String getUOM() {
		return this.getProperty(PROPERTY_UOM);
	}

	/**
	 * 设置-单位
	 * 
	 * @param value 值
	 */
	public final void setUOM(String value) {
		this.setProperty(PROPERTY_UOM, value);
	}

	/**
	 * 属性名称-已盘点
	 */
	private static final String PROPERTY_COUNTED_NAME = "Counted";

	/**
	 * 已盘点 属性
	 */
	@DbField(name = "Counted", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_COUNTED = registerProperty(PROPERTY_COUNTED_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-已盘点
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_COUNTED_NAME)
	public final emYesNo getCounted() {
		return this.getProperty(PROPERTY_COUNTED);
	}

	/**
	 * 设置-已盘点
	 * 
	 * @param value 值
	 */
	public final void setCounted(emYesNo value) {
		this.setProperty(PROPERTY_COUNTED, value);
	}

	/**
	 * 属性名称-冻结物料
	 */
	private static final String PROPERTY_FREEZE_NAME = "Freeze";

	/**
	 * 冻结物料 属性
	 */
	@DbField(name = "Freeze", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_FREEZE = registerProperty(PROPERTY_FREEZE_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-冻结物料
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_FREEZE_NAME)
	public final emYesNo getFreeze() {
		return this.getProperty(PROPERTY_FREEZE);
	}

	/**
	 * 设置-冻结物料
	 * 
	 * @param value 值
	 */
	public final void setFreeze(emYesNo value) {
		this.setProperty(PROPERTY_FREEZE, value);
	}

	/**
	 * 属性名称-价格
	 */
	private static final String PROPERTY_PRICE_NAME = "Price";

	/**
	 * 价格 属性
	 */
	@DbField(name = "Price", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_PRICE = registerProperty(PROPERTY_PRICE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-价格
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PRICE_NAME)
	public final BigDecimal getPrice() {
		return this.getProperty(PROPERTY_PRICE);
	}

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	public final void setPrice(BigDecimal value) {
		this.setProperty(PROPERTY_PRICE, value);
	}

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	public final void setPrice(String value) {
		this.setPrice(Decimal.valueOf(value));
	}

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	public final void setPrice(int value) {
		this.setPrice(Decimal.valueOf(value));
	}

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	public final void setPrice(double value) {
		this.setPrice(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-货币
	 */
	private static final String PROPERTY_CURRENCY_NAME = "Currency";

	/**
	 * 货币 属性
	 */
	@DbField(name = "Currency", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CURRENCY = registerProperty(PROPERTY_CURRENCY_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-货币
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CURRENCY_NAME)
	public final String getCurrency() {
		return this.getProperty(PROPERTY_CURRENCY);
	}

	/**
	 * 设置-货币
	 * 
	 * @param value 值
	 */
	public final void setCurrency(String value) {
		this.setProperty(PROPERTY_CURRENCY, value);
	}

	/**
	 * 属性名称-汇率
	 */
	private static final String PROPERTY_RATE_NAME = "Rate";

	/**
	 * 汇率 属性
	 */
	@DbField(name = "Rate", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_RATE = registerProperty(PROPERTY_RATE_NAME, BigDecimal.class,
			MY_CLASS);

	/**
	 * 获取-汇率
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_RATE_NAME)
	public final BigDecimal getRate() {
		return this.getProperty(PROPERTY_RATE);
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	public final void setRate(BigDecimal value) {
		this.setProperty(PROPERTY_RATE, value);
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	public final void setRate(String value) {
		this.setRate(Decimal.valueOf(value));
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	public final void setRate(int value) {
		this.setRate(Decimal.valueOf(value));
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value 值
	 */
	public final void setRate(double value) {
		this.setRate(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-行总计
	 */
	private static final String PROPERTY_LINETOTAL_NAME = "LineTotal";

	/**
	 * 行总计 属性
	 */
	@DbField(name = "LineTotal", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_LINETOTAL = registerProperty(PROPERTY_LINETOTAL_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-行总计
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINETOTAL_NAME)
	public final BigDecimal getLineTotal() {
		return this.getProperty(PROPERTY_LINETOTAL);
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value 值
	 */
	public final void setLineTotal(BigDecimal value) {
		this.setProperty(PROPERTY_LINETOTAL, value);
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value 值
	 */
	public final void setLineTotal(String value) {
		this.setLineTotal(Decimal.valueOf(value));
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value 值
	 */
	public final void setLineTotal(int value) {
		this.setLineTotal(Decimal.valueOf(value));
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value 值
	 */
	public final void setLineTotal(double value) {
		this.setLineTotal(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-物料批次
	 */
	private static final String PROPERTY_MATERIALBATCHES_NAME = "MaterialBatches";

	/**
	 * 物料批次的集合属性
	 *
	 */
	public static final IPropertyInfo<IMaterialBatchItems> PROPERTY_MATERIALBATCHES = registerProperty(
			PROPERTY_MATERIALBATCHES_NAME, IMaterialBatchItems.class, MY_CLASS);

	/**
	 * 获取-物料批次集合
	 *
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_MATERIALBATCHES_NAME)
	@XmlElement(name = MaterialBatchItem.BUSINESS_OBJECT_NAME, type = MaterialBatchItem.class)
	public final IMaterialBatchItems getMaterialBatches() {
		return this.getProperty(PROPERTY_MATERIALBATCHES);
	}

	/**
	 * 设置-物料批次集合
	 *
	 * @param value 值
	 */
	public final void setMaterialBatches(IMaterialBatchItems value) {
		this.setProperty(PROPERTY_MATERIALBATCHES, value);
	}

	/**
	 * 属性名称-物料序列
	 */
	private static final String PROPERTY_MATERIALSERIALS_NAME = "MaterialSerials";

	/**
	 * 物料序列的集合属性
	 *
	 */
	public static final IPropertyInfo<IMaterialSerialItems> PROPERTY_MATERIALSERIALS = registerProperty(
			PROPERTY_MATERIALSERIALS_NAME, IMaterialSerialItems.class, MY_CLASS);

	/**
	 * 获取-物料序列集合
	 *
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_MATERIALSERIALS_NAME)
	@XmlElement(name = MaterialSerialItem.BUSINESS_OBJECT_NAME, type = MaterialSerialItem.class)
	public final IMaterialSerialItems getMaterialSerials() {
		return this.getProperty(PROPERTY_MATERIALSERIALS);
	}

	/**
	 * 设置-物料序列集合
	 *
	 * @param value 值
	 */
	public final void setMaterialSerials(IMaterialSerialItems value) {
		this.setProperty(PROPERTY_MATERIALSERIALS, value);
	}

	@Override
	public BigDecimal getTargetQuantity() {
		return this.getDifference();
	}

	@Override
	public String getTargetUOM() {
		return this.getUOM();
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setMaterialBatches(new MaterialBatchItems(this));
		this.setMaterialSerials(new MaterialSerialItems(this));
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

	}

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleRequired(PROPERTY_ITEMCODE), // 要求有值
				new BusinessRuleRequired(PROPERTY_WAREHOUSE), // 要求有值
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_INVENTORYQUANTITY), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_COUNTQUANTITY), // 不能低于0
				new BusinessRuleMultiplication(PROPERTY_LINETOTAL, PROPERTY_DIFFERENCE, PROPERTY_PRICE), // 计算总计 = 数量 *
																											// 价格
		};
	}

	@Override
	public void check() throws BusinessRuleException {
		// 已盘点时，检查数量是否匹配
		if (this.getCounted() == emYesNo.YES) {
			// 批次检查
			this.getMaterialBatches().check();
			// 序列检查
			this.getMaterialSerials().check();
		}
	}

	/**
	 * 父项
	 */
	IInventoryCounting parent;

	@Override
	public IBusinessLogicContract[] getContracts() {
		ArrayList<IBusinessLogicContract> contracts = new ArrayList<>();
		// 物料仓库冻结
		if (InventoryCountingLine.this.getLineStatus() != emDocumentStatus.CLOSED
				&& InventoryCountingLine.this.getLineStatus() != emDocumentStatus.PLANNED) {
			contracts.add(new IMaterialWarehouseFrozenContract() {

				@Override
				public String getIdentifiers() {
					return InventoryCountingLine.this.getIdentifiers();
				}

				@Override
				public String getItemCode() {
					return InventoryCountingLine.this.getItemCode();
				}

				@Override
				public String getWarehouse() {
					return InventoryCountingLine.this.getWarehouse();
				}

				@Override
				public emYesNo getFreeze() {
					return InventoryCountingLine.this.getFreeze();
				}
			});
		}
		// 仅结算状态影响库存
		if (InventoryCountingLine.this.getLineStatus() == emDocumentStatus.CLOSED) {
			if (Decimal.ZERO.compareTo(InventoryCountingLine.this.getDifference()) > 0) {
				// 盘亏，发货
				contracts.add(new IMaterialIssueContract() {
					@Override
					public boolean isOffsetting() {
						if (InventoryCountingLine.this instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) InventoryCountingLine.this;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (InventoryCountingLine.this instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) InventoryCountingLine.this;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						if (InventoryCountingLine.this.parent instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) InventoryCountingLine.this.parent;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (InventoryCountingLine.this.parent instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) InventoryCountingLine.this.parent;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						return false;
					}

					@Override
					public String getIdentifiers() {
						return InventoryCountingLine.this.getIdentifiers();
					}

					@Override
					public String getItemCode() {
						return InventoryCountingLine.this.getItemCode();
					}

					@Override
					public String getItemName() {
						return InventoryCountingLine.this.getItemDescription();
					}

					@Override
					public String getWarehouse() {
						return InventoryCountingLine.this.getWarehouse();
					}

					@Override
					public String getDocumentType() {
						return InventoryCountingLine.this.getObjectCode();
					}

					@Override
					public Integer getDocumentEntry() {
						return InventoryCountingLine.this.getDocEntry();
					}

					@Override
					public Integer getDocumentLineId() {
						return InventoryCountingLine.this.getLineId();
					}

					@Override
					public BigDecimal getQuantity() {
						return InventoryCountingLine.this.getDifference().abs();
					}

					@Override
					public String getUOM() {
						return InventoryCountingLine.this.getUOM();
					}

					@Override
					public DateTime getPostingDate() {
						return InventoryCountingLine.this.parent.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return InventoryCountingLine.this.parent.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return InventoryCountingLine.this.parent.getDocumentDate();
					}

					@Override
					public emYesNo getBatchManagement() {
						return InventoryCountingLine.this.getBatchManagement();
					}

					@Override
					public emYesNo getSerialManagement() {
						return InventoryCountingLine.this.getSerialManagement();
					}

					@Override
					public BigDecimal getPrice() {
						return InventoryCountingLine.this.getPrice();
					}

					@Override
					public String getCurrency() {
						return InventoryCountingLine.this.getCurrency();
					}

					@Override
					public BigDecimal getRate() {
						return InventoryCountingLine.this.getRate();
					}

					@Override
					public String getItemVersion() {
						return null;
					}

				});
			} else if (Decimal.ZERO.compareTo(InventoryCountingLine.this.getDifference()) < 0) {
				// 盘盈，收货
				contracts.add(new IMaterialReceiptContract() {
					@Override
					public boolean isOffsetting() {
						if (InventoryCountingLine.this instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) InventoryCountingLine.this;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (InventoryCountingLine.this instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) InventoryCountingLine.this;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						if (InventoryCountingLine.this.parent instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) InventoryCountingLine.this.parent;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (InventoryCountingLine.this.parent instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) InventoryCountingLine.this.parent;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						return false;
					}

					@Override
					public String getIdentifiers() {
						return InventoryCountingLine.this.getIdentifiers();
					}

					@Override
					public String getItemCode() {
						return InventoryCountingLine.this.getItemCode();
					}

					@Override
					public String getItemName() {
						return InventoryCountingLine.this.getItemDescription();
					}

					@Override
					public String getWarehouse() {
						return InventoryCountingLine.this.getWarehouse();
					}

					@Override
					public String getDocumentType() {
						return InventoryCountingLine.this.getObjectCode();
					}

					@Override
					public Integer getDocumentEntry() {
						return InventoryCountingLine.this.getDocEntry();
					}

					@Override
					public Integer getDocumentLineId() {
						return InventoryCountingLine.this.getLineId();
					}

					@Override
					public BigDecimal getQuantity() {
						return InventoryCountingLine.this.getDifference().abs();
					}

					@Override
					public String getUOM() {
						return InventoryCountingLine.this.getUOM();
					}

					@Override
					public DateTime getPostingDate() {
						return InventoryCountingLine.this.parent.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return InventoryCountingLine.this.parent.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return InventoryCountingLine.this.parent.getDocumentDate();
					}

					@Override
					public emYesNo getBatchManagement() {
						return InventoryCountingLine.this.getBatchManagement();
					}

					@Override
					public emYesNo getSerialManagement() {
						return InventoryCountingLine.this.getSerialManagement();
					}

					@Override
					public BigDecimal getPrice() {
						return InventoryCountingLine.this.getPrice();
					}

					@Override
					public String getCurrency() {
						return InventoryCountingLine.this.getCurrency();
					}

					@Override
					public BigDecimal getRate() {
						return InventoryCountingLine.this.getRate();
					}

					@Override
					public String getItemVersion() {
						return null;
					}

				});
			}
		}
		return contracts.toArray(new IBusinessLogicContract[] {});
	}

	@Override
	public Object getValue(String property) {
		switch (property) {
		case Ledgers.CONDITION_PROPERTY_OBJECTCODE:
			return this.parent.getObjectCode();
		case Ledgers.CONDITION_PROPERTY_DATAOWNER:
			return this.parent.getDataOwner();
		case Ledgers.CONDITION_PROPERTY_ORGANIZATION:
			return this.parent.getOrganization();
		case Ledgers.CONDITION_PROPERTY_ORDERTYPE:
			return this.parent.getOrderType();
		case Ledgers.CONDITION_PROPERTY_BRANCH:
			return this.parent.getBranch();
		case Ledgers.CONDITION_PROPERTY_MATERIAL:
			return this.getItemCode();
		case Ledgers.CONDITION_PROPERTY_WAREHOUSE:
			return this.getWarehouse();
		default:
			return null;
		}
	}
}
