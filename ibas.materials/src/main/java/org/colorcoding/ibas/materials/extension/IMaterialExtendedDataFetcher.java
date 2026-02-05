package org.colorcoding.ibas.materials.extension;

import org.colorcoding.ibas.bobas.repository.ITransaction;

/**
 * 物料扩展数据查询者
 * 
 * @param <T>
 */
public interface IMaterialExtendedDataFetcher<T extends IMaterialExtendedData> {

	/**
	 * 设置业务仓库
	 * 
	 * @param repository
	 */
	void setTransaction(ITransaction transaction);

	/**
	 * 检索对象
	 * 
	 * @param itemCode 物料编码
	 * @return
	 * @throws Exception
	 */
	T[] fetch(String itemCode) throws Exception;
}
