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
    IMaterialBatch,
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
    /** 选择的批次 */
    materialIssueBatchs?: IMaterialIssueBatchs;
}

/** 物料出库行批次信息 */
export interface IMaterialIssueBatchs {
    /** 物料出库行批次信息 */
    materialIssueLineBatchs?: IMaterialIssueBatchLine[];
    /** 创建批次记账 */
    createBatchJournal(data: IMaterialBatchBaseLine): void;
    /** 删除批次记账 */
    deleteBatchJournal(data: IMaterialBatchBaseLine): void;
    /** 修改批次记账 */
    updateBatchJournal(data: IMaterialBatchBaseLine): void;
}

/** 物料出库批次服务行-选择 */
export interface IMaterialIssueBatchLine extends IMaterialBatchBaseLine {
    /** 方向 */
    direction: emDirection;

    itemCode?: string;

    warehouse?: string;
}
