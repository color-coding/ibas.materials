package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservationGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservationGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialInventoryReservationCreateContract.class)
public class MaterialInventoryReservationCreateService extends
		MaterialInventoryBusinessLogic<IMaterialInventoryReservationCreateContract, IMaterialInventoryReservationGroup> {

	private static final IMaterialInventoryReservationGroup EMPTY_DATA = new TmpMaterialInventoryReservationGroup();

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialInventoryReservationCreateContract) {
			IMaterialInventoryReservationCreateContract contract = (IMaterialInventoryReservationCreateContract) data;
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES) {
				// 服务物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "ItemType",
						material.getItemType());
				return false;
			}
			if (material.getPhantomItem() == emYesNo.YES) {
				// 虚拟物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"PhantomItem", material.getPhantomItem());
				return false;
			}
			if (material.getInventoryItem() == emYesNo.NO) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				// 非库存物料，不执行此逻辑
				return false;
			}
			if (contract.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
			if (DataConvert.isNullOrEmpty(contract.getSourceDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"SourceDocumentType", "EMPTY");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventoryReservationGroup fetchBeAffected(IMaterialInventoryReservationCreateContract contract) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_CAUSES.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
				contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId()));
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getBatchManagement() == emYesNo.YES) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryReservation.PROPERTY_BATCHCODE.getName());
			condition.setValue(contract.getBatchCode());
			if (!(this.getHost() instanceof IMaterialBatchJournal)) {
				// 批次管理，宿主为序列记录则不执行
				return EMPTY_DATA;
			}
		}
		if (material.getSerialManagement() == emYesNo.YES) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryReservation.PROPERTY_SERIALCODE.getName());
			condition.setValue(contract.getSerialCode());
			if (!(this.getHost() instanceof IMaterialSerialJournal)) {
				// 序列管理，宿主为批次记录则不执行
				return EMPTY_DATA;
			}
		}
		IMaterialInventoryReservationGroup reservationGroup = this.fetchBeAffected(criteria,
				IMaterialInventoryReservationGroup.class);
		if (reservationGroup == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventoryReservation> operationResult = boRepository
					.fetchMaterialInventoryReservation(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			reservationGroup = new MaterialInventoryReservationGroup();
			reservationGroup.setCauses(String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
					contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId()));
			reservationGroup.setBatchCode(contract.getBatchCode());
			reservationGroup.setSerialCode(contract.getSerialCode());
			reservationGroup.getItems().addAll(operationResult.getResultObjects());
		}
		// 加载相关的原因数据
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSourceDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSourceDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSourceDocumentLineId());
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
	protected void impact(IMaterialInventoryReservationCreateContract contract) {
		IMaterialInventoryReservationGroup reservationGroup = this.getBeAffected();
		if (reservationGroup == EMPTY_DATA) {
			// 空数据不做处理
			return;
		}
		BigDecimal remQuantity;
		BigDecimal avaQuantity = contract.getQuantity();
		IMaterialInventoryReservation gItem;
		String causes = String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
				contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId());
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
				gItem = new MaterialInventoryReservation();
				gItem.setCauses(causes);
				reservationGroup.getItems().add(gItem);
			} else {
				if (gItem.isDeleted()) {
					gItem.undelete();
				}
			}
			gItem.setItemCode(contract.getItemCode());
			gItem.setWarehouse(contract.getWarehouse());
			gItem.setBatchCode(contract.getBatchCode());
			gItem.setSerialCode(contract.getSerialCode());
			if (remQuantity.compareTo(avaQuantity) >= 0) {
				gItem.setQuantity(avaQuantity);
			} else {
				gItem.setQuantity(remQuantity);
			}
			gItem.setTargetDocumentType(item.getTargetDocumentType());
			gItem.setTargetDocumentEntry(item.getTargetDocumentEntry());
			gItem.setTargetDocumentLineId(item.getTargetDocumentLineId());
			gItem.setRemarks(item.getRemarks());
			item.setClosedQuantity(item.getClosedQuantity().add(gItem.getQuantity()));
			avaQuantity = avaQuantity.subtract(gItem.getQuantity());
			if (avaQuantity.compareTo(Decimal.ZERO) <= 0) {
				// 无可用量
				break;
			}
		}
	}

	@Override
	protected void revoke(IMaterialInventoryReservationCreateContract contract) {
		IMaterialInventoryReservationGroup reservationGroup = this.getBeAffected();
		if (reservationGroup == EMPTY_DATA) {
			// 空数据不做处理
			return;
		}
		IMaterialInventoryReservation item;
		BigDecimal avaQuantity = contract.getQuantity();
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

class TmpMaterialInventoryReservationGroup extends MaterialInventoryReservationGroup {

	private static final long serialVersionUID = 1L;

	public TmpMaterialInventoryReservationGroup() {
		this.markOld();
		this.setSavable(false);
	}

}
