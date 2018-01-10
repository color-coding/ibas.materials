package org.colorcoding.ibas.materials.bo.materialserial;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;

/**
 * @author Fancy
 * @date 2018/1/9
 */
public interface IMaterialSerialDocument extends IBusinessObject {
    /**
     * 基于类型
     */
    String getObjectCode();

    void setObjectCode(String value);

    /**
     * 基于标识
     */
    Integer getDocEntry();

    void setDocEntry(Integer value);

    /**
     * 基于行号
     */

    Integer getLineId();

    void setLineId(Integer value);

    /**
     * 物料
     */
    String getItemCode();

    void setItemCode(String value);

    /**
     * 仓库
     */
    String getWarehouse();

    void setWarehouse(String value);

    /**
     * 数量
     */
    Decimal getQuantity();

    void setQuantity(Decimal value);

    /**
     * 行状态
     */
    emDocumentStatus getLineStatus();

    void setLineStatus(emDocumentStatus value);

    /**
     *  序列集合
     */
//    IMaterialSerialJournals<IMaterialSerialDocument> getMaterialSerials();
//
//    void setMaterialSerials(IMaterialSerialJournals<IMaterialSerialDocument> value);
}
