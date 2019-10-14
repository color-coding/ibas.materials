package org.colorcoding.ibas.materials.bo.materialserial;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 获取-物料序列
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialSerial.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = MaterialSerial.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = MaterialSerial.BUSINESS_OBJECT_CODE)
public class MaterialSerial extends BusinessObject<MaterialSerial> implements IMaterialSerial, IBOUserFields {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 7497798586557950456L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialSerial.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_OMSR";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_SERIAL";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialSerial";

	/**
	 * 属性名称-物料编码
	 */
	private static final String PROPERTY_ITEMCODE_NAME = "ItemCode";

	/**
	 * 物料编码 属性
	 */
	@DbField(name = "ItemCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
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
	 * 属性名称-序列编码
	 */
	private static final String PROPERTY_SERIALCODE_NAME = "SerialCode";

	/**
	 * 序列编码 属性
	 */
	@DbField(name = "SerialCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_SERIALCODE = registerProperty(PROPERTY_SERIALCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-序列编码
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIALCODE_NAME)
	public final String getSerialCode() {
		return this.getProperty(PROPERTY_SERIALCODE);
	}

	/**
	 * 设置-序列编码
	 *
	 * @param value 值
	 */
	public final void setSerialCode(String value) {
		this.setProperty(PROPERTY_SERIALCODE, value);
	}

	/**
	 * 属性名称-仓库编码
	 */
	private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

	/**
	 * 仓库编码 属性
	 */
	@DbField(name = "WhsCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_WAREHOUSE = registerProperty(PROPERTY_WAREHOUSE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-仓库编码
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_WAREHOUSE_NAME)
	public final String getWarehouse() {
		return this.getProperty(PROPERTY_WAREHOUSE);
	}

	/**
	 * 设置-仓库编码
	 *
	 * @param value 值
	 */
	public final void setWarehouse(String value) {
		this.setProperty(PROPERTY_WAREHOUSE, value);
	}

	/**
	 * 属性名称-在仓库
	 */
	private static final String PROPERTY_INSTOCK_NAME = "InStock";

	/**
	 * 在仓库 属性
	 */
	@DbField(name = "InStock", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_INSTOCK = registerProperty(PROPERTY_INSTOCK_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-在仓库
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_INSTOCK_NAME)
	public final emYesNo getInStock() {
		return this.getProperty(PROPERTY_INSTOCK);
	}

	/**
	 * 设置-在仓库
	 *
	 * @param value 值
	 */
	public final void setInStock(emYesNo value) {
		this.setProperty(PROPERTY_INSTOCK, value);
	}

	/**
	 * 属性名称-锁定
	 */
	private static final String PROPERTY_LOCKED_NAME = "Locked";

	/**
	 * 锁定 属性
	 */
	@DbField(name = "Locked", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_LOCKED = registerProperty(PROPERTY_LOCKED_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-锁定
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOCKED_NAME)
	public final emYesNo getLocked() {
		return this.getProperty(PROPERTY_LOCKED);
	}

	/**
	 * 设置-锁定
	 *
	 * @param value 值
	 */
	public final void setLocked(emYesNo value) {
		this.setProperty(PROPERTY_LOCKED, value);
	}

	/**
	 * 属性名称-供应商序号
	 */
	private static final String PROPERTY_SUPPLIERSERIAL_NAME = "SupplierSerial";

	/**
	 * 供应商序号 属性
	 */
	@DbField(name = "SuprSerial", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_SUPPLIERSERIAL = registerProperty(PROPERTY_SUPPLIERSERIAL_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-供应商序号
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SUPPLIERSERIAL_NAME)
	public final String getSupplierSerial() {
		return this.getProperty(PROPERTY_SUPPLIERSERIAL);
	}

	/**
	 * 设置-供应商序号
	 *
	 * @param value 值
	 */
	public final void setSupplierSerial(String value) {
		this.setProperty(PROPERTY_SUPPLIERSERIAL, value);
	}

	/**
	 * 属性名称-批次序号
	 */
	private static final String PROPERTY_BATCHSERIAL_NAME = "BatchSerial";

	/**
	 * 批次序号 属性
	 */
	@DbField(name = "BtchSerial", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_BATCHSERIAL = registerProperty(PROPERTY_BATCHSERIAL_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-批次序号
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BATCHSERIAL_NAME)
	public final String getBatchSerial() {
		return this.getProperty(PROPERTY_BATCHSERIAL);
	}

	/**
	 * 设置-批次序号
	 *
	 * @param value 值
	 */
	public final void setBatchSerial(String value) {
		this.setProperty(PROPERTY_BATCHSERIAL, value);
	}

	/**
	 * 属性名称-过期日期
	 */
	private static final String PROPERTY_EXPIRATIONDATE_NAME = "ExpirationDate";

	/**
	 * 过期日期 属性
	 */
	@DbField(name = "ExpDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_EXPIRATIONDATE = registerProperty(PROPERTY_EXPIRATIONDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-过期日期
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_EXPIRATIONDATE_NAME)
	public final DateTime getExpirationDate() {
		return this.getProperty(PROPERTY_EXPIRATIONDATE);
	}

	/**
	 * 设置-过期日期
	 *
	 * @param value 值
	 */
	public final void setExpirationDate(DateTime value) {
		this.setProperty(PROPERTY_EXPIRATIONDATE, value);
	}

	/**
	 * 属性名称-生产日期
	 */
	private static final String PROPERTY_MANUFACTURINGDATE_NAME = "ManufacturingDate";

	/**
	 * 生产日期 属性
	 */
	@DbField(name = "MafDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_MANUFACTURINGDATE = registerProperty(
			PROPERTY_MANUFACTURINGDATE_NAME, DateTime.class, MY_CLASS);

	/**
	 * 获取-生产日期
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MANUFACTURINGDATE_NAME)
	public final DateTime getManufacturingDate() {
		return this.getProperty(PROPERTY_MANUFACTURINGDATE);
	}

	/**
	 * 设置-生产日期
	 *
	 * @param value 值
	 */
	public final void setManufacturingDate(DateTime value) {
		this.setProperty(PROPERTY_MANUFACTURINGDATE, value);
	}

	/**
	 * 属性名称-准入日期
	 */
	private static final String PROPERTY_ADMISSIONDATE_NAME = "AdmissionDate";

	/**
	 * 准入日期 属性
	 */
	@DbField(name = "AdmDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_ADMISSIONDATE = registerProperty(PROPERTY_ADMISSIONDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-准入日期
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ADMISSIONDATE_NAME)
	public final DateTime getAdmissionDate() {
		return this.getProperty(PROPERTY_ADMISSIONDATE);
	}

	/**
	 * 设置-准入日期
	 *
	 * @param value 值
	 */
	public final void setAdmissionDate(DateTime value) {
		this.setProperty(PROPERTY_ADMISSIONDATE, value);
	}

	/**
	 * 属性名称-保修开始日期
	 */
	private static final String PROPERTY_WARRANTYSTARTDATE_NAME = "WarrantyStartDate";

	/**
	 * 保修开始日期 属性
	 */
	@DbField(name = "WntyStart", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_WARRANTYSTARTDATE = registerProperty(
			PROPERTY_WARRANTYSTARTDATE_NAME, DateTime.class, MY_CLASS);

	/**
	 * 获取-保修开始日期
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_WARRANTYSTARTDATE_NAME)
	public final DateTime getWarrantyStartDate() {
		return this.getProperty(PROPERTY_WARRANTYSTARTDATE);
	}

	/**
	 * 设置-保修开始日期
	 *
	 * @param value 值
	 */
	public final void setWarrantyStartDate(DateTime value) {
		this.setProperty(PROPERTY_WARRANTYSTARTDATE, value);
	}

	/**
	 * 属性名称-保修结束日期
	 */
	private static final String PROPERTY_WARRANTYENDDATE_NAME = "WarrantyEndDate";

	/**
	 * 保修结束日期 属性
	 */
	@DbField(name = "WntyEnd", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_WARRANTYENDDATE = registerProperty(
			PROPERTY_WARRANTYENDDATE_NAME, DateTime.class, MY_CLASS);

	/**
	 * 获取-保修结束日期
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_WARRANTYENDDATE_NAME)
	public final DateTime getWarrantyEndDate() {
		return this.getProperty(PROPERTY_WARRANTYENDDATE);
	}

	/**
	 * 设置-保修结束日期
	 *
	 * @param value 值
	 */
	public final void setWarrantyEndDate(DateTime value) {
		this.setProperty(PROPERTY_WARRANTYENDDATE, value);
	}

	/**
	 * 属性名称-物料规格
	 */
	private static final String PROPERTY_SPECIFICATION_NAME = "Specification";

	/**
	 * 物料规格 属性
	 */
	@DbField(name = "Specification", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_SPECIFICATION = registerProperty(PROPERTY_SPECIFICATION_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-物料规格
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SPECIFICATION_NAME)
	public final Integer getSpecification() {
		return this.getProperty(PROPERTY_SPECIFICATION);
	}

	/**
	 * 设置-物料规格
	 * 
	 * @param value 值
	 */
	public final void setSpecification(Integer value) {
		this.setProperty(PROPERTY_SPECIFICATION, value);
	}

	/**
	 * 属性名称-位置
	 */
	private static final String PROPERTY_LOCATION_NAME = "Location";

	/**
	 * 位置 属性
	 */
	@DbField(name = "Location", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_LOCATION = registerProperty(PROPERTY_LOCATION_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-位置
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOCATION_NAME)
	public final String getLocation() {
		return this.getProperty(PROPERTY_LOCATION);
	}

	/**
	 * 设置-位置
	 * 
	 * @param value 值
	 */
	public final void setLocation(String value) {
		this.setProperty(PROPERTY_LOCATION, value);
	}

	/**
	 * 属性名称-备注
	 */
	private static final String PROPERTY_NOTES_NAME = "Notes";

	/**
	 * 备注 属性
	 */
	@DbField(name = "Notes", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_NOTES = registerProperty(PROPERTY_NOTES_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-备注
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_NOTES_NAME)
	public final String getNotes() {
		return this.getProperty(PROPERTY_NOTES);
	}

	/**
	 * 设置-备注
	 *
	 * @param value 值
	 */
	public final void setNotes(String value) {
		this.setProperty(PROPERTY_NOTES, value);
	}

	/**
	 * 属性名称-对象编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 对象编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象编号
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-对象编号
	 *
	 * @param value 值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-对象类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象类型 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象类型
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象类型
	 *
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-实例号
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 实例号 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-实例号
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-实例号
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
	 * 属性名称-更新日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 更新日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-更新日期
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-更新日期
	 *
	 * @param value 值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-更新时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 更新时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-更新时间
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-更新时间
	 *
	 * @param value 值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
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
	 * 属性名称-更新用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 更新用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-更新用户
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-更新用户
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
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setLocked(emYesNo.NO);
		this.setInStock(emYesNo.NO);
	}

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleRequired(PROPERTY_ITEMCODE), // 要求有值
				new BusinessRuleRequired(PROPERTY_WAREHOUSE), // 要求有值
				new BusinessRuleRequired(PROPERTY_SERIALCODE), // 要求有值
		};
	}

	@Override
	public void reset() {
		super.reset();
		this.setInStock(emYesNo.NO);
	}
}
