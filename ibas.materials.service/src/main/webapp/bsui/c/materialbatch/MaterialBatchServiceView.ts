/*
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 物料批次发货视图 */
            export class MaterialBatchIssueView extends ibas.BODialogView implements app.IMaterialBatchIssueView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 使用物料批次库存 */
                useMaterialBatchInventoryEvent: Function;
                /** 移出物料批次库存 */
                removeMaterialBatchItemEvent: Function;

                draw(): any {
                    let that: this = this;
                    this.tableWorkDatas = new sap.ui.table.Table("", {
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
                        rowSelectionChange: function (event: any): void {
                            let table: sap.ui.table.Table = event.getSource();
                            that.fireViewEvents(that.changeWorkingDataEvent,
                                openui5.utils.getSelecteds<app.IMaterialBatchContract>(table).firstOrDefault());
                        },
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemdescription"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemDescription",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_warehouse"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "warehouse",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_unworked_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("text").binding.getContext();
                                        if (ibas.objects.isNull(context)) {
                                            return data;
                                        }
                                        let contract: app.IMaterialBatchContract = context.getObject();
                                        if (ibas.objects.isNull(contract)) {
                                            return data;
                                        } else {
                                            return contract.quantity - contract.materialBatches.total();
                                        }
                                    }
                                }),
                            }),
                        ]
                    });
                    this.tableItems = new sap.ui.table.Table("", {
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 6),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_batchcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "batchCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.m.Input("", {
                                    wrapping: false,
                                }).bindProperty("value", {
                                    path: "quantity",
                                }),
                            }),
                        ]
                    });
                    this.tableInventories = new sap.ui.table.Table("", {
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 6),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "batchCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                }),
                            }),
                            /*
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "supplierSerial",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_internalserial"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "internalSerial",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "expirationDate",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "manufacturingDate",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_admissiondate"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "admissionDate",
                                }),
                            }),
                            */
                        ]
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        content: [
                            new sap.m.VBox("", {
                                fitContainer: true,
                                items: [
                                    new sap.m.HBox("", {
                                        height: "58%",
                                        fitContainer: true,
                                        items: [
                                            this.tableWorkDatas,
                                        ]
                                    }),
                                    new sap.m.VBox("", {
                                        height: "15px",
                                        fitContainer: true,
                                        items: [
                                        ]
                                    }),
                                    new sap.m.HBox("", {
                                        height: "40%",
                                        fitContainer: true,
                                        items: [
                                            new sap.m.VBox("", {
                                                widht: "40%",
                                                fitContainer: true,
                                                items: [
                                                    new sap.m.ScrollContainer("", {
                                                        width: "100%",
                                                        height: "100%",
                                                        horizontal: true,
                                                        content: [
                                                            this.tableInventories
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new sap.m.VBox("", {
                                                widht: "20px",
                                                fitContainer: true,
                                                items: [
                                                    new sap.m.Button("", {
                                                        text: ">",
                                                        type: sap.m.ButtonType.Transparent,
                                                        press: function (): void {
                                                            that.fireViewEvents(that.useMaterialBatchInventoryEvent,
                                                                openui5.utils.getSelecteds(that.tableInventories).firstOrDefault());
                                                        }
                                                    }),
                                                    new sap.m.Button("", {
                                                        text: "<",
                                                        type: sap.m.ButtonType.Transparent,
                                                        press: function (): void {
                                                            that.fireViewEvents(that.removeMaterialBatchItemEvent);
                                                        }
                                                    }),
                                                ]
                                            }),
                                            new sap.m.VBox("", {
                                                widht: "40%",
                                                fitContainer: true,
                                                items: [
                                                    new sap.m.ScrollContainer("", {
                                                        width: "100%",
                                                        height: "100%",
                                                        horizontal: true,
                                                        content: [
                                                            this.tableItems
                                                        ]
                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                ]
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_close"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private tableWorkDatas: sap.ui.table.Table;
                private tableItems: sap.ui.table.Table;
                private tableInventories: sap.ui.table.Table;
                /** 显示待处理数据 */
                showWorkDatas(datas: app.IMaterialBatchContract[]): void {
                    this.tableWorkDatas.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 显示物料批次记录 */
                showMaterialBatchItems(datas: bo.IMaterialBatchItem[]): void {
                    this.tableItems.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 显示物料批次库存 */
                showMaterialBatchInventories(datas: bo.MaterialBatch[]): void {
                    this.tableInventories.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
            }
            /** 物料批次收货视图 */
            export class MaterialBatchReceiptView extends ibas.BODialogView implements app.IMaterialBatchReceiptView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 创建批次记录 */
                createMaterialBatchItemEvent: Function;
                /** 删除物料批次库存 */
                deleteMaterialBatchItemEvent: Function;

                draw(): any {
                    let that: this = this;
                    this.tableWorkDatas = new sap.ui.table.Table("", {
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
                        rowSelectionChange: function (event: any): void {
                            let table: sap.ui.table.Table = event.getSource();
                            that.fireViewEvents(that.changeWorkingDataEvent,
                                openui5.utils.getSelecteds<app.IMaterialBatchContract>(table).firstOrDefault());
                        },
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemdescription"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemDescription",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_warehouse"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "warehouse",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_unworked_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("text").binding.getContext();
                                        if (ibas.objects.isNull(context)) {
                                            return data;
                                        }
                                        let contract: app.IMaterialBatchContract = context.getObject();
                                        if (ibas.objects.isNull(contract)) {
                                            return data;
                                        } else {
                                            return contract.quantity - contract.materialBatches.total();
                                        }
                                    }
                                }),
                            }),
                        ]
                    });
                    this.tableItems = new sap.ui.table.Table("", {
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 4),
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_create"),
                                    icon: "sap-icon://add",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.fireViewEvents(that.createMaterialBatchItemEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteMaterialBatchItemEvent,
                                            openui5.utils.getSelecteds<app.IMaterialBatchContract>(that.tableItems).firstOrDefault()
                                        );
                                    }
                                }),
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_batchcode"),
                                template: new sap.m.Input("", {
                                    wrapping: false,
                                }).bindProperty("value", {
                                    path: "batchCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.m.Input("", {
                                    wrapping: false,
                                }).bindProperty("value", {
                                    path: "quantity",
                                }),
                            }),
                        ]
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        content: [
                            new sap.m.VBox("", {
                                fitContainer: true,
                                items: [
                                    new sap.m.HBox("", {
                                        height: "58%",
                                        fitContainer: true,
                                        items: [
                                            this.tableWorkDatas,
                                        ]
                                    }),
                                    new sap.m.HBox("", {
                                        height: "15px",
                                        fitContainer: true,
                                        items: [
                                        ]
                                    }),
                                    new sap.m.HBox("", {
                                        height: "40%",
                                        fitContainer: true,
                                        items: [
                                            this.tableItems
                                        ]
                                    }),
                                ]
                            }),
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_close"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private tableWorkDatas: sap.ui.table.Table;
                private tableItems: sap.ui.table.Table;

                /** 显示待处理数据 */
                showWorkDatas(datas: app.IMaterialBatchContract[]): void {
                    this.tableWorkDatas.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 显示物料批次记录 */
                showMaterialBatchItems(datas: bo.IMaterialBatchItem[]): void {
                    this.tableItems.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
            }
        }
    }
}