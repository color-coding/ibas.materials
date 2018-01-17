package org.colorcoding.ibas.materials.bo.inventorytransfer;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;

@XmlType(name = MaterialBatchItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchItem.class })
class MaterialBatchItems extends org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchItems {

	private static final long serialVersionUID = -2784510193155897161L;

	public MaterialBatchItems() {
		super();
	}

	public MaterialBatchItems(IMaterialBatchItemParent parent) {
		super(parent);
	}

	public Class<?> getElementType() {
		return MaterialBatchItem.class;
	}

	@Override
	public IMaterialBatchItem create() {
		IMaterialBatchItem item = new MaterialBatchItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IMaterialBatchItem item) {
		super.afterAddItem(item);
		if (item instanceof MaterialBatchItem) {
			((MaterialBatchItem) item).parent = (InventoryTransferLine) this.getParent();
		}
	}
}
