package org.colorcoding.ibas.materials.bo.material;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialPrice {

	@XmlElement(name = "ItemCode")
	private String itemCode;

	public final String getItemCode() {
		return itemCode;
	}

	public final void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	@XmlElement(name = "Price")
	private Decimal price;

	public final Decimal getPrice() {
		return price;
	}

	public final void setPrice(Decimal price) {
		this.price = price;
	}

	@XmlElement(name = "Currency")
	private String currency;

	public final String getCurrency() {
		return currency;
	}

	public final void setCurrency(String currency) {
		this.currency = currency;
	}

}
