package org.colorcoding.ibas.materials.logic;

import java.util.Arrays;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.ITrackStatus;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialInventoryBusinessLogic<L extends IBusinessLogicContract, B extends IBusinessObject>
		extends MaterialBusinessLogic<L, B> {

	/**
	 * 正常记录
	 */
	public static final String DATASOURCE_SIGN_REGULAR_JOURNAL = "JNL-REG";
	/**
	 * 冲销记录
	 */
	public static final String DATASOURCE_SIGN_OFFSETTING_JOURNAL = "JNL-OFF";

	public MaterialInventoryBusinessLogic() {
		this.setEnableMaterialCosts(
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false));
	}

	private boolean enableMaterialCosts;

	public final boolean isEnableMaterialCosts() {
		return enableMaterialCosts;
	}

	public final void setEnableMaterialCosts(boolean value) {
		this.enableMaterialCosts = value;
	}

	protected IWarehouse checkWarehouse(String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Warehouse.PROPERTY_CODE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setBracketOpen(1);
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setValue(emYesNo.YES);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setValue(emYesNo.NO);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setRelationship(ConditionRelationship.OR);
		condition = criteria.getConditions().create();
		condition.setBracketClose(1);
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setOperation(ConditionOperation.IS_NULL);
		condition.setRelationship(ConditionRelationship.OR);
		IWarehouse warehouse = super.fetchBeAffected(criteria, IWarehouse.class);
		if (warehouse == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IWarehouse> operationResult = boRepository.fetchWarehouse(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			warehouse = operationResult.getResultObjects().firstOrDefault();
		}
		// 仓库不存在
		if (warehouse == null) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_warehouse_is_not_exist", whsCode == null ? "" : whsCode));
		}
		// 检查仓库可用状态
		if (warehouse.getActivated() == emYesNo.NO || warehouse.getDeleted() == emYesNo.YES) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_warehouse_is_unavailable", warehouse.getCode(), warehouse.getName()));
		}
		return warehouse;
	}

	protected IMaterialInventory checkMaterialInventory(String itemCode, String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialInventory materialInventory = super.fetchBeAffected(criteria, IMaterialInventory.class);
		if (materialInventory == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialInventory = operationResult.getResultObjects().firstOrDefault();
		}
		return materialInventory;
	}

	protected IMaterialBatch checkMaterialBatch(String itemCode, String whsCode, String batchCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE.getName());
		condition.setValue(batchCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialBatch materialInventory = super.fetchBeAffected(criteria, IMaterialBatch.class);
		if (materialInventory == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialBatch> operationResult = boRepository.fetchMaterialBatch(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialInventory = operationResult.getResultObjects().firstOrDefault();
		}
		return materialInventory;
	}

	protected IMaterialSerial checkMaterialSerial(String itemCode, String whsCode, String serialCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
		condition.setValue(serialCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialSerial materialInventory = super.fetchBeAffected(criteria, IMaterialSerial.class);
		if (materialInventory == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialSerial> operationResult = boRepository.fetchMaterialSerial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialInventory = operationResult.getResultObjects().firstOrDefault();
		}
		return materialInventory;
	}

	/**
	 * 检查数据状态（需要与底层一致）
	 * 
	 * @param data  检查的数据
	 * @param skips 跳过检查的类型
	 * @return 有效，true；无效，false
	 */
	protected boolean checkDataStatus(Object data, Class<?>... skips) {
		if (data instanceof ITrackStatus) {
			// 标记删除的数据无效
			ITrackStatus status = (ITrackStatus) data;
			if (status.isDeleted()) {
				if (!Arrays.asList(skips).contains(ITrackStatus.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBOTagDeleted) {
			// 引用数据，已标记删除的，不影响业务逻辑
			IBOTagDeleted refData = (IBOTagDeleted) data;
			if (refData.getDeleted() == emYesNo.YES) {
				if (!Arrays.asList(skips).contains(IBOTagDeleted.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBOTagCanceled) {
			// 引用数据，已标记取消的，不影响业务逻辑
			IBOTagCanceled refData = (IBOTagCanceled) data;
			if (refData.getCanceled() == emYesNo.YES) {
				if (!Arrays.asList(skips).contains(IBOTagCanceled.class)) {
					return false;
				}
			}
		}
		if (data instanceof IApprovalData) {
			// 审批数据
			IApprovalData apData = (IApprovalData) data;
			if (apData.getApprovalStatus() == emApprovalStatus.CANCELLED
					|| apData.getApprovalStatus() == emApprovalStatus.PROCESSING
					|| apData.getApprovalStatus() == emApprovalStatus.REJECTED
					|| apData.getApprovalStatus() == emApprovalStatus.RETURNED) {
				// 审批中，取消，拒绝，退回
				if (!Arrays.asList(skips).contains(IApprovalData.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBODocument) {
			// 单据类型
			IBODocument docData = (IBODocument) data;
			if (docData.getDocumentStatus() == emDocumentStatus.PLANNED) {
				// 计划状态
				if (!Arrays.asList(skips).contains(IBODocument.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBODocumentLine) {
			// 单据行
			IBODocumentLine lineData = (IBODocumentLine) data;
			if (lineData.getLineStatus() == emDocumentStatus.PLANNED) {
				// 计划状态
				if (!Arrays.asList(skips).contains(IBODocumentLine.class)) {
					return false;
				}
			}
		}
		return true;
	}
}
