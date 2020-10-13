/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
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
                    case app.MaterialOverviewApp.APPLICATION_ID:
                        view = new c.MaterialOverviewView();
                        break;
                    case app.MaterialChooseApp.APPLICATION_ID:
                        view = new m.MaterialChooseView();
                        break;
                    case app.ProductChooseApp.APPLICATION_ID:
                        view = new m.ProductChooseView();
                        break;
                    case app.MaterialGroupChooseApp.APPLICATION_ID:
                        view = new m.MaterialGroupChooseView();
                        break;
                    case app.WarehouseChooseApp.APPLICATION_ID:
                        view = new m.WarehouseChooseView();
                        break;
                    case app.MaterialPriceListChooseApp.APPLICATION_ID:
                        view = new m.MaterialPriceListChooseView();
                        break;
                    case app.MaterialPriceListListApp.APPLICATION_ID:
                        view = new c.MaterialPriceListListView();
                        break;
                    case app.MaterialBatchChooseApp.APPLICATION_ID:
                        view = new m.MaterialBatchChooseView();
                        break;
                    case app.MaterialSerialChooseApp.APPLICATION_ID:
                        view = new m.MaterialSerialChooseView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}