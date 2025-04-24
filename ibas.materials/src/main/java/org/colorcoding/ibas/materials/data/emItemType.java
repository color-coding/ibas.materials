package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 物料类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
