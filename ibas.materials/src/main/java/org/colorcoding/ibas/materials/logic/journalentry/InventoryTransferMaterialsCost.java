package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssueLine;

public class InventoryTransferMaterialsCost extends MaterialsCost {

	public InventoryTransferMaterialsCost(Object sourceData) {
		super(sourceData);
	}

	@Override
	public void caculate() {
		if (this.getSourceData() instanceof IGoodsIssueLine) {
			IGoodsIssueLine item = (IGoodsIssueLine) this.getSourceData();
			BigDecimal avaPrice = null;
			if (item.isNew()) {
				// 新建的取物料上的
				avaPrice = this.getAvgPrice(item.getItemCode(), item.getWarehouse());
			} else {
				avaPrice = this.getAvgPrice(item.getObjectCode(), item.getDocEntry(), item.getLineId(),
						item.getItemCode(), item.getWarehouse());
				if (avaPrice == null) {
					// 库存记录没有
					avaPrice = this.getAvgPrice(item.getItemCode(), item.getWarehouse());
				}
			}
			if (avaPrice != null) {
				this.setAmount(Decimal.multiply(item.getQuantity(), avaPrice));
				return;
			}
		}
		throw new RuntimeException("no result.");
	}

}
