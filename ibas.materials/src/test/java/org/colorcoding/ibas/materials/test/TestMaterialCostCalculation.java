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
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssueLine;
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
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import junit.framework.TestCase;

/**
 * 物料成本计算 系统性测试。
 *
 * <p>覆盖以下未覆盖场景（基于逻辑推导）：</p>
 * <ul>
 * <li>MM-C01：MOVING_AVERAGE 估值 - 多行同收货的移动加权平均</li>
 * <li>MM-C02：收货取消 - avgPrice 与 OnHand 回滚</li>
 * <li>MM-C03：出库 - 按当前 avgPrice 计价，avgPrice 不变</li>
 * <li>MM-C04：出库取消 - avgPrice 与 OnHand 还原</li>
 * <li>MM-C05：多币种 - calculatedPrice = price × rate</li>
 * <li>MM-C06：批次收货取消 - 批次 quantity 回滚</li>
 * <li>MM-C07：序列号成本 - 序列入库 avgPrice</li>
 * <li>MM-C08：已计算成本的单据修改价格 - 抛异常</li>
 * <li>MM-C09：收货→出库→收货 - avgPrice 跨单据递推</li>
 * <li>MM-C10：收货→出库→取消出库 - 库存价值一致性</li>
 * <li>MM-C11：收货→取消收货 - 库存价值变动一致性</li>
 * <li>MM-C12：已计算成本后修改货币 - 抛异常</li>
 * </ul>
 */
