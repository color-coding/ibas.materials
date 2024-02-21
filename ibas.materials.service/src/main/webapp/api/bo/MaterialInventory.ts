/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 物料库存 */
        export interface IMaterialInventory extends ibas.IBOSimple {

            /** 物料编码 */
            itemCode: string;

            /** 仓库编码 */
            warehouse: string;

            /** 冻结的 */
            frozen: ibas.emYesNo;

            /** 价格 */
            avgPrice: number;

            /** 库存 */
            onHand: number;

            /** 已承诺 */
            onCommited: number;

            /** 已订购 */
            onOrdered: number;

            /** 已预留 */
            onReserved: number;

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

            /** 可用量（库存+已订购-已承诺） */
            onAvailable(): number;

        }
    }
}


