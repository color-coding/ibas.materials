package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;
import java.util.Collection;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialPrice extends Serializable implements IMaterialPrice {

	private static final long serialVersionUID = -3012064774202678680L;
	/**
	 * 查询条件字段-物料编码
	 */
	public static final String CONDITION_ALIAS_ITEMCODE = "ItemCode";
	/**
	 * 查询条件字段-物料名称
	 */
	public static final String CONDITION_ALIAS_ITEMNAME = "ItemName";
	/**
	 * 查询条件字段-价格清单
	 */
	public static final String CONDITION_ALIAS_PRICELIST = "PriceList";

	public static IMaterialPrice create(IMaterial material) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(material.getCode());
		materialPrice.setItemName(material.getName());
		materialPrice.setItemSign(material.getSign());
		materialPrice.setPrice(material.getAvgPrice());
		return materialPrice;
	}

	public static IMaterialPrice create(IProduct material) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(material.getCode());
		materialPrice.setItemName(material.getName());
		materialPrice.setItemSign(material.getSign());
		materialPrice.setPrice(material.getPrice());
		return materialPrice;
	}

	public static IMaterialPrice create(IMaterialPriceItem materialPriceItem) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(materialPriceItem.getItemCode());
		materialPrice.setPrice(materialPriceItem.getPrice());
		materialPrice.setFloorPrice(materialPriceItem.getFloorPrice());
		materialPrice.setSource(Integer.toString(materialPriceItem.getObjectKey()));
		return materialPrice;
	}

	public static IMaterialPrice create(IMaterialPriceItem materialPriceItem, String currency) {
		IMaterialPrice materialPrice = create(materialPriceItem);
		materialPrice.setCurrency(currency);
		return materialPrice;
	}

	public static List<IMaterialPrice> create(Collection<?> materials) {
		ArrayList<IMaterialPrice> materialPrices = new ArrayList<>();
		for (Object item : materials) {
			if (item instanceof IProduct) {
				materialPrices.add(create((IProduct) item));
			} else if (item instanceof IMaterial) {
				materialPrices.add(create((IMaterial) item));
			}
		}
		return materialPrices;
	}

	private String source;

	@XmlElement(name = "Source")
	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	private String itemCode;

	@XmlElement(name = "ItemCode")
	public final String getItemCode() {
		return itemCode;
	}

	public final void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	private String itemName;

	@XmlElement(name = "ItemName")
	public String getItemName() {
		return itemName;
	}

	public void setItemName(String value) {
		this.itemName = value;
	}

	private String itemSign;

	@XmlElement(name = "ItemSign")
	public final String getItemSign() {
		return itemSign;
	}

	public final void setItemSign(String itemSign) {
		this.itemSign = itemSign;
	}

	private BigDecimal price;

	@XmlElement(name = "Price")
	public final BigDecimal getPrice() {
		return price;
	}

	public final void setPrice(BigDecimal price) {
		this.price = price;
	}

	public final void setPrice(int value) {
		this.setPrice(Decimal.valueOf(value));
	}

	public final void setPrice(double value) {
		this.setPrice(Decimal.valueOf(value));
	}

	private BigDecimal floorPrice;

	@XmlElement(name = "FloorPrice")
	public final BigDecimal getFloorPrice() {
		return floorPrice;
	}

	public final void setFloorPrice(BigDecimal floorPrice) {
		this.floorPrice = floorPrice;
	}

	public final void setFloorPrice(int value) {
		this.setFloorPrice(Decimal.valueOf(value));
	}

	public final void setFloorPrice(double value) {
		this.setFloorPrice(Decimal.valueOf(value));
	}

	private String currency;

	@XmlElement(name = "Currency")
	public final String getCurrency() {
		return currency;
	}

	public final void setCurrency(String currency) {
		this.currency = currency;
	}

}
