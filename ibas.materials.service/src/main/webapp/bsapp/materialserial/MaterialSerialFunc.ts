/*
 * @Author: fancy
 * @Date: 2017-11-27 16:39:49
 * @Last Modified by:   fancy
 * @Last Modified time: 2017-11-27 16:39:49
 */
/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { MaterialSerialListApp } from "./MaterialSerialListApp";
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
