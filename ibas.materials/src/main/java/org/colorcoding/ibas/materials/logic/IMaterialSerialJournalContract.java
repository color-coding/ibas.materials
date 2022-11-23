package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料序列记录契约，影响序列编码记录
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialSerialJournalContract extends IBusinessLogicContract {
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
	 * 单位
	 */
	String getUOM();

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
}
