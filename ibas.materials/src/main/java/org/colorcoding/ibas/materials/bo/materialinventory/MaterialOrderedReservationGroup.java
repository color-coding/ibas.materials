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
public class MaterialOrderedReservationGroup extends BusinessObject<IMaterialOrderedReservationGroup>
		implements IMaterialOrderedReservationGroup {

	private static final long serialVersionUID = 4518927200569065618L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialOrderedReservationGroup.class;

	public MaterialOrderedReservationGroup() {
		this.setSavable(false);
	}

	/**
	 * 属性名称-源单据类型
	 */
	private static final String PROPERTY_SOURCEDOCUMENTTYPE_NAME = "SourceDocumentType";

	/**
	 * 源单据类型 属性
	 */
	@DbField(name = "SourceType", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_SOURCEDOCUMENTTYPE = registerProperty(
			PROPERTY_SOURCEDOCUMENTTYPE_NAME, String.class, MY_CLASS);

	/**
	 * 获取-源单据类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SOURCEDOCUMENTTYPE_NAME)
	public final String getSourceDocumentType() {
		return this.getProperty(PROPERTY_SOURCEDOCUMENTTYPE);
	}

	/**
	 * 设置-源单据类型
	 * 
	 * @param value 值
	 */
	public final void setSourceDocumentType(String value) {
		this.setProperty(PROPERTY_SOURCEDOCUMENTTYPE, value);
	}

	/**
	 * 属性名称-源单据编号
	 */
	private static final String PROPERTY_SOURCEDOCUMENTENTRY_NAME = "SourceDocumentEntry";

	/**
	 * 源单据编号 属性
	 */
	@DbField(name = "SourceEntry", type = DbFieldType.NUMERIC)
	public static final IPropertyInfo<Integer> PROPERTY_SOURCEDOCUMENTENTRY = registerProperty(
			PROPERTY_SOURCEDOCUMENTENTRY_NAME, Integer.class, MY_CLASS);

	/**
	 * 获取-源单据编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SOURCEDOCUMENTENTRY_NAME)
	public final Integer getSourceDocumentEntry() {
		return this.getProperty(PROPERTY_SOURCEDOCUMENTENTRY);
	}

	/**
	 * 设置-源单据编号
	 * 
	 * @param value 值
	 */
	public final void setSourceDocumentEntry(Integer value) {
		this.setProperty(PROPERTY_SOURCEDOCUMENTENTRY, value);
	}

	/**
	 * 属性名称-源单据行号
	 */
	private static final String PROPERTY_SOURCEDOCUMENTLINEID_NAME = "SourceDocumentLineId";

	/**
	 * 源单据行号 属性
	 */
	@DbField(name = "SourceLine", type = DbFieldType.NUMERIC)
	public static final IPropertyInfo<Integer> PROPERTY_SOURCEDOCUMENTLINEID = registerProperty(
			PROPERTY_SOURCEDOCUMENTLINEID_NAME, Integer.class, MY_CLASS);

	/**
	 * 获取-源单据行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SOURCEDOCUMENTLINEID_NAME)
	public final Integer getSourceDocumentLineId() {
		return this.getProperty(PROPERTY_SOURCEDOCUMENTLINEID);
	}

	/**
	 * 设置-源单据行号
	 * 
	 * @param value 值
	 */
	public final void setSourceDocumentLineId(Integer value) {
		this.setProperty(PROPERTY_SOURCEDOCUMENTLINEID, value);
	}

	/**
	 * 属性名称-项目集合
	 */
	private static final String PROPERTY_ITEMS_NAME = "Items";

	/**
	 * 库存收货-行的集合属性
	 * 
	 */
	public static final IPropertyInfo<IMaterialOrderedReservations> PROPERTY_ITEMS = registerProperty(
			PROPERTY_ITEMS_NAME, IMaterialOrderedReservations.class, MY_CLASS);

	/**
	 * 获取-项目集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_ITEMS_NAME)
	@XmlElement(name = MaterialOrderedReservation.BUSINESS_OBJECT_NAME, type = MaterialOrderedReservation.class)
	public final IMaterialOrderedReservations getItems() {
		return this.getProperty(PROPERTY_ITEMS);
	}

	/**
	 * 设置-项目集合
	 * 
	 * @param value 值
	 */
	public final void setItems(IMaterialOrderedReservations value) {
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
		this.setItems(new MaterialOrderedReservations(this));
		this.setCausalDatas(new MaterialOrderedReservations(this));
	}
}
