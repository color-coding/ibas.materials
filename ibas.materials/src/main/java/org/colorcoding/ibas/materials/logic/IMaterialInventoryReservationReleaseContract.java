package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料库存预留释放契约
 */
public interface IMaterialInventoryReservationReleaseContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 获取-仓库编号
	 * 
	 * @return 值
	 */
	String getWarehouse();

	/**
	 * 获取-批次编码
	 * 
	 * @return 值
	 */
	default String getBatchCode() {
		return null;
	}

	/**
	 * 获取-序列编码
	 * 
	 * @return 值
	 */
	default String getSerialCode() {
		return null;
	}

	/**
	 * 获取-数量
	 * 
	 * @return 值
	 */
	BigDecimal getQuantity();

	/**
	 * 获取-目标单据类型
	 * 
	 * @return 值
	 */
	String getTargetDocumentType();

	/**
	 * 获取-目标单据编号
	 * 
	 * @return 值
	 */
	Integer getTargetDocumentEntry();

	/**
	 * 获取-目标单据行号
	 * 
	 * @return 值
	 */
	Integer getTargetDocumentLineId();

}
