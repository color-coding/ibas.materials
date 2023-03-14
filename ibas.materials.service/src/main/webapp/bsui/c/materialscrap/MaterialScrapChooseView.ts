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
            /** 选择视图-物料废品率 */
            export class MaterialScrapChooseView extends ibas.BOChooseView implements app.IMaterialScrapChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialScrap;
                }
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
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
                                label: ibas.i18n.prop("bo_materialscrap_name"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "name",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialscrap_description"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "description",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialscrap_activated"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "activated",
                                    type: new sap.extension.data.YesNo(true),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialscrap_remarks"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "100%",
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
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://edit",
                                    type: sap.ui.table.RowActionType.Custom,
                                    tooltip: ibas.i18n.prop("shell_data_edit"),
                                    press: function (this: sap.ui.table.RowActionItem): void {
                                        that.fireViewEvents(that.editDataEvent, this.getBindingContext().getObject());
                                    }
                                }),
                            ]
                        }),
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Title("", {
                                    text: this.title
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    icon: "sap-icon://enter-more",
                                    type: sap.m.ButtonType.Transparent,
                                    tooltip: ibas.i18n.prop("materials_app_materialscrap_list"),
                                    visible: this.mode === ibas.emViewMode.VIEW ? false : true,
                                    press(): void {
                                        that.fireViewEvents(that.editDataEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_new"),
                                type: sap.m.ButtonType.Transparent,
                                visible: this.mode === ibas.emViewMode.VIEW ? false : true,
                                press(): void {
                                    that.fireViewEvents(that.newDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.table.getSelecteds());
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
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.MaterialScrap[]): void {
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
