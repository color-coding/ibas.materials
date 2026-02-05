package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料扩展设置清理契约
 */
public interface IMaterialsExtendedSettingCleaningContract extends IBusinessLogicContract {

	/**
	 * 获取-目标类型
	 * 
	 * @return 值
	 */
	String getTargetCode();

	/**
	 * 获取-目标键值
	 * 
	 * @return 值
	 */
	String getTargetKeys();

}
