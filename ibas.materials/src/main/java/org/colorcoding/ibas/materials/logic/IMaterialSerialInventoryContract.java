package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料序列契约，影响序列编码库存
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
	 * 获取-计算价格
	 * 
	 * @return 值
	 */
	BigDecimal getCalculatedPrice();

	/**
	 * 方向
	 *
	 * @return
	 */
	emDirection getDirection();

	/**
	 * 数量
	 *
	 * @return
	 */
	BigDecimal getQuantity();

}
