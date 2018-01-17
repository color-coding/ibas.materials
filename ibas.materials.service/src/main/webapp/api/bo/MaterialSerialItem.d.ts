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

/** 物料序列项目 */
export interface IMaterialSerialItem extends IBOSimple {

    /** 序列编码 */
    serialCode: string;

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

/** 物料序列记录集合 */
export interface IMaterialSerialItems extends IBusinessObjects<IMaterialSerialItem, IMaterialSerialItemParent> {
    /** 创建实例 */
    create(): IMaterialSerialItem;
    create(serialCode: string): IMaterialSerialItem;
    /** 总计 */
    total(): number;
}
/** 序列管理单据行 */
export interface IMaterialSerialItemParent extends IBusinessObject {

    /** 序号管理 */
    serialManagement: emYesNo;

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

    /** 物料序列集合 */
    materialSerials: IMaterialSerialItems;
}