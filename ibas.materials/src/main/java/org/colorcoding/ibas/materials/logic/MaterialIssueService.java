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
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialIssueContract.class)
public class MaterialIssueService
		extends MaterialInventoryBusinessLogic<IMaterialIssueContract, IMaterialInventoryJournal> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialIssueContract) {
			IMaterialIssueContract contract = (IMaterialIssueContract) data;
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES || material.getPhantomItem() == emYesNo.YES
					|| material.getInventoryItem() == emYesNo.NO) {
				this.checkCostMaterialSkip(MaterialInventoryJournal.class, contract.getDocumentType(), contract.getDocumentEntry(),
						contract.getDocumentLineId(), emDirection.OUT, null);
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
					throw new BusinessLogicException(I18N.prop("msg_mm_document_uom_is_not_same_material_setting",
							contract.getIdentifiers(), contract.getItemCode()));
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
	protected IMaterialInventoryJournal fetchBeAffected(IMaterialIssueContract contract) {
		// 检查物料
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getBatchManagement() != contract.getBatchManagement()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_batchmanagement_is_not_same_material_setting",
					contract.getIdentifiers(), contract.getItemCode()));
		}
		if (material.getSerialManagement() != contract.getSerialManagement()) {
			throw new BusinessLogicException(I18N.prop("msg_mm_document_serialmanagement_is_not_same_material_setting",
					contract.getIdentifiers(), contract.getItemCode()));
		}
		// 检查仓库
		this.checkWarehouse(contract.getWarehouse());
		// 检查物料发货记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentType());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(contract.getDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryJournal.PROPERTY_DIRECTION.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(emDirection.OUT);
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 计算成本，且取消逻辑
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
		} else {
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setRelationship(ConditionRelationship.OR);
			condition = criteria.getConditions().create();
			condition.setBracketClose(1);
			condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(Strings.VALUE_EMPTY);
			condition.setRelationship(ConditionRelationship.OR);
		}

		IMaterialInventoryJournal materialJournal = this.fetchBeAffected(IMaterialInventoryJournal.class, criteria);
		if (materialJournal == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
						.fetchMaterialInventoryJournal(criteria);
				if (operationResult.getError() != null) {
					throw new BusinessLogicException(operationResult.getError());
				}
				materialJournal = operationResult.getResultObjects().firstOrDefault();
			}
		}
		if (materialJournal == null) {
			if (!this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 非成本流水已在首次取消时删除，重复保存无需生成空流水。
				MaterialInventoryJournal skipped = new MaterialInventoryJournal();
				skipped.unsavable();
				skipped.markOld();
				return skipped;
			}
			if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
				// 取消的，查正向
				condition.setBracketOpen(1);
				condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition.setRelationship(ConditionRelationship.OR);
				condition = criteria.getConditions().create();
				condition.setBracketClose(1);
				condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(Strings.VALUE_EMPTY);
				condition.setRelationship(ConditionRelationship.OR);
				materialJournal = this.fetchBeAffected(IMaterialInventoryJournal.class, criteria);
				if (materialJournal == null) {
					try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
						boRepository.setTransaction(this.getTransaction());
						IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
								.fetchMaterialInventoryJournal(criteria);
						if (operationResult.getError() != null) {
							throw new BusinessLogicException(operationResult.getError());
						}
						materialJournal = operationResult.getResultObjects().firstOrDefault();
					}
				}
				if (materialJournal == null) {
					materialJournal = new MaterialInventoryJournal();
					((MaterialInventoryJournal) materialJournal).unsavable();
					materialJournal.setBaseDocumentType(contract.getDocumentType());
					materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
					materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
					materialJournal.setDirection(emDirection.OUT);
					materialJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
				} else {
					materialJournal = BOUtilities.clone(materialJournal);
					materialJournal.setDataSource(DATASOURCE_SIGN_OFFSETTING_JOURNAL);
					materialJournal.setQuantity(Decimals.negate(materialJournal.getQuantity()));
					materialJournal.setTransactionValue(Decimals.negate(materialJournal.getTransactionValue()));
				}
			} else {
				materialJournal = new MaterialInventoryJournal();
				materialJournal.setBaseDocumentType(contract.getDocumentType());
				materialJournal.setBaseDocumentEntry(contract.getDocumentEntry());
				materialJournal.setBaseDocumentLineId(contract.getDocumentLineId());
				materialJournal.setDirection(emDirection.OUT);
				materialJournal.setDataSource(DATASOURCE_SIGN_REGULAR_JOURNAL);
			}
		}
		if (this.isEnableMaterialCosts() && !contract.isOffsetting() && !materialJournal.isNew()) {
			// 已有冲销记录的成本单据不能重新生效，避免回删历史冲销或重复使用旧成本。
			IMaterialInventoryJournal offsettingJournal = this.fetchCostOffsettingJournal(MaterialInventoryJournal.class,
					contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId(),
					emDirection.OUT, null);
			if (offsettingJournal != null) {
				throw new BusinessLogicException(I18N.prop("msg_mm_costed_document_not_support_reactivation",
						BOIdentifierBuilder.document(contract.getDocumentType(), contract.getDocumentEntry(),
								contract.getDocumentLineId()).build()));
			}
		}
		return materialJournal;
	}

	@Override
	protected void impact(IMaterialIssueContract contract) {
		if (contract.getQuantity().compareTo(Decimals.VALUE_ZERO) < 0) {
			throw new BusinessLogicException(
					I18N.prop("msg_mm_document_material_quantity_invalid", contract.getIdentifiers()));

		}
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getVersionManagement() == emYesNo.YES) {
			if (Strings.isNullOrEmpty(contract.getItemVersion())) {
				throw new BusinessLogicException(
						I18N.prop("msg_mm_document_not_specified_material_version", contract.getIdentifiers()));
			}
		}
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		// 不可保存对象，不执行逻辑
		if (!materialJournal.isSavable()) {
			return;
		}
		// 开启物料成本计算
		if (this.isEnableMaterialCosts()) {
			this.checkCostApprovalStatus(contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId());
			String localCurrency = org.colorcoding.ibas.accounting.MyConfiguration
					.getConfigValue(org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY);
			if (!materialJournal.isNew() || (contract.isOffsetting() && materialJournal.isNew())) {
				// 更新的或取消的
				this.checkCostPostingDate(materialJournal.getPostingDate(), contract.getPostingDate(),
						contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId());
				// 普通出库按库存成本计价，交易价格、币种和汇率不影响成本。
				boolean checkTransactionPrice = this.isBaseDocumentCost(contract.getPrice());
				if (!materialJournal.getItemCode().equals(contract.getItemCode())
						|| this.isBaseDocumentCost(materialJournal.getPrice()) != this.isBaseDocumentCost(contract.getPrice())
						|| !materialJournal.getWarehouse().equals(contract.getWarehouse())
						|| !Objects.equals(materialJournal.getOriginalDocumentType(),
								contract.getBaseDocumentType() == null ? Strings.VALUE_EMPTY : contract.getBaseDocumentType())
						|| !Objects.equals(materialJournal.getOriginalDocumentEntry(),
								contract.getBaseDocumentEntry() == null ? 0 : contract.getBaseDocumentEntry())
						|| !Objects.equals(materialJournal.getOriginalDocumentLineId(),
								contract.getBaseDocumentLineId() == null ? 0 : contract.getBaseDocumentLineId())
						|| !this.areCostQuantitiesEqual(materialJournal.getQuantity().abs(), contract.getQuantity())
						|| (checkTransactionPrice && contract.getPrice() != null && materialJournal.getPrice() != null
								&& !this.areCostPricesEqual(materialJournal.getPrice(), contract.getPrice()))
						|| (checkTransactionPrice && contract.getCurrency() != null
								&& !contract.getCurrency().equals(materialJournal.getCurrency()))
						|| (checkTransactionPrice && contract.getRate() != null && materialJournal.getRate() != null
								&& !this.areCostRatesEqual(materialJournal.getRate(), contract.getRate(), materialJournal.getCurrency(), localCurrency))) {
					// 修改物料、仓库、成本来源或价格，影响成本计算，不允许
					throw new BusinessLogicException(I18N.prop(
							"msg_mm_document_completed_material_cost_calculation_not_support_operation",
							BOIdentifierBuilder.document(materialJournal.getBaseDocumentType(),
									materialJournal.getBaseDocumentEntry(), materialJournal.getBaseDocumentLineId()).build()));
				}
			}
			// 仅新建时（首次）计算成本
			if (materialJournal.isNew()) {
				// 查询时点库存及价值
				BigDecimal inventoryValue = Decimals.VALUE_ZERO;
				BigDecimal inventoryQuantity = Decimals.VALUE_ZERO;
				BigDecimal calculatedPrice = Decimals.VALUE_ZERO;
				if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE,
						true)) {
					// 按仓库管理成本
					IMaterialInventory materialInventory = this.checkMaterialInventory(contract.getItemCode(),
							contract.getWarehouse());
					if (materialInventory != null) {
						// 成本价格 = 库存均价
						calculatedPrice = materialInventory.getAvgPrice();
						inventoryQuantity = materialInventory.getOnHand();
						inventoryValue = materialInventory.getInventoryValue();
					}
				} else {
					// 库存价值
					if (material != null) {
						// 成本价格 = 库存均价
						calculatedPrice = material.getAvgPrice();
						inventoryQuantity = material.getOnHand();
						inventoryValue = material.getInventoryValue();
					}
				}
				if (contract.isOffsetting()) {
					// 出库的取消，价格使用出库价格
					calculatedPrice = materialJournal.getCalculatedPrice();
				}
				if (contract.getPrice().compareTo(Decimals.VALUE_ZERO) < 0) {
					// 价格小于0，通过基于单据查询
					Criteria criteria = new Criteria();
					criteria.setResultCount(1);
					ICondition condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
					condition.setValue(contract.getBaseDocumentType());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
					condition.setValue(contract.getBaseDocumentEntry());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
					condition.setValue(contract.getBaseDocumentLineId());
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_QUANTITY.getName());
					condition.setOperation(ConditionOperation.GREATER_EQUAL);
					condition.setValue(Decimals.VALUE_ZERO);
					condition = criteria.getConditions().create();
					condition.setAlias(MaterialInventoryJournal.PROPERTY_DATASOURCE.getName());
					condition.setValue(DATASOURCE_SIGN_REGULAR_JOURNAL);
					try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
						boRepository.setTransaction(this.getTransaction());
						IOperationResult<IMaterialInventoryJournal> operationResult = boRepository
								.fetchMaterialInventoryJournal(criteria);
						if (operationResult.getError() != null) {
							throw new BusinessLogicException(operationResult.getError());
						}
						if (operationResult.getResultObjects().isEmpty()) {
							throw new BusinessLogicException(I18N.prop("msg_mm_document_not_found_receipt_journal",
									BOIdentifierBuilder.document(contract.getBaseDocumentType(), contract.getBaseDocumentEntry(),
											contract.getBaseDocumentLineId()).build()));
						}
						for (IMaterialInventoryJournal item : operationResult.getResultObjects()) {
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
				condition.setAlias(MaterialInventoryJournal.PROPERTY_ITEMCODE.getName());
				condition.setValue(contract.getItemCode());
				condition = criteria.getConditions().create();
				condition.setAlias(MaterialInventoryJournal.PROPERTY_WAREHOUSE.getName());
				condition.setValue(contract.getWarehouse());
				for (IMaterialInventoryJournal item : this.fetchBeAffectedInCaches(IMaterialInventoryJournal.class,
						criteria, true)) {
					if (item == materialJournal) {
						continue;
					}
					if (item.getDirection() != emDirection.OUT) {
						continue;
					}
					if (contract.isOffsetting() && Decimals.VALUE_ZERO.compareTo(item.getQuantity()) < 0) {
						continue;
					} else if (!contract.isOffsetting() && Decimals.VALUE_ZERO.compareTo(item.getQuantity()) > 0) {
						continue;
					}
					// 减少，其他行的量
					inventoryQuantity = inventoryQuantity.subtract(item.getQuantity());
					inventoryValue = inventoryValue.subtract(item.getTransactionValue());
				}
				// 记录时点库存及价值
				materialJournal.setInventoryQuantity(inventoryQuantity);
				materialJournal.setInventoryValue(inventoryValue);
				materialJournal.setCalculatedPrice(calculatedPrice);
				// 本次交易价值 = 本次入库价格 * 本次入库数量
				materialJournal.setTransactionValue(Decimals.multiply(calculatedPrice, contract.getQuantity()));
				// 取消则负数
				if (contract.isOffsetting()) {
					materialJournal.setTransactionValue(materialJournal.getTransactionValue().negate());
				}
			}
			// 新建和已有流水均回传成本；已有流水沿用历史计算结果。
			contract.onCalculatedCostPrice(materialJournal.getCalculatedPrice());
		} else {
			// 不计算物料成本
			materialJournal.setCalculatedPrice(Decimals.VALUE_ZERO);
			materialJournal.setInventoryQuantity(Decimals.VALUE_ZERO);
			materialJournal.setInventoryValue(Decimals.VALUE_ZERO);
			if (contract.isOffsetting() && !materialJournal.isNew()) {
				// 非新建的抵消逻辑，删除
				materialJournal.delete();
			}
		}
		// 赋值
		if (!contract.isOffsetting()) {
			// 非取消逻辑
			materialJournal.setItemCode(contract.getItemCode());
			materialJournal.setItemName(contract.getItemName());
			if (Strings.isNullOrEmpty(materialJournal.getItemName())
					|| materialJournal.getItemCode().equals(materialJournal.getItemName())) {
				materialJournal.setItemName(material.getName());
			}
			materialJournal.setWarehouse(contract.getWarehouse());
			materialJournal.setPostingDate(contract.getPostingDate());
			materialJournal.setDocumentDate(contract.getDocumentDate());
			materialJournal.setDeliveryDate(contract.getDeliveryDate());
			materialJournal.setQuantity(contract.getQuantity());
			// 保留负号，标识使用基础单据成本。
			materialJournal.setPrice(contract.getPrice() != null ? contract.getPrice() : Decimals.VALUE_ZERO);
			materialJournal.setCurrency(contract.getCurrency());
			materialJournal.setRate(contract.getRate());
			materialJournal.setOriginalDocumentType(contract.getBaseDocumentType());
			materialJournal.setOriginalDocumentEntry(contract.getBaseDocumentEntry());
			materialJournal.setOriginalDocumentLineId(contract.getBaseDocumentLineId());
		} else {
			materialJournal.setPostingDate(contract.getPostingDate());
			materialJournal.setDocumentDate(contract.getDocumentDate());
			materialJournal.setDeliveryDate(contract.getDeliveryDate());
		}
	}

	@Override
	protected void revoke(IMaterialIssueContract contract) {
		IMaterialInventoryJournal materialJournal = this.getBeAffected();
		// 不可保存对象，不执行逻辑
		if (!materialJournal.isSavable()) {
			return;
		}
		this.checkCostContractPresence(materialJournal, IMaterialIssueContract.class,
				candidate -> Objects.equals(candidate.getDocumentType(), contract.getDocumentType())
						&& Objects.equals(candidate.getDocumentEntry(), contract.getDocumentEntry())
						&& Objects.equals(candidate.getDocumentLineId(), contract.getDocumentLineId()),
				contract.getDocumentType(), contract.getDocumentEntry(), contract.getDocumentLineId());
		this.checkCostJournalDeletion(materialJournal, contract.getDocumentType(),
				contract.getDocumentEntry(), contract.getDocumentLineId());
		if (this.isEnableMaterialCosts()) {
			// 兼容旧流水：从旧单据契约恢复价格符号，价格绝对值保持不变。
			BigDecimal price = materialJournal.getPrice();
			if (price != null) {
				materialJournal.setPrice(this.isBaseDocumentCost(contract.getPrice()) ? price.abs().negate() : price.abs());
			}
		}
		if (this.isEnableMaterialCosts() && contract.isOffsetting()) {
			// 成本冲销也是历史记录，重复保存或恢复操作均不能直接删除。
			return;
		}
		if (!this.isEnableMaterialCosts()) {
			// 未开启成本的，删除
			materialJournal.delete();
		} else if (this.getTrigger() instanceof ITrackable && ((ITrackable) this.getTrigger()).isDeleted()) {
			// 触发对象删除（正向逻辑不被执行），删除
			materialJournal.delete();
		} else if (this.getTrigger() instanceof IApprovalData) {
			// 重新进入审批的数据，删除
			IApprovalData approvalData = (IApprovalData) this.getTrigger();
			if (!(approvalData.getApprovalStatus() == emApprovalStatus.APPROVED
					|| approvalData.getApprovalStatus() == emApprovalStatus.UNAFFECTED)) {
				materialJournal.delete();
			}
		}
	}

}
