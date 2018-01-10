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

/**
 * @author Fancy
 * @date 2018/1/9
 */
@XmlType(name = MaterialBatchJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchJournal.class })
public class MaterialBatchJournals extends BusinessObjects<IMaterialBatchJournal, IMaterialBatchJournalsParent>
		implements IMaterialBatchJournals {
	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialBatchJournals";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 1554854583483859573L;

	public MaterialBatchJournals() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public MaterialBatchJournals(IMaterialBatchJournalsParent parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return MaterialBatchJournal.class;
	}

	@Override
	protected void afterAddItem(IMaterialBatchJournal item) {
		super.afterAddItem(item);
		item.setBaseDocumentType(this.getParent().getObjectCode());
		item.setBaseDocumentEntry(this.getParent().getDocEntry());
		item.setBaseDocumentLineId(this.getParent().getLineId());
		item.setLineStatus(this.getParent().getLineStatus());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getObjectCode());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getDocEntry());
		condition.setRelationship(ConditionRelationship.AND);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getLineId());
		condition.setRelationship(ConditionRelationship.AND);
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equalsIgnoreCase("ObjectCode")) {
			for (IMaterialBatchJournal item : this) {
				item.setBaseDocumentType(this.getParent().getObjectCode());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("DocEntry")) {
			for (IMaterialBatchJournal item : this) {
				item.setBaseDocumentEntry(this.getParent().getDocEntry());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("LineId")) {
			for (IMaterialBatchJournal item : this) {
				item.setBaseDocumentLineId(this.getParent().getLineId());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("LineStatus")) {
			for (IMaterialBatchJournal item : this) {
				item.setLineStatus(this.getParent().getLineStatus());
			}
		}
	}

	@Override
	public IMaterialBatchJournal create() {
		IMaterialBatchJournal item = new MaterialBatchJournal();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

}
