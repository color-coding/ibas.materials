package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.data.DataConvert;

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

	public static MaterialQuantity create(IMaterial material) {
		MaterialQuantity materialQuantity = new MaterialQuantity();
		materialQuantity.setItemCode(material.getCode());
		materialQuantity.setItemName(material.getName());
		materialQuantity.setItemSign(material.getSign());
		materialQuantity.setOnHand(material.getOnHand());
		materialQuantity.setOnOrdered(material.getOnOrdered());
		materialQuantity.setOnCommited(material.getOnCommited());
		materialQuantity.setOnReserved(material.getOnReserved());
		materialQuantity.setUOM(material.getInventoryUOM());
		materialQuantity.setTotalHand(material.getOnHand());
		materialQuantity.setTotalOrdered(material.getOnOrdered());
		materialQuantity.setTotalCommited(material.getOnCommited());
		materialQuantity.setTotalReserved(material.getOnReserved());
		materialQuantity.setSource(DataConvert.STRING_VALUE_EMPTY);
		return materialQuantity;
	}

	public static MaterialQuantity create(IProduct material) {
		MaterialQuantity materialQuantity = new MaterialQuantity();
		materialQuantity.setItemCode(material.getCode());
		materialQuantity.setItemName(material.getName());
		materialQuantity.setItemSign(material.getSign());
		materialQuantity.setOnHand(material.getOnHand());
		materialQuantity.setOnOrdered(material.getOnOrdered());
		materialQuantity.setOnCommited(material.getOnCommited());
		materialQuantity.setOnReserved(material.getOnReserved());
		materialQuantity.setUOM(material.getInventoryUOM());
		materialQuantity.setTotalHand(material.getOnHand());
		materialQuantity.setTotalOrdered(material.getOnOrdered());
		materialQuantity.setTotalCommited(material.getOnCommited());
		materialQuantity.setTotalReserved(material.getOnReserved());
		materialQuantity.setSource(DataConvert.STRING_VALUE_EMPTY);
		return materialQuantity;
	}

	public static MaterialQuantity create(MaterialBase<?> material) {
		if (material instanceof IProduct) {
			return create((IProduct) material);
		} else if (material instanceof IMaterial) {
			return create((IMaterial) material);
		}
		throw null;
	}

	private String source;

	@XmlElement(name = "Source")
	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
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

	private String itemSign;

	@XmlElement(name = "ItemSign")
	public final String getItemSign() {
		return itemSign;
	}

	public final void setItemSign(String itemSign) {
		this.itemSign = itemSign;
	}

	private BigDecimal onHand;

	@XmlElement(name = "OnHand")
	public final BigDecimal getOnHand() {
		return onHand;
	}

	public final void setOnHand(BigDecimal onHand) {
		this.onHand = onHand;
	}

	public final void setOnHand(int value) {
		this.setOnHand(Decimal.valueOf(value));
	}

	public final void setOnHand(double value) {
		this.setOnHand(Decimal.valueOf(value));
	}

	private BigDecimal onOrdered;

	@XmlElement(name = "OnOrdered")
	public final BigDecimal getOnOrdered() {
		return onOrdered;
	}

	public final void setOnOrdered(BigDecimal onOrdered) {
		this.onOrdered = onOrdered;
	}

	public final void setOnOrdered(int value) {
		this.setOnOrdered(Decimal.valueOf(value));
	}

	public final void setOnOrdered(double value) {
		this.setOnOrdered(Decimal.valueOf(value));
	}

	private BigDecimal onCommited;

	@XmlElement(name = "OnCommited")
	public final BigDecimal getOnCommited() {
		return onCommited;
	}

	public final void setOnCommited(BigDecimal onCommited) {
		this.onCommited = onCommited;
	}

	public final void setOnCommited(int value) {
		this.setOnCommited(Decimal.valueOf(value));
	}

	public final void setOnCommited(double value) {
		this.setOnCommited(Decimal.valueOf(value));
	}

	private BigDecimal onReserved;

	@XmlElement(name = "OnReserved")
	public final BigDecimal getOnReserved() {
		return onReserved;
	}

	public final void setOnReserved(BigDecimal onReserved) {
		this.onReserved = onReserved;
	}

	public final void setOnReserved(int value) {
		this.setOnReserved(Decimal.valueOf(value));
	}

	public final void setOnReserved(double value) {
		this.setOnReserved(Decimal.valueOf(value));
	}

	private String uom;

	@XmlElement(name = "UOM")
	public final String getUOM() {
		return uom;
	}

	public final void setUOM(String value) {
		this.uom = value;
	}

	@Override
	public BigDecimal getOnAvailable() {
		return Decimal.add(this.getOnHand(), this.getOnOrdered(), this.getOnCommited().negate(),
				this.getOnReserved().negate());
	}

	private BigDecimal totalHand;

	@XmlElement(name = "TotalHand")
	public final BigDecimal getTotalHand() {
		return totalHand;
	}

	public final void setTotalHand(BigDecimal totalHand) {
		this.totalHand = totalHand;
	}

	public final void setTotalHand(int value) {
		this.setTotalHand(Decimal.valueOf(value));
	}

	public final void setTotalHand(double value) {
		this.setTotalHand(Decimal.valueOf(value));
	}

	private BigDecimal totalOrdered;

	@XmlElement(name = "TotalOrdered")
	public final BigDecimal getTotalOrdered() {
		return totalOrdered;
	}

	public final void setTotalOrdered(BigDecimal totalOrdered) {
		this.totalOrdered = totalOrdered;
	}

	public final void setTotalOrdered(int value) {
		this.setTotalOrdered(Decimal.valueOf(value));
	}

	public final void setTotalOrdered(double value) {
		this.setTotalOrdered(Decimal.valueOf(value));
	}

	private BigDecimal totalCommited;

	@XmlElement(name = "TotalCommited")
	public final BigDecimal getTotalCommited() {
		return totalCommited;
	}

	public final void setTotalCommited(BigDecimal totalCommited) {
		this.totalCommited = totalCommited;
	}

	public final void setTotalCommited(int value) {
		this.setTotalCommited(Decimal.valueOf(value));
	}

	public final void setTotalCommited(double value) {
		this.setTotalCommited(Decimal.valueOf(value));
	}

	private BigDecimal totalReserved;

	@XmlElement(name = "TotalReserved")
	public final BigDecimal getTotalReserved() {
		return totalReserved;
	}

	public final void setTotalReserved(BigDecimal totalReserved) {
		this.totalReserved = totalReserved;
	}

	public final void setTotalReserved(int value) {
		this.setTotalReserved(Decimal.valueOf(value));
	}

	public final void setTotalReserved(double value) {
		this.setTotalReserved(Decimal.valueOf(value));
	}

	@Override
	public final String toString() {
		return String.format("{materialQuantity: %s %s}", this.getItemCode(), this.getOnAvailable());
	}

}
