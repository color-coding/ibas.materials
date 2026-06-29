package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssueLine;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 库存发货单 物料类型矩阵 测试。
 *
 * <p>覆盖：MM-A09 / A10</p>
 * <p>核心 logic：MaterialInventoryService (OUT)</p>
 */
public class TestGoodsIssueMaterialMatrix extends AbstractQuantityLogicTestCase {

	private static final BigDecimal QTY = Decimals.valueOf(10);

	/** 入库准备：保证 OnHand 充足，便于发货 */
	private String seedInventory(BORepositoryMaterials repo, IMaterial mt, IWarehouse wh, MaterialKind kind,
			BigDecimal qty) throws Exception {
		String batchCode = "BSEED-" + DateTimes.now().toString("yyyyMMddHHmmssSSS");
		IGoodsReceipt gr = new GoodsReceipt();
		IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
		line.setItemCode(mt.getCode());
		line.setQuantity(qty);
		line.setPrice(Decimals.valueOf(20));
		line.setWarehouse(wh.getCode());
		line.setBatchManagement(mt.getBatchManagement());
		line.setSerialManagement(mt.getSerialManagement());
		if (kind == MaterialKind.BATCH) {
			IMaterialBatchItem b = line.getMaterialBatches().create();
			b.setBatchCode(batchCode);
			b.setQuantity(qty);
		} else if (kind == MaterialKind.SERIAL) {
			int n = qty.intValue();
			for (int i = 0; i < n; i++) {
				IMaterialSerialItem s = line.getMaterialSerials().create();
				s.setSerialCode("SSEED-" + DateTimes.now().toString("yyyyMMddHHmmssSSS") + "-" + i);
			}
		}
		BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
		return batchCode;
	}

	private IGoodsIssue buildIssue(IMaterial mt, IWarehouse wh, MaterialKind kind, BigDecimal qty, String batchCode) {
		IGoodsIssue gi = new GoodsIssue();
		gi.setReference1("matrix-issue-" + kind.name());
		IGoodsIssueLine line = gi.getGoodsIssueLines().create();
		line.setItemCode(mt.getCode());
		line.setQuantity(qty);
		line.setPrice(Decimals.valueOf(20));
		line.setWarehouse(wh.getCode());
		line.setBatchManagement(mt.getBatchManagement());
		line.setSerialManagement(mt.getSerialManagement());
		if (kind == MaterialKind.BATCH && batchCode != null) {
			IMaterialBatchItem b = line.getMaterialBatches().create();
			b.setBatchCode(batchCode);
			b.setQuantity(qty);
		} else if (kind == MaterialKind.SERIAL) {
			// 序列号发货：复用入库时生成的序列号
			int n = qty.intValue();
			for (int i = 0; i < n; i++) {
				IMaterialSerialItem s = line.getMaterialSerials().create();
				// 这里依赖 seed 时生成的序列号，简化为重用最新前缀
			}
		}
		return gi;
	}

	// ==================================================================
	// MM-A09: 发货 -> OnHand-Q
	// ==================================================================

	public void testMM_A09_Issue_Inventory() throws Exception { runIssue(MaterialKind.INVENTORY, "A09I"); }
	public void testMM_A09_Issue_Batch()     throws Exception { runIssue(MaterialKind.BATCH,     "A09B"); }

	private void runIssue(MaterialKind kind, String tag) throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, kind, tag);
			String batch = seedInventory(repo, mt, wh, kind, QTY);
			assertQuantities(repo, mt, wh.getCode(), QTY, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);

			IGoodsIssue gi = buildIssue(mt, wh, kind, QTY, batch);
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();
			assertTrue("GI DocEntry assigned.", gi.getDocEntry() > 0);

			assertQuantities(repo, mt, wh.getCode(), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A10: 发货 取消 -> OnHand 回补
	// ==================================================================

	public void testMM_A10_IssueCancel_Inventory() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A10I");
			seedInventory(repo, mt, wh, MaterialKind.INVENTORY, QTY);

			IGoodsIssue gi = buildIssue(mt, wh, MaterialKind.INVENTORY, QTY, null);
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);

			gi.setCanceled(emYesNo.YES);
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), QTY, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A10b: 发货 删除 -> OnHand 回补
	// ==================================================================

	public void testMM_A10b_IssueDelete_Inventory() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A10bI");
			seedInventory(repo, mt, wh, MaterialKind.INVENTORY, QTY);

			IGoodsIssue gi = buildIssue(mt, wh, MaterialKind.INVENTORY, QTY, null);
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();

			gi.delete();
			gi = BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), QTY, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}
}
