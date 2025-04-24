package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 拣配状态
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
