package org.colorcoding.ibas.materials.bo.materialbatch;

import org.colorcoding.ibas.bobas.rule.ICheckRules;

/**
 * 物料批次收货继承此接口
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialBatchReceiptParent extends IMaterialBatchItemParent, ICheckRules {

	/**
	 * 获取-基于单据类型
	 * 
	 * @return 值
	 */
	String getBaseDocumentType();

	/**
	 * 获取-基于单据标识
	 * 
	 * @return 值
	 */
	Integer getBaseDocumentEntry();

	/**
	 * 获取-基于单据行号
	 * 
	 * @return 值
	 */
	Integer getBaseDocumentLineId();
}
