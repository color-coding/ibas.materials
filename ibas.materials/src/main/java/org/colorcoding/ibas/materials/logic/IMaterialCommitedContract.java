package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料承诺数量契约
 */
public interface IMaterialCommitedContract extends IBusinessLogicContract {

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 数量
	 *
	 * @return
	 */
	BigDecimal getQuantity();

	/**
	 * 方向
	 *
	 * @return
	 */
	default emDirection getDirection() {
		return emDirection.IN;
	}
}
