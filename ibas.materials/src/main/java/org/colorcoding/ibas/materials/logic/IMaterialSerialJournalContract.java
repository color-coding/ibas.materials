package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.DateTime;
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
	 * 抵消逻辑
	 * 
	 * @return 值
	 */
	boolean isOffsetting();

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

	/**
	 * 单据索引
	 *
	 * @return
	 */
	Integer getDocumentIndex();

	/**
	 * 获取-价格
	 * 
	 * @return 值
	 */
	BigDecimal getPrice();

	/**
	 * 获取-货币
	 * 
	 * @return 值
	 */
	String getCurrency();

	/**
	 * 获取-汇率
	 * 
	 * @return 值
	 */
	BigDecimal getRate();

	/**
	 * 过账日期
	 *
	 * @return
	 */
	default DateTime getPostingDate() {
		return null;
	}

	/**
	 * 到期日
	 *
	 * @return
	 */
	default DateTime getDeliveryDate() {
		return null;
	}

	/**
	 * 凭证日期
	 *
	 * @return
	 */
	default DateTime getDocumentDate() {
		return null;
	}

	/**
	 * 获取-基于单据类型
	 * 
	 * @return 值
	 */
	default String getBaseDocumentType() {
		return null;
	}

	/**
	 * 获取-基于单据标识
	 * 
	 * @return 值
	 */
	default Integer getBaseDocumentEntry() {
		return null;
	}

	/**
	 * 获取-基于单据行号
	 * 
	 * @return 值
	 */
	default Integer getBaseDocumentLineId() {
		return null;
	}

	/**
	 * 成本价格计算后
	 * @param price 成本价格
	 */
	default void onCalculatedCostPrice(BigDecimal price) {

	}
}
