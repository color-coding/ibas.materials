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
            /** 查看视图-物料批次 */
            export class MaterialBatchViewView extends ibas.DialogView implements app.IMaterialBatchViewView {
                /** 编辑数据事件 */
                editDataEvent: Function;
                /** 模式 */
                mode: ibas.emViewMode;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.formTop = new sap.extension.layout.DataSimpleForm("", {
                        dataInfo: {
                            code: bo.MaterialBatch.BUSINESS_OBJECT_CODE,
                        },
                        userFieldsMode: "text",
                        userFieldsTitle: "",
                        editable: false,
                        content: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material") }),
                            new sap.m.HBox("", {
                                items: [
                                    new sap.extension.m.RepositoryText("", {
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Material,
                                            key: bo.Material.PROPERTY_CODE_NAME,
                                            text: bo.Material.PROPERTY_NAME_NAME
                                        },
                                    }).bindProperty("bindingValue", {
                                        path: "/itemCode",
                                        type: new sap.extension.data.Alphanumeric()
                                    }),
                                    new sap.extension.m.Text("", { text: "/" }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                    new sap.extension.m.DataLink("", {
                                        objectCode: bo.Material.BUSINESS_OBJECT_CODE
                                    }).bindProperty("bindingValue", {
                                        path: "/itemCode",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 50
                                        })
                                    }),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_warehouse") }),
                            new sap.m.HBox("", {
                                items: [
                                    new sap.extension.m.RepositoryText("", {
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Warehouse,
                                            key: bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: bo.Warehouse.PROPERTY_NAME_NAME
                                        },
                                    }).bindProperty("bindingValue", {
                                        path: "/warehouse",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 8
                                        })
                                    }),
                                    new sap.extension.m.Text("", { text: "/" }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                    new sap.extension.m.DataLink("", {
                                        objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE
                                    }).bindProperty("bindingValue", {
                                        path: "/warehouse",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 8
                                        })
                                    }),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_batchcode") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/batchCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 36
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_locked") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/locked",
                                type: new sap.extension.data.YesNo(true)
                            }),
                            new sap.m.Label("", {
                                text: ibas.strings.format("{0} / {1}",
                                    ibas.i18n.prop("bo_materialbatch_quantity"),
                                    ibas.i18n.prop("bo_materialbatch_reservedquantity") ,
                                )
                            }),
                            new sap.m.HBox("", {
                                items: [
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "/quantity",
                                        type: new sap.extension.data.Quantity()
                                    }),
                                    new sap.extension.m.Text("", { text: "/" }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "/reservedQuantity",
                                        type: new sap.extension.data.Quantity()
                                    }),
                                ]
                            }),
                            new sap.m.Label("", {
                                text: ibas.strings.format("{0} / {1}",
                                    ibas.i18n.prop("bo_materialbatch_inventoryvalue"),
                                    ibas.i18n.prop("bo_materialbatch_avgprice") ,
                                )
                            }),
                            new sap.m.HBox("", {
                                items: [
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "/inventoryValue",
                                        type: new sap.extension.data.Sum(),
                                    }),
                                    new sap.extension.m.Text("", { text: "/" }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "/avgPrice",
                                        type: new sap.extension.data.Price(),
                                    }),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_supplierserial") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/supplierSerial",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_manufacturingdate") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/manufacturingDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_expirationdate") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/expirationDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_admissiondate") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/admissionDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_specification") }),
                            new sap.extension.m.RepositoryText("", {
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.MaterialSpecification,
                                    key: bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.MaterialSpecification.PROPERTY_NAME_NAME
                                },
                            }).bindProperty("bindingValue", {
                                path: "/specification",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_version") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/version",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_notes") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/notes",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_location") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "/location",
                                type: new sap.extension.data.Numeric()
                            }),
                        ]
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        contentWidth: "40%",
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        content: [
                            this.formTop
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }

                private formTop: sap.ui.layout.form.SimpleForm;

                /** 显示数据 */
                showMaterialBatch(data: bo.MaterialBatch): void {
                    this.formTop.setModel(new sap.extension.model.JSONModel(data));
                }
            }
        }
    }
}
