package org.colorcoding.ibas.materials.bo.materialcatalog;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.bo.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.businesspartner.data.emBusinessPartnerType;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
* 业务伙伴物料目录
* 
*/
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = BusinessPartnerMaterialCatalog.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = BusinessPartnerMaterialCatalog.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = BusinessPartnerMaterialCatalog.BUSINESS_OBJECT_CODE)
public class BusinessPartnerMaterialCatalog extends BusinessObject<BusinessPartnerMaterialCatalog>
		implements IBusinessPartnerMaterialCatalog, IDataOwnership {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -2128215844650146406L;

	/**
	* 当前类型
	*/
	private static final Class<?> MY_CLASS = BusinessPartnerMaterialCatalog.class;

	/**
	* 数据库表
	*/
	public static final String DB_TABLE_NAME = "${Company}_MM_OBPC";

	/**
	* 业务对象编码
	*/
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_BPCATALOG";

	/**
	* 业务对象名称
	*/
	public static final String BUSINESS_OBJECT_NAME = "BusinessPartnerMaterialCatalog";

	/**
	* 属性名称-业务伙伴类型
	*/
	private static final String PROPERTY_BUSINESSPARTNERTYPE_NAME = "BusinessPartnerType";

	/**
	* 业务伙伴类型 属性
	*/
	@DbField(name = "CardType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
	public static final IPropertyInfo<emBusinessPartnerType> PROPERTY_BUSINESSPARTNERTYPE = registerProperty(
			PROPERTY_BUSINESSPARTNERTYPE_NAME, emBusinessPartnerType.class, MY_CLASS);

	/**
	* 获取-业务伙伴类型
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_BUSINESSPARTNERTYPE_NAME)
	public final emBusinessPartnerType getBusinessPartnerType() {
		return this.getProperty(PROPERTY_BUSINESSPARTNERTYPE);
	}

	/**
	* 设置-业务伙伴类型
	* 
	* @param value 值
	*/
	public final void setBusinessPartnerType(emBusinessPartnerType value) {
		this.setProperty(PROPERTY_BUSINESSPARTNERTYPE, value);
	}

	/**
	* 属性名称-业务伙伴代码
	*/
	private static final String PROPERTY_BUSINESSPARTNERCODE_NAME = "BusinessPartnerCode";

	/**
	* 业务伙伴代码 属性
	*/
	@DbField(name = "CardCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_BUSINESSPARTNERCODE = registerProperty(
			PROPERTY_BUSINESSPARTNERCODE_NAME, String.class, MY_CLASS);

	/**
	* 获取-业务伙伴代码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_BUSINESSPARTNERCODE_NAME)
	public final String getBusinessPartnerCode() {
		return this.getProperty(PROPERTY_BUSINESSPARTNERCODE);
	}

	/**
	* 设置-业务伙伴代码
	* 
	* @param value 值
	*/
	public final void setBusinessPartnerCode(String value) {
		this.setProperty(PROPERTY_BUSINESSPARTNERCODE, value);
	}

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
	* 属性名称-目录编码
	*/
	private static final String PROPERTY_CATALOGCODE_NAME = "CatalogCode";

	/**
	* 目录编码 属性
	*/
	@DbField(name = "CatalogCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_CATALOGCODE = registerProperty(PROPERTY_CATALOGCODE_NAME,
			String.class, MY_CLASS);

	/**
	* 获取-目录编码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_CATALOGCODE_NAME)
	public final String getCatalogCode() {
		return this.getProperty(PROPERTY_CATALOGCODE);
	}

	/**
	* 设置-目录编码
	* 
	* @param value 值
	*/
	public final void setCatalogCode(String value) {
		this.setProperty(PROPERTY_CATALOGCODE, value);
	}

	/**
	* 属性名称-目录名称
	*/
	private static final String PROPERTY_CATALOGNAME_NAME = "CatalogName";

	/**
	* 目录名称 属性
	*/
	@DbField(name = "CatalogName", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_CATALOGNAME = registerProperty(PROPERTY_CATALOGNAME_NAME,
			String.class, MY_CLASS);

	/**
	* 获取-目录名称
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_CATALOGNAME_NAME)
	public final String getCatalogName() {
		return this.getProperty(PROPERTY_CATALOGNAME);
	}

	/**
	* 设置-目录名称
	* 
	* @param value 值
	*/
	public final void setCatalogName(String value) {
		this.setProperty(PROPERTY_CATALOGNAME, value);
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
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-创建日期
	*/
	private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

	/**
	* 创建日期 属性
	*/
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
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
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
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
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-数据所有者
	*/
	private static final String PROPERTY_DATAOWNER_NAME = "DataOwner";

	/**
	* 数据所有者 属性
	*/
	@DbField(name = "DataOwner", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_DATAOWNER = registerProperty(PROPERTY_DATAOWNER_NAME,
			Integer.class, MY_CLASS);

	/**
	* 获取-数据所有者
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_DATAOWNER_NAME)
	public final Integer getDataOwner() {
		return this.getProperty(PROPERTY_DATAOWNER);
	}

	/**
	* 设置-数据所有者
	* 
	* @param value 值
	*/
	public final void setDataOwner(Integer value) {
		this.setProperty(PROPERTY_DATAOWNER, value);
	}

	/**
	 * 属性名称-数据所属组织
	 */
	private static final String PROPERTY_ORGANIZATION_NAME = "Organization";

	/**
	 * 数据所属组织 属性
	 */
	@DbField(name = "OrgCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ORGANIZATION = registerProperty(PROPERTY_ORGANIZATION_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据所属组织
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ORGANIZATION_NAME)
	public final String getOrganization() {
		return this.getProperty(PROPERTY_ORGANIZATION);
	}

	/**
	 * 设置-数据所属组织
	 * 
	 * @param value 值
	 */
	public final void setOrganization(String value) {
		this.setProperty(PROPERTY_ORGANIZATION, value);
	}

	/**
	* 属性名称-备注
	*/
	private static final String PROPERTY_REMARKS_NAME = "Remarks";

	/**
	* 备注 属性
	*/
	@DbField(name = "Remarks", type = DbFieldType.MEMO, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_REMARKS = registerProperty(PROPERTY_REMARKS_NAME, String.class,
			MY_CLASS);

	/**
	* 获取-备注
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_REMARKS_NAME)
	public final String getRemarks() {
		return this.getProperty(PROPERTY_REMARKS);
	}

	/**
	* 设置-备注
	* 
	* @param value 值
	*/
	public final void setRemarks(String value) {
		this.setProperty(PROPERTY_REMARKS, value);
	}

	/**
	* 初始化数据
	*/
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setBusinessPartnerType(emBusinessPartnerType.CUSTOMER);
	}

}
