package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssueLine;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/** 库存事务、批次分配、序列在库状态及重复操作回归。 */
public class TestInventoryBoundaries extends AbstractQuantityLogicTestCase {

	private BigDecimal quantity(int value) {
		return BigDecimal.valueOf(value);
	}

	private IGoodsReceipt receipt(IMaterial material, IWarehouse warehouse, int quantity) {
		IGoodsReceipt document = new GoodsReceipt();
		IGoodsReceiptLine line = document.getGoodsReceiptLines().create();
		line.setItemCode(material.getCode());
		line.setWarehouse(warehouse.getCode());
		line.setQuantity(quantity(quantity));
		line.setPrice(quantity(20));
		line.setBatchManagement(material.getBatchManagement());
		line.setSerialManagement(material.getSerialManagement());
		return document;
	}

	private IGoodsIssueLine addIssueLine(IGoodsIssue document, IMaterial material, IWarehouse warehouse, int quantity) {
		IGoodsIssueLine line = document.getGoodsIssueLines().create();
		line.setItemCode(material.getCode());
		line.setWarehouse(warehouse.getCode());
		line.setQuantity(quantity(quantity));
		line.setPrice(quantity(20));
		line.setBatchManagement(material.getBatchManagement());
		line.setSerialManagement(material.getSerialManagement());
		return line;
	}

	private ICriteria managedCriteria(IMaterial material, IWarehouse warehouse) {
		ICriteria criteria = new Criteria();
		criteria.getConditions().create().setAlias("ItemCode");
		criteria.getConditions().get(0).setValue(material.getCode());
		criteria.getConditions().create().setAlias("Warehouse");
		criteria.getConditions().get(1).setValue(warehouse.getCode());
		return criteria;
	}

	private void assertBatch(BORepositoryMaterials repo, IMaterial material, IWarehouse warehouse, String code, int quantity) {
		ICriteria criteria = managedCriteria(material, warehouse);
		criteria.getConditions().create().setAlias("BatchCode");
		criteria.getConditions().get(2).setValue(code);
		IMaterialBatch batch = BOUtilities.valueOf(repo.fetchMaterialBatch(criteria)).firstOrDefault();
		assertNotNull("Batch must exist: " + code, batch);
		assertEqualsBD("Batch balance " + code, quantity(quantity), batch.getQuantity());
	}

	private void assertSerial(BORepositoryMaterials repo, IMaterial material, IWarehouse warehouse, String code, emYesNo inStock) {
		ICriteria criteria = managedCriteria(material, warehouse);
		criteria.getConditions().create().setAlias("SerialCode");
		criteria.getConditions().get(2).setValue(code);
		IMaterialSerial serial = BOUtilities.valueOf(repo.fetchMaterialSerial(criteria)).firstOrDefault();
		assertNotNull("Serial must exist: " + code, serial);
		assertEquals("Serial stock state " + code, inStock, serial.getInStock());
	}

