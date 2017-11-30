package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import java.math.BigDecimal;


/**
 * 物料批次日记账服务  生成一张批次日记账分录
 */
@LogicContract(IMaterialBatchJournalContract.class)
public class MaterialBatchJournalSerivce extends BusinessLogic<IMaterialBatchJournalContract, IMaterialBatch> {
    @Override
    protected IMaterialBatch fetchBeAffected(IMaterialBatchJournalContract contract) {
        this.checkContractData(contract);
        // region 定义查询条件
        ICriteria criteria = Criteria.create();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE.getName());
        condition.setValue(contract.getBatchCode());
        condition.setOperation(ConditionOperation.EQUAL);

        condition = criteria.getConditions().create();
        condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE.getName());
        condition.setValue(contract.getItemCode());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setRelationship(ConditionRelationship.AND);

        condition = criteria.getConditions().create();
        condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE.getName());
        condition.setValue(contract.getWarehouse());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setRelationship(ConditionRelationship.AND);
        // endregion
        IMaterialBatch materialBatch = this.fetchBeAffected(criteria, IMaterialBatch.class);
        if (materialBatch == null) {
            // region 查询物料批次日记账
            BORepositoryMaterials boRepository = new BORepositoryMaterials();
            boRepository.setRepository(super.getRepository());
            IOperationResult<IMaterialBatch> operationResult = boRepository.fetchMaterialBatch(criteria);
            if (operationResult.getError() != null) {
                throw new BusinessLogicException(operationResult.getMessage());
            }
            // endregion
            materialBatch = operationResult.getResultObjects().firstOrDefault();
            if (materialBatch == null) {
                materialBatch = MaterialBatch.create(contract);
            }
        }
        return materialBatch;
    }

    @Override
    protected void impact(IMaterialBatchJournalContract contract) {
        IMaterialBatch materialBatch = this.getBeAffected();
        Decimal quantity = materialBatch.getQuantity();
        if (contract.getDirection().equals(emDirection.IN)) {
            quantity = quantity.add(contract.getQuantity());
        } else {
            quantity = quantity.subtract(contract.getQuantity());
        }
        if(quantity.compareTo(BigDecimal.ZERO)== -1){
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_batch_is_not_enough"),
                    contract.getBatchCode()));
        }
        materialBatch.setQuantity(quantity);
    }

    @Override
    protected void revoke(IMaterialBatchJournalContract contract) {
        IMaterialBatch materialBatch = this.getBeAffected();
        Decimal quantity = materialBatch.getQuantity();
        if (contract.getDirection().equals(emDirection.IN)) {
            quantity = quantity.subtract(contract.getQuantity());
        } else {
            quantity = quantity.add(contract.getQuantity());
        }
        if(quantity.compareTo(BigDecimal.ZERO)== -1){
            throw new BusinessLogicException(String.format(I18N.prop("msg_mm_batch_is_not_enough"),
                    contract.getBatchCode()));
        }
        materialBatch.setQuantity(quantity);
    }

    @Override
    protected boolean checkDataStatus(Object data) {
        super.checkDataStatus(data);
        if(data instanceof IBOSimpleLine){
            IMaterialBatchJournal journal = (IMaterialBatchJournal) data;
            if (journal.getLineStatus() == emDocumentStatus.PLANNED) {
                return false;
            }
        }
        return true;
    }
    private void checkContractData(IMaterialBatchJournalContract contract) {
        ICriteria criteria = Criteria.create();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(contract.getItemCode());
        condition.setOperation(ConditionOperation.EQUAL);
        BORepositoryMaterials boRepository = new BORepositoryMaterials();
        boRepository.setRepository(super.getRepository());
        IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
        if (operationResult.getError() != null) {
            throw new BusinessLogicException(operationResult.getMessage());
        }
        IMaterial material = operationResult.getResultObjects().firstOrDefault();
        if (material == null) {
            throw new BusinessLogicException(
                    String.format(I18N.prop("msg_mm_material_is_not_exist"), contract.getItemCode()));
        }
        // 虚拟物料
        if (material.getPhantomItem() == emYesNo.YES) {
            throw new BusinessLogicException(String.format(
                    I18N.prop("msg_mm_material_is_phantom_item_can't_create_journal"), contract.getItemCode()));
        }
        // 非批次管理物料
        if (material.getBatchManagement().compareTo(emYesNo.YES) != 0) {
            throw new BusinessLogicException(
                    String.format(I18N.prop("msg_mm_material_is_not_batchmanagement"), contract.getItemCode()));
        }
    }
}
