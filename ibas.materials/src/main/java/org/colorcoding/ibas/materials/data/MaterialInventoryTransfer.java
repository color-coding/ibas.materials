package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialInventoryTransfer", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialInventoryTransfer", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialInventoryTransfer extends Serializable {

	private static final long serialVersionUID = -7936382277579472727L;

	@XmlElement(name = "Transfer", type = InventoryTransfer.class)
	private InventoryTransfer transfer;

	public final InventoryTransfer getTransfer() {
		return transfer;
	}

	public final void setTransfer(InventoryTransfer transfer) {
		this.transfer = transfer;
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
