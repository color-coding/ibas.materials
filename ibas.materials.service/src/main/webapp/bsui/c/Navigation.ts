/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
/// <reference path="../Component.d.ts" />
/// <reference path="../Component.ts" />
/// <reference path="./goodsissue/index.ts" />
/// <reference path="./goodsreceipt/index.ts" />
/// <reference path="./inventorytransfer/index.ts" />
/// <reference path="./material/index.ts" />
/// <reference path="./materialgroup/index.ts" />
/// <reference path="./warehouse/index.ts" />
/// <reference path="./materialbatch/index.ts" />
/// <reference path="./materialserial/index.ts" />
/// <reference path="./materialpricelist/index.ts" />
/// <reference path="./inventorycounting/index.ts" />
/// <reference path="./materialspecification/index.ts" />
/// <reference path="./specification/index.ts" />
/// <reference path="./materialscrap/index.ts" />
/// <reference path="./materialversion/index.ts" />
/// <reference path="./unit/index.ts" />
/// <reference path="./picklists/index.ts" />
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
                        view = new c.GoodsIssueListView();
                        break;
                    case app.GoodsIssueChooseApp.APPLICATION_ID:
                        view = new c.GoodsIssueChooseView();
                        break;
                    case app.GoodsIssueEditApp.APPLICATION_ID:
                        view = new c.GoodsIssueEditView();
                        break;
                    case app.GoodsIssueViewApp.APPLICATION_ID:
                        view = new c.GoodsIssueViewView();
                        break;
                    case app.GoodsReceiptListApp.APPLICATION_ID:
                        view = new c.GoodsReceiptListView();
                        break;
                    case app.GoodsReceiptChooseApp.APPLICATION_ID:
                        view = new c.GoodsReceiptChooseView();
                        break;
                    case app.GoodsReceiptEditApp.APPLICATION_ID:
                        view = new c.GoodsReceiptEditView();
                        break;
                    case app.GoodsReceiptViewApp.APPLICATION_ID:
                        view = new c.GoodsReceiptViewView();
                        break;
                    case app.InventoryTransferListApp.APPLICATION_ID:
                        view = new c.InventoryTransferListView();
                        break;
                    case app.InventoryTransferChooseApp.APPLICATION_ID:
                        view = new c.InventoryTransferChooseView();
                        break;
                    case app.InventoryTransferEditApp.APPLICATION_ID:
                        view = new c.InventoryTransferEditView();
                        break;
                    case app.InventoryTransferViewApp.APPLICATION_ID:
                        view = new c.InventoryTransferViewView();
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
                    case app.WarehouseEditApp.APPLICATION_ID:
                        view = new c.WarehouseEditView();
                        break;
                    case app.WarehouseViewApp.APPLICATION_ID:
                        view = new c.WarehouseViewView();
                        break;
                    case app.ProductChooseApp.APPLICATION_ID:
                        view = new c.ProductChooseView();
                        break;
                    case app.ProductInventoryChooseApp.APPLICATION_ID:
                        view = new c.ProductInventoryChooseView();
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
                    case app.MaterialBatchListService.APPLICATION_ID:
                        view = new c.MaterialBatchListsView();
                        break;
                    case app.MaterialSerialIssueService.APPLICATION_ID:
                        view = new c.MaterialSerialIssueView();
                        break;
                    case app.MaterialSerialReceiptService.APPLICATION_ID:
                        view = new c.MaterialSerialReceiptView();
                        break;
                    case app.MaterialSerialListService.APPLICATION_ID:
                        view = new c.MaterialSerialListsView();
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
                    case app.MaterialSerialViewApp.APPLICATION_ID:
                        view = new c.MaterialSerialViewView();
                        break;
                    case app.MaterialSerialViewApp.APPLICATION_ID:
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
                    case app.MaterialBatchViewApp.APPLICATION_ID:
                        view = new c.MaterialBatchViewView();
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
                    case app.MaterialSpecialPriceListApp.APPLICATION_ID:
                        view = new c.MaterialSpecialPriceListView();
                        break;
                    case app.InventoryCountingListApp.APPLICATION_ID:
                        view = new c.InventoryCountingListView();
                        break;
                    case app.InventoryCountingChooseApp.APPLICATION_ID:
                        view = new c.InventoryCountingChooseView();
                        break;
                    case app.InventoryCountingEditApp.APPLICATION_ID:
                        view = new c.InventoryCountingEditView();
                        break;
                    case app.InventoryCountingViewApp.APPLICATION_ID:
                        view = new c.InventoryCountingViewView();
                        break;
                    case app.SpecificationListApp.APPLICATION_ID:
                        view = new c.SpecificationListView();
                        break;
                    case app.SpecificationChooseApp.APPLICATION_ID:
                        view = new c.SpecificationChooseView();
                        break;
                    case app.SpecificationTreeService.APPLICATION_ID:
                        view = new c.SpecificationTreeView();
                        break;
                    case app.SpecificationEditApp.APPLICATION_ID:
                        view = new c.SpecificationEditView();
                        break;
                    case app.MaterialSpecificationListApp.APPLICATION_ID:
                        view = new c.MaterialSpecificationListView();
                        break;
                    case app.MaterialSpecificationChooseApp.APPLICATION_ID:
                        view = new c.MaterialSpecificationChooseView();
                        break;
                    case app.MaterialSpecificationViewApp.APPLICATION_ID:
                        view = new c.MaterialSpecificationViewView();
                        break;
                    case app.MaterialSpecificationEditApp.APPLICATION_ID:
                        view = new c.MaterialSpecificationEditView();
                        break;
                    case app.UnitListApp.APPLICATION_ID:
                        view = new c.UnitListView();
                        break;
                    case app.UnitChooseApp.APPLICATION_ID:
                        view = new c.UnitChooseView();
                        break;
                    case app.UnitEditApp.APPLICATION_ID:
                        view = new c.UnitEditView();
                        break;
                    case app.UnitRateEditListApp.APPLICATION_ID:
                        view = new c.UnitRateEditListView();
                        break;
                    case app.MaterialScrapListApp.APPLICATION_ID:
                        view = new c.MaterialScrapListView();
                        break;
                    case app.MaterialScrapChooseApp.APPLICATION_ID:
                        view = new c.MaterialScrapChooseView();
                        break;
                    case app.MaterialScrapViewApp.APPLICATION_ID:
                        view = new c.MaterialScrapViewView();
                        break;
                    case app.MaterialScrapEditApp.APPLICATION_ID:
                        view = new c.MaterialScrapEditView();
                        break;
                    case app.MaterialVersionListApp.APPLICATION_ID:
                        view = new c.MaterialVersionListView();
                        break;
                    case app.MaterialVersionChooseApp.APPLICATION_ID:
                        view = new c.MaterialVersionChooseView();
                        break;
                    case app.MaterialVersionViewApp.APPLICATION_ID:
                        view = new c.MaterialVersionViewView();
                        break;
                    case app.MaterialVersionEditApp.APPLICATION_ID:
                        view = new c.MaterialVersionEditView();
                        break;
                    case app.MaterialInventoryReservationService.APPLICATION_ID:
                        view = new c.MaterialInventoryReservationView();
                        break;
                    case app.MaterialSubstituteEditApp.APPLICATION_ID:
                        view = new c.MaterialSubstituteEditView();
                        break;
                    case app.MaterialSubstituteApp.APPLICATION_ID:
                        view = new c.MaterialSubstituteView();
                        break;
                    case app.MaterialOrderedReservationService.APPLICATION_ID:
                        view = new c.MaterialOrderedReservationView();
                        break;
                    case app.PickListsListApp.APPLICATION_ID:
                        view = new c.PickListsListView();
                        break;
                    case app.PickListsChooseApp.APPLICATION_ID:
                        view = new c.PickListsChooseView();
                        break;
                    case app.PickListsViewApp.APPLICATION_ID:
                        view = new c.PickListsViewView();
                        break;
                    case app.PickListsEditApp.APPLICATION_ID:
                        view = new c.PickListsEditView();
                        break;
                    case app.PickListsApp.APPLICATION_ID:
                        view = new c.PickListsView();
                        break;
                    case app.PickListsSettingApp.APPLICATION_ID:
                        view = new c.PickListsSettingView();
                        break;
                    case app.MaterialNumberChangeApp.APPLICATION_ID:
                        view = new c.MaterialNumberChangeView();
                        break;
                    case app.InventoryTransferRequestListApp.APPLICATION_ID:
                        view = new c.InventoryTransferRequestListView();
                        break;
                    case app.InventoryTransferRequestChooseApp.APPLICATION_ID:
                        view = new c.InventoryTransferRequestChooseView();
                        break;
                    case app.InventoryTransferRequestViewApp.APPLICATION_ID:
                        view = new c.InventoryTransferRequestViewView();
                        break;
                    case app.InventoryTransferRequestEditApp.APPLICATION_ID:
                        view = new c.InventoryTransferRequestEditView();
                        break;
                    case app.MaterialInventoryTransferApp.APPLICATION_ID:
                        view = new c.MaterialInventoryTransferView();
                        break;
                    case app.MaterialMeasurementService.APPLICATION_ID:
                        view = new c.MaterialMeasurementView();
                        break;
                    case app.BusinessPartnerMaterialCatalogListApp.APPLICATION_ID:
                        view = new c.BusinessPartnerMaterialCatalogListView();
                        break;
                    case app.BusinessPartnerMaterialCatalogChooseApp.APPLICATION_ID:
                        view = new c.BusinessPartnerMaterialCatalogChooseView();
                        break;
                    case app.MaterialGrossProfitService.APPLICATION_ID:
                        view = new c.MaterialGrossProfitView();
                        break;
                    case app.MaterialHistoricalPricesService.APPLICATION_ID:
                        view = new c.MaterialHistoricalPricesView();
                        break;
                    case app.SchedulingGroupListApp.APPLICATION_ID:
                        view = new c.SchedulingGroupListView();
                        break;
                    case app.SchedulingGroupChooseApp.APPLICATION_ID:
                        view = new c.SchedulingGroupChooseView();
                        break;
                    case app.SchedulingGroupEditApp.APPLICATION_ID:
                        view = new c.SchedulingGroupEditView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}