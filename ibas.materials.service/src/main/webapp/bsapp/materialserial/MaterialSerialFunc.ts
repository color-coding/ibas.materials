/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialSerialFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "a52a9f68-29b7-47c7-878a-d1aade5d4bdd";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialserial";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialFunc.FUNCTION_ID;
                this.name = MaterialSerialFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialSerialListApp = new MaterialSerialListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}