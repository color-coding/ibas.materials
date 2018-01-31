package org.colorcoding.ibas.materials.bo.materialserial;

import org.colorcoding.ibas.bobas.bo.IBusinessObjects;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;

public interface IMaterialSerialItems extends IBusinessObjects<IMaterialSerialItem, IMaterialSerialItemParent> {
	/**
	 * 数据检查
	 * 
	 * @throws BusinessRuleException
	 */
	void check() throws BusinessRuleException;

}
