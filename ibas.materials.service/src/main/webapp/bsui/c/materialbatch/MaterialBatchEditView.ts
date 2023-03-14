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
             * 编辑视图-物料批次
             */
            export class MaterialBatchEditView extends ibas.DialogView implements app.IMaterialBatchEditView {
                /** 保存数据事件 */
                saveDataEvent: Function;
                /** 选择物料规格 */
                chooseSpecificationEvent: Function;
                /** 选择物料版本 */
                chooseVersionEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.formTop = new sap.extension.layout.DataSimpleForm("", {
                        dataInfo: {
                            code: bo.MaterialBatch.BUSINESS_OBJECT_CODE,
                        },
                        userFieldsMode: "input",
                        userFieldsTitle: "",
                        editable: true,
                        content: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_itemcode") }),
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_warehouse") }),
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_batchcode") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "/batchCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 36
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_locked") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "/locked",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_quantity") }),
                            new sap.extension.m.Input("", {
                                editable: false,

                            }).bindProperty("bindingValue", {
                                path: "/quantity",
                                type: new sap.extension.data.Quantity()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_supplierserial") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/supplierSerial",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_manufacturingdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/manufacturingDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_expirationdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/expirationDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_admissiondate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/admissionDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_specification") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.MaterialSpecification,
                                    key: bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.MaterialSpecification.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseSpecificationEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "/specification",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_version") }),
                            new sap.extension.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseVersionEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "/version",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_notes") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "/notes",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_location") }),
                            new sap.extension.m.Input("", {
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
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private formTop: sap.ui.layout.form.SimpleForm;

                /** 显示数据 */
                showMaterialBatch(data: bo.MaterialBatch): void {
                    this.formTop.setModel(new sap.ui.model.json.JSONModel(data));
                }
            }
        }
    }
}