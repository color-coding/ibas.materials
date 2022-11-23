package org.colorcoding.ibas.materials.bo.materialbatch;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 物料批次项目父项（此接口仅数据存储，不影响库存）
 * 
 * 发货使用：IMaterialBatchIssueParent
 * 
 * 收货使用：IMaterialBatchReceiptParent
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialBatchItemParent extends IBusinessObject {
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
	 * 基于行状态
	 */
	emDocumentStatus getLineStatus();

	/**
	 * 物料
	 */
	String getItemCode();

	/**
	 * 批号管理
	 * 
	 * @return 值
	 */
	emYesNo getBatchManagement();

	/**
	 * 仓库
	 */
	String getWarehouse();

	/**
	 * 数量
	 */
	BigDecimal getTargetQuantity();

	/**
	 * 单位
	 */
	String getTargetUOM();

	/**
	 * 物料批次项目集合
	 */
	IMaterialBatchItems getMaterialBatches();

}
