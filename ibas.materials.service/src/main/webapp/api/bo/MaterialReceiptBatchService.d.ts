/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-08 11:44:52
 * @Last Modified by:   fancy
 * @Last Modified time: 2017-12-08 11:44:52
 */


import {
    emDirection,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBOSimple,
    IBOSimpleLine,
} from "ibas/index";
import {
    IMaterialBatch,
    IMaterialBatchJournal,
    IMaterialIssueBatchLine,
    IMaterialReceiptBatchJournals,
} from "./index";
export interface IMaterialReceiptBatchService extends IBusinessObject {
    /** table 行index索引 */
    index: number;

    /** 单据类型 */
    docType: string;

    /** 单据编号 */
    docEntry: number;

    /** 单据行号 */
    lineNum: number

    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;

    /**数量 */
    quantity: number;

    /**总批次需求 */
    needBatchQuantity: number;

    /**已选择批次 */
    selectedBatchQuantity: number;

    /**方向 */
    direction: emDirection;

    /** 物料批次分录集合 */
    materialBatchJournals: IMaterialReceiptBatchJournals;
}
/** 库存发货-批次日记账 集合 */
export interface IMaterialReceiptBatchJournals extends IBusinessObjects<IMaterialBatchJournal, IMaterialReceiptBatchService> {
    /** 创建并添加子项 */
    create(): IMaterialBatchJournal;
}