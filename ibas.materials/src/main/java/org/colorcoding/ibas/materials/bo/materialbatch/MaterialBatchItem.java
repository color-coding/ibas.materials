package org.colorcoding.ibas.materials.bo.materialbatch;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicsHost;
import org.colorcoding.ibas.bobas.bo.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleMinValue;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.logic.IMaterialBatchJournalContract;

/**
 * 物料批次项目
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = MaterialBatchItem.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = MaterialBatchItem.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = MaterialBatchItem.BUSINESS_OBJECT_CODE)
public class MaterialBatchItem extends BusinessObject<MaterialBatchItem>
		implements IMaterialBatchItem, IBusinessLogicsHost, IBOUserFields {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -1685330682042217246L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialBatchItem.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_MM_OMBI";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_MM_BATCHITEM";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "MaterialBatchItem";

	/**
	 * 属性名称-批次编码
	 */
	private static final String PROPERTY_BATCHCODE_NAME = "BatchCode";

	/**
	 * 批次编码 属性
	 */
	@DbField(name = "BatchCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_BATCHCODE = registerProperty(PROPERTY_BATCHCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-批次编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BATCHCODE_NAME)
	public final String getBatchCode() {
		return this.getProperty(PROPERTY_BATCHCODE);
	}

	/**
	 * 设置-批次编码
	 * 
	 * @param value 值
	 */
	public final void setBatchCode(String value) {
		this.setProperty(PROPERTY_BATCHCODE, value);
	}

	/**
	 * 属性名称-数量
	 */
	private static final String PROPERTY_QUANTITY_NAME = "Quantity";

	/**
	 * 数量 属性
	 */
	@DbField(name = "Quantity", type = DbFieldType.DECIMAL, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<BigDecimal> PROPERTY_QUANTITY = registerProperty(PROPERTY_QUANTITY_NAME,
			BigDecimal.class, MY_CLASS);

	/**
	 * 获取-数量
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_QUANTITY_NAME)
	public final BigDecimal getQuantity() {
		return this.getProperty(PROPERTY_QUANTITY);
	}

	/**
	 * 设置-数量
	 * 
	 * @param value 值
	 */
	public final void setQuantity(BigDecimal value) {
		this.setProperty(PROPERTY_QUANTITY, value);
	}

	/**
	 * 设置-数量
	 * 
	 * @param value 值
	 */
	public final void setQuantity(String value) {
		this.setQuantity(Decimals.valueOf(value));
	}

	/**
	 * 设置-数量
	 * 
	 * @param value 值
	 */
	public final void setQuantity(int value) {
		this.setQuantity(Decimals.valueOf(value));
	}

	/**
	 * 设置-数量
	 * 
	 * @param value 值
	 */
	public final void setQuantity(double value) {
		this.setQuantity(Decimals.valueOf(value));
	}

	/**
	 * 属性名称-基于类型
	 */
	private static final String PROPERTY_DOCUMENTTYPE_NAME = "DocumentType";

	/**
	 * 基于类型 属性
	 */
	@DbField(name = "BaseType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DOCUMENTTYPE = registerProperty(PROPERTY_DOCUMENTTYPE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-基于类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DOCUMENTTYPE_NAME)
	public final String getDocumentType() {
		return this.getProperty(PROPERTY_DOCUMENTTYPE);
	}

	/**
	 * 设置-基于类型
	 * 
	 * @param value 值
	 */
	public final void setDocumentType(String value) {
		this.setProperty(PROPERTY_DOCUMENTTYPE, value);
	}

	/**
	 * 属性名称-基于标识
	 */
	private static final String PROPERTY_DOCUMENTENTRY_NAME = "DocumentEntry";

	/**
	 * 基于标识 属性
	 */
	@DbField(name = "BaseEntry", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_DOCUMENTENTRY = registerProperty(PROPERTY_DOCUMENTENTRY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-基于标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DOCUMENTENTRY_NAME)
	public final Integer getDocumentEntry() {
		return this.getProperty(PROPERTY_DOCUMENTENTRY);
	}

	/**
	 * 设置-基于标识
	 * 
	 * @param value 值
	 */
	public final void setDocumentEntry(Integer value) {
		this.setProperty(PROPERTY_DOCUMENTENTRY, value);
	}

	/**
	 * 属性名称-基于行号
	 */
	private static final String PROPERTY_DOCUMENTLINEID_NAME = "DocumentLineId";

	/**
	 * 基于行号 属性
	 */
	@DbField(name = "BaseLine", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_DOCUMENTLINEID = registerProperty(PROPERTY_DOCUMENTLINEID_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-基于行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DOCUMENTLINEID_NAME)
	public final Integer getDocumentLineId() {
		return this.getProperty(PROPERTY_DOCUMENTLINEID);
	}

	/**
	 * 设置-基于行号
	 * 
	 * @param value 值
	 */
	public final void setDocumentLineId(Integer value) {
		this.setProperty(PROPERTY_DOCUMENTLINEID, value);
	}

	/**
	 * 属性名称-对象编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 对象编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-对象编号
	 * 
	 * @param value 值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-对象类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象类型 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象类型
	 * 
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-实例号
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 实例号 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-实例号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-实例号
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
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
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
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
	 * 属性名称-更新日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 更新日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-更新日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-更新日期
	 * 
	 * @param value 值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-更新时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 更新时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-更新时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-更新时间
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
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
	 * 属性名称-更新用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 更新用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-更新用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-更新用户
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
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
				new BusinessRuleRequired(PROPERTY_BATCHCODE), // 要求有值
				new BusinessRuleRequired(PROPERTY_DOCUMENTTYPE), // 要求有值
				new BusinessRuleRequired(PROPERTY_DOCUMENTENTRY), // 要求有值
				new BusinessRuleRequired(PROPERTY_DOCUMENTLINEID), // 要求有值
				new BusinessRuleMinValue<BigDecimal>(Decimals.VALUE_ZERO, PROPERTY_QUANTITY), // 不能低于0
		};
	}

	IMaterialBatchItemParent parent;

	@Override
	public IBusinessLogicContract[] getContracts() {
		if (this.parent instanceof IMaterialBatchReceiptParent
				&& ((IMaterialBatchReceiptParent) this.parent).checkBatchStatus()) {
			return new IBusinessLogicContract[] {
					// 入库批次交易
					new IMaterialBatchJournalContract() {
						@Override
						public boolean isOffsetting() {
							if (MaterialBatchItem.this.isDeleted()) {
								return true;
							}
							if (MaterialBatchItem.this instanceof IBOTagCanceled) {
								IBOTagCanceled boTag = (IBOTagCanceled) MaterialBatchItem.this;
								if (boTag.getCanceled() == emYesNo.YES) {
									return true;
								}
							}
							if (MaterialBatchItem.this instanceof IBOTagDeleted) {
								IBOTagDeleted boTag = (IBOTagDeleted) MaterialBatchItem.this;
								if (boTag.getDeleted() == emYesNo.YES) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent.isDeleted()) {
								return true;
							}
							if (MaterialBatchItem.this.parent instanceof IBODocument) {
								IBODocument document = (IBODocument) MaterialBatchItem.this.parent;
								if (document.getDocumentStatus() == emDocumentStatus.PLANNED) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent instanceof IBODocumentLine) {
								IBODocumentLine document = (IBODocumentLine) MaterialBatchItem.this.parent;
								if (document.getLineStatus() == emDocumentStatus.PLANNED) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent instanceof IBOTagCanceled) {
								IBOTagCanceled boTag = (IBOTagCanceled) MaterialBatchItem.this.parent;
								if (boTag.getCanceled() == emYesNo.YES) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent instanceof IBOTagDeleted) {
								IBOTagDeleted boTag = (IBOTagDeleted) MaterialBatchItem.this.parent;
								if (boTag.getDeleted() == emYesNo.YES) {
									return true;
								}
							}
							return false;
						}

						@Override
						public String getIdentifiers() {
							return MaterialBatchItem.this.getIdentifiers();
						}

						@Override
						public String getWarehouse() {
							return MaterialBatchItem.this.parent.getWarehouse();
						}

						@Override
						public String getBatchCode() {
							return MaterialBatchItem.this.getBatchCode();
						}

						@Override
						public String getItemCode() {
							return MaterialBatchItem.this.parent.getItemCode();
						}

						@Override
						public emDirection getDirection() {
							return emDirection.IN;
						}

						@Override
						public BigDecimal getQuantity() {
							return MaterialBatchItem.this.getQuantity();
						}

						@Override
						public String getUOM() {
							return MaterialBatchItem.this.parent.getInventoryUOM();
						}

						@Override
						public String getDocumentType() {
							return MaterialBatchItem.this.getDocumentType();
						}

						@Override
						public Integer getDocumentLineId() {
							return MaterialBatchItem.this.getDocumentLineId();
						}

						@Override
						public Integer getDocumentEntry() {
							return MaterialBatchItem.this.getDocumentEntry();
						}

						@Override
						public Integer getDocumentIndex() {
							return MaterialBatchItem.this.getObjectKey();
						}

						@Override
						public String getBaseDocumentType() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getBaseDocumentType();
						}

						@Override
						public Integer getBaseDocumentEntry() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getBaseDocumentEntry();
						}

						@Override
						public Integer getBaseDocumentLineId() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent)
									.getBaseDocumentLineId();
						}

						@Override
						public DateTime getPostingDate() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getPostingDate();
						}

						@Override
						public DateTime getDeliveryDate() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getDeliveryDate();
						}

						@Override
						public DateTime getDocumentDate() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getDocumentDate();
						}

						@Override
						public BigDecimal getPrice() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getInventoryPrice();
						}

						@Override
						public String getCurrency() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getInventoryCurrency();
						}

						@Override
						public BigDecimal getRate() {
							return ((IMaterialBatchReceiptParent) MaterialBatchItem.this.parent).getInventoryRate();
						}

					}

			};
		} else if (this.parent instanceof IMaterialBatchIssueParent
				&& ((IMaterialBatchIssueParent) this.parent).checkBatchStatus()) {
			return new IBusinessLogicContract[] {
					// 出库批次交易记录
					new IMaterialBatchJournalContract() {
						@Override
						public emDirection getDirection() {
							return emDirection.OUT;
						}

						@Override
						public boolean isOffsetting() {
							if (MaterialBatchItem.this.isDeleted()) {
								return true;
							}
							if (MaterialBatchItem.this instanceof IBOTagCanceled) {
								IBOTagCanceled boTag = (IBOTagCanceled) MaterialBatchItem.this;
								if (boTag.getCanceled() == emYesNo.YES) {
									return true;
								}
							}
							if (MaterialBatchItem.this instanceof IBOTagDeleted) {
								IBOTagDeleted boTag = (IBOTagDeleted) MaterialBatchItem.this;
								if (boTag.getDeleted() == emYesNo.YES) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent.isDeleted()) {
								return true;
							}
							if (MaterialBatchItem.this.parent instanceof IBODocument) {
								IBODocument document = (IBODocument) MaterialBatchItem.this.parent;
								if (document.getDocumentStatus() == emDocumentStatus.PLANNED) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent instanceof IBODocumentLine) {
								IBODocumentLine document = (IBODocumentLine) MaterialBatchItem.this.parent;
								if (document.getLineStatus() == emDocumentStatus.PLANNED) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent instanceof IBOTagCanceled) {
								IBOTagCanceled boTag = (IBOTagCanceled) MaterialBatchItem.this.parent;
								if (boTag.getCanceled() == emYesNo.YES) {
									return true;
								}
							}
							if (MaterialBatchItem.this.parent instanceof IBOTagDeleted) {
								IBOTagDeleted boTag = (IBOTagDeleted) MaterialBatchItem.this.parent;
								if (boTag.getDeleted() == emYesNo.YES) {
									return true;
								}
							}
							return false;
						}

						@Override
						public String getIdentifiers() {
							return MaterialBatchItem.this.getIdentifiers();
						}

						@Override
						public String getBatchCode() {
							return MaterialBatchItem.this.getBatchCode();
						}

						@Override
						public String getItemCode() {
							return MaterialBatchItem.this.parent.getItemCode();
						}

						@Override
						public String getWarehouse() {
							return MaterialBatchItem.this.parent.getWarehouse();
						}

						@Override
						public BigDecimal getQuantity() {
							return MaterialBatchItem.this.getQuantity();
						}

						@Override
						public String getUOM() {
							return MaterialBatchItem.this.parent.getInventoryUOM();
						}

						@Override
						public String getDocumentType() {
							return MaterialBatchItem.this.getDocumentType();
						}

						@Override
						public Integer getDocumentLineId() {
							return MaterialBatchItem.this.getDocumentLineId();
						}

						@Override
						public Integer getDocumentEntry() {
							return MaterialBatchItem.this.getDocumentEntry();
						}

						@Override
						public Integer getDocumentIndex() {
							return MaterialBatchItem.this.getObjectKey();
						}

						@Override
						public String getBaseDocumentType() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getBaseDocumentType();
						}

						@Override
						public Integer getBaseDocumentEntry() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getBaseDocumentEntry();
						}

						@Override
						public Integer getBaseDocumentLineId() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getBaseDocumentLineId();
						}

						@Override
						public DateTime getPostingDate() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getPostingDate();
						}

						@Override
						public DateTime getDeliveryDate() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getDeliveryDate();
						}

						@Override
						public DateTime getDocumentDate() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getDocumentDate();
						}

						@Override
						public BigDecimal getPrice() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getInventoryPrice();
						}

						@Override
						public String getCurrency() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getInventoryCurrency();
						}

						@Override
						public BigDecimal getRate() {
							return ((IMaterialBatchIssueParent) MaterialBatchItem.this.parent).getInventoryRate();
						}
					}

			};
		}
		return new IBusinessLogicContract[] {};
	}
}
