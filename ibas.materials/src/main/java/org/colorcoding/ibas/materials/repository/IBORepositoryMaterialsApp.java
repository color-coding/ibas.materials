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
* Materials仓库应用
*/
public interface IBORepositoryMaterialsApp extends IBORepositoryApplication {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存交易-发货
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria);

    /**
     * 保存-库存交易-发货
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存收货
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria);

    /**
     * 保存-库存收货
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存转储
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria);

    /**
     * 保存-库存转储
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IInventoryTransfer> saveInventoryTransfer(IInventoryTransfer bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IMaterial> fetchMaterial(ICriteria criteria);

    /**
     * 保存-物料
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IMaterial> saveMaterial(IMaterial bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料组
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria);

    /**
     * 保存-物料组
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料库存
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria);

    /**
     * 保存-物料库存
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IMaterialInventory> saveMaterialInventory(IMaterialInventory bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库日记账
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IMaterialJournal> fetchMaterialJournal(ICriteria criteria);

    /**
     * 保存-仓库日记账
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IMaterialJournal> saveMaterialJournal(IMaterialJournal bo);

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria);

    /**
     * 保存-仓库
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo);

    //--------------------------------------------------------------------------------------------//

}
