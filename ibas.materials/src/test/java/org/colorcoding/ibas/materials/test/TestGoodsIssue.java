package org.colorcoding.ibas.materials.test;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssueLine;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

import junit.framework.TestCase;

/**
 * 库存发货 测试
 * 
 */
public class TestGoodsIssue extends TestCase {

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
		GoodsIssue bo = new GoodsIssue();
		// 测试属性赋值

		// 测试库存发货-行
		IGoodsIssueLine goodsissueline = bo.getGoodsIssueLines().create();
		System.out.println(String.format("new item: %s", goodsissueline.toString()));
		// 测试属性赋值

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveGoodsIssue(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		GoodsIssue boSaved = (GoodsIssue) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchGoodsIssue(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

	public void testLogic() throws Exception {
		// ***1、新建物料 2、新建仓库 3新建出库单 4检查日记账分录 5检查物料库存是否增加或减少**//

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		// ICriteria criteria = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());
		// region 新建物料
		Material material = new Material();
		material.setCode(String.format("A%s", DateTime.getNow().getTime()));
		material.setName("Apple/苹果 iPhone 8 Plus");
		material.setBarCode(String.format("A%s", DateTime.getNow().toString("yyyyMMddhhmmss")));
		operationResult = boRepository.saveMaterial(material);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		Material material2 = new Material();
		material2.setCode(String.format("B%s", DateTime.getNow().getTime()));
		material2.setName("Apple/苹果 iPhone 8 Plus");
		material2.setBarCode(String.format("B%s", DateTime.getNow().toString("yyyyMMddhhmmss")));
		operationResult = boRepository.saveMaterial(material2);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// endregion
		// region 新建仓库
		Warehouse warehouse = new Warehouse();
		warehouse.setCode(String.format("A%s", DateTime.getNow().toString("ddmmss")));
		warehouse.setName(String.format("上海科捷%s", DateTime.getNow().toString("MMddmmss")));
		warehouse.setActivated(emYesNo.YES);
		operationResult = boRepository.saveWarehouse(warehouse);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		Warehouse warehouse2 = new Warehouse();
		warehouse2.setCode(String.format("B%s", DateTime.getNow().toString("ddmmss")));
		warehouse2.setName(String.format("北京科捷%s", DateTime.getNow().toString("MMddmmss")));
		warehouse2.setActivated(emYesNo.YES);
		operationResult = boRepository.saveWarehouse(warehouse2);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// endregion
		// region 新建单据
		// 收10000 发1000
		GoodsReceipt goodsReceipt = new GoodsReceipt();
		goodsReceipt.setDocumentDate(DateTime.getToday());
		goodsReceipt.setDocumentStatus(emDocumentStatus.RELEASED);
		IGoodsReceiptLine goodsReceiptLine = goodsReceipt.getGoodsReceiptLines().create();
		goodsReceiptLine.setItemCode(material.getCode());
		goodsReceiptLine.setWarehouse(warehouse.getCode());
		goodsReceiptLine.setQuantity(10000);
		goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
		IGoodsReceiptLine goodsReceiptLine1 = goodsReceipt.getGoodsReceiptLines().create();
		goodsReceiptLine1.setItemCode(material2.getCode());
		goodsReceiptLine1.setWarehouse(warehouse2.getCode());
		goodsReceiptLine1.setQuantity(10000);
		goodsReceiptLine1.setLineStatus(emDocumentStatus.RELEASED);
		operationResult = boRepository.saveGoodsReceipt(goodsReceipt);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		GoodsIssue goodsIssue = new GoodsIssue();
		goodsIssue.setDocumentDate(DateTime.getToday());
		goodsIssue.setDocumentStatus(emDocumentStatus.RELEASED);
		IGoodsIssueLine goodsissueline = goodsIssue.getGoodsIssueLines().create();
		goodsissueline.setItemCode(material.getCode());
		goodsissueline.setWarehouse(warehouse.getCode());
		goodsissueline.setQuantity(1000);
		goodsissueline.setLineStatus(emDocumentStatus.RELEASED);
		IGoodsIssueLine goodsissueline1 = goodsIssue.getGoodsIssueLines().create();
		goodsissueline1.setItemCode(material2.getCode());
		goodsissueline1.setWarehouse(warehouse2.getCode());
		goodsissueline1.setQuantity(1000);
		goodsissueline1.setLineStatus(emDocumentStatus.RELEASED);
		operationResult = boRepository.saveGoodsIssue(goodsIssue);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		goodsIssue = (GoodsIssue) operationResult.getResultObjects().firstOrDefault();
		// endregion
		// region 检查日记账分录
		ICriteria criteriaJournal = new Criteria();
		ICondition condition = criteriaJournal.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setValue(goodsIssue.getObjectCode());
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteriaJournal.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setValue(goodsIssue.getDocEntry());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setRelationship(ConditionRelationship.AND);
		condition = criteriaJournal.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setValue(1);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setRelationship(ConditionRelationship.AND);
		condition = criteriaJournal.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setValue(emDirection.OUT);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setRelationship(ConditionRelationship.AND);
		operationResult = boRepository.fetchMaterialInventoryJournal(criteriaJournal);
		MaterialInventoryJournal materialInventoryJournal = (MaterialInventoryJournal) operationResult
				.getResultObjects().firstOrDefault();
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("物料不同", materialInventoryJournal.getItemCode(), material.getCode());

		ICriteria criteriaJournal2 = new Criteria();
		ICondition condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition2.setValue(goodsIssue.getObjectCode());
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition2.setValue(goodsIssue.getDocEntry());
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2.setRelationship(ConditionRelationship.AND);
		condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition2.setValue(2);
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2.setRelationship(ConditionRelationship.AND);
		condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition2.setValue(emDirection.OUT);
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2.setRelationship(ConditionRelationship.AND);
		operationResult = boRepository.fetchMaterialInventoryJournal(criteriaJournal2);
		materialInventoryJournal = (MaterialInventoryJournal) operationResult.getResultObjects().firstOrDefault();
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("物料不同", materialInventoryJournal.getItemCode(), material2.getCode());
		// endregion
		// region 检查仓库库存
		ICriteria criteriaMaterialInventory = new Criteria();
		ICondition condition3 = criteriaMaterialInventory.getConditions().create();
		condition3.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition3.setOperation(ConditionOperation.EQUAL);
		condition3.setValue(material.getCode());
		condition3 = criteriaMaterialInventory.getConditions().create();
		condition3.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition3.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition3.setOperation(ConditionOperation.EQUAL);
		condition3.setValue(warehouse.getCode());
		operationResult = boRepository.fetchMaterialInventory(criteriaMaterialInventory);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		MaterialInventory materialInventory = (MaterialInventory) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), materialInventory.getOnHand().intValue(), 9000);

		ICriteria criteriaMaterialInventory2 = new Criteria();
		ICondition condition4 = criteriaMaterialInventory2.getConditions().create();
		condition4.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition4.setOperation(ConditionOperation.EQUAL);
		condition4.setValue(material2.getCode());
		condition4 = criteriaMaterialInventory2.getConditions().create();
		condition4.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition4.setOperation(ConditionOperation.EQUAL);
		condition4.setValue(warehouse2.getCode());
		operationResult = boRepository.fetchMaterialInventory(criteriaMaterialInventory2);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		MaterialInventory materialInventory2 = (MaterialInventory) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material2.getCode()), materialInventory2.getOnHand().intValue(), 9000);
		// endregion
		// region 检查物料库存
		ICriteria criteria1Material = new Criteria();
		ICondition condition5 = criteria1Material.getConditions().create();
		condition5.setAlias(Material.PROPERTY_CODE.getName());
		condition5.setOperation(ConditionOperation.EQUAL);
		condition5.setValue(material.getCode());

		operationResult = boRepository.fetchMaterial(criteria1Material);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		material = (Material) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), material.getOnHand().intValue(), 9000);

		ICriteria criteria1Material2 = new Criteria();
		ICondition condition6 = criteria1Material2.getConditions().create();
		condition6.setAlias(Material.PROPERTY_CODE.getName());
		condition5.setOperation(ConditionOperation.EQUAL);
		condition6.setValue(material2.getCode());

		operationResult = boRepository.fetchMaterial(criteria1Material2);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		material2 = (Material) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material2.getCode()), material2.getOnHand().intValue(), 9000);
		// endregion

	}

}
