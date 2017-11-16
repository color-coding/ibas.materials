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
    IBOSimpleLine,
} from "ibas/index";
import {
    IMaterialBatchJournal,
    IMaterialSerialJournal
} from "./index";
export interface IMaterialBatchService extends IBOSimple {
    /** table 行index索引 */
    index: number;

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

    objectKey: number;
    /** 物料批次分录集合 */
    materialBatchServiceJournals: IMaterialBatchServiceJournals;
}

/** 库存发货-批次日记账 集合 */
export interface IMaterialBatchServiceJournals extends IBusinessObjects<IMaterialBatchJournal, IMaterialBatchService> {
    /** 创建并添加子项 */
    create(): IMaterialBatchJournal;
}