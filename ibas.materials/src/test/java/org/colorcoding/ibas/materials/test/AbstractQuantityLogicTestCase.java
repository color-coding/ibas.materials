package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.configuration.Configuration;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 数量逻辑测试基类。
 *
 * <p>
 * 统一抽象：
 * <ul>
 * <li>4 种物料类型（库存/服务/批次/序列）的物料工厂</li>
 * <li>仓库工厂</li>
 * <li>三量快照与断言（OnHand / OnCommited / OnOrdered）</li>
 * <li>物料级与仓库级两层一致性断言</li>
 * </ul>
 */
public abstract class AbstractQuantityLogicTestCase extends AbstractBusinessTestCase {

	static {
		// 使用中文提示，测试中文字匹配
		Configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_LANGUAGE_CODE, "zh_CN");
	}

	private String originalEnableMaterialCosts;
	private String originalMaterialCostsByWarehouse;

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		originalEnableMaterialCosts = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS);
		originalMaterialCostsByWarehouse = MyConfiguration
				.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE);
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, "true");
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, "true");
	}

	@Override
	protected void tearDown() throws Exception {
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS,
				originalEnableMaterialCosts == null ? Strings.VALUE_EMPTY : originalEnableMaterialCosts);
		MyConfiguration.create().addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
				originalMaterialCostsByWarehouse == null ? Strings.VALUE_EMPTY : originalMaterialCostsByWarehouse);
		super.tearDown();
	}

	/** 物料类型枚举 - 测试矩阵驱动 */
	protected enum MaterialKind {
		/** 普通库存物料 */
		INVENTORY,
		/** 服务物料（不影响数量） */
		SERVICE,
		/** 批次管理物料 */
		BATCH,
		/** 序列号管理物料 */
		SERIAL,
	}

	/** 三量快照 */
	protected static class QuantitySnapshot {
		public final BigDecimal onHand;
		public final BigDecimal onCommited;
		public final BigDecimal onOrdered;

		public QuantitySnapshot(BigDecimal onHand, BigDecimal onCommited, BigDecimal onOrdered) {
			assertNotNull("onHand must not be null.", onHand);
			this.onHand = onHand;
			assertNotNull("onCommited must not be null.", onCommited);
			this.onCommited = onCommited;
			assertNotNull("onOrdered must not be null.", onOrdered);
			this.onOrdered = onOrdered;
		}

		@Override
		public String toString() {
			return Strings.format("OnHand=%s, OnCommited=%s, OnOrdered=%s", onHand, onCommited, onOrdered);
		}
	}

	// =================== 仓库工厂 ===================

	protected IWarehouse prepareWarehouse(BORepositoryMaterials boRepository, String code, String name)
			throws Exception {
		IWarehouse warehouse = new Warehouse();
		warehouse.setCode(code);
		warehouse.setName(name);
		if (boRepository.fetchWarehouse(warehouse.getCriteria()).getResultObjects().isEmpty()) {
			warehouse = BOUtilities.valueOf(boRepository.saveWarehouse(warehouse)).firstOrDefault();
		} else {
			warehouse = BOUtilities.valueOf(boRepository.fetchWarehouse(warehouse.getCriteria())).firstOrDefault();
		}
		return warehouse;
	}

	protected IWarehouse prepareWarehouse(BORepositoryMaterials boRepository) throws Exception {
		return this.prepareWarehouse(boRepository, "WHS-QTY", "Quantity Logic Test Warehouse");
	}

	// =================== 物料工厂 ===================

	/**
	 * 按种类构造测试用物料（每用例独立编码避免数据污染）
	 *
	 * @param boRepository 仓库
	 * @param kind         物料种类
	 * @param tag          用例标签（用于物料编码）
	 */
	protected IMaterial prepareMaterial(BORepositoryMaterials boRepository, MaterialKind kind, String tag)
			throws Exception {
		IMaterial material = new Material();
		material.setCode(
				Strings.format("%s-%s-%s", kind.name().charAt(0), tag, DateTimes.now().toString("yyyyMMddHHmmss")));
		material.setName(Strings.format("QtyTest-%s-%s", kind.name(), tag));
		switch (kind) {
		case SERVICE:
			material.setItemType(emItemType.SERVICES);
			material.setInventoryItem(emYesNo.NO);
			material.setBatchManagement(emYesNo.NO);
			material.setSerialManagement(emYesNo.NO);
			break;
		case BATCH:
			material.setItemType(emItemType.ITEM);
			material.setInventoryItem(emYesNo.YES);
			material.setBatchManagement(emYesNo.YES);
			material.setSerialManagement(emYesNo.NO);
			break;
		case SERIAL:
			material.setItemType(emItemType.ITEM);
			material.setInventoryItem(emYesNo.YES);
			material.setBatchManagement(emYesNo.NO);
			material.setSerialManagement(emYesNo.YES);
			break;
		case INVENTORY:
		default:
			material.setItemType(emItemType.ITEM);
			material.setInventoryItem(emYesNo.YES);
			material.setBatchManagement(emYesNo.NO);
			material.setSerialManagement(emYesNo.NO);
			break;
		}
		return BOUtilities.valueOf(boRepository.saveMaterial(material)).firstOrDefault();
	}

	// =================== 三量查询 ===================

	/** 重新读取物料获取最新的三量 */
	protected IMaterial reload(BORepositoryMaterials boRepository, IMaterial material) throws Exception {
		return BOUtilities.valueOf(boRepository.fetchMaterial(material.getCriteria())).firstOrDefault();
	}

	/** 物料级三量快照 */
	protected QuantitySnapshot snapshotMaterial(BORepositoryMaterials boRepository, IMaterial material)
			throws Exception {
		IMaterial m = reload(boRepository, material);
		assertNotNull("Material must exist before checking quantities.", m);
		return new QuantitySnapshot(m.getOnHand(), m.getOnCommited(), m.getOnOrdered());
	}

	/** 仓库级三量快照 */
	protected QuantitySnapshot snapshotWarehouse(BORepositoryMaterials boRepository, String itemCode,
			String warehouseCode) throws Exception {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
		condition.setValue(itemCode);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
		condition.setValue(warehouseCode);
		IMaterialInventory inv = BOUtilities.valueOf(boRepository.fetchMaterialInventory(criteria)).firstOrDefault();
		if (inv == null) {
			return new QuantitySnapshot(Decimals.VALUE_ZERO, Decimals.VALUE_ZERO, Decimals.VALUE_ZERO);
		}
		return new QuantitySnapshot(inv.getOnHand(), inv.getOnCommited(), inv.getOnOrdered());
	}

	// =================== 三量断言 ===================

	/**
	 * 物料级 + 仓库级 三量同步断言（两层必须一致）
	 */
	protected void assertQuantities(BORepositoryMaterials boRepository, IMaterial material, String warehouseCode,
			BigDecimal expOnHand, BigDecimal expOnCommited, BigDecimal expOnOrdered) throws Exception {
		QuantitySnapshot m = snapshotMaterial(boRepository, material);
		QuantitySnapshot w = snapshotWarehouse(boRepository, material.getCode(), warehouseCode);

		assertEqualsBD("[Material] OnHand mismatch.", expOnHand, m.onHand);
		assertEqualsBD("[Material] OnCommited mismatch.", expOnCommited, m.onCommited);
		assertEqualsBD("[Material] OnOrdered mismatch.", expOnOrdered, m.onOrdered);

		assertEqualsBD("[Warehouse] OnHand mismatch.", expOnHand, w.onHand);
		assertEqualsBD("[Warehouse] OnCommited mismatch.", expOnCommited, w.onCommited);
		assertEqualsBD("[Warehouse] OnOrdered mismatch.", expOnOrdered, w.onOrdered);
	}

	/**
	 * 服务物料断言：三量恒为 0
	 */
	protected void assertServiceMaterialQuantities(BORepositoryMaterials boRepository, IMaterial material,
			String warehouseCode) throws Exception {
		QuantitySnapshot m = snapshotMaterial(boRepository, material);
		assertEqualsBD("[Service-Material] OnHand should be 0.", Decimals.VALUE_ZERO, m.onHand);
		assertEqualsBD("[Service-Material] OnCommited should be 0.", Decimals.VALUE_ZERO, m.onCommited);
		assertEqualsBD("[Service-Material] OnOrdered should be 0.", Decimals.VALUE_ZERO, m.onOrdered);
		QuantitySnapshot w = snapshotWarehouse(boRepository, material.getCode(), warehouseCode);
		assertEqualsBD("[Service-Warehouse] OnHand should be 0.", Decimals.VALUE_ZERO, w.onHand);
		assertEqualsBD("[Service-Warehouse] OnCommited should be 0.", Decimals.VALUE_ZERO, w.onCommited);
		assertEqualsBD("[Service-Warehouse] OnOrdered should be 0.", Decimals.VALUE_ZERO, w.onOrdered);
	}

	// =================== 仓库构建 ===================

}
