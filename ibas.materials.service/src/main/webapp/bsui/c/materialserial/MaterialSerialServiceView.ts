/*
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 物料序列发货视图 */
            export class MaterialSerialIssueView extends ibas.DialogView implements app.IMaterialSerialIssueView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 使用物料序列库存 */
                useMaterialSerialInventoryEvent: Function;
                /** 移出物料序列库存 */
                removeMaterialSerialItemEvent: Function;

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
                                label: ibas.i18n.prop("bo_materialserialitem_itemcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_itemdescription"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemDescription",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_warehouse"),
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
                                label: ibas.i18n.prop("bo_materialserialitem_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_unworked_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("bindingValue").binding.getContext();
                                        if (ibas.objects.isNull(context)) {
                                            return data;
                                        }
                                        let contract: app.IMaterialSerialContract = context.getObject();
                                        if (ibas.objects.isNull(contract)) {
                                            return data;
                                        } else {
                                            return contract.quantity - contract.materialSerials.total();
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
                                label: ibas.i18n.prop("bo_materialserialitem_serialcode"),
                                template: new sap.extension.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("bindingValue", {
                                    path: "serialCode",
                                    type: new sap.extension.data.Alphanumeric()
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
                                label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "serialCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserial_batchserial"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "batchSerial",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                        ]
                    });
                    return new sap.m.Dialog("", {
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
                                                            that.fireViewEvents(that.useMaterialSerialInventoryEvent, that.tableInventories.getSelecteds().firstOrDefault());
                                                        }
                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://navigation-left-arrow",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.removeMaterialSerialItemEvent, that.tableItems.getSelecteds().firstOrDefault());
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
                showWorkDatas(datas: app.IMaterialSerialContract[]): void {
                    this.tableWorkDatas.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料序列记录 */
                showMaterialSerialItems(datas: bo.IMaterialSerialItem[]): void {
                    this.tableItems.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    let model: sap.ui.model.Model = this.tableWorkDatas.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        model.refresh(true);
                    }
                }
                /** 显示物料序列库存 */
                showMaterialSerialInventories(datas: bo.MaterialSerial[]): void {
                    this.tableInventories.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
            /** 物料序列收货视图 */
            export class MaterialSerialReceiptView extends ibas.DialogView implements app.IMaterialSerialReceiptView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 创建序列编码记录 */
                createMaterialSerialItemEvent: Function;
                /** 删除物料序列库存 */
                deleteMaterialSerialItemEvent: Function;

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
                                label: ibas.i18n.prop("bo_materialserialitem_itemcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_itemdescription"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemDescription",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_warehouse"),
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
                                label: ibas.i18n.prop("bo_materialserialitem_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_unworked_quantity"),
                                template: new sap.extension.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("bindingValue").binding.getContext();
                                        if (ibas.objects.isNull(context)) {
                                            return data;
                                        }
                                        let contract: app.IMaterialSerialContract = context.getObject();
                                        if (ibas.objects.isNull(contract)) {
                                            return data;
                                        } else {
                                            return contract.quantity - contract.materialSerials.total();
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
                                        that.fireViewEvents(that.createMaterialSerialItemEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteMaterialSerialItemEvent, that.tableItems.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_serialcode"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "serialCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                        ]
                    });
                    return new sap.m.Dialog("", {
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
                showWorkDatas(datas: app.IMaterialSerialContract[]): void {
                    this.tableWorkDatas.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料序列记录 */
                showMaterialSerialItems(datas: bo.IMaterialSerialItem[]): void {
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