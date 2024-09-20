/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料系号关联 */
        export interface IMaterialNumberAssociation extends ibas.IBOSimple {
            /** 基于单据类型 */
            baseDocumentType: string;
            /** 基于单据编号 */
            baseDocumentEntry: number;
            /** 基于单据行号 */
            baseDocumentLineId: number;
            /** 关系 */
            relation: string;
            /** 物料编码 */
            itemCode: string;
            /** 仓库编码 */
            warehouse: string;
            /** 批次编码 */
            batchCode: string;
            /** 序列编码 */
            serialCode: string;
            /** 关联物料编码 */
            associatedItem: string;
            /** 关联仓库编码 */
            associatedWarehouse: string;
            /** 关联批次编码 */
            associatedBatch: string;
            /** 关联序列编码 */
            associatedSerial: string;
            /** 数量 */
            quantity: number;
            /** 原因 */
            causes: string;
            /** 失效日期 */
            expirationDate: Date;
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

        }


    }
}
