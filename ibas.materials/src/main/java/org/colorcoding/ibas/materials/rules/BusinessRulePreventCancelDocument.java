package org.colorcoding.ibas.materials.rules;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.rule.BusinessRuleCommon;

/**
 * 阻止取消单据
 */
public class BusinessRulePreventCancelDocument extends BusinessRuleCommon {

	protected BusinessRulePreventCancelDocument() {
		this.setName(I18N.prop("msg_mm_business_rule_prevent_cancel_document"));
	}

	/**
	 * 构造方法
	 * 
	 * @param cancel    属性-取消状态
	 * @param status    属性-单据状态
	 */
	public BusinessRulePreventCancelDocument(IPropertyInfo<emYesNo> cancel, IPropertyInfo<emDocumentStatus> status) {
		this();
		this.setCancel(cancel);
		this.setStatus(status);
		// 要输入的参数
		this.getInputProperties().add(this.getCancel());
		this.getInputProperties().add(this.getStatus());
	}

	private IPropertyInfo<emYesNo> cancel;

	protected final IPropertyInfo<emYesNo> getCancel() {
		return cancel;
	}

	protected final void setCancel(IPropertyInfo<emYesNo> cancel) {
		this.cancel = cancel;
	}

	private IPropertyInfo<emDocumentStatus> status;

	protected final IPropertyInfo<emDocumentStatus> getStatus() {
		return status;
	}

	protected final void setStatus(IPropertyInfo<emDocumentStatus> status) {
		this.status = status;
	}

	@Override
	protected void execute(BusinessRuleContext context) throws Exception {
		emYesNo cancel = (emYesNo) context.getInputValues().get(this.getCancel());
		if (cancel == null) {
			cancel = emYesNo.NO;
		}
		emDocumentStatus status = (emDocumentStatus) context.getInputValues().get(this.getStatus());
		if (status == null) {
			status = emDocumentStatus.PLANNED;
		}
		if (cancel == emYesNo.YES && status == emDocumentStatus.PLANNED) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_status_planed_not_allowed_canceled"));
		}
	}

}
