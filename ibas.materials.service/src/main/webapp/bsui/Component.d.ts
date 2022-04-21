/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace materials {
    export namespace ui {
        namespace component {
            /**
             * 仓库选择-选择框
             */
            class WarehouseSelect extends sap.extension.m.RepositorySelect {
            }
            /**
             * 物料或物料组-文本框
             */
            class MaterialOrMaterialGroupText extends sap.extension.m.ConversionText {
                /** 获取-类型属性 */
                getTypeProperty(): string;
                /** 设置-类型属性 */
                setTypeProperty(value: string): this;
            }
            /**
             * 业务伙伴或组-文本框
             */
            class BusinessPartnerOrGroupText extends sap.extension.m.ConversionText {
                /** 获取-类型属性 */
                getTypeProperty(): string;
                /** 设置-类型属性 */
                setTypeProperty(value: string): this;
            }
            /**
             * 业务伙伴描述（根据类型加载客户或供应商）
             */
            class BusinessPartnerText extends sap.extension.m.ConversionText {
                /** 获取-业务伙伴类型属性 */
                getTypeProperty(): string;
                /** 设置-业务伙伴类型属性 */
                setTypeProperty(value: string): BusinessPartnerText;
            }
            /**
             * 税收组-输入框
             */
            class TaxGroupInput extends sap.extension.m.SelectionInput {
            }
            /**
             * 物料规格-输入框
             */
            class SpecificationInput extends sap.extension.core.EditableControl {
                /**
                 * 获取物料
                 */
                getMaterial(): string;
                /**
                 * 设置物料
                 * @param value 值
                 */
                setMaterial(value: string): this;
                /**
                 * 获取规格
                 */
                getSpecification(): number;
                /**
                 * 设置规格
                 * @param value 值
                 */
                setSpecification(value: number): this;
                /** 设置物料规格内容 */
                protected setSpecificationContent(specification: materials.bo.IMaterialSpecification): this;
            }
            /**
             * 区域
             */
            class Splitter extends sap.ui.layout.Splitter {

            }
        }
    }
}