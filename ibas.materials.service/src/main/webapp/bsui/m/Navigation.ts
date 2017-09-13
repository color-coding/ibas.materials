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
import * as materialinventoryApps from "../../bsapp/materialinventory/index";
import * as materialjournalApps from "../../bsapp/materialjournal/index";
import * as warehouseApps from "../../bsapp/warehouse/index";
import * as goodsissueViews from "./goodsissue/index";
import * as goodsreceiptViews from "./goodsreceipt/index";
import * as inventorytransferViews from "./inventorytransfer/index";
import * as materialViews from "./material/index";
import * as materialgroupViews from "./materialgroup/index";
import * as materialinventoryViews from "./materialinventory/index";
import * as materialjournalViews from "./materialjournal/index";
import * as warehouseViews from "./warehouse/index";
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
            case goodsissueApps.GoodsIssueViewApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueViewView();
                break;
            case goodsissueApps.GoodsIssueEditApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueEditView();
                break;
            case goodsissueApps.GoodsIssueListApp.APPLICATION_ID:
                view = new goodsissueViews.GoodsIssueListView();
                break;
            case warehouseApps.WarehouseChooseApp.APPLICATION_ID:
                view = new warehouseViews.WarehouseChooseView();
                break;
            case materialApps.MaterialChooseApp.APPLICATION_ID:
                view = new materialViews.MaterialChooseView();
                break;
            default:
                break;
        }
        return view;
    }
}
