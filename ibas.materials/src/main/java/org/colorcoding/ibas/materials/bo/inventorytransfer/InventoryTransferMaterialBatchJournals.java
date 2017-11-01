package org.colorcoding.ibas.materials.bo.inventorytransfer;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

@XmlType(name = InventoryTransferMaterialBatchJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchJournal.class })
public class InventoryTransferMaterialBatchJournals  extends BusinessObjects<IMaterialBatchJournal,IInventoryTransferLine> implements IInventoryTransferMaterialBatchJournals {
    /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "InventoryTransferMaterialBatchJournals";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 7759763557795210318L;

    public InventoryTransferMaterialBatchJournals(){
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public InventoryTransferMaterialBatchJournals(IInventoryTransferLine parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return MaterialBatchJournal.class;
    }

    @Override
    protected void afterAddItem(IMaterialBatchJournal item) {
        super.afterAddItem(item);
        // TODO 设置关联值
        item.setBaseDocumentType(this.getParent().getObjectCode());
        item.setBaseDocumentEntry(this.getParent().getDocEntry());
        item.setBaseDocumentLineId(this.getParent().getLineId());
    }

    @Override
    public ICriteria getElementCriteria() {
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias("BaseType");
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getObjectCode());
        condition = criteria.getConditions().create();
        condition.setAlias("BaseEntry");
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getDocEntry());
        condition.setRelationship(ConditionRelationship.AND);
        // TODO 添加关联查询条件
        return criteria;
    }

    @Override
    public void onParentPropertyChanged(PropertyChangeEvent evt) {
        super.onParentPropertyChanged(evt);
        // TODO 设置关联值
        if(evt.getPropertyName().equalsIgnoreCase(InventoryTransferLine.MASTER_PRIMARY_KEY_NAME)){
            for(IMaterialBatchJournal item: this){
                item.setBaseDocumentType(this.getParent().getObjectCode());
                item.setBaseDocumentEntry(this.getParent().getDocEntry());
                item.setBaseDocumentLineId(this.getParent().getLineId());
            }
        }
    }

    @Override
    public IMaterialBatchJournal create() {
        IMaterialBatchJournal item = new MaterialBatchJournal();
        if (this.add(item)) {
            return item;
        }
        return null;
    }
}
