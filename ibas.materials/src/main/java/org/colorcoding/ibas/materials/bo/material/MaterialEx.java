package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.materials.MyConfiguration;

import javax.xml.bind.annotation.*;

/**
 * 获取-物料(包含仓库库存，价格清单)
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialEx.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = MaterialEx.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BOCode(MaterialEx.BUSINESS_OBJECT_CODE)
public class MaterialEx extends MaterialBase<MaterialEx> implements IMaterialEx {

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 8078764747253121173L;

    /**
     * 业务对象名称
     */
    public static final String BUSINESS_OBJECT_NAME = "MaterialEx";

    /**
     * 当前类型
     */
    private static final Class<?> MY_CLASS = MaterialEx.class;

    private static final String DB_OITW_TABLE_NAME ="${Company}_MM_OITM";
    private static final String DB_PRICELIST_TABLE_NAME ="${Company}_MM_MPL1";

    /**
     * 创建MaterialExpand
     *
     * @param material
     * @return
     */
    public static MaterialEx create(Material material) {
        MaterialEx materialEx = new MaterialEx();
        materialEx.setCode(material.getCode());
        materialEx.setName(material.getName());
        materialEx.setGroup(material.getGroup());
        materialEx.setSerialManagement(material.getSerialManagement());
        materialEx.setBatchManagement(material.getBatchManagement());
        materialEx.setBarCode(material.getBarCode());
        materialEx.setItemType(material.getItemType());
        materialEx.setPrice(material.getAvgPrice());
        materialEx.setWarehouseOnHand(material.getOnHand());
        return materialEx;
    }

    /**
     * 创建MaterialExpand
     *
     * @param material
     * @return
     */
    public static MaterialEx create(MaterialEx material) {
        MaterialEx materialEx = new MaterialEx();
        materialEx.setCode(material.getCode());
        materialEx.setName(material.getName());
        materialEx.setGroup(material.getGroup());
        materialEx.setSerialManagement(material.getSerialManagement());
        materialEx.setBatchManagement(material.getBatchManagement());
        materialEx.setBarCode(material.getBarCode());
        materialEx.setItemType(material.getItemType());
        materialEx.setPrice(material.getPrice());
        materialEx.setWarehouseCode(material.getWarehouseCode());
        materialEx.setWarehouseOnHand(material.getWarehouseOnHand());
        return materialEx;
    }
    /**
     * 创建MaterialExpand对象集合
     *
     * @param materials 物料对象集合
     * @return
     */
    public static ArrayList<MaterialEx> create(ArrayList<Material> materials) {
        ArrayList<MaterialEx> materialExs = new ArrayList<MaterialEx>();
        for (Material material : materials
                ) {
            materialExs.add(create(material));
        }
        return materialExs;
    }

    @Override
    protected void initialize() {
        super.initialize();// 基类初始化，不可去除
        // this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

    }


    /**
     * 属性名称-仓库编号
     */
    private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

    /**
     * 仓库编号 属性
     */
    @DbField(name = "WhsCode", type = DbFieldType.DECIMAL, table = DB_OITW_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_WAREHOUSE = registerProperty(PROPERTY_WAREHOUSE_NAME,
            String.class, MY_CLASS);

    /**
     * 获取-仓库编号
     *
     * @return 值
     */
    @XmlElement(name = PROPERTY_WAREHOUSE_NAME)
    public final String getWarehouseCode() {
        return this.getProperty(PROPERTY_WAREHOUSE);
    }

    /**
     * 设置-仓库编号
     *
     * @param value 值
     */
    public final void setWarehouseCode(String value) {
        this.setProperty(PROPERTY_WAREHOUSE, value);
    }


    /**
     * 属性名称-库存
     */
    private static final String PROPERTY_ONHAND_NAME = "OnHand";

    /**
     * 库存 属性
     */
    @DbField(name = "OnHand", type = DbFieldType.DECIMAL, table = DB_OITW_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Decimal> PROPERTY_ONHAND = registerProperty(PROPERTY_ONHAND_NAME, Decimal.class,
            MY_CLASS);

    /**
     * 获取-库存
     *
     * @return 值
     */
    @XmlElement(name = PROPERTY_ONHAND_NAME)
    public final Decimal getWarehouseOnHand() {
        return this.getProperty(PROPERTY_ONHAND);
    }

    /**
     * 设置-库存
     *
     * @param value 值
     */
    public final void setWarehouseOnHand(Decimal value) {
        this.setProperty(PROPERTY_ONHAND, value);
    }

    /**
     * 设置-库存
     *
     * @param value 值
     */
    public final void setWarehouseOnHand(String value) {
        this.setWarehouseOnHand(new Decimal(value));
    }

    /**
     * 设置-库存
     *
     * @param value 值
     */
    public final void setWarehouseOnHand(int value) {
        this.setWarehouseOnHand(new Decimal(value));
    }

    /**
     * 设置-库存
     *
     * @param value 值
     */
    public final void setWarehouseOnHand(double value) {
        this.setWarehouseOnHand(new Decimal(value));
    }

    /**
     * 属性名称-价格清单名称
     */
    private static final String PROPERTY_PRICELISTNAME_NAME = "PriceListName";

    /**
     * 价格清单名称 属性
     */
    public static final IPropertyInfo<String> PROPERTY_PRICELISTNAME = registerProperty(PROPERTY_PRICELISTNAME_NAME,
            String.class, MY_CLASS);

    /**
     * 获取-价格清单名称
     *
     * @return 值
     */
    @XmlElement(name = PROPERTY_PRICELISTNAME_NAME)
    public final String getPriceListName() {
        return this.getProperty(PROPERTY_PRICELISTNAME);
    }

    /**
     * 设置-价格清单名称
     *
     * @param value 值
     */
    public final void setPriceListName(String value) {
        this.setProperty(PROPERTY_PRICELISTNAME, value);
    }


    /**
     * 属性名称-价格
     */
    private static final String PROPERTY_PRICE_NAME = "Price";

    /**
     * 价格 属性
     */
    public static final IPropertyInfo<Decimal> PROPERTY_PRICE = registerProperty(PROPERTY_PRICE_NAME,
            Decimal.class, MY_CLASS);

    /**
     * 获取-价格
     *
     * @return 值
     */
    @XmlElement(name = PROPERTY_PRICE_NAME)
    public final Decimal getPrice() {
        return this.getProperty(PROPERTY_PRICE);
    }

    /**
     * 设置-价格
     *
     * @param value 值
     */
    public final void setPrice(Decimal value) {
        this.setProperty(PROPERTY_PRICE, value);
    }

    /**
     * 设置-价格
     *
     * @param value 值
     */
    public final void setPrice(String value) {
        this.setPrice(new Decimal(value));
    }

    /**
     * 设置-价格
     *
     * @param value 值
     */
    public final void setPrice(int value) {
        this.setPrice(new Decimal(value));
    }

    /**
     * 设置-价格
     *
     * @param value 值
     */
    public final void setPrice(double value) {
        this.setPrice(new Decimal(value));
    }




}
