package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.*;
import org.colorcoding.ibas.materials.bo.materialgroup.IMaterialGroup;
import org.colorcoding.ibas.materials.bo.materialgroup.MaterialGroup;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

public class testProduct extends TestCase {
    /**
     * 获取连接口令
     */
    String getToken() {
        return OrganizationFactory.SYSTEM_USER.getToken();
    }
    // 价格清单名称、物料名称、仓库名称

    /**
     * 物料增量查询
     *
     * @throws Exception
     */
    public void testFetchProduct() throws Exception {
        // 测试对象的保存和查询
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        String materialGroupName = String.format("G%s", DateTime.getNow().toString("ddmmss"));

        String itemCode1 = String.format("A%s", DateTime.getNow().toString("ddmmss"));
        String itemCode2 = String.format("B%s", DateTime.getNow().toString("ddmmss"));
        String itemCode3 = String.format("C%s", DateTime.getNow().toString("ddmmss"));

        String whsCode1 = String.format("BJ%s", DateTime.getNow().toString("ddmmss"));
        String whsCode2 = String.format("SH%s", DateTime.getNow().toString("ddmmss"));
        String whsCode3 = String.format("GZ%s", DateTime.getNow().toString("ddmmss"));

        String priceListName1 = String.format("进货价%s", DateTime.getNow().toString("ddmmss"));
        String priceListName2 = String.format("会员价%s", DateTime.getNow().toString("ddmmss"));
        //设置用户口令
        boRepository.setUserToken(this.getToken());
        // region 新建物料组
        IOperationResult<IMaterialGroup> opRstMterialGroup = null;
        IMaterialGroup materialGroup = new MaterialGroup();
        materialGroup.setCode(materialGroupName);
        materialGroup.setName(materialGroupName);
        materialGroup.setActivated(emYesNo.YES);
        opRstMterialGroup = boRepository.saveMaterialGroup(materialGroup);
        assertEquals(opRstMterialGroup.getMessage(), 0, opRstMterialGroup.getResultCode());
        // endregion
        //region 新建物料
        IOperationResult<IMaterial> opRstMterial = null;
        IMaterial material1 = new Material();
        material1.setCode(itemCode1);
        material1.setName(itemCode1);
        material1.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material1);
        if (opRstMterial.getError() != null) {
            throw opRstMterial.getError();
        }
        assertEquals(opRstMterial.getMessage(), opRstMterial.getResultCode(), 0);
        IMaterial material2 = new Material();
        material2.setCode(itemCode2);
        material2.setName(itemCode2);
        material2.setGroup(materialGroupName);
        material2.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material2);
        if (opRstMterial.getError() != null) {
            throw opRstMterial.getError();
        }
        assertEquals(opRstMterial.getMessage(), opRstMterial.getResultCode(), 0);
        IMaterial material3 = new Material();
        material3.setCode(itemCode3);
        material3.setName(itemCode3);
        material3.setGroup(materialGroupName);
        material3.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material3);
        if (opRstMterial.getError() != null) {
            throw opRstMterial.getError();
        }
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        //endregion
        //region 新建仓库
        IOperationResult<IWarehouse> opRstWarehouse = null;
        IWarehouse warehouse1 = new Warehouse();
        warehouse1.setCode(whsCode1);
        warehouse1.setName(whsCode1);
        opRstWarehouse = boRepository.saveWarehouse(warehouse1);
        if (opRstWarehouse.getError() != null) {
            throw opRstWarehouse.getError();
        }
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());

        IWarehouse warehouse2 = new Warehouse();
        warehouse2.setCode(whsCode2);
        warehouse2.setName(whsCode2);
        opRstWarehouse = boRepository.saveWarehouse(warehouse2);
        if (opRstWarehouse.getError() != null) {
            throw opRstWarehouse.getError();
        }
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());

        IWarehouse warehouse3 = new Warehouse();
        warehouse3.setCode(whsCode3);
        warehouse3.setName(whsCode3);
        opRstWarehouse = boRepository.saveWarehouse(warehouse3);
        if (opRstWarehouse.getError() != null) {
            throw opRstWarehouse.getError();
        }
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());
        //endregion
        // region 新建价格清单
        IOperationResult<IMaterialPriceList> opRstPriceList = null;
        MaterialPriceList materialPriceList = new MaterialPriceList();
        materialPriceList.setName(priceListName1);
        IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem.setItemCode(itemCode1);
        materialPriceItem.setPrice(120);
        IMaterialPriceItem materialPriceItem2 = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem2.setItemCode(itemCode2);
        materialPriceItem2.setPrice(1000);
        IMaterialPriceItem materialPriceItem3 = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem3.setItemCode(itemCode3);
        materialPriceItem3.setPrice(1000);
        opRstPriceList = boRepository.saveMaterialPriceList(materialPriceList);
        if (opRstPriceList.getError() != null) {
            throw opRstPriceList.getError();
        }
        assertEquals(opRstPriceList.getMessage(), 0, opRstPriceList.getResultCode());
        MaterialPriceList materialPriceList1 = new MaterialPriceList();
        int baseOnList1 = opRstPriceList.getResultObjects().firstOrDefault().getObjectKey();
        materialPriceList1.setName(priceListName2);
        materialPriceList1.setBasedOnList(baseOnList1);
        materialPriceList1.setFactor(1.2);
        IMaterialPriceItem materialPriceItem4 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem4.setItemCode(itemCode2);
        materialPriceItem4.setPrice(1500);
        IMaterialPriceItem materialPriceItem5 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem5.setItemCode(itemCode3);
        materialPriceItem5.setPrice(0);
        opRstPriceList = boRepository.saveMaterialPriceList(materialPriceList1);
        if (opRstPriceList.getError() != null) {
            throw opRstPriceList.getError();
        }
        int baseOnList = opRstPriceList.getResultObjects().firstOrDefault().getObjectKey();
        assertEquals(opRstPriceList.getMessage(), 0, opRstPriceList.getResultCode());
        // endregion
        //region新建收货单
        IOperationResult<IGoodsReceipt> opRstGoodsReceipt = null;
        IGoodsReceipt goodsReceipt1 = new GoodsReceipt();
        goodsReceipt1.setDocumentStatus(emDocumentStatus.RELEASED);
        IGoodsReceiptLine goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode1);
        goodsReceiptLine.setWarehouse(whsCode1);
        goodsReceiptLine.setQuantity(100);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode2);
        goodsReceiptLine.setWarehouse(whsCode1);
        goodsReceiptLine.setQuantity(200);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode3);
        goodsReceiptLine.setWarehouse(whsCode1);
        goodsReceiptLine.setQuantity(300);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode1);
        goodsReceiptLine.setWarehouse(whsCode2);
        goodsReceiptLine.setQuantity(1000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode2);
        goodsReceiptLine.setWarehouse(whsCode2);
        goodsReceiptLine.setQuantity(2000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode3);
        goodsReceiptLine.setWarehouse(whsCode2);
        goodsReceiptLine.setQuantity(3000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode1);
        goodsReceiptLine.setWarehouse(whsCode3);
        goodsReceiptLine.setQuantity(10000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode2);
        goodsReceiptLine.setWarehouse(whsCode3);
        goodsReceiptLine.setQuantity(20000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode3);
        goodsReceiptLine.setWarehouse(whsCode3);
        goodsReceiptLine.setQuantity(30000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        opRstGoodsReceipt = boRepository.saveGoodsReceipt(goodsReceipt1);
        assertEquals(opRstGoodsReceipt.getMessage(), 0, opRstGoodsReceipt.getResultCode());
        //endregion
        // region 测试查询
        IOperationResult<IProduct> opRstProduct = null;
        //region 查询物料1的所有库存和会员价的价格清单
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(itemCode1);
        condition.setOperation(ConditionOperation.EQUAL);
        condition = criteria.getConditions().create();
        condition.setAlias(Product.PRICELIST_NAME);
        condition.setValue(baseOnList);
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setRelationship(ConditionRelationship.AND);
        opRstProduct = boRepository.fetchProduct(criteria);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        assertEquals("库存查询错误", 11100, opRstProduct.getResultObjects().firstOrDefault().getOnHand().intValue());
        assertEquals("价格清单查询错误", 144, opRstProduct.getResultObjects().firstOrDefault().getPrice().intValue());

        //endregion
        //region 查询物料2的SH仓库的库存和进货价的价格清单
        ICriteria criteria1 = new Criteria();
        ICondition condition1 = criteria1.getConditions().create();
        condition1.setAlias(Material.PROPERTY_CODE.getName());
        condition1.setValue(itemCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(Product.WAREHOUSE_NAME);
        condition1.setValue(whsCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(Product.PRICELIST_NAME);
        condition1.setValue(baseOnList1);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        opRstProduct = boRepository.fetchProduct(criteria1);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        assertEquals("库存查询错误", 2000, opRstProduct.getResultObjects().firstOrDefault().getOnHand().intValue());
        assertEquals("价格清单查询错误", 1000, opRstProduct.getResultObjects().firstOrDefault().getPrice().intValue());
        //endregion
        // region 一个物料多个仓库 会员价
        ICriteria criteria2 = new Criteria();
        ICondition condition2 = criteria2.getConditions().create();
        condition2.setAlias(Material.PROPERTY_CODE.getName());
        condition2.setValue(itemCode1);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2 = criteria2.getConditions().create();
        condition2.setAlias(Product.PRICELIST_NAME);
        condition2.setValue(baseOnList);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2.setRelationship(ConditionRelationship.AND);
        condition2 = criteria2.getConditions().create();
        condition2.setAlias(Product.WAREHOUSE_NAME);
        condition2.setValue(whsCode1);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2.setRelationship(ConditionRelationship.AND);
        condition2.setBracketOpen(1);
        condition2 = criteria2.getConditions().create();
        condition2.setAlias(Product.WAREHOUSE_NAME);
        condition2.setValue(whsCode2);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2.setRelationship(ConditionRelationship.OR);
        condition2.setBracketClose(1);
        opRstProduct = boRepository.fetchProduct(criteria2);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        assertEquals("库存查询错误", 1100, opRstProduct.getResultObjects().firstOrDefault().getOnHand().intValue());
        assertEquals("价格清单查询错误", 144, opRstProduct.getResultObjects().firstOrDefault().getPrice().intValue());
        // endregion
        // region 多个物料 多个仓库 会员价
        ICriteria criteria3 = new Criteria();
        ICondition condition3 = criteria3.getConditions().create();
        condition3.setAlias(Material.PROPERTY_CODE.getName());
        condition3.setValue(itemCode1);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setBracketOpen(1);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(Material.PROPERTY_CODE.getName());
        condition3.setValue(itemCode2);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setRelationship(ConditionRelationship.OR);
        condition3.setBracketClose(1);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(Product.PRICELIST_NAME);
        condition3.setValue(baseOnList);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setRelationship(ConditionRelationship.AND);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(Product.WAREHOUSE_NAME);
        condition3.setValue(whsCode1);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setRelationship(ConditionRelationship.AND);
        condition3.setBracketOpen(1);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(Product.WAREHOUSE_NAME);
        condition3.setValue(whsCode2);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setRelationship(ConditionRelationship.OR);
        condition3.setBracketClose(1);
        opRstProduct = boRepository.fetchProduct(criteria3);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        assertEquals("库存查询错误", 1100, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode1)).getOnHand().intValue());
        assertEquals("价格清单查询错误", 144, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode1)).getPrice().intValue());
        assertEquals("库存查询错误", 2200, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode2)).getOnHand().intValue());
        assertEquals("价格清单查询错误", 1500, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode2)).getPrice().intValue());

        // endregion
        // region 物料组 一个仓库 进货价
        ICriteria criteria4 = new Criteria();
        ICondition condition4 = criteria4.getConditions().create();
        condition4.setAlias(Material.PROPERTY_GROUP.getName());
        condition4.setValue(materialGroupName);
        condition4.setOperation(ConditionOperation.EQUAL);
        condition4 = criteria4.getConditions().create();
        condition4.setAlias(Product.WAREHOUSE_NAME);
        condition4.setValue(whsCode1);
        condition4.setOperation(ConditionOperation.EQUAL);
        condition4.setRelationship(ConditionRelationship.AND);
        condition4 = criteria4.getConditions().create();
        condition4.setAlias(Product.PRICELIST_NAME);
        condition4.setValue(baseOnList1);
        condition4.setOperation(ConditionOperation.EQUAL);
        condition4.setRelationship(ConditionRelationship.AND);
        opRstProduct = boRepository.fetchProduct(criteria4);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        assertEquals("库存查询错误", null, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode1)));
        assertEquals("价格清单查询错误", 1000, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode2)).getPrice().intValue());
        assertEquals("库存查询错误", 200, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode2)).getOnHand().intValue());
        assertEquals("价格清单查询错误", 1000, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode3)).getPrice().intValue());
        assertEquals("库存查询错误", 300, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode3)).getOnHand().intValue());

        // endregion
        // region 物料组 多个仓库
        ICriteria criteria5 = new Criteria();
        ICondition condition5 = criteria5.getConditions().create();
        condition5.setAlias(Material.PROPERTY_GROUP.getName());
        condition5.setValue(materialGroupName);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(Product.WAREHOUSE_NAME);
        condition5.setValue(whsCode1);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setBracketOpen(1);
        condition5.setRelationship(ConditionRelationship.AND);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(Product.WAREHOUSE_NAME);
        condition5.setValue(whsCode3);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.OR);
        condition5.setBracketClose(1);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(Product.PRICELIST_NAME);
        condition5.setValue(baseOnList1);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.AND);
        opRstProduct = boRepository.fetchProduct(criteria5);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        assertEquals("库存查询错误", null, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode1)));
        assertEquals("价格清单查询错误", 1000, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode2)).getPrice().intValue());
        assertEquals("库存查询错误", 20200, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode2)).getOnHand().intValue());
        assertEquals("价格清单查询错误", 1000, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode3)).getPrice().intValue());
        assertEquals("库存查询错误", 30300, opRstProduct.getResultObjects().firstOrDefault(c -> c.getCode().equals(itemCode3)).getOnHand().intValue());

        // endregion
        //region 带括号查询
        // region 前台条件 带括号问题 移除左括号
        ICriteria criteria6 = new Criteria();
        ICondition condition6 = criteria6.getConditions().create();
        condition6.setAlias(Product.PRICELIST_NAME);
        condition6.setValue(15);
        condition6.setOperation(ConditionOperation.EQUAL);
        condition6.setBracketOpen(1);
        condition6 = criteria6.getConditions().create();
        condition6.setAlias(Material.PROPERTY_DELETED.getName());
        condition6.setValue("N");
        condition6.setOperation(ConditionOperation.EQUAL);
        condition6.setRelationship(ConditionRelationship.AND);
        condition6.setBracketClose(1);
        condition6 = criteria6.getConditions().create();
        condition6.setAlias(Material.PROPERTY_DOCENTRY.getName());
        condition6.setValue(162);
        condition6.setOperation(ConditionOperation.LESS_EQUAL);
        condition6.setRelationship(ConditionRelationship.AND);
        condition6.setBracketOpen(1);
        condition6.setBracketClose(1);
        opRstProduct = boRepository.fetchProduct(criteria6);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        // endregion
        // region 移除右括号
        ICriteria criteria7 = new Criteria();
        ICondition condition7 = criteria7.getConditions().create();
        condition7.setAlias(Material.PROPERTY_DELETED.getName());
        condition7.setValue("N");
        condition7.setOperation(ConditionOperation.EQUAL);
        condition7.setBracketOpen(1);
        condition7 = criteria7.getConditions().create();
        condition7.setAlias(Product.PRICELIST_NAME);
        condition7.setValue(15);
        condition7.setOperation(ConditionOperation.EQUAL);
        condition7.setRelationship(ConditionRelationship.AND);
        condition7.setBracketClose(1);
        condition7 = criteria7.getConditions().create();
        condition7.setAlias(Material.PROPERTY_DOCENTRY.getName());
        condition7.setValue(162);
        condition7.setOperation(ConditionOperation.LESS_EQUAL);
        condition7.setRelationship(ConditionRelationship.AND);
        condition7.setBracketOpen(1);
        condition7.setBracketClose(1);
        opRstProduct = boRepository.fetchProduct(criteria7);
        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        // endregion
        //endregion
        // region
