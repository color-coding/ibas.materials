package org.colorcoding.ibas.document;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.bo.IBODocument;

/**
 * 单据金额关闭操作者
 */
public interface IDocumentCloseAmountOperator extends IDocumentOperatingTarget, IBODocument {

	/**
	 * 获取金额关闭项目
	 * 
	 * @return
	 */
	Iterator<IDocumentClosingAmountItem> getAmountItems();
}
