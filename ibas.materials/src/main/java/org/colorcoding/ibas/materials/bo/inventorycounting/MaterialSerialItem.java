package org.colorcoding.ibas.materials.bo.inventorycounting;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;

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
		return null;
	}
}
