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
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Material.class;

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
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
	}

}
