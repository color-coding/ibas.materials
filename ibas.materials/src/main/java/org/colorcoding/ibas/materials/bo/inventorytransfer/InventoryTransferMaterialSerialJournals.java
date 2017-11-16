package org.colorcoding.ibas.materials.bo.inventorytransfer;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;

@XmlType(name = InventoryTransferMaterialSerialJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchJournal.class })
public class InventoryTransferMaterialSerialJournals
		extends BusinessObjects<IMaterialSerialJournal, IInventoryTransferLine>
		implements IInventoryTransferMaterialSerialJournals {
	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "InventoryTransferMaterialBatchJournals";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 7759763557795210318L;

	public InventoryTransferMaterialSerialJournals() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public InventoryTransferMaterialSerialJournals(IInventoryTransferLine parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return MaterialBatchJournal.class;
	}

	@Override
	protected void afterAddItem(IMaterialSerialJournal item) {
		super.afterAddItem(item);
		// TODO 设置关联值
		item.setBaseDocumentType(this.getParent().getObjectCode());
		item.setBaseDocumentEntry(this.getParent().getDocEntry());
		item.setBaseDocumentLineId(this.getParent().getLineId());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias("BaseType");
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getObjectCode());
		condition = criteria.getConditions().create();
		condition.setAlias("BaseEntry");
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getDocEntry());
		condition.setRelationship(ConditionRelationship.AND);
		// TODO 添加关联查询条件
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		// TODO 设置关联值
		if (evt.getPropertyName().equalsIgnoreCase(InventoryTransferLine.MASTER_PRIMARY_KEY_NAME)) {
			for (IMaterialSerialJournal item : this) {
				item.setBaseDocumentType(this.getParent().getObjectCode());
				item.setBaseDocumentEntry(this.getParent().getDocEntry());
				item.setBaseDocumentLineId(this.getParent().getLineId());
			}
		}
	}

	@Override
	public IMaterialSerialJournal create() {
		IMaterialSerialJournal item = new MaterialSerialJournal();
		if (this.add(item)) {
			return item;
		}
		return null;
	}
}
