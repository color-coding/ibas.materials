package org.colorcoding.ibas.materials.bo.goodsreceipt;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

@XmlType(name = GoodsReceiptMaterialBatchJournals.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialBatchJournal.class })
public class GoodsReceiptMaterialBatchJournals extends BusinessObjects<IMaterialBatchJournal,IGoodsReceiptLine> implements IGoodsReceiptMaterialBatchJournals {
    /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "GoodsReceiptMaterialBatchJournals";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 7759763557795210318L;

    public GoodsReceiptMaterialBatchJournals(){super();}

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public GoodsReceiptMaterialBatchJournals(IGoodsReceiptLine parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return GoodsReceiptMaterialBatchJournals.class;
    }

    @Override
    protected void afterAddItem(IMaterialBatchJournal item) {
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
    public IMaterialBatchJournal create() {
        IMaterialBatchJournal item = new MaterialBatchJournal();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

}
