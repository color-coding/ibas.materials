package org.colorcoding.ibas.materials.test;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Decimals;
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
 * 数量校验类异常分支 测试。
 *
 * <p>覆盖矩阵 §1.1/1.2 中的"抛异常"分支：</p>
 * <ul>
 * <li>MM-A30：序列号 inStock=YES 再入库抛异常（MaterialSerialInventoryService.impact）</li>
 * <li>MM-A31：批次出库时批次量不足抛异常（MaterialBatchInventorySerivce.impact）</li>
 * <li>MM-A32：GI 数量超 OnHand 抛"数量不足"（MaterialInventoryService.impact）</li>
 * </ul>
 */
public class TestQuantityValidation extends AbstractQuantityLogicTestCase {

	// ==================================================================
	// MM-A30：序列号已 inStock 再尝试入库 → 抛异常
	// ==================================================================

	public void testMM_A30_Serial_AlreadyInStock_ThrowsException() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.SERIAL, "A30N");
			String serialCode = "S-A30-" + mt.getCode();

			// 第一次入库
			IGoodsReceipt gr1 = new GoodsReceipt();
			IGoodsReceiptLine l1 = gr1.getGoodsReceiptLines().create();
			l1.setItemCode(mt.getCode());
			l1.setQuantity(Decimals.valueOf(1));
			l1.setPrice(Decimals.valueOf(20));
			l1.setWarehouse(wh.getCode());
			l1.setBatchManagement(mt.getBatchManagement());
			l1.setSerialManagement(mt.getSerialManagement());
			IMaterialSerialItem s1 = l1.getMaterialSerials().create();
			s1.setSerialCode(serialCode);
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr1)).firstOrDefault();

			// 第二次入库相同序列号 → 应抛异常（inStock=YES）
			IGoodsReceipt gr2 = new GoodsReceipt();
			IGoodsReceiptLine l2 = gr2.getGoodsReceiptLines().create();
			l2.setItemCode(mt.getCode());
			l2.setQuantity(Decimals.valueOf(1));
			l2.setPrice(Decimals.valueOf(20));
			l2.setWarehouse(wh.getCode());
			l2.setBatchManagement(mt.getBatchManagement());
			l2.setSerialManagement(mt.getSerialManagement());
			IMaterialSerialItem s2 = l2.getMaterialSerials().create();
			s2.setSerialCode(serialCode);

			try {
				BOUtilities.valueOf(repo.saveGoodsReceipt(gr2)).firstOrDefault();
				fail("Should throw for already in-stock serial.");
			} catch (Exception ex) {
				assertTrue("Expected in-stock error, got: " + ex.getMessage(),
						ex.getMessage().contains("已存在") || ex.getMessage().contains("已在库")
								|| ex.getMessage().contains("in_stock") || ex.getMessage().contains("序列号"));
			}
		}
	}

	// ==================================================================
	// MM-A31：批次出库数量大于批次现存量 → 抛异常
	// ==================================================================

	public void testMM_A31_Batch_NotEnough_ThrowsException() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.BATCH, "A31B");
			String batchCode = "B-A31-" + mt.getCode();

			// 入库 5 个
			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(Decimals.valueOf(5));
			line.setPrice(Decimals.valueOf(20));
			line.setWarehouse(wh.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			IMaterialBatchItem b = line.getMaterialBatches().create();
			b.setBatchCode(batchCode);
			b.setQuantity(Decimals.valueOf(5));
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			// 尝试出库 10 个（>5）→ 应抛异常
			IGoodsIssue gi = new GoodsIssue();
			IGoodsIssueLine il = gi.getGoodsIssueLines().create();
			il.setItemCode(mt.getCode());
			il.setQuantity(Decimals.valueOf(10));
			il.setPrice(Decimals.valueOf(20));
			il.setWarehouse(wh.getCode());
			il.setBatchManagement(mt.getBatchManagement());
			il.setSerialManagement(mt.getSerialManagement());
			IMaterialBatchItem ib = il.getMaterialBatches().create();
			ib.setBatchCode(batchCode);
			ib.setQuantity(Decimals.valueOf(10));

			try {
				BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();
				fail("Should throw for insufficient batch quantity.");
			} catch (Exception ex) {
				assertTrue("Expected batch-not-enough error, got: " + ex.getMessage(),
						ex.getMessage().contains("批次") || ex.getMessage().contains("数量不足")
								|| ex.getMessage().contains("not_enough"));
			}
		}
	}

	// ==================================================================
	// MM-A32：GI 出库数量大于 OnHand → 抛"数量不足"
	// ==================================================================

	public void testMM_A32_OnHand_NotEnough_ThrowsException() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A32I");

			// 入库 3 个
			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(Decimals.valueOf(3));
			line.setPrice(Decimals.valueOf(20));
			line.setWarehouse(wh.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), Decimals.valueOf(3), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);

			// 尝试出库 10 个 → 抛"数量不足"
			IGoodsIssue gi = new GoodsIssue();
			IGoodsIssueLine il = gi.getGoodsIssueLines().create();
			il.setItemCode(mt.getCode());
			il.setQuantity(Decimals.valueOf(10));
			il.setPrice(Decimals.valueOf(20));
			il.setWarehouse(wh.getCode());
			il.setBatchManagement(mt.getBatchManagement());
			il.setSerialManagement(mt.getSerialManagement());

			try {
				BOUtilities.valueOf(repo.saveGoodsIssue(gi)).firstOrDefault();
				fail("Should throw for insufficient OnHand.");
			} catch (Exception ex) {
				assertTrue("Expected not-enough error, got: " + ex.getMessage(),
						ex.getMessage().contains("数量不足") || ex.getMessage().contains("not_enough"));
			}

			// OnHand 应未变（事务回滚）
			assertQuantities(repo, mt, wh.getCode(), Decimals.valueOf(3), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}
}
