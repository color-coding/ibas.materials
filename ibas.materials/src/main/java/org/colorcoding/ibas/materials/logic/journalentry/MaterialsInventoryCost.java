package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.businesspartner.logic.journalentry.JournalEntrySmartContent;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料库存成本计算（非库存物料不重新计算）
 */
public class MaterialsInventoryCost extends MaterialsCost {

	/**
	 * 构造函数
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 */
	public MaterialsInventoryCost(Object sourceData, BigDecimal quantity) {
		super(sourceData);
		this.setQuantity(quantity);
		this.setNegate(false);
	}

	/**
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 * @param negate     负数（默认：false）
	 */
	public MaterialsInventoryCost(Object sourceData, BigDecimal quantity, Boolean negate) {
		this(sourceData, quantity);
		this.setNegate(negate);
	}

	private boolean negate = false;

	public final boolean isNegate() {
		return negate;
	}

	public final void setNegate(boolean negate) {
		this.negate = negate;
	}

	private BigDecimal quantity;

	public final BigDecimal getQuantity() {
		if (this.quantity == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_not_specified_quantity"));
		}
		return quantity;
	}

	public final void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	protected BigDecimal getAvgPrice(String itemCode, String warehouse) {
		if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true)) {
			/* 按仓库核算成本 */
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
			condition.setValue(itemCode);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
			condition.setValue(warehouse);
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(this.getService().getRepository());
			IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IMaterialInventory materialInventory : operationResult.getResultObjects()) {
				return materialInventory.getAvgPrice();
			}
		} else {
			/* 按物料核算成本 */
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(Material.PROPERTY_CODE.getName());
			condition.setValue(itemCode);
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(this.getService().getRepository());
			IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IMaterial material : operationResult.getResultObjects()) {
				// 服务物料成本不记
				if (material.getItemType() == emItemType.SERVICES) {
					continue;
				}
				return material.getAvgPrice();
			}
		}
		return null;
	}

	@Override
	public final void caculate() throws Exception {
		String material = String.valueOf(super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
		if (JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(material)) {
			throw new BusinessLogicException(I18N.prop("msg_mm_not_specified_material"));
		}
		// 库存物料时，重新计算成本
		if (this.isInventoryMaterial(material)) {
			if (!this.caculate(material,
					String.valueOf(super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_WAREHOUSE)))) {
				// 计算不成功，报错
				throw new Exception(I18N.prop("msg_bobas_not_support_the_compute"));
			}
			if (this.getAmount() != null && this.getAmount().compareTo(Decimal.ZERO) > 0) {
				if (this.isNegate()) {
					this.setAmount(this.getAmount().negate());
				}
			}
		}
	}

	/**
	 * 计算物料成本
	 * 
	 * @param itemCode
	 * @param warehouse
	 * @return true，计算完成；false，计算不成功
	 */
	protected boolean caculate(String itemCode, String warehouse) {
		BigDecimal avaPrice = null;
		if (this.getSourceData() instanceof IBusinessObject) {
			IBusinessObject bo = (IBusinessObject) this.getSourceData();
			if (bo.isNew()) {
				// 新建的取物料上的
				avaPrice = this.getAvgPrice(itemCode, warehouse);
			} else {
				Criteria criteria = new Criteria();
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
				condition.setValue(emDirection.OUT);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
				condition.setValue(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_OBJECTCODE));
				if (this.getSourceData() instanceof IBODocument) {
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
					condition.setValue(((IBODocument) this.getSourceData()).getDocEntry());
				} else if (this.getSourceData() instanceof IBODocumentLine) {
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
					condition.setValue(((IBODocumentLine) this.getSourceData()).getDocEntry());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
					condition.setValue(((IBODocumentLine) this.getSourceData()).getLineId());
				}
				if (criteria.getConditions().size() > 2) {
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
						avaPrice = journal.getCalculatedPrice();
					}
				}
				if (avaPrice == null) {
					// 库存记录没有
					avaPrice = this.getAvgPrice(itemCode, warehouse);
				}
			}
			if (avaPrice != null) {
				this.setAmount(Decimal.multiply(this.getQuantity(), avaPrice));
			} else {
				this.setAmount(Decimal.ZERO);
			}
		}
		return true;
	}
}
