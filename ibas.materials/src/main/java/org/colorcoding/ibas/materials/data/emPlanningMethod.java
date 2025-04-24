package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 计划方式
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
