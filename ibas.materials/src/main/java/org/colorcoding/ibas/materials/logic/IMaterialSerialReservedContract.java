package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料序列预留契约
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialSerialReservedContract extends IBusinessLogicContract {
	/**
	 * 序列编号
	 *
	 * @return
	 */
	String getSerialCode();

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

}
