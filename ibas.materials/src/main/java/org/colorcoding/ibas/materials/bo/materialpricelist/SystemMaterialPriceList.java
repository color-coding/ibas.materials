package org.colorcoding.ibas.materials.bo.materialpricelist;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

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
}
