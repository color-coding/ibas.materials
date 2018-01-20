package org.colorcoding.ibas.materials.bo.material;

import java.util.Collection;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.materials.MyConfiguration;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialQuantity", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialQuantity", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialQuantity extends Serializable implements IMaterialQuantity {

	private static final long serialVersionUID = 9065321638987133730L;
	/**
	 * 查询条件字段-物料编码
	 */
	public static final String CONDITION_ALIAS_ITEMCODE = "ItemCode";
	/**
	 * 查询条件字段-物料名称
	 */
	public static final String CONDITION_ALIAS_ITEMNAME = "ItemName";
	/**
	 * 查询条件字段-仓库（关系为或）
	 */
	public static final String CONDITION_ALIAS_WAREHOUSE = "WhsCode";

	public static void transform(Iterable<ICondition> conditions) {
		for (ICondition condition : conditions) {
			if (condition.getAlias().equalsIgnoreCase(CONDITION_ALIAS_ITEMCODE)) {
				condition.setAlias(Material.PROPERTY_CODE.getName());
			} else if (condition.getAlias().equalsIgnoreCase(CONDITION_ALIAS_ITEMNAME)) {
				condition.setAlias(Material.PROPERTY_NAME.getName());
			}
		}
	}

	public static IMaterialQuantity create(IMaterial material) {
		MaterialQuantity materialQuantity = new MaterialQuantity();
		materialQuantity.setItemCode(material.getCode());
		materialQuantity.setItemName(material.getName());
		materialQuantity.setOnHand(material.getOnHand());
		materialQuantity.setUOM(material.getInventoryUOM());
		return materialQuantity;
	}

	public static IMaterialQuantity create(IProduct material) {
		MaterialQuantity materialQuantity = new MaterialQuantity();
		materialQuantity.setItemCode(material.getCode());
		materialQuantity.setItemName(material.getName());
		materialQuantity.setOnHand(material.getOnHand());
		materialQuantity.setUOM(material.getInventoryUOM());
		return materialQuantity;
	}

	public static List<IMaterialQuantity> create(Collection<?> materials) {
		ArrayList<IMaterialQuantity> materialQuantities = new ArrayList<>();
		for (Object item : materials) {
			if (item instanceof IProduct) {
				materialQuantities.add(create((IProduct) item));
			} else if (item instanceof IMaterial) {
				materialQuantities.add(create((IMaterial) item));
			}
		}
		return materialQuantities;
	}

	private String itemCode;

	@XmlElement(name = "ItemCode")
	public final String getItemCode() {
		return itemCode;
	}

	public final void setItemCode(String value) {
		this.itemCode = value;
	}

	private String itemName;

	@XmlElement(name = "ItemName")
	public String getItemName() {
		return itemName;
	}

	public void setItemName(String value) {
		this.itemName = value;
	}

	private Decimal onHand;

	@XmlElement(name = "OnHand")
	public final Decimal getOnHand() {
		return onHand;
	}

	public final void setOnHand(Decimal onHand) {
		this.onHand = onHand;
	}

	public final void setOnHand(int value) {
		this.setOnHand(new Decimal(value));
	}

	public final void setOnHand(double value) {
		this.setOnHand(new Decimal(value));
	}

	private String uom;

	@XmlElement(name = "UOM")
	public final String getUOM() {
		return uom;
	}

	public final void setUOM(String value) {
		this.uom = value;
	}

}
