/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    /** 模块-标识 */
    export const CONSOLE_ID: string = "bad47859-3d74-4b2b-975a-48c635406be4";
    /** 模块-名称 */
    export const CONSOLE_NAME: string = "Materials";
    /** 模块-版本 */
    export const CONSOLE_VERSION: string = "0.1.0";

    export namespace bo {
        /** 业务仓库名称 */
        export const BO_REPOSITORY_MATERIALS: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
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
        /** 业务对象编码-物料序列 */
        export const BO_CODE_MATERIALSERIAL: string = "${Company}_MM_SERIAL";
        /** 业务对象编码-物料序列凭证 */
        export const BO_CODE_MATERIALSERIALJOURNAL: string = "${Company}_MM_SERIALJOURNAL";
        /** 业务对象编码-物料组 */
        export const BO_CODE_MATERIALGROUP: string = "${Company}_MM_MATERIALGROUP";
        /** 业务对象编码-物料库存 */
        export const BO_CODE_MATERIALINVENTORY: string = "${Company}_MM_INVENTORY";
        /** 业务对象编码-仓库日记账 */
        export const BO_CODE_MATERIALJOURNAL: string = "${Company}_MM_MATERIALJOURNAL";
        /** 业务对象编码-仓库 */
        export const BO_CODE_WAREHOUSE: string = "${Company}_MM_WAREHOUSE";
        /** 业务对象编码-价格清单 */
        export const BO_CODE_MATERIALPRICELIST: string = "${Company}_MM_PRICELIST";
        /** 业务对象编码-物料序列项目 */
        export const BO_CODE_MATERIALSERIALITEM: string = "${Company}_MM_SERIALITEM";
        /** 业务对象编码-物料批次项目 */
        export const BO_CODE_MATERIALBATCHITEM: string = "${Company}_MM_BATCHITEM";

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
    }

    export namespace app {
        /** 批次服务契约 */
        export interface IMaterialBatchContract extends ibas.IServiceContract {
            /** 批号管理 */
            batchManagement: ibas.emYesNo;
            /** 物料编号 */
            itemCode: string;
            /** 物料描述 */
            itemDescription: string;
            /** 仓库编码 */
            warehouse: string;
            /** 数量 */
            quantity: number;
            /** 单位 */
            uom: string;
            /** 物料批次 */
            materialBatches: bo.IMaterialBatchItems;
        }
        /** 序列服务契约 */
        export interface IMaterialSerialContract extends ibas.IServiceContract {
            /** 序号管理 */
            serialManagement: ibas.emYesNo;
            /** 物料编号 */
            itemCode: string;
            /** 物料描述 */
            itemDescription: string;
            /** 仓库编码 */
            warehouse: string;
            /** 数量 */
            quantity: number;
            /** 单位 */
            uom: string;
            /** 物料序列 */
            materialSerials: bo.IMaterialSerialItems;
        }
        /** 物料批次创建服务代理 */
        export class MaterialBatchReceiptServiceProxy extends ibas.ServiceProxy<IMaterialBatchContract[]> {

        }
        /** 物料批次选择服务代理 */
        export class MaterialBatchIssueServiceProxy extends ibas.ServiceProxy<IMaterialBatchContract[]> {

        }
        /** 物料序列创建服务代理 */
        export class MaterialSerialReceiptServiceProxy extends ibas.ServiceProxy<IMaterialSerialContract[]> {

        }
        /** 物料序列选择服务代理 */
        export class MaterialSerialIssueServiceProxy extends ibas.ServiceProxy<IMaterialSerialContract[]> {

        }
        /** 查询条件 */
        export namespace conditions {
            export namespace material {
                /** 查询条件字段-销售物料 */
                export const CONDITION_ALIAS_SALES_ITEM: string = "SalesItem";
                /** 查询条件字段-采购物料 */
                export const CONDITION_ALIAS_PURCHASE_ITEM: string = "PurchaseItem";
                /** 查询条件字段-库存物料 */
                export const CONDITION_ALIAS_INVENTORY_ITEM: string = "InventoryItem";
                /** 查询条件字段-物料类型 */
                export const CONDITION_ALIAS_ITEM_TYPE: string = "ItemType";
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "Activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.alias = "Deleted";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 3;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace product {
                /** 查询条件字段-仓库（关系为或） */
                export const CONDITION_ALIAS_WAREHOUSE: string = "WhsCode";
                /** 查询条件字段-价格清单 */
                export const CONDITION_ALIAS_PRICELIST: string = "PriceList";
                /** 查询条件字段-销售物料 */
                export const CONDITION_ALIAS_SALES_ITEM: string = "SalesItem";
                /** 查询条件字段-采购物料 */
                export const CONDITION_ALIAS_PURCHASE_ITEM: string = "PurchaseItem";
                /** 查询条件字段-库存物料 */
                export const CONDITION_ALIAS_INVENTORY_ITEM: string = "InventoryItem";
                /** 查询条件字段-物料类型 */
                export const CONDITION_ALIAS_ITEM_TYPE: string = "ItemType";
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "Activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.alias = "Deleted";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 3;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace warehouse {
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    let condition: ibas.ICondition;
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "Activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.bracketClose = 1;
                    condition.alias = "Deleted";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace materialpricelist {
                /** 默认查询条件 */
                export function create(): ibas.ICriteria {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    // 不加载子项
                    criteria.noChilds = true;
                    let condition: ibas.ICondition;
                    // 有效日期
                    condition = criteria.conditions.create();
                    condition.bracketOpen = 1;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    condition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    condition = criteria.conditions.create();
                    condition.bracketClose = 2;
                    condition.alias = "ValidDate";
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    // 失效日期
                    condition = criteria.conditions.create();
                    condition.bracketOpen = 1;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    condition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    condition = criteria.conditions.create();
                    condition.bracketClose = 2;
                    condition.alias = "InvalidDate";
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    return criteria;
                }
            }
            export namespace materialprice {
                /** 查询条件字段-物料编码 */
                export const CONDITION_ALIAS_ITEMCODE: string = "ItemCode";
                /** 查询条件字段-物料名称 */
                export const CONDITION_ALIAS_ITEMNAME: string = "ItemName";
                /** 查询条件字段-价格清单 */
                export const CONDITION_ALIAS_PRICELIST: string = "PriceList";
            }
            export namespace materialquantity {
                /** 查询条件字段-物料编码 */
                export const CONDITION_ALIAS_ITEMCODE: string = "ItemCode";
                /** 查询条件字段-物料名称 */
                export const CONDITION_ALIAS_ITEMNAME: string = "ItemName";
                /** 查询条件字段-仓库（关系为或） */
                export const CONDITION_ALIAS_WAREHOUSE: string = "WhsCode";
            }
        }
    }
}