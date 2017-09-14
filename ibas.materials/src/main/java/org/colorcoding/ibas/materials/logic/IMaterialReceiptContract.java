package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logics.IBusinessLogicContract;

/**
 * 物料-收货契约 影响收货单对应的 日记账单生成(收货、转储BO对象继承此契约)
 */
public interface IMaterialReceiptContract extends IBusinessLogicContract{
    /**
     * 物料编码
     * @return
     */
    String getJournal_ItemCode();

    /**
     * 物料名称
     * @return
     */
    String getJournal_ItemName();

    /**
     * 仓库编码
     * @return
     */
    String getJournal_ReceiptWarehouseCode();

    /**
     * 基础单据类型
     * @return
     */
    String getJournal_BaseDocumentType();

    /**
     * 基础单据号
     * @return
     */
    Integer getJournal_BaseDocumentEntry();

    /**
     * 基础单据行号
     * @return
     */
    Integer getJournal_BaseDocumentLineId();

    /**
     * 发货数量
     * @return
     */
    Decimal getJournal_ReceiptQuantity();

    /**
     * 过账日期
     * @return
     */
    DateTime getJournal_PostingDate();

    /**
     * 到期日
     * @return
     */
    DateTime getJournal_DeliveryDate();

    /**
     * 凭证日期
     * @return
     */
    DateTime getJournal_DocumentDate();

    /**
     * 取消
     * @return
     */
    emYesNo getJournal_Canceled();

    /**
     * 单据状态
     * @return
     */
    emDocumentStatus getJournal_LineStatus();
}
