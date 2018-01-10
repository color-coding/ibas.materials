package org.colorcoding.ibas.materials.bo.goodsreceipt;

import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournals;

/**
 * @author Fancy
 * @date 2018/1/10
 */
public class GoodsReceiptLineMaterialSerial extends MaterialSerialJournals<IGoodsReceiptLine> implements IGoodsReceiptLineMaterialSerial {

    private static final long serialVersionUID = -7617183654661652010L;

    public GoodsReceiptLineMaterialSerial() {
        super();
    }

    public GoodsReceiptLineMaterialSerial(IGoodsReceiptLine parent) {
        super(parent);
    }
}
