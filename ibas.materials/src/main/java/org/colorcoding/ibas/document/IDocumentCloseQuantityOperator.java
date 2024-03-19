package org.colorcoding.ibas.document;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.bo.IBODocument;

/**
 * 单据数量关闭操作者
 */
public interface IDocumentCloseQuantityOperator extends IDocumentOperatingTarget, IBODocument {

	/**
	 * 获取数量关闭项目
	 * 
	 * @return
	 */
	Iterator<IDocumentCloseQuantityItem> getItems();
}
