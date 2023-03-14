/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料废品率 */
        export interface IMaterialScrap extends ibas.IBOSimple {
            /** 编号 */
            objectKey: number;
            /** 类型 */
            objectCode: string;
            /** 实例号（版本） */
            logInst: number;
            /** 数据源 */
            dataSource: string;
            /** 编号系列 */
            series: number;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
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
            /** 名称 */
            name: string;
            /** 描述 */
            description: string;
            /** 已激活的 */
            activated: ibas.emYesNo;
            /** 率 */
            rate: number;
            /** 值 */
            value: number;
            /** 阶梯的 */
            tiered: ibas.emYesNo;
            /** 备注 */
            remarks: string;

            /** 物料废品率 - 阶梯集合 */
            materialScrapSections: IMaterialScrapSections;
            /**
             * 计算数量的损耗
             * @param quantity 计划数量
             * @returns 加了损耗的数量
             */
            compute(quantity: number): number;
        }

        /** 物料废品率 - 阶梯 集合 */
        export interface IMaterialScrapSections extends ibas.IBusinessObjects<IMaterialScrapSection> {
            /** 创建并添加子项 */
            create(): IMaterialScrapSection;
        }

        /** 物料废品率 - 阶梯 */
        export interface IMaterialScrapSection extends ibas.IBOSimpleLine {
            /** 编号 */
            objectKey: number;
            /** 行号 */
            lineId: number;
            /** 类型 */
            objectCode: string;
            /** 实例号（版本） */
            logInst: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 区间开始 */
            sectionStart: number;
            /** 区间结束 */
            sectionEnd: number;
            /** 率 */
            rate: number;
            /** 值 */
            value: number;
            /** 备注 */
            remarks: string;

        }


    }
}
