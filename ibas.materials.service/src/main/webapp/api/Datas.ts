/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 共享的数据
import {
    ServiceProxy,
    strings,
    emDirection,
    MODULE_REPOSITORY_NAME_TEMPLATE,
} from "ibas/index";
import {
    IMaterialBatchJournals,
    IMaterialSerialJournals,
    IMaterialBatchDocument,
    IMaterialSerialDocument,
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
/**  业务对象编码-物料批次凭证集合 */
export const BO_CODE_MATERIALBATCHJOURNALS: string = "${Company}_MM_BATCHJOURNALS";
/** 业务对象编码-物料序列号 */
export const BO_CODE_MATERIALSERIAL: string = "${Company}_MM_SERIAL";
/** 业务对象编码-物料序列号凭证 */
export const BO_CODE_MATERIALSERIALJOURNAL: string = "${Company}_MM_SERIALJOURNAL";
/** 业务对象编码-物料序列号凭证集合 */
export const BO_CODE_MATERIALSERIALJOURNALS: string = "${Company}_MM_SERIALJOURNALS";
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
/** 业务对象编码-批次管理行 */
export const BO_CODE_MATERIALBATCHDOCUMENT: string = "${Company}_MM_BATCHMANAGEMENTLINES";
/** 业务对象编码-序列管理行 */
export const BO_CODE_MATERIALSERIALDOCUMENT: string = "${Company}_MM_SERIALMANAGEMENTLINES";
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
    FIRST_IN_FIRST_OUT,
    /** 先进后出 */
    FIRST_IN_LAST_OUT,
    /** 编码排序 */
    ORDER_BY_CODE,
}

/** 批次服务契约 */
export interface IMaterialBatchContract {

    /** 物料编号 */
    itemCode: string;

    /** 仓库编码 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    direction?: emDirection;

    /** 创建的物料批次 */
    materialBatchs?: IMaterialBatchJournals<IMaterialBatchDocument>;
}
/** 序列服务契约 */
export interface IMaterialSerialContract {

    /** 物料编号 */
    itemCode: string;

    /** 仓库编码 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    direction?: emDirection;
    /** 创建的序列 */
    materialSerials?: IMaterialSerialJournals<IMaterialSerialDocument>;
}
/** 物料批次创建服务代理 */
export class MaterialReceiptBatchServiceProxy extends ServiceProxy<IMaterialBatchContract[]> {

}
/** 物料批次选择服务代理 */
export class MaterialIssueBatchServiceProxy extends ServiceProxy<IMaterialBatchContract[]> {

}
/** 物料序列创建服务代理 */
export class MaterialReceiptSerialServiceProxy extends ServiceProxy<IMaterialSerialContract[]> {

}
/** 物料序列选择服务代理 */
export class MaterialIssueSerialServiceProxy extends ServiceProxy<IMaterialSerialContract[]> {

}
