package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransferLine;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 库存调拨 测试。
 *
 * <p>覆盖：MM-A11 / A12</p>
 * <p>核心 logic：MaterialInventoryService (IN+OUT) 在两个仓库分别触发</p>
 */
public class TestInventoryTransfer extends AbstractQuantityLogicTestCase {

	private static final BigDecimal QTY = Decimals.valueOf(10);

	private IWarehouse prepareWarehouse2(BORepositoryMaterials repo) throws Exception {
		IWarehouse wh = new Warehouse();
		wh.setCode("WHS-QTY2");
		wh.setName("Quantity Logic Test Warehouse 2");
		if (repo.fetchWarehouse(wh.getCriteria()).getResultObjects().isEmpty()) {
			wh = BOUtilities.valueOf(repo.saveWarehouse(wh)).firstOrDefault();
		} else {
			wh = BOUtilities.valueOf(repo.fetchWarehouse(wh.getCriteria())).firstOrDefault();
		}
		return wh;
	}

	private void seedInventory(BORepositoryMaterials repo, IMaterial mt, IWarehouse wh, BigDecimal qty)
			throws Exception {
		IGoodsReceipt gr = new GoodsReceipt();
		IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
		line.setItemCode(mt.getCode());
		line.setQuantity(qty);
		line.setPrice(Decimals.valueOf(20));
		line.setWarehouse(wh.getCode());
		line.setBatchManagement(mt.getBatchManagement());
		line.setSerialManagement(mt.getSerialManagement());
		BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
	}

	// ==================================================================
	// MM-A11: 调拨 -> 源仓-Q, 目标仓+Q
	// ==================================================================

	public void testMM_A11_Transfer_Inventory() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh1 = prepareWarehouse(repo);
			IWarehouse wh2 = prepareWarehouse2(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A11I");

			// 源仓预先入库 QTY
			seedInventory(repo, mt, wh1, QTY);
			assertQuantities(repo, mt, wh1.getCode(), QTY, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);

			IInventoryTransfer it = new InventoryTransfer();
			IInventoryTransferLine line = it.getInventoryTransferLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(QTY);
			line.setFromWarehouse(wh1.getCode());
			line.setWarehouse(wh2.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			it = BOUtilities.valueOf(repo.saveInventoryTransfer(it)).firstOrDefault();
			assertTrue("Transfer DocEntry assigned.", it.getDocEntry() > 0);

			// 源仓: OnHand=0, 目标仓: OnHand=QTY；物料总 OnHand=QTY
			QuantitySnapshot wh1Snap = snapshotOfWarehouse(repo, mt.getCode(), wh1.getCode());
			QuantitySnapshot wh2Snap = snapshotOfWarehouse(repo, mt.getCode(), wh2.getCode());
			assertEqualsBD("wh1.OnHand should be 0.", Decimals.VALUE_ZERO, wh1Snap.onHand);
			assertEqualsBD("wh2.OnHand should be QTY.", QTY, wh2Snap.onHand);

			QuantitySnapshot mSnap = snapshotOfMaterial(repo, mt);
			assertEqualsBD("Material total OnHand should remain QTY.", QTY, mSnap.onHand);
		}
	}

	// ==================================================================
	// MM-A12: 调拨 取消 -> 互逆回滚
	// ==================================================================

	public void testMM_A12_TransferCancel_Inventory() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh1 = prepareWarehouse(repo);
			IWarehouse wh2 = prepareWarehouse2(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A12I");
			seedInventory(repo, mt, wh1, QTY);

			IInventoryTransfer it = new InventoryTransfer();
			IInventoryTransferLine line = it.getInventoryTransferLines().create();
			line.setItemCode(mt.getCode());
			line.setQuantity(QTY);
			line.setFromWarehouse(wh1.getCode());
			line.setWarehouse(wh2.getCode());
			line.setBatchManagement(mt.getBatchManagement());
			line.setSerialManagement(mt.getSerialManagement());
			it = BOUtilities.valueOf(repo.saveInventoryTransfer(it)).firstOrDefault();

			it.setCanceled(emYesNo.YES);
			it = BOUtilities.valueOf(repo.saveInventoryTransfer(it)).firstOrDefault();

			// 恢复：wh1=QTY, wh2=0
			assertEqualsBD("wh1.OnHand back to QTY.", QTY,
					snapshotOfWarehouse(repo, mt.getCode(), wh1.getCode()).onHand);
			assertEqualsBD("wh2.OnHand back to 0.", Decimals.VALUE_ZERO,
					snapshotOfWarehouse(repo, mt.getCode(), wh2.getCode()).onHand);
		}
	}
}
