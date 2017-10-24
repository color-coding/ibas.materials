/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emDirection,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBOSimple,
} from "ibas/index";
import {
    IMaterialBatchJournal,
    IMaterialSerialJournal
} from "./index";
export interface IMaterialBatchInput extends IBOSimple {
    /** table 行index索引 */
    index: number;

    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;

    /**数量 */
    quantity: number;

    /**总需求 */
    needQuantity: number;

    /**已批次 */
    selectedQuantity: number;

    /**方向 */
    direction: emDirection;

    objectKey: number;
    /** 物料批次分录集合 */
    materialBatchInputBatchJournals: IMaterialBatchInputBatchJournals;
    /** 物料批次分录集合 */
    materialBatchInputSerialJournals: IMaterialBatchInputSerialJournals;
}

/** 库存发货-批次日记账 集合 */
export interface IMaterialBatchInputBatchJournals extends IBusinessObjects<IMaterialBatchJournal, IMaterialBatchInput> {
    /** 创建并添加子项 */
    create(): IMaterialBatchJournal;
}
/**  库存发货-序列号日记账  */
export interface IMaterialBatchInputSerialJournals extends IBusinessObjects<IMaterialSerialJournal, IMaterialBatchInput> {
    /** 创建并添加子项 */
    create(): IMaterialSerialJournal;
}