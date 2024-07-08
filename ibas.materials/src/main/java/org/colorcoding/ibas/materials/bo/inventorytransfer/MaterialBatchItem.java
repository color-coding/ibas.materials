package org.colorcoding.ibas.materials.bo.inventorytransfer;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.logic.IMaterialBatchJournalContract;

/**
 * 物料批次项目（库存转储）
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialBatchItem.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
class MaterialBatchItem extends org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchItem {

	private static final long serialVersionUID = -4691089113449070798L;

	public static final String BUSINESS_OBJECT_NAME = "MaterialBatchItemT";

	InventoryTransferLine parent;

	@Override
	public IBusinessLogicContract[] getContracts() {
		return new IBusinessLogicContract[] {

				new IMaterialBatchJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.OUT;
					}

					@Override
					public boolean isOffsetting() {
						if (MaterialBatchItem.this.parent.isDeleted()) {
							return true;
						}
						if (MaterialBatchItem.this.parent.getCanceled() == emYesNo.YES) {
							return true;
						}
						if (MaterialBatchItem.this.parent.parent.isDeleted()) {
							return true;
						}
						if (MaterialBatchItem.this.parent.parent.getCanceled() == emYesNo.YES) {
							return true;
						}
						return false;
					}

					@Override
					public String getWarehouse() {
						// 转出仓库
						return MaterialBatchItem.this.parent.getFromWarehouse();
					}

					@Override
					public String getIdentifiers() {
						return MaterialBatchItem.this.getIdentifiers();
					}

					@Override
					public String getBatchCode() {
						return MaterialBatchItem.this.getBatchCode();
					}

					@Override
					public String getItemCode() {
						return MaterialBatchItem.this.parent.getItemCode();
					}

					@Override
					public BigDecimal getQuantity() {
						return MaterialBatchItem.this.getQuantity();
					}

					@Override
					public String getUOM() {
						return MaterialBatchItem.this.parent.getInventoryUOM();
					}

					@Override
					public String getDocumentType() {
						return MaterialBatchItem.this.getDocumentType();
					}

					@Override
					public Integer getDocumentLineId() {
						return MaterialBatchItem.this.getDocumentLineId();
					}

					@Override
					public Integer getDocumentEntry() {
						return MaterialBatchItem.this.getDocumentEntry();
					}

					@Override
					public DateTime getPostingDate() {
						return MaterialBatchItem.this.parent.parent.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return MaterialBatchItem.this.parent.parent.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return MaterialBatchItem.this.parent.parent.getDocumentDate();
					}

					@Override
					public String getBaseDocumentType() {
						return MaterialBatchItem.this.parent.getBaseDocumentType();
					}

					@Override
					public Integer getBaseDocumentEntry() {
						return MaterialBatchItem.this.parent.getBaseDocumentEntry();
					}

					@Override
					public Integer getBaseDocumentLineId() {
						return MaterialBatchItem.this.parent.getBaseDocumentLineId();
					}

					@Override
					public BigDecimal getPrice() {
						return MaterialBatchItem.this.parent.getPrice();
					}

					@Override
					public String getCurrency() {
						return MaterialBatchItem.this.parent.getCurrency();
					}

					@Override
					public BigDecimal getRate() {
						return MaterialBatchItem.this.parent.getRate();
					}
				},

				new IMaterialBatchJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.IN;
					}

					@Override
					public boolean isOffsetting() {
						if (MaterialBatchItem.this.parent.isDeleted()) {
							return true;
						}
						if (MaterialBatchItem.this.parent.getCanceled() == emYesNo.YES) {
							return true;
						}
						if (MaterialBatchItem.this.parent.parent.isDeleted()) {
							return true;
						}
						if (MaterialBatchItem.this.parent.parent.getCanceled() == emYesNo.YES) {
							return true;
						}
						return false;
					}

					@Override
					public String getWarehouse() {
						// 移入仓库
						return MaterialBatchItem.this.parent.getWarehouse();
					}

					@Override
					public String getBatchCode() {
						return MaterialBatchItem.this.getBatchCode();
					}

					@Override
					public String getIdentifiers() {
						return MaterialBatchItem.this.getIdentifiers();
					}

					@Override
					public String getItemCode() {
						return MaterialBatchItem.this.parent.getItemCode();
					}

					@Override
					public BigDecimal getQuantity() {
						return MaterialBatchItem.this.getQuantity();
					}

					@Override
					public String getUOM() {
						return MaterialBatchItem.this.parent.getInventoryUOM();
					}

					@Override
					public String getDocumentType() {
						return MaterialBatchItem.this.getDocumentType();
					}

					@Override
					public Integer getDocumentLineId() {
						return MaterialBatchItem.this.getDocumentLineId();
					}

					@Override
					public Integer getDocumentEntry() {
						return MaterialBatchItem.this.getDocumentEntry();
					}

					@Override
					public DateTime getPostingDate() {
						return MaterialBatchItem.this.parent.parent.getPostingDate();
					}

					@Override
					public DateTime getDeliveryDate() {
						return MaterialBatchItem.this.parent.parent.getDeliveryDate();
					}

					@Override
					public DateTime getDocumentDate() {
						return MaterialBatchItem.this.parent.parent.getDocumentDate();
					}

					@Override
					public String getBaseDocumentType() {
						return MaterialBatchItem.this.parent.getBaseDocumentType();
					}

					@Override
					public Integer getBaseDocumentEntry() {
						return MaterialBatchItem.this.parent.getBaseDocumentEntry();
					}

					@Override
					public Integer getBaseDocumentLineId() {
						return MaterialBatchItem.this.parent.getBaseDocumentLineId();
					}

					@Override
					public BigDecimal getPrice() {
						return MaterialBatchItem.this.parent.getPrice();
					}

					@Override
					public String getCurrency() {
						return MaterialBatchItem.this.parent.getCurrency();
					}

					@Override
					public BigDecimal getRate() {
						return MaterialBatchItem.this.parent.getRate();
					}
				}

		};
	}
}
