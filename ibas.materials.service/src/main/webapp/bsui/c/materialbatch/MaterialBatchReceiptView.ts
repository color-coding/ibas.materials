/*
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 配置项目-批次编码最大长度 */
            export const CONFIG_ITEM_BATCH_CODE_MAX_LENGTH: string = "batchCodeMaxLength";
            /** 物料批次收货视图 */
            export class MaterialBatchReceiptView extends ibas.DialogView implements app.IMaterialBatchReceiptView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 创建批次编码记录 */
                createMaterialBatchItemEvent: Function;
                /** 移出物料批次库存 */
                removeMaterialBatchItemEvent: Function;
                /** 选择物料版本 */
                chooseVersionEvent: Function;

                draw(): any {
                    let that: this = this;
                    this.tableWorkDatas = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        growing: false,
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
                                        title: ibas.i18n.prop("bo_materialbatchitem_itemcode"),
                                        bindingValue: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric()
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatchitem_itemversion"),
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
                        chooseType: ibas.emChooseType.NONE,
                        mode: sap.m.ListMode.None,
                        growing: true,
                        growingThreshold: 30,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_create", "bo_materialbatch"]),
                        items: {
                            path: "/rows",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    this.templatePanel = new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.extension.m.Input("", {
                                                    width: "70%",
                                                    placeholder: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                                }).bindProperty("bindingValue", {
                                                    path: "batchCode",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: config.get(CONFIG_ITEM_BATCH_CODE_MAX_LENGTH, 36)
                                                    })
                                                }),
                                                new sap.m.Label("", {
                                                    text: " × ",
                                                    width: "3rem",
                                                    textAlign: sap.ui.core.TextAlign.Center,
                                                }),
                                                new sap.extension.m.Input("", {
                                                    width: "30%",
                                                    textAlign: sap.ui.core.TextAlign.Right,
                                                    placeholder: ibas.i18n.prop("bo_materialbatch_quantity"),
                                                }).bindProperty("bindingValue", {
                                                    path: "quantity",
                                                    type: new sap.extension.data.Quantity({
                                                        minValue: 0
                                                    })
                                                }),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.extension.m.Input("", {
                                                    width: "30%",
                                                    textAlign: sap.ui.core.TextAlign.Left,
                                                    placeholder: ibas.i18n.prop("bo_materialbatchitem_remarks"),
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
                                                        that.fireViewEvents(that.removeMaterialBatchItemEvent, this.getBindingContext().getObject());
                                                    }
                                                }),
                                            ]
                                        }),
                                        content: [
                                            new sap.ui.layout.cssgrid.CSSGrid("", {
                                                gridTemplateRows: "1fr",
                                                gridTemplateColumns: "30% 30% 30%",
                                                gridGap: "1rem",
                                                items: [
                                                    new sap.ui.layout.form.SimpleForm("", {
                                                        editable: true,
                                                        content: [
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_supplierserial") }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "supplierSerial",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 60
                                                                })
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_notes") }),
                                                            new sap.extension.m.TextArea("", {
                                                                rows: 4,
                                                            }).bindProperty("bindingValue", {
                                                                path: "notes",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.ui.layout.form.SimpleForm("", {
                                                        editable: true,
                                                        content: [
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_manufacturingdate") }),
                                                            new sap.extension.m.DatePicker("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "manufacturingDate",
                                                                type: new sap.extension.data.Date()
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_admissiondate") }),
                                                            new sap.extension.m.DatePicker("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "admissionDate",
                                                                type: new sap.extension.data.Date()
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_expirationdate") }),
                                                            new sap.extension.m.DatePicker("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "expirationDate",
                                                                type: new sap.extension.data.Date()
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.ui.layout.form.SimpleForm("", {
                                                        editable: true,
                                                        content: [
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_version") }),
                                                            new sap.extension.m.Input("", {
                                                                showValueHelp: true,
                                                                valueHelpRequest: function (): void {
                                                                    that.fireViewEvents(that.chooseVersionEvent, this.getBindingContext().getObject());
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "version",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_specification") }),
                                                            new component.SpecificationInput("", {
                                                                editable: true,
                                                                material: "{=${}.itemCode()}",
                                                            }).bindProperty("specification", {
                                                                path: "specification",
                                                                type: new sap.extension.data.Numeric()
                                                            }),
                                                        ]
                                                    }),
                                                ]
                                            }),
                                        ]
                                    })
                                ],
                                type: sap.m.ListType.Inactive
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
                                                            that.templatePanel.setExpanded(true);
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
                                                            that.templatePanel.setExpanded(false);
                                                            this.setIcon("sap-icon://navigation-right-arrow");
                                                        }
                                                    }
                                                }),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.SearchField("", {
                                                    search(event: sap.ui.base.Event): void {
                                                        let source: any = event.getSource();
                                                        if (source instanceof sap.m.SearchField) {
                                                            that.tableItems.setBusy(true);
                                                            let search: string = source.getValue();
                                                            let content: string, done: boolean;
                                                            if (search) {
                                                                search = search.trim().toLowerCase();
                                                            }
                                                            for (let item of that.tableItems.getItems()) {
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
                                                                    if (!(input instanceof sap.m.Input)) {
                                                                        continue;
                                                                    }
                                                                    content = input.getValue(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                        continue;
                                                                    }
                                                                    done = false;
                                                                    for (let pItem of panel.getContent()) {
                                                                        if (pItem instanceof sap.ui.layout.cssgrid.CSSGrid) {
                                                                            for (let cItem of pItem.getItems()) {
                                                                                if (cItem instanceof sap.ui.layout.form.SimpleForm) {
                                                                                    for (let fItem of cItem.getContent()) {
                                                                                        if (fItem instanceof sap.m.Input) {
                                                                                            content = fItem.getValue();
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
                                                            that.tableItems.setBusy(false);
                                                        }
                                                    }
                                                }),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.MenuButton("", {
                                                    text: ibas.i18n.prop("shell_data_create"),
                                                    icon: "sap-icon://create",
                                                    type: sap.m.ButtonType.Transparent,
                                                    menuPosition: sap.ui.core.Popup.Dock.EndBottom,
                                                    menu: new sap.m.Menu("", {
                                                        items: [
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("materials_auto_by_datetime"),
                                                                icon: "sap-icon://present",
                                                                press: function (): void {
                                                                    that.fireViewEvents(that.createMaterialBatchItemEvent, "TIME_CODE");
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("materials_auto_by_datetime_serial"),
                                                                icon: "sap-icon://create-entry-time",
                                                                press: function (): void {
                                                                    that.fireViewEvents(that.createMaterialBatchItemEvent, "TIME_SERIAL_CODE");
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("materials_select_used"),
                                                                icon: "sap-icon://documents",
                                                                press: function (): void {
                                                                    that.fireViewEvents(that.createMaterialBatchItemEvent, "USED_CODE");
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("materials_select_base_document"),
                                                                icon: "sap-icon://document",
                                                                press: function (): void {
                                                                    that.fireViewEvents(that.createMaterialBatchItemEvent, "BASE_DOCUMENT");
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("materials_select_agreements"),
                                                                icon: "sap-icon://contacts",
                                                                press: function (): void {
                                                                    that.fireViewEvents(that.createMaterialBatchItemEvent, "AGREEMENTS");
                                                                }
                                                            }),
                                                        ],
                                                    })
                                                }),
                                            ]
                                        }),
                                        content: [
                                            this.tableItems
                                        ],
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
                private tableWorkDatas: sap.extension.m.List;
                private tableItems: sap.extension.m.List;
                private templatePanel: sap.m.Panel;

                /** 显示待处理数据 */
                showWorkDatas(datas: app.BatchWorkingItem[]): void {
                    this.tableWorkDatas.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料批次记录 */
                showMaterialBatchItems(datas: app.BatchWorkingItemResult[]): void {
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