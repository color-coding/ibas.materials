/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { MaterialBatchListApp } from "./MaterialBatchListApp";
export class MaterialBatchFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "f45481e1-58a3-43b3-ab91-d0fe9d43e544";
    /** 功能名称 */
    static FUNCTION_NAME = "materials_func_materialbatch";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchFunc.FUNCTION_ID;
        this.name = MaterialBatchFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: MaterialBatchListApp = new MaterialBatchListApp();
        app.navigation = this.navigation;
        return app;
    }
}
