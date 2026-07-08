package org.colorcoding.ibas.materials.bo.pickinglist;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 拣配清单-序号 集合
 */
@XmlType(name = PickingListNumbers.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ PickingListNumber.class })
public class PickingListNumbers extends BusinessObjects<IPickingListNumber, IPickingListLine> implements IPickingListNumbers {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "PickingListNumbers";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -8733690883963330838L;

	/**
	 * 构造方法
	 */
	public PickingListNumbers() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public PickingListNumbers(IPickingListLine parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return PickingListNumber.class;
	}

	/**
	 * 创建拣配清单-序号
	 * 
	 * @return 拣配清单-序号
	 */
	public IPickingListNumber create() {
		IPickingListNumber item = new PickingListNumber();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IPickingListNumber item) {
		super.afterAddItem(item);
		item.setItemId(this.getParent().getLineId());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(PickingListLine.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		condition = criteria.getConditions().create();
		condition.setAlias(PickingListNumber.PROPERTY_ITEMID.getName());
		condition.setValue(this.getParent().getLineId());
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equals(PickingListLine.PROPERTY_LINEID.getName())) {
			for (IPickingListNumber item : this) {
				item.setItemId(this.getParent().getLineId());
			}
		} else if (evt.getPropertyName().equals(PickingListLine.PROPERTY_OBJECTKEY.getName())) {
			for (IPickingListNumber item : this) {
				item.setObjectKey(this.getParent().getObjectKey());
			}
		}
	}
}
