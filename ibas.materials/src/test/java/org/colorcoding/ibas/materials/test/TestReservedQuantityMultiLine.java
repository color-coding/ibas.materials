package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 预留数量（OnReserved）多行场景 测试。
 *
 * <p>基于 LOGIC-MATRIX §1.1/1.4 推导：</p>
 * <ul>
 * <li>MaterialInventoryReservation 保存时同时触发 4 个契约：
 *   IMaterialReservedContract → Material.OnReserved
 *   IMaterialWarehouseReservedContract → MaterialInventory.OnReserved
 *   IMaterialBatchReservedContract (如有 batchCode)
 *   IMaterialSerialReservedContract (如有 serialCode)</li>
 * <li>contract.getQuantity() = reservation.quantity - reservation.closedQuantity</li>
 * <li>MaterialReservedService.impact 中用 impactReserved 实例字段去重累加：
 *   onReserved = onReserved - impactReserved + qty；impactReserved += qty</li>
 * <li>MaterialWarehouseReservedService 同理，且批次/序列物料跳过库存超限校验</li>
 * </ul>
 *
 * <p>覆盖：</p>
 * <ul>
 * <li>MM-R01：单行预留 → OnReserved = qty</li>
 * <li>MM-R02：同物料同仓库两行预留 → OnReserved = qty1 + qty2（验证 impactReserved 去重）</li>
 * <li>MM-R03：取消其中一行 → OnReserved 仅减去被取消行</li>
 * <li>MM-R04：删除其中一行 → OnReserved 仅减去被删行</li>
 * <li>MM-R05：一行 status=CLOSED → 该行 qty 变为 0（contract.quantity = qty - closedQty，
 *   CLOSED 时 impact 中 qty=0），OnReserved 减去该行</li>
 * <li>MM-R06：物料级与仓库级 OnReserved 一致性</li>
 * </ul>
 */
public class TestReservedQuantityMultiLine extends AbstractQuantityLogicTestCase {

	// ---------------- 工具 ----------------

	private IMaterialInventoryReservation buildReservation(IMaterial mt, IWarehouse wh, BigDecimal qty) {
		IMaterialInventoryReservation r = new MaterialInventoryReservation();
		r.setItemCode(mt.getCode());
		r.setWarehouse(wh.getCode());
		r.setQuantity(qty);
		r.setTargetDocumentType("TEST_DOC");
		r.setTargetDocumentEntry(1);
		r.setTargetDocumentLineId(1);
		return r;
	}

	/** 入库以保证 OnHand 足够预留（非批次/序列物料检查 OnReserved <= OnHand） */
	private void seedInventory(BORepositoryMaterials repo, IMaterial mt, IWarehouse wh, BigDecimal qty)
			throws Exception {
		org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt gr =
				new org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt();
		org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine line = gr.getGoodsReceiptLines().create();
		line.setItemCode(mt.getCode());
		line.setQuantity(qty);
		line.setPrice(Decimals.valueOf(20));
		line.setWarehouse(wh.getCode());
		line.setBatchManagement(mt.getBatchManagement());
		line.setSerialManagement(mt.getSerialManagement());
		BOUtilities.valueOf(repo.saveGoodsReceipt(gr)).firstOrDefault();
	}

	private BigDecimal onReservedOfMaterial(BORepositoryMaterials repo, IMaterial mt) throws Exception {
		IMaterial m = reloadMaterial(repo, mt);
		return m == null ? Decimals.VALUE_ZERO : m.getOnReserved();
	}

	private BigDecimal onReservedOfWarehouse(BORepositoryMaterials repo, String itemCode, String warehouseCode)
			throws Exception {
		QuantitySnapshot s = snapshotOfWarehouse(repo, itemCode, warehouseCode);
		// OnReserved 不在 QuantitySnapshot 中，单独查
		org.colorcoding.ibas.bobas.common.ICriteria criteria = new org.colorcoding.ibas.bobas.common.Criteria();
		org.colorcoding.ibas.bobas.common.ICondition c = criteria.getConditions().create();
		c.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
		c.setValue(itemCode);
		c = criteria.getConditions().create();
		c.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
		c.setValue(warehouseCode);
		IMaterialInventory inv = BOUtilities.valueOf(repo.fetchMaterialInventory(criteria)).firstOrDefault();
		return inv == null ? Decimals.VALUE_ZERO : inv.getOnReserved();
	}

