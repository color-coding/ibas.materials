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
            export class MaterialGrossProfitView extends ibas.DialogView implements app.IMaterialGrossProfitView {
                /** 改变价格清单事件 */
                changePriceListEvent: Function;
                /** 应用改变事件 */
                applyEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        contentHeight: "80%",
                        contentWidth: "80%",
                        content: [
                            this.table = new sap.extension.table.DataTable("", {
                                enableSelectAll: false,
                                visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
                                dataInfo: {
                                    code: app.MaterialGrossProfit.BUSINESS_OBJECT_CODE,
                                },
                                toolbar: this.toolbar = new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Title("", {
                                            text: {
                                                parts: [
                                                    {
                                                        path: "/documentType",
                                                    },
                                                    {
                                                        path: "/documentEntry",
                                                    }
                                                ],
                                                formatter(documentType: string, documentEntry: number): string {
                                                    return ibas.businessobjects.describe(
                                                        "{[" + documentType + "].[DocEntry = " + String(documentEntry) + "]}"
                                                    );
                                                }
                                            }
                                        }),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialgrossprofit_documentdate"),
                                        }).addStyleClass("sapUiSmallMarginBegin"),
                                        new sap.extension.m.Text("", {
                                            bindingValue: {
                                                path: "/documentDate",
                                                type: new sap.extension.data.Date(),
                                            },
                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialgrossprofit_grossprofitlist"),
                                        }),
                                        this.select = new sap.extension.m.RepositorySelect("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.MaterialPriceList,
                                                key: bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME,
                                                text: bo.MaterialPriceList.PROPERTY_NAME_NAME
                                            },
                                            criteria: [],
                                            change(this: sap.m.Select, event: sap.ui.base.Event): void {
                                                that.fireViewEvents(that.changePriceListEvent, this.getSelectedKey());
                                            },
                                            bindingValue: {
                                                path: "/grossProfitList",
                                                type: new sap.extension.data.Numeric(),
                                            },
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_documentlineid"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "lineId",
                                            type: new sap.extension.data.Numeric()
                                        }),
                                        width: "6rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_itemcode"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: materials.bo.Material.BUSINESS_OBJECT_CODE,
                                        }).bindProperty("bindingValue", {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 50
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_itemdescription"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "itemDescription",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            })
                                        }),
                                        width: "14rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_quantity"),
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
                                                },
                                            ]
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_grossprofitprice"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "grossProfitPrice",
                                            type: new sap.extension.data.Price()
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_price"),
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
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_grossprofit"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "grossProfit",
                                            type: new sap.extension.data.Sum()
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialgrossprofit_grossprofit_rate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "grossProfitRate",
                                            type: new sap.extension.data.Percentage()
                                        }),
                                        width: "8rem",
                                    }),
                                ],
                                footer: this.toolbarBottom = new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialgrossprofit_total_quantity"),
                                        }),
                                        this.textQuantity = new sap.m.Text("", {
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialgrossprofit_grossprofit"),
                                        }),
                                        new sap.m.Text("", {
                                            text: {
                                                parts: [
                                                    {
                                                        path: "/grossProfit",
                                                        type: new sap.extension.data.Sum(),
                                                    },
                                                    {
                                                        path: "/currency",
                                                        type: new sap.extension.data.Alphanumeric()
                                                    },
                                                ]
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialgrossprofit_grossprofit_rate"),
                                        }),
                                        new sap.m.Text("", {
                                            text: {
                                                path: "/grossProfitRate",
                                                type: new sap.extension.data.Percentage(),
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                    ]
                                }),
                            })
                        ],
                        buttons: [
                            this.button = new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_apply"),
                                type: sap.m.ButtonType.Transparent,
                                enabled: {
                                    path: "/isDirty",
                                },
                                press: function (): void {
                                    that.fireViewEvents(that.applyEvent);
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

                private table: sap.extension.table.Table;
                private toolbar: sap.m.Toolbar;
                private button: sap.m.Button;
                private select: sap.m.Select;
                private textQuantity: sap.m.Text;
                private toolbarBottom: sap.m.Toolbar;

                /** 显示数据 */
                showData(data: app.MaterialGrossProfit): void {
                    this.toolbar.setModel(new sap.extension.model.JSONModel(data));
                    this.toolbarBottom.setModel(new sap.extension.model.JSONModel(data));
                    this.button.setModel(new sap.extension.model.JSONModel(data));
                    if (ibas.objects.isNull(data.grossProfitList)) {
                        // 未设置价格清单，则默认使用成本价格
                        setTimeout(() => {
                            this.select.setSelectedKey(String(bo.MaterialPriceList.PRICE_LIST_COST_PRICE));
                            (<any>this.select).fireChange({});
                        }, 100);
                    }
                }
                /** 显示数据行 */
                showDataLines(datas: app.MaterialGrossProfitLine[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    let qtyUnits: ibas.IList<string> = new ibas.ArrayList<string>();
                    let sumQuantity: number = 0;
                    for (let data of datas) {
                        if (!qtyUnits.contain(data.uom) && data.uom) {
                            qtyUnits.add(data.uom);
                        }
                        sumQuantity += isNaN(data.quantity) ? 0 : ibas.numbers.valueOf(data.quantity);
                    }
                    let qtyBuilder: ibas.StringBuilder = new ibas.StringBuilder();
                    for (let item of qtyUnits) {
                        if (qtyBuilder.length >= 1) {
                            qtyBuilder.append("/");
                        }
                        qtyBuilder.append(item);
                    }
                    this.textQuantity.setText(ibas.strings.format("{0} {1}",
                        sap.extension.data.formatValue(sap.extension.data.Quantity, sumQuantity, "string"),
                        qtyBuilder.toString()
                    ));
                }
            }
        }
    }
}