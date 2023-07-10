package org.colorcoding.ibas.materials.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorycounting.InventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialGroup;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.MaterialSubstitute;
import org.colorcoding.ibas.materials.bo.material.MaterialVersion;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialscrap.MaterialScrap;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialspecification.MaterialSpecification;
import org.colorcoding.ibas.materials.bo.specification.Specification;
import org.colorcoding.ibas.materials.bo.specification.SpecificationTree;
import org.colorcoding.ibas.materials.bo.unit.Unit;
import org.colorcoding.ibas.materials.bo.unit.UnitRate;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
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
	public OperationResult<GoodsIssue> fetchGoodsIssue(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchGoodsIssue(criteria, token);
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
	public OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchGoodsReceipt")
	public OperationResult<GoodsReceipt> fetchGoodsReceipt(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchGoodsReceipt(criteria, token);
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
	public OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchInventoryTransfer")
	public OperationResult<InventoryTransfer> fetchInventoryTransfer(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchInventoryTransfer(criteria, token);
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
			@QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterial")
	public OperationResult<Material> fetchMaterial(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchMaterial(criteria, token);
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
	public OperationResult<Material> saveMaterial(Material bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialBatch")
	public OperationResult<MaterialBatch> fetchMaterialBatch(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchMaterialBatch(criteria, token);
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
	public OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialBatchJournal")
	public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(Criteria criteria,
			@QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialGroup")
	public OperationResult<MaterialGroup> fetchMaterialGroup(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchMaterialGroup(criteria, token);
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
	public OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialInventory")
	public OperationResult<MaterialInventory> fetchMaterialInventory(Criteria criteria,
			@QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialInventoryJournal")
	public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(Criteria criteria,
			@QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialPriceList")
	public OperationResult<MaterialPriceList> fetchMaterialPriceList(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchMaterialPriceList(criteria, token);
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
			@QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSerial")
	public OperationResult<MaterialSerial> fetchMaterialSerial(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchMaterialSerial(criteria, token);
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
	public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchMaterialSerialJournal")
	public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(Criteria criteria,
			@QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchWarehouse")
	public OperationResult<Warehouse> fetchWarehouse(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchWarehouse(criteria, token);
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
	public OperationResult<Warehouse> saveWarehouse(Warehouse bo, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchProduct")
	public OperationResult<Product> fetchProduct(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchProduct(criteria, token);
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
			@QueryParam("token") String token) {
		return super.fetchMaterialQuantity(criteria, token);
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
	public OperationResult<MaterialPrice> fetchMaterialPrice(Criteria criteria, @QueryParam("token") String token) {
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchInventoryCounting")
	public OperationResult<InventoryCounting> fetchInventoryCounting(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchInventoryCounting(criteria, token);
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
			@QueryParam("token") String token) {
		return super.saveInventoryCounting(bo, token);
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
	public OperationResult<String> closeInventoryCounting(Criteria criteria, @QueryParam("token") String token) {
		return super.closeInventoryCounting(criteria, token);
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
			@QueryParam("token") String token) {
		return super.fetchMaterialSpecification(criteria, token);
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
			@QueryParam("token") String token) {
		return super.saveMaterialSpecification(bo, token);
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
	public OperationResult<Specification> fetchSpecification(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchSpecification(criteria, token);
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
	public OperationResult<Specification> saveSpecification(Specification bo, @QueryParam("token") String token) {
		return super.saveSpecification(bo, token);
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
			@QueryParam("token") String token) {
		return super.fetchSpecificationTree(criteria, token);
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
	public OperationResult<Unit> fetchUnit(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchUnit(criteria, token);
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
	public OperationResult<Unit> saveUnit(Unit bo, @QueryParam("token") String token) {
		return super.saveUnit(bo, token);
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
	public OperationResult<UnitRate> fetchUnitRate(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchUnitRate(criteria, token);
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
	public OperationResult<UnitRate> saveUnitRate(UnitRate bo, @QueryParam("token") String token) {
		return super.saveUnitRate(bo, token);
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
	public OperationResult<MaterialVersion> fetchMaterialVersion(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchMaterialVersion(criteria, token);
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
	public OperationResult<MaterialVersion> saveMaterialVersion(MaterialVersion bo, @QueryParam("token") String token) {
		return super.saveMaterialVersion(bo, token);
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
	public OperationResult<MaterialScrap> fetchMaterialScrap(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchMaterialScrap(criteria, token);
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
	public OperationResult<MaterialScrap> saveMaterialScrap(MaterialScrap bo, @QueryParam("token") String token) {
		return super.saveMaterialScrap(bo, token);
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
			@QueryParam("token") String token) {
		return super.fetchMaterialInventoryReservation(criteria, token);
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
			MaterialInventoryReservation bo, @QueryParam("token") String token) {
		return super.saveMaterialInventoryReservation(bo, token);
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
			@QueryParam("token") String token) {
		return super.fetchMaterialSubstitute(criteria, token);
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
			@QueryParam("token") String token) {
		return super.saveMaterialSubstitute(bo, token);
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
			@QueryParam("token") String token) {
		return super.fetchMaterialOrderedReservation(criteria, token);
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
			@QueryParam("token") String token) {
		return super.saveMaterialOrderedReservation(bo, token);
	}
	// --------------------------------------------------------------------------------------------//

}
