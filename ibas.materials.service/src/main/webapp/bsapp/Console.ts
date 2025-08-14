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
/// <reference path="./materialspecification/index.ts" />
/// <reference path="./specification/index.ts" />
/// <reference path="./unit/index.ts" />
/// <reference path="./materialscrap/index.ts" />
/// <reference path="./materialversion/index.ts" />
/// <reference path="./picklists/index.ts" />
/// <reference path="./inventorytransferrequest/index.ts" />
/// <reference path="./materialcatalog/index.ts" />
/// <reference path="./others/index.ts" />

namespace materials {
    export namespace app {
        /** 属性-导航 */
        const PROPERTY_NAVIGATION: symbol = Symbol("navigation");
        /** 模块控制台，主数据 */
        export class Console extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor() {
                super();
                this.id = CONSOLE_ID;
                this.name = CONSOLE_NAME;
                this.version = CONSOLE_VERSION;
                this.copyright = ibas.i18n.prop("shell_license");
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                this.register(new MaterialFunc());
                this.register(new MaterialOverviewFunc());
                this.register(new MaterialPriceListFunc());
                if (config.isEnableMaterialSpecialPrices()) {
                    this.register(new MaterialSpecialPriceListFunc());
                }
                this.register(new MaterialSpecificationFunc());
                this.register(new BusinessPartnerMaterialCatalogFunc());
                // this.register(new MaterialInventoryFunc());
                // this.register(new MaterialBatchFunc());
                // this.register(new MaterialSerialFunc());
                this.register(new WarehouseFunc());
                // this.register(new MaterialGroupFunc());
                // this.register(new UnitFunc());
                // 注册服务应用
                this.register(new MaterialChooseServiceMapping());
                this.register(new MaterialLinkServiceMapping());
                this.register(new MaterialGroupChooseServiceMapping());
                this.register(new WarehouseChooseServiceMapping());
                this.register(new WarehouseLinkServiceMapping());
                this.register(new ProductChooseServiceMapping());
                this.register(new ProductInventoryChooseServiceMapping());
                this.register(new MaterialBatchListServiceMapping());
                this.register(new MaterialSerialListServiceMapping());
                this.register(new MaterialPriceListChooseServiceMapping());
                this.register(new MaterialSerialChooseServiceMapping());
                this.register(new MaterialSerialLinkServiceMapping());
                this.register(new MaterialBatchChooseServiceMapping());
                this.register(new MaterialBatchLinkServiceMapping());
                this.register(new MaterialSpecificationChooseServiceMapping());
                this.register(new MaterialSpecificationLinkServiceMapping());
                this.register(new SpecificationChooseServiceMapping());
                this.register(new SpecificationTreeServiceMapping());
                this.register(new UnitChooseServiceMapping());
                this.register(new MaterialVersionChooseServiceMapping());
                this.register(new MaterialVersionLinkServiceMapping());
                this.register(new MaterialScrapChooseServiceMapping());
                this.register(new MaterialScrapLinkServiceMapping());
                this.register(new MaterialMeasurementServiceMapping());
                this.register(new BusinessPartnerMaterialCatalogChooseServiceMapping());
                this.register(new MaterialGrossProfitServiceMapping());
                this.register(new MaterialHistoricalPricesServiceMapping());
                this.register(new SchedulingGroupChooseServiceMapping());
                // 注册常驻应用

