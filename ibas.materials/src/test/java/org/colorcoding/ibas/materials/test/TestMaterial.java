package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

import junit.framework.TestCase;

/**
 * 物料 测试
 * 
 */
public class TestMaterial extends TestCase {
	/**
	 * 获取连接口令
	 */
	String getToken() {
		return OrganizationFactory.SYSTEM_USER.getToken();
	}

	public IMaterial create() {
		IMaterial material = new Material();
		material.setCode(String.format("TT%s", DateTime.getNow().getTime()));
		material.setName(material.getCode());
		material.setInventoryUOM("个");
		return material;
	}

	public void checkMaterial(String code, BigDecimal quantity) throws InvalidTokenException {
		ICriteria criteria = null;
		ICondition condition = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		boRepository.setUserToken(this.getToken());
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(code);
		IOperationResult<IMaterial> opRsltMaterial = boRepository.fetchMaterial(criteria);
		assertEquals(opRsltMaterial.getMessage(), opRsltMaterial.getResultCode(), 0);
		IMaterial newMaterial = opRsltMaterial.getResultObjects().firstOrDefault();
		assertEquals("material onhand error", quantity.compareTo(newMaterial.getOnHand()), 0);
	}

	/**
	 * 基本项目测试
	 * 
	 * @throws Exception
	 */
	public void testBasicItems() throws Exception {
		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		IMaterial bo = this.create();
		// 测试保存
		operationResult = boRepository.saveMaterial(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		Material boSaved = (Material) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchMaterial(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

}
