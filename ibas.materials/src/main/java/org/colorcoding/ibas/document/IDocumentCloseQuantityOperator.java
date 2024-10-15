package org.colorcoding.ibas.document;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;

/**
 * 单据数量关闭操作者
 */
public interface IDocumentCloseQuantityOperator extends IDocumentOperatingTarget, IBODocument {

	/**
	 * 检查逻辑，已有数量关闭，不可删除
	 * （注意：重复继承ICheckRules时，需要手动调用）
	 * @throws BusinessRuleException
	 */
	default void check() throws BusinessRuleException {
		IDocumentClosingQuantityItem item;
		Iterator<IDocumentClosingQuantityItem> items = this.getQuantityItems();
		while (items.hasNext()) {
			item = items.next();
			if (this.isDeleted() || (item instanceof IBusinessObject && ((IBusinessObject) item).isDeleted())) {
				// 父项或子项即将被删除
				if (Decimal.ZERO.compareTo(item.getClosedQuantity()) < 0) {
					throw new BusinessRuleException(I18N.prop("msg_mm_document_closed_quantity_not_allowed_deleted",
							String.format("{[%s].[DocEntry = %s]%s}", this.getObjectCode(), this.getDocEntry(),
									item.getLineId() > 0 ? String.format("&&[LineId = %s]", item.getLineId()) : "")));
				}
			} else if ((this instanceof IBOTagCanceled && ((IBOTagCanceled) this).getCanceled() == emYesNo.YES)
					|| (item instanceof IBOTagCanceled && ((IBOTagCanceled) item).getCanceled() == emYesNo.YES)) {
				// 父项或子项即将被取消
				if (Decimal.ZERO.compareTo(item.getClosedQuantity()) < 0) {
					throw new BusinessRuleException(I18N.prop("msg_mm_document_closed_quantity_not_allowed_canceled",
							String.format("{[%s].[DocEntry = %s]%s}", this.getObjectCode(), this.getDocEntry(),
									item.getLineId() > 0 ? String.format("&&[LineId = %s]", item.getLineId()) : "")));
				}
			}
		}
	}

	/**
	 * 获取数量关闭项目
	 * 
	 * @return
	 */
	Iterator<IDocumentClosingQuantityItem> getQuantityItems();
}
