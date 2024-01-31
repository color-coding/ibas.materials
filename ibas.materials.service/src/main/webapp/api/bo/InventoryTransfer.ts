/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 库存转储 */
        export interface IInventoryTransfer extends ibas.IBODocument, ibas.IBOUserFields {

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

            /** 参考1 */
            reference1: string;

            /** 参考2 */
            reference2: string;

            /** 已引用 */
            referenced: ibas.emYesNo;

            /** 备注 */
            remarks: string;

            /** 单据货币 */
            documentCurrency: string;

            /** 单据汇率 */
            documentRate: number;

            /** 单据总计 */
            documentTotal: number;

            /** 价格清单 */
            priceList: number;

            /** 项目代码 */
            project: string;

            /** 单据类型 */
            orderType: string;

            /** 分支 */
            branch: string;

            /** 库存转储-行集合 */
            inventoryTransferLines: IInventoryTransferLines;

            baseDocument(data: IInventoryTransferRequest): void;
        }
        /** 库存转储-行 集合 */
        export interface IInventoryTransferLines extends ibas.IBusinessObjects<IInventoryTransferLine> {

            /** 创建并添加子项 */
            create(): IInventoryTransferLine;
        }

        /** 库存转储-行 */
        export interface IInventoryTransferLine extends ibas.IBODocumentLine, IMaterialSerialItemParent, IMaterialBatchItemParent, ibas.IBOUserFields {

            /** 编码 */
            docEntry: number;

            /** 行号 */
            lineId: number;

            /** 显示顺序 */
            visOrder: number;

            /** 取消 */
            canceled: ibas.emYesNo;

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

            /** 已引用 */
            referenced: ibas.emYesNo;

            /** 从仓库 */
            fromWarehouse: string;

            /** 基于类型 */
            baseDocumentType: string;

            /** 基于标识 */
            baseDocumentEntry: number;

            /** 基于行号 */
            baseDocumentLineId: number;

            /** 物料编码 */
            itemCode: string;

            /** 物料/服务描述 */
            itemDescription: string;

            /** 物料标识 */
            itemSign: string;

            /** 物料版本 */
            itemVersion: string;

            /** 序号管理 */
            serialManagement: ibas.emYesNo;

            /** 批号管理 */
            batchManagement: ibas.emYesNo;

            /** 数量 */
            quantity: number;

            /** 计量单位 */
            uom: string;

            /** 仓库 */
            warehouse: string;

            /** 价格 */
            price: number;

            /** 货币 */
            currency: string;

            /** 汇率 */
            rate: number;

            /** 行总计 */
            lineTotal: number;

            /** 成本中心1 */
            distributionRule1: string;

            /** 成本中心2 */
            distributionRule2: string;

            /** 成本中心3 */
            distributionRule3: string;

            /** 成本中心4 */
            distributionRule4: string;

            /** 成本中心5 */
            distributionRule5: string;

            /** 赋值物料 */
            baseMaterial(source: materials.bo.IMaterial): void;
        }
    }

}

