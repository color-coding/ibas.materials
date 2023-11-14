package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBOMasterData;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.materials.data.emIssueMethod;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emPlanningMethod;
import org.colorcoding.ibas.materials.data.emProcurementMethod;
import org.colorcoding.ibas.materials.data.emValuationMethod;

/**
 * 物料 接口
 * 
 */
public interface IMaterial extends IBOMasterData {

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	String getCode();

	/**
	 * 设置-编码
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
	 * 获取-标识
	 * 
	 * @return 值
	 */
	String getSign();

	/**
	 * 设置-标识
	 * 
	 * @param value 值
	 */
	void setSign(String value);

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
	 * 获取-激活
	 * 
	 * @return 值
	 */
	emYesNo getActivated();

	/**
	 * 设置-激活
	 * 
	 * @param value 值
	 */
	void setActivated(emYesNo value);

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
	emYesNo getFixedAsset();

	/**
	 * 设置-固定资产
	 * 
	 * @param value 值
	 */
	void setFixedAsset(emYesNo value);

	/**
	 * 获取-产品单元
	 * 
	 * @return 值
	 */
	emYesNo getProductUnit();

	/**
	 * 设置-产品单元
	 * 
	 * @param value 值
	 */
	void setProductUnit(emYesNo value);

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
	 * 获取-生产商
	 * 
	 * @return 值
	 */
	String getManufacturer();

	/**
	 * 设置-生产商
	 * 
	 * @param value 值
	 */
	void setManufacturer(String value);

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
	 * 获取-价格
	 * 
	 * @return 值
	 */
	BigDecimal getAvgPrice();

	/**
	 * 设置-价格
	 * 
	 * @param value 值
	 */
	void setAvgPrice(BigDecimal value);

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
	 * 获取-评估方法
	 * 
	 * @return 值
	 */
	emValuationMethod getValuationMethod();

	/**
	 * 设置-评估方法
	 * 
	 * @param value 值
	 */
	void setValuationMethod(emValuationMethod value);

	/**
	 * 获取-库存
	 * 
	 * @return 值
	 */
	BigDecimal getOnHand();

	/**
	 * 设置-库存
	 * 
	 * @param value 值
	 */
	void setOnHand(BigDecimal value);

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
	BigDecimal getOnCommited();

	/**
	 * 设置-已承诺
	 * 
	 * @param value 值
	 */
	void setOnCommited(BigDecimal value);

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
	BigDecimal getOnOrdered();

	/**
	 * 设置-已订购
	 * 
	 * @param value 值
	 */
	void setOnOrdered(BigDecimal value);

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
	 * 获取-已预留
	 * 
	 * @return 值
	 */
	BigDecimal getOnReserved();

	/**
	 * 设置-已预留
	 * 
	 * @param value 值
	 */
	void setOnReserved(BigDecimal value);

	/**
	 * 获取-库存价值
	 * 
	 * @return 值
	 */
	BigDecimal getInventoryValue();

	/**
	 * 设置-库存价值
	 * 
	 * @param value 值
	 */
	void setInventoryValue(BigDecimal value);

	/**
	 * 获取-按仓库管理
	 * 
	 * @return 值
	 */
	emYesNo getManageByWarehouse();

	/**
	 * 设置-按仓库管理
	 * 
	 * @param value 值
	 */
	void setManageByWarehouse(emYesNo value);

	/**
	 * 获取-最低库存量
	 * 
	 * @return 值
	 */
	BigDecimal getMinimumInventory();

	/**
	 * 设置-最低库存量
	 * 
	 * @param value 值
	 */
	void setMinimumInventory(BigDecimal value);

	/**
	 * 获取-最高库存量
	 * 
	 * @return 值
	 */
	BigDecimal getMaximumInventory();

	/**
	 * 设置-最高库存量
	 * 
	 * @param value 值
	 */
	void setMaximumInventory(BigDecimal value);

	/**
	 * 获取-最低订购数量
	 * 
	 * @return 值
	 */
	BigDecimal getMinimumOrderQuantity();

	/**
	 * 设置-最低订购数量
	 * 
	 * @param value 值
	 */
	void setMinimumOrderQuantity(BigDecimal value);

	/**
	 * 设置-最低订购数量
	 * 
	 * @param value 值
	 */
	void setMinimumOrderQuantity(String value);

	/**
	 * 设置-最低订购数量
	 * 
	 * @param value 值
	 */
	void setMinimumOrderQuantity(int value);

	/**
	 * 设置-最低订购数量
	 * 
	 * @param value 值
	 */
	void setMinimumOrderQuantity(double value);

	/**
	 * 获取-提前期（天）
	 * 
	 * @return 值
	 */
	Integer getLeadTime();

