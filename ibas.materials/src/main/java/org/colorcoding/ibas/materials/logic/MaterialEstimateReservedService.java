package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialEstimateReservedContract.class)
public class MaterialEstimateReservedService extends MaterialEstimateService<IMaterialEstimateReservedContract> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialEstimateReservedContract) {
			IMaterialEstimateReservedContract contract = (IMaterialEstimateReservedContract) data;
			if (DataConvert.isNullOrEmpty(contract.getWarehouse())) {
				// 无仓库信息，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Warehouse",
						contract.getWarehouse());
				return false;
			}
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
				// 非库存物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialEstimateJournal fetchBeAffected(IMaterialEstimateReservedContract contract) {
		// 检查物料
		this.checkMaterial(contract.getItemCode());
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料收货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialEstimateJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialEstimateJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialEstimateJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialEstimateJournal.PROPERTY_ESTIMATE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getEstimateType());

		IMaterialEstimateJournal materialJournal = this.fetchBeAffected(criteria, IMaterialEstimateJournal.class);
		if (materialJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialEstimateJournal> operationResult = boRepository
					.fetchMaterialEstimateJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialJournal == null) {
			materialJournal = new _MaterialEstimateJournal();
			materialJournal.setEstimate(contract.getEstimateType());
			materialJournal.setBaseDocumentType(contract.getDocumentType());
			materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialJournal;
	}

	@Override
	protected boolean onRepeatedImpact(int times) {
		return true;
	}

	@Override
	protected boolean onRepeatedRevoke(int times) {
		return true;
	}

	@Override
	protected void impact(IMaterialEstimateReservedContract contract) {
		IMaterialEstimateJournal materialJournal = this.getBeAffected();
		materialJournal.setItemCode(contract.getItemCode());
		materialJournal.setWarehouse(contract.getWarehouse());
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material != null) {
			materialJournal.setItemName(material.getName());
		}
		BigDecimal reserved = materialJournal.getReservedQuantity();
		if (contract.getStatus() != emBOStatus.CLOSED) {
			// 关闭的，不更新数量
			reserved = reserved.add(contract.getQuantity());
		}
		if (Decimal.ZERO.compareTo(reserved) <= 0) {
			if (reserved.compareTo(materialJournal.getQuantity()) > 0
					&& Decimal.ZERO.compareTo(materialJournal.getQuantity()) != 0) {
				throw new BusinessLogicException(I18N.prop("msg_mm_material_not_enough", contract.getItemCode()));
			}
			materialJournal.setReservedQuantity(reserved);
		}
	}

	@Override
	protected void revoke(IMaterialEstimateReservedContract contract) {
		IMaterialEstimateJournal materialJournal = this.getBeAffected();
		BigDecimal reserved = materialJournal.getReservedQuantity();
		if (contract.getStatus() != emBOStatus.CLOSED) {
			// 关闭的，不更新数量
			reserved = reserved.subtract(contract.getQuantity());
		}
		if (Decimal.ZERO.compareTo(reserved) > 0) {
			reserved = Decimal.ZERO;
		}
		materialJournal.setReservedQuantity(reserved);
	}

	private class _MaterialEstimateJournal extends MaterialEstimateJournal {

		private static final long serialVersionUID = 1L;

		@Override
		public IBusinessLogicContract[] getContracts() {
			return null;
		}
	}
}
