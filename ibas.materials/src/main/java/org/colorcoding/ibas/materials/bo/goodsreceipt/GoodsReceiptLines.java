package org.colorcoding.ibas.materials.bo.goodsreceipt;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import java.beans.PropertyChangeEvent;

/**
* 库存收货-行 集合
*/
@XmlType(name = GoodsReceiptLines.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ GoodsReceiptLine.class })
public class GoodsReceiptLines extends BusinessObjects<IGoodsReceiptLine, IGoodsReceipt> implements IGoodsReceiptLines {

       /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "GoodsReceiptLines";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 7759763557795210317L;

    /**
     * 构造方法
     */
    public GoodsReceiptLines() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public GoodsReceiptLines(IGoodsReceipt parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return GoodsReceiptLine.class;
    }

    /**
    * 创建库存收货-行
    * 
    * @return 库存收货-行
    */
    public IGoodsReceiptLine create() {
        IGoodsReceiptLine item = new GoodsReceiptLine();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IGoodsReceiptLine item) {
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
}
