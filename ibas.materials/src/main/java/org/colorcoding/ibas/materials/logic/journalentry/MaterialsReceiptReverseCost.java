package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.logic.MaterialInventoryBusinessLogic;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料收货时的成本（反向）
 */
public class MaterialsReceiptReverseCost extends MaterialsInventoryCost {
	/**
	 * 构造函数
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 */
	public MaterialsReceiptReverseCost(Object sourceData, BigDecimal quantity) {
		super(sourceData, quantity);
		this.setNegate(false);
	}

	/**
	 * 构造函数
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 * @param negate     负数（默认：false）
	 */
	public MaterialsReceiptReverseCost(Object sourceData, BigDecimal quantity, boolean negate) {
		this(sourceData, quantity);
		this.setNegate(negate);
	}

	protected boolean caculate(String itemCode, String warehouse) {
		// 检查物料收货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setValue(emDirection.IN);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
		condition.setValue(MaterialInventoryBusinessLogic.DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setValue(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_OBJECTCODE));
		if (this.getSourceData() instanceof IBODocument) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBODocument) this.getSourceData()).getDocEntry());
		} else if (this.getSourceData() instanceof IBODocumentLine) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBODocumentLine) this.getSourceData()).getDocEntry());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
			condition.setValue(((IBODocumentLine) this.getSourceData()).getLineId());
		} else if (this.getSourceData() instanceof IBOSimple) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBOSimple) this.getSourceData()).getObjectKey());
		} else if (this.getSourceData() instanceof IBOSimpleLine) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(((IBOSimpleLine) this.getSourceData()).getObjectKey());
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
			condition.setValue(((IBOSimpleLine) this.getSourceData()).getLineId());
		}
		IMaterialInventory inventory = null;
		if (criteria.getConditions().size() > 3) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(this.getService().getRepository());
			IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
					.fetchMaterialInventoryJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IMaterialInventoryJournal journal : operationResult.getResultObjects()) {
				if (!journal.getItemCode().equals(itemCode)) {
					continue;
				}
				if (!journal.getWarehouse().equals(warehouse)) {
					continue;
				}
				inventory = new MaterialInventory();
				inventory.setItemCode(journal.getItemCode());
				inventory.setOnHand(journal.getInventoryQuantity());
				inventory.setAvgPrice(journal.getCalculatedPrice());
				inventory.setInventoryValue(journal.getInventoryValue());
				break;
			}
			if (inventory == null) {
				if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
						true)) {
					/* 按仓库核算成本 */
					criteria = new Criteria();
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
					condition.setValue(itemCode);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
					condition.setValue(warehouse);
					for (IMaterialInventory item : boRepository.fetchMaterialInventory(criteria).getResultObjects()) {
						inventory = item;
						break;
					}
				} else {
					/* 按物料核算成本 */
					criteria = new Criteria();
					condition = criteria.getConditions().create();
					condition.setAlias(Material.PROPERTY_CODE.getName());
					condition.setValue(itemCode);
					for (IMaterial material : boRepository.fetchMaterial(criteria).getResultObjects()) {
						inventory = new MaterialInventory();
						inventory.setItemCode(material.getCode());
						inventory.setOnCommited(material.getOnCommited());
						inventory.setOnHand(material.getOnHand());
						inventory.setOnOrdered(material.getOnOrdered());
						inventory.setOnReserved(material.getOnReserved());
						inventory.setAvgPrice(material.getAvgPrice());
						inventory.setInventoryValue(material.getInventoryValue());
						break;
					}
				}
			}
			if (inventory != null) {
				if (inventory.getOnHand().compareTo(this.getQuantity()) <= 0
						|| inventory.getInventoryValue().compareTo(this.getAmount().abs()) < 0) {
					this.setAmount(inventory.getInventoryValue());
				}
			}
		}
		return true;
	}
}
