package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.logics.BusinessLogicException;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IMaterialEx;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialEx;
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
import org.colorcoding.ibas.materials.bo.materialpricelist.*;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Materials仓库
 */
public class BORepositoryMaterials extends BORepositoryServiceApplication
        implements IBORepositoryMaterialsSvc, IBORepositoryMaterialsApp {

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-库存发货
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token) {
        return super.fetch(criteria, token, GoodsIssue.class);
    }

    /**
     * 查询-库存发货（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria) {
        return new OperationResult<IGoodsIssue>(this.fetchGoodsIssue(criteria, this.getUserToken()));
    }

    /**
     * 保存-库存发货
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-库存发货（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo) {
        return new OperationResult<IGoodsIssue>(this.saveGoodsIssue((GoodsIssue) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-库存收货
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token) {
        return super.fetch(criteria, token, GoodsReceipt.class);
    }

    /**
     * 查询-库存收货（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria) {
        return new OperationResult<IGoodsReceipt>(this.fetchGoodsReceipt(criteria, this.getUserToken()));
    }

    /**
     * 保存-库存收货
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-库存收货（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo) {
        return new OperationResult<IGoodsReceipt>(this.saveGoodsReceipt((GoodsReceipt) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-库存转储
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token) {
        return super.fetch(criteria, token, InventoryTransfer.class);
    }

    /**
     * 查询-库存转储（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria) {
        return new OperationResult<IInventoryTransfer>(this.fetchInventoryTransfer(criteria, this.getUserToken()));
    }

    /**
     * 保存-库存转储
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-库存转储（提前设置用户口令）
     *
     * @param bo 对象实例
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
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<Material> fetchMaterial(ICriteria criteria, String token) {
        return super.fetch(criteria, token, Material.class);
    }

    /**
     * 查询-物料（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterial> fetchMaterial(ICriteria criteria) {
        return new OperationResult<IMaterial>(this.fetchMaterial(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<Material> saveMaterial(Material bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IMaterial> saveMaterial(IMaterial bo) {
        return new OperationResult<IMaterial>(this.saveMaterial((Material) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料组
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialGroup.class);
    }

    /**
     * 查询-物料组（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria) {
        return new OperationResult<IMaterialGroup>(this.fetchMaterialGroup(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料组
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料组（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo) {
        return new OperationResult<IMaterialGroup>(this.saveMaterialGroup((MaterialGroup) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料库存
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialInventory.class);
    }

    /**
     * 查询-物料库存（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria) {
        return new OperationResult<IMaterialInventory>(this.fetchMaterialInventory(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料库存
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialInventory> saveMaterialInventory(MaterialInventory bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料库存（提前设置用户口令）
     *
     * @param bo 对象实例
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
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialInventoryJournal.class);
    }

    /**
     * 查询-仓库日记账（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria) {
        return new OperationResult<IMaterialInventoryJournal>(
                this.fetchMaterialInventoryJournal(criteria, this.getUserToken()));
    }

    /**
     * 保存-仓库日记账
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(MaterialInventoryJournal bo,
                                                                                  String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-仓库日记账（提前设置用户口令）
     *
     * @param bo 对象实例
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
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialPriceList> fetchMaterialPriceList(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialPriceList.class);
    }

    /**
     * 查询-物料价格清单（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialPriceList> fetchMaterialPriceList(ICriteria criteria) {
        return new OperationResult<IMaterialPriceList>(this.fetchMaterialPriceList(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料价格清单
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料价格清单（提前设置用户口令）
     *
     * @param bo 对象实例
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
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialBatch> fetchMaterialBatch(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialBatch.class);
    }

    /**
     * 查询-物料批次（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialBatch> fetchMaterialBatch(ICriteria criteria) {
        return new OperationResult<IMaterialBatch>(this.fetchMaterialBatch(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料批次
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料批次（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IMaterialBatch> saveMaterialBatch(IMaterialBatch bo) {
        return new OperationResult<IMaterialBatch>(this.saveMaterialBatch((MaterialBatch) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料批次日记账
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialBatchJournal.class);
    }

    /**
     * 查询-物料批次日记账（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria) {
        return new OperationResult<IMaterialBatchJournal>(
                this.fetchMaterialBatchJournal(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料批次日记账
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialBatchJournal> saveMaterialBatchJournal(MaterialBatchJournal bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料批次日记账（提前设置用户口令）
     *
     * @param bo 对象实例
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
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialSerial.class);
    }

    /**
     * 查询-物料序列号（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialSerial> fetchMaterialSerial(ICriteria criteria) {
        return new OperationResult<IMaterialSerial>(this.fetchMaterialSerial(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料序列号
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料序列号（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IMaterialSerial> saveMaterialSerial(IMaterialSerial bo) {
        return new OperationResult<IMaterialSerial>(this.saveMaterialSerial((MaterialSerial) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料序列号日记账
     *
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialSerialJournal.class);
    }

    /**
     * 查询-物料序列号日记账（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IMaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria) {
        return new OperationResult<IMaterialSerialJournal>(
                this.fetchMaterialSerialJournal(criteria, this.getUserToken()));
    }

    /**
     * 保存-物料序列号日记账
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<MaterialSerialJournal> saveMaterialSerialJournal(MaterialSerialJournal bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料序列号日记账（提前设置用户口令）
     *
     * @param bo 对象实例
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
     * @param criteria 查询
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token) {
        return super.fetch(criteria, token, Warehouse.class);
    }

    /**
     * 查询-仓库（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria) {
        return new OperationResult<IWarehouse>(this.fetchWarehouse(criteria, this.getUserToken()));
    }

    /**
     * 保存-仓库
     *
     * @param bo    对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token) {
        return super.save(bo, token);
    }


    /**
     * 保存-仓库（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo) {
        return new OperationResult<IWarehouse>(this.saveWarehouse((Warehouse) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//


    /**
     * 查询-物料扩展（仓库库存，价格清单）
     *
     * @param criteria 对象实例
     * @param token    口令
     * @return 操作结果
     */
    public OperationResult<MaterialEx> fetchMaterialEx(ICriteria criteria, String token) {
        //check the conditions of criteria,filter it if it contains warehouseCode or priceListName
        //1: search the material
        //2: search the inventory
        //3: search the pricelist
        OperationResult<MaterialEx> operationResultMaterialExpand = new OperationResult<MaterialEx>();
        OperationResult<?> operationResult = null;
        ArrayList<Material> materials = new ArrayList<Material>();
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        Criteria criMaterial = new Criteria();
        Criteria criInventory = new Criteria();
        Criteria criPriceList = new Criteria();
        ICondition condition;
        if (criteria != null) {
            //region check the conditions
            for (ICondition con : criteria.getConditions()
                    ) {
                if (con.getAlias().equalsIgnoreCase(Material.PROPERTY_CODE.getName())) {
                    condition = criInventory.getConditions().create();
                    condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());

                    condition = criPriceList.getChildCriterias().create().getConditions().create();
                    condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());

                    condition = criMaterial.getConditions().create();
                    condition.setAlias(Material.PROPERTY_CODE.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());
                    continue;
                }
                if (con.getAlias().equalsIgnoreCase(MaterialInventory.PROPERTY_WAREHOUSE.getName())) {
                    condition = criInventory.getConditions().create();
                    condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());
                    continue;
                }
                if (con.getAlias().equalsIgnoreCase(MaterialPriceList.PROPERTY_NAME.getName())) {
                    condition = criPriceList.getConditions().create();
                    condition.setAlias(MaterialPriceList.PROPERTY_NAME.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());
                    continue;
                } else {
                    condition = criMaterial.getConditions().create();
                    condition = con;
                }
            }
            //endregion
        }
        try {
            //region search the material and create MaterialEx object.
            operationResult = this.fetchMaterial(criteria, token);
            if (operationResult.getResultCode() == 0) {
                materials = (ArrayList<Material>) operationResult.getResultObjects();
            } else {
                return (OperationResult<MaterialEx>) operationResult;
            }
            materialExs = MaterialEx.create(materials);
            //endregion
            // region search the inventory by warehouse.
            operationResultMaterialExpand.setResultObjects(materialExs);
            operationResult = this.fetchMaterialInventoryOfMaterialEx(operationResultMaterialExpand, criInventory, token);
            if (operationResult.getError() != null) {
                throw new BusinessLogicException(operationResult.getError());
            }
            if (operationResult.getResultCode() != 0) {
                throw new BusinessLogicException(operationResult.getError());
            }
            materialExs = (ArrayList<MaterialEx>) operationResult.getResultObjects();
            //endregion..
            //region search the price list by price list name.
            operationResultMaterialExpand.setResultObjects(materialExs);
            operationResult = this.fetchMaterialPriceListOfMaterialEx(operationResultMaterialExpand, criPriceList, token);
            if (operationResult.getError() != null) {
                throw new BusinessLogicException(operationResult.getError());
            }
            if (operationResult.getResultCode() != 0) {
                throw new BusinessLogicException(operationResult.getError());
            }
            //endregion

        } catch (Exception e) {
            operationResultMaterialExpand.setError(e);
        }
        return operationResultMaterialExpand;
    }

    @Override
    public IOperationResult<IMaterialEx> fetchMaterialEx(ICriteria criteria) {
        return new OperationResult<IMaterialEx>(this.fetchMaterialEx(criteria, this.getUserToken()));
    }

    /**
     * 查询物料扩展（包含物料和仓库库存）
     *
     * @param operationResult MaterialEx对象集合
     * @param criteria
     * @param token
     * @return
     */
    public OperationResult<MaterialEx> fetchMaterialInventoryOfMaterialEx(OperationResult<?> operationResult, ICriteria criteria, String token) {
        OperationResult<MaterialEx> operationRt = new OperationResult<MaterialEx>();
        ArrayList<MaterialEx> newMaterialExs = new ArrayList<MaterialEx>();
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        MaterialEx materialEx;
        ArrayList<MaterialInventory> materialInventories = new ArrayList<MaterialInventory>();
        try {
            materialExs = (ArrayList<MaterialEx>) operationResult.getResultObjects();
            operationResult = this.fetchMaterialInventory(criteria, token);
            if (operationResult.getResultCode() == 0) {
                materialInventories = (ArrayList<MaterialInventory>) operationResult.getResultObjects();
            }
            // matterialExs inner join materialInventories
            for (int i = 0; i < materialExs.size(); i++) {
                for (int j = 0; j < materialInventories.size(); j++) {
                    if (materialExs.get(i).getCode().equals(materialInventories.get(j).getItemCode())) {
                        materialEx = new MaterialEx();
                        materialEx = materialExs.get(i);
                        materialEx.setWarehouseCode(materialInventories.get(j).getWarehouse());
                        materialEx.setWarehouseOnHand(materialInventories.get(j).getOnHand());
                        newMaterialExs.add(materialEx);
                    }
                }
            }
            operationRt.setResultObjects(newMaterialExs);
        } catch (Exception e) {
            operationRt.setError(e);
        }
        return operationRt;
    }

    /**
     * 查询物料扩展（包含物料和价格清单）
     *
     * @param operationResult
     * @param criteria        需指定价格清单名称
     * @param token
     * @return
     */
    public OperationResult<MaterialEx> fetchMaterialPriceListOfMaterialEx(OperationResult<MaterialEx> operationResult, ICriteria criteria, String token) {
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        Map<String, Decimal> mapPriceList = new HashMap<String, Decimal>();
        MaterialPriceList materialPriceList = new MaterialPriceList();
        ArrayList<IMaterialPriceItem> materialPrices = new ArrayList<IMaterialPriceItem>();
        String itemCode;
        materialExs = operationResult.getResultObjects();
        try {
            mapPriceList = this.fetchMaterialPriceListFinal(mapPriceList, new Decimal(0), criteria, token);
            if (mapPriceList == null) {
                return (OperationResult<MaterialEx>) operationResult;
            }
            for (int i = 0; i < materialExs.size(); i++) {
                itemCode = materialExs.get(i).getCode();
                if (mapPriceList.keySet().contains(itemCode) && !mapPriceList.get(itemCode).equals(0)) {
                    materialExs.get(i).setPrice(mapPriceList.get(itemCode));
                }
            }
        } catch (Exception e) {
            operationResult.setError(e);
        }
        return (OperationResult<MaterialEx>) operationResult;
    }

    public Map<String, Decimal> fetchMaterialPriceListFinal(Map<String, Decimal> mapPriceList, Decimal factor, ICriteria criteria, String token) {
        IMaterialPriceItems materialPriceItems = new MaterialPriceItems();
        Boolean isNeedFetchChild = false;
        Integer newBaseOnList;
        String itemCode;
        Decimal priceList;

        OperationResult<MaterialPriceList> operationResult = new OperationResult<MaterialPriceList>();
        operationResult = this.fetchMaterialPriceList(criteria, token);
        if (operationResult.getResultCode() != 0) {
            throw new BusinessLogicException(operationResult.getError());
        }
        if (operationResult.getResultObjects().size() == 0)
            return mapPriceList;
        newBaseOnList = operationResult.getResultObjects().firstOrDefault().getBasedOnList();
        materialPriceItems = operationResult.getResultObjects().firstOrDefault().getMaterialPriceItems();

        for (int i = 0; i <= materialPriceItems.size(); i++) {
            itemCode = materialPriceItems.get(i).getItemCode();
            priceList = materialPriceItems.get(i).getPrice();

            //had got the final price,ignore it;
            if (mapPriceList.keySet().contains(itemCode) && !mapPriceList.get(itemCode).equals(0)) {
                continue;
            }
            // if found the price list,caculate the price list that you want to .
            if (materialPriceItems.get(i).getPrice().equals(0)) {
                mapPriceList.put(itemCode, priceList);
                isNeedFetchChild = Boolean.TRUE;
            } else {
                if (!factor.equals(0)) {
                    priceList = priceList.multiply(factor);
                }
                mapPriceList.put(itemCode, priceList);
            }
        }
        //region caculate the value of factor
        if (factor.equals(0)) {
            factor = operationResult.getResultObjects().firstOrDefault().getFactor();
        } else {
            factor = factor.multiply(operationResult.getResultObjects().firstOrDefault().getFactor());
        }
        //endregion

        // if price is zero ,search the children's price
        if (isNeedFetchChild == Boolean.TRUE && !newBaseOnList.equals(0)) {
            criteria.getConditions().removeAll(criteria.getConditions());
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialPriceList.PROPERTY_BASEDONLIST.getName());
            condition.setValue(newBaseOnList);
            condition.setOperation(ConditionOperation.EQUAL);
            fetchMaterialPriceListFinal(mapPriceList, factor, criteria, token);
        }
        return mapPriceList;
    }

    // --------------------------------------------------------------------------------------------//
}
