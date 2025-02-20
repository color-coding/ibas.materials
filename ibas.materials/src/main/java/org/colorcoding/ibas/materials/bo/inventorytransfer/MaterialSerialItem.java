package org.colorcoding.ibas.materials.bo.inventorytransfer;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.logic.IMaterialSerialJournalContract;

/**
 * 物料序列项目（库存转储）
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialSerialItem.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
class MaterialSerialItem extends org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialItem {

	private static final long serialVersionUID = -6784948562067908976L;

	public static final String BUSINESS_OBJECT_NAME = "MaterialSerialItemT";

	InventoryTransferLine parent;

	/**
	 * 出库价格
	 */
	private BigDecimal issuePrice;

	@Override
	public IBusinessLogicContract[] getContracts() {
		return new IBusinessLogicContract[] {

				new IMaterialSerialJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.OUT;
					}

					@Override
					public boolean isOffsetting() {
						if (MaterialSerialItem.this.isDeleted()) {
							return true;
						}
						if (MaterialSerialItem.this instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) MaterialSerialItem.this;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (MaterialSerialItem.this instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) MaterialSerialItem.this;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent.isDeleted()) {
							return true;
						}
						if (MaterialSerialItem.this.parent instanceof IBODocument) {
							IBODocument document = (IBODocument) MaterialSerialItem.this.parent;
							if (document.getDocumentStatus() == emDocumentStatus.PLANNED) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent instanceof IBODocumentLine) {
							IBODocumentLine document = (IBODocumentLine) MaterialSerialItem.this.parent;
							if (document.getLineStatus() == emDocumentStatus.PLANNED) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) MaterialSerialItem.this.parent;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) MaterialSerialItem.this.parent;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						return false;
					}

					@Override
					public String getUOM() {
						return MaterialSerialItem.this.parent.getUOM();
					}

					@Override
					public String getWarehouse() {
						return MaterialSerialItem.this.parent.getFromWarehouse();
					}

					@Override
					public String getIdentifiers() {
						return MaterialSerialItem.this.getIdentifiers();
					}

					@Override
					public String getSerialCode() {
						return MaterialSerialItem.this.getSerialCode();
					}

					@Override
					public String getItemCode() {
						return MaterialSerialItem.this.parent.getItemCode();
					}

					@Override
					public String getDocumentType() {
						return MaterialSerialItem.this.getDocumentType();
					}

					@Override
					public Integer getDocumentLineId() {
						return MaterialSerialItem.this.getDocumentLineId();
					}

					@Override
					public Integer getDocumentEntry() {
						return MaterialSerialItem.this.getDocumentEntry();
					}

					@Override
					public Integer getDocumentIndex() {
						return MaterialSerialItem.this.getObjectKey();
					}

					@Override
					public DateTime getPostingDate() {
						return MaterialSerialItem.this.parent.parent.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return MaterialSerialItem.this.parent.parent.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return MaterialSerialItem.this.parent.parent.getDocumentDate();
					}

					@Override
					public String getBaseDocumentType() {
						return MaterialSerialItem.this.parent.getBaseDocumentType();
					}

					@Override
					public Integer getBaseDocumentEntry() {
						return MaterialSerialItem.this.parent.getBaseDocumentEntry();
					}

					@Override
					public Integer getBaseDocumentLineId() {
						return MaterialSerialItem.this.parent.getBaseDocumentLineId();
					}

					@Override
					public BigDecimal getPrice() {
						return MaterialSerialItem.this.parent.getPrice();
					}

					@Override
					public String getCurrency() {
						return MaterialSerialItem.this.parent.getCurrency();
					}

					@Override
					public BigDecimal getRate() {
						return MaterialSerialItem.this.parent.getRate();
					}

					@Override
					public void onCalculatedCostPrice(BigDecimal price) {
						MaterialSerialItem.this.issuePrice = price;
					}
				},

				new IMaterialSerialJournalContract() {

					@Override
					public emDirection getDirection() {
						return emDirection.IN;
					}

					@Override
					public boolean isOffsetting() {
						if (MaterialSerialItem.this.isDeleted()) {
							return true;
						}
						if (MaterialSerialItem.this instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) MaterialSerialItem.this;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (MaterialSerialItem.this instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) MaterialSerialItem.this;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent.isDeleted()) {
							return true;
						}
						if (MaterialSerialItem.this.parent instanceof IBODocument) {
							IBODocument document = (IBODocument) MaterialSerialItem.this.parent;
							if (document.getDocumentStatus() == emDocumentStatus.PLANNED) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent instanceof IBODocumentLine) {
							IBODocumentLine document = (IBODocumentLine) MaterialSerialItem.this.parent;
							if (document.getLineStatus() == emDocumentStatus.PLANNED) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent instanceof IBOTagCanceled) {
							IBOTagCanceled boTag = (IBOTagCanceled) MaterialSerialItem.this.parent;
							if (boTag.getCanceled() == emYesNo.YES) {
								return true;
							}
						}
						if (MaterialSerialItem.this.parent instanceof IBOTagDeleted) {
							IBOTagDeleted boTag = (IBOTagDeleted) MaterialSerialItem.this.parent;
							if (boTag.getDeleted() == emYesNo.YES) {
								return true;
							}
						}
						return false;
					}

					@Override
					public String getUOM() {
						return MaterialSerialItem.this.parent.getUOM();
					}

					@Override
					public String getWarehouse() {
						return MaterialSerialItem.this.parent.getWarehouse();
					}

					@Override
					public String getIdentifiers() {
						return MaterialSerialItem.this.getIdentifiers();
					}

					@Override
					public String getSerialCode() {
						return MaterialSerialItem.this.getSerialCode();
					}

					@Override
					public String getItemCode() {
						return MaterialSerialItem.this.parent.getItemCode();
					}

					@Override
					public String getDocumentType() {
						return MaterialSerialItem.this.getDocumentType();
					}

					@Override
					public Integer getDocumentLineId() {
						return MaterialSerialItem.this.getDocumentLineId();
					}

					@Override
					public Integer getDocumentEntry() {
						return MaterialSerialItem.this.getDocumentEntry();
					}

					@Override
					public Integer getDocumentIndex() {
						return MaterialSerialItem.this.getObjectKey();
					}

					@Override
					public DateTime getPostingDate() {
						return MaterialSerialItem.this.parent.parent.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return MaterialSerialItem.this.parent.parent.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return MaterialSerialItem.this.parent.parent.getDocumentDate();
					}

					@Override
					public String getBaseDocumentType() {
						return MaterialSerialItem.this.parent.getBaseDocumentType();
					}

					@Override
					public Integer getBaseDocumentEntry() {
						return MaterialSerialItem.this.parent.getBaseDocumentEntry();
					}

					@Override
					public Integer getBaseDocumentLineId() {
						return MaterialSerialItem.this.parent.getBaseDocumentLineId();
					}

					@Override
					public BigDecimal getPrice() {
						if (MaterialSerialItem.this.issuePrice != null) {
							return MaterialSerialItem.this.issuePrice;
						}
						return MaterialSerialItem.this.parent.getPrice();
					}

					@Override
					public String getCurrency() {
						return MaterialSerialItem.this.parent.getCurrency();
					}

					@Override
					public BigDecimal getRate() {
						return MaterialSerialItem.this.parent.getRate();
					}
				}

		};
	}
}
