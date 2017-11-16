package org.colorcoding.ibas.materials.test.bo;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

import junit.framework.TestCase;

/**
 * 仓库 测试
 * 
 */
public class testWarehouse extends TestCase {
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
	public void testBasicItems() throws Exception {
		Warehouse bo = new Warehouse();
		// 测试属性赋值
		bo.setCode("SHKJ");
		bo.setName("上海科捷");

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveWarehouse(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		Warehouse boSaved = (Warehouse) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchWarehouse(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

}
