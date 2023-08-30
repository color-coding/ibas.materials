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

	private static final IMaterialInventoryReservationGroup EMPTY_DATA = new _MaterialInventoryReservationGroup();

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
			IOperationResult<IMaterialInventoryReservation> opRsltInventory = boRepository
					.fetchMaterialInventoryReservation(criteria);
			if (opRsltInventory.getError() != null) {
				throw new BusinessLogicException(opRsltInventory.getError());
			}
			reservationGroup = new MaterialInventoryReservationGroup();
			reservationGroup.setCauses(String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
					contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId()));
			reservationGroup.setBatchCode(contract.getBatchCode());
			reservationGroup.setSerialCode(contract.getSerialCode());
			reservationGroup.getItems().addAll(opRsltInventory.getResultObjects());
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
			IOperationResult<IMaterialOrderedReservation> opRsltOrdered = boRepository
					.fetchMaterialOrderedReservation(criteria);
			if (opRsltOrdered.getError() != null) {
				throw new BusinessLogicException(opRsltOrdered.getError());
			}
			reservationGroup.getCausalDatas().addAll(opRsltOrdered.getResultObjects());
		}
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
			gItem = reservationGroup.getItems()
					.firstOrDefault(c -> causes.equals(c.getCauses())
							&& c.getTargetDocumentType().equals(item.getTargetDocumentType())
							&& c.getTargetDocumentEntry().compareTo(item.getTargetDocumentEntry()) == 0
							&& c.getTargetDocumentLineId().compareTo(item.getTargetDocumentLineId()) == 0
							&& ((!DataConvert.isNullOrEmpty(contract.getBatchCode())
									&& contract.getBatchCode().equals(c.getBatchCode()))
									|| DataConvert.isNullOrEmpty(contract.getBatchCode()))
							&& ((!DataConvert.isNullOrEmpty(contract.getSerialCode())
									&& contract.getSerialCode().equals(c.getSerialCode()))
									|| DataConvert.isNullOrEmpty(contract.getSerialCode())));
			if (gItem == null) {
				gItem = new MaterialInventoryReservation();
				gItem.setCauses(causes);
				gItem.setTargetDocumentType(item.getTargetDocumentType());
				gItem.setTargetDocumentEntry(item.getTargetDocumentEntry());
				gItem.setTargetDocumentLineId(item.getTargetDocumentLineId());
				gItem.setBatchCode(contract.getBatchCode());
				gItem.setSerialCode(contract.getSerialCode());
				gItem.setQuantity(Decimal.ZERO);
				reservationGroup.getItems().add(gItem);
			} else {
				if (gItem.isDeleted()) {
					gItem.undelete();
				}
			}
			gItem.setItemCode(contract.getItemCode());
			gItem.setWarehouse(contract.getWarehouse());
			gItem.setRemarks(item.getRemarks());
			if (remQuantity.compareTo(avaQuantity) >= 0) {
				gItem.setQuantity(gItem.getQuantity().add(avaQuantity));
				item.setClosedQuantity(item.getClosedQuantity().add(avaQuantity));
				avaQuantity = Decimal.ZERO;
			} else {
				gItem.setQuantity(gItem.getQuantity().add(remQuantity));
				item.setClosedQuantity(item.getClosedQuantity().add(remQuantity));
				avaQuantity = avaQuantity.subtract(remQuantity);
			}
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
		BigDecimal remQuantity, avaQuantity = contract.getQuantity();
		for (int i = reservationGroup.getItems().size() - 1; i >= 0; i--) {
			item = reservationGroup.getItems().get(i);
			if (!DataConvert.isNullOrEmpty(contract.getBatchCode())
					&& !contract.getBatchCode().equals(item.getBatchCode())) {
				continue;
			}
			if (!DataConvert.isNullOrEmpty(contract.getSerialCode())
					&& !contract.getSerialCode().equals(item.getSerialCode())) {
				continue;
			}
			if (item.getQuantity().compareTo(avaQuantity) >= 0) {
				remQuantity = Decimal.ZERO.add(avaQuantity);
				item.setQuantity(item.getQuantity().subtract(avaQuantity));
				avaQuantity = Decimal.ZERO;
			} else {
				remQuantity = Decimal.ZERO.add(item.getQuantity());
				avaQuantity = avaQuantity.subtract(item.getQuantity());
				item.setQuantity(Decimal.ZERO);
			}
			for (IMaterialOrderedReservation oItem : reservationGroup.getCausalDatas()) {
				if (!String.format("FROM:%s-%s-%s", oItem.getSourceDocumentType(), oItem.getSourceDocumentEntry(),
						oItem.getSourceDocumentLineId()).equals(item.getCauses())) {
					continue;
				}
				if (!oItem.getTargetDocumentType().equals(item.getTargetDocumentType())) {
					continue;
				}
				if (oItem.getTargetDocumentEntry().compareTo(item.getTargetDocumentEntry()) != 0) {
					continue;
				}
				if (oItem.getTargetDocumentLineId().compareTo(item.getTargetDocumentLineId()) != 0) {
					continue;
				}
				if (oItem.getClosedQuantity().compareTo(Decimal.ZERO) <= 0) {
					continue;
				}
				if (oItem.getClosedQuantity().compareTo(remQuantity) >= 0) {
					oItem.setClosedQuantity(oItem.getClosedQuantity().subtract(remQuantity));
					remQuantity = Decimal.ZERO;
				} else {
					remQuantity = remQuantity.subtract(oItem.getClosedQuantity());
					oItem.setClosedQuantity(Decimal.ZERO);
				}
				if (remQuantity.compareTo(Decimal.ZERO) <= 0) {
					break;
				}
			}
			if (item.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				item.delete();
			}
			if (avaQuantity.compareTo(Decimal.ZERO) <= 0) {
				break;
			}
		}
	}

}

class _MaterialInventoryReservationGroup extends MaterialInventoryReservationGroup {

	private static final long serialVersionUID = 1L;

	public _MaterialInventoryReservationGroup() {
		this.markOld();
		this.setSavable(false);
	}

}
