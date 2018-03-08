/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialGroupFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "e8ed317f-15cd-4afd-9b84-003c699d32a2";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialgroup";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialGroupFunc.FUNCTION_ID;
                this.name = MaterialGroupFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialGroupListApp = new MaterialGroupListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
