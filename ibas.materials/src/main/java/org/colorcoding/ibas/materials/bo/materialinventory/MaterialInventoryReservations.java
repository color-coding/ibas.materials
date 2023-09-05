package org.colorcoding.ibas.materials.bo.materialinventory;

import java.beans.PropertyChangeEvent;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ICriteria;

public class MaterialInventoryReservations extends BusinessObjects<IMaterialInventoryReservation, IBusinessObject>
		implements IMaterialInventoryReservations {

	private static final long serialVersionUID = 5927751007171096466L;

	/**
	 * 构造方法
	 */
	public MaterialInventoryReservations() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public MaterialInventoryReservations(IBusinessObject parent) {
		super(parent);
	}

	@Override
	public Class<?> getElementType() {
		return MaterialInventoryReservation.class;
	}

	@Override
	public IMaterialInventoryReservation create() {
		IMaterialInventoryReservation item = new MaterialInventoryReservation();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	public ICriteria getElementCriteria() {
		return super.getElementCriteria();
	}

	@Override
	protected void afterAddItem(IMaterialInventoryReservation item) {
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
	}
}
