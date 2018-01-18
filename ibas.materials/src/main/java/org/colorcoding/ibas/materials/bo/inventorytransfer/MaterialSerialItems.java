package org.colorcoding.ibas.materials.bo.inventorytransfer;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;

@XmlType(name = MaterialSerialItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialItem.class })
class MaterialSerialItems extends org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialItems {

	private static final long serialVersionUID = -1330675354887159036L;

	public static final String BUSINESS_OBJECT_NAME = MaterialSerialItem.BUSINESS_OBJECT_NAME + "s";

	public MaterialSerialItems() {
		super();
	}

	public MaterialSerialItems(IMaterialSerialItemParent parent) {
		super(parent);
	}

	public Class<?> getElementType() {
		return MaterialSerialItem.class;
	}

	@Override
	public IMaterialSerialItem create() {
		IMaterialSerialItem item = new MaterialSerialItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IMaterialSerialItem item) {
		super.afterAddItem(item);
		if (item instanceof MaterialBatchItem) {
			((MaterialBatchItem) item).parent = (InventoryTransferLine) this.getParent();
		}
	}

}
