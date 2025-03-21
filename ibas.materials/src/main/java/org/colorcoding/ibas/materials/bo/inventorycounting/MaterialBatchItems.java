package org.colorcoding.ibas.materials.bo.inventorycounting;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItemParent;

@XmlType(name = MaterialBatchItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchItem.class })
class MaterialBatchItems extends org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchItems {

	private static final long serialVersionUID = -2784510193155897161L;

	public static final String BUSINESS_OBJECT_NAME = MaterialBatchItem.BUSINESS_OBJECT_NAME + "s";

	public MaterialBatchItems() {
		super();
	}

	public MaterialBatchItems(IMaterialBatchItemParent parent) {
		super(parent);
	}

	public Class<?> getElementType() {
		return MaterialBatchItem.class;
	}

	@Override
	public IMaterialBatchItem create() {
		IMaterialBatchItem item = new MaterialBatchItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IMaterialBatchItem item) {
		super.afterAddItem(item);
		if (item instanceof MaterialBatchItem) {
			((MaterialBatchItem) item).parent = (InventoryCountingLine) this.getParent();
		}
	}

	/**
	 * 业务规则校验
	 * 
	 * @throws BusinessRuleException
	 */
	@Override
	public void check() throws BusinessRuleException {
		if (this.getParent() == null) {
			return;
		}
		if (this.getParent().isDeleted()) {
			return;
		}
		if (this.getParent().getBatchManagement() == emYesNo.NO) {
			return;
		}
		if (this.getParent().getLineStatus() == emDocumentStatus.PLANNED) {
			return;
		}
		String baseType = this.getParent().getObjectCode();
		Integer docEntry = this.getParent().getDocEntry(), lineId = this.getParent().getLineId();
		if (baseType == null) {
			baseType = "";
		}
		if (docEntry == null) {
			docEntry = 0;
		}
		if (lineId == null) {
			lineId = 0;
		}
		BigDecimal total = Decimal.ZERO;
		for (IMaterialBatchItem item : this) {
			if (item.isDeleted()) {
				continue;
			}
			// 检查关联关系
			if (!baseType.equals(item.getDocumentType())) {
				item.setDocumentType(baseType);
			}
			if (docEntry.compareTo(item.getDocumentEntry()) != 0) {
				item.setDocumentEntry(docEntry);
			}
			if (lineId.compareTo(item.getDocumentLineId()) != 0) {
				item.setDocumentLineId(lineId);
			}
			// 检查批次号
			if (item.getBatchCode() == null || item.getBatchCode().isEmpty()) {
				throw new BusinessRuleException(
						I18N.prop("msg_mm_document_material_batch_empty_code", this.getParent()));
			}
			IMaterialBatchItem tmpItem = this.lastOrDefault(c -> item.getBatchCode().equals(c.getBatchCode()));
			if (item != tmpItem) {
				throw new BusinessRuleException(I18N.prop("msg_mm_document_material_batch_duplicate_code",
						this.getParent(), tmpItem.getBatchCode()));
			}
			total = total.add(item.getQuantity());
		}
		BigDecimal parentTotal = this.getParent().getInventoryQuantity().abs();
		// 收缩小数位，去除尾部的0
		parentTotal = parentTotal.stripTrailingZeros();
		// 使用非库存单位时，容易出现差异
		if (total.scale() > parentTotal.scale()) {
			total = total.setScale(parentTotal.scale(), Decimal.ROUNDING_MODE_DEFAULT);
		}
		if (total.compareTo(parentTotal) != 0) {
			throw new BusinessRuleException(
					I18N.prop("msg_mm_document_material_batch_quantity_deviates", this.getParent()));
		}
	}
}
