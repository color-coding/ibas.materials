package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料已订购量记录契约
 */
public interface IMaterialOrderedJournalContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 仓库编码
	 *
	 * @return
	 */
	String getWarehouse();

	/**
	 * 单据类型
	 *
	 * @return
	 */
	String getDocumentType();

	/**
	 * 单据号
	 *
	 * @return
	 */
	Integer getDocumentEntry();

	/**
	 * 单据行号
	 *
	 * @return
	 */
	Integer getDocumentLineId();

	/**
	 * 数量
	 *
	 * @return
	 */
	BigDecimal getQuantity();

	/**
	 * 单位
	 *
	 * @return
	 */
	String getUOM();

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
