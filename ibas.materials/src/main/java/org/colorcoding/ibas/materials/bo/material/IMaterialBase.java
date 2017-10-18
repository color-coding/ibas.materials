package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.bo.IBOMasterData;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.data.emItemType;

public interface IMaterialBase extends IBOMasterData {
    /**
     * 获取-编号
     *
     * @return 值
     */
    String getCode();

    /**
     * 设置-编号
     *
     * @param value 值
     */
    void setCode(String value);


    /**
     * 获取-名称
     *
     * @return 值
     */
    String getName();

    /**
     * 设置-名称
     *
     * @param value 值
     */
    void setName(String value);


    /**
     * 获取-外文名称
     *
     * @return 值
     */
    String getForeignName();

    /**
     * 设置-外文名称
     *
     * @param value 值
     */
    void setForeignName(String value);


    /**
     * 获取-物料组
     *
     * @return 值
     */
    String getGroup();

    /**
     * 设置-物料组
     *
     * @param value 值
     */
    void setGroup(String value);


    /**
     * 获取-条形码
     *
     * @return 值
     */
    String getBarCode();

    /**
     * 设置-条形码
     *
     * @param value 值
     */
    void setBarCode(String value);


    /**
     * 获取-物料类型
     *
     * @return 值
     */
    emItemType getItemType();

    /**
     * 设置-物料类型
     *
     * @param value 值
     */
    void setItemType(emItemType value);


    /**
     * 获取-采购物料
     *
     * @return 值
     */
    emYesNo getPurchaseItem();

    /**
     * 设置-采购物料
     *
     * @param value 值
     */
    void setPurchaseItem(emYesNo value);


    /**
     * 获取-销售物料
     *
     * @return 值
     */
    emYesNo getSalesItem();

    /**
     * 设置-销售物料
     *
     * @param value 值
     */
    void setSalesItem(emYesNo value);


    /**
     * 获取-库存物料
     *
     * @return 值
     */
    emYesNo getInventoryItem();

    /**
     * 设置-库存物料
     *
     * @param value 值
     */
    void setInventoryItem(emYesNo value);


    /**
     * 获取-虚拟物料
     *
     * @return 值
     */
    emYesNo getPhantomItem();

    /**
     * 设置-虚拟物料
     *
     * @param value 值
     */
    void setPhantomItem(emYesNo value);


    /**
     * 获取-固定资产
     *
     * @return 值
     */
    emYesNo getFixedAssets();

    /**
     * 设置-固定资产
     *
     * @param value 值
     */
    void setFixedAssets(emYesNo value);


    /**
     * 获取-缺省仓库
     *
     * @return 值
     */
    String getDefaultWarehouse();

    /**
     * 设置-缺省仓库
     *
     * @param value 值
     */
    void setDefaultWarehouse(String value);


    /**
     * 获取-首选供应商
     *
     * @return 值
     */
    String getPreferredVendor();

    /**
     * 设置-首选供应商
     *
     * @param value 值
     */
    void setPreferredVendor(String value);


    /**
     * 获取-库存单位
     *
     * @return 值
     */
    String getInventoryUOM();

    /**
     * 设置-库存单位
     *
     * @param value 值
     */
    void setInventoryUOM(String value);

    /**
     * 获取-已删除
     *
     * @return 值
     */
    emYesNo getDeleted();

    /**
     * 设置-已删除
     *
     * @param value 值
     */
    void setDeleted(emYesNo value);
}
