package org.colorcoding.ibas.materials.bo.inventorycounting;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
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
		return null;
	}
}
