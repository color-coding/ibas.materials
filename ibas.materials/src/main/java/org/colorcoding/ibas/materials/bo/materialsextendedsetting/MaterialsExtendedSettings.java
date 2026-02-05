package org.colorcoding.ibas.materials.bo.materialsextendedsetting;

import java.beans.PropertyChangeEvent;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ICriteria;

public class MaterialsExtendedSettings extends BusinessObjects<IMaterialsExtendedSetting, IBusinessObject>
		implements IMaterialsExtendedSettings {

	private static final long serialVersionUID = 2340198618599578187L;

	/**
	 * 构造方法
	 */
	public MaterialsExtendedSettings() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public MaterialsExtendedSettings(IBusinessObject parent) {
		super(parent);
	}

	@Override
	public Class<?> getElementType() {
		return MaterialsExtendedSetting.class;
	}

	@Override
	public IMaterialsExtendedSetting create() {
		IMaterialsExtendedSetting item = new MaterialsExtendedSetting();
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
	protected void afterAddItem(IMaterialsExtendedSetting item) {
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
	}
}
