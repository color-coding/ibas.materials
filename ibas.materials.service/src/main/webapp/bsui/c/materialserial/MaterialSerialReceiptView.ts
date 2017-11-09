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
import { IMaterialSerialReceiptView } from "../../../bsapp/materialserial/index";

export class MaterialSerialReceiptView extends ibas.BODialogView implements IMaterialSerialReceiptView {
    /** 添加批次事件 */
    addSerialEvent: Function;
    /** 移除批次事件 */
    saveDataEvent: Function;
    removeSerialEvent: Function;
    /** 自动创建批次事件 */
    autoCreateSerialEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialSerialJournalLineEvent: Function;
    private mainLayout: sap.ui.layout.VerticalLayout;
    private journalLineTable: sap.ui.table.Table;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.table = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("materials_sys_autocreate"),
                        type: sap.m.ButtonType.Transparent,
                        press: function (): void {
                            that.fireViewEvents(that.autoCreateSerialEvent,
                                utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault()
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addSerialEvent,
                                utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault());
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeSerialEvent,
                                utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(),
                                utils.getTableSelecteds<bo.MaterialBatch>(that.table)
                            );
                        }
                    }),
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                    template: new sap.m.Input("", {
                    }).bindProperty("value", {
                        path: "SupplierSerial"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_serialcode"),
                    template: new sap.m.Input("", {
                    }).bindProperty("value", {
                        path: "SerialCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                    template: new sap.m.DatePicker("", {
                        valueFormat: "yyyy-MM-dd",
                    }).bindProperty("dateValue", {
                        path: "ExpirationDate"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                    template: new sap.m.DatePicker("", {
                        valueFormat: "yyyy-MM-dd",
                    }).bindProperty("dateValue", {
                        path: "ManufacturingDate"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserial_admissiondate"),
                    template: new sap.m.DatePicker("", {
                        valueFormat: "yyyy-MM-dd",
                    }).bindProperty("dateValue", {
                        path: "AdmissionDate"
                    })
                }),
            ]
        });
        this.journalLineTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionMode: sap.ui.table.SelectionMode.Single,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rowSelectionChange: function (): void {
                that.fireViewEvents(that.selectMaterialSerialJournalLineEvent,
                    utils.getTableSelecteds<bo.MaterialBatchSerialInOutData>(that.journalLineTable).firstOrDefault(), );
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
        this.mainLayout = new sap.ui.layout.VerticalLayout("", {
            content: [
                this.journalLineTable,
                this.table
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
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: bo.MaterialSerialJournal[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        utils.refreshModelChanged(this.table, datas);
    }
    showJournalLineData(datas: bo.MaterialBatchSerialInOutData[]): void {
        this.journalLineTable.setModel(new sap.ui.model.json.JSONModel({ journallinedata: datas }));
        utils.refreshModelChanged(this.journalLineTable, datas);
    }
    private lastCriteria: ibas.ICriteria;

}