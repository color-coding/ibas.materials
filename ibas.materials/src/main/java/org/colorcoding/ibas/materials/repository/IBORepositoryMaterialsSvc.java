package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositorySmartService;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialEx;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialgroup.MaterialGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;

/**
 * Materials仓库服务
 */
public interface IBORepositoryMaterialsSvc extends IBORepositorySmartService {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存发货
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token);

	/**
	 * 保存-库存发货
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存收货
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token);

	/**
	 * 保存-库存收货
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token);

	/**
	 * 保存-库存转储
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Material> fetchMaterial(ICriteria criteria, String token);

	/**
	 * 保存-物料
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Material> saveMaterial(Material bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatch> fetchMaterialBatch(ICriteria criteria, String token);

	/**
	 * 保存-物料批次
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次日记账
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token);

	/**
	 * 保存-物料批次日记账
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatchJournal> saveMaterialBatchJournal(MaterialBatchJournal bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料组
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token);

	/**
	 * 保存-物料组
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token);

	/**
	 * 保存-物料库存
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventory> saveMaterialInventory(MaterialInventory bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库日记账
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria, String token);

	/**
	 * 保存-仓库日记账
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(MaterialInventoryJournal bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料价格清单
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialPriceList> fetchMaterialPriceList(ICriteria criteria, String token);

	/**
	 * 保存-物料价格清单
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列号
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token);

	/**
	 * 保存-物料序列号
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列号日记账
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token);

	/**
	 * 保存-物料序列号日记账
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerialJournal> saveMaterialSerialJournal(MaterialSerialJournal bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token);

	/**
	 * 保存-仓库
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料扩展（仓库库存-价格清单）
	 * @param criteria
	 * 				查询
	 * @param token
	 * 				口令
	 * @return
	 */
	OperationResult<MaterialEx> fetchMaterialEx(ICriteria criteria, String token);
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料价格清单（最终价）
	 * @param criteria
	 * 				查询
	 * @param token
	 * 				口令
	 * @return
	 */
	OperationResult<MaterialPriceList> fetchMaterialPriceListFinal(ICriteria criteria, String token);
	// --------------------------------------------------------------------------------------------//
}
