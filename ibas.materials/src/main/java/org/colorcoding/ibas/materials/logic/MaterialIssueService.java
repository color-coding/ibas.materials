package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.logics.BusinessLogic;
import org.colorcoding.ibas.bobas.logics.BusinessLogicsException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialjournal.IMaterialJournal;
import org.colorcoding.ibas.materials.bo.materialjournal.MaterialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

import java.math.BigDecimal;

@LogicContract(IMaterialIssueContract.class)
/**
 * 物料-发货服务  生成一张日记账
 */
public class MaterialIssueService extends BusinessLogic<IMaterialIssueContract,IMaterialJournal> {
    @Override
    protected IMaterialJournal fetchBeAffected(IMaterialIssueContract contract) {
        try{
            checkContractData(contract);
            //region 定义查询条件
            ICriteria criteria = Criteria.create();
            ICondition condition = criteria.getConditions().create();
            condition.setAlias(MaterialJournal.PROPERTY_BASETYPE.getName());
            condition.setValue(contract.getJournal_BaseDocumentType());
            condition.setOperation(ConditionOperation.EQUAL);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialJournal.PROPERTY_BASEENTRY.getName());
            condition.setValue(contract.getJournal_BaseDocumentEntry());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            condition = criteria.getConditions().create();
            condition.setAlias(MaterialJournal.PROPERTY_BASELINNUM.getName());
            condition.setValue(contract.getJournal_BaseDocumentLineId());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);

            //endregion
            //region 查询物料日记账
            BORepositoryMaterials app = new BORepositoryMaterials();
            app.setRepository(super.getRepository());
            IOperationResult<IMaterialJournal> operationResult = app.fetchMaterialJournal(criteria);
            if(operationResult.getError() != null){
                throw new BusinessLogicsException(operationResult.getError());
            }
            if(operationResult.getResultCode() != 0){
                throw new BusinessLogicsException(operationResult.getError());
            }
            //endregion
            IMaterialJournal materialJournal = operationResult.getResultObjects().firstOrDefault();
            if(materialJournal == null){
                materialJournal = MaterialJournal.create(contract);
            }
            return materialJournal;
        }
        catch (Exception ex){
            throw  ex;
        }
    }

    @Override
    protected void impact(IMaterialIssueContract contract) {
        IMaterialJournal materialJournal = this.getBeAffected();
        Decimal issueQuantity = materialJournal.getQuantity();
        issueQuantity = issueQuantity.add(contract.getJournal_IssueQuantity());
        materialJournal.setQuantity(issueQuantity);

    }

    @Override
    protected void revoke(IMaterialIssueContract contract) {
        IMaterialJournal materialJournal = this.getBeAffected();
        materialJournal.setItemCode((contract.getJournal_IssueWarehouseCode()));
        materialJournal.setItemName(contract.getJournal_ItemName());
        materialJournal.setWarehouse(contract.getJournal_IssueWarehouseCode());
        Decimal issueQuantity = materialJournal.getQuantity();
        issueQuantity = issueQuantity.subtract(contract.getJournal_IssueQuantity());
        materialJournal.setQuantity(issueQuantity);
    }

    /**
     * 检查契约数据是否合法
     * @return
     */
    private void checkContractData(IMaterialIssueContract contract){
        if(contract.getJournal_IssueQuantity().compareTo(BigDecimal.ZERO) == 0){
            throw  new BusinessLogicsException(i18n.prop("msg_if_issue_quantity_can't_be_zero"));
        }
        //region 查询物料
        ICriteria criteria = Criteria.create();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(contract.getJournal_ItemCode());
        condition.setOperation(ConditionOperation.EQUAL);
        BORepositoryMaterials app = new BORepositoryMaterials();
        app.setRepository(super.getRepository());
        IOperationResult<IMaterial> operationResult = app.fetchMaterial(criteria);
        if(operationResult.getError() != null){
            throw new BusinessLogicsException(operationResult.getError());
        }
        if(operationResult.getResultCode() != 0){
            throw new BusinessLogicsException(operationResult.getError());
        }
        IMaterial material = operationResult.getResultObjects().firstOrDefault();
        //endregion
        //region 检查物料
        if(material == null){
            throw new NullPointerException(String.format( i18n.prop("msg_if_item_is_not_exist")
                    ,contract.getJournal_ItemCode()));
        }
        // 虚拟物料，不生成库存记录
        if(material.getPhantomItem() == emYesNo.YES){
            throw  new BusinessLogicsException(String.format(i18n.prop("msg_if_item_is_phantom_item_can't_create_journal")
                    ,contract.getJournal_ItemCode()));
        }
        // 非库存物料，不生成库存记录
        if(material.getInventoryItem() != emYesNo.NO){
            throw  new BusinessLogicsException(String.format(i18n.prop("msg_if_item_is_not_nventory_item_can't_create_journal")
                    ,contract.getJournal_ItemCode()));
        }
        //endregion
        //region 检查仓库
        if(material.getItemType() == emItemType.ITEM){
            // 库存物料，检查仓库是否存在
            criteria = Criteria.create();
            condition = criteria.getConditions().create();
            condition.setAlias(Warehouse.PROPERTY_CODE.getName());
            condition.setValue(contract.getJournal_IssueWarehouseCode());
            condition.setOperation(ConditionOperation.EQUAL);
            IOperationResult<IWarehouse>  opResult = app.fetchWarehouse(criteria);
            if(opResult.getError() != null){
                throw new BusinessLogicsException(opResult.getError());
            }
            if(opResult.getResultCode() != 0){
                throw new BusinessLogicsException(opResult.getError());
            }
            IWarehouse warehouse = opResult.getResultObjects().firstOrDefault();
            if(warehouse == null){
                throw  new NullPointerException(String.format(i18n.prop("msg_if_item_is_phantom_item_can't_create_journal")
                        ,contract.getJournal_IssueWarehouseCode()));
            }
        }
        //endregion
    }
}
