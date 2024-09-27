package org.colorcoding.ibas.materials.bo.inventorycounting;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
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

	private static final long serialVersionUID = -6562828886914294810L;

	public static final String BUSINESS_OBJECT_NAME = "MaterialSerialItemC";

	InventoryCountingLine parent;

	@Override
	public IBusinessLogicContract[] getContracts() {
		ArrayList<IBusinessLogicContract> contracts = new ArrayList<>();
		// 仅结算状态影响库存
		if (this.parent.getLineStatus() == emDocumentStatus.CLOSED) {
			if (Decimal.ZERO.compareTo(this.parent.getDifference()) > 0) {
				// 盘亏，发货
				contracts.add(new IMaterialSerialJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.OUT;
					}

					@Override
					public boolean isOffsetting() {
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
				});
			} else if (Decimal.ZERO.compareTo(this.parent.getDifference()) < 0) {
				// 盘盈，收货
				contracts.add(new IMaterialSerialJournalContract() {

					@Override
					public emDirection getDirection() {
						return emDirection.IN;
					}

					@Override
					public boolean isOffsetting() {
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
				});
			}
		}
		return contracts.toArray(new IBusinessLogicContract[] {});
	}
}
