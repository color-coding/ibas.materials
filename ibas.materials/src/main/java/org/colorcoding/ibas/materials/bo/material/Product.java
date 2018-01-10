package org.colorcoding.ibas.materials.bo.material;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 获取-物料(包含仓库库存，价格清单)
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Product.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Product.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BOCode(Product.BUSINESS_OBJECT_CODE)
public class Product extends MaterialBase<Product> implements IProduct, IDataOwnership {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 9204264205266866873L;

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Product";
	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_PRODUCT";

	/**
	 * 仓库查询条件
	 */
	public static final String WAREHOUSE_NAME = "WhsCode";

	/**
	 * 价格清单查询条件
	 */
	public static final String PRICELIST_NAME = "ObjectKey";

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Product.class;

	/**
	 * 创建Product
	 *
	 * @param material
	 * @return
	 */
	public static Product create(Material material) {
		Product product = new Product();
		product.setCode(material.getCode());
		product.setName(material.getName());
		product.setGroup(material.getGroup());
		product.setSerialManagement(material.getSerialManagement());
		product.setBatchManagement(material.getBatchManagement());
		product.setBarCode(material.getBarCode());
		product.setItemType(material.getItemType());
		product.setPrice(material.getAvgPrice());
		product.setOnHand(material.getOnHand());
		return product;
	}

	/**
	 * 创建Product
	 *
	 * @param material
	 * @return
	 */
	public static Product create(Product material) {
		Product products = new Product();
		products.setCode(material.getCode());
		products.setName(material.getName());
		products.setGroup(material.getGroup());
		products.setSerialManagement(material.getSerialManagement());
		products.setBatchManagement(material.getBatchManagement());
		products.setBarCode(material.getBarCode());
		products.setItemType(material.getItemType());
		products.setPrice(material.getPrice());
		products.setOnHand(material.getOnHand());
		return products;
	}

	/**
	 * 创建Product对象集合
	 *
	 * @param materials
	 *            物料对象集合
	 * @return
	 */
	public static ArrayList<Product> create(ArrayList<Material> materials) {
		ArrayList<Product> products = new ArrayList<>();
		for (Material material : materials) {
			products.add(create(material));
		}
		return products;
	}

	/**
	 * 属性名称-价格
	 */
	private static final String PROPERTY_PRICE_NAME = "Price";

	/**
	 * 价格 属性
	 */
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
	 * 属性名称-币种
	 */
	private static final String PROPERTY_CURRENCY_NAME = "Currency";

	/**
	 * 币种 属性
	 */
	@DbField(name = "Currency", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CURRENCY = registerProperty(PROPERTY_CURRENCY_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-币种
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CURRENCY_NAME)
	public final String getCurrency() {
		return this.getProperty(PROPERTY_CURRENCY);
	}

	/**
	 * 设置-币种
	 * 
	 * @param value
	 *            值
	 */
	public final void setCurrency(String value) {
		this.setProperty(PROPERTY_CURRENCY, value);
	}

	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setActivated(emYesNo.YES);
	}

}
