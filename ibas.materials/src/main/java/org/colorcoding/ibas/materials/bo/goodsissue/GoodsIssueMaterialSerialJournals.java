package org.colorcoding.ibas.materials.bo.goodsissue;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

/**
 * 库存发货-序列 集合
 */
@XmlType(name = GoodsIssueMaterialSerialJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialJournal.class })
public class GoodsIssueMaterialSerialJournals extends BusinessObjects<IMaterialSerialJournal,IGoodsIssueLine> implements IGoodsIssueMaterialSerialJournals {
    /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "GoodsIssueMaterialSerialJournals";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 7759763557795210418L;

    public GoodsIssueMaterialSerialJournals(){super();}

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public GoodsIssueMaterialSerialJournals(IGoodsIssueLine parent) {
        super(parent);
    }

    @Override
    public IMaterialSerialJournal create() {
        IMaterialSerialJournal item = new MaterialSerialJournal();
        if (this.add(item)) {
            return item;
        }
        return null;
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
}
