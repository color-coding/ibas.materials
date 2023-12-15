package org.colorcoding.ibas.materials.logic.journalentry;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransferLine;
import org.colorcoding.ibas.materials.data.Ledgers;

public class InventoryTransferMaterialsCost extends MaterialsCost {

	public InventoryTransferMaterialsCost(Object sourceData) {
		super(sourceData);
	}

	@Override
	public void caculate() {
		if (this.getSourceData() instanceof InventoryTransferLine) {
			InventoryTransferLine item = (InventoryTransferLine) this.getSourceData();
			BigDecimal avaPrice = null;
			if (item.isNew()) {
				// 新建的取物料上的
				avaPrice = this.getAvgPrice(item.getItemCode(),
						String.valueOf(item.getValue(Ledgers.CONDITION_PROPERTY_FROM_WAREHOUSE)));
			} else {
				avaPrice = this.getAvgPrice(item.getObjectCode(), item.getDocEntry(), item.getLineId(),
						item.getItemCode(), String.valueOf(item.getValue(Ledgers.CONDITION_PROPERTY_FROM_WAREHOUSE)));
				if (avaPrice == null) {
					// 库存记录没有
					avaPrice = this.getAvgPrice(item.getItemCode(),
							String.valueOf(item.getValue(Ledgers.CONDITION_PROPERTY_FROM_WAREHOUSE)));
				}
			}
			if (avaPrice != null) {
				this.setAmount(Decimal.multiply(item.getQuantity(), avaPrice));
				return;
			}
		}
		this.setAmount(Decimal.ZERO);
	}

}
