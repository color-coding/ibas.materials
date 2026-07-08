package org.colorcoding.ibas.materials.bo.pickinglist;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 拣配清单-行 集合
 */
@XmlType(name = PickingListLines.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ PickingListLine.class })
public class PickingListLines extends BusinessObjects<IPickingListLine, IPickingList> implements IPickingListLines {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "PickingListLines";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 1262242288944163567L;

	/**
	 * 构造方法
	 */
	public PickingListLines() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public PickingListLines(IPickingList parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return PickingListLine.class;
	}

	/**
	 * 创建拣配清单-行
	 * 
	 * @return 拣配清单-行
	 */
	public IPickingListLine create() {
		IPickingListLine item = new PickingListLine();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IPickingListLine item) {
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
