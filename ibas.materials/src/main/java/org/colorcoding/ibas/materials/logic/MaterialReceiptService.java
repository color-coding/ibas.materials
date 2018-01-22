package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialReceiptContract.class)
public class MaterialReceiptService
		extends MaterialInventoryBusinessLogic<IMaterialReceiptContract, IMaterialInventoryJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialReceiptContract) {
			IMaterialReceiptContract contract = (IMaterialReceiptContract) data;
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
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialReceiptContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getBatchManagement() != contract.getBatchManagement()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_batchmanagement_is_not_same_material_setting",
					contract.getIdentifiers(), contract.getItemCode()));
		}
		if (material.getSerialManagement() != contract.getSerialManagement()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_serialmanagement_is_not_same_material_setting",
					contract.getIdentifiers(), contract.getItemCode()));
		}
		// 检查仓库
		this.checkWarehose(contract.getWarehouse());
		// 检查物料收货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(emDirection.IN);

		IMaterialInventoryJournal materialJournal = this.fetchBeAffected(criteria, IMaterialInventoryJournal.class);
		if (materialJournal == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
					.fetchMaterialInventoryJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialJournal = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialJournal == null) {
			materialJournal = new MaterialInventoryJournal();
			materialJournal.setBaseDocumentType(contract.getDocumentType());
			materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
			materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
			materialJournal.setDirection(emDirection.IN);
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		materialJournal.setItemCode(contract.getItemCode());
		materialJournal.setItemName(contract.getItemName());
		materialJournal.setWarehouse(contract.getWarehouse());
		materialJournal.setPostingDate(contract.getPostingDate());
		materialJournal.setDocumentDate(contract.getDocumentDate());
		materialJournal.setDeliveryDate(contract.getDeliveryDate());
		materialJournal.setQuantity(contract.getQuantity());
	}

	@Override
	protected void revoke(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		materialJournal.setQuantity(Decimal.ZERO);
		if (materialJournal.getQuantity().isZero()) {
			// 已为0，则删除此条数据
			materialJournal.delete();
		}
	}

}
