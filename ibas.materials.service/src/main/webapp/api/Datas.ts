﻿/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 共享的数据
import {
} from "ibas/index";

/** 业务仓库名称 */
export const BO_REPOSITORY_MATERIALS: string = "BORepositoryMaterials";
/** 业务对象编码-库存发货 */
export const BO_CODE_GOODSISSUE: string = "${Company}_MM_GOODSISSUE";
/** 业务对象编码-库存收货 */
export const BO_CODE_GOODSRECEIPT: string = "${Company}_MM_GOODSRECEIPT";
/** 业务对象编码-库存转储 */
export const BO_CODE_INVENTORYTRANSFER: string = "${Company}_MM_INVENTORYTRANSFER";
/** 业务对象编码-物料 */
export const BO_CODE_MATERIAL: string = "${Company}_MM_MATERIAL";
/** 业务对象编码-物料扩展 */
export const BO_CODE_MATERIALEX: string = "${Company}_MM_MATERIALEX";
/** 业务对象编码-物料批次 */
export const BO_CODE_MATERIALBATCH: string = "${Company}_MM_BATCH";
/** 业务对象编码-物料批次凭证 */
export const BO_CODE_MATERIALBATCHJOURNAL: string = "${Company}_MM_BATCHJOURNAL";
/**  业务对象编码-物料批次接口 */
export const BO_CODE_MATERIALBATCHSERIALDATA: string = "${Company}_MM_BATCHJOURNAL";
/** 业务对象编码-物料批次-入 */
export const BO_CODE_RECEIPT_MATERIALBATCH: string = "${Company}_MM_RECEIEPT_BATCH";
/** 业务对象编码-物料批次-出 */
export const BO_CODE_ISSUE_MATERIALBATCH: string = "${Company}_MM_ISSUE_BATCH";
/** 业务对象编码-物料序列号 */
export const BO_CODE_MATERIALSERIAL: string = "${Company}_MM_SERIAL";
/** 业务对象编码-物料序列号凭证 */
export const BO_CODE_MATERIALSERIALJOURNAL: string = "${Company}_MM_SERIALJOURNAL";
/** 业务对象编码-物料序列号-入 */
export const BO_CODE_RECEIPT_MATERIALSERIAL: string = "${Company}_MM_RECEIEPT_SERIAL";
/** 业务对象编码-物料序列号-出 */
export const BO_CODE_ISSUE_MATERIALSERIAL: string = "${Company}_MM_ISSUE_SERIAL";
/** 业务对象编码-物料组 */
export const BO_CODE_MATERIALGROUP: string = "${Company}_MM_MATERIALGROUP";
/** 业务对象编码-物料库存 */
export const BO_CODE_MATERIALINVENTORY: string = "${Company}_MM_MATERIALINVENTORY";
/** 业务对象编码-仓库日记账 */
export const BO_CODE_MATERIALJOURNAL: string = "${Company}_MM_MATERIALJOURNAL";
/** 业务对象编码-仓库 */
export const BO_CODE_WAREHOUSE: string = "${Company}_MM_WAREHOUSE";
/** 业务对象编码-价格清单 */
export const BO_CODE_MATERIALPRICELIST: string = "${Company}_MM_PRICELIST";

/** 物料类型 */
export enum emItemType {
    /** 物料 */
    ITEM,
    /** 服务 */
    SERVICES,
}

/** 排序规则 */
export enum emAutoSelectBatchSerialRules {
    /** 先进先出 */
    FIRSTINFIRSTOUT,
    /** 先进后出 */
    FIRSTINLASTOUT,
    /** 编码排序 */
    ORDERBYCODE,
}