	public void testMM_A36_SplitBatchesPartialIssueAndCancel() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse warehouse = prepareWarehouse(repo);
			IMaterial material = prepareMaterial(repo, MaterialKind.BATCH, "SPLIT");
			IGoodsReceipt receipt = receipt(material, warehouse, 10);
			IGoodsReceiptLine receiptLine = receipt.getGoodsReceiptLines().firstOrDefault();
			IMaterialBatchItem first = receiptLine.getMaterialBatches().create();
			first.setBatchCode("A");
			first.setQuantity(quantity(6));
			IMaterialBatchItem second = receiptLine.getMaterialBatches().create();
			second.setBatchCode("B");
			second.setQuantity(quantity(4));
			BOUtilities.valueOf(repo.saveGoodsReceipt(receipt));
			IGoodsIssue issue = new GoodsIssue();
			IGoodsIssueLine issueLine = addIssueLine(issue, material, warehouse, 5);
			first = issueLine.getMaterialBatches().create();
			first.setBatchCode("A");
			first.setQuantity(quantity(3));
			second = issueLine.getMaterialBatches().create();
			second.setBatchCode("B");
			second.setQuantity(quantity(2));
			issue = BOUtilities.valueOf(repo.saveGoodsIssue(issue)).firstOrDefault();
			assertBatch(repo, material, warehouse, "A", 3);
			assertBatch(repo, material, warehouse, "B", 2);
			assertQuantities(repo, material, warehouse.getCode(), quantity(5), quantity(0), quantity(0));
			issue.setCanceled(emYesNo.YES);
			issue = BOUtilities.valueOf(repo.saveGoodsIssue(issue)).firstOrDefault();
			BOUtilities.valueOf(repo.saveGoodsIssue(issue));
			assertBatch(repo, material, warehouse, "A", 6);
			assertBatch(repo, material, warehouse, "B", 4);
			assertQuantities(repo, material, warehouse.getCode(), quantity(10), quantity(0), quantity(0));
		}
	}

	public void testMM_A37_SerialIssueCancelAndReuse() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse warehouse = prepareWarehouse(repo);
			IMaterial material = prepareMaterial(repo, MaterialKind.SERIAL, "REUSE");
			IGoodsReceipt receipt = receipt(material, warehouse, 2);
			IGoodsReceiptLine line = receipt.getGoodsReceiptLines().firstOrDefault();
			line.getMaterialSerials().create().setSerialCode("A");
			line.getMaterialSerials().create().setSerialCode("B");
			BOUtilities.valueOf(repo.saveGoodsReceipt(receipt));
			assertSerial(repo, material, warehouse, "A", emYesNo.YES);
			assertSerial(repo, material, warehouse, "B", emYesNo.YES);
			IGoodsIssue issue = new GoodsIssue();
			addIssueLine(issue, material, warehouse, 1).getMaterialSerials().create().setSerialCode("A");
			issue = BOUtilities.valueOf(repo.saveGoodsIssue(issue)).firstOrDefault();
			assertSerial(repo, material, warehouse, "A", emYesNo.NO);
			assertSerial(repo, material, warehouse, "B", emYesNo.YES);
			issue.setCanceled(emYesNo.YES);
			issue = BOUtilities.valueOf(repo.saveGoodsIssue(issue)).firstOrDefault();
			BOUtilities.valueOf(repo.saveGoodsIssue(issue));
			assertSerial(repo, material, warehouse, "A", emYesNo.YES);
			IGoodsIssue next = new GoodsIssue();
			addIssueLine(next, material, warehouse, 1).getMaterialSerials().create().setSerialCode("A");
			BOUtilities.valueOf(repo.saveGoodsIssue(next));
			assertSerial(repo, material, warehouse, "A", emYesNo.NO);
			assertSerial(repo, material, warehouse, "B", emYesNo.YES);
			assertQuantities(repo, material, warehouse.getCode(), quantity(1), quantity(0), quantity(0));
		}
	}

	public void testMM_A38_SecondLineFailureRollsBackInventoryAndJournals() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse warehouse = prepareWarehouse(repo);
			IMaterial material = prepareMaterial(repo, MaterialKind.INVENTORY, "ATOMIC");
			BOUtilities.valueOf(repo.saveGoodsReceipt(receipt(material, warehouse, 10)));
			IGoodsIssue issue = new GoodsIssue();
			issue.setReference1(material.getCode());
			addIssueLine(issue, material, warehouse, 3);
			addIssueLine(issue, material, warehouse, 20);
			IOperationResult<IGoodsIssue> result = repo.saveGoodsIssue(issue);
			assertTrue("Insufficient stock must fail the whole document.", result.getError() instanceof BusinessLogicException);
			assertEquals(I18N.prop("msg_mm_material_not_enough", material.getCode(),
					quantity(-13).setScale(Decimals.DECIMAL_PLACES_STORAGE)), result.getError().getMessage());
			assertQuantities(repo, material, warehouse.getCode(), quantity(10), quantity(0), quantity(0));
			ICriteria failedCriteria = new Criteria();
			failedCriteria.getConditions().create().setAlias("Reference1");
			failedCriteria.getConditions().get(0).setValue(material.getCode());
			assertTrue("Rejected issue must not persist.", BOUtilities.valueOf(repo.fetchGoodsIssue(failedCriteria)).isEmpty());
			ICriteria criteria = managedCriteria(material, warehouse);
			assertEquals("Only original receipt journal may remain.", 1,
					BOUtilities.valueOf(repo.fetchMaterialInventoryJournal(criteria)).size());
			assertEqualsBD("Failed issue must preserve average cost.", quantity(20), BOUtilities.valueOf(repo.fetchMaterialInventory(managedCriteria(material, warehouse))).firstOrDefault().getAvgPrice());
		}
	}

	public void testMM_C13_CostsDisabledAllowsPriceChangeWithoutDuplicatingStock() throws Exception {
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, "false");
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse warehouse = prepareWarehouse(repo);
			IMaterial material = prepareMaterial(repo, MaterialKind.INVENTORY, "NOCOST");
			IGoodsReceipt document = BOUtilities.valueOf(repo.saveGoodsReceipt(receipt(material, warehouse, 10))).firstOrDefault();
			document.getGoodsReceiptLines().firstOrDefault().setPrice(quantity(30));
			// 总计也是双向推导输入，随价格一起提交一致的金额。
			document.getGoodsReceiptLines().firstOrDefault().setLineTotal(quantity(300));
			document = BOUtilities.valueOf(repo.saveGoodsReceipt(document)).firstOrDefault();
			assertEqualsBD("Price changes are permitted without cost freezing.", quantity(30),
					document.getGoodsReceiptLines().firstOrDefault().getPrice());
			assertQuantities(repo, material, warehouse.getCode(), quantity(10), quantity(0), quantity(0));
			assertEqualsBD("Cost-disabled stock must not accumulate value.", quantity(0),
					BOUtilities.valueOf(repo.fetchMaterialInventory(managedCriteria(material, warehouse))).firstOrDefault().getInventoryValue());
			IGoodsIssue issue = new GoodsIssue();
			addIssueLine(issue, material, warehouse, 3);
			issue = BOUtilities.valueOf(repo.saveGoodsIssue(issue)).firstOrDefault();
			issue.setCanceled(emYesNo.YES);
			issue = BOUtilities.valueOf(repo.saveGoodsIssue(issue)).firstOrDefault();
			BOUtilities.valueOf(repo.saveGoodsIssue(issue));
			assertQuantities(repo, material, warehouse.getCode(), quantity(10), quantity(0), quantity(0));
			document.setCanceled(emYesNo.YES);
			document = BOUtilities.valueOf(repo.saveGoodsReceipt(document)).firstOrDefault();
			BOUtilities.valueOf(repo.saveGoodsReceipt(document));
			assertQuantities(repo, material, warehouse.getCode(), quantity(0), quantity(0), quantity(0));

		}
	}

	public void testMM_C14_MaterialLevelCostAveragesAcrossWarehouses() throws Exception {
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, "false");
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse first = prepareWarehouse(repo);
			IWarehouse second = prepareWarehouse(repo, "WHS-CM2", "Material level cost warehouse");
			IMaterial material = prepareMaterial(repo, MaterialKind.INVENTORY, "MATCOST");
			BOUtilities.valueOf(repo.saveGoodsReceipt(receipt(material, first, 10)));
			IGoodsReceipt another = receipt(material, second, 10);
			another.getGoodsReceiptLines().firstOrDefault().setPrice(quantity(40));
			BOUtilities.valueOf(repo.saveGoodsReceipt(another));
			IMaterial saved = reload(repo, material);
			assertEqualsBD("Material stock must sum both warehouses.", quantity(20), saved.getOnHand());
			assertEqualsBD("Material average must include both warehouse receipts.", quantity(30), saved.getAvgPrice());
			assertEqualsBD("Material value must sum both receipts.", quantity(600), saved.getInventoryValue());
			assertEqualsBD("First warehouse physical stock.", quantity(10), snapshotWarehouse(repo, material.getCode(), first.getCode()).onHand);
			assertEqualsBD("Second warehouse physical stock.", quantity(10), snapshotWarehouse(repo, material.getCode(), second.getCode()).onHand);
		}
	}

}
