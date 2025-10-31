package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.businesspartner.data.emBusinessPartnerType;

/**
 * 物料目录检查
 */
public interface IMaterialCatalogCheckContract extends IBusinessLogicContract {

	/**
	 * 获取-业务伙伴类型
	 * 
	 * @return 值
	 */
	emBusinessPartnerType getBusinessPartnerType();

	/**
	 * 获取-业务伙伴代码
	 * 
	 * @return 值
	 */
	String getBusinessPartnerCode();

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 获取-目录编码
	 * 
	 * @return 值
	 */
	String getCatalogCode();

	/**
	 * 设置-目录编码
	 * 
	 * @param value 值
	 */
	void setCatalogCode(String value);

}
