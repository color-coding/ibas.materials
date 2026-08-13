package org.colorcoding.ibas.materials.bo.materialpricelist;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.IBOCustomKey;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = SystemMaterialPriceList.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = SystemMaterialPriceList.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class SystemMaterialPriceList extends MaterialPriceList implements IBOCustomKey {

	private static final long serialVersionUID = -424190748870518069L;

	public static final String BUSINESS_OBJECT_NAME = "SystemMaterialPriceList";

	@Override
	public void setObjectKey(Integer value) {
		// 仅支持小于0的值
		if (value != null && Integer.compare(value, 0) < 0) {
			super.setObjectKey(value);
		}
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		// 基类初始化
		super.initialize();
		// 子项不初始化，避免查询
		this.setMaterialPriceItems(null);
	}

}
