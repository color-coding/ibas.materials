package org.colorcoding.ibas.materials.bo.materialpricelist;

import java.beans.PropertyChangeEvent;
import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
* 物料价格项目 集合
*/
@XmlType(name = MaterialPriceItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialPriceItem.class })
public class MaterialPriceItems extends BusinessObjects<IMaterialPriceItem, IMaterialPriceList> implements IMaterialPriceItems {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "MaterialPriceItems";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = -2147361825438488193L;

    /**
     * 构造方法
     */
    public MaterialPriceItems() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public MaterialPriceItems(IMaterialPriceList parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return MaterialPriceItem.class;
    }

    /**
    * 创建物料价格项目
    * 
    * @return 物料价格项目
    */
    public IMaterialPriceItem create() {
        IMaterialPriceItem item = new MaterialPriceItem();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IMaterialPriceItem item) {
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
