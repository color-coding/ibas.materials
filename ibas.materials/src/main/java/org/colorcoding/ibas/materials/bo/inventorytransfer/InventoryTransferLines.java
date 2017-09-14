package org.colorcoding.ibas.materials.bo.inventorytransfer;

import java.beans.PropertyChangeEvent;
import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.materials.MyConsts;

/**
* 库存转储-行 集合
*/
@XmlType(name = InventoryTransferLines.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlSeeAlso({ InventoryTransferLine.class })
public class InventoryTransferLines extends BusinessObjects<IInventoryTransferLine, IInventoryTransfer> implements IInventoryTransferLines {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "InventoryTransferLines";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 8162617080622390005L;

    /**
     * 构造方法
     */
    public InventoryTransferLines() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public InventoryTransferLines(IInventoryTransfer parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return InventoryTransferLine.class;
    }

    /**
    * 创建库存转储-行
    * 
    * @return 库存转储-行
    */
    public IInventoryTransferLine create() {
        IInventoryTransferLine item = new InventoryTransferLine();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IInventoryTransferLine item) {
        super.afterAddItem(item);
        // TODO 设置关联值
        ((InventoryTransferLine)item).setFroomWarehouse(this.getParent().getFromWarehouse());
        ((InventoryTransferLine)item).setDeliveryDate(this.getParent().getDeliveryDate());
        ((InventoryTransferLine)item).setDocumentDate(this.getParent().getDocumentDate());
        ((InventoryTransferLine)item).setPostingDate(this.getParent().getPostingDate());
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
