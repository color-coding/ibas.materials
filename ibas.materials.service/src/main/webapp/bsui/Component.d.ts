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
                /** 获取-用户或角色类型属性 */
                getTypeProperty(): string;
                /** 设置-用户或角色类型属性 */
                setTypeProperty(value: string): this;
            }
        }
    }
}