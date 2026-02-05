package org.colorcoding.ibas.materials.extension;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;

/**
 * 物料扩展数据
 */
public interface IMaterialExtendedData extends IBusinessObject {

	/**
	 * 获取-物料
	 * 
	 * @return 值
	 */
	String getItemCode();

}
