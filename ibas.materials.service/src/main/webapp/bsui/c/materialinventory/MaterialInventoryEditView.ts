/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IMaterialInventoryEditView } from "../../../bsapp/materialinventory/index";

/**
 * 编辑视图-物料库存
 */
export class MaterialInventoryEditView extends ibas.BOEditView implements IMaterialInventoryEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;

    chooseMaterialInventoryItemCodeEvent: Function;

    chooseMaterialInventoryWarehouseEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_general_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_itemcode") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseMaterialInventoryItemCodeEvent);
                    }
                }).bindProperty("value", {
                    path: "/itemCode"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_warehouse") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseMaterialInventoryWarehouseEvent);
                    }
                }).bindProperty("value", {
                    path: "/warehouse"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_avgprice") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                }).bindProperty("value", {
                    path: "/avgPrice"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_inventory_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_onhand") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                    editable: false,
                }).bindProperty("value", {
                    path: "/onHand"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_oncommited") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                    editable: false,
                }).bindProperty("value", {
                    path: "/onCommited"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_onordered") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                    editable: false,
                }).bindProperty("value", {
                    path: "/onOrdered"
                }),
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("shell_data_new"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://create",
                        buttonMode: sap.m.MenuButtonMode.Split,
                        defaultAction: function (): void {
                            // 触发新建对象
                            that.fireViewEvents(that.createDataEvent, false);
                        },
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    icon: "sap-icon://create"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_clone"),
                                    icon: "sap-icon://copy"
                                }),
                            ],
                            itemSelected: function (event: any): void {
                                let item: any = event.getParameter("item");
                                if (item instanceof sap.m.MenuItem) {
                                    if (item.getIcon() === "sap-icon://copy") {
                                        // 触发克隆对象
                                        that.fireViewEvents(that.createDataEvent, true);
                                    } else {
                                        // 触发新建对象
                                        that.fireViewEvents(that.createDataEvent, false);
                                    }
                                }
                            }
                        })
                    }),
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    /** 改变视图状态 */
    private changeViewStatus(data: bo.MaterialInventory): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
    }

    /** 显示数据 */
    showMaterialInventory(data: bo.MaterialInventory): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
}
