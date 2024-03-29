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
             * 编辑视图-物料价格清单
             */
            export class MaterialPriceListEditView extends ibas.DialogView implements app.IMaterialPriceListEditView {
                /** 保存数据事件 */
                saveDataEvent: Function;
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 选择基于的价格清单 */
                chooseBasedOnMaterialPriceListEvent: Function;
                /** 选择底价价格清单 */
                chooseFloorMaterialPriceListEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.formTop = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_group") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/group",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_currency") }),
                            new sap.extension.m.CurrencySelect("", {
                                editable: true,
                            }).bindProperty("bindingValue", {
                                path: "/currency",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", {
                                text: ibas.strings.format("{0} / {1}",
                                    ibas.i18n.prop("bo_materialpricelist_basedonlist"),
                                    ibas.i18n.prop("bo_materialpricelist_factor")
                                )
                            }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.MaterialPriceList,
                                    key: bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.MaterialPriceList.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseBasedOnMaterialPriceListEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "/basedOnList",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("bindingValue", {
                                path: "/factor",
                                type: new sap.extension.data.Percentage()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_taxed") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "/taxed",
                                type: new sap.extension.data.YesNo(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_floorlist") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.MaterialPriceList,
                                    key: bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.MaterialPriceList.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseFloorMaterialPriceListEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "/floorList",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", {
                                text: ibas.strings.format("{0} / {1}",
                                    ibas.i18n.prop("bo_materialpricelist_validdate"),
                                    ibas.i18n.prop("bo_materialpricelist_invaliddate")
                                )
                            }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/validDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "/invalidDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_organization") }),
                            new sap.extension.m.DataOrganizationInput("", {
                                showValueHelp: true,
                            }).bindProperty("bindingValue", {
                                path: "/organization",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "/remarks",
                                type: new sap.extension.data.Alphanumeric(),
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
                                text: ibas.i18n.prop("shell_data_delete"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://delete",
                                press: function (): void {
                                    that.fireViewEvents(that.deleteDataEvent);
                                }
                            }),
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
                showMaterialPriceList(data: bo.MaterialPriceList): void {
                    this.formTop.setModel(new sap.extension.model.JSONModel(data));
                }
            }
        }
    }
}