package org.colorcoding.ibas.materials.bo.picklists;

import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItems;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchItem;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

@XmlType(name = MaterialBatchItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({MaterialBatchItem.class})
public class MaterialBatchItems extends org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchItems
		implements IMaterialBatchItems {

	public MaterialBatchItems() {
		super();
	}

	/**
	 * 构造方法
	 *
	 * @param parent 父项对象
	 */
	public MaterialBatchItems(IMaterialBatchItemParent parent) {
		super(parent);
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		if (evt.getPropertyName().equalsIgnoreCase("ObjectKey")) {
			for (IMaterialBatchItem item : this) {
				item.setDocumentEntry(this.getParent().getDocEntry());
			}
		} else {
			super.onParentPropertyChanged(evt);
		}
	}
}
