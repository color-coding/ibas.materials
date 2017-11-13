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
public class MaterialQuantity {

	@XmlElement(name = "ItemCode")
	private String itemCode;

	public final String getItemCode() {
		return itemCode;
	}

	public final void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	@XmlElement(name = "OnHand")
	private Decimal onHand;

	public final Decimal getOnHand() {
		return onHand;
	}

	public final void setOnHand(Decimal onHand) {
		this.onHand = onHand;
	}

	@XmlElement(name = "UOM")
	private String uom;

	public final String getUOM() {
		return uom;
	}

	public final void setUOM(String uom) {
		this.uom = uom;
	}

}
