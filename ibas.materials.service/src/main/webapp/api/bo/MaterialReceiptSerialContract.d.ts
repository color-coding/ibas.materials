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
    IMaterialSerialBaseLine,
    IMaterialBaseContract,
} from "./index";
/** 物料出库序列契约 */
export interface IMaterialReceiptSerialContract {
    /** 出库序列契约行 */
    materialReceiptSerialContractLines: IMaterialReceiptSerialContractLine[];
}

export interface IMaterialReceiptSerialContractLine extends IMaterialBaseContract {
    /** 单据号 */
    docEntry?: number;
    /** 单据行号 */
    lineId?: number;
    /** 单据类型 */
    objectType?: string;
    /** 创建的序列 */
    materialReceiptLineSerial?: IMaterialReceiptLineSerial;
}

/** 物料出库行序列信息 */
export interface IMaterialReceiptSerials {
    /** 物料出库行批次信息 */
    materialReceiptLineSerials: IMaterialReceiptLineSerial[];
}

/** 物料出库行序列信息 */
export interface IMaterialReceiptLineSerial {
    /** 行索引 */
    index: number;
    /** 物料批次 选择/新建 集合 */
    materialReceiptSerialLines?: IMaterialReceiptSerialLine[];
}

/** 物料出库序列服务行-新建 */
export interface IMaterialReceiptSerialLine extends IMaterialSerialBaseLine {
    /** 方向 */
    direction: emDirection;

    itemCode?: string;

    warehouse?: string;
}

