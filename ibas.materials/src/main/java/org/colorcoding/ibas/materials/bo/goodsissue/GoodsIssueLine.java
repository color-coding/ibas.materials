package org.colorcoding.ibas.materials.bo.goodsissue;

import javax.xml.bind.annotation.*;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicsHost;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.logic.IMaterialIssueContract;

/**
 * 获取-库存发货-行
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = GoodsIssueLine.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class GoodsIssueLine extends BusinessObject<GoodsIssueLine> implements IGoodsIssueLine, IBusinessLogicsHost {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -757847068028749540L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = GoodsIssueLine.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_IGE1";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_GOODSISSUE";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "GoodsIssueLine";

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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setVisOrder(Integer value) {
		this.setProperty(PROPERTY_VISORDER, value);
	}

	/**
	 * 属性名称-取消
	 */
	private static final String PROPERTY_CANCELED_NAME = "Canceled";

	/**
	 * 取消 属性
	 */
	@DbField(name = "Canceled", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_CANCELED = registerProperty(PROPERTY_CANCELED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-取消
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CANCELED_NAME)
	public final emYesNo getCanceled() {
		return this.getProperty(PROPERTY_CANCELED);
	}

	/**
	 * 设置-取消
	 * 
	 * @param value
	 *            值
	 */
	public final void setCanceled(emYesNo value) {
		this.setProperty(PROPERTY_CANCELED, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setReference2(String value) {
		this.setProperty(PROPERTY_REFERENCE2, value);
	}

	/**
	 * 属性名称-已引用
	 */
	private static final String PROPERTY_REFERENCED_NAME = "Referenced";

	/**
	 * 已引用 属性
	 */
	@DbField(name = "Refed", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_REFERENCED = registerProperty(PROPERTY_REFERENCED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-已引用
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_REFERENCED_NAME)
	public final emYesNo getReferenced() {
		return this.getProperty(PROPERTY_REFERENCED);
	}

	/**
	 * 设置-已引用
	 * 
	 * @param value
	 *            值
	 */
	public final void setReferenced(emYesNo value) {
		this.setProperty(PROPERTY_REFERENCED, value);
	}

	/**
	 * 属性名称-基于类型
	 */
	private static final String PROPERTY_BASEDOCUMENTTYPE_NAME = "BaseDocumentType";

	/**
	 * 基于类型 属性
	 */
	@DbField(name = "BaseType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_BASEDOCUMENTTYPE = registerProperty(
			PROPERTY_BASEDOCUMENTTYPE_NAME, String.class, MY_CLASS);

	/**
	 * 获取-基于类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BASEDOCUMENTTYPE_NAME)
	public final String getBaseDocumentType() {
		return this.getProperty(PROPERTY_BASEDOCUMENTTYPE);
	}

	/**
	 * 设置-基于类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setBaseDocumentType(String value) {
		this.setProperty(PROPERTY_BASEDOCUMENTTYPE, value);
	}

	/**
	 * 属性名称-基于标识
	 */
	private static final String PROPERTY_BASEDOCUMENTENTRY_NAME = "BaseDocumentEntry";

	/**
	 * 基于标识 属性
	 */
	@DbField(name = "BaseEntry", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_BASEDOCUMENTENTRY = registerProperty(
			PROPERTY_BASEDOCUMENTENTRY_NAME, Integer.class, MY_CLASS);

	/**
	 * 获取-基于标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BASEDOCUMENTENTRY_NAME)
	public final Integer getBaseDocumentEntry() {
		return this.getProperty(PROPERTY_BASEDOCUMENTENTRY);
	}

	/**
	 * 设置-基于标识
	 * 
	 * @param value
	 *            值
	 */
	public final void setBaseDocumentEntry(Integer value) {
		this.setProperty(PROPERTY_BASEDOCUMENTENTRY, value);
	}

	/**
	 * 属性名称-基于行号
	 */
	private static final String PROPERTY_BASEDOCUMENTLINEID_NAME = "BaseDocumentLineId";

	/**
	 * 基于行号 属性
	 */
	@DbField(name = "BaseLine", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_BASEDOCUMENTLINEID = registerProperty(
			PROPERTY_BASEDOCUMENTLINEID_NAME, Integer.class, MY_CLASS);

	/**
	 * 获取-基于行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BASEDOCUMENTLINEID_NAME)
	public final Integer getBaseDocumentLineId() {
		return this.getProperty(PROPERTY_BASEDOCUMENTLINEID);
	}

	/**
	 * 设置-基于行号
	 * 
	 * @param value
	 *            值
	 */
	public final void setBaseDocumentLineId(Integer value) {
		this.setProperty(PROPERTY_BASEDOCUMENTLINEID, value);
	}

	/**
	 * 属性名称-物料编号
	 */
	private static final String PROPERTY_ITEMCODE_NAME = "ItemCode";

	/**
	 * 物料编号 属性
	 */
	@DbField(name = "ItemCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ITEMCODE = registerProperty(PROPERTY_ITEMCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-物料编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ITEMCODE_NAME)
	public final String getItemCode() {
		return this.getProperty(PROPERTY_ITEMCODE);
	}

	/**
	 * 设置-物料编号
	 * 
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setItemDescription(String value) {
		this.setProperty(PROPERTY_ITEMDESCRIPTION, value);
	}

	/**
	 * 属性名称-物料类型
	 */
	private static final String PROPERTY_ITEMTYPE_NAME = "ItemType";

	/**
	 * 物料类型 属性
	 */
	@DbField(name = "ItemType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emItemType> PROPERTY_ITEMTYPE = registerProperty(PROPERTY_ITEMTYPE_NAME,
			emItemType.class, MY_CLASS);

	/**
	 * 获取-物料类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ITEMTYPE_NAME)
	public final emItemType getItemType() {
		return this.getProperty(PROPERTY_ITEMTYPE);
	}

	/**
	 * 设置-物料类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setItemType(emItemType value) {
		this.setProperty(PROPERTY_ITEMTYPE, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setBatchManagement(emYesNo value) {
		this.setProperty(PROPERTY_BATCHMANAGEMENT, value);
	}

	/**
	 * 属性名称-数量
	 */
	private static final String PROPERTY_QUANTITY_NAME = "Quantity";

	/**
	 * 数量 属性
	 */
	@DbField(name = "Quantity", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_QUANTITY = registerProperty(PROPERTY_QUANTITY_NAME,
			Decimal.class, MY_CLASS);

	/**
	 * 获取-数量
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_QUANTITY_NAME)
	public final Decimal getQuantity() {
		return this.getProperty(PROPERTY_QUANTITY);
	}

	/**
	 * 设置-数量
	 * 
	 * @param value
	 *            值
	 */
	public final void setQuantity(Decimal value) {
		this.setProperty(PROPERTY_QUANTITY, value);
	}

	/**
	 * 设置-数量
	 * 
	 * @param value
	 *            值
	 */
	public final void setQuantity(String value) {
		this.setQuantity(new Decimal(value));
	}

	/**
	 * 设置-数量
	 * 
	 * @param value
	 *            值
	 */
	public final void setQuantity(int value) {
		this.setQuantity(new Decimal(value));
	}

	/**
	 * 设置-数量
	 * 
	 * @param value
	 *            值
	 */
	public final void setQuantity(double value) {
		this.setQuantity(new Decimal(value));
	}

	/**
	 * 属性名称-计量单位
	 */
	private static final String PROPERTY_UOM_NAME = "UOM";

	/**
	 * 计量单位 属性
	 */
	@DbField(name = "UOM", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_UOM = registerProperty(PROPERTY_UOM_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-计量单位
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UOM_NAME)
	public final String getUOM() {
		return this.getProperty(PROPERTY_UOM);
	}

	/**
	 * 设置-计量单位
	 * 
	 * @param value
	 *            值
	 */
	public final void setUOM(String value) {
		this.setProperty(PROPERTY_UOM, value);
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
	 * @param value
	 *            值
	 */
	public final void setWarehouse(String value) {
		this.setProperty(PROPERTY_WAREHOUSE, value);
	}

	/**
	 * 属性名称-价格
	 */
	private static final String PROPERTY_PRICE_NAME = "Price";

	/**
	 * 价格 属性
	 */
	@DbField(name = "Price", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_PRICE = registerProperty(PROPERTY_PRICE_NAME, Decimal.class,
			MY_CLASS);

	/**
	 * 获取-价格
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PRICE_NAME)
	public final Decimal getPrice() {
		return this.getProperty(PROPERTY_PRICE);
	}

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	public final void setPrice(Decimal value) {
		this.setProperty(PROPERTY_PRICE, value);
	}

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	public final void setPrice(String value) {
		this.setPrice(new Decimal(value));
	}

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	public final void setPrice(int value) {
		this.setPrice(new Decimal(value));
	}

	/**
	 * 设置-价格
	 * 
	 * @param value
	 *            值
	 */
	public final void setPrice(double value) {
		this.setPrice(new Decimal(value));
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
	 * @param value
	 *            值
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
	public static final IPropertyInfo<Decimal> PROPERTY_RATE = registerProperty(PROPERTY_RATE_NAME, Decimal.class,
			MY_CLASS);

	/**
	 * 获取-汇率
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_RATE_NAME)
	public final Decimal getRate() {
		return this.getProperty(PROPERTY_RATE);
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value
	 *            值
	 */
	public final void setRate(Decimal value) {
		this.setProperty(PROPERTY_RATE, value);
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value
	 *            值
	 */
	public final void setRate(String value) {
		this.setRate(new Decimal(value));
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value
	 *            值
	 */
	public final void setRate(int value) {
		this.setRate(new Decimal(value));
	}

	/**
	 * 设置-汇率
	 * 
	 * @param value
	 *            值
	 */
	public final void setRate(double value) {
		this.setRate(new Decimal(value));
	}

	/**
	 * 属性名称-行总计
	 */
	private static final String PROPERTY_LINETOTAL_NAME = "LineTotal";

	/**
	 * 行总计 属性
	 */
	@DbField(name = "LineTotal", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_LINETOTAL = registerProperty(PROPERTY_LINETOTAL_NAME,
			Decimal.class, MY_CLASS);

	/**
	 * 获取-行总计
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINETOTAL_NAME)
	public final Decimal getLineTotal() {
		return this.getProperty(PROPERTY_LINETOTAL);
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value
	 *            值
	 */
	public final void setLineTotal(Decimal value) {
		this.setProperty(PROPERTY_LINETOTAL, value);
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value
	 *            值
	 */
	public final void setLineTotal(String value) {
		this.setLineTotal(new Decimal(value));
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value
	 *            值
	 */
	public final void setLineTotal(int value) {
		this.setLineTotal(new Decimal(value));
	}

	/**
	 * 设置-行总计
	 * 
	 * @param value
	 *            值
	 */
	public final void setLineTotal(double value) {
		this.setLineTotal(new Decimal(value));
	}

	/**
	 * 属性名称-项目代码
	 */
	private static final String PROPERTY_PROJECT_NAME = "Project";

	/**
	 * 项目代码 属性
	 */
	@DbField(name = "Project", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_PROJECT = registerProperty(PROPERTY_PROJECT_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-项目代码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PROJECT_NAME)
	public final String getProject() {
		return this.getProperty(PROPERTY_PROJECT);
	}

	/**
	 * 设置-项目代码
	 * 
	 * @param value
	 *            值
	 */
	public final void setProject(String value) {
		this.setProperty(PROPERTY_PROJECT, value);
	}

	/**
	 * 属性名称-库存发货-物料批次
	 */
	private static final String PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS_NAME = "GoodsIssueMaterialBatchJournals";

	/**
	 * 库存发货-物料批次的集合属性
	 *
	 */
	public static final IPropertyInfo<IGoodsIssueMaterialBatchJournals> PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS = registerProperty(
			PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS_NAME, IGoodsIssueMaterialBatchJournals.class, MY_CLASS);

	/**
	 * 获取-库存发货-物料批次集合
	 *
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS_NAME)
	@XmlElement(name = MaterialBatchJournal.BUSINESS_OBJECT_NAME, type = MaterialBatchJournal.class)
	public final IGoodsIssueMaterialBatchJournals getGoodsIssueMaterialBatchJournals() {
		return this.getProperty(PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS);
	}

	/**
	 * 设置-库存发货-物料批次集合
	 *
	 * @param value
	 *            值
	 */
	public final void setGoodsIssueMaterialBatchJournals(IGoodsIssueMaterialBatchJournals value) {
		this.setProperty(PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS, value);
	}

	/**
	 * 属性名称-库存发货-物料序列
	 */
	private static final String PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS_NAME = "GoodsIssueMaterialSerialJournals";

	/**
	 * 库存发货-物料序列的集合属性
	 *
	 */
	public static final IPropertyInfo<IGoodsIssueMaterialSerialJournals> PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS = registerProperty(
			PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS_NAME, IGoodsIssueMaterialSerialJournals.class, MY_CLASS);

	/**
	 * 获取-库存发货-物料序列集合
	 *
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS_NAME)
	@XmlElement(name = MaterialBatchJournal.BUSINESS_OBJECT_NAME, type = MaterialSerialJournal.class)
	public final IGoodsIssueMaterialSerialJournals getGoodsIssueMaterialSerialJournals() {
		return this.getProperty(PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS);
	}

	/**
	 * 设置-库存发货-物料序列集合
	 *
	 * @param value
	 *            值
	 */
	public final void setGoodsIssueMaterialSerialJournals(IGoodsIssueMaterialSerialJournals value) {
		this.setProperty(PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS, value);
	}
	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setGoodsIssueMaterialBatchJournals(new GoodsIssueMaterialBatchJournals(this));
		this.setGoodsIssueMaterialSerialJournals(new GoodsIssueMaterialSerialJournals(this));
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		// 日期初始化。 需要在前台中添加这三个日期，并实现父类日期发生更改时，子类日期发生相应更改。
		this.setPostingDate(DateTime.getToday());
		this.setDeliveryDate(DateTime.getToday());
		this.setDocumentDate(DateTime.getToday());
	}

	private DateTime PostingDate;

	public DateTime getPostingDate() {
		return this.PostingDate;
	}

	public void setPostingDate(DateTime postingDate) {
		this.PostingDate = postingDate;
	}

	private DateTime DocumentDate;

	public DateTime getDocumentDate() {
		return this.DocumentDate;
	}

	public void setDocumentDate(DateTime documentDate) {
		this.DocumentDate = documentDate;
	}

	private DateTime DeliveryDate;

	public DateTime getDeliveryDate() {
		return this.DeliveryDate;
	}

	public void setDeliveryDate(DateTime deliveryDate) {
		this.DeliveryDate = deliveryDate;
	}


	@Override
	public IBusinessLogicContract[] getContracts() {

		return new IBusinessLogicContract[]{
				new IMaterialIssueContract(){
					@Override
					public String getIdentifiers() {
						return GoodsIssueLine.this.getIdentifiers();
					}

					@Override
					public String getItemCode() {
						return GoodsIssueLine.this.getItemCode();
					}

					@Override
					public String getItemName() {
						return GoodsIssueLine.this.getItemDescription();
					}

					@Override
					public String getIssueWarehouseCode() {
						return GoodsIssueLine.this.getWarehouse();
					}

					@Override
					public String getBaseDocumentType() {
						return GoodsIssueLine.this.getObjectCode();
					}

					@Override
					public Integer getBaseDocumentEntry() {
						return GoodsIssueLine.this.getDocEntry();
					}

					@Override
					public Integer getBaseDocumentLineId() {
						return GoodsIssueLine.this.getLineId();
					}

					@Override
					public Decimal getIssueQuantity() {
						return GoodsIssueLine.this.getQuantity();
					}

					@Override
					public DateTime getPostingDate() {
						return GoodsIssueLine.this.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return GoodsIssueLine.this.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return GoodsIssueLine.this.getDocumentDate();
					}

					@Override
					public emYesNo getCanceled() {
						return GoodsIssueLine.this.getCanceled();
					}

					@Override
					public emDocumentStatus getLineStatus() {
						return GoodsIssueLine.this.getLineStatus();
					}
				}
		};
	}
}
