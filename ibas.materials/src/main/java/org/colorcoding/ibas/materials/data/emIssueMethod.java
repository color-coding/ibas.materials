package org.colorcoding.ibas.materials.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 发货方式
 * 
 * @author Niuren.Zhu
 *
 */
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