	/**
	 * 设置-提前期（天）
	 * 
	 * @param value 值
	 */
	void setLeadTime(Integer value);

	/**
	 * 获取-序号管理
	 * 
	 * @return 值
	 */
	emYesNo getSerialManagement();

	/**
	 * 设置-序号管理
	 * 
	 * @param value 值
	 */
	void setSerialManagement(emYesNo value);

	/**
	 * 获取-批号管理
	 * 
	 * @return 值
	 */
	emYesNo getBatchManagement();

	/**
	 * 设置-批号管理
	 * 
	 * @param value 值
	 */
	void setBatchManagement(emYesNo value);

	/**
	 * 获取-采购税收组
	 * 
	 * @return 值
	 */
	String getPurchaseTaxGroup();

	/**
	 * 设置-采购税收组
	 * 
	 * @param value 值
	 */
	void setPurchaseTaxGroup(String value);

	/**
	 * 获取-销售税收组
	 * 
	 * @return 值
	 */
	String getSalesTaxGroup();

	/**
	 * 设置-销售税收组
	 * 
	 * @param value 值
	 */
	void setSalesTaxGroup(String value);

	/**
	 * 获取-采购单位
	 * 
	 * @return 值
	 */
	String getPurchaseUOM();

	/**
	 * 设置-采购单位
	 * 
	 * @param value 值
	 */
	void setPurchaseUOM(String value);

	/**
	 * 获取-销售单位
	 * 
	 * @return 值
	 */
	String getSalesUOM();

	/**
	 * 设置-销售单位
	 * 
	 * @param value 值
	 */
	void setSalesUOM(String value);

	/**
	 * 获取-生产单位
	 * 
	 * @return 值
	 */
	String getProductionUOM();

	/**
	 * 设置-生产单位
	 * 
	 * @param value 值
	 */
	void setProductionUOM(String value);

	/**
	 * 获取-获取方式
	 * 
	 * @return 值
	 */
	emProcurementMethod getProcurementMethod();

	/**
	 * 设置-获取方式
	 * 
	 * @param value 值
	 */
	void setProcurementMethod(emProcurementMethod value);

	/**
	 * 获取-领料方式
	 * 
	 * @return 值
	 */
	emIssueMethod getIssueMethod();

	/**
	 * 设置-领料方式
	 * 
	 * @param value 值
	 */
	void setIssueMethod(emIssueMethod value);

	/**
	 * 获取-计划方式
	 * 
	 * @return 值
	 */
	emPlanningMethod getPlanningMethod();

	/**
	 * 设置-计划方式
	 * 
	 * @param value 值
	 */
	void setPlanningMethod(emPlanningMethod value);

	/**
	 * 获取-齐套检查
	 * 
	 * @return 值
	 */
	emYesNo getCheckCompleteness();

	/**
	 * 设置-齐套检查
	 * 
	 * @param value 值
	 */
	void setCheckCompleteness(emYesNo value);

	/**
	 * 获取-批次混用
	 * 
	 * @return 值
	 */
	emYesNo getMixingBatches();

	/**
	 * 设置-批次混用
	 * 
	 * @param value 值
	 */
	void setMixingBatches(emYesNo value);

	/**
	 * 获取-订单生产
	 * 
	 * @return 值
	 */
	emYesNo getMadeToOrder();

	/**
	 * 设置-订单生产
	 * 
	 * @param value 值
	 */
	void setMadeToOrder(emYesNo value);

	/**
	 * 获取-图号
	 * 
	 * @return 值
	 */
	String getDarwingNumber();

	/**
	 * 设置-图号
	 * 
	 * @param value 值
	 */
	void setDarwingNumber(String value);

	/**
	 * 获取-匹配码
	 * 
	 * @return 值
	 */
	String getMatchCode();

	/**
	 * 设置-匹配码
	 * 
	 * @param value 值
	 */
	void setMatchCode(String value);

	/**
	 * 获取-生产批量
	 * 
	 * @return 值
	 */
	BigDecimal getLotSize();

	/**
	 * 设置-生产批量
	 * 
	 * @param value 值
	 */
	void setLotSize(BigDecimal value);

	/**
	 * 获取-废品率
	 * 
	 * @return 值
	 */
	String getScrap();

	/**
	 * 设置-废品率
	 * 
	 * @param value 值
	 */
	void setScrap(String value);

	/**
	 * 获取-计划员
	 * 
	 * @return 值
	 */
	String getScheduler();

	/**
	 * 设置-计划员
	 * 
	 * @param value 值
	 */
	void setScheduler(String value);

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

	/**
	 * 获取-可用数量（库存数+已订购-已承诺）
	 * 
	 * @return
	 */
	BigDecimal getOnAvailable();
}
