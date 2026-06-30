package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.data.Ledgers;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

/**
 * 物料成本计算基类（模板方法 + 策略分发）。
 *
 * <p>
 * 本类按物料的"成本性质" {@link CostNature} 分发到不同策略：
 * </p>
 * <ul>
 * <li>{@link CostNature#INVENTORY} 库存物料 - 历史移动平均/批次平均成本 由子类实现</li>
 * <li>{@link CostNature#NON_INVENTORY} 非库存物料 - 默认按行税前金额</li>
 * <li>{@link CostNature#SERVICE} 服务 - 默认 0；反向（退货/取消）按行税前金额</li>
 * <li>{@link CostNature#PHANTOM} 虚拟件 - 0</li>
 * </ul>
 *
 * <p>
 * 子类典型扩展点：
 * </p>
 * <ul>
 * <li>{@link #caculateInventoryCost(String, String)} 实现库存成本算法</li>
 * <li>{@link #isDiffMode()} 标记为"价格差异"模式（非库存差异恒为 0）</li>
 * <li>{@link #shouldNegate()} 是否对结果取反</li>
 * </ul>
 */
public abstract class MaterialsCost extends JournalEntrySmartContent {

	public MaterialsCost(Object sourceData) {
		super(sourceData);
	}

	/** 物料成本性质 */
	public enum CostNature {
		/** 库存物料 - 按库存账历史成本 */
		INVENTORY,
		/** 非库存物料（有实物）- 按单据行税前金额 */
		NON_INVENTORY,
		/** 服务物料 - 默认 0；反向场景按行税前金额 */
		SERVICE,
		/** 虚拟件 - 始终 0（成本由子件承担） */
		PHANTOM,
	}

	/** 缓存物料解析结果（单次 caculate 调用周期内复用） */
	private IMaterial resolvedMaterial;
	private CostNature resolvedNature;

	/** 按成本性质重写科目（可选）。例如：非库存物料映射到费用科目而非存货科目。 */
	private java.util.EnumMap<CostNature, String> ledgersByNature;

	/**
	 * 按成本性质注册替代科目。 业务上层在构建分录时调用，可让"非库存/服务/虚拟件物料"的金额落入合适科目， 而非硬编码到库存科目。
	 *
	 * @param nature 成本性质
	 * @param ledger 该性质下使用的科目编码；{@code null} 或空串表示沿用当前科目
	 * @return this
	 */
	public final MaterialsCost setLedgerForNature(CostNature nature, String ledger) {
		if (ledger == null || ledger.isEmpty()) {
			return this;
		}
		if (this.ledgersByNature == null) {
			this.ledgersByNature = new java.util.EnumMap<>(CostNature.class);
		}
		this.ledgersByNature.put(nature, ledger);
		return this;
	}

	// ============================================================
	// 模板方法：唯一对外入口
	// ============================================================

