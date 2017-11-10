package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

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
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialIssueContract.class)
/**
 * 物料-发货服务 生成一张日记账
 */
public class MaterialIssueService extends BusinessLogic<IMaterialIssueContract, IMaterialInventoryJournal> {
    @Override
    protected IMaterialInventoryJournal fetchBeAffected(IMaterialIssueContract contract) {
        try {
            checkContractData(contract);
            // region 定义查询条件
            ICriteria criteria = Criteria.create();
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
            condition.setValue(contract.getBaseDocumentType());
            condition.setOperation(ConditionOperation.EQUAL);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(contract.getBaseDocumentEntry());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
            condition.setValue(contract.getBaseDocumentLineId());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
            condition.setValue(emDirection.OUT);
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);
            // endregion
            IMaterialInventoryJournal materialJournal = this.fetchBeAffected(criteria, IMaterialInventoryJournal.class);
            if (materialJournal == null) {
                // region 查询物料日记账
                BORepositoryMaterials boRepository = new BORepositoryMaterials();
                boRepository.setRepository(super.getRepository());
                IOperationResult<IMaterialInventoryJournal> operationResult = boRepository.fetchMaterialInventoryJournal(criteria);
                if (operationResult.getError() != null) {
                    throw new BusinessLogicException(operationResult.getError());
                }
                if (operationResult.getResultCode() != 0) {
                    throw new BusinessLogicException(operationResult.getError());
                }
                // endregion
                materialJournal = operationResult.getResultObjects().firstOrDefault();
                if (materialJournal == null) {
                    materialJournal = MaterialInventoryJournal.create(contract);
                }
            }
            return materialJournal;
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    protected void impact(IMaterialIssueContract contract) {
        IMaterialInventoryJournal materialJournal = this.getBeAffected();
        Decimal issueQuantity = materialJournal.getQuantity();
        issueQuantity = issueQuantity.add(contract.getIssueQuantity());
        materialJournal.setQuantity(issueQuantity);

    }

    @Override
    protected void revoke(IMaterialIssueContract contract) {
        IMaterialInventoryJournal materialJournal = this.getBeAffected();
        materialJournal.setItemCode((contract.getItemCode()));
        materialJournal.setItemName(contract.getItemName());
        materialJournal.setWarehouse(contract.getIssueWarehouseCode());
        Decimal issueQuantity = materialJournal.getQuantity();
        issueQuantity = issueQuantity.subtract(contract.getIssueQuantity());
        materialJournal.setQuantity(issueQuantity);
    }

    /**
     * 检查契约数据是否合法
     *
     * @return
     */
    private void checkContractData(IMaterialIssueContract contract) {
        if (contract.getIssueQuantity().compareTo(BigDecimal.ZERO) == 0) {
            throw new BusinessLogicException(I18N.prop("msg_mm_issue_quantity_can't_be_zero"));
        }
        // region 查询物料
        ICriteria criteria = Criteria.create();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(contract.getItemCode());
        condition.setOperation(ConditionOperation.EQUAL);
        BORepositoryMaterials boRepository = new BORepositoryMaterials();
        boRepository.setRepository(super.getRepository());
        IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
        if (operationResult.getError() != null) {
            throw new BusinessLogicException(operationResult.getError());
        }
        if (operationResult.getResultCode() != 0) {
            throw new BusinessLogicException(operationResult.getError());
        }
        IMaterial material = operationResult.getResultObjects().firstOrDefault();
        // endregion
        // region 检查物料
        if (material == null) {
            throw new NullPointerException(
                    String.format(I18N.prop("msg_mm_material_is_not_exist"), contract.getItemCode()));
        }
        // 虚拟物料，不生成库存记录
        if (material.getPhantomItem() == emYesNo.YES) {
            throw new BusinessLogicException(String.format(
                    I18N.prop("msg_mm_material_is_phantom_item_can't_create_journal"), contract.getItemCode()));
        }
        // 非库存物料，不生成库存记录
        if (material.getInventoryItem() != emYesNo.NO) {
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_material_is_not_inventory_item_can't_create_journal"),
                    contract.getItemCode()));
        }
        // endregion
        // region 检查仓库
        if (material.getItemType() == emItemType.ITEM) {
            // 库存物料，检查仓库是否存在
            criteria = Criteria.create();
            condition = criteria.getConditions().create();
            condition.setAlias(Warehouse.PROPERTY_CODE.getName());
            condition.setValue(contract.getIssueWarehouseCode());
            condition.setOperation(ConditionOperation.EQUAL);
            IOperationResult<IWarehouse> opResult = boRepository.fetchWarehouse(criteria);
            if (opResult.getError() != null) {
                throw new BusinessLogicException(opResult.getError());
            }
            if (opResult.getResultCode() != 0) {
                throw new BusinessLogicException(opResult.getError());
            }
            IWarehouse warehouse = opResult.getResultObjects().firstOrDefault();
            if (warehouse == null) {
                throw new NullPointerException(String.format(I18N.prop("msg_mm_warehouse_is_not_exist"),
                        contract.getIssueWarehouseCode()));
            }
        }
        // endregion
    }
}
