package org.colorcoding.ibas.materials.data;

import jakarta.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 获取方式
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emProcurementMethod {
	/**
	 * 采购
	 */
	@Value("B")
	BUY,
	/**
	 * 生产
	 */
	@Value("M")
	MAKE,

}
