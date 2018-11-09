package org.colorcoding.ibas.materials.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 预估类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emEstimateType {
	/**
	 * 订购的
	 */
	@Value("O")
	ORDERED,
	/**
	 * 承诺的
	 */
	@Value("C")
	COMMITED,
}
