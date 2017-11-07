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
import { emAutoSelectBatchSerialRules } from "../../../api/Datas";
import { IMaterialBatchIssueView } from "../../../bsapp/materialbatch/index";
export class MaterialBatchIssueView extends ibas.BODialogView implements IMaterialBatchIssueView {

    /** 选择批次凭证行信息事件 */
    selectMaterialBatchJournalLineEvent: Function;
    /** 自动选择批次信息事件 */
    autoSelectMaterialBatchEvent: Function;
    /** 添加选择的批次事件 */
    addBatchMaterialBatchEvent: Function;
    /** 移除选择的批次事件 */
    removeBatchMaterialBatchEvent: Function;
    /** 保存回调 */
    saveDataEvent: Function;
    // 控件
    private mainLayout: sap.ui.layout.VerticalLayout;
    private journalLineTable: sap.ui.table.Table;
    private chooseLayout: sap.ui.layout.HorizontalLayout;
    private leftTable: sap.ui.table.Table;
    private rightTable: sap.ui.table.Table;
    private actionLayout: sap.ui.layout.form.SimpleForm;
    private mainBlockLayout: sap.ui.layout.BlockLayout;
    private splitter: sap.ui.layout.Splitter;
    /** 绘制工具条 */
    darwBars(): any {
        let that: this = this;
        return [
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_data_save"),
                // type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://accept",
                press: function (): void {
                    that.fireViewEvents(that.saveDataEvent);
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
    darw(): any {
        let that: this = this;
        this.journalLineTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionMode: sap.ui.table.SelectionMode.Single,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rowSelectionChange: function (): void {
                that.fireViewEvents(that.selectMaterialBatchJournalLineEvent,
                    utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(), );
            },
            rows: "{/journallinedata}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_itemCode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "ItemCode",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_warehousecode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "warehouse",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_quantity"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "quantity",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_needquantity"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "needBatchQuantity",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_selectedquantity"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "selectedBatchQuantity",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_direction"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "direction",
                        formatter(data: any): any {
                            return ibas.enums.describe(ibas.emDirection, data);
                        }
                    }),
                }),
            ]
        });
        this.leftTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            wrapping: true,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/leftrows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_batchcode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "BatchCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_quantitycanuse"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                        type: sap.m.InputType.Number
                    }).bindProperty("text", {
                        path: "quantity"
                    })
                }),
            ]
        });
        this.rightTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rightrows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_batchcode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "BatchCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_quantitychoosed"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                        type: sap.m.InputType.Number
                    }).bindProperty("text", {
                        path: "quantity"
                    })
                }),
            ]
        });
        this.actionLayout = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.m.MenuButton("", {
                    text: ibas.i18n.prop("materials_sys_autoselect"),
                    menu: [
                        new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("materials_app_autoselectbatch_by_firstinfirstout"),
                                    press: function (): void {
                                        that.fireViewEvents(that.autoSelectMaterialBatchEvent
                                            , utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>
                                                (that.journalLineTable).firstOrDefault()
                                            , emAutoSelectBatchSerialRules.FIRSTINFIRSTOUT);
                                    }
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("materials_app_autoselectbatch_by_batchno"),
                                    press: function (): void {
                                        that.fireViewEvents(that.autoSelectMaterialBatchEvent
                                            , utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>
                                                (that.journalLineTable).firstOrDefault()
                                            , emAutoSelectBatchSerialRules.ORDERBYCODE);
                                    }
                                }),
                            ]
                        })
                    ]
                }),
                new sap.m.Button("", {
                    text: "<",
                    press: function (): void {
                        that.fireViewEvents(that.removeBatchMaterialBatchEvent,
                            // 获取表格选中的对象
                            utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(),
                            utils.getTableSelecteds<bo.MaterialBatchJournal>(that.rightTable),
                        );
                    }
                }),
                new sap.m.Button("", {
                    text: ">",
                    press: function (): void {
                        that.fireViewEvents(that.addBatchMaterialBatchEvent,
                            // 获取表格选中的对象
                            utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(),
                            utils.getTableSelecteds<bo.MaterialBatch>(that.leftTable),
                        );
                    }
                })
            ]
        });
        this.chooseLayout = new sap.ui.layout.HorizontalLayout("", {
            allowWrapping: false,
            width: "100%",
            content: [
                this.leftTable,
                this.actionLayout,
                this.rightTable
            ]
        });
        this.splitter = new sap.ui.layout.Splitter("", {
            orientation: sap.ui.core.Orientation.Horizontal,
            contentAreas: [
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "42%",
                    }),
                    contentAreas: [
                        this.leftTable
                    ]
                }),
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "auto",
                    }),
                    contentAreas: [
                        this.actionLayout
                    ]
                }),
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "42%",
                    }),
                    contentAreas: [
                        this.rightTable
                    ]
                }),
            ]
        });

        this.mainLayout = new sap.ui.layout.VerticalLayout("", {
            wrapping: false,
            content: [
                this.journalLineTable,
                this.splitter
            ]
        });
        this.id = this.mainLayout.getId();
        return this.mainLayout;
    }
    private lastCriteria: ibas.ICriteria;
    /** 记录上次查询条件，表格滚动时自动触发 */
    query(criteria: ibas.ICriteria): void {
        // super.query(criteria);
        this.lastCriteria = criteria;
        // 清除历史数据
        // if (this.isDisplayed) {
        //     this.table.setBusy(true);
        //     this.table.setFirstVisibleRow(0);
        //     this.table.setModel(null);
        // }
    }
    showJournalLineData(datas: bo.MaterialBatchSerialInOutData[]): void {
        this.journalLineTable.setModel(new sap.ui.model.json.JSONModel({ journallinedata: datas }));
        utils.refreshModelChanged(this.journalLineTable, datas);
    }
    showLeftData(datas: bo.MaterialBatch[]): void {
        this.leftTable.setModel(new sap.ui.model.json.JSONModel({ leftrows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.leftTable, datas);
    }
    showRightData(datas: bo.MaterialBatchJournal[]): void {
        this.rightTable.setModel(new sap.ui.model.json.JSONModel({ rightrows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.rightTable, datas);
    }

}