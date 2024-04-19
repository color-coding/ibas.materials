package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料仓库检查
 */
public interface IMaterialWarehouseCheckContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 物料版本
	 * 
	 * @return 值
	 */
	default String getItemVersion() {
		return null;
	}

	/**
	 * 仓库编码
	 *
	 * @return
	 */
	default String getWarehouse() {
		return null;
	}

	/**
	 * 获取-批号管理
	 * 
	 * @return 值
	 */
	default emYesNo getBatchManagement() {
		return null;
	}

	/**
	 * 获取-序号管理
	 * 
	 * @return 值
	 */
	default emYesNo getSerialManagement() {
		return null;
	}

}
