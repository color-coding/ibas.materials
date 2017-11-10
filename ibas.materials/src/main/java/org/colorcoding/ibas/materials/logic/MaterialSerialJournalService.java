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
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料序列号日记账服务  生成一张序列号日记账分录
 */
@LogicContract(IMaterialSerialJournalContract.class)
public class MaterialSerialJournalService extends BusinessLogic<IMaterialSerialJournalContract,IMaterialSerial>{
    @Override
    protected IMaterialSerial fetchBeAffected(IMaterialSerialJournalContract contract) {
            checkContractData(contract);
            // region 定义查询条件
            ICriteria criteria = Criteria.create();
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
            condition.setValue(contract.getSerialCode());
            condition.setOperation(ConditionOperation.EQUAL);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerial.PROPERTY_ITEMCODE.getName());
            condition.setValue(contract.getItemCode());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialSerial.PROPERTY_WAREHOUSE.getName());
            condition.setValue(contract.getWarehouse());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            // endregion
            IMaterialSerial materialSerial = this.fetchBeAffected(criteria, IMaterialSerial.class);
            if (materialSerial == null) {
                // region 查询物料序列号日记账
                BORepositoryMaterials boRepository = new BORepositoryMaterials();
                boRepository.setRepository(super.getRepository());
                IOperationResult<IMaterialSerial> operationResult = boRepository.fetchMaterialSerial(criteria);
                if (operationResult.getError() != null) {
                    throw new BusinessLogicException(operationResult.getError());
                }
                if (operationResult.getResultCode() != 0) {
                    throw new BusinessLogicException(operationResult.getError());
                }
                // endregion
                materialSerial = operationResult.getResultObjects().firstOrDefault();
                if (materialSerial == null) {
                    materialSerial = MaterialSerial.create(contract);
                }
            }
            return materialSerial;
    }

    @Override
    protected void impact(IMaterialSerialJournalContract contract) {
        IMaterialSerial materialSerial = this.getBeAffected();
        materialSerial.undelete();
    }

    @Override
    protected void revoke(IMaterialSerialJournalContract contract) {
        IMaterialSerial materialSerial = this.getBeAffected();
        materialSerial.delete();
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
