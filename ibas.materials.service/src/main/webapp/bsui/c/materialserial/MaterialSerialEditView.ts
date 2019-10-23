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
            /**
             * 编辑视图-物料序列
             */
            export class MaterialSerialEditView extends ibas.DialogView implements app.IMaterialSerialEditView {
                /** 保存数据事件 */
                saveDataEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.formTop = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_itemcode") }),
                            new sap.extension.m.RepositoryInput("", {
                                editable: false,
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
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "/itemCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_warehouse") }),
                            new sap.extension.m.RepositoryInput("", {
                                editable: false,
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_serialcode") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                editable: false,
                            }).bindProperty("value", {
                                path: "/serialCode",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_locked") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "/locked",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_instock") }),
                            new sap.extension.m.EnumSelect("", {
                                editable: false,
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "/inStock",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_supplierserial") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/supplierSerial",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_batchserial") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/batchSerial",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_expirationdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/expirationDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_manufacturingdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/manufacturingDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_admissiondate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/admissionDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_warrantystartdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/warrantyStartDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_warrantyenddate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/warrantyEndDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_specification") }),
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_location") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/location",
                                type: new sap.extension.data.Numeric()
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.formTop
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://save",
                                press: function (): void {
                                    that.fireViewEvents(that.saveDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }

                private formTop: sap.ui.layout.form.SimpleForm;

                /** 显示数据 */
                showMaterialSerial(data: bo.MaterialSerial): void {
                    this.formTop.setModel(new sap.ui.model.json.JSONModel(data));
                }
            }
        }
    }
}