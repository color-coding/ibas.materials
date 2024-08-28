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
            class WarehouseSelect extends sap.extension.m.ComboBox {
                /** 设置分支 */
                setBranch(data: string): WarehouseSelect;
                /** 获取分支 */
                getBranch(): string;
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
            /**
             * 货币-选择框
             */
            class CurrencySelect extends sap.extension.m.Select {
            }
            class InventoryQuantityText extends sap.m.Text {
                /** 获取-产品编号 */
                getItemCode(): string;
                /** 设置-产品编号 */
                setItemCode(value: string): InventoryQuantityText;
                /** 获取-仓库 */
                getWarehouse(): string;
                /** 设置-仓库 */
                setWarehouse(value: string): InventoryQuantityText;
                /** 获取-单位换算率 */
                getRate(): number;
                /** 设置-单位换算率 */
                setRate(value: number): InventoryQuantityText;
                /** 获取-左数量 */
                getLeftQuantity(): number;
                /** 设置-左数量 */
                setLeftQuantity(value: number): InventoryQuantityText;
                /** 获取-右数量 */
                getLeftQuantity(): number;
                /** 设置-右数量 */
                setLeftQuantity(value: number): InventoryQuantityText;
                /** 触发库存内容变化事件 */
                protected fireInventoryChange(param: { itemCode: string, warehouse: string }): void;
                /** 更新文本内容 */
                protected updateText(): void;
                /** 获取-库存任务ID */
                getInventoryTaskId(): number;
                /** 设置-库存任务ID */
                setInventoryTaskId(value: number): InventoryQuantityText;
            }
        }
    }
}