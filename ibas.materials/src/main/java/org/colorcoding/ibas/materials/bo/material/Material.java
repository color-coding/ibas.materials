package org.colorcoding.ibas.materials.bo.material;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.data.emItemType;

/**
 * 获取-物料
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Material.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Material.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BOCode(Material.BUSINESS_OBJECT_CODE)
public class Material extends BusinessObject<Material> implements IMaterial {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 8078764747253121172L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Material.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_OITM";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_MATERIAL";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Material";

	/**
	 * 属性名称-编号
	 */
	private static final String PROPERTY_CODE_NAME = "Code";

	/**
	 * 编号 属性
	 */
	@DbField(name = "Code", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_CODE = registerProperty(PROPERTY_CODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CODE_NAME)
	public final String getCode() {
		return this.getProperty(PROPERTY_CODE);
	}

	/**
	 * 设置-编号
	 * 
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setForeignName(String value) {
		this.setProperty(PROPERTY_FOREIGNNAME, value);
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
	 * @param value
	 *            值
	 */
	public final void setGroup(String value) {
		this.setProperty(PROPERTY_GROUP, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setPhantomItem(emYesNo value) {
		this.setProperty(PROPERTY_PHANTOMITEM, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setPreferredVendor(String value) {
		this.setProperty(PROPERTY_PREFERREDVENDOR, value);
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
	 * @param value
	 *            值
	 */
	public final void setInventoryUOM(String value) {
		this.setProperty(PROPERTY_INVENTORYUOM, value);
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
	 * 属性名称-库存
	 */
	private static final String PROPERTY_ONHAND_NAME = "OnHand";

	/**
	 * 库存 属性
	 */
	@DbField(name = "OnHand", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_ONHAND = registerProperty(PROPERTY_ONHAND_NAME, Decimal.class,
			MY_CLASS);

	/**
	 * 获取-库存
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONHAND_NAME)
	public final Decimal getOnHand() {
		return this.getProperty(PROPERTY_ONHAND);
	}

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnHand(Decimal value) {
		this.setProperty(PROPERTY_ONHAND, value);
	}

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnHand(String value) {
		this.setOnHand(new Decimal(value));
	}

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnHand(int value) {
		this.setOnHand(new Decimal(value));
	}

	/**
	 * 设置-库存
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnHand(double value) {
		this.setOnHand(new Decimal(value));
	}

	/**
	 * 属性名称-已承诺
	 */
	private static final String PROPERTY_ONCOMMITED_NAME = "OnCommited";

	/**
	 * 已承诺 属性
	 */
	@DbField(name = "OnCommited", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_ONCOMMITED = registerProperty(PROPERTY_ONCOMMITED_NAME,
			Decimal.class, MY_CLASS);

	/**
	 * 获取-已承诺
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONCOMMITED_NAME)
	public final Decimal getOnCommited() {
		return this.getProperty(PROPERTY_ONCOMMITED);
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnCommited(Decimal value) {
		this.setProperty(PROPERTY_ONCOMMITED, value);
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnCommited(String value) {
		this.setOnCommited(new Decimal(value));
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnCommited(int value) {
		this.setOnCommited(new Decimal(value));
	}

	/**
	 * 设置-已承诺
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnCommited(double value) {
		this.setOnCommited(new Decimal(value));
	}

	/**
	 * 属性名称-已订购
	 */
	private static final String PROPERTY_ONORDERED_NAME = "OnOrdered";

	/**
	 * 已订购 属性
	 */
	@DbField(name = "OnOrdered", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Decimal> PROPERTY_ONORDERED = registerProperty(PROPERTY_ONORDERED_NAME,
			Decimal.class, MY_CLASS);

	/**
	 * 获取-已订购
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ONORDERED_NAME)
	public final Decimal getOnOrdered() {
		return this.getProperty(PROPERTY_ONORDERED);
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnOrdered(Decimal value) {
		this.setProperty(PROPERTY_ONORDERED, value);
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnOrdered(String value) {
		this.setOnOrdered(new Decimal(value));
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnOrdered(int value) {
		this.setOnOrdered(new Decimal(value));
	}

	/**
	 * 设置-已订购
	 * 
	 * @param value
	 *            值
	 */
	public final void setOnOrdered(double value) {
		this.setOnOrdered(new Decimal(value));
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setRemarks(String value) {
		this.setProperty(PROPERTY_REMARKS, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setOrganization(String value) {
		this.setProperty(PROPERTY_ORGANIZATION, value);
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
