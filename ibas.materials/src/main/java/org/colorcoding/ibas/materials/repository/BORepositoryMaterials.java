package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialgroup.IMaterialGroup;
import org.colorcoding.ibas.materials.bo.materialgroup.MaterialGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;

/**
 * Materials仓库
 */
public class BORepositoryMaterials extends BORepositoryServiceApplication
		implements IBORepositoryMaterialsSvc, IBORepositoryMaterialsApp {

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
	public OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token) {
		return super.fetch(criteria, token, GoodsIssue.class);
	}

	/**
	 * 查询-库存发货（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria) {
		return new OperationResult<IGoodsIssue>(this.fetchGoodsIssue(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存发货
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存发货（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo) {
		return new OperationResult<IGoodsIssue>(this.saveGoodsIssue((GoodsIssue) bo, this.getUserToken()));
	}

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
	public OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token) {
		return super.fetch(criteria, token, GoodsReceipt.class);
	}

	/**
	 * 查询-库存收货（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria) {
		return new OperationResult<IGoodsReceipt>(this.fetchGoodsReceipt(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存收货
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存收货（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo) {
		return new OperationResult<IGoodsReceipt>(this.saveGoodsReceipt((GoodsReceipt) bo, this.getUserToken()));
	}

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
	public OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token) {
		return super.fetch(criteria, token, InventoryTransfer.class);
	}

	/**
	 * 查询-库存转储（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria) {
		return new OperationResult<IInventoryTransfer>(this.fetchInventoryTransfer(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存转储
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存转储（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryTransfer> saveInventoryTransfer(IInventoryTransfer bo) {
		return new OperationResult<IInventoryTransfer>(
				this.saveInventoryTransfer((InventoryTransfer) bo, this.getUserToken()));
	}

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
	public OperationResult<Material> fetchMaterial(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Material.class);
	}

	/**
	 * 查询-物料（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterial> fetchMaterial(ICriteria criteria) {
		return new OperationResult<IMaterial>(this.fetchMaterial(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Material> saveMaterial(Material bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterial> saveMaterial(IMaterial bo) {
		return new OperationResult<IMaterial>(this.saveMaterial((Material) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialGroup.class);
	}

	/**
	 * 查询-物料组（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria) {
		return new OperationResult<IMaterialGroup>(this.fetchMaterialGroup(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料组
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料组（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo) {
		return new OperationResult<IMaterialGroup>(this.saveMaterialGroup((MaterialGroup) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialInventory.class);
	}

	/**
	 * 查询-物料库存（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria) {
		return new OperationResult<IMaterialInventory>(this.fetchMaterialInventory(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料库存
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventory> saveMaterialInventory(MaterialInventory bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料库存（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventory> saveMaterialInventory(IMaterialInventory bo) {
		return new OperationResult<IMaterialInventory>(
				this.saveMaterialInventory((MaterialInventory) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialInventoryJournal.class);
	}

	/**
	 * 查询-仓库日记账（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria) {
		return new OperationResult<IMaterialInventoryJournal>(
				this.fetchMaterialInventoryJournal(criteria, this.getUserToken()));
	}

	/**
	 * 保存-仓库日记账
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(MaterialInventoryJournal bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-仓库日记账（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventoryJournal> saveMaterialInventoryJournal(IMaterialInventoryJournal bo) {
		return new OperationResult<IMaterialInventoryJournal>(
				this.saveMaterialInventoryJournal((MaterialInventoryJournal) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialPriceList> fetchMaterialPriceList(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialPriceList.class);
	}

	/**
	 * 查询-物料价格清单（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialPriceList> fetchMaterialPriceList(ICriteria criteria) {
		return new OperationResult<IMaterialPriceList>(this.fetchMaterialPriceList(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料价格清单
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料价格清单（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialPriceList> saveMaterialPriceList(IMaterialPriceList bo) {
		return new OperationResult<IMaterialPriceList>(
				this.saveMaterialPriceList((MaterialPriceList) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialBatch> fetchMaterialBatch(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialBatch.class);
	}

	/**
	 * 查询-物料批次（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialBatch> fetchMaterialBatch(ICriteria criteria) {
		return new OperationResult<IMaterialBatch>(this.fetchMaterialBatch(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料批次
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料批次（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialBatch> saveMaterialBatch(IMaterialBatch bo) {
		return new OperationResult<IMaterialBatch>(this.saveMaterialBatch((MaterialBatch) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialBatchJournal.class);
	}

	/**
	 * 查询-物料批次日记账（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria) {
		return new OperationResult<IMaterialBatchJournal>(
				this.fetchMaterialBatchJournal(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料批次日记账
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialBatchJournal> saveMaterialBatchJournal(MaterialBatchJournal bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料批次日记账（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialBatchJournal> saveMaterialBatchJournal(IMaterialBatchJournal bo) {
		return new OperationResult<IMaterialBatchJournal>(
				this.saveMaterialBatchJournal((MaterialBatchJournal) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSerial.class);
	}

	/**
	 * 查询-物料序列号（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSerial> fetchMaterialSerial(ICriteria criteria) {
		return new OperationResult<IMaterialSerial>(this.fetchMaterialSerial(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料序列号
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料序列号（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSerial> saveMaterialSerial(IMaterialSerial bo) {
		return new OperationResult<IMaterialSerial>(this.saveMaterialSerial((MaterialSerial) bo, this.getUserToken()));
	}

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
	public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSerialJournal.class);
	}

	/**
	 * 查询-物料序列号日记账（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria) {
		return new OperationResult<IMaterialSerialJournal>(
				this.fetchMaterialSerialJournal(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料序列号日记账
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSerialJournal> saveMaterialSerialJournal(MaterialSerialJournal bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料序列号日记账（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSerialJournal> saveMaterialSerialJournal(IMaterialSerialJournal bo) {
		return new OperationResult<IMaterialSerialJournal>(
				this.saveMaterialSerialJournal((MaterialSerialJournal) bo, this.getUserToken()));
	}

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
	public OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Warehouse.class);
	}

	/**
	 * 查询-仓库（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria) {
		return new OperationResult<IWarehouse>(this.fetchWarehouse(criteria, this.getUserToken()));
	}

	/**
	 * 保存-仓库
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-仓库（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo) {
		return new OperationResult<IWarehouse>(this.saveWarehouse((Warehouse) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

}