//        ICriteria criteria8 = new Criteria();
//        criteria8.setResultCount(30);
//        ICondition condition8 = criteria8.getConditions().create();
//        condition8.setAlias(Material.PROPERTY_DELETED.getName());
//        condition8.setValue("N");
//        condition8.setOperation(ConditionOperation.EQUAL);
//        condition8 = criteria8.getConditions().create();
//        condition8.setAlias(Product.PRICELIST_NAME);
//        condition8.setValue(16);
//        condition8.setOperation(ConditionOperation.EQUAL);
//        condition8.setRelationship(ConditionRelationship.AND);
//        opRstProduct = boRepository.fetchProduct(criteria8);
//        assertEquals(opRstProduct.getMessage(), 0, opRstProduct.getResultCode());
        // endregion

    }


    /**
     * 测试物料价格
     *
     * @throws Exception
     */
    public void testFetchMaterialPrice() throws Exception {
        // 测试对象的保存和查询
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        String itemCode1 = String.format("A%s", DateTime.getNow().toString("ddmmss"));
        String itemCode2 = String.format("B%s", DateTime.getNow().toString("ddmmss"));
        String itemCode3 = String.format("C%s", DateTime.getNow().toString("ddmmss"));
        String itemCode4 = String.format("D%s", DateTime.getNow().toString("ddmmss"));

        String whsCode1 = String.format("BJ%s", DateTime.getNow().toString("ddmmss"));
        String whsCode2 = String.format("SH%s", DateTime.getNow().toString("ddmmss"));

        String priceListName1 = String.format("进货价%s", DateTime.getNow().toString("ddmmss"));
        String priceListName2 = String.format("会员价%s", DateTime.getNow().toString("ddmmss"));
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        //region 新建物料
        IOperationResult<IMaterial> opRstMterial = null;
        IMaterial material1 = new Material();
        material1.setCode(itemCode1);
        material1.setName(itemCode1);
        material1.setAvgPrice(99);
        material1.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material1);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        IMaterial material2 = new Material();
        material2.setCode(itemCode2);
        material2.setName(itemCode2);
        material2.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material2);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        IMaterial material3 = new Material();
        material3.setCode(itemCode3);
        material3.setName(itemCode3);
        material3.setAvgPrice(333);
        material3.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material3);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        IMaterial material4 = new Material();
        material4.setCode(itemCode4);
        material4.setName(itemCode4);
        material4.setAvgPrice(444);
        material4.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material4);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        //endregion
        //region 新建仓库
        IOperationResult<IWarehouse> opRstWarehouse = null;
        IWarehouse warehouse1 = new Warehouse();
        warehouse1.setCode(whsCode1);
        warehouse1.setName(whsCode1);
        opRstWarehouse = boRepository.saveWarehouse(warehouse1);
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());

        IWarehouse warehouse2 = new Warehouse();
        warehouse2.setCode(whsCode2);
        warehouse2.setName(whsCode2);
        opRstWarehouse = boRepository.saveWarehouse(warehouse2);
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());
        //endregion
        // region 新建价格清单
        IOperationResult<IMaterialPriceList> opRstPriceList = null;
        MaterialPriceList materialPriceList = new MaterialPriceList();
        materialPriceList.setName(priceListName1);
        IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem.setItemCode(itemCode1);
        materialPriceItem.setPrice(120);
        IMaterialPriceItem materialPriceItem2 = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem2.setItemCode(itemCode2);
        materialPriceItem2.setPrice(1000);
        IMaterialPriceItem materialPriceItem3 = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem3.setItemCode(itemCode3);
        materialPriceItem3.setPrice(1000);
        opRstPriceList = boRepository.saveMaterialPriceList(materialPriceList);

        assertEquals(opRstPriceList.getMessage(), 0, opRstPriceList.getResultCode());
        MaterialPriceList materialPriceList1 = new MaterialPriceList();
        int baseOnList1 = opRstPriceList.getResultObjects().firstOrDefault().getObjectKey();
        materialPriceList1.setName(priceListName2);
        materialPriceList1.setBasedOnList(baseOnList1);
        materialPriceList1.setFactor(1.2);
        IMaterialPriceItem materialPriceItem4 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem4.setItemCode(itemCode2);
        materialPriceItem4.setPrice(200);
        IMaterialPriceItem materialPriceItem5 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem5.setItemCode(itemCode3);
        materialPriceItem5.setPrice(0);
        opRstPriceList = boRepository.saveMaterialPriceList(materialPriceList1);

        int baseOnList = opRstPriceList.getResultObjects().firstOrDefault().getObjectKey();
        assertEquals(opRstPriceList.getMessage(), 0, opRstPriceList.getResultCode());
        // endregion

        // region 测试查询
        IOperationResult<MaterialPrice> opRstMaterialPrice = null;
        //region 查询物料1 会员价的价格清单 （子表不存在）
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(itemCode1);
        condition.setOperation(ConditionOperation.EQUAL);
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition.setValue(baseOnList);
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 144, opRstMaterialPrice.getResultObjects().firstOrDefault().getPrice().intValue());

        //endregion
        // region 查询物料2 会员价的价格清单 （存在子表）
        ICriteria criteria1 = new Criteria();
        ICondition condition1 = criteria1.getConditions().create();
        condition1.setAlias(Material.PROPERTY_CODE.getName());
        condition1.setValue(itemCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition1.setValue(baseOnList);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria1);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 200, opRstMaterialPrice.getResultObjects().firstOrDefault().getPrice().intValue());
        // endregion
        // region 查询不存在物料 -> 返回成功
        ICriteria criteria2 = new Criteria();
        ICondition condition2 = criteria2.getConditions().create();
        condition2.setAlias(Material.PROPERTY_CODE.getName());
        condition2.setValue("000$000");
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2 = criteria2.getConditions().create();
        condition2.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition2.setValue(baseOnList);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria2);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());

        // endregion
        // region 查询不存在价格清单 （主表不存在） ->  价格为物料的avaPrice
        ICriteria criteria3 = new Criteria();
        ICondition condition3 = criteria3.getConditions().create();
        condition3.setAlias(Material.PROPERTY_CODE.getName());
        condition3.setValue(itemCode1);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition3.setValue(0);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria3);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 99, opRstMaterialPrice.getResultObjects().firstOrDefault().getPrice().intValue());
        // endregion
        // region 查询没有价格清单的物料
        ICriteria criteria4 = new Criteria();
        ICondition condition4 = criteria4.getConditions().create();
        condition4.setAlias(Material.PROPERTY_CODE.getName());
        condition4.setValue(itemCode4);
        condition4.setOperation(ConditionOperation.EQUAL);
        condition4 = criteria4.getConditions().create();
        condition4.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition4.setValue(baseOnList);
        condition4.setOperation(ConditionOperation.EQUAL);
        condition4.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria4);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 444, opRstMaterialPrice.getResultObjects().firstOrDefault().getPrice().intValue());
        // endregion
        // region 多个物料的价格清单
        ICriteria criteria5 = new Criteria();
        ICondition condition5 = criteria5.getConditions().create();
        condition5.setAlias(Material.PROPERTY_CODE.getName());
        condition5.setValue(itemCode1);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setBracketOpen(1);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(Material.PROPERTY_CODE.getName());
        condition5.setValue(itemCode2);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.OR);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(Material.PROPERTY_CODE.getName());
        condition5.setValue(itemCode3);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.OR);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(Material.PROPERTY_CODE.getName());
        condition5.setValue(itemCode4);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.OR);
        condition5.setBracketClose(1);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition5.setValue(baseOnList);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria5);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 144, opRstMaterialPrice.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode1)).getPrice().intValue());
        assertEquals("价格清单查询错误", 200, opRstMaterialPrice.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode2)).getPrice().intValue());
        assertEquals("价格清单查询错误", 0, opRstMaterialPrice.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode3)).getPrice().intValue());
        assertEquals("价格清单查询错误", 444, opRstMaterialPrice.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode4)).getPrice().intValue());

        // endregion
        //region 查询物料2 进货价的价格清单
        ICriteria criteria10 = new Criteria();
        ICondition condition10 = criteria10.getConditions().create();
        condition10.setAlias(Material.PROPERTY_CODE.getName());
        condition10.setValue(itemCode2);
        condition10.setOperation(ConditionOperation.EQUAL);
        condition10 = criteria10.getConditions().create();
        condition10.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition10.setValue(baseOnList1);
        condition10.setOperation(ConditionOperation.EQUAL);
        condition10.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria10);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 1000, opRstMaterialPrice.getResultObjects().firstOrDefault().getPrice().intValue());
        //endregion
        // region 查询物料3 会员价的价格清单（子表存在且价格为0）
        ICriteria criteria9 = new Criteria();
        ICondition condition9 = criteria9.getConditions().create();
        condition9.setAlias(Material.PROPERTY_CODE.getName());
        condition9.setValue(itemCode3);
        condition9.setOperation(ConditionOperation.EQUAL);
        condition9 = criteria9.getConditions().create();
        condition9.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition9.setValue(baseOnList);
        condition9.setOperation(ConditionOperation.EQUAL);
        condition9.setRelationship(ConditionRelationship.AND);
        opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria9);
        assertEquals(opRstMaterialPrice.getMessage(), 0, opRstMaterialPrice.getResultCode());
        assertEquals("价格清单查询错误", 0, opRstMaterialPrice.getResultObjects().firstOrDefault().getPrice().intValue());
        // endregion
        // endregion
    }

    /**
     * 测试物料库存数量
     *
     * @throws Exception
     */
    public void testFetchMaterialQuantity() throws Exception {
        // 测试对象的保存和查询
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        String materialGroupName = String.format("G%s", DateTime.getNow().toString("ddmmss"));

        String itemCode1 = String.format("A%s", DateTime.getNow().toString("ddmmss"));
        String itemCode2 = String.format("B%s", DateTime.getNow().toString("ddmmss"));
        String itemCode3 = String.format("C%s", DateTime.getNow().toString("ddmmss"));

        String whsCode1 = String.format("BJ%s", DateTime.getNow().toString("ddmmss"));
        String whsCode2 = String.format("SH%s", DateTime.getNow().toString("ddmmss"));
        String whsCode3 = String.format("GZ%s", DateTime.getNow().toString("ddmmss"));

        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // region 新建物料组
        IOperationResult<IMaterialGroup> opRstMterialGroup = null;
        IMaterialGroup materialGroup = new MaterialGroup();
        materialGroup.setCode(materialGroupName);
        materialGroup.setName(materialGroupName);
        materialGroup.setActivated(emYesNo.YES);
        opRstMterialGroup = boRepository.saveMaterialGroup(materialGroup);
        assertEquals(opRstMterialGroup.getMessage(), 0, opRstMterialGroup.getResultCode());
        // endregion
        //region 新建物料
        IOperationResult<IMaterial> opRstMterial = null;
        IMaterial material1 = new Material();
        material1.setCode(itemCode1);
        material1.setName(itemCode1);
        material1.setGroup(materialGroupName);

        material1.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material1);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        IMaterial material2 = new Material();
        material2.setCode(itemCode2);
        material2.setName(itemCode2);
        material2.setGroup(materialGroupName);
        material2.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material2);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        IMaterial material3 = new Material();
        material3.setCode(itemCode3);
        material3.setName(itemCode3);
        material3.setInventoryItem(emYesNo.YES);
        material3.setGroup(materialGroupName);
        opRstMterial = boRepository.saveMaterial(material3);
        assertEquals(opRstMterial.getMessage(), 0, opRstMterial.getResultCode());
        //endregion
        //region 新建仓库
        IOperationResult<IWarehouse> opRstWarehouse = null;
        IWarehouse warehouse1 = new Warehouse();
        warehouse1.setCode(whsCode1);
        warehouse1.setName(whsCode1);
        opRstWarehouse = boRepository.saveWarehouse(warehouse1);
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());

        IWarehouse warehouse2 = new Warehouse();
        warehouse2.setCode(whsCode2);
        warehouse2.setName(whsCode2);
        opRstWarehouse = boRepository.saveWarehouse(warehouse2);
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());

        IWarehouse warehouse3 = new Warehouse();
        warehouse3.setCode(whsCode3);
        warehouse3.setName(whsCode3);
        opRstWarehouse = boRepository.saveWarehouse(warehouse3);
        assertEquals(opRstWarehouse.getMessage(), 0, opRstWarehouse.getResultCode());
        //endregion
        //region新建收货单
        IOperationResult<IGoodsReceipt> opRstGoodsReceipt = null;
        IGoodsReceipt goodsReceipt1 = new GoodsReceipt();
        goodsReceipt1.setDocumentStatus(emDocumentStatus.RELEASED);
        IGoodsReceiptLine goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode1);
        goodsReceiptLine.setWarehouse(whsCode1);
        goodsReceiptLine.setQuantity(100);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode2);
        goodsReceiptLine.setWarehouse(whsCode1);
        goodsReceiptLine.setQuantity(200);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode3);
        goodsReceiptLine.setWarehouse(whsCode1);
        goodsReceiptLine.setQuantity(300);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);

        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode1);
        goodsReceiptLine.setWarehouse(whsCode2);
        goodsReceiptLine.setQuantity(1000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode2);
        goodsReceiptLine.setWarehouse(whsCode2);
        goodsReceiptLine.setQuantity(2000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode3);
        goodsReceiptLine.setWarehouse(whsCode2);
        goodsReceiptLine.setQuantity(3000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);

        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode1);
        goodsReceiptLine.setWarehouse(whsCode3);
        goodsReceiptLine.setQuantity(10000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode2);
        goodsReceiptLine.setWarehouse(whsCode3);
        goodsReceiptLine.setQuantity(20000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        goodsReceiptLine = goodsReceipt1.getGoodsReceiptLines().create();
        goodsReceiptLine.setItemCode(itemCode3);
        goodsReceiptLine.setWarehouse(whsCode3);
        goodsReceiptLine.setQuantity(30000);
        goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
        opRstGoodsReceipt = boRepository.saveGoodsReceipt(goodsReceipt1);
        assertEquals(opRstGoodsReceipt.getMessage(), 0, opRstGoodsReceipt.getResultCode());

        //endregion

        // region 测试查询
        IOperationResult<MaterialQuantity> opRstMaterialQuantity = null;
        //region 一个仓库的所有库存
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(itemCode1);
        condition.setOperation(ConditionOperation.EQUAL);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 11100, opRstMaterialQuantity.getResultObjects().firstOrDefault().getOnHand().intValue());
        // endregion
        // region 一个物料一个仓库
        ICriteria criteria1 = new Criteria();
        ICondition condition1 = criteria1.getConditions().create();
        condition1.setAlias(Material.PROPERTY_CODE.getName());
        condition1.setValue(itemCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition1.setValue(whsCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria1);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 2000, opRstMaterialQuantity.getResultObjects().firstOrDefault().getOnHand().intValue());
        // endregion
        // region 查询一个物料一个仓库的库存
        ICriteria criteria2 = new Criteria();
        ICondition condition2 = criteria2.getConditions().create();
        condition2.setAlias(Material.PROPERTY_CODE.getName());
        condition2.setValue(itemCode2);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2 = criteria2.getConditions().create();
        condition2.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition2.setValue(whsCode1);
        condition2.setOperation(ConditionOperation.EQUAL);
        condition2.setRelationship(ConditionRelationship.AND);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria2);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 200, opRstMaterialQuantity.getResultObjects().firstOrDefault().getOnHand().intValue());
        // endregion*
        // region 查询一个物料多个仓库的库存
        ICriteria criteria3 = new Criteria();
        ICondition condition3 = criteria3.getConditions().create();
        condition3.setAlias(Material.PROPERTY_CODE.getName());
        condition3.setValue(itemCode2);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition3.setValue(whsCode1);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setBracketOpen(1);
        condition3.setRelationship(ConditionRelationship.AND);
        condition3 = criteria3.getConditions().create();
        condition3.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition3.setValue(whsCode2);
        condition3.setOperation(ConditionOperation.EQUAL);
        condition3.setRelationship(ConditionRelationship.OR);
        condition3.setBracketClose(1);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria3);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 2200, opRstMaterialQuantity.getResultObjects().firstOrDefault().getOnHand().intValue());
        // endregion
        // region 查询物料组的 所有库存
        ICriteria criteria4 = new Criteria();
        ICondition condition4 = criteria4.getConditions().create();
        condition4.setAlias(Material.PROPERTY_GROUP.getName());
        condition4.setValue(materialGroupName);
        condition4.setOperation(ConditionOperation.EQUAL);

        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria4);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 11100, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode1)).getOnHand().intValue());
        assertEquals("库存查询错误", 22200, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode2)).getOnHand().intValue());
        assertEquals("库存查询错误", 33300, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode3)).getOnHand().intValue());
        // endregion
        // region 查询物料组的  多个仓库的库存
        ICriteria criteria5 = new Criteria();
        ICondition condition5 = criteria5.getConditions().create();
        condition5.setAlias(Material.PROPERTY_GROUP.getName());
        condition5.setValue(materialGroupName);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition5.setValue(whsCode1);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setBracketOpen(1);
        condition5.setRelationship(ConditionRelationship.AND);
        condition5 = criteria5.getConditions().create();
        condition5.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition5.setValue(whsCode3);
        condition5.setOperation(ConditionOperation.EQUAL);
        condition5.setRelationship(ConditionRelationship.OR);
        condition5.setBracketClose(1);

        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria5);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 10100, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode1)).getOnHand().intValue());
        assertEquals("库存查询错误", 20200, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode2)).getOnHand().intValue());
        assertEquals("库存查询错误", 30300, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode3)).getOnHand().intValue());
        // endregion
        // region 查询不存在物料 -> 返回成功
        ICriteria criteria6 = new Criteria();
        ICondition condition6 = criteria6.getConditions().create();
        condition6.setAlias(Material.PROPERTY_CODE.getName());
        condition6.setValue("000_000_000");
        condition6.setOperation(ConditionOperation.EQUAL);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria6);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        // endregion
        // region 多个物料查询条件
        ICriteria criteria7 = new Criteria();
        ICondition condition7 = criteria7.getConditions().create();
        condition7.setAlias(Material.PROPERTY_CODE.getName());
        condition7.setValue(itemCode1);
        condition7.setOperation(ConditionOperation.EQUAL);
        condition7 = criteria7.getConditions().create();
        condition7.setAlias(Material.PROPERTY_CODE.getName());
        condition7.setValue(itemCode2);
        condition7.setOperation(ConditionOperation.EQUAL);
        condition7.setRelationship(ConditionRelationship.OR);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria7);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 11100, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode1)).getOnHand().intValue());
        assertEquals("库存查询错误", 22200, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode2)).getOnHand().intValue());
        // endregion
        // region 多个物料 多个仓库
        ICriteria criteria8 = new Criteria();
        criteria8.setResultCount(30);
        ICondition condition8 = criteria8.getConditions().create();
        condition8.setAlias(Material.PROPERTY_CODE.getName());
        condition8.setValue(itemCode1);
        condition8.setOperation(ConditionOperation.EQUAL);
        condition8.setBracketOpen(1);
        condition8 = criteria8.getConditions().create();
        condition8.setAlias(Material.PROPERTY_CODE.getName());
        condition8.setValue(itemCode2);
        condition8.setOperation(ConditionOperation.EQUAL);
        condition8.setRelationship(ConditionRelationship.OR);
        condition8.setBracketClose(1);
        condition8 = criteria8.getConditions().create();
        condition8.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition8.setValue(whsCode1);
        condition8.setOperation(ConditionOperation.EQUAL);
        condition8.setBracketOpen(1);
        condition8.setRelationship(ConditionRelationship.AND);
        condition8 = criteria8.getConditions().create();
        condition8.setAlias(MaterialQuantity.WAREHOUSE_NAME);
        condition8.setValue(whsCode2);
        condition8.setOperation(ConditionOperation.EQUAL);
        condition8.setRelationship(ConditionRelationship.OR);
        condition8.setBracketClose(1);
        opRstMaterialQuantity = boRepository.fetchMaterialQuantity(criteria8);
        assertEquals(opRstMaterialQuantity.getMessage(), 0, opRstMaterialQuantity.getResultCode());
        assertEquals("库存查询错误", 1100, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode1)).getOnHand().intValue());
        assertEquals("库存查询错误", 2200, opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(itemCode2)).getOnHand().intValue());
        // endregion
        // endregion

    }

    public void testFetchMaterialPriceException() throws Exception{
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        ICriteria criteria1 = new Criteria();
        ICondition condition1 = criteria1.getConditions().create();
        condition1.setAlias(Material.PROPERTY_CODE.getName());
        condition1.setValue("A203916");
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition1.setValue("SC");
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        IOperationResult<MaterialPrice> opRstMaterialPrice = boRepository.fetchMaterialPrice(criteria1);
        assertEquals(opRstMaterialPrice.getMessage(), -1, opRstMaterialPrice.getResultCode());
    }
}