/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { MaterialJournalListApp } from "./MaterialInventoryJournalListApp";

export class MaterialInventoryJournalFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "18aabd78-bb26-4a53-8ce6-e332b15fb852";
    /** 功能名称 */
    static FUNCTION_NAME = "materials_func_materialjournal";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialInventoryJournalFunc.FUNCTION_ID;
        this.name = MaterialInventoryJournalFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: MaterialJournalListApp = new MaterialJournalListApp();
        app.navigation = this.navigation;
        return app;
    }
}
