package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.Decimal;

/**
 * @author Fancy
 * @date 2017/11/17
 */
public interface IMaterialQuantity {
    /**
     * 获取-物料编码
     *
     * @return
     */
    String getItemCode();

    /**
     * 设置-物料编码
     *
     * @param value
     */
    void setItemCode(String value);

    /**
     * 获取-库存
     *
     * @return
     */
    Decimal getOnHand();

    /**
     * 设置库存
     *
     * @param value
     */
    void setOnHand(Decimal value);

    /**
     * 设置库存
     *
     * @param value
     */
    void setOnHand(int value);

    /**
     * 设置库存
     *
     * @param value
     */
    void setOnHand(double value);

    /**
     * 获取库存单位
     * @return
     */
    String getUOM();

    /**
     * 设置库存单位
     * @param uom
     */
    void setUOM(String uom);
}
