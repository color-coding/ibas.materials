package org.colorcoding.ibas.materials.bo.specification;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;

/**
 * 规格项目值
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "SpecificationTreeItemValue")
@XmlRootElement(name = "SpecificationTreeItemValue")
public class SpecificationTreeItemValue extends Serializable {

	private static final long serialVersionUID = 9203237004551980590L;

	public SpecificationTreeItemValue() {
	}

	public SpecificationTreeItemValue(String value, String desscription) {
		this();
		this.value = value;
		this.description = desscription;
	}

	public SpecificationTreeItemValue(String value, String desscription, String associated) {
		this(value, desscription);
		this.associated = associated;
	}

	@XmlElement(name = "Value")
	private String value;

	public final String getValue() {
		return value;
	}

	public final void setValue(String value) {
		this.value = value;
	}

	@XmlElement(name = "Description")
	private String description;

	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	@XmlElement(name = "Associated")
	private String associated;

	public final String getAssociated() {
		return associated;
	}

	public final void setAssociated(String associated) {
		this.associated = associated;
	}

	@Override
	public String toString() {
		return String.format("{specificationTreeItemValue: %s %s}", this.getValue());
	}
}
