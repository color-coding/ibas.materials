package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logging.Logger;
import org.colorcoding.ibas.bobas.logging.LoggingLevel;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;
import org.colorcoding.ibas.materials.data.emEstimateType;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialCommitedJournalContract.class)
public class MaterialCommitedJournalService extends MaterialEstimateService<IMaterialCommitedJournalContract> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialCommitedJournalContract) {
			IMaterialCommitedJournalContract contract = (IMaterialCommitedJournalContract) data;
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES) {
				// 服务物料，不执行此逻辑
				Logger.log(LoggingLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "ItemType",
						material.getItemType());
				return false;
			}
			if (material.getPhantomItem() == emYesNo.YES) {
				// 虚拟物料，不执行此逻辑
				Logger.log(LoggingLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"PhantomItem", material.getPhantomItem());
				return false;
			}
			if (material.getInventoryItem() == emYesNo.NO) {
				Logger.log(LoggingLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				// 非库存物料，不执行此逻辑
				return false;
			}
			if (!Strings.isNullOrEmpty(material.getInventoryUOM()) && !Strings.isNullOrEmpty(contract.getUOM())) {
				// 检查库存单位是否一致
				if (!material.getInventoryUOM().equalsIgnoreCase(contract.getUOM())) {
					throw new BusinessLogicException(I18N.prop("msg_mm_document_uom_is_not_same_material_setting",
							contract.getIdentifiers(), contract.getItemCode()));
				}
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialEstimateJournal fetchBeAffected(IMaterialCommitedJournalContract contract) {
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
		condition.setValue(emEstimateType.COMMITED);

		IMaterialEstimateJournal materialJournal = this.fetchBeAffected(IMaterialEstimateJournal.class, criteria);
		if (materialJournal == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialEstimateJournal> operationResult = boRepository
						.fetchMaterialEstimateJournal(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialJournal = operationResult.getResultObjects().firstOrDefault();
			}
		}
		if (materialJournal == null) {
			materialJournal = new MaterialEstimateJournal();
			materialJournal.setEstimate(emEstimateType.COMMITED);
			materialJournal.setBaseDocumentType(contract.getDocumentType());
			materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialCommitedJournalContract contract) {
		IMaterialEstimateJournal materialJournal = this.getBeAffected();
		materialJournal.setItemCode(contract.getItemCode());
		materialJournal.setWarehouse(contract.getWarehouse());
		materialJournal.setQuantity(contract.getQuantity());
		materialJournal.setClosedQuantity(contract.getClosedQuantity());
		materialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
		materialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
		materialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		materialJournal.setPostingDate(contract.getPostingDate());
		materialJournal.setDocumentDate(contract.getDocumentDate());
		materialJournal.setDeliveryDate(contract.getDeliveryDate());
		materialJournal.setStatus(contract.getStatus());
		IMaterial material = this.checkMaterial(contract.getItemCode());
		materialJournal.setItemName(material.getName());
		if (material.getVersionManagement() == emYesNo.YES) {
			if (Strings.isNullOrEmpty(contract.getItemVersion())) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_specified_material_version", contract.getIdentifiers()));
			}
		}
		// 预留触发的，不进行可用量逻辑
		if (materialJournal instanceof MaterialEstimateJournal) {
			((MaterialEstimateJournal) materialJournal).setBusy(true);
		}
	}

	@Override
	protected void revoke(IMaterialCommitedJournalContract contract) {
		IMaterialEstimateJournal materialJournal = this.getBeAffected();
		materialJournal.setQuantity(Decimals.VALUE_ZERO);
		materialJournal.setClosedQuantity(Decimals.VALUE_ZERO);
		materialJournal.setStatus(emBOStatus.CLOSED);
		if (Decimals.isZero(materialJournal.getQuantity())) {
			// 已为0，则删除此条数据
			materialJournal.delete();
		}
		// 预留触发的，不进行可用量逻辑
		if (materialJournal instanceof MaterialEstimateJournal) {
			((MaterialEstimateJournal) materialJournal).setBusy(true);
		}
	}

}
