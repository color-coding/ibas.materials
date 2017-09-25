package org.colorcoding.ibas.materials.logic;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logics.IBusinessLogicContract;

/**
 * 仓库库存契约 影响物料对应仓库库存（日记账继承此契约）
 */
public interface IMaterialWarehouseInventoryContract  extends IBusinessLogicContract{

    /**
     * 物料编码
     * @return
     */
    String getItemCode();

    /**
     * 仓库编码
     * @return
     */
    String getWarehouse();

    /**
     * 收货数量
     * @return
     */
    Decimal getQuantity();

    /**
     * 收/发货方向
     * @return
     */
    emDirection getDirection();
}
