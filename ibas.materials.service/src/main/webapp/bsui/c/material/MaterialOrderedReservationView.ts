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
                                header: ibas.i18n.prop("bo_materialorderedreservation_deliverydate"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_closedquantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_quantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialorderedreservation_remarks"),
                                width: "100%",
                            }),
                            new sap.extension.m.Column("", {
                                width: "4rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                                header: new sap.m.MenuButton("", {
                                    icon: "sap-icon://sys-add",
                                    type: sap.m.ButtonType.Transparent,
                                    menuPosition: sap.ui.core.Popup.Dock.EndBottom,
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
                                        path: "quantity",
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
                                ],
                                highlight: {
                                    path: "isDirty",
                                    formatter(data: boolean): sap.ui.core.ValueState {
                                        if (data === true) {
                                            return sap.ui.core.ValueState.Warning;
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
                        horizontalScrolling: true,
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
                                                                        if (eItem instanceof sap.m.ListBase) {
                                                                            for (let item of eItem.getItems()) {
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
                                                                        path: "sourceType",
                                                                        type: new sap.extension.data.Alphanumeric(),
                                                                    },
                                                                    {
                                                                        path: "sourceEntry",
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
                                                                    state: sap.ui.core.ValueState.Information,
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
                                                                        showValueLink: false,
                                                                    }),
                                                                ],
                                                                highlight: {
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
                                                                },
                                                                type: sap.m.ListType.Active
                                                            })
                                                        },
                                                        selectionChange(this: sap.extension.m.List, event: sap.ui.base.Event): void {
                                                            let selected: boolean = event.getParameter("selected");
                                                            if (selected === true) {
                                                                for (let vbox of that.leftPage.getContent()) {
                                                                    if (vbox !== this.getParent() && vbox instanceof sap.m.VBox) {
                                                                        let list: any = vbox.getItems()[1];
                                                                        if (list instanceof sap.m.List) {
                                                                            for (let item of list.getItems()) {
                                                                                item.setSelected(false);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                let data: any = this.getSelecteds().firstOrDefault();
                                                                that.fireViewEvents(that.changeWorkingItemEvent, data);
                                                            }
                                                        },
                                                    })
                                                ],
                                            }).addStyleClass("sapUiNoContentPadding")
                                        }
                                    }),
                                ],
                                detailPages: [
                                    new sap.m.Page("", {
                                        showHeader: false,
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

                private leftPage: sap.m.Page;
                private tableWorkResults: sap.extension.m.Table;
                private menuTargets: sap.m.Menu;

                showTargetDocuments(datas: ibas.IServiceAgent[]): void {
                    this.menuTargets.setModel(new sap.extension.model.JSONModel(datas));
                }
                showWorkingDatas(datas: app.OrderedReservationWorking[]): void {
                    this.leftPage.setModel(new sap.extension.model.JSONModel(datas));
                }
                showReservations(datas: bo.MaterialOrderedReservation[]): void {
                    this.tableWorkResults.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
