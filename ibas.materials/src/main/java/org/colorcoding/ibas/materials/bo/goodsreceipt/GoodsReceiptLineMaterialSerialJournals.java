package org.colorcoding.ibas.materials.bo.goodsreceipt;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

/**
 * 库存收货-序列 集合
 */
@XmlType(name = GoodsReceiptLineMaterialSerialJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialJournal.class })
public class GoodsReceiptLineMaterialSerialJournals extends BusinessObjects<IMaterialSerialJournal,IGoodsReceiptLine> implements IGoodsReceiptLineMaterialSerialJournals {
    /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "GoodsReceiptLineMaterialSerialJournals";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 7759763557795210319L;

    public GoodsReceiptLineMaterialSerialJournals(){
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public GoodsReceiptLineMaterialSerialJournals(IGoodsReceiptLine parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return MaterialSerialJournal.class;
    }

    @Override
    protected void afterAddItem(IMaterialSerialJournal item) {
        super.afterAddItem(item);
        // TODO 设置关联值
        // TODO 设置关联值
        item.setBaseDocumentType(this.getParent().getObjectCode());
        item.setBaseDocumentEntry(this.getParent().getDocEntry());
        item.setBaseDocumentLineId(this.getParent().getLineId());
    }

    @Override
    public ICriteria getElementCriteria() {
        // ICriteria criteria = super.getElementCriteria();
        // TODO 添加关联查询条件
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getObjectCode());
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getDocEntry());
        condition.setRelationship(ConditionRelationship.AND);
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getLineId());
        condition.setRelationship(ConditionRelationship.AND);
        return criteria;
    }

    @Override
    public void onParentPropertyChanged(PropertyChangeEvent evt) {
        super.onParentPropertyChanged(evt);
        // TODO 设置关联值
        if(evt.getPropertyName().equalsIgnoreCase(GoodsReceiptLine.MASTER_PRIMARY_KEY_NAME)){
            for(IMaterialSerialJournal item: this){
                item.setBaseDocumentType(this.getParent().getObjectCode());
                item.setBaseDocumentEntry(this.getParent().getDocEntry());
                item.setBaseDocumentLineId(this.getParent().getLineId());
            }
        }
    }

    @Override
    public IMaterialSerialJournal create() {
        IMaterialSerialJournal item = new MaterialSerialJournal();
        if (this.add(item)) {
            return item;
        }
        return null;
    }
}
