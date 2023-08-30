package org.colorcoding.ibas.materials.bo.materialinventory;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;

/**
 * 物料订购预留 接口
 * 
 */
public interface IMaterialOrderedReservationGroup extends IBusinessObject {

	/**
	 * 获取-源单据类型
	 * 
	 * @return 值
	 */
	String getSourceDocumentType();

	/**
	 * 设置-源单据类型
	 * 
	 * @param value 值
	 */
	void setSourceDocumentType(String value);

	/**
	 * 获取-源单据编号
	 * 
	 * @return 值
	 */
	Integer getSourceDocumentEntry();

	/**
	 * 设置-源单据编号
	 * 
	 * @param value 值
	 */
	void setSourceDocumentEntry(Integer value);

	/**
	 * 获取-源单据行号
	 * 
	 * @return 值
	 */
	Integer getSourceDocumentLineId();

	/**
	 * 设置-源单据行号
	 * 
	 * @param value 值
	 */
	void setSourceDocumentLineId(Integer value);

	/**
	 * 获取-行集合
	 * 
	 * @return 值
	 */
	IMaterialOrderedReservations getItems();

	/**
	 * 设置-行集合
	 * 
	 * @param value 值
	 */
	void setItems(IMaterialOrderedReservations value);

	/**
	 * 获取-原因数据集合
	 * 
	 * @return 值
	 */
	IMaterialOrderedReservations getCausalDatas();

	/**
	 * 设置-原因数据集合
	 * 
	 * @param value 值
	 */
	void setCausalDatas(IMaterialOrderedReservations value);
}
