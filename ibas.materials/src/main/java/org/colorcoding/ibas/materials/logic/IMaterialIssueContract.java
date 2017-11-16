package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料-发货契约  影响发货单对应的 日记账单生成(发货、转储BO对象继承此契约)
 */
public interface IMaterialIssueContract extends IBusinessLogicContract {

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
     * 基础单据类型
     *
     * @return
     */
    String getBaseDocumentType();

    /**
     * 基础单据号
     *
     * @return
     */
    Integer getBaseDocumentEntry();

    /**
     * 基础单据行号
     *
     * @return
     */
    Integer getBaseDocumentLineId();

    /**
     * 发货数量
     *
     * @return
     */
    Decimal getQuantity();

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
     * 取消
     *
     * @return
     */
    emYesNo getCanceled();

    /**
     * 单据状态
     *
     * @return
     */
    emDocumentStatus getStatus();
}
