package org.colorcoding.ibas.materials.data;

public class Ledgers extends org.colorcoding.ibas.businesspartner.data.Ledgers {

	/**
	 * 库存科目
	 */
	public static final String LEDGER_INVENTORY_INVENTORY_ACCOUNT = "GL-MM-01";
	/**
	 * 差异科目
	 */
	public static final String LEDGER_INVENTORY_VARIANCE_ACCOUNT = "GL-MM-02";
	/**
	 * 价格差异科目
	 */
	public static final String LEDGER_INVENTORY_PRICE_DIFFERENCE_ACCOUNT = "";
	/**
	 * 负库存调整科目
	 */
	public static final String LEDGER_INVENTORY_NEGATIVE_INVENTORY_ADJ_ACCT = "";
	/**
	 * 库存冲销_减少科目
	 */
	public static final String LEDGER_INVENTORY_INVENTORY_OFFSET_DECR_ACCT = "GL-MM-03";
	/**
	 * 库存冲销_增加科目
	 */
	public static final String LEDGER_INVENTORY_INVENTORY_OFFSET_INCR_ACCT = "GL-MM-04";
	/**
	 * 汇率差异科目
	 */
	public static final String LEDGER_INVENTORY_EXCHANGE_RATE_DIFFERENCES_ACCOUNT = "";
	/**
	 * 总账减少科目
	 */
	public static final String LEDGER_INVENTORY_GL_DECREASE_ACCOUNT = "GL-MM-05";
	/**
	 * 总账增加科目
	 */
	public static final String LEDGER_INVENTORY_GL_INCREASE_ACCOUNT = "GL-MM-06";
	/**
	 * 在制品库存科目
	 */
	public static final String LEDGER_INVENTORY_WIP_INVENTORY_ACCOUNT = "";
	/**
	 * 在制品库存差异科目
	 */
	public static final String LEDGER_INVENTORY_WIP_INVENTORY_VARIANCE_ACCOUNT = "";
	/**
	 * 在制品冲销损益科目
	 */
	public static final String LEDGER_INVENTORY_WIP_OFFSET_PL_ACCOUNT = "";
	/**
	 * 库存冲销损益科目
	 */
	public static final String LEDGER_INVENTORY_INVENTORY_OFFSET_PL_ACCOUNT = "";
	/**
	 * 费用科目
	 */
	public static final String LEDGER_INVENTORY_EXPENSE_ACCOUNT = "GL-MM-07";

	/**
	 * 物料
	 */
	public static final String CONDITION_PROPERTY_MATERIAL = "Material";
	/**
	 * 物料组
	 */
	public static final String CONDITION_PROPERTY_MATERIAL_GROUP = "MaterialGroup";
	/**
	 * 仓库
	 */
	public static final String CONDITION_PROPERTY_WAREHOUSE = "Warehouse";
}
