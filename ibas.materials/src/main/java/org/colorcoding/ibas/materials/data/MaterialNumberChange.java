package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialNumberChange", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialNumberChange", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialNumberChange extends Serializable {

	private static final long serialVersionUID = 3362697451711976572L;

	@XmlElement(name = "Issue", type = GoodsIssue.class)
	private GoodsIssue issue;

	public final GoodsIssue getIssue() {
		return issue;
	}

	public final void setIssue(GoodsIssue issue) {
		this.issue = issue;
	}

	@XmlElement(name = "Receipt", type = GoodsReceipt.class)
	private GoodsReceipt receipt;

	public final GoodsReceipt getReceipt() {
		return receipt;
	}

	public final void setReceipt(GoodsReceipt receipt) {
		this.receipt = receipt;
	}

	@XmlElementWrapper(name = "Reservations")
	@XmlElement(name = "Reservation", type = MaterialInventoryReservation.class)
	private MaterialInventoryReservation[] reservations;

	public final MaterialInventoryReservation[] getReservations() {
		return reservations;
	}

	public final void setReservations(MaterialInventoryReservation[] reservations) {
		this.reservations = reservations;
	}

}
