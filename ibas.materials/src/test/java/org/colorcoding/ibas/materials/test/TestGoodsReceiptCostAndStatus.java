package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.accounting.bo.journalentry.IJournalEntry;
import org.colorcoding.ibas.accounting.bo.journalentry.JournalEntry;
import org.colorcoding.ibas.accounting.repository.BORepositoryAccounting;
import org.colorcoding.ibas.bobas.bo.BOIdentifierBuilder;
import org.colorcoding.ibas.bobas.bo.BOFactory;
import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.configuration.Configuration;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 库存收货单：成本/估值 + documentStatus 状态切换 测试。
 *
 * <p>
 * 开启物料成本以验证平均价，同时检查已有会计分录的单据状态保护。
 * </p>
 *
 * <p>覆盖原 {@code TestMaterialsCost} 的核心点：</p>
 * <ul>
 * <li>MM-A21：BATCH_MOVING_AVERAGE 估值 - 多行同物料 - 物料/仓库/批次三层 avgPrice 一致</li>
 * <li>MM-A22：已有分录时拒绝改回计划状态，无分录时允许并回退库存</li>
 * </ul>
 */
public class TestGoodsReceiptCostAndStatus extends AbstractBusinessTestCase {

	static {
		// 开启成本核算（仓库与批次个别管理）
		// 注意：MyConfiguration.create() 返回模块作用域 ConfigurationManager，
		// 与全局 Configuration.create() 不同，所以必须写到模块管理器
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, "true");
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, "true");
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COST_PRICE_RECORDING,
				"false");
		// 同时写入全局 Configuration，覆盖框架内任何走全局的查询
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, true);
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true);
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COST_PRICE_RECORDING, false);
		BOFactory.propertyInfos(MaterialPriceItem.class);
		BOFactory.propertyInfos(MaterialPriceList.class);
	}

	// ---------------- 基础数据准备 ----------------

	private IWarehouse prepareWarehouse(BORepositoryMaterials repo) throws Exception {
		IWarehouse wh = new Warehouse();
		wh.setCode("WHS-COST");
		wh.setName("Cost Test Warehouse");
		if (repo.fetchWarehouse(wh.getCriteria()).getResultObjects().isEmpty()) {
			wh = BOUtilities.valueOf(repo.saveWarehouse(wh)).firstOrDefault();
		} else {
			wh = BOUtilities.valueOf(repo.fetchWarehouse(wh.getCriteria())).firstOrDefault();
		}
		return wh;
	}

	/** 批次管理 + BATCH_MOVING_AVERAGE 估值的物料 */
	private IMaterial prepareBatchMovingAvgMaterial(BORepositoryMaterials repo, String tag) throws Exception {
		IMaterial m = new Material();
		m.setCode(Strings.format("BMA-%s-%s", tag, DateTimes.now().toString("yyyyMMddHHmmssSSS")));
		m.setName(Strings.format("BatchMovingAvg-%s", tag));
		m.setBatchManagement(emYesNo.YES);
		m.setValuationMethod(emValuationMethod.BATCH_MOVING_AVERAGE);
		return BOUtilities.valueOf(repo.saveMaterial(m)).firstOrDefault();
	}

	// ==================================================================
	// MM-A21：BATCH_MOVING_AVERAGE - 多行同物料 - 三层 avgPrice 一致
	//   场景：两行同物料，qty=10@100 + qty=10@50；同一 batchCode 合并入库
	//   预期：avgPrice = (10×100 + 10×50) / 20 = 75
	//   验证：物料.onHand=20，仓库.onHand=物料.onHand，
	//        仓库.avgPrice=75，批次.quantity=onHand，批次.avgPrice=75
	// ==================================================================

	public void testMM_A21_BatchMovingAverage_MultiLine() throws Exception {
		assertTrue("CONFIG enableMaterialCosts must be true.",
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false));
		assertTrue("CONFIG materialCostsByWarehouse must be true.",
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, false));

		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareBatchMovingAvgMaterial(repo, "A21");
			String batchCode = "BCH-" + DateTimes.now().toString("yyyyMMddHHmmssSSS");

			IGoodsReceipt gr = new GoodsReceipt();
			gr.setReference1("MM-A21 batch moving average");

			IGoodsReceiptLine l1 = gr.getGoodsReceiptLines().create();
			l1.setItemCode(mt.getCode());
			l1.setQuantity(Decimals.valueOf(10));
			l1.setPrice(Decimals.valueOf(100));
			l1.setWarehouse(wh.getCode());
			l1.setBatchManagement(mt.getBatchManagement());
			l1.setSerialManagement(mt.getSerialManagement());
			IMaterialBatchItem b1 = l1.getMaterialBatches().create();
			b1.setBatchCode(batchCode);
			b1.setQuantity(l1.getQuantity());

			IGoodsReceiptLine l2 = gr.getGoodsReceiptLines().create();
			l2.setItemCode(mt.getCode());
			l2.setQuantity(Decimals.valueOf(10));
			l2.setPrice(Decimals.valueOf(50));
			l2.setWarehouse(wh.getCode());
			l2.setBatchManagement(mt.getBatchManagement());
			l2.setSerialManagement(mt.getSerialManagement());
			IMaterialBatchItem b2 = l2.getMaterialBatches().create();
			b2.setBatchCode(batchCode);
			b2.setQuantity(l2.getQuantity());

			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
			assertTrue("DocEntry assigned.", gr.getDocEntry() > 0);

			BigDecimal totalQty = gr.getGoodsReceiptLines().sum(c -> c.getInventoryQuantity());
			BigDecimal totalAmount = gr.getGoodsReceiptLines().sum(c -> c.getLineTotal());
			BigDecimal expectedAvg = Decimals.divide(totalAmount, totalQty);

			// (1) 物料级 OnHand
			IMaterial m = BOUtilities.valueOf(repo.fetchMaterial(mt.getCriteria())).firstOrDefault();
			assertEqualsBD("Material.OnHand should = totalQty.", totalQty, m.getOnHand());

			// (2) 仓库级 OnHand 与 avgPrice
			ICriteria criteria = new Criteria();
			ICondition c = criteria.getConditions().create();
			c.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
			c.setValue(mt.getCode());
			c = criteria.getConditions().create();
			c.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
			c.setValue(wh.getCode());
			IMaterialInventory inv = BOUtilities.valueOf(repo.fetchMaterialInventory(criteria)).firstOrDefault();
			assertNotNull("Warehouse inventory exists.", inv);
			assertEqualsBD("Warehouse.OnHand should = Material.OnHand.", m.getOnHand(), inv.getOnHand());
			assertEqualsBD("Warehouse.avgPrice should = movingAvg.", expectedAvg, inv.getAvgPrice());

			// (3) 批次级 quantity 与 avgPrice
			criteria = new Criteria();
			c = criteria.getConditions().create();
			c.setAlias(MaterialBatch.PROPERTY_ITEMCODE);
			c.setValue(mt.getCode());
			c = criteria.getConditions().create();
			c.setAlias(MaterialBatch.PROPERTY_WAREHOUSE);
			c.setValue(wh.getCode());
			c = criteria.getConditions().create();
			c.setAlias(MaterialBatch.PROPERTY_BATCHCODE);
			c.setValue(batchCode);
			IMaterialBatch batch = BOUtilities.valueOf(repo.fetchMaterialBatch(criteria)).firstOrDefault();
			assertNotNull("Batch exists.", batch);
			assertEqualsBD("Batch.quantity should = Material.OnHand.", m.getOnHand(), batch.getQuantity());
			assertEqualsBD("Batch.avgPrice should = movingAvg.", expectedAvg, batch.getAvgPrice());
		}
	}

	// ==================================================================
	// MM-A22：按实际分录判断状态保护；无分录时切到 PLANNED 并回退库存
	// ==================================================================

	public void testMM_A22_HeaderDocumentStatusPlanned() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareBatchMovingAvgMaterial(repo, "A22");
			String batchCode = "BCH-" + DateTimes.now().toString("yyyyMMddHHmmssSSS");

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine l1 = gr.getGoodsReceiptLines().create();
			l1.setItemCode(mt.getCode());
			l1.setQuantity(Decimals.valueOf(10));
			l1.setPrice(Decimals.valueOf(100));
			l1.setWarehouse(wh.getCode());
			l1.setBatchManagement(mt.getBatchManagement());
			l1.setSerialManagement(mt.getSerialManagement());
			IMaterialBatchItem b1 = l1.getMaterialBatches().create();
			b1.setBatchCode(batchCode);
			b1.setQuantity(l1.getQuantity());
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterial m = BOUtilities.valueOf(repo.fetchMaterial(mt.getCriteria())).firstOrDefault();
			assertEqualsBD("Material.OnHand after save.", Decimals.valueOf(10), m.getOnHand());

			IJournalEntry journal = fetchReceiptJournal(gr);
			boolean hasJournal = journal != null;
			gr.setDocumentStatus(emDocumentStatus.PLANNED);
			IOperationResult<IGoodsReceipt> result = repo.saveGoodsReceipt(gr);
			if (hasJournal) {
				assertTrue("Posted receipt status change must be rejected.", result.getError() instanceof BusinessLogicException);
				assertEquals("Expected journal status protection error.",
						I18N.prop("msg_ac_document_has_journalentry_not_allowed_change_status",
								BOIdentifierBuilder.document(journal.getBaseDocumentType(), journal.getBaseDocumentEntry(),
										journal.getBaseDocumentLineId()).build()), result.getError().getMessage());
			} else {
				BOUtilities.valueOf(result);
			}
			IGoodsReceipt saved = BOUtilities.valueOf(repo.fetchGoodsReceipt(gr.getCriteria())).firstOrDefault();
			assertNotNull("Receipt must still exist.", saved);
			assertEquals("Receipt status must match journal protection.",
					hasJournal ? emDocumentStatus.RELEASED : emDocumentStatus.PLANNED, saved.getDocumentStatus());
			BigDecimal expectedQuantity = hasJournal ? Decimals.valueOf(10) : Decimals.VALUE_ZERO;
			m = BOUtilities.valueOf(repo.fetchMaterial(mt.getCriteria())).firstOrDefault();
			assertEqualsBD("Material.OnHand after status change.", expectedQuantity, m.getOnHand());

			ICriteria inventoryCriteria = new Criteria();
			ICondition inventoryCondition = inventoryCriteria.getConditions().create();
			inventoryCondition.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
			inventoryCondition.setValue(mt.getCode());
			inventoryCondition = inventoryCriteria.getConditions().create();
			inventoryCondition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
			inventoryCondition.setValue(wh.getCode());
			IMaterialInventory inventory = BOUtilities.valueOf(repo.fetchMaterialInventory(inventoryCriteria)).firstOrDefault();
			assertNotNull("Warehouse inventory must exist.", inventory);
			assertEqualsBD("Warehouse.OnHand after status change.", expectedQuantity, inventory.getOnHand());
			assertEqualsBD("Warehouse value after status change.",
					hasJournal ? Decimals.valueOf(1000) : Decimals.VALUE_ZERO, inventory.getInventoryValue());

			ICriteria criteria = new Criteria();
			ICondition c = criteria.getConditions().create();
			c.setAlias(MaterialBatch.PROPERTY_ITEMCODE);
			c.setValue(mt.getCode());
			c = criteria.getConditions().create();
			c.setAlias(MaterialBatch.PROPERTY_WAREHOUSE);
			c.setValue(wh.getCode());
			c = criteria.getConditions().create();
			c.setAlias(MaterialBatch.PROPERTY_BATCHCODE);
			c.setValue(batchCode);
			IMaterialBatch batch = BOUtilities.valueOf(repo.fetchMaterialBatch(criteria)).firstOrDefault();
			assertNotNull("Batch must still exist.", batch);
			assertEqualsBD("Batch.quantity after status change.", expectedQuantity, batch.getQuantity());
			assertEquals("Status change must preserve journal presence.", hasJournal, fetchReceiptJournal(saved) != null);
		}
	}

	private IJournalEntry fetchReceiptJournal(IGoodsReceipt receipt) throws Exception {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(JournalEntry.PROPERTY_BASEDOCUMENTTYPE);
		condition.setValue(receipt.getObjectCode());
		condition = criteria.getConditions().create();
		condition.setAlias(JournalEntry.PROPERTY_BASEDOCUMENTENTRY);
		condition.setValue(receipt.getDocEntry());
		try (BORepositoryAccounting repo = new BORepositoryAccounting()) {
			repo.setUserToken(OrganizationFactory.SYSTEM_USER);
			return BOUtilities.valueOf(repo.fetchJournalEntry(criteria)).firstOrDefault();
		}
	}
}
