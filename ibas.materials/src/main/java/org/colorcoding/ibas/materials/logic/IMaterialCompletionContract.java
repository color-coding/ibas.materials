package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料信息补全契约
 */
public interface IMaterialCompletionContract extends IBusinessLogicContract {
	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 获取-物料标识
	 * 
	 * @return 值
	 */
	String getItemSign();

	/**
	 * 设置-物料标识
	 * 
	 * @param value 值
	 */
	void setItemSign(String value);

	/**
	 * 获取-物料/服务描述
	 * 
	 * @return 值
	 */
	String getItemDescription();

	/**
	 * 设置-物料/服务描述
	 * 
	 * @param value 值
	 */
	void setItemDescription(String value);
}
