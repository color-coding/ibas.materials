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
             * 列表视图-物料批次
             */
            export class MaterialBatchListView extends ibas.BOQueryViewWithPanel implements app.IMaterialBatchListView {
                newDataEvent: Function;
                viewDataEvent: Function;
                get autoQuery(): boolean {
                    return false;
                }
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialBatch;
                }
                /** 查询物料批次交易记录 */
                fetchDataJournalEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableBatch = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: {
                                    path: "batchCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                                number: {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity(),
                                },
                                markers: new sap.m.ObjectMarker("", {
                                    type: {
                                        path: "locked",
                                        formatter(data: any): any {
                                            if (data === ibas.emYesNo.YES) {
                                                return sap.m.ObjectMarkerType.Locked;
                                            } else {
                                                return null;
                                            }
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatch_itemcode"),
                                        bindingValue: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        wrapping: false,
                                        showValueLink: true,
                                        valueLinkRequest(): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.MaterialBatch && !ibas.strings.isEmpty(data.itemCode)) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: bo.Material.BUSINESS_OBJECT_CODE,
                                                    linkValue: data.itemCode,
                                                });
                                            }
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatch_itemdescription"),
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Material,
                                            key: bo.Material.PROPERTY_CODE_NAME,
                                            text: bo.Material.PROPERTY_NAME_NAME
                                        },
                                        wrapping: false,
                                        showValueLink: false,
                                        bindingValue: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatch_warehouse"),
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Warehouse,
                                            key: bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: bo.Warehouse.PROPERTY_NAME_NAME
                                        },
                                        wrapping: false,
                                        bindingValue: {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                ]
                            })
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
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        },
                        selectionChange(oEvent: sap.ui.base.Event): void {
                            let oItem: sap.m.ObjectListItem = oEvent.getParameter("listItem");
                            let data: any = oItem.getBindingContext().getObject();
                            if (data instanceof bo.MaterialBatch) {
                                that.fireViewEvents(that.fetchDataJournalEvent, data, that.dateFrom.getDateValue(), that.dateTo.getDateValue());
                            }
                        },
                    });
                    this.pageBatch = new sap.m.Page("", {
                        showHeader: false,
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.viewDataEvent, that.tableBatch.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableBatch
                        ]
                    });
                    this.tableBatchJournal = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchjournal_direction"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "direction",
                                    type: new sap.extension.data.Direction(true)
                                }),
                                width: "6rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchjournal_deliverydate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "deliveryDate",
                                    type: new sap.extension.data.Date()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchjournal_basedocumenttype"),
                                template: new sap.extension.m.DataLink("", {
                                    press(this: sap.f.cards.Header): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof bo.MaterialBatchJournal && data.baseDocumentEntry > 0) {
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
                                label: ibas.i18n.prop("bo_materialbatchjournal_warehouse"),
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
                                label: ibas.i18n.prop("bo_materialbatchjournal_quantity_in"),
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
                                        if (quantity === 0) {
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
                                label: ibas.i18n.prop("bo_materialbatchjournal_quantity_out"),
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
                                        if (quantity === 0) {
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
                                label: ibas.i18n.prop("bo_materialbatchjournal_price"),
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
                                label: ibas.i18n.prop("bo_materialbatchjournal_calculatedprice"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "calculatedPrice",
                                    type: new sap.extension.data.Price()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchjournal_transactionvalue"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "transactionValue",
                                    type: new sap.extension.data.Sum()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchjournal_inventoryquantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "inventoryQuantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialbatchjournal_inventoryvalue"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "inventoryValue",
                                    type: new sap.extension.data.Sum()
                                }),
                            }),
                        ],
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                            highlight: {
                                parts: [
                                    {
                                        path: "direction",
                                    },
                                    {
                                        path: "quantity",
                                        type: new sap.extension.data.Quantity()
                                    }
                                ],
                                formatter(direction: ibas.emDirection, quantity: number): sap.ui.core.ValueState {
                                    if (quantity <= 0) {
                                        return sap.ui.core.ValueState.Error;
                                    }
                                    if (direction === ibas.emDirection.IN) {
                                        return sap.ui.core.ValueState.Success;
                                    }
                                    return sap.ui.core.ValueState.Warning;
                                }
                            }
                        })
                    });
                    this.pageBatchJournal = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.SegmentedButton("", {
                                    items: [
                                        new sap.m.SegmentedButtonItem("", {
                                            key: "ONHAND",
                                            icon: "sap-icon://insurance-house",
                                            text: ibas.i18n.prop("bo_materialinventory_onhand"),
                                        }),
                                    ],
                                    width: "6rem"
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
                                        (<any>that.tableBatch).fireSelectionChange({ listItem: that.tableBatch.getSelectedItem() });
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableBatchJournal
                        ],
                        showFooter: true,
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Label("", {
                                    showColon: true,
                                    text: ibas.i18n.prop("materials_material_inventories"),
                                }),
                                this.txtInventories = new sap.m.Text("", {
                                }).addStyleClass("sapUiTinyMarginBegin"),
                            ]
                        }),
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageBatch,
                        ],
                        detailPages: [
                            this.pageBatchJournal
                        ],
                    });
                }
                private pageBatch: sap.m.Page;
                private tableBatch: sap.extension.m.List;
                private dateFrom: sap.m.DatePicker;
                private dateTo: sap.m.DatePicker;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageBatch.addHeaderContent(view);
                    this.pageBatch.setShowHeader(true);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableBatch.setBusy(true);
                        this.tableBatch.setModel(null);
                    }
                }

                /** 显示物料批次数据 */
                showDatas(datas: bo.MaterialBatch[]): void {
                    let model: sap.ui.model.Model = this.tableBatch.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableBatch.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        if (datas.length === 1) {
                            setTimeout(() => {
                                this.tableBatch.setSelectedItem(this.tableBatch.getItems()[0]);
                                (<any>this.tableBatch).fireSelectionChange({ listItem: this.tableBatch.getSelectedItem() });
                            }, 100);
                        }
                    }
                    this.tableBatch.setBusy(false);
                }
                private pageBatchJournal: sap.m.Page;
                private tableBatchJournal: sap.extension.table.Table;
                private txtInventories: sap.m.Text;

                /** 显示物料批次交易数据 */
                showDataJournals(datas: bo.MaterialBatchJournal[]): void {
                    this.tableBatchJournal.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    setTimeout(() => {
                        let total: number = 0;
                        datas.forEach(c => total += c.quantity);
                        this.txtInventories.setText(sap.extension.data.formatValue(sap.extension.data.Quantity, total, "string"));
                    }, 30);
                }
            }
        }
    }
}