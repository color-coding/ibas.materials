package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlElement;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.materials.data.emIssueMethod;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emPlanningMethod;
import org.colorcoding.ibas.materials.data.emProcurementMethod;
import org.colorcoding.ibas.materials.data.emValuationMethod;

public abstract class MaterialBase<T extends MaterialBase<T>> extends BusinessObject<T> {

	private static final long serialVersionUID = 6631440022403617225L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialBase.class;
	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_MATERIAL";

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_OITM";

	/**
	 * 属性名称-编码
	 */
	private static final String PROPERTY_CODE_NAME = "Code";

	/**
	 * 编码 属性
	 */
	@DbField(name = "Code", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_CODE = registerProperty(PROPERTY_CODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CODE_NAME)
	public final String getCode() {
		return this.getProperty(PROPERTY_CODE);
	}

	/**
	 * 设置-编码
	 * 
	 * @param value 值
	 */
	public final void setCode(String value) {
		this.setProperty(PROPERTY_CODE, value);
	}

	/**
	 * 属性名称-名称
	 */
	private static final String PROPERTY_NAME_NAME = "Name";

	/**
	 * 名称 属性
	 */
	@DbField(name = "Name", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_NAME = registerProperty(PROPERTY_NAME_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_NAME_NAME)
	public final String getName() {
		return this.getProperty(PROPERTY_NAME);
	}

	/**
	 * 设置-名称
	 * 
	 * @param value 值
	 */
	public final void setName(String value) {
		this.setProperty(PROPERTY_NAME, value);
	}

	/**
	 * 属性名称-外文名称
	 */
	private static final String PROPERTY_FOREIGNNAME_NAME = "ForeignName";

	/**
	 * 外文名称 属性
	 */
	@DbField(name = "FrgnName", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_FOREIGNNAME = registerProperty(PROPERTY_FOREIGNNAME_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-外文名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_FOREIGNNAME_NAME)
	public final String getForeignName() {
		return this.getProperty(PROPERTY_FOREIGNNAME);
	}

	/**
	 * 设置-外文名称
	 * 
	 * @param value 值
	 */
	public final void setForeignName(String value) {
		this.setProperty(PROPERTY_FOREIGNNAME, value);
	}

	/**
	 * 属性名称-标识
	 */
	private static final String PROPERTY_SIGN_NAME = "Sign";

	/**
	 * 标识 属性
	 */
	@DbField(name = "Sign", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_SIGN = registerProperty(PROPERTY_SIGN_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SIGN_NAME)
	public final String getSign() {
		return this.getProperty(PROPERTY_SIGN);
	}

	/**
	 * 设置-标识
	 * 
	 * @param value 值
	 */
	public final void setSign(String value) {
		this.setProperty(PROPERTY_SIGN, value);
	}

	/**
	 * 属性名称-物料组
	 */
	private static final String PROPERTY_GROUP_NAME = "Group";

	/**
	 * 物料组 属性
	 */
	@DbField(name = "Group", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_GROUP = registerProperty(PROPERTY_GROUP_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-物料组
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_GROUP_NAME)
	public final String getGroup() {
		return this.getProperty(PROPERTY_GROUP);
	}

	/**
	 * 设置-物料组
	 * 
	 * @param value 值
	 */
	public final void setGroup(String value) {
		this.setProperty(PROPERTY_GROUP, value);
	}

	/**
	 * 属性名称-激活
	 */
	private static final String PROPERTY_ACTIVATED_NAME = "Activated";

	/**
	 * 激活 属性
	 */
	@DbField(name = "Activated", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_ACTIVATED = registerProperty(PROPERTY_ACTIVATED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-激活
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIVATED_NAME)
	public final emYesNo getActivated() {
		return this.getProperty(PROPERTY_ACTIVATED);
	}

	/**
	 * 设置-激活
	 * 
	 * @param value 值
	 */
	public final void setActivated(emYesNo value) {
		this.setProperty(PROPERTY_ACTIVATED, value);
	}

	/**
	 * 属性名称-条形码
	 */
	private static final String PROPERTY_BARCODE_NAME = "BarCode";

	/**
	 * 条形码 属性
	 */
	@DbField(name = "BarCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_BARCODE = registerProperty(PROPERTY_BARCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-条形码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BARCODE_NAME)
	public final String getBarCode() {
		return this.getProperty(PROPERTY_BARCODE);
	}

	/**
	 * 设置-条形码
	 * 
	 * @param value 值
	 */
	public final void setBarCode(String value) {
		this.setProperty(PROPERTY_BARCODE, value);
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
	 * @param value 值
	 */
	public final void setItemType(emItemType value) {
		this.setProperty(PROPERTY_ITEMTYPE, value);
	}

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
	 * @param value 值
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
	 * @param value 值
	 */
	public final void setSalesItem(emYesNo value) {
		this.setProperty(PROPERTY_SALESITEM, value);
	}

	/**
	 * 属性名称-库存物料
	 */
	private static final String PROPERTY_INVENTORYITEM_NAME = "InventoryItem";

	/**
	 * 库存物料 属性
	 */
	@DbField(name = "InvntItem", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_INVENTORYITEM = registerProperty(PROPERTY_INVENTORYITEM_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-库存物料
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_INVENTORYITEM_NAME)
	public final emYesNo getInventoryItem() {
		return this.getProperty(PROPERTY_INVENTORYITEM);
	}

	/**
	 * 设置-库存物料
	 * 
	 * @param value 值
	 */
	public final void setInventoryItem(emYesNo value) {
		this.setProperty(PROPERTY_INVENTORYITEM, value);
	}

	/**
	 * 属性名称-虚拟物料
	 */
	private static final String PROPERTY_PHANTOMITEM_NAME = "PhantomItem";

	/**
	 * 虚拟物料 属性
	 */
	@DbField(name = "PhantomItem", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_PHANTOMITEM = registerProperty(PROPERTY_PHANTOMITEM_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-虚拟物料
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PHANTOMITEM_NAME)
	public final emYesNo getPhantomItem() {
		return this.getProperty(PROPERTY_PHANTOMITEM);
	}

	/**
	 * 设置-虚拟物料
	 * 
	 * @param value 值
	 */
	public final void setPhantomItem(emYesNo value) {
		this.setProperty(PROPERTY_PHANTOMITEM, value);
	}

	/**
	 * 属性名称-缺省仓库
	 */
	private static final String PROPERTY_DEFAULTWAREHOUSE_NAME = "DefaultWarehouse";

	/**
	 * 缺省仓库 属性
	 */
	@DbField(name = "DfltWhs", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DEFAULTWAREHOUSE = registerProperty(
			PROPERTY_DEFAULTWAREHOUSE_NAME, String.class, MY_CLASS);

	/**
	 * 获取-缺省仓库
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DEFAULTWAREHOUSE_NAME)
	public final String getDefaultWarehouse() {
		return this.getProperty(PROPERTY_DEFAULTWAREHOUSE);
	}

	/**
	 * 设置-缺省仓库
	 * 
	 * @param value 值
	 */
	public final void setDefaultWarehouse(String value) {
		this.setProperty(PROPERTY_DEFAULTWAREHOUSE, value);
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
	 * @param value 值
	 */
	public final void setPreferredVendor(String value) {
		this.setProperty(PROPERTY_PREFERREDVENDOR, value);
	}

	/**
	 * 属性名称-生产商
	 */
	private static final String PROPERTY_MANUFACTURER_NAME = "Manufacturer";

	/**
	 * 生产商 属性
	 */
	@DbField(name = "Manufacturer", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_MANUFACTURER = registerProperty(PROPERTY_MANUFACTURER_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-生产商
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MANUFACTURER_NAME)
	public final String getManufacturer() {
		return this.getProperty(PROPERTY_MANUFACTURER);
	}

	/**
	 * 设置-生产商
	 * 
	 * @param value 值
	 */
	public final void setManufacturer(String value) {
		this.setProperty(PROPERTY_MANUFACTURER, value);
	}

	/**
	 * 属性名称-库存单位
	 */
	private static final String PROPERTY_INVENTORYUOM_NAME = "InventoryUOM";

	/**
	 * 库存单位 属性
	 */
	@DbField(name = "InvntUom", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_INVENTORYUOM = registerProperty(PROPERTY_INVENTORYUOM_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-库存单位
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_INVENTORYUOM_NAME)
	public final String getInventoryUOM() {
		return this.getProperty(PROPERTY_INVENTORYUOM);
	}

	/**
	 * 设置-库存单位
	 * 
	 * @param value 值
	 */
	public final void setInventoryUOM(String value) {
		this.setProperty(PROPERTY_INVENTORYUOM, value);
	}

	/**
	 * 属性名称-评估方法
	 */
	private static final String PROPERTY_VALUATIONMETHOD_NAME = "ValuationMethod";

	/**
	 * 评估方法 属性
	 */
	@DbField(name = "VaMethod", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emValuationMethod> PROPERTY_VALUATIONMETHOD = registerProperty(
			PROPERTY_VALUATIONMETHOD_NAME, emValuationMethod.class, MY_CLASS);

	/**
	 * 获取-评估方法
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VALUATIONMETHOD_NAME)
	public final emValuationMethod getValuationMethod() {
		return this.getProperty(PROPERTY_VALUATIONMETHOD);
	}

	/**
	 * 设置-评估方法
	 * 
	 * @param value 值
	 */
	public final void setValuationMethod(emValuationMethod value) {
		this.setProperty(PROPERTY_VALUATIONMETHOD, value);
	}

	/**
	 * 属性名称-库存
	 */
	private static final String PROPERTY_ONHAND_NAME = "OnHand";

	/**
	 * 库存 属性
	 */
	@DbField(name = "OnHand", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_ONHAND = registerProperty(PROPERTY_ONHAND_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-库存
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONHAND_NAME)
	public final BigDecimal getOnHand() {
		return this.getProperty(PROPERTY_ONHAND);
	}

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	public final void setOnHand(BigDecimal value) {
		this.setProperty(PROPERTY_ONHAND, value);
	}

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	public final void setOnHand(String value) {
		this.setOnHand(Decimal.valueOf(value));
	}

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	public final void setOnHand(int value) {
		this.setOnHand(Decimal.valueOf(value));
	}

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	public final void setOnHand(double value) {
		this.setOnHand(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-已承诺
	 */
	private static final String PROPERTY_ONCOMMITED_NAME = "OnCommited";

	/**
	 * 已承诺 属性
	 */
	@DbField(name = "OnCommited", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_ONCOMMITED = registerProperty(PROPERTY_ONCOMMITED_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-已承诺
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONCOMMITED_NAME)
	public final BigDecimal getOnCommited() {
		return this.getProperty(PROPERTY_ONCOMMITED);
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	public final void setOnCommited(BigDecimal value) {
		this.setProperty(PROPERTY_ONCOMMITED, value);
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	public final void setOnCommited(String value) {
		this.setOnCommited(Decimal.valueOf(value));
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	public final void setOnCommited(int value) {
		this.setOnCommited(Decimal.valueOf(value));
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	public final void setOnCommited(double value) {
		this.setOnCommited(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-已订购
	 */
	private static final String PROPERTY_ONORDERED_NAME = "OnOrdered";

	/**
	 * 已订购 属性
	 */
	@DbField(name = "OnOrdered", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_ONORDERED = registerProperty(PROPERTY_ONORDERED_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-已订购
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONORDERED_NAME)
	public final BigDecimal getOnOrdered() {
		return this.getProperty(PROPERTY_ONORDERED);
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	public final void setOnOrdered(BigDecimal value) {
		this.setProperty(PROPERTY_ONORDERED, value);
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	public final void setOnOrdered(String value) {
		this.setOnOrdered(Decimal.valueOf(value));
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	public final void setOnOrdered(int value) {
		this.setOnOrdered(Decimal.valueOf(value));
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	public final void setOnOrdered(double value) {
		this.setOnOrdered(Decimal.valueOf(value));
	}

	/**
	 * 属性名称-已预留
	 */
	private static final String PROPERTY_ONRESERVED_NAME = "OnReserved";

	/**
	 * 已预留 属性
	 */
	@DbField(name = "OnReserved", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_ONRESERVED = registerProperty(PROPERTY_ONRESERVED_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-已预留
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONRESERVED_NAME)
	public final BigDecimal getOnReserved() {
		return this.getProperty(PROPERTY_ONRESERVED);
	}

	/**
	 * 设置-已预留
	 * 
	 * @param value 值
	 */
	public final void setOnReserved(BigDecimal value) {
		this.setProperty(PROPERTY_ONRESERVED, value);
	}

	/**
	 * 属性名称-提前期（天）
	 */
	private static final String PROPERTY_LEADTIME_NAME = "LeadTime";

	/**
	 * 提前期（天） 属性
	 */
	@DbField(name = "LeadTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LEADTIME = registerProperty(PROPERTY_LEADTIME_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-提前期（天）
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LEADTIME_NAME)
	public final Integer getLeadTime() {
		return this.getProperty(PROPERTY_LEADTIME);
	}

	/**
	 * 设置-提前期（天）
	 * 
	 * @param value 值
	 */
	public final void setLeadTime(Integer value) {
		this.setProperty(PROPERTY_LEADTIME, value);
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
	 * 属性名称-版本管理
	 */
	private static final String PROPERTY_VERSIONMANAGEMENT_NAME = "VersionManagement";

	/**
	 * 版本管理 属性
	 */
	@DbField(name = "VersonMgment", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emYesNo> PROPERTY_VERSIONMANAGEMENT = registerProperty(
			PROPERTY_VERSIONMANAGEMENT_NAME, emYesNo.class, MY_CLASS);

	/**
	 * 获取-版本管理
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VERSIONMANAGEMENT_NAME)
	public final emYesNo getVersionManagement() {
		return this.getProperty(PROPERTY_VERSIONMANAGEMENT);
	}

	/**
	 * 设置-版本管理
	 * 
	 * @param value 值
	 */
	public final void setVersionManagement(emYesNo value) {
		this.setProperty(PROPERTY_VERSIONMANAGEMENT, value);
	}

	/**
	 * 属性名称-采购税收组
	 */
	private static final String PROPERTY_PURCHASETAXGROUP_NAME = "PurchaseTaxGroup";

	/**
	 * 采购税收组 属性
	 */
	@DbField(name = "PrchseTax", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_PURCHASETAXGROUP = registerProperty(
			PROPERTY_PURCHASETAXGROUP_NAME, String.class, MY_CLASS);

	/**
	 * 获取-采购税收组
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PURCHASETAXGROUP_NAME)
	public final String getPurchaseTaxGroup() {
		return this.getProperty(PROPERTY_PURCHASETAXGROUP);
	}

	/**
	 * 设置-采购税收组
	 * 
	 * @param value 值
	 */
	public final void setPurchaseTaxGroup(String value) {
		this.setProperty(PROPERTY_PURCHASETAXGROUP, value);
	}

	/**
	 * 属性名称-销售税收组
	 */
	private static final String PROPERTY_SALESTAXGROUP_NAME = "SalesTaxGroup";

	/**
	 * 销售税收组 属性
	 */
	@DbField(name = "SalesTax", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_SALESTAXGROUP = registerProperty(PROPERTY_SALESTAXGROUP_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-销售税收组
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SALESTAXGROUP_NAME)
	public final String getSalesTaxGroup() {
		return this.getProperty(PROPERTY_SALESTAXGROUP);
	}

	/**
	 * 设置-销售税收组
	 * 
	 * @param value 值
	 */
	public final void setSalesTaxGroup(String value) {
		this.setProperty(PROPERTY_SALESTAXGROUP, value);
	}

	/**
	 * 属性名称-采购单位
	 */
	private static final String PROPERTY_PURCHASEUOM_NAME = "PurchaseUOM";

	/**
	 * 采购单位 属性
	 */
	@DbField(name = "PrchseUom", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_PURCHASEUOM = registerProperty(PROPERTY_PURCHASEUOM_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-采购单位
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PURCHASEUOM_NAME)
	public final String getPurchaseUOM() {
		return this.getProperty(PROPERTY_PURCHASEUOM);
	}

	/**
	 * 设置-采购单位
	 * 
	 * @param value 值
	 */
	public final void setPurchaseUOM(String value) {
		this.setProperty(PROPERTY_PURCHASEUOM, value);
	}

	/**
	 * 属性名称-销售单位
	 */
	private static final String PROPERTY_SALESUOM_NAME = "SalesUOM";

	/**
	 * 销售单位 属性
	 */
	@DbField(name = "SalesUom", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_SALESUOM = registerProperty(PROPERTY_SALESUOM_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-销售单位
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SALESUOM_NAME)
	public final String getSalesUOM() {
		return this.getProperty(PROPERTY_SALESUOM);
	}

	/**
	 * 设置-销售单位
	 * 
	 * @param value 值
	 */
	public final void setSalesUOM(String value) {
		this.setProperty(PROPERTY_SALESUOM, value);
	}

	/**
	 * 属性名称-生产单位
	 */
	private static final String PROPERTY_PRODUCTIONUOM_NAME = "ProductionUOM";

	/**
	 * 生产单位 属性
	 */
	@DbField(name = "PrdctUom", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_PRODUCTIONUOM = registerProperty(PROPERTY_PRODUCTIONUOM_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-生产单位
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PRODUCTIONUOM_NAME)
	public final String getProductionUOM() {
		return this.getProperty(PROPERTY_PRODUCTIONUOM);
	}

	/**
	 * 设置-生产单位
	 * 
	 * @param value 值
	 */
	public final void setProductionUOM(String value) {
		this.setProperty(PROPERTY_PRODUCTIONUOM, value);
	}

	/**
	 * 属性名称-获取方式
	 */
	private static final String PROPERTY_PROCUREMENTMETHOD_NAME = "ProcurementMethod";

	/**
	 * 获取方式 属性
	 */
	@DbField(name = "PrcumtMthd", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emProcurementMethod> PROPERTY_PROCUREMENTMETHOD = registerProperty(
			PROPERTY_PROCUREMENTMETHOD_NAME, emProcurementMethod.class, MY_CLASS);

	/**
	 * 获取-获取方式
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PROCUREMENTMETHOD_NAME)
	public final emProcurementMethod getProcurementMethod() {
		return this.getProperty(PROPERTY_PROCUREMENTMETHOD);
	}

	/**
	 * 设置-获取方式
	 * 
	 * @param value 值
	 */
	public final void setProcurementMethod(emProcurementMethod value) {
		this.setProperty(PROPERTY_PROCUREMENTMETHOD, value);
	}

	/**
	 * 属性名称-领料方式
	 */
	private static final String PROPERTY_ISSUEMETHOD_NAME = "IssueMethod";

	/**
	 * 领料方式 属性
	 */
	@DbField(name = "IssueMthd", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emIssueMethod> PROPERTY_ISSUEMETHOD = registerProperty(PROPERTY_ISSUEMETHOD_NAME,
			emIssueMethod.class, MY_CLASS);

	/**
	 * 获取-领料方式
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ISSUEMETHOD_NAME)
	public final emIssueMethod getIssueMethod() {
		return this.getProperty(PROPERTY_ISSUEMETHOD);
	}

	/**
	 * 设置-领料方式
	 * 
	 * @param value 值
	 */
	public final void setIssueMethod(emIssueMethod value) {
		this.setProperty(PROPERTY_ISSUEMETHOD, value);
	}

	/**
	 * 属性名称-计划方式
	 */
	private static final String PROPERTY_PLANNINGMETHOD_NAME = "PlanningMethod";

	/**
	 * 计划方式 属性
	 */
	@DbField(name = "PlanMthd", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emPlanningMethod> PROPERTY_PLANNINGMETHOD = registerProperty(
			PROPERTY_PLANNINGMETHOD_NAME, emPlanningMethod.class, MY_CLASS);

	/**
	 * 获取-计划方式
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PLANNINGMETHOD_NAME)
	public final emPlanningMethod getPlanningMethod() {
		return this.getProperty(PROPERTY_PLANNINGMETHOD);
	}

	/**
	 * 设置-计划方式
	 * 
	 * @param value 值
	 */
	public final void setPlanningMethod(emPlanningMethod value) {
		this.setProperty(PROPERTY_PLANNINGMETHOD, value);
	}

	/**
	 * 属性名称-齐套检查
	 */
	private static final String PROPERTY_CHECKCOMPLETENESS_NAME = "CheckCompleteness";

	/**
	 * 齐套检查 属性
	 */
	@DbField(name = "CheckCmpltns", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emYesNo> PROPERTY_CHECKCOMPLETENESS = registerProperty(
			PROPERTY_CHECKCOMPLETENESS_NAME, emYesNo.class, MY_CLASS);

	/**
	 * 获取-齐套检查
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CHECKCOMPLETENESS_NAME)
	public final emYesNo getCheckCompleteness() {
		return this.getProperty(PROPERTY_CHECKCOMPLETENESS);
	}

	/**
	 * 设置-齐套检查
	 * 
	 * @param value 值
	 */
	public final void setCheckCompleteness(emYesNo value) {
		this.setProperty(PROPERTY_CHECKCOMPLETENESS, value);
	}

	/**
	 * 属性名称-批次混用
	 */
	private static final String PROPERTY_MIXINGBATCHES_NAME = "MixingBatches";

	/**
	 * 批次混用 属性
	 */
	@DbField(name = "MixBatch", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emYesNo> PROPERTY_MIXINGBATCHES = registerProperty(PROPERTY_MIXINGBATCHES_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-批次混用
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MIXINGBATCHES_NAME)
	public final emYesNo getMixingBatches() {
		return this.getProperty(PROPERTY_MIXINGBATCHES);
	}

	/**
	 * 设置-批次混用
	 * 
	 * @param value 值
	 */
	public final void setMixingBatches(emYesNo value) {
		this.setProperty(PROPERTY_MIXINGBATCHES, value);
	}

	/**
	 * 属性名称-订单生产
	 */
	private static final String PROPERTY_MADETOORDER_NAME = "MadeToOrder";

	/**
	 * 订单生产 属性
	 */
	@DbField(name = "MadeToOrder", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<emYesNo> PROPERTY_MADETOORDER = registerProperty(PROPERTY_MADETOORDER_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-订单生产
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MADETOORDER_NAME)
	public final emYesNo getMadeToOrder() {
		return this.getProperty(PROPERTY_MADETOORDER);
	}

	/**
	 * 设置-订单生产
	 * 
	 * @param value 值
	 */
	public final void setMadeToOrder(emYesNo value) {
		this.setProperty(PROPERTY_MADETOORDER, value);
	}

	/**
	 * 属性名称-图号
	 */
	private static final String PROPERTY_DARWINGNUMBER_NAME = "DarwingNumber";

	/**
	 * 图号 属性
	 */
	@DbField(name = "Darwing", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_DARWINGNUMBER = registerProperty(PROPERTY_DARWINGNUMBER_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-图号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DARWINGNUMBER_NAME)
	public final String getDarwingNumber() {
		return this.getProperty(PROPERTY_DARWINGNUMBER);
	}

	/**
	 * 设置-图号
	 * 
	 * @param value 值
	 */
	public final void setDarwingNumber(String value) {
		this.setProperty(PROPERTY_DARWINGNUMBER, value);
	}

	/**
	 * 属性名称-匹配码
	 */
	private static final String PROPERTY_MATCHCODE_NAME = "MatchCode";

	/**
	 * 匹配码 属性
	 */
	@DbField(name = "MatchCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_MATCHCODE = registerProperty(PROPERTY_MATCHCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-匹配码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MATCHCODE_NAME)
	public final String getMatchCode() {
		return this.getProperty(PROPERTY_MATCHCODE);
	}

	/**
	 * 设置-匹配码
	 * 
	 * @param value 值
	 */
	public final void setMatchCode(String value) {
		this.setProperty(PROPERTY_MATCHCODE, value);
	}

	/**
	 * 属性名称-生产批量
	 */
	private static final String PROPERTY_LOTSIZE_NAME = "LotSize";

	/**
	 * 生产批量 属性
	 */
	@DbField(name = "LotSize", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_LOTSIZE = registerProperty(PROPERTY_LOTSIZE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-生产批量
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOTSIZE_NAME)
	public final BigDecimal getLotSize() {
		return this.getProperty(PROPERTY_LOTSIZE);
	}

	/**
	 * 设置-生产批量
	 * 
	 * @param value 值
	 */
	public final void setLotSize(BigDecimal value) {
		this.setProperty(PROPERTY_LOTSIZE, value);
	}

	/**
	 * 属性名称-损耗率
	 */
	private static final String PROPERTY_SCRAP_NAME = "Scrap";

	/**
	 * 损耗率 属性
	 */
	@DbField(name = "Scrap", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_SCRAP = registerProperty(PROPERTY_SCRAP_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-损耗率
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SCRAP_NAME)
	public final String getScrap() {
		return this.getProperty(PROPERTY_SCRAP);
	}

	/**
	 * 设置-损耗率
	 * 
	 * @param value 值
	 */
	public final void setScrap(String value) {
		this.setProperty(PROPERTY_SCRAP, value);
	}

	/**
	 * 属性名称-变动损耗
	 */
	private static final String PROPERTY_SCRAPRATE_NAME = "ScrapRate";

	/**
	 * 变动损耗 属性
	 */
	@DbField(name = "ScrapRate", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_SCRAPRATE = registerProperty(PROPERTY_SCRAPRATE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-变动损耗
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SCRAPRATE_NAME)
	public final BigDecimal getScrapRate() {
		return this.getProperty(PROPERTY_SCRAPRATE);
	}

	/**
	 * 设置-变动损耗
	 * 
	 * @param value 值
	 */
	public final void setScrapRate(BigDecimal value) {
		this.setProperty(PROPERTY_SCRAPRATE, value);
	}

	/**
	 * 属性名称-固定损耗
	 */
	private static final String PROPERTY_SCRAPVALUE_NAME = "ScrapValue";

	/**
	 * 固定损耗 属性
	 */
	@DbField(name = "ScrapValue", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_SCRAPVALUE = registerProperty(PROPERTY_SCRAPVALUE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-固定损耗
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SCRAPVALUE_NAME)
	public final BigDecimal getScrapValue() {
		return this.getProperty(PROPERTY_SCRAPVALUE);
	}

	/**
	 * 设置-固定损耗
	 * 
	 * @param value 值
	 */
	public final void setScrapValue(BigDecimal value) {
		this.setProperty(PROPERTY_SCRAPVALUE, value);
	}

	/**
	 * 属性名称-计划员
	 */
	private static final String PROPERTY_SCHEDULER_NAME = "Scheduler";

	/**
	 * 计划员 属性
	 */
	@DbField(name = "Scheduler", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_SCHEDULER = registerProperty(PROPERTY_SCHEDULER_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-计划员
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SCHEDULER_NAME)
	public final String getScheduler() {
		return this.getProperty(PROPERTY_SCHEDULER);
	}

	/**
	 * 设置-计划员
	 * 
	 * @param value 值
	 */
	public final void setScheduler(String value) {
		this.setProperty(PROPERTY_SCHEDULER, value);
	}

	/**
	 * 属性名称-生效日期
	 */
	private static final String PROPERTY_VALIDDATE_NAME = "ValidDate";

	/**
	 * 生效日期 属性
	 */
	@DbField(name = "ValidDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_VALIDDATE = registerProperty(PROPERTY_VALIDDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-生效日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VALIDDATE_NAME)
	public final DateTime getValidDate() {
		return this.getProperty(PROPERTY_VALIDDATE);
	}

	/**
	 * 设置-生效日期
	 * 
	 * @param value 值
	 */
	public final void setValidDate(DateTime value) {
		this.setProperty(PROPERTY_VALIDDATE, value);
	}

	/**
	 * 属性名称-失效日期
	 */
	private static final String PROPERTY_INVALIDDATE_NAME = "InvalidDate";

	/**
	 * 失效日期 属性
	 */
	@DbField(name = "InvalidDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_INVALIDDATE = registerProperty(PROPERTY_INVALIDDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-失效日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_INVALIDDATE_NAME)
	public final DateTime getInvalidDate() {
		return this.getProperty(PROPERTY_INVALIDDATE);
	}

	/**
	 * 设置-失效日期
	 * 
	 * @param value 值
	 */
	public final void setInvalidDate(DateTime value) {
		this.setProperty(PROPERTY_INVALIDDATE, value);
	}

	/**
	 * 属性名称-图片
	 */
	private static final String PROPERTY_PICTURE_NAME = "Picture";

	/**
	 * 图片 属性
	 */
	@DbField(name = "Picture", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_PICTURE = registerProperty(PROPERTY_PICTURE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-图片
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PICTURE_NAME)
	public final String getPicture() {
		return this.getProperty(PROPERTY_PICTURE);
	}

	/**
	 * 设置-图片
	 * 
	 * @param value 值
	 */
	public final void setPicture(String value) {
		this.setProperty(PROPERTY_PICTURE, value);
	}

	/**
	 * 属性名称-备注
	 */
	private static final String PROPERTY_REMARKS_NAME = "Remarks";

	/**
	 * 备注 属性
	 */
	@DbField(name = "Remarks", type = DbFieldType.MEMO, table = DB_TABLE_NAME, primaryKey = false)
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
	 * @param value 值
	 */
	public final void setDeleted(emYesNo value) {
		this.setProperty(PROPERTY_DELETED, value);
	}

	/**
	 * 属性名称-对象编号
	 */
	private static final String PROPERTY_DOCENTRY_NAME = "DocEntry";

	/**
	 * 对象编号 属性
	 */
	@DbField(name = "DocEntry", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_DOCENTRY = registerProperty(PROPERTY_DOCENTRY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DOCENTRY_NAME)
	public final Integer getDocEntry() {
		return this.getProperty(PROPERTY_DOCENTRY);
	}

	/**
	 * 设置-对象编号
	 * 
	 * @param value 值
	 */
	public final void setDocEntry(Integer value) {
		this.setProperty(PROPERTY_DOCENTRY, value);
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
	 * @param value 值
	 */
	public final void setApprovalStatus(emApprovalStatus value) {
		this.setProperty(PROPERTY_APPROVALSTATUS, value);
	}

	/**
	 * 属性名称-数据所有者
	 */
	private static final String PROPERTY_DATAOWNER_NAME = "DataOwner";

	/**
	 * 数据所有者 属性
	 */
	@DbField(name = "DataOwner", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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

	public BigDecimal getOnAvailable() {
		return Decimal.add(this.getOnHand(), this.getOnOrdered(), this.getOnCommited().negate());
	}
}
