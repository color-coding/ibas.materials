package org.colorcoding.ibas.materials.bo.material;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMinValue;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 获取-物料
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Material.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Material.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BOCode(Material.BUSINESS_OBJECT_CODE)
public class Material extends MaterialBase<Material> implements IMaterial, IDataOwnership, IApprovalData {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -4979250287382115515L;

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Material";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_MATERIAL";
	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Material.class;

	/**
	 * 属性名称-采购物料
	 */
	private static final String PROPERTY_PURCHASEITEM_NAME = "PurchaseItem";

	/**
	 * 采购物料 属性
	 */
	@DbField(name = "PrchseItem", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_PURCHASEITEM = registerProperty(PROPERTY_PURCHASEITEM_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-采购物料
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PURCHASEITEM_NAME)
	public final emYesNo getPurchaseItem() {
		return this.getProperty(PROPERTY_PURCHASEITEM);
	}

	/**
	 * 设置-采购物料
	 * 
	 * @param value
	 *            值
	 */
	public final void setPurchaseItem(emYesNo value) {
		this.setProperty(PROPERTY_PURCHASEITEM, value);
	}

	/**
	 * 属性名称-销售物料
	 */
	private static final String PROPERTY_SALESITEM_NAME = "SalesItem";

	/**
	 * 销售物料 属性
	 */
	@DbField(name = "SalesItem", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_SALESITEM = registerProperty(PROPERTY_SALESITEM_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-销售物料
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SALESITEM_NAME)
	public final emYesNo getSalesItem() {
		return this.getProperty(PROPERTY_SALESITEM);
	}

	/**
	 * 设置-销售物料
	 * 
	 * @param value
	 *            值
	 */
	public final void setSalesItem(emYesNo value) {
		this.setProperty(PROPERTY_SALESITEM, value);
	}

	/**
	 * 属性名称-固定资产
	 */
	private static final String PROPERTY_FIXEDASSETS_NAME = "FixedAssets";

	/**
	 * 固定资产 属性
	 */
	@DbField(name = "AssetItem", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_FIXEDASSETS = registerProperty(PROPERTY_FIXEDASSETS_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-固定资产
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_FIXEDASSETS_NAME)
	public final emYesNo getFixedAssets() {
		return this.getProperty(PROPERTY_FIXEDASSETS);
	}

	/**
	 * 设置-固定资产
	 * 
	 * @param value
	 *            值
	 */
	public final void setFixedAssets(emYesNo value) {
		this.setProperty(PROPERTY_FIXEDASSETS, value);
	}

	/**
	 * 属性名称-首选供应商
	 */
	private static final String PROPERTY_PREFERREDVENDOR_NAME = "PreferredVendor";

	/**
	 * 首选供应商 属性
	 */
	@DbField(name = "Vendor", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_PREFERREDVENDOR = registerProperty(PROPERTY_PREFERREDVENDOR_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-首选供应商
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PREFERREDVENDOR_NAME)
	public final String getPreferredVendor() {
		return this.getProperty(PROPERTY_PREFERREDVENDOR);
	}

	/**
	 * 设置-首选供应商
	 * 
	 * @param value
	 *            值
	 */
	public final void setPreferredVendor(String value) {
		this.setProperty(PROPERTY_PREFERREDVENDOR, value);
	}

	/**
	 * 属性名称-价格
	 */
	private static final String PROPERTY_AVGPRICE_NAME = "AvgPrice";

	/**
	 * 价格 属性
	 */
	@DbField(name = "AvgPrice", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_AVGPRICE = registerProperty(PROPERTY_AVGPRICE_NAME,
			Decimal.class, MY_CLASS);

	/**
	 * 获取-价格
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_AVGPRICE_NAME)
	public final Decimal getAvgPrice() {
		return this.getProperty(PROPERTY_AVGPRICE);
	}

	/**
	 * 设置-价格
	 *
	 * @param value
	 *            值
	 */
	public final void setAvgPrice(Decimal value) {
		this.setProperty(PROPERTY_AVGPRICE, value);
	}

	/**
	 * 设置-价格
	 *
	 * @param value
	 *            值
	 */
	public final void setAvgPrice(String value) {
		this.setAvgPrice(new Decimal(value));
	}

	/**
	 * 设置-价格
	 *
	 * @param value
	 *            值
	 */
	public final void setAvgPrice(int value) {
		this.setAvgPrice(new Decimal(value));
	}

	/**
	 * 设置-价格
	 *
	 * @param value
	 *            值
	 */
	public final void setAvgPrice(double value) {
		this.setAvgPrice(new Decimal(value));
	}

	/**
	 * 属性名称-最低库存量
	 */
	private static final String PROPERTY_MINIMUMINVENTORY_NAME = "MinimumInventory";

	/**
	 * 最低库存量 属性
	 */
	@DbField(name = "MinInvnt", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_MINIMUMINVENTORY = registerProperty(
			PROPERTY_MINIMUMINVENTORY_NAME, Decimal.class, MY_CLASS);

	/**
	 * 获取-最低库存量
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MINIMUMINVENTORY_NAME)
	public final Decimal getMinimumInventory() {
		return this.getProperty(PROPERTY_MINIMUMINVENTORY);
	}

	/**
	 * 设置-最低库存量
	 *
	 * @param value
	 *            值
	 */
	public final void setMinimumInventory(Decimal value) {
		this.setProperty(PROPERTY_MINIMUMINVENTORY, value);
	}

	/**
	 * 设置-最低库存量
	 *
	 * @param value
	 *            值
	 */
	public final void setMinimumInventory(String value) {
		this.setMinimumInventory(new Decimal(value));
	}

	/**
	 * 设置-最低库存量
	 *
	 * @param value
	 *            值
	 */
	public final void setMinimumInventory(int value) {
		this.setMinimumInventory(new Decimal(value));
	}

	/**
	 * 设置-最低库存量
	 *
	 * @param value
	 *            值
	 */
	public final void setMinimumInventory(double value) {
		this.setMinimumInventory(new Decimal(value));
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
	 * 属性名称-审批状态
	 */
	private static final String PROPERTY_APPROVALSTATUS_NAME = "ApprovalStatus";

	/**
	 * 审批状态 属性
	 */
	@DbField(name = "ApvlStatus", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emApprovalStatus> PROPERTY_APPROVALSTATUS = registerProperty(
			PROPERTY_APPROVALSTATUS_NAME, emApprovalStatus.class, MY_CLASS);

	/**
	 * 获取-审批状态
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_APPROVALSTATUS_NAME)
	public final emApprovalStatus getApprovalStatus() {
		return this.getProperty(PROPERTY_APPROVALSTATUS);
	}

	/**
	 * 设置-审批状态
	 * 
	 * @param value
	 *            值
	 */
	public final void setApprovalStatus(emApprovalStatus value) {
		this.setProperty(PROPERTY_APPROVALSTATUS, value);
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
	 * 属性名称-已删除
	 */
	private static final String PROPERTY_DELETED_NAME = "Deleted";

	/**
	 * 已删除 属性
	 */
	@DbField(name = "Deleted", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_DELETED = registerProperty(PROPERTY_DELETED_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-已删除
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DELETED_NAME)
	public final emYesNo getDeleted() {
		return this.getProperty(PROPERTY_DELETED);
	}

	/**
	 * 设置-已删除
	 * 
	 * @param value
	 *            值
	 */
	public final void setDeleted(emYesNo value) {
		this.setProperty(PROPERTY_DELETED, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setActivated(emYesNo.YES);
	}

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleRequired(PROPERTY_CODE), // 要求有值
				new BusinessRuleMinValue<Decimal>(Decimal.ZERO, PROPERTY_ONHAND, PROPERTY_ONORDERED,
						PROPERTY_ONCOMMITED, PROPERTY_AVGPRICE), // 不能低于0
		};
	}
}
