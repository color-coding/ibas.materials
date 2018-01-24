/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { MaterialListApp } from "./MaterialListApp";
import { MaterialInventoryListApp } from "./MaterialInventoryListApp";

export class MaterialFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "3c4addda-19dc-4103-8165-62245f607c39";
    /** 功能名称 */
    static FUNCTION_NAME = "materials_func_material";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialFunc.FUNCTION_ID;
        this.name = MaterialFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: MaterialListApp = new MaterialListApp();
        app.navigation = this.navigation;
        return app;
    }
}
export class MaterialInventoryFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "3e486aaf-6f96-44b4-818f-3c8f51c885f3";
    /** 功能名称 */
    static FUNCTION_NAME = "materials_func_materialinventory";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialInventoryFunc.FUNCTION_ID;
        this.name = MaterialInventoryFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: MaterialInventoryListApp = new MaterialInventoryListApp();
        app.navigation = this.navigation;
        return app;
    }
}
