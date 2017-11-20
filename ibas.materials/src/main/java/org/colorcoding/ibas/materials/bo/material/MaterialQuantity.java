package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialQuantity implements IMaterialQuantity {


    /**
     * 查询条件字段-仓库
     */
    public static final String WAREHOUSE_NAME = "WhsCode";

    /**
     * 查询条件字段-物料
     */
    public static final String ITEMCODE_NAME = "ItemCode";

    /**
     * 创建物料库存
     *
     * @param material
     * @return
     */
    public static MaterialQuantity create(IMaterialInventory material) {
        MaterialQuantity materialQuantity = new MaterialQuantity();
        materialQuantity.setItemCode(material.getItemCode());
        materialQuantity.setOnHand(material.getOnHand());
        return materialQuantity;
    }

    /**
     * 创建物料库存
     *
     * @param material
     * @return
     */
    public static IMaterialQuantity create(IMaterial material, boolean needQuantity) {
        MaterialQuantity materialQuantity = new MaterialQuantity();
        materialQuantity.setItemCode(material.getCode());
        materialQuantity.setUOM(material.getInventoryUOM());
        if (needQuantity) {
            materialQuantity.setOnHand(material.getOnHand());
        } else {
            materialQuantity.setOnHand(0);
        }
        return materialQuantity;
    }

    public static ArrayList<IMaterialQuantity> create(ArrayList<IMaterial> materials, boolean needQuantity) {
        ArrayList<IMaterialQuantity> materialQuantities = new ArrayList<>();
        if (!materials.isEmpty()) {
            for (IMaterial item : materials) {
                materialQuantities.add(create(item, needQuantity));
            }
        }
        return materialQuantities;
    }


    @XmlElement(name = "ItemCode")
    private String itemCode;

    @Override
    public final String getItemCode() {
        return itemCode;
    }

    @Override
    public final void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    @XmlElement(name = "OnHand")
    private Decimal onHand;

    @Override
    public final Decimal getOnHand() {
        return onHand;
    }

    @Override
    public final void setOnHand(Decimal onHand) {
        this.onHand = onHand;
    }

    @Override
    public final void setOnHand(int value) {
        this.setOnHand(new Decimal(value));
    }

    @Override
    public final void setOnHand(double value) {
        this.setOnHand(new Decimal(value));
    }

    @XmlElement(name = "UOM")
    private String uom;

    @Override
    public final String getUOM() {
        return uom;
    }

    @Override
    public final void setUOM(String uom) {
        this.uom = uom;
    }

}
