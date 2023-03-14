package org.colorcoding.ibas.materials.bo.materialscrap;

import java.beans.PropertyChangeEvent;
import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
* 物料废品率 - 阶梯 集合
*/
@XmlType(name = MaterialScrapSections.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ MaterialScrapSection.class })
public class MaterialScrapSections extends BusinessObjects<IMaterialScrapSection, IMaterialScrap> implements IMaterialScrapSections {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "MaterialScrapSections";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = -5833257022696305905L;

    /**
     * 构造方法
     */
    public MaterialScrapSections() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public MaterialScrapSections(IMaterialScrap parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return MaterialScrapSection.class;
    }

    /**
    * 创建物料废品率 - 阶梯
    * 
    * @return 物料废品率 - 阶梯
    */
    public IMaterialScrapSection create() {
        IMaterialScrapSection item = new MaterialScrapSection();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IMaterialScrapSection item) {
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
    protected void onParentPropertyChanged(PropertyChangeEvent evt) {
        super.onParentPropertyChanged(evt);
        // TODO 设置关联值
    }
}
