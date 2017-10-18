/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { IMaterialBatchIssueView } from "../../../bsapp/materialbatch/index";
export class MaterialBatchIssueView extends ibas.BOChooseView implements IMaterialBatchIssueView {
    /** 绘制工具条 */
    darwBars(): any {
        let that: this = this;
        return [
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_data_autoselect"),
                type: sap.m.ButtonType.Transparent,
                press: function (): void {
                    that.fireViewEvents(that.closeEvent
                        // 获取表格选中的对象
                        // utils.getTableSelecteds<bo.MaterialBatch>(that.table)
                    );
                }
            }),
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_data_save"),
                type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://accept",
                press: function (): void {
                    that.fireViewEvents(that.chooseDataEvent,
                        // 获取表格选中的对象
                        // utils.getTableSelecteds<bo.MaterialBatch>(that.table)
                    );
                }
            }),
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_exit"),
                type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://inspect-down",
                press: function (): void {
                    that.fireViewEvents(that.closeEvent);
                }
            }),
        ];
    }
    private mainLayout: sap.ui.layout.VerticalLayout;
    private chooseLayout: sap.ui.layout.HorizontalLayout;
    private leftTable: sap.ui.table.Table;
    private rightTable: sap.ui.table.Table;
    private actionLayout: sap.ui.layout.form.SimpleForm;
    // private
    darw(): any {
        let that: this = this;
        this.leftTable = new sap.ui.table.Table("",{
            enableSelectAll: false,
            width: "45%",
            bAllowWrapping: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/leftrows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "BatchCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_quantitycanuse"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "quantity"
                    })
                }),
            ]
        });
        this.rightTable = new sap.ui.table.Table("",{
            enableSelectAll: false,
            bAllowWrapping: "false",
            width: "45%",
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rightrows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "BatchCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_quantitychoosed"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "quantity"
                    })
                }),
            ]
        });
        this.actionLayout = new sap.ui.layout.form.SimpleForm("",{
            content: [
                new sap.m.Button("",{
                    text: "<"
                }),
                new sap.m.Button("",{
                    text: ">"
                })
            ]
        });
        this.chooseLayout = new sap.ui.layout.HorizontalLayout("",{
            width: "100%",
            bAllowWrapping: false,
            content: [
                this.leftTable,
                this.actionLayout,
                this.rightTable
            ]
        });
        this.mainLayout = new sap.ui.layout.VerticalLayout("", {
            content: [
                this.chooseLayout
            ]
        });
        this.id = this.chooseLayout.getId();
        return this.chooseLayout;
    }
    private lastCriteria: ibas.ICriteria;
    /** 记录上次查询条件，表格滚动时自动触发 */
    query(criteria: ibas.ICriteria): void {
        super.query(criteria);
        this.lastCriteria = criteria;
        // 清除历史数据
        // if (this.isDisplayed) {
        //     this.table.setBusy(true);
        //     this.table.setFirstVisibleRow(0);
        //     this.table.setModel(null);
        // }
    }

    showLeftData(datas: bo.MaterialBatch[]): void {
        this.leftTable.setModel(new sap.ui.model.json.JSONModel({ leftrows: datas }));
        // this.table.bindObject("/");
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.leftTable, datas);
    }
    showRightData(datas: bo.MaterialBatch[]): void {
        this.rightTable.setModel(new sap.ui.model.json.JSONModel({ rightrows: datas }));
        // this.table.bindObject("/");
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.rightTable, datas);
    }

}