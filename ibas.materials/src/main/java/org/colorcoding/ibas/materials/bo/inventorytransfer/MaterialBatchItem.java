package org.colorcoding.ibas.materials.bo.inventorytransfer;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
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

	public static final String BUSINESS_OBJECT_NAME = "MaterialBatchItItem";

	InventoryTransferLine parent;

	@Override
	public IBusinessLogicContract[] getContracts() {
		return new IBusinessLogicContract[] { new IMaterialBatchJournalContract() {

			@Override
			public emDirection getDirection() {
				return emDirection.OUT;
			}

			@Override
			public String getWarehouse() {
				// 转出仓库
				return MaterialBatchItem.this.parent.parent.getFromWarehouse();
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
			public Decimal getQuantity() {
				return MaterialBatchItem.this.getQuantity();
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
		}, new IMaterialBatchJournalContract() {

			@Override
			public emDirection getDirection() {
				return emDirection.IN;
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
			public Decimal getQuantity() {
				return MaterialBatchItem.this.getQuantity();
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

		} };
	}
}
