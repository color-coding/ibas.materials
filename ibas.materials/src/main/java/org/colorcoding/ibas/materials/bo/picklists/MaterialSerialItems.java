package org.colorcoding.ibas.materials.bo.picklists;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItems;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialItem;

@XmlType(name = MaterialSerialItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialItem.class })
public class MaterialSerialItems extends org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialItems
		implements IMaterialSerialItems {

	private static final long serialVersionUID = -3221882440491310267L;

	public MaterialSerialItems() {
		super();
	}

	/**
	 * 构造方法P
	 *
	 * @param parent 父项对象
	 */
	public MaterialSerialItems(IMaterialSerialItemParent parent) {
		super(parent);
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		if (evt.getPropertyName().equalsIgnoreCase("ObjectKey")) {
			for (IMaterialSerialItem item : this) {
				item.setDocumentEntry(this.getParent().getDocEntry());
			}
		} else {
			super.onParentPropertyChanged(evt);
		}
	}
}
