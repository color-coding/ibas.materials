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
            /** 视图-物料替代 */
            export class MaterialSubstituteEditView extends ibas.DialogView implements app.IMaterialSubstituteEditView {
                /** 保存数据事件 */
                saveSubstituteEvent: Function;
                /** 添加数据事件 */
                addSubstituteEvent: Function;
                /** 移除数据事件 */
                removeSubstituteEvent: Function;
                /** 选择数据版本事件 */
                chooseSubstituteVersionEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://sys-cancel",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.removeSubstituteEvent, this.getBindingContext().getObject());
                                    },
                                }),
                            ]
                        }),
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "isDirty",
                            formatter(value: boolean): string {
                                if (!!value) {
                                    return sap.ui.core.MessageType.Warning;
                                } else {
                                    return sap.ui.core.MessageType.Information;
                                }
                            }
                        }),
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_position"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "position",
                                    type: new sap.extension.data.Numeric(),
                                }),
                                width: "5rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_substitute"),
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.addSubstituteEvent, this.getBindingContext().getObject());
                                    },
                                    showValueLink: true,
                                    valueLinkRequest: function (event: sap.ui.base.Event): void {
                                        if (ibas.servicesManager.runLinkService({
                                            boCode: bo.Material.BUSINESS_OBJECT_CODE,
                                            linkValue: event.getParameter("value")
                                        })) {
                                            that.fireViewEvents(that.closeEvent);
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "substitute",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_description"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Material,
                                        key: bo.Material.PROPERTY_CODE_NAME,
                                        text: bo.Material.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "substitute",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_version"),
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseSubstituteVersionEvent, this.getBindingContext().getObject());
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "version",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                visible: config.isEnableMaterialVersions(),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_quantity"),
                                template: new sap.extension.m.Input("", {

                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_uom"),
                                template: new sap.extension.m.SelectionInput("", {
                                    showValueHelp: true,
                                    chooseType: ibas.emChooseType.SINGLE,
                                    repository: materials.bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: materials.bo.Unit,
                                        key: materials.bo.Unit.PROPERTY_NAME_NAME,
                                        text: materials.bo.Unit.PROPERTY_NAME_NAME
                                    },
                                    criteria: [
                                        new ibas.Condition(materials.bo.Unit.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                    ]
                                }).bindProperty("bindingValue", {
                                    path: "uom",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 8
                                    })
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_activated"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emYesNo,
                                }).bindProperty("bindingValue", {
                                    path: "activated",
                                    type: new sap.extension.data.YesNo(),
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_validdate"),
                                template: new sap.extension.m.DatePicker("", {
                                }).bindProperty("bindingValue", {
                                    path: "validDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_invaliddate"),
                                template: new sap.extension.m.DatePicker("", {
                                }).bindProperty("bindingValue", {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_remarks"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "20rem",
                            }),
                        ],
                        sortProperty: "position",
                        sortIntervalStep: 10,
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        content: [
                            this.titleBar = new sap.m.VBox("", {
                                alignContent: sap.m.FlexAlignContent.Center,
                                alignItems: sap.m.FlexAlignItems.Start,
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    new sap.m.Toolbar("", {
                                        width: "100%",
                                        content: [
                                            new sap.m.Title("", {
                                                titleStyle: sap.ui.core.TitleLevel.H4,
                                                text: {
                                                    path: "/code",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                            new sap.m.Title("", {
                                                titleStyle: sap.ui.core.TitleLevel.H4,
                                                text: {
                                                    path: "/name",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                            new sap.m.ToolbarSpacer(),
                                            new sap.m.Button("", {
                                                text: ibas.i18n.prop("shell_data_add"),
                                                type: sap.m.ButtonType.Transparent,
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    that.fireViewEvents(that.addSubstituteEvent);
                                                }
                                            }),
                                        ],
                                    }),
                                ]
                            }),
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.saveSubstituteEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private titleBar: sap.m.VBox;
                private table: sap.extension.table.Table;
                showMaterials(data: bo.Material): void {
                    this.titleBar.setModel(new sap.extension.model.JSONModel(data));
                }
                showSubstitutes(datas: bo.MaterialSubstitute[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
