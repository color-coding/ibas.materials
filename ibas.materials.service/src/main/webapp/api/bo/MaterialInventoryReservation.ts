/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料库存预留 */
        export interface IMaterialInventoryReservation extends ibas.IBOSimple {
            /** 物料编码 */
            itemCode: string;
            /** 仓库编码 */
            warehouse: string;
            /** 批次编码 */
            batchCode: string;
            /** 序列编码 */
            serialCode: string;
            /** 数量 */
            quantity: number;
            /** 失效日期 */
            invalidDate: Date;
            /** 失效时间 */
            invalidTime: number;
            /** 目标单据类型 */
            targetDocumentType: string;
            /** 目标单据编号 */
            targetDocumentEntry: number;
            /** 目标单据行号 */
            targetDocumentLineId: number;
            /** 原因 */
            causes: string;
            /** 状态 */
            status: ibas.emBOStatus;
            /** 已清数量 */
            closedQuantity: number;
            /** 对象编号 */
            objectKey: number;
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
            /** 数据所属组织 */
            organization: string;
            /** 备注 */
            remarks: string;
            /** 基于物料库存信息 */
            baseBusinessObject(data: IMaterialInventory): void;
            /** 基于物料批次信息 */
            baseBusinessObject(data: IMaterialBatch): void;
            /** 基于物料序列信息 */
            baseBusinessObject(data: IMaterialSerial): void;
        }


    }
}
