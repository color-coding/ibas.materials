package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.Decimal;

/**
 * @author Fancy
 */
public interface IMaterialPrice {
    /**
     * 获取-物料编码
     *
     * @return
     */
    String getItemCode();

    /**
     * 设置物料编码
     *
     * @param value
     */
    void setItemCode(String value);

    /**
     * 获取-价格
     *
     * @return
     */
    Decimal getPrice();

    /**
     * 设置价格
     *
     * @param value
     */
    void setPrice(Decimal value);

    /**
     * 设置价格
     *
     * @param value
     */
    void setPrice(int value);

    /**
     * 设置价格
     *
     * @param value
     */
    void setPrice(double value);

    /**
     * 获取-币种
     *
     * @return
     */
    String getCurrency();

    /**
     * 设置-币种
     *
     * @param value
     */
    void setCurrency(String value);


}
