package org.colorcoding.ibas.materials.bo.materialscrap;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMinValue;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 物料废品率 - 阶梯
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialScrapSection.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class MaterialScrapSection extends BusinessObject<MaterialScrapSection> implements IMaterialScrapSection {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -1891695357044849006L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialScrapSection.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_SCP1";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_MATERIALSCRAP";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialScrapSection";

	/**
	 * 属性名称-编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-编号
	 * 
	 * @param value 值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-行号
	 */
	private static final String PROPERTY_LINEID_NAME = "LineId";

	/**
	 * 行号 属性
	 */
	@DbField(name = "LineId", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_LINEID = registerProperty(PROPERTY_LINEID_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINEID_NAME)
	public final Integer getLineId() {
		return this.getProperty(PROPERTY_LINEID);
	}

	/**
	 * 设置-行号
	 * 
	 * @param value 值
	 */
	public final void setLineId(Integer value) {
		this.setProperty(PROPERTY_LINEID, value);
	}

	/**
	 * 属性名称-类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 类型 属性
	 */
	@DbField(name = "Object", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-类型
	 * 
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-实例号（版本）
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 实例号（版本） 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-实例号（版本）
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-实例号（版本）
	 * 
	 * @param value 值
	 */
	public final void setLogInst(Integer value) {
		this.setProperty(PROPERTY_LOGINST, value);
	}

	/**
	 * 属性名称-数据源
	 */
	private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

	/**
	 * 数据源 属性
	 */
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATASOURCE_NAME)
	public final String getDataSource() {
		return this.getProperty(PROPERTY_DATASOURCE);
	}

	/**
	 * 设置-数据源
	 * 
	 * @param value 值
	 */
	public final void setDataSource(String value) {
		this.setProperty(PROPERTY_DATASOURCE, value);
	}

	/**
	 * 属性名称-创建日期
	 */
	private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

	/**
	 * 创建日期 属性
	 */
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
	public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEDATE_NAME)
	public final DateTime getCreateDate() {
		return this.getProperty(PROPERTY_CREATEDATE);
	}

	/**
	 * 设置-创建日期
	 * 
	 * @param value 值
	 */
	public final void setCreateDate(DateTime value) {
		this.setProperty(PROPERTY_CREATEDATE, value);
	}

	/**
	 * 属性名称-创建时间
	 */
	private static final String PROPERTY_CREATETIME_NAME = "CreateTime";

	/**
	 * 创建时间 属性
	 */
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATETIME_NAME)
	public final Short getCreateTime() {
		return this.getProperty(PROPERTY_CREATETIME);
	}

	/**
	 * 设置-创建时间
	 * 
	 * @param value 值
	 */
	public final void setCreateTime(Short value) {
		this.setProperty(PROPERTY_CREATETIME, value);
	}

	/**
	 * 属性名称-修改日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 修改日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-修改日期
	 * 
	 * @param value 值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-修改时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 修改时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-修改时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-修改时间
	 * 
	 * @param value 值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
	}

	/**
	 * 属性名称-创建用户
	 */
	private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

	/**
	 * 创建用户 属性
	 */
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(PROPERTY_CREATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEUSERSIGN_NAME)
	public final Integer getCreateUserSign() {
		return this.getProperty(PROPERTY_CREATEUSERSIGN);
	}

	/**
	 * 设置-创建用户
	 * 
	 * @param value 值
	 */
	public final void setCreateUserSign(Integer value) {
		this.setProperty(PROPERTY_CREATEUSERSIGN, value);
	}

	/**
	 * 属性名称-修改用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 修改用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-修改用户
	 * 
	 * @param value 值
	 */
	public final void setUpdateUserSign(Integer value) {
		this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
	}

	/**
	 * 属性名称-创建动作标识
	 */
	private static final String PROPERTY_CREATEACTIONID_NAME = "CreateActionId";

	/**
	 * 创建动作标识 属性
	 */
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(PROPERTY_CREATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEACTIONID_NAME)
	public final String getCreateActionId() {
		return this.getProperty(PROPERTY_CREATEACTIONID);
	}

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value 值
	 */
	public final void setCreateActionId(String value) {
		this.setProperty(PROPERTY_CREATEACTIONID, value);
	}

	/**
	 * 属性名称-更新动作标识
	 */
	private static final String PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";

	/**
	 * 更新动作标识 属性
	 */
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(PROPERTY_UPDATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEACTIONID_NAME)
	public final String getUpdateActionId() {
		return this.getProperty(PROPERTY_UPDATEACTIONID);
	}

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value 值
	 */
	public final void setUpdateActionId(String value) {
		this.setProperty(PROPERTY_UPDATEACTIONID, value);
	}

	/**
	 * 属性名称-区间开始
	 */
	private static final String PROPERTY_SECTIONSTART_NAME = "SectionStart";

	/**
	 * 区间开始 属性
	 */
	@DbField(name = "SectionStart", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_SECTIONSTART = registerProperty(PROPERTY_SECTIONSTART_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-区间开始
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SECTIONSTART_NAME)
	public final BigDecimal getSectionStart() {
		return this.getProperty(PROPERTY_SECTIONSTART);
	}

	/**
	 * 设置-区间开始
	 * 
	 * @param value 值
	 */
	public final void setSectionStart(BigDecimal value) {
		this.setProperty(PROPERTY_SECTIONSTART, value);
	}

	/**
	 * 属性名称-区间结束
	 */
	private static final String PROPERTY_SECTIONEND_NAME = "SectionEnd";

	/**
	 * 区间结束 属性
	 */
	@DbField(name = "SectionEnd", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_SECTIONEND = registerProperty(PROPERTY_SECTIONEND_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-区间结束
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SECTIONEND_NAME)
	public final BigDecimal getSectionEnd() {
		return this.getProperty(PROPERTY_SECTIONEND);
	}

	/**
	 * 设置-区间结束
	 * 
	 * @param value 值
	 */
	public final void setSectionEnd(BigDecimal value) {
		this.setProperty(PROPERTY_SECTIONEND, value);
	}

	/**
	 * 属性名称-率
	 */
	private static final String PROPERTY_RATE_NAME = "Rate";

	/**
	 * 率 属性
	 */
	@DbField(name = "Rate", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_RATE = registerProperty(PROPERTY_RATE_NAME, BigDecimal.class,
			MY_CLASS);

	/**
	 * 获取-率
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_RATE_NAME)
	public final BigDecimal getRate() {
		return this.getProperty(PROPERTY_RATE);
	}

	/**
	 * 设置-率
	 * 
	 * @param value 值
	 */
	public final void setRate(BigDecimal value) {
		this.setProperty(PROPERTY_RATE, value);
	}

	/**
	 * 属性名称-值
	 */
	private static final String PROPERTY_VALUE_NAME = "Value";

	/**
	 * 值 属性
	 */
	@DbField(name = "Value", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME)
	public static final IPropertyInfo<BigDecimal> PROPERTY_VALUE = registerProperty(PROPERTY_VALUE_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VALUE_NAME)
	public final BigDecimal getValue() {
		return this.getProperty(PROPERTY_VALUE);
	}

	/**
	 * 设置-值
	 * 
	 * @param value 值
	 */
	public final void setValue(BigDecimal value) {
		this.setProperty(PROPERTY_VALUE, value);
	}

	/**
	 * 属性名称-备注
	 */
	private static final String PROPERTY_REMARKS_NAME = "Remarks";

	/**
	 * 备注 属性
	 */
	@DbField(name = "Remarks", type = DbFieldType.MEMO, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_REMARKS = registerProperty(PROPERTY_REMARKS_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-备注
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_REMARKS_NAME)
	public final String getRemarks() {
		return this.getProperty(PROPERTY_REMARKS);
	}

	/**
	 * 设置-备注
	 * 
	 * @param value 值
	 */
	public final void setRemarks(String value) {
		this.setProperty(PROPERTY_REMARKS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

	}

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_SECTIONSTART), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_SECTIONEND), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_RATE), // 不能低于0
				new BusinessRuleMinValue<BigDecimal>(Decimal.ZERO, PROPERTY_VALUE), // 不能低于0
		};
	}
}
