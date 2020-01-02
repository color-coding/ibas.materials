package org.colorcoding.ibas.materials.bo.materialspecification;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 物料规格-项目 集合
 */
@XmlType(name = MaterialSpecificationItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSpecificationItem.class })
public class MaterialSpecificationItems extends BusinessObjects<IMaterialSpecificationItem, IMaterialSpecification>
		implements IMaterialSpecificationItems {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialSpecificationItems";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 5046687842997952602L;

	/**
	 * 构造方法
	 */
	public MaterialSpecificationItems() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public MaterialSpecificationItems(IMaterialSpecification parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return MaterialSpecificationItem.class;
	}

	/**
	 * 创建物料规格-项目
	 * 
	 * @return 物料规格-项目
	 */
	public IMaterialSpecificationItem create() {
		IMaterialSpecificationItem item = new MaterialSpecificationItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IMaterialSpecificationItem item) {
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
