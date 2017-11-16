package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
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
     * 基本项目测试
     *
     * @throws Exception
     */
    public void testMaterialPriceList() throws Exception {

        // 测试对象的保存和查询
        
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 新建物料
        // 新建价格清单
        MaterialPriceList materialPriceList = new MaterialPriceList();
        materialPriceList.setName("进货价");
        IMaterialPriceItem materialPriceItem = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem.setItemCode("A100001");
        materialPriceItem.setPrice(120);
        IMaterialPriceItem materialPriceItem2 = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem2.setItemCode("A100002");
        materialPriceItem2.setPrice(1000);
        IMaterialPriceItem materialPriceItem3 = materialPriceList.getMaterialPriceItems().create();
        materialPriceItem3.setItemCode("A100003");
        materialPriceItem3.setPrice(1000);
        boRepository.saveMaterialPriceList(materialPriceList);
        MaterialPriceList materialPriceList1 = new MaterialPriceList();
        materialPriceList1.setName("会员价");
        materialPriceList1.setBasedOnList(1);
        materialPriceList1.setFactor(1.2);
        IMaterialPriceItem materialPriceItem1 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem1.setItemCode("A100002");
        IMaterialPriceItem materialPriceItem4 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem4.setItemCode("A100001");
        IMaterialPriceItem materialPriceItem5 = materialPriceList1.getMaterialPriceItems().create();
        materialPriceItem5.setItemCode("A100003");
        boRepository.saveMaterialPriceList(materialPriceList1);

        // 测试查询
       // ICondition condition = criteria.getConditions().create();
//        condition.setAlias("Code");
//        condition.setValue("B1509432307705");
//        condition.setOperation(ConditionOperation.EQUAL);
//        condition = criteria.getConditions().create();
//        condition.setAlias(MaterialEx.PROPERTY_WAREHOUSE.getName());
//        condition.setValue("B314507");
//        condition.setOperation(ConditionOperation.EQUAL);
//        condition.setRelationship(ConditionRelationship.AND);
//        condition = criteria.getConditions().create();
//        condition.setAlias(MaterialEx.PROPERTY_PRICELISTNAME.getName());
//        condition.setValue("大客户");
//        condition.setOperation(ConditionOperation.EQUAL);
//        condition.setRelationship(ConditionRelationship.AND);

        // operationResult = boRepository.fetchMaterialEx(criteria);
       // assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


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
