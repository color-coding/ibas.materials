package org.colorcoding.ibas.materials.bo.specification;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.core.Serializable;

/**
 * 规格项目
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "SpecificationItem")
@XmlRootElement(name = "SpecificationItem")
public class SpecificationTreeItem extends Serializable {

	public static SpecificationTreeItem create(ISpecificationItem specificationItem) {
		SpecificationTreeItem item = new SpecificationTreeItem();
		item.setSign(specificationItem.getSign());
		item.setDescription(specificationItem.getDescription());
		item.setContent(specificationItem.getContent());
		item.setNote(specificationItem.getNote());
		item.setEditable(specificationItem.getEditable() == emYesNo.YES ? true : false);
		item.setRequired(specificationItem.getRequired() == emYesNo.YES ? true : false);
		for (ISpecificationItemValue value : specificationItem.getSpecificationItemValues()) {
			item.getVaildValues().add(
					new SpecificationTreeItemValue(value.getValue(), value.getDescription(), value.getAssociated()));
		}
		return item;
	}

	private static final long serialVersionUID = -7472789448879938099L;

	@XmlElement(name = "Sign")
	private String sign;

	public final String getSign() {
		return sign;
	}

	public final void setSign(String sign) {
		this.sign = sign;
	}

	@XmlElement(name = "Description")
	private String description;

	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	@XmlElement(name = "Content")
	private String content;

	public final String getContent() {
		return content;
	}

	public final void setContent(String content) {
		this.content = content;
	}

	@XmlElement(name = "Note")
	private String note;

	public final String getNote() {
		return note;
	}

	public final void setNote(String note) {
		this.note = note;
	}

	@XmlElement(name = "Editable")
	private boolean editable;

	public final boolean isEditable() {
		return editable;
	}

	public final void setEditable(boolean editable) {
		this.editable = editable;
	}

	@XmlElement(name = "Required")
	private boolean required;

	public final boolean isRequired() {
		return required;
	}

	public final void setRequired(boolean required) {
		this.required = required;
	}

	@XmlElementWrapper(name = "VaildValues")
	@XmlElement(name = "VaildValue", type = SpecificationTreeItemValue.class)
	private ArrayList<SpecificationTreeItemValue> vaildValues;

	public final List<SpecificationTreeItemValue> getVaildValues() {
		if (this.vaildValues == null) {
			this.vaildValues = new ArrayList<>();
		}
		return vaildValues;
	}

	@XmlElementWrapper(name = "Items")
	@XmlElement(name = "Item", type = SpecificationTreeItem.class)
	private ArrayList<SpecificationTreeItem> items;

	public final List<SpecificationTreeItem> getItems() {
		if (this.items == null) {
			this.items = new ArrayList<>();
		}
		return items;
	}

	@Override
	public String toString() {
		return String.format("{specificationTreeItem: %s}", this.getDescription());
	}
}
