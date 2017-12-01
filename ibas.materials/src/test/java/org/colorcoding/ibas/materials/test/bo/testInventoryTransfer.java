package org.colorcoding.ibas.materials.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransferLine;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.materials.repository.IBORepositoryMaterialsApp;

/**
 * 库存转储 测试
 * 
 */
public class testInventoryTransfer extends TestCase {
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
		InventoryTransfer bo = new InventoryTransfer();
		// 测试属性赋值

		// 测试库存转储-行
		IInventoryTransferLine inventorytransferline = bo.getInventoryTransferLines().create();
		System.out.println(String.format("new item: %s", inventorytransferline.toString()));
		// 测试属性赋值

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryMaterialsApp boRepository = new BORepositoryMaterials();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveInventoryTransfer(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		InventoryTransfer boSaved = (InventoryTransfer) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchInventoryTransfer(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

	public void testLogic() throws Exception {
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
		// 收10000
		GoodsReceipt goodsReceipt = new GoodsReceipt();
		goodsReceipt.setDocumentDate(DateTime.getToday());
		goodsReceipt.setDocumentStatus(emDocumentStatus.RELEASED);
		IGoodsReceiptLine goodsReceiptLine = goodsReceipt.getGoodsReceiptLines().create();
		goodsReceiptLine.setItemCode(material.getCode());
		goodsReceiptLine.setWarehouse(warehouse.getCode());
		goodsReceiptLine.setQuantity(1000);
		goodsReceiptLine.setLineStatus(emDocumentStatus.RELEASED);
		IGoodsReceiptLine goodsReceiptLine1 = goodsReceipt.getGoodsReceiptLines().create();
		goodsReceiptLine1.setItemCode(material2.getCode());
		goodsReceiptLine1.setWarehouse(warehouse.getCode());
		goodsReceiptLine1.setQuantity(2000);
		goodsReceiptLine1.setLineStatus(emDocumentStatus.RELEASED);
		operationResult = boRepository.saveGoodsReceipt(goodsReceipt);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		InventoryTransfer inventoryTransfer = new InventoryTransfer();
		inventoryTransfer.setDocumentDate(DateTime.getToday());
		inventoryTransfer.setFromWarehouse(warehouse.getCode());
		inventoryTransfer.setDocumentStatus(emDocumentStatus.RELEASED);
		IInventoryTransferLine inventoryTransferLine = inventoryTransfer.getInventoryTransferLines().create();
		inventoryTransferLine.setItemCode(material.getCode());
		inventoryTransferLine.setWarehouse(warehouse2.getCode());
		inventoryTransferLine.setQuantity(1000);
		inventoryTransferLine.setLineStatus(emDocumentStatus.RELEASED);
		IInventoryTransferLine inventoryTransferLine2 = inventoryTransfer.getInventoryTransferLines().create();
		inventoryTransferLine2.setItemCode(material2.getCode());
		inventoryTransferLine2.setWarehouse(warehouse2.getCode());
		inventoryTransferLine2.setQuantity(2000);
		inventoryTransferLine2.setLineStatus(emDocumentStatus.RELEASED);
		operationResult = boRepository.saveInventoryTransfer(inventoryTransfer);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		inventoryTransfer = (InventoryTransfer) operationResult.getResultObjects().firstOrDefault();
		// endregion
		// region 检查日记账分录
		// region 第一行
		ICriteria criteriaJournal = new Criteria();
		ICondition condition = criteriaJournal.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setValue(inventoryTransfer.getObjectCode());
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteriaJournal.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setValue(inventoryTransfer.getDocEntry());
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
		assertEquals("仓库不同", materialInventoryJournal.getWarehouse(), warehouse.getCode());
		assertEquals("数量不同", materialInventoryJournal.getQuantity().intValue(), 1000);

		ICriteria criteriaJournal2 = new Criteria();
		ICondition condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition2.setValue(inventoryTransfer.getObjectCode());
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition2.setValue(inventoryTransfer.getDocEntry());
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2.setRelationship(ConditionRelationship.AND);
		condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition2.setValue(1);
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2.setRelationship(ConditionRelationship.AND);
		condition2 = criteriaJournal2.getConditions().create();
		condition2.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition2.setValue(emDirection.IN);
		condition2.setOperation(ConditionOperation.EQUAL);
		condition2.setRelationship(ConditionRelationship.AND);
		operationResult = boRepository.fetchMaterialInventoryJournal(criteriaJournal2);
		materialInventoryJournal = (MaterialInventoryJournal) operationResult.getResultObjects().firstOrDefault();
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("物料不同", materialInventoryJournal.getItemCode(), material.getCode());
		assertEquals("仓库不同", materialInventoryJournal.getWarehouse(), warehouse2.getCode());
		assertEquals("数量不同", materialInventoryJournal.getQuantity().intValue(), 1000);
		// endregion
		// region 第二行
		ICriteria criteriaJournal3 = new Criteria();
		ICondition condition3 = criteriaJournal3.getConditions().create();
		condition3.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition3.setValue(inventoryTransfer.getObjectCode());
		condition3.setOperation(ConditionOperation.EQUAL);
		condition3 = criteriaJournal3.getConditions().create();
		condition3.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition3.setValue(inventoryTransfer.getDocEntry());
		condition3.setOperation(ConditionOperation.EQUAL);
		condition3.setRelationship(ConditionRelationship.AND);
		condition3 = criteriaJournal3.getConditions().create();
		condition3.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition3.setValue(2);
		condition3.setOperation(ConditionOperation.EQUAL);
		condition3.setRelationship(ConditionRelationship.AND);
		condition3 = criteriaJournal3.getConditions().create();
		condition3.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition3.setValue(emDirection.OUT);
		condition3.setOperation(ConditionOperation.EQUAL);
		condition3.setRelationship(ConditionRelationship.AND);
		operationResult = boRepository.fetchMaterialInventoryJournal(criteriaJournal3);
		materialInventoryJournal = (MaterialInventoryJournal) operationResult.getResultObjects().firstOrDefault();
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("物料不同", materialInventoryJournal.getItemCode(), material2.getCode());
		assertEquals("仓库不同", materialInventoryJournal.getWarehouse(), warehouse.getCode());
		assertEquals("数量不同", materialInventoryJournal.getQuantity().intValue(), 2000);

		ICriteria criteriaJournal4 = new Criteria();
		ICondition condition4 = criteriaJournal4.getConditions().create();
		condition4.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition4.setValue(inventoryTransfer.getObjectCode());
		condition4.setOperation(ConditionOperation.EQUAL);
		condition4 = criteriaJournal4.getConditions().create();
		condition4.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition4.setValue(inventoryTransfer.getDocEntry());
		condition4.setOperation(ConditionOperation.EQUAL);
		condition4.setRelationship(ConditionRelationship.AND);
		condition4 = criteriaJournal4.getConditions().create();
		condition4.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition4.setValue(2);
		condition4.setOperation(ConditionOperation.EQUAL);
		condition4.setRelationship(ConditionRelationship.AND);
		condition4 = criteriaJournal4.getConditions().create();
		condition4.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition4.setValue(emDirection.IN);
		condition4.setOperation(ConditionOperation.EQUAL);
		condition4.setRelationship(ConditionRelationship.AND);
		operationResult = boRepository.fetchMaterialInventoryJournal(criteriaJournal4);
		materialInventoryJournal = (MaterialInventoryJournal) operationResult.getResultObjects().firstOrDefault();
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("物料不同", materialInventoryJournal.getItemCode(), material2.getCode());
		assertEquals("仓库不同", materialInventoryJournal.getWarehouse(), warehouse2.getCode());
		assertEquals("数量不同", materialInventoryJournal.getQuantity().intValue(), 2000);

		// endregion
		// endregion
		// region 检查仓库库存
		ICriteria criteriaMaterialInventory = new Criteria();
		ICondition condition5 = criteriaMaterialInventory.getConditions().create();
		condition5.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition5.setOperation(ConditionOperation.EQUAL);
		condition5.setValue(material.getCode());
		condition5 = criteriaMaterialInventory.getConditions().create();
		condition5.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition5.setOperation(ConditionOperation.EQUAL);
		condition5.setValue(warehouse.getCode());
		operationResult = boRepository.fetchMaterialInventory(criteriaMaterialInventory);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		MaterialInventory materialInventory = (MaterialInventory) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), materialInventory.getOnHand().intValue(), 0);

		ICriteria criteriaMaterialInventory2 = new Criteria();
		ICondition condition6 = criteriaMaterialInventory2.getConditions().create();
		condition6.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition6.setOperation(ConditionOperation.EQUAL);
		condition6.setValue(material2.getCode());
		condition6 = criteriaMaterialInventory2.getConditions().create();
		condition6.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition6.setOperation(ConditionOperation.EQUAL);
		condition6.setValue(warehouse.getCode());
		operationResult = boRepository.fetchMaterialInventory(criteriaMaterialInventory2);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		materialInventory = (MaterialInventory) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), materialInventory.getOnHand().intValue(), 0);

		ICriteria criteriaMaterialInventory3 = new Criteria();
		ICondition condition7 = criteriaMaterialInventory3.getConditions().create();
		condition7.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition7.setOperation(ConditionOperation.EQUAL);
		condition7.setValue(material.getCode());
		condition7 = criteriaMaterialInventory3.getConditions().create();
		condition7.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition7.setOperation(ConditionOperation.EQUAL);
		condition7.setValue(warehouse2.getCode());
		condition7.setRelationship(ConditionRelationship.AND);

		operationResult = boRepository.fetchMaterialInventory(criteriaMaterialInventory3);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		materialInventory = (MaterialInventory) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), materialInventory.getOnHand().intValue(), 1000);

		ICriteria criteriaMaterialInventory4 = new Criteria();
		ICondition condition8 = criteriaMaterialInventory4.getConditions().create();
		condition8.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition8.setOperation(ConditionOperation.EQUAL);
		condition8.setValue(material2.getCode());
		condition8 = criteriaMaterialInventory4.getConditions().create();
		condition8.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition8.setOperation(ConditionOperation.EQUAL);
		condition8.setValue(warehouse2.getCode());
		operationResult = boRepository.fetchMaterialInventory(criteriaMaterialInventory4);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		materialInventory = (MaterialInventory) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), materialInventory.getOnHand().intValue(), 2000);
		// endregion
		// region 检查物料库存
		ICriteria criteria1Material = new Criteria();
		ICondition condition9 = criteria1Material.getConditions().create();
		condition9.setAlias(Material.PROPERTY_CODE.getName());
		condition9.setOperation(ConditionOperation.EQUAL);
		condition9.setValue(material.getCode());

		operationResult = boRepository.fetchMaterial(criteria1Material);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		material = (Material) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material.getCode()), material.getOnHand().intValue(), 1000);

		ICriteria criteria1Material2 = new Criteria();
		ICondition condition10 = criteria1Material2.getConditions().create();
		condition10.setAlias(Material.PROPERTY_CODE.getName());
		condition10.setOperation(ConditionOperation.EQUAL);
		condition10.setValue(material2.getCode());

		operationResult = boRepository.fetchMaterial(criteria1Material2);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		material2 = (Material) operationResult.getResultObjects().firstOrDefault();
		assertEquals(String.format("%s库存数量不对", material2.getCode()), material2.getOnHand().intValue(), 2000);
		// endregion
	}
}
