package org.colorcoding.ibas.materials.bo.materialserial;

import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBusinessObjects;

/**
 * @author Fancy
 * @date 2017/12/26
 */
public interface IMaterialSerialJournals<P extends IBODocumentLine> extends IBusinessObjects<IMaterialSerialJournal, P> {
    /** 移除批次日记账 */
    void removeAll();

    /** 删除批次日记账 */
    @Override
    void deleteAll();
}