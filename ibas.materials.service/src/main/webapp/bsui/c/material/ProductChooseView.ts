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
             * 选择视图-物料
             */
            export class ProductChooseView extends ibas.BOChooseView implements app.IProductChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Material;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        chooseType: this.chooseType,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        dataInfo: this.queryTarget,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_picture"),
                                template: new sap.m.Image("", {
                                    mode: sap.m.ImageMode.Image,
                                    press: function (oEvent: sap.ui.base.Event): void {
                                        let src: string = this.getSrc();
                                        if (!ibas.strings.isEmpty(src)) {
                                            let lightBox: sap.m.LightBox = new sap.m.LightBox("", {
                                                imageContent: [
                                                    new sap.m.LightBoxItem("", {
                                                        imageSrc: src
                                                    })
                                                ]
                                            });
                                            lightBox.open();
                                        }
                                    },
                                    height: "1.75rem",
                                    width: "100%",
                                }).bindProperty("src", {
                                    path: "picture",
                                    formatter: function (value: string): string {
                                        if (ibas.strings.isEmpty(value)) {
                                            return "";
                                        }
                                        if (ibas.strings.isWith(value, "http", undefined)) {
                                            return ibas.urls.normalize(value);
                                        }
                                        return new bo.BORepositoryMaterials().toUrl(value);
                                    }
                                }),
                                visible: false,
                                width: "5rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_code"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "code",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_name"),
                                width: "20rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                        {
                                            path: "sign",
                                            type: new sap.extension.data.Alphanumeric(),
                                            formatter(data: string): string {
                                                return ibas.strings.isEmpty(data) ? "" : ibas.strings.format(" ({0})", data);
                                            }
                                        },
                                    ]
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_itemtype"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemType",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emItemType,
                                        describe: true,
                                    })
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_group"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.MaterialGroup,
                                        key: bo.MaterialGroup.PROPERTY_CODE_NAME,
                                        text: bo.MaterialGroup.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "group",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_onhand"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "onHand",
                                            type: new sap.extension.data.Quantity()
                                        },
                                        {
                                            path: "inventoryUOM",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                    ]
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_price"),
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
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_remarks"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "20rem",
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        },
                        rowDoubleClick(event: sap.ui.base.Event): void {
                            that.fireViewEvents(that.chooseDataEvent, event.getParameter("row")?.getBindingContext()?.getObject());
                        }
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_new"),
                                visible: this.mode === ibas.emViewMode.VIEW ? false : true,
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.newDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.table.getSelecteds());
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.Product[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setBusy(true);
                        this.table.setFirstVisibleRow(0);
                        this.table.setModel(null);
                    }
                }
            }
        }
    }
}