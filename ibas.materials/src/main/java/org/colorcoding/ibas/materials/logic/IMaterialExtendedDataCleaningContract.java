package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料扩展数据清理契约
 */
public interface IMaterialExtendedDataCleaningContract extends IBusinessLogicContract {

	/**
	 * 获取-物料编码
	 * 
	 * @return 值
	 */
	String getItemCode();

}
