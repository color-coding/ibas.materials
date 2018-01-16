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
    IBOSimpleLine,
} from "ibas/index";
import {
    emItemType,
} from "../Datas";
/** 商品 */
export interface IProduct extends IBOMasterData {

    /** 编码 */
    code: string;

    /** 名称 */
    name: string;

    /** 外文名称 */
    foreignName: string;

    /** 物料组 */
    group: string;

    /** 激活 */
    activated: emYesNo;

    /** 条形码 */
    barCode: string;

    /** 物料类型 */
    itemType: emItemType;

    /** 库存物料 */
    inventoryItem: emYesNo;

    /** 虚拟物料 */
    phantomItem: emYesNo;

    /** 仓库 */
    warehouse: string;

    /** 价格 */
    price: number;

    /** 货币 */
    currency: string;

    /** 库存 */
    onHand: number;

    /** 已承诺 */
    onCommited: number;

    /** 已订购 */
    onOrdered: number;

    /** 库存单位 */
    inventoryUOM: string;

    /** 序号管理 */
    serialManagement: emYesNo;

    /** 批号管理 */
    batchManagement: emYesNo;

    /** 生效日期 */
    validDate: Date;

    /** 失效日期 */
    invalidDate: Date;

    /** 图片 */
    picture: string;

    /** 对象编号 */
    docEntry: number;

    /** 对象类型 */
    objectCode: string;

    /** 数据所有者 */
    dataOwner: number;

    /** 数据所属组织 */
    organization: string;
}