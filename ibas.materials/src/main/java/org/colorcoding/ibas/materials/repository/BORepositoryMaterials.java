package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IMaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.IProduct;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.Product;
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
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
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
    @Override
    public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialBatchJournal.class);
    }

    /**
     * 查询-物料批次日记账（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<MaterialBatchJournal> saveMaterialBatchJournal(MaterialBatchJournal bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料批次日记账（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialSerial.class);
    }

    /**
     * 查询-物料序列号（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料序列号（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialSerialJournal.class);
    }

    /**
     * 查询-物料序列号日记账（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<MaterialSerialJournal> saveMaterialSerialJournal(MaterialSerialJournal bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-物料序列号日记账（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token) {
        return super.fetch(criteria, token, Warehouse.class);
    }

    /**
     * 查询-仓库（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    @Override
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
    @Override
    public OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-仓库（提前设置用户口令）
     *
     * @param bo 对象实例
     * @return 操作结果
     */
    @Override
    public IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo) {
        return new OperationResult<IWarehouse>(this.saveWarehouse((Warehouse) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-产品信息
     *
     * @param criteria 对象实例
     * @param token    口令
     * @return 操作结果
     */
    @Override
    public OperationResult<Product> fetchProduct(ICriteria criteria, String token) {
        try {
            //region  1、查询物料
            // 从查询中找到价格清单
            ICondition conditionPriceList = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(Product.PRICELIST_NAME));
            // 从查询中找到仓库
            ArrayList<ICondition> conditionWarehouse = new ArrayList<>();
            criteria.getConditions().forEach(c -> {
                if (c.getAlias().equalsIgnoreCase(Product.WAREHOUSE_NAME)) {
                    conditionWarehouse.add(c);
                }
            });
            ArrayList<String> filterConditons = new ArrayList<>();
            filterConditons.add(Product.PRICELIST_NAME);
            filterConditons.add(Product.WAREHOUSE_NAME);
            // 查产品信息
            OperationResult<Product> opRstProduct = super.fetch(this.splitCondition(criteria, filterConditons), token, Product.class);
            if (opRstProduct.getError() != null) {
                throw opRstProduct.getError();
            }
            // 移出价格清单查询和仓库查询
            criteria.getConditions().remove(conditionPriceList);
            //endregion
            //region 2、含有仓库条件 调用库存查询
            if (!conditionWarehouse.isEmpty()) {
                IOperationResult<MaterialQuantity> opRstMaterialQuantity = this.fetchMaterialQuantity(criteria);
                if (opRstMaterialQuantity.getError() != null) {
                    throw opRstMaterialQuantity.getError();
                }
                if (!opRstMaterialQuantity.getResultObjects().isEmpty()) {
                    for (Product item : opRstProduct.getResultObjects()) {
                        MaterialQuantity materialQuantity = opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(item.getCode()));
                        if (materialQuantity != null && materialQuantity.getOnHand() != null) {
                            item.setOnHand(materialQuantity.getOnHand());
                        }
                    }
                }
            }
            //endregion
            // region 3、遍历Product 查询价格清单
            if (conditionPriceList != null) {
                int priceList = Integer.parseInt(conditionPriceList.getValue());
                for (Product item : opRstProduct.getResultObjects()) {
                    MaterialPrice materialPrice = this.fetchMaterialPrice(item.getCode(), priceList, null);
                    if (materialPrice != null && materialPrice.getPrice() != null) {
                        item.setPrice(materialPrice.getPrice());
                    }
                }
            }
            //endregion
            return opRstProduct;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }

    /**
     * 处理查询条件 处理括号
     *
     * @param criteria   查询条件
     * @param conditions 过滤的条件
     * @return
     */
    private ICriteria splitCondition(ICriteria criteria, ArrayList<String> conditions) {
        ICriteria criteria1Material = new Criteria();
        criteria1Material = criteria.clone();
        for (int index = 0; index < criteria1Material.getConditions().size(); index++) {
            String aliensValue = criteria1Material.getConditions().get(index).getAlias();
            if (conditions.firstOrDefault(c -> c.equalsIgnoreCase(aliensValue)) != null) {
                int bracketOpenCount = criteria1Material.getConditions().get(index).getBracketOpen();
                int bracketCloseCount = criteria1Material.getConditions().get(index).getBracketClose();
                // 自身开括号与闭括号不相等才处理，相等情况忽略
                if (bracketCloseCount != bracketOpenCount) {
                    //region 去掉自身双括号
                    if (bracketOpenCount != 0 && bracketCloseCount != 0) {
                        int bracketCount = Math.abs(bracketOpenCount - bracketCloseCount);
                        bracketOpenCount = bracketOpenCount - bracketCount;
                        bracketCloseCount = bracketCloseCount - bracketCount;
                        criteria1Material.getConditions().get(index).setBracketOpen(bracketOpenCount);
                        criteria1Material.getConditions().get(index).setBracketOpen(bracketCloseCount);
                    }
                    //endregion
                    //region 处理开括号
                    if (bracketOpenCount != 0) {
                        if (index + 1 < criteria1Material.getConditions().size()) {
                            int nextBracketOpenCount = criteria1Material.getConditions().get(index + 1).getBracketOpen();
                            nextBracketOpenCount = nextBracketOpenCount + bracketOpenCount;
                            criteria1Material.getConditions().get(index + 1).setBracketOpen(nextBracketOpenCount);
                        }
                    }
                    //endregion
                    //region 处理闭括号
                    if (bracketCloseCount != 0) {
                        if (index - 1 >= 0) {
                            int preBracketCloseCount = criteria1Material.getConditions().get(index - 1).getBracketClose();
                            preBracketCloseCount = preBracketCloseCount + bracketCloseCount;
                            criteria1Material.getConditions().get(index - 1).setBracketClose(preBracketCloseCount);
                        }
                    }
                    //endregion
                }
                criteria1Material.getConditions().remove(index);
                index--;
            }
        }
        return criteria1Material;
    }

    /**
     * 查询-产品信息（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 产品信息
     */
    @Override
    public IOperationResult<IProduct> fetchProduct(ICriteria criteria) {
        return new OperationResult<IProduct>(this.fetchProduct(criteria, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料价格（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    @Override
    public IOperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria) {
        return this.fetchMaterialPrice(criteria, this.getUserToken());
    }

    /**
     * 查询-物料价格
     *
     * @param criteria 查询
     * @param token    口令
     * @return 物料价格
     */
    @Override
    public OperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria, String token) {
        try {
            OperationResult<MaterialPrice> operationResult = new OperationResult<>();
            // 从查询中找到价格清单
            ICondition conditionPriceList = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(MaterialPriceList.PROPERTY_OBJECTKEY.getName()));
            if (conditionPriceList == null) {
                throw new Exception(I18N.prop("msg_mm_not_found_price_list"));
            }
            ArrayList<String> filterConditons = new ArrayList<>();
            filterConditons.add(MaterialPrice.PRICELIST_NAME);
            // 查物料
            IOperationResult<IMaterial> opRstMaterial = this.fetchMaterial(this.splitCondition(criteria, filterConditons));
            if (opRstMaterial.getError() != null) {
                throw opRstMaterial.getError();
            }
            // 循环物料查价格
            int priceList = Integer.parseInt(conditionPriceList.getValue());
            for (IMaterial item : opRstMaterial.getResultObjects()) {
                MaterialPrice materialPrice = this.fetchMaterialPrice(item.getCode(), priceList, null);
                if (materialPrice != null) {
                    if (materialPrice.getPrice() == null) {
                        materialPrice.setPrice(item.getAvgPrice());
                    }
                    operationResult.addResultObjects(materialPrice);
                }
            }
            return operationResult;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }

    /**
     * 查询物料对应价格清单的价格
     *
     * @param itemCode  物料
     * @param priceList 价格清单
     * @param factory   价格清单系数
     * @return 物料价格清单
     */

    private MaterialPrice fetchMaterialPrice(String itemCode, int priceList, Decimal factory) {
        try {
            ICriteria criteria = new Criteria();
            MaterialPrice materialPrice = new MaterialPrice();
            materialPrice.setItemCode(itemCode);
            // region 价格清单查询条件
            IChildCriteria childCriteria;
            ICondition condition;
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
            condition.setValue(priceList);
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);
            childCriteria = criteria.getChildCriterias().create();
            childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
            childCriteria.setOnlyHasChilds(false);
            condition = childCriteria.getConditions().create();
            condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setValue(itemCode);
            // endregion
            // 查询价格清单
            IOperationResult<IMaterialPriceList> opRstPriceList = this.fetchMaterialPriceList(criteria);
            if (opRstPriceList.getError() != null) {
                throw opRstPriceList.getError();
            }
            // 价格清单主表不存在
            if (opRstPriceList.getResultObjects().isEmpty()) {
                return materialPrice;
            }
            IMaterialPriceList materialPriceList = opRstPriceList.getResultObjects().firstOrDefault();
            // 主子表都有记录
            if (materialPriceList != null && !materialPriceList.getMaterialPriceItems().isEmpty()) {
                // 价格清单中找到该物料，计算价格
                materialPrice.setCurrency(materialPriceList.getCurrency());
                if (factory == null) {
                    materialPrice.setPrice(materialPriceList.getMaterialPriceItems().firstOrDefault().getPrice());
                } else {
                    materialPrice.setPrice(materialPriceList.getMaterialPriceItems().firstOrDefault().getPrice().multiply(factory));
                }
                return materialPrice;
            } else if (materialPriceList != null) {
                // 只有主表有记录
                if (factory == null) {
                    factory = materialPriceList.getFactor();
                } else {
                    factory = materialPriceList.getFactor().multiply(factory);
                }
                return this.fetchMaterialPrice(itemCode, materialPriceList.getBasedOnList(), factory);
            } else {
                return materialPrice;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料库存数量（提前设置用户口令）
     *
     * @param criteria 查询
     * @return 操作结果
     */
    @Override
    public IOperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria) {
        return this.fetchMaterialQuantity(criteria, this.getUserToken());
    }


    /**
     * 查询-物料库存数量
     *
     * @param criteria 查询 Material属性+MaterialQuantity常量
     * @param token    口令
     * @return 物料库存数量
     */
    @Override
    public OperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria, String token) {
        try {
            OperationResult<MaterialQuantity> operationResult = new OperationResult<>();
            // 从查询中找到所有的仓库
            ArrayList<ICondition> conditions = new ArrayList<>();
            for (ICondition item : criteria.getConditions()) {
                if (item.getAlias().equals(MaterialQuantity.WAREHOUSE_NAME)) {
                    conditions.add(item);
                }
            }
            ArrayList<String> filterConditons = new ArrayList<>();
            filterConditons.add(MaterialQuantity.WAREHOUSE_NAME);
            IOperationResult<IMaterial> opRstMaterial = this.fetchMaterial(this.splitCondition(criteria, filterConditons));
            if (opRstMaterial.getError() != null) {
                throw opRstMaterial.getError();
            }
            // 如果仓库条件为空，返回物料库存；仓库条件不为空，以仓库作为条件查询库存
            if (conditions.isEmpty()) {
                operationResult.addResultObjects(MaterialQuantity.create(opRstMaterial.getResultObjects(), true));
            } else {
                // 去除仓库之外所有条件 查询库存
                criteria.getConditions().clear();
                conditions.forEach(c -> criteria.getConditions().add(c));
                IOperationResult<IMaterialInventory> opRstInventry = this.fetchMaterialInventory(criteria);
                if (opRstInventry.getError() != null) {
                    throw opRstInventry.getError();
                }
                // 创建物料库存集合，库存初始值为0
                ArrayList<IMaterialQuantity> materialQuantities = MaterialQuantity.create(opRstMaterial.getResultObjects(), false);
                for (IMaterialInventory item : opRstInventry.getResultObjects()) {
                    IMaterialQuantity materialQuantity = materialQuantities.firstOrDefault(c -> c.getItemCode().equals(item.getItemCode()));
                    if (materialQuantity != null) {
                        // 更新物料库存集合中物料的库存
                        Decimal onHand = materialQuantity.getOnHand();
                        onHand = onHand.add(item.getOnHand());
                        materialQuantity.setOnHand(onHand);
                    }
                }
                operationResult.addResultObjects(materialQuantities);
            }
            return operationResult;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }
}