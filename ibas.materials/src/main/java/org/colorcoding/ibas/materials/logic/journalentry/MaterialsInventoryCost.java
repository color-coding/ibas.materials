package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchReceiptParent;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialReceiptParent;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料库存成本计算。
 *
 * <p>
 * 本类实现"库存物料"成本策略（移动平均 / 批次平均 / 序列平均）。 非库存、服务、虚拟件由父类 {@link MaterialsCost}
 * 统一模板处理。
 * </p>
 */
public class MaterialsInventoryCost extends MaterialsCost {

	public MaterialsInventoryCost(Object sourceData, BigDecimal quantity) {
		this(sourceData, quantity, false);
	}

	public MaterialsInventoryCost(Object sourceData, BigDecimal quantity, Boolean negate) {
		super(sourceData);
		this.quantity = quantity;
		this.negate = Boolean.TRUE.equals(negate);
	}

	private boolean negate = false;
	private BigDecimal quantity;

	public final boolean isNegate() {
		return negate;
	}

	public final void setNegate(boolean negate) {
		this.negate = negate;
	}

	public final BigDecimal getQuantity() {
		if (this.quantity == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_not_specified_quantity"));
		}
		return quantity;
	}

	public final void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	@Override
	protected final boolean shouldNegate() {
		return this.isNegate();
	}

	// ============================================================
	// 库存策略：唯一入口
	// ============================================================

	/**
	 * 库存物料成本算法：新建单据用物料/批次/序列均价；已存在单据沿原始单据回查交易记录均价，回查不到再回退至均价。
	 */
	@Override
	protected boolean caculateInventoryCost(String itemCode, String warehouse) throws Exception {
		if (!(this.getSourceData() instanceof IBusinessObject)) {
			return false;
		}
		IBusinessObject bo = (IBusinessObject) this.getSourceData();
		BigDecimal avaPrice = bo.isNew() ? this.getAvgPrice(itemCode, warehouse)
				: this.getJournalsAvgPrice(itemCode, warehouse);
		if (avaPrice == null) {
			avaPrice = this.getAvgPrice(itemCode, warehouse);
		}
		BigDecimal amount = (avaPrice != null) ? Decimals.multiply(this.getQuantity(), avaPrice) : Decimals.VALUE_ZERO;
		if (this.getAmount() != null && this.getAmount().scale() > 0) {
			amount = amount.setScale(this.getAmount().scale(), Decimals.ROUNDING_MODE_DEFAULT);
		}
		this.setAmount(amount);
		return true;
	}

	// ============================================================
	// 非库存：按行税前金额（按数量比例分摊）
	// ============================================================

	@Override
	protected void caculateNonInventoryCost(String itemCode) throws Exception {
		BigDecimal base = this.getLineBaseAmount();
		if (base == null) {
			this.setAmount(Decimals.VALUE_ZERO);
			return;
		}
		BigDecimal lineQty = this.readLineQuantity();
		if (lineQty != null && lineQty.compareTo(Decimals.VALUE_ZERO) > 0
				&& this.getQuantity().compareTo(lineQty) != 0) {
			BigDecimal unit = Decimals.divide(base, lineQty);
			this.setAmount(Decimals.multiply(this.getQuantity(), unit));
		} else {
			this.setAmount(base);
		}
	}

	private BigDecimal readLineQuantity() {
		Object v = this.getSourceDataPropertyValue("InventoryQuantity");
		if (v instanceof BigDecimal)
			return (BigDecimal) v;
		v = this.getSourceDataPropertyValue("Quantity");
		return v instanceof BigDecimal ? (BigDecimal) v : null;
	}

	// ============================================================
	// 平均价（按物料/仓库/批次/序列）
	// ============================================================

