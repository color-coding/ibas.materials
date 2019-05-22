/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class SpecificationFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "f226bba2-a29f-418f-9cea-ee0a253850c2";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_specification";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SpecificationFunc.FUNCTION_ID;
                this.name = SpecificationFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: SpecificationListApp = new SpecificationListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
