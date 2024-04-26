package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 单据金额关闭契约
 */
public interface IDocumentAmountClosingContract extends IBusinessLogicContract {
	/**
	 * 检查数据状态
	 * 
	 * @return
	 */
	default boolean checkDataStatus() {
		if (DataConvert.isNullOrEmpty(this.getBaseDocumentType())) {
			return false;
		}
		if (Integer.compare(0, this.getBaseDocumentEntry()) >= 0) {
			return false;
		}
		return true;
	}

	/**
	 * 基于单据类型
	 * 
	 * @return
	 */
	String getBaseDocumentType();

	/**
	 * 基于单据编号
	 * 
	 * @return
	 */
	Integer getBaseDocumentEntry();

	/**
	 * 基于单据行号
	 * 
	 * @return
	 */
	Integer getBaseDocumentLineId();

	/**
	 * 金额
	 * 
	 * @return
	 */
	BigDecimal getAmount();
}
