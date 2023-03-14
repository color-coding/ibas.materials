/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialVersionFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "23e9079a-7fd3-4e96-a263-0fdff7f200eb";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialversion";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialVersionFunc.FUNCTION_ID;
                this.name = MaterialVersionFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialVersionListApp = new MaterialVersionListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
