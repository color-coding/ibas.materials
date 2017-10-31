package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
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
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;


/**
 * 物料批次日记账服务  生成一张批次日记账分录
 */
@LogicContract(IMaterialBatchJournalContract.class)
public class MaterialBatchJournalSerivce extends BusinessLogic<IMaterialBatchJournalContract,IMaterialBatch>{
    @Override
    protected IMaterialBatch fetchBeAffected(IMaterialBatchJournalContract contract) {

            checkContractData(contract);
            // region 定义查询条件
            ICriteria criteria = Criteria.create();
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialBatch.PROPERTY_BASEDOCUMENTTYPE.getName());
            condition.setValue(contract.getBaseDocumentType());
            condition.setOperation(ConditionOperation.EQUAL);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialBatch.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(contract.getBaseDocumentEntry());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialBatch.PROPERTY_BASEDOCUMENTLINEID.getName());
            condition.setValue(contract.getBaseDocumentLineId());
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
                    throw new BusinessLogicException(operationResult.getError());
                }
                if (operationResult.getResultCode() != 0) {
                    throw new BusinessLogicException(operationResult.getError());
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
        if(contract.getDirection().equals(emDirection.IN)){
            quantity = quantity.subtract(contract.getQuantity());
        }
        else {
            quantity = quantity.add(contract.getQuantity());
        }
        materialBatch.setQuantity(quantity);
    }

    @Override
    protected void revoke(IMaterialBatchJournalContract contract) {
        IMaterialBatch materialBatch = this.getBeAffected();
        Decimal quantity = materialBatch.getQuantity();
        if(contract.getDirection().equals(emDirection.IN)){
            quantity = quantity.add(contract.getQuantity());
        }
        else {
            quantity = quantity.subtract(contract.getQuantity());
        }
        materialBatch.setQuantity(quantity);
    }
    private void checkContractData(IMaterialBatchJournalContract contract){
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
        if (material == null) {
            throw new NullPointerException(
                    String.format(I18N.prop("msg_mm_material_is_not_exist"), contract.getItemCode()));
        }
        // 虚拟物料
        if (material.getPhantomItem() == emYesNo.YES) {
            throw new BusinessLogicException(String.format(
                    I18N.prop("msg_mm_material_is_phantom_item_can't_create_journal"), contract.getItemCode()));
        }
        // 非批次管理物料
        if(material.getBatchManagement().compareTo(emYesNo.YES) != 0){
            throw new NullPointerException(
                    String.format(I18N.prop("msg_mm_material_is_not_batchmanagement"), contract.getItemCode()));
        }
    }
}
