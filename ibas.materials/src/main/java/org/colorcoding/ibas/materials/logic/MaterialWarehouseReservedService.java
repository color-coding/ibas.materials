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
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialWarehouseReservedContract.class)
public class MaterialWarehouseReservedService
		extends MaterialInventoryBusinessLogic<IMaterialWarehouseReservedContract, IMaterialInventory> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialWarehouseReservedContract) {
			IMaterialWarehouseReservedContract contract = (IMaterialWarehouseReservedContract) data;
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
			if (contract.getStatus() == emBOStatus.CLOSED) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Status",
						contract.getStatus());
				return false;
			}
			if (contract.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
			if (this.checkWarehouse(contract.getWarehouse()).getReservable() == emYesNo.NO) {
				// 不可预留仓库
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"Warehouse Reservable", "NO");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventory fetchBeAffected(IMaterialWarehouseReservedContract contract) {
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料库存记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getWarehouse());

		IMaterialInventory materialInventory = this.fetchBeAffected(criteria, IMaterialInventory.class);
		if (materialInventory == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialInventory = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialInventory == null) {
			materialInventory = new MaterialInventory();
			materialInventory.setItemCode(contract.getItemCode());
			materialInventory.setWarehouse(contract.getWarehouse());
		}
		return materialInventory;
	}

	@Override
	protected boolean onRepeatedImpact(int times) {
		return true;
	}

	@Override
	protected boolean onRepeatedRevoke(int times) {
		return true;
	}

	BigDecimal impactReserved = Decimal.ZERO;

	@Override
	protected void impact(IMaterialWarehouseReservedContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		BigDecimal onReserved = materialInventory.getOnReserved();
		// 减去上次增加值（同物料多行时）
		onReserved = onReserved.subtract(this.impactReserved).add(contract.getQuantity());
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 批次或序列号管理物料此刻不检查预留是否超库存
		if (material.getBatchManagement() == emYesNo.YES || material.getSerialManagement() == emYesNo.YES) {
			materialInventory.setOnReserved(onReserved, true);
		} else {
			materialInventory.setOnReserved(onReserved);
		}
		// 记录本次增加值
		this.impactReserved = impactReserved.add(contract.getQuantity());
	}

	BigDecimal revokeReserved = Decimal.ZERO;

	@Override
	protected void revoke(IMaterialWarehouseReservedContract contract) {
		IMaterialInventory materialInventory = this.getBeAffected();
		BigDecimal onReserved = materialInventory.getOnReserved();
		onReserved = onReserved.add(this.revokeReserved).subtract(contract.getQuantity());
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 批次或序列号管理物料此刻不检查预留是否超库存
		if (material.getBatchManagement() == emYesNo.YES || material.getSerialManagement() == emYesNo.YES) {
			materialInventory.setOnReserved(onReserved, true);
		} else {
			materialInventory.setOnReserved(onReserved);
		}
		// 记录本次增加值
		this.revokeReserved = revokeReserved.add(contract.getQuantity());
	}

}
