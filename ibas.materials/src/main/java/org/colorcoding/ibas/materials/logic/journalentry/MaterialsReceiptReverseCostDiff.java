package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

/**
 * 物料收货时的成本差异（反向）。
 *
 * <p>价格差异 = 账面金额（业务方预置） − 实际历史成本。
 * 由父类 {@link MaterialsCost#caculate()} 模板根据 {@link #isDiffMode()} 自动计算：</p>
 * <ul>
 *   <li>库存物料：差额 = 账面 − 历史移动平均成本</li>
 *   <li>非库存/服务：差额恒为 0（财务上不存在"账面 vs 库存价"差异）</li>
 * </ul>
 */
public class MaterialsReceiptReverseCostDiff extends MaterialsReceiptReverseCost {

    public MaterialsReceiptReverseCostDiff(Object sourceData, BigDecimal quantity) {
        super(sourceData, quantity);
        this.setNegate(false);
    }

    public MaterialsReceiptReverseCostDiff(Object sourceData, BigDecimal quantity, boolean negate) {
        this(sourceData, quantity);
        this.setNegate(negate);
    }

    @Override
    protected boolean isDiffMode() {
        return true;
    }
}
