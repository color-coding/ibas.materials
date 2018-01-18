package org.colorcoding.ibas.materials.bo.materialbatch;

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

@XmlType(name = MaterialBatchItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchItem.class })
public class MaterialBatchItems extends BusinessObjects<IMaterialBatchItem, IMaterialBatchItemParent>
		implements IMaterialBatchItems {
	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialBatchItems";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 1554854583483859573L;

	public MaterialBatchItems() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public MaterialBatchItems(IMaterialBatchItemParent parent) {
		super(parent);
	}

	@Override
	protected void afterAddItem(IMaterialBatchItem item) {
		super.afterAddItem(item);
		item.setDocumentType(this.getParent().getObjectCode());
		item.setDocumentEntry(this.getParent().getDocEntry());
		item.setDocumentLineId(this.getParent().getLineId());
		if (item instanceof MaterialBatchItem) {
			((MaterialBatchItem) item).parent = this.getParent();
		}
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias("DocumentType");
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getObjectCode());
		condition = criteria.getConditions().create();
		condition.setAlias("DocumentEntry");
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getDocEntry());
		condition.setRelationship(ConditionRelationship.AND);
		condition = criteria.getConditions().create();
		condition.setAlias("DocumentLineId");
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getLineId());
		condition.setRelationship(ConditionRelationship.AND);
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equalsIgnoreCase("ObjectCode")) {
			for (IMaterialBatchItem item : this) {
				item.setDocumentType(this.getParent().getObjectCode());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("DocEntry")) {
			for (IMaterialBatchItem item : this) {
				item.setDocumentEntry(this.getParent().getDocEntry());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("LineId")) {
			for (IMaterialBatchItem item : this) {
				item.setDocumentLineId(this.getParent().getLineId());
			}
		}
	}

	@Override
	public IMaterialBatchItem create() {
		IMaterialBatchItem item = new MaterialBatchItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	public IMaterialBatchItem create(String batchCode) {
		for (IMaterialBatchItem item : this) {
			if (item.getBatchCode() == null) {
				continue;
			}
			if (item.getBatchCode().equals(batchCode)) {
				return item;
			}
		}
		IMaterialBatchItem item = this.create();
		if (item != null) {
			item.setBatchCode(batchCode);
		}
		return item;
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return MaterialBatchItem.class;
	}

}
