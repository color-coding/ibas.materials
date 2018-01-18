package org.colorcoding.ibas.materials;

/**
 * 我的配置项
 */
public class MyConfiguration extends org.colorcoding.ibas.bobas.MyConfiguration {
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
	/**
	 * 配置项目-文件文件夹
	 */
	public final static String CONFIG_ITEM_MATERIALS_FILE_FOLDER = "MMFileFolder";

	/** 配置项目-默认币种 */
	public final static String CONFIG_ITEM_DEFAULT_CURRENCY = "defaultCurrency";

	/** 配置项目-价格清单最大层级 */
	public final static String CONFIG_ITEM_PRICE_LIST_MAX_LEVEL = "maxPriceListLevel";
}
