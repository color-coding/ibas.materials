/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialSpecificationFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "0dc605c9-ad9d-4208-b33e-d0595785a790";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_MaterialSpecification";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSpecificationFunc.FUNCTION_ID;
                this.name = MaterialSpecificationFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialSpecificationListApp = new MaterialSpecificationListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
