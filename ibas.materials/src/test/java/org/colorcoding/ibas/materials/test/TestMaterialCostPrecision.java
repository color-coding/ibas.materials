package org.colorcoding.ibas.materials.test;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.bobas.bo.BOIdentifierBuilder;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.configuration.ConfigurationManager;
import org.colorcoding.ibas.bobas.core.Trackable;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.BusinessLogicsManager;
import org.colorcoding.ibas.bobas.repository.ITransaction;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.logic.IMaterialBatchJournalContract;
import org.colorcoding.ibas.materials.logic.IMaterialIssueContract;
import org.colorcoding.ibas.materials.logic.IMaterialReceiptContract;
import org.colorcoding.ibas.materials.logic.IMaterialSerialJournalContract;
import org.colorcoding.ibas.materials.logic.MaterialBatchJournalService;
import org.colorcoding.ibas.materials.logic.MaterialInventoryBusinessLogic;
import org.colorcoding.ibas.materials.logic.MaterialIssueService;
import org.colorcoding.ibas.materials.logic.MaterialReceiptService;
import org.colorcoding.ibas.materials.logic.MaterialSerialJournalService;

import junit.framework.TestCase;

/**
 * 价格、数量、汇率存储精度的关键回归，直接执行实际成本服务，不访问数据库。
 */
public class TestMaterialCostPrecision extends TestCase {

	private static final Class<?>[] CONTRACT_TYPES = { IMaterialReceiptContract.class, IMaterialIssueContract.class,
			IMaterialBatchJournalContract.class, IMaterialSerialJournalContract.class };

	private Field accountingConfiguration;
	private Object originalAccountingConfiguration;

