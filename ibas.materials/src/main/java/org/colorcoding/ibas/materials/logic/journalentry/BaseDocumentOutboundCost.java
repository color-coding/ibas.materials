package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

/**
 * 基于上游出库单据的成本计算模板。
 *
 * <p>共性场景：销售发票/销售退货/销售贷项等单据本身不直接产生库存出库记录，
 * 而是基于上游的销售交货/销售退货/销售发票等单据。计算成本前需要：</p>
 * <ol>
 *   <li>验证基础单据存在（{@link #findBaseLine()} 返回非 null）；</li>
 *   <li>验证通过后，沿用父类 {@link MaterialsInventoryCost} 的标准库存算法。</li>
 * </ol>
 *
 * <p>非库存 / 服务 / 虚拟件物料的成本由 {@link MaterialsCost} 模板接管，
 * 子类不需要也不应当处理。</p>
 */
public abstract class BaseDocumentOutboundCost extends MaterialsInventoryCost {

    public BaseDocumentOutboundCost(Object sourceData, BigDecimal quantity) {
        super(sourceData, quantity, false);
    }

    public BaseDocumentOutboundCost(Object sourceData, BigDecimal quantity, Boolean negate) {
        super(sourceData, quantity, negate);
    }

    /**
     * 查找匹配的基础单据行（如交货行 / 退货行 / 发票行）。
     *
     * @return 匹配的基础行；找不到时返回 {@code null}（表示无法计算）。
     */
    protected abstract Object findBaseLine() throws Exception;

    @Override
    protected final boolean caculateInventoryCost(String itemCode, String warehouse) throws Exception {
        if (this.findBaseLine() == null) {
            return false;
        }
        return super.caculateInventoryCost(itemCode, warehouse);
    }
}
