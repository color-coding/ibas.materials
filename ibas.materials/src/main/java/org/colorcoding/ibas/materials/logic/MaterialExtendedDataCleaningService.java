package org.colorcoding.ibas.materials.logic;

import java.util.Iterator;

import javax.xml.bind.annotation.XmlElement;

import org.colorcoding.ibas.bobas.bo.BOFactory;
import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObjects;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectGroup;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.extension.IMaterialExtendedData;
import org.colorcoding.ibas.materials.extension.IMaterialExtendedDataFetcher;
import org.colorcoding.ibas.materials.extension.MaterialExtendedDataFetcherManager;

@LogicContract(IMaterialExtendedDataCleaningContract.class)
public class MaterialExtendedDataCleaningService
		extends BusinessLogic<IMaterialExtendedDataCleaningContract, IMaterialExtendedDataGroup> {

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
	protected IMaterialExtendedDataGroup fetchBeAffected(IMaterialExtendedDataCleaningContract contract) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias("ItemCode");
		condition.setValue(contract.getItemCode());

		IMaterialExtendedDataGroup extendedGroup = this.fetchBeAffected(IMaterialExtendedDataGroup.class, criteria);
		if (extendedGroup == null) {
			IMaterialExtendedData data;
			IMaterialExtendedData[] datas;
			IMaterialExtendedDataFetcher<?> fetcher;
			extendedGroup = new MaterialExtendedDataGroup();
			extendedGroup.setItemCode(contract.getItemCode());
			for (Class<? extends IMaterialExtendedDataFetcher<?>> fetcherType : MaterialExtendedDataFetcherManager
					.create().getFetchers()) {
				try {
					fetcher = BOFactory.newInstance(fetcherType);
					if (fetcher == null) {
						continue;
					}
					fetcher.setTransaction(this.getTransaction());
					datas = fetcher.fetch(contract.getItemCode());
					if (datas == null) {
						continue;
					}
					for (IMaterialExtendedData item : datas) {
						data = this.fetchBeAffected(IMaterialExtendedData.class, item.getCriteria());
						if (data == null) {
							// 使用数据库的
							extendedGroup.getItems().add(item);
						} else {
							// 使用内存的
							extendedGroup.getItems().add(data);
						}
					}
				} catch (Exception e) {
					throw new BusinessLogicException(e);
				}
			}
		}
		return extendedGroup;
	}

	@Override
	protected void impact(IMaterialExtendedDataCleaningContract contract) {
	}

	@Override
	protected void revoke(IMaterialExtendedDataCleaningContract contract) {
		if (this.getTrigger() instanceof IBusinessObject) {
			IBusinessObject triger = (IBusinessObject) this.getTrigger();
			if (triger.isDeleted()) {
				IMaterialExtendedDataGroup extendedGroup = this.getBeAffected();
				for (IMaterialExtendedData item : extendedGroup.getItems()) {
					item.delete();
				}
			}
		}
	}

}

interface IMaterialExtendedDataGroup extends IBusinessObject {

	/**
	 * 获取-物料编码
	 * 
	 * @return 值
	 */
	String getItemCode();

	/**
	 * 设置-物料编码
	 * 
	 * @param value 值
	 */
	void setItemCode(String value);

	/**
	 * 获取-项目集合
	 * 
	 * @return 值
	 */
	IMaterialExtendedDatas getItems();

	/**
	 * 设置-项目集合
	 * 
	 * @param value 值
	 */
	void setItems(IMaterialExtendedDatas value);
}

interface IMaterialExtendedDatas extends IBusinessObjects<IMaterialExtendedData, IBusinessObject> {

}

class MaterialExtendedDataGroup extends BusinessObject<IMaterialExtendedDataGroup>
		implements IMaterialExtendedDataGroup, IBusinessObjectGroup {

	private static final long serialVersionUID = 8767553131180512428L;

	private static final Class<?> MY_CLASS = MaterialExtendedDataGroup.class;

	public MaterialExtendedDataGroup() {
		this.setSavable(false);
	}

	private static final String PROPERTY_ITEMCODE_NAME = "ItemCode";

	@DbField(name = "ItemCode", type = DbFieldType.ALPHANUMERIC, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_ITEMCODE = registerProperty(PROPERTY_ITEMCODE_NAME, String.class,
			MY_CLASS);

	@XmlElement(name = PROPERTY_ITEMCODE_NAME)
	public final String getItemCode() {
		return this.getProperty(PROPERTY_ITEMCODE);
	}

	public final void setItemCode(String value) {
		this.setProperty(PROPERTY_ITEMCODE, value);
	}

	private static final String PROPERTY_SETTINGS_NAME = "Items";

	public static final IPropertyInfo<IMaterialExtendedDatas> PROPERTY_SETTINGS = registerProperty(
			PROPERTY_SETTINGS_NAME, IMaterialExtendedDatas.class, MY_CLASS);

	public final IMaterialExtendedDatas getItems() {
		return this.getProperty(PROPERTY_SETTINGS);
	}

	public final void setItems(IMaterialExtendedDatas value) {
		this.setProperty(PROPERTY_SETTINGS, value);
	}

	@Override
	protected void initialize() {
		super.initialize();
		this.setItems(new MaterialExtendedDatas(this));
	}

	@Override
	public Iterator<IBusinessObject> iterator() {
		ArrayList<IBusinessObject> list = new ArrayList<>();
		list.addAll(this.getItems());
		return list.iterator();
	}
}

class MaterialExtendedDatas extends BusinessObjects<IMaterialExtendedData, IBusinessObject>
		implements IMaterialExtendedDatas {

	private static final long serialVersionUID = 6776658694668848961L;

	public MaterialExtendedDatas() {
		super();
	}

	public MaterialExtendedDatas(IBusinessObject parent) {
		super(parent);
	}

	@Override
	public Class<?> getElementType() {
		return null;
	}

	@Override
	public IMaterialExtendedData create() {
		return null;
	}

	@Override
	public ICriteria getElementCriteria() {
		return null;
	}

}
