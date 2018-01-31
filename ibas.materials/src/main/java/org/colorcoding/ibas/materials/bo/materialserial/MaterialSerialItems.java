package org.colorcoding.ibas.materials.bo.materialserial;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlType(name = MaterialSerialItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialItem.class })
public class MaterialSerialItems extends BusinessObjects<IMaterialSerialItem, IMaterialSerialItemParent>
		implements IMaterialSerialItems {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialSerialItems";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -4589466470877780036L;

	public MaterialSerialItems() {
		super();
	}

	/**
	 * 构造方法P
	 *
	 * @param parent
	 *            父项对象
	 */
	public MaterialSerialItems(IMaterialSerialItemParent parent) {
		super(parent);
	}

	/**
	 * P 元素类型
	 */
	public Class<?> getElementType() {
		return MaterialSerialItem.class;
	}

	@Override
	protected void afterAddItem(IMaterialSerialItem item) {
		super.afterAddItem(item);
		item.setDocumentType(this.getParent().getObjectCode());
		item.setDocumentEntry(this.getParent().getDocEntry());
		item.setDocumentLineId(this.getParent().getLineId());
		if (item instanceof MaterialSerialItem) {
			((MaterialSerialItem) item).parent = this.getParent();
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
			for (IMaterialSerialItem item : this) {
				item.setDocumentType(this.getParent().getObjectCode());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("DocEntry")) {
			for (IMaterialSerialItem item : this) {
				item.setDocumentEntry(this.getParent().getDocEntry());
			}
		} else if (evt.getPropertyName().equalsIgnoreCase("LineId")) {
			for (IMaterialSerialItem item : this) {
				item.setDocumentLineId(this.getParent().getLineId());
			}
		}
	}

	@Override
	public IMaterialSerialItem create() {
		IMaterialSerialItem item = new MaterialSerialItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	public IMaterialSerialItem create(String serialCode) {
		for (IMaterialSerialItem item : this) {
			if (item.getSerialCode() == null) {
				continue;
			}
			if (item.getSerialCode().equals(serialCode)) {
				return item;
			}
		}
		IMaterialSerialItem item = this.create();
		if (item != null) {
			item.setSerialCode(serialCode);
		}
		return item;
	}

	/**
	 * 业务规则校验
	 * 
	 * @throws BusinessRuleException
	 */
	public void check() throws BusinessRuleException {
		if (this.getParent() == null) {
			return;
		}
		if (this.getParent().getSerialManagement() == emYesNo.NO) {
			return;
		}
		Decimal total = Decimal.ZERO;
		for (@SuppressWarnings("unused")
		IMaterialSerialItem item : this) {
			total = total.add(Decimal.ONE);
		}
		if (total.compareTo(this.getParent().getQuantity()) != 0) {
			throw new BusinessRuleException(I18N.prop("msg_mm_material_serial_quantity_deviates", this.getParent()));
		}
	}
}
