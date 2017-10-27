package org.colorcoding.ibas.materials.logic;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 仓库库存契约 影响物料对应仓库库存（日记账继承此契约）
 */
public interface IMaterialWarehouseInventoryContract  extends IBusinessLogicContract{

    /**
     * 物料编码
     * @return
     */
    String getMaterialWarehouse_ItemCode();

    /**
     * 仓库编码
     * @return
     */
    String getMaterialWarehouse_Warehouse();

    /**
     * 收货数量
     * @return
     */
    Decimal getMaterialWarehouse_Quantity();

    /**
     * 收/发货方向
     * @return
     */
    emDirection getMaterialWarehouse_Direction();
}
