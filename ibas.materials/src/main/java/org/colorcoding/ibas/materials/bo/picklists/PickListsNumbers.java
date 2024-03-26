package org.colorcoding.ibas.materials.bo.picklists;

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
@XmlType(name = PickListsNumbers.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ PickListsNumber.class })
public class PickListsNumbers extends BusinessObjects<IPickListsNumber, IPickListsLine> implements IPickListsNumbers {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "PickListsNumbers";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -8733690883963330838L;

	/**
	 * 构造方法
	 */
	public PickListsNumbers() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public PickListsNumbers(IPickListsLine parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return PickListsNumber.class;
	}

	/**
	 * 创建拣配清单-序号
	 * 
	 * @return 拣配清单-序号
	 */
	public IPickListsNumber create() {
		IPickListsNumber item = new PickListsNumber();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IPickListsNumber item) {
		super.afterAddItem(item);
		item.setItemId(this.getParent().getLineId());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(PickListsLine.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		condition = criteria.getConditions().create();
		condition.setAlias(PickListsNumber.PROPERTY_ITEMID.getName());
		condition.setValue(this.getParent().getLineId());
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equals(PickListsLine.PROPERTY_LINEID.getName())) {
			for (IPickListsNumber item : this) {
				item.setItemId(this.getParent().getLineId());
			}
		} else if (evt.getPropertyName().equals(PickListsLine.PROPERTY_OBJECTKEY.getName())) {
			for (IPickListsNumber item : this) {
				item.setObjectKey(this.getParent().getObjectKey());
			}
		}
	}
}
