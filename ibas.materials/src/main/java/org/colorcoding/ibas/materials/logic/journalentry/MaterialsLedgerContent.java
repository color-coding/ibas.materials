package org.colorcoding.ibas.materials.logic.journalentry;

import org.colorcoding.ibas.bobas.logic.BusinessLogicException;

/**
 * 仅做"按成本性质分流科目"的轻量分录内容；不重新计算金额（金额沿用上层 setAmount 预置值）。
 *
 * <p>典型场景：采购发票/销售发票"不基于单据"分支——此时金额就是发票行税前总计，
 * 不需要去库存账查均价；但科目应按物料性质区分：</p>
 * <ul>
 *   <li>库存物料 -> 存货科目</li>
 *   <li>非库存物料 / 服务 -> 费用科目（避免错挂存货）</li>
 *   <li>虚拟件 -> 不入账（金额置 0）</li>
 * </ul>
 *
 * <p>用法：</p>
 * <pre>
 * jeContent = new MaterialsLedgerContent(line);
 * jeContent.setLedger(Ledgers.LEDGER_INVENTORY_INVENTORY_ACCOUNT);  // 库存物料默认科目
 * jeContent.setLedgerForNature(CostNature.NON_INVENTORY, Ledgers.LEDGER_INVENTORY_EXPENSE_ACCOUNT);
 * jeContent.setLedgerForNature(CostNature.SERVICE,       Ledgers.LEDGER_INVENTORY_EXPENSE_ACCOUNT);
 * jeContent.setAmount(line.getPreTaxLineTotal());
 * </pre>
 */
public class MaterialsLedgerContent extends MaterialsCost {

    public MaterialsLedgerContent(Object sourceData) {
        super(sourceData);
    }

    @Override
    protected boolean caculateInventoryCost(String itemCode, String warehouse) throws Exception {
        // 库存物料：金额保留上层预置（发票/退货行税前总计），不重算
        return true;
    }

    @Override
    protected void caculateNonInventoryCost(String itemCode) throws Exception {
        // 非库存物料：金额保留预置（已是行税前金额），仅切换科目（在父类模板中处理）
    }

    @Override
    protected void caculateServiceCost(String itemCode) throws Exception {
        // 服务物料：金额保留预置；正反向均按行金额（这里的 BO 通常已通过 negate 或显式 amount 表达方向）
    }

    @Override
    protected boolean shouldNegate() {
        return false;   // 由上层显式控制 amount 符号
    }

    /**
     * 显式抛出此契约不支持库存价回查（与 {@link MaterialsInventoryCost} 区分）。
     * 子类如需"基于单据反查"行为，请改用 {@link MaterialsInventoryCost} / {@link BaseDocumentOutboundCost}。
     */
    @SuppressWarnings("unused")
    private void __notForCostLookup() {
        throw new BusinessLogicException("MaterialsLedgerContent is not for cost lookup");
    }
}
