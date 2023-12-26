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
            /** 视图-物料库存预留 */
            export class MaterialInventoryReservationView extends ibas.DialogView implements app.IMaterialInventoryReservationView {
                /** 切换工作数据 */
                changeWorkingItemEvent: Function;
                /** 预留库存 */
                reserveInventoryEvent: Function;
                /** 预留订购 */
                reserveOrderedEvent: Function;
                /** 释放预留库存 */
                releaseReservationEvent: Function;
                /** 保存预留库存 */
                saveReservationEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableInventories = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.NONE,
                        mode: sap.m.ListMode.None,
                        growing: true,
                        growingThreshold: 30,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_material"]),
                        items: {
                            path: "/",
                            template: new sap.extension.m.CustomListItem("", {
                                content: [
                                    new sap.m.Toolbar("", {
                                        design: sap.m.ToolbarDesign.Transparent,
                                        style: sap.m.ToolbarStyle.Clear,
                                        content: [
                                            new sap.extension.m.RepositoryText("", {
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
                                            new sap.m.Text("", {
                                                text: " × ",
                                                width: "2rem",
                                                textAlign: sap.ui.core.TextAlign.Center,
                                            }),
                                            new sap.m.Text("", {
                                            }).bindProperty("text", {
                                                parts: [
                                                    {
                                                        path: "onHand",
                                                        type: new sap.extension.data.Quantity(),
                                                    }, {
                                                        path: "onReserved",
                                                        type: new sap.extension.data.Quantity(),
                                                    }
                                                ],
                                                formatter(onHand: number, onReserved: number): number {
                                                    return sap.extension.data.formatValue(sap.extension.data.Quantity, onHand - onReserved, "string");
                                                }
                                            }),
                                            new sap.m.ToolbarSpacer(""),
                                            new sap.m.ToolbarSeparator(""),
                                            new sap.m.Button("", {
                                                icon: "sap-icon://complete",
                                                type: sap.m.ButtonType.Transparent,
                                                tooltip: ibas.i18n.prop("shell_using"),
                                                press(this: sap.m.Button, event: sap.ui.base.Event): void {
                                                    that.fireViewEvents(that.reserveInventoryEvent, this.getBindingContext().getObject(), that.checkRestricted.getSelected());
                                                },
                                            })
                                        ]
                                    })
                                ],
                                type: sap.m.ListType.Inactive,
                            })
                        },
                    });
                    this.tableBatchInventories = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.NONE,
                        mode: sap.m.ListMode.None,
                        growing: true,
                        growingThreshold: 30,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_material"]),
                        items: {
                            path: "/",
                            template: new sap.extension.m.CustomListItem("", {
                                content: [
                                    new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.extension.m.RepositoryText("", {
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
                                                new sap.m.Text("", {
                                                }).bindProperty("text", {
                                                    path: "batchCode",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 36
                                                    })
                                                }),
                                                new sap.m.Label("", {
                                                    text: " × ",
                                                    width: "2rem",
                                                    textAlign: sap.ui.core.TextAlign.Center,
                                                }),
                                                new sap.m.Text("", {
                                                }).bindProperty("text", {
                                                    parts: [
                                                        {
                                                            path: "quantity",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "reservedQuantity",
                                                            type: new sap.extension.data.Quantity(),
                                                        }
                                                    ],
                                                    formatter(onHand: number, onReserved: number): number {
                                                        return sap.extension.data.formatValue(sap.extension.data.Quantity, onHand - onReserved, "string");
                                                    }
                                                }),
                                                new sap.m.ToolbarSpacer(""),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.Button("", {
                                                    icon: "sap-icon://complete",
                                                    tooltip: ibas.i18n.prop("shell_using"),
                                                    press(this: sap.m.Button, event: sap.ui.base.Event): void {
                                                        that.fireViewEvents(that.reserveInventoryEvent, this.getBindingContext().getObject());
                                                    },
                                                })
                                            ]
                                        }),
                                        content: [
                                            new sap.m.HBox("", {
                                                renderType: sap.m.FlexRendertype.Bare,
                                                alignItems: sap.m.FlexAlignItems.Stretch,
                                                alignContent: sap.m.FlexAlignContent.Stretch,
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                items: [
                                                    new sap.m.VBox("", {
                                                        width: "30%",
                                                        items: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                                                bindingValue: {
                                                                    path: "supplierSerial",

                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_notes"),
                                                                bindingValue: {
                                                                    path: "notes",

                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.m.VBox("", {
                                                        width: "30%",
                                                        items: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                                                bindingValue: {
                                                                    path: "manufacturingDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_admissiondate"),
                                                                bindingValue: {
                                                                    path: "admissionDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                                                bindingValue: {
                                                                    path: "expirationDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.m.VBox("", {
                                                        width: "30%",
                                                        items: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_version"),
                                                                bindingValue: {
                                                                    path: "version",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_specification"),
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.MaterialSpecification,
                                                                    key: bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                                                    text: bo.MaterialSpecification.PROPERTY_NAME_NAME
                                                                },
                                                                bindingValue: {
                                                                    path: "specification",
                                                                    type: new sap.extension.data.Numeric()
                                                                },
                                                                active: true,
                                                                press(this: sap.m.ObjectAttribute): void {
                                                                    let data: bo.MaterialBatch = this.getBindingContext().getObject();
                                                                    if (data instanceof bo.MaterialBatch && data.specification > 0) {
                                                                        ibas.servicesManager.runLinkService({
                                                                            boCode: materials.bo.MaterialSpecification.BUSINESS_OBJECT_CODE,
                                                                            linkValue: data.specification.toString()
                                                                        });
                                                                    }
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                ]
                                            }).addStyleClass("sapUiSmallMarginBegin"),
                                        ]
                                    })
                                ],
                                type: sap.m.ListType.Inactive,
                            })
                        },
                    });
                    this.tableSerialInventories = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.NONE,
                        mode: sap.m.ListMode.None,
                        growing: true,
                        growingThreshold: 30,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_material"]),
                        items: {
                            path: "/",
                            template: new sap.extension.m.CustomListItem("", {
                                content: [
                                    new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.extension.m.RepositoryText("", {
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
                                                new sap.m.Text("", {
                                                }).bindProperty("text", {
                                                    path: "serialCode",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 36
                                                    })
                                                }),
                                                new sap.m.Text("", {
                                                    text: " × ",
                                                    width: "2rem",
                                                    textAlign: sap.ui.core.TextAlign.Center,
                                                }),
                                                new sap.m.Text("", {
                                                }).bindProperty("text", {
                                                    parts: [
                                                        {
                                                            path: "inStock",
                                                        },
                                                        {
                                                            path: "reserved",
                                                        }
                                                    ],
                                                    formatter(inStock: ibas.emYesNo, reserved: ibas.emYesNo): number {
                                                        return sap.extension.data.formatValue(sap.extension.data.Quantity,
                                                            (inStock === ibas.emYesNo.YES && reserved !== ibas.emYesNo.YES) ? 1 : 0
                                                            , "string");
                                                    }
                                                }),
                                                new sap.m.ToolbarSpacer(""),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.Button("", {
                                                    icon: "sap-icon://complete",
                                                    tooltip: ibas.i18n.prop("shell_using"),
                                                    press(this: sap.m.Button, event: sap.ui.base.Event): void {
                                                        that.fireViewEvents(that.reserveInventoryEvent, this.getBindingContext().getObject());
                                                    },
                                                })
                                            ]
                                        }),
                                        content: [
                                            new sap.m.HBox("", {
                                                renderType: sap.m.FlexRendertype.Bare,
                                                alignItems: sap.m.FlexAlignItems.Stretch,
                                                alignContent: sap.m.FlexAlignContent.Stretch,
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                items: [
                                                    new sap.m.VBox("", {
                                                        width: "30%",
                                                        items: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                                                bindingValue: {
                                                                    path: "supplierSerial",

                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_batchserial"),
                                                                bindingValue: {
                                                                    path: "batchSerial",

                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_notes"),
                                                                bindingValue: {
                                                                    path: "notes",

                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.m.VBox("", {
                                                        width: "30%",
                                                        items: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                                                bindingValue: {
                                                                    path: "manufacturingDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_admissiondate"),
                                                                bindingValue: {
                                                                    path: "admissionDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                                                bindingValue: {
                                                                    path: "expirationDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.m.VBox("", {
                                                        width: "30%",
                                                        items: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_warrantystartdate"),
                                                                bindingValue: {
                                                                    path: "warrantyStartDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_warrantyenddate"),
                                                                bindingValue: {
                                                                    path: "warrantyEndDate",

                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_version"),
                                                                bindingValue: {
                                                                    path: "version",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                ]
                                            }).addStyleClass("sapUiSmallMarginBegin"),
                                        ]
                                    }),
                                ],
                                type: sap.m.ListType.Inactive,
                            })
                        },
                    });
                    this.tableWorkResults = new sap.extension.m.Table("", {
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.strings.format("{0} / {1}",
                                    ibas.i18n.prop("bo_warehouse"),
                                    ibas.i18n.prop("bo_materialorderedreservation_sourcedocument")
                                ),
                                width: "50%",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.strings.format("{0} / {1}",
                                    ibas.i18n.prop("bo_materialinventoryreservation_batchcode"),
                                    ibas.i18n.prop("bo_materialinventoryreservation_serialcode")
                                ),
                                width: "12rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialinventoryreservation_deliverydate"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialinventoryreservation_closedquantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialinventoryreservation_quantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialinventoryreservation_remarks"),
                                width: "40%",
                            }),
                            new sap.extension.m.Column("", {
                                width: "4rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                                header: new sap.m.MenuButton("", {
                                    icon: "sap-icon://sys-add",
                                    type: sap.m.ButtonType.Transparent,
                                    menuPosition: sap.ui.core.Popup.Dock.EndBottom,
                                    menu: this.menuSources = new sap.m.Menu("", {
                                        items: {
                                            path: "/",
                                            template: new sap.m.MenuItem("", {
                                                text: {
                                                    path: "description",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                press: function (this: sap.m.MenuItem): void {
                                                    that.fireViewEvents(that.reserveOrderedEvent, this.getBindingContext().getObject());
                                                }
                                            })
                                        }
                                    }),
                                    tooltip: ibas.i18n.prop("materials_ordered_materials_reservation"),
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
                                        path: "source",
                                        type: new sap.extension.data.Alphanumeric(),
                                        formatter(this: sap.m.Text, data: string): string {
                                            if (ibas.strings.isWith(data, "DOC:", undefined)) {
                                                let values: string[] = data.substring(4).split("-");
                                                if (values.length > 0) {
                                                    let objectCode: string = values[0];
                                                    let docEntry: string = values[1];
                                                    let lineId: string = values[2];
                                                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                    builder.append(ibas.i18n.prop("bo_" + ibas.businessobjects.name(objectCode).toLowerCase()));
                                                    if (!ibas.strings.isEmpty(docEntry)) {
                                                        builder.append("-");
                                                        builder.append(docEntry);
                                                    }
                                                    if (!ibas.strings.isEmpty(lineId)) {
                                                        builder.append("-");
                                                        builder.append(lineId);
                                                    }
                                                    return builder.toString();
                                                }
                                            } else if (ibas.strings.isWith(data, "WHS:", undefined)) {
                                                let code: string = data.substring(4);
                                                let criteria: ibas.Criteria = new ibas.Criteria();
                                                let condition: ibas.ICondition = criteria.conditions.create();
                                                condition.alias = bo.Warehouse.PROPERTY_CODE_NAME;
                                                condition.value = code;
                                                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                                                boRepository.fetchWarehouse({
                                                    criteria: criteria,
                                                    onCompleted: (opRslt) => {
                                                        for (let item of opRslt.resultObjects) {
                                                            this.setText(item.name);
                                                        }
                                                    }
                                                });
                                            }
                                            return data;
                                        }
                                    }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        parts: [
                                            {
                                                path: "batchCode",
                                                type: new sap.extension.data.Alphanumeric(),
                                            }, {
                                                path: "serialCode",
                                                type: new sap.extension.data.Alphanumeric(),
                                            }
                                        ]
                                    }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        parts: [
                                            {
                                                path: "source",
                                            },
                                            {
                                                path: "deliveryDate",
                                            },
                                        ],
                                        formatter(source: string, deliveryDate: any): string {
                                            if (ibas.strings.isWith(source, "WHS:", undefined)) {
                                                return ibas.i18n.prop("materials_spot");
                                            }
                                            if (deliveryDate instanceof Date) {
                                                return sap.extension.data.formatValue(sap.extension.data.Date, deliveryDate, "string");
                                            }
                                            return "";
                                        }
                                    }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "closedQuantity",
                                        type: new sap.extension.data.Quantity(),
                                    }),
                                    new sap.extension.m.Input("", {
                                        editable: {
                                            parts: [
                                                {
                                                    path: "isSavable",
                                                },
                                                {
                                                    path: "serialCode",
                                                },
                                            ],
                                            formatter(isSavable: boolean, serialCode: string): boolean {
                                                if (isSavable === false) {
                                                    return false;
                                                }
                                                return ibas.strings.isEmpty(serialCode) ? true : false;
                                            }
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "quantity",
                                        type: new sap.extension.data.Quantity(),
                                    }),
                                    new sap.extension.m.Input("", {
                                        editable: {
                                            path: "isSavable",
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "remarks",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                    new sap.m.Button("", {
                                        enabled: {
                                            parts: [
                                                {
                                                    path: "isSavable",
                                                },
                                                {
                                                    path: "closedQuantity",
                                                }
                                            ],
                                            formatter(isSavable: any, quantity: any): boolean {
                                                if (isSavable === false) {
                                                    return false;
                                                }
                                                if (quantity > 0) {
                                                    return false;
                                                }
                                                return true;
                                            }
                                        },
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://sys-cancel",
                                        press: function (): void {
                                            that.fireViewEvents(that.releaseReservationEvent, this.getBindingContext().getObject());
                                        }
                                    }),
                                ],
                                highlight: {
                                    path: "status",
                                    formatter(data: ibas.emBOStatus): sap.ui.core.ValueState {
                                        if (data === ibas.emBOStatus.CLOSED) {
                                            return sap.ui.core.ValueState.Error;
                                        }
                                        return sap.ui.core.ValueState.Information;
                                    }
                                },
                            }),
                        }
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        contentHeight: "80%",
                        contentWidth: "80%",
                        content: [
                            new sap.m.SplitContainer("", {
                                masterPages: [
                                    this.leftPage = new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            design: sap.m.ToolbarDesign.Solid,
                                            style: sap.m.ToolbarStyle.Standard,
                                            content: [
                                                new sap.m.ToolbarSpacer(),
                                                new sap.m.Button("", {
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: "sap-icon://navigation-down-arrow",
                                                    press: function (this: sap.m.Button): void {
                                                        if (this.getIcon() === "sap-icon://navigation-right-arrow") {
                                                            for (let pItem of that.leftPage.getContent()) {
                                                                if (pItem instanceof sap.m.Panel) {
                                                                    pItem.setExpanded(true);
                                                                }
                                                            }
                                                            this.setIcon("sap-icon://navigation-down-arrow");
                                                        } else {
                                                            for (let pItem of that.leftPage.getContent()) {
                                                                if (pItem instanceof sap.m.Panel) {
                                                                    pItem.setExpanded(false);
                                                                }
                                                            }
                                                            this.setIcon("sap-icon://navigation-right-arrow");
                                                        }
                                                    }
                                                }),
                                                new sap.m.SearchField("", {
                                                    search(event: sap.ui.base.Event): void {
                                                        let source: any = event.getSource();
                                                        if (source instanceof sap.m.SearchField) {
                                                            let search: string = source.getValue();
                                                            if (search) {
                                                                search = search.trim().toLowerCase();
                                                            }
                                                            let done: boolean;
                                                            let content: string;
                                                            for (let pItem of that.leftPage.getContent()) {
                                                                if (pItem instanceof sap.m.Panel) {
                                                                    for (let eItem of pItem.getContent()) {
                                                                        if (eItem instanceof sap.m.VBox) {
                                                                            for (let vItem of eItem.getItems()) {
                                                                                if (vItem instanceof sap.m.ListBase) {
                                                                                    for (let item of vItem.getItems()) {
                                                                                        if (item instanceof sap.m.ObjectListItem) {
                                                                                            item.setVisible(true);
                                                                                            if (ibas.strings.isEmpty(search)) {
                                                                                                continue;
                                                                                            }
                                                                                            done = false;
                                                                                            content = item.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                continue;
                                                                                            }
                                                                                            content = item.getAttributes()[0].getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                continue;
                                                                                            }
                                                                                            item.setVisible(false);
                                                                                            if (!done) {
                                                                                                item.setVisible(false);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }

                                                                            }
                                                                        }
                                                                    }

                                                                }
                                                            }
                                                        }
                                                    }
                                                }),
                                            ],
                                        }),
                                        content: {
                                            path: "/",
                                            templateShareable: true,
                                            template: new sap.m.Panel("", {
                                                expandable: true,
                                                expanded: true,
                                                headerToolbar: new sap.m.Toolbar("", {
                                                    design: sap.m.ToolbarDesign.Transparent,
                                                    content: [
                                                        new sap.m.Title("", {
                                                            titleStyle: sap.ui.core.TitleLevel.H4,
                                                            text: {
                                                                parts: [
                                                                    {
                                                                        path: "targetType",
                                                                        type: new sap.extension.data.Alphanumeric(),
                                                                    },
                                                                    {
                                                                        path: "targetEntry",
                                                                        type: new sap.extension.data.Numeric(),
                                                                    },
                                                                ],
                                                                formatter(type: string, entry: number): string {
                                                                    return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry));
                                                                }
                                                            }
                                                        }),
                                                    ],
                                                }),
                                                content: [
                                                    new sap.m.VBox("", {
                                                        items: [
                                                            new sap.m.Toolbar("", {
                                                                design: sap.m.ToolbarDesign.Transparent,
                                                                content: [
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_materialinventoryreservation_businesspartner"),
                                                                        bindingValue: {
                                                                            path: "businessPartner",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        }
                                                                    }),
                                                                ],
                                                                visible: {
                                                                    path: "businessPartner",
                                                                    formatter(data: any): boolean {
                                                                        return ibas.strings.isEmpty(data) ? false : true;
                                                                    }
                                                                }
                                                            }),
                                                            new sap.extension.m.List("", {
                                                                chooseType: ibas.emChooseType.SINGLE,
                                                                mode: sap.m.ListMode.SingleSelectMaster,
                                                                growing: false,
                                                                items: {
                                                                    path: "items",
                                                                    templateShareable: true,
                                                                    template: new sap.m.ObjectListItem("", {
                                                                        title: {
                                                                            path: "itemDescription",
                                                                            type: new sap.extension.data.Alphanumeric()
                                                                        },
                                                                        number: {
                                                                            parts: [
                                                                                {
                                                                                    path: "quantity",
                                                                                    type: new sap.extension.data.Quantity()
                                                                                }, {
                                                                                    path: "uom",
                                                                                    type: new sap.extension.data.Alphanumeric()
                                                                                }
                                                                            ]
                                                                        },
                                                                        firstStatus: new sap.m.ObjectStatus("", {
                                                                            text: {
                                                                                parts: [
                                                                                    {
                                                                                        path: "remaining",
                                                                                        type: new sap.extension.data.Quantity()
                                                                                    }, {
                                                                                        path: "inventoryUOM",
                                                                                        type: new sap.extension.data.Alphanumeric()
                                                                                    }
                                                                                ]
                                                                            },
                                                                            state: sap.ui.core.ValueState.Information
                                                                        }),
                                                                        attributes: [
                                                                            new sap.extension.m.ObjectAttribute("", {
                                                                                title: ibas.i18n.prop("bo_materialinventoryreservation_itemcode"),
                                                                                bindingValue: {
                                                                                    path: "itemCode",
                                                                                    type: new sap.extension.data.Alphanumeric()
                                                                                }
                                                                            }),
                                                                            new sap.extension.m.ObjectAttribute("", {
                                                                                title: ibas.i18n.prop("bo_materialinventoryreservation_itemversion"),
                                                                                bindingValue: {
                                                                                    path: "itemVersion",
                                                                                    type: new sap.extension.data.Alphanumeric()
                                                                                },
                                                                                visible: {
                                                                                    path: "itemVersion",
                                                                                    formatter(data: string): boolean {
                                                                                        return ibas.strings.isEmpty(data) ? false : true;
                                                                                    }
                                                                                }
                                                                            }),
                                                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                                                title: ibas.i18n.prop("bo_warehouse"),
                                                                                bindingValue: {
                                                                                    path: "warehouse",
                                                                                    type: new sap.extension.data.Alphanumeric()
                                                                                },
                                                                                repository: bo.BORepositoryMaterials,
                                                                                dataInfo: {
                                                                                    type: bo.Warehouse,
                                                                                    key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                                    text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                                },
                                                                                showValueLink: false,
                                                                            }),
                                                                            new sap.extension.m.ObjectAttribute("", {
                                                                                title: ibas.i18n.prop("bo_material_mixingbatches"),
                                                                                bindingValue: {
                                                                                    path: "mixingBatches",
                                                                                    type: new sap.extension.data.YesNo()
                                                                                },
                                                                                visible: {
                                                                                    path: "mixingBatches",
                                                                                    formatter(data: ibas.emYesNo): boolean {
                                                                                        return data === ibas.emYesNo.NO ? true : false;
                                                                                    }
                                                                                }
                                                                            }),
                                                                        ],
                                                                        highlight: {
                                                                            path: "remaining",
                                                                            type: new sap.extension.data.Quantity(),
                                                                            formatter(data: number): sap.ui.core.ValueState {
                                                                                data = ibas.numbers.valueOf(data);
                                                                                if (data < 0) {
                                                                                    return sap.ui.core.ValueState.Error;
                                                                                } else if (data > 0) {
                                                                                    return sap.ui.core.ValueState.Warning;
                                                                                }
                                                                                return sap.ui.core.ValueState.Success;
                                                                            }
                                                                        },
                                                                        type: sap.m.ListType.Active
                                                                    })
                                                                },
                                                                selectionChange(this: sap.extension.m.List, event: sap.ui.base.Event): void {
                                                                    let selected: boolean = event.getParameter("selected");
                                                                    if (selected === true) {
                                                                        let data: any = this.getSelecteds().firstOrDefault();
                                                                        for (let vbox of that.leftPage.getContent()) {
                                                                            if (vbox !== this.getParent() && vbox instanceof sap.m.VBox) {
                                                                                let list: any = vbox.getItems()[2];
                                                                                if (list instanceof sap.m.List) {
                                                                                    for (let item of list.getItems()) {
                                                                                        item.setSelected(false);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        that.fireViewEvents(that.changeWorkingItemEvent, data, that.checkRestricted.getSelected());
                                                                        if (data instanceof app.ReservationWorkingItem) {
                                                                            if (data.batchManagement === ibas.emYesNo.YES) {
                                                                                if (that.container.getCurrentPage() !== that.tableBatchInventories.getParent()) {
                                                                                    that.container.to(<any>that.tableBatchInventories.getParent());
                                                                                }
                                                                            } else if (data.serialManagement === ibas.emYesNo.YES) {
                                                                                if (that.container.getCurrentPage() !== that.tableSerialInventories.getParent()) {
                                                                                    that.container.to(<any>that.tableSerialInventories.getParent());
                                                                                }
                                                                            } else {
                                                                                if (that.container.getCurrentPage() !== that.tableInventories.getParent()) {
                                                                                    that.container.to(<any>that.tableInventories.getParent());
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                            })
                                                        ]
                                                    }),
                                                ],
                                            }).addStyleClass("sapUiNoContentPadding")
                                        }
                                    }),
                                ],
                                detailPages: [
                                    new sap.ui.layout.Splitter("", {
                                        orientation: sap.ui.core.Orientation.Vertical,
                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                            size: "auto",
                                        }),
                                        contentAreas: [
                                            new component.Splitter("", {
                                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                    // resizable: true,
                                                    size: "60%",
                                                }),
                                                contentAreas: [
                                                    new sap.m.Page("", {
                                                        showHeader: false,
                                                        subHeader: new sap.m.Toolbar("", {
                                                            design: sap.m.ToolbarDesign.Solid,
                                                            style: sap.m.ToolbarStyle.Standard,
                                                            content: [
                                                                new sap.m.MenuButton("", {
                                                                    icon: "sap-icon://indent",
                                                                    type: sap.m.ButtonType.Transparent,
                                                                    menuPosition: sap.ui.core.Popup.Dock.BeginBottom,
                                                                    tooltip: ibas.strings.format("{0}/{1}", ibas.i18n.prop("shell_show"), ibas.i18n.prop("shell_hide")),
                                                                    menu: new sap.m.Menu("", {
                                                                        items: [
                                                                            new sap.m.MenuItem("", {
                                                                                icon: "sap-icon://navigation-down-arrow",
                                                                                text: ibas.i18n.prop(["shell_show", "materials_details"]),
                                                                                press: function (): void {
                                                                                    let page: any = that.container.getCurrentPage();
                                                                                    if (page instanceof sap.m.Page) {
                                                                                        for (let pItem of page.getContent()) {
                                                                                            if (pItem instanceof sap.m.List) {
                                                                                                pItem.setBusy(true);
                                                                                                for (let item of pItem.getItems()) {
                                                                                                    if (item instanceof sap.m.CustomListItem) {
                                                                                                        let panel: any = item.getContent()[0];
                                                                                                        if (panel instanceof sap.m.Panel) {
                                                                                                            panel.setExpanded(true);
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                pItem.setBusy(false);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }),
                                                                            new sap.m.MenuItem("", {
                                                                                icon: "sap-icon://navigation-right-arrow",
                                                                                text: ibas.i18n.prop(["shell_hide", "materials_details"]),
                                                                                press: function (): void {
                                                                                    let page: any = that.container.getCurrentPage();
                                                                                    if (page instanceof sap.m.Page) {
                                                                                        for (let pItem of page.getContent()) {
                                                                                            if (pItem instanceof sap.m.List) {
                                                                                                pItem.setBusy(true);
                                                                                                for (let item of pItem.getItems()) {
                                                                                                    if (item instanceof sap.m.CustomListItem) {
                                                                                                        let panel: any = item.getContent()[0];
                                                                                                        if (panel instanceof sap.m.Panel) {
                                                                                                            panel.setExpanded(false);
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                pItem.setBusy(false);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }),
                                                                        ],
                                                                    })
                                                                }),
                                                                new sap.m.ToolbarSeparator(""),
                                                                new sap.m.SearchField("", {
                                                                    search(event: sap.ui.base.Event): void {
                                                                        that.searchListItems((<any>that.container.getCurrentPage()).getContent()[0], event.getParameter("query"));
                                                                    }
                                                                }),
                                                                new sap.m.ToolbarSpacer(),
                                                                this.checkRestricted = new sap.m.CheckBox("", {
                                                                    selected: true,
                                                                    text: ibas.i18n.prop("materials_restricted_warehouse"),
                                                                }),
                                                            ]
                                                        }),
                                                        content: [
                                                            this.container = new sap.m.NavContainer("", {
                                                                height: "100%",
                                                                autoFocus: false,
                                                                defaultTransitionName: "flip",
                                                                pages: [
                                                                    new sap.m.Page("", {
                                                                        showHeader: false,
                                                                        content: [
                                                                            this.tableInventories,
                                                                        ]
                                                                    }),
                                                                    new sap.m.Page("", {
                                                                        showHeader: false,
                                                                        content: [
                                                                            this.tableBatchInventories,
                                                                        ]
                                                                    }),
                                                                    new sap.m.Page("", {
                                                                        showHeader: false,
                                                                        content: [
                                                                            this.tableSerialInventories,
                                                                        ]
                                                                    }),
                                                                ]
                                                            }),
                                                        ],
                                                    }),
                                                ]
                                            }),
                                            new component.Splitter("", {
                                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                    // resizable: true,
                                                }),
                                                contentAreas: [
                                                    new sap.m.Page("", {
                                                        showHeader: false,
                                                        content: [
                                                            this.tableWorkResults,
                                                        ],
                                                    }),
                                                ]
                                            }),
                                        ]
                                    }),
                                ],
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.saveReservationEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_close"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }

                private searchListItems(list: sap.m.List, search: string): void {
                    if (list instanceof sap.m.List) {
                        list.setBusy(true);
                        let content: string, done: boolean;
                        if (search) {
                            search = search.trim().toLowerCase();
                        }
                        for (let item of list.getItems()) {
                            if (item instanceof sap.m.CustomListItem) {
                                item.setVisible(true);
                                if (ibas.strings.isEmpty(search)) {
                                    continue;
                                }
                                let panel: any = item.getContent()[0];
                                if (!(panel instanceof sap.m.Panel)) {
                                    continue;
                                }
                                done = false;
                                for (let tItem of panel.getHeaderToolbar().getContent()) {
                                    if (tItem instanceof sap.m.Input) {
                                        content = tItem.getValue(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                            done = true;
                                            break;
                                        }
                                    }
                                    if (tItem instanceof sap.m.Title) {
                                        content = tItem.getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                            done = true;
                                            break;
                                        }
                                    }
                                    if (tItem instanceof sap.m.Text) {
                                        content = tItem.getText(true); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                            done = true;
                                            break;
                                        }
                                    }
                                }
                                if (done) {
                                    continue;
                                }
                                done = false;
                                for (let pItem of panel.getContent()) {
                                    if (pItem instanceof sap.ui.layout.form.SimpleForm) {
                                        for (let cItem of pItem.getContent()) {
                                            if (cItem instanceof sap.m.FlexBox) {
                                                for (let fItem of cItem.getItems()) {
                                                    if (fItem instanceof sap.m.ObjectAttribute) {
                                                        content = fItem.getText();
                                                        if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                            done = true;
                                                        }
                                                    }
                                                    if (done) {
                                                        break;
                                                    }
                                                }
                                            }
                                            if (done) {
                                                break;
                                            }
                                        }
                                    }
                                    if (done) {
                                        break;
                                    }
                                }
                                if (done) {
                                    continue;
                                }
                                item.setVisible(false);
                            }
                        }
                        list.setBusy(false);
                    }
                }
                private tableBatchInventories: sap.extension.m.List;
                private tableSerialInventories: sap.extension.m.List;
                private tableInventories: sap.extension.m.List;
                private tableWorkResults: sap.extension.m.Table;
                private checkRestricted: sap.m.CheckBox;
                private container: sap.m.NavContainer;
                private leftPage: sap.m.Page;
                private menuSources: sap.m.Menu;

                showWorkingDatas(datas: app.ReservationWorking[]): void {
                    this.leftPage.setModel(new sap.extension.model.JSONModel(datas));
                }
                showInventories(datas: bo.MaterialInventory[] | bo.MaterialBatch[] | bo.MaterialSerial[]): void {
                    this.container.getCurrentPage().setModel(new sap.extension.model.JSONModel(datas));
                }
                showReservations(datas: app.ReservationWorkingItemResult[]): void {
                    this.tableWorkResults.setModel(new sap.extension.model.JSONModel(datas));
                }
                showOrderedSourceDocuments(datas: ibas.IServiceAgent[]): void {
                    this.menuSources.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
