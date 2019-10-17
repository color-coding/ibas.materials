package org.colorcoding.ibas.materials.bo.inventorycounting;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;

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
	public IBusinessLogicContract[] getContracts() {
		return null;
	}
}
