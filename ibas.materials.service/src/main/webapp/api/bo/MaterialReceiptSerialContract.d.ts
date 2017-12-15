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
    lineNum?: number;
    /** 单据类型 */
    docType?: string;
    /** 创建的序列 */
    materialLineSerials?: IMaterialReceiptSerials;
}

/** 物料出库行序列信息 */
export interface IMaterialReceiptSerials {
    /** 物料出库行批次信息 */
    materialReceiptLineSerials: IMaterialReceiptSerialLine[];
    /**
     * 创建序列记账 返回创建者
     */
    createSerialJournal(data: IMaterialSerialBaseLine): any;
    /**
     * 删除序列记账 返回更新者
     */
    deleteSerialJournal(data: IMaterialSerialBaseLine): any;
    /** 修改序列记账 */
    updateSerialJournal(data: IMaterialSerialBaseLine): void;
}


/** 物料出库序列服务行-新建 */
export interface IMaterialReceiptSerialLine extends IMaterialSerialBaseLine {
    /** 方向 */
    direction: emDirection;

    itemCode?: string;

    warehouse?: string;

    supplierSerial?:string;
}

