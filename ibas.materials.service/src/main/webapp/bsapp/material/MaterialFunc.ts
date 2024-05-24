/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "3c4addda-19dc-4103-8165-62245f607c39";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_material";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialFunc.FUNCTION_ID;
                this.name = MaterialFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialListApp = new MaterialListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
        export class MaterialInventoryFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "3e486aaf-6f96-44b4-818f-3c8f51c885f3";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialinventory";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryFunc.FUNCTION_ID;
                this.name = MaterialInventoryFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialInventoryListApp = new MaterialInventoryListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
        export class MaterialOverviewFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "eb5a7d4b-c45b-4854-b265-1291b5ad4738";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialoverview";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOverviewFunc.FUNCTION_ID;
                this.name = MaterialOverviewFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialOverviewApp = new MaterialOverviewApp();
                app.navigation = this.navigation;
                return app;
            }
        }
        export class MaterialNumberChangeFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "ccc1729e-33ef-49b3-aee4-bcadbcf6fa92";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialnumberchange";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialNumberChangeFunc.FUNCTION_ID;
                this.name = MaterialNumberChangeFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialNumberChangeApp = new MaterialNumberChangeApp();
                app.navigation = this.navigation;
                return app;
            }
        }
        export class MaterialInventoryTransferFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "d948bb97-d09f-4b61-8a5c-414db216e49c";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialinventorytransfer";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryTransferFunc.FUNCTION_ID;
                this.name = MaterialInventoryTransferFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialInventoryTransferApp = new MaterialInventoryTransferApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}