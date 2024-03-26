/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 拣配清单 */
        export interface IPickLists extends ibas.IBOSimple {
            /** 对象编号 */
            objectKey: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 参考1 */
            reference1: string;
            /** 参考2 */
            reference2: string;
            /** 备注 */
            remarks: string;
            /** 拣配员 */
            picker: string;
            /** 拣配日期 */
            pickDate: Date;
            /** 拣配状态 */
            pickStatus: emPickStatus;

            /** 拣配清单-行集合 */
            pickListsLines: IPickListsLines;

        }

        /** 拣配清单-行 集合 */
        export interface IPickListsLines extends ibas.IBusinessObjects<IPickListsLine> {
            /** 创建并添加子项 */
            create(): IPickListsLine;
        }

        /** 拣配清单-行 */
        export interface IPickListsLine extends ibas.IBOSimpleLine {
            /** 对象编号 */
            objectKey: number;
            /** 对象行号 */
            lineId: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 备注 */
            remarks: string;
            /** 基于类型 */
            baseDocumentType: string;
            /** 基于标识 */
            baseDocumentEntry: number;
            /** 基于行号 */
            baseDocumentLineId: number;
            /** 交货/到期日期 */
            deliveryDate: Date;
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
            /** 数量 */
            quantity: number;
            /** 单位 */
            uom: string;
            /** 库存单位 */
            inventoryUOM: string;
            /** 单位换算率 */
            uomRate: number;
            /** 库存数量 */
            inventoryQuantity: number;
            /** 拣配状态 */
            pickStatus: emPickStatus;
            /** 拣配数量 */
            pickQuantity: number;
            /** 已清数量 */
            closedQuantity: number;
            /** 仓库 */
            warehouse: string;
            /** 拣配清单-序号集合 */
            pickListsNumbers: IPickListsNumbers;

        }

        /** 拣配清单-序号 集合 */
        export interface IPickListsNumbers extends ibas.IBusinessObjects<IPickListsNumber> {
            /** 创建并添加子项 */
            create(): IPickListsNumber;
        }

        /** 拣配清单-序号 */
        export interface IPickListsNumber extends ibas.IBOSimpleLine {
            /** 对象编号 */
            objectKey: number;
            /** 对象行号 */
            lineId: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 备注 */
            remarks: string;
            /** 行项目号 */
            itemId: number;
            /** 仓库编码 */
            warehouse: string;
            /** 批次编码 */
            batchCode: string;
            /** 序列编码 */
            serialCode: string;
            /** 拣配数量 */
            pickQuantity: number;

        }


    }
}
