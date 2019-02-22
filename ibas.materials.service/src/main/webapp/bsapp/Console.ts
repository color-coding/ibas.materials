/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../borep/index.ts" />
/// <reference path="./goodsissue/index.ts" />
/// <reference path="./goodsreceipt/index.ts" />
/// <reference path="./inventorytransfer/index.ts" />
/// <reference path="./material/index.ts" />
/// <reference path="./materialbatch/index.ts" />
/// <reference path="./materialgroup/index.ts" />
/// <reference path="./materialpricelist/index.ts" />
/// <reference path="./materialserial/index.ts" />
/// <reference path="./warehouse/index.ts" />
/// <reference path="./inventorycounting/index.ts" />
namespace materials {
    export namespace app {

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
                this.register(new MaterialOverviewFunc());
                this.register(new MaterialPriceListFunc());
                this.register(new GoodsReceiptFunc());
                this.register(new GoodsIssueFunc());
                this.register(new InventoryTransferFunc());
                if (ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true) {
                    this.register(new InventoryCountingFunc());
                }
                // this.register(new MaterialInventoryFunc());
                // this.register(new MaterialBatchFunc());
                // this.register(new MaterialSerialFunc());
                this.register(new WarehouseFunc());
                // this.register(new MaterialGroupFunc());
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
                this.register(new InventoryCountingChooseServiceMapping());
                // 注册常驻应用

            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                ibas.i18n.load(this.rootUrl + "resources/languages/materials.json");
                ibas.i18n.load(this.rootUrl + "resources/languages/bos.json");
                // 设置资源属性
                this.description = ibas.i18n.prop(this.name.toLowerCase());
                this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
                // 先加载ui导航
                let uiModules: string[] = [];
                if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)) {
                    if (this.plantform === ibas.emPlantform.PHONE) {
                        // 使用m类型视图
                        uiModules.push("index.ui.m");
                    }
                }
                // 默认使用视图
                if (uiModules.length === 0) {
                    // 使用c类型视图
                    uiModules.push("index.ui.c");
                }
                let that: this = this;
                this.loadUI(uiModules, function (ui: any): void {
                    // 设置导航
                    that._navigation = new ui.Navigation();
                    // 调用初始化
                    that.initialize();
                });
                // 保留基类方法
                super.run();
            }
        }
        /** 模块控制台，手机端 */
        export class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void {
                // 注册服务应用
                this.register(new MaterialChooseServiceMapping());
                this.register(new WarehouseChooseServiceMapping());
                this.register(new ProductChooseServiceMapping());
                this.register(new MaterialPriceListChooseServiceMapping);
                this.register(new MaterialSerialChooseServiceMapping);
                this.register(new MaterialBatchChooseServiceMapping);
            }
        }
    }
}