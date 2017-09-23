package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logics.BusinessLogic;
import org.colorcoding.ibas.bobas.logics.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialInventoryContract.class)
public class MaterialInventoryService  extends BusinessLogic<IMaterialInventoryContract,IMaterial>{
    @Override
    protected IMaterial fetchBeAffected(IMaterialInventoryContract contract) {
        // region 查询物料
        ICriteria criteria = Criteria.create();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(Material.PROPERTY_CODE.getName());
        condition.setValue(contract.getMaterial_ItemCode());
        condition.setOperation(ConditionOperation.EQUAL);
        BORepositoryMaterials app = new BORepositoryMaterials();
        app.setRepository(super.getRepository());
        IOperationResult<IMaterial> operationResult = app.fetchMaterial(criteria);
        if(operationResult.getError() != null){
            throw new BusinessLogicException(operationResult.getError());
        }
        if(operationResult.getResultCode() != 0){
            throw new BusinessLogicException(operationResult.getError());
        }
        IMaterial material = operationResult.getResultObjects().firstOrDefault();
        // endregion

        //region 检查物料
        if(material == null){
            throw new NullPointerException(String.format(I18N.prop("msg_if_material_is_not_exist"), contract.getMaterial_ItemCode()));
        }
        // 虚拟物料，不生成库存记录
        if(material.getPhantomItem() == emYesNo.YES){
            throw  new BusinessLogicException(String.format(I18N.prop("msg_if_material_is_phantom_item_can't_create_journal"), contract.getMaterial_ItemCode()));
        }
        // 非库存物料，不生成库存记录
        if(material.getInventoryItem() != emYesNo.NO){
            throw  new BusinessLogicException(String.format(I18N.prop("msg_if_material_is_not_inventory_item_can't_create_journal"), contract.getMaterial_ItemCode()));
        }

        if(material.getItemType() == emItemType.SERVICES){
            throw  new BusinessLogicException(String.format(I18N.prop("msg_if_material_is_service_item_can't_create_journal"), contract.getMaterial_ItemCode()));
        }
        //endregion
        return material;
    }

    @Override
    protected void impact(IMaterialInventoryContract contract) {
        IMaterial material = this.getBeAffected();
        Decimal onHand = material.getOnHand();
        if(contract.getMaterial_Direction()== emDirection.OUT)
            onHand = onHand.subtract(contract.getMaterial_Quantity());
        else
            onHand = onHand.add(contract.getMaterial_Quantity());
        material.setOnHand(onHand);
    }

    @Override
    protected void revoke(IMaterialInventoryContract contract) {
        IMaterial material = this.getBeAffected();
        Decimal onHand = material.getOnHand();
        if(contract.getMaterial_Direction() == emDirection.OUT)
            onHand = onHand.add(contract.getMaterial_Quantity());
        else
            onHand = onHand.subtract(contract.getMaterial_Quantity());
        material.setOnHand(onHand);
    }
}
