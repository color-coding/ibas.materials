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
        export class SpecificationTree implements ISpecificationTree {
            constructor() {
                this.items = new ibas.ArrayList<SpecificationTreeItem>();
            }
            /** 模板 */
            template: number;
            /** 名称 */
            name: string;
            /** 备注 */
            remarks: string;
            /** 规格模板-项目集合 */
            items: ibas.IList<ISpecificationTreeItem>;
        }
        /** 规格模板-项目 */
        export class SpecificationTreeItem implements ISpecificationTreeItem {
            constructor() {
                this.vaildValues = new ibas.ArrayList<ibas.KeyText>();
                this.items = new ibas.ArrayList<SpecificationTreeItem>();
            }
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
            /** 可选值 */
            vaildValues: ibas.IList<ibas.KeyText>;
            /** 规格模板-项目集合 */
            items: ibas.IList<ISpecificationTreeItem>;
        }

    }
}
