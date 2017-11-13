package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
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
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        //检查条件,找出条件中包含仓库和物料的condition
        //第一步: 查询物料
        //第二步: 查询库存
        //第三步: 查询价格清单
        OperationResult<MaterialEx> operationResultMaterialExpand = new OperationResult<MaterialEx>();
        OperationResult<?> operationResult = null;
        ArrayList<Material> materials = new ArrayList<Material>();
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        Criteria criMaterial = new Criteria();
        Criteria criInventory = new Criteria();
        Criteria criPriceList = new Criteria();
        ICondition condition;
        IChildCriteria childCriteria;
        boolean isNeedtoFetchPriceList = false;
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

                    childCriteria = criPriceList.getChildCriterias().create();
                    childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
                    childCriteria.setOnlyHasChilds(false);

                    condition = childCriteria.getConditions().create();
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
                if (con.getAlias().equalsIgnoreCase(MaterialEx.PROPERTY_WAREHOUSE.getName())) {
                    condition = criInventory.getConditions().create();
                    condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());
                    continue;
                }
                if (con.getAlias().equalsIgnoreCase(MaterialEx.PROPERTY_PRICELISTNAME.getName())) {
                    condition = criPriceList.getConditions().create();
                    condition.setAlias(MaterialPriceList.PROPERTY_NAME.getName());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());
                    // 如果有价格清单名称 就查价格清单，否则不需要查询价格清单
                    isNeedtoFetchPriceList = true;
                    continue;
                } else {
                    condition = criMaterial.getConditions().create();
                    condition.setAlias(con.getAlias());
                    condition.setOperation(con.getOperation());
                    condition.setValue(con.getValue());
                    condition.setRelationship(con.getRelationship());
                }
            }
            //endregion
        }
        try {
            //region 查询物料，创建MaterialEx对象
            operationResult = this.fetchMaterial(criMaterial, token);
            if (operationResult.getResultCode() == 0) {
                materials = (ArrayList<Material>) operationResult.getResultObjects();
            } else {
                return (OperationResult<MaterialEx>) operationResult;
            }
            materialExs = MaterialEx.create(materials);
            //endregion
            // region 通过拆分的仓库条件查询库存
            operationResultMaterialExpand.addResultObjects(materialExs);
            operationResult = this.fetchMaterialInventoryOfMaterialEx(operationResultMaterialExpand, criInventory, token);
            if (operationResult.getError() != null) {
                throw new BusinessLogicException(operationResult.getMessage());
            }
            materialExs = (ArrayList<MaterialEx>) operationResult.getResultObjects();
            operationResultMaterialExpand.getResultObjects().clear();
            operationResultMaterialExpand.addResultObjects(materialExs);
            //endregion..
            if (isNeedtoFetchPriceList) {
                //region 查询价格清单
                operationResult = this.fetchMaterialPriceListOfMaterialEx(operationResultMaterialExpand, criPriceList, token);
                if (operationResult.getError() != null) {
                    throw new BusinessLogicException(operationResult.getMessage());
                }
                materialExs = (ArrayList<MaterialEx>) operationResult.getResultObjects();
                operationResultMaterialExpand.getResultObjects().clear();
                operationResultMaterialExpand.addResultObjects(materialExs);
                //endregion
            }
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
    private OperationResult<MaterialEx> fetchMaterialInventoryOfMaterialEx(OperationResult<?> operationResult, ICriteria criteria, String token) {
        OperationResult<MaterialEx> operationRt = new OperationResult<MaterialEx>();
        ArrayList<MaterialEx> newMaterialExs = new ArrayList<MaterialEx>();
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        MaterialEx materialEx;
        ArrayList<MaterialInventory> materialInventories = new ArrayList<MaterialInventory>();
        try {
            materialExs = (ArrayList<MaterialEx>) operationResult.getResultObjects();
            operationResult = this.fetchMaterialInventory(criteria, token);
            if (operationResult.getError() != null) {
                materialInventories = (ArrayList<MaterialInventory>) operationResult.getResultObjects();
            }
            // matterialExs inner join materialInventories
            for (int i = 0; i < materialExs.size(); i++
                    ) {
                for (int j = 0; j < materialInventories.size(); j++) {
                    if (materialExs.get(i).getCode().equals(materialInventories.get(j).getItemCode())) {
                        materialEx = MaterialEx.create(materialExs.get(i));
                        materialEx.setWarehouseCode(materialInventories.get(j).getWarehouse());
                        materialEx.setWarehouseOnHand(materialInventories.get(j).getOnHand());
                        newMaterialExs.add(materialEx);
                    }
                }
            }
            operationRt.addResultObjects(newMaterialExs);
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
    private OperationResult<MaterialEx> fetchMaterialPriceListOfMaterialEx(OperationResult<MaterialEx> operationResult, ICriteria criteria, String token) {
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        Map<String, Decimal> mapPriceList = new HashMap<String, Decimal>();
        MaterialPriceList materialPriceList = new MaterialPriceList();
        ArrayList<IMaterialPriceItem> materialPrices = new ArrayList<IMaterialPriceItem>();
        String itemCode;
        materialExs = operationResult.getResultObjects();
        try {
            materialPriceList = this.fetchMaterialPriceList(null, Decimal.ZERO, criteria, token);
            if (materialPriceList == null) {
                return (OperationResult<MaterialEx>) operationResult;
            }
            for (int i = 0; i < materialExs.size(); i++) {
                itemCode = materialExs.get(i).getCode();
                materialExs.get(i).setPriceListName(materialPriceList.getName());
                for (IMaterialPriceItem item : materialPriceList.getMaterialPriceItems()) {
                    // 价格清单不为0，才覆盖物料价格
                    if (item.getItemCode() == itemCode && item.getPrice().compareTo(BigDecimal.ZERO) != 0) {
                        materialExs.get(i).setPrice(item.getPrice());
                        break;
                    }
                    continue;
                }
            }
        } catch (Exception e) {
            operationResult.setError(e);
        }
        return (OperationResult<MaterialEx>) operationResult;
    }

    /**
     * 递归查询物料价格清单 最终值
     *
     * @param priceList
     * @param factor
     * @param criteria
     * @param token
     * @return
     */
    private MaterialPriceList fetchMaterialPriceList(MaterialPriceList priceList, Decimal factor, ICriteria criteria, String token) {
        boolean isNeedToSearchAgin = false;
        int newBaseOnList = 0;
        MaterialPriceList childPriceList = new MaterialPriceList();
        // 先查询价格清单
        OperationResult<MaterialPriceList> operationResult = new OperationResult<MaterialPriceList>();
        operationResult = this.fetchMaterialPriceList(criteria, token);
        if (operationResult.getError() != null) {
            throw new BusinessLogicException(operationResult.getMessage());
        }
        if (operationResult.getResultObjects().isEmpty())
            return priceList;
        childPriceList = operationResult.getResultObjects().firstOrDefault();
        // 更新baseOnList值
        newBaseOnList = childPriceList.getBasedOnList();
        if (priceList == null) {
            //region 第一次查询处理
            priceList = childPriceList;
            for (IMaterialPriceItem priceItem : priceList.getMaterialPriceItems()) {
                if (priceItem.getPrice().compareTo(BigDecimal.ZERO) != 0) {
                    continue;
                } else {
                    // 有价格为0，若factor和BaseOnList都不为0，需要继续查询来计算物料的价格清单
                    if (priceList.getFactor().compareTo(BigDecimal.ZERO) != 0 &&
                            newBaseOnList != 0) {
                        isNeedToSearchAgin = true;
                        break;
                    }
                }
            }
            //endregion
        } else {
            //region 递归查询处理
            for (IMaterialPriceItem priceItem : priceList.getMaterialPriceItems()) {
                //IMaterialPriceItem priceItem = priceList.getMaterialPriceItems().get(index);
                // 已经有了价格，不用再计算，跳过。
                if (priceItem.getPrice().compareTo(BigDecimal.ZERO) != 0) {
                    continue;
                } else {
                    // 如果价格为0 需要计算价格
                    //否则在新查询的结果中找到该物料的价格  判断是否为0 ，
                    //  为0 ：{ 需要判断newBaseOnList是否为0，为0：跳过；不为0：需要再次查询；}
                    //  不为0：计算价格
                    Optional<IMaterialPriceItem> item = childPriceList.getMaterialPriceItems().stream().filter(c -> c.getItemCode().equals(priceItem.getItemCode())).findFirst();
                    if (item.get().getPrice().compareTo(BigDecimal.ZERO) != 0) {
                        priceItem.setPrice(item.get().getPrice().multiply(factor));
                    } else {
                        if (newBaseOnList == 0) {
                            continue;
                        } else {
                            isNeedToSearchAgin = true;
                        }
                    }
                }
            }
            //endregion
        }
        if (isNeedToSearchAgin) {
            // 计算factor的值
            if (factor.compareTo(BigDecimal.ZERO) == 0) {
                // 第一次查询
                factor = priceList.getFactor();
            } else {
                factor = factor.multiply(priceList.getFactor());
            }
            criteria.getConditions().removeAll(criteria.getConditions());
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
            condition.setValue(newBaseOnList);
            condition.setOperation(ConditionOperation.EQUAL);
            this.fetchMaterialPriceList(priceList, factor, criteria, token);
        }
        return priceList;
    }

    // --------------------------------------------------------------------------------------------//
    @Override
    public IOperationResult<IMaterialPriceList> fetchMaterialPriceListFinal(ICriteria criteria) {
        return new OperationResult<IMaterialPriceList>(this.fetchMaterialPriceListFinal(criteria, this.getUserToken()));
    }

    /**
     * @param criteria 查询并计算 价格清单最终价(价格清单为0的不会被物料价格覆盖)
     * @param token    口令
     * @return
     */
    public OperationResult<MaterialPriceList> fetchMaterialPriceListFinal(ICriteria criteria, String token) {
        MaterialPriceList priceList = new MaterialPriceList();
        OperationResult<MaterialPriceList> opRst = new OperationResult<MaterialPriceList>();
        try {
            priceList = this.fetchMaterialPriceList(null, Decimal.ZERO, criteria, token);
            opRst.addResultObjects(priceList);
            opRst.setResultCode(0);
        } catch (Exception ex) {
            opRst.setError(ex);
        }
        return opRst;
    }
    // --------------------------------------------------------------------------------------------//
}
