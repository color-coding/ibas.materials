package org.colorcoding.ibas.materials.bo.inventorytransfer;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
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

	@Override
	public IBusinessLogicContract[] getContracts() {
		return new IBusinessLogicContract[] {

				new IMaterialSerialJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.OUT;
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
				},

				new IMaterialSerialJournalContract() {
					@Override
					public emDirection getDirection() {
						return emDirection.IN;
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
				}

		};
	}
}
