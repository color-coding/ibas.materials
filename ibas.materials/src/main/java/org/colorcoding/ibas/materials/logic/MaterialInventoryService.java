package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.data.emItemType;

@LogicContract(IMaterialInventoryContract.class)
public class MaterialInventoryService extends MaterialInventoryBusinessLogic<IMaterialInventoryContract, IMaterial> {

	@Override
	protected IMaterial fetchBeAffected(IMaterialInventoryContract contract) {
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
		return material;
	}

	@Override
	protected void impact(IMaterialInventoryContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onHand = material.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.subtract(contract.getQuantity());
		} else {
			onHand = onHand.add(contract.getQuantity());
			if (contract.getCalculatedPrice() != null) {
				if (!MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
						true)) {
					material.setAvgPrice(contract.getCalculatedPrice());
				} else {
					material.setAvgPrice(Decimal.ZERO);
				}
			}
		}
		if (Decimal.ZERO.compareTo(onHand) > 0) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_not_enough", contract.getItemCode()));
		}
		material.setOnHand(onHand);
	}

	@Override
	protected void revoke(IMaterialInventoryContract contract) {
		IMaterial material = this.getBeAffected();
		BigDecimal onHand = material.getOnHand();
		if (contract.getDirection() == emDirection.OUT) {
			onHand = onHand.add(contract.getQuantity());
		} else {
			onHand = onHand.subtract(contract.getQuantity());
			if (contract.getCalculatedPrice() != null) {
				if (!MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
						true)) {
					material.setAvgPrice(contract.getCalculatedPrice());
				} else {
					material.setAvgPrice(Decimal.ZERO);
				}
			}
		}
		if (Decimal.ZERO.compareTo(onHand) > 0 && this.getLogicChain().getTrigger().isDeleted()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_material_not_enough", contract.getItemCode()));
		}
		material.setOnHand(onHand);
	}
}
