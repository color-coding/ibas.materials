package org.colorcoding.ibas.materials.test;

import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceiptLine;
import org.colorcoding.ibas.materials.logic.IMaterialReceiptContract;
import org.colorcoding.ibas.materials.logic.MaterialInventoryService;

/** 库存数量服务的状态准入矩阵；成本日志的冲销由真实收货行契约验证，不以库存公式代替业务实现。 */
public class TestInventoryStateValidation extends AbstractBusinessTestCase {

	private static class Service extends MaterialInventoryService {
		boolean accepts(Object data) {
			return super.checkDataStatus(data);
		}
	}

	/** MM-S01：单头遍历全部审批状态；仅不影响、已批准可生效，行契约按父单审批状态决定冲销。 */
	public void testMM_S01_ApprovalStatusControlsInventoryEligibility() {
		Service service = new Service();
		GoodsReceipt receipt = new GoodsReceipt();
		GoodsReceiptLine line = (GoodsReceiptLine) receipt.getGoodsReceiptLines().create();
		IMaterialReceiptContract contract = null;
		for (IBusinessLogicContract candidate : line.getContracts()) {
			if (candidate instanceof IMaterialReceiptContract) {
				contract = (IMaterialReceiptContract) candidate;
			}
		}
		assertNotNull("Receipt line must expose its real inventory contract.", contract);
		for (emApprovalStatus status : emApprovalStatus.values()) {
			receipt.setApprovalStatus(status);
			boolean expected = status == emApprovalStatus.UNAFFECTED || status == emApprovalStatus.APPROVED;
			assertEquals("Receipt eligibility for approval status " + status, expected, service.accepts(receipt));
			assertEquals("Line contract must offset inventory for inactive approval status " + status, !expected, contract.isOffsetting());
		}
	}

	/** MM-S02：收货单头和行遍历全部业务状态；计划态不生效，下达/完成/结算不等同于取消。 */
	public void testMM_S02_DocumentAndLineStatusEligibility() {
		Service service = new Service();
		GoodsReceipt receipt = new GoodsReceipt();
		GoodsReceiptLine line = new GoodsReceiptLine();
		for (emDocumentStatus status : emDocumentStatus.values()) {
			receipt.setDocumentStatus(status);
			line.setLineStatus(status);
			assertEquals("Receipt eligibility for document status " + status,
					status != emDocumentStatus.PLANNED, service.accepts(receipt));
			assertEquals("Line eligibility for document status " + status,
					status != emDocumentStatus.PLANNED, service.accepts(line));
		}
	}

	/** MM-S03：有效收货行依次取消、恢复及删除、恢复；准入只随当前状态变化。 */
	public void testMM_S03_CancelAndDeleteFlagsCanBeRestored() {
		Service service = new Service();
		GoodsReceiptLine line = new GoodsReceiptLine();
		line.setLineStatus(emDocumentStatus.RELEASED);
		assertTrue("Released active line must be eligible.", service.accepts(line));
		line.setCanceled(emYesNo.YES);
		assertFalse(service.accepts(line));
		line.setCanceled(emYesNo.NO);
		assertTrue(service.accepts(line));
		line.delete();
		assertFalse(service.accepts(line));
		line.undelete();
		assertTrue(service.accepts(line));
	}
}
