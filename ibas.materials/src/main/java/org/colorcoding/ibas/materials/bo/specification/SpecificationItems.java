package org.colorcoding.ibas.materials.bo.specification;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 规格模板-项目 集合
 */
@XmlType(name = SpecificationItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ SpecificationItem.class })
public class SpecificationItems extends BusinessObjects<ISpecificationItem, ISpecification>
		implements ISpecificationItems {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "SpecificationItems";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 4291438468089323857L;

	/**
	 * 构造方法
	 */
	public SpecificationItems() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public SpecificationItems(ISpecification parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return SpecificationItem.class;
	}

	/**
	 * 创建规格模板-项目
	 * 
	 * @return 规格模板-项目
	 */
	public ISpecificationItem create() {
		ISpecificationItem item = new SpecificationItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(ISpecificationItem item) {
		super.afterAddItem(item);
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
	}
}
