package org.colorcoding.ibas.materials.bo.material;

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
		materialPrice.setPrice(material.getAvgPrice());
		return materialPrice;
	}

	public static IMaterialPrice create(IProduct material) {
		MaterialPrice materialPrice = new MaterialPrice();
		materialPrice.setItemCode(material.getCode());
		materialPrice.setItemName(material.getName());
		materialPrice.setPrice(material.getPrice());
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

	@XmlElement(name = "ItemCode")
	private String itemCode;

	@Override
	public final String getItemCode() {
		return itemCode;
	}

	@Override
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

	@XmlElement(name = "Price")
	private Decimal price;

	@Override
	public final Decimal getPrice() {
		return price;
	}

	@Override
	public final void setPrice(Decimal price) {
		this.price = price;
	}

	@Override
	public final void setPrice(int value) {
		this.setPrice(new Decimal(value));
	}

	@Override
	public final void setPrice(double value) {
		this.setPrice(new Decimal(value));
	}

	@XmlElement(name = "Currency")
	private String currency;

	@Override
	public final String getCurrency() {
		return currency;
	}

	@Override
	public final void setCurrency(String currency) {
		this.currency = currency;
	}

}
