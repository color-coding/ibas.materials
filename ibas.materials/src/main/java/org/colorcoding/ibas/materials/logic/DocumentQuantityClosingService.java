package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.Iterator;

import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.document.DocumentFetcherManager;
import org.colorcoding.ibas.document.IDocumentCloseQuantityItem;
import org.colorcoding.ibas.document.IDocumentCloseQuantityOperator;

/**
 * 单据数量关闭服务
 */
@LogicContract(IDocumentQuantityClosingContract.class)
public class DocumentQuantityClosingService extends DocumentQuantityService<IDocumentQuantityClosingContract> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IDocumentQuantityClosingContract) {
			IDocumentQuantityClosingContract contract = (IDocumentQuantityClosingContract) data;
			if (contract.checkDataStatus() == false) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "DataStatus",
						String.format("%s-%s-%s", contract.getBaseDocumentType(), contract.getBaseDocumentEntry(),
								contract.getBaseDocumentLineId()));
				return false;
			}
			if (DataConvert.isNullOrEmpty(contract.getBaseDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"BaseDocumentType", "EMPTY");
				return false;
			}
			if (Integer.compare(0, contract.getBaseDocumentEntry()) >= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"BaseDocumentEntry", "EMPTY");
				return false;
			}
			if (!DocumentFetcherManager.create().getFetcherMap().containsKey(contract.getBaseDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						String.format("BO [%s] Fetcher", contract.getBaseDocumentType()), "NOT FOUND");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IDocumentCloseQuantityOperator fetchBeAffected(IDocumentQuantityClosingContract contract) {
		return super.fetchBeAffected(contract.getBaseDocumentType(), contract.getBaseDocumentEntry());
	}

	@Override
	protected void impact(IDocumentQuantityClosingContract contract) {
		Iterator<IDocumentCloseQuantityItem> iterator = this.getBeAffected().getItems();
		while (iterator.hasNext()) {
			IDocumentCloseQuantityItem item = iterator.next();
			if (item.getLineId().compareTo(contract.getBaseDocumentLineId()) != 0) {
				continue;
			}
			BigDecimal closedQuantity = item.getClosedQuantity();
			if (closedQuantity == null) {
				closedQuantity = Decimal.ZERO;
			}
			closedQuantity = closedQuantity.add(contract.getQuantity());
			item.setClosedQuantity(closedQuantity);
			if (item.getLineStatus() == emDocumentStatus.RELEASED
					&& closedQuantity.compareTo(item.getQuantity()) >= 0) {
				item.setLineStatus(emDocumentStatus.FINISHED);
			}
			if (item.getClosedQuantity().compareTo(Decimal.ZERO) > 0) {
				item.setReferenced(emYesNo.YES);
			}
		}
	}

	@Override
	protected void revoke(IDocumentQuantityClosingContract contract) {
		Iterator<IDocumentCloseQuantityItem> iterator = this.getBeAffected().getItems();
		while (iterator.hasNext()) {
			IDocumentCloseQuantityItem item = iterator.next();
			if (item.getLineId().compareTo(contract.getBaseDocumentLineId()) != 0) {
				continue;
			}
			BigDecimal closedQuantity = item.getClosedQuantity();
			if (closedQuantity == null) {
				closedQuantity = Decimal.ZERO;
			}
			closedQuantity = closedQuantity.subtract(contract.getQuantity());
			item.setClosedQuantity(closedQuantity);
			if (item.getLineStatus() == emDocumentStatus.FINISHED && closedQuantity.compareTo(item.getQuantity()) < 0) {
				item.setLineStatus(emDocumentStatus.RELEASED);
			}
			if (item.getClosedQuantity().compareTo(Decimal.ZERO) <= 0) {
				item.setReferenced(emYesNo.NO);
			}
		}
	}

}
