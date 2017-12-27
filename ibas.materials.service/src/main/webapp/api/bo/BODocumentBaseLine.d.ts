/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-26 10:30:00
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-27 15:56:54
 */
import {
    numbers,
    emYesNo,
    objects,
    strings,
    emBOStatus,
    emDocumentStatus,
    IBusinessObjects,
    BusinessObjects,
    BODocumentLine,
    IBODocument,
    IBODocumentLine
} from "ibas/index";
import {
    IMaterialSerialJournals,
    IMaterialBatchJournals,
} from "./index";
/**
 * 出入库业务单据基本行
 */
export interface IBODocumentBaseLine extends IBODocumentLine {
    /** 编码 */
    docEntry: number;

    /** 行号 */
    lineId: number;

    /** 显示顺序 */
    visOrder: number;

    /** 状态 */
    status: emBOStatus;

    /** 单据状态 */
    lineStatus: emDocumentStatus;

    /** 序号管理 */
    serialManagement: emYesNo;

    /** 批号管理 */
    batchManagement: emYesNo;

    /** 数量 */
    quantity: number;

    /** 物料 */
    itemCode: string;
    /** 仓库 */
    warehouse: string;

    /** 库存发货-行-序列号集合 */
    materialSerialJournals: IMaterialSerialJournals<IBODocumentBaseLine>;

    /** 库存发货-行-批次集合 */
    materialBatchJournals: IMaterialBatchJournals<IBODocumentBaseLine>;

}

export interface IBODocumentBaseLines<T extends IBODocumentBaseLine,P extends IBODocument> extends IBusinessObjects<T, P> {

}