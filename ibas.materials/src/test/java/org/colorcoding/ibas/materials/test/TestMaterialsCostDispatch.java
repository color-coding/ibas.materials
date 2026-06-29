package org.colorcoding.ibas.materials.test;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.accounting.logic.IJECPropertyValueGetter;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.logic.journalentry.MaterialsCost;
import org.colorcoding.ibas.materials.logic.journalentry.MaterialsInventoryCost;

import junit.framework.TestCase;

/**
 * 物料成本计算分发测试（聚焦 {@link MaterialsCost} 模板对 4 种成本性质的分发逻辑）。
 *
 * <p>关键回归点：</p>
 * <ul>
 *   <li>NON_INVENTORY：金额 = 行税前金额（修复"取消时金额为 0"问题）</li>
 *   <li>SERVICE 正向（出库类）：金额 = 0</li>
 *   <li>SERVICE 反向（退货/取消）：金额 = 行税前金额</li>
 *   <li>PHANTOM：金额 = 0</li>
 *   <li>INVENTORY 差异模式：差额 = 账面 − 实际历史成本</li>
 *   <li>NON_INVENTORY 差异模式：差额恒为 0（不挂账面值）</li>
 * </ul>
 */
public class TestMaterialsCostDispatch extends TestCase {

    // ------------------------------------------------------------
    // 测试桩：可设定物料性质与库存历史成本，不接触数据库
    // ------------------------------------------------------------
    static class StubCost extends MaterialsInventoryCost {
        private final CostNature nature;
        private final BigDecimal historyAvg;  // 库存物料的"历史成本"
        StubCost(Object sourceData, BigDecimal qty, boolean negate,
                CostNature nature, BigDecimal historyAvg) {
            super(sourceData, qty, negate);
            this.nature = nature;
            this.historyAvg = historyAvg;
        }
        @Override
        protected CostNature resolveCostNature(String itemCode) {
            return this.nature;
        }
        @Override
        protected boolean caculateInventoryCost(String itemCode, String warehouse) {
            // 模拟"实际历史成本 = qty * historyAvg"
            BigDecimal amount = Decimals.multiply(this.getQuantity(),
                    historyAvg != null ? historyAvg : Decimals.VALUE_ZERO);
            this.setAmount(amount);
            return true;
        }
    }

    static class StubDiffCost extends StubCost {
        StubDiffCost(Object sourceData, BigDecimal qty, boolean negate,
                CostNature nature, BigDecimal historyAvg) {
            super(sourceData, qty, negate, nature, historyAvg);
        }
        @Override
        protected boolean isDiffMode() { return true; }
    }

    /** 源数据桩：暴露行属性（PreTaxLineTotal / Material / Warehouse / InventoryQuantity） */
    static class StubLine implements IJECPropertyValueGetter {
        final Map<String, Object> values = new HashMap<>();
        StubLine(String itemCode, BigDecimal preTaxLineTotal, BigDecimal qty) {
            values.put(Material.PROPERTY_CODE.getName(), itemCode);
            values.put("Material", itemCode);
            values.put("Warehouse", "WH-01");
            values.put("PreTaxLineTotal", preTaxLineTotal);
            values.put("InventoryQuantity", qty);
            values.put("Quantity", qty);
        }
        @Override public Object getValue(String name) { return values.get(name); }
    }

    private static final BigDecimal QTY = new BigDecimal("2");
    private static final BigDecimal PRE_TAX = new BigDecimal("100.00");
    private static final BigDecimal HISTORY_AVG = new BigDecimal("30.00"); // 历史均价

    private void assertEqualsBD(String msg, BigDecimal expected, BigDecimal actual) {
        BigDecimal e = expected == null ? Decimals.VALUE_ZERO : expected;
        BigDecimal a = actual == null ? Decimals.VALUE_ZERO : actual;
        assertEquals(msg + " expected=" + e + ", actual=" + a, 0, e.compareTo(a));
    }

    // ============================================================
    // 用例
    // ============================================================

