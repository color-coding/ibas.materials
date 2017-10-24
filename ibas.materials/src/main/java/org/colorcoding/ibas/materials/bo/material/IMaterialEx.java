package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.bo.IBOMasterData;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.data.emItemType;

/**
 *
 */
public interface IMaterialEx extends IMaterialBase {

    /**
     * 获取-仓库编码
     *
     * @return
     */
    String getWarehouseCode();

    /**
     * 设置-仓库编码
     *
     * @param value
     */
    void setWarehouseCode(String value);

    /**
     * 获取-仓库库存
     *
     * @return
     */
    Decimal getWarehouseOnHand();

    /**
     * 设置-仓库库存
     *
     * @param value
     */
    void setWarehouseOnHand(Decimal value);

    /**
     * 获取-价格清单名称
     *
     * @return
     */
    String getPriceListName();

    /**
     * 设置-价格清单名称
     *
     * @param value
     */
    void setPriceListName(String value);

    /**
     * 获取-价格清单价格
     *
     * @return
     */
    Decimal getPrice();

    /**
     * 设置-价格清单价格
     *
     * @param value
     */
    void setPrice(Decimal value);
}
