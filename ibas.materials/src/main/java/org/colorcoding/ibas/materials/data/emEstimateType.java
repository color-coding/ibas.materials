package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 预估类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
