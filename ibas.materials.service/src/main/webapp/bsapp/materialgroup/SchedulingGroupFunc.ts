/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class SchedulingGroupFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "52c38fe6-5217-4232-a6d2-d3ce67b64c7a";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_schedulinggroup";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SchedulingGroupFunc.FUNCTION_ID;
                this.name = SchedulingGroupFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: SchedulingGroupListApp = new SchedulingGroupListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
