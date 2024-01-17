package org.colorcoding.ibas.materials.bo.goodsreceipt;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.data.DataConvert;

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
	 * 
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
		if (item instanceof GoodsReceiptLine) {
			((GoodsReceiptLine) item).parent = this.getParent();
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
		if (GoodsReceipt.PROPERTY_DOCUMENTCURRENCY.getName().equals(evt.getPropertyName())) {
			this.where(c -> DataConvert.isNullOrEmpty(c.getBaseDocumentType()))
					.forEach(c -> c.setCurrency(this.getParent().getDocumentCurrency()));
		} else if (GoodsReceipt.PROPERTY_DOCUMENTRATE.getName().equals(evt.getPropertyName())) {
			this.where(c -> DataConvert.isNullOrEmpty(c.getBaseDocumentType()))
					.forEach(c -> c.setRate(this.getParent().getDocumentRate()));
		}
	}
}
