package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料批次库存契约，影响批次库存
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialBatchInventoryContract extends IBusinessLogicContract {
	/**
	 * 批次编号
	 *
	 * @return
	 */
	String getBatchCode();

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 仓库
	 *
	 * @return
	 */
	String getWarehouse();

	/**
	 * 数量
	 *
	 * @return
	 */
	Decimal getQuantity();

	/**
	 * 方向
	 *
	 * @return
	 */
	emDirection getDirection();

	/**
	 * 单据类型
	 *
	 * @return
	 */
	String getBaseDocumentType();

	/**
	 * 单据号
	 *
	 * @return
	 */
	Integer getBaseDocumentEntry();

	/**
	 * 单据行号
	 *
	 * @return
	 */
	Integer getBaseDocumentLineId();
}
