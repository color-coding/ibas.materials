/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 共享的数据
import {
    IServiceContract,
    ServiceProxy,
    strings,
    emDirection,
    MODULE_REPOSITORY_NAME_TEMPLATE,
} from "ibas/index";
import {
    IMaterialBatchJournals,
    IMaterialSerialJournals,
} from "./bo/index";

/** 模块-标识 */
export const CONSOLE_ID: string = "bad47859-3d74-4b2b-975a-48c635406be4";
/** 模块-名称 */
export const CONSOLE_NAME: string = "Materials";
/** 模块-版本 */
export const CONSOLE_VERSION: string = "0.1.0";
/** 业务仓库名称 */
export const BO_REPOSITORY_MATERIALS: string = strings.format(MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
/** 业务对象编码-库存发货 */
export const BO_CODE_GOODSISSUE: string = "${Company}_MM_GOODSISSUE";
/** 业务对象编码-库存收货 */
export const BO_CODE_GOODSRECEIPT: string = "${Company}_MM_GOODSRECEIPT";
/** 业务对象编码-库存转储 */
export const BO_CODE_INVENTORYTRANSFER: string = "${Company}_MM_INVENTORYTRANSFER";
/** 业务对象编码-物料 */
export const BO_CODE_MATERIAL: string = "${Company}_MM_MATERIAL";
/** 业务对象编码-物料扩展 */
export const BO_CODE_PRODUCT: string = "${Company}_MM_PRODUCT";
/** 业务对象编码-物料批次 */
export const BO_CODE_MATERIALBATCH: string = "${Company}_MM_BATCH";
/** 业务对象编码-物料批次凭证 */
export const BO_CODE_MATERIALBATCHJOURNAL: string = "${Company}_MM_BATCHJOURNAL";
/** 业务对象编码-物料序列号 */
export const BO_CODE_MATERIALSERIAL: string = "${Company}_MM_SERIAL";
/** 业务对象编码-物料序列号凭证 */
export const BO_CODE_MATERIALSERIALJOURNAL: string = "${Company}_MM_SERIALJOURNAL";
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
/** 物料发货规则 */
export enum emMaterialIssueRules {
    /** 先进先出 */
    FIRST_IN_FIRST_OUT,
    /** 先进后出 */
    FIRST_IN_LAST_OUT,
    /** 编码排序 */
    ORDER_BY_CODE,
}
/** 批次服务契约 */
export interface IMaterialBatchContract extends IServiceContract {

    /** 物料编号 */
    itemCode: string;

    /** 仓库编码 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    /** 物料批次 */
    materialBatches: IMaterialBatchJournals;
}
/** 序列服务契约 */
export interface IMaterialSerialContract extends IServiceContract {

    /** 物料编号 */
    itemCode: string;

    /** 仓库编码 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    /** 物料序列 */
    materialSerials: IMaterialSerialJournals;
}
/** 物料批次创建服务代理 */
export class MaterialBatchReceiptServiceProxy extends ServiceProxy<IMaterialBatchContract[]> {

}
/** 物料批次选择服务代理 */
export class MaterialBatchIssueServiceProxy extends ServiceProxy<IMaterialBatchContract[]> {

}
/** 物料序列创建服务代理 */
export class MaterialSerialReceiptServiceProxy extends ServiceProxy<IMaterialSerialContract[]> {

}
/** 物料序列选择服务代理 */
export class MaterialSerialIssueServiceProxy extends ServiceProxy<IMaterialSerialContract[]> {

}
