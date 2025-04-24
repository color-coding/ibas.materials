package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emValuationMethod {

	/**
	 * 移动平均
	 */
	@Value("A")
	MOVING_AVERAGE,

	/**
	 * 批次移动平均
	 */
	@Value("B")
	BATCH_MOVING_AVERAGE,
}
