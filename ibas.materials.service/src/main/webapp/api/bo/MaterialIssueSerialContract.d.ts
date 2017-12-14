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
    IMaterialSerialBaseLine,
} from "./index";
/** 物料出库序列契约 */
export interface IMaterialIssueSerialContract {
    /** 出库序列契约行 */
    materialIssueSerialContractLines: IMaterialIssueSerialContractLine[];
}

export interface IMaterialIssueSerialContractLine extends IMaterialBaseContract {
    /** 单据号 */
    docEntry?: number;
    /** 单据行号 */
    lineNum?: number;
    /** 单据类型 */
    docType?: string;

    /** 选择的序列 */
    materialLineSerials?: IMaterialIssueSerials;
}

/** 物料出库行序列信息 */
export interface IMaterialIssueSerials {
    /** 物料出库行批次信息 */
    materialIssueLineSerials: IMaterialIssueSerialLine[];
    /** 创建序列记账 */
    createSerialJournal(data: IMaterialIssueSerialLine): any;
    /** 删除序列记账 */
    deleteSerialJournal(data: IMaterialIssueSerialLine): any;
    /** 修改序列记账 */
    updateSerialJournal(data: IMaterialIssueSerialLine): void;
}



/** 物料出库序列服务行-选择 */
export interface IMaterialIssueSerialLine extends IMaterialSerialBaseLine {

    /** 方向 */
    direction: emDirection;

    itemCode?: string;

    warehouse?: string;

    supplierSerial:string;
}
