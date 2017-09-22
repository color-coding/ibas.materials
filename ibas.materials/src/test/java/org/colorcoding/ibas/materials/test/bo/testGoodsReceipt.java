package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.materials.data.*;
import org.colorcoding.ibas.materials.bo.goodsreceipt.*;
import org.colorcoding.ibas.materials.repository.*;

/**
* 库存收货 测试
* 
*/
public class testGoodsReceipt extends TestCase {
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
        GoodsReceipt bo = new GoodsReceipt();
        // 测试属性赋值

        // 测试库存收货-行
        IGoodsReceiptLine goodsreceiptline = bo.getGoodsReceiptLines().create();
        // 测试属性赋值
        goodsreceiptline.setItemCode("1000001");
        goodsreceiptline.setQuantity(1000);
        goodsreceiptline.setWarehouse("BJKJ");


        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveGoodsReceipt(bo);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        GoodsReceipt boSaved = (GoodsReceipt)operationResult.getResultObjects().firstOrDefault();


        // 测试查询
        criteria = boSaved.getCriteria();
        criteria.setResultCount(10);
        operationResult = boRepository.fetchGoodsReceipt(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }

}
