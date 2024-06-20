package org.colorcoding.ibas.materials.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorycounting.InventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.InventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialGroup;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.MaterialSubstitute;
import org.colorcoding.ibas.materials.bo.material.MaterialVersion;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialSpecialPrice;
import org.colorcoding.ibas.materials.bo.materialscrap.MaterialScrap;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialspecification.MaterialSpecification;
import org.colorcoding.ibas.materials.bo.picklists.PickLists;
import org.colorcoding.ibas.materials.bo.specification.Specification;
import org.colorcoding.ibas.materials.bo.specification.SpecificationTree;
import org.colorcoding.ibas.materials.bo.unit.Unit;
import org.colorcoding.ibas.materials.bo.unit.UnitRate;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.MaterialInventoryTransfer;
import org.colorcoding.ibas.materials.data.MaterialNumberChange;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * Materials 数据服务JSON
 */
@Path("data")
public class DataService extends BORepositoryMaterials {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存发货
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchGoodsIssue")
	public OperationResult<GoodsIssue> fetchGoodsIssue(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchGoodsIssue(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-库存发货
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveGoodsIssue")
	public OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveGoodsIssue(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存收货
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchGoodsReceipt")
	public OperationResult<GoodsReceipt> fetchGoodsReceipt(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchGoodsReceipt(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-库存收货
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveGoodsReceipt")
	public OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveGoodsReceipt(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchInventoryTransfer")
	public OperationResult<InventoryTransfer> fetchInventoryTransfer(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchInventoryTransfer(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-库存转储
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveInventoryTransfer")
	public OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveInventoryTransfer(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterial")
	public OperationResult<Material> fetchMaterial(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterial(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterial")
	public OperationResult<Material> saveMaterial(Material bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveMaterial(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialBatch")
	public OperationResult<MaterialBatch> fetchMaterialBatch(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialBatch(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料批次
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialBatch")
	public OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialBatch(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialBatchJournal")
	public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialBatchJournal(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料组
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialGroup")
	public OperationResult<MaterialGroup> fetchMaterialGroup(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialGroup(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料组
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialGroup")
	public OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialGroup(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialInventory")
	public OperationResult<MaterialInventory> fetchMaterialInventory(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialInventory(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialInventoryJournal")
	public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialInventoryJournal(criteria, MyConfiguration.optToken(authorization, token));
	} // --------------------------------------------------------------------------------------------//

	/**
	 * 查询-仓库预估日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialEstimateJournal")
	public OperationResult<MaterialEstimateJournal> fetchMaterialEstimateJournal(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialEstimateJournal(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料价格清单
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialPriceList")
	public OperationResult<MaterialPriceList> fetchMaterialPriceList(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialPriceList(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料价格清单
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialPriceList")
	public OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialPriceList(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSerial")
	public OperationResult<MaterialSerial> fetchMaterialSerial(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialSerial(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料序列
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialSerial")
	public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialSerial(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSerialJournal")
	public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialSerialJournal(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchWarehouse")
	public OperationResult<Warehouse> fetchWarehouse(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchWarehouse(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-仓库
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveWarehouse")
	public OperationResult<Warehouse> saveWarehouse(Warehouse bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveWarehouse(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-产品（物料）（数量、价格）
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchProduct")
	public OperationResult<Product> fetchProduct(Criteria criteria, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.fetchProduct(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 查询-产品（物料）库存
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchProductInventory")
	public OperationResult<Product> fetchProductInventory(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchProductInventory(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 查询-物料数量
	 *
	 * @param criteria 查询（支持的查询条件，仅为ItemCode，ItemName，WhsCode）
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialQuantity")
	public OperationResult<MaterialQuantity> fetchMaterialQuantity(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialQuantity(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 查询-物料价格
	 *
	 * @param criteria 查询（支持的查询条件，仅为ItemCode，ItemName，PriceList）
	 * @param token    口令
	 * @return 物料价格
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialPrice")
	public OperationResult<MaterialPrice> fetchMaterialPrice(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialPrice(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchInventoryCounting")
	public OperationResult<InventoryCounting> fetchInventoryCounting(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchInventoryCounting(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-库存盘点
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveInventoryCounting")
	public OperationResult<InventoryCounting> saveInventoryCounting(InventoryCounting bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveInventoryCounting(bo, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 结算-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("closeInventoryCounting")
	public OperationResult<String> closeInventoryCounting(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.closeInventoryCounting(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-产品规格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSpecification")
	public OperationResult<MaterialSpecification> fetchMaterialSpecification(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialSpecification(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-产品规格
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialSpecification")
	public OperationResult<MaterialSpecification> saveMaterialSpecification(MaterialSpecification bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialSpecification(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-规格模板
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchSpecification")
	public OperationResult<Specification> fetchSpecification(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchSpecification(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-规格模板
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveSpecification")
	public OperationResult<Specification> saveSpecification(Specification bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveSpecification(bo, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 查询-规格树
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchSpecificationTree")
	public OperationResult<SpecificationTree> fetchSpecificationTree(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchSpecificationTree(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-计量单位
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUnit")
	public OperationResult<Unit> fetchUnit(Criteria criteria, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.fetchUnit(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-计量单位
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUnit")
	public OperationResult<Unit> saveUnit(Unit bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveUnit(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-计量单位换算率
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUnitRate")
	public OperationResult<UnitRate> fetchUnitRate(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchUnitRate(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-计量单位换算率
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUnitRate")
	public OperationResult<UnitRate> saveUnitRate(UnitRate bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveUnitRate(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料版本
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialVersion")
	public OperationResult<MaterialVersion> fetchMaterialVersion(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialVersion(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料版本
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialVersion")
	public OperationResult<MaterialVersion> saveMaterialVersion(MaterialVersion bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialVersion(bo, MyConfiguration.optToken(authorization, token));
	} // --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料废品率
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialScrap")
	public OperationResult<MaterialScrap> fetchMaterialScrap(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialScrap(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料废品率
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialScrap")
	public OperationResult<MaterialScrap> saveMaterialScrap(MaterialScrap bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialScrap(bo, MyConfiguration.optToken(authorization, token));
	} // --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料库存预留
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialInventoryReservation")
	public OperationResult<MaterialInventoryReservation> fetchMaterialInventoryReservation(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialInventoryReservation(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料库存预留
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialInventoryReservation")
	public OperationResult<MaterialInventoryReservation> saveMaterialInventoryReservation(
			MaterialInventoryReservation bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.saveMaterialInventoryReservation(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料替代
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSubstitute")
	public OperationResult<MaterialSubstitute> fetchMaterialSubstitute(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialSubstitute(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料替代
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialSubstitute")
	public OperationResult<MaterialSubstitute> saveMaterialSubstitute(MaterialSubstitute bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialSubstitute(bo, MyConfiguration.optToken(authorization, token));
	} // --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料订购预留
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialOrderedReservation")
	public OperationResult<MaterialOrderedReservation> fetchMaterialOrderedReservation(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialOrderedReservation(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料订购预留
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialOrderedReservation")
	public OperationResult<MaterialOrderedReservation> saveMaterialOrderedReservation(MaterialOrderedReservation bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialOrderedReservation(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-拣配清单
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchPickLists")
	public OperationResult<PickLists> fetchPickLists(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchPickLists(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-拣配清单
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("savePickLists")
	public OperationResult<PickLists> savePickLists(PickLists bo, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.savePickLists(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("changeMaterialNumbers")
	public OperationResult<Object> changeMaterialNumbers(MaterialNumberChange changes,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.changeMaterialNumbers(changes, MyConfiguration.optToken(authorization, token));
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("transferMaterialInventories")
	public OperationResult<Object> transferMaterialInventories(MaterialInventoryTransfer transfers,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.transferMaterialInventories(transfers, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储请求
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchInventoryTransferRequest")
	public OperationResult<InventoryTransferRequest> fetchInventoryTransferRequest(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchInventoryTransferRequest(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-库存转储请求
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveInventoryTransferRequest")
	public OperationResult<InventoryTransferRequest> saveInventoryTransferRequest(InventoryTransferRequest bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveInventoryTransferRequest(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料特殊价格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSpecialPrice")
	public OperationResult<MaterialSpecialPrice> fetchMaterialSpecialPrice(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchMaterialSpecialPrice(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-物料特殊价格
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveMaterialSpecialPrice")
	public OperationResult<MaterialSpecialPrice> saveMaterialSpecialPrice(MaterialSpecialPrice bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveMaterialSpecialPrice(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
}
