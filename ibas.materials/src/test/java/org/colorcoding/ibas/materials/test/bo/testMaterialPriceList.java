package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

public class testMaterialPriceList extends TestCase {
    /**
     * 获取连接口令
     */
    String getToken() {
        return "68fc6bac014d06ad94c5734116487cff";
    }
    String itemCode = "A100001";

    /**
     * 基本项目测试
     * @throws Exception
     */
    public void testBasicItems() throws Exception {

        MaterialPriceList bo = new MaterialPriceList();
        // 测试属性赋值
        bo.setName("促销价");
        bo.setFactor(0.8);
        IMaterialPriceItem priceItem = bo.getMaterialPriceItems().create();
        priceItem.setItemCode(itemCode);
        priceItem.setPrice(12);
        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveMaterialPriceList(bo);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        MaterialPriceList boSaved = (MaterialPriceList)operationResult.getResultObjects().firstOrDefault();


        // 测试查询
        IChildCriteria childCriteria;
        ICondition condition;
        criteria = boSaved.getCriteria();
        childCriteria = criteria.getChildCriterias().create();
        childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
        childCriteria.setOnlyHasChilds(false);

        condition = childCriteria.getConditions().create();
        condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(itemCode);

        criteria.setResultCount(10);
        // operationResult = boRepository.fetchMaterialPriceListFinal(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        assertEquals(operationResult.getMessage(), ((MaterialPriceList) operationResult.getResultObjects().firstOrDefault()).getMaterialPriceItems().firstOrDefault().getPrice().intValue(), 12);


    }

    public  void testChildFetchPriceList() throws  Exception{
        // 添加
    }
}
