/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 共享的数据
import {
    strings,
    dates,
    IServiceContract,
    ServiceProxy,
    emDirection,
    MODULE_REPOSITORY_NAME_TEMPLATE,
    Condition,
    ArrayList,
    List,
    ICondition,
    emConditionOperation,
    emConditionRelationship,
    emYesNo,
    ICriteria, Criteria,
} from "ibas/index";
import {
    IMaterialBatchItems,
    IMaterialSerialItems,
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
/** 业务对象编码-物料序列 */
export const BO_CODE_MATERIALSERIAL: string = "${Company}_MM_SERIAL";
/** 业务对象编码-物料序列凭证 */
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
/** 批次服务契约 */
export interface IMaterialBatchContract extends IServiceContract {
    /** 批号管理 */
    batchManagement: emYesNo;
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
    materialBatches: IMaterialBatchItems;
}
/** 序列服务契约 */
export interface IMaterialSerialContract extends IServiceContract {
    /** 序号管理 */
    serialManagement: emYesNo;
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
    materialSerials: IMaterialSerialItems;
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
        export function create(): List<ICondition> {
            let today: string = dates.toString(dates.today(), "yyyy-MM-dd");
            let condition: ICondition;
            let conditions: List<ICondition> = new ArrayList<ICondition>();
            // 激活的
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "activated";
            condition.operation = emConditionOperation.EQUAL;
            condition.value = emYesNo.YES.toString();
            conditions.add(condition);
            // 没删除
            condition = new Condition();
            condition.alias = "deleted";
            condition.operation = emConditionOperation.EQUAL;
            condition.value = emYesNo.NO.toString();
            conditions.add(condition);
            // 有效日期
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.IS_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.relationship = emConditionRelationship.OR;
            condition.bracketOpen = 1;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.NOT_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.bracketClose = 2;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.LESS_EQUAL;
            condition.value = today;
            conditions.add(condition);
            // 失效日期
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.IS_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.relationship = emConditionRelationship.OR;
            condition.bracketOpen = 1;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.NOT_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.bracketClose = 3;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.GRATER_EQUAL;
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
        export function create(): List<ICondition> {
            let today: string = dates.toString(dates.today(), "yyyy-MM-dd");
            let condition: ICondition;
            let conditions: List<ICondition> = new ArrayList<ICondition>();
            // 激活的
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "activated";
            condition.operation = emConditionOperation.EQUAL;
            condition.value = emYesNo.YES.toString();
            conditions.add(condition);
            // 没删除
            condition = new Condition();
            condition.alias = "deleted";
            condition.operation = emConditionOperation.EQUAL;
            condition.value = emYesNo.NO.toString();
            conditions.add(condition);
            // 有效日期
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.IS_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.relationship = emConditionRelationship.OR;
            condition.bracketOpen = 1;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.NOT_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.bracketClose = 2;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.LESS_EQUAL;
            condition.value = today;
            conditions.add(condition);
            // 失效日期
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.IS_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.relationship = emConditionRelationship.OR;
            condition.bracketOpen = 1;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.NOT_NULL;
            conditions.add(condition);
            condition = new Condition();
            condition.bracketClose = 3;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.GRATER_EQUAL;
            condition.value = today;
            conditions.add(condition);
            return conditions;
        }
    }
    export namespace warehouse {
        /** 默认查询条件 */
        export function create(): List<ICondition> {
            let conditions: List<ICondition> = new ArrayList<ICondition>();
            let condition: ICondition;
            // 激活的
            condition = new Condition();
            condition.bracketOpen = 1;
            condition.alias = "activated";
            condition.operation = emConditionOperation.EQUAL;
            condition.value = emYesNo.YES.toString();
            conditions.add(condition);
            // 没删除
            condition = new Condition();
            condition.bracketClose = 1;
            condition.alias = "deleted";
            condition.operation = emConditionOperation.EQUAL;
            condition.value = emYesNo.NO.toString();
            conditions.add(condition);
            return conditions;
        }
    }
    export namespace materialpricelist {
        /** 默认查询条件 */
        export function create(): ICriteria {
            let today: string = dates.toString(dates.today(), "yyyy-MM-dd");
            let criteria: ICriteria = new Criteria();
            // 不加载子项
            criteria.noChilds = true;
            let condition: ICondition;
            // 有效日期
            condition = criteria.conditions.create();
            condition.bracketOpen = 1;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.IS_NULL;
            condition = criteria.conditions.create();
            condition.relationship = emConditionRelationship.OR;
            condition.bracketOpen = 1;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.NOT_NULL;
            condition = criteria.conditions.create();
            condition.bracketClose = 2;
            condition.alias = "validDate";
            condition.operation = emConditionOperation.LESS_EQUAL;
            condition.value = today;
            // 失效日期
            condition = criteria.conditions.create();
            condition.bracketOpen = 1;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.IS_NULL;
            condition = criteria.conditions.create();
            condition.relationship = emConditionRelationship.OR;
            condition.bracketOpen = 1;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.NOT_NULL;
            condition = criteria.conditions.create();
            condition.bracketClose = 2;
            condition.alias = "invalidDate";
            condition.operation = emConditionOperation.GRATER_EQUAL;
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