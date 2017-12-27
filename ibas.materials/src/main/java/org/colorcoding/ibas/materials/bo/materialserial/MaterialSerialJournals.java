package org.colorcoding.ibas.materials.bo.materialserial;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.common.*;

import java.beans.PropertyChangeEvent;

/**
 * @author Fancy
 * @date 2017/12/26
 */
public abstract class MaterialSerialJournals<P extends IBODocumentLine> extends BusinessObjects<IMaterialSerialJournal, P> implements IMaterialSerialJournals<P> {

    private static final long serialVersionUID = -8048416425894580761L;
    @Override
    public Class<?> getElementType() {
        return MaterialSerialJournals.class;
    }

    public MaterialSerialJournals() {
        super();
    }

    public MaterialSerialJournals(P parent) {
        super(parent);
    }

    @Override
    public IMaterialSerialJournal create() {
        IMaterialSerialJournal item = new MaterialSerialJournal();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

    @Override
    protected void afterAddItem(IMaterialSerialJournal item) {
        super.afterAddItem(item);
        // TODO 设置关联值
    }

    @Override
    public ICriteria getElementCriteria() {
        ICriteria criteria = new Criteria();
        ICondition condition = criteria.getConditions().create();
        condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getObjectCode());
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getDocEntry());
        condition.setRelationship(ConditionRelationship.AND);
        condition = criteria.getConditions().create();
        condition.setAlias(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID.getName());
        condition.setOperation(ConditionOperation.EQUAL);
        condition.setValue(this.getParent().getLineId());
        condition.setRelationship(ConditionRelationship.AND);
        // TODO 添加关联查询条件
        return criteria;
    }

    @Override
    public void onParentPropertyChanged(PropertyChangeEvent evt) {
        super.onParentPropertyChanged(evt);
    }

    @Override
    public void removeAll() {
        super.removeAll(this);
    }
}
