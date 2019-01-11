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
                    this.tableWorkDatas = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
                        rowSelectionChange: function (event: any): void {
                            let table: sap.ui.table.Table = event.getSource();
                            that.fireViewEvents(that.changeWorkingDataEvent,
                                openui5.utils.getSelecteds<app.IMaterialSerialContract>(table).firstOrDefault());
                        },
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_itemcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_itemdescription"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemDescription",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_warehouse"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "warehouse",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    type: new openui5.datatype.Quantity(),
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_unworked_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    type: new openui5.datatype.Quantity(),
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("text").binding.getContext();
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
                    openui5.utils.changeSelectionStyle(this.tableWorkDatas, ibas.emChooseType.SINGLE);
                    this.tableItems = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 6),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_serialcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "serialCode",
                                }),
                            }),
                        ]
                    });
                    openui5.utils.changeSelectionStyle(this.tableItems, ibas.emChooseType.SINGLE);
                    this.tableInventories = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 6),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                width: "60%",
                                label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "serialCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                width: "40%",
                                label: ibas.i18n.prop("bo_materialserial_batchserial"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "batchSerial",
                                }),
                            }),
                            /*
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "supplierSerial",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserial_internalserial"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "internalSerial",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "expirationDate",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "manufacturingDate",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserial_admissiondate"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "admissionDate",
                                }),
                            }),
                            */
                        ]
                    });
                    openui5.utils.changeSelectionStyle(this.tableInventories, ibas.emChooseType.SINGLE);
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
                                        renderType: sap.m.FlexRendertype.Bare,
                                        items: [
                                            this.tableInventories,
                                            new sap.m.VBox("", {
                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                items: [
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://navigation-right-arrow",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.useMaterialSerialInventoryEvent,
                                                                openui5.utils.getSelecteds(that.tableInventories).firstOrDefault());
                                                        }
                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://navigation-left-arrow",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.removeMaterialSerialItemEvent,
                                                                openui5.utils.getSelecteds(that.tableItems).firstOrDefault());
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
                private tableWorkDatas: sap.ui.table.Table;
                private tableItems: sap.ui.table.Table;
                private tableInventories: sap.ui.table.Table;
                /** 显示待处理数据 */
                showWorkDatas(datas: app.IMaterialSerialContract[]): void {
                    this.tableWorkDatas.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 显示物料序列记录 */
                showMaterialSerialItems(datas: bo.IMaterialSerialItem[]): void {
                    this.tableItems.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    let model: sap.ui.model.Model = this.tableWorkDatas.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        model.refresh(true);
                    }
                }
                /** 显示物料序列库存 */
                showMaterialSerialInventories(datas: bo.MaterialSerial[]): void {
                    this.tableInventories.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
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
                    this.tableWorkDatas = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
                        rowSelectionChange: function (event: any): void {
                            let table: sap.ui.table.Table = event.getSource();
                            that.fireViewEvents(that.changeWorkingDataEvent,
                                openui5.utils.getSelecteds<app.IMaterialSerialContract>(table).firstOrDefault());
                        },
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_itemcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_itemdescription"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemDescription",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_warehouse"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "warehouse",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    type: new openui5.datatype.Quantity(),
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_unworked_quantity"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "quantity",
                                    type: new openui5.datatype.Quantity(),
                                    formatter(data: any): any {
                                        let context: any = this.getBindingInfo("text").binding.getContext();
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
                    openui5.utils.changeSelectionStyle(this.tableWorkDatas, ibas.emChooseType.SINGLE);
                    this.tableItems = new sap.ui.table.Table("", {
                        enableSelectAll: false,
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
                                        that.fireViewEvents(that.createMaterialSerialItemEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteMaterialSerialItemEvent,
                                            openui5.utils.getSelecteds<app.IMaterialSerialContract>(that.tableItems).firstOrDefault()
                                        );
                                    }
                                }),
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialitem_serialcode"),
                                template: new sap.m.Input("", {
                                }).bindProperty("value", {
                                    path: "serialCode",
                                }),
                            }),
                        ]
                    });
                    openui5.utils.changeSelectionStyle(this.tableItems, ibas.emChooseType.SINGLE);
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
                showWorkDatas(datas: app.IMaterialSerialContract[]): void {
                    this.tableWorkDatas.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 显示物料序列记录 */
                showMaterialSerialItems(datas: bo.IMaterialSerialItem[]): void {
                    this.tableItems.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    let model: sap.ui.model.Model = this.tableWorkDatas.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        model.refresh(true);
                    }
                }
            }
        }
    }
}