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
 * 单据金额关闭操作者
 */
public interface IDocumentCloseAmountOperator extends IDocumentOperatingTarget, IBODocument {

	/**
	 * 检查逻辑，已有金额关闭，不可删除
	 * （注意：重复继承ICheckRules时，需要手动调用）
	 * @throws BusinessRuleException
	 */
	default void check() throws BusinessRuleException {
		IDocumentClosingAmountItem item;
		Iterator<IDocumentClosingAmountItem> items = this.getAmountItems();
		while (items.hasNext()) {
			item = items.next();
			if (this.isDeleted() || (item instanceof IBusinessObject && ((IBusinessObject) item).isDeleted())) {
				// 父项或子项即将被删除
				if (Decimal.ZERO.compareTo(item.getClosedAmount()) < 0) {
					throw new BusinessRuleException(I18N.prop("msg_mm_document_closed_amount_not_allowed_deleted",
							String.format("{[%s].[DocEntry = %s]%s}", this.getObjectCode(), this.getDocEntry(),
									item.getLineId() > 0 ? String.format("&&[LineId = %s]", item.getLineId()) : "")));
				}
			} else if ((this instanceof IBOTagCanceled && ((IBOTagCanceled) this).getCanceled() == emYesNo.YES)
					|| (item instanceof IBOTagCanceled && ((IBOTagCanceled) item).getCanceled() == emYesNo.YES)) {
				// 父项或子项即将被取消
				if (Decimal.ZERO.compareTo(item.getClosedAmount()) < 0) {
					throw new BusinessRuleException(I18N.prop("msg_mm_document_closed_amount_not_allowed_canceled",
							String.format("{[%s].[DocEntry = %s]%s}", this.getObjectCode(), this.getDocEntry(),
									item.getLineId() > 0 ? String.format("&&[LineId = %s]", item.getLineId()) : "")));
				}
			}
		}
	}

	/**
	 * 获取金额关闭项目
	 * 
	 * @return
	 */
	Iterator<IDocumentClosingAmountItem> getAmountItems();
}
