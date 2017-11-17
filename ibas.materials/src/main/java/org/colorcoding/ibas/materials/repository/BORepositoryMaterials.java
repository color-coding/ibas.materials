package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.*;
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

import java.math.BigDecimal;

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
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(MaterialPriceList.PROPERTY_OBJECTKEY.getName()));
            // 从查询中找到仓库
            ICondition conditionWarehouse = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(MaterialInventory.PROPERTY_WAREHOUSE.getName()));
            // 移出价格清单查询和仓库查询
            criteria.getConditions().remove(conditionPriceList);
            criteria.getConditions().remove(conditionWarehouse);
            // 查产品信息
            OperationResult<Product> opRsltProduct = super.fetch(criteria, token, Product.class);
            if (opRsltProduct.getError() != null) {
                throw opRsltProduct.getError();
            }
            //endregion
            //region 2、遍历Product 查询库存数量
            if (conditionWarehouse != null) {
                // 清除所有条件，只添加仓库的查询条件
                criteria.getConditions().clear();
                criteria.getConditions().add(conditionWarehouse);
                for (Product item : opRsltProduct.getResultObjects()) {
                    MaterialQuantity materialQuantity = this.fetchMaterialQuantity(item.getCode(), criteria);
                    item.setOnHand(materialQuantity.getOnHand());
                }
            }
            //endregion
            // region 3、遍历Product 查询价格清单
            if (conditionPriceList != null) {
                int priceList = Integer.parseInt(conditionPriceList.getValue());
                for (Product item : opRsltProduct.getResultObjects()) {
                    MaterialPrice materialPrice = this.fetchMaterialPrice(item.getCode(), priceList);
                    item.setPrice(materialPrice.getPrice());
                }
            }
            //endregion
            return opRsltProduct;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }

    /**
     * 查询-产品信息（提前设置用户口令）
     *
     * @param criteria 查询
     * @return
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
     * @return
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
     * @return
     */
    @Override
    public OperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria, String token) {
        try {
            OperationResult<MaterialPrice> operationResult = new OperationResult<MaterialPrice>();
            // 从查询中找到价格清单
            ICondition conditionPriceList = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(Product.PROPERTY_OBJECTCODE.getName()));
            if (conditionPriceList == null) {
                throw new Exception(I18N.prop("msg_mm_not_found_price_list"));
            }
            // 移出价格清单查询
            criteria.getConditions().remove(conditionPriceList);
            // 查物料
            IOperationResult<IMaterial> opRsltMaterial = this.fetchMaterial(criteria);
            if (opRsltMaterial.getError() != null) {
                throw opRsltMaterial.getError();
            }
            // 循环物料查价格
            int priceList = Integer.parseInt(conditionPriceList.getValue());
            for (IMaterial item : opRsltMaterial.getResultObjects()) {
                MaterialPrice materialPrice = this.fetchMaterialPrice(item.getCode(), priceList);
                if (materialPrice != null) {
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
     * @param itemCode
     * @param priceList
     * @return
     */
    private MaterialPrice fetchMaterialPrice(String itemCode, int priceList) {
        try {
            ICriteria criteria = new Criteria();
            MaterialPrice materialPrice = new MaterialPrice();
            materialPrice.setItemCode(itemCode);
            IChildCriteria childCriteria;
            ICondition condition;
            // region 价格清单查询条件
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
            if (opRstPriceList.getResultObjects().isEmpty()) {
                return materialPrice;
            }
            IMaterialPriceList materialPriceList = opRstPriceList.getResultObjects().firstOrDefault();
            // 该价格清单下找不到物料的记录
            if (materialPriceList.getMaterialPriceItems().isEmpty()) {
                return materialPrice;
            }
            if (materialPriceList.getMaterialPriceItems().firstOrDefault().getPrice().compareTo(BigDecimal.ZERO) == 0) {
                materialPriceList = this.fetchMaterialPrice(materialPriceList, criteria);
                // 赋值MaterialPrice对象
            }
            materialPrice.setPrice(materialPriceList.getMaterialPriceItems().firstOrDefault().getPrice());
            materialPrice.setCurrency(materialPriceList.getCurrency());
            return materialPrice;
        } catch (Exception e) {
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_found_material_price_list_error"), itemCode, e.getMessage()));
        }
    }

    /**
     * 递归查询物料价格
     *
     * @param materialPriceList
     * @param criteria
     * @return
     */
    private IMaterialPriceList fetchMaterialPrice(IMaterialPriceList materialPriceList, ICriteria criteria) {
        try {
            // region 获取（最新的）价格清单基于单据号
            int baseOnList = materialPriceList.getBasedOnList();
            // 找到价格清单的条件
            ICondition conditionPriceList = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(MaterialPriceList.PROPERTY_OBJECTKEY.getName()));

            // 价格清单重新赋值
            conditionPriceList.setValue(baseOnList);
            IOperationResult<IMaterialPriceList> opRstMaterialPriceList = this.fetchMaterialPriceList(criteria);
            if (opRstMaterialPriceList.getError() != null) {
                throw opRstMaterialPriceList.getError();
            }
            // endregion
            // 查询出的价格
            Decimal price = opRstMaterialPriceList.getResultObjects().firstOrDefault().getMaterialPriceItems().firstOrDefault().getPrice();
            // 价格不为0，计算价格后返回
            if (price.compareTo(BigDecimal.ZERO) != 0) {
                materialPriceList.getMaterialPriceItems().firstOrDefault().setPrice(price.multiply(materialPriceList.getFactor()));
            } else {
                // 价格为0，更新factor和baseOnList的值，继续查询
                materialPriceList.setFactor(opRstMaterialPriceList.getResultObjects().firstOrDefault().getFactor().multiply(materialPriceList.getFactor()));
                materialPriceList.setBasedOnList(opRstMaterialPriceList.getResultObjects().firstOrDefault().getBasedOnList());
                this.fetchMaterialPrice(materialPriceList, criteria);
            }
            return materialPriceList;
        } catch (Exception e) {
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_found_material_price_list_error")
                    , materialPriceList.getMaterialPriceItems().firstOrDefault().getItemCode()
                    , e.getMessage()));
        }
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * 查询-物料库存数量（提前设置用户口令）
     *
     * @param criteria 查询
     * @return
     */
    @Override
    public IOperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria) {
        return this.fetchMaterialQuantity(criteria, this.getUserToken());
    }

    /**
     * 查询-物料库存数量
     *
     * @param criteria 查询
     * @param token    口令
     * @return
     */
    @Override
    public OperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria, String token) {
        try {
            OperationResult<MaterialQuantity> operationResult = new OperationResult<MaterialQuantity>();
            // 从查询中找到仓库
            ICondition conditionWarehouse = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(MaterialInventory.PROPERTY_WAREHOUSE.getName()));

            // 移出仓库
            criteria.getConditions().remove(conditionWarehouse);
            // 查物料
            IOperationResult<IMaterial> opRsltMaterial = this.fetchMaterial(criteria);
            if (opRsltMaterial.getError() != null) {
                throw opRsltMaterial.getError();
            }
            // 没有仓库条件 查询所有库存
            if (conditionWarehouse == null) {
                // 查找所有仓库的库存 即物料对象的onHand值
                operationResult.addResultObjects(MaterialQuantity.create(opRsltMaterial.getResultObjects()));
            } else {
                // 循环物料查询条件
                criteria.getConditions().clear();
                criteria.getConditions().add(conditionWarehouse);
                for (IMaterial item : opRsltMaterial.getResultObjects()) {
                    MaterialQuantity materialQuantity = this.fetchMaterialQuantity(item.getCode(), criteria);
                    if (materialQuantity != null) {
                        materialQuantity.setUOM(item.getInventoryUOM());
                        operationResult.addResultObjects(materialQuantity);
                    }
                }
            }
            return operationResult;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }

    /**
     * 查询物料对应仓库下的所有库存
     *
     * @param itemCode
     * @param criteria 只包含仓库条件
     * @return
     */
    private MaterialQuantity fetchMaterialQuantity(String itemCode, ICriteria criteria) {
        try {
            MaterialQuantity materialQuantity = new MaterialQuantity();
            // region 定义新的查询条件 添加物料信息
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
            condition.setValue(itemCode);
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);
            // endregion
            IOperationResult<IMaterialInventory> opRstInventry = this.fetchMaterialInventory(criteria);
            if (opRstInventry.getError() != null) {
                throw opRstInventry.getError();
            }
            materialQuantity.setItemCode(itemCode);
            materialQuantity.setOnHand(0);
            for (IMaterialInventory item : opRstInventry.getResultObjects()) {
                Decimal onHand = materialQuantity.getOnHand();
                onHand = onHand.add(item.getOnHand());
                materialQuantity.setOnHand(onHand);
            }
            return materialQuantity;
        } catch (Exception e) {
            throw new BusinessLogicException(
                    String.format(I18N.prop("msg_mm_found_material_inventory_error")
                            , itemCode
                            , e.getMessage())
            );
        }
    }
}
