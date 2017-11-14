package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.materials.MyConfiguration;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialQuantity {

    /**
     * 创建物料库存
     *
     * @param material
     * @return
     */
    public static MaterialQuantity create(IMaterial material) {
        MaterialQuantity materialQuantity = new MaterialQuantity();
        materialQuantity.setItemCode(material.getCode());
        materialQuantity.setOnHand(material.getOnHand());
        materialQuantity.setUOM(material.getInventoryUOM());
        return materialQuantity;
    }

    public static ArrayList<MaterialQuantity> create(ArrayList<IMaterial> materials) {
        ArrayList<MaterialQuantity> materialQuantities = new ArrayList<MaterialQuantity>();
        if (!materials.isEmpty()) {
            for (IMaterial item : materials) {
                materialQuantities.add(create(item));
            }
        }
        return materialQuantities;
    }

    @XmlElement(name = "ItemCode")
    private String itemCode;

    public final String getItemCode() {
        return itemCode;
    }

    public final void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    @XmlElement(name = "OnHand")
    private Decimal onHand;

    public final Decimal getOnHand() {
        return onHand;
    }

    public final void setOnHand(Decimal onHand) {
        this.onHand = onHand;
    }

    @XmlElement(name = "UOM")
    private String uom;

    public final String getUOM() {
        return uom;
    }

    public final void setUOM(String uom) {
        this.uom = uom;
    }

}
