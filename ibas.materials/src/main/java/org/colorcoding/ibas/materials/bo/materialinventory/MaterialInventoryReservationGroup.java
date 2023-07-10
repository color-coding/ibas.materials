package org.colorcoding.ibas.materials.bo.materialinventory;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;

/**
 * 物料订购预留 接口
 * 
 */
public class MaterialInventoryReservationGroup extends BusinessObject<IMaterialInventoryReservationGroup>
		implements IMaterialInventoryReservationGroup {

	private static final long serialVersionUID = -1505933970685831778L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialInventoryReservationGroup.class;

	public MaterialInventoryReservationGroup() {
		this.setSavable(false);
	}

	/**
	 * 属性名称-原因
	 */
	private static final String PROPERTY_CAUSES_NAME = "Causes";

	/**
	 * 原因 属性
	 */
	@DbField(name = "Causes", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_CAUSES = registerProperty(PROPERTY_CAUSES_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-原因
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CAUSES_NAME)
	public final String getCauses() {
		return this.getProperty(PROPERTY_CAUSES);
	}

	/**
	 * 设置-原因
	 * 
	 * @param value 值
	 */
	public final void setCauses(String value) {
		this.setProperty(PROPERTY_CAUSES, value);
	}

	/**
	 * 属性名称-批次编码
	 */
	private static final String PROPERTY_BATCHCODE_NAME = "BatchCode";

	/**
	 * 批次编码 属性
	 */
	@DbField(name = "BatchCode", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_BATCHCODE = registerProperty(PROPERTY_BATCHCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-批次编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BATCHCODE_NAME)
	public final String getBatchCode() {
		return this.getProperty(PROPERTY_BATCHCODE);
	}

	/**
	 * 设置-批次编码
	 * 
	 * @param value 值
	 */
	public final void setBatchCode(String value) {
		this.setProperty(PROPERTY_BATCHCODE, value);
	}

	/**
	 * 属性名称-序列编码
	 */
	private static final String PROPERTY_SERIALCODE_NAME = "SerialCode";

	/**
	 * 序列编码 属性
	 */
	@DbField(name = "SerialCode", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_SERIALCODE = registerProperty(PROPERTY_SERIALCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-序列编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIALCODE_NAME)
	public final String getSerialCode() {
		return this.getProperty(PROPERTY_SERIALCODE);
	}

	/**
	 * 设置-序列编码
	 * 
	 * @param value 值
	 */
	public final void setSerialCode(String value) {
		this.setProperty(PROPERTY_SERIALCODE, value);
	}

	/**
	 * 属性名称-项目集合
	 */
	private static final String PROPERTY_ITEMS_NAME = "Items";

	/**
	 * 库存收货-行的集合属性
	 * 
	 */
	public static final IPropertyInfo<IMaterialInventoryReservations> PROPERTY_ITEMS = registerProperty(
			PROPERTY_ITEMS_NAME, IMaterialInventoryReservations.class, MY_CLASS);

	/**
	 * 获取-项目集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_ITEMS_NAME)
	@XmlElement(name = MaterialInventoryReservation.BUSINESS_OBJECT_NAME, type = MaterialInventoryReservation.class)
	public final IMaterialInventoryReservations getItems() {
		return this.getProperty(PROPERTY_ITEMS);
	}

	/**
	 * 设置-项目集合
	 * 
	 * @param value 值
	 */
	public final void setItems(IMaterialInventoryReservations value) {
		this.setProperty(PROPERTY_ITEMS, value);
	}

	/**
	 * 属性名称-项目集合
	 */
	private static final String PROPERTY_CAUSALDATAS_NAME = "CausalDatas";

	/**
	 * 库存收货-行的集合属性
	 * 
	 */
	public static final IPropertyInfo<IMaterialOrderedReservations> PROPERTY_CAUSALDATAS = registerProperty(
			PROPERTY_CAUSALDATAS_NAME, IMaterialOrderedReservations.class, MY_CLASS);

	/**
	 * 获取-项目集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_CAUSALDATAS_NAME)
	@XmlElement(name = MaterialOrderedReservation.BUSINESS_OBJECT_NAME, type = MaterialOrderedReservation.class)
	public final IMaterialOrderedReservations getCausalDatas() {
		return this.getProperty(PROPERTY_CAUSALDATAS);
	}

	/**
	 * 设置-项目集合
	 * 
	 * @param value 值
	 */
	public final void setCausalDatas(IMaterialOrderedReservations value) {
		this.setProperty(PROPERTY_CAUSALDATAS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setItems(new MaterialInventoryReservations(this));
		this.setCausalDatas(new MaterialOrderedReservations(this));
	}
}
