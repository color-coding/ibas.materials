package org.colorcoding.ibas.materials.bo.materialinventory;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emDirection;

/**
* 仓库日记账 接口
* 
*/
public interface IMaterialInventoryJournal extends IBOSimple {

    /**
    * 获取-物料编码
    * 
    * @return 值
    */
    String getItemCode();

    /**
    * 设置-物料编码
    * 
    * @param value 值
    */
    void setItemCode(String value);


    /**
    * 获取-物料名称
    * 
    * @return 值
    */
    String getItemName();

    /**
    * 设置-物料名称
    * 
    * @param value 值
    */
    void setItemName(String value);


    /**
    * 获取-仓库编号
    * 
    * @return 值
    */
    String getWarehouse();

    /**
    * 设置-仓库编号
    * 
    * @param value 值
    */
    void setWarehouse(String value);


    /**
    * 获取-方向
    * 
    * @return 值
    */
    emDirection getDirection();

    /**
    * 设置-方向
    * 
    * @param value 值
    */
    void setDirection(emDirection value);


    /**
    * 获取-数量
    * 
    * @return 值
    */
    Decimal getQuantity();

    /**
    * 设置-数量
    * 
    * @param value 值
    */
    void setQuantity(Decimal value);


    /**
    * 设置-数量
    * 
    * @param value 值
    */
    void setQuantity(String value);

    /**
    * 设置-数量
    * 
    * @param value 值
    */
    void setQuantity(int value);

    /**
    * 设置-数量
    * 
    * @param value 值
    */
    void setQuantity(double value);

    /**
    * 获取-价格
    * 
    * @return 值
    */
    Decimal getPrice();

    /**
    * 设置-价格
    * 
    * @param value 值
    */
    void setPrice(Decimal value);


    /**
    * 设置-价格
    * 
    * @param value 值
    */
    void setPrice(String value);

    /**
    * 设置-价格
    * 
    * @param value 值
    */
    void setPrice(int value);

    /**
    * 设置-价格
    * 
    * @param value 值
    */
    void setPrice(double value);

    /**
    * 获取-币种
    * 
    * @return 值
    */
    String getCurrency();

    /**
    * 设置-币种
    * 
    * @param value 值
    */
    void setCurrency(String value);


    /**
    * 获取-汇率
    * 
    * @return 值
    */
    Decimal getRate();

    /**
    * 设置-汇率
    * 
    * @param value 值
    */
    void setRate(Decimal value);


    /**
    * 设置-汇率
    * 
    * @param value 值
    */
    void setRate(String value);

    /**
    * 设置-汇率
    * 
    * @param value 值
    */
    void setRate(int value);

    /**
    * 设置-汇率
    * 
    * @param value 值
    */
    void setRate(double value);

    /**
    * 获取-过账日期
    * 
    * @return 值
    */
    DateTime getPostingDate();

    /**
    * 设置-过账日期
    * 
    * @param value 值
    */
    void setPostingDate(DateTime value);


    /**
    * 获取-到期日
    * 
    * @return 值
    */
    DateTime getDeliveryDate();

    /**
    * 设置-到期日
    * 
    * @param value 值
    */
    void setDeliveryDate(DateTime value);


    /**
    * 获取-凭证日期
    * 
    * @return 值
    */
    DateTime getDocumentDate();

    /**
    * 设置-凭证日期
    * 
    * @param value 值
    */
    void setDocumentDate(DateTime value);


    /**
    * 获取-基于类型
    * 
    * @return 值
    */
    String getBaseDocumentType();

    /**
    * 设置-基于类型
    * 
    * @param value 值
    */
    void setBaseDocumentType(String value);


    /**
    * 获取-基于标识
    * 
    * @return 值
    */
    Integer getBaseDocumentEntry();

    /**
    * 设置-基于标识
    * 
    * @param value 值
    */
    void setBaseDocumentEntry(Integer value);


    /**
    * 获取-基于行号
    * 
    * @return 值
    */
    Integer getBaseDocumentLineId();

    /**
    * 设置-基于行号
    * 
    * @param value 值
    */
    void setBaseDocumentLineId(Integer value);


    /**
    * 获取-对象编号
    * 
    * @return 值
    */
    Integer getObjectKey();

    /**
    * 设置-对象编号
    * 
    * @param value 值
    */
    void setObjectKey(Integer value);


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



}
