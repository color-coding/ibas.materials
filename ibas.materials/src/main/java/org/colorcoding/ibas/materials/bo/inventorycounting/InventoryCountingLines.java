package org.colorcoding.ibas.materials.bo.inventorycounting;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 库存盘点-行 集合
 */
@XmlType(name = InventoryCountingLines.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ InventoryCountingLine.class })
public class InventoryCountingLines extends BusinessObjects<IInventoryCountingLine, IInventoryCounting>
		implements IInventoryCountingLines {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "InventoryCountingLines";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 5808887559135004982L;

	/**
	 * 构造方法
	 */
	public InventoryCountingLines() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public InventoryCountingLines(IInventoryCounting parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return InventoryCountingLine.class;
	}

	/**
	 * 创建库存盘点-行
	 * 
	 * @return 库存盘点-行
	 */
	public IInventoryCountingLine create() {
		IInventoryCountingLine item = new InventoryCountingLine();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IInventoryCountingLine item) {
		super.afterAddItem(item);
		if (item instanceof InventoryCountingLine) {
			((InventoryCountingLine) item).parent = this.getParent();
		}
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
	}
}
