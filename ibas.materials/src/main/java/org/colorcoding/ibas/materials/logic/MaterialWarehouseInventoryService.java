package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logics.BusinessLogic;
import org.colorcoding.ibas.bobas.logics.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import java.math.BigDecimal;

@LogicContract(IMaterialWarehouseInventoryContract.class)
public class MaterialWarehouseInventoryService extends BusinessLogic<IMaterialWarehouseInventoryContract, IMaterialInventory> {
    @Override
    protected IMaterialInventory fetchBeAffected(IMaterialWarehouseInventoryContract contract) {

        //region 查询条件
        ICriteria criteria = Criteria.create();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
        condition.setValue(contract.getItemCode());
        condition.setOperation(ConditionOperation.EQUAL);

        condition = criteria.getConditions().create();
        condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
        condition.setValue(contract.getWarehouse());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setRelationship(ConditionRelationship.AND);
        //endregion
        IMaterialInventory materialInventory = this.fetchBeAffected(criteria, IMaterialInventory.class);
        if (materialInventory == null) {
            BORepositoryMaterials boRepository = new BORepositoryMaterials();
            boRepository.setRepository(super.getRepository());
            IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
            if (operationResult.getError() != null) {
                throw new BusinessLogicException(operationResult.getError());
            }
            if (operationResult.getResultCode() != 0) {
                throw new BusinessLogicException(operationResult.getError());
            }
            materialInventory = operationResult.getResultObjects().firstOrDefault();
            if (materialInventory == null) {
                materialInventory = MaterialInventory.create(contract);
            }
        }
        return materialInventory;
    }

    @Override
    protected void impact(IMaterialWarehouseInventoryContract contract) {
        IMaterialInventory materialInventory = this.getBeAffected();
        Decimal onHand = materialInventory.getOnHand();
        if (contract.getDirection() == emDirection.OUT)
            onHand = onHand.subtract(contract.getQuantity());
        else
            onHand = onHand.add(contract.getQuantity());
        if (onHand.compareTo(BigDecimal.ZERO) == -1) {
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_material_is_not_enough"),
                    contract.getItemCode()));
        }
        materialInventory.setOnHand(onHand);
    }

    @Override
    protected void revoke(IMaterialWarehouseInventoryContract contract) {
        IMaterialInventory materialInventory = this.getBeAffected();
        Decimal onHand = materialInventory.getOnHand();
        if (contract.getDirection() == emDirection.OUT)
            onHand = onHand.add(contract.getQuantity());
        else
            onHand = onHand.subtract(contract.getQuantity());
        if (onHand.compareTo(BigDecimal.ZERO) == -1) {
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_material_is_not_enough"),
                    contract.getItemCode()));
        }
        materialInventory.setOnHand(onHand);
    }
}
