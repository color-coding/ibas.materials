/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../3rdparty/ibas/index.d.ts" />
/// <reference path="../../3rdparty/openui5/index.d.ts" />
/// <reference path="../../index.d.ts" />
/// <reference path="./material/index.ts" />
/// <reference path="./materialgroup/index.ts" />
/// <reference path="./warehouse/index.ts" />
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
                    case app.MaterialGroupChooseApp.APPLICATION_ID:
                        view = new m.MaterialGroupChooseView();
                        break;
                    case app.WarehouseChooseApp.APPLICATION_ID:
                        view = new m.WarehouseChooseView();
                        break;
                    case app.MaterialChooseApp.APPLICATION_ID:
                        view = new m.MaterialChooseView();
                    default:
                        break;
                }
                return view;
            }
        }
    }
}