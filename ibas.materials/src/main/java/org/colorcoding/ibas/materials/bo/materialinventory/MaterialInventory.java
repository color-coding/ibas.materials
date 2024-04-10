package org.colorcoding.ibas.materials.bo.materialinventory;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.ICheckRules;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMinValue;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMultiplication;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 获取-物料库存
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialInventory.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = MaterialInventory.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = MaterialInventory.BUSINESS_OBJECT_CODE)
public class MaterialInventory extends BusinessObject<MaterialInventory> implements IMaterialInventory, ICheckRules {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -9164270990017734652L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialInventory.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_OITW";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_INVENTORY";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialInventory";

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
	 * 属性名称-仓库编码
	 */
	private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

	/**
	 * 仓库编码 属性
	 */
	@DbField(name = "WhsCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
	 * 属性名称-冻结的
	 */
	private static final String PROPERTY_FROZEN_NAME = "Frozen";

	/**
	 * 冻结的 属性
	 */
	@DbField(name = "Frozen", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_FROZEN = registerProperty(PROPERTY_FROZEN_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-冻结的
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_FROZEN_NAME)
	public final emYesNo getFrozen() {
		return this.getProperty(PROPERTY_FROZEN);
	}

	/**
	 * 设置-冻结的
	 * 
	 * @param value 值
	 */
	public final void setFrozen(emYesNo value) {
		this.setProperty(PROPERTY_FROZEN, value);
	}

	/**
	 * 属性名称-价格
	 */
	private static final String PROPERTY_AVGPRICE_NAME = "AvgPrice";

	/**
	 * 价格 属性
	 */
	@DbField(name = "AvgPrice", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_AVGPRICE = registerProperty(PROPERTY_AVGPRICE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-价格
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_AVGPRICE_NAME)
	public final BigDecimal getAvgPrice() {
		return this.getProperty(PROPERTY_AVGPRICE);
	}

	/**
	 * 设置-价格
	 *
	 * @param value 值
	 */
	public final void setAvgPrice(BigDecimal value) {
		this.setProperty(PROPERTY_AVGPRICE, value);
	}

	/**
	 * 设置-价格
	 *
	 * @param value 值
	 */
	public final void setAvgPrice(String value) {
		this.setAvgPrice(Decimal.valueOf(value));
	}

	/**
	 * 设置-价格
	 *
	 * @param value 值
	 */
	public final void setAvgPrice(int value) {
		this.setAvgPrice(Decimal.valueOf(value));
	}

	/**
	 * 设置-价格
	 *
	 * @param value 值
	 */
	public final void setAvgPrice(double value) {
		this.setAvgPrice(Decimal.valueOf(value));
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
	 * 属性名称-库存价值
	 */
	private static final String PROPERTY_INVENTORYVALUE_NAME = "InventoryValue";

	/**
	 * 库存价值 属性
	 */
	@DbField(name = "StockValue", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_INVENTORYVALUE = registerProperty(
			PROPERTY_INVENTORYVALUE_NAME, BigDecimal.class, MY_CLASS);

	/**
	 * 获取-库存价值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_INVENTORYVALUE_NAME)
	public final BigDecimal getInventoryValue() {
		return this.getProperty(PROPERTY_INVENTORYVALUE);
	}

	/**
	 * 设置-库存价值
	 * 
	 * @param value 值
	 */
	public final void setInventoryValue(BigDecimal value) {
		this.setProperty(PROPERTY_INVENTORYVALUE, value);
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
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
	}

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleRequired(PROPERTY_ITEMCODE), // 要求有值
				new BusinessRuleRequired(PROPERTY_WAREHOUSE), // 要求有值
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_ONHAND), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_ONORDERED), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_AVGPRICE), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_ONRESERVED), // 不能低于0
				// 库存价值 = 库存量 * 成本价格
				new BusinessRuleMultiplication(PROPERTY_INVENTORYVALUE, PROPERTY_ONHAND, PROPERTY_AVGPRICE),
				// 存在先下单再订购，已承诺不做最低值控制
				/*
				 * // 预留数量不能大于订购数量 new BusinessRuleMaxProperty<BigDecimal>(PROPERTY_ONHAND,
				 * PROPERTY_ONRESERVED)
				 */

		};
	}

	@Override
	public void reset() {
		super.reset();
		this.setOnCommited(Decimal.ZERO);
		this.setOnOrdered(Decimal.ZERO);
		this.setOnHand(Decimal.ZERO);
		this.setOnReserved(Decimal.ZERO);
	}

	@Override
	public BigDecimal getOnAvailable() {
		return Decimal.add(this.getOnHand(), this.getOnOrdered(), this.getOnCommited().negate());
	}

	@Override
	public void check() throws BusinessRuleException {
		if (Decimal.ZERO.compareTo(this.getOnHand().subtract(this.getOnReserved())) > 0 && !this.noCheck) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_not_enough_is_reserved", this.getWarehouse(),
					this.getItemCode(), this.getOnHand(), this.getOnReserved()));
		}
	}

	private boolean noCheck = false;

	@Override
	public void setOnReserved(BigDecimal value, boolean noCheck) {
		this.setOnReserved(value);
		this.noCheck = noCheck;
	}

}
