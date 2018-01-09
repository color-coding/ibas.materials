package org.colorcoding.ibas.materials.bo.goodsissue;

import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournals;

/**
 * @author Fancy
 * @date 2018/1/10
 */
public class GoodsIssueLineMaterialBatch extends MaterialBatchJournals<IGoodsIssueLine> implements IGoodsIssueLineMaterialBatch {
    private static final long serialVersionUID = -4665331689207654979L;

    public GoodsIssueLineMaterialBatch() {
        super();
    }

    public GoodsIssueLineMaterialBatch(IGoodsIssueLine parnet) {
        super(parnet);
    }
}
