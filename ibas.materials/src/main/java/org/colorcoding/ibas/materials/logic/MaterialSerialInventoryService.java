package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
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
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialSerialInventoryContract.class)
public class MaterialSerialInventoryService
		extends MaterialInventoryBusinessLogic<IMaterialSerialInventoryContract, IMaterialSerial> {
	@Override
	protected IMaterialSerial fetchBeAffected(IMaterialSerialInventoryContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		// 服务物料，不执行此逻辑
		if (material.getItemType() == emItemType.SERVICES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_service_item", material.getCode()));
		}
		// 虚拟物料，不执行此逻辑
		if (material.getPhantomItem() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_phantom_item", material.getCode()));
		}
		// 非库存物料，不执行此逻辑
		if (material.getInventoryItem() == emYesNo.NO) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_is_not_inventory_item", material.getCode()));
		}
		// 非序列编码管理物料
		if (material.getSerialManagement() != emYesNo.YES) {
			throw new BusinessLogicException(
					String.format(I18N.prop("msg_mm_material_is_not_serialmanagement"), contract.getItemCode()));
		}
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料序列库存记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getSerialCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerial.PROPERTY_ITEMCODE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(MaterialSerial.PROPERTY_WAREHOUSE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getWarehouse());

		IMaterialSerial materialSerial = this.fetchBeAffected(criteria, IMaterialSerial.class);
		if (materialSerial == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialSerial> operationResult = boRepository.fetchMaterialSerial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			materialSerial = operationResult.getResultObjects().firstOrDefault();
		}
		if (materialSerial == null) {
			materialSerial = new MaterialSerial();
			materialSerial.setSerialCode(contract.getSerialCode());
			materialSerial.setItemCode(contract.getItemCode());
			materialSerial.setWarehouse(contract.getWarehouse());
			materialSerial.setInStock(emYesNo.NO);
		}
		if (materialSerial.getLocked() == emYesNo.YES) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_is_unavailable",
					materialSerial.getWarehouse(), materialSerial.getItemCode(), materialSerial.getSerialCode()));
		}
		return materialSerial;
	}

	@Override
	protected void impact(IMaterialSerialInventoryContract contract) {
		IMaterialSerial materialSerial = this.getBeAffected();
		if (materialSerial.isSavable()) {
			// 反向逻辑可能置对象无变化（无需保存），则不执行逻辑
			if ((contract.getDirection() == emDirection.IN && contract.getQuantity().compareTo(Decimal.ZERO) > 0)
					|| (contract.getDirection() == emDirection.OUT
							&& contract.getQuantity().compareTo(Decimal.ZERO) < 0)) {
				if (materialSerial.getInStock() == emYesNo.YES) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_in_stock",
							contract.getWarehouse(), contract.getItemCode(), contract.getSerialCode()));
				}
				if (materialSerial.getReserved() == emYesNo.YES) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_is_reserved",
							contract.getWarehouse(), contract.getItemCode(), contract.getSerialCode()));
				}
				materialSerial.setInStock(emYesNo.YES);
				if (this.checkMaterial(materialSerial.getItemCode())
						.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
					BigDecimal avgPrice = contract.getCalculatedPrice();
					if (avgPrice != null) {
						materialSerial.setAvgPrice(avgPrice);
					}
				}
			} else {
				if (materialSerial.getInStock() == emYesNo.NO) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_not_in_stock",
							contract.getItemCode(), contract.getSerialCode(), contract.getWarehouse()));
				}
				materialSerial.setInStock(emYesNo.NO);
			}
		}
	}

	@Override
	protected void revoke(IMaterialSerialInventoryContract contract) {
		IMaterialSerial materialSerial = this.getBeAffected();
		if (this.isSafeUpdate()) {
			if (materialSerial instanceof BusinessObject) {
				BusinessObject<?> bo = (BusinessObject<?>) materialSerial;
				bo.unsavable();
			}
		}
		if (materialSerial.isSavable()) {
			// 无需保存则不执行逻辑
			if ((contract.getDirection() == emDirection.IN && contract.getQuantity().compareTo(Decimal.ZERO) > 0)
					|| (contract.getDirection() == emDirection.OUT
							&& contract.getQuantity().compareTo(Decimal.ZERO) < 0)) {
				if (materialSerial.getInStock() == emYesNo.NO) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_not_in_stock",
							contract.getItemCode(), contract.getSerialCode(), contract.getWarehouse()));
				}
				materialSerial.setInStock(emYesNo.NO);
			} else {
				if (materialSerial.getInStock() == emYesNo.YES) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_serial_in_stock",
							contract.getWarehouse(), contract.getItemCode(), contract.getSerialCode()));
				}
				materialSerial.setInStock(emYesNo.YES);
			}
		}
	}

	private boolean isSafeUpdate() {
		if (this.getLogicChain().getTrigger() instanceof IMaterialSerialJournal) {
			IMaterialSerialJournal triggerJournal = (IMaterialSerialJournal) this.getLogicChain().getTrigger();
			if (this.getHost() instanceof IMaterialSerialJournal) {
				IMaterialSerialJournal hostJournal = (IMaterialSerialJournal) this.getHost();
				if (triggerJournal != hostJournal && !triggerJournal.isDeleted()
						&& triggerJournal.getSerialCode().equals(hostJournal.getSerialCode())
						&& triggerJournal.getItemCode().equals(hostJournal.getItemCode())
						&& triggerJournal.getWarehouse().equals(hostJournal.getWarehouse())
						&& triggerJournal.getDirection().equals(hostJournal.getDirection())) {
					return true;
				}
			}
		}
		return false;
	}

}