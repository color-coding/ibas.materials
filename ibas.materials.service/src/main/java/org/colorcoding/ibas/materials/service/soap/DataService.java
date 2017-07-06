package org.colorcoding.ibas.materials.service.soap;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
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
@WebService
@WebServicePath("data")
public class DataService extends BORepositoryMaterials {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存发货
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<GoodsIssue> fetchGoodsIssue(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchGoodsIssue(criteria, token);
    }

    /**
     * 保存-库存发货
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<GoodsIssue> saveGoodsIssue(@WebParam(name = "bo") GoodsIssue bo, @WebParam(name = "token") String token) {
        return super.saveGoodsIssue(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存收货
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<GoodsReceipt> fetchGoodsReceipt(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchGoodsReceipt(criteria, token);
    }

    /**
     * 保存-库存收货
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<GoodsReceipt> saveGoodsReceipt(@WebParam(name = "bo") GoodsReceipt bo, @WebParam(name = "token") String token) {
        return super.saveGoodsReceipt(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-库存转储
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<InventoryTransfer> fetchInventoryTransfer(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchInventoryTransfer(criteria, token);
    }

    /**
     * 保存-库存转储
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<InventoryTransfer> saveInventoryTransfer(@WebParam(name = "bo") InventoryTransfer bo, @WebParam(name = "token") String token) {
        return super.saveInventoryTransfer(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<Material> fetchMaterial(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchMaterial(criteria, token);
    }

    /**
     * 保存-物料
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<Material> saveMaterial(@WebParam(name = "bo") Material bo, @WebParam(name = "token") String token) {
        return super.saveMaterial(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料组
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<MaterialGroup> fetchMaterialGroup(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchMaterialGroup(criteria, token);
    }

    /**
     * 保存-物料组
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<MaterialGroup> saveMaterialGroup(@WebParam(name = "bo") MaterialGroup bo, @WebParam(name = "token") String token) {
        return super.saveMaterialGroup(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-物料库存
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<MaterialInventory> fetchMaterialInventory(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchMaterialInventory(criteria, token);
    }

    /**
     * 保存-物料库存
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<MaterialInventory> saveMaterialInventory(@WebParam(name = "bo") MaterialInventory bo, @WebParam(name = "token") String token) {
        return super.saveMaterialInventory(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库日记账
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<MaterialJournal> fetchMaterialJournal(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchMaterialJournal(criteria, token);
    }

    /**
     * 保存-仓库日记账
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<MaterialJournal> saveMaterialJournal(@WebParam(name = "bo") MaterialJournal bo, @WebParam(name = "token") String token) {
        return super.saveMaterialJournal(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-仓库
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<Warehouse> fetchWarehouse(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchWarehouse(criteria, token);
    }

    /**
     * 保存-仓库
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<Warehouse> saveWarehouse(@WebParam(name = "bo") Warehouse bo, @WebParam(name = "token") String token) {
        return super.saveWarehouse(bo, token);
    }

    //--------------------------------------------------------------------------------------------//

}
