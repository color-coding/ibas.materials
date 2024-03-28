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
            /** 视图-拣配清单 */
            export class PickListsView extends ibas.View implements app.IPickListsView {
                /** 查询处理中数据事件 */
                fetchProcessingDataEvent: Function;
                /** 下达拣配清单事件 */
                releasePickListsEvent: Function;
                /** 转为交货事件 */
                processingTurnToDeliveryEvent: Function;
                /** 转为交货事件 */
                releasedTurnToDeliveryEvent: Function;
                /** 转为交货事件 */
                pickedTurnToDeliveryEvent: Function;
                /** 保存数据事件 */
                saveDatasEvent: Function;
                draw(): any {
                    let that: this = this;
                    this.iconTabBar = new sap.m.IconTabBar("", {
                        headerBackgroundDesign: sap.m.BackgroundDesign.Transparent,
                        backgroundDesign: sap.m.BackgroundDesign.Transparent,
                        expandable: false,
                        items: [
                            new sap.m.IconTabFilter("", {
                                key: ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.PROCESSING),
                                text: ibas.enums.describe(app.emPickViewStatus, app.emPickViewStatus.PROCESSING),
                                content: [
                                    this.processingTable = new sap.extension.table.DataTable("", {
                                        enableSelectAll: true,
                                        visibleRowCount: sap.extension.table.visibleRowCount(15) - 2,
                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                                        toolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Label("", {
                                                    width: "auto",
                                                    text: ibas.i18n.prop("bo_picklistsline_basedocument")
                                                }),
                                                new sap.m.SearchField("", {
                                                    width: "10rem",
                                                    search(this: sap.m.SearchField, oEvent: sap.ui.base.Event): void {
                                                        let filters: sap.ui.model.Filter[] = [];
                                                        let sQuery: string = this.getValue();
                                                        if (sQuery && sQuery.length > 0) {
                                                            let filter: sap.ui.model.Filter
                                                                = new sap.ui.model.Filter("baseDocumentEntry", sap.ui.model.FilterOperator.EQ, sQuery);
                                                            filters.push(filter);
                                                        }
                                                        let binding: sap.ui.model.Binding = that.processingTable.getBinding("rows");
                                                        if (binding instanceof sap.ui.model.ListBinding) {
                                                            binding.filter(filters, sap.ui.model.FilterType.Application);
                                                        }
                                                    }
                                                }),
                                                new sap.m.ToolbarSeparator("", {}),
                                                new sap.m.Button("", {
                                                    text: ibas.i18n.prop(["em_documentstatus_released", "bo_picklists"]),
                                                    type: sap.m.ButtonType.Transparent,
                                                    icon: "sap-icon://checklist-item-2",
                                                    press(): void {
                                                        that.releasePickLists(that.processingTable.getSelecteds());
                                                    }
                                                }),
                                            ]
                                        }),
                                        rows: "{/rows}",
                                        columns: [
                                            new sap.extension.table.DataColumn("", {
                                                label: "#",
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "#",
                                                    type: new sap.extension.data.Numeric(),
                                                }),
                                                sortProperty: "#",
                                                filterProperty: "#",
                                                width: "3rem"
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_basedocument"),
                                                template: new sap.extension.m.Link("", {
                                                    press(this: sap.m.Link): void {
                                                        let data: any = this.getBindingContext().getObject();
                                                        if (data instanceof bo.PickListsLine && data.baseDocumentEntry > 0) {
                                                            ibas.servicesManager.runLinkService({
                                                                boCode: data.baseDocumentType,
                                                                linkValue: data.baseDocumentEntry.toString()
                                                            });
                                                        }
                                                    }
                                                }).bindProperty("bindingValue", {
                                                    parts: [
                                                        {
                                                            path: "baseDocumentType",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        },
                                                        {
                                                            path: "baseDocumentEntry",
                                                            type: new sap.extension.data.Numeric(),
                                                        },
                                                        {
                                                            path: "baseDocumentLineId",
                                                            type: new sap.extension.data.Numeric(),
                                                        }
                                                    ],
                                                    formatter(type: string, entry: number, lineId: number): string {
                                                        if (ibas.strings.isEmpty(type)) {
                                                            return undefined;
                                                        }
                                                        if (lineId > 0) {
                                                            return ibas.strings.format("{0}-{1}-{2}", ibas.businessobjects.describe(type), entry, lineId);
                                                        }
                                                        return ibas.strings.format("{0}-{1}", ibas.businessobjects.describe(type), entry);
                                                    }
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_goodsissue_documentdate"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "documentDate",
                                                    type: new sap.extension.data.Date()
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_goodsissue_deliverydate"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "deliveryDate",
                                                    type: new sap.extension.data.Date()
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_itemcode"),
                                                template: new sap.extension.m.DataLink("", {
                                                    objectCode: bo.Material.BUSINESS_OBJECT_CODE
                                                }).bindProperty("bindingValue", {
                                                    path: "itemCode",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 50
                                                    }),
                                                }),
                                                sortProperty: "itemCode",
                                                filterProperty: "itemCode"
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_itemdescription"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "itemDescription",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 100
                                                    }),
                                                }),
                                                sortProperty: "itemDescription",
                                                filterProperty: "itemDescription"
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_unclosedquantity"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "unclosedQuantity",
                                                    type: new sap.extension.data.Quantity(),
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_quantity"),
                                                template: new sap.extension.m.Input("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "releasedQuantity",
                                                    type: new sap.extension.data.Quantity(),
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_uom"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "uom",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 8
                                                    }),
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_inventoryuom"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "inventoryUOM",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 8
                                                    }),
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_uomrate"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "uomRate",
                                                    type: new sap.extension.data.Rate(),
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_picklistsline_warehouse"),
                                                template: new sap.extension.m.DataLink("", {
                                                    objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE
                                                }).bindProperty("bindingValue", {
                                                    path: "warehouse",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 8
                                                    }),
                                                }),
                                                sortProperty: "warehouse",
                                                filterProperty: "warehouse"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new sap.m.IconTabFilter("", {
                                key: ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.RELEASED),
                                text: ibas.enums.describe(app.emPickViewStatus, app.emPickViewStatus.RELEASED),
                                content: [
                                    this.releasedTable = new sap.extension.table.DataTable("", {
                                        enableSelectAll: true,
                                        visibleRowCount: sap.extension.table.visibleRowCount(15) - 2,
                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                                        toolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Label("", {
                                                    width: "auto",
                                                    text: ibas.i18n.prop("shell_data_view")
                                                }),
                                                this.releasedSelect = new sap.extension.m.EnumSelect("", {
                                                    enumType: app.emPickViewDimension,
                                                }).bindProperty("bindingValue", {
                                                    path: "/viewDimension",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: app.emPickViewDimension
                                                    }),
                                                }),
                                            ]
                                        }),
                                        rows: "{/rows}",
                                        columns: [
                                        ]
                                    })
                                ]
                            }),
                            new sap.m.IconTabFilter("", {
                                key: ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.PICKED),
                                text: ibas.enums.describe(app.emPickViewStatus, app.emPickViewStatus.PICKED),
                                content: [
                                    this.pickedTable = new sap.extension.table.DataTable("", {
                                        enableSelectAll: true,
                                        visibleRowCount: sap.extension.table.visibleRowCount(15) - 2,
                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                                        toolbar: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Label("", {
                                                    width: "auto",
                                                    text: ibas.i18n.prop("shell_data_view")
                                                }),
                                                this.pickedSelect = new sap.extension.m.EnumSelect("", {
                                                    enumType: app.emPickViewDimension,
                                                }).bindProperty("bindingValue", {
                                                    path: "/viewDimension",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: app.emPickViewDimension
                                                    }),
                                                }),
                                            ]
                                        }),
                                        rows: "{/rows}",
                                        columns: [
                                        ]
                                    })
                                ]
                            }),
                        ],
                        select(oEvent: sap.ui.base.Event): void {
                            let item: sap.m.IconTabFilter = oEvent.getParameter("item");
                            if (!!item && item.getKey() === ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.PROCESSING)) {
                                if (ibas.objects.isNull(that.processingDatas)) {
                                    that.fireViewEvents(that.fetchProcessingDataEvent);
                                }
                            }
                        }
                    });
                    return this.page = new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press(): void {
                                        that.fireViewEvents(that.saveDatasEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.extension.m.MenuButton("", {
                                    text: ibas.i18n.prop("shell_quick_to"),
                                    icon: "sap-icon://generate-shortcut",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: this.quickToMenu = new sap.m.Menu("", {
                                        items: {
                                            path: "/",
                                            template: new sap.m.MenuItem("", {
                                                visible: {
                                                    path: "description",
                                                    formatter(text: string): boolean {
                                                        if (typeof text === "string" && !ibas.strings.isEmpty(text)) {
                                                            if (text.indexOf(",") === -1) {
                                                                return true;
                                                            }
                                                            let descs: string[] = text.split(",");
                                                            return !ibas.strings.isEmpty(descs[1]);
                                                        }
                                                        return false;
                                                    }
                                                },
                                                text: {
                                                    path: "description",
                                                    formatter(text: string): string {
                                                        if (typeof text === "string" && !ibas.strings.isEmpty(text)) {
                                                            if (text.indexOf(",") === -1) {
                                                                return text;
                                                            }
                                                            let descs: string[] = text.split(",");
                                                            return descs[1];
                                                        }
                                                        return "";
                                                    }
                                                },
                                                press: function (this: sap.m.MenuItem): void {
                                                    let key: string = that.iconTabBar.getSelectedKey();
                                                    switch (key) {
                                                        case ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.PROCESSING):
                                                            let selecteds: ibas.IList<any> = that.processingTable.getSelecteds();
                                                            let serviceAgent: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                            that.fireViewEvents(that.processingTurnToDeliveryEvent, serviceAgent, selecteds, (closedTargets) => {
                                                                if (closedTargets instanceof Array) {
                                                                    that.showProcessingData(that.processingDatas, closedTargets);
                                                                }
                                                            });
                                                            break;
                                                        case ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.RELEASED):
                                                            that.fireViewEvents(that.releasedTurnToDeliveryEvent, serviceAgent, that.releasedTable.getSelecteds());
                                                            break;
                                                        case ibas.enums.toString(app.emPickViewStatus, app.emPickViewStatus.PICKED):
                                                            that.fireViewEvents(that.pickedTurnToDeliveryEvent, serviceAgent, that.pickedTable.getSelecteds());
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                }
                                            })
                                        }
                                    }),
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.layout.form.SimpleForm("", {
                                editable: true,
                                content: [
                                    this.iconTabBar
                                ]
                            })
                        ]
                    });
                }
                protected page: sap.extension.m.Page;
                protected iconTabBar: sap.m.IconTabBar;
                protected processingTable: sap.extension.table.DataTable;
                protected releasedTable: sap.extension.table.DataTable;
                private quickToMenu: sap.m.Menu;
                private releasedSelect: sap.extension.m.EnumSelect;
                protected pickedTable: sap.extension.table.DataTable;
                private pickedSelect: sap.extension.m.EnumSelect;

                private workingData: app.PickListsWorking;
                private processingDatas: ibas.IList<app.IPickListsTarget>;
                private pickListsDatas: bo.PickLists[];
                private releasedDatas: ibas.IList<any>;
                private pickedDatas: ibas.IList<any>;
                private releasedLineDatas: ibas.IList<any>;
                private pickedLineDatas: ibas.IList<any>;
                /** 显示数据 */
                showWorkingData(data: app.PickListsWorking): void {
                    let that: this = this;
                    this.workingData = data;
                    let model: sap.extension.model.JSONModel = new sap.extension.model.JSONModel(data);
                    this.releasedSelect.setModel(model);
                    this.pickedSelect.setModel(model);
                    data.registerListener({
                        id: "viewDimensionChange",
                        propertyChanged(property: string): void {
                            if (ibas.strings.equalsIgnoreCase(property, app.PickListsWorking.PROPERTY_VIEWDIMENSION_NAME)) {
                                that.onViewDimensionChange();
                            }
                        },
                    });
                    this.onViewDimensionChange();
                    this.iconTabBar.setSelectedKey(ibas.enums.toString(app.emPickViewStatus, data.status));
                    if (data.status === app.emPickViewStatus.PROCESSING) {
                        this.fireViewEvents(this.fetchProcessingDataEvent);
                    }
                }
                /** 显示拣配清单 */
                showPickListsData(datas: bo.PickLists[]): void {
                    this.pickListsDatas = datas;
                    this.releasedDatas = new ibas.ArrayList();
                    this.pickedDatas = new ibas.ArrayList();
                    this.releasedLineDatas = new ibas.ArrayList();
                    this.pickedLineDatas = new ibas.ArrayList();
                    this.releasedDatas.add(this.pickListsDatas.filter(c => c.pickStatus === bo.emPickStatus.RELEASED || c.pickStatus === bo.emPickStatus.PARTIALLYPICKED));
                    this.pickedDatas.add(this.pickListsDatas.filter(c => c.pickStatus !== bo.emPickStatus.RELEASED));
                    for (let pickListsData of this.pickListsDatas) {
                        for (let line of pickListsData.pickListsLines) {
                            if (line.pickStatus === bo.emPickStatus.RELEASED) {
                                this.releasedLineDatas.add(line);
                            }
                            if (line.pickStatus === bo.emPickStatus.PARTIALLYPICKED || line.pickStatus === bo.emPickStatus.PICKED) {
                                this.pickedLineDatas.add(line);
                            }
                        }
                    }
                    this.onViewDimensionChange(false);
                }
                showProcessingData(datas: app.IPickListsTarget[], beDeleteds?: app.IPickListsTarget[]): void {
                    if (!(datas instanceof ibas.ArrayList)) {
                        this.processingDatas = new ibas.ArrayList();
                        this.processingDatas.add(datas);
                    } else {
                        this.processingDatas = datas;
                    }
                    if (beDeleteds instanceof Array) {
                        for (let beDeleted of beDeleteds) {
                            this.processingDatas.remove(beDeleted);
                        }
                    }
                    let index: number = 1;
                    for (let processingData of this.processingDatas) {
                        processingData["#"] = index++;
                    }
                    let firstVisibleRow: number = this.processingTable.getFirstVisibleRow();
                    this.processingTable.setModel(new sap.extension.model.JSONModel({ rows: this.processingDatas }));
                    this.processingTable.setFirstVisibleRow(firstVisibleRow);
                }
                /** 下达拣配 */
                releasePickLists(datas: ibas.IList<app.IPickListsTarget>): void {
                    let that: this = this;
                    if (datas.length === 0) {
                        (<any>this.application).messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                            ibas.i18n.prop("em_documentstatus_released")
                        ));
                        return;
                    }
                    if (!!datas.firstOrDefault(c => !(ibas.numbers.valueOf(c.releasedQuantity) > 0))) {
                        (<any>this.application).messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_msg_release_picklists_need_quantity"));
                        return;
                    }
                    let formTop: sap.ui.layout.form.SimpleForm;
                    let pickLists: bo.PickLists = new bo.PickLists();
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        contentWidth: "30rem",
                        title: ibas.i18n.prop(["em_documentstatus_released", "bo_picklists"]),
                        type: sap.m.DialogType.Standard,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            formTop = new sap.ui.layout.form.SimpleForm("", {
                                editable: true,
                                content: [
                                    new sap.m.Toolbar("", { visible: false }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_pickdate") }),
                                    new sap.extension.m.DatePicker("", {
                                        required: true
                                    }).bindProperty("bindingValue", {
                                        path: "/pickDate",
                                        type: new sap.extension.data.Date(),
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_dataowner") }),
                                    new sap.extension.m.DataOwnerInput("", {
                                        showValueHelp: true,
                                        organization: {
                                            path: "/organization",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            })
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "/dataOwner",
                                        type: new sap.extension.data.Numeric()
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_picker") }),
                                    new sap.extension.m.Input("", {
                                    }).bindProperty("bindingValue", {
                                        path: "/picker",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 8
                                        }),
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_remarks") }),
                                    new sap.extension.m.TextArea("", {
                                        rows: 3,
                                    }).bindProperty("bindingValue", {
                                        path: "/remarks",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                ]
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_confirm"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    dialog.setBusy(true);
                                    that.fireViewEvents(that.releasePickListsEvent, pickLists, datas, (error) => {
                                        if (!!error) {
                                            dialog.setBusy(false);
                                        } else {
                                            that.showProcessingData(that.processingDatas, datas);
                                            dialog.close();
                                        }
                                    });
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    formTop.setModel(new sap.extension.model.JSONModel(pickLists));
                    dialog.open();
                }
                /** 显示拣配者 */
                showPickers(datas: ibas.IServiceAgent[]): void {
                    this.quickToMenu.setModel(new sap.extension.model.JSONModel(datas));
                }
                onViewDimensionChange(refreshColumns: boolean = true): void {
                    if (!!refreshColumns) {
                        this.releasedTable.removeAllColumns();
                        this.pickedTable.removeAllColumns();
                        if (this.workingData.viewDimension === app.emPickViewDimension.TOTAL) {
                            for (let column of this.pickTotalColumns()) {
                                this.releasedTable.addColumn(column);
                            }
                            for (let column of this.pickTotalColumns()) {
                                this.pickedTable.addColumn(column);
                            }
                        } else {
                            for (let column of this.pickDetailsColumns(false)) {
                                this.releasedTable.addColumn(column);
                            }
                            for (let column of this.pickDetailsColumns(true)) {
                                this.pickedTable.addColumn(column);
                            }
                        }
                    }
                    if (this.pickListsDatas instanceof Array) {
                        if (this.workingData.viewDimension === app.emPickViewDimension.TOTAL) {
                            this.releasedTable.setModel(new sap.extension.model.JSONModel({ rows: this.releasedDatas }));
                            this.pickedTable.setModel(new sap.extension.model.JSONModel({ rows: this.pickedDatas }));
                        } else {
                            this.releasedTable.setModel(new sap.extension.model.JSONModel({ rows: this.releasedLineDatas }));
                            this.pickedTable.setModel(new sap.extension.model.JSONModel({ rows: this.pickedLineDatas }));
                        }
                    }
                }
                pickTotalColumns(): sap.extension.table.DataColumn[] {
                    return [
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklists_objectkey"),
                            template: new sap.extension.m.DataLink("", {
                                objectCode: {
                                    path: "objectCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }
                            }).bindProperty("bindingValue", {
                                path: "objectKey",
                                type: new sap.extension.data.Numeric(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklists_pickdate"),
                            template: new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "pickDate",
                                type: new sap.extension.data.Date(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklists_picker"),
                            template: new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "picker",
                                type: new sap.extension.data.Alphanumeric(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklists_dataowner"),
                            template: new sap.extension.m.UserInput("", {
                            }).bindProperty("bindingValue", {
                                path: "dataOwner",
                                type: new sap.extension.data.Numeric(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklists_remarks"),
                            template: new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric(),
                            }),
                            width: "100%"
                        }),
                    ];
                }
                pickDetailsColumns(showPickedColumn: boolean): sap.extension.table.DataColumn[] {
                    return [
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklists_objectkey"),
                            template: new sap.extension.m.DataLink("", {
                                objectCode: {
                                    path: "objectCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }
                            }).bindProperty("bindingValue", {
                                path: "objectKey",
                                type: new sap.extension.data.Numeric(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklistsline_lineid"),
                            template: new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "lineId",
                                type: new sap.extension.data.Numeric(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklistsline_basedocument"),
                            template: new sap.extension.m.Link("", {
                                press(this: sap.m.Link): void {
                                    let data: any = this.getBindingContext().getObject();
                                    if (data instanceof bo.PickListsLine && data.baseDocumentEntry > 0) {
                                        ibas.servicesManager.runLinkService({
                                            boCode: data.baseDocumentType,
                                            linkValue: data.baseDocumentEntry.toString()
                                        });
                                    }
                                }
                            }).bindProperty("bindingValue", {
                                parts: [
                                    {
                                        path: "baseDocumentType",
                                        type: new sap.extension.data.Alphanumeric(),
                                    },
                                    {
                                        path: "baseDocumentEntry",
                                        type: new sap.extension.data.Numeric(),
                                    },
                                    {
                                        path: "baseDocumentLineId",
                                        type: new sap.extension.data.Numeric(),
                                    }
                                ],
                                formatter(type: string, entry: number, lineId: number): string {
                                    if (ibas.strings.isEmpty(type)) {
                                        return undefined;
                                    }
                                    if (lineId > 0) {
                                        return ibas.strings.format("{0}-{1}-{2}", ibas.businessobjects.describe(type), entry, lineId);
                                    }
                                    return ibas.strings.format("{0}-{1}", ibas.businessobjects.describe(type), entry);
                                }
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklistsline_deliverydate"),
                            template: new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "deliveryDate",
                                type: new sap.extension.data.Date(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklistsline_itemcode"),
                            template: new sap.extension.m.DataLink("", {
                                objectCode: bo.Material.BUSINESS_OBJECT_CODE
                            }).bindProperty("bindingValue", {
                                path: "itemCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 50
                                }),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklistsline_itemdescription"),
                            template: new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "itemDescription",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                }),
                            }),
                        }),
                        // new sap.extension.table.DataColumn("", {
                        //     label: ibas.i18n.prop("bo_picklistsline_uom"),
                        //     template: new sap.extension.m.Text("", {
                        //     }).bindProperty("bindingValue", {
                        //         path: "uom",
                        //         type: new sap.extension.data.Alphanumeric({
                        //             maxLength: 8
                        //         }),
                        //     }),
                        // }),
                        // new sap.extension.table.DataColumn("", {
                        //     label: ibas.i18n.prop("bo_picklistsline_inventoryuom"),
                        //     template: new sap.extension.m.Text("", {
                        //     }).bindProperty("bindingValue", {
                        //         path: "inventoryUOM",
                        //         type: new sap.extension.data.Alphanumeric({
                        //             maxLength: 8
                        //         }),
                        //     }),
                        // }),
                        // new sap.extension.table.DataColumn("", {
                        //     label: ibas.i18n.prop("bo_picklistsline_uomrate"),
                        //     template: new sap.extension.m.Text("", {
                        //     }).bindProperty("bindingValue", {
                        //         path: "uomRate",
                        //         type: new sap.extension.data.Rate(),
                        //     }),
                        // }),
                        new sap.extension.table.DataColumn("", {
                            label: ibas.i18n.prop("bo_picklistsline_warehouse"),
                            template: new sap.extension.m.DataLink("", {
                                objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE
                            }).bindProperty("bindingValue", {
                                path: "warehouse",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            visible: !showPickedColumn,
                            label: ibas.i18n.prop("bo_picklistsline_inventoryquantity"),
                            template: new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "quantity",
                                type: new sap.extension.data.Quantity(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            visible: showPickedColumn,
                            label: ibas.i18n.prop("bo_picklistsline_inventoryquantity"),
                            template: new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "inventoryQuantity",
                                type: new sap.extension.data.Quantity(),
                            }),
                        }),
                        new sap.extension.table.DataColumn("", {
                            visible: showPickedColumn,
                            label: ibas.i18n.prop("bo_picklistsline_pickquantity"),
                            template: new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "pickQuantity",
                                type: new sap.extension.data.Quantity(),
                            }),
                        }),
                    ];
                }
            }
            /** 视图-拣配清单设置 */
            export class PickListsSettingView extends ibas.DialogView implements app.IPickListsSettingView {
                confirmEvent: Function;
                draw(): any {
                    let that: this = this;
                    this.formTop = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", {
                                text: ibas.i18n.prop("shell_data_status"),
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData("", {
                                    weight: 3
                                })
                            }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: app.emPickViewStatus,
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData("", {
                                    weight: 7
                                })
                            }).bindProperty("bindingValue", {
                                path: "/status",
                                type: new sap.extension.data.Enum({
                                    enumType: app.emPickViewStatus
                                }),
                            }),
                            new sap.m.Label("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData("", {
                                    weight: 3
                                })
                            }),
                            this.pickBox = new sap.m.VBox("", {
                                items: [
                                ],
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData("", {
                                    weight: 7
                                })
                            }),
                        ]
                    });
                    let formWarehouse: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_warehouse") }),
                            this.tableWarehouse = new sap.extension.table.DataTable("", {
                                enableSelectAll: true,
                                visibleRowCount: sap.extension.table.visibleRowCount(8),
                                dataInfo: {
                                    code: bo.Warehouse.BUSINESS_OBJECT_CODE,
                                    name: bo.Warehouse.name
                                },
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        width: "100%",
                                        label: ibas.i18n.prop("bo_warehouse_code"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                                        }).bindProperty("bindingValue", {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric()
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        width: "100%",
                                        label: ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric()
                                        }),
                                    }),
                                ]
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                        ]
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        contentWidth: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? undefined : "50%",
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.formTop,
                            formWarehouse,
                            formBottom
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_confirm"),
                                press(): void {
                                    that.confirm();
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                press(): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            })
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }
                protected formTop: sap.ui.layout.form.SimpleForm;
                protected tableWarehouse: sap.extension.table.DataTable;
                protected pickBox: sap.m.VBox;
                /** 确认 */
                confirm(): void {
                    this.fireViewEvents(this.confirmEvent, this.tableWarehouse.getSelecteds<bo.Warehouse>());
                }
                /** 显示数据 */
                showWorkingData(data: app.PickListsWorking): void {
                    this.formTop.setModel(new sap.extension.model.JSONModel(data));
                    this.formTop.bindObject("/");
                    let hBox: sap.m.HBox;
                    for (let item of data.items) {
                        let checkBox: sap.extension.m.TipsCheckBox = new sap.extension.m.TipsCheckBox("", {
                            text: item.name,
                            tipsOnSelection: item.name,
                            layoutData: new sap.m.FlexItemData("", {
                                growFactor: 1,
                            })
                        }).bindProperty("bindingValue", {
                            path: "/enable",
                            type: new sap.extension.data.YesNo()
                        });
                        checkBox.setModel(new sap.extension.model.JSONModel(item));
                        if (ibas.objects.isNull(hBox)) {
                            hBox = new sap.m.HBox("", {
                                // justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    checkBox
                                ]
                            });
                            this.pickBox.addItem(hBox);
                        } else {
                            hBox.addItem(checkBox);
                        }
                    }
                }
                /** 显示仓库 */
                showWarehouse(datas: materials.bo.Warehouse[]): void {
                    this.tableWarehouse.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    setTimeout(() => {
                        this.tableWarehouse.selectAll();
                    }, 100);
                }
            }
        }
    }
}