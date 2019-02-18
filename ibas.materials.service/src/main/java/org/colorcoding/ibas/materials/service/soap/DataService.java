package org.colorcoding.ibas.materials.service.soap;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorycounting.InventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialGroup;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchMaterialBatchJournal(criteria, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料组
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialInventory> fetchMaterialInventory(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialInventory(criteria, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchMaterialInventoryJournal(criteria, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料价格清单
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialPriceList> saveMaterialPriceList(@WebParam(name = "bo") MaterialPriceList bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialPriceList(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialSerial> fetchMaterialSerial(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialSerial(criteria, token);
	}

	/**
	 * 保存-物料序列
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialSerial> saveMaterialSerial(@WebParam(name = "bo") MaterialSerial bo,
			@WebParam(name = "token") String token) {
		return super.saveMaterialSerial(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(
			@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
		return super.fetchMaterialSerialJournal(criteria, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<Warehouse> saveWarehouse(@WebParam(name = "bo") Warehouse bo,
			@WebParam(name = "token") String token) {
		return super.saveWarehouse(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-产品（物料）（数量、价格）
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<Product> fetchProduct(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchProduct(criteria, token);
	}

	/**
	 * 查询-物料数量
	 *
	 * @param criteria 查询（支持的查询条件，仅为ItemCode，ItemName，WhsCode）
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<MaterialQuantity> fetchMaterialQuantity(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialQuantity(criteria, token);
	}

	/**
	 * 查询-物料价格
	 *
	 * @param criteria 查询（支持的查询条件，仅为ItemCode，ItemName，PriceList）
	 * @param token    口令
	 * @return 物料价格
	 */
	@WebMethod
	public OperationResult<MaterialPrice> fetchMaterialPrice(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchMaterialPrice(criteria, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<InventoryCounting> fetchInventoryCounting(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchInventoryCounting(criteria, token);
	}

	/**
	 * 保存-库存盘点
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<InventoryCounting> saveInventoryCounting(@WebParam(name = "bo") InventoryCounting bo,
			@WebParam(name = "token") String token) {
		return super.saveInventoryCounting(bo, token);
	}

	// --------------------------------------------------------------------------------------------//

}
