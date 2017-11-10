package org.colorcoding.ibas.materials.bo.material;

import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.materials.data.*;

/**
 * 物料 接口
 */
public interface IMaterial extends IMaterialBase {


    /**
     * 获取-价格
     *
     * @return 值
     */
    Decimal getAvgPrice();

    /**
     * 设置-价格
     *
     * @param value 值
     */
    void setAvgPrice(Decimal value);


    /**
     * 设置-价格
     *
     * @param value 值
     */
    void setAvgPrice(String value);

    /**
     * 设置-价格
     *
     * @param value 值
     */
    void setAvgPrice(int value);

    /**
     * 设置-价格
     *
     * @param value 值
     */
    void setAvgPrice(double value);

    /**
     * 获取-库存
     *
     * @return 值
     */
    Decimal getOnHand();

    /**
     * 设置-库存
     *
     * @param value 值
     */
    void setOnHand(Decimal value);


    /**
     * 设置-库存
     *
     * @param value 值
     */
    void setOnHand(String value);

    /**
     * 设置-库存
     *
     * @param value 值
     */
    void setOnHand(int value);

    /**
     * 设置-库存
     *
     * @param value 值
     */
    void setOnHand(double value);

    /**
     * 获取-已承诺
     *
     * @return 值
     */
    Decimal getOnCommited();

    /**
     * 设置-已承诺
     *
     * @param value 值
     */
    void setOnCommited(Decimal value);


    /**
     * 设置-已承诺
     *
     * @param value 值
     */
    void setOnCommited(String value);

    /**
     * 设置-已承诺
     *
     * @param value 值
     */
    void setOnCommited(int value);

    /**
     * 设置-已承诺
     *
     * @param value 值
     */
    void setOnCommited(double value);

    /**
     * 获取-已订购
     *
     * @return 值
     */
    Decimal getOnOrdered();

    /**
     * 设置-已订购
     *
     * @param value 值
     */
    void setOnOrdered(Decimal value);


    /**
     * 设置-已订购
     *
     * @param value 值
     */
    void setOnOrdered(String value);

    /**
     * 设置-已订购
     *
     * @param value 值
     */
    void setOnOrdered(int value);

    /**
     * 设置-已订购
     *
     * @param value 值
     */
    void setOnOrdered(double value);

    /**
     * 获取-最低库存量
     *
     * @return 值
     */
    Decimal getMinimumInventory();

    /**
     * 设置-最低库存量
     *
     * @param value 值
     */
    void setMinimumInventory(Decimal value);


    /**
     * 设置-最低库存量
     *
     * @param value 值
     */
    void setMinimumInventory(String value);

    /**
     * 设置-最低库存量
     *
     * @param value 值
     */
    void setMinimumInventory(int value);

    /**
     * 设置-最低库存量
     *
     * @param value 值
     */
    void setMinimumInventory(double value);


    /**
     * 获取-生效日期
     *
     * @return 值
     */
    DateTime getValidDate();

    /**
     * 设置-生效日期
     *
     * @param value 值
     */
    void setValidDate(DateTime value);


    /**
     * 获取-失效日期
     *
     * @return 值
     */
    DateTime getInvalidDate();

    /**
     * 设置-失效日期
     *
     * @param value 值
     */
    void setInvalidDate(DateTime value);


    /**
     * 获取-图片
     *
     * @return 值
     */
    String getPicture();

    /**
     * 设置-图片
     *
     * @param value 值
     */
    void setPicture(String value);


    /**
     * 获取-备注
     *
     * @return 值
     */
    String getRemarks();

    /**
     * 设置-备注
     *
     * @param value 值
     */
    void setRemarks(String value);


    /**
     * 获取-已引用
     *
     * @return 值
     */
    emYesNo getReferenced();

    /**
     * 设置-已引用
     *
     * @param value 值
     */
    void setReferenced(emYesNo value);


    /**
     * 获取-对象编号
     *
     * @return 值
     */
    Integer getDocEntry();

    /**
     * 设置-对象编号
     *
     * @param value 值
     */
    void setDocEntry(Integer value);


    /**
     * 获取-对象类型
     *
     * @return 值
     */
    String getObjectCode();

    /**
     * 设置-对象类型
     *
     * @param value 值
     */
    void setObjectCode(String value);


    /**
     * 获取-创建日期
     *
     * @return 值
     */
    DateTime getCreateDate();

    /**
     * 设置-创建日期
     *
     * @param value 值
     */
    void setCreateDate(DateTime value);


    /**
     * 获取-创建时间
     *
     * @return 值
     */
    Short getCreateTime();

    /**
     * 设置-创建时间
     *
     * @param value 值
     */
    void setCreateTime(Short value);


    /**
     * 获取-修改日期
     *
     * @return 值
     */
    DateTime getUpdateDate();

    /**
     * 设置-修改日期
     *
     * @param value 值
     */
    void setUpdateDate(DateTime value);


    /**
     * 获取-修改时间
     *
     * @return 值
     */
    Short getUpdateTime();

    /**
     * 设置-修改时间
     *
     * @param value 值
     */
    void setUpdateTime(Short value);


    /**
     * 获取-版本
     *
     * @return 值
     */
    Integer getLogInst();

    /**
     * 设置-版本
     *
     * @param value 值
     */
    void setLogInst(Integer value);


    /**
     * 获取-服务系列
     *
     * @return 值
     */
    Integer getSeries();

    /**
     * 设置-服务系列
     *
     * @param value 值
     */
    void setSeries(Integer value);


    /**
     * 获取-数据源
     *
     * @return 值
     */
    String getDataSource();

    /**
     * 设置-数据源
     *
     * @param value 值
     */
    void setDataSource(String value);


    /**
     * 获取-创建用户
     *
     * @return 值
     */
    Integer getCreateUserSign();

    /**
     * 设置-创建用户
     *
     * @param value 值
     */
    void setCreateUserSign(Integer value);


    /**
     * 获取-修改用户
     *
     * @return 值
     */
    Integer getUpdateUserSign();

    /**
     * 设置-修改用户
     *
     * @param value 值
     */
    void setUpdateUserSign(Integer value);


    /**
     * 获取-创建动作标识
     *
     * @return 值
     */
    String getCreateActionId();

    /**
     * 设置-创建动作标识
     *
     * @param value 值
     */
    void setCreateActionId(String value);


    /**
     * 获取-更新动作标识
     *
     * @return 值
     */
    String getUpdateActionId();

    /**
     * 设置-更新动作标识
     *
     * @param value 值
     */
    void setUpdateActionId(String value);


    /**
     * 获取-审批状态
     *
     * @return 值
     */
    emApprovalStatus getApprovalStatus();

    /**
     * 设置-审批状态
     *
     * @param value 值
     */
    void setApprovalStatus(emApprovalStatus value);


    /**
     * 获取-数据所有者
     *
     * @return 值
     */
    Integer getDataOwner();

    /**
     * 设置-数据所有者
     *
     * @param value 值
     */
    void setDataOwner(Integer value);


    /**
     * 获取-数据所属组织
     *
     * @return 值
     */
    String getOrganization();

    /**
     * 设置-数据所属组织
     *
     * @param value 值
     */
    void setOrganization(String value);


}
