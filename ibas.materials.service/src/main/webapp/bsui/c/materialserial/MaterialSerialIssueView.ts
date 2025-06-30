/*
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            const DISPALY_MATERIAL_AVGPRICE: boolean = config.get(config.CONFIG_ITEM_DISPALY_MATERIAL_AVGPRICE_ISSUE, false);
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
                    this.tableWorkDatas = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        growing: true,
                        items: {
                            path: "/rows",
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
                                                path: "uom",
                                                type: new sap.extension.data.Alphanumeric()
                                            }
                                        ]
                                    },
                                    state: sap.ui.core.ValueState.Information,
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialserialitem_itemcode"),
                                        bindingValue: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric()
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialserialitem_itemversion"),
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
                        selectionChange(event: sap.ui.base.Event): void {
                            let selected: boolean = event.getParameter("selected");
                            if (selected === true) {
                                that.fireViewEvents(that.changeWorkingDataEvent, that.tableWorkDatas.getSelecteds().firstOrDefault());
                            }
                        },
                    });
                    this.tableItems = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.MULTIPLE,
                        mode: sap.m.ListMode.MultiSelect,
                        growing: true,
                        growingThreshold: 30,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_materialserial"]),
                        items: {
                            path: "/rows",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    this.itmPanelTemplate = new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Title("", {
                                                    width: "70%",
                                                }).bindProperty("text", {
                                                    path: "serialCode",
                                                    type: new sap.extension.data.Alphanumeric()
                                                }),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.extension.m.Input("", {
                                                    width: "30%",
                                                    textAlign: sap.ui.core.TextAlign.Left,
                                                    placeholder: ibas.i18n.prop("bo_materialserialitem_remarks"),
                                                }).bindProperty("bindingValue", {
                                                    path: "remarks",
                                                    type: new sap.extension.data.Alphanumeric()
                                                }),
                                                new sap.m.ToolbarSpacer(""),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.Button("", {
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: "sap-icon://sys-cancel",
                                                    press: function (this: sap.m.Button, event: sap.ui.base.Event): void {
                                                        that.fireViewEvents(that.removeMaterialSerialItemEvent, this.getBindingContext().getObject());
                                                    }
                                                }),
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
                                                                title: ibas.i18n.prop("bo_materialserial_batchserial"),
                                                                bindingValue: {
                                                                    path: "batchSerial",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_supplierserial"),
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
                                            }).addStyleClass("sapUiSmallMarginBegin")
                                        ]
                                    }),
                                ],
                                type: sap.m.ListType.Inactive
                            })
                        },
                    });
                    this.tableInventories = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.NONE,
                        mode: sap.m.ListMode.None,
                        growing: true,
                        growingThreshold: 30,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_material"]),
                        items: {
                            path: "/rows",
                            template: new sap.extension.m.CustomListItem("", {
                                content: [
                                    this.invPanelTemplate = new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Title("", {
                                                }).bindProperty("text", {
                                                    path: "serialCode",
                                                    type: new sap.extension.data.Alphanumeric()
                                                }),
                                                new sap.m.ToolbarSpacer(""),
                                                new sap.m.Label("", {
                                                    showColon: true,
                                                    text: ibas.i18n.prop("bo_materialinventory_avgprice"),
                                                    visible: DISPALY_MATERIAL_AVGPRICE,
                                                }),
                                                new sap.m.Text("", {
                                                    textAlign: sap.ui.core.TextAlign.Left,
                                                    visible: DISPALY_MATERIAL_AVGPRICE,
                                                }).bindProperty("text", {
                                                    path: "avgPrice",
                                                    type: new sap.extension.data.Price(),
                                                }).addStyleClass("sapUiNoMarginBegin sapUiTinyMarginEnd"),
                                                new sap.m.Label("", {
                                                    showColon: true,
                                                    text: ibas.i18n.prop("bo_materialinventory_onhand"),
                                                }),
                                                new sap.m.Text("", {
                                                    textAlign: sap.ui.core.TextAlign.Left,
                                                }).bindProperty("text", {
                                                    path: "inStock",
                                                    formatter(inStock: ibas.emYesNo): number {
                                                        return sap.extension.data.formatValue(sap.extension.data.Quantity,
                                                            (inStock === ibas.emYesNo.YES) ? 1 : 0
                                                            , "string");
                                                    }
                                                }).addStyleClass("sapUiNoMarginBegin sapUiTinyMarginEnd"),
                                                new sap.m.Label("", {
                                                    showColon: true,
                                                    text: ibas.i18n.prop("bo_materialinventory_onreserved"),
                                                }),
                                                new sap.m.Text("", {
                                                    textAlign: sap.ui.core.TextAlign.Left,
                                                }).bindProperty("text", {
                                                    path: "reserved",
                                                    formatter(reserved: ibas.emYesNo): number {
                                                        return sap.extension.data.formatValue(sap.extension.data.Quantity,
                                                            reserved === ibas.emYesNo.YES ? 1 : 0
                                                            , "string");
                                                    }
                                                }).addStyleClass("sapUiNoMarginBegin"),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.Button("", {
                                                    icon: "sap-icon://complete",
                                                    tooltip: ibas.i18n.prop("shell_using"),
                                                    press(this: sap.m.Button, event: sap.ui.base.Event): void {
                                                        that.fireViewEvents(that.useMaterialSerialInventoryEvent, this.getBindingContext().getObject());
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
                                visible: {
                                    parts: [
                                        {
                                            path: "inStock",
                                        }, {
                                            path: "reserved",
                                        }
                                    ],
                                    formatter(inStock: any, reserved: any): boolean {
                                        return (inStock === ibas.emYesNo.NO || reserved === ibas.emYesNo.YES) ? false : true;
                                    }
                                },
                                type: sap.m.ListType.Inactive,
                            })
                        },
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
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.SearchField("", {
                                                    search(event: sap.ui.base.Event): void {
                                                        let source: any = event.getSource();
                                                        if (source instanceof sap.m.SearchField) {
                                                            that.tableWorkDatas.setBusy(true);
                                                            let search: string = source.getValue();
                                                            let content: string;
                                                            if (search) {
                                                                search = search.trim().toLowerCase();
                                                            }
                                                            for (let item of that.tableWorkDatas.getItems()) {
                                                                if (item instanceof sap.m.ObjectListItem) {
                                                                    item.setVisible(true);
                                                                    if (ibas.strings.isEmpty(search)) {
                                                                        continue;
                                                                    }
                                                                    content = item.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                        continue;
                                                                    }
                                                                    content = item.getAttributes()[0].getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                        continue;
                                                                    }
                                                                    item.setVisible(false);
                                                                }
                                                            }
                                                            that.tableWorkDatas.setBusy(false);
                                                        }
                                                    }
                                                })
                                            ]
                                        }),
                                        content: [
                                            this.tableWorkDatas
                                        ]
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
                                                    resizable: true,
                                                    size: "50%",
                                                }),
                                                contentAreas: [
                                                    new sap.m.Page("", {
                                                        showHeader: false,
                                                        subHeader: new sap.m.Toolbar("", {
                                                            content: [
                                                                new sap.m.Button("", {
                                                                    type: sap.m.ButtonType.Transparent,
                                                                    icon: "sap-icon://navigation-right-arrow",
                                                                    press: function (this: sap.m.Button): void {
                                                                        if (this.getIcon() === "sap-icon://navigation-right-arrow") {
                                                                            that.tableInventories.setBusy(true);
                                                                            for (let item of that.tableInventories.getItems()) {
                                                                                if (item instanceof sap.m.CustomListItem) {
                                                                                    let panel: any = item.getContent()[0];
                                                                                    if (panel instanceof sap.m.Panel) {
                                                                                        panel.setExpanded(true);
                                                                                    }
                                                                                }
                                                                            }
                                                                            that.tableInventories.setBusy(false);
                                                                            that.invPanelTemplate.setExpanded(true);
                                                                            this.setIcon("sap-icon://navigation-down-arrow");
                                                                        } else {
                                                                            that.tableInventories.setBusy(true);
                                                                            for (let item of that.tableInventories.getItems()) {
                                                                                if (item instanceof sap.m.CustomListItem) {
                                                                                    let panel: any = item.getContent()[0];
                                                                                    if (panel instanceof sap.m.Panel) {
                                                                                        panel.setExpanded(false);
                                                                                    }
                                                                                }
                                                                            }
                                                                            that.tableInventories.setBusy(false);
                                                                            that.invPanelTemplate.setExpanded(false);
                                                                            this.setIcon("sap-icon://navigation-right-arrow");
                                                                        }
                                                                    }
                                                                }),
                                                                new sap.m.ToolbarSeparator(""),
                                                                new sap.m.SearchField("", {
                                                                    search(event: sap.ui.base.Event): void {
                                                                        that.searchListItems(that.tableInventories, event.getParameter("query"));
                                                                    }
                                                                }),
                                                                new sap.m.ToolbarSeparator("", {
                                                                }),
                                                                new sap.m.MenuButton("", {
                                                                    text: ibas.i18n.prop(["shell_automatic", "shell_data_choose"]),
                                                                    icon: "sap-icon://complete",
                                                                    type: sap.m.ButtonType.Transparent,
                                                                    menuPosition: sap.ui.core.Popup.Dock.EndBottom,
                                                                    menu: new sap.m.Menu("", {
                                                                        items: [
                                                                            new sap.m.MenuItem("", {
                                                                                text: ibas.i18n.prop("materials_auto_by_order"),
                                                                                icon: "sap-icon://numbered-text",
                                                                                press: function (): void {
                                                                                    let working: any = that.tableWorkDatas.getSelecteds<any>().firstOrDefault();
                                                                                    if (working instanceof app.BatchWorkingItem) {
                                                                                        for (let item of that.tableInventories.getItems()) {
                                                                                            if (working.remaining <= 0) {
                                                                                                break;
                                                                                            }
                                                                                            if (item instanceof sap.m.CustomListItem) {
                                                                                                if (item.getVisible() === false) {
                                                                                                    continue;
                                                                                                }
                                                                                                that.fireViewEvents(that.useMaterialSerialInventoryEvent, item.getBindingContext().getObject());
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }),
                                                                        ],
                                                                    })
                                                                }),
                                                            ]
                                                        }),
                                                        content: [
                                                            this.tableInventories,
                                                        ],
                                                    }),
                                                ]
                                            }),
                                            new component.Splitter("", {
                                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                    resizable: true,
                                                }),
                                                contentAreas: [
                                                    new sap.m.Page("", {
                                                        showHeader: false,
                                                        floatingFooter: true,
                                                        subHeader: new sap.m.Toolbar("", {
                                                            content: [
                                                                new sap.m.Button("", {
                                                                    type: sap.m.ButtonType.Transparent,
                                                                    icon: "sap-icon://navigation-right-arrow",
                                                                    press: function (this: sap.m.Button): void {
                                                                        if (this.getIcon() === "sap-icon://navigation-right-arrow") {
                                                                            that.tableItems.setBusy(true);
                                                                            for (let item of that.tableItems.getItems()) {
                                                                                if (item instanceof sap.m.CustomListItem) {
                                                                                    let panel: any = item.getContent()[0];
                                                                                    if (panel instanceof sap.m.Panel) {
                                                                                        panel.setExpanded(true);
                                                                                    }
                                                                                }
                                                                            }
                                                                            that.tableItems.setBusy(false);
                                                                            that.itmPanelTemplate.setExpanded(true);
                                                                            this.setIcon("sap-icon://navigation-down-arrow");
                                                                        } else {
                                                                            that.tableItems.setBusy(true);
                                                                            for (let item of that.tableItems.getItems()) {
                                                                                if (item instanceof sap.m.CustomListItem) {
                                                                                    let panel: any = item.getContent()[0];
                                                                                    if (panel instanceof sap.m.Panel) {
                                                                                        panel.setExpanded(false);
                                                                                    }
                                                                                }
                                                                            }
                                                                            that.tableItems.setBusy(false);
                                                                            that.invPanelTemplate.setExpanded(false);
                                                                            this.setIcon("sap-icon://navigation-right-arrow");
                                                                        }
                                                                    }
                                                                }),
                                                                new sap.m.ToolbarSeparator(""),
                                                                new sap.m.SearchField("", {
                                                                    search(event: sap.ui.base.Event): void {
                                                                        that.searchListItems(that.tableItems, event.getParameter("query"));
                                                                    }
                                                                }),
                                                            ]
                                                        }),
                                                        content: [
                                                            this.tableItems,
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
                            let input: any = panel.getHeaderToolbar().getContent()[0];
                            if (input instanceof sap.m.Input) {
                                content = input.getValue(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                    continue;
                                }
                            }
                            if (input instanceof sap.m.Title) {
                                content = input.getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                    continue;
                                }
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
                private tableWorkDatas: sap.extension.m.List;
                private tableItems: sap.extension.m.List;
                private tableInventories: sap.extension.m.List;
                private invPanelTemplate: sap.m.Panel;
                private itmPanelTemplate: sap.m.Panel;
                /** 显示待处理数据 */
                showWorkDatas(datas: app.SerialWorkingItem[]): void {
                    this.tableWorkDatas.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料序列记录 */
                showMaterialSerialItems(datas: app.SerialWorkingItemResult[]): void {
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
        }
    }
}