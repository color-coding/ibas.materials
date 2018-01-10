package org.colorcoding.ibas.materials.bo.goodsissue;

import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournals;

/**
 * @author Fancy
 * @date 2018/1/10
 */
public class GoodsIssueLineMaterialSerial extends MaterialSerialJournals<IGoodsIssueLine> implements IGoodsIssueLineMaterialSerial {
    private static final long serialVersionUID = 1079229769900697553L;

    public GoodsIssueLineMaterialSerial() {
        super();
    }

    public GoodsIssueLineMaterialSerial(IGoodsIssueLine parent) {
        super(parent);
    }
}
