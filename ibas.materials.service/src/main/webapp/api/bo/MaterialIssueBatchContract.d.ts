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
export interface IMaterialIssueBatchContract {
    /** 物料批次契约行 */
    materialIssueBatchContractLines: IMaterialIssueBatchContractLine[];
}

export interface IMaterialIssueBatchContractLine extends IMaterialBaseContract {
    /** 单据类型 */
    docType?: string;
    /** 单据号 */
    docEntry?: number;
    /** 单据行号 */
    lineNum?: number;
    /** 单据类型 */
    objectType?: string;
    /** 选择的批次 */
    materialIssueLineBatch?: IMaterialIssueLineBatch;
}

/** 物料出库行批次信息 */
export interface IMaterialIssueBatchs {
    /** 物料出库行批次信息 */
    materialIssueLineBatchs: IMaterialIssueLineBatch[];
}

/** 物料出库行批次信息 */
export interface IMaterialIssueLineBatch {
    /** 行索引 */
    index: number;
    /** 物料批次 选择/新建 集合 */
    materialIssueBatchLines?: IMaterialIssueBatchLine[];
}


/** 物料出库批次服务行-选择 */
export interface IMaterialIssueBatchLine extends IMaterialBatchBaseLine {
    /** 方向 */
    direction: emDirection;

    itemCode?: string;

    warehouse?: string;
}
