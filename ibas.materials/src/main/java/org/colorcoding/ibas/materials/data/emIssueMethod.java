package org.colorcoding.ibas.materials.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 发货方式
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emIssueMethod {
	/**
	 * 手动
	 */
	@Value("M")
	MANUALLY,
	/**
	 * 倒冲
	 */
	@Value("B")
	BACKFLUSHING
}
