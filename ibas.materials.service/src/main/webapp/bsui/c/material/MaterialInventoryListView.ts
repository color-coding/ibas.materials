/*
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /**
             * 列表视图-物料库存
             */
            export class MaterialInventoryListView extends ibas.BOQueryViewWithPanel implements app.IMaterialInventoryListView {
                newDataEvent: Function;
                viewDataEvent: Function;
                get autoQuery(): boolean {
                    return false;
                }
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Material;
                }
                /** 查询物料库存交易记录 */
                fetchInventoryJournalEvent: Function;
                /** 查询物料订购交易记录 */
                fetchOrderedJournalEvent: Function;
                /** 查询物料承诺交易记录 */
                fetchCommitedJournalEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableMaterial = new sap.extension.m.List("", {
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            templateShareable: true,
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    new sap.m.Panel("", {
                                        expandable: true,
                                        expanded: false,
                                        headerToolbar: new sap.m.Toolbar("", {
                                            design: sap.m.ToolbarDesign.Transparent,
                                            style: sap.m.ToolbarStyle.Clear,
                                            content: [
                                                new sap.m.Text("", {
                                                    text: {
                                                        parts: [
                                                            {
                                                                path: "code",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                            },
                                                            {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                            }
                                                        ],
                                                        formatter(code: string, name: string): string {
                                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                            builder.map(null, "");
                                                            builder.map(undefined, "");
                                                            builder.append(code);
                                                            builder.append(" - ");
                                                            builder.append(name);
                                                            return builder.toString();
                                                        }
                                                    },
                                                }),
                                            ]
                                        }),
                                        content: [
                                            new sap.m.VBox("", {
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                renderType: sap.m.FlexRendertype.Bare,
                                                items: {
                                                    path: "warehouses",
                                                    templateShareable: false,
                                                    template: new sap.m.RadioButton("", {
                                                        text: {
                                                            parts: [
                                                                {
                                                                    path: "code",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                                {
                                                                    path: "name",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }
                                                            ],
                                                            formatter(code: string, name: string): string {
                                                                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                                builder.map(null, "");
                                                                builder.map(undefined, "");
                                                                builder.append(code);
                                                                builder.append(" - ");
                                                                builder.append(name);
                                                                return builder.toString();
                                                            }
                                                        },
                                                        select(this: sap.m.RadioButton, event: sap.ui.base.Event): void {
                                                            if ((<any>event.getSource()).getSelected() === true) {
                                                                let item: any = (<any>event.getSource())?.getParent()?.getParent()?.getParent();
                                                                if (item instanceof sap.m.CustomListItem) {
                                                                    setTimeout(() => {
                                                                        that.tableMaterial.setSelectedItem(item);
                                                                        (<any>that.tableMaterial).fireSelectionChange({ listItem: item });
                                                                    }, 100);
                                                                }
                                                            }
                                                        }
                                                    }),
                                                }
                                            }),
                                        ]
                                    }),
                                ],
                                type: sap.m.ListType.Inactive,
                            }),
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data.material);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        },
                        selectionChange(oEvent: sap.ui.base.Event): void {
                            let oItem: sap.m.CustomListItem = oEvent.getParameter("listItem");
                            let data: any = oItem.getBindingContext().getObject();
                            let done: boolean = false;
                            for (let item of oItem.getContent()) {
                                if (item instanceof sap.m.Panel) {
                                    if (item.getExpanded() !== true) {
                                        continue;
                                    }
                                    for (let sItem of item.getContent()) {
                                        if (sItem instanceof sap.m.VBox) {
                                            for (let vItem of sItem.getItems()) {
                                                if (vItem instanceof sap.m.RadioButton) {
                                                    if (vItem.getSelected() === true) {
                                                        data = vItem.getBindingContext().getObject();
                                                        done = true;
                                                    }
                                                }
                                                if (done === true) {
                                                    break;
                                                }
                                            }
                                        }
                                        if (done === true) {
                                            break;
                                        }
                                    }
                                }
                                if (done === true) {
                                    break;
                                }
                            }
                            if (data instanceof app.MaterialsWarehouse) {
                                if (that.buttonInventory.getSelectedKey() === "ONHAND") {
                                    that.fireViewEvents(that.fetchInventoryJournalEvent, data.code);
                                } else if (that.buttonInventory.getSelectedKey() === "ONORDERED") {
                                    that.fireViewEvents(that.fetchOrderedJournalEvent, data.code);
                                } else if (that.buttonInventory.getSelectedKey() === "ONCOMMITED") {
                                    that.fireViewEvents(that.fetchCommitedJournalEvent, data.code);
                                }
                            } else if (data instanceof bo.Warehouse) {
                                let parent: any = oItem.getBindingContext().getObject();
                                if (that.buttonInventory.getSelectedKey() === "ONHAND") {
                                    that.fireViewEvents(that.fetchInventoryJournalEvent, parent?.code, data.code, that.dateFrom.getDateValue(), that.dateTo.getDateValue());
                                } else if (that.buttonInventory.getSelectedKey() === "ONORDERED") {
                                    that.fireViewEvents(that.fetchOrderedJournalEvent, parent?.code, data.code, that.dateFrom.getDateValue(), that.dateTo.getDateValue());
                                } else if (that.buttonInventory.getSelectedKey() === "ONCOMMITED") {
                                    that.fireViewEvents(that.fetchCommitedJournalEvent, parent?.code, data.code, that.dateFrom.getDateValue(), that.dateTo.getDateValue());
                                }
                            }
                        },
                    });
                    this.tableInventoryJournal = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_direction"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "direction",
                                    type: new sap.extension.data.Direction(true)
                                }),
                                width: "6rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_deliverydate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "deliveryDate",
                                    type: new sap.extension.data.Date()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumenttype"),
                                template: new sap.extension.m.DataLink("", {
                                    press(this: sap.f.cards.Header): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof bo.MaterialInventoryJournal && data.baseDocumentEntry > 0) {
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
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 30
                                            }),
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
                                        if (ibas.objects.isNull(type) || ibas.objects.isNull(entry)) {
                                            return "";
                                        }
                                        return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                            + (lineId > 0 ? ibas.strings.format(", {0}-{1}", ibas.i18n.prop("bo_goodsissueline_lineid"), lineId) : "");
                                    }
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_warehouse"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "warehouse",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_quantity_in"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "direction",
                                        },
                                        {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity()
                                        }
                                    ],
                                    formatter(direction: ibas.emDirection, quantity: number): string {
                                        if (!(quantity > 0)) {
                                            return undefined;
                                        }
                                        return sap.extension.data.formatValue(sap.extension.data.Quantity,
                                            direction !== ibas.emDirection.IN ? 0 : quantity, "string"
                                        );
                                    }
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_quantity_out"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "direction",
                                        },
                                        {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity()
                                        }
                                    ],
                                    formatter(direction: ibas.emDirection, quantity: number): string {
                                        if (!(quantity > 0)) {
                                            return undefined;
                                        }
                                        return sap.extension.data.formatValue(sap.extension.data.Quantity,
                                            direction !== ibas.emDirection.OUT ? 0 : quantity, "string"
                                        );
                                    }
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_price"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "price",
                                            type: new sap.extension.data.Price()
                                        },
                                        {
                                            path: "currency",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                    ]
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_calculatedprice"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "calculatedPrice",
                                    type: new sap.extension.data.Price()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_transactionvalue"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "transactionValue",
                                    type: new sap.extension.data.Sum()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_inventoryquantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "inventoryQuantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_inventoryvalue"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "inventoryValue",
                                    type: new sap.extension.data.Sum()
                                }),
                            }),
                        ],
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                            highlight: {
                                path: "direction",
                                formatter(direction: ibas.emDirection,): sap.ui.core.ValueState {
                                    if (direction === ibas.emDirection.IN) {
                                        return sap.ui.core.ValueState.Success;
                                    }
                                    return sap.ui.core.ValueState.Error;
                                }
                            }
                        })
                    });
                    this.tableOrderedJournal = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_deliverydate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "deliveryDate",
                                    type: new sap.extension.data.Date()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_basedocumenttype"),
                                template: new sap.extension.m.DataLink("", {
                                    press(this: sap.f.cards.Header): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof bo.MaterialInventoryJournal && data.baseDocumentEntry > 0) {
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
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 30
                                            }),
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
                                        if (ibas.objects.isNull(type) || ibas.objects.isNull(entry)) {
                                            return "";
                                        }
                                        return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                            + (lineId > 0 ? ibas.strings.format(", {0}-{1}", ibas.i18n.prop("bo_goodsissueline_lineid"), lineId) : "");
                                    }
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_warehouse"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "warehouse",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_closedquantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "closedQuantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_reservedquantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "reservedQuantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                        ],
                    });
                    this.tableCommitedJournal = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_deliverydate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "deliveryDate",
                                    type: new sap.extension.data.Date()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_basedocumenttype"),
                                template: new sap.extension.m.DataLink("", {
                                    press(this: sap.f.cards.Header): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof bo.MaterialInventoryJournal && data.baseDocumentEntry > 0) {
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
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 30
                                            }),
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
                                        if (ibas.objects.isNull(type) || ibas.objects.isNull(entry)) {
                                            return "";
                                        }
                                        return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                            + (lineId > 0 ? ibas.strings.format(", {0}-{1}", ibas.i18n.prop("bo_goodsissueline_lineid"), lineId) : "");
                                    }
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_warehouse"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Warehouse,
                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "warehouse",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialestimatejournal_closedquantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "closedQuantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                        ],
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageMaterial = new sap.extension.m.Page("", {
                                showHeader: false,
                                content: [
                                    this.tableMaterial
                                ]
                            }),
                        ],
                        detailPages: [
                            new sap.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    content: [
                                        this.buttonInventory = new sap.m.SegmentedButton("", {
                                            items: [
                                                new sap.m.SegmentedButtonItem("", {
                                                    key: "ONHAND",
                                                    icon: "sap-icon://insurance-house",
                                                    text: ibas.i18n.prop("bo_materialinventory_onhand"),
                                                }),
                                                new sap.m.SegmentedButtonItem("", {
                                                    key: "ONORDERED",
                                                    icon: "sap-icon://shipping-status",
                                                    text: ibas.i18n.prop("bo_materialinventory_onordered"),
                                                }),
                                                new sap.m.SegmentedButtonItem("", {
                                                    key: "ONCOMMITED",
                                                    icon: "sap-icon://retail-store",
                                                    text: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                                }),
                                            ],
                                            selectedKey: "ONHAND",
                                            selectionChange(event: sap.ui.base.Event): void {
                                                let item: any = event.getParameter("item");
                                                let index: number = that.buttonInventory.getItems().indexOf(item);
                                                if (index >= 0) {
                                                    that.container.to(that.container.getPages()[index]);
                                                }
                                                (<any>that.tableMaterial).fireSelectionChange({ listItem: that.tableMaterial.getSelectedItem() });
                                            }
                                        }),
                                        new sap.m.ToolbarSpacer(),
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("materials_date_from_to"),
                                            showColon: true
                                        }),
                                        this.dateFrom = new sap.m.DatePicker("", {
                                            width: "10rem"
                                        }),
                                        this.dateTo = new sap.m.DatePicker("", {
                                            width: "10rem"
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            icon: "sap-icon://refresh",
                                            press: function (): void {
                                                (<any>that.tableMaterial).fireSelectionChange({ listItem: that.tableMaterial.getSelectedItem() });
                                            }
                                        }),
                                    ]
                                }),
                                content: [
                                    this.container = new sap.m.NavContainer("", {
                                        height: "100%",
                                        autoFocus: false,
                                        defaultTransitionName: "baseSlide",
                                        pages: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                content: [
                                                    this.tableInventoryJournal
                                                ]
                                            }),
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                content: [
                                                    this.tableOrderedJournal,
                                                ]
                                            }),
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                content: [
                                                    this.tableCommitedJournal,
                                                ]
                                            }),
                                        ]
                                    }),
                                ]
                            })
                        ],
                    });
                }
                private pageMaterial: sap.extension.m.Page;
                private tableMaterial: sap.extension.m.List;
                private tableInventoryJournal: sap.extension.table.Table;
                private tableOrderedJournal: sap.extension.table.Table;
                private tableCommitedJournal: sap.extension.table.Table;
                private buttonInventory: sap.m.SegmentedButton;
                private container: sap.m.NavContainer;
                private dateFrom: sap.m.DatePicker;
                private dateTo: sap.m.DatePicker;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        let that: this = this;
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                        view.insertContent(new sap.m.Button("", {
                            icon: "sap-icon://slim-arrow-right",
                            type: sap.m.ButtonType.Transparent,
                            press(this: sap.m.Button): void {
                                if (this.getIcon() === "sap-icon://slim-arrow-right") {
                                    for (let item of that.tableMaterial.getItems()) {
                                        if (item instanceof sap.m.CustomListItem) {
                                            for (let sItem of item.getContent()) {
                                                if (sItem instanceof sap.m.Panel) {
                                                    if (sItem.getExpandable()) {
                                                        sItem.setExpanded(true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    this.setIcon("sap-icon://slim-arrow-down");
                                } else {
                                    for (let item of that.tableMaterial.getItems()) {
                                        if (item instanceof sap.m.CustomListItem) {
                                            for (let sItem of item.getContent()) {
                                                if (sItem instanceof sap.m.Panel) {
                                                    if (sItem.getExpandable()) {
                                                        sItem.setExpanded(false);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    this.setIcon("sap-icon://slim-arrow-right");
                                }
                            }
                        }), 0);
                    }
                    this.pageMaterial.addHeaderContent(view);
                    this.pageMaterial.setShowHeader(true);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableMaterial.setBusy(true);
                        this.tableMaterial.setModel(null);
                    }
                }

                showDatas(datas: app.MaterialsWarehouse[], type?: string): void {
                    let model: sap.ui.model.Model = this.tableMaterial.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableMaterial.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        if (datas.length === 1 && datas[0]?.warehouses.length === 1) {
                            setTimeout(() => {
                                this.tableMaterial.setSelectedItem(this.tableMaterial.getItems()[0]);
                                (<any>this.tableMaterial).fireSelectionChange({ listItem: this.tableMaterial.getSelectedItem() });
                            }, 100);
                        }
                    }
                    this.tableMaterial.setBusy(false);
                }
                /** 显示物料库存交易数据 */
                showInventoryJournals(datas: bo.MaterialInventoryJournal[]): void {
                    this.container.to(this.tableInventoryJournal.getParent().getId());
                    this.tableInventoryJournal.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料订购交易数据 */
                showOrderedJournals(datas: bo.MaterialEstimateJournal[]): void {
                    this.container.to(this.tableOrderedJournal.getParent().getId());
                    this.tableOrderedJournal.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料承诺交易数据 */
                showCommitedJournals(datas: bo.MaterialEstimateJournal[]): void {
                    this.container.to(this.tableCommitedJournal.getParent().getId());
                    this.tableCommitedJournal.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}