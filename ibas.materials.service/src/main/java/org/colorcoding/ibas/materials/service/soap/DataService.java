package org.colorcoding.ibas.materials.service.soap;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialgroup.MaterialGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 * Materials 数据服务JSON
 */
@WebService
@WebServicePath("data")
public class DataService extends BORepositoryMaterials {

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
	@WebMethod
	public OperationResult<GoodsIssue> fetchGoodsIssue(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchGoodsIssue(criteria, token);
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
	@WebMethod
	public OperationResult<GoodsIssue> saveGoodsIssue(@WebParam(name = "bo") GoodsIssue bo,
			@WebParam(name = "token") String token) {
		return super.saveGoodsIssue(bo, token);
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
	@WebMethod
	public OperationResult<GoodsReceipt> fetchGoodsReceipt(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchGoodsReceipt(criteria, token);
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
	@WebMethod
	public OperationResult<GoodsReceipt> saveGoodsReceipt(@WebParam(name = "bo") GoodsReceipt bo,
			@WebParam(name = "token") String token) {
		return super.saveGoodsReceipt(bo, token);
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
	@WebMethod
	public OperationResult<InventoryTransfer> fetchInventoryTransfer(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchInventoryTransfer(criteria, token);
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
	@WebMethod
	public OperationResult<InventoryTransfer> saveInventoryTransfer(@WebParam(name = "bo") InventoryTransfer bo,
			@WebParam(name = "token") String token) {
		return super.saveInventoryTransfer(bo, token);
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
	@WebMethod
	public OperationResult<Material> fetchMaterial(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterial(criteria, token);
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
	@WebMethod
	public OperationResult<Material> saveMaterial(@WebParam(name = "bo") Material bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterial(bo, token);
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
	@WebMethod
	public OperationResult<MaterialBatch> fetchMaterialBatch(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialBatch(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialBatch> saveMaterialBatch(@WebParam(name = "bo") MaterialBatch bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialBatch(bo, token);
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
	@WebMethod
	public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchMaterialBatchJournal(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialBatchJournal> saveMaterialBatchJournal(
			@WebParam(name = "bo") MaterialBatchJournal bo, @WebParam(name = "token") String token) {
		return super.saveMaterialBatchJournal(bo, token);
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
	@WebMethod
	public OperationResult<MaterialGroup> fetchMaterialGroup(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialGroup(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialGroup> saveMaterialGroup(@WebParam(name = "bo") MaterialGroup bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialGroup(bo, token);
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
	@WebMethod
	public OperationResult<MaterialInventory> fetchMaterialInventory(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialInventory(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialInventory> saveMaterialInventory(@WebParam(name = "bo") MaterialInventory bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialInventory(bo, token);
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
	@WebMethod
	public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchMaterialInventoryJournal(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(
			@WebParam(name = "bo") MaterialInventoryJournal bo, @WebParam(name = "token") String token) {
		return super.saveMaterialInventoryJournal(bo, token);
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
	@WebMethod
	public OperationResult<MaterialPriceList> fetchMaterialPriceList(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialPriceList(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialPriceList> saveMaterialPriceList(@WebParam(name = "bo") MaterialPriceList bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialPriceList(bo, token);
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
	@WebMethod
	public OperationResult<MaterialSerial> fetchMaterialSerial(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialSerial(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialSerial> saveMaterialSerial(@WebParam(name = "bo") MaterialSerial bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialSerial(bo, token);
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
	@WebMethod
	public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchMaterialSerialJournal(criteria, token);
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
	@WebMethod
	public OperationResult<MaterialSerialJournal> saveMaterialSerialJournal(
			@WebParam(name = "bo") MaterialSerialJournal bo, @WebParam(name = "token") String token) {
		return super.saveMaterialSerialJournal(bo, token);
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
	@WebMethod
	public OperationResult<Warehouse> fetchWarehouse(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchWarehouse(criteria, token);
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
	@WebMethod
	public OperationResult<Warehouse> saveWarehouse(@WebParam(name = "bo") Warehouse bo,
			@WebParam(name = "token") String token) {
		return super.saveWarehouse(bo, token);
	}
	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料扩展（仓库库存、单价）
	 *
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<Product> fetchProduct(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchProduct(criteria, token);
	}
	// --------------------------------------------------------------------------------------------//

}
