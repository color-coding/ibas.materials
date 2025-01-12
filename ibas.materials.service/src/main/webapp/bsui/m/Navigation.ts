/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
/// <reference path="./goodsissue/index.ts" />
/// <reference path="./goodsreceipt/index.ts" />
/// <reference path="./inventorytransfer/index.ts" />
/// <reference path="./material/index.ts" />
/// <reference path="./materialgroup/index.ts" />
/// <reference path="./warehouse/index.ts" />
/// <reference path="./materialbatch/index.ts" />
/// <reference path="./materialserial/index.ts" />
/// <reference path="./materialpricelist/index.ts" />
/// <reference path="./materialscrap/index.ts" />
/// <reference path="./materialversion/index.ts" />
/// <reference path="./unit/index.ts" />
/// <reference path="./inventorytransferrequest/index.ts" />
/// <reference path="./materialcatalog/index.ts" />
namespace materials {
    export namespace ui {
        /**
         * 视图导航
         */
        export class Navigation extends ibas.ViewNavigation {
            /**
             * 创建实例
             * @param id 应用id
             */
            protected newView(id: string): ibas.IView {
                let view: ibas.IView = null;
                switch (id) {
                    case app.GoodsIssueListApp.APPLICATION_ID:
                        view = new m.GoodsIssueListView();
                        break;
                    case app.GoodsIssueChooseApp.APPLICATION_ID:
                        view = new m.GoodsIssueChooseView();
                        break;
                    case app.GoodsIssueEditApp.APPLICATION_ID:
                        view = new m.GoodsIssueEditView();
                        break;
                    case app.GoodsIssueViewApp.APPLICATION_ID:
                        view = new m.GoodsIssueViewView();
                        break;
                    case app.GoodsReceiptListApp.APPLICATION_ID:
                        view = new m.GoodsReceiptListView();
                        break;
                    case app.GoodsReceiptChooseApp.APPLICATION_ID:
                        view = new m.GoodsReceiptChooseView();
                        break;
                    case app.GoodsReceiptEditApp.APPLICATION_ID:
                        view = new m.GoodsReceiptEditView();
                        break;
                    case app.GoodsReceiptViewApp.APPLICATION_ID:
                        view = new m.GoodsReceiptViewView();
                        break;
                    case app.InventoryTransferListApp.APPLICATION_ID:
                        view = new m.InventoryTransferListView();
                        break;
                    case app.InventoryTransferChooseApp.APPLICATION_ID:
                        view = new m.InventoryTransferChooseView();
                        break;
                    case app.InventoryTransferEditApp.APPLICATION_ID:
                        view = new m.InventoryTransferEditView();
                        break;
                    case app.InventoryTransferViewApp.APPLICATION_ID:
                        view = new m.InventoryTransferViewView();
                        break;
                    case app.MaterialOverviewApp.APPLICATION_ID:
                        view = new m.MaterialOverviewView();
                        break;
                    case app.MaterialViewApp.APPLICATION_ID:
                        view = new m.MaterialViewView();
                        break;
                    case app.MaterialChooseApp.APPLICATION_ID:
                        view = new m.MaterialChooseView();
                        break;
                    case app.ProductChooseApp.APPLICATION_ID:
                        view = new m.ProductChooseView();
                        break;
                    case app.ProductInventoryChooseApp.APPLICATION_ID:
                        view = new m.ProductChooseView();
                        break;
                    case app.MaterialGroupChooseApp.APPLICATION_ID:
                        view = new m.MaterialGroupChooseView();
                        break;
                    case app.WarehouseChooseApp.APPLICATION_ID:
                        view = new m.WarehouseChooseView();
                        break;
                    case app.WarehouseViewApp.APPLICATION_ID:
                        view = new m.WarehouseViewView();
                        break;
                    case app.MaterialPriceListChooseApp.APPLICATION_ID:
                        view = new m.MaterialPriceListChooseView();
                        break;
                    case app.MaterialPriceListListApp.APPLICATION_ID:
                        view = new m.MaterialPriceListListView();
                        break;
                    case app.MaterialBatchChooseApp.APPLICATION_ID:
                        view = new m.MaterialBatchChooseView();
                        break;
                    case app.MaterialSerialChooseApp.APPLICATION_ID:
                        view = new m.MaterialSerialChooseView();
                        break;
                    case app.UnitChooseApp.APPLICATION_ID:
                        view = new m.UnitChooseView();
                        break;
                    case app.MaterialScrapChooseApp.APPLICATION_ID:
                        view = new m.MaterialScrapChooseView();
                        break;
                    case app.MaterialScrapViewApp.APPLICATION_ID:
                        view = new m.MaterialScrapViewView();
                        break;
                    case app.MaterialVersionChooseApp.APPLICATION_ID:
                        view = new m.MaterialVersionChooseView();
                        break;
                    case app.MaterialVersionViewApp.APPLICATION_ID:
                        view = new m.MaterialVersionViewView();
                        break;
                    case app.InventoryTransferRequestListApp.APPLICATION_ID:
                        view = new m.InventoryTransferRequestListView();
                        break;
                    case app.InventoryTransferRequestChooseApp.APPLICATION_ID:
                        view = new m.InventoryTransferRequestChooseView();
                        break;
                    case app.InventoryTransferRequestEditApp.APPLICATION_ID:
                        view = new m.InventoryTransferRequestEditView();
                        break;
                    case app.InventoryTransferRequestViewApp.APPLICATION_ID:
                        view = new m.InventoryTransferRequestViewView();
                        break;
                    case app.BusinessPartnerMaterialCatalogChooseApp.APPLICATION_ID:
                        view = new m.BusinessPartnerMaterialCatalogChooseView();
                        break;
                    case app.SchedulingGroupChooseApp.APPLICATION_ID:
                        view = new m.SchedulingGroupChooseView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}