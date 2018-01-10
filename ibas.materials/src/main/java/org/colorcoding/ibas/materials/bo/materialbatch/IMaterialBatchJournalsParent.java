package org.colorcoding.ibas.materials.bo.materialbatch;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;

/**
 * @author Fancy
 * @date 2018/1/9
 */
public interface IMaterialBatchJournalsParent extends IBusinessObject {
	/**
	 * 基于类型
	 */
	String getObjectCode();

	/**
	 * 基于标识
	 */
	Integer getDocEntry();

	/**
	 * 基于行号
	 */

	Integer getLineId();

	/**
	 * 物料
	 */
	String getItemCode();

	/**
	 * 仓库
	 */
	String getWarehouse();

	/**
	 * 数量
	 */
	Decimal getQuantity();

	/**
	 * 行状态
	 */
	emDocumentStatus getLineStatus();

	/**
	 * 物料批次记录集合
	 */
	IMaterialBatchJournals getMaterialBatches();

}
