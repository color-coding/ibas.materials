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
            /** 列表视图-计量单位换算率 */
            export class UnitRateEditListView extends ibas.DialogView implements app.IUnitRateEditListView {
                /** 保存数据事件 */
                saveDataEvent: Function;
                /** 添加数据事件 */
                addDataEvent: Function;
                /** 删除数据事件 */
                removeDataEvent: Function;
                /** 选择单位事件 */
                chooseDataUnitEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let button: any = new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        press: function (): void {
                            that.fireViewEvents(that.addDataEvent);
                        }
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        initialFocus: button,
                        content: [
                            this.list = new sap.extension.m.List("", {
                                width: "auto",
                                items: {
                                    path: "/rows",
                                    template: new sap.extension.m.CustomListItem("", {
                                        content: [
                                            new sap.m.HBox("", {
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                alignContent: sap.m.FlexAlignContent.Stretch,
                                                justifyContent: sap.m.FlexJustifyContent.Inherit,
                                                items: [
                                                    new sap.m.Text("", {
                                                        text: sap.extension.data.formatValue(sap.extension.data.Quantity, 1, "string"),
                                                    }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseDataUnitEvent, this.getBindingContext().getObject(), bo.UnitRate.PROPERTY_SOURCE_NAME);
                                                        },
                                                        width: "6rem",
                                                    }).bindProperty("bindingValue", {
                                                        path: "source",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }).addStyleClass("sapUiTinyMarginBegin"),
                                                    new sap.m.Text("", {
                                                        text: "=",
                                                    }).addStyleClass("sapUiTinyMarginBegin"),
                                                    new sap.extension.m.Input("", {
                                                        type: sap.m.InputType.Number,
                                                        width: "6rem",
                                                    }).bindProperty("bindingValue", {
                                                        path: "rate",
                                                        type: new sap.extension.data.Rate(),
                                                    }).addStyleClass("sapUiTinyMarginBegin"),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (this: sap.m.Input): void {
                                                            that.fireViewEvents(that.chooseDataUnitEvent, this.getBindingContext().getObject(), bo.UnitRate.PROPERTY_TARGET_NAME);
                                                        },
                                                        width: "6rem",
                                                    }).bindProperty("bindingValue", {
                                                        path: "target",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }).addStyleClass("sapUiTinyMarginBegin"),
                                                    new sap.m.Button("", {
                                                        icon: "sap-icon://sys-cancel",
                                                        type: sap.m.ButtonType.Transparent,
                                                        press(this: sap.m.Button): void {
                                                            that.fireViewEvents(that.removeDataEvent, this.getBindingContext().getObject());
                                                        }
                                                    }).addStyleClass("sapUiSmallMarginBegin"),
                                                ]
                                            })
                                        ],
                                    })
                                },
                            }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                        ],
                        buttons: [
                            button,
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.saveDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private list: sap.extension.m.List;
                /** 显示数据 */
                showData(datas: bo.UnitRate[]): void {
                    this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
