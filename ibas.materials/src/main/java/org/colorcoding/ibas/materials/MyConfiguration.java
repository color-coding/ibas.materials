package org.colorcoding.ibas.materials;

import org.colorcoding.ibas.bobas.configuration.ConfigurationFactory;
import org.colorcoding.ibas.bobas.configuration.IConfigurationManager;

/**
 * 我的配置项
 */
public class MyConfiguration extends org.colorcoding.ibas.bobas.MyConfiguration {

	private volatile static IConfigurationManager instance;

	public static IConfigurationManager create() {
		if (instance == null) {
			synchronized (MyConfiguration.class) {
				if (instance == null) {
					instance = ConfigurationFactory.create().createManager();
					instance.setConfigSign(MODULE_ID);
					instance.update();
				}
			}
		}
		return instance;
	}

	public static <P> P getConfigValue(String key, P defaultValue) {
		return create().getConfigValue(key, defaultValue);
	}

	public static String getConfigValue(String key) {
		return create().getConfigValue(key);
	}

	/**
	 * 模块标识
	 */
	public static final String MODULE_ID = "bad47859-3d74-4b2b-975a-48c635406be4";

	/**
	 * 命名空间
	 */
	public static final String NAMESPACE_ROOT = "http://colorcoding.org/ibas/materials/";

	/**
	 * 数据命名空间
	 */
	public static final String NAMESPACE_DATA = NAMESPACE_ROOT + "data";

	/**
	 * 业务对象命名空间
	 */
	public static final String NAMESPACE_BO = NAMESPACE_ROOT + "bo";

	/**
	 * 服务命名空间
	 */
	public static final String NAMESPACE_SERVICE = NAMESPACE_ROOT + "service";

	/** 配置项目-默认货币 */
	public final static String CONFIG_ITEM_DEFAULT_CURRENCY = "defaultCurrency";

	/** 配置项目-价格清单最大层级 */
	public final static String CONFIG_ITEM_PRICE_LIST_MAX_LEVEL = "maxPriceListLevel";

	/** 配置项目-按仓库管理物料成本 */
	public final static String CONFIG_ITEM_MANAGE_MATERIAL_COSTS_BY_WAREHOUSE = "materialCostsByWarehouse";

	/** 配置项目-启用物料成本 */
	public final static String CONFIG_ITEM_ENABLE_MATERIAL_COSTS = "enableMaterialCosts";
}
