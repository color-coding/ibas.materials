package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.logic.MaterialInventoryBusinessLogic;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料收货的反向成本。
 *
 * <p>反冲入库时：账面金额（业务方预置）若超过库存账面价值，则截取到账面价值，
 * 避免反冲出"负库存价值"。</p>
 */
public class MaterialsReceiptReverseCost extends MaterialsInventoryCost {

    public MaterialsReceiptReverseCost(Object sourceData, BigDecimal quantity) {
        super(sourceData, quantity, false);
    }

    public MaterialsReceiptReverseCost(Object sourceData, BigDecimal quantity, boolean negate) {
        super(sourceData, quantity, negate);
    }

    @Override
    protected boolean caculateInventoryCost(String itemCode, String warehouse) throws Exception {
        IMaterialInventory inventory = this.lookupReverseInventory(itemCode, warehouse);
        if (inventory != null) {
            // 反冲数量已等于全部库存 或 账面金额超过库存价值时，截取到当前库存价值
            BigDecimal preset = this.getAmount();
            if (preset != null
                    && (inventory.getOnHand().compareTo(this.getQuantity()) <= 0
                            || inventory.getInventoryValue().compareTo(preset.abs()) < 0)) {
                this.setAmount(inventory.getInventoryValue());
            }
        }
        return true;
    }

    /**
     * 查找反冲所需的库存基准：先按反冲账（DataSource = JNL-OFF）查同源单据，找不到再回退到当前库存或物料级。
     */
    private IMaterialInventory lookupReverseInventory(String itemCode, String warehouse) throws Exception {
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
        condition.setValue(emDirection.IN);
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
        condition.setValue(MaterialInventoryBusinessLogic.DATASOURCE_SIGN_OFFSETTING_JOURNAL);
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
        condition.setValue(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_OBJECTCODE));
        if (this.getSourceData() instanceof IBODocument) {
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(((IBODocument) this.getSourceData()).getDocEntry());
        } else if (this.getSourceData() instanceof IBODocumentLine) {
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(((IBODocumentLine) this.getSourceData()).getDocEntry());
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
            condition.setValue(((IBODocumentLine) this.getSourceData()).getLineId());
        } else if (this.getSourceData() instanceof IBOSimple) {
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(((IBOSimple) this.getSourceData()).getObjectKey());
        } else if (this.getSourceData() instanceof IBOSimpleLine) {
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
            condition.setValue(((IBOSimpleLine) this.getSourceData()).getObjectKey());
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
            condition.setValue(((IBOSimpleLine) this.getSourceData()).getLineId());
        }
        if (criteria.getConditions().size() <= 3) {
            return null;
        }
        BORepositoryMaterials boRepository = new BORepositoryMaterials(); {
            boRepository.setRepository(this.getService().getRepository());
            IOperationResult<IMaterialInventoryJournal> operationResult = boRepository.fetchMaterialInventoryJournal(criteria);
            if (operationResult.getError() != null) throw new BusinessLogicException(operationResult.getError());
            for (IMaterialInventoryJournal journal : operationResult.getResultObjects()) {
                if (!journal.getItemCode().equals(itemCode)) continue;
                if (!journal.getWarehouse().equals(warehouse)) continue;
                IMaterialInventory inventory = new MaterialInventory();
                inventory.setItemCode(journal.getItemCode());
                inventory.setOnHand(journal.getInventoryQuantity());
                inventory.setAvgPrice(journal.getCalculatedPrice());
                inventory.setInventoryValue(journal.getInventoryValue());
                return inventory;
            }

            // 找不到反冲账：回退至当前库存（按仓库/按物料二选一）
            if (MyConfiguration.getConfigValue(
                    MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, true)) {
                Criteria invCriteria = new Criteria();
                ICondition invCondition = invCriteria.getConditions().create();
                invCondition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
                invCondition.setValue(itemCode);
                invCondition = invCriteria.getConditions().create();
                invCondition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
                invCondition.setValue(warehouse);
                for (IMaterialInventory item : boRepository.fetchMaterialInventory(invCriteria).getResultObjects()) {
                    return item;
                }
            } else {
                Criteria mtCriteria = new Criteria();
                ICondition mtCondition = mtCriteria.getConditions().create();
                mtCondition.setAlias(Material.PROPERTY_CODE.getName());
                mtCondition.setValue(itemCode);
                for (IMaterial material : boRepository.fetchMaterial(mtCriteria).getResultObjects()) {
                    IMaterialInventory inventory = new MaterialInventory();
                    inventory.setItemCode(material.getCode());
                    inventory.setOnCommited(material.getOnCommited());
                    inventory.setOnHand(material.getOnHand());
                    inventory.setOnOrdered(material.getOnOrdered());
                    inventory.setOnReserved(material.getOnReserved());
                    inventory.setAvgPrice(material.getAvgPrice());
                    inventory.setInventoryValue(material.getInventoryValue());
                    return inventory;
                }
            }
        }
        return null;
    }
}
