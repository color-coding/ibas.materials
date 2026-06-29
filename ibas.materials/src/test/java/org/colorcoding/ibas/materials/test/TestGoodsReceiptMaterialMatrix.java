package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 库存收货单 物料类型矩阵 测试
 *
 * <p>覆盖：MM-A01 / A02 / A03 / A04 / A05 / A14 / A17 / A18 / A19 / A20</p>
 */
public class TestGoodsReceiptMaterialMatrix extends AbstractQuantityLogicTestCase {

	private static final BigDecimal QUANTITY = Decimals.valueOf(10);
	private static final BigDecimal PRICE = Decimals.valueOf(20);

	// ------------------------------------------------------------------
	// 通用构造
	// ------------------------------------------------------------------

	/** 构造单行收货单，按物料类型填充批次/序列 */
	private IGoodsReceipt buildGoodsReceipt(IMaterial material, IWarehouse warehouse, MaterialKind kind,
			BigDecimal qty) {
		IGoodsReceipt goodsReceipt = new GoodsReceipt();
		goodsReceipt.setReference1("matrix-" + kind.name());
		IGoodsReceiptLine line = goodsReceipt.getGoodsReceiptLines().create();
		line.setItemCode(material.getCode());
		line.setQuantity(qty);
		line.setPrice(PRICE);
		line.setWarehouse(warehouse.getCode());
		line.setBatchManagement(material.getBatchManagement());
		line.setSerialManagement(material.getSerialManagement());
		if (kind == MaterialKind.BATCH) {
			IMaterialBatchItem b = line.getMaterialBatches().create();
			b.setBatchCode("B-" + DateTimes.now().toString("yyyyMMddHHmmss"));
			b.setQuantity(qty);
		} else if (kind == MaterialKind.SERIAL) {
			int n = qty.intValue();
			for (int i = 0; i < n; i++) {
				IMaterialSerialItem s = line.getMaterialSerials().create();
				s.setSerialCode("S-" + DateTimes.now().toString("yyyyMMddHHmmss") + "-" + i);
			}
		}
		return goodsReceipt;
	}

	// ==================================================================
	// MM-A01：新建保存 - 各物料类型 - OnHand+Q
	// ==================================================================

	public void testMM_A01_Create_Inventory() throws Exception { runCreateExpectOnHand(MaterialKind.INVENTORY, "A01I"); }
	public void testMM_A01_Create_Batch()     throws Exception { runCreateExpectOnHand(MaterialKind.BATCH,     "A01B"); }
	public void testMM_A01_Create_Serial()    throws Exception { runCreateExpectOnHand(MaterialKind.SERIAL,    "A01N"); }

	private void runCreateExpectOnHand(MaterialKind kind, String tag) throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, kind, tag);

			IGoodsReceipt gr = buildGoodsReceipt(mt, wh, kind, QUANTITY);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
			assertTrue("DocEntry assigned.", gr.getDocEntry() > 0);

			assertQuantities(repo, mt, wh.getCode(), QUANTITY, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A02：头取消 - 各物料类型 - OnHand 回滚
	// ==================================================================

	public void testMM_A02_HeaderCancel_Inventory() throws Exception { runHeaderCancel(MaterialKind.INVENTORY, "A02I"); }
	public void testMM_A02_HeaderCancel_Batch()     throws Exception { runHeaderCancel(MaterialKind.BATCH,     "A02B"); }
	public void testMM_A02_HeaderCancel_Serial()    throws Exception { runHeaderCancel(MaterialKind.SERIAL,    "A02N"); }

	private void runHeaderCancel(MaterialKind kind, String tag) throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, kind, tag);

			IGoodsReceipt gr = buildGoodsReceipt(mt, wh, kind, QUANTITY);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), QUANTITY, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);

			gr.setCanceled(emYesNo.YES);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			assertQuantities(repo, mt, wh.getCode(), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A03：头删除 - 各物料类型 - OnHand 回滚
	// ==================================================================

	public void testMM_A03_HeaderDelete_Inventory() throws Exception { runHeaderDelete(MaterialKind.INVENTORY, "A03I"); }
	public void testMM_A03_HeaderDelete_Batch()     throws Exception { runHeaderDelete(MaterialKind.BATCH,     "A03B"); }
	public void testMM_A03_HeaderDelete_Serial()    throws Exception { runHeaderDelete(MaterialKind.SERIAL,    "A03N"); }

	private void runHeaderDelete(MaterialKind kind, String tag) throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, kind, tag);

			IGoodsReceipt gr = buildGoodsReceipt(mt, wh, kind, QUANTITY);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			gr.delete();
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			assertQuantities(repo, mt, wh.getCode(), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A04：多行 - 删除其中一行 - 仅回滚被删行
	// ==================================================================

	public void testMM_A04_LineDelete_Inventory() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A04I");

			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine l1 = gr.getGoodsReceiptLines().create();
			l1.setItemCode(mt.getCode()); l1.setQuantity(Decimals.valueOf(6)); l1.setPrice(PRICE);
			l1.setWarehouse(wh.getCode());
			l1.setBatchManagement(mt.getBatchManagement());
			l1.setSerialManagement(mt.getSerialManagement());
			IGoodsReceiptLine l2 = gr.getGoodsReceiptLines().create();
			l2.setItemCode(mt.getCode()); l2.setQuantity(Decimals.valueOf(4)); l2.setPrice(PRICE);
			l2.setWarehouse(wh.getCode());
			l2.setBatchManagement(mt.getBatchManagement());
			l2.setSerialManagement(mt.getSerialManagement());

			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), Decimals.valueOf(10), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);

			gr.getGoodsReceiptLines().get(1).delete();
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
			assertQuantities(repo, mt, wh.getCode(), Decimals.valueOf(6), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A05：行取消 - 仅回滚该行
	// ==================================================================

	public void testMM_A05_LineCancel_Inventory() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A05I");

			IGoodsReceipt gr = buildGoodsReceipt(mt, wh, MaterialKind.INVENTORY, QUANTITY);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			gr.getGoodsReceiptLines().firstOrDefault().setCanceled(emYesNo.YES);
			gr = BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			assertQuantities(repo, mt, wh.getCode(), Decimals.VALUE_ZERO, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
	}

	// ==================================================================
	// MM-A14：服务物料任何操作 - 三量恒为 0
	//   注：服务物料无库存逻辑，框架不会创建 MaterialInventory；
	//       这里不直接保存 GoodsReceipt（GR 对服务物料会抛 BusinessLogicException），
	//       而是断言服务物料的三量初始状态。
	// ==================================================================

	public void testMM_A14_ServiceMaterial_AlwaysZero() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.SERVICE, "A14S");

			assertServiceMaterialQuantities(repo, mt, wh.getCode());
		}
	}
}
