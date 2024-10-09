package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.Iterator;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.document.DocumentFetcherManager;
import org.colorcoding.ibas.document.IDocumentCloseAmountOperator;
import org.colorcoding.ibas.document.IDocumentClosingAmountItem;
import org.colorcoding.ibas.document.IDocumentFetcher;
import org.colorcoding.ibas.document.IDocumentOperatingTarget;
import org.colorcoding.ibas.materials.MyConfiguration;

/**
 * 单据金额关闭服务
 */
@LogicContract(IDocumentAmountClosingContract.class)
public class DocumentAmountClosingService
		extends BusinessLogic<IDocumentAmountClosingContract, IDocumentCloseAmountOperator> {

	public static final IDocumentCloseAmountOperator EMPTY_DATA = new _DocumentCloseAmountOperator();

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IDocumentAmountClosingContract) {
			IDocumentAmountClosingContract contract = (IDocumentAmountClosingContract) data;
			if (contract.checkDataStatus() == false) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "DataStatus",
						String.format("%s-%s-%s", contract.getBaseDocumentType(), contract.getBaseDocumentEntry(),
								contract.getBaseDocumentLineId()));
				return false;
			}
			if (DataConvert.isNullOrEmpty(contract.getBaseDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"BaseDocumentType", "EMPTY");
				return false;
			}
			if (Integer.compare(0, contract.getBaseDocumentEntry()) >= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"BaseDocumentEntry", "EMPTY");
				return false;
			}
			if (!DocumentFetcherManager.create().getFetcherMap().containsKey(contract.getBaseDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						String.format("BO [%s] Fetcher", contract.getBaseDocumentType()), "NOT FOUND");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IDocumentCloseAmountOperator fetchBeAffected(IDocumentAmountClosingContract contract) {
		try {
			ICriteria criteria = new Criteria();
			// 必须查询类型，否则不能唯一
			ICondition condition = criteria.getConditions().create();
			condition.setAlias("ObjectCode");
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(contract.getBaseDocumentType());
			// 子对象时，使用父对象查询
			if (condition.getValue() != null && condition.getValue().lastIndexOf(".") > 0) {
				condition.setValue(condition.getValue().substring(0, condition.getValue().lastIndexOf(".")));
			}
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.AND);
			condition.setAlias("DocEntry");
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(contract.getBaseDocumentEntry());
			IDocumentOperatingTarget document = this.fetchBeAffected(criteria, IDocumentCloseAmountOperator.class);
			if (document == null) {
				IDocumentFetcher<IDocumentOperatingTarget> fetcher = DocumentFetcherManager.create()
						.newFetcher(contract.getBaseDocumentType());
				if (fetcher == null) {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_document_not_found_fether", contract.getBaseDocumentType()));
				}
				fetcher.setRepository(this.getRepository());
				document = fetcher.fetch(contract.getBaseDocumentEntry());
			}
			if (document instanceof IDocumentCloseAmountOperator) {
				return (IDocumentCloseAmountOperator) document;
			} else {
				return EMPTY_DATA;
			}
		} catch (BusinessLogicException e) {
			throw e;
		} catch (Exception e) {
			throw new BusinessLogicException(e);
		}
	}

	@Override
	protected void impact(IDocumentAmountClosingContract contract) {
		String documents = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_LIMIT_CLOSED_AMOUNT_DOCUMENTS,
				"");
		if (!documents.isEmpty() && !documents.endsWith(";")) {
			documents = documents + ";";
		}
		Iterator<IDocumentClosingAmountItem> iterator = this.getBeAffected().getAmountItems();
		while (iterator.hasNext()) {
			IDocumentClosingAmountItem item = iterator.next();
			if (!item.getObjectCode().equalsIgnoreCase(contract.getBaseDocumentType())) {
				continue;
			}
			if (item.getLineId().compareTo(contract.getBaseDocumentLineId()) != 0) {
				continue;
			}
			BigDecimal closedAmount = item.getClosedAmount();
			if (closedAmount == null) {
				closedAmount = Decimal.ZERO;
			}
			closedAmount = closedAmount.add(contract.getAmount());
			if (closedAmount.compareTo(item.getAmount()) > 0) {
				if (documents.indexOf(item.getObjectCode() + ";") >= 0) {
					throw new BusinessLogicException(I18N.prop("msg_mm_document_closed_amount_exceeds_amount",
							String.format("{[%s].[DocEntry = %s]%s}", this.getBeAffected().getObjectCode(),
									this.getBeAffected().getDocEntry(),
									item.getLineId() > 0 ? String.format("&&[LineId = %s]", item.getLineId()) : "")));
				}
			}
			item.setClosedAmount(closedAmount);
			if (contract.isSmartDocumentStatus() == true) {
				// 处理单据状态
				if (item.getLineStatus() == emDocumentStatus.RELEASED
						&& closedAmount.compareTo(item.getAmount()) >= 0) {
					item.setLineStatus(emDocumentStatus.FINISHED);
				}
			}
			if (item.getClosedAmount().compareTo(Decimal.ZERO) > 0) {
				item.setReferenced(emYesNo.YES);
			}
		}
	}

	@Override
	protected void revoke(IDocumentAmountClosingContract contract) {
		Iterator<IDocumentClosingAmountItem> iterator = this.getBeAffected().getAmountItems();
		while (iterator.hasNext()) {
			IDocumentClosingAmountItem item = iterator.next();
			if (!item.getObjectCode().equalsIgnoreCase(contract.getBaseDocumentType())) {
				continue;
			}
			if (item.getLineId().compareTo(contract.getBaseDocumentLineId()) != 0) {
				continue;
			}
			BigDecimal closedAmount = item.getClosedAmount();
			if (closedAmount == null) {
				closedAmount = Decimal.ZERO;
			}
			closedAmount = closedAmount.subtract(contract.getAmount());
			item.setClosedAmount(closedAmount);
			if (contract.isSmartDocumentStatus() == true) {
				// 处理单据状态
				if (item.getLineStatus() == emDocumentStatus.FINISHED && closedAmount.compareTo(item.getAmount()) < 0) {
					item.setLineStatus(emDocumentStatus.RELEASED);
				}
			}
			if (item.getClosedAmount().compareTo(Decimal.ZERO) <= 0) {
				item.setReferenced(emYesNo.NO);
			}
		}
	}

	@SuppressWarnings("unused")
	private static class _DocumentCloseAmountOperator extends BusinessObject<IBODocument>
			implements IDocumentCloseAmountOperator {

		private static final long serialVersionUID = 1L;

		private static final Class<?> MY_CLASS = _DocumentCloseAmountOperator.class;

		public _DocumentCloseAmountOperator() {
			super.setSavable(false);
		}

		/**
		 * 属性名称-凭证编号
		 */
		private static final String PROPERTY_DOCENTRY_NAME = "DocEntry";

		/**
		 * 凭证编号 属性
		 */
		public static final IPropertyInfo<Integer> PROPERTY_DOCENTRY = registerProperty(PROPERTY_DOCENTRY_NAME,
				Integer.class, MY_CLASS);

		/**
		 * 获取-凭证编号
		 * 
		 * @return 值
		 */
		public final Integer getDocEntry() {
			return this.getProperty(PROPERTY_DOCENTRY);
		}

		/**
		 * 设置-凭证编号
		 * 
		 * @param value 值
		 */
		public final void setDocEntry(Integer value) {
			this.setProperty(PROPERTY_DOCENTRY, value);
		}

		/**
		 * 属性名称-单据编码
		 */
		private static final String PROPERTY_DOCNUM_NAME = "DocNum";

		/**
		 * 期间编号 属性
		 */
		public static final IPropertyInfo<String> PROPERTY_DOCNUM = registerProperty(PROPERTY_DOCNUM_NAME, String.class,
				MY_CLASS);

		/**
		 * 获取-单据编码
		 * 
		 * @return 值
		 */
		public final String getDocNum() {
			return this.getProperty(PROPERTY_DOCNUM);
		}

		/**
		 * 设置-单据编码
		 * 
		 * @param value 值
		 */
		public final void setDocNum(String value) {
			this.setProperty(PROPERTY_DOCNUM, value);
		}

		/**
		 * 属性名称-期间
		 */
		private static final String PROPERTY_PERIOD_NAME = "Period";

		/**
		 * 期间 属性
		 */
		public static final IPropertyInfo<Integer> PROPERTY_PERIOD = registerProperty(PROPERTY_PERIOD_NAME,
				Integer.class, MY_CLASS);

		/**
		 * 获取-期间
		 * 
		 * @return 值
		 */
		public final Integer getPeriod() {
			return this.getProperty(PROPERTY_PERIOD);
		}

		/**
		 * 设置-期间
		 * 
		 * @param value 值
		 */
		public final void setPeriod(Integer value) {
			this.setProperty(PROPERTY_PERIOD, value);
		}

		/**
		 * 属性名称-取消
		 */
		private static final String PROPERTY_CANCELED_NAME = "Canceled";

		/**
		 * 取消 属性
		 */
		public static final IPropertyInfo<emYesNo> PROPERTY_CANCELED = registerProperty(PROPERTY_CANCELED_NAME,
				emYesNo.class, MY_CLASS);

		/**
		 * 获取-取消
		 * 
		 * @return 值
		 */
		public final emYesNo getCanceled() {
			return this.getProperty(PROPERTY_CANCELED);
		}

		/**
		 * 设置-取消
		 * 
		 * @param value 值
		 */
		public final void setCanceled(emYesNo value) {
			this.setProperty(PROPERTY_CANCELED, value);
		}

		/**
		 * 属性名称-状态
		 */
		private static final String PROPERTY_STATUS_NAME = "Status";

		/**
		 * 状态 属性
		 */
		public static final IPropertyInfo<emBOStatus> PROPERTY_STATUS = registerProperty(PROPERTY_STATUS_NAME,
				emBOStatus.class, MY_CLASS);

		/**
		 * 获取-状态
		 * 
		 * @return 值
		 */
		public final emBOStatus getStatus() {
			return this.getProperty(PROPERTY_STATUS);
		}

		/**
		 * 设置-状态
		 * 
		 * @param value 值
		 */
		public final void setStatus(emBOStatus value) {
			this.setProperty(PROPERTY_STATUS, value);
		}

		/**
		 * 属性名称-审批状态
		 */
		private static final String PROPERTY_APPROVALSTATUS_NAME = "ApprovalStatus";

		/**
		 * 审批状态 属性
		 */
		public static final IPropertyInfo<emApprovalStatus> PROPERTY_APPROVALSTATUS = registerProperty(
				PROPERTY_APPROVALSTATUS_NAME, emApprovalStatus.class, MY_CLASS);

		/**
		 * 获取-审批状态
		 * 
		 * @return 值
		 */
		public final emApprovalStatus getApprovalStatus() {
			return this.getProperty(PROPERTY_APPROVALSTATUS);
		}

		/**
		 * 设置-审批状态
		 * 
		 * @param value 值
		 */
		public final void setApprovalStatus(emApprovalStatus value) {
			this.setProperty(PROPERTY_APPROVALSTATUS, value);
		}

		/**
		 * 属性名称-单据状态
		 */
		private static final String PROPERTY_DOCUMENTSTATUS_NAME = "DocumentStatus";

		/**
		 * 单据状态 属性
		 */
		public static final IPropertyInfo<emDocumentStatus> PROPERTY_DOCUMENTSTATUS = registerProperty(
				PROPERTY_DOCUMENTSTATUS_NAME, emDocumentStatus.class, MY_CLASS);

		/**
		 * 获取-单据状态
		 * 
		 * @return 值
		 */
		public final emDocumentStatus getDocumentStatus() {
			return this.getProperty(PROPERTY_DOCUMENTSTATUS);
		}

		/**
		 * 设置-单据状态
		 * 
		 * @param value 值
		 */
		public final void setDocumentStatus(emDocumentStatus value) {
			this.setProperty(PROPERTY_DOCUMENTSTATUS, value);
		}

		/**
		 * 属性名称-对象类型
		 */
		private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

		/**
		 * 对象类型 属性
		 */
		public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
				String.class, MY_CLASS);

		/**
		 * 获取-对象类型
		 * 
		 * @return 值
		 */
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
		 * 属性名称-创建日期
		 */
		private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

		/**
		 * 创建日期 属性
		 */
		public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME,
				DateTime.class, MY_CLASS);

		/**
		 * 获取-创建日期
		 * 
		 * @return 值
		 */
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
		public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME,
				Short.class, MY_CLASS);

		/**
		 * 获取-创建时间
		 * 
		 * @return 值
		 */
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
		public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
				DateTime.class, MY_CLASS);

		/**
		 * 获取-修改日期
		 * 
		 * @return 值
		 */
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
		public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
				Short.class, MY_CLASS);

		/**
		 * 获取-修改时间
		 * 
		 * @return 值
		 */
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
		 * 属性名称-版本
		 */
		private static final String PROPERTY_LOGINST_NAME = "LogInst";

		/**
		 * 版本 属性
		 */
		public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME,
				Integer.class, MY_CLASS);

		/**
		 * 获取-版本
		 * 
		 * @return 值
		 */
		public final Integer getLogInst() {
			return this.getProperty(PROPERTY_LOGINST);
		}

		/**
		 * 设置-版本
		 * 
		 * @param value 值
		 */
		public final void setLogInst(Integer value) {
			this.setProperty(PROPERTY_LOGINST, value);
		}

		/**
		 * 属性名称-服务系列
		 */
		private static final String PROPERTY_SERIES_NAME = "Series";

		/**
		 * 服务系列 属性
		 */
		public static final IPropertyInfo<Integer> PROPERTY_SERIES = registerProperty(PROPERTY_SERIES_NAME,
				Integer.class, MY_CLASS);

		/**
		 * 获取-服务系列
		 * 
		 * @return 值
		 */
		public final Integer getSeries() {
			return this.getProperty(PROPERTY_SERIES);
		}

		/**
		 * 设置-服务系列
		 * 
		 * @param value 值
		 */
		public final void setSeries(Integer value) {
			this.setProperty(PROPERTY_SERIES, value);
		}

		/**
		 * 属性名称-数据源
		 */
		private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

		/**
		 * 数据源 属性
		 */
		public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME,
				String.class, MY_CLASS);

		/**
		 * 获取-数据源
		 * 
		 * @return 值
		 */
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
		 * 属性名称-创建用户
		 */
		private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

		/**
		 * 创建用户 属性
		 */
		public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(
				PROPERTY_CREATEUSERSIGN_NAME, Integer.class, MY_CLASS);

		/**
		 * 获取-创建用户
		 * 
		 * @return 值
		 */
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
		public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(
				PROPERTY_UPDATEUSERSIGN_NAME, Integer.class, MY_CLASS);

		/**
		 * 获取-修改用户
		 * 
		 * @return 值
		 */
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
		public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(
				PROPERTY_CREATEACTIONID_NAME, String.class, MY_CLASS);

		/**
		 * 获取-创建动作标识
		 * 
		 * @return 值
		 */
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
		public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(
				PROPERTY_UPDATEACTIONID_NAME, String.class, MY_CLASS);

		/**
		 * 获取-更新动作标识
		 * 
		 * @return 值
		 */
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
		 * 属性名称-过账日期
		 */
		private static final String PROPERTY_POSTINGDATE_NAME = "PostingDate";

		/**
		 * 过账日期 属性
		 */
		public static final IPropertyInfo<DateTime> PROPERTY_POSTINGDATE = registerProperty(PROPERTY_POSTINGDATE_NAME,
				DateTime.class, MY_CLASS);

		/**
		 * 获取-过账日期
		 * 
		 * @return 值
		 */
		public final DateTime getPostingDate() {
			return this.getProperty(PROPERTY_POSTINGDATE);
		}

		/**
		 * 设置-过账日期
		 * 
		 * @param value 值
		 */
		public final void setPostingDate(DateTime value) {
			this.setProperty(PROPERTY_POSTINGDATE, value);
		}

		/**
		 * 属性名称-到期日
		 */
		private static final String PROPERTY_DELIVERYDATE_NAME = "DeliveryDate";

		/**
		 * 到期日 属性
		 */
		public static final IPropertyInfo<DateTime> PROPERTY_DELIVERYDATE = registerProperty(PROPERTY_DELIVERYDATE_NAME,
				DateTime.class, MY_CLASS);

		/**
		 * 获取-到期日
		 * 
		 * @return 值
		 */
		public final DateTime getDeliveryDate() {
			return this.getProperty(PROPERTY_DELIVERYDATE);
		}

		/**
		 * 设置-到期日
		 * 
		 * @param value 值
		 */
		public final void setDeliveryDate(DateTime value) {
			this.setProperty(PROPERTY_DELIVERYDATE, value);
		}

		/**
		 * 属性名称-凭证日期
		 */
		private static final String PROPERTY_DOCUMENTDATE_NAME = "DocumentDate";

		/**
		 * 凭证日期 属性
		 */
		public static final IPropertyInfo<DateTime> PROPERTY_DOCUMENTDATE = registerProperty(PROPERTY_DOCUMENTDATE_NAME,
				DateTime.class, MY_CLASS);

		/**
		 * 获取-凭证日期
		 * 
		 * @return 值
		 */
		public final DateTime getDocumentDate() {
			return this.getProperty(PROPERTY_DOCUMENTDATE);
		}

		/**
		 * 设置-凭证日期
		 * 
		 * @param value 值
		 */
		public final void setDocumentDate(DateTime value) {
			this.setProperty(PROPERTY_DOCUMENTDATE, value);
		}

		@Override
		public Iterator<IDocumentClosingAmountItem> getAmountItems() {
			return new Iterator<IDocumentClosingAmountItem>() {

				@Override
				public boolean hasNext() {
					return false;
				}

				@Override
				public IDocumentClosingAmountItem next() {
					return null;
				}
			};
		}

		/**
		 * 初始化数据
		 */
		@Override
		protected void initialize() {
			super.initialize();
			this.setObjectCode("EMPTY_DATA");
			this.setPostingDate(DateTime.getToday());
			this.setDocumentDate(DateTime.getToday());
			this.setDeliveryDate(DateTime.getToday());
			this.setDocumentStatus(emDocumentStatus.RELEASED);

		}
	}
}
