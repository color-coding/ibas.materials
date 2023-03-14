/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialScrapFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "df3e3520-d7e9-4a27-8e8e-81c28c958920";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialscrap";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialScrapFunc.FUNCTION_ID;
                this.name = MaterialScrapFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialScrapListApp = new MaterialScrapListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
