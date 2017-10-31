package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料库存契约  影响物料库存
 */
public interface IMaterialInventoryContract extends IBusinessLogicContract {
    /**
     * 物料编码
     *
     * @return
     */
    String getItemCode();

    /**
     * 收货数量
     *
     * @return
     */
    Decimal getQuantity();

    /**
     * 收/发货方向
     *
     * @return
     */
    emDirection getDirection();
}
