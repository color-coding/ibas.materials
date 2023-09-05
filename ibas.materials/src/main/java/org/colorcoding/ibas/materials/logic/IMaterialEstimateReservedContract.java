package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.data.emEstimateType;

public interface IMaterialEstimateReservedContract extends IBusinessLogicContract {

	/**
	 * 类型
	 * 
	 * @return
	 */
	emEstimateType getEstimateType();

	/**
	 * 单据类型
	 *
	 * @return
	 */
	String getDocumentType();

	/**
	 * 单据号
	 *
	 * @return
	 */
	Integer getDocumentEntry();

	/**
	 * 单据行号
	 *
	 * @return
	 */
	Integer getDocumentLineId();

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 仓库编码
	 *
	 * @return
	 */
	String getWarehouse();

	/**
	 * 数量（库存单位）
	 *
	 * @return
	 */
	BigDecimal getQuantity();

	/**
	 * 状态
	 * 
	 * @return
	 */
	emBOStatus getStatus();
}
