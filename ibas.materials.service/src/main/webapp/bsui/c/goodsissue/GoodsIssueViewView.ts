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
             * 查看视图-库存发货
             */
            export class GoodsIssueViewView extends ibas.BOViewView implements app.IGoodsIssueViewView {
                private layoutMain: sap.ui.layout.VerticalLayout;
                private viewBottomForm: sap.ui.layout.form.SimpleForm;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_docentry") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "docEntry"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_documentstatus") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "documentStatus",
                                formatter(data: any): any {
                                    return ibas.enums.describe(ibas.emDocumentStatus, data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_reference1") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "reference1"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_reference2") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "reference2"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_date_information") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_postingdate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "postingDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_deliverydate") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "deliveryDate",
                                type: new sap.ui.model.type.Date({
                                    pattern: "yyyy-MM-dd",
                                    strictParsing: true,
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsissue_documentdate") }),
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
                    this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_goodsissueline") }));
                    this.tableGoodsIssueLine = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        editable: false,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_goodsissueline_lineid"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "lineId"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_goodsissueline_linestatus"),
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
                                label: ibas.i18n.prop("bo_goodsissueline_itemcode"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "itemCode"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_goodsissueline_itemdescription"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "itemDescription"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_goodsissueline_quantity"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                    type: sap.m.InputType.Number,
                                }).bindProperty("text", {
                                    path: "quantity"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_goodsissueline_uom"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "uOM"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_goodsissueline_warehouse"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "warehouse"
                                })
                            })
                        ]
                    });
                    this.form.addContent(this.tableGoodsIssueLine);
                    this.viewBottomForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_goodsissue_remarks") }),
                            new sap.m.Text("", {
                            }).bindProperty("text", {
                                path: "/remarks"
                            }),
                        ]
                    });
                    this.layoutMain = new sap.ui.layout.VerticalLayout("", {
                        content: [
                            this.form,
                            this.tableGoodsIssueLine,
                            this.viewBottomForm,
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
                        content: [this.layoutMain]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private page: sap.m.Page;
                private form: sap.ui.layout.form.SimpleForm;
                private tableGoodsIssueLine: sap.ui.table.Table;

                /** 显示数据 */
                showGoodsIssue(data: bo.GoodsIssue): void {
                    this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
                    this.layoutMain.bindObject("/");
                }
                /** 显示数据 */
                showGoodsIssueLines(datas: bo.GoodsIssueLine[]): void {
                    this.tableGoodsIssueLine.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
            }
        }
    }
}