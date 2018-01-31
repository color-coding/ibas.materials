package org.colorcoding.ibas.materials.bo.materialserial;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 物料序列项目父项（此接口仅数据存储，不影响库存）
 * 
 * 发货使用：IMaterialSerialIssueParent
 * 
 * 收货使用：IMaterialSerialReceiptParent
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialSerialItemParent extends IBusinessObject {
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
	 * 序号管理
	 * 
	 * @return 值
	 */
	emYesNo getSerialManagement();

	/**
	 * 仓库
	 */
	String getWarehouse();

	/**
	 * 数量
	 */
	Decimal getQuantity();

	/**
	 * 物料序列集合
	 */
	IMaterialSerialItems getMaterialSerials();

}
