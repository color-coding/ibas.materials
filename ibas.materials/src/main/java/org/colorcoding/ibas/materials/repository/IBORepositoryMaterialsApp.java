package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorycounting.IInventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IMaterialGroup;
import org.colorcoding.ibas.materials.bo.material.IMaterialPrice;
import org.colorcoding.ibas.materials.bo.material.IMaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.IProduct;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;

/**
 * Materials仓库应用
 */
public interface IBORepositoryMaterialsApp extends IBORepositoryApplication {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存发货
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria);

	/**
	 * 保存-库存发货
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存收货
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria);

	/**
	 * 保存-库存收货
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria);

	/**
	 * 保存-库存转储
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IInventoryTransfer> saveInventoryTransfer(IInventoryTransfer bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterial> fetchMaterial(ICriteria criteria);

	/**
	 * 保存-物料
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterial> saveMaterial(IMaterial bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料组
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria);

	/**
	 * 保存-物料组
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria);

	/**
	 * 保存-仓库日记账
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventoryJournal> saveMaterialInventoryJournal(IMaterialInventoryJournal bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料价格清单
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialPriceList> fetchMaterialPriceList(ICriteria criteria);

	/**
	 * 保存-物料价格清单
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialPriceList> saveMaterialPriceList(IMaterialPriceList bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialBatch> fetchMaterialBatch(ICriteria criteria);

	/**
	 * 保存-物料批次
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialBatch> saveMaterialBatch(IMaterialBatch bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSerial> fetchMaterialSerial(ICriteria criteria);

	/**
	 * 保存-物料序列
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSerial> saveMaterialSerial(IMaterialSerial bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria);

	/**
	 * 保存-仓库
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料扩展（仓库库存，价格清单）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IProduct> fetchProduct(ICriteria criteria);

	/**
	 * 查询-物料价格
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialPrice> fetchMaterialPrice(ICriteria criteria);

	/**
	 * 查询-物料数量
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialQuantity> fetchMaterialQuantity(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库预估日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialEstimateJournal> fetchMaterialEstimateJournal(ICriteria criteria);

	/**
	 * 保存-仓库预估日记账
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialEstimateJournal> saveMaterialEstimateJournal(IMaterialEstimateJournal bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存盘点
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IInventoryCounting> fetchInventoryCounting(ICriteria criteria);

	/**
	 * 保存-库存盘点
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IInventoryCounting> saveInventoryCounting(IInventoryCounting bo);
	// --------------------------------------------------------------------------------------------//
}