    /** 库存物料：金额 = 数量 × 历史均价（30×2=60） */
    public void test_Inventory_Normal() throws Exception {
        StubLine line = new StubLine("ITM-INV", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.INVENTORY, HISTORY_AVG);
        cost.setAmount(PRE_TAX);  // 业务方预置账面值
        cost.caculate();
        assertEqualsBD("INVENTORY 金额", new BigDecimal("60.00"), cost.getAmount());
    }

    /** 库存物料-差异模式：差额 = 账面 100 − 实际 60 = 40 */
    public void test_Inventory_DiffMode() throws Exception {
        StubLine line = new StubLine("ITM-INV", PRE_TAX, QTY);
        StubDiffCost cost = new StubDiffCost(line, QTY, false, MaterialsCost.CostNature.INVENTORY, HISTORY_AVG);
        cost.setAmount(PRE_TAX);  // 账面
        cost.caculate();
        assertEqualsBD("INVENTORY Diff 金额", new BigDecimal("40.00"), cost.getAmount());
    }

    /** 非库存物料：金额 = 行税前金额（核心修复点） */
    public void test_NonInventory_UsesPreTax() throws Exception {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setAmount(PRE_TAX);  // 上层预置税前总计
        cost.caculate();
        assertEqualsBD("NON_INVENTORY 金额 = 税前金额", PRE_TAX, cost.getAmount());
    }

    /** 非库存物料-取消（negate=true）：金额 = -行税前金额 */
    public void test_NonInventory_Reverse_Negated() throws Exception {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, true, MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        // postProcess 会取反
        assertEqualsBD("NON_INVENTORY 反向", PRE_TAX.negate(), cost.getAmount());
    }