	// ==================================================================
	// MM-R01：单行预留 → OnReserved = qty
	//   推导依据：MaterialReservedService.impact:
	//   onReserved = onReserved - 0 + qty = qty
	// ==================================================================

	public void testMM_R01_SingleReservation() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "R01I");
			seedInventory(repo, mt, wh, Decimals.valueOf(20));

			IMaterialInventoryReservation r = buildReservation(mt, wh, Decimals.valueOf(10));
			r = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r)).firstOrDefault();
			assertTrue("Reservation saved.", r.getObjectKey() > 0);

			assertEqualsBD("Material.OnReserved = 10.", Decimals.valueOf(10), onReservedOfMaterial(repo, mt));
			assertEqualsBD("Warehouse.OnReserved = 10.", Decimals.valueOf(10),
					onReservedOfWarehouse(repo, mt.getCode(), wh.getCode()));
		}
	}

	// ==================================================================
	// MM-R02：两行同物料同仓库预留 (6 + 4) → OnReserved = 10
	//   推导依据：impactReserved 去重机制
	//   行1: onReserved = 0 - 0 + 6 = 6, impactReserved = 6
	//   行2: onReserved = 6 - 6 + 4 = 4 → 错！应该是在数据库已提交的 6 基础上
	//   实际：行2 的 fetchBeAffected 重新读 Material（OnReserved=6），
	//   onReserved = 6 - 6 + 4 = 4 → 但 impactReserved 已包含行1的6
	//   wait... 这里两次 save 是两个独立事务，impactReserved 会重置
	//   所以实际：第一次 save 后 OnReserved=6，第二次 save 后 OnReserved=6+4=10
	// ==================================================================

	public void testMM_R02_TwoReservationsSameMaterial_OnReservedMerged() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "R02I");
			seedInventory(repo, mt, wh, Decimals.valueOf(20));

			// 第一行
			IMaterialInventoryReservation r1 = buildReservation(mt, wh, Decimals.valueOf(6));
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();
			assertEqualsBD("After r1, OnReserved = 6.", Decimals.valueOf(6), onReservedOfMaterial(repo, mt));

			// 第二行
			IMaterialInventoryReservation r2 = buildReservation(mt, wh, Decimals.valueOf(4));
			r2 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r2)).firstOrDefault();
			assertEqualsBD("After r2, OnReserved = 10.", Decimals.valueOf(10), onReservedOfMaterial(repo, mt));
			assertEqualsBD("Warehouse.OnReserved = 10.", Decimals.valueOf(10),
					onReservedOfWarehouse(repo, mt.getCode(), wh.getCode()));
		}
	}

	// ==================================================================
	// MM-R03：两行预留 (6 + 4)，取消第一行 → OnReserved = 4
	//   推导依据：取消 r1 触发 revoke，onReserved -= 6
	// ==================================================================

	public void testMM_R03_CancelOneReservation() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "R03I");
			seedInventory(repo, mt, wh, Decimals.valueOf(20));

			IMaterialInventoryReservation r1 = buildReservation(mt, wh, Decimals.valueOf(6));
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();

			IMaterialInventoryReservation r2 = buildReservation(mt, wh, Decimals.valueOf(4));
			r2 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r2)).firstOrDefault();
			assertEqualsBD("After both, OnReserved = 10.", Decimals.valueOf(10), onReservedOfMaterial(repo, mt));

			// 删除 r1（Reservation 无 canceled 属性，用 delete 替代）
			r1.delete();
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();

			assertEqualsBD("After delete r1, OnReserved = 4.", Decimals.valueOf(4), onReservedOfMaterial(repo, mt));
			assertEqualsBD("Warehouse.OnReserved = 4.", Decimals.valueOf(4),
					onReservedOfWarehouse(repo, mt.getCode(), wh.getCode()));
		}
	}

	// ==================================================================
	// MM-R04：两行预留 (6 + 4)，删除第一行 → OnReserved = 4
	//   （与 R03 场景相同，独立验证 delete 路径）
	// ==================================================================

	public void testMM_R04_DeleteOneReservation() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "R04I");
			seedInventory(repo, mt, wh, Decimals.valueOf(20));

			IMaterialInventoryReservation r1 = buildReservation(mt, wh, Decimals.valueOf(6));
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();

			IMaterialInventoryReservation r2 = buildReservation(mt, wh, Decimals.valueOf(4));
			r2 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r2)).firstOrDefault();
			assertEqualsBD("After both, OnReserved = 10.", Decimals.valueOf(10), onReservedOfMaterial(repo, mt));

			// 删除 r1
			r1.delete();
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();

			assertEqualsBD("After delete r1, OnReserved = 4.", Decimals.valueOf(4), onReservedOfMaterial(repo, mt));
		}
	}

	// ==================================================================
	// MM-R05：一行 status=CLOSED → OnReserved 减去该行
	//   推导依据：contract.getQuantity() = reservation.quantity - closedQuantity
	//   且 impact 中 status=CLOSED 时 qty 按 0 计算
	//   checkDataStatus 中 CLOSED && impactReserved==0 时跳过
	//   但第二次保存（revoke 旧值 + impact 新值）：
	//   revoke 旧值 qty=6，impact 新值 status=CLOSED → qty=0
	//   净效应：OnReserved -= 6
	// ==================================================================

	public void testMM_R05_CloseOneReservation() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "R05I");
			seedInventory(repo, mt, wh, Decimals.valueOf(20));

			IMaterialInventoryReservation r1 = buildReservation(mt, wh, Decimals.valueOf(6));
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();
			assertEqualsBD("After r1, OnReserved = 6.", Decimals.valueOf(6), onReservedOfMaterial(repo, mt));

			IMaterialInventoryReservation r2 = buildReservation(mt, wh, Decimals.valueOf(4));
			r2 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r2)).firstOrDefault();
			assertEqualsBD("After r2, OnReserved = 10.", Decimals.valueOf(10), onReservedOfMaterial(repo, mt));

			// 关闭 r1
			r1.setStatus(emBOStatus.CLOSED);
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();

			assertEqualsBD("After close r1, OnReserved = 4.", Decimals.valueOf(4), onReservedOfMaterial(repo, mt));
			assertEqualsBD("Warehouse.OnReserved = 4.", Decimals.valueOf(4),
					onReservedOfWarehouse(repo, mt.getCode(), wh.getCode()));
		}
	}

	// ==================================================================
	// MM-R06：物料级与仓库级 OnReserved 一致性（两行 + 取消一行 + 关闭一行）
	// ==================================================================

	public void testMM_R06_MaterialWarehouseConsistency() throws Exception {
		try (BORepositoryMaterials repo = createMaterialsRepository()) {
			IWarehouse wh = prepareWarehouse(repo);
			IMaterial mt = prepareMaterial(repo, MaterialKind.INVENTORY, "R06I");
			seedInventory(repo, mt, wh, Decimals.valueOf(20));

			// 三行预留 3 + 5 + 2 = 10
			IMaterialInventoryReservation r1 = buildReservation(mt, wh, Decimals.valueOf(3));
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();
			IMaterialInventoryReservation r2 = buildReservation(mt, wh, Decimals.valueOf(5));
			r2 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r2)).firstOrDefault();
			IMaterialInventoryReservation r3 = buildReservation(mt, wh, Decimals.valueOf(2));
			r3 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r3)).firstOrDefault();

			BigDecimal matRes = onReservedOfMaterial(repo, mt);
			BigDecimal whRes = onReservedOfWarehouse(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("Material.OnReserved = 10.", Decimals.valueOf(10), matRes);
			assertEqualsBD("Warehouse.OnReserved = Material.OnReserved.", matRes, whRes);

			// 删除 r2 (qty=5) → OnReserved = 5
			r2.delete();
			r2 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r2)).firstOrDefault();
			matRes = onReservedOfMaterial(repo, mt);
			whRes = onReservedOfWarehouse(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("After cancel r2, OnReserved = 5.", Decimals.valueOf(5), matRes);
			assertEqualsBD("Warehouse.OnReserved = Material.OnReserved.", matRes, whRes);

			// 关闭 r1 (qty=3) → OnReserved = 2
			r1.setStatus(emBOStatus.CLOSED);
			r1 = BOUtilities.valueOf(repo.saveMaterialInventoryReservation(r1)).firstOrDefault();
			matRes = onReservedOfMaterial(repo, mt);
			whRes = onReservedOfWarehouse(repo, mt.getCode(), wh.getCode());
			assertEqualsBD("After close r1, OnReserved = 2.", Decimals.valueOf(2), matRes);
			assertEqualsBD("Warehouse.OnReserved = Material.OnReserved.", matRes, whRes);
		}
	}
}
