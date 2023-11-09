package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料收货契约，影响出入库记录
 */
public interface IMaterialReceiptContract extends IBusinessLogicContract {
	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 物料名称
	 *
	 * @return
	 */
	String getItemName();

	/**
	 * 仓库编码
	 *
	 * @return
	 */
	String getWarehouse();

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
	 * 数量
	 *
	 * @return
	 */
	BigDecimal getQuantity();

	/**
	 * 单位
	 *
	 * @return
	 */
	String getUOM();

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
	DateTime getPostingDate();

	/**
	 * 到期日
	 *
	 * @return
	 */
	DateTime getDeliveryDate();

	/**
	 * 凭证日期
	 *
	 * @return
	 */
	DateTime getDocumentDate();

	/**
	 * 获取-批号管理
	 * 
	 * @return 值
	 */
	emYesNo getBatchManagement();

	/**
	 * 获取-序号管理
	 * 
	 * @return 值
	 */
	emYesNo getSerialManagement();

	/**
	 * 获取-基于单据类型
	 * 
	 * @return 值
	 */
	String getBaseDocumentType();

	/**
	 * 获取-基于单据标识
	 * 
	 * @return 值
	 */
	Integer getBaseDocumentEntry();

	/**
	 * 获取-基于单据行号
	 * 
	 * @return 值
	 */
	Integer getBaseDocumentLineId();

}
