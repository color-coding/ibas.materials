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
            /** 查看视图-规格模板 */
            export class SpecificationTreeView extends ibas.DialogView implements app.ISpecificationTreeView {
                /** 保存事件 */
                saveEvent: Function;
                /** 使用事件 */
                usingEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.dialog = new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_using"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (oControlEvent: sap.ui.base.Event): void {
                                    if (!ibas.objects.isNull(that.tree)) {
                                        that.fireViewEvents(that.saveEvent);
                                    } else if (!ibas.objects.isNull(that.select)) {
                                        let item: sap.ui.core.Item = that.select.getSelectedItem();
                                        if (ibas.objects.isNull(item)) {
                                            return;
                                        }
                                        that.fireViewEvents(that.usingEvent, (<any>item.getModel()).getData());
                                        if (oControlEvent.getSource() instanceof sap.m.Button) {
                                            let button: sap.m.Button = <sap.m.Button>oControlEvent.getSource();
                                            button.setText(ibas.i18n.prop("shell_data_save"));
                                        }
                                    }
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
                    return this.dialog;
                }
                private dialog: sap.m.Dialog;
                private select: sap.m.Select;
                private tree: sap.ui.table.TreeTable;

                showSpecifications(datas: bo.SpecificationTree[]): void {
                    this.select = new sap.m.Select("", {
                        width: "100%",
                    });
                    for (let item of datas) {
                        let sItem: sap.ui.core.Item = new sap.ui.core.Item("", {
                            key: item.template,
                            text: item.name
                        });
                        sItem.setModel(new sap.ui.model.json.JSONModel(item));
                        this.select.addItem(sItem);
                    }
                    this.dialog.addContent(
                        new sap.ui.layout.form.SimpleForm("", {
                            editable: true,
                            content: [
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("materials_please_specification"),
                                }),
                                this.select,
                            ]
                        })
                    );
                }
                /** 显示规格 */
                showSpecificationTree(data: bo.SpecificationTree): void {
                    this.dialog.destroyContent();
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
                    this.dialog.addContent(this.tree);
                    this.tree.setModel(new sap.ui.model.json.JSONModel({ data: data }));
                }
            }
        }
    }
}
