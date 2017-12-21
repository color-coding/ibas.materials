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
import { IMaterialInventoryViewView } from "../../../bsapp/materialinventory/index";
export class MaterialInventoryViewView extends ibas.BOViewView implements IMaterialInventoryViewView {
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_general_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialjournal_itemcode") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/itemCode"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_warehouse") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/warehouse"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_avgprice") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/avgPrice"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_inventory_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_onhand") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/onHand"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_oncommited") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/onCommited"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialinventory_onordered") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/onOrdered"
                }),
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_edit"),
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
    showMaterialInventory(data: bo.MaterialInventory): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
}