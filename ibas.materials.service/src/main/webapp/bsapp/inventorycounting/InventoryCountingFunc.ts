/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class InventoryCountingFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "d34c700d-f993-4bc9-a117-30167ceae8bc";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_inventorycounting";
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryCountingFunc.FUNCTION_ID;
                this.name = InventoryCountingFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: InventoryCountingListApp = new InventoryCountingListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
