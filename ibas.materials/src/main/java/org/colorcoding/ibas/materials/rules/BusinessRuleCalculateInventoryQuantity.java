package org.colorcoding.ibas.materials.rules;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.rule.BusinessRuleCommon;

public class BusinessRuleCalculateInventoryQuantity extends BusinessRuleCommon {

	protected BusinessRuleCalculateInventoryQuantity() {
		this.setName(I18N.prop("msg_mm_business_rule_calculate_inventory_quantity"));
	}

	/**
	 * 构造方法
	 * 
	 * @param inventoryQuantity 属性-库存数量
	 * @param quantity          属性-数量
	 * @param uomRate           属性-换算率
	 */
	public BusinessRuleCalculateInventoryQuantity(IPropertyInfo<BigDecimal> inventoryQuantity,
			IPropertyInfo<BigDecimal> quantity, IPropertyInfo<BigDecimal> uomRate) {
		this();
		this.setInventoryQuantity(inventoryQuantity);
		this.setQuantity(quantity);
		this.setUOMRate(uomRate);
		// 要输入的参数
		this.getInputProperties().add(this.getInventoryQuantity());
		this.getInputProperties().add(this.getQuantity());
		this.getInputProperties().add(this.getUOMRate());
		// 要输出的参数
		this.getAffectedProperties().add(this.getInventoryQuantity());
		this.getAffectedProperties().add(this.getUOMRate());
	}

	private IPropertyInfo<BigDecimal> quantity;

	protected final IPropertyInfo<BigDecimal> getQuantity() {
		return quantity;
	}

	protected final void setQuantity(IPropertyInfo<BigDecimal> quantity) {
		this.quantity = quantity;
	}

	private IPropertyInfo<BigDecimal> inventoryQuantity;

	protected final IPropertyInfo<BigDecimal> getInventoryQuantity() {
		return inventoryQuantity;
	}

	protected final void setInventoryQuantity(IPropertyInfo<BigDecimal> inventoryQuantity) {
		this.inventoryQuantity = inventoryQuantity;
	}

	private IPropertyInfo<BigDecimal> uomRate;

	protected final IPropertyInfo<BigDecimal> getUOMRate() {
		return uomRate;
	}

	protected final void setUOMRate(IPropertyInfo<BigDecimal> uomRate) {
		this.uomRate = uomRate;
	}

	@Override
	protected void execute(BusinessRuleContext context) throws Exception {
		BigDecimal uomRate = (BigDecimal) context.getInputValues().get(this.getUOMRate());
		if (uomRate == null) {
			uomRate = Decimal.ZERO;
		}
		if (Decimal.ZERO.compareTo(uomRate) >= 0) {
			uomRate = Decimal.ONE;
			context.getOutputValues().put(this.getUOMRate(), uomRate);
		}
		BigDecimal quantity = (BigDecimal) context.getInputValues().get(this.getQuantity());
		if (quantity == null) {
			quantity = Decimal.ZERO;
		}
		BigDecimal inventoryQuantity = (BigDecimal) context.getInputValues().get(this.getInventoryQuantity());
		if (inventoryQuantity == null) {
			inventoryQuantity = Decimal.ZERO;
		}
		if (Decimal.ZERO.compareTo(inventoryQuantity) == 0 && Decimal.ZERO.compareTo(quantity) != 0) {
			inventoryQuantity = Decimal.multiply(quantity, uomRate);
			context.getOutputValues().put(this.getInventoryQuantity(), inventoryQuantity);
		} else if (Decimal.ZERO.compareTo(quantity) == 0 && Decimal.ZERO.compareTo(inventoryQuantity) != 0) {
			quantity = Decimal.divide(inventoryQuantity, uomRate);
			context.getOutputValues().put(this.getQuantity(), quantity);
		} else {
			BigDecimal result = Decimal.multiply(quantity, uomRate);
			if (Decimal.ONE
					.compareTo(result.subtract(inventoryQuantity).abs().multiply(Decimal.ONE.add(Decimal.ONE))) <= 0) {
				context.getOutputValues().put(this.getInventoryQuantity(), result);
			}
		}
	}

}
