/*
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 物料序列收货视图 */
            export class MaterialSerialReceiptView extends ibas.DialogView implements app.IMaterialSerialReceiptView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 创建序列编码记录 */
                createMaterialSerialItemEvent: Function;
                /** 移出物料序列库存 */
                removeMaterialSerialItemEvent: Function;

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
                                    mode: sap.ui.model.BindingMode.OneTime,
                                    type: new sap.extension.data.Alphanumeric()
                                },
                                number: {
                                    parts: [
                                        {
                                            path: "quantity",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Numeric()
                                        }, {
                                            path: "uom",
                                            mode: sap.ui.model.BindingMode.OneTime,
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
                                                path: "uom",
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
                                        title: ibas.i18n.prop("bo_materialserialitem_itemcode"),
                                        bindingValue: {
                                            path: "itemCode",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Alphanumeric()
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_warehouse"),
                                        bindingValue: {
                                            path: "warehouse",
                                            mode: sap.ui.model.BindingMode.OneTime,
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
                                that.fireViewEvents(that.changeWorkingDataEvent, that.tableWorkDatas.getSelecteds().firstOrDefault());
                            }
                        },
                    });
                    this.tableItems = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.MULTIPLE,
                        mode: sap.m.ListMode.MultiSelect,
                        growing: false,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_create", "bo_materialserial"]),
                        items: {
                            path: "/rows",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.extension.m.Input("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "serialCode",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 36
                                                    })
                                                }),
                                                new sap.m.ToolbarSpacer(""),
                                                new sap.m.ToolbarSeparator(""),
                                                new sap.m.Button("", {
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: "sap-icon://expand",
                                                    press: function (event: sap.ui.base.Event): void {
                                                        let source: any = event.getSource();
                                                        if (source instanceof sap.m.Button) {
                                                            let parent: any = source.getParent();
                                                            if (parent instanceof sap.m.Toolbar) {
                                                                let grand: any = parent.getParent();
                                                                if (grand instanceof sap.m.Panel) {
                                                                    grand.setExpanded(!grand.getExpanded());
                                                                }
                                                            }
                                                        }
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
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_batchserial") }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "batchSerial",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 60
                                                                })
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_supplierserial") }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "supplierSerial",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 60
                                                                })
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_notes") }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "notes",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            }),
                                                        ]
                                                    }),
                                                    new sap.ui.layout.form.SimpleForm("", {
                                                        editable: true,
                                                        content: [
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_manufacturingdate") }),
                                                            new sap.extension.m.DatePicker("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "manufacturingDate",
                                                                type: new sap.extension.data.Date()
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_admissiondate") }),
                                                            new sap.extension.m.DatePicker("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "admissionDate",
                                                                type: new sap.extension.data.Date()
                                                            }),
                                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_expirationdate") }),
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
                                        ],
                                        expand(event: sap.ui.base.Event): void {
                                            let source: any = event.getSource();
                                            if (source instanceof sap.m.Panel) {
                                                let button: any = ibas.arrays.create(source.getHeaderToolbar().getContent()).lastOrDefault();
                                                if (button instanceof sap.m.Button) {
                                                    if (source.getExpanded()) {
                                                        button.setIcon("sap-icon://collapse");
                                                    } else {
                                                        button.setIcon("sap-icon://expand");
                                                    }
                                                }
                                                // 刷新扩展数据
                                                if (source.getExpanded()) {

                                                }
                                            }
                                        }
                                    }).addStyleClass("sapUiNoContentPadding")
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
                                                new sap.m.ToolbarSeparator("", {
                                                }),
                                                new sap.m.Button("", {
                                                    text: ibas.i18n.prop("shell_data_remove"),
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: "sap-icon://delete",
                                                    press: function (): void {
                                                        that.fireViewEvents(that.removeMaterialSerialItemEvent, that.tableItems.getSelecteds());
                                                    }
                                                }),
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
                                                                    that.fireViewEvents(that.createMaterialSerialItemEvent, "TIME_CODE");
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("materials_select_used"),
                                                                icon: "sap-icon://documents",
                                                                press: function (): void {
                                                                    that.fireViewEvents(that.createMaterialSerialItemEvent, "USED_CODE");
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
                                        footer: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.MenuButton("", {
                                                    text: ibas.i18n.prop("shell_data_choose"),
                                                    icon: "sap-icon://menu",
                                                    type: sap.m.ButtonType.Transparent,
                                                    menuPosition: sap.ui.core.Popup.Dock.BeginTop,
                                                    menu: new sap.m.Menu("", {
                                                        items: [
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("shell_all"),
                                                                icon: "sap-icon://multiselect-all",
                                                                press: function (): void {
                                                                    for (let item of that.tableItems.getItems()) {
                                                                        that.tableItems.setSelectedItem(item, true);
                                                                    }
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("shell_reverse"),
                                                                icon: "sap-icon://multi-select",
                                                                press: function (): void {
                                                                    for (let item of that.tableItems.getItems()) {
                                                                        if (item.getSelected() === true) {
                                                                            that.tableItems.setSelectedItem(item, false);
                                                                        } else {
                                                                            that.tableItems.setSelectedItem(item, true);
                                                                        }
                                                                    }
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                text: ibas.i18n.prop("shell_none"),
                                                                icon: "sap-icon://multiselect-none",
                                                                press: function (): void {
                                                                    for (let item of that.tableItems.getItems()) {
                                                                        that.tableItems.setSelectedItem(item, false);
                                                                    }
                                                                }
                                                            }),
                                                        ],
                                                    })
                                                }),
                                                new sap.m.ToolbarSpacer(""),
                                                new sap.m.MenuButton("", {
                                                    text: ibas.strings.format("{0}/{1}", ibas.i18n.prop("shell_show"), ibas.i18n.prop("shell_hide")),
                                                    icon: "sap-icon://detail-view",
                                                    type: sap.m.ButtonType.Transparent,
                                                    menuPosition: sap.ui.core.Popup.Dock.EndTop,
                                                    menu: new sap.m.Menu("", {
                                                        items: [
                                                            new sap.m.MenuItem("", {
                                                                icon: "sap-icon://expand",
                                                                text: ibas.i18n.prop(["shell_show", "materials_details"]),
                                                                press: function (): void {
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
                                                                }
                                                            }),
                                                            new sap.m.MenuItem("", {
                                                                icon: "sap-icon://collapse",
                                                                text: ibas.i18n.prop(["shell_hide", "materials_details"]),
                                                                press: function (): void {
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
                                                                }
                                                            }),
                                                        ],
                                                    })
                                                }),
                                            ]
                                        })
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
            }
        }
    }
}