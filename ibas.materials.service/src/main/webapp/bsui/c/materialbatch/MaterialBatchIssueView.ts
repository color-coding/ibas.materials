/*
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 物料批次发货视图 */
            export class MaterialBatchIssueView extends ibas.DialogView implements app.IMaterialBatchIssueView {
                /** 切换工作数据 */
                changeWorkingDataEvent: Function;
                /** 使用物料批次库存 */
                useMaterialBatchInventoryEvent: Function;
                /** 移出物料批次库存 */
                removeMaterialBatchItemEvent: Function;

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
                                        title: ibas.i18n.prop("bo_materialbatchitem_itemcode"),
                                        text: {
                                            path: "itemCode",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Alphanumeric()
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_warehouse"),
                                        text: {
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
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_materialbatch"]),
                        items: {
                            path: "/rows",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    new sap.m.ObjectHeader("", {
                                        responsive: true,
                                        backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                        title: {
                                            path: "batchCode",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                        introActive: true,
                                        intro: {
                                            path: "specification",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Alphanumeric(),
                                            formatter(data: any): string {
                                                if (!ibas.strings.isEmpty(data) && data !== "0") {
                                                    return ibas.i18n.prop("materials_specification_view", data);
                                                }
                                                return "";
                                            }
                                        },
                                        introPress(event: sap.ui.base.Event): void {
                                            let source: any = event.getSource();
                                            if (source instanceof sap.m.ObjectHeader) {
                                                let specification: string = source.getIntro();
                                                let begin: number = specification ? specification.indexOf("[") : -1;
                                                let end: number = specification ? specification.indexOf("]") : -1;
                                                if (begin > 0 && end > begin) {
                                                    specification = specification.substring(begin + 1, end);
                                                    if (parseInt(specification) > 0) {
                                                        source.setIntroActive(false);
                                                        let criteria: ibas.ICriteria = new ibas.Criteria();
                                                        let condition: ibas.ICondition = criteria.conditions.create();
                                                        condition.alias = bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME;
                                                        condition.value = specification;
                                                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                                                        boRepository.fetchMaterialSpecification({
                                                            criteria: criteria,
                                                            onCompleted: (opRslt) => {
                                                                let specification: bo.IMaterialSpecification = opRslt.resultObjects.firstOrDefault();
                                                                if (!ibas.objects.isNull(specification)) {
                                                                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                                    builder.map(null, "");
                                                                    builder.map(undefined, "");
                                                                    builder.append(ibas.i18n.prop("bo_materialbatch_specification"));
                                                                    builder.append("(");
                                                                    builder.append(specification.name);
                                                                    builder.append(")");
                                                                    builder.append(": ");
                                                                    for (let item of specification.materialSpecificationItems) {
                                                                        if (builder.length > 5) {
                                                                            builder.append("; ");
                                                                        }
                                                                        builder.append(item.description);
                                                                        builder.append(": ");
                                                                        builder.append(item.content);
                                                                    }
                                                                    source.setIntro(builder.toString());
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                        number: {
                                            path: "quantity",
                                            mode: sap.ui.model.BindingMode.OneWay,
                                            type: new sap.extension.data.Quantity()
                                        },
                                        numberState: sap.ui.core.ValueState.Information,
                                        attributes: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                                text: {
                                                    path: "supplierSerial",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Alphanumeric()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_notes"),
                                                text: {
                                                    path: "notes",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Alphanumeric()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                                text: {
                                                    path: "expirationDate",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Date()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                                text: {
                                                    path: "manufacturingDate",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Date()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_admissiondate"),
                                                text: {
                                                    path: "admissionDate",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Date()
                                                }
                                            }),
                                        ],
                                    }),
                                ],
                                type: sap.m.ListType.Inactive
                            })
                        },
                    });
                    this.tableInventories = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.NONE,
                        mode: sap.m.ListMode.None,
                        growing: false,
                        noDataText: ibas.i18n.prop(["shell_please", "shell_data_choose", "bo_material"]),
                        items: {
                            path: "/rows",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    new sap.m.ObjectHeader("", {
                                        responsive: true,
                                        backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                        title: {
                                            path: "batchCode",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                        introActive: true,
                                        intro: {
                                            path: "specification",
                                            mode: sap.ui.model.BindingMode.OneTime,
                                            type: new sap.extension.data.Alphanumeric(),
                                            formatter(data: any): string {
                                                if (!ibas.strings.isEmpty(data) && data !== "0") {
                                                    return ibas.i18n.prop("materials_specification_view", data);
                                                }
                                                return "";
                                            }
                                        },
                                        introPress(event: sap.ui.base.Event): void {
                                            let source: any = event.getSource();
                                            if (source instanceof sap.m.ObjectHeader) {
                                                let specification: string = source.getIntro();
                                                let begin: number = specification ? specification.indexOf("[") : -1;
                                                let end: number = specification ? specification.indexOf("]") : -1;
                                                if (begin > 0 && end > begin) {
                                                    specification = specification.substring(begin + 1, end);
                                                    if (parseInt(specification) > 0) {
                                                        source.setIntroActive(false);
                                                        let criteria: ibas.ICriteria = new ibas.Criteria();
                                                        let condition: ibas.ICondition = criteria.conditions.create();
                                                        condition.alias = bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME;
                                                        condition.value = specification;
                                                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                                                        boRepository.fetchMaterialSpecification({
                                                            criteria: criteria,
                                                            onCompleted: (opRslt) => {
                                                                let specification: bo.IMaterialSpecification = opRslt.resultObjects.firstOrDefault();
                                                                if (!ibas.objects.isNull(specification)) {
                                                                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                                    builder.map(null, "");
                                                                    builder.map(undefined, "");
                                                                    builder.append(ibas.i18n.prop("bo_materialbatch_specification"));
                                                                    builder.append("(");
                                                                    builder.append(specification.name);
                                                                    builder.append(")");
                                                                    builder.append(": ");
                                                                    for (let item of specification.materialSpecificationItems) {
                                                                        if (builder.length > 5) {
                                                                            builder.append("; ");
                                                                        }
                                                                        builder.append(item.description);
                                                                        builder.append(": ");
                                                                        builder.append(item.content);
                                                                    }
                                                                    source.setIntro(builder.toString());
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                        number: {
                                            path: "quantity",
                                            mode: sap.ui.model.BindingMode.OneWay,
                                            type: new sap.extension.data.Quantity()
                                        },
                                        numberState: sap.ui.core.ValueState.Success,
                                        attributes: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                                text: {
                                                    path: "supplierSerial",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Alphanumeric()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_notes"),
                                                text: {
                                                    path: "notes",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Alphanumeric()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                                text: {
                                                    path: "manufacturingDate",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Date()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_admissiondate"),
                                                text: {
                                                    path: "admissionDate",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Date()
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                                text: {
                                                    path: "expirationDate",
                                                    mode: sap.ui.model.BindingMode.OneTime,
                                                    type: new sap.extension.data.Date()
                                                }
                                            }),
                                        ]
                                    }),
                                ],
                                visible: {
                                    path: "quantity",
                                    mode: sap.ui.model.BindingMode.OneWay,
                                    formatter(data: number): boolean {
                                        return data > 0 ? true : false;
                                    }
                                },
                                type: sap.m.ListType.Detail,
                                detailPress(event: sap.ui.base.Event): void {
                                    let source: any = event.getSource();
                                    if (source instanceof sap.m.CustomListItem) {
                                        let content: any = source.getBindingContext();
                                        if (content instanceof sap.ui.model.Context) {
                                            let data: any = content.getObject();
                                            if (!ibas.objects.isNull(data)) {
                                                that.fireViewEvents(that.useMaterialBatchInventoryEvent, data);
                                            }
                                        }
                                    }
                                },
                            })
                        },
                    });
                    return new sap.extension.m.Dialog("", {
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
                                        content: [
                                            new sap.ui.layout.Splitter("", {
                                                orientation: sap.ui.core.Orientation.Vertical,
                                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                    size: "auto",
                                                }),
                                                contentAreas: [
                                                    new sap.ui.layout.Splitter("", {
                                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                            resizable: true,
                                                            size: "50%",
                                                        }),
                                                        contentAreas: [
                                                            new sap.m.Page("", {
                                                                showHeader: false,
                                                                subHeader: new sap.m.Toolbar("", {
                                                                    content: [
                                                                        new sap.m.SearchField("", {
                                                                            search(event: sap.ui.base.Event): void {
                                                                                let source: any = event.getSource();
                                                                                if (source instanceof sap.m.SearchField) {
                                                                                    that.tableInventories.setBusy(true);
                                                                                    let search: string = source.getValue();
                                                                                    let content: string;
                                                                                    if (search) {
                                                                                        search = search.trim().toLowerCase();
                                                                                    }
                                                                                    for (let item of that.tableInventories.getItems()) {
                                                                                        if (item instanceof sap.m.CustomListItem) {
                                                                                            item.setVisible(true);
                                                                                            if (ibas.strings.isEmpty(search)) {
                                                                                                continue;
                                                                                            }
                                                                                            let done: boolean;
                                                                                            let header: any = item.getContent()[0];
                                                                                            if (header instanceof sap.m.ObjectHeader) {
                                                                                                content = header.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                    continue;
                                                                                                }
                                                                                                content = header.getIntro(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                    continue;
                                                                                                }
                                                                                                done = false;
                                                                                                for (let hItem of header.getAttributes()) {
                                                                                                    content = hItem.getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                        done = true;
                                                                                                        break;
                                                                                                    }
                                                                                                }
                                                                                                if (done) {
                                                                                                    continue;
                                                                                                }
                                                                                            }
                                                                                            item.setVisible(false);
                                                                                        }
                                                                                    }
                                                                                    that.tableInventories.setBusy(false);
                                                                                }
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
                                                                                                    if (item instanceof sap.m.CustomListItem
                                                                                                        && item.getType() === sap.m.ListType.Detail) {
                                                                                                        let button: any = sap.ui.getCore().byId(
                                                                                                            ibas.strings.format("{0}-imgDet", item.getId()));
                                                                                                        if (!ibas.objects.isNull(button)) {
                                                                                                            button.firePress();
                                                                                                        }
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
                                                    new sap.ui.layout.Splitter("", {
                                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                            resizable: true,
                                                        }),
                                                        contentAreas: [
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
                                                                                    let content: string;
                                                                                    if (search) {
                                                                                        search = search.trim().toLowerCase();
                                                                                    }
                                                                                    for (let item of that.tableItems.getItems()) {
                                                                                        if (item instanceof sap.m.CustomListItem) {
                                                                                            item.setVisible(true);
                                                                                            if (ibas.strings.isEmpty(search)) {
                                                                                                continue;
                                                                                            }
                                                                                            let done: boolean;
                                                                                            let header: any = item.getContent()[0];
                                                                                            if (header instanceof sap.m.ObjectHeader) {
                                                                                                content = header.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                    continue;
                                                                                                }
                                                                                                content = header.getIntro(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                    continue;
                                                                                                }
                                                                                                done = false;
                                                                                                for (let hItem of header.getAttributes()) {
                                                                                                    content = hItem.getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                        done = true;
                                                                                                        break;
                                                                                                    }
                                                                                                }
                                                                                                if (done) {
                                                                                                    continue;
                                                                                                }
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
                                                                                that.fireViewEvents(that.removeMaterialBatchItemEvent, that.tableItems.getSelecteds());
                                                                            }
                                                                        }),
                                                                    ]
                                                                }),
                                                                content: [
                                                                    this.tableItems,
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
                                                                    ]
                                                                })
                                                            }),
                                                        ]
                                                    }),
                                                ]
                                            }),
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
                    });
                }
                private tableWorkDatas: sap.extension.m.List;
                private tableItems: sap.extension.m.List;
                private tableInventories: sap.extension.m.List;
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
                /** 显示物料批次库存 */
                showMaterialBatchInventories(datas: bo.MaterialBatch[]): void {
                    this.tableInventories.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}