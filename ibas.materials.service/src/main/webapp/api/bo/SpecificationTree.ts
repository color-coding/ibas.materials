/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 规格树 */
        export interface ISpecificationTree {
            /** 模板 */
            template: number;
            /** 名称 */
            name: string;
            /** 备注 */
            remarks: string;
            /** 规格模板-项目集合 */
            items: ibas.IList<ISpecificationTreeItem>;
            /** 转换对象 */
            convert(): IMaterialSpecification;
        }
        /** 规格模板-项目 */
        export interface ISpecificationTreeItem {
            /** 标记 */
            sign: string;
            /** 描述 */
            description: string;
            /** 内容 */
            content: string;
            /** 备注 */
            note: string;
            /** 可编辑 */
            editable: boolean;
            /** 必填的 */
            required: boolean;
            /** 可选值 */
            vaildValues: ibas.IList<ISpecificationTreeItemValue>;
            /** 规格模板-项目集合 */
            items: ibas.IList<ISpecificationTreeItem>;
        }
        /** 规格模板-项目值 */
        export interface ISpecificationTreeItemValue {
            /** 值 */
            value: string;
            /** 描述 */
            description: string;
            /** 关联 */
            associated: string;
        }

    }
}
