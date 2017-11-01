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
export interface IMaterialBatchSerialInOutData extends IBOSimple {
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

    /**总序列号需求 */
    needSerialQuantity: number;

    /**已选择序列号 */
    selectedSerialQuantity: number;

    /**方向 */
    direction: emDirection;

    objectKey: number;
    /** 物料批次分录集合 */
    materialBatchSerialInOutDataBatchJournals: IMaterialBatchSerialInOutDataBatchJournals;
    /** 物料批次分录集合 */
    materialBatchSerialInOutDataSerialJournals: IMaterialBatchSerialInOutDataSerialJournals;
}

/** 库存发货-批次日记账 集合 */
export interface IMaterialBatchSerialInOutDataBatchJournals extends IBusinessObjects<IMaterialBatchJournal, IMaterialBatchSerialInOutData> {
    /** 创建并添加子项 */
    create(): IMaterialBatchJournal;
}
/**  库存发货-序列号日记账  */
export interface IMaterialBatchSerialInOutDataSerialJournals extends IBusinessObjects<IMaterialSerialJournal, IMaterialBatchSerialInOutData> {
    /** 创建并添加子项 */
    create(): IMaterialSerialJournal;
}