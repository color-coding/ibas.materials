package org.colorcoding.ibas.materials.bo.goodsreceipt;

import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournals;

/**
 * @author Fancy
 * @date 2018/1/10
 */
public class GoodsReceiptLineMaterialBatch extends MaterialBatchJournals<IGoodsReceiptLine> implements IGoodsReceiptLineMaterialBatch {

    public GoodsReceiptLineMaterialBatch() {
        super();
    }

    public GoodsReceiptLineMaterialBatch(IGoodsReceiptLine parent) {
        super(parent);
    }

    private static final long serialVersionUID = -4398156866300916942L;
}
