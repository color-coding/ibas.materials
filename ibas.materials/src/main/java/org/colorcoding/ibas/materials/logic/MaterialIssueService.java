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
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialIssueContract.class)
public class MaterialIssueService
		extends MaterialInventoryBusinessLogic<IMaterialIssueContract, IMaterialInventoryJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialIssueContract) {
			IMaterialIssueContract contract = (IMaterialIssueContract) data;
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
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialIssueContract contract) {
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
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料发货记录
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
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setRelationship(ConditionRelationship.AND);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(emDirection.OUT);

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
			materialJournal.setDirection(emDirection.OUT);
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialIssueContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		materialJournal.setItemCode(contract.getItemCode());
		materialJournal.setItemName(contract.getItemName());
		if (DataConvert.isNullOrEmpty(materialJournal.getItemName())
				|| materialJournal.getItemCode().equals(materialJournal.getItemName())) {
			IMaterial material = this.checkMaterial(materialJournal.getItemCode());
			materialJournal.setItemName(material.getName());
		}
		materialJournal.setWarehouse(contract.getWarehouse());
		materialJournal.setPostingDate(contract.getPostingDate());
		materialJournal.setDocumentDate(contract.getDocumentDate());
		materialJournal.setDeliveryDate(contract.getDeliveryDate());
		materialJournal.setQuantity(contract.getQuantity());
		materialJournal.setPrice(contract.getPrice());
		materialJournal.setCurrency(contract.getCurrency());
		materialJournal.setRate(contract.getRate());
		materialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
		materialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
		materialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getManageByWarehouse() == emYesNo.YES) {
			// 物料仓库个别管理
			IMaterialInventory materialInventory = this.checkMaterialInventory(contract.getItemCode(),
					contract.getWarehouse());
			if (materialInventory != null) {
				// 成本价格 = 库存均价
				materialJournal.setCalculatedPrice(materialInventory.getAvgPrice());
			}
		} else {
			// 库存价值
			if (material != null) {
				// 成本价格 = 库存均价
				materialJournal.setCalculatedPrice(material.getAvgPrice());
			}
		}
	}

	@Override
	protected void revoke(IMaterialIssueContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		materialJournal.setQuantity(Decimal.ZERO);
		if (Decimal.isZero(materialJournal.getQuantity())) {
			// 已为0，则删除此条数据
			materialJournal.delete();
		}
	}

}
