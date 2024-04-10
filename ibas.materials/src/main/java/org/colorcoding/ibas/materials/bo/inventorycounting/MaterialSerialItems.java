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
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItemParent;

@XmlType(name = MaterialSerialItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialItem.class })
class MaterialSerialItems extends org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialItems {

	private static final long serialVersionUID = -1330675354887159036L;

	public static final String BUSINESS_OBJECT_NAME = MaterialSerialItem.BUSINESS_OBJECT_NAME + "s";

	public MaterialSerialItems() {
		super();
	}

	public MaterialSerialItems(IMaterialSerialItemParent parent) {
		super(parent);
	}

	public Class<?> getElementType() {
		return MaterialSerialItem.class;
	}

	@Override
	public IMaterialSerialItem create() {
		IMaterialSerialItem item = new MaterialSerialItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IMaterialSerialItem item) {
		super.afterAddItem(item);
		if (item instanceof MaterialSerialItem) {
			((MaterialSerialItem) item).parent = (InventoryCountingLine) this.getParent();
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
		if (this.getParent().getSerialManagement() == emYesNo.NO) {
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
		for (IMaterialSerialItem item : this) {
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
			// 检查序列号
			if (item.getSerialCode() == null || item.getSerialCode().isEmpty()) {
				throw new BusinessRuleException(
						I18N.prop("msg_mm_document_material_serial_empty_code", this.getParent()));
			}
			IMaterialSerialItem tmpItem = this.lastOrDefault(c -> item.getSerialCode().equals(c.getSerialCode()));
			if (item != tmpItem) {
				throw new BusinessRuleException(I18N.prop("msg_mm_document_material_serial_duplicate_code",
						this.getParent(), tmpItem.getSerialCode()));
			}
			total = total.add(Decimal.ONE);
		}
		if (total.compareTo(Decimal.round(this.getParent().getTargetQuantity().abs(), total.scale())) != 0) {
			throw new BusinessRuleException(
					I18N.prop("msg_mm_document_material_serial_quantity_deviates", this.getParent()));
		}
	}
}
