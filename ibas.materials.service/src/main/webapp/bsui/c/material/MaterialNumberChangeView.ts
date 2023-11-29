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
            /** 视图-料批次序列号变更 */
            export class MaterialNumberChangeView extends ibas.View implements app.IMaterialNumberChangeView {
                /** 添加物料批次事件 */
                addMaterialBatchEvent: Function;
                /** 添加物料序列事件 */
                addMaterialSerialEvent: Function;
                /** 编辑批次信息 */
                editMaterialBatchEvent: Function;
                /** 编辑序列信息 */
                editMaterialSerialEvent: Function;
                /** 移除项目事件 */
                removeItemEvent: Function;
                /** 重置事件 */
                resetEvent: Function;
                /** 改变事件 */
                changeToEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.itemTable = new sap.extension.m.Table("", {
                        autoPopinMode: true,
                        chooseType: ibas.emChooseType.MULTIPLE,
                        columns: [
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_code"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "10%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_name"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "15%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_number_source"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "15%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_warehouse_source"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "10%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_quantity"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "10%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_number_target"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "20%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_warehouse_target"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "10%",
                            }),
                            new sap.m.Column("", {
                                header: new sap.m.Text("", {
                                    text: ibas.i18n.prop("bo_materialnumberitem_reserved_transfer_quantity"),
                                }),
                                hAlign: sap.ui.core.TextAlign.Center,
                                width: "10%",
                            }),
                        ],
                        items: {
                            path: "/",
                            templateShareable: false,
                            template: new sap.m.ColumnListItem("", {
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "material/code",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        active: true,
                                        press(this: sap.extension.m.ObjectAttribute): void {
                                            ibas.servicesManager.runLinkService({
                                                boCode: materials.bo.Material.BUSINESS_OBJECT_CODE,
                                                linkValue: this.getBindingValue(),
                                            });
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "material/name",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "sourceNumber",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        active: true,
                                        press(this: sap.extension.m.ObjectIdentifier): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof app.MaterialNumberItem) {
                                                if (data.source instanceof bo.MaterialBatch) {
                                                    that.fireViewEvents(that.editMaterialBatchEvent, data.source);
                                                } else if (data.source instanceof bo.MaterialSerial) {
                                                    that.fireViewEvents(that.editMaterialSerialEvent, data.source);
                                                }
                                            }
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        showValueLink: true,
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Warehouse,
                                            key: bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: bo.Warehouse.PROPERTY_NAME_NAME,
                                        },
                                        bindingValue: {
                                            path: "sourceWarehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.Input("", {
                                        textAlign: sap.ui.core.TextAlign.End,
                                        bindingValue: {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity(),
                                        },
                                    }),
                                    new sap.extension.m.Input("", {
                                        showValueLink: true,
                                        valueLinkRequest(this: sap.extension.m.Input): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof app.MaterialNumberItem) {
                                                if (data.target instanceof bo.MaterialBatch) {
                                                    that.fireViewEvents(that.editMaterialBatchEvent, data.target);
                                                } else if (data.target instanceof bo.MaterialSerial) {
                                                    that.fireViewEvents(that.editMaterialSerialEvent, data.target);
                                                }
                                            }
                                        },
                                        textAlign: sap.ui.core.TextAlign.End,
                                        bindingValue: {
                                            path: "targetNumber",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                    new sap.extension.m.SelectionInput("", {
                                        textAlign: sap.ui.core.TextAlign.End,
                                        showValueLink: true,
                                        showValueHelp: true,
                                        chooseType: ibas.emChooseType.MULTIPLE,
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Warehouse,
                                            key: bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: bo.Warehouse.PROPERTY_NAME_NAME
                                        },
                                        criteria: [
                                            new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                        ],
                                        bindingValue: {
                                            path: "targetWarehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        active: true,
                                        press(): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof app.MaterialNumberItem) {
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
                                                                    header: ibas.i18n.prop("bo_materialnumberitem_transferquantity"),
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
                                                                                                if (data instanceof app.MaterialNumberReservation) {
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
                                                                                                if (data instanceof app.MaterialNumberReservation) {
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
                                        },
                                        bindingValue: {
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
                                        }
                                    }),
                                ],
                                highlight: {
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
                                },
                            })
                        },
                    });
                    return this.navContainer = new sap.m.NavContainer("", {
                        autoFocus: false,
                        defaultTransitionName: "baseSlide",
                        pages: [
                            new sap.extension.m.Page("", {
                                showHeader: false,
                                enableScrolling: true,
                                content: [
                                    new sap.m.Toolbar("", {
                                        design: sap.m.ToolbarDesign.Transparent,
                                        style: sap.m.ToolbarStyle.Standard,
                                        content: [
                                            new sap.extension.m.MenuButton("", {
                                                autoHide: true,
                                                icon: "sap-icon://tags",
                                                text: ibas.i18n.prop("shell_data_add"),
                                                menu: new sap.m.Menu("", {
                                                    items: [
                                                        new sap.m.MenuItem("", {
                                                            text: ibas.i18n.prop("materials_material_batch"),
                                                            press: function (): void {
                                                                that.fireViewEvents(that.addMaterialBatchEvent);
                                                            },
                                                        }),
                                                        new sap.m.MenuItem("", {
                                                            text: ibas.i18n.prop("materials_material_serial"),
                                                            press: function (): void {
                                                                that.fireViewEvents(that.addMaterialSerialEvent);
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
                                                    that.fireViewEvents(that.addMaterialSerialEvent, that.itemTable.getSelecteds());
                                                }
                                            }),
                                            new sap.m.ToolbarSpacer(),
                                            new sap.m.Button("", {
                                                icon: "sap-icon://reset",
                                                text: ibas.i18n.prop("materials_reset"),
                                                press(): void {
                                                    that.fireViewEvents(that.resetEvent);
                                                }
                                            }),
                                        ]
                                    }),
                                    this.itemTable,
                                ],
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialnumberitem_remarks")
                                        }),
                                        this.remarksInput = new sap.m.Input("", {
                                            width: "20rem",
                                            value: ibas.i18n.prop("materials_number_change_remarks", ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmm")),
                                        }),
                                        new sap.m.ToolbarSpacer(),
                                        new sap.m.Button("", {
                                            icon: "sap-icon://journey-change",
                                            text: ibas.i18n.prop("materials_change_to"),
                                            press(): void {
                                                that.fireViewEvents(that.changeToEvent, that.remarksInput.getValue());
                                            }
                                        })
                                    ]
                                }),
                            }),
                        ]
                    });
                }
                private navContainer: sap.m.NavContainer;
                private itemTable: sap.extension.m.Table;
                private remarksInput: sap.m.Input;

                showItems(datas: app.MaterialNumberItem[]): void {
                    this.navContainer.to(this.itemTable.getParent().getId());
                    this.itemTable.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
