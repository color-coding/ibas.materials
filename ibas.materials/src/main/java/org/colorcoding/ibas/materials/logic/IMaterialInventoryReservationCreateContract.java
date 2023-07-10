package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料库存预留创建契约（从物料订购预留）
 */
public interface IMaterialInventoryReservationCreateContract extends IBusinessLogicContract {

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
	 * 获取-源单据类型
	 * 
	 * @return 值
	 */
	String getSourceDocumentType();

	/**
	 * 获取-源单据编号
	 * 
	 * @return 值
	 */
	Integer getSourceDocumentEntry();

	/**
	 * 获取-源单据行号
	 * 
	 * @return 值
	 */
	Integer getSourceDocumentLineId();

}
