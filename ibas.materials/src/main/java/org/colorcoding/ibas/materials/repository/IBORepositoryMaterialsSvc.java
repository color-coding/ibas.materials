package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.materials.bo.goodsissue.*;
import org.colorcoding.ibas.materials.bo.goodsreceipt.*;
import org.colorcoding.ibas.materials.bo.inventorytransfer.*;
import org.colorcoding.ibas.materials.bo.material.*;
import org.colorcoding.ibas.materials.bo.materialgroup.*;
import org.colorcoding.ibas.materials.bo.materialinventory.*;
import org.colorcoding.ibas.materials.bo.materialjournal.*;
import org.colorcoding.ibas.materials.bo.warehouse.*;

/**
* Materials仓库服务
*/
public interface IBORepositoryMaterialsSvc extends IBORepositorySmartService {


    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存发货
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token);

    /**
     * 保存-库存发货
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存收货
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token);

    /**
     * 保存-库存收货
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存转储
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token);

    /**
     * 保存-库存转储
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<Material> fetchMaterial(ICriteria criteria, String token);

    /**
     * 保存-物料
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<Material> saveMaterial(Material bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料组
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token);

    /**
     * 保存-物料组
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料库存
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token);

    /**
     * 保存-物料库存
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<MaterialInventory> saveMaterialInventory(MaterialInventory bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库日记账
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<MaterialJournal> fetchMaterialJournal(ICriteria criteria, String token);

    /**
     * 保存-仓库日记账
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<MaterialJournal> saveMaterialJournal(MaterialJournal bo, String token);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token);

    /**
     * 保存-仓库
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token);

    //--------------------------------------------------------------------------------------------//

}
