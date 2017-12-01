package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

/**
 * 仓库日记账 测试
 * 
 */
public class testMaterialInventoryJournal extends TestCase {
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
		MaterialInventoryJournal bo = new MaterialInventoryJournal();
		// 测试属性赋值
		bo.setItemCode("S1000011");
		bo.setWarehouse("BJKJ");
		bo.setQuantity(100);
		bo.setDirection(emDirection.IN);
		bo.setDeliveryDate(DateTime.getToday());
		bo.setDocumentDate(DateTime.getToday());
		bo.setBaseDocumentEntry(1);

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveMaterialInventoryJournal(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		MaterialInventoryJournal boSaved = (MaterialInventoryJournal) operationResult.getResultObjects()
				.firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchMaterialInventoryJournal(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

}
