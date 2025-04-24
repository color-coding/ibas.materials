package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 获取-物料(包含仓库库存，价格清单)
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Product.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Product.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class Product extends MaterialBase<Product> implements IProduct, IDataOwnership, IBOUserFields {
	/**
	 * 查询条件字段-仓库
	 */
	public static final String CONDITION_ALIAS_WAREHOUSE = "WhsCode";
	/**
	 * 查询条件字段-价格清单
	 */
	public static final String CONDITION_ALIAS_PRICELIST = "PriceList";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 9204264205266866873L;

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Product";

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Product.class;

	/**
	 * 属性名称-仓库
	 */
	private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

	/**
	 * 仓库 属性
	 */
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
	 * 属性名称-价格
	 */
	private static final String PROPERTY_PRICE_NAME = "Price";

	/**
	 * 价格 属性
	 */
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
		this.setPrice(Decimals.valueOf(value));
	}

	/**
	 * 设置-价格
	 *
	 * @param value 值
	 */
	public final void setPrice(int value) {
		this.setPrice(Decimals.valueOf(value));
	}

	/**
	 * 设置-价格
	 *
	 * @param value 值
	 */
	public final void setPrice(double value) {
		this.setPrice(Decimals.valueOf(value));
	}

	/**
	 * 属性名称-货币
	 */
	private static final String PROPERTY_CURRENCY_NAME = "Currency";

	/**
	 * 货币 属性
	 */
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
	 * 属性名称-含税
	 */
	private static final String PROPERTY_TAXED_NAME = "Taxed";

	/**
	 * 含税 属性
	 */
	public static final IPropertyInfo<emYesNo> PROPERTY_TAXED = registerProperty(PROPERTY_TAXED_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-含税
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TAXED_NAME)
	public final emYesNo getTaxed() {
		return this.getProperty(PROPERTY_TAXED);
	}

	/**
	 * 设置-含税
	 * 
	 * @param value 值
	 */
	public final void setTaxed(emYesNo value) {
		this.setProperty(PROPERTY_TAXED, value);
	}

	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setTaxed(emYesNo.YES);
	}

}
