package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IProduct;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
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
        return "68fc6bac014d06ad94c5734116487cff";
    }


    /**
     * 基本价格清单
     *
     * @throws Exception
     */
    public void testMaterialPriceList() throws Exception {

        // 测试对象的保存和查询
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        //设置用户口令
        boRepository.setUserToken(this.getToken());
        // 价格清单名称、物料名称、仓库名称
        String priceListName1 = String.format("进货价%s", DateTime.getNow().toString("ddmmss"));
        String priceListName2 = String.format("会员价%s", DateTime.getNow().toString("ddmmss"));

        String itemCode1 = String.format("A%s", DateTime.getNow().toString("ddmmss"));
        String itemCode2 = String.format("B%s", DateTime.getNow().toString("ddmmss"));
        String itemCode3 = String.format("C%s", DateTime.getNow().toString("ddmmss"));

        String whsCode1 = String.format("BJ%s", DateTime.getNow().toString("ddmmss"));
        String whsCode2 = String.format("SH%s", DateTime.getNow().toString("ddmmss"));
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
        material2.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material2);
        if (opRstMterial.getError() != null) {
            throw opRstMterial.getError();
        }
        assertEquals(opRstMterial.getMessage(), opRstMterial.getResultCode(), 0);
        IMaterial material3 = new Material();
        material3.setCode(itemCode3);
        material3.setName(itemCode3);
        material3.setInventoryItem(emYesNo.YES);
        opRstMterial = boRepository.saveMaterial(material3);
        if (opRstMterial.getError() != null) {
            throw opRstMterial.getError();
        }
        assertEquals(opRstMterial.getMessage(), opRstMterial.getResultCode(), 0);
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
        assertEquals(opRstWarehouse.getMessage(), opRstWarehouse.getResultCode(), 0);

        IWarehouse warehouse2 = new Warehouse();
        warehouse2.setCode(whsCode2);
        warehouse2.setName(whsCode2);
        opRstWarehouse = boRepository.saveWarehouse(warehouse2);
        if (opRstWarehouse.getError() != null) {
            throw opRstWarehouse.getError();
        }
        assertEquals(opRstWarehouse.getMessage(), opRstWarehouse.getResultCode(), 0);
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
        assertEquals(opRstPriceList.getMessage(), opRstPriceList.getResultCode(), 0);
        MaterialPriceList materialPriceList1 = new MaterialPriceList();
        int baseOnList1 = opRstPriceList.getResultObjects().firstOrDefault().getObjectKey();
        materialPriceList1.setName(priceListName2);
        materialPriceList1.setBasedOnList(baseOnList1);
        materialPriceList1.setFactor(1.2);
        IMaterialPriceItem materialPriceItem1 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem1.setItemCode(itemCode1);
        IMaterialPriceItem materialPriceItem4 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem4.setItemCode(itemCode2);
        IMaterialPriceItem materialPriceItem5 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem5.setItemCode(itemCode3);
        opRstPriceList = boRepository.saveMaterialPriceList(materialPriceList1);
        if (opRstPriceList.getError() != null) {
            throw opRstPriceList.getError();
        }
        int baseOnList = opRstPriceList.getResultObjects().firstOrDefault().getObjectKey();
        assertEquals(opRstPriceList.getMessage(), opRstPriceList.getResultCode(), 0);
        // endregion
        //region新建收货单
        IOperationResult<IGoodsReceipt> opRstGoodsReceipt = null;
        IGoodsReceipt goodsReceipt1 = new GoodsReceipt();
        goodsReceipt1.setDocumentStatus(emDocumentStatus.RELEASED);
        IGoodsReceiptLine goodsreceiptline = goodsReceipt1.getGoodsReceiptLines().create();
        goodsreceiptline.setItemCode(itemCode1);
        goodsreceiptline.setWarehouse(whsCode1);
        goodsreceiptline.setQuantity(100);
        goodsreceiptline.setLineStatus(emDocumentStatus.RELEASED);
        goodsreceiptline = goodsReceipt1.getGoodsReceiptLines().create();
        goodsreceiptline.setItemCode(itemCode2);
        goodsreceiptline.setWarehouse(whsCode1);
        goodsreceiptline.setQuantity(200);
        goodsreceiptline.setLineStatus(emDocumentStatus.RELEASED);
        goodsreceiptline = goodsReceipt1.getGoodsReceiptLines().create();
        goodsreceiptline.setItemCode(itemCode3);
        goodsreceiptline.setWarehouse(whsCode1);
        goodsreceiptline.setQuantity(300);
        goodsreceiptline.setLineStatus(emDocumentStatus.RELEASED);
        opRstGoodsReceipt = boRepository.saveGoodsReceipt(goodsReceipt1);
        if (opRstGoodsReceipt.getError() != null) {
            throw opRstGoodsReceipt.getError();
        }
        assertEquals(opRstGoodsReceipt.getMessage(), opRstGoodsReceipt.getResultCode(), 0);
        IGoodsReceipt goodsReceipt2 = new GoodsReceipt();
        goodsReceipt2.setDocumentStatus(emDocumentStatus.RELEASED);
        IGoodsReceiptLine goodsreceiptline2 = goodsReceipt2.getGoodsReceiptLines().create();
        goodsreceiptline2.setItemCode(itemCode1);
        goodsreceiptline2.setWarehouse(whsCode2);
        goodsreceiptline2.setQuantity(1000);
        goodsreceiptline2.setLineStatus(emDocumentStatus.RELEASED);
        goodsreceiptline2 = goodsReceipt2.getGoodsReceiptLines().create();
        goodsreceiptline2.setItemCode(itemCode2);
        goodsreceiptline2.setWarehouse(whsCode2);
        goodsreceiptline2.setQuantity(2000);
        goodsreceiptline2.setLineStatus(emDocumentStatus.RELEASED);
        goodsreceiptline2 = goodsReceipt2.getGoodsReceiptLines().create();
        goodsreceiptline2.setItemCode(itemCode3);
        goodsreceiptline2.setWarehouse(whsCode2);
        goodsreceiptline2.setQuantity(3000);
        goodsreceiptline2.setLineStatus(emDocumentStatus.RELEASED);
        opRstGoodsReceipt = boRepository.saveGoodsReceipt(goodsReceipt2);
        if (opRstGoodsReceipt.getError() != null) {
            throw opRstGoodsReceipt.getError();
        }
        assertEquals(opRstGoodsReceipt.getMessage(), opRstGoodsReceipt.getResultCode(), 0);
        //endregion

        //region 测试查询
        IOperationResult<IProduct> opRstProduct = null;
        //region 查询物料1的所有库存和会员价的价格清单
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
        opRstProduct = boRepository.fetchProduct(criteria);
        if (opRstProduct.getError() != null) {
            throw opRstProduct.getError();
        }
        assertEquals(opRstProduct.getMessage(), opRstProduct.getResultCode(), 0);
        assertEquals("库存查询错误", opRstProduct.getResultObjects().firstOrDefault().getOnHand().intValue(), 1100);
        assertEquals("价格清单查询错误", opRstProduct.getResultObjects().firstOrDefault().getPrice().intValue(), 144);

        //endregion
        //region 查询物料2的SH仓库的库存和进货价的价格清单
        ICriteria criteria1 = new Criteria();
        ICondition condition1 = criteria1.getConditions().create();
        condition1.setAlias(Material.PROPERTY_CODE.getName());
        condition1.setValue(itemCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
        condition1.setValue(whsCode2);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        condition1 = criteria1.getConditions().create();
        condition1.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition1.setValue(baseOnList1);
        condition1.setOperation(ConditionOperation.EQUAL);
        condition1.setRelationship(ConditionRelationship.AND);
        opRstProduct = boRepository.fetchProduct(criteria1);
        if (opRstProduct.getError() != null) {
            throw opRstProduct.getError();
        }
        assertEquals(opRstProduct.getMessage(), opRstProduct.getResultCode(), 0);
        assertEquals("库存查询错误", 2000, opRstProduct.getResultObjects().firstOrDefault().getOnHand().intValue());
        assertEquals("价格清单查询错误", 1000, opRstProduct.getResultObjects().firstOrDefault().getPrice().intValue());
        //endregion


    }

    /**
     * 测试物料价格
     *
     * @throws Exception
     */
    public void testMaterialPrice() throws Exception {

    }

    /**
     * 测试物料库存数量
     *
     * @throws Exception
     */
    public void testMaterialQuantity() throws Exception {

    }
}
