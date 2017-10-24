package org.colorcoding.ibas.materials.bo.goodsreceipt;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

/**
 * 库存收货-序列 集合
 */
@XmlType(name = GoodsReceiptMaterialSerialJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialSerialJournal.class })
public class GoodsReceiptMaterialSerialJournals extends BusinessObjects<IMaterialSerialJournal,IGoodsReceiptLine> implements IGoodsReceiptMaterialSerialJournals {
    /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "GoodsReceiptMaterialSerialJournals";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 7759763557795210319L;

    public GoodsReceiptMaterialSerialJournals(){
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public GoodsReceiptMaterialSerialJournals(IGoodsReceiptLine parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return GoodsReceiptMaterialSerialJournals.class;
    }

    @Override
    protected void afterAddItem(IMaterialSerialJournal item) {
        super.afterAddItem(item);
        // TODO 设置关联值
    }

    @Override
    public ICriteria getElementCriteria() {
        ICriteria criteria = super.getElementCriteria();
        // TODO 添加关联查询条件
        return criteria;
    }

    @Override
    public void onParentPropertyChanged(PropertyChangeEvent evt) {
        super.onParentPropertyChanged(evt);
        // TODO 设置关联值
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
