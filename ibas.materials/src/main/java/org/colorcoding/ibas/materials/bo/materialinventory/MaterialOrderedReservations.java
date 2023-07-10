package org.colorcoding.ibas.materials.bo.materialinventory;

import java.beans.PropertyChangeEvent;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;

public class MaterialOrderedReservations
		extends BusinessObjects<IMaterialOrderedReservation, IMaterialOrderedReservationGroup>
		implements IMaterialOrderedReservations {

	private static final long serialVersionUID = 5927751007171096466L;

	/**
	 * 构造方法
	 */
	public MaterialOrderedReservations() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public MaterialOrderedReservations(IMaterialOrderedReservationGroup parent) {
		super(parent);
	}

	@Override
	public Class<?> getElementType() {
		return MaterialOrderedReservation.class;
	}

	@Override
	public IMaterialOrderedReservation create() {
		IMaterialOrderedReservation item = new MaterialOrderedReservation();
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
	protected void afterAddItem(IMaterialOrderedReservation item) {
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
	}
}
