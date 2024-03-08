package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emSpecificationAssigned {
	/**
	 * 业务伙伴组
	 */
	@Value("G")
	BUSINESS_PARTNER_GROUP,
	/**
	 * 客户
	 */
	@Value("C")
	CUSTOMER,
	/**
	 * 供应商
	 */
	@Value("S")
	SUPPLIER,
}
