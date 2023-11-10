package org.colorcoding.ibas.materials.logic;

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
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emEstimateType;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialOrderedJournalContract.class)
public class MaterialOrderedJournalService extends MaterialEstimateService<IMaterialOrderedJournalContract> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialOrderedJournalContract) {
			IMaterialOrderedJournalContract contract = (IMaterialOrderedJournalContract) data;
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
					throw new BusinessLogicException(I18N.prop("msg_mm_document_uom_is_not_same_material_setting",
							contract.getIdentifiers(), contract.getItemCode()));
				}
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialEstimateJournal fetchBeAffected(IMaterialOrderedJournalContract contract) {
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
		condition.setValue(emEstimateType.ORDERED);

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
			materialJournal = new MaterialEstimateJournal();
			materialJournal.setEstimate(emEstimateType.ORDERED);
			materialJournal.setBaseDocumentType(contract.getDocumentType());
			materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialOrderedJournalContract contract) {
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
		if (material != null) {
			materialJournal.setItemName(material.getName());
		}
	}

	@Override
	protected void revoke(IMaterialOrderedJournalContract contract) {
		IMaterialEstimateJournal materialJournal = this.getBeAffected();
		materialJournal.setQuantity(Decimal.ZERO);
		materialJournal.setClosedQuantity(Decimal.ZERO);
		materialJournal.setStatus(emBOStatus.CLOSED);
		if (Decimal.isZero(materialJournal.getQuantity())) {
			// 已为0，则删除此条数据
			materialJournal.delete();
		}
	}

}
