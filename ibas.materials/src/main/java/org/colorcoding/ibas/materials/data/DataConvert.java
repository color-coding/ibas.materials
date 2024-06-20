package org.colorcoding.ibas.materials.data;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISort;

/**
 * 数据转换
 * 
 */
public class DataConvert extends org.colorcoding.ibas.bobas.data.DataConvert {

	/**
	 * 过滤查询条件
	 * 
	 * @param criteria 原始查询
	 * @param include  true，包含条件；false，不包含条件
	 * @param alias    条件名称
	 * @return
	 */
	public static ICriteria filterConditions(ICriteria criteria, boolean include, String... alias) {
		if (criteria == null || alias == null || alias.length == 0) {
			return criteria;
		}
		ICriteria tmpCriteria = criteria.clone();
		int cIndex = -1;
		criteria = new Criteria();
		for (int i = 0; i < tmpCriteria.getConditions().size(); i++) {
			ICondition condition = tmpCriteria.getConditions().get(i);
			boolean exist = false;
			for (String item : alias) {
				if (item.equalsIgnoreCase(condition.getAlias())) {
					exist = true;
					cIndex = i;
					break;
				}
			}
			boolean used = false;
			if (exist && include) {
				used = true;
			} else if (!exist && !include) {
				used = true;
			}
			if (used) {
				criteria.getConditions().add(condition);
			} else {
				if (cIndex < i && cIndex >= 0) {
					// 使用的查询以后条件，括号归集到最近使用查询
					if (condition.getBracketOpen() > 0) {
						ICondition tmpCondition = tmpCriteria.getConditions().get(cIndex);
						tmpCondition.setBracketOpen(tmpCondition.getBracketOpen() + condition.getBracketOpen());
					}
					if (condition.getBracketClose() > 0) {
						ICondition tmpCondition = tmpCriteria.getConditions().get(cIndex);
						tmpCondition.setBracketClose(tmpCondition.getBracketClose() + condition.getBracketClose());
					}
				} else {
					if (condition.getBracketOpen() > 0 && i + 1 < tmpCriteria.getConditions().size()) {
						ICondition tmpCondition = tmpCriteria.getConditions().get(i + 1);
						tmpCondition.setBracketOpen(tmpCondition.getBracketOpen() + condition.getBracketOpen());
					}
					if (condition.getBracketClose() > 0 && i + 1 < tmpCriteria.getConditions().size()) {
						ICondition tmpCondition = tmpCriteria.getConditions().get(i + 1);
						tmpCondition.setBracketClose(tmpCondition.getBracketClose() + condition.getBracketClose());
					}
				}
			}
		}
		for (ISort sort : tmpCriteria.getSorts()) {
			boolean exist = false;
			for (String item : alias) {
				if (item.equalsIgnoreCase(sort.getAlias())) {
					exist = true;
					break;
				}
			}
			boolean used = false;
			if (exist && include) {
				used = true;
			} else if (!exist && !include) {
				used = true;
			}
			if (used) {
				criteria.getSorts().add(sort);
			}
		}
		return criteria;
	}

}
