/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 库存盘点 */
        export interface IInventoryCounting extends ibas.IBODocument {
            /** 凭证编号 */
            docEntry: number;
            /** 单据编码 */
            docNum: string;
            /** 期间 */
            period: number;
            /** 取消 */
            canceled: ibas.emYesNo;
            /** 状态 */
            status: ibas.emBOStatus;
            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 单据状态 */
            documentStatus: ibas.emDocumentStatus;
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
            /** 盘点日期 */
            countDate: Date;
            /** 盘点时间 */
            countTime: number;
            /** 盘点类型 */
            countType: string;
            /** 参考1 */
            reference1: string;
            /** 参考2 */
            reference2: string;
            /** 备注 */
            remarks: string;
            /** 单据类型 */
            orderType: string;
            /** 分支 */
            branch: string;
            /** 库存盘点-行集合 */
            inventoryCountingLines: IInventoryCountingLines;

        }

        /** 库存盘点-行 集合 */
        export interface IInventoryCountingLines extends ibas.IBusinessObjects<IInventoryCountingLine> {
            /** 创建并添加子项 */
            create(): IInventoryCountingLine;
        }

        /** 库存盘点-行 */
        export interface IInventoryCountingLine extends ibas.IBODocumentLine, IMaterialSerialItemParent, IMaterialBatchItemParent {
            /** 编码 */
            docEntry: number;
            /** 行号 */
            lineId: number;
            /** 显示顺序 */
            visOrder: number;
            /** 状态 */
            status: ibas.emBOStatus;
            /** 单据状态 */
            lineStatus: ibas.emDocumentStatus;
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
            /** 物料编码 */
            itemCode: string;
            /** 物料/服务描述 */
            itemDescription: string;
            /** 物料标识 */
            itemSign: string;
            /** 序号管理 */
            serialManagement: ibas.emYesNo;
            /** 批号管理 */
            batchManagement: ibas.emYesNo;
            /** 仓库 */
            warehouse: string;
            /** 库存数量 */
            inventoryQuantity: number;
            /** 盘点数量 */
            countQuantity: number;
            /** 差额 */
            difference: number;
            /** 单位 */
            uom: string;
            /** 已盘点 */
            counted: ibas.emYesNo;
            /** 冻结物料 */
            freeze: ibas.emYesNo;
        }


    }
}
