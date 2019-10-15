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
            export class MaterialBatchIssueView extends ibas.DialogView implements app.IMaterialBatchIssueView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 使用物料批次库存 */
                useMaterialBatchInventoryEvent: Function;
                /** 移出物料批次库存 */
                removeMaterialBatchItemEvent: Function;

                draw(): any {
                    let that: this = this;
                    this.tableWorkDatas = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        chooseType: ibas.emChooseType.SINGLE,
                        visibleRowCount: sap.extension.table.visibleRowCount(5),
                        rowSelectionChange: function (event: any): void {
                            let table: sap.extension.table.Table = event.getSource();
                            that.fireViewEvents(that.changeWorkingDataEvent, table.getSelecteds().firstOrDefault());
                        },
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemdescription"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemDescription",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_warehouse"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "warehouse",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_unworked_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("bindingValue").binding.getContext();
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
                    this.tableItems = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        chooseType: ibas.emChooseType.SINGLE,
                        visibleRowCount: sap.extension.table.visibleRowCount(6),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_batchcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "batchCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                            }),
                        ]
                    });
                    this.tableInventories = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        chooseType: ibas.emChooseType.SINGLE,
                        visibleRowCount: sap.extension.table.visibleRowCount(6),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "batchCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
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
                                        renderType: sap.m.FlexRendertype.Bare,
                                        items: [
                                            this.tableInventories,
                                            new sap.m.VBox("", {
                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                items: [
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://navigation-right-arrow",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.useMaterialBatchInventoryEvent, that.tableInventories.getSelecteds().firstOrDefault());
                                                        }
                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://navigation-left-arrow",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.removeMaterialBatchItemEvent, that.tableItems.getSelecteds().firstOrDefault());
                                                        }
                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                ]
                                            }).addStyleClass("sapUiTinyMarginBeginEnd"),
                                            this.tableItems,
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
                private tableWorkDatas: sap.extension.table.Table;
                private tableItems: sap.extension.table.Table;
                private tableInventories: sap.extension.table.Table;
                /** 显示待处理数据 */
                showWorkDatas(datas: app.IMaterialBatchContract[]): void {
                    this.tableWorkDatas.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料批次记录 */
                showMaterialBatchItems(datas: bo.IMaterialBatchItem[]): void {
                    this.tableItems.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    let model: sap.ui.model.Model = this.tableWorkDatas.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        model.refresh(true);
                    }
                }
                /** 显示物料批次库存 */
                showMaterialBatchInventories(datas: bo.MaterialBatch[]): void {
                    this.tableInventories.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
            /** 物料批次收货视图 */
            export class MaterialBatchReceiptView extends ibas.DialogView implements app.IMaterialBatchReceiptView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 创建批次记录 */
                createMaterialBatchItemEvent: Function;
                /** 删除物料批次库存 */
                deleteMaterialBatchItemEvent: Function;

                draw(): any {
                    let that: this = this;
                    this.tableWorkDatas = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        chooseType: ibas.emChooseType.SINGLE,
                        visibleRowCount: sap.extension.table.visibleRowCount(5),
                        rowSelectionChange: function (event: any): void {
                            let table: sap.extension.table.Table = event.getSource();
                            that.fireViewEvents(that.changeWorkingDataEvent, table.getSelecteds().firstOrDefault());
                        },
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_itemdescription"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemDescription",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_warehouse"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "warehouse",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_unworked_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("bindingValue").binding.getContext();
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
                    this.tableItems = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        chooseType: ibas.emChooseType.SINGLE,
                        visibleRowCount: sap.extension.table.visibleRowCount(4),
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
                                        that.fireViewEvents(that.deleteMaterialBatchItemEvent, that.tableItems.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_batchcode"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "batchCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchitem_quantity"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
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
                private tableWorkDatas: sap.extension.table.Table;
                private tableItems: sap.extension.table.Table;

                /** 显示待处理数据 */
                showWorkDatas(datas: app.IMaterialBatchContract[]): void {
                    this.tableWorkDatas.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料批次记录 */
                showMaterialBatchItems(datas: bo.IMaterialBatchItem[]): void {
                    this.tableItems.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    let model: sap.ui.model.Model = this.tableWorkDatas.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        model.refresh(true);
                    }
                }
            }
        }
    }
}