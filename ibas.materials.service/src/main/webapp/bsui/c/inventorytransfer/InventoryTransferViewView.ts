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
             * 查看视图-库存转储
             */
            export class InventoryTransferViewView extends ibas.BOViewView implements app.IInventoryTransferViewView {
                private layoutMain: sap.ui.layout.VerticalLayout;
                private viewBottomForm: sap.ui.layout.form.SimpleForm;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: false,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_docentry") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "docEntry"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documentstatus") }),
                            new sap.m.Text("", {
                                wrapping: false
                            }).bindProperty("text", {
                                path: "documentStatus",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emDocumentStatus, data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_reference1") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "reference1"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_reference2") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "reference2"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_date_information") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_postingdate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "PostingDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_deliverydate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "deliveryDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documentdate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "documentDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                }),
                            }),
                        ]
                    });
                    this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorytransferline") }));
                    this.tableInventoryTransferLine = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_lineid"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "lineId"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_linestatus"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "lineStatus",
                                    formatter(data: any): any {
                                        return ibas.enums.describe(ibas.emDocumentStatus, data);
                                    }
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_itemcode"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "itemCode"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_itemdescription"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "itemDescription"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_quantity"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                    type: sap.m.InputType.Number,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    type: new openui5.datatype.Quantity(),
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_uom"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "uOM"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorytransferline_warehouse"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "warehouse"
                                })
                            })
                        ]
                    });
                    this.form.addContent(this.tableInventoryTransferLine);
                    this.viewBottomForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorytransfer_remarks") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "/remarks"
                            }),
                        ]
                    });
                    this.layoutMain = new sap.ui.layout.VerticalLayout("", {
                        content: [
                            this.form,
                            this.tableInventoryTransferLine,
                            this.viewBottomForm,
                        ]
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
                                                data: (<any>that.layoutMain.getModel()).getData(),
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
                                                    popover.addContent(new sap.m.Button("", {
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
                        content: [this.layoutMain]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private page: sap.m.Page;
                private form: sap.ui.layout.form.SimpleForm;
                private tableInventoryTransferLine: sap.ui.table.Table;

                /** 显示数据 */
                showInventoryTransfer(data: bo.InventoryTransfer): void {
                    this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
                    this.layoutMain.bindObject("/");
                }
                /** 显示数据 */
                showInventoryTransferLines(datas: bo.InventoryTransferLine[]): void {
                    this.tableInventoryTransferLine.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
            }
        }
    }
}