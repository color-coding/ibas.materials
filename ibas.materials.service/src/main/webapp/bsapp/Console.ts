/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { CONSOLE_ID, CONSOLE_NAME, CONSOLE_VERSION } from "../api/index";
import { GoodsIssueFunc, } from "./goodsissue/index";
import { GoodsReceiptFunc, } from "./goodsreceipt/index";
import { InventoryTransferFunc, } from "./inventorytransfer/index";
import { MaterialFunc, MaterialChooseServiceMapping, MaterialLinkServiceMapping, ProductChooseServiceMapping } from "./material/index";
import { MaterialGroupFunc, MaterialGroupChooseServiceMapping, } from "./materialgroup/index";
import { WarehouseFunc, WarehouseChooseServiceMapping, WarehouseLinkServiceMapping } from "./warehouse/index";
import {
    MaterialBatchReceiptServiceMapping, MaterialBatchIssueServiceMapping,
    MaterialBatchFunc, MaterialBatchChooseServiceMapping
} from "./materialbatch/index";
import {
    MaterialSerialReceiptServiceMapping, MaterialSerialIssueServiceMapping,
    MaterialSerialFunc, MaterialSerialChooseServiceMapping
} from "./materialserial/index";
import { MaterialPriceListChooseServiceMapping, MaterialPriceListFunc } from "./materialpricelist/index";



/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 构造函数 */
    constructor() {
        super();
        this.id = CONSOLE_ID;
        this.name = CONSOLE_NAME;
        this.version = CONSOLE_VERSION;
        this.copyright = ibas.i18n.prop("shell_license");
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new MaterialFunc());
        this.register(new MaterialPriceListFunc());
        this.register(new GoodsReceiptFunc());
        this.register(new GoodsIssueFunc());
        this.register(new InventoryTransferFunc());
        this.register(new MaterialBatchFunc());
        this.register(new MaterialSerialFunc());
        this.register(new WarehouseFunc());
        this.register(new MaterialGroupFunc());
        // 注册服务应用
        this.register(new MaterialChooseServiceMapping());
        this.register(new MaterialLinkServiceMapping());
        this.register(new MaterialGroupChooseServiceMapping());
        this.register(new WarehouseChooseServiceMapping());
        this.register(new WarehouseLinkServiceMapping());
        this.register(new ProductChooseServiceMapping());
        this.register(new MaterialBatchReceiptServiceMapping);
        this.register(new MaterialBatchIssueServiceMapping);
        this.register(new MaterialSerialReceiptServiceMapping);
        this.register(new MaterialSerialIssueServiceMapping);
        this.register(new MaterialPriceListChooseServiceMapping);
        this.register(new MaterialSerialChooseServiceMapping);
        this.register(new MaterialBatchChooseServiceMapping);
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/materials.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/enums.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/goodsissue.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/goodsreceipt.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/inventorytransfer.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/material.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialgroup.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialinventory.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialinventoryjournal.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/warehouse.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialpricelist.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialbatch.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialserial.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialbatchjournal.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialserialjournal.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialbatchitem.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialserialitem.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: this = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}
