package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservationGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservationGroup;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialOrderedReservationCreateContract.class)
public class MaterialOrderedReservationCreateService
		extends BusinessLogic<IMaterialOrderedReservationCreateContract, IMaterialOrderedReservationGroup> {

	@Override
	protected IMaterialOrderedReservationGroup fetchBeAffected(IMaterialOrderedReservationCreateContract contract) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_CAUSES.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(String.format("FROM:%s-%s-%s", contract.getBaseDocumentType(),
				contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));

		IMaterialOrderedReservationGroup reservationGroup = this.fetchBeAffected(criteria,
				IMaterialOrderedReservationGroup.class);
		if (reservationGroup == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialOrderedReservation> operationResult = boRepository
					.fetchMaterialOrderedReservation(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			reservationGroup = new MaterialOrderedReservationGroup();
			reservationGroup.setCauses(String.format("FROM:%s-%s-%s", contract.getBaseDocumentType(),
					contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));
			reservationGroup.getItems().addAll(operationResult.getResultObjects());
		}
		// 加载原因数据
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBaseDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBaseDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBaseDocumentLineId());
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		boRepository.setRepository(super.getRepository());
		IOperationResult<IMaterialOrderedReservation> operationResult = boRepository
				.fetchMaterialOrderedReservation(criteria);
		if (operationResult.getError() != null) {
			throw new BusinessLogicException(operationResult.getError());
		}
		reservationGroup.getCausalDatas().addAll(operationResult.getResultObjects());
		return reservationGroup;
	}

	@Override
	protected void impact(IMaterialOrderedReservationCreateContract contract) {
		IMaterialOrderedReservationGroup reservationGroup = this.getBeAffected();
		String causes = String.format("FROM:%s-%s-%s", contract.getBaseDocumentType(), contract.getBaseDocumentEntry(),
				contract.getBaseDocumentLineId());
		BigDecimal remQuantity;
		IMaterialOrderedReservation gItem;
		BigDecimal avaQuantity = contract.getQuantity();
		for (IMaterialOrderedReservation item : reservationGroup.getCausalDatas()) {
			if (item.getTargetDocumentType() == null) {
				continue;
			}
			remQuantity = item.getQuantity().subtract(item.getClosedQuantity());
			if (remQuantity.compareTo(Decimal.ZERO) <= 0) {
				continue;
			}
			gItem = reservationGroup.getItems().firstOrDefault(c -> causes.equalsIgnoreCase(item.getCauses()));
			if (gItem == null) {
				gItem = new MaterialOrderedReservation();
				gItem.setCauses(causes);
				reservationGroup.getItems().add(gItem);
			} else {
				if (gItem.isDeleted()) {
					gItem.undelete();
				}
			}
			gItem.setSourceDocumentType(contract.getDocumentType());
			gItem.setSourceDocumentEntry(contract.getDocumentEntry());
			gItem.setSourceDocumentLineId(contract.getDocumentLineId());
			gItem.setWarehouse(contract.getWarehouse());
			gItem.setTargetDocumentType(item.getTargetDocumentType());
			gItem.setTargetDocumentEntry(item.getTargetDocumentEntry());
			gItem.setTargetDocumentLineId(item.getTargetDocumentLineId());
			gItem.setItemCode(item.getItemCode());
			gItem.setDeliveryDate(item.getDeliveryDate());
			gItem.setInvalidDate(item.getInvalidDate());
			gItem.setInvalidTime(item.getInvalidTime());
			gItem.setRemarks(item.getRemarks());
			if (remQuantity.compareTo(avaQuantity) >= 0) {
				gItem.setQuantity(avaQuantity);
			} else {
				gItem.setQuantity(remQuantity);
			}
			item.setClosedQuantity(item.getClosedQuantity().add(gItem.getQuantity()));
			avaQuantity = avaQuantity.subtract(gItem.getQuantity());
			if (avaQuantity.compareTo(Decimal.ZERO) <= 0) {
				// 无可用量
				break;
			}
		}
	}

	@Override
	protected void revoke(IMaterialOrderedReservationCreateContract contract) {
		IMaterialOrderedReservation item;
		BigDecimal avaQuantity = contract.getQuantity();
		IMaterialOrderedReservationGroup reservationGroup = this.getBeAffected();
		for (int i = reservationGroup.getItems().size() - 1; i >= 0; i--) {
			item = reservationGroup.getItems().get(i);
			if (item.getQuantity().compareTo(avaQuantity) >= 0) {
				item.setQuantity(item.getQuantity().subtract(avaQuantity));
				for (IMaterialOrderedReservation oItem : reservationGroup.getCausalDatas()) {
					if (String.format("FROM:%s-%s-%s", oItem.getSourceDocumentType(), oItem.getSourceDocumentEntry(),
							oItem.getSourceDocumentLineId()).equals(item.getCauses())) {
						oItem.setClosedQuantity(oItem.getClosedQuantity().subtract(avaQuantity));
					}
				}
				avaQuantity = Decimal.ZERO;
			} else {
				avaQuantity = avaQuantity.subtract(item.getQuantity());
				for (IMaterialOrderedReservation oItem : reservationGroup.getCausalDatas()) {
					if (String.format("FROM:%s-%s-%s", oItem.getSourceDocumentType(), oItem.getSourceDocumentEntry(),
							oItem.getSourceDocumentLineId()).equals(item.getCauses())) {
						oItem.setClosedQuantity(oItem.getClosedQuantity().subtract(item.getQuantity()));
					}
				}
				item.setQuantity(Decimal.ZERO);
			}
			if (item.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				item.delete();
			}
			if (avaQuantity.compareTo(Decimal.ZERO) <= 0) {
				// 无可用量
				break;
			}
		}

	}

}
