package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logics.IBusinessLogicContract;

public interface IMaterialSerialJournalContract extends IBusinessLogicContract{
    /**
     * 物料编码
     *
     * @return
     */
    String getItemCode();

    /**
     * 仓库
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
}
