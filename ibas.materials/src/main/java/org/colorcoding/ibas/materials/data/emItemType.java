package org.colorcoding.ibas.materials.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 物料类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emItemType {
	/**
	 * 物料
	 */
	@Value("I")
	ITEM,
	/**
	 * 服务
	 */
	@Value("S")
	SERVICES,
}
