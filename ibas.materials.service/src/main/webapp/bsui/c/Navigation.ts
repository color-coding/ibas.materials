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
                        view = new c.GoodsIssueListView();
                        break;
                    case app.GoodsIssueChooseApp.APPLICATION_ID:
                        view = new c.GoodsIssueChooseView();
                        break;
                    case app.GoodsIssueViewApp.APPLICATION_ID:
                        view = new c.GoodsIssueViewView();
                        break;
                    case app.GoodsIssueEditApp.APPLICATION_ID:
                        view = new c.GoodsIssueEditView();
                        break;
                    case app.GoodsReceiptListApp.APPLICATION_ID:
                        view = new c.GoodsReceiptListView();
                        break;
                    case app.GoodsReceiptChooseApp.APPLICATION_ID:
                        view = new c.GoodsReceiptChooseView();
                        break;
                    case app.GoodsReceiptViewApp.APPLICATION_ID:
                        view = new c.GoodsReceiptViewView();
                        break;
                    case app.GoodsReceiptEditApp.APPLICATION_ID:
                        view = new c.GoodsReceiptEditView();
                        break;
                    case app.InventoryTransferListApp.APPLICATION_ID:
                        view = new c.InventoryTransferListView();
                        break;
                    case app.InventoryTransferChooseApp.APPLICATION_ID:
                        view = new c.InventoryTransferChooseView();
                        break;
                    case app.InventoryTransferViewApp.APPLICATION_ID:
                        view = new c.InventoryTransferViewView();
                        break;
                    case app.InventoryTransferEditApp.APPLICATION_ID:
                        view = new c.InventoryTransferEditView();
                        break;
                    case app.MaterialListApp.APPLICATION_ID:
                        view = new c.MaterialListView();
                        break;
                    case app.MaterialChooseApp.APPLICATION_ID:
                        view = new c.MaterialChooseView();
                        break;
                    case app.MaterialViewApp.APPLICATION_ID:
                        view = new c.MaterialViewView();
                        break;
                    case app.MaterialEditApp.APPLICATION_ID:
                        view = new c.MaterialEditView();
                        break;
                    case app.MaterialGroupListApp.APPLICATION_ID:
                        view = new c.MaterialGroupListView();
                        break;
                    case app.MaterialGroupChooseApp.APPLICATION_ID:
                        view = new c.MaterialGroupChooseView();
                        break;
                    case app.MaterialGroupEditApp.APPLICATION_ID:
                        view = new c.MaterialGroupEditView();
                        break;
                    case app.WarehouseListApp.APPLICATION_ID:
                        view = new c.WarehouseListView();
                        break;
                    case app.WarehouseChooseApp.APPLICATION_ID:
                        view = new c.WarehouseChooseView();
                        break;
                    case app.WarehouseViewApp.APPLICATION_ID:
                        view = new c.WarehouseViewView();
                        break;
                    case app.WarehouseEditApp.APPLICATION_ID:
                        view = new c.WarehouseEditView();
                        break;
                    case app.ProductChooseApp.APPLICATION_ID:
                        view = new c.ProductChooseView();
                        break;
                    case app.MaterialOverviewApp.APPLICATION_ID:
                        view = new c.MaterialOverviewView();
                        break;
                    case app.MaterialInventoryListApp.APPLICATION_ID:
                        view = new c.MaterialInventoryListView();
                        break;
                    case app.MaterialBatchReceiptService.APPLICATION_ID:
                        view = new c.MaterialBatchReceiptView();
                        break;
                    case app.MaterialBatchIssueService.APPLICATION_ID:
                        view = new c.MaterialBatchIssueView();
                        break;
                    case app.MaterialSerialIssueService.APPLICATION_ID:
                        view = new c.MaterialSerialIssueView();
                        break;
                    case app.MaterialSerialReceiptService.APPLICATION_ID:
                        view = new c.MaterialSerialReceiptView();
                        break;
                    case app.MaterialSerialListApp.APPLICATION_ID:
                        view = new c.MaterialSerialListView();
                        break;
                    case app.MaterialSerialChooseApp.APPLICATION_ID:
                        view = new c.MaterialSerialChooseView();
                        break;
                    case app.MaterialSerialEditApp.APPLICATION_ID:
                        view = new c.MaterialSerialEditView();
                        break;
                    case app.MaterialBatchListApp.APPLICATION_ID:
                        view = new c.MaterialBatchListView();
                        break;
                    case app.MaterialBatchChooseApp.APPLICATION_ID:
                        view = new c.MaterialBatchChooseView();
                        break;
                    case app.MaterialBatchEditApp.APPLICATION_ID:
                        view = new c.MaterialBatchEditView();
                        break;
                    case app.MaterialPriceListListApp.APPLICATION_ID:
                        view = new c.MaterialPriceListListView();
                        break;
                    case app.MaterialPriceListChooseApp.APPLICATION_ID:
                        view = new c.MaterialPriceListChooseView();
                        break;
                    case app.MaterialPriceListEditApp.APPLICATION_ID:
                        view = new c.MaterialPriceListEditView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}