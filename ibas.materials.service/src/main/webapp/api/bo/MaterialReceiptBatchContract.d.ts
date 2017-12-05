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
    IMaterialBaseContract,
    IMaterialBatchBaseLine,
} from "./index";
/**  */
export interface IMaterialReceiptBatchContract {
    /** 物料批次契约行 */
    materialReceiptBatchContractLines: IMaterialReceiptBatchContractLine[];
}

export interface IMaterialReceiptBatchContractLine extends IMaterialBaseContract {

    /** 单据号 */
    docEntry?: number;
    /** 单据行号 */
    lineId?: number;
    /** 单据类型 */
    objectType?: string;

    /** 创建的物料批次 */
    materialReceiptLineBatch?: IMaterialReceiptLineBatch
}


/** 物料入库行批次信息 */
export interface IMaterialReceiptBatchs {
    /** 物料出库行批次信息 */
    materialReceiptLineBatchs: IMaterialReceiptLineBatch[];
}

/** 物料入库库行批次信息 */
export interface IMaterialReceiptLineBatch {
    /** 行索引 */
    index: number;
    /** 物料批次 选择/新建 集合 */
    materialReceiptBatchLines?: IMaterialReceiptBatchLine[];
}

/** 物料入库批次服务行-新建 */
export interface IMaterialReceiptBatchLine extends IMaterialBatchBaseLine {
    /** 方向 */
    direction: emDirection;

    itemCode?: string;

    warehouse?: string;
}
