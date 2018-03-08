/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class InventoryTransferFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "6f9b9da8-d889-4409-b183-802faf607256";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_inventorytransfer";
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryTransferFunc.FUNCTION_ID;
                this.name = InventoryTransferFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: InventoryTransferListApp = new InventoryTransferListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
