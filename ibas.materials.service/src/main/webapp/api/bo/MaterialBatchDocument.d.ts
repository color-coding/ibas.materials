/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: Fancy
 * @Date: 2017-12-28 11:30:30
 * @Last Modified by: Fancy
 * @Last Modified time: 2018-01-09 10:50:16
 */

import {
    emDocumentStatus,
    IBODocumentLine,
    IBusinessObject,
    IBusinessObjects,
    IBODocumentLines,
} from "ibas/index";
import {
    IMaterialBatchJournals,
} from "./index";
/** 批次管理单据行 */
export interface IMaterialBatchDocument extends IBusinessObject {

    /** 基于类型 */
    baseDocumentType: string;

    /** 基于标识 */
    baseDocumentEntry: number;

    /** 基于行号 */
    baseDocumentLineId: number;

    /** 物料 */
    itemCode: string;

    /** 仓库 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    /** 行状态 */
    lineStatus: emDocumentStatus;

    /** 批次集合 */
    materialBatchs: IMaterialBatchJournals<IMaterialBatchDocument>;
}

export interface IMaterialBatchDocuments {
    /** 检查批次集合行中的数量与单据行中数量是否相等 */
    checkBatchQuantity(): boolean;
}