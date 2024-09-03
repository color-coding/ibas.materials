package org.colorcoding.ibas.materials.bo.materialnumberassociation;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.mapping.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
* 物料系号关联
* 
*/
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialNumberAssociation.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = MaterialNumberAssociation.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = MaterialNumberAssociation.BUSINESS_OBJECT_CODE)
public class MaterialNumberAssociation extends BusinessObject<MaterialNumberAssociation>
		implements IMaterialNumberAssociation {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 9182673634670842431L;

	/**
	* 当前类型
	*/
	private static final Class<?> MY_CLASS = MaterialNumberAssociation.class;

	/**
	* 数据库表
	*/
	public static final String DB_TABLE_NAME = "${Company}_MM_OMNA";

	/**
	* 业务对象编码
	*/
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_NUMASSOC";

	/**
	* 业务对象名称
	*/
	public static final String BUSINESS_OBJECT_NAME = "MaterialNumberAssociation";

	/**
	* 属性名称-基于单据类型
	*/
	private static final String PROPERTY_BASEDOCUMENTTYPE_NAME = "BaseDocumentType";

	/**
	* 基于单据类型 属性
	*/
	@DbField(name = "BaseType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_BASEDOCUMENTTYPE = registerProperty(
			PROPERTY_BASEDOCUMENTTYPE_NAME, String.class, MY_CLASS);

	/**
	* 获取-基于单据类型
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_BASEDOCUMENTTYPE_NAME)
	public final String getBaseDocumentType() {
		return this.getProperty(PROPERTY_BASEDOCUMENTTYPE);
	}

	/**
	* 设置-基于单据类型
	* 
	* @param value 值
	*/
	public final void setBaseDocumentType(String value) {
		this.setProperty(PROPERTY_BASEDOCUMENTTYPE, value);
	}

	/**
	* 属性名称-基于单据编号
	*/
	private static final String PROPERTY_BASEDOCUMENTENTRY_NAME = "BaseDocumentEntry";

	/**
	* 基于单据编号 属性
	*/
	@DbField(name = "BaseEntry", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_BASEDOCUMENTENTRY = registerProperty(
			PROPERTY_BASEDOCUMENTENTRY_NAME, Integer.class, MY_CLASS);

	/**
	* 获取-基于单据编号
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_BASEDOCUMENTENTRY_NAME)
	public final Integer getBaseDocumentEntry() {
		return this.getProperty(PROPERTY_BASEDOCUMENTENTRY);
	}

	/**
	* 设置-基于单据编号
	* 
	* @param value 值
	*/
	public final void setBaseDocumentEntry(Integer value) {
		this.setProperty(PROPERTY_BASEDOCUMENTENTRY, value);
	}

	/**
	* 属性名称-基于单据行号
	*/
	private static final String PROPERTY_BASEDOCUMENTLINEID_NAME = "BaseDocumentLineId";

	/**
	* 基于单据行号 属性
	*/
	@DbField(name = "BaseLine", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_BASEDOCUMENTLINEID = registerProperty(
			PROPERTY_BASEDOCUMENTLINEID_NAME, Integer.class, MY_CLASS);

	/**
	* 获取-基于单据行号
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_BASEDOCUMENTLINEID_NAME)
	public final Integer getBaseDocumentLineId() {
		return this.getProperty(PROPERTY_BASEDOCUMENTLINEID);
	}

	/**
	* 设置-基于单据行号
	* 
	* @param value 值
	*/
	public final void setBaseDocumentLineId(Integer value) {
		this.setProperty(PROPERTY_BASEDOCUMENTLINEID, value);
	}

	/**
	* 属性名称-关系
	*/
	private static final String PROPERTY_RELATION_NAME = "Relation";

	/**
	* 关系 属性
	*/
	@DbField(name = "Relation", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_RELATION = registerProperty(PROPERTY_RELATION_NAME, String.class,
			MY_CLASS);

	/**
	* 获取-关系
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_RELATION_NAME)
	public final String getRelation() {
		return this.getProperty(PROPERTY_RELATION);
	}

	/**
	* 设置-关系
	* 
	* @param value 值
	*/
	public final void setRelation(String value) {
		this.setProperty(PROPERTY_RELATION, value);
	}

	/**
	* 属性名称-物料编码
	*/
	private static final String PROPERTY_ITEMCODE_NAME = "ItemCode";

	/**
	* 物料编码 属性
	*/
	@DbField(name = "ItemCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-仓库编码
	*/
	private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

	/**
	* 仓库编码 属性
	*/
	@DbField(name = "WhsCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-批次编码
	*/
	private static final String PROPERTY_BATCHCODE_NAME = "BatchCode";

	/**
	* 批次编码 属性
	*/
	@DbField(name = "BatchCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_BATCHCODE = registerProperty(PROPERTY_BATCHCODE_NAME,
			String.class, MY_CLASS);

	/**
	* 获取-批次编码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_BATCHCODE_NAME)
	public final String getBatchCode() {
		return this.getProperty(PROPERTY_BATCHCODE);
	}

	/**
	* 设置-批次编码
	* 
	* @param value 值
	*/
	public final void setBatchCode(String value) {
		this.setProperty(PROPERTY_BATCHCODE, value);
	}

	/**
	* 属性名称-序列编码
	*/
	private static final String PROPERTY_SERIALCODE_NAME = "SerialCode";

	/**
	* 序列编码 属性
	*/
	@DbField(name = "SerialCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-关联物料编码
	*/
	private static final String PROPERTY_ASSOCIATEDITEM_NAME = "AssociatedItem";

	/**
	* 关联物料编码 属性
	*/
	@DbField(name = "AssocItem", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ASSOCIATEDITEM = registerProperty(PROPERTY_ASSOCIATEDITEM_NAME,
			String.class, MY_CLASS);

	/**
	* 获取-关联物料编码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ASSOCIATEDITEM_NAME)
	public final String getAssociatedItem() {
		return this.getProperty(PROPERTY_ASSOCIATEDITEM);
	}

	/**
	* 设置-关联物料编码
	* 
	* @param value 值
	*/
	public final void setAssociatedItem(String value) {
		this.setProperty(PROPERTY_ASSOCIATEDITEM, value);
	}

	/**
	* 属性名称-关联仓库编码
	*/
	private static final String PROPERTY_ASSOCIATEDWAREHOUSE_NAME = "AssociatedWarehouse";

	/**
	* 关联仓库编码 属性
	*/
	@DbField(name = "AssocWhs", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ASSOCIATEDWAREHOUSE = registerProperty(
			PROPERTY_ASSOCIATEDWAREHOUSE_NAME, String.class, MY_CLASS);

	/**
	* 获取-关联仓库编码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ASSOCIATEDWAREHOUSE_NAME)
	public final String getAssociatedWarehouse() {
		return this.getProperty(PROPERTY_ASSOCIATEDWAREHOUSE);
	}

	/**
	* 设置-关联仓库编码
	* 
	* @param value 值
	*/
	public final void setAssociatedWarehouse(String value) {
		this.setProperty(PROPERTY_ASSOCIATEDWAREHOUSE, value);
	}

	/**
	* 属性名称-关联批次编码
	*/
	private static final String PROPERTY_ASSOCIATEDBATCH_NAME = "AssociatedBatch";

	/**
	* 关联批次编码 属性
	*/
	@DbField(name = "AssocBatch", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ASSOCIATEDBATCH = registerProperty(PROPERTY_ASSOCIATEDBATCH_NAME,
			String.class, MY_CLASS);

	/**
	* 获取-关联批次编码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ASSOCIATEDBATCH_NAME)
	public final String getAssociatedBatch() {
		return this.getProperty(PROPERTY_ASSOCIATEDBATCH);
	}

	/**
	* 设置-关联批次编码
	* 
	* @param value 值
	*/
	public final void setAssociatedBatch(String value) {
		this.setProperty(PROPERTY_ASSOCIATEDBATCH, value);
	}

	/**
	* 属性名称-关联序列编码
	*/
	private static final String PROPERTY_ASSOCIATEDSERIAL_NAME = "AssociatedSerial";

	/**
	* 关联序列编码 属性
	*/
	@DbField(name = "AssocSerial", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ASSOCIATEDSERIAL = registerProperty(
			PROPERTY_ASSOCIATEDSERIAL_NAME, String.class, MY_CLASS);

	/**
	* 获取-关联序列编码
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ASSOCIATEDSERIAL_NAME)
	public final String getAssociatedSerial() {
		return this.getProperty(PROPERTY_ASSOCIATEDSERIAL);
	}

	/**
	* 设置-关联序列编码
	* 
	* @param value 值
	*/
	public final void setAssociatedSerial(String value) {
		this.setProperty(PROPERTY_ASSOCIATEDSERIAL, value);
	}

	/**
	* 属性名称-数量
	*/
	private static final String PROPERTY_QUANTITY_NAME = "Quantity";

	/**
	* 数量 属性
	*/
	@DbField(name = "Quantity", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_QUANTITY = registerProperty(PROPERTY_QUANTITY_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	* 获取-数量
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_QUANTITY_NAME)
	public final BigDecimal getQuantity() {
		return this.getProperty(PROPERTY_QUANTITY);
	}

	/**
	* 设置-数量
	* 
	* @param value 值
	*/
	public final void setQuantity(BigDecimal value) {
		this.setProperty(PROPERTY_QUANTITY, value);
	}

	/**
	* 属性名称-原因
	*/
	private static final String PROPERTY_CAUSES_NAME = "Causes";

	/**
	* 原因 属性
	*/
	@DbField(name = "Causes", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_CAUSES = registerProperty(PROPERTY_CAUSES_NAME, String.class,
			MY_CLASS);

	/**
	* 获取-原因
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_CAUSES_NAME)
	public final String getCauses() {
		return this.getProperty(PROPERTY_CAUSES);
	}

	/**
	* 设置-原因
	* 
	* @param value 值
	*/
	public final void setCauses(String value) {
		this.setProperty(PROPERTY_CAUSES, value);
	}

	/**
	* 属性名称-失效日期
	*/
	private static final String PROPERTY_EXPIRATIONDATE_NAME = "ExpirationDate";

	/**
	* 失效日期 属性
	*/
	@DbField(name = "ExpDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
	public static final IPropertyInfo<DateTime> PROPERTY_EXPIRATIONDATE = registerProperty(PROPERTY_EXPIRATIONDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	* 获取-失效日期
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_EXPIRATIONDATE_NAME)
	public final DateTime getExpirationDate() {
		return this.getProperty(PROPERTY_EXPIRATIONDATE);
	}

	/**
	* 设置-失效日期
	* 
	* @param value 值
	*/
	public final void setExpirationDate(DateTime value) {
		this.setProperty(PROPERTY_EXPIRATIONDATE, value);
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

	}

}
