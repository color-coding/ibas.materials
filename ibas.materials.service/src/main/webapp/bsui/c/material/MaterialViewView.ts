/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IMaterialViewView } from "../../../bsapp/material/index";

/**
 * 查看视图-物料
 */
export class MaterialViewView extends ibas.BOViewView implements IMaterialViewView {

    /** 绘制视图 */
    public draw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: false,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "code"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_name") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "name"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_foreignname") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "foreignName"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_itemtype") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "itemType",
                    formatter(data: any): any {
                        return ibas.enums.describe(bo.emItemType, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_group") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "group"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "barCode"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_type_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_activated") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "activated",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseitem") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "purchaseItem",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesitem") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "salesItem",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryitem") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "inventoryItem",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_fixedassets") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "fixedAssets",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_remarks") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "remarks"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_picture") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "picture"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_oncommited") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "onCommited"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onhand") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "onHand"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onorder") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "onOrder"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryuom") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "UOM"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_inventory") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_minimuminventory") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "minimumInventory"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_defaultwarehouse") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "defaultWarehouse"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "phantomItem",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_serialmanagement") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "serialManagement",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_batchmanagement") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "batchManagement",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_technical_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_createdate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "createDate",
                    type: new sap.ui.model.type.Date({
                        pattern: "yyyy-MM-dd",
                        strictParsing: true,
                    }),
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_createusersign") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "createUserSign"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_updatedate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "updateDate",
                    type: new sap.ui.model.type.Date({
                        pattern: "yyyy-MM-dd",
                        strictParsing: true,
                    }),
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_updateusersign") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "updateUserSign"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_objectcode") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "objectCode"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_docentry") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "docEntry"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_loginst") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "logInst"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_createactionid") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "createActionId"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_updateactionid") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "updateActionId"
                }),
            ],
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
    public showMaterial(data: bo.Material): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        this.form.bindObject("/");
    }
}
