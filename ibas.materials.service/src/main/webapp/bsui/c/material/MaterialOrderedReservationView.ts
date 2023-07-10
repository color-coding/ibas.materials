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
            /** 视图-物料订购预留 */
            export class MaterialOrderedReservationView extends ibas.DialogView implements app.IMaterialOrderedReservationView {
                /** 切换工作数据 */
                changeWorkingItemEvent: Function;
                /** 添加目标单据 */
                addTargetDocumentEvent: Function;
                /** 移除目标单据 */
                removeTargetDocumentEvent: Function;
                /** 保存预留库存 */
                saveReservationEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableWorkItems = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        growing: false,
                        items: {
                            path: "/",
                            template: new sap.m.ObjectListItem("", {
                                title: {
                                    path: "itemDescription",
                                    type: new sap.extension.data.Alphanumeric()
                                },
                                number: {
                                    parts: [
                                        {
                                            path: "quantity",
                                            type: new sap.extension.data.Numeric()
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
                                                type: new sap.extension.data.Numeric()
                                            }, {
                                                path: "inventoryUOM",
                                                type: new sap.extension.data.Alphanumeric()
                                            }
                                        ]
                                    },
                                    state: {
                                        path: "remaining",
                                        type: new sap.extension.data.Numeric(),
                                        formatter(data: number): sap.ui.core.ValueState {
                                            if (data < 0) {
                                                return sap.ui.core.ValueState.Error;
                                            } else if (data > 0) {
                                                return sap.ui.core.ValueState.Warning;
                                            }
                                            return sap.ui.core.ValueState.Success;
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialorderedreservation_itemcode"),
                                        bindingValue: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric()
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialorderedreservation_itemversion"),
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
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialorderedreservation_deliverydate"),
                                        bindingValue: {
                                            path: "deliveryDate",
                                            type: new sap.extension.data.Date()
                                        },
                                        visible: {
                                            path: "deliveryDate",
                                            formatter(data: any): boolean {
                                                return data instanceof Date ? true : false;
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
                                    }),
                                ],
                                type: sap.m.ListType.Active
                            })
                        },
                        selectionChange(event: sap.ui.base.Event): void {
                            let selected: boolean = event.getParameter("selected");
                            if (selected === true) {
                                let data: any = that.tableWorkItems.getSelecteds().firstOrDefault();
                                that.fireViewEvents(that.changeWorkingItemEvent, data);
                            }
                        },
                    });
                    this.tableWorkResults = new sap.extension.m.Table("", {
                        width: "auto",
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_material"]),
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_targetdocument"),
                                width: "20rem",
                            }),
                            /*
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_status"),
                                width: "8rem",
                            }),
                            */
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_quantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_deliverydate"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_closedquantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_remarks"),
                                width: "100%",
                            }),
                            new sap.extension.m.Column("", {
                                width: "4rem",
                            }),
                        ],
                        items: {
                            path: "/",
                            templateShareable: true,
                            template: new sap.m.ColumnListItem("", {
                                type: sap.m.ListType.Inactive,
                                cells: [
                                    new sap.extension.m.DataLink("", {
                                        press(this: sap.f.cards.Header): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.MaterialOrderedReservation && data.targetDocumentEntry > 0) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: data.targetDocumentType,
                                                    linkValue: data.targetDocumentEntry.toString()
                                                });
                                            }
                                        }
                                    }).bindProperty("bindingValue", {
                                        parts: [
                                            {
                                                path: "targetDocumentType",
                                                type: new sap.extension.data.Alphanumeric({
                                                    maxLength: 30
                                                }),
                                            },
                                            {
                                                path: "targetDocumentEntry",
                                                type: new sap.extension.data.Numeric(),
                                            },
                                            {
                                                path: "targetDocumentLineId",
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
                                    /*
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "status",
                                        type: new sap.extension.data.Enum({
                                            enumType: ibas.emBOStatus,
                                            describe: true,
                                        }),
                                    }),
                                    */
                                    new sap.extension.m.Input("", {
                                    }).bindProperty("bindingValue", {
                                        path: "quantity",
                                        type: new sap.extension.data.Quantity(),
                                    }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "deliveryDate",
                                        type: new sap.extension.data.Date(),
                                    }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "closedQuantity",
                                        type: new sap.extension.data.Quantity(),
                                    }),
                                    new sap.extension.m.Input("", {
                                    }).bindProperty("bindingValue", {
                                        path: "remarks",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                    new sap.m.Button("", {
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://sys-cancel",
                                        press: function (): void {
                                            that.fireViewEvents(that.removeTargetDocumentEvent, this.getBindingContext().getObject());
                                        }
                                    }),
                                ]
                            }),
                        }
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        contentHeight: "80%",
                        contentWidth: "80%",
                        content: [
                            new sap.m.SplitContainer("", {
                                masterPages: [
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            design: sap.m.ToolbarDesign.Solid,
                                            style: sap.m.ToolbarStyle.Standard,
                                            content: [
                                                new sap.m.Title("", {
                                                    titleStyle: sap.ui.core.TitleLevel.H4,
                                                    text: {
                                                        parts: [
                                                            {
                                                                path: "/sourceType",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                            },
                                                            {
                                                                path: "/sourceEntry",
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
                                            this.tableWorkItems
                                        ]
                                    }),
                                ],
                                detailPages: [
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            design: sap.m.ToolbarDesign.Solid,
                                            style: sap.m.ToolbarStyle.Standard,
                                            content: [
                                                new sap.m.ToolbarSpacer(),
                                                new sap.m.MenuButton("", {
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: "sap-icon://add",
                                                    text: ibas.i18n.prop("shell_data_add"),
                                                    menu: this.menuTargets = new sap.m.Menu("", {
                                                        items: {
                                                            path: "/",
                                                            template: new sap.m.MenuItem("", {
                                                                text: {
                                                                    path: "description",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                                press: function (this: sap.m.MenuItem): void {
                                                                    that.fireViewEvents(that.addTargetDocumentEvent, this.getBindingContext().getObject());
                                                                }
                                                            })
                                                        }
                                                    })
                                                }),
                                            ],
                                        }),
                                        content: [
                                            this.tableWorkResults,
                                        ],
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

                private tableWorkItems: sap.extension.m.List;
                private tableWorkResults: sap.extension.m.Table;
                private menuTargets: sap.m.Menu;

                showTargetDocuments(datas: ibas.IServiceAgent[]): void {
                    this.menuTargets.setModel(new sap.extension.model.JSONModel(datas));
                }
                showWorkingData(data: app.OrderedReservationWorking): void {
                    this.tableWorkItems.getParent().getParent().setModel(new sap.extension.model.JSONModel(data));
                    this.tableWorkItems.setModel(new sap.extension.model.JSONModel(data.items));
                }
                showReservations(datas: bo.MaterialOrderedReservation[]): void {
                    this.tableWorkResults.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
