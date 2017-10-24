package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

public class testMaterialEx extends TestCase {
    /**
     * 获取连接口令
     */
    String getToken() {
        return "68fc6bac014d06ad94c5734116487cff";
    }

    /**
     * 基本项目测试
     * @throws Exception
     */
    public void testBasicItems() throws Exception {


        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = new Criteria();
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        //设置用户口令
        boRepository.setUserToken(this.getToken());



        // 测试查询
        //ICondition   condition = criteria.getConditions().create();

        operationResult = boRepository.fetchMaterialEx(null);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }
}
