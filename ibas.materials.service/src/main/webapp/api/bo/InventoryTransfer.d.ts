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
    emItemType,
} from "../Datas";
import {
    IMaterialBatchJournals,
    IMaterialSerialJournals,
    IMaterialBatchJournal,
    IMaterialSerialJournal,
} from "./index";

/** 库存转储 */
export interface IInventoryTransfer extends IBODocument {

    /** 凭证编号 */
    docEntry: number;

    /** 期间编号 */
    docNum: number;

    /** 期间 */
    period: number;

    /** 取消 */
    canceled: emYesNo;

    /** 状态 */
    status: emBOStatus;

    /** 审批状态 */
    approvalStatus: emApprovalStatus;

    /** 单据状态 */
    documentStatus: emDocumentStatus;

    /** 对象类型 */
    objectCode: string;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 修改日期 */
    updateDate: Date;

    /** 修改时间 */
    updateTime: number;

    /** 版本 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据源 */
    dataSource: string;

    /** 创建用户 */
    createUserSign: number;

    /** 修改用户 */
    updateUserSign: number;

    /** 创建动作标识 */
    createActionId: string;

    /** 更新动作标识 */
    updateActionId: string;

    /** 数据所有者 */
    dataOwner: number;

    /** 团队成员 */
    teamMembers: string;

    /** 数据所属组织 */
    organization: string;

    /** 过账日期 */
    postingDate: Date;

    /** 到期日 */
    deliveryDate: Date;

    /** 凭证日期 */
    documentDate: Date;

    /** 参考1 */
    reference1: string;

    /** 参考2 */
    reference2: string;

    /** 已引用 */
    referenced: emYesNo;

    /** 备注 */
    remarks: string;

    /** 单据货币 */
    documentCurrency: string;

    /** 单据交换率 */
    documentRate: number;

    /** 单据总计 */
    documentTotal: number;

    /** 价格清单 */
    priceList: number;

    /** 项目代码 */
    project: string;

    /** 从仓库 */
    fromWarehouse: string;


    /** 库存转储-行集合 */
    inventoryTransferLines: IInventoryTransferLines;


}
/** 库存转储-批次日记账 集合 */
export interface IInventoryTransferLineMaterialBatchJournals extends IBusinessObjects<IMaterialBatchJournal,IInventoryTransferLine> {

}
/**  库存转储-序列号日记账  */
export interface IInventoryTransferLineMaterialSerialJournals extends IBusinessObjects<IMaterialSerialJournal,IInventoryTransferLine> {

}
/** 库存转储-行 集合 */
export interface IInventoryTransferLines extends IBusinessObjects<IInventoryTransferLine, IInventoryTransfer> {

    /** 创建并添加子项 */
    create(): IInventoryTransferLine;
}

/** 库存转储-行 */
export interface IInventoryTransferLine extends IBODocumentLine {

    /** 取消 */
    canceled: emYesNo;

    /** 状态 */
    status: emBOStatus;

    /** 类型 */
    objectCode: string;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 修改日期 */
    updateDate: Date;

    /** 修改时间 */
    updateTime: number;

    /** 版本 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据源 */
    dataSource: string;

    /** 创建用户 */
    createUserSign: number;

    /** 修改用户 */
    updateUserSign: number;

    /** 创建动作标识 */
    createActionId: string;

    /** 更新动作标识 */
    updateActionId: string;

    /** 参考1 */
    reference1: string;

    /** 参考2 */
    reference2: string;

    /** 已引用 */
    referenced: emYesNo;

    /** 基于类型 */
    baseDocumentType: string;

    /** 基于标识 */
    baseDocumentEntry: number;

    /** 基于行号 */
    baseDocumentLineId: number;

    /** 物料/服务描述 */
    itemDescription: string;

    /** 物料类型 */
    itemType: emItemType;

    /** 计量单位 */
    uom: string;

    /** 价格 */
    price: number;

    /** 货币 */
    currency: string;

    /** 汇率 */
    rate: number;

    /** 行总计 */
    lineTotal: number;

    /** 项目代码 */
    project: string;

    // /** 库存发货-行-序列号集合 */
    // materialSerialJournals: IInventoryTransferLineMaterialSerialJournals;

    // /** 库存发货-行-批次集合 */
    // materialBatchJournals: IInventoryTransferLineMaterialBatchJournals
}


