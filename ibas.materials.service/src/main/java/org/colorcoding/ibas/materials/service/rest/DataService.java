package org.colorcoding.ibas.materials.service.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.materials.repository.*;
import org.colorcoding.ibas.materials.bo.goodsissue.*;
import org.colorcoding.ibas.materials.bo.goodsreceipt.*;
import org.colorcoding.ibas.materials.bo.inventorytransfer.*;
import org.colorcoding.ibas.materials.bo.material.*;
import org.colorcoding.ibas.materials.bo.materialgroup.*;
import org.colorcoding.ibas.materials.bo.materialinventory.*;
import org.colorcoding.ibas.materials.bo.materialjournal.*;
import org.colorcoding.ibas.materials.bo.warehouse.*;

/**
* Materials 数据服务JSON
*/
@Path("data")
public class DataService extends BORepositoryMaterials {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存交易-发货
     * @param criteria 查询
     * @param token 口令
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
     * 保存-库存交易-发货
     * @param bo 对象实例
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

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存收货
     * @param criteria 查询
     * @param token 口令
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
     * @param bo 对象实例
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

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存转储
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchInventoryTransfer")
    public OperationResult<InventoryTransfer> fetchInventoryTransfer(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchInventoryTransfer(criteria, token);
    }

    /**
     * 保存-库存转储
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveInventoryTransfer")
    public OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, @QueryParam("token") String token) {
        return super.saveInventoryTransfer(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料
     * @param criteria 查询
     * @param token 口令
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
     * @param bo 对象实例
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

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料组
     * @param criteria 查询
     * @param token 口令
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
     * @param bo 对象实例
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

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料库存
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchMaterialInventory")
    public OperationResult<MaterialInventory> fetchMaterialInventory(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchMaterialInventory(criteria, token);
    }

    /**
     * 保存-物料库存
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveMaterialInventory")
    public OperationResult<MaterialInventory> saveMaterialInventory(MaterialInventory bo, @QueryParam("token") String token) {
        return super.saveMaterialInventory(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库日记账
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchMaterialJournal")
    public OperationResult<MaterialJournal> fetchMaterialJournal(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchMaterialJournal(criteria, token);
    }

    /**
     * 保存-仓库日记账
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveMaterialJournal")
    public OperationResult<MaterialJournal> saveMaterialJournal(MaterialJournal bo, @QueryParam("token") String token) {
        return super.saveMaterialJournal(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库
     * @param criteria 查询
     * @param token 口令
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
     * @param bo 对象实例
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

    //--------------------------------------------------------------------------------------------//

}
