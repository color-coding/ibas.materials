package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = "MaterialPrice", namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialPrice extends Serializable implements IMaterialPrice {


    private static final long serialVersionUID = -3012064774202678680L;

    /**
     * 创建物料价格清单
     *
     * @param material 物料
     * @return
     */
    public static IMaterialPrice create(IMaterial material) {
        IMaterialPrice materialPrice = new MaterialPrice();
        materialPrice.setItemCode(material.getCode());
        materialPrice.setPrice(material.getAvgPrice());
        return materialPrice;
    }

    /**
     * 创建物料价格清单
     *
     * @param priceItem 物料价格清单
     * @return
     */
    public static IMaterialPrice create(IMaterialPriceItem priceItem) {
        IMaterialPrice materialPrice = new MaterialPrice();
        materialPrice.setItemCode(priceItem.getItemCode());
        materialPrice.setPrice(priceItem.getPrice());
        return materialPrice;
    }

    /**
     * 价格清单查询
     */
    public static final String PRICELIST_NAME = "ObjectKey";

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

    @XmlElement(name = "Price")
    private Decimal price;

    @Override
    public final Decimal getPrice() {
        return price;
    }

    @Override
    public final void setPrice(Decimal price) {
        this.price = price;
    }

    @Override
    public final void setPrice(int value) {
        this.setPrice(new Decimal(value));
    }

    @Override
    public final void setPrice(double value) {
        this.setPrice(new Decimal(value));
    }

    @XmlElement(name = "Currency")
    private String currency;

    @Override
    public final String getCurrency() {
        return currency;
    }

    @Override
    public final void setCurrency(String currency) {
        this.currency = currency;
    }

}
