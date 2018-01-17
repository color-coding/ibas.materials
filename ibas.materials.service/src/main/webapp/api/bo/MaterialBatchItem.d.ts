/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocument,
    IBODocumentLine,
    IBOSimple,
    IBOSimpleLine
} from "ibas/index";
import {

} from "../Datas";

/** 物料批次项目 */
export interface IMaterialBatchItem extends IBOSimple {

    /** 批次编码 */
    batchCode: string;

    /** 数量 */
    quantity: number;

    /** 基于类型 */
    documentType: string;

    /** 基于标识 */
    documentEntry: number;

    /** 基于行号 */
    documentLineId: number;

    /** 对象编号 */
    objectKey: number;

    /** 对象类型 */
    objectCode: string;

    /** 实例号 */
    logInst: number;

    /** 数据源 */
    dataSource: string;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 更新日期 */
    updateDate: Date;

    /** 更新时间 */
    updateTime: number;

    /** 创建用户 */
    createUserSign: number;

    /** 更新用户 */
    updateUserSign: number;

    /** 创建动作标识 */
    createActionId: string;

    /** 更新动作标识 */
    updateActionId: string;


}

/** 物料批次记录集合 */
export interface IMaterialBatchItems extends IBusinessObjects<IMaterialBatchItem, IMaterialBatchItemParent> {
    /** 创建实例 */
    create(): IMaterialBatchItem;
    create(batchCode: string): IMaterialBatchItem;
    /** 总计 */
    total(): number;
}
/** 物料批次记录父项 */
export interface IMaterialBatchItemParent extends IBusinessObject {

    /** 批号管理 */
    batchManagement: emYesNo;

    /**类型 */
    objectCode: string;

    /**标识 */
    docEntry: number

    /**行号 */
    lineId: number;

    /** 物料 */
    itemCode: string;

    /** 仓库 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    /** 物料批次集合 */
    materialBatches: IMaterialBatchItems;
}