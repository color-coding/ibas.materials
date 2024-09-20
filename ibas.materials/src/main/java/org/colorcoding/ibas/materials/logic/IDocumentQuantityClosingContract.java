package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 单据数量关闭契约
 */
public interface IDocumentQuantityClosingContract extends IBusinessLogicContract {
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
	 * 自动处理单据状态
	 * 关闭数量大于数量，完成订单
	 * @return
	 */
	default boolean isSmartDocumentStatus() {
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
	 * 数量
	 * 
	 * @return
	 */
	BigDecimal getQuantity();
}
