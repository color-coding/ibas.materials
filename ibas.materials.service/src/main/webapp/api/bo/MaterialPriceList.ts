/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料价格清单 */
        export interface IMaterialPriceList extends ibas.IBOSimple {

            /** 价格清单名称 */
            name: string;

            /** 分组 */
            group: string;

            /** 货币 */
            currency: string;

            /** 基于的清单 */
            basedOnList: number;

            /** 系数 */
            factor: number;

            /** 含税 */
            taxed: ibas.emYesNo;

            /** 生效日期 */
            validDate: Date;

            /** 失效日期 */
            invalidDate: Date;

            /** 底价清单 */
            floorList: number;

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

            /** 实例号 */
            logInst: number;

            /** 服务系列 */
            series: number;

            /** 数据源 */
            dataSource: string;

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

            /** 价格清单-行集合 */
            materialPriceItems: IMaterialPriceItems;
        }
        export interface IMaterialPriceItems extends ibas.IBusinessObjects<IMaterialPriceItem> {
            /** 创建并添加子项 */
            create(): IMaterialPriceItem;
        }

        export interface IMaterialPriceItem extends ibas.IBOSimpleLine {

            /** 物料编码 */
            itemCode: string;

            /** 计量单位 */
            uom: string;

            /** 价格 */
            price: number;

            /** 货币 */
            currency: string;

            /** 对象编号 */
            objectKey: number;

            /** 行号 */
            lineId: number;

            /** 对象类型 */
            objectCode: string;

            /** 实例号 */
            logInst: number;

            /** 服务系列 */
            series: number;

            /** 数据源 */
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