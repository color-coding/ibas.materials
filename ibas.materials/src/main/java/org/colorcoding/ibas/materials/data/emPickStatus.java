package org.colorcoding.ibas.materials.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 拣配状态
 */
public enum emPickStatus {
	/**
	 * 已审批
	 */
	@Value("R")
	RELEASED,
	/**
	 * 已拣配
	 */
	@Value("Y")
	PICKED,
	/**
	 * 已部分拣配
	 */
	@Value("P")
	PARTIALLYPICKED,
	/**
	 * 已部分交货
	 */
	@Value("D")
	PARTIALLYDELIVERED,
	/**
	 * 已结算
	 */
	@Value("C")
	CLOSED

}
