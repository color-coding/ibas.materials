/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class GoodsIssueFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "fd1af8c0-d24e-4b64-b85f-9120c51503d9";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_goodsissue";
            /** 构造函数 */
            constructor() {
                super();
                this.id = GoodsIssueFunc.FUNCTION_ID;
                this.name = GoodsIssueFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: GoodsIssueListApp = new GoodsIssueListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