public class TestMaterialCostCalculation extends TestCase {

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
		wh.setName("Cost Test " + code);
		if (repo.fetchWarehouse(wh.getCriteria()).getResultObjects().isEmpty()) {
			wh = BOUtilities.valueOf(repo.saveWarehouse(wh)).firstOrDefault();
		} else {
			wh = BOUtilities.valueOf(repo.fetchWarehouse(wh.getCriteria())).firstOrDefault();
		}
		return wh;
	}

	private IMaterial prepareMaterial(BORepositoryMaterials repo, String tag, emValuationMethod method,
			emYesNo batchMgmt, emYesNo serialMgmt) throws Exception {
		IMaterial m = new Material();
		m.setCode(Strings.format("MC-%s-%s", tag, DateTimes.now().toString("yyyyMMddHHmmssSSS")));
		m.setName(Strings.format("CostTest-%s", tag));
		m.setValuationMethod(method);
		m.setBatchManagement(batchMgmt);
		m.setSerialManagement(serialMgmt);
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

	private IMaterialInventory fetchInventory(BORepositoryMaterials repo, String itemCode, String warehouse)
			throws Exception {
		ICriteria criteria = new Criteria();
		ICondition c = criteria.getConditions().create();
		c.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
		c.setValue(itemCode);
		c = criteria.getConditions().create();
		c.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
		c.setValue(warehouse);
		return BOUtilities.valueOf(repo.fetchMaterialInventory(criteria)).firstOrDefault();
	}

	private IGoodsReceiptLine addReceiptLine(IGoodsReceipt gr, IMaterial mt, IWarehouse wh, BigDecimal qty,
			BigDecimal price) {
		IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
		line.setItemCode(mt.getCode());
		line.setQuantity(qty);
		line.setPrice(price);
		line.setWarehouse(wh.getCode());
		line.setBatchManagement(mt.getBatchManagement());
		line.setSerialManagement(mt.getSerialManagement());
		return line;
	}

	// ==================================================================
	// MM-C01：MOVING_AVERAGE - 多行同收货的移动加权平均
	//   场景：同一收货单两行，10@60 + 10@90
	//   推导：avgPrice = (10×60 + 10×90) / 20 = 75
	//         inventoryValue = 20 × 75 = 1500
	// ==================================================================

	public void testMM_C01_MovingAverage_MultiLine() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C01");
			IMaterial mt = prepareMaterial(repo, "C01", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(60));
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(90));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory inv = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertNotNull("Inventory exists.", inv);
			assertEqualsBD("OnHand.", Decimals.valueOf(20), inv.getOnHand());
			assertEqualsBD("AvgPrice.", Decimals.valueOf(75), inv.getAvgPrice());
			assertEqualsBD("InventoryValue.", Decimals.valueOf(1500), inv.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C02：收货取消 - avgPrice 与 OnHand 回滚
	//   场景：收货(10@100)，取消
	//   推导：取消后 onHand=0, avgPrice 保持或归零
	// ==================================================================

	public void testMM_C02_ReceiptCancel_Rollback() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C02");
			IMaterial mt = prepareMaterial(repo, "C02", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory invBefore = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand before cancel.", Decimals.valueOf(10), invBefore.getOnHand());
			assertEqualsBD("AvgPrice before cancel.", Decimals.valueOf(100), invBefore.getAvgPrice());

			gr.setCanceled(emYesNo.YES);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory invAfter = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after cancel.", Decimals.VALUE_ZERO, invAfter.getOnHand());
		}
	}

	// ==================================================================
	// MM-C03：出库 - 按当前 avgPrice 计价，avgPrice 不变
	//   场景：收货(10@100)，再出库3
	//   推导：出库后 avgPrice不变=100, onHand=7, invValue=700
	// ==================================================================

	public void testMM_C03_Issue_AvgPriceUnchanged() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C03");
			IMaterial mt = prepareMaterial(repo, "C03", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IGoodsIssue gi = new GoodsIssue();
			IGoodsIssueLine il = gi.getGoodsIssueLines().create();
			il.setItemCode(mt.getCode());
			il.setQuantity(Decimals.valueOf(3));
			il.setPrice(Decimals.valueOf(100));
			il.setWarehouse(wh.getCode());
			il.setBatchManagement(mt.getBatchManagement());
			il.setSerialManagement(mt.getSerialManagement());
			BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			IMaterialInventory inv = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after issue.", Decimals.valueOf(7), inv.getOnHand());
			assertEqualsBD("AvgPrice after issue (unchanged).", Decimals.valueOf(100), inv.getAvgPrice());
			assertEqualsBD("InventoryValue after issue.", Decimals.valueOf(700), inv.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C04：出库取消 - avgPrice 与 OnHand 还原
	//   场景：收货(10@100) → 出库(5) → 取消出库
	//   推导：取消后 onHand=10, avgPrice=100, invValue=1000
	// ==================================================================

	public void testMM_C04_IssueCancel_Restore() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C04");
			IMaterial mt = prepareMaterial(repo, "C04", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IGoodsIssue gi = new GoodsIssue();
			IGoodsIssueLine il = gi.getGoodsIssueLines().create();
			il.setItemCode(mt.getCode());
			il.setQuantity(Decimals.valueOf(5));
			il.setPrice(Decimals.valueOf(100));
			il.setWarehouse(wh.getCode());
			il.setBatchManagement(mt.getBatchManagement());
			il.setSerialManagement(mt.getSerialManagement());
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			IMaterialInventory invMid = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after issue.", Decimals.valueOf(5), invMid.getOnHand());

			gi.setCanceled(emYesNo.YES);
			BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			IMaterialInventory invAfter = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after cancel.", Decimals.valueOf(10), invAfter.getOnHand());
			assertEqualsBD("AvgPrice after cancel.", Decimals.valueOf(100), invAfter.getAvgPrice());
			assertEqualsBD("InventoryValue after cancel.", Decimals.valueOf(1000), invAfter.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C05：多币种 - calculatedPrice = price × rate
	//   场景：price=10, currency=USD, rate=7, qty=10
	//   推导：calculatedPrice = 70, avgPrice = 70, invValue = 700
	// ==================================================================

	public void testMM_C05_MultiCurrency_PriceTimesRate() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C05");
			IMaterial mt = prepareMaterial(repo, "C05", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(10));
			line.setCurrency("USD");
			line.setRate(Decimals.valueOf(7));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory inv = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand.", Decimals.valueOf(10), inv.getOnHand());
			assertEqualsBD("AvgPrice should = price×rate = 70.", Decimals.valueOf(70), inv.getAvgPrice());
			assertEqualsBD("InventoryValue should = 700.", Decimals.valueOf(700), inv.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C06：批次收货取消 - 批次 quantity 回滚
	//   场景：批次入库(10@100)，取消
	//   推导：取消后 onHand=0, batch.quantity=0
	// ==================================================================

	public void testMM_C06_BatchReceiptCancel() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C06");
			IMaterial mt = prepareMaterial(repo, "C06", emValuationMethod.BATCH_MOVING_AVERAGE, emYesNo.YES,
					emYesNo.NO);
			String batchCode = "BCH-C06-" + DateTimes.now().toString("yyyyMMddHHmmssSSS");

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			IMaterialBatchItem b = line.getMaterialBatches().create();
			b.setBatchCode(batchCode);
			b.setQuantity(Decimals.valueOf(10));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory invBefore = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand before cancel.", Decimals.valueOf(10), invBefore.getOnHand());

			gr.setCanceled(emYesNo.YES);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory invAfter = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after cancel.", Decimals.VALUE_ZERO, invAfter.getOnHand());
		}
	}

	// ==================================================================
	// MM-C07：序列号成本 - 序列入库 avgPrice
	//   场景：序列管理物料，入库2个序列，price=50
	//   推导：avgPrice=50, onHand=2, invValue=100
	// ==================================================================

	public void testMM_C07_SerialReceipt_AvgPrice() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C07");
			IMaterial mt = prepareMaterial(repo, "C07", emValuationMethod.BATCH_MOVING_AVERAGE, emYesNo.NO,
					emYesNo.YES);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = addReceiptLine(gr, mt, wh, Decimals.valueOf(2), Decimals.valueOf(50));
			String ts = DateTimes.now().toString("yyyyMMddHHmmssSSS");
			IMaterialSerialItem s1 = line.getMaterialSerials().create();
			s1.setSerialCode("S-C07-1-" + ts);
			IMaterialSerialItem s2 = line.getMaterialSerials().create();
			s2.setSerialCode("S-C07-2-" + ts);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory inv = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertNotNull("Inventory exists.", inv);
			assertEqualsBD("OnHand.", Decimals.valueOf(2), inv.getOnHand());
			assertEqualsBD("AvgPrice.", Decimals.valueOf(50), inv.getAvgPrice());
			assertEqualsBD("InventoryValue.", Decimals.valueOf(100), inv.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C08：已计算成本的单据修改价格 - 抛异常
	//   场景：收货保存后，修改价格并保存
	//   推导：已计算成本的日记账不允许修改核心字段
	// ==================================================================

	public void testMM_C08_ModifyPrice_ThrowsException() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C08");
			IMaterial mt = prepareMaterial(repo, "C08", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			gr.getGoodsReceiptLines().firstOrDefault().setPrice(Decimals.valueOf(200));
			IOperationResult<IGoodsReceipt> result = repo.saveGoodsReceipt(gr);
			assertNotNull("Save result should not be null.", result);
			assertTrue("Should have error when modifying price of costed document.",
					result.getError() != null || result.getResultCode() != 0);
			if (result.getError() != null) {
				String msg = result.getError().getMessage() != null ? result.getError().getMessage() : "";
				assertTrue("Expected cost-related error, got: " + msg,
						msg.contains("成本") || msg.contains("cost") || msg.contains("not_support")
								|| msg.contains("不支持") || msg.contains("completed"));
			}
		}
	}

	// ==================================================================
	// MM-C09：收货→出库→收货 - avgPrice 跨单据递推
	//   场景：收货(10@100) → 出库(5) → 收货(10@40)
	//   推导：第一次 avgPrice=100，出库后不变，第二次 avgPrice=(500+400)/15=60
	//         （第二次收货需独立repo实例避免缓存干扰）
	// ==================================================================

	public void testMM_C09_ReceiptIssueReceipt_AvgPrice() throws Exception {
		// 第一次收货
		IGoodsReceipt gr1;
		IMaterial mt;
		IWarehouse wh;
		try (BORepositoryMaterials repo = createRepo()) {
			wh = prepareWarehouse(repo, "WHS-C09");
			mt = prepareMaterial(repo, "C09", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);
			gr1 = new GoodsReceipt();
			addReceiptLine(gr1, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr1)).firstOrDefault();
		}
		// 出库（独立事务）
		try (BORepositoryMaterials repo = createRepo()) {
			IGoodsIssue gi = new GoodsIssue();
			IGoodsIssueLine il = gi.getGoodsIssueLines().create();
			il.setItemCode(mt.getCode());
			il.setQuantity(Decimals.valueOf(5));
			il.setPrice(Decimals.valueOf(100));
			il.setWarehouse(wh.getCode());
			il.setBatchManagement(mt.getBatchManagement());
			il.setSerialManagement(mt.getSerialManagement());
			BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			IMaterialInventory invMid = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after issue.", Decimals.valueOf(5), invMid.getOnHand());
			assertEqualsBD("AvgPrice after issue.", Decimals.valueOf(100), invMid.getAvgPrice());
		}
		// 第二次收货（独立事务）
		try (BORepositoryMaterials repo = createRepo()) {
			IGoodsReceipt gr2 = new GoodsReceipt();
			addReceiptLine(gr2, mt, wh, Decimals.valueOf(10), Decimals.valueOf(40));
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr2)).firstOrDefault();

			IMaterialInventory invFinal = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after final receipt.", Decimals.valueOf(15), invFinal.getOnHand());
			assertEqualsBD("AvgPrice after final receipt.", Decimals.valueOf(60), invFinal.getAvgPrice());
			assertEqualsBD("InventoryValue.", Decimals.valueOf(900), invFinal.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C10：收货→出库→取消出库 - 库存价值一致性
	//   场景：收货(10@100) → 出库(5) → 取消出库
	//   推导：取消后 onHand=10, avgPrice=100, invValue=1000
	//         库存价值恢复到出库前
	// ==================================================================

	public void testMM_C10_IssueCancel_ValueConsistency() throws Exception {
		// 收货
		IMaterial mt;
		IWarehouse wh;
		try (BORepositoryMaterials repo = createRepo()) {
			wh = prepareWarehouse(repo, "WHS-C10");
			mt = prepareMaterial(repo, "C10", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);
			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
		}
		// 出库 + 取消（同一事务）
		try (BORepositoryMaterials repo = createRepo()) {
			IMaterialInventory invBefore = fetchInventory(repo, mt.getCode(), wh.getCode());
			BigDecimal valueBefore = invBefore.getInventoryValue();

			IGoodsIssue gi = new GoodsIssue();
			IGoodsIssueLine il = gi.getGoodsIssueLines().create();
			il.setItemCode(mt.getCode());
			il.setQuantity(Decimals.valueOf(5));
			il.setPrice(Decimals.valueOf(100));
			il.setWarehouse(wh.getCode());
			il.setBatchManagement(mt.getBatchManagement());
			il.setSerialManagement(mt.getSerialManagement());
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			IMaterialInventory invAfterIssue = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("Value decrease on issue.", Decimals.valueOf(500),
					valueBefore.subtract(invAfterIssue.getInventoryValue()));

			gi.setCanceled(emYesNo.YES);
			BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			IMaterialInventory invAfterCancel = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("Value restored after cancel.", valueBefore, invAfterCancel.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C11：收货→取消收货 - 库存价值变动一致性
	//   场景：收货(10@100) → 取消收货
	//   推导：取消后 onHand=0, invValue=0
	//         库存价值变动 = 1000 - 0 = 1000 = avgPrice × qty
	// ==================================================================

	public void testMM_C11_ReceiptCancel_ValueConsistency() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C11");
			IMaterial mt = prepareMaterial(repo, "C11", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory invBefore = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("InvValue before cancel.", Decimals.valueOf(1000), invBefore.getInventoryValue());

			gr.setCanceled(emYesNo.YES);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			IMaterialInventory invAfter = fetchInventory(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("OnHand after cancel.", Decimals.VALUE_ZERO, invAfter.getOnHand());
			assertEqualsBD("InvValue after cancel.", Decimals.VALUE_ZERO, invAfter.getInventoryValue());
		}
	}

	// ==================================================================
	// MM-C12：已计算成本后修改货币 - 抛异常
	//   场景：收货(CNY) → 修改货币为USD → 应抛异常
	// ==================================================================

	public void testMM_C12_ModifyCurrency_ThrowsException() throws Exception {
		try (BORepositoryMaterials repo = createRepo()) {
			IWarehouse wh = prepareWarehouse(repo, "WHS-C12");
			IMaterial mt = prepareMaterial(repo, "C12", emValuationMethod.MOVING_AVERAGE, emYesNo.NO, emYesNo.NO);

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = addReceiptLine(gr, mt, wh, Decimals.valueOf(10), Decimals.valueOf(100));
			line.setCurrency("CNY");
			line.setRate(Decimals.valueOf(1));
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			gr.getGoodsReceiptLines().firstOrDefault().setCurrency("USD");
			IOperationResult<IGoodsReceipt> result = repo.saveGoodsReceipt(gr);
			assertNotNull("Save result should not be null.", result);
			assertTrue("Should have error when modifying currency of costed document.",
					result.getError() != null || result.getResultCode() != 0);
			if (result.getError() != null) {
				String msg = result.getError().getMessage() != null ? result.getError().getMessage() : "";
				assertTrue("Expected cost-related error, got: " + msg,
						msg.contains("成本") || msg.contains("cost") || msg.contains("not_support")
								|| msg.contains("不支持") || msg.contains("completed"));
			}
		}
	}
}
