package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logics.BusinessLogic;
import org.colorcoding.ibas.bobas.logics.BusinessLogicsException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialReceiptContract.class)
/**
 * 物料 - 收货服务 生成一张日记账
 */
public class MaterialReceiptService extends BusinessLogic<IMaterialReceiptContract, IMaterialInventoryJournal> {
	@Override
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialReceiptContract contract) {
		try {
			checkContractData(contract);
			// region 定义查询条件
			ICriteria criteria = Criteria.create();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
			condition.setValue(contract.getJournal_BaseDocumentType());
			condition.setOperation(ConditionOperation.EQUAL);

			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
			condition.setValue(contract.getJournal_BaseDocumentEntry());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setRelationship(ConditionRelationship.AND);

			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
			condition.setValue(contract.getJournal_BaseDocumentLineId());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setRelationship(ConditionRelationship.AND);

			// endregion
			// region 查询物料日记账
			BORepositoryMaterials app = new BORepositoryMaterials();
			app.setRepository(super.getRepository());
			IOperationResult<IMaterialInventoryJournal> operationResult = app.fetchMaterialInventoryJournal(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicsException(operationResult.getError());
			}
			if (operationResult.getResultCode() != 0) {
				throw new BusinessLogicsException(operationResult.getError());
			}
			// endregion
			IMaterialInventoryJournal materialJournal = operationResult.getResultObjects().firstOrDefault();
			if (materialJournal == null) {
				materialJournal = MaterialInventoryJournal.create(contract);
			}
			return materialJournal;
		} catch (Exception ex) {
			throw ex;
		}
	}

	@Override
	protected void impact(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		Decimal issueQuantity = materialJournal.getQuantity();
		issueQuantity = issueQuantity.add(contract.getJournal_ReceiptQuantity());
		materialJournal.setQuantity(issueQuantity);
	}

	@Override
	protected void revoke(IMaterialReceiptContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		materialJournal.setItemCode((contract.getJournal_ItemCode()));
		materialJournal.setItemName(contract.getJournal_ItemName());
		materialJournal.setWarehouse(contract.getJournal_ReceiptWarehouseCode());
		Decimal issueQuantity = materialJournal.getQuantity();
		issueQuantity = issueQuantity.subtract(contract.getJournal_ReceiptQuantity());
		materialJournal.setQuantity(issueQuantity);
	}

	/**
	 * 检查契约数据是否合法
	 * 
	 * @return
	 */
	private void checkContractData(IMaterialReceiptContract contract) {
		if (contract.getJournal_ReceiptQuantity().equals(0)) {
			throw new BusinessLogicsException(String.format("入库数量不能为0"));
		}
		// region 查询物料
		ICriteria criteria = Criteria.create();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(contract.getJournal_ItemCode());
		condition.setOperation(ConditionOperation.EQUAL);
		BORepositoryMaterials app = new BORepositoryMaterials();
		app.setRepository(super.getRepository());
		IOperationResult<IMaterial> operationResult = app.fetchMaterial(criteria);
		if (operationResult.getError() != null) {
			throw new BusinessLogicsException(operationResult.getError());
		}
		if (operationResult.getResultCode() != 0) {
			throw new BusinessLogicsException(operationResult.getError());
		}
		IMaterial material = operationResult.getResultObjects().firstOrDefault();
		// endregion
		// region 检查物料
		if (material == null) {
			throw new NullPointerException(String.format("物料：%s不存在", contract.getJournal_ItemCode()));
		}
		// 虚拟物料，不生成库存记录
		if (material.getPhantomItem() == emYesNo.YES) {
			throw new BusinessLogicsException(String.format("该物料为虚拟物料，不生成库存记录"));
		}
		// 非库存物料，不生成库存记录
		if (material.getInventoryItem() != emYesNo.NO) {
			throw new BusinessLogicsException(String.format("该物料为非库存物料，不生成库存记录"));
		}
		// endregion
		// region 检查仓库
		if (material.getItemType() == emItemType.ITEM) {
			// 库存物料，检查仓库是否存在
			criteria = Criteria.create();
			condition = criteria.getConditions().create();
			condition.setAlias(Warehouse.PROPERTY_CODE.getName());
			condition.setValue(contract.getJournal_ReceiptWarehouseCode());
			condition.setOperation(ConditionOperation.EQUAL);
			IOperationResult<IWarehouse> opResult = app.fetchWarehouse(criteria);
			if (opResult.getError() != null) {
				throw new BusinessLogicsException(opResult.getError());
			}
			if (opResult.getResultCode() != 0) {
				throw new BusinessLogicsException(opResult.getError());
			}
			IWarehouse warehouse = opResult.getResultObjects().firstOrDefault();
			if (warehouse == null) {
				throw new NullPointerException(String.format("%s仓库不存在", contract.getJournal_ReceiptWarehouseCode()));
			}
		}
		// endregion
	}
}
