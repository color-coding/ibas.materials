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
            /** 查看视图-物料规格 */
            export class MaterialSpecificationViewView extends ibas.DialogView implements app.IMaterialSpecificationViewView {
                mode: ibas.emViewMode;
                /** 保存事件 */
                saveEvent: Function;
                /** 编辑数据事件 */
                editDataEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tree = new sap.ui.table.TreeTable("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("bo_specification_name"),
                                }),
                                new sap.m.Input("", {
                                }).bindProperty("value", {
                                    path: "/data/name"
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://collapse",
                                    press: function (): void {
                                        that.tree.collapseAll();
                                    }
                                }),
                            ]
                        }),
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.None,
                        rows: {
                            path: "/data/items",
                            parameters: {
                                arrayNames: ["items"]
                            }
                        },
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_specificationitem_description"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "description",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_specificationitem_content"),
                                template: new sap.m.ComboBox("", {
                                    width: "100%"
                                }).bindItems({
                                    path: "vaildValues",
                                    templateShareable: false,
                                    template: new sap.ui.core.ListItem("", {
                                        key: "{value}",
                                        text: "{description}",
                                        additionalText: "{associated}",
                                    })
                                }).bindProperty("value", {
                                    path: "content",
                                }).bindProperty("editable", {
                                    path: "editable",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_specificationitem_note"),
                                template: new sap.m.Input("", {
                                    width: "100%"
                                }).bindProperty("value", {
                                    path: "note",
                                })
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.tree
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.saveEvent);
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
                    });
                }
                private tree: sap.ui.table.TreeTable;
                /** 显示规格 */
                showSpecificationTree(data: app.MaterialSpecificationTree): void {
                    this.tree.setModel(new sap.ui.model.json.JSONModel({ data: data }));
                }
            }
        }
    }
}