	@Override
	public final void caculate() throws Exception {
		String itemCode = String.valueOf(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL));
		if (JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase(itemCode)) {
			throw new BusinessLogicException(I18N.prop("msg_mm_not_specified_material"));
		}
		String warehouse = String.valueOf(this.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_WAREHOUSE));

		// 业务方在生成 content 时通常已 setAmount(税前总计) 作为账面值
		// 保存下来给差异模式与非库存分支使用
		BigDecimal preset = this.getAmount();

		CostNature nature = this.resolveCostNature(itemCode);
		this.resolvedNature = nature; // 兜底：子类 override 时回写字段，供 getSourceDataPropertyValue("CostNature") 读取
		// 按性质重写科目（若注册了替代映射）
		if (this.ledgersByNature != null) {
			String altLedger = this.ledgersByNature.get(nature);
			if (altLedger != null && !altLedger.isEmpty()) {
				this.setLedger(altLedger);
			}
		}
		switch (nature) {
		case INVENTORY:
			if (!this.caculateInventoryCost(itemCode, warehouse)) {
				throw new Exception(I18N.prop("msg_bobas_not_support_the_compute"));
			}
			if (this.isDiffMode() && preset != null) {
				// 价格差异 = 账面 - 实际历史成本
				this.setAmount(preset.subtract(this.getAmount() == null ? Decimal.ZERO : this.getAmount()));
			}
			break;
		case NON_INVENTORY:
			if (this.isDiffMode()) {
				// 非库存物料：账面即成本，价格差异恒为 0
				this.setAmount(Decimal.ZERO);
			} else {
				this.caculateNonInventoryCost(itemCode);
			}
			break;
		case SERVICE:
			if (this.isDiffMode()) {
				this.setAmount(Decimal.ZERO);
			} else {
				this.caculateServiceCost(itemCode);
			}
			break;
		case PHANTOM:
		default:
			this.setAmount(Decimal.ZERO);
			break;
		}
		this.postProcess();
	}

	// ============================================================
	// 策略钩子：子类可独立重写
	// ============================================================

	/** 库存成本策略（必须实现） */
	protected abstract boolean caculateInventoryCost(String itemCode, String warehouse) throws Exception;

	/** 非库存成本策略（默认：取行税前金额） */
	protected void caculateNonInventoryCost(String itemCode) throws Exception {
		BigDecimal amount = this.getLineBaseAmount();
		this.setAmount(amount != null ? amount : Decimal.ZERO);
	}

	/** 服务成本策略（默认：0，反向场景取行金额） */
	protected void caculateServiceCost(String itemCode) throws Exception {
		if (this.shouldNegate()) {
			BigDecimal amount = this.getLineBaseAmount();
			this.setAmount(amount != null ? amount : Decimal.ZERO);
		} else {
			this.setAmount(Decimal.ZERO);
		}
	}

	/** 是否价格差异模式（子类 *Diff 类重写为 true） */
	protected boolean isDiffMode() {
		return false;
	}

	/** 是否对结果取反（子类按 negate 标志重写） */
	protected boolean shouldNegate() {
		return false;
	}

	// ============================================================
	// 物料性质解析
	// ============================================================

	/**
	 * 解析物料的成本性质。 结果在单次 caculate 调用周期内缓存。
	 */
	protected CostNature resolveCostNature(String itemCode) {
		if (this.resolvedNature != null && this.resolvedMaterial != null
				&& itemCode.equals(this.resolvedMaterial.getCode())) {
			return this.resolvedNature;
		}
		this.resolvedMaterial = this.fetchMaterial(itemCode);
		if (this.resolvedMaterial == null) {
			// 找不到物料：保守按非库存处理（按行金额走，至少不会丢金额）
			this.resolvedNature = CostNature.NON_INVENTORY;
		} else if (this.resolvedMaterial.getItemType() == emItemType.SERVICES) {
			this.resolvedNature = CostNature.SERVICE;
		} else if (this.resolvedMaterial.getPhantomItem() == emYesNo.YES) {
			this.resolvedNature = CostNature.PHANTOM;
		} else {
			this.resolvedNature = CostNature.INVENTORY;
		}
		return this.resolvedNature;
	}

	/** 取已解析的物料（在策略钩子中使用，避免重复查询） */
	protected final IMaterial getResolvedMaterial() {
		return this.resolvedMaterial;
	}

	/** 单条物料查询（带事务） */
	protected IMaterial fetchMaterial(String itemCode) {
		Criteria criteria = new Criteria();
		criteria.setResultCount(1);
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Material.PROPERTY_CODE.getName());
		condition.setValue(itemCode);
		BORepositoryMaterials boRepository = new BORepositoryMaterials();
		{
			boRepository.setRepository(this.getService().getRepository());
			IOperationResult<IMaterial> operationResult = boRepository.fetchMaterial(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			return operationResult.getResultObjects().firstOrDefault();
		}
	}

	// ============================================================
	// 通用钩子：行金额回退
	// ============================================================

	/**
	 * 取"行税前金额"作为非库存/服务物料的成本依据。
	 *
	 * <p>
	 * 优先级：
	 * </p>
	 * <ol>
	 * <li>当前 content 已设置的金额（业务方通常已 setAmount(税前总计) 作为账面值）；</li>
	 * <li>源数据属性 "PreTaxLineTotal"；</li>
	 * <li>源数据属性 "LineTotal" 作为兜底。</li>
	 * </ol>
	 */
	protected BigDecimal getLineBaseAmount() {
		if (this.getAmount() != null && !Decimal.isZero(this.getAmount())) {
			return this.getAmount();
		}
		Object val = this.getSourceDataPropertyValue("PreTaxLineTotal");
		if (val instanceof BigDecimal) {
			return (BigDecimal) val;
		}
		val = this.getSourceDataPropertyValue("LineTotal");
		if (val instanceof BigDecimal) {
			return (BigDecimal) val;
		}
		return null;
	}

	/**
	 * 暴露物料成本性质给分类账规则引擎使用。 若 caculate() 尚未执行，亦支持按当前源数据的物料编码懒解析。
	 */
	@Override
	public Object getSourceDataPropertyValue(String property) {
		if ("CostNature".equals(property)) {
			if (this.resolvedNature == null) {
				Object material = super.getSourceDataPropertyValue(Ledgers.CONDITION_PROPERTY_MATERIAL);
				if (material instanceof String
						&& !JournalEntrySmartContent.VALUE_NULL.equalsIgnoreCase((String) material)) {
					try {
						this.resolveCostNature((String) material);
					} catch (Exception ignored) {
						// 未连服务上下文等场景静默
					}
				}
			}
			if (this.resolvedNature != null) {
				return this.resolvedNature.name();
			}
		}
		return super.getSourceDataPropertyValue(property);
	}

	// ============================================================
	// 后处理
	// ============================================================

	/** 公共后处理：本币、汇率、负号反转 */
	protected void postProcess() {
		if (this.getCurrency() == null) {
			this.setCurrency(org.colorcoding.ibas.accounting.MyConfiguration
					.getConfigValue(org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY));
		}
		if (this.getRate() == null) {
			this.setRate(Decimal.ONE);
		}
		if (this.shouldNegate() && this.getAmount() != null) {
			if (this.getAmount().compareTo(Decimal.ZERO) > 0) {
				this.setAmount(this.getAmount().negate());
			} else {
				this.setAmount(this.getAmount().abs());
			}
		}
	}
}
