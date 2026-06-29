package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

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
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import junit.framework.TestCase;

/**
 * 物料日记账成本 记录级测试。
 *
 * <p>覆盖以下场景（基于逻辑推导）：</p>
 * <ul>
 * <li>MM-J01：日记账 calculatedPrice / transactionValue / inventoryQuantity 正确性</li>
 * <li>MM-J02：多行收货 - 日记账时点库存快照正确累积</li>
 * <li>MM-J03：收货取消 - 日账记录冲销数据源（JNL-OFF）</li>
 * <li>MM-J04：多币种 - 日账 calculatedPrice = price × rate</li>
 * </ul>
 */
public class TestMaterialJournalCost extends TestCase {

	static {
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, "true");
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, "true");
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COST_PRICE_RECORDING, "false");
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, true);
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true);
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COST_PRICE_RECORDING, false);
		BOFactory.propertyInfos(org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem.class);
		BOFactory.propertyInfos(org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList.class);
	}

	private IWarehouse prepareWarehouse(BORepositoryMaterials repo, String code) throws Exception {
		IWarehouse wh = new Warehouse();
		wh.setCode(code);
		wh.setName("Journal Test " + code);
		if (repo.fetchWarehouse(wh.getCriteria()).getResultObjects().isEmpty()) {
			wh = BOUtilities.valueOf(repo.saveWarehouse(wh)).firstOrDefault();
		} else {
			wh = BOUtilities.valueOf(repo.fetchWarehouse(wh.getCriteria())).firstOrDefault();
		}
		return wh;
	}

	private IMaterial prepareMaterial(BORepositoryMaterials repo, String tag, emValuationMethod method)
			throws Exception {
		IMaterial m = new Material();
		m.setCode(Strings.format("MJ-%s-%s", tag, DateTimes.now().toString("yyyyMMddHHmmssSSS")));
		m.setName(Strings.format("JournalTest-%s", tag));
		m.setValuationMethod(method);
		m.setBatchManagement(emYesNo.NO);
		m.setSerialManagement(emYesNo.NO);
		m.setInventoryItem(emYesNo.YES);
		return BOUtilities.valueOf(repo.saveMaterial(m)).firstOrDefault();
	}

	private BORepositoryMaterials createRepo() throws Exception {
		BORepositoryMaterials repo = new BORepositoryMaterials();
		repo.setUserToken(OrganizationFactory.SYSTEM_USER);
		return repo;
	}

	private void assertEqualsBD(String msg, BigDecimal expected, BigDecimal actual) {
		BigDecimal e = expected == null ? Decimals.VALUE_ZERO : expected;
		BigDecimal a = actual == null ? Decimals.VALUE_ZERO : actual;
		assertEquals(msg + " expected=" + e + ", actual=" + a, 0, e.compareTo(a));
	}

	private IMaterialInventoryJournal fetchJournal(BORepositoryMaterials repo, String docType, int docEntry,
			int lineId) throws Exception {
		ICriteria criteria = new Criteria();
		ICondition c = criteria.getConditions().create();
		c.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		c.setValue(docType);
		c = criteria.getConditions().create();
		c.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		c.setValue(docEntry);
		c = criteria.getConditions().create();
		c.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		c.setValue(lineId);
		c = criteria.getConditions().create();
		c.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		c.setValue(emDirection.IN);
		IOperationResult<IMaterialInventoryJournal> result = repo.fetchMaterialInventoryJournal(criteria);
		return result.getResultObjects().firstOrDefault();
	}

	private static final String JNL_REG = "JNL-REG";
	private static final String JNL_OFF = "JNL-OFF";

	// ==================================================================
	// MM-J01：日记账 calculatedPrice / transactionValue 正确性
	//   场景：空库存 → 收货 10@80
	//   推导：calculatedPrice=80, transactionValue=800
	//         inventoryQuantity=0(收货前), inventoryValue=0(收货前)
	// ==================================================================

	public void testMM_J01_JournalCostFields() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-J01");
			IMaterial mt = prepareMaterial(repo, "J01", emValuationMethod.MOVING_AVERAGE);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(Decimals.valueOf(10));
			line.setPrice(Decimals.valueOf(80));
			line.setWarehouse(wh.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			String docType = gr.getGoodsReceiptLines().firstOrDefault().getObjectCode();
			int docEntry = gr.getDocEntry();
			int lineId = gr.getGoodsReceiptLines().firstOrDefault().getLineId();

			IMaterialInventoryJournal journal = fetchJournal(repo, docType, docEntry, lineId);
			assertNotNull("Journal exists.", journal);
			assertEqualsBD("Journal calculatedPrice.", Decimals.valueOf(80), journal.getCalculatedPrice());
			assertEqualsBD("Journal transactionValue.", Decimals.valueOf(800), journal.getTransactionValue());
			assertEqualsBD("Journal inventoryQuantity (before receipt).", Decimals.VALUE_ZERO,
					journal.getInventoryQuantity());
			assertEqualsBD("Journal inventoryValue (before receipt).", Decimals.VALUE_ZERO,
					journal.getInventoryValue());
			assertEqualsBD("Journal quantity.", Decimals.valueOf(10), journal.getQuantity());
		}
	}

	// ==================================================================
	// MM-J02：多行收货 - 日记账时点库存快照正确累积
	//   场景：同一收货单，行1(5@100)，行2(5@40)
	//   推导：行1: inventoryQuantity=0, transactionValue=500
	//         行2: inventoryQuantity=5(行1已入内存), transactionValue=200
	//         最终 avgPrice = (500+200)/10 = 70
	// ==================================================================

	public void testMM_J02_MultiLine_SnapshotAccumulation() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-J02");
			IMaterial mt = prepareMaterial(repo, "J02", emValuationMethod.MOVING_AVERAGE);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine l1 = gr.getGoodsReceiptLines().create();
			l1.setItemCode(mt.getCode());
			l1.setQuantity(Decimals.valueOf(5));
			l1.setPrice(Decimals.valueOf(100));
			l1.setWarehouse(wh.getCode());
			l1.setBatchManagement(mt.getBatchManagement());
			l1.setSerialManagement(mt.getSerialManagement());

			IGoodsReceiptLine l2 = gr.getGoodsReceiptLines().create();
			l2.setItemCode(mt.getCode());
			l2.setQuantity(Decimals.valueOf(5));
			l2.setPrice(Decimals.valueOf(40));
			l2.setWarehouse(wh.getCode());
			l2.setBatchManagement(mt.getBatchManagement());
			l2.setSerialManagement(mt.getSerialManagement());

			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			String docType = gr.getGoodsReceiptLines().get(0).getObjectCode();
			int docEntry = gr.getDocEntry();
			int line1Id = gr.getGoodsReceiptLines().get(0).getLineId();
			int line2Id = gr.getGoodsReceiptLines().get(1).getLineId();

			IMaterialInventoryJournal j1 = fetchJournal(repo, docType, docEntry, line1Id);
			assertNotNull("Journal1 exists.", j1);
			assertEqualsBD("J1 calculatedPrice.", Decimals.valueOf(100), j1.getCalculatedPrice());
			assertEqualsBD("J1 transactionValue.", Decimals.valueOf(500), j1.getTransactionValue());
			assertEqualsBD("J1 inventoryQuantity (before any receipt).", Decimals.VALUE_ZERO,
					j1.getInventoryQuantity());

			IMaterialInventoryJournal j2 = fetchJournal(repo, docType, docEntry, line2Id);
			assertNotNull("Journal2 exists.", j2);
			assertEqualsBD("J2 calculatedPrice.", Decimals.valueOf(40), j2.getCalculatedPrice());
			assertEqualsBD("J2 transactionValue.", Decimals.valueOf(200), j2.getTransactionValue());
			// 行2的inventoryQuantity应为行1的数量5（内存中累积）
			assertEqualsBD("J2 inventoryQuantity (includes line1).", Decimals.valueOf(5), j2.getInventoryQuantity());

			// 最终avgPrice = (500+200)/10 = 70
			ICriteria ic = new Criteria();
			ICondition c = ic.getConditions().create();
			c.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
			c.setValue(mt.getCode());
			c = ic.getConditions().create();
			c.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
			c.setValue(wh.getCode());
			IMaterialInventory inv = BOUtilities.valueOf(repo.fetchMaterialInventory(ic)).firstOrDefault();
			assertEqualsBD("Final avgPrice.", Decimals.valueOf(70), inv.getAvgPrice());
		}
	}

	// ==================================================================
	// MM-J03：收货取消 - 日账记录冲销数据源
	//   场景：收货(10@100) → 取消收货
	//   推导：取消后应有冲销日记账(JNL-OFF)，quantity和transactionValue为负
	// ==================================================================

	public void testMM_J03_ReceiptCancel_OffsettingJournal() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-J03");
			IMaterial mt = prepareMaterial(repo, "J03", emValuationMethod.MOVING_AVERAGE);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(Decimals.valueOf(10));
			line.setPrice(Decimals.valueOf(100));
			line.setWarehouse(wh.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			gr.setCanceled(emYesNo.YES);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			String docType = gr.getGoodsReceiptLines().firstOrDefault().getObjectCode();
			int docEntry = gr.getDocEntry();
			int lineId = gr.getGoodsReceiptLines().firstOrDefault().getLineId();

			ICriteria criteria = new Criteria();
			ICondition c = criteria.getConditions().create();
			c.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
			c.setValue(docType);
			c = criteria.getConditions().create();
			c.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			c.setValue(docEntry);
			c = criteria.getConditions().create();
			c.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
			c.setValue(lineId);
			c = criteria.getConditions().create();
			c.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
			c.setValue(emDirection.IN);
			IOperationResult<IMaterialInventoryJournal> result = repo.fetchMaterialInventoryJournal(criteria);

			IMaterialInventoryJournal regularJournal = null;
			IMaterialInventoryJournal offsettingJournal = null;
			for (IMaterialInventoryJournal j : result.getResultObjects()) {
				String ds = j.getDataSource();
				if (JNL_REG.equals(ds) || ds == null || ds.isEmpty()) {
					regularJournal = j;
				} else if (JNL_OFF.equals(ds)) {
					offsettingJournal = j;
				}
			}
			assertNotNull("Regular journal exists.", regularJournal);
			assertNotNull("Offsetting journal exists.", offsettingJournal);
			assertEqualsBD("Regular journal quantity.", Decimals.valueOf(10), regularJournal.getQuantity());
			assertEqualsBD("Offsetting journal quantity (negative).", Decimals.valueOf(-10),
					offsettingJournal.getQuantity());
			assertEqualsBD("Offsetting journal transactionValue (negative).",
					regularJournal.getTransactionValue().negate(), offsettingJournal.getTransactionValue());
		}
	}

	// ==================================================================
	// MM-J04：多币种 - 日账 calculatedPrice = price × rate
	//   场景：price=10, currency=USD, rate=7, qty=10
	//   推导：calculatedPrice = 70, transactionValue = 700
	// ==================================================================

	public void testMM_J04_MultiCurrency_JournalFields() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-J04");
			IMaterial mt = prepareMaterial(repo, "J04", emValuationMethod.MOVING_AVERAGE);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(Decimals.valueOf(10));
			line.setPrice(Decimals.valueOf(10));
			line.setWarehouse(wh.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			line.setCurrency("USD");
			line.setRate(Decimals.valueOf(7));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			String docType = gr.getGoodsReceiptLines().firstOrDefault().getObjectCode();
			int docEntry = gr.getDocEntry();
			int lineId = gr.getGoodsReceiptLines().firstOrDefault().getLineId();

			IMaterialInventoryJournal journal = fetchJournal(repo, docType, docEntry, lineId);
			assertNotNull("Journal exists.", journal);
			assertEqualsBD("Journal calculatedPrice (price×rate).", Decimals.valueOf(70),
					journal.getCalculatedPrice());
			assertEqualsBD("Journal transactionValue (calculatedPrice×qty).", Decimals.valueOf(700),
					journal.getTransactionValue());
			assertEquals("Journal currency.", "USD", journal.getCurrency());
		}
	}
}
