package org.colorcoding.ibas.materials.bo.materialbatch;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.rule.ICheckRules;

/**
 * 物料批次收货继承此接口
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialBatchReceiptParent extends IMaterialBatchItemParent, ICheckRules {
	/**
	 * 状态
	 * 
	 * false，不执行逻辑
	 * 
	 * @return
	 */
	default boolean checkBatchStatus() {
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
	 * 获取-库存价格
	 * 
	 * @return 值
	 */
	BigDecimal getInventoryPrice();

	/**
	 * 获取-库存价格货币
	 * 
	 * @return 值
	 */
	String getInventoryCurrency();

	/**
	 * 获取-库存价格汇率
	 * 
	 * @return 值
	 */
	BigDecimal getInventoryRate();
}
