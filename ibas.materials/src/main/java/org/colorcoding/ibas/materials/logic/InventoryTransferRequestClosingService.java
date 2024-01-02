package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.IInventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.IInventoryTransferRequestLine;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.InventoryTransferRequest;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 库存转储申请-关闭服务
 * 
 * @author Niuren.Zhu
 *
 */
@LogicContract(IInventoryTransferRequestClosingContract.class)
public class InventoryTransferRequestClosingService
		extends MaterialBusinessLogic<IInventoryTransferRequestClosingContract, IInventoryTransferRequest> {

	@Override
	protected IInventoryTransferRequest fetchBeAffected(IInventoryTransferRequestClosingContract contract) {
		// 必须要差完整对象，不然业务逻辑会出错
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(InventoryTransferRequest.PROPERTY_OBJECTCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBaseDocumentType());
		condition = criteria.getConditions().create();
		condition.setAlias(InventoryTransferRequest.PROPERTY_DOCENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBaseDocumentEntry());

		IInventoryTransferRequest order = this.fetchBeAffected(criteria, IInventoryTransferRequest.class);
		if (order == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IInventoryTransferRequest> operationResult = boRepository
					.fetchInventoryTransferRequest(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			order = operationResult.getResultObjects().firstOrDefault();
		}
		if (order == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_inventory_transfer_request",
					contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));
		}
		return order;
	}

	@Override
	protected void impact(IInventoryTransferRequestClosingContract contract) {
		if (this.getBeAffected() == null) {
			return;
		}
		IInventoryTransferRequestLine orderLine = this.getBeAffected().getInventoryTransferRequestLines()
				.firstOrDefault(c -> c.getLineId().compareTo(contract.getBaseDocumentLineId()) == 0);
		if (orderLine == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_inventory_transfer_request",
					contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));
		}
		BigDecimal closedQuantity = orderLine.getClosedQuantity();
		if (closedQuantity == null) {
			closedQuantity = Decimal.ZERO;
		}
		closedQuantity = closedQuantity.add(contract.getQuantity());
		orderLine.setClosedQuantity(closedQuantity);
		if (orderLine.getLineStatus() == emDocumentStatus.RELEASED
				&& closedQuantity.compareTo(orderLine.getQuantity()) >= 0) {
			orderLine.setLineStatus(emDocumentStatus.FINISHED);
		}
		if (orderLine.getClosedQuantity().compareTo(Decimal.ZERO) > 0) {
			orderLine.setReferenced(emYesNo.YES);
		}
	}

	@Override
	protected void revoke(IInventoryTransferRequestClosingContract contract) {
		if (this.getBeAffected() == null) {
			return;
		}
		IInventoryTransferRequestLine orderLine = this.getBeAffected().getInventoryTransferRequestLines()
				.firstOrDefault(c -> c.getLineId().compareTo(contract.getBaseDocumentLineId()) == 0);
		if (orderLine == null) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_inventory_transfer_request",
					contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));
		}
		BigDecimal closedQuantity = orderLine.getClosedQuantity();
		if (closedQuantity == null) {
			closedQuantity = Decimal.ZERO;
		}
		closedQuantity = closedQuantity.subtract(contract.getQuantity());
		orderLine.setClosedQuantity(closedQuantity);
		if (orderLine.getLineStatus() == emDocumentStatus.FINISHED
				&& closedQuantity.compareTo(orderLine.getQuantity()) < 0) {
			orderLine.setLineStatus(emDocumentStatus.RELEASED);
		}
		if (orderLine.getClosedQuantity().compareTo(Decimal.ZERO) <= 0) {
			orderLine.setReferenced(emYesNo.NO);
		}
	}

}