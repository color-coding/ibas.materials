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
            /** 视图-物料测量 */
            export class MaterialMeasurementView extends ibas.DialogView implements app.IMaterialMeasurementView {
                /**
                 * 改变单位事件
                 */
                changeUnitEvent: Function;
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
                            this.table = new sap.extension.table.Table("", {
                                enableSelectAll: false,
                                visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
                                toolbar: new sap.m.Toolbar("", {
                                    content: [
                                        this.titleDocument = new sap.m.Title("", {

                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialmeasurement_unit_weight"),
                                        }),
                                        this.selectWeight = new sap.extension.m.RepositorySelect("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Unit,
                                                key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                text: bo.Unit.PROPERTY_SYMBOL_NAME
                                            },
                                            criteria: [
                                                new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_WEIGHT)
                                            ],
                                            change(this: sap.m.Select, event: sap.ui.base.Event): void {
                                                that.fireViewEvents(that.changeUnitEvent, bo.Unit.CATEGORY_WEIGHT, this.getSelectedKey());
                                            },
                                            // forceSelection: true,
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialmeasurement_unit_volume"),
                                        }),
                                        this.selectVolume = new sap.extension.m.RepositorySelect("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Unit,
                                                key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                text: bo.Unit.PROPERTY_SYMBOL_NAME
                                            },
                                            criteria: [
                                                new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_VOLUME)
                                            ],
                                            change(this: sap.m.Select, event: sap.ui.base.Event): void {
                                                that.fireViewEvents(that.changeUnitEvent, bo.Unit.CATEGORY_VOLUME, this.getSelectedKey());
                                            },
                                            // forceSelection: true,
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialmeasurement_documentlineid"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "documentLineId",
                                            type: new sap.extension.data.Numeric()
                                        }),
                                        width: "6rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialmeasurement_documentitemcode"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: materials.bo.Material.BUSINESS_OBJECT_CODE,
                                        }).bindProperty("bindingValue", {
                                            path: "documentItemCode",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 50
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialmeasurement_documentitemdescription"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "documentItemDescription",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            })
                                        }),
                                        width: "14rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialmeasurement_quantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "documentQuantity",
                                                    type: new sap.extension.data.Quantity()
                                                },
                                                {
                                                    path: "documentUOM",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_material_length"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "length",
                                                    type: new sap.extension.data.Measurement()
                                                },
                                                {
                                                    path: "sizeUnit",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_material_width"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "width",
                                                    type: new sap.extension.data.Measurement()
                                                },
                                                {
                                                    path: "sizeUnit",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_material_height"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "height",
                                                    type: new sap.extension.data.Measurement()
                                                },
                                                {
                                                    path: "sizeUnit",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_material_weight"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "weight",
                                                    type: new sap.extension.data.Measurement()
                                                },
                                                {
                                                    path: "weightUnit",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_material_volume"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "volume",
                                                    type: new sap.extension.data.Measurement()
                                                },
                                                {
                                                    path: "volumeUnit",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        }),
                                    }),
                                ],
                                fixedColumnCount: 4,
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialmeasurement_total_quantity"),
                                        }),
                                        this.textQuantity = new sap.m.Text("", {
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialmeasurement_total_weight"),
                                        }),
                                        this.textWeight = new sap.m.Text("", {
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_materialmeasurement_total_volume"),
                                        }),
                                        this.textVolume = new sap.m.Text("", {
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                    ]
                                }),
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

                private table: sap.extension.table.Table;
                private textQuantity: sap.m.Text;
                private textVolume: sap.m.Text;
                private textWeight: sap.m.Text;
                private selectVolume: sap.m.Select;
                private selectWeight: sap.m.Select;
                private titleDocument: sap.m.Title;
                /** 显示数据 */
                showDatas(datas: app.MaterialMeasurement[]): void {
                    if (this.table.hasModel()) {
                        for (let item of this.table.getModel().getData<app.MaterialMeasurement[]>("rows")) {
                            item.removeListener(this.propertyListener);
                        }
                    }
                    this.titleDocument.setText(undefined);
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    if (datas instanceof Array) {
                        for (let item of datas) {
                            if (ibas.strings.isEmpty(this.titleDocument.getText())) {
                                this.titleDocument.setText(ibas.businessobjects.describe(
                                    "{[" + item.documentType + "].[DocEntry = " + String(item.documentEntry) + "]}"
                                ));
                            }
                            item.registerListener(this.propertyListener);
                        }
                    }
                    let qtyUnits: ibas.IList<string> = new ibas.ArrayList<string>();
                    let volUnits: ibas.IList<string> = new ibas.ArrayList<string>();
                    let wghUnits: ibas.IList<string> = new ibas.ArrayList<string>();
                    let sumQuantity: number = 0, sumVolume: number = 0, sumWeight: number = 0;
                    for (let data of datas) {
                        if (!qtyUnits.contain(data.documentUOM) && data.documentUOM) {
                            qtyUnits.add(data.documentUOM);
                        }
                        if (!volUnits.contain(data.volumeUnit) && data.volumeUnit) {
                            volUnits.add(data.volumeUnit);
                        }
                        if (!wghUnits.contain(data.weightUnit) && data.weightUnit) {
                            wghUnits.add(data.weightUnit);
                        }
                        sumQuantity += isNaN(data.documentQuantity) ? 0 : ibas.numbers.valueOf(data.documentQuantity);
                        sumVolume += isNaN(data.volume) ? 0 : ibas.numbers.valueOf(data.volume);
                        sumWeight += isNaN(data.weight) ? 0 : ibas.numbers.valueOf(data.weight);
                    }
                    let qtyBuilder: ibas.StringBuilder = new ibas.StringBuilder();
                    for (let item of qtyUnits) {
                        if (qtyBuilder.length >= 1) {
                            qtyBuilder.append("/");
                        }
                        qtyBuilder.append(item);
                    }
                    let volBuilder: ibas.StringBuilder = new ibas.StringBuilder();
                    for (let item of volUnits) {
                        if (volBuilder.length >= 1) {
                            volBuilder.append("/");
                        }
                        volBuilder.append(item);
                    }
                    let wghBuilder: ibas.StringBuilder = new ibas.StringBuilder();
                    for (let item of wghUnits) {
                        if (wghBuilder.length >= 1) {
                            wghBuilder.append("/");
                        }
                        wghBuilder.append(item);
                    }
                    this.textQuantity.setText(ibas.strings.format("{0} {1}",
                        sap.extension.data.formatValue(sap.extension.data.Quantity, sumQuantity, "string"),
                        qtyBuilder.toString()
                    ));
                    this.textVolume.setText(ibas.strings.format("{0} {1}",
                        sap.extension.data.formatValue(sap.extension.data.Measurement, sumVolume, "string"),
                        volBuilder.toString()
                    ));
                    this.textWeight.setText(ibas.strings.format("{0} {1}",
                        sap.extension.data.formatValue(sap.extension.data.Measurement, sumWeight, "string"),
                        wghBuilder.toString()
                    ));
                }
                private propertyListener: ibas.IPropertyChangedListener = {
                    caller: this,
                    propertyChanged(this: MaterialMeasurementView, property: string): void {
                        if (ibas.strings.equalsIgnoreCase(property, "Volume")) {
                            let datas: app.MaterialMeasurement[]
                                = this.table.getModel()?.getData<app.MaterialMeasurement[]>("rows");
                            let sumVolume: number = 0;
                            let volUnits: ibas.IList<string> = new ibas.ArrayList<string>();
                            for (let data of datas) {
                                if (!volUnits.contain(data.volumeUnit) && data.volumeUnit) {
                                    volUnits.add(data.volumeUnit);
                                }
                                sumVolume += isNaN(data.volume) ? 0 : ibas.numbers.valueOf(data.volume);
                            }
                            let volBuilder: ibas.StringBuilder = new ibas.StringBuilder();
                            for (let item of volUnits) {
                                if (volBuilder.length >= 1) {
                                    volBuilder.append("/");
                                }
                                volBuilder.append(item);
                            }
                            this.textVolume.setText(ibas.strings.format("{0} {1}",
                                sap.extension.data.formatValue(sap.extension.data.Measurement, sumVolume, "string"),
                                volBuilder.toString()
                            ));
                        } else if (ibas.strings.equalsIgnoreCase(property, "Weight")) {
                            let datas: app.MaterialMeasurement[]
                                = this.table.getModel()?.getData<app.MaterialMeasurement[]>("rows");
                            let sumWeight: number = 0;
                            let wghUnits: ibas.IList<string> = new ibas.ArrayList<string>();
                            for (let data of datas) {
                                if (!wghUnits.contain(data.weightUnit) && data.weightUnit) {
                                    wghUnits.add(data.weightUnit);
                                }
                                sumWeight += isNaN(data.weight) ? 0 : ibas.numbers.valueOf(data.weight);
                            }
                            let wghBuilder: ibas.StringBuilder = new ibas.StringBuilder();
                            for (let item of wghUnits) {
                                if (wghBuilder.length >= 1) {
                                    wghBuilder.append("/");
                                }
                                wghBuilder.append(item);
                            }
                            this.textWeight.setText(ibas.strings.format("{0} {1}",
                                sap.extension.data.formatValue(sap.extension.data.Measurement, sumWeight, "string"),
                                wghBuilder.toString()
                            ));
                        }
                    }
                };
            }
        }
    }
}
