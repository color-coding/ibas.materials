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
import org.colorcoding.ibas.bobas.data.emYesNo;
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
	 * 查询条件字段-物料标记
	 */
	public static final String CONDITION_ALIAS_ITEMSIGN = "ItemSign";
	/**
	 * 查询条件字段-价格清单
	 */
	public static final String CONDITION_ALIAS_PRICELIST = "PriceList";
	/**
	 * 查询条件字段-单位
	 */
	public static final String CONDITION_ALIAS_UOM = "UOM";
	/**
	 * 查询条件字段-组
	 */
	public static final String CONDITION_ALIAS_GROUP = "GROUP";

	public static MaterialPrice create(IMaterial material) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(material.getCode());
		materialPrice.setItemName(material.getName());
		materialPrice.setItemSign(material.getSign());
		materialPrice.setPrice(material.getAvgPrice());
		materialPrice.setUOM(material.getInventoryUOM());
		materialPrice.setTaxed(emYesNo.NO);
		return materialPrice;
	}

	public static MaterialPrice create(IProduct material) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(material.getCode());
		materialPrice.setItemName(material.getName());
		materialPrice.setItemSign(material.getSign());
		materialPrice.setPrice(material.getPrice());
		materialPrice.setUOM(material.getInventoryUOM());
		materialPrice.setTaxed(material.getTaxed());
		return materialPrice;
	}

	public static IMaterialPrice create(IMaterialPriceItem materialPriceItem) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(materialPriceItem.getItemCode());
		materialPrice.setUOM(materialPriceItem.getUOM());
		materialPrice.setPrice(materialPriceItem.getPrice());
		materialPrice.setSource(materialPriceItem.getObjectKey(), materialPriceItem.getLineId());
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

	public void setSource(Integer listKey, Integer listLine) {
		this.source = String.format("%s-%s", listKey, listLine);
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

	private String currency;

	@XmlElement(name = "Currency")
	public final String getCurrency() {
		return currency;
	}

	public final void setCurrency(String currency) {
		this.currency = currency;
	}

	private emYesNo taxed;

	@XmlElement(name = "Taxed")
	public final emYesNo getTaxed() {
		return taxed;
	}

	public final void setTaxed(emYesNo taxed) {
		this.taxed = taxed;
	}

	private String uom;

	@XmlElement(name = "UOM")
	public final String getUOM() {
		return uom;
	}

	public final void setUOM(String uom) {
		this.uom = uom;
	}

	@Override
	public final String toString() {
		return String.format("{materialPrice: %s %s%s/%s}", this.getItemCode(), this.getPrice(), this.getCurrency(),
				this.getUOM());
	}

}
