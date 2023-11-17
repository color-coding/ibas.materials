/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class PickListsFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "50f93505-a87e-4ceb-b414-984c41518ed8";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_picklists";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsFunc.FUNCTION_ID;
                this.name = PickListsFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: PickListsListApp = new PickListsListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
