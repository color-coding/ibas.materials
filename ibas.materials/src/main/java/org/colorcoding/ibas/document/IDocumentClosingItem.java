package org.colorcoding.ibas.document;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;

public interface IDocumentClosingItem {

	/**
	 * 获取-对象行号
	 * 
	 * @return 值
	 */
	Integer getLineId();

	/**
	 * 获取-数量
	 * 
	 * @return 值
	 */
	BigDecimal getQuantity();

	/**
	 * 获取-已清数量
	 * 
	 * @return 值
	 */
	BigDecimal getClosedQuantity();

	/**
	 * 设置-已清数量
	 * 
	 * @param value 值
	 */
	void setClosedQuantity(BigDecimal value);

	/**
	 * 获取-单据状态
	 * 
	 * @return
	 */
	emDocumentStatus getLineStatus();

	/**
	 * 设置-单据状态
	 * 
	 * @param value
	 */
	void setLineStatus(emDocumentStatus value);

	/**
	 * 获取-已引用
	 * 
	 * @return 值
	 */
	emYesNo getReferenced();

	/**
	 * 设置-已引用
	 * 
	 * @param value 值
	 */
	void setReferenced(emYesNo value);
}