    /** 非库存物料-差异模式：差额恒为 0 */
    public void test_NonInventory_DiffMode_IsZero() throws Exception {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubDiffCost cost = new StubDiffCost(line, QTY, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEqualsBD("NON_INVENTORY Diff = 0", Decimals.VALUE_ZERO, cost.getAmount());
    }

    /** 服务物料-正向（销售出库）：金额 = 0 */
    public void test_Service_Outbound_IsZero() throws Exception {
        StubLine line = new StubLine("ITM-SVC", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.SERVICE, null);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEqualsBD("SERVICE 正向 = 0", Decimals.VALUE_ZERO, cost.getAmount());
    }

    /** 服务物料-反向（退货/取消）：金额 = 行税前金额（取反后） */
    public void test_Service_Reverse_UsesPreTax() throws Exception {
        StubLine line = new StubLine("ITM-SVC", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, true, MaterialsCost.CostNature.SERVICE, null);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEqualsBD("SERVICE 反向 = -税前金额", PRE_TAX.negate(), cost.getAmount());
    }

    /** 服务物料-差异模式：差额恒为 0 */
    public void test_Service_DiffMode_IsZero() throws Exception {
        StubLine line = new StubLine("ITM-SVC", PRE_TAX, QTY);
        StubDiffCost cost = new StubDiffCost(line, QTY, false, MaterialsCost.CostNature.SERVICE, null);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEqualsBD("SERVICE Diff = 0", Decimals.VALUE_ZERO, cost.getAmount());
    }

    /** 虚拟件：始终为 0 */
    public void test_Phantom_IsZero() throws Exception {
        StubLine line = new StubLine("ITM-PHA", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.PHANTOM, HISTORY_AVG);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEqualsBD("PHANTOM = 0", Decimals.VALUE_ZERO, cost.getAmount());
    }

    /** CostNature 属性可被分类账规则读取 */
    public void test_CostNature_ExposedAsProperty() throws Exception {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setAmount(PRE_TAX);
        cost.caculate();
        Object value = cost.getSourceDataPropertyValue("CostNature");
        assertEquals("CostNature 属性应暴露给规则引擎", "NON_INVENTORY", value);
    }

    /** 按数量分摊：源行数量=10，本行处理数量=2，金额=PreTax × (2/10) */
    public void test_NonInventory_PartialQuantity_Allocates() throws Exception {
        BigDecimal lineQty = new BigDecimal("10");
        BigDecimal partQty = new BigDecimal("2");
        StubLine line = new StubLine("ITM-NI", new BigDecimal("500.00"), lineQty);
        StubCost cost = new StubCost(line, partQty, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        // 不预置 amount，强制走 getLineBaseAmount → 读 PreTaxLineTotal
        cost.caculate();
        // base=500, lineQty=10, partQty=2 → unit=50 → amount=100
        assertEqualsBD("NON_INVENTORY 分摊", new BigDecimal("100.00"), cost.getAmount());
    }

    // ============================================================
    // 修复 #2：setLedgerForNature 按成本性质切换科目
    // ============================================================

    /** 库存物料：未注册替代科目时，沿用原科目 */
    public void test_LedgerByNature_Inventory_Unchanged() throws Exception {
        StubLine line = new StubLine("ITM-INV", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.INVENTORY, HISTORY_AVG);
        cost.setLedger("GL-MM-01");   // 库存科目
        cost.setLedgerForNature(MaterialsCost.CostNature.NON_INVENTORY, "GL-MM-07");
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEquals("库存物料沿用库存科目", "GL-MM-01", cost.getLedger());
    }

    /** 非库存物料：注册了替代科目时，自动切换到费用科目 */
    public void test_LedgerByNature_NonInventory_Switches() throws Exception {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setLedger("GL-MM-01");   // 默认库存科目
        cost.setLedgerForNature(MaterialsCost.CostNature.NON_INVENTORY, "GL-MM-07");   // 费用科目
        cost.setLedgerForNature(MaterialsCost.CostNature.SERVICE, "GL-MM-07");
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEquals("非库存物料应切换到费用科目", "GL-MM-07", cost.getLedger());
    }

    /** 服务物料：注册了替代科目时，自动切换 */
    public void test_LedgerByNature_Service_Switches() throws Exception {
        StubLine line = new StubLine("ITM-SVC", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.SERVICE, null);
        cost.setLedger("GL-MM-01");
        cost.setLedgerForNature(MaterialsCost.CostNature.SERVICE, "GL-MM-07");
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEquals("服务物料应切换到费用科目", "GL-MM-07", cost.getLedger());
    }

    /** 虚拟件：注册了替代科目时也切换，但金额为 0 */
    public void test_LedgerByNature_Phantom_SwitchesButZero() throws Exception {
        StubLine line = new StubLine("ITM-PHA", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.PHANTOM, HISTORY_AVG);
        cost.setLedger("GL-MM-01");
        cost.setLedgerForNature(MaterialsCost.CostNature.PHANTOM, "GL-MM-07");
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEquals("虚拟件科目应切换", "GL-MM-07", cost.getLedger());
        assertEqualsBD("虚拟件金额为 0", Decimals.VALUE_ZERO, cost.getAmount());
    }

    /** 注册 null 或空串科目时，不切换（沿用原科目） */
    public void test_LedgerByNature_NullOrEmpty_NoSwitch() throws Exception {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setLedger("GL-MM-01");
        cost.setLedgerForNature(MaterialsCost.CostNature.NON_INVENTORY, null);
        cost.setLedgerForNature(MaterialsCost.CostNature.SERVICE, "");
        cost.setAmount(PRE_TAX);
        cost.caculate();
        assertEquals("空值注册不应切换科目", "GL-MM-01", cost.getLedger());
    }

    /** 链式调用返回 this */
    public void test_LedgerByNature_ReturnsSelf() {
        StubLine line = new StubLine("ITM-NI", PRE_TAX, QTY);
        StubCost cost = new StubCost(line, QTY, false, MaterialsCost.CostNature.NON_INVENTORY, null);
        MaterialsCost returned = cost.setLedgerForNature(MaterialsCost.CostNature.NON_INVENTORY, "GL-MM-07");
        assertSame("setLedgerForNature 应返回 this 以支持链式调用", cost, returned);
    }
}
