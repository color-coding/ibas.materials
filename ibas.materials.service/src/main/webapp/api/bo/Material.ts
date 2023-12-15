/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料 */
        export interface IMaterial extends ibas.IBOMasterData, ibas.IBOUserFields {

            /** 编码 */
            code: string;

            /** 名称 */
            name: string;

            /** 外文名称 */
            foreignName: string;

            /** 标识 */
            sign: string;

            /** 物料组 */
            group: string;

            /** 激活 */
            activated: ibas.emYesNo;

            /** 条形码 */
            barCode: string;

            /** 物料类型 */
            itemType: emItemType;

            /** 采购物料 */
            purchaseItem: ibas.emYesNo;

            /** 销售物料 */
            salesItem: ibas.emYesNo;

            /** 库存物料 */
            inventoryItem: ibas.emYesNo;

            /** 虚拟物料 */
            phantomItem: ibas.emYesNo;

            /** 固定资产 */
            fixedAsset: ibas.emYesNo;

            /** 产品单元 */
            productUnit: ibas.emYesNo;

            /** 缺省仓库 */
            defaultWarehouse: string;

            /** 首选供应商 */
            preferredVendor: string;

            /** 生产商 */
            manufacturer: string;

            /** 库存单位 */
            inventoryUOM: string;

            /** 价格 */
            avgPrice: number;

            /** 获取-评估方法 */
            valuationMethod: emValuationMethod;

            /** 库存 */
            onHand: number;

            /** 已承诺 */
            onCommited: number;

            /** 已订购 */
            onOrdered: number;

            /** 已预留 */
            onReserved: number;

            /** 按仓库管理 */
            manageByWarehouse: ibas.emYesNo;

            /** 最低库存量 */
            minimumInventory: number;

            /** 最高库存量 */
            maximumInventory: number;

            /** 最低订购数量 */
            minimumOrderQuantity: number;

            /** 订购倍数 */
            orderMultiple: number;

            /** 提前期（天） */
            leadTime: number;

            /** 序号管理 */
            serialManagement: ibas.emYesNo;

            /** 批号管理 */
            batchManagement: ibas.emYesNo;

            /** 采购税收组 */
            purchaseTaxGroup: string;

            /** 销售税收组 */
            salesTaxGroup: string;

            /** 采购单位 */
            purchaseUOM: string;

            /** 销售单位 */
            salesUOM: string;

            /** 生产单位 */
            productionUOM: string;

            /** 获取方式 */
            procurementMethod: emProcurementMethod;

            /** 领料方式 */
            issueMethod: emIssueMethod;

            /** 计划方式 */
            planningMethod: emPlanningMethod;

            /** 齐套检查 */
            checkCompleteness: ibas.emYesNo;

            /** 批次混用 */
            mixingBatches: ibas.emYesNo;

            /** 订单生产 */
            madeToOrder: ibas.emYesNo;

            /** 图号 */
            darwingNumber: string;

            /** 匹配码 */
            matchCode: string;

            /** 生产批量 */
            lotSize: number;

            /** 废品率 */
            scrap: string;

            /** 计划员 */
            scheduler: string;

            /** 生效日期 */
            validDate: Date;

            /** 失效日期 */
            invalidDate: Date;

            /** 图片 */
            picture: string;

            /** 备注 */
            remarks: string;

            /** 已引用 */
            referenced: ibas.emYesNo;

            /** 已删除 */
            deleted: ibas.emYesNo;

            /** 对象编号 */
            docEntry: number;

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

            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;

            /** 数据所有者 */
            dataOwner: number;

            /** 数据所属组织 */
            organization: string;

            /** 可用量（库存+已订购-已承诺） */
            onAvailable(): number;
        }

        /** 物料数量 */
        export interface IMaterialQuantity {

            /** 物料编码 */
            itemCode: string;

            /** 物料名称 */
            itemName: string;

            /** 库存数量 */
            onHand: number;

            /** 已承诺 */
            onCommited: number;

            /** 已订购 */
            onOrdered: number;

            /** 已预留 */
            onReserved: number;

            /** 单位 */
            uom: string;

            /** 可用量（库存 + 已订购 - 已承诺 - 已预留） */
            onAvailable(): number;

        }

        /** 物料价格 */
        export interface IMaterialPrice {

            /** 价格来源 */
            source: string;

            /** 物料编码 */
            itemCode: string;

            /** 物料名称 */
            itemName: string;

            /** 物料标记 */
            itemSign: string;

            /** 价格 */
            price: number;

            /** 货币 */
            currency: string;

            /** 含税 */
            taxed: ibas.emYesNo;

        }
    }
}