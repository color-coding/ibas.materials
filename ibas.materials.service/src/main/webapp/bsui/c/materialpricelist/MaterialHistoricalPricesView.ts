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
            /** 视图-物料毛利润 */
            export class MaterialHistoricalPricesView extends ibas.DialogView implements app.IMaterialHistoricalPricesView {
                /** 应用价格事件 */
                applyEvent: Function;
                /** 获取单据代理 */
                obtainDocumentAgentsEvent: Function;
                /** 查询单据数据事件 */
                fetchDocumentDatasEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        contentHeight: "auto",
                        contentWidth: "80%",
                        content: [
                            new sap.m.VBox("", {
                                renderType: sap.m.FlexRendertype.Bare,
                                alignItems: sap.m.FlexAlignItems.Stretch,
                                alignContent: sap.m.FlexAlignItems.Stretch,
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                items: [
                                    new sap.m.HBox("", {
                                        width: "100%",
                                        height: "100%",
                                        renderType: sap.m.FlexRendertype.Div,
                                        alignItems: sap.m.FlexAlignItems.Stretch,
                                        alignContent: sap.m.FlexAlignItems.Stretch,
                                        justifyContent: sap.m.FlexJustifyContent.Start,
                                        items: [
                                            new sap.m.VBox("", {
                                                width: "100%",
                                                height: "100%",
                                                renderType: sap.m.FlexRendertype.Bare,
                                                alignItems: sap.m.FlexAlignItems.Stretch,
                                                alignContent: sap.m.FlexAlignItems.Stretch,
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                items: [
                                                    new sap.m.OverflowToolbar("", {
                                                        content: [
                                                            this.bpButton = new sap.m.SegmentedButton("", {
                                                                items: [
                                                                ],
                                                                selectionChange(event: sap.ui.base.Event): void {
                                                                    if (that.bpButton.getSelectedKey() === "CUSTOMER") {
                                                                        that.fireViewEvents(that.obtainDocumentAgentsEvent, businesspartner.bo.emBusinessPartnerType.CUSTOMER, ibas.numbers.valueOf(that.countInput.getValue()));
                                                                    } else if (that.bpButton.getSelectedKey() === "SUPPLIER") {
                                                                        that.fireViewEvents(that.obtainDocumentAgentsEvent, businesspartner.bo.emBusinessPartnerType.SUPPLIER, ibas.numbers.valueOf(that.countInput.getValue()));
                                                                    } else {
                                                                        for (let item of that.bpButton.getItems()) {
                                                                            if (item.getKey() === that.bpButton.getSelectedKey()) {
                                                                                if (item.getIcon() === "sap-icon://customer") {
                                                                                    that.fireViewEvents(that.obtainDocumentAgentsEvent, businesspartner.bo.emBusinessPartnerType.CUSTOMER, ibas.numbers.valueOf(that.countInput.getValue()), item.getKey());
                                                                                } else if (item.getIcon() === "sap-icon://supplier") {
                                                                                    that.fireViewEvents(that.obtainDocumentAgentsEvent, businesspartner.bo.emBusinessPartnerType.SUPPLIER, ibas.numbers.valueOf(that.countInput.getValue()), item.getKey());
                                                                                } break;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                    this.docToolbar = new sap.m.OverflowToolbar("", {
                                                        content: {
                                                            path: "/",
                                                            template: new sap.m.ToggleButton("", {
                                                                pressed: {
                                                                    path: "description",
                                                                    formatter(data: string): boolean {
                                                                        let documents: string = config.get(config.CONFIG_ITEM_DEFAULT_HISTORICAL_PRICE_DOCUMENTS);
                                                                        if (ibas.strings.isEmpty(documents)) {
                                                                            return true;
                                                                        }
                                                                        for (let item of documents.split(";")) {
                                                                            let description: string = ibas.businessobjects.resource(ibas.businessobjects.name(item));
                                                                            if (description === data) {
                                                                                return true;
                                                                            }
                                                                        }
                                                                        if (documents.indexOf(data) > 0) {
                                                                            return true;
                                                                        }
                                                                        return false;
                                                                    }
                                                                },
                                                                text: {
                                                                    path: "description",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }
                                                            })
                                                        }
                                                    }),
                                                    this.itemToolbar = new sap.m.OverflowToolbar("", {
                                                        content: [
                                                            new sap.m.ToolbarSeparator(),
                                                            new sap.m.Label("", {
                                                                showColon: true,
                                                                text: ibas.i18n.prop("bo_materialhistoricalprice_itemcode")
                                                            }),
                                                            new sap.extension.m.Text("", {
                                                                bindingValue: {
                                                                    path: "/itemCode",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }),
                                                            new sap.m.Label("", {
                                                                textAlign: sap.ui.core.TextAlign.Center,
                                                                text: "-",
                                                                width: "1rem",
                                                            }),
                                                            new sap.extension.m.Text("", {
                                                                bindingValue: {
                                                                    path: "/itemDescription",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                }
                                                            }).addStyleClass("sapUiSmallMarginEnd"),
                                                            new sap.m.Label("", {
                                                                showColon: true,
                                                                text: ibas.i18n.prop("bo_materialhistoricalprice_quantity")
                                                            }).addStyleClass("sapUiSmallMarginBegin"),
                                                            new sap.extension.m.Text("", {
                                                                bindingValue: {
                                                                    parts: [
                                                                        {
                                                                            path: "/quantity",
                                                                            type: new sap.extension.data.Quantity()
                                                                        },
                                                                        {
                                                                            path: "/uom",
                                                                            type: new sap.extension.data.Alphanumeric()
                                                                        }
                                                                    ]
                                                                }
                                                            }).addStyleClass("sapUiSmallMarginEnd"),
                                                            new sap.m.Label("", {
                                                                showColon: true,
                                                                text: ibas.i18n.prop("bo_materialhistoricalprice_documentdate")
                                                            }).addStyleClass("sapUiSmallMarginBegin"),
                                                            new sap.extension.m.Text("", {
                                                                bindingValue: {
                                                                    path: "/documentDate",
                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            }),
                                                            new sap.m.ToolbarSpacer(),
                                                            new sap.m.Label("", {
                                                                showColon: true,
                                                                text: ibas.i18n.prop("bo_materialhistoricalprice_result")
                                                            }),
                                                            this.countInput = new sap.extension.m.Input("", {
                                                                type: sap.m.InputType.Number,
                                                                value: 10,
                                                                width: "4rem",
                                                                change(): void {
                                                                    (<any>that.bpButton).fireSelectionChange({});
                                                                }
                                                            })
                                                        ]
                                                    }),
                                                ]
                                            }),
                                            new sap.m.VBox("", {
                                                width: "10rem",
                                                height: "auto",
                                                renderType: sap.m.FlexRendertype.Div,
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                alignContent: sap.m.FlexAlignItems.Center,
                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                items: [
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://search",
                                                        type: sap.m.ButtonType.Accept,
                                                        text: ibas.i18n.prop("materials_fetch"),
                                                        press(): void {
                                                            let agents: ibas.IList<ibas.IServiceAgent> = new ibas.ArrayList<ibas.IServiceAgent>();
                                                            for (let item of that.docToolbar.getContent()) {
                                                                if (item instanceof sap.m.ToggleButton) {
                                                                    if (item.getPressed()) {
                                                                        agents.add(item.getBindingContext().getObject());
                                                                    }
                                                                }
                                                            }
                                                            that.table.setModel(undefined);
                                                            that.fireViewEvents(that.fetchDocumentDatasEvent, agents);
                                                        },
                                                        width: "8rem",
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    this.table = new sap.extension.table.Table("", {
                                        enableSelectAll: false,
                                        chooseType: ibas.emChooseType.SINGLE,
                                        visibleRowCount: sap.extension.table.visibleRowCount(10),
                                        rows: "{/rows}",
                                        columns: [
                                            this.bpColumn = new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_businesspartner"),
                                                template: new sap.extension.m.Link("", {
                                                    press(): void {
                                                        let data: app.IDocumentMaterialPriceData = this.getBindingContext().getObject();
                                                        if (!ibas.objects.isNull(data)) {
                                                            if (data.businessPartnerType === businesspartner.bo.emBusinessPartnerType.CUSTOMER) {
                                                                ibas.servicesManager.runLinkService({
                                                                    boCode: businesspartner.bo.Customer.BUSINESS_OBJECT_CODE,
                                                                    linkValue: data.businessPartnerCode
                                                                });
                                                            } else if (data.businessPartnerType === businesspartner.bo.emBusinessPartnerType.SUPPLIER) {
                                                                ibas.servicesManager.runLinkService({
                                                                    boCode: businesspartner.bo.Supplier.BUSINESS_OBJECT_CODE,
                                                                    linkValue: data.businessPartnerCode
                                                                });
                                                            }
                                                        }
                                                    }
                                                }).bindProperty("bindingValue", {
                                                    parts: [
                                                        {
                                                            path: "businessPartnerCode",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                        {
                                                            path: "businessPartnerName",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }
                                                    ],
                                                    formatter(code: string, name: string): string {
                                                        if (ibas.strings.isEmpty(name)) {
                                                            return code;
                                                        }
                                                        return ibas.strings.format("{0} - {1}", code, name);
                                                    }
                                                }),
                                                visible: false,
                                                sortProperty: "businessPartnerCode",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_document"),
                                                template: new sap.extension.m.Link("", {
                                                    press(): void {
                                                        let data: app.IDocumentMaterialPriceData = this.getBindingContext().getObject();
                                                        if (!ibas.strings.isEmpty(data.documentType) && data.documentEntry > 0) {
                                                            ibas.servicesManager.runLinkService({
                                                                boCode: data.documentType,
                                                                linkValue: data.documentEntry.toString(),
                                                            });
                                                        }
                                                    }
                                                }).bindProperty("bindingValue", {
                                                    parts: [
                                                        {
                                                            path: "documentType",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                        {
                                                            path: "documentEntry",
                                                            type: new sap.extension.data.Numeric()
                                                        },
                                                        {
                                                            path: "documentLineId",
                                                            type: new sap.extension.data.Numeric()
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
                                                width: "14rem",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_documentdate"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "documentDate",
                                                    type: new sap.extension.data.Date()
                                                }),
                                                width: "8rem",
                                                sortProperty: "documentDate",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_itemcode"),
                                                template: new sap.extension.m.DataLink("", {
                                                    objectCode: bo.Material.BUSINESS_OBJECT_CODE
                                                }).bindProperty("bindingValue", {
                                                    path: "itemCode",
                                                    type: new sap.extension.data.Alphanumeric()
                                                }),
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_itemdescription"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "itemDescription",
                                                    type: new sap.extension.data.Alphanumeric()
                                                }),
                                                width: "14rem",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_quantity"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    parts: [
                                                        {
                                                            path: "quantity",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "uom",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }
                                                    ]
                                                }),
                                                sortProperty: "quantity",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_price"),
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
                                                        }
                                                    ]
                                                }),
                                                sortProperty: "price",
                                                width: "8rem",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_pretaxprice"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    parts: [
                                                        {
                                                            path: "preTaxPrice",
                                                            type: new sap.extension.data.Price()
                                                        },
                                                        {
                                                            path: "currency",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }
                                                    ]
                                                }),
                                                sortProperty: "preTaxPrice",
                                                width: "8rem",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_discount"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    path: "discount",
                                                    type: new sap.extension.data.Percentage()
                                                }),
                                                sortProperty: "discount",
                                                width: "6rem",
                                            }),
                                            new sap.extension.table.DataColumn("", {
                                                label: ibas.i18n.prop("bo_materialhistoricalprice_unitprice"),
                                                template: new sap.extension.m.Text("", {
                                                }).bindProperty("bindingValue", {
                                                    parts: [
                                                        {
                                                            path: "unitPrice",
                                                            type: new sap.extension.data.Price()
                                                        },
                                                        {
                                                            path: "currency",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }
                                                    ]
                                                }),
                                                sortProperty: "unitPrice",
                                                width: "8rem",
                                            }),
                                        ],
                                    }),
                                    new sap.m.Toolbar("", {
                                        height: "2.5rem",
                                        content: [
                                            new sap.m.Label("", { showColon: true, text: ibas.i18n.prop("materials_document_apply_price_which") }),
                                            this.priSegmented = new sap.m.SegmentedButton("", {
                                                selectedKey: config.get(config.CONFIG_ITEM_DEFAULT_HISTORICAL_PRICE_WHICH_APPLY, "PRETAXPRICE"),
                                                items: [
                                                    new sap.m.SegmentedButtonItem("", {
                                                        key: "PRICE",
                                                        text: ibas.i18n.prop("bo_materialhistoricalprice_price"),
                                                    }),
                                                    new sap.m.SegmentedButtonItem("", {
                                                        key: "PRETAXPRICE",
                                                        text: ibas.i18n.prop("bo_materialhistoricalprice_pretaxprice"),
                                                    }),
                                                    new sap.m.SegmentedButtonItem("", {
                                                        key: "UNITPRICE",
                                                        text: ibas.i18n.prop("bo_materialhistoricalprice_unitprice"),
                                                    }),
                                                ]
                                            }),
                                            new sap.m.ToolbarSpacer(),
                                            new sap.m.Button("", {
                                                text: ibas.i18n.prop("shell_apply"),
                                                type: sap.m.ButtonType.Transparent,
                                                press: function (): void {
                                                    that.fireViewEvents(that.applyEvent, that.table.getSelecteds().firstOrDefault(), that.priSegmented.getSelectedKey());
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
                                    }).addStyleClass("sapMDialogFooter sapMOTB sapMTBNoBorders sapMIBar-CTX sapMFooter-CTX sapContrast sapContrastPlus")
                                ]
                            }),
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }

                private table: sap.extension.table.Table;
                private itemToolbar: sap.m.Toolbar;
                private docToolbar: sap.m.OverflowToolbar;
                private bpButton: sap.m.SegmentedButton;
                private bpColumn: sap.ui.table.Column;
                private countInput: sap.m.Input;
                private priSegmented: sap.m.SegmentedButton;

                showDocument(data: app.MaterialHistoricalPrice): void {
                    this.bpButton.destroyItems();
                    this.bpButton.addItem(new sap.m.SegmentedButtonItem("", {
                        key: data.businessPartnerCode,
                        icon: data.businessPartnerType === businesspartner.bo.emBusinessPartnerType.SUPPLIER ? "sap-icon://supplier" : "sap-icon://customer",
                        text: data.businessPartnerName ? ibas.strings.format("{0} - {1}", data.businessPartnerCode, data.businessPartnerName) : data.businessPartnerCode,
                    }));
                    this.bpButton.addItem(new sap.m.SegmentedButtonItem("", {
                        key: "CUSTOMER",
                        icon: "sap-icon://customer",
                        text: ibas.i18n.prop(["shell_all", "bo_materialhistoricalprice_customer"]),
                    }));
                    this.bpButton.addItem(new sap.m.SegmentedButtonItem("", {
                        key: "SUPPLIER",
                        icon: "sap-icon://supplier",
                        text: ibas.i18n.prop(["shell_all", "bo_materialhistoricalprice_supplier"]),
                    }));
                    this.bpButton.setSelectedItem(this.bpButton.getItems()[0]);
                    this.itemToolbar.setModel(new sap.extension.model.JSONModel(data));
                    setTimeout(() => {
                        (<any>this.bpButton).fireSelectionChange({});
                    }, 100);
                }
                /** 显示单据服务代理 */
                showDocumentAgents(agents: ibas.IServiceAgent[]): void {
                    this.docToolbar.setModel(new sap.extension.model.JSONModel(agents));
                }
                /** 显示单据数据 */
                showDocumentDatas(datas: app.IDocumentMaterialPriceData[]): void {
                    if (this.table.hasModel()) {
                        let model: sap.ui.model.Model = this.table.getModel();
                        if (model instanceof sap.extension.model.JSONModel) {
                            // 已绑定过数据
                            model.addData(datas);
                        }
                    } else {
                        if (this.bpButton.getSelectedKey() === "CUSTOMER") {
                            this.bpColumn.setLabel(ibas.i18n.prop("bo_materialhistoricalprice_customer"));
                            this.bpColumn.setVisible(true);
                        } else if (this.bpButton.getSelectedKey() === "SUPPLIER") {
                            this.bpColumn.setLabel(ibas.i18n.prop("bo_materialhistoricalprice_supplier"));
                            this.bpColumn.setVisible(true);
                        } else {
                            this.bpColumn.setLabel(ibas.i18n.prop("bo_materialhistoricalprice_businesspartner"));
                            this.bpColumn.setVisible(false);
                        }
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                }
            }
        }
    }
}