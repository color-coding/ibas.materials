package org.colorcoding.ibas.materials.bo.materialbatch;

import org.colorcoding.ibas.bobas.bo.IBusinessObjects;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;

public interface IMaterialBatchItems extends IBusinessObjects<IMaterialBatchItem, IMaterialBatchItemParent> {
	/**
	 * 数据检查
	 * 
	 * @throws BusinessRuleException
	 */
	void check() throws BusinessRuleException;
}
