/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 物料批次记录 */
        export interface IMaterialBatchJournal extends ibas.IBOSimple {

            /** 物料编码 */
            itemCode: string;

            /** 批次编码 */
            batchCode: string;

            /** 仓库编码 */
            warehouse: string;

            /** 数量 */
            quantity: number;

            /** 方向 */
            direction: ibas.emDirection;

            /** 基于类型 */
            baseDocumentType: string;

            /** 基于标识 */
            baseDocumentEntry: number;

            /** 基于行号 */
            baseDocumentLineId: number;

            /** 过账日期 */
            postingDate: Date;

            /** 到期日 */
            deliveryDate: Date;

            /** 凭证日期 */
            documentDate: Date;

            /** 原始类型 */
            originalDocumentType: string;

            /** 原始标识 */
            originalDocumentEntry: number;

            /** 原始行号 */
            originalDocumentLineId: number;

            /** 对象编号 */
            objectKey: number;

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

        }
    }
}