	private Field materialsConfiguration;
	private Object originalMaterialsConfiguration;

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		accountingConfiguration = org.colorcoding.ibas.accounting.MyConfiguration.class.getDeclaredField("instance");
		accountingConfiguration.setAccessible(true);
		originalAccountingConfiguration = accountingConfiguration.get(null);
		accountingConfiguration.set(null, new ConfigurationManager() {
			@Override
			public void update() {
				// 隔离模块配置的数据库加载。
			}
		});
		org.colorcoding.ibas.accounting.MyConfiguration.create().addConfigValue(
				org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY, "CNY");
		materialsConfiguration = MyConfiguration.class.getDeclaredField("instance");
		materialsConfiguration.setAccessible(true);
		originalMaterialsConfiguration = materialsConfiguration.get(null);
		ConfigurationManager configuration = new ConfigurationManager() {
			@Override
			public void update() {
			}
		};
		configuration.addConfigValue(MyConfiguration.CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE, "true");
		materialsConfiguration.set(null, configuration);
	}

	@Override
	protected void tearDown() throws Exception {
		materialsConfiguration.set(null, originalMaterialsConfiguration);
		accountingConfiguration.set(null, originalAccountingConfiguration);
		super.tearDown();
	}

	private IMaterial createMaterial() {
		return (IMaterial) Proxy.newProxyInstance(getClass().getClassLoader(), new Class<?>[] { IMaterial.class },
				(proxy, method, args) -> method.getName().endsWith("Management") ? emYesNo.NO : "ITEM");
	}

	private MaterialInventoryBusinessLogic<?, ?> createService(int index) {
		switch (index) {
		case 0:
			return new MaterialReceiptService() {
				@Override
				protected IMaterial checkMaterial(String itemCode) {
					return createMaterial();
				}

				@Override
				protected IWarehouse checkWarehouse(String whsCode) {
					return null;
				}
			};
		case 1:
			return new MaterialIssueService() {
				@Override
				protected IMaterial checkMaterial(String itemCode) {
					return createMaterial();
				}

				@Override
				protected IWarehouse checkWarehouse(String whsCode) {
					return null;
				}
			};
		case 2:
			return new MaterialBatchJournalService();
		default:
			return new MaterialSerialJournalService();
		}
	}

	private void set(IBusinessObject journal, String name, Class<?> type, Object value) throws Exception {
		journal.getClass().getMethod("set" + name, type).invoke(journal, value);
	}

	private IBusinessObject runImpact(int index, boolean offsetting, emDirection direction,
			Map<String, Object> changes) throws Exception {
		IBusinessObject journal = index == 2 ? new MaterialBatchJournal()
				: index == 3 ? new MaterialSerialJournal() : new MaterialInventoryJournal();
		set(journal, "ItemCode", String.class, "ITEM");
		set(journal, "Warehouse", String.class, "WH");
		BigDecimal storedQuantity = (BigDecimal) changes.getOrDefault("$storedQuantity", Decimals.VALUE_ONE);
		set(journal, "Quantity", BigDecimal.class, offsetting ? storedQuantity.negate() : storedQuantity);
		set(journal, "Price", BigDecimal.class, changes.getOrDefault("$storedPrice", Decimals.VALUE_ONE));
		set(journal, "PostingDate", DateTime.class, null);
		set(journal, "Currency", String.class, changes.getOrDefault("$storedCurrency", "CNY"));
		set(journal, "Rate", BigDecimal.class, changes.getOrDefault("$storedRate", Decimals.VALUE_ONE));
		set(journal, "CalculatedPrice", BigDecimal.class, Decimals.valueOf(100));
		set(journal, "TransactionValue", BigDecimal.class, Decimals.valueOf(offsetting ? -100 : 100));
		set(journal, "InventoryQuantity", BigDecimal.class, Decimals.valueOf(50));
		set(journal, "InventoryValue", BigDecimal.class, Decimals.valueOf(5000));
		set(journal, "Direction", emDirection.class, direction);
		set(journal, "BaseDocumentType", String.class, "RECEIPT");
		set(journal, "BaseDocumentEntry", Integer.class, 100);
		set(journal, "BaseDocumentLineId", Integer.class, 1);
		set(journal, "OriginalDocumentType", String.class, "BASE");
		set(journal, "OriginalDocumentEntry", Integer.class, 1);
		set(journal, "OriginalDocumentLineId", Integer.class, 1);
		if (index == 2) {
			set(journal, "BatchCode", String.class, "BATCH");
		} else if (index == 3) {
			set(journal, "SerialCode", String.class, "SERIAL");
		}
		((Trackable) journal).markOld();

		Map<String, Object> values = new HashMap<>();
		values.put("isOffsetting", offsetting);
		values.put("getDocumentType", "RECEIPT");
		values.put("getDocumentEntry", 100);
		values.put("getDocumentLineId", 1);
		values.put("getItemCode", "ITEM");
		values.put("getItemName", "ITEM");
		values.put("getWarehouse", "WH");
		values.put("getQuantity", Decimals.VALUE_ONE);
		values.put("getPrice", Decimals.VALUE_ONE);
		values.put("getCurrency", "CNY");
		values.put("getRate", Decimals.VALUE_ONE);
		values.put("getDirection", direction);
		values.put("getBatchCode", "BATCH");
		values.put("getSerialCode", "SERIAL");
		values.put("getBaseDocumentType", "BASE");
		values.put("getBaseDocumentEntry", 1);
		values.put("getBaseDocumentLineId", 1);
		values.putAll(changes);
		Object contract = Proxy.newProxyInstance(getClass().getClassLoader(), new Class<?>[] { CONTRACT_TYPES[index] },
				(proxy, method, args) -> values.get(method.getName()));
		MaterialInventoryBusinessLogic<?, ?> service = createService(index);
		service.setEnableMaterialCosts(true);
		Field affected = BusinessLogic.class.getDeclaredField("beAffected");
		affected.setAccessible(true);
		affected.set(service, journal);
		Field currentChain = BusinessLogic.class.getDeclaredField("logicChain");
		currentChain.setAccessible(true);
		ITransaction transaction = (ITransaction) Proxy.newProxyInstance(getClass().getClassLoader(),
				new Class<?>[] { ITransaction.class }, (proxy, method, args) -> {
					if (method.getName().equals("getId")) {
						return "PRECISION-TEST";
					}
					throw new AssertionError("Precision tests must not access the database: " + method.getName());
				});
		currentChain.set(service, BusinessLogicsManager.create().createChain(transaction, null));
		Class<?> serviceClass = index < 2 ? service.getClass().getSuperclass() : service.getClass();
		Method impact = serviceClass.getDeclaredMethod("impact", CONTRACT_TYPES[index]);
		impact.setAccessible(true);
		try {
			impact.invoke(service, contract);
		} catch (InvocationTargetException e) {
			throw (Exception) e.getCause();
		}
		return journal;
	}

	private void assertRoundedPrice(int index, boolean offsetting, emDirection direction, BigDecimal stored,
			BigDecimal current, boolean rejected) throws Exception {
		Map<String, Object> changes = new HashMap<>();
		changes.put("$storedPrice", stored);
		changes.put("getPrice", current);
		try {
			IBusinessObject journal = runImpact(index, offsetting,
					direction, changes);
			assertFalse("Price change at storage precision was accepted", rejected);
			assertEquals(Decimals.valueOf(100), journal.getClass().getMethod("getCalculatedPrice").invoke(journal));
			assertEquals(Decimals.valueOf(offsetting ? -100 : 100), journal.getClass().getMethod("getTransactionValue").invoke(journal));
		} catch (BusinessLogicException e) {
			if (!rejected) {
				throw e;
			}
			assertEquals(I18N.prop("msg_mm_document_completed_material_cost_calculation_not_support_operation",
					BOIdentifierBuilder.document("RECEIPT", 100, 1).build()), e.getMessage());
		}
	}

	public void testMM_P01_KilogramToGramPriceUsesStoragePrecision() throws Exception {
		BigDecimal taxExclusive = Decimals.divide(Decimals.valueOf(25), new BigDecimal("1.13"), Decimals.DECIMAL_PLACES_STORAGE);
		assertEquals(new BigDecimal("22.123894"), taxExclusive);
		BigDecimal unitPrice = Decimals.divide(taxExclusive, Decimals.valueOf(1000), Decimals.DECIMAL_PLACES_RUNNING);
		assertEquals(new BigDecimal("0.022123894"), unitPrice);
		BigDecimal stored = Decimals.round(unitPrice, Decimals.DECIMAL_PLACES_STORAGE);
		assertEquals(new BigDecimal("0.022124"), stored);
		for (int index = 0; index < CONTRACT_TYPES.length; index++) {
			for (boolean offsetting : new boolean[] { false, true }) {
				// 入库冻结交易价格，退货按来源成本时冻结负价格。
				assertRoundedPrice(index, offsetting, emDirection.IN, stored, unitPrice, false);
				assertRoundedPrice(index, offsetting, emDirection.OUT, stored.negate(), unitPrice.negate(), false);
			}
		}
	}

	public void testMM_P02_PriceRoundingBoundaryStillRejectsRealChanges() throws Exception {
		for (int index = 0; index < CONTRACT_TYPES.length; index++) {
			for (boolean offsetting : new boolean[] { false, true }) {
				assertRoundedPrice(index, offsetting, emDirection.IN, new BigDecimal("-0.022124"), new BigDecimal("-0.022124499"), false);
				assertRoundedPrice(index, offsetting, emDirection.OUT, new BigDecimal("-0.022124"), new BigDecimal("-0.022124500"), true);
				assertRoundedPrice(index, offsetting, emDirection.OUT, new BigDecimal("-0.022123"), new BigDecimal("-0.022123500"), true);
			}
		}
	}

	public void testMM_P03_PriceRoundingCannotChangeBaseDocumentCostMode() throws Exception {
		for (int index = 0; index < CONTRACT_TYPES.length; index++) {
			assertRoundedPrice(index, false, emDirection.IN, Decimals.VALUE_ZERO, new BigDecimal("-0.0000001"), true);
			assertRoundedPrice(index, false, emDirection.OUT, new BigDecimal("-0.0000001"), Decimals.VALUE_ZERO, true);
		}
	}

	private void assertPrecisionChange(int index, boolean offsetting, emDirection direction,
			Map<String, Object> changes, boolean rejected) throws Exception {
		try {
			IBusinessObject journal = runImpact(index, offsetting, direction, changes);
			assertFalse("A real quantity/rate change was accepted", rejected);
			assertEquals(Decimals.valueOf(100), journal.getClass().getMethod("getCalculatedPrice").invoke(journal));
			assertEquals(Decimals.valueOf(offsetting ? -100 : 100), journal.getClass().getMethod("getTransactionValue").invoke(journal));
		} catch (BusinessLogicException e) {
			if (!rejected) {
				throw e;
			}
		}
	}

	public void testMM_P04_QuantityFreezeUsesStoragePrecision() throws Exception {
		Map<String, Object> changes = new HashMap<>();
		changes.put("$storedQuantity", new BigDecimal("0.111111"));
		changes.put("getQuantity", Decimals.multiply(new BigDecimal("0.333333"), new BigDecimal("0.333333")));
		for (int index = 0; index < 3; index++) {
			for (boolean offsetting : new boolean[] { false, true }) {
				assertPrecisionChange(index, offsetting, emDirection.IN, changes, false);
				assertPrecisionChange(index, offsetting, emDirection.OUT, changes, false);
			}
		}
	}

	public void testMM_P05_QuantityRoundingBoundaryAndNegativeQuantityRemainProtected() throws Exception {
		for (int index = 0; index < 3; index++) {
			Map<String, Object> changes = new HashMap<>();
			changes.put("getQuantity", new BigDecimal("1.000000499"));
			assertPrecisionChange(index, false, emDirection.IN, changes, false);
			changes.put("getQuantity", new BigDecimal("1.000000500"));
			assertPrecisionChange(index, false, emDirection.IN, changes, true);
			changes.put("$storedQuantity", Decimals.VALUE_ZERO);
			changes.put("getQuantity", new BigDecimal("-0.0000001"));
			assertPrecisionChange(index, false, emDirection.IN, changes, true);
		}
	}

	private Map<String, Object> foreignRateChanges(BigDecimal storedRate, BigDecimal currentRate) {
		Map<String, Object> changes = new HashMap<>();
		changes.put("$storedPrice", Decimals.VALUE_MINUS_ONE);
		changes.put("getPrice", Decimals.VALUE_MINUS_ONE);
		changes.put("$storedCurrency", "USD");
		changes.put("getCurrency", "USD");
		changes.put("$storedRate", storedRate);
		changes.put("getRate", currentRate);
		return changes;
	}

	public void testMM_P06_ForeignRateFreezeUsesStoragePrecision() throws Exception {
		for (int index = 0; index < CONTRACT_TYPES.length; index++) {
			for (boolean offsetting : new boolean[] { false, true }) {
				Map<String, Object> changes = foreignRateChanges(new BigDecimal("7.123457"), new BigDecimal("7.123456789"));
				assertPrecisionChange(index, offsetting, emDirection.IN, changes, false);
				assertPrecisionChange(index, offsetting, emDirection.OUT, changes, false);
			}
		}
	}

	public void testMM_P07_ForeignRateRoundingBoundaryAndZeroRemainProtected() throws Exception {
		for (int index = 0; index < CONTRACT_TYPES.length; index++) {
			assertPrecisionChange(index, false, emDirection.IN,
					foreignRateChanges(new BigDecimal("7.123457"), new BigDecimal("7.123457500")), true);
			assertPrecisionChange(index, false, emDirection.OUT,
					foreignRateChanges(Decimals.VALUE_ZERO, new BigDecimal("0.0000001")), true);
			assertPrecisionChange(index, false, emDirection.OUT,
					foreignRateChanges(new BigDecimal("0.0000001"), new BigDecimal("-0.0000001")), true);
		}
	}

	public void testMM_P08_LocalRateDefaultsRemainCompatible() throws Exception {
		for (int index = 0; index < CONTRACT_TYPES.length; index++) {
			Map<String, Object> changes = foreignRateChanges(Decimals.VALUE_ZERO, new BigDecimal("1.0000001"));
			changes.put("$storedCurrency", "CNY");
			changes.put("getCurrency", "CNY");
			assertPrecisionChange(index, false, emDirection.OUT, changes, false);
			changes.put("getRate", new BigDecimal("0.0000001"));
			assertPrecisionChange(index, false, emDirection.OUT, changes, true);
		}
	}
}
