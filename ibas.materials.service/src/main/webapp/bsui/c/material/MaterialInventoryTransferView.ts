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
            /** 视图-物料库存调拨 */
            export class MaterialInventoryTransferView extends ibas.View implements app.IMaterialInventoryTransferView {
                /** 添加物料库存事件 */
                addMaterialInventoryEvent: Function;
                /** 添加物料批次事件 */
                addMaterialBatchEvent: Function;
                /** 添加物料序列事件 */
                addMaterialSerialEvent: Function;
                /** 编辑批次信息 */
                editMaterialBatchEvent: Function;
                /** 编辑序列信息 */
                editMaterialSerialEvent: Function;
                /** 选择变更仓库 */
                chooseTargetWarehouseEvent: Function;
                /** 移除项目事件 */
                removeItemEvent: Function;
                /** 重置事件 */
                resetEvent: Function;
                /** 调拨事件 */
                transferToEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.itemTable = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
                        rows: "{/}",
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "status",
                            formatter(data: app.emNumberChangeStatus): sap.ui.core.MessageType {
                                if (data === app.emNumberChangeStatus.PROCESSING) {
                                    return sap.ui.core.MessageType.Warning;
                                }
                                if (data === app.emNumberChangeStatus.DONE) {
                                    return sap.ui.core.MessageType.Success;
                                }
                                return sap.ui.core.MessageType.Information;
                            }
                        }),
                        fixedColumnCount: 4,
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_code"),
                                template: new sap.extension.m.DataLink("", {
                                    objectCode: bo.BO_CODE_MATERIAL,
                                }).bindProperty("bindingValue", {
                                    path: "material/code",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "10rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_name"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "material/name",
                                    type: new sap.extension.data.Alphanumeric(),
                                    formatter(data: any): string {
                                        return data;
                                    }
                                }),
                                width: "14rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_number"),
                                template: new sap.extension.m.Link("", {
                                    press(this: sap.extension.m.Link): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof app.MaterialInventoryItem) {
                                            if (data.source instanceof bo.MaterialBatch) {
                                                that.fireViewEvents(that.editMaterialBatchEvent, data.source);
                                            } else if (data.source instanceof bo.MaterialSerial) {
                                                that.fireViewEvents(that.editMaterialSerialEvent, data.source);
                                            }
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "sourceNumber",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "10rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_warehouse_source"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME,
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "sourceWarehouse",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "sourceQuantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_quantity_target"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_warehouse_target"),
                                template: new sap.extension.m.SelectionInput("", {
                                    showValueHelp: true,
                                    chooseType: ibas.emChooseType.SINGLE,
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                    },
                                    criteria: [
                                        new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                    ],
                                    showValueLink: true,
                                    showSuggestion: true,
                                    suggestionItemSelected: function (this: sap.extension.m.RepositoryInput, event: sap.ui.base.Event): void {
                                        let selectedItem: any = event.getParameter("selectedItem");
                                        if (!ibas.objects.isNull(selectedItem)) {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof app.MaterialInventoryItem) {
                                                data.targetWarehouse = selectedItem.getKey();
                                            }
                                        }
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "targetWarehouse",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "10rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_remarks"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialinventoryitem_reserved_transfer_quantity"),
                                template: new sap.extension.m.Link("", {
                                    enabled: {
                                        parts: [
                                            {
                                                path: "material",
                                            },
                                            {
                                                path: "targetMaterial",
                                            }
                                        ],
                                        formatter(sCode: bo.Material, tCode: bo.Material): boolean {
                                            return (sCode && tCode && sCode.code === tCode.code);
                                        }
                                    },
                                    press(): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof app.MaterialInventoryItem) {
                                            let popover: sap.m.Popover = new sap.m.Popover("", {
                                                showHeader: false,
                                                contentWidth: "56rem",
                                                titleAlignment: sap.m.TitleAlignment.Start,
                                                placement: sap.m.PlacementType.HorizontalPreferedLeft,
                                                content: [
                                                    new sap.extension.m.Table("", {
                                                        columns: [
                                                            new sap.extension.m.Column("", {
                                                                header: ibas.i18n.prop("bo_materialinventoryreservation_targetdocument"),
                                                                hAlign: sap.ui.core.TextAlign.Center,
                                                                width: "14rem",
                                                            }),
                                                            new sap.extension.m.Column("", {
                                                                header: ibas.i18n.prop("bo_materialinventoryreservation_deliverydate"),
                                                                hAlign: sap.ui.core.TextAlign.Center,
                                                                width: "8rem",
                                                            }),
                                                            new sap.extension.m.Column("", {
                                                                header: ibas.i18n.prop("bo_materialinventoryreservation_quantity"),
                                                                hAlign: sap.ui.core.TextAlign.Center,
                                                                width: "8rem",
                                                            }),
                                                            new sap.extension.m.Column("", {
                                                                header: ibas.i18n.prop("bo_materialinventoryitem_transferquantity"),
                                                                hAlign: sap.ui.core.TextAlign.Center,
                                                                width: "8rem",
                                                            }),
                                                            new sap.extension.m.Column("", {
                                                                header: ibas.i18n.prop("bo_materialinventoryreservation_remarks"),
                                                                hAlign: sap.ui.core.TextAlign.Center,
                                                                width: "100%",
                                                            }),
                                                            new sap.extension.m.Column("", {
                                                                width: "4rem",
                                                                hAlign: sap.ui.core.TextAlign.Center,
                                                                header: new sap.extension.m.MenuButton("", {
                                                                    icon: "sap-icon://customize",
                                                                    type: sap.m.ButtonType.Transparent,
                                                                    menu: new sap.m.Menu("", {
                                                                        items: [
                                                                            new sap.m.MenuItem("", {
                                                                                text: ibas.i18n.prop("materials_reset"),
                                                                                press: function (): void {
                                                                                    let datas: any = (<sap.extension.model.JSONModel>popover.getModel()).getData();
                                                                                    if (datas instanceof Array) {
                                                                                        for (let data of datas) {
                                                                                            if (data instanceof app.MaterialInventoryReservation) {
                                                                                                data.target.quantity = data.sourceQuantity;
                                                                                            }
                                                                                        }
                                                                                        (<sap.extension.model.JSONModel>popover.getModel()).refresh(false);
                                                                                    }
                                                                                },
                                                                            }),
                                                                            new sap.m.MenuItem("", {
                                                                                text: ibas.i18n.prop("materials_clear"),
                                                                                press: function (): void {
                                                                                    let datas: any = (<sap.extension.model.JSONModel>popover.getModel()).getData();
                                                                                    if (datas instanceof Array) {
                                                                                        for (let data of datas) {
                                                                                            if (data instanceof app.MaterialInventoryReservation) {
                                                                                                data.target.quantity = 0;
                                                                                            }
                                                                                        }
                                                                                        (<sap.extension.model.JSONModel>popover.getModel()).refresh(false);
                                                                                    }
                                                                                },
                                                                            }),
                                                                        ],
                                                                    })
                                                                }),
                                                            }),
                                                        ],
                                                        items: {
                                                            path: "/",
                                                            templateShareable: true,
                                                            template: new sap.m.ColumnListItem("", {
                                                                type: sap.m.ListType.Inactive,
                                                                cells: [
                                                                    new sap.extension.m.Text("", {
                                                                    }).bindProperty("bindingValue", {
                                                                        parts: [
                                                                            {
                                                                                path: "source/targetDocumentType",
                                                                                type: new sap.extension.data.Alphanumeric({
                                                                                    maxLength: 30
                                                                                }),
                                                                            },
                                                                            {
                                                                                path: "source/targetDocumentEntry",
                                                                                type: new sap.extension.data.Numeric(),
                                                                            },
                                                                            {
                                                                                path: "source/targetDocumentLineId",
                                                                                type: new sap.extension.data.Numeric(),
                                                                            }
                                                                        ],
                                                                        formatter(type: string, entry: number, lineId: number): string {
                                                                            if (ibas.objects.isNull(type) || ibas.objects.isNull(entry)) {
                                                                                return "";
                                                                            }
                                                                            return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                                                                + (lineId > 0 ? ibas.strings.format(", {0}-{1}", ibas.i18n.prop("bo_goodsissueline_lineid"), lineId) : "");
                                                                        }
                                                                    }),
                                                                    new sap.extension.m.Text("", {
                                                                    }).bindProperty("bindingValue", {
                                                                        path: "source/deliveryDate",
                                                                        type: new sap.extension.data.Date(),
                                                                    }),
                                                                    new sap.extension.m.Text("", {
                                                                    }).bindProperty("bindingValue", {
                                                                        path: "sourceQuantity",
                                                                        type: new sap.extension.data.Quantity(),
                                                                    }),
                                                                    new sap.extension.m.Input("", {
                                                                        textAlign: sap.ui.core.TextAlign.End,
                                                                    }).bindProperty("bindingValue", {
                                                                        path: "target/quantity",
                                                                        type: new sap.extension.data.Quantity(),
                                                                    }),
                                                                    new sap.extension.m.Input("", {
                                                                        textAlign: sap.ui.core.TextAlign.End,
                                                                    }).bindProperty("bindingValue", {
                                                                        path: "target/remarks",
                                                                        type: new sap.extension.data.Alphanumeric(),
                                                                    })
                                                                ],
                                                                highlight: {
                                                                    parts: [
                                                                        {
                                                                            path: "sourceQuantity",
                                                                            type: new sap.extension.data.Quantity(),
                                                                        },
                                                                        {
                                                                            path: "target/quantity",
                                                                            type: new sap.extension.data.Quantity(),
                                                                        }
                                                                    ],
                                                                    formatter(quantity: number, transferQuantity: number): sap.ui.core.ValueState {
                                                                        if ((quantity - transferQuantity) < 0) {
                                                                            return sap.ui.core.ValueState.Error;
                                                                        }
                                                                        return sap.ui.core.ValueState.Information;
                                                                    }
                                                                },
                                                            }),
                                                        }
                                                    })
                                                ],
                                                afterClose: () => {
                                                    that.itemTable.getModel().refresh(false);
                                                }
                                            });
                                            popover.setModel(new sap.extension.model.JSONModel(data.reservations));
                                            popover.openBy(this, false);
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "reservationQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        },
                                        {
                                            path: "transferQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }
                                    ],
                                    formatter(reservation: number, transfer: number): string {
                                        let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                        builder.append(sap.extension.data.formatValue(sap.extension.data.Quantity, reservation, "string"));
                                        builder.append(" / ");
                                        builder.append(transfer);
                                        return builder.toString();
                                    }
                                }),
                            }),
                        ],
                        toolbar: new sap.m.Toolbar("", {
                            design: sap.m.ToolbarDesign.Transparent,
                            style: sap.m.ToolbarStyle.Standard,
                            content: [
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("bo_materialinventoryitem_warehouse"),
                                    showColon: true,
                                }),
                                this.warehouseInput = new sap.extension.m.SelectionInput("", {
                                    width: "16rem",
                                    showValueHelp: true,
                                    chooseType: ibas.emChooseType.MULTIPLE,
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME,
                                    },
                                    criteria: [
                                        new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                    ]
                                }),
                                new sap.m.ToolbarSeparator(),
                                new sap.extension.m.MenuButton("", {
                                    autoHide: true,
                                    icon: "sap-icon://tags",
                                    text: ibas.i18n.prop("shell_data_add"),
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_inventories"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.addMaterialInventoryEvent, that.warehouseInput.getBindingValue());
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_batch"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.addMaterialBatchEvent, that.warehouseInput.getBindingValue());
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_serial"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.addMaterialSerialEvent, that.warehouseInput.getBindingValue());
                                                },
                                            }),
                                        ]
                                    })
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeItemEvent, that.itemTable.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    icon: "sap-icon://reset",
                                    text: ibas.i18n.prop("materials_reset"),
                                    press(): void {
                                        that.fireViewEvents(that.resetEvent);
                                        that.warehouseInput.setBindingValue("");
                                        that.remarksInput.setValue(ibas.i18n.prop("materials_inventory_transfer_remarks", ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmm")));
                                    }
                                }),
                            ]
                        }),
                    });
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        enableScrolling: false,
                        content: [
                            this.itemTable,
                        ],
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    showColon: true,
                                    text: ibas.i18n.prop("bo_materialinventoryitem_remarks")
                                }),
                                this.remarksInput = new sap.m.Input("", {
                                    width: "20rem",
                                    value: ibas.i18n.prop("materials_inventory_transfer_remarks", ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmm")),
                                }),
                                new sap.m.ToolbarSeparator(),
                                this.checkBlocked = new sap.m.CheckBox("", {
                                    selected: true,
                                    text: ibas.i18n.prop("materials_reservation_blocked"),
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    icon: "sap-icon://journey-change",
                                    text: ibas.i18n.prop("materials_transfer_to"),
                                    press(): void {
                                        that.fireViewEvents(that.transferToEvent, that.remarksInput.getValue(), that.checkBlocked.getSelected());
                                    }
                                })
                            ]
                        }),
                    });
                }
                private itemTable: sap.extension.table.Table;
                private remarksInput: sap.m.Input;
                private checkBlocked: sap.m.CheckBox;
                private warehouseInput: sap.extension.m.Input;

                showItems(datas: app.MaterialInventoryItem[]): void {
                    this.itemTable.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
