package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.materials.data.*;
import org.colorcoding.ibas.materials.bo.material.*;
import org.colorcoding.ibas.materials.repository.*;

/**
* 物料 测试
* 
*/
public class testMaterial extends TestCase {
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
        Material bo = new Material();
        // 测试属性赋值
        bo.setCode(String.format("A%s",DateTime.getNow().toString("yyyyMMddhhmmss")));
        bo.setName("喜之郎果肉果冻");
        bo.setBarCode("A10000011");

        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveMaterial(bo);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        Material boSaved = (Material)operationResult.getResultObjects().firstOrDefault();


        // 测试查询
        criteria = boSaved.getCriteria();
        criteria.setResultCount(10);
        operationResult = boRepository.fetchMaterial(null);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }

}
