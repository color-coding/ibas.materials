package org.colorcoding.ibas.materials.bo.specification;

import java.util.Comparator;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.serialization.Serializable;

/**
 * 规格树
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "SpecificationTree")
@XmlSeeAlso({ SpecificationTreeItem.class })
public class SpecificationTree extends Serializable {

	public static SpecificationTree create(ISpecification specification) {
		SpecificationTree tree = new SpecificationTree();
		tree.setName(specification.getName());
		tree.setTemplate(specification.getObjectKey());
		tree.setRemarks(specification.getRemarks());
		specification.getSpecificationItems().sort(new Comparator<ISpecificationItem>() {

			@Override
			public int compare(ISpecificationItem o1, ISpecificationItem o2) {
				String p1 = o1.getParentSign();
				if (p1 == null) {
					p1 = "";
				}
				String p2 = o2.getParentSign();
				if (p2 == null) {
					p2 = "";
				}
				int value = p1.compareTo(p2);
				if (value == 0) {
					p1 = o1.getSign();
					if (p1 == null) {
						p1 = "";
					}
					p2 = o2.getSign();
					if (p2 == null) {
						p2 = "";
					}
					return p1.compareTo(p2);
				} else {
					return value;
				}
			}
		});

		for (ISpecificationItem specificationItem : specification.getSpecificationItems()) {
			if (specificationItem.getParentSign() == null || specificationItem.getParentSign().isEmpty()) {
				tree.getItems().add(SpecificationTreeItem.create(specificationItem));
			} else {
				SpecificationTreeItem item = tree.getItems()
						.firstOrDefault(c -> specificationItem.getParentSign().equals(c.getSign()));
				if (item == null) {
					tree.getItems().add(SpecificationTreeItem.create(specificationItem));
				} else {
					item.getItems().add(SpecificationTreeItem.create(specificationItem));
				}
			}
		}

		return tree;
	}

	private static final long serialVersionUID = -7286801947194491473L;

	@XmlElement(name = "Template")
	private int template;

	public final int getTemplate() {
		return template;
	}

	public final void setTemplate(int template) {
		this.template = template;
	}

	@XmlElement(name = "Name")
	private String name;

	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	@XmlElement(name = "Remarks")
	private String remarks;

	public final String getRemarks() {
		return remarks;
	}

	public final void setRemarks(String remarks) {
		this.remarks = remarks;
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
		return String.format("{specificationTree: %s}", this.getName());
	}
}
