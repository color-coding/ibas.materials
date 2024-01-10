/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        export interface IMaterialBatch extends ibas.IBOSimple, ibas.IBOUserFields {
            /** 物料编码 */
            itemCode: string;

            /** 批次编号 */
            batchCode: string;

            /** 仓库编码 */
            warehouse: string;

            /** 数量 */
            quantity: number;

            /** 预留数量 */
            reservedQuantity: number;

            /** 锁定 */
            locked: ibas.emYesNo;

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

            /** 物料版本 */
            version: string;

            /** 位置 */
            location: string;

            /** 备注 */
            notes: string;

            /** 基于类型 */
            baseDocumentType: string;

            /** 基于标识 */
            baseDocumentEntry: number;

            /** 基于行号 */
            baseDocumentLineId: number;

            /** 价格 */
            avgPrice: number;

            /** 库存价值 */
            inventoryValue: number;

            /** 对象编号 */
            objectKey: number;

            /** 对象类型 */
            objectCode: string;

            /**  创建日期 */
            createDate: Date;

            /**  创建时间 */
            createTime: number;

            /**  修改日期 */
            updateDate: Date;

            /**  修改时间 */
            updateTime: number;

            /**  实例号 */
            logInst: number;

            /**  服务系列 */
            series: number;

            /**  数据源 */
            dataSource: string;

            /** 创建用户 */
            createUserSign: number;

            /** 更新用户 */
            updateUserSign: number;

            /** 创建动作标识 */
            createActionId: string;

            /** 更新动作标识 */
            updateActionId: string;
        }
    }
}