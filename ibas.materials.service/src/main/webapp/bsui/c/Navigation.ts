/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as goodsissueApps from "../../bsapp/goodsissue/index";
import * as goodsreceiptApps from "../../bsapp/goodsreceipt/index";
import * as inventorytransferApps from "../../bsapp/inventorytransfer/index";
import * as materialApps from "../../bsapp/material/index";
import * as materialgroupApps from "../../bsapp/materialgroup/index";
import * as warehouseApps from "../../bsapp/warehouse/index";
import * as goodsissueViews from "./goodsissue/index";
import * as goodsreceiptViews from "./goodsreceipt/index";
import * as inventorytransferViews from "./inventorytransfer/index";
import * as materialViews from "./material/index";
import * as materialgroupViews from "./materialgroup/index";
import * as warehouseViews from "./warehouse/index";
import * as materialbatchApps from "../../bsapp/materialbatch/index";
import * as materialserialApps from "../../bsapp/materialserial/index";
import * as materialbatchViews from "./materialbatch/index";
import * as materialserialViews from "./materialserial/index";
import * as materialpricelistApps from "../../bsapp/materialpricelist/index";
import * as materialpricelistViews from "./materialpricelist/index";
/**
 * 视图导航
 */
export default class Navigation extends ibas.ViewNavigation {

    /**
     * 创建实例
     * @param id 应用id
     */
    protected newView(id: string): ibas.IView {
        let view: ibas.IView = null;
        switch (id) {
            case goodsissueApps.GoodsIssueListApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueListView();
                break;
            case goodsissueApps.GoodsIssueChooseApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueChooseView();
                break;
            case goodsissueApps.GoodsIssueViewApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueViewView();
                break;
            case goodsissueApps.GoodsIssueEditApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueEditView();
                break;
            case goodsreceiptApps.GoodsReceiptListApp.APPLICATION_ID:
                view = new goodsreceiptViews.GoodsReceiptListView();
                break;
            case goodsreceiptApps.GoodsReceiptChooseApp.APPLICATION_ID:
                view = new goodsreceiptViews.GoodsReceiptChooseView();
                break;
            case goodsreceiptApps.GoodsReceiptViewApp.APPLICATION_ID:
                view = new goodsreceiptViews.GoodsReceiptViewView();
                break;
            case goodsreceiptApps.GoodsReceiptEditApp.APPLICATION_ID:
                view = new goodsreceiptViews.GoodsReceiptEditView();
                break;
            case inventorytransferApps.InventoryTransferListApp.APPLICATION_ID:
                view = new inventorytransferViews.InventoryTransferListView();
                break;
            case inventorytransferApps.InventoryTransferChooseApp.APPLICATION_ID:
                view = new inventorytransferViews.InventoryTransferChooseView();
                break;
            case inventorytransferApps.InventoryTransferViewApp.APPLICATION_ID:
                view = new inventorytransferViews.InventoryTransferViewView();
                break;
            case inventorytransferApps.InventoryTransferEditApp.APPLICATION_ID:
                view = new inventorytransferViews.InventoryTransferEditView();
                break;
            case materialApps.MaterialListApp.APPLICATION_ID:
                view = new materialViews.MaterialListView();
                break;
            case materialApps.MaterialChooseApp.APPLICATION_ID:
                view = new materialViews.MaterialChooseView();
                break;
            case materialApps.MaterialViewApp.APPLICATION_ID:
                view = new materialViews.MaterialViewView();
                break;
            case materialApps.MaterialEditApp.APPLICATION_ID:
                view = new materialViews.MaterialEditView();
                break;
            case materialgroupApps.MaterialGroupListApp.APPLICATION_ID:
                view = new materialgroupViews.MaterialGroupListView();
                break;
            case materialgroupApps.MaterialGroupChooseApp.APPLICATION_ID:
                view = new materialgroupViews.MaterialGroupChooseView();
                break;
            case materialgroupApps.MaterialGroupEditApp.APPLICATION_ID:
                view = new materialgroupViews.MaterialGroupEditView();
                break;
            case warehouseApps.WarehouseListApp.APPLICATION_ID:
                view = new warehouseViews.WarehouseListView();
                break;
            case warehouseApps.WarehouseChooseApp.APPLICATION_ID:
                view = new warehouseViews.WarehouseChooseView();
                break;
            case warehouseApps.WarehouseViewApp.APPLICATION_ID:
                view = new warehouseViews.WarehouseViewView();
                break;
            case warehouseApps.WarehouseEditApp.APPLICATION_ID:
                view = new warehouseViews.WarehouseEditView();
                break;
            case materialApps.ProductChooseApp.APPLICATION_ID:
                view = new materialViews.ProductChooseView();
                break;
            case materialbatchApps.MaterialBatchReceiptService.APPLICATION_ID:
                view = new materialbatchViews.MaterialBatchReceiptView();
                break;
            case materialbatchApps.MaterialBatchIssueService.APPLICATION_ID:
                view = new materialbatchViews.MaterialBatchIssueView();
                break;
            case materialserialApps.MaterialSerialIssueService.APPLICATION_ID:
                view = new materialserialViews.MaterialSerialIssueView();
                break;
            case materialserialApps.MaterialSerialReceiptService.APPLICATION_ID:
                view = new materialserialViews.MaterialSerialReceiptView();
                break;
            case materialserialApps.MaterialSerialListApp.APPLICATION_ID:
                view = new materialserialViews.MaterialSerialListView();
                break;
            case materialserialApps.MaterialSerialChooseApp.APPLICATION_ID:
                view = new materialserialViews.MaterialSerialChooseView();
                break;
            case materialbatchApps.MaterialBatchListApp.APPLICATION_ID:
                view = new materialbatchViews.MaterialBatchListView();
                break;
            case materialbatchApps.MaterialBatchChooseApp.APPLICATION_ID:
                view = new materialbatchViews.MaterialBatchChooseView();
                break;
            case materialpricelistApps.MaterialPriceListListApp.APPLICATION_ID:
                view = new materialpricelistViews.MaterialPriceListListView();
                break;
            case materialpricelistApps.MaterialPriceListChooseApp.APPLICATION_ID:
                view = new materialpricelistViews.MaterialPriceListChooseView();
                break;
            case materialpricelistApps.MaterialPriceListEditApp.APPLICATION_ID:
                view = new materialpricelistViews.MaterialPriceListEditView();
                break;
            default:
                break;
        }
        return view;
    }
}
