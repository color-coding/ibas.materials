package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
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
        return OrganizationFactory.SYSTEM_USER.getToken();
    }

    String itemCode = String.format("A%s", DateTime.getNow().toString("ddmmss"));

    /**
     * 基本项目测试
     *
     * @throws Exception
     */
    public void testBasicItems() throws Exception {

        MaterialPriceList bo = new MaterialPriceList();
        // 测试属性赋值
        bo.setName(String.format("双十一促销价%s", DateTime.getNow().toString("ddmmss")));
        bo.setFactor(1.1);
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
        MaterialPriceList boSaved = (MaterialPriceList) operationResult.getResultObjects().firstOrDefault();


        // 测试查询

        criteria = boSaved.getCriteria();
        criteria.setResultCount(10);
        operationResult = boRepository.fetchMaterialPriceList(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

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
        operationResult = boRepository.fetchMaterialPriceList(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        assertEquals(operationResult.getMessage(), 12, ((MaterialPriceList) operationResult.getResultObjects().firstOrDefault()).getMaterialPriceItems().firstOrDefault().getPrice().intValue());
    }
}
