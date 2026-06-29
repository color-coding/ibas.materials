package org.colorcoding.ibas.materials.test;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransferLine;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.IInventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.IInventoryTransferRequestLine;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.InventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 调拨申请 → 调拨 链路 测试。
 *
 * <p>覆盖 InventoryTransferRequestClosingService（矩阵 §1.3 第 3 行）：</p>
 * <ul>
 * <li>MM-A34：基于 InventoryTransferRequest 创建 InventoryTransfer → ITR.closedQuantity 推进</li>
 * </ul>
 */
public class TestInventoryTransferRequestChain extends AbstractQuantityLogicTestCase {

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

	// ==================================================================
	// MM-A34：ITR → IT 链路 closedQuantity 推进
	// ==================================================================

	public void testMM_A34_TransferRequestToTransfer() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh1 = prepareWarehouse(repo);
			IWarehouse wh2 = prepareWarehouse2(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "A34I");

			// 入库
			IGoodsReceipt gr = new GoodsReceipt();
			IGoodsReceiptLine grl = gr.getGoodsReceiptLines().create();
			grl.setItemCode(mt.getCode());
			grl.setQuantity(Decimals.valueOf(10));
			grl.setPrice(Decimals.valueOf(20));
			grl.setWarehouse(wh1.getCode());
			grl.setBatchManagement(mt.getBatchManagement());
			grl.setSerialManagement(mt.getSerialManagement());
			BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();

			// 创建调拨申请 10 个
			IInventoryTransferRequest itr = new InventoryTransferRequest();
			IInventoryTransferRequestLine itrl = itr.getInventoryTransferRequestLines().create();
			itrl.setItemCode(mt.getCode());
			itrl.setQuantity(Decimals.valueOf(10));
			itrl.setFromWarehouse(wh1.getCode());
			itrl.setWarehouse(wh2.getCode());
			itrl.setBatchManagement(mt.getBatchManagement());
			itrl.setSerialManagement(mt.getSerialManagement());
			itr = BOUtilities.valueOf(repo.saveInventoryTransferRequest(itr)).firstOrDefault();
			assertTrue("ITR saved.", itr.getDocEntry() > 0);

			IInventoryTransferRequestLine itrlSaved = itr.getInventoryTransferRequestLines().firstOrDefault();

			// 基于 ITR 创建调拨 6 个（部分）
			IInventoryTransfer it = new InventoryTransfer();
			IInventoryTransferLine itl = it.getInventoryTransferLines().create();
			itl.setItemCode(itrlSaved.getItemCode());
			itl.setQuantity(Decimals.valueOf(6));
			itl.setFromWarehouse(itrlSaved.getFromWarehouse());
			itl.setWarehouse(itrlSaved.getWarehouse());
			itl.setBatchManagement(mt.getBatchManagement());
			itl.setSerialManagement(mt.getSerialManagement());
			itl.setBaseDocumentType(itrlSaved.getObjectCode());
			itl.setBaseDocumentEntry(itrlSaved.getDocEntry());
			itl.setBaseDocumentLineId(itrlSaved.getLineId());
			it = BOUtilities.valueOf(repo.saveInventoryTransfer(it)).firstOrDefault();
			assertTrue("IT saved.", it.getDocEntry() > 0);

			// 验证 ITR.closedQuantity = 6
			IInventoryTransferRequest itrReload = BOUtilities
					.valueOf(repo.fetchInventoryTransferRequest(itr.getCriteria())).firstOrDefault();
			assertEqualsBD("ITR.closedQuantity = 6.", Decimals.valueOf(6),
					itrReload.getInventoryTransferRequestLines().sum(c -> c.getClosedQuantity()));
		}
	}
}
