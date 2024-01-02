/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class InventoryTransferRequestFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "76f8accf-6bfa-419d-bd2b-efc6065b4da6";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_inventorytransferrequest";
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryTransferRequestFunc.FUNCTION_ID;
                this.name = InventoryTransferRequestFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: InventoryTransferRequestListApp = new InventoryTransferRequestListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
