package org.colorcoding.ibas.materials.bo.materialserial;

import java.math.BigDecimal;

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
	 * 状态
	 * 
	 * false，不执行逻辑
	 * 
	 * @return
	 */
	default boolean checkSerialStatus() {
		return true;
	}

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

	/**
	 * 获取-价格
	 * 
	 * @return 值
	 */
	BigDecimal getSerialPrice();

	/**
	 * 获取-货币
	 * 
	 * @return 值
	 */
	String getCurrency();

	/**
	 * 获取-汇率
	 * 
	 * @return 值
	 */
	BigDecimal getRate();
}
