package org.colorcoding.ibas.materials.test.bo;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

import junit.framework.TestCase;

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

	public void checkMaterialInventory(String itemCode, String warehose, Decimal quantity)
			throws InvalidTokenException {
		ICriteria criteria = null;
		ICondition condition = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		boRepository.setUserToken(this.getToken());
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition.setValue(warehose);
		IOperationResult<IMaterialInventory> opRsltMaterialInventory = boRepository.fetchMaterialInventory(criteria);
		assertEquals(opRsltMaterialInventory.getMessage(), opRsltMaterialInventory.getResultCode(), 0);
		IMaterialInventory newMaterialInventory = opRsltMaterialInventory.getResultObjects().firstOrDefault();
		assertEquals("material inventory onhand error", quantity.compareTo(newMaterialInventory.getOnHand()), 0);
	}

	public void checkMaterial(String code, Decimal quantity) throws InvalidTokenException {
		new testMaterial().checkMaterial(code, quantity);
	}

	/**
	 * 基本项目测试
	 * 
	 * @throws Exception
	 */
	public void testBasicItems() throws Exception {
		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		IMaterial material = new testMaterial().create();
		operationResult = boRepository.saveMaterial(material);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IWarehouse warehouse = new testWarehouse().create();
		operationResult = boRepository.saveWarehouse(warehouse);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		IMaterialInventoryJournal bo = new MaterialInventoryJournal();
		// 测试入库
		bo.setItemCode(material.getCode());
		bo.setWarehouse(warehouse.getCode());
		bo.setQuantity(100);
		bo.setDirection(emDirection.IN);
		bo.setBaseDocumentType("NO_ORDER");
		bo.setBaseDocumentEntry(Integer.valueOf(DateTime.getNow().toString("MMddhhmmss")));
		bo.setBaseDocumentLineId(-1);
		operationResult = boRepository.saveMaterialInventoryJournal(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		MaterialInventoryJournal boSaved = (MaterialInventoryJournal) operationResult.getResultObjects()
				.firstOrDefault();
		// 检查库存数量变化
		this.checkMaterial(bo.getItemCode(), bo.getQuantity());
		this.checkMaterialInventory(bo.getItemCode(), bo.getWarehouse(), bo.getQuantity());
		// 测试修改
		boSaved.setQuantity(78);
		operationResult = boRepository.saveMaterialInventoryJournal(boSaved);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// 检查库存数量变化
		this.checkMaterial(boSaved.getItemCode(), boSaved.getQuantity());
		this.checkMaterialInventory(boSaved.getItemCode(), boSaved.getWarehouse(), boSaved.getQuantity());
		bo = new MaterialInventoryJournal();
		// 测试出库
		Decimal onhand = new Decimal("50");
		bo.setItemCode(material.getCode());
		bo.setWarehouse(warehouse.getCode());
		bo.setQuantity(boSaved.getQuantity().subtract(onhand));
		bo.setDirection(emDirection.OUT);
		bo.setBaseDocumentType("NO_ORDER");
		bo.setBaseDocumentEntry(Integer.valueOf(DateTime.getNow().toString("MMddhhmmss")));
		bo.setBaseDocumentLineId(-1);
		operationResult = boRepository.saveMaterialInventoryJournal(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		boSaved = (MaterialInventoryJournal) operationResult.getResultObjects().firstOrDefault();
		// 检查库存数量变化
		this.checkMaterial(bo.getItemCode(), onhand);
		this.checkMaterialInventory(bo.getItemCode(), bo.getWarehouse(), onhand);
		// 删除出库记录
		boSaved.delete();
		operationResult = boRepository.saveMaterialInventoryJournal(boSaved);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		this.checkMaterial(bo.getItemCode(), onhand.add(boSaved.getQuantity()));
		this.checkMaterialInventory(bo.getItemCode(), bo.getWarehouse(), onhand.add(boSaved.getQuantity()));
	}

}
