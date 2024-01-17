package org.colorcoding.ibas.materials.bo.goodsissue;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.data.DataConvert;

/**
 * 库存发货-行 集合
 */
@XmlType(name = GoodsIssueLines.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
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
	 * 
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
		if (item instanceof GoodsIssueLine) {
			((GoodsIssueLine) item).parent = this.getParent();
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
		if (GoodsIssue.PROPERTY_DOCUMENTCURRENCY.getName().equals(evt.getPropertyName())) {
			this.where(c -> DataConvert.isNullOrEmpty(c.getBaseDocumentType()))
					.forEach(c -> c.setCurrency(this.getParent().getDocumentCurrency()));
		} else if (GoodsIssue.PROPERTY_DOCUMENTRATE.getName().equals(evt.getPropertyName())) {
			this.where(c -> DataConvert.isNullOrEmpty(c.getBaseDocumentType()))
					.forEach(c -> c.setRate(this.getParent().getDocumentRate()));
		}
	}
}
