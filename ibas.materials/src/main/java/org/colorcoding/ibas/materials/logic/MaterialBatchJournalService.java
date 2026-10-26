package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.Objects;

import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.bo.BOIdentifierBuilder;
import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.ITrackable;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.data.emValuationMethod;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialBatchJournalContract.class)
public class MaterialBatchJournalService
		extends MaterialInventoryBusinessLogic<IMaterialBatchJournalContract, IMaterialBatchJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialBatchJournalContract) {
			IMaterialBatchJournalContract contract = (IMaterialBatchJournalContract) data;
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES || material.getPhantomItem() == emYesNo.YES
					|| material.getInventoryItem() == emYesNo.NO) {
				this.checkCostMaterialSkip(MaterialBatchJournal.class, contract.getDocumentType(), contract.getDocumentEntry(),
						contract.getDocumentLineId(), contract.getDirection(), contract.getDocumentIndex());
			}
			if (material.getItemType() == emItemType.SERVICES) {
				// 服务物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "ItemType",
						material.getItemType());
				return false;
			}
			if (material.getPhantomItem() == emYesNo.YES) {
				// 虚拟物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"PhantomItem", material.getPhantomItem());
				return false;
			}
			if (material.getInventoryItem() == emYesNo.NO) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				// 非库存物料，不执行此逻辑
				return false;
			}
			if (!Strings.isNullOrEmpty(material.getInventoryUOM()) && !Strings.isNullOrEmpty(contract.getUOM())) {
				// 检查库存单位是否一致
				if (!material.getInventoryUOM().equalsIgnoreCase(contract.getUOM())) {
					throw new BusinessLogicException(I18N.prop("msg_mm_material_batch_uom_is_not_same_material_setting",
							contract.getBatchCode(), contract.getItemCode()));
				}
			}
			// 非批次移动平均，不计算成本
			if (material.getBatchManagement() == emYesNo.YES) {
				if (material.getValuationMethod() == emValuationMethod.BATCH_MOVING_AVERAGE) {
					this.setEnableMaterialCosts(true);
					// 全局未开启，则也未开启
					if (!MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ENABLE_MATERIAL_COSTS, false)) {
						this.setEnableMaterialCosts(false);
					}
				} else {
					// 非批次移动平均，批次不计算成本（成本由仓库级管理）
					this.setEnableMaterialCosts(false);
				}
			}
		}
		boolean status = super.checkDataStatus(data);
		if (status == false && this.isEnableMaterialCosts()) {
			// 激活成本计算时，正向逻辑都执行
			status = true;
		}
		return status;
	}

	@Override
	protected IMaterialBatchJournal fetchBeAffected(IMaterialBatchJournalContract contract) {
		// 检查物料批次记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDirection());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTINDEX.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentIndex());
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 计算成本，且取消逻辑
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		} else {
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setRelationship(ConditionRelationship.OR);
			condition = criteria.getConditions().create();
			condition.setBracketClose(1);
			condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(Strings.VALUE_EMPTY);
			condition.setRelationship(ConditionRelationship.OR);
		}

		IMaterialBatchJournal materialBatchJournal = this.fetchBeAffected(IMaterialBatchJournal.class, criteria);
		if (materialBatchJournal == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialBatchJournal> operationResult = boRepository
						.fetchMaterialBatchJournal(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialBatchJournal = operationResult.getResultObjects().firstOrDefault();
			}
		}
		if (materialBatchJournal == null) {
			if (!this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 非成本流水已在首次取消时删除，重复保存无需生成空流水。
				MaterialBatchJournal skipped = new MaterialBatchJournal();
				skipped.unsavable();
				skipped.markOld();
				return skipped;
			}
			if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 取消的，查正向
				condition.setBracketOpen(1);
				condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition.setRelationship(ConditionRelationship.OR);
				condition = criteria.getConditions().create();
				condition.setBracketClose(1);
				condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(Strings.VALUE_EMPTY);
				condition.setRelationship(ConditionRelationship.OR);
				materialBatchJournal = this.fetchBeAffected(IMaterialBatchJournal.class, criteria);
				if (materialBatchJournal == null) {
					try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
						boRepository.setTransaction(this.getTransaction());
						IOperationResult<IMaterialBatchJournal> operationResult = boRepository
								.fetchMaterialBatchJournal(criteria);
						if (operationResult.getError() != null) {
							throw new BusinessLogicException(operationResult.getError());
						}
						materialBatchJournal = operationResult.getResultObjects().firstOrDefault();
					}
				}
				if (materialBatchJournal == null) {
					materialBatchJournal = new MaterialBatchJournal();
					((MaterialBatchJournal) materialBatchJournal).unsavable();
					materialBatchJournal.setDirection(contract.getDirection());
					materialBatchJournal.setBaseDocumentType(contract.getDocumentType());
					materialBatchJournal.setBaseDocumentEntry(contract.getDocumentEntry());
					materialBatchJournal.setBaseDocumentLineId(contract.getDocumentLineId());
					materialBatchJournal.setBaseDocumentIndex(contract.getDocumentIndex());
					materialBatchJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
				} else {
					materialBatchJournal = BOUtilities.clone(materialBatchJournal);
					materialBatchJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
					materialBatchJournal.setQuantity(Decimals.negate(materialBatchJournal.getQuantity()));
					materialBatchJournal.setTransactionValue(Decimals.negate(materialBatchJournal.getTransactionValue()));
				}
			} else {
				materialBatchJournal = new MaterialBatchJournal();
				materialBatchJournal.setDirection(contract.getDirection());
				materialBatchJournal.setBaseDocumentType(contract.getDocumentType());
				materialBatchJournal.setBaseDocumentEntry(contract.getDocumentEntry());
				materialBatchJournal.setBaseDocumentLineId(contract.getDocumentLineId());
				materialBatchJournal.setBaseDocumentIndex(contract.getDocumentIndex());
				materialBatchJournal.setDataSource(DATASOURCE_SIGN_REGULAR_JOURNAL);
			}
		}
		if (this.isEnableMaterialCosts() && !contract.isOffsetting() && !materialBatchJournal.isNew()) {
			// 已有冲销记录的成本单据不能重新生效，避免回删历史冲销或重复使用旧成本。
			IMaterialBatchJournal offsettingJournal = this.fetchCostOffsettingJournal(MaterialBatchJournal.class,
					contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId(),
					contract.getDirection(), contract.getDocumentIndex());
			if (offsettingJournal != null) {
				throw new BusinessLogicException(I18N.prop("msg_mm_costed_document_not_support_reactivation",
						BOIdentifierBuilder.document(contract.getDocumentType(), contract.getDocumentEntry(),
								contract.getDocumentLineId()).build()));
			}
		}
		return materialBatchJournal;
	}

	@Override
	protected void impact(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		// 不可保存对象，不执行逻辑
		if (!materialBatchJournal.isSavable()) {
			return;
		}
		boolean preserveCostCurrency = false;
		// 开启物料成本计算
		if (this.isEnableMaterialCosts()) {
			this.checkCostApprovalStatus(contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId());
			String localCurrency = org.colorcoding.ibas.accounting.MyConfiguration
					.getConfigValue(org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY);
			if (!materialBatchJournal.isNew() || (contract.isOffsetting() && materialBatchJournal.isNew())) {
				// 更新的或取消的
				preserveCostCurrency = this.canPreserveTransferCostCurrency(contract.getDocumentType(), contract.getDirection(),
						materialBatchJournal.getCurrency(), materialBatchJournal.getRate(), materialBatchJournal.getPrice(),
						materialBatchJournal.getCalculatedPrice(), contract.getCurrency(), contract.getRate(), contract.getPrice(), localCurrency);
				this.checkCostPostingDate(materialBatchJournal.getPostingDate(), contract.getPostingDate(),
						contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId());
				// 普通出库按库存成本计价，交易价格、币种和汇率不影响成本。
				boolean checkTransactionPrice = contract.getDirection() != emDirection.OUT
						|| this.isBaseDocumentCost(contract.getPrice());
				if (!materialBatchJournal.getItemCode().equals(contract.getItemCode())
						|| this.isBaseDocumentCost(materialBatchJournal.getPrice()) != this.isBaseDocumentCost(contract.getPrice())
						|| !materialBatchJournal.getWarehouse().equals(contract.getWarehouse())
						|| !Objects.equals(materialBatchJournal.getOriginalDocumentType(),
								contract.getBaseDocumentType() == null ? Strings.VALUE_EMPTY : contract.getBaseDocumentType())
						|| !Objects.equals(materialBatchJournal.getOriginalDocumentEntry(),
								contract.getBaseDocumentEntry() == null ? 0 : contract.getBaseDocumentEntry())
						|| !Objects.equals(materialBatchJournal.getOriginalDocumentLineId(),
								contract.getBaseDocumentLineId() == null ? 0 : contract.getBaseDocumentLineId())
						|| !materialBatchJournal.getBatchCode().equals(contract.getBatchCode())
						|| !this.areCostQuantitiesEqual(materialBatchJournal.getQuantity().abs(), contract.getQuantity())
						|| (checkTransactionPrice && contract.getPrice() != null && materialBatchJournal.getPrice() != null
								&& !this.areCostPricesEqual(materialBatchJournal.getPrice(), contract.getPrice()))
						|| (checkTransactionPrice && !preserveCostCurrency && contract.getCurrency() != null
								&& !this.areCostCurrenciesEqual(materialBatchJournal.getCurrency(), contract.getCurrency(), localCurrency))
						|| (checkTransactionPrice && !preserveCostCurrency && contract.getRate() != null && materialBatchJournal.getRate() != null
								&& !this.areCostRatesEqual(materialBatchJournal.getRate(), contract.getRate(), materialBatchJournal.getCurrency(), localCurrency))) {
					// 修改物料、仓库、成本来源或价格，影响成本计算，不允许
					throw new BusinessLogicException(
							I18N.prop(
									"msg_mm_document_completed_material_cost_calculation_not_support_operation",
									BOIdentifierBuilder.document(materialBatchJournal.getBaseDocumentType(),
											materialBatchJournal.getBaseDocumentEntry(),
											materialBatchJournal.getBaseDocumentLineId()).build()));
				}
			}
			// 仅新建时（首次）计算成本
			if (materialBatchJournal.isNew()) {
				// 交易币转为本位币
				if (!Strings.isNullOrEmpty(contract.getCurrency())) {
					if (!contract.getCurrency().equalsIgnoreCase(localCurrency)) {
						// 非本币
						if (contract.getRate() == null || Decimals.VALUE_ZERO.compareTo(contract.getRate()) >= 0) {
							// 未设置有效汇率
							throw new BusinessLogicException(
									I18N.prop("msg_mm_document_no_valid_exchange_rate_specified",
									BOIdentifierBuilder.document(materialBatchJournal.getBaseDocumentType(),
											materialBatchJournal.getBaseDocumentEntry(),
											materialBatchJournal.getBaseDocumentLineId()).build()));
						}
					} else {
						// 本币
						if (contract.getRate() != null && Decimals.VALUE_ZERO.compareTo(contract.getRate()) != 0
								&& Decimals.VALUE_ONE.compareTo(contract.getRate()) != 0) {
							// 汇率不是1
							throw new BusinessLogicException(
									I18N.prop("msg_mm_document_no_valid_exchange_rate_specified",
										BOIdentifierBuilder.document(materialBatchJournal.getBaseDocumentType(),
												materialBatchJournal.getBaseDocumentEntry(),
												materialBatchJournal.getBaseDocumentLineId()).build()));
						}
					}
				}
				// 查询时点库存及价值
				BigDecimal inventoryValue = Decimals.VALUE_ZERO;
				BigDecimal inventoryQuantity = Decimals.VALUE_ZERO;
				BigDecimal calculatedPrice = Decimals.VALUE_ZERO;
				IMaterialBatch materialBatch = this.checkMaterialBatch(contract.getItemCode(), contract.getWarehouse(),
						contract.getBatchCode());
				if (materialBatch != null) {
					// 库存价值 = 当前仓库库存价值
					inventoryQuantity = materialBatch.getQuantity();
					inventoryValue = materialBatch.getInventoryValue();
					calculatedPrice = materialBatch.getAvgPrice();
				}
				// 根据情况调整价格
				if (contract.getDirection() == emDirection.OUT && contract.isOffsetting()) {
					// 出库的取消，价格使用出库价格
					calculatedPrice = materialBatchJournal.getCalculatedPrice();
				} else if (contract.getDirection() == emDirection.IN && !contract.isOffsetting()) {
					// 入库，使用单据价格
					calculatedPrice = contract.getPrice();
					if (calculatedPrice == null) {
						calculatedPrice = Decimals.VALUE_ZERO;
					}
					if (contract.getRate() != null && !Decimals.isZero(contract.getRate())) {
						calculatedPrice = Decimals.multiply(calculatedPrice, contract.getRate());
					}
				}
				// 价格小于0，通过基于单据查询
				if (contract.getPrice().compareTo(Decimals.VALUE_ZERO) < 0) {
					Criteria criteria = new Criteria();
					criteria.setResultCount(1);
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
					condition.setValue(contract.getBaseDocumentType());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
					condition.setValue(contract.getBaseDocumentEntry());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
					condition.setValue(contract.getBaseDocumentLineId());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_QUANTITY.getName());
					condition.setOperation(ConditionOperation.GREATER_EQUAL);
					condition.setValue(Decimals.VALUE_ZERO);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_DATASOURCE.getName());
					condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
					condition.setValue(contract.getBatchCode());
					try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
						boRepository.setTransaction(this.getTransaction());
						IOperationResult<IMaterialBatchJournal> operationResult = boRepository
								.fetchMaterialBatchJournal(criteria);
						if (operationResult.getError() != null) {
							throw new BusinessLogicException(operationResult.getError());
						}
						if (operationResult.getResultObjects().isEmpty()) {
							throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_receipt_journal",
									BOIdentifierBuilder.document(contract.getBaseDocumentType(), contract.getBaseDocumentEntry(),
											contract.getBaseDocumentLineId()).build()));
						}
						for (IMaterialBatchJournal item : operationResult.getResultObjects()) {
							calculatedPrice = item.getCalculatedPrice();
						}
					}
				}
				if (calculatedPrice == null || calculatedPrice.compareTo(Decimals.VALUE_ZERO) < 0) {
					throw new BusinessLogicException(
							I18N.prop("msg_mm_document_material_price_invalid", contract.getIdentifiers()));
				}
				// 加载内存中数据（同单同物料）
				Criteria criteria = new Criteria();
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_ITEMCODE.getName());
				condition.setValue(contract.getItemCode());
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_WAREHOUSE.getName());
				condition.setValue(contract.getWarehouse());
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialBatchJournal.PROPERTY_BATCHCODE.getName());
				condition.setValue(contract.getBatchCode());
				for (IMaterialBatchJournal item : this.fetchBeAffectedInCaches(IMaterialBatchJournal.class, criteria,
						true)) {
					if (item == materialBatchJournal) {
						continue;
					}
					if (item.getDirection() != contract.getDirection()) {
						continue;
					}
					if (contract.isOffsetting() && Decimals.VALUE_ZERO.compareTo(item.getQuantity()) < 0) {
						continue;
					} else if (!contract.isOffsetting() && Decimals.VALUE_ZERO.compareTo(item.getQuantity()) > 0) {
						continue;
					}
					if (contract.getDirection() == emDirection.IN) {
						// 增加，其他行的量
						inventoryQuantity = inventoryQuantity.add(item.getQuantity());
						inventoryValue = inventoryValue.add(item.getTransactionValue());
					} else if (contract.getDirection() == emDirection.OUT) {
						// 减少，其他行的量
						inventoryQuantity = inventoryQuantity.subtract(item.getQuantity());
						inventoryValue = inventoryValue.subtract(item.getTransactionValue());
					}
				}
				// 记录时点库存及价值
				materialBatchJournal.setInventoryQuantity(inventoryQuantity);
				materialBatchJournal.setInventoryValue(inventoryValue);
				materialBatchJournal.setCalculatedPrice(calculatedPrice);
				// 本次交易价值 = 本次入库价格 * 本次入库数量
				materialBatchJournal.setTransactionValue(Decimals.multiply(calculatedPrice, contract.getQuantity()));
				// 取消则负数
				if (contract.isOffsetting()) {
					materialBatchJournal.setTransactionValue(materialBatchJournal.getTransactionValue().negate());
				}
			}
			// 新建和已有流水均回传成本；已有流水沿用历史计算结果。
			contract.onCalculatedCostPrice(materialBatchJournal.getCalculatedPrice());
		} else {
			// 不计算物料成本
			materialBatchJournal.setCalculatedPrice(Decimals.VALUE_ZERO);
			materialBatchJournal.setInventoryQuantity(Decimals.VALUE_ZERO);
			materialBatchJournal.setInventoryValue(Decimals.VALUE_ZERO);
			if (contract.isOffsetting() && !materialBatchJournal.isNew()) {
				// 非新建的抵消逻辑，删除
				materialBatchJournal.delete();
			}
		}
		// 赋值
		if (!contract.isOffsetting()) {
			// 非取消逻辑
			materialBatchJournal.setItemCode(contract.getItemCode());
			materialBatchJournal.setWarehouse(contract.getWarehouse());
			materialBatchJournal.setBatchCode(contract.getBatchCode());
			materialBatchJournal.setPostingDate(contract.getPostingDate());
			materialBatchJournal.setDocumentDate(contract.getDocumentDate());
			materialBatchJournal.setDeliveryDate(contract.getDeliveryDate());
			materialBatchJournal.setQuantity(contract.getQuantity());
			// 保留负号，标识使用基础单据成本。
			materialBatchJournal.setPrice(contract.getPrice() != null ? contract.getPrice() : Decimals.VALUE_ZERO);
			if (!preserveCostCurrency) {
				materialBatchJournal.setCurrency(contract.getCurrency());
				materialBatchJournal.setRate(contract.getRate());
			}
			materialBatchJournal.setOriginalDocumentType(contract.getBaseDocumentType());
			materialBatchJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
			materialBatchJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		} else {
			materialBatchJournal.setPostingDate(contract.getPostingDate());
			materialBatchJournal.setDocumentDate(contract.getDocumentDate());
			materialBatchJournal.setDeliveryDate(contract.getDeliveryDate());
		}
	}

	@Override
	protected void revoke(IMaterialBatchJournalContract contract) {
		IMaterialBatchJournal materialBatchJournal = this.getBeAffected();
		// 不可保存对象，不执行逻辑
		if (!materialBatchJournal.isSavable()) {
			return;
		}
		this.checkCostContractPresence(materialBatchJournal, IMaterialBatchJournalContract.class,
				candidate -> Objects.equals(candidate.getDocumentType(), contract.getDocumentType())
						&& Objects.equals(candidate.getDocumentEntry(), contract.getDocumentEntry())
						&& Objects.equals(candidate.getDocumentLineId(), contract.getDocumentLineId())
						&& candidate.getDirection() == contract.getDirection()
						&& Objects.equals(candidate.getDocumentIndex(), contract.getDocumentIndex()),
				contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId());
		this.checkCostJournalDeletion(materialBatchJournal, contract.getDocumentType(),
				contract.getDocumentEntry(), contract.getDocumentLineId());
		if (this.isEnableMaterialCosts()) {
			// 兼容旧流水：从旧单据契约恢复价格符号，价格绝对值保持不变。
			BigDecimal price = materialBatchJournal.getPrice();
			if (price != null) {
				materialBatchJournal.setPrice(this.isBaseDocumentCost(contract.getPrice()) ? price.abs().negate() : price.abs());
			}
		}
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 成本冲销也是历史记录，重复保存或恢复操作均不能直接删除。
			return;
		}
		if (!this.isEnableMaterialCosts()) {
			// 未开启成本的，删除
			materialBatchJournal.delete();
		} else if (this.getTrigger() instanceof ITrackable && ((ITrackable) this.getTrigger()).isDeleted() == true) {
			// 触发对象删除（正向逻辑不被执行），删除
			materialBatchJournal.delete();
		} else if (this.getTrigger() instanceof IApprovalData) {
			// 重新进入审批的数据，删除
			IApprovalData approvalData = (IApprovalData) this.getTrigger();
			if (!(approvalData.getApprovalStatus() == emApprovalStatus.APPROVED
					|| approvalData.getApprovalStatus() == emApprovalStatus.UNAFFECTED)) {
				materialBatchJournal.delete();
			}
		}
	}

}
