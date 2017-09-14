/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { IMaterialJournalEditView } from "../../../bsapp/materialjournal/index";
export class MaterialJournalEditView extends ibas.BOEditView implements IMaterialJournalEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;

    chooseMaterialJournalWarehouseEvent: Function;

    chooseMaterialJournalItemCodeEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
            singleContainerFullSize: false,
            adjustLabelSpan: false,
            labelSpanL: 2,
            labelSpanM: 2,
            labelSpanS: 12,
            columnsXL: 2,
            columnsL: 2,
            columnsM: 1,
            columnsS: 1,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_base_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_baseentry") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/baseEntry"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_baselinnum") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number
                }).bindProperty("value", {
                    path: "/baseLinNum"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_itemcode") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseMaterialJournalItemCodeEvent);
                    }
                }).bindProperty("value", {
                    path: "/itemCode"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_warehouse") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseMaterialJournalWarehouseEvent);
                    }
                }).bindProperty("value", {
                    path: "/warehouse"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_direction") }),
                new sap.m.SegmentedButton("", {
                    width: "30%",
                    items: [
                        new sap.m.SegmentedButtonItem("", {
                            text: ibas.enums.describe(ibas.emDirection, ibas.emDirection.IN),
                            key: ibas.emDirection.IN
                        }),
                        new sap.m.SegmentedButtonItem("", {
                            text: ibas.enums.describe(ibas.emDirection, ibas.emDirection.OUT),
                            key: ibas.emDirection.OUT
                        })
                    ]
                }).bindProperty("selectedKey", {
                    path: "/direction",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_quantity") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number
                }).bindProperty("value", {
                    path: "/quantity"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_price") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number
                }).bindProperty("value", {
                    path: "/price"
                }),

                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_date_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_documentdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "/documentDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_postingdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "/documentDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_deliverydate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "/documentDate"
                }),

                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_forex_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_currency") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "/currency"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_rate") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number
                }).bindProperty("value", {
                    path: "/rate"
                }),

            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("sys_shell_data_new"),
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
                                    text: ibas.i18n.prop("sys_shell_data_new"),
                                    icon: "sap-icon://create"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("sys_shell_data_clone"),
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
    private changeViewStatus(data: bo.MaterialJournal): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
    }

    /** 显示数据 */
    showMaterialJournal(data: bo.MaterialJournal): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
}