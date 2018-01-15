package org.colorcoding.ibas.materials.bo.materialserial;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * @author Fancy
 * @date 2018/1/9
 */
@XmlType(name = MaterialSerialJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialJournal.class })
public class MaterialSerialJournals extends BusinessObjects<IMaterialSerialJournal, IMaterialSerialJournalsParent>
		implements IMaterialSerialJournals {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialSerialJournals";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -4589466470877780036L;

	public MaterialSerialJournals() {
		super();
	}

	/**
	 * 构造方法P
	 *
	 * @param parent
	 *            父项对象
	 */
	public MaterialSerialJournals(IMaterialSerialJournalsParent parent) {
		super(parent);
	}

	/**
	 * P 元素类型
	 */
	public Class<?> getElementType() {
		return MaterialSerialJournal.class;
	}

	@Override
	protected void afterAddItem(IMaterialSerialJournal item) {
		super.afterAddItem(item);
		item.setBaseDocumentType(this.getParent().getObjectCode());
		item.setBaseDocumentEntry(this.getParent().getDocEntry());
		item.setBaseDocumentLineId(this.getParent().getLineId());
		item.setActivated(this.getActivated());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getObjectCode());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getDocEntry());
		condition.setRelationship(ConditionRelationship.AND);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(this.getParent().getLineId());
		condition.setRelationship(ConditionRelationship.AND);
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equalsIgnoreCase("ObjectCode")) {
			for (IMaterialSerialJournal item : this) {
				item.setBaseDocumentType(this.getParent().getObjectCode());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("DocEntry")) {
			for (IMaterialSerialJournal item : this) {
				item.setBaseDocumentEntry(this.getParent().getDocEntry());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("LineId")) {
			for (IMaterialSerialJournal item : this) {
				item.setBaseDocumentLineId(this.getParent().getLineId());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("LineStatus")
				|| evt.getPropertyName().equalsIgnoreCase("DocumentStatus")
				|| evt.getPropertyName().equalsIgnoreCase("ApprovalStatus")
				|| evt.getPropertyName().equalsIgnoreCase("Canceled")
				|| evt.getPropertyName().equalsIgnoreCase("Deleted")) {
			for (IMaterialSerialJournal item : this) {
				item.setActivated(this.getActivated());
			}
		}
	}

	protected emYesNo getActivated() {
		if (this.getParent() instanceof IApprovalData) {
			IApprovalData data = (IApprovalData) this.getParent();
			if (data.getApprovalStatus() != emApprovalStatus.APPROVED
					&& data.getApprovalStatus() != emApprovalStatus.UNAFFECTED) {
				return emYesNo.NO;
			}
		}
		if (this.getParent() instanceof IBODocument) {
			IBODocument data = (IBODocument) this.getParent();
			if (data.getDocumentStatus() == emDocumentStatus.PLANNED) {
				return emYesNo.NO;
			}
		}
		if (this.getParent() instanceof IBODocumentLine) {
			IBODocumentLine data = (IBODocumentLine) this.getParent();
			if (data.getLineStatus() == emDocumentStatus.PLANNED) {
				return emYesNo.NO;
			}
		}
		if (this.getParent() instanceof IBOTagCanceled) {
			IBOTagCanceled data = (IBOTagCanceled) this.getParent();
			if (data.getCanceled() == emYesNo.YES) {
				return emYesNo.NO;
			}
		}
		if (this.getParent() instanceof IBOTagDeleted) {
			IBOTagDeleted data = (IBOTagDeleted) this.getParent();
			if (data.getDeleted() == emYesNo.YES) {
				return emYesNo.NO;
			}
		}
		return emYesNo.YES;
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
