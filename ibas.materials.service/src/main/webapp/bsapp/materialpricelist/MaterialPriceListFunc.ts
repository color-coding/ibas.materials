/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialPriceListFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "1e57cd18-ab90-48ee-8b1c-cf0f90399ce5";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialpricelist";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialPriceListFunc.FUNCTION_ID;
                this.name = MaterialPriceListFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialPriceListListApp = new MaterialPriceListListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
        export class MaterialSpecialPriceListFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "af0878f5-c1f3-4dd5-8508-4dd78a180912";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialspecialprice";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSpecialPriceListFunc.FUNCTION_ID;
                this.name = MaterialSpecialPriceListFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: MaterialSpecialPriceListApp = new MaterialSpecialPriceListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
