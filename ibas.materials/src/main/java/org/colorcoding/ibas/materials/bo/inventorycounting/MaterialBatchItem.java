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
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.logic.IMaterialBatchJournalContract;

/**
 * 物料批次项目（库存转储）
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialBatchItem.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
class MaterialBatchItem extends org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchItem {

	private static final long serialVersionUID = 5278319800285456744L;

	public static final String BUSINESS_OBJECT_NAME = "MaterialBatchItemC";

	InventoryCountingLine parent;

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleRequired(PROPERTY_BATCHCODE), // 要求有值
				new BusinessRuleRequired(PROPERTY_DOCUMENTTYPE), // 要求有值
				new BusinessRuleRequired(PROPERTY_DOCUMENTENTRY), // 要求有值
				new BusinessRuleRequired(PROPERTY_DOCUMENTLINEID), // 要求有值
		};
	}

	@Override
	public IBusinessLogicContract[] getContracts() {
		ArrayList<IBusinessLogicContract> contracts = new ArrayList<>();
		// 仅结算状态影响库存
		if (this.parent.getLineStatus() == emDocumentStatus.CLOSED) {
			if (Decimal.ZERO.compareTo(this.parent.getDifference()) > 0) {
				// 盘亏，发货
				contracts.add(new IMaterialBatchJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.OUT;
					}

					@Override
					public boolean isOffsetting() {
						return false;
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
					public String getWarehouse() {
						return MaterialBatchItem.this.parent.getWarehouse();
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
					public Integer getDocumentIndex() {
						return MaterialBatchItem.this.getObjectKey();
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
				});
			} else if (Decimal.ZERO.compareTo(this.parent.getDifference()) < 0) {
				// 盘盈，收货
				contracts.add(new IMaterialBatchJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.IN;
					}

					@Override
					public boolean isOffsetting() {
						return false;
					}

					@Override
					public String getIdentifiers() {
						return MaterialBatchItem.this.getIdentifiers();
					}

					@Override
					public String getWarehouse() {
						return MaterialBatchItem.this.parent.getWarehouse();
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
					public Integer getDocumentIndex() {
						return MaterialBatchItem.this.getObjectKey();
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

				});
			}
		}
		return contracts.toArray(new IBusinessLogicContract[] {});
	}
}
