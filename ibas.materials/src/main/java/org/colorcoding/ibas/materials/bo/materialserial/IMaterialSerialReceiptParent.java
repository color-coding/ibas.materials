package org.colorcoding.ibas.materials.bo.materialserial;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.rule.ICheckRules;

/**
 * 物料序列收货继承此接口
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialSerialReceiptParent extends IMaterialSerialItemParent, ICheckRules {

	/**
	 * 过账日期
	 *
	 * @return
	 */
	DateTime getPostingDate();

	/**
	 * 到期日
	 *
	 * @return
	 */
	DateTime getDeliveryDate();

	/**
	 * 凭证日期
	 *
	 * @return
	 */
	DateTime getDocumentDate();

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
