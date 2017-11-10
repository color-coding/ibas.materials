/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { emAutoSelectBatchSerialRules } from "../../../api/Datas";
import { IMaterialSerialIssueView } from "../../../bsapp/materialserial/index";
export class MaterialSerialIssueView extends ibas.BODialogView implements IMaterialSerialIssueView {
    /** 选择序列号凭证行信息事件 */
    selectMaterialSerialJournalLineEvent: Function;
    /** 自动选择序列号信息事件 */
    autoSelectMaterialSerialEvent: Function;
    /** 添加选择的序列号事件 */
    addSerialMaterialSerialEvent: Function;
    /** 移除选择的序列号事件 */
    removeSerialMaterialSerialEvent: Function;
    /** 保存回调 */
    saveDataEvent: Function;
    // 控件
    private mainLayout: sap.ui.layout.VerticalLayout;
    private journalLineTable: sap.ui.table.Table;
    private leftTable: sap.ui.table.Table;
    private rightTable: sap.ui.table.Table;
    private actionLayout: sap.ui.layout.form.SimpleForm;
    private splitter: sap.ui.layout.Splitter;
    darw(): any {
        let that: this = this;
        this.journalLineTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionMode: sap.ui.table.SelectionMode.Single,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rowSelectionChange: function (): void {
                that.fireViewEvents(that.selectMaterialSerialJournalLineEvent,
                    openui5.utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(), );
            },
            rows: "{/journallinedata}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_itemCode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "ItemCode",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_warehousecode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "warehouse",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_quantity"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "quantity",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_needquantity"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "needSerialQuantity",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_selectedquantity"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "selectedSerialQuantity",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_direction"),
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
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/leftrows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_serialcode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "SerialCode"
                    })
                }),
            ]
        });
        this.rightTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rightrows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_serialcode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "SerialCode"
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
                                        that.fireViewEvents(that.autoSelectMaterialSerialEvent
                                            , openui5.utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>
                                                (that.journalLineTable).firstOrDefault()
                                            , emAutoSelectBatchSerialRules.FIRSTINFIRSTOUT);
                                    }
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("materials_app_autoselectbatch_by_batchno"),
                                    press: function (): void {
                                        that.fireViewEvents(that.autoSelectMaterialSerialEvent
                                            , openui5.utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>
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
                        that.fireViewEvents(that.removeSerialMaterialSerialEvent,
                            // 获取表格选中的对象
                            openui5.utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(),
                            openui5.utils.getTableSelecteds<bo.MaterialBatchJournal>(that.rightTable),
                        );
                    }
                }),
                new sap.m.Button("", {
                    text: ">",
                    press: function (): void {
                        that.fireViewEvents(that.addSerialMaterialSerialEvent,
                            // 获取表格选中的对象
                            openui5.utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(),
                            openui5.utils.getTableSelecteds<bo.MaterialBatch>(that.leftTable),
                        );
                    }
                })
            ]
        });
        this.splitter = new sap.ui.layout.Splitter("", {
            orientation: sap.ui.core.Orientation.Horizontal,
            contentAreas: [
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "41%",
                    }),
                    contentAreas: [
                        this.leftTable
                    ]
                }),
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "130px",
                    }),
                    contentAreas: [
                        this.actionLayout
                    ]
                }),
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "41%",
                    }),
                    contentAreas: [
                        this.rightTable
                    ]
                }),
            ]
        });
        this.mainLayout = new sap.ui.layout.VerticalLayout("", {
            width: "750px",
            wrapping: false,
            content: [
                this.journalLineTable,
                this.splitter
            ]
        });
        this.id = this.mainLayout.getId();
        return new sap.m.Dialog("", {
            title: this.title,
            type: sap.m.DialogType.Standard,
            state: sap.ui.core.ValueState.None,
            stretchOnPhone: true,
            horizontalScrolling: true,
            verticalScrolling: true,
            content: [this.mainLayout],
            buttons: [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_data_save"),
                    type: sap.m.ButtonType.Transparent,
                    press: function (): void {
                        that.fireViewEvents(that.saveDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_exit"),
                    type: sap.m.ButtonType.Transparent,
                    press: function (): void {
                        that.fireViewEvents(that.closeEvent);
                    }
                }),
            ]
        });
    }
    private lastCriteria: ibas.ICriteria;

    showJournalLineData(datas: bo.MaterialBatchSerialInOutData[]): void {
        this.journalLineTable.setModel(new sap.ui.model.json.JSONModel({ journallinedata: datas }));
        openui5.utils.refreshModelChanged(this.journalLineTable, datas);
    }
    showLeftData(datas: bo.MaterialSerial[]): void {
        this.leftTable.setModel(new sap.ui.model.json.JSONModel({ leftrows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.leftTable, datas);
    }
    showRightData(datas: bo.MaterialSerialJournal[]): void {
        this.rightTable.setModel(new sap.ui.model.json.JSONModel({ rightrows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.rightTable, datas);
    }
}