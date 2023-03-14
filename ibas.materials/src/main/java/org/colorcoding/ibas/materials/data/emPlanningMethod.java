package org.colorcoding.ibas.materials.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 计划方式
 * 
 * @author Niuren.Zhu
 *
 */
public enum emPlanningMethod {

	/**
	 * 无
	 */
	@Value("N")
	NONE,

	/**
	 * 物料需求计划
	 */
	@Value("M")
	MRP
}
