package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchJournalContract.class)
public class MaterialBatchJournalService
		extends MaterialBusinessLogic<IMaterialBatchJournalContract, IMaterialBatchJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialBatchJournalContract) {
			IMaterialBatchJournalContract contract = (IMaterialBatchJournalContract) data;
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
			if (!DataConvert.isNullOrEmpty(material.getInventoryUOM())
					&& !DataConvert.isNullOrEmpty(contract.getUOM())) {
				// 检查库存单位是否一致
				if (!material.getInventoryUOM().equalsIgnoreCase(contract.getUOM())) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_uom_is_not_same_material_setting",
							contract.getBatchCode(), contract.getItemCode()));
				}
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialBatchJournal fetchBeAffected(IMaterialBatchJournalContract contract) {
		// 检查物料批次记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getBatchCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());

		IMaterialBatchJournal materialBatchJournal = this.fetchBeAffected(criteria, IMaterialBatchJournal.class);
		if (materialBatchJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialBatchJournal> operationResult = boRepository.fetchMaterialBatchJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialBatchJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialBatchJournal == null) {
			materialBatchJournal = new MaterialBatchJournal();
			materialBatchJournal.setBatchCode(contract.getBatchCode());
			materialBatchJournal.setDirection(contract.getDirection());
			materialBatchJournal.setBaseDocumentType(contract.getDocumentType());
			materialBatchJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialBatchJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialBatchJournal;
	}

	@Override
	protected void impact(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		materialBatchJournal.setItemCode(contract.getItemCode());
		materialBatchJournal.setWarehouse(contract.getWarehouse());
		materialBatchJournal.setQuantity(materialBatchJournal.getQuantity().add(contract.getQuantity()));
		materialBatchJournal.setOriginalDocumentType(contract.getBaseDocumentType());
		materialBatchJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
		materialBatchJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
	}

	@Override
	protected void revoke(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		materialBatchJournal.setQuantity(materialBatchJournal.getQuantity().subtract(contract.getQuantity()));
		if (Decimal.isZero(materialBatchJournal.getQuantity())) {
			materialBatchJournal.delete();
		}
	}

}