package org.colorcoding.ibas.materials.bo.picklists;

import java.beans.PropertyChangeEvent;
import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
* 拣配清单-行 集合
*/
@XmlType(name = PickListsLines.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ PickListsLine.class })
public class PickListsLines extends BusinessObjects<IPickListsLine, IPickLists> implements IPickListsLines {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "PickListsLines";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 1262242288944163567L;

    /**
     * 构造方法
     */
    public PickListsLines() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public PickListsLines(IPickLists parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return PickListsLine.class;
    }

    /**
    * 创建拣配清单-行
    * 
    * @return 拣配清单-行
    */
    public IPickListsLine create() {
        IPickListsLine item = new PickListsLine();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IPickListsLine item) {
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
