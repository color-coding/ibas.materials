package org.colorcoding.ibas.materials.bo.materialinventory;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;

/**
 * 物料订购预留 接口
 * 
 */
public interface IMaterialInventoryReservationGroup extends IBusinessObject {

	/**
	 * 获取-原因
	 * 
	 * @return 值
	 */
	String getCauses();

	/**
	 * 设置-原因
	 * 
	 * @param value 值
	 */
	void setCauses(String value);

	/**
	 * 获取-批次编码
	 * 
	 * @return 值
	 */
	String getBatchCode();

	/**
	 * 设置-批次编码
	 * 
	 * @param value 值
	 */
	void setBatchCode(String value);

	/**
	 * 获取-序列编码
	 * 
	 * @return 值
	 */
	String getSerialCode();

	/**
	 * 设置-序列编码
	 * 
	 * @param value 值
	 */
	void setSerialCode(String value);

	/**
	 * 获取-行集合
	 * 
	 * @return 值
	 */
	IMaterialInventoryReservations getItems();

	/**
	 * 设置-行集合
	 * 
	 * @param value 值
	 */
	void setItems(IMaterialInventoryReservations value);
}
