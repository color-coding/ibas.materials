/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /**
             * 查看视图-物料
             */
            export class MaterialViewView extends ibas.BOViewView implements app.IMaterialViewView {

                /** 绘制视图 */
                public draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_picture") }),
                            new sap.m.Link("", {
                                text: { path: "picture" },
                                press: function (oEvent: sap.ui.base.Event): void {
                                    let src: string = this.getText();
                                    if (!ibas.objects.isNull(src)) {
                                        let lightBox: sap.m.LightBox = new sap.m.LightBox("", {
                                            imageContent: [
                                                new sap.m.LightBoxItem("", {
                                                    imageSrc: new bo.BORepositoryMaterials().toUrl(src)
                                                })
                                            ]
                                        });
                                        lightBox.open();
                                    }
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_remarks") }),
                            new sap.m.Text("", {
                                rows: 3,
                            }).bindProperty("text", {
                                path: "remarks",
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_activated") }),
                            new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "activated",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emYesNo, data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_validdate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "validDate",
                                type: "sap.ui.model.type.Date",
                                formatOptions: {
                                    style: "medium"
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_invaliddate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "invalidDate",
                                type: "sap.ui.model.type.Date",
                                formatOptions: {
                                    style: "medium"
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                            new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "phantomItem",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emYesNo, data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_productunit") }),
                            new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "productUnit",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emYesNo, data);
                                }
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_inventory") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_oncommited") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "onCommited",
                                type: new openui5.datatype.Quantity(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onhand") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "onHand",
                                type: new openui5.datatype.Quantity(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onordered") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "onOrdered",
                                type: new openui5.datatype.Quantity(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryuom") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "inventoryUOM"
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_defaultwarehouse") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "defaultWarehouse"
                            }),
                            new sap.ui.core.Title("", {}),
                        ],
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Bar("", {
                            contentLeft: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    visible: this.mode === ibas.emViewMode.VIEW ? false : true,
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
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: (<any>that.form.getModel()).getData(),
                                                converter: new bo.DataConverter(),
                                            }),
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
        }
    }
}