                // 注册权限元素
                this.register(ELEMENT_DOCUMENT_WAREHOUSE);
                this.register(ELEMENT_MATERIAL_PRICE_LIST_EDIT);
            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                this.loadResources([
                    "resources/languages/materials.json",
                    "resources/languages/bos.json"
                ], () => {
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
                    // 加载视图库
                    this.loadUI(uiModules, (ui) => {
                        // 设置导航
                        this[PROPERTY_NAVIGATION] = new ui.Navigation();
                        // 调用初始化
                        this.initialize();
                    });
                    // 保留基类方法
                    super.run();
                });
            }
        }
        /** 模块控制台，库存交易 */
        export class ConsoleInventory extends Console {
            /** 构造函数 */
            constructor() {
                super();
                this.id = CONSOLE_ID_INVENTORY;
                this.name = CONSOLE_NAME_INVENTORY;
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                this.register(new GoodsReceiptFunc());
                this.register(new GoodsIssueFunc());
                this.register(new InventoryTransferRequestFunc());
                this.register(new InventoryTransferFunc());
                this.register(new InventoryCountingFunc());
                this.register(new PickListsFunc());
                this.register(new MaterialNumberChangeFunc());
                this.register(new MaterialInventoryTransferFunc());
                // 注册服务应用
                this.register(new MaterialBatchReceiptServiceMapping());
                this.register(new MaterialBatchIssueServiceMapping());
                this.register(new MaterialSerialReceiptServiceMapping());
                this.register(new MaterialSerialIssueServiceMapping());
                this.register(new InventoryCountingChooseServiceMapping());
                this.register(new InventoryCountingLinkServiceMapping());
                this.register(new InventoryTransferChooseServiceMapping());
                this.register(new InventoryTransferEditServiceMapping());
                this.register(new InventoryTransferLinkServiceMapping());
                this.register(new GoodsIssueChooseServiceMapping());
                this.register(new GoodsIssueEditServiceMapping());
                this.register(new GoodsIssueLinkServiceMapping());
                this.register(new GoodsReceiptChooseServiceMapping());
                this.register(new GoodsReceiptEditServiceMapping());
                this.register(new GoodsReceiptLinkServiceMapping());
                this.register(new MaterialInventoryReservationServiceMapping());
                this.register(new MaterialOrderedReservationServiceMapping());
                this.register(new PickListsChooseServiceMapping());
                this.register(new PickListsLinkServiceMapping());
                this.register(new PickListsEditServiceMapping());
                this.register(new InventoryTransferRequestChooseServiceMapping());
                this.register(new InventoryTransferRequestLinkServiceMapping());
                this.register(new InventoryTransferEditServiceMapping());
                if (config.get(config.CONFIG_ITEM_ENABLE_MATERIAL_RESERVATION_CHOOSE_REPORT, false)) {
                    this.register(new MaterialOrderedReservationTargetReportServiceMapping());
                    this.register(new MaterialOrderedReservationSourceReportServiceMapping());
                }
                // 注册常驻应用

                // 注册权限元素
            }
        }
        /** 模块控制台，手机端 */
        export class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                this.register(new MaterialOverviewFunc());
                this.register(new MaterialPriceListFunc());
                this.register(new GoodsReceiptFunc());
                this.register(new GoodsIssueFunc());
                this.register(new InventoryTransferFunc());
                // 注册服务应用
                this.register(new ProductChooseServiceMapping());
                this.register(new MaterialChooseServiceMapping());
                this.register(new WarehouseChooseServiceMapping());
                this.register(new MaterialGroupChooseServiceMapping());
                this.register(new MaterialLinkServiceMapping());
                this.register(new WarehouseLinkServiceMapping());
                this.register(new MaterialSerialChooseServiceMapping());
                this.register(new MaterialBatchChooseServiceMapping());
                this.register(new MaterialPriceListChooseServiceMapping());
                this.register(new InventoryTransferChooseServiceMapping());
                this.register(new InventoryTransferEditServiceMapping());
                this.register(new InventoryTransferLinkServiceMapping());
                this.register(new GoodsIssueChooseServiceMapping());
                this.register(new GoodsIssueEditServiceMapping());
                this.register(new GoodsIssueLinkServiceMapping());
                this.register(new GoodsReceiptChooseServiceMapping());
                this.register(new GoodsReceiptEditServiceMapping());
                this.register(new GoodsReceiptLinkServiceMapping());
                this.register(new MaterialVersionChooseServiceMapping());
                this.register(new MaterialScrapChooseServiceMapping());
                this.register(new MaterialScrapLinkServiceMapping());
            }
        }
    }
}