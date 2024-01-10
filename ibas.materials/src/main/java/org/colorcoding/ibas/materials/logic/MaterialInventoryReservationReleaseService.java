package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialInventoryReservationReleaseContract.class)
public class MaterialInventoryReservationReleaseService extends
		MaterialInventoryBusinessLogic<IMaterialInventoryReservationReleaseContract, IMaterialInventoryReservation> {

	private static final IMaterialInventoryReservation EMPTY_DATA = new _MaterialInventoryReservation();

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialInventoryReservationReleaseContract) {
			IMaterialInventoryReservationReleaseContract contract = (IMaterialInventoryReservationReleaseContract) data;
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
			if (DataConvert.isNullOrEmpty(contract.getTargetDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"TargetDocumentType", "EMPTY");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventoryReservation fetchBeAffected(IMaterialInventoryReservationReleaseContract contract) {
		// 检查预留记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE.getName());
		condition.setValue(contract.getTargetDocumentType());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY.getName());
		condition.setValue(contract.getTargetDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTLINEID.getName());
		condition.setValue(contract.getTargetDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_ITEMCODE.getName());
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_WAREHOUSE.getName());
		condition.setValue(contract.getWarehouse());
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
		IMaterialInventoryReservation materialReservation = this.fetchBeAffected(criteria,
				IMaterialInventoryReservation.class);
		if (materialReservation == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventoryReservation> operationResult = boRepository
					.fetchMaterialInventoryReservation(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialReservation = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialReservation == null) {
			materialReservation = EMPTY_DATA;
		}
		return materialReservation;
	}

	@Override
	protected void impact(IMaterialInventoryReservationReleaseContract contract) {
		IMaterialInventoryReservation materialReservation = this.getBeAffected();
		if (materialReservation != EMPTY_DATA) {
			materialReservation.setClosedQuantity(materialReservation.getClosedQuantity().add(contract.getQuantity()));
		}
	}

	@Override
	protected void revoke(IMaterialInventoryReservationReleaseContract contract) {
		IMaterialInventoryReservation materialReservation = this.getBeAffected();
		if (materialReservation != EMPTY_DATA) {
			materialReservation
					.setClosedQuantity(materialReservation.getClosedQuantity().subtract(contract.getQuantity()));
		}
	}

}

class _MaterialInventoryReservation extends MaterialInventoryReservation {

	private static final long serialVersionUID = 1L;

	public _MaterialInventoryReservation() {
		this.markOld();
		this.setSavable(false);
	}

	@Override
	public IBusinessLogicContract[] getContracts() {
		return null;
	}
}