	protected BigDecimal getAvgPrice(String itemCode, String warehouse) {
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
			boRepository.setTransaction(this.getTransaction());
			IMaterial material = boRepository.fetchMaterial(criteria).getResultObjects().firstOrDefault();
			if (material == null) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_exist", itemCode));
			}
			if (material.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
				criteria = new Criteria();
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE.getName());
				condition.setValue(itemCode);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE.getName());
				condition.setValue(warehouse);
				BigDecimal quantities = Decimals.VALUE_ZERO;
				BigDecimal totals = Decimals.VALUE_ZERO;
				if (material.getBatchManagement() == emYesNo.YES
						&& this.getSourceData() instanceof IMaterialBatchItemParent) {
					IOperationResult<IMaterialBatch> operationResult;
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE.getName());
					IMaterialBatchItemParent batchItemParent = (IMaterialBatchItemParent) this.getSourceData();
					for (IMaterialBatchItem journal : batchItemParent.getMaterialBatches()) {
						condition.setValue(journal.getBatchCode());
						operationResult = boRepository.fetchMaterialBatch(criteria);
						quantities = quantities.add(journal.getQuantity());
						totals = totals.add(Decimals.multiply(journal.getQuantity(),
								operationResult.getResultObjects().isEmpty() ? Decimals.VALUE_ZERO
										: operationResult.getResultObjects().firstOrDefault().getAvgPrice()));
					}
				} else if (material.getSerialManagement() == emYesNo.YES) {
					IOperationResult<IMaterialSerial> operationResult;
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
					IMaterialSerialItemParent serialItemParent = (IMaterialSerialItemParent) this.getSourceData();
					for (IMaterialSerialItem journal : serialItemParent.getMaterialSerials()) {
						condition.setValue(journal.getSerialCode());
						operationResult = boRepository.fetchMaterialSerial(criteria);
						if (operationResult.getResultObjects().isEmpty()) {
							throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_is_unavailable",
									warehouse, itemCode, journal.getSerialCode()));
						}
						quantities = quantities.add(Decimals.VALUE_ONE);
						totals = totals.add(Decimals.multiply(Decimals.VALUE_ONE,
								operationResult.getResultObjects().firstOrDefault().getAvgPrice()));
					}
				} else {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_material_is_not_batchmanagement", material.getCode()) + "\n"
									+ I18N.prop("msg_mm_material_is_not_serialmanagement", material.getCode()));
				}
				quantities = quantities.setScale(this.getQuantity().scale(), Decimals.ROUNDING_MODE_DEFAULT);
				if (Decimals.isZero(quantities)) {
					return Decimals.VALUE_ZERO;
				}
				return Decimals.divide(totals, quantities);
			} else {
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
					IOperationResult<IMaterialInventory> operationResult = boRepository
							.fetchMaterialInventory(criteria);
					if (operationResult.getError() != null) {
						throw new BusinessLogicException(operationResult.getError());
					}
					for (IMaterialInventory materialInventory : operationResult.getResultObjects()) {
						return materialInventory.getAvgPrice();
					}
				} else {
					/* 按物料核算成本 */
					return material.getAvgPrice();
				}
			}
		}
		return null;
	}

	protected BigDecimal getJournalsAvgPrice(String itemCode, String warehouse) {
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
			boRepository.setTransaction(this.getTransaction());
			IMaterial material = boRepository.fetchMaterial(criteria).getResultObjects().firstOrDefault();
			if (material == null) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_exist", itemCode));
			}
			criteria = new Criteria();
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
			condition.setValue(emDirection.OUT);
			if (this.getSourceData() instanceof IMaterialBatchReceiptParent
					|| this.getSourceData() instanceof IMaterialSerialReceiptParent) {
				condition.setValue(emDirection.IN);
			}
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
			if (criteria.getConditions().size() < 3) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_found_receipt_journal", this.getSourceData()));
			}
			boolean noJournals = true;
			BigDecimal quantities = Decimals.VALUE_ZERO;
			BigDecimal totals = Decimals.VALUE_ZERO;
			if (material.getValuationMethod() == emValuationMethod.MOVING_AVERAGE) {
				for (IMaterialInventoryJournal journal : boRepository.fetchMaterialInventoryJournal(criteria)
						.getResultObjects()) {
					if (!journal.getItemCode().equals(itemCode))
						continue;
					if (!journal.getWarehouse().equals(warehouse))
						continue;
					quantities = Decimals.add(quantities, journal.getQuantity());
					totals = Decimals.add(totals, journal.getTransactionValue());
					noJournals = false;
				}
			} else if (material.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
				if (material.getBatchManagement() == emYesNo.YES) {
					for (IMaterialBatchJournal journal : boRepository.fetchMaterialBatchJournal(criteria)
							.getResultObjects()) {
						if (!journal.getItemCode().equals(itemCode))
							continue;
						if (!journal.getWarehouse().equals(warehouse))
							continue;
						quantities = Decimals.add(quantities, journal.getQuantity());
						totals = Decimals.add(totals, journal.getTransactionValue());
						noJournals = false;
					}
				} else if (material.getSerialManagement() == emYesNo.YES) {
					for (IMaterialSerialJournal journal : boRepository.fetchMaterialSerialJournal(criteria)
							.getResultObjects()) {
						if (!journal.getItemCode().equals(itemCode))
							continue;
						if (!journal.getWarehouse().equals(warehouse))
							continue;
						quantities = Decimals.add(quantities, journal.getQuantity());
						totals = Decimals.add(totals, journal.getTransactionValue());
						noJournals = false;
					}
				} else {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_material_is_not_batchmanagement", material.getCode()) + "\n"
									+ I18N.prop("msg_mm_material_is_not_serialmanagement", material.getCode()));
				}
			}
			quantities = quantities.setScale(this.getQuantity().scale(), Decimals.ROUNDING_MODE_DEFAULT);
			if (noJournals && Decimals.isZero(quantities) && Decimals.isZero(totals)) {
				return null;
			}
			if (Decimals.isZero(quantities)) {
				return Decimals.VALUE_ZERO;
			}
			return Decimals.divide(totals, quantities);
		}
	}
}
