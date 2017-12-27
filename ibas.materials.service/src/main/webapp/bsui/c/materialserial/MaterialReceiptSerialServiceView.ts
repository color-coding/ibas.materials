/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 * @Author: fancy
 * @Date: 2017-11-30 17:55:41
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-22 16:06:41
 */


import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import {
    IMaterialReceiptSerialView,
    MaterialSerialServiceJournal
} from "../../../bsapp/materialserial/index";

export class MaterialReceiptSerialServiceView extends ibas.BODialogView implements IMaterialReceiptSerialView {
    /** 添加批次事件 */
    addSerialEvent: Function;
    /** 移除批次事件 */
    removeSerialEvent: Function;
    /** 确定事件 */
    confirmDataEvent: Function;
    /** 自动创建批次事件 */
    autoCreateSerialEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialSerialJournalLineEvent: Function;
    private layoutMain: sap.ui.layout.VerticalLayout;
    private journalLineTable: sap.ui.table.Table;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.table = new sap.ui.table.Table("", {
            toolbar: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("materials_sys_autocreate"),
                        type: sap.m.ButtonType.Transparent,
                        press: function (): void {
                            that.fireViewEvents(that.autoCreateSerialEvent,
                                openui5.utils.getTableSelecteds<MaterialSerialServiceJournal>(that.journalLineTable).firstOrDefault()
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addSerialEvent,
                                openui5.utils.getTableSelecteds<MaterialSerialServiceJournal>(that.journalLineTable).firstOrDefault());
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeSerialEvent,
                                openui5.utils.getTableSelecteds<MaterialSerialServiceJournal>(that.journalLineTable).firstOrDefault(),
                                openui5.utils.getTableSelecteds<bo.MaterialSerialJournal>(that.table)
                            );
                        }
                    }),
                ]
            }),
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                    template: new sap.m.Input("", {
                    }).bindProperty("value", {
                        path: "supplierSerial"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_serialcode"),
                    template: new sap.m.Input("", {
                    }).bindProperty("value", {
                        path: "serialCode",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                    template: new sap.m.DatePicker("", {
                    }).bindProperty("dateValue", {
                        path: "expirationDate"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                    template: new sap.m.DatePicker("", {
                    }).bindProperty("dateValue", {
                        path: "manufacturingDate"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_admissiondate"),
                    template: new sap.m.DatePicker("", {
                    }).bindProperty("dateValue", {
                        path: "admissionDate"
                    })
                }),
            ]
        });
        this.journalLineTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            selectionMode: sap.ui.table.SelectionMode.Single,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rowSelectionChange: function (): void {
                that.fireViewEvents(that.selectMaterialSerialJournalLineEvent,
                    openui5.utils.getTableSelecteds<MaterialSerialServiceJournal>(that.journalLineTable).firstOrDefault(), );
            },
            rows: "{/journallinedata}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_itemCode"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "itemCode",
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
                    label: ibas.i18n.prop("bo_materialserialjournal_createdquantity"),
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
        this.layoutMain = new sap.ui.layout.VerticalLayout("", {
            content: [
                this.journalLineTable,
                this.table
            ]
        });
        this.id = this.layoutMain.getId();
        return new sap.m.Dialog("", {
            title: this.title,
            type: sap.m.DialogType.Standard,
            state: sap.ui.core.ValueState.None,
            stretchOnPhone: true,
            horizontalScrolling: true,
            verticalScrolling: true,
            content: [this.layoutMain],
            buttons: [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_confirm"),
                    type: sap.m.ButtonType.Transparent,
                    press: function (): void {
                        that.fireViewEvents(that.confirmDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_data_close"),
                    type: sap.m.ButtonType.Transparent,
                    press: function (): void {
                        that.fireViewEvents(that.closeEvent);
                    }
                }),
            ]
        });
    }
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: bo.MaterialSerialJournal[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        openui5.utils.refreshModelChanged(this.table, datas);
    }
    showJournalLineData(datas: MaterialSerialServiceJournal[]): void {
        this.journalLineTable.setModel(new sap.ui.model.json.JSONModel({ journallinedata: datas }));
        // openui5.utils.refreshModelChanged(this.journalLineTable, datas);
    }
    private lastCriteria: ibas.ICriteria;

}