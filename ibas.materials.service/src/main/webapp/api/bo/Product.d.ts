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
import {
    IMaterialBase
} from "./index";
export interface IProduct extends IMaterialBase {
    /** 编号 */
    code: string;

    /** 名称 */
    name: string;

    /** 外文名称 */
    foreignName: string;

    /** 物料组 */
    group: string;

    /** 条形码 */
    barCode: string;

    /** 物料类型 */
    itemType: emItemType;

    /** 采购物料 */
    purchaseItem: emYesNo;

    /** 销售物料 */
    salesItem: emYesNo;

    /** 库存物料 */
    inventoryItem: emYesNo;

    /** 虚拟物料 */
    phantomItem: emYesNo;

    /** 固定资产 */
    fixedAssets: emYesNo;

    /** 缺省仓库 */
    defaultWarehouse: string;

    /** 首选供应商 */
    preferredVendor: string;

    /** 库存单位 */
    inventoryUOM: string;

    /** 对象编号 */
    docEntry: number;

    /** 仓库库存 */
    onHand: number;
    
    /** 价格清单 */
    price: number;
}