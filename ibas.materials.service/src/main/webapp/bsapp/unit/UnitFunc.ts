/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class UnitFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "bc2e0e52-d705-451b-a189-bcce1e01f261";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_unit";
            /** 构造函数 */
            constructor() {
                super();
                this.id = UnitFunc.FUNCTION_ID;
                this.name = UnitFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: UnitListApp = new UnitListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
