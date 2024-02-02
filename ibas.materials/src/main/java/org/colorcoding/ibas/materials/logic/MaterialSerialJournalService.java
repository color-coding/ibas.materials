package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialSerialJournalContract.class)
public class MaterialSerialJournalService
		extends MaterialBusinessLogic<IMaterialSerialJournalContract, IMaterialSerialJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialSerialJournalContract) {
			IMaterialSerialJournalContract contract = (IMaterialSerialJournalContract) data;
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
					throw new BusinessLogicException(
							I18N.prop("msg_mm_material_serial_uom_is_not_same_material_setting",
									contract.getSerialCode(), contract.getItemCode()));
				}
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialSerialJournal fetchBeAffected(IMaterialSerialJournalContract contract) {
		// 检查物料序列记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerialJournal.PROPERTY_SERIALCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSerialCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());

		IMaterialSerialJournal materialSerialJournal = this.fetchBeAffected(criteria, IMaterialSerialJournal.class);
		if (materialSerialJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialSerialJournal> operationResult = boRepository
					.fetchMaterialSerialJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialSerialJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialSerialJournal == null) {
			materialSerialJournal = new MaterialSerialJournal();
			materialSerialJournal.setSerialCode(contract.getSerialCode());
			materialSerialJournal.setDirection(contract.getDirection());
			materialSerialJournal.setBaseDocumentType(contract.getDocumentType());
			materialSerialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialSerialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialSerialJournal;
	}

	@Override
	protected void impact(IMaterialSerialJournalContract contract) {
		IMaterialSerialJournal materialSerialJournal = this.getBeAffected();
		materialSerialJournal.setItemCode(contract.getItemCode());
		materialSerialJournal.setWarehouse(contract.getWarehouse());
		materialSerialJournal.setPostingDate(contract.getPostingDate());
		materialSerialJournal.setDocumentDate(contract.getDocumentDate());
		materialSerialJournal.setDeliveryDate(contract.getDeliveryDate());
		materialSerialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
		materialSerialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
		materialSerialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
	}

	@Override
	protected void revoke(IMaterialSerialJournalContract contract) {
		IMaterialSerialJournal materialSerialJournal = this.getBeAffected();
		materialSerialJournal.delete();
	}

}