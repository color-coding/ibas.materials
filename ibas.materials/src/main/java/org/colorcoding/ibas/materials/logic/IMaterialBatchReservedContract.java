package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料批次预留契约
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialBatchReservedContract extends IBusinessLogicContract {
	/**
	 * 批次编号
	 *
	 * @return
	 */
	String getBatchCode();

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 仓库
	 *
	 * @return
	 */
	String getWarehouse();

	/**
	 * 数量
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
