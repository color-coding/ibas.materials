package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 仓库检查契约
 * 
 * @author Niuren.Zhu
 *
 */
public interface IWarehouseCheckContract extends IBusinessLogicContract {

	/**
	 * 仓库编码
	 * 
	 * @return
	 */
	String getWarehouseCode();
}
