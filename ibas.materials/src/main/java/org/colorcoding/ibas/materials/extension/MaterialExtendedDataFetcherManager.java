package org.colorcoding.ibas.materials.extension;

import java.lang.reflect.Modifier;

import org.colorcoding.ibas.bobas.bo.BOFactory;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;

/**
 * 物料扩展数据检索管理员
 * 
 * @author Niuren.Zhu
 *
 */
public class MaterialExtendedDataFetcherManager {

	private static MaterialExtendedDataFetcherManager instance;

	public static MaterialExtendedDataFetcherManager create() {
		if (instance == null) {
			synchronized (MaterialExtendedDataFetcherManager.class) {
				if (instance == null) {
					instance = new MaterialExtendedDataFetcherManager();
					instance.init();
				}
			}
		}
		return instance;
	}

	@SuppressWarnings("unchecked")
	protected synchronized void init() {
		String name = this.getClass().getName();
		int index = name.lastIndexOf(".");
		if (index > 0) {
			name = name.substring(0, index);
		}
		Class<?>[] packClass = BOFactory.loadClasses(name);
		for (Class<?> item : packClass) {
			if (item.isInterface()) {
				continue;
			}
			if (Modifier.isAbstract(item.getModifiers())) {
				continue;
			}
			if (IMaterialExtendedDataFetcher.class.isAssignableFrom(item)) {
				this.getFetchers().add((Class<? extends IMaterialExtendedDataFetcher<?>>) item);
			}
		}
	}

	private List<Class<? extends IMaterialExtendedDataFetcher<?>>> fetchers;

	public final List<Class<? extends IMaterialExtendedDataFetcher<?>>> getFetchers() {
		if (this.fetchers == null) {
			this.fetchers = new ArrayList<Class<? extends IMaterialExtendedDataFetcher<?>>>();
		}
		return fetchers;
	}

}
