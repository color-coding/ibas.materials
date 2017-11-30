package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

/**
 * @author Fancy
 * @date 2017/11/29
 */
public class testMaterialSerial extends TestCase {
    /**
     * 获取连接口令
     */
    String getToken() {
        return OrganizationFactory.SYSTEM_USER.getToken();
    }

    /**
     * 基本项目测试
     *
     * @throws Exception
     */
    public void testBasicItems() throws Exception {
        MaterialSerial bo = new MaterialSerial();
        // 测试属性赋值
        bo.setSerialCode(String.format("%s", DateTime.getNow().toString("yyyyMMddhhmmss")));


        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        // 设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveMaterialSerial(bo);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        MaterialSerial boSaved = (MaterialSerial) operationResult.getResultObjects().firstOrDefault();

        // 测试查询
        criteria = boSaved.getCriteria();
        criteria.setNoChilds(true);
        criteria.setResultCount(10);
        operationResult = boRepository.fetchMaterialSerial(null);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }
}
