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
import { IMaterialGroupViewView } from "../../../bsapp/materialgroup/index";

/**
 * 查看视图-物料组
 */
export class MaterialGroupViewView extends ibas.BOViewView implements IMaterialGroupViewView {
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: false,
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
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_code") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/code"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_name") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/name"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_createdate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/createDate",
                    type: "sap.ui.model.type.Date",
                    formatOptions: {
                        style: "medium"
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_createusersign") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/createUserSign"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_updatedate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/updateDate",
                    type: "sap.ui.model.type.Date",
                    formatOptions: {
                        style: "medium"
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_updateusersign") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/updateUserSign"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_sys_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_warehouse_activated") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/activated",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_loginst") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/logInst"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_datasource") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/dataSource"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_series") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/series"
                }),

                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_dataowner") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/dataOwner"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialgroup_organization") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/organization"
                }),
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_edit"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://edit",
                        press: function (): void {
                            that.fireViewEvents(that.editDataEvent);
                        }
                    })
                ],
                contentRight: [
                    new sap.m.Button("", {
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://action",
                        press: function (event: any): void {
                            that.fireViewEvents(that.callServicesEvent, {
                                displayServices(services: ibas.IServiceAgent[]): void {
                                    if (ibas.objects.isNull(services) || services.length === 0) {
                                        return;
                                    }
                                    let popover: sap.m.Popover = new sap.m.Popover("", {
                                        showHeader: false,
                                        placement: sap.m.PlacementType.Bottom,
                                    });
                                    for (let service of services) {
                                        popover.addContent(new sap.m.Button({
                                            text: ibas.i18n.prop(service.name),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: service.icon,
                                            press: function (): void {
                                                service.run();
                                                popover.close();
                                            }
                                        }));
                                    }
                                    (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                    popover.openBy(event.getSource(), true);
                                }
                            });
                        }
                    })
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;

    /** 显示数据 */
    showMaterialGroup(data: bo.MaterialGroup): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
}
