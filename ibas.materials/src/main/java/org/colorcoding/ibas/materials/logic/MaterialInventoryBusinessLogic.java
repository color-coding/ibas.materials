package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.function.Predicate;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.bo.BOIdentifierBuilder;
import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOTagCanceled;
import org.colorcoding.ibas.bobas.bo.IBOTagDeleted;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.ITrackable;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicsHost;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

public abstract class MaterialInventoryBusinessLogic<L extends IBusinessLogicContract, B extends IBusinessObject>
		extends MaterialBusinessLogic<L, B> {

	/**
	 * 正常记录
	 */
	public static final String DATASOURCE_SIGN_REGULAR_JOURNAL = "JNL-REG";
	/**
	 * 冲销记录
	 */
	public static final String DATASOURCE_SIGN_OFFSETTING_JOURNAL = "JNL-OFF";

	public MaterialInventoryBusinessLogic() {
	}

	private Boolean enableMaterialCosts = null;

	public final boolean isEnableMaterialCosts() {
		if (this.enableMaterialCosts == null) {
			this.setEnableMaterialCosts(
					MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false));
		}
		return enableMaterialCosts;
	}

	public final void setEnableMaterialCosts(boolean value) {
		this.enableMaterialCosts = value;
	}

	/**
	 * 负价格表示从基础单据取得成本，零价格和正价格使用普通成本模式。
	 */
	protected final boolean isBaseDocumentCost(BigDecimal price) {
		return price != null && price.signum() < 0;
	}

	/**
	 * 流水价格按存储精度比较，兼容单位换算产生的运行时小数。
	 * 成本来源模式仍须单独按原始价格符号检查。
	 */
	protected final boolean areCostPricesEqual(BigDecimal first, BigDecimal second) {
		return Decimals.round(first, Decimals.DECIMAL_PLACES_STORAGE)
				.compareTo(Decimals.round(second, Decimals.DECIMAL_PLACES_STORAGE)) == 0;
	}

	/**
	 * 按流水存储精度冻结数量，负数量仍无效，不能因舍入为零而通过。
	 */
	protected final boolean areCostQuantitiesEqual(BigDecimal first, BigDecimal second) {
		return second.signum() >= 0 && Decimals.round(first, Decimals.DECIMAL_PLACES_STORAGE)
				.compareTo(Decimals.round(second, Decimals.DECIMAL_PLACES_STORAGE)) == 0;
	}

	private IBusinessObject findCurrentCostHost(IBusinessObject current, IBusinessObject original) {
		if (BOUtilities.isSame(current, original, false)) {
			return current;
		}
		IBusinessObject[] result = { null };
		if (current instanceof BusinessObject<?>) {
			BOUtilities.traverse((BusinessObject<?>) current, child -> {
				if (result[0] == null) {
					result[0] = this.findCurrentCostHost(child, original);
				}
			});
		}
		return result[0];
	}

	/**
	 * 非库存业务跳过前检查历史流水，避免正反向逻辑都被跳过而绕过成本保护。
	 * 仅查询已有流水，不调用会创建流水的 fetchBeAffected(contract)。
	 */
	protected final <J extends IBusinessObject> void checkCostMaterialSkip(Class<J> journalType,
			String documentType, Integer documentEntry, Integer documentLineId, emDirection direction,
			Integer documentIndex) {
		if (!this.isEnableMaterialCosts()) {
			return;
		}
		IBusinessObject journal = this.getBeAffected();
		if (journal == null || journal.isNew() || !journal.isSavable()) {
			if (Strings.isNullOrEmpty(documentType) || documentEntry == null || documentEntry <= 0) {
				return;
			}
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias("BaseDocumentType");
			condition.setValue(documentType);
			condition = criteria.getConditions().create();
			condition.setAlias("BaseDocumentEntry");
			condition.setValue(documentEntry);
			condition = criteria.getConditions().create();
			condition.setAlias("BaseDocumentLineId");
			condition.setValue(documentLineId);
			condition = criteria.getConditions().create();
			condition.setAlias("Direction");
			condition.setValue(direction);
			if (documentIndex != null) {
				condition = criteria.getConditions().create();
				condition.setAlias("BaseDocumentIndex");
				condition.setValue(documentIndex);
			}
			journal = this.fetchBeAffected(journalType, criteria);
			if (journal == null || journal.isNew() || !journal.isSavable()) {
				try {
					J[] journals = this.getTransaction().fetch(journalType, criteria);
					if (journals != null) {
						for (J existing : journals) {
							if (!existing.isNew() && existing.isSavable()) {
								journal = existing;
								break;
							}
						}
					}
				} catch (Exception e) {
					throw new BusinessLogicException(e.getMessage(), e);
				}
			}
		}
		if (journal != null && !journal.isNew() && journal.isSavable()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_costed_document_inventory_operation_cannot_change",
					BOIdentifierBuilder.document(documentType, documentEntry, documentLineId).build()));
		}
	}

	/**
	 * 从旧契约一侧检查新单据仍包含同一库存业务，防止切换来源后新成本契约不再生成。
	 */
	protected final <C extends IBusinessLogicContract> void checkCostContractPresence(IBusinessObject journal,
			Class<C> contractType, Predicate<C> identity, String documentType, Integer documentEntry,
			Integer documentLineId) {
		if (!this.isEnableMaterialCosts() || journal.isNew() || this.getHost() == null) {
			return;
		}
		IBusinessObject current = this.findCurrentCostHost((IBusinessObject) this.getTrigger(), this.getHost());
		IBusinessLogicContract[] contracts = current instanceof IBusinessLogicsHost
				? ((IBusinessLogicsHost) current).getContracts() : null;
		if (contracts != null) {
			for (IBusinessLogicContract candidate : contracts) {
				if (contractType.isInstance(candidate) && identity.test(contractType.cast(candidate))) {
					return;
				}
			}
		}
		throw new BusinessLogicException(I18N.prop("msg_mm_costed_document_inventory_operation_cannot_change",
				BOIdentifierBuilder.document(documentType, documentEntry, documentLineId).build()));
	}

	/**
	 * 过账日期按数据库 DATE 精度冻结，不能将历史成本转移到其他日期或期间。
	 */
	protected final void checkCostPostingDate(DateTime original, DateTime current, String documentType,
			Integer documentEntry, Integer documentLineId) {
		original = original == null ? DateTimes.defaultValue() : original;
		current = current == null ? DateTimes.defaultValue() : current;
		if (!DateTimes.getDateOnly(original).equals(DateTimes.getDateOnly(current))) {
			throw new BusinessLogicException(I18N.prop("msg_mm_costed_document_posting_date_cannot_change",
					BOIdentifierBuilder.document(documentType, documentEntry, documentLineId).build()));
		}
	}

	/**
	 * 已生效的成本流水不能因删除单据或退回审批而直接移除，零成本也需要保护。
	 */
	protected final void checkCostJournalDeletion(IBusinessObject journal, String documentType,
			Integer documentEntry, Integer documentLineId) {
		if (!this.isEnableMaterialCosts() || journal.isNew()) {
			return;
		}
		Object trigger = this.getTrigger();
		boolean deleting = trigger instanceof ITrackable && ((ITrackable) trigger).isDeleted();
		if (trigger instanceof IApprovalData) {
			emApprovalStatus approvalStatus = ((IApprovalData) trigger).getApprovalStatus();
			deleting = deleting || !(approvalStatus == emApprovalStatus.APPROVED
					|| approvalStatus == emApprovalStatus.UNAFFECTED);
		}
		if (deleting) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_document_completed_material_cost_calculation_not_support_operation",
							BOIdentifierBuilder.document(documentType, documentEntry, documentLineId).build()));
		}
	}

	/**
	 * 审批引擎可能在反向逻辑之后重新启动审批，正向成本逻辑必须再次检查最终状态。
	 * 仅对可保存的成本流水调用，未入账的待审批单据仍使用不可保存的临时流水。
	 */
	protected final void checkCostApprovalStatus(String documentType, Integer documentEntry, Integer documentLineId) {
		Object trigger = this.getTrigger();
		if (trigger instanceof IApprovalData) {
			emApprovalStatus status = ((IApprovalData) trigger).getApprovalStatus();
			if (status != emApprovalStatus.APPROVED && status != emApprovalStatus.UNAFFECTED) {
				throw new BusinessLogicException(I18N.prop("msg_mm_costed_document_not_support_reapproval",
						BOIdentifierBuilder.document(documentType, documentEntry, documentLineId).build()));
			}
		}
	}

	/**
	 * 未指定币种按本位币处理，与入库成本计算的口径保持一致。
	 */
	protected final boolean areCostCurrenciesEqual(String first, String second, String localCurrency) {
		first = Strings.isNullOrEmpty(first) ? localCurrency : first;
		second = Strings.isNullOrEmpty(second) ? localCurrency : second;
		return Strings.equalsIgnoreCase(first, second);
	}

	/**
	 * 按流水存储精度冻结汇率，保留零值及正负号的区别。
	 * 本位币的默认汇率 0 与 1 均不改变成本。
	 */
	protected final boolean areCostRatesEqual(BigDecimal first, BigDecimal second, String currency, String localCurrency) {
		if (this.areCostCurrenciesEqual(currency, localCurrency, localCurrency)) {
			first = first.signum() == 0 ? BigDecimal.ONE : first;
			second = second.signum() == 0 ? BigDecimal.ONE : second;
		}
		return first.signum() == second.signum() && Decimals.round(first, Decimals.DECIMAL_PLACES_STORAGE)
				.compareTo(Decimals.round(second, Decimals.DECIMAL_PLACES_STORAGE)) == 0;
	}

	/**
	 * 旧调拨入库可能以外币记录已经是本位币的出库成本。仅在原换算结果、历史成本与
	 * 本次回传成本完全一致时兼容币种归一化，并由调用方保留历史币种及汇率。
	 */
	protected final boolean canPreserveTransferCostCurrency(String documentType, emDirection direction,
			String currency, BigDecimal rate, BigDecimal price, BigDecimal calculatedPrice,
			String currentCurrency, BigDecimal currentRate, BigDecimal currentPrice, String localCurrency) {
		if (!MyConfiguration.applyVariables(InventoryTransfer.BUSINESS_OBJECT_CODE).equals(documentType)
				|| direction != emDirection.IN || this.areCostCurrenciesEqual(currency, localCurrency, localCurrency)
				|| !this.areCostCurrenciesEqual(currentCurrency, localCurrency, localCurrency)
				|| currentRate == null || !this.areCostRatesEqual(currentRate, BigDecimal.ONE, localCurrency, localCurrency)
				|| rate == null || rate.signum() <= 0 || price == null || price.signum() < 0
				|| calculatedPrice == null || currentPrice == null) {
			return false;
		}
		return this.areCostPricesEqual(price, currentPrice) && this.areCostPricesEqual(calculatedPrice, currentPrice)
				&& this.areCostPricesEqual(Decimals.multiply(price, rate), calculatedPrice);
	}

	/**
	 * 查询历史冲销流水，禁止已经冲销的成本单据重新生效。
	 */
	protected final <J extends IBusinessObject> J fetchCostOffsettingJournal(Class<J> journalType,
			String documentType, Integer documentEntry, Integer documentLineId, emDirection direction,
			Integer documentIndex) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias("BaseDocumentType");
		condition.setValue(documentType);
		condition = criteria.getConditions().create();
		condition.setAlias("BaseDocumentEntry");
		condition.setValue(documentEntry);
		condition = criteria.getConditions().create();
		condition.setAlias("BaseDocumentLineId");
		condition.setValue(documentLineId);
		condition = criteria.getConditions().create();
		condition.setAlias("Direction");
		condition.setValue(direction);
		if (documentIndex != null) {
			condition = criteria.getConditions().create();
			condition.setAlias("BaseDocumentIndex");
			condition.setValue(documentIndex);
		}
		condition = criteria.getConditions().create();
		condition.setAlias("DataSource");
		condition.setValue(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		J journal = this.fetchBeAffected(journalType, criteria);
		if (journal == null) {
			try {
				J[] journals = this.getTransaction().fetch(journalType, criteria);
				journal = journals == null || journals.length == 0 ? null : journals[0];
			} catch (Exception e) {
				throw new BusinessLogicException(e.getMessage(), e);
			}
		}
		return journal;
	}

	protected IWarehouse checkWarehouse(String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Warehouse.PROPERTY_CODE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setBracketOpen(1);
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setValue(emYesNo.YES);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setValue(emYesNo.NO);
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setRelationship(ConditionRelationship.OR);
		condition = criteria.getConditions().create();
		condition.setBracketClose(1);
		condition.setAlias(Warehouse.PROPERTY_DELETED.getName());
		condition.setOperation(ConditionOperation.IS_NULL);
		condition.setRelationship(ConditionRelationship.OR);
		IWarehouse warehouse = this.fetchBeAffected(IWarehouse.class, criteria);
		if (warehouse == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IWarehouse> operationResult = boRepository.fetchWarehouse(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				warehouse = operationResult.getResultObjects().firstOrDefault();
			}
		}
		// 仓库不存在
		if (warehouse == null) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_warehouse_is_not_exist", whsCode == null ? "" : whsCode));
		}
		// 检查仓库可用状态
		if (warehouse.getActivated() == emYesNo.NO || warehouse.getDeleted() == emYesNo.YES) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_warehouse_is_unavailable", warehouse.getCode(), warehouse.getName()));
		}
		return warehouse;
	}

	protected IMaterialInventory checkMaterialInventory(String itemCode, String whsCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialInventory materialInventory = this.fetchBeAffected(IMaterialInventory.class, criteria);
		if (materialInventory == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialInventory> operationResult = boRepository.fetchMaterialInventory(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialInventory = operationResult.getResultObjects().firstOrDefault();
			}
		}
		return materialInventory;
	}

	protected IMaterialBatch checkMaterialBatch(String itemCode, String whsCode, String batchCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatch.PROPERTY_BATCHCODE.getName());
		condition.setValue(batchCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialBatch materialInventory = this.fetchBeAffected(IMaterialBatch.class, criteria);
		if (materialInventory == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialBatch> operationResult = boRepository.fetchMaterialBatch(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialInventory = operationResult.getResultObjects().firstOrDefault();
			}
		}
		return materialInventory;
	}

	protected IMaterialSerial checkMaterialSerial(String itemCode, String whsCode, String serialCode) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_ITEMCODE.getName());
		condition.setValue(itemCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_WAREHOUSE.getName());
		condition.setValue(whsCode);
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialSerial.PROPERTY_SERIALCODE.getName());
		condition.setValue(serialCode);
		condition.setOperation(ConditionOperation.EQUAL);
		IMaterialSerial materialInventory = this.fetchBeAffected(IMaterialSerial.class, criteria);
		if (materialInventory == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialSerial> operationResult = boRepository.fetchMaterialSerial(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialInventory = operationResult.getResultObjects().firstOrDefault();
			}
		}
		return materialInventory;
	}

	/**
	 * 检查数据状态（需要与底层一致）
	 * 
	 * @param data  检查的数据
	 * @param skips 跳过检查的类型
	 * @return 有效，true；无效，false
	 */
	protected boolean checkDataStatus(Object data, Class<?>... skips) {
		if (data instanceof ITrackable) {
			// 标记删除的数据无效
			ITrackable status = (ITrackable) data;
			if (status.isDeleted()) {
				if (!Arrays.asList(skips).contains(ITrackable.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBOTagDeleted) {
			// 引用数据，已标记删除的，不影响业务逻辑
			IBOTagDeleted refData = (IBOTagDeleted) data;
			if (refData.getDeleted() == emYesNo.YES) {
				if (!Arrays.asList(skips).contains(IBOTagDeleted.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBOTagCanceled) {
			// 引用数据，已标记取消的，不影响业务逻辑
			IBOTagCanceled refData = (IBOTagCanceled) data;
			if (refData.getCanceled() == emYesNo.YES) {
				if (!Arrays.asList(skips).contains(IBOTagCanceled.class)) {
					return false;
				}
			}
		}
		if (data instanceof IApprovalData) {
			// 审批数据
			IApprovalData apData = (IApprovalData) data;
			if (apData.getApprovalStatus() == emApprovalStatus.CANCELLED
					|| apData.getApprovalStatus() == emApprovalStatus.PROCESSING
					|| apData.getApprovalStatus() == emApprovalStatus.REJECTED
					|| apData.getApprovalStatus() == emApprovalStatus.RETURNED) {
				// 审批中，取消，拒绝，退回
				if (!Arrays.asList(skips).contains(IApprovalData.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBODocument) {
			// 单据类型
			IBODocument docData = (IBODocument) data;
			if (docData.getDocumentStatus() == emDocumentStatus.PLANNED) {
				// 计划状态
				if (!Arrays.asList(skips).contains(IBODocument.class)) {
					return false;
				}
			}
		}
		if (data instanceof IBODocumentLine) {
			// 单据行
			IBODocumentLine lineData = (IBODocumentLine) data;
			if (lineData.getLineStatus() == emDocumentStatus.PLANNED) {
				// 计划状态
				if (!Arrays.asList(skips).contains(IBODocumentLine.class)) {
					return false;
				}
			}
		}
		return true;
	}
}
