package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logics.BusinessLogic;
import org.colorcoding.ibas.bobas.logics.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料序列号日记账服务  生成一张序列号日记账分录
 */
@LogicContract(IMaterialSerialJournalContract.class)
public class MaterialSerialJournalService extends BusinessLogic<IMaterialSerialJournalContract,IMaterialSerialJournal>{
    @Override
    protected IMaterialSerialJournal fetchBeAffected(IMaterialSerialJournalContract contract) {
        try {
            checkContractData(contract);
            // region 定义查询条件
            ICriteria criteria = Criteria.create();
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
            condition.setValue(contract.getBaseDocumentType());
            condition.setOperation(ConditionOperation.EQUAL);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(contract.getBaseDocumentEntry());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
            condition.setValue(contract.getBaseDocumentLineId());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerialJournal.PROPERTY_DIRECTION.getName());
            condition.setValue(contract.getDirection());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);
            // endregion
            IMaterialSerialJournal materialSerialJournal = this.fetchBeAffected(criteria, IMaterialSerialJournal.class);
            if (materialSerialJournal == null) {
                // region 查询物料序列号日记账
                BORepositoryMaterials boRepository = new BORepositoryMaterials();
                boRepository.setRepository(super.getRepository());
                IOperationResult<IMaterialSerialJournal> operationResult = boRepository.fetchMaterialSerialJournal(criteria);
                if (operationResult.getError() != null) {
                    throw new BusinessLogicException(operationResult.getError());
                }
                if (operationResult.getResultCode() != 0) {
                    throw new BusinessLogicException(operationResult.getError());
                }
                // endregion
                materialSerialJournal = operationResult.getResultObjects().firstOrDefault();
                if (materialSerialJournal == null) {
                    materialSerialJournal = MaterialSerialJournal.create(contract);
                }
            }
            return materialSerialJournal;
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    protected void impact(IMaterialSerialJournalContract contract) {

    }

    @Override
    protected void revoke(IMaterialSerialJournalContract contract) {

    }

    private void checkContractData(IMaterialSerialJournalContract contract){
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
        // 非序列号管理物料
        if(material.getSerialManagement().compareTo(emYesNo.YES) != 0){
            throw new BusinessLogicException(
                    String.format(I18N.prop("msg_mm_material_is_not_serialmanagement"), contract.getItemCode()));
        }
    }
}
