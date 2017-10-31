package org.colorcoding.ibas.materials.logic;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.*;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 影响物料价格清单的契约
 * @author Allen.Zhang
 *
 */
@LogicContract(IMaterialPriceListContract.class)
public class MaterialPriceListContract extends BusinessLogic<IMaterialPriceListContract, IMaterialPriceList> {
    /**
     * 查找被影响的物料价格清单
     * 目前规则：若不存在此价格清单就添加,否则就更新
     * 实际规则：若不存在此价格清单就报错，否则更新（实际业务场景中，第一张价格清单是手工新建的）
     * @return
     */
    @Override
    protected IMaterialPriceList fetchBeAffected(IMaterialPriceListContract Contract) {
        //region 主表查询条件
        ICriteria criteria = Criteria.create();
        //主表-价格清单编码
        ICondition condition=criteria.getConditions().create();
        condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
        condition.setValue(Contract.getPriceList());
        condition.setOperation(ConditionOperation.EQUAL);

        //主表-价格清单名称
        //ICondition condition=criteria.getConditions().create();
        //condition.setAlias(MaterialPriceList.PROPERTY_NAME.getName());
        //condition.setValue(Contract.getName());
        //condition.setOperation(ConditionOperation.EQUAL);
        //endregion

        //region 子表查询条件
        IChildCriteria childCriteria= criteria.getChildCriterias().create();
        childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
        childCriteria.setOnlyHasChilds(false);//只有查到子表有值的时候才有返回结果
        //子表-物料编码
        ICondition childCondition = childCriteria.getConditions().create();
        childCondition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
        childCondition.setValue(Contract.getItemCode());
        childCondition.setOperation(ConditionOperation.EQUAL);
        //endregion

        // 先在事物缓存里查
        IMaterialPriceList materialPriceList = super.fetchBeAffected(criteria, IMaterialPriceList.class);
        if (materialPriceList== null) {
            BORepositoryMaterials boRepository = new BORepositoryMaterials();
            boRepository.setRepository(super.getRepository());
            IOperationResult<IMaterialPriceList> operationResult = boRepository.fetchMaterialPriceList(criteria);
            if (operationResult.getError() != null) {
                throw new BusinessLogicException(operationResult.getError());
            }
            if (operationResult.getResultCode() != 0) {
                throw new BusinessLogicException(operationResult.getError());
            }
            materialPriceList = operationResult.getResultObjects().firstOrDefault();
            if (materialPriceList == null) {
                materialPriceList = MaterialPriceList.Create(Contract);
                //throw new BusinessLogicException("不存在此价格清单，请核对后保存！");//实际业务场景中，若不存在次价格清单则报错
            }
            else
            {
                BusinessObject bo= (BusinessObject)materialPriceList;
                bo.unsavable();//不保存主表
                IMaterialPriceItems materialPriceItems = materialPriceList.getMaterialPriceItems();
                    if(materialPriceItems.size()==0){
                        IMaterialPriceItem materialPriceItem=materialPriceList.getMaterialPriceItems().create();
                    }
                    else
                    {
                       IMaterialPriceItem materialPriceItem=materialPriceList.getMaterialPriceItems().firstOrDefault();
                    }
            }
        }
        return materialPriceList;
    }

    @Override
    protected void impact(IMaterialPriceListContract Contract) {
      IMaterialPriceList materialPriceList=this.getBeAffected();
        IMaterialPriceItem materialPriceItem=materialPriceList.getMaterialPriceItems().firstOrDefault();
        materialPriceItem.setItemCode(Contract.getItemCode());
        materialPriceItem.setPrice(Contract.getPrice());
    }



    @Override
    protected void revoke(IMaterialPriceListContract Contract) {
        IMaterialPriceList materialPriceList=this.getBeAffected();
        IMaterialPriceItem materialPriceItem=materialPriceList.getMaterialPriceItems().firstOrDefault();
        materialPriceItem.setItemCode(Contract.getItemCode());
        materialPriceItem.setPrice(0);
    }
}
