package org.colorcoding.ibas.materials.logic;

import java.util.ArrayList;
import java.util.Iterator;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectGroup;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.materialsextendedsetting.IMaterialsExtendedSetting;
import org.colorcoding.ibas.materials.bo.materialsextendedsetting.IMaterialsExtendedSettings;
import org.colorcoding.ibas.materials.bo.materialsextendedsetting.MaterialsExtendedSetting;
import org.colorcoding.ibas.materials.bo.materialsextendedsetting.MaterialsExtendedSettings;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialsExtendedSettingCleaningContract.class)
public class MaterialsExtendedSettingCleaningService
		extends BusinessLogic<IMaterialsExtendedSettingCleaningContract, IMaterialsExtendedSettingGroup> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (this.getTrigger() instanceof IBusinessObject) {
			IBusinessObject trigger = (IBusinessObject) this.getTrigger();
			if (trigger.isDeleted() == false) {
				// 非删除，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "isDeleted",
						"False");
				return false;
			}
		}
		return true;
	}

	@Override
	protected IMaterialsExtendedSettingGroup fetchBeAffected(IMaterialsExtendedSettingCleaningContract contract) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialsExtendedSetting.PROPERTY_TARGETCODE.getName());
		condition.setValue(contract.getTargetCode());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialsExtendedSetting.PROPERTY_TARGETKEYS.getName());
		condition.setValue(contract.getTargetKeys());

		IMaterialsExtendedSettingGroup extendedGroup = this.fetchBeAffected(IMaterialsExtendedSettingGroup.class,
				criteria);
		if (extendedGroup == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialsExtendedSetting> opRsltSetting = boRepository
						.fetchMaterialsExtendedSetting(criteria);
				if (opRsltSetting.getError() != null) {
					throw new BusinessLogicException(opRsltSetting.getError());
				}
				extendedGroup = new MaterialsExtendedSettingGroup();
				extendedGroup.setTargetCode(contract.getTargetCode());
				extendedGroup.setTargetKeys(contract.getTargetKeys());
				IMaterialsExtendedSetting setting;
				for (IMaterialsExtendedSetting item : opRsltSetting.getResultObjects()) {
					// 判断内存中是否已有
					setting = this.fetchBeAffected(IMaterialsExtendedSetting.class, item.getCriteria());
					if (setting == null) {
						// 使用数据库的
						extendedGroup.getSettings().add(item);
					} else {
						// 使用内存的
						extendedGroup.getSettings().add(setting);
					}
				}
			}
		}
		return extendedGroup;
	}

	@Override
	protected void impact(IMaterialsExtendedSettingCleaningContract contract) {
	}

	@Override
	protected void revoke(IMaterialsExtendedSettingCleaningContract contract) {
		if (this.getTrigger() instanceof IBusinessObject) {
			IBusinessObject triger = (IBusinessObject) this.getTrigger();
			if (triger.isDeleted()) {
				IMaterialsExtendedSettingGroup extendedGroup = this.getBeAffected();
				for (IMaterialsExtendedSetting item : extendedGroup.getSettings()) {
					item.delete();
				}
			}
		}
	}

}

interface IMaterialsExtendedSettingGroup extends IBusinessObject {

	/**
	 * 获取-目标类型
	 * 
	 * @return 值
	 */
	String getTargetCode();

	/**
	 * 设置-目标类型
	 * 
	 * @param value 值
	 */
	void setTargetCode(String value);

	/**
	 * 获取-目标键值
	 * 
	 * @return 值
	 */
	String getTargetKeys();

	/**
	 * 设置-目标键值
	 * 
	 * @param value 值
	 */
	void setTargetKeys(String value);

	/**
	 * 获取-设置集合
	 * 
	 * @return 值
	 */
	IMaterialsExtendedSettings getSettings();

	/**
	 * 设置-设置集合
	 * 
	 * @param value 值
	 */
	void setSettings(IMaterialsExtendedSettings value);
}

class MaterialsExtendedSettingGroup extends BusinessObject<IMaterialsExtendedSettingGroup>
		implements IMaterialsExtendedSettingGroup, IBusinessObjectGroup {

	private static final long serialVersionUID = 8767553131180512428L;

	private static final Class<?> MY_CLASS = MaterialsExtendedSettingGroup.class;

	public MaterialsExtendedSettingGroup() {
		this.setSavable(false);
	}

	/**
	 * 属性名称-目标类型
	 */
	private static final String PROPERTY_TARGETCODE_NAME = "TargetCode";

	/**
	 * 目标类型 属性
	 */
	@DbField(name = "TargetCode", type = DbFieldType.ALPHANUMERIC, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_TARGETCODE = registerProperty(PROPERTY_TARGETCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-目标类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGETCODE_NAME)
	public final String getTargetCode() {
		return this.getProperty(PROPERTY_TARGETCODE);
	}

	/**
	 * 设置-目标类型
	 * 
	 * @param value 值
	 */
	public final void setTargetCode(String value) {
		this.setProperty(PROPERTY_TARGETCODE, value);
	}

	/**
	 * 属性名称-目标键值
	 */
	private static final String PROPERTY_TARGETKEYS_NAME = "TargetKeys";

	/**
	 * 目标键值 属性
	 */
	@DbField(name = "TargetKeys", type = DbFieldType.ALPHANUMERIC, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_TARGETKEYS = registerProperty(PROPERTY_TARGETKEYS_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-目标键值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGETKEYS_NAME)
	public final String getTargetKeys() {
		return this.getProperty(PROPERTY_TARGETKEYS);
	}

	/**
	 * 设置-目标键值
	 * 
	 * @param value 值
	 */
	public final void setTargetKeys(String value) {
		this.setProperty(PROPERTY_TARGETKEYS, value);
	}

	private static final String PROPERTY_SETTINGS_NAME = "Settings";

	public static final IPropertyInfo<IMaterialsExtendedSettings> PROPERTY_SETTINGS = registerProperty(
			PROPERTY_SETTINGS_NAME, IMaterialsExtendedSettings.class, MY_CLASS);

	@XmlElementWrapper(name = PROPERTY_SETTINGS_NAME)
	@XmlElement(name = MaterialsExtendedSetting.BUSINESS_OBJECT_NAME, type = MaterialsExtendedSetting.class)
	public final IMaterialsExtendedSettings getSettings() {
		return this.getProperty(PROPERTY_SETTINGS);
	}

	public final void setSettings(IMaterialsExtendedSettings value) {
		this.setProperty(PROPERTY_SETTINGS, value);
	}

	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setSettings(new MaterialsExtendedSettings(this));
	}

	@Override
	public Iterator<IBusinessObject> iterator() {
		ArrayList<IBusinessObject> list = new ArrayList<>();
		list.addAll(this.getSettings());
		return list.iterator();
	}
}