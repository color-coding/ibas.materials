package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料预留契约
 */
public interface IMaterialReservedContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

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
