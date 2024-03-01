package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

public class GoodsReceiptMaterialsCostDiff extends GoodsReceiptMaterialsCost {

	public GoodsReceiptMaterialsCostDiff(Object sourceData) {
		super(sourceData);
	}

	@Override
	public void caculate() {
		BigDecimal amount = this.getAmount().abs();
		super.caculate();
		this.setAmount(amount.subtract(this.getAmount().abs()).negate());
	}
}
