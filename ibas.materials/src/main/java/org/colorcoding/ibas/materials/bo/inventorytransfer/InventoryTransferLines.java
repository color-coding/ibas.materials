package org.colorcoding.ibas.materials.bo.inventorytransfer;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.data.DataConvert;

/**
 * 库存转储-行 集合
 */
@XmlType(name = InventoryTransferLines.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ InventoryTransferLine.class })
public class InventoryTransferLines extends BusinessObjects<IInventoryTransferLine, IInventoryTransfer>
		implements IInventoryTransferLines {

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
	 * 
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
		if (item instanceof InventoryTransferLine) {
			((InventoryTransferLine) item).parent = this.getParent();
		}
		// 记录父项的值
		if (!this.getParent().isLoading()) {
			if (item.isNew() && DataConvert.isNullOrEmpty(item.getBaseDocumentType())) {
				item.setRate(this.getParent().getDocumentRate());
				item.setCurrency(this.getParent().getDocumentCurrency());
			}
		}
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (InventoryTransfer.PROPERTY_DOCUMENTCURRENCY.getName().equals(evt.getPropertyName())) {
			this.where(c -> DataConvert.isNullOrEmpty(c.getBaseDocumentType()))
					.forEach(c -> c.setCurrency(this.getParent().getDocumentCurrency()));
		} else if (InventoryTransfer.PROPERTY_DOCUMENTRATE.getName().equals(evt.getPropertyName())) {
			this.where(c -> DataConvert.isNullOrEmpty(c.getBaseDocumentType()))
					.forEach(c -> c.setRate(this.getParent().getDocumentRate()));
		}
	}
}
