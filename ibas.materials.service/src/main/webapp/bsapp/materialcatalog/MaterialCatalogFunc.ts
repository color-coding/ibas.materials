/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class BusinessPartnerMaterialCatalogFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "c3a55712-47c0-49f3-a8f8-8937faa52308";
            /** 功能名称 */
            static FUNCTION_NAME = "materials_func_materialcatalog";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BusinessPartnerMaterialCatalogFunc.FUNCTION_ID;
                this.name = BusinessPartnerMaterialCatalogFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BusinessPartnerMaterialCatalogListApp = new BusinessPartnerMaterialCatalogListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
