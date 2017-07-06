package org.colorcoding.ibas.materials.bo.goodsissue;

import java.beans.PropertyChangeEvent;
import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.materials.MyConsts;

/**
* 库存发货-行 集合
*/
@XmlType(name = GoodsIssueLines.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlSeeAlso({ GoodsIssueLine.class })
public class GoodsIssueLines extends BusinessObjects<IGoodsIssueLine, IGoodsIssue> implements IGoodsIssueLines {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "GoodsIssueLines";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 8967979347148855499L;

    /**
     * 构造方法
     */
    public GoodsIssueLines() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public GoodsIssueLines(IGoodsIssue parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return GoodsIssueLine.class;
    }

    /**
    * 创建库存发货-行
    * 
    * @return 库存发货-行
    */
    public IGoodsIssueLine create() {
        IGoodsIssueLine item = new GoodsIssueLine();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IGoodsIssueLine item) {
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
