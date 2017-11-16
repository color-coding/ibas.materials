package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.materials.MyConfiguration;

import javax.xml.bind.annotation.*;

/**
 * 获取-物料(包含仓库库存，价格清单)
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Product.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Product.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BOCode(Product.BUSINESS_OBJECT_CODE)
public class Product extends MaterialBase<Product> implements IProduct {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 8078764747253121173L;

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Product";

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Product.class;

	// private static final String DB_OITW_TABLE_NAME ="${Company}_MM_OITM";
	// private static final String DB_PRICELIST_TABLE_NAME ="${Company}_MM_MPL1";

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

	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		// this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

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

}
