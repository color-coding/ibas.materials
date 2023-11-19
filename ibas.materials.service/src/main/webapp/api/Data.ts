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

    export namespace config {
        /**
         * 获取此模块配置
         * @param key 配置项
         * @param defalut 默认值
         */
        export function get<T>(key: string, defalut?: T): T {
            return ibas.config.get(ibas.strings.format("{0}|{1}", CONSOLE_ID, key), defalut);
        }
    }
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
        /** 业务对象编码-库存盘点 */
        export const BO_CODE_INVENTORYCOUNTING: string = "${Company}_MM_INVENTORYCOUNTING";
        /** 业务对象编码-物料规格 */
        export const BO_CODE_MATERIALSPECIFICATION: string = "${Company}_MM_MATERIALSPEC";
        /** 业务对象编码-规格模板 */
        export const BO_CODE_SPECIFICATION: string = "${Company}_MM_SPEC";
        /** 业务对象编码-计量单位 */
        export const BO_CODE_UNIT: string = "${Company}_MM_UNIT";
        /** 业务对象编码-计量单位换算率 */
        export const BO_CODE_UNITRATE: string = "${Company}_MM_UNITRATE";
        /** 业务对象编码-物料版本 */
        export const BO_CODE_MATERIALVERSION: string = "${Company}_MM_MATERIALVERSION";
        /** 业务对象编码-物料废品率 */
        export const BO_CODE_MATERIALSCRAP: string = "${Company}_MM_MATERIALSCRAP";
        /** 业务对象编码-物料库存预留 */
        export const BO_CODE_MATERIALINVENTORYRESERVATION: string = "${Company}_MM_RESERVATION";
        /** 业务对象编码-物料替代 */
        export const BO_CODE_MATERIALSUBSTITUTE: string = "${Company}_MM_SUBSTITUTE";
        /** 业务对象编码-物料订购预留 */
        export const BO_CODE_MATERIALORDEREDRESERVATION: string = "${Company}_MM_ORDEREDRESERVATION";
        /** 业务对象编码-仓库预估日记账 */
        export const BO_CODE_MATERIALESTIMATEJOURNAL: string = "${Company}_MM_ESTIMATEJOURNAL";
        /** 业务对象编码-拣配清单 */
        export const BO_CODE_PICKLISTS: string = "${Company}_MM_PICKLISTS";

        /** 物料类型 */
        export enum emItemType {
            /** 物料 */
            ITEM,
            /** 服务 */
            SERVICES,
        }
        /** 预估类型 */
        export enum emEstimateType {
            /**
             * 订购的
             */
            ORDERED,
            /**
             * 承诺的
             */
            COMMITED,
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
        /** 库存调整 */
        export enum emInventoryAdjustment {
            /** 盘盈 */
            OVER,
            /** 盘亏 */
            SHORT,
        }
        /** 规格目标 */
        export enum emSpecificationTarget {
            /**
             * 物料
             */
            MATERIAL,
            /**
             * 物料组
             */
            MATERIAL_GROUP,
        }
        /** 规格分配 */
        export enum emSpecificationAssigned {
            /**
             * 业务伙伴组
             */
            BUSINESS_PARTNER_GROUP,
            /**
             * 客户
             */
            CUSTOMER,
            /**
             * 供应商
             */
            SUPPLIER,
        }
        /** 发货方式 */
        export enum emIssueMethod {
            /**
             * 手动
             */
            MANUALLY,
            /**
             * 倒冲
             */
            BACKFLUSHING
        }
        /** 计划方式 */
        export enum emPlanningMethod {

            /**
             * 无
             */
            NONE,
            /**
             * 物料需求计划
             */
            MRP
        }
        /** 获取方式 */
        export enum emProcurementMethod {
            /**
             * 采购
             */
            BUY,
            /**
             * 生产
             */
            MAKE,
        }
        /** 评估方法 */
        export enum emValuationMethod {
            /**
             * 移动平均
             */
            MOVING_AVERAGE,
        }
        /**
         * 拣配状态
         */
        export enum emPickStatus {
            /**
             * 已审批
             */
            RELEASED,
            /**
             * 已拣配
             */
            PICKED,
            /**
             * 已部分拣配
             */
            PARTIALLYPICKED,
            /**
             * 已部分交货
             */
            PARTIALLYDELIVERED,
            /**
             * 已结算
             */
            CLOSED
        }
    }

    export namespace app {
        /** 服务额外结果 */
        export interface IServiceExtraResult<T> extends ibas.IList<T> {
            /** 保存额外结果 */
            save(fnBack: (error?: Error) => void): void;
        }
        /** 额外数据-序列 */
        export interface IExtraResultMaterialSerial {
            /** 物料编码 */
            readonly itemCode: string;
            /** 仓库编码 */
            readonly warehouse: string;
            /** 序列编号 */
            readonly serialCode: string;
            /** 供应商序号 */
            supplierSerial: string;
            /** 批次序号 */
            batchSerial: string;
            /** 过期日期 */
            expirationDate: Date;
            /** 生产日期 */
            manufacturingDate: Date;
            /** 物料规格 */
            specification: number;
            /** 准入日期 */
            admissionDate: Date;
            /** 保修开始日期 */
            warrantyStartDate: Date;
            /** 保修结束日期 */
            warrantyEndDate: Date;
            /** 位置 */
            location: string;
            /** 版本 */
            version: string;
            /** 备注 */
            notes: string;
        }
        /** 服务额外结果-序列 */
        export interface IServiceExtraSerials extends IServiceExtraResult<IExtraResultMaterialSerial> {
        }
        /** 额外数据-批次 */
        export interface IExtraResultMaterialBatch {
            /** 物料编码 */
            readonly itemCode: string;
            /** 仓库编码 */
            readonly warehouse: string;
            /** 批次编号 */
            readonly batchCode: string;
            /** 供应商序号 */
            supplierSerial: string;
            /** 过期日期 */
            expirationDate: Date;
            /** 生产日期 */
            manufacturingDate: Date;
            /** 准入日期 */
            admissionDate: Date;
            /** 物料规格 */
            specification: number;
            /** 位置 */
            location: string;
            /** 版本 */
            version: string;
            /** 备注 */
            notes: string;
        }
        /** 服务额外结果-批次 */
        export interface IServiceExtraBatches extends IServiceExtraResult<IExtraResultMaterialBatch> {
        }
        /** 批次服务契约 */
        export interface IMaterialBatchContract extends ibas.IServiceContract {
            /** 批号管理 */
            batchManagement: ibas.emYesNo;
            /** 物料编码 */
            itemCode: string;
            /** 物料描述 */
            itemDescription: string;
            /** 物料版本 */
            itemVersion?: string;
            /** 仓库编码 */
            warehouse: string;
            /** 数量 */
            quantity: number;
            /** 单位 */
            uom: string;
            /** 物料批次 */
            materialBatches: bo.IMaterialBatchItems;
            /** 物料批次数据 */
            batches?: IExtraResultMaterialBatch[];
            /** 单据类型 */
            documentType?: string;
            /** 单据编号 */
            documentEntry?: number;
            /** 单据行号 */
            documentLineId?: number;
        }
        /** 序列服务契约 */
        export interface IMaterialSerialContract extends ibas.IServiceContract {
            /** 序号管理 */
            serialManagement: ibas.emYesNo;
            /** 物料编码 */
            itemCode: string;
            /** 物料描述 */
            itemDescription: string;
            /** 物料版本 */
            itemVersion?: string;
            /** 仓库编码 */
            warehouse: string;
            /** 数量 */
            quantity: number;
            /** 单位 */
            uom: string;
            /** 物料序列 */
            materialSerials: bo.IMaterialSerialItems;
            /** 物料序列数据 */
            serials?: IExtraResultMaterialSerial[];
            /** 单据类型 */
            documentType?: string;
            /** 单据编号 */
            documentEntry?: number;
            /** 单据行号 */
            documentLineId?: number;
        }
        /** 物料批次创建服务代理 */
        export class MaterialBatchReceiptServiceProxy extends ibas.ServiceProxy<IMaterialBatchContract[]> {

        }
        /** 物料批次选择服务代理 */
        export class MaterialBatchIssueServiceProxy extends ibas.ServiceProxy<IMaterialBatchContract[]> {

        }
        /** 物料批次列表服务代理 */
        export class MaterialBatchListServiceProxy extends ibas.ServiceProxy<IMaterialBatchContract[]> {

        }
        /** 物料序列创建服务代理 */
        export class MaterialSerialReceiptServiceProxy extends ibas.ServiceProxy<IMaterialSerialContract[]> {

        }
        /** 物料序列选择服务代理 */
        export class MaterialSerialIssueServiceProxy extends ibas.ServiceProxy<IMaterialSerialContract[]> {

        }
        /** 物料序列列表服务代理 */
        export class MaterialSerialListServiceProxy extends ibas.ServiceProxy<IMaterialSerialContract[]> {

        }
        /** 规格服务契约 */
        export interface ISpecificationTreeContract extends ibas.IServiceContract {
            /** 目标：物料编码或物料规格 */
            target: string | bo.IMaterialSpecification;
            /** 目标：客户 */
            customer?: string;
            /** 目标：供应商 */
            supplier?: string;
            /** 目标：日期 */
            date?: Date;
            /** 名称 */
            name?: string;
            /** 项目 */
            project?: string;
            /** 备注 */
            remarks?: string;
        }
        /** 规格服务代理 */
        export class SpecificationTreeServiceProxy extends ibas.ServiceProxy<ISpecificationTreeContract> {

        }
        /** 物料库存预留服务契约 */
        export interface IMaterialInventoryReservationTarget extends ibas.IServiceContract {
            targetType: string;
            targetEntry: number;
            businessPartner?: string;
            items: IMaterialInventoryReservationTargetLine[];
        }
        export interface IMaterialInventoryReservationTargetLine {
            targetLineId: number;
            itemCode: string;
            itemDescription?: string;
            itemVersion?: string;
            quantity: number;
            uom: string;
            warehouse?: string;
            serialManagement?: ibas.emYesNo;
            batchManagement?: ibas.emYesNo;
            mixingBatches?: ibas.emYesNo;
        }
        /** 物料库存预留服务代理 */
        export class MaterialInventoryReservationServiceProxy
            extends ibas.ServiceProxy<IMaterialInventoryReservationTarget | IMaterialInventoryReservationTarget[]> {

        }
        /** 物料订购预留服务契约 */
        export interface IMaterialOrderedReservationSource extends ibas.IServiceContract {
            sourceType: string;
            sourceEntry: number;
            items: IMaterialOrderedReservationSourceLine[];
        }
        export interface IMaterialOrderedReservationSourceLine {
            sourceLineId: number;
            itemCode: string;
            itemDescription: string;
            quantity: number;
            uom: string;
            deliveryDate?: Date;
            warehouse?: string;
            targetType?: string;
            targetEntry?: number;
            targetLineId?: number;
        }
        /** 物料订购预留服务代理 */
        export class MaterialOrderedReservationServiceProxy
            extends ibas.ServiceProxy<IMaterialOrderedReservationSource | IMaterialOrderedReservationSource[]> {

        }
        export interface IMaterialOrderedReservationTarget {
            itemCode: string;
            itemDescription?: string;
            quantity: number;
            uom: string;
            warehouse?: string;
            deliveryDate?: Date;
            onReserved: (documentType: string, docEntry: number, lineId: number, quantity: number, deliveryDate?: Date) => void;
        }
        /** 物料订购预留目标单据服务代理 */
        export class MaterialOrderedReservationTargetServiceProxy extends ibas.ServiceProxy<IMaterialOrderedReservationTarget> {

        }
        /** 物料订购预留源单据服务代理 */
        export class MaterialOrderedReservationSourceServiceProxy extends ibas.ServiceProxy<IMaterialOrderedReservationTarget> {

        }
        /** 拣配目标 */
        export interface IPickListsTarget {
            /** 基于类型 */
            baseDocumentType: string;
            /** 基于标识 */
            baseDocumentEntry: number;
            /** 基于行号 */
            baseDocumentLineId: number;
            /** 单据日期 */
            documentDate: Date;
            /** 交货/到期日期 */
            deliveryDate: Date;
            /** 物料编码 */
            itemCode: string;
            /** 未清数量 */
            unclosedQuantity: number;
            /** 下达数量 */
            releasedQuantity?: number;
            /** 单位 */
            uom: string;
            /** 库存单位 */
            inventoryUOM: string;
            /** 单位换算率 */
            uomRate: number;
            /** 库存数量 */
            inventoryQuantity: number;
            /** 仓库 */
            warehouse: string;
            /** 业务伙伴编码 */
            cardCode?: string;
            /** 业务伙伴名称 */
            cardName?: string;
            /** 物料/服务描述 */
            itemDescription?: string;
            /** 物料标识 */
            itemSign?: string;
            /** 序号管理 */
            serialManagement?: ibas.emYesNo;
            /** 批号管理 */
            batchManagement?: ibas.emYesNo;
            /** 备注 */
            remarks?: string;
        }
        export interface IMaterialPackingTarget extends ibas.IServiceContract {
            /** 是否查询全部 */
            isFetchAll?: boolean;
            /** 查询条件 */
            criteria?: ibas.ICriteria | ibas.ICondition[];
            /** 选中拣配内容后 */
            onPicked?(targets: IPickListsTarget[]): void;
            /** 交货内容 */
            toDelivery?: bo.IPickListsLine[];
            /** 交货后 */
            onDelivered?(targets: bo.IPickListsLine[] | Error): void;
        }
        /** 物料拣配目标单据服务代理 */
        export class MaterialPackingTargetServiceProxy extends ibas.ServiceProxy<IMaterialPackingTarget> {

        }
        export interface IInventoryTransferTarget extends ibas.IServiceContract {
            /** 从仓库 */
            fromWarehouse?: string;
            /** 到仓库 */
            toWarehouse?: string;
            onAdded?(targets: bo.IInventoryTransferLine[]): void;
        }
        /** 物料库存转储添加服务代理 */
        export class MaterialInventoryTransAddServiceProxy extends ibas.ServiceProxy<IInventoryTransferTarget> {

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
                /** 查询条件字段-虚拟物料 */
                export const CONDITION_ALIAS_PHANTOM_ITEM: string = "PhantomItem";
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_ACTIVATED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_DELETED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = bo.Material.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 3;
                    condition.alias = bo.Material.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 审批通过的或未进审批
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_APPROVALSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emApprovalStatus.APPROVED.toString();
                    condition.bracketOpen = 1;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_APPROVALSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emApprovalStatus.UNAFFECTED.toString();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketClose = 1;
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
                /** 查询条件字段-虚拟物料 */
                export const CONDITION_ALIAS_PHANTOM_ITEM: string = "PhantomItem";
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
                    condition.alias = bo.Material.PROPERTY_ACTIVATED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_DELETED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = bo.Material.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.Material.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 3;
                    condition.alias = bo.Material.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 审批通过的或未进审批
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_APPROVALSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emApprovalStatus.APPROVED.toString();
                    condition.bracketOpen = 1;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_APPROVALSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emApprovalStatus.UNAFFECTED.toString();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketClose = 1;
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace warehouse {
                /** 默认查询条件 */
                export function create(branch?: string): ibas.IList<ibas.ICondition> {
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    let condition: ibas.ICondition;
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.Warehouse.PROPERTY_ACTIVATED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.bracketClose = 1;
                    condition.alias = bo.Warehouse.PROPERTY_DELETED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    // 审批通过的或未进审批
                    condition = new ibas.Condition();
                    condition.alias = bo.Warehouse.PROPERTY_APPROVALSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emApprovalStatus.APPROVED.toString();
                    condition.bracketOpen = 1;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.alias = bo.Warehouse.PROPERTY_APPROVALSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emApprovalStatus.UNAFFECTED.toString();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketClose = 1;
                    conditions.add(condition);
                    // 未指定的分支
                    condition = new ibas.Condition();
                    condition.alias = bo.Warehouse.PROPERTY_BRANCH_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = "";
                    condition.bracketOpen = 1;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.alias = bo.Warehouse.PROPERTY_BRANCH_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketClose = 1;
                    conditions.add(condition);
                    if (!ibas.strings.isEmpty(branch)) {
                        condition = new ibas.Condition();
                        condition.alias = bo.Warehouse.PROPERTY_BRANCH_NAME;
                        condition.operation = ibas.emConditionOperation.EQUAL;
                        condition.value = branch;
                        conditions.add(condition);
                    }
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
                    condition.alias = bo.MaterialPriceList.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    condition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialPriceList.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    condition = criteria.conditions.create();
                    condition.bracketClose = 2;
                    condition.alias = bo.MaterialPriceList.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    // 失效日期
                    condition = criteria.conditions.create();
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialPriceList.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    condition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialPriceList.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    condition = criteria.conditions.create();
                    condition.bracketClose = 2;
                    condition.alias = bo.MaterialPriceList.PROPERTY_INVALIDDATE_NAME;
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
                /** 查询条件字段-物料标记 */
                export const CONDITION_ALIAS_ITEMSIGN: string = "ItemSign";
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
            export namespace specificationtree {
                /** 查询条件字段-规格模板 */
                export const CONDITION_ALIAS_TEMPLATE: string = "Template";
                /** 查询条件字段-物料 */
                export const CONDITION_ALIAS_MATERIAL: string = "Material";
                /** 查询条件字段-日期 */
                export const CONDITION_ALIAS_DATE: string = "Date";
                /** 查询条件字段-客户 */
                export const CONDITION_ALIAS_CUSTOMER: string = "Customer";
                /** 查询条件字段-供应商 */
                export const CONDITION_ALIAS_SUPPLIER: string = "Supplier";

            }
            export namespace unitrate {
                export const CONDITION_VALUE_TEMPLATE: string = "Code = {0}";
                /** 默认查询条件 */
                export function create(material: string | bo.IMaterial): ibas.ICriteria {
                    let condition: ibas.ICondition;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    if (typeof material === "string") {
                        condition = criteria.conditions.create();
                        condition.alias = bo.UnitRate.PROPERTY_CONDITION_NAME;
                        condition.value = ibas.strings.format(CONDITION_VALUE_TEMPLATE, material);
                    } else if (material instanceof bo.Material) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.UnitRate.PROPERTY_CONDITION_NAME;
                        condition.value = ibas.strings.format(CONDITION_VALUE_TEMPLATE, material.code);
                    }
                    if (criteria.conditions.length === 0) {
                        throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
                    }
                    return criteria;
                }
            }
            export namespace materialsubstitute {
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_ACTIVATED_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_VALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 3;
                    condition.alias = bo.MaterialSubstitute.PROPERTY_INVALIDDATE_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    return conditions;
                }
            }
        }
        export interface IBeChangedUOMSource {
            caller?: any;
            readonly sourceUnit: string;
            readonly targetUnit: string;
            readonly material?: string;
            setUnitRate(value: number): void;
        }
        export interface IBeChangedUOMSourceEx<T> extends IBeChangedUOMSource {
            caller?: T;
            setUnitRate(this: T, value: number): void;
        }
        /**
         * 获取物料单位换算率
         * @param caller
         */
        export function changeMaterialsUnitRate(caller: {
            data: IBeChangedUOMSource | IBeChangedUOMSource[],
            onCompleted?(error?: Error): void,
        }): void {
            let condition: ibas.ICondition;
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let sources: ibas.IList<IBeChangedUOMSource> = ibas.arrays.create(caller.data);
            for (let item of sources) {
                if (ibas.strings.isEmpty(item.sourceUnit)) {
                    continue;
                }
                if (ibas.strings.isEmpty(item.targetUnit)) {
                    continue;
                }
                condition = criteria.conditions.create();
                condition.alias = materials.bo.UnitRate.PROPERTY_SOURCE_NAME;
                condition.value = item.sourceUnit;
                condition.relationship = ibas.emConditionRelationship.OR;
                condition.bracketOpen = 1;
                condition = criteria.conditions.create();
                condition.alias = materials.bo.UnitRate.PROPERTY_TARGET_NAME;
                condition.value = item.targetUnit;
                condition = criteria.conditions.create();
                condition.alias = materials.bo.UnitRate.PROPERTY_CONDITION_NAME;
                condition.operation = ibas.emConditionOperation.IS_NULL;
                condition.bracketOpen = 1;
                condition = criteria.conditions.create();
                condition.alias = materials.bo.UnitRate.PROPERTY_CONDITION_NAME;
                condition.value = "";
                condition.relationship = ibas.emConditionRelationship.OR;
                condition = criteria.conditions.create();
                condition.alias = materials.bo.UnitRate.PROPERTY_CONDITION_NAME;
                condition.value = item.material ? ibas.strings.format(conditions.unitrate.CONDITION_VALUE_TEMPLATE, item.material) : "";
                condition.relationship = ibas.emConditionRelationship.OR;
                condition.bracketClose = 2;
            }
            if (criteria.conditions.length > 0) {
                criteria.conditions.firstOrDefault().relationship = ibas.emConditionRelationship.NONE;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchUnitRate({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        if (opRslt.resultCode !== 0) {
                            if (caller.onCompleted instanceof Function) {
                                caller.onCompleted(new Error(opRslt.message));
                            }
                        } else {
                            // 排序，有条件的优先
                            let unitRates: ibas.IList<bo.UnitRate> = opRslt.resultObjects.sort((a, b) => {
                                if (ibas.strings.isEmpty(a.condition) || !ibas.strings.isEmpty(b.condition)) {
                                    return -1;
                                }
                                if (!ibas.strings.isEmpty(a.condition) || ibas.strings.isEmpty(b.condition)) {
                                    return 1;
                                }
                                return 0;
                            });
                            // 设置换算率，未定义为1
                            for (let item of sources) {
                                let unitRate: bo.UnitRate = unitRates.firstOrDefault(
                                    c => ibas.strings.equalsIgnoreCase(c.source, item.sourceUnit)
                                        && ibas.strings.equalsIgnoreCase(c.target, item.targetUnit)
                                        && (
                                            ibas.strings.isEmpty(c.condition)
                                            || (!ibas.strings.isEmpty(item.material) && c.condition === ibas.strings.format(conditions.unitrate.CONDITION_VALUE_TEMPLATE, item.material))
                                        )
                                );
                                if (unitRate) {
                                    if (item.caller) {
                                        item.setUnitRate.call(item.caller, unitRate.rate);
                                    } else {
                                        item.setUnitRate(unitRate.rate);
                                    }
                                } else {
                                    if (item.caller) {
                                        item.setUnitRate.call(item.caller, 1);
                                    } else {
                                        item.setUnitRate(1);
                                    }
                                }
                            }
                            if (caller.onCompleted instanceof Function) {
                                caller.onCompleted();
                            }
                        }
                    }
                });
            } else {
                // 设置换算率，未定义为1
                for (let item of sources) {
                    if (item.caller) {
                        item.setUnitRate.call(item.caller, 1);
                    } else {
                        item.setUnitRate(1);
                    }
                }
                if (caller.onCompleted instanceof Function) {
                    caller.onCompleted();
                }
            }
        }
        /**
         * 使用物料预留库存
         * @param caller
         */
        export function useReservedMaterialsInventory(caller: {
            targetType: string;
            targetEntries: number | number[];
            onCompleted(results: ibas.IList<bo.MaterialInventoryReservation> | Error): void,
        }): void {
            if (ibas.strings.isEmpty(caller?.targetType) || ibas.objects.isNull(caller?.targetEntries)) {
                if (caller.onCompleted instanceof Function) {
                    caller.onCompleted(new Error(ibas.i18n.prop("sys_invalid_parameter", "target")));
                }
                return;
            }
            let condition: ibas.ICondition;
            let criteria: ibas.ICriteria = new ibas.Criteria();
            condition = criteria.conditions.create();
            condition.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE_NAME;
            condition.value = caller.targetType;
            for (let item of ibas.arrays.create(caller.targetEntries)) {
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY_NAME;
                condition.value = item.toString();
                if (criteria.conditions.length > 2) {
                    condition.relationship = ibas.emConditionRelationship.OR;
                }
            }
            if (criteria.conditions.length > 2) {
                criteria.conditions[1].bracketOpen += 1;
                criteria.conditions.lastOrDefault().bracketClose += 1;
            }
            let sort: ibas.ISort = criteria.sorts.create();
            sort.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE_NAME;
            sort.sortType = ibas.emSortType.ASCENDING;
            sort = criteria.sorts.create();
            sort.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY_NAME;
            sort.sortType = ibas.emSortType.ASCENDING;
            sort = criteria.sorts.create();
            sort.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTLINEID_NAME;
            sort.sortType = ibas.emSortType.ASCENDING;

            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
            boRepository.fetchMaterialInventoryReservation({
                criteria: criteria,
                onCompleted: (opRslt) => {
                    if (opRslt.resultCode !== 0) {
                        if (caller.onCompleted instanceof Function) {
                            caller.onCompleted(new Error(opRslt.message));
                        }
                    } else {
                        if (caller.onCompleted instanceof Function) {
                            caller.onCompleted(opRslt.resultObjects);
                        }
                    }
                }
            });
        }
    }
}