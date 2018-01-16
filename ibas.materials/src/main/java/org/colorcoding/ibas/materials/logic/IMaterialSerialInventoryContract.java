package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料序列号契约，影响序列号库存
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialSerialInventoryContract extends IBusinessLogicContract {
	/**
	 * 序列编号
	 *
	 * @return
	 */
	String getSerialCode();

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
