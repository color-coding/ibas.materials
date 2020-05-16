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
            /** 转换对象 */
            convert(): MaterialSpecification {
                let data: bo.MaterialSpecification = new bo.MaterialSpecification();
                data.specification = this.template;
                data.name = this.name;
                let createItem: Function = function (item: bo.SpecificationTreeItem, parentSign: string = undefined): void {
                    let dataItem: bo.MaterialSpecificationItem = data.materialSpecificationItems.create();
                    dataItem.parentSign = parentSign;
                    dataItem.sign = item.sign;
                    dataItem.description = item.description;
                    dataItem.content = item.content;
                    dataItem.note = item.note;
                    if (item.vaildValues instanceof Array) {
                        for (let value of item.vaildValues) {
                            if (ibas.strings.equals(dataItem.content, value.description)) {
                                dataItem.value = value.value;
                                dataItem.associated = value.associated;
                                break;
                            }
                        }
                    }
                    if (item.required === true && ibas.objects.isNull(dataItem.content)) {
                        throw new Error(ibas.i18n.prop("materials_specification_item_required_value", item.description));
                    }
                    if (item.items instanceof Array) {
                        for (let sItem of item.items) {
                            createItem(sItem, item.sign);
                        }
                    }
                };
                if (this.items instanceof Array) {
                    for (let sItem of this.items) {
                        createItem(sItem);
                    }
                }
                return data;
            }
        }
        /** 规格模板-项目 */
        export class SpecificationTreeItem implements ISpecificationTreeItem {
            constructor() {
                this.vaildValues = new ibas.ArrayList<SpecificationTreeItemValue>();
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
            /** 必填的 */
            required: boolean;
            /** 可选值 */
            vaildValues: ibas.IList<ISpecificationTreeItemValue>;
            /** 规格模板-项目集合 */
            items: ibas.IList<ISpecificationTreeItem>;
        }
        /** 规格模板-项目值 */
        export class SpecificationTreeItemValue implements ISpecificationTreeItemValue {
            /** 值 */
            value: string;
            /** 描述 */
            description: string;
            /** 关联 */
            associated: string;
        }

    }
}
