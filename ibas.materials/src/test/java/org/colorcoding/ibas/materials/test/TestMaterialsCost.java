package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.materials.MyConfiguration;
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
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import junit.framework.TestCase;

public class TestMaterialsCost extends TestCase {

	public void testReceipt() throws Exception {
		assertTrue("not enabled materials cost.",
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false));
		assertTrue("not enabled materials by warehouse.",
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, false));
		// 新建仓库
		IWarehouse warehouse = new Warehouse();
		warehouse.setCode("WHS-TEST");
		warehouse.setName("Test");

		// 新建物料
		IMaterial material = new Material();
		material.setCode(Strings.format("A-%s", DateTimes.now().toString("yyyyMMddhhmm")));
		material.setName("Test for cost");
		material.setBatchManagement(emYesNo.YES);
		material.setValuationMethod(emValuationMethod.BATCH_MOVING_AVERAGE);

		// 收货
		IGoodsReceipt goodsReceipt = new GoodsReceipt();
		goodsReceipt.setReference1("Test for cost");
		IGoodsReceiptLine receiptLine1 = goodsReceipt.getGoodsReceiptLines().create();
		receiptLine1.setItemCode(material.getCode());
		receiptLine1.setQuantity(Decimals.valueOf(10));
		receiptLine1.setPrice(Decimals.valueOf(100));
		receiptLine1.setWarehouse(warehouse.getCode());
		receiptLine1.setBatchManagement(material.getBatchManagement());
		receiptLine1.setSerialManagement(material.getSerialManagement());
		IMaterialBatchItem batchItem = receiptLine1.getMaterialBatches().create();
		batchItem.setBatchCode(DateTimes.now().toString("yyyyMMdd"));
		batchItem.setQuantity(receiptLine1.getQuantity());

		IGoodsReceiptLine receiptLine2 = goodsReceipt.getGoodsReceiptLines().create();
		receiptLine2.setItemCode(material.getCode());
		receiptLine2.setQuantity(Decimals.valueOf(10));
		receiptLine2.setPrice(Decimals.valueOf(50));
		receiptLine2.setWarehouse(warehouse.getCode());
		receiptLine2.setBatchManagement(material.getBatchManagement());
		receiptLine2.setSerialManagement(material.getSerialManagement());
		batchItem = receiptLine2.getMaterialBatches().create();
		batchItem.setBatchCode(DateTimes.now().toString("yyyyMMdd"));
		batchItem.setQuantity(Decimals.valueOf(10));

		try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER);
			// 基础数据
			if (boRepository.fetchWarehouse(warehouse.getCriteria()).getResultObjects().isEmpty()) {
				warehouse = BOUtilities.valueOf(boRepository.saveWarehouse(warehouse)).firstOrDefault();
			}
			if (boRepository.fetchMaterial(material.getCriteria()).getResultObjects().isEmpty()) {
				material = BOUtilities.valueOf(boRepository.saveMaterial(material)).firstOrDefault();
			}
			// 保存单据
			goodsReceipt = BOUtilities.valueOf(boRepository.saveGoodsReceipt(goodsReceipt)).firstOrDefault();
			BigDecimal avgPrice = Decimals.divide(goodsReceipt.getGoodsReceiptLines().sum(c -> c.getLineTotal()),
					goodsReceipt.getGoodsReceiptLines().sum(c -> c.getInventoryQuantity()));

			// 检查库存数量
			material = BOUtilities.valueOf(boRepository.fetchMaterial(material.getCriteria())).firstOrDefault();
			assertEquals("material onHand not equest.",
					goodsReceipt.getGoodsReceiptLines().sum(c -> c.getInventoryQuantity()), material.getOnHand());
			// 非个别管理时有意义
			// assertEquals("material avgPrice not equest.", avgPrice,
			// material.getAvgPrice());

			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE);
			condition.setValue(material.getCode());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE);
			condition.setValue(warehouse.getCode());
			IMaterialInventory materialInventory = BOUtilities.valueOf(boRepository.fetchMaterialInventory(criteria))
					.firstOrDefault();
			assertEquals("warehouse onHand not equest.", materialInventory.getOnHand().stripTrailingZeros(),
					material.getOnHand().stripTrailingZeros());
			assertEquals("material avgPrice not equest.", avgPrice.stripTrailingZeros(),
					materialInventory.getAvgPrice().stripTrailingZeros());

			criteria = new Criteria();
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE);
			condition.setValue(material.getCode());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE);
			condition.setValue(warehouse.getCode());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE);
			condition.setValue(batchItem.getBatchCode());

			IMaterialBatch materialBatch = BOUtilities.valueOf(boRepository.fetchMaterialBatch(criteria))
					.firstOrDefault();
			assertEquals("batch onHand not equest.", materialBatch.getQuantity().stripTrailingZeros(),
					material.getOnHand().stripTrailingZeros());
			assertEquals("material avgPrice not equest.", avgPrice.stripTrailingZeros(),
					materialBatch.getAvgPrice().stripTrailingZeros());

			// 单据改为计划，库存是否回滚
			goodsReceipt.setDocumentStatus(emDocumentStatus.PLANNED);
			goodsReceipt = BOUtilities.valueOf(boRepository.saveGoodsReceipt(goodsReceipt)).firstOrDefault();
			material = BOUtilities.valueOf(boRepository.fetchMaterial(material.getCriteria())).firstOrDefault();
			assertEquals("material onHand not rolling back.", Decimals.VALUE_ZERO, material.getOnHand());
			materialBatch = BOUtilities.valueOf(boRepository.fetchMaterialBatch(criteria)).firstOrDefault();
			assertEquals("batch onHand notrolling back.", Decimals.VALUE_ZERO, materialBatch.getQuantity());
		}
	}
}
