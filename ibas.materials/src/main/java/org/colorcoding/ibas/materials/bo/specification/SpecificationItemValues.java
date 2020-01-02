package org.colorcoding.ibas.materials.bo.specification;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 规格模板-项目值 集合
 */
@XmlType(name = SpecificationItemValues.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ SpecificationItemValue.class })
public class SpecificationItemValues extends BusinessObjects<ISpecificationItemValue, ISpecificationItem>
		implements ISpecificationItemValues {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "SpecificationItemValues";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 6186653238853694711L;

	/**
	 * 构造方法
	 */
	public SpecificationItemValues() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public SpecificationItemValues(ISpecificationItem parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return SpecificationItemValue.class;
	}

	/**
	 * 创建规格模板-项目值
	 * 
	 * @return 规格模板-项目值
	 */
	public ISpecificationItemValue create() {
		ISpecificationItemValue item = new SpecificationItemValue();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(ISpecificationItemValue item) {
		super.afterAddItem(item);
		item.setItemId(this.getParent().getLineId());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(SpecificationItemValue.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		condition = criteria.getConditions().create();
		condition.setAlias(SpecificationItemValue.PROPERTY_ITEMID.getName());
		condition.setValue(this.getParent().getLineId());
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equals(SpecificationItem.PROPERTY_LINEID.getName())) {
			for (ISpecificationItemValue item : this) {
				item.setItemId(this.getParent().getLineId());
			}
		} else if (evt.getPropertyName().equals(SpecificationItem.PROPERTY_OBJECTKEY.getName())) {
			for (ISpecificationItemValue item : this) {
				item.setObjectKey(this.getParent().getObjectKey());
			}
		}
	}
}
