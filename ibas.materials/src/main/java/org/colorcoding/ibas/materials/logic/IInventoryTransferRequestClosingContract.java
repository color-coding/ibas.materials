package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 库存转储请求，关闭契约
 * 
 * @author Niuren.Zhu
 *
 */
public interface IInventoryTransferRequestClosingContract extends IBusinessLogicContract {

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
