package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emSpecificationTarget {

	/**
	 * 物料
	 */
	@Value("M")
	MATERIAL,
	/**
	 * 物料组
	 */
	@Value("G")
	MATERIAL_GROUP,
}
