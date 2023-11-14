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
            export class MaterialInventoryListView extends ibas.View implements app.IMaterialInventoryListView {
                /** 查询物料 */
                fetchMaterialEvent: Function;
                /** 查询物料库存交易记录 */
                fetchInventoryJournalEvent: Function;
                /** 查询物料订购交易记录 */
                fetchOrderedJournalEvent: Function;
                /** 查询物料承诺交易记录 */
                fetchCommitedJournalEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.treeMaterials = new sap.extension.m.Tree("", {
                        mode: sap.m.ListMode.SingleSelectLeft,
                        items: {
                            path: "/",
                            parameters: {
                                arrayNames: [
                                    "warehouses",
                                ]
                            },
                            templateShareable: false,
                            template: new sap.m.StandardTreeItem("", {
                                title: {
                                    parts: [
                                        {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
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
                                type: sap.m.ListType.Inactive,
                            }),
                        },
                        selectionChange(oEvent: sap.ui.base.Event): void {
                            let oItem: sap.m.StandardTreeItem = oEvent.getParameter("listItem");
                            let data: any = oItem.getBindingContext().getObject();
                            if (data instanceof app.MaterialsWarehouse) {
                                if (that.buttonInventory.getSelectedKey() === "ONHAND") {
                                    that.fireViewEvents(that.fetchInventoryJournalEvent, data.code);
                                } else if (that.buttonInventory.getSelectedKey() === "ONORDERED") {
                                    that.fireViewEvents(that.fetchOrderedJournalEvent, data.code);
                                } else if (that.buttonInventory.getSelectedKey() === "ONCOMMITED") {
                                    that.fireViewEvents(that.fetchCommitedJournalEvent, data.code);
                                }
                            } else if (data instanceof bo.Warehouse) {
                                let parent: any = oItem.getParentNode()?.getBindingContext()?.getObject();
                                if (that.buttonInventory.getSelectedKey() === "ONHAND") {
                                    that.fireViewEvents(that.fetchInventoryJournalEvent, parent?.code, data.code);
                                } else if (that.buttonInventory.getSelectedKey() === "ONORDERED") {
                                    that.fireViewEvents(that.fetchOrderedJournalEvent, parent?.code, data.code);
                                } else if (that.buttonInventory.getSelectedKey() === "ONCOMMITED") {
                                    that.fireViewEvents(that.fetchCommitedJournalEvent, parent?.code, data.code);
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
                                label: ibas.i18n.prop("bo_materialinventoryjournal_documentdate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "documentDate",
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
                                label: ibas.i18n.prop("bo_materialinventoryjournal_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
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
                            new sap.m.Page("", {
                                showHeader: false,
                                subHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Button("", {
                                            icon: "sap-icon://slim-arrow-right",
                                            type: sap.m.ButtonType.Transparent,
                                            press(this: sap.m.Button): void {
                                                if (this.getIcon() === "sap-icon://slim-arrow-right") {
                                                    that.treeMaterials.expandToLevel(1);
                                                    this.setIcon("sap-icon://slim-arrow-down");
                                                } else {
                                                    that.treeMaterials.collapseAll();
                                                    this.setIcon("sap-icon://slim-arrow-right");
                                                }
                                            }
                                        }),
                                        new sap.m.SearchField("", {
                                            search(oEvent: sap.ui.base.Event): void {
                                                let query: string = oEvent.getParameter("query");
                                                if (!ibas.strings.isEmpty(query)) {
                                                    let criteria: ibas.ICriteria = new ibas.Criteria();
                                                    let condition: ibas.ICondition = criteria.conditions.create();
                                                    condition.alias = bo.Material.PROPERTY_CODE_NAME;
                                                    condition.value = query;
                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                    condition = criteria.conditions.create();
                                                    condition.alias = bo.Material.PROPERTY_NAME_NAME;
                                                    condition.value = query;
                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                    condition.relationship = ibas.emConditionRelationship.OR;
                                                    that.fireViewEvents(that.fetchMaterialEvent, criteria);
                                                } else {
                                                    that.fireViewEvents(that.fetchMaterialEvent);
                                                }
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            icon: "sap-icon://filter",
                                            type: sap.m.ButtonType.Transparent,
                                        }),
                                    ]
                                }),
                                content: [
                                    this.treeMaterials
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
                                                (<any>that.treeMaterials).fireSelectionChange({ listItem: that.treeMaterials.getSelectedItem() });
                                            }
                                        })
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
                private pageInventory: sap.m.Page;
                private treeMaterials: sap.extension.m.Tree;
                private tableInventoryJournal: sap.extension.table.Table;
                private tableOrderedJournal: sap.extension.table.Table;
                private tableCommitedJournal: sap.extension.table.Table;
                private buttonInventory: sap.m.SegmentedButton;
                private container: sap.m.NavContainer;

                showMaterials(datas: app.MaterialsWarehouse[], type?: string): void {
                    this.treeMaterials.setModel(new sap.extension.model.JSONModel(datas));
                    if (datas.length === 1) {
                        setTimeout(() => {
                            if (!ibas.strings.isEmpty(type)) {
                                this.buttonInventory.setSelectedKey(type);
                            }
                            this.treeMaterials.expandToLevel(1);
                            if (this.treeMaterials.getItems().length === 2) {
                                this.treeMaterials.setSelectedItem(this.treeMaterials.getItems()[1]);
                                (<any>this.treeMaterials).fireSelectionChange({ listItem: this.treeMaterials.getSelectedItem() });
                            } else {
                                this.treeMaterials.setSelectedItem(this.treeMaterials.getItems()[0]);
                                (<any>this.treeMaterials).fireSelectionChange({ listItem: this.treeMaterials.getSelectedItem() });
                            }
                        }, 100);
                    }
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