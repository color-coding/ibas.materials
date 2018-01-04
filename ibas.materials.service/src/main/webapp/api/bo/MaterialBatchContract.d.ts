/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    ArrayList,
    emDirection,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocumentLine,
    IBOSimple,
    IBOSimpleLine,
} from "ibas/index";
import {
    IMaterialBatchJournal,
    IMaterialBatchJournals,
} from "./index";
/**  */
export interface IMaterialBatchContract {

    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;

    /**数量 */
    quantity: number;

    direction?: emDirection;

    /** 创建的物料批次 */
    materialBatchs?: IMaterialBatchs;
}

export interface IMaterialBatchs extends Array<IMaterialBatchJournal>{
    create(batchJournal:IMaterialBatchJournal):void;
    remove(batchJournal:IMaterialBatchJournal):void;
}

