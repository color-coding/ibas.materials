package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

/**
 * 物料收货时的成本差异（反向）
 */
public class MaterialsReceiptReverseCostDiff extends MaterialsReceiptReverseCost {
	/**
	 * 构造函数
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 */
	public MaterialsReceiptReverseCostDiff(Object sourceData, BigDecimal quantity) {
		super(sourceData, quantity);
		this.setNegate(false);
	}

	/**
	 * 构造函数
	 * 
	 * @param sourceData 源数据
	 * @param quantity   数量
	 * @param negate     负数（默认：false）
	 */
	public MaterialsReceiptReverseCostDiff(Object sourceData, BigDecimal quantity, boolean negate) {
		this(sourceData, quantity);
		this.setNegate(negate);
	}

	@Override
	protected boolean caculate(String itemCode, String warehouse) {
		BigDecimal amount = this.getAmount().abs();
		if (super.caculate(itemCode, warehouse)) {
			this.setAmount(amount.subtract(this.getAmount().abs()));
			return true;
		} else {
			return false;
		}
	}
}
