/*
 * @Author: fancy
 * @Date: 2017-11-27 16:44:31
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-01 16:44:15
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IMaterialBatchReceiptView } from "../../../bsapp/materialbatch/index";

export class MaterialBatchReceiptView extends ibas.BODialogView implements IMaterialBatchReceiptView {
    /** 添加批次事件 */
    addBatchEvent: Function;
    /** 保存事件 */
    saveDataEvent: Function;
    /** 移除批次事件 */
    removeBatchEvent: Function;
    /** 自动创建批次事件 */
    autoCreateBatchEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialBatchJournalLineEvent: Function;
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
                            that.fireViewEvents(that.autoCreateBatchEvent,
                                openui5.utils.getTableSelecteds<bo.MaterialBatchService>(that.journalLineTable).firstOrDefault()
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addBatchEvent,
                                openui5.utils.getTableSelecteds<bo.MaterialBatchService>(that.journalLineTable).firstOrDefault());
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeBatchEvent,
                                openui5.utils.getTableSelecteds<bo.MaterialBatchService>(that.journalLineTable).firstOrDefault(),
                                openui5.utils.getTableSelecteds<bo.MaterialBatch>(that.table)
                            );
                        }
                    }),
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "BatchCode",
                        type: new openui5.datatype.Alphanumeric({
                            description: ibas.i18n.prop("bo_materialbatch_batchcode"),
                            validate(oValue: string): openui5.datatype.ValidateResult {
                                let result: openui5.datatype.ValidateResult = new openui5.datatype.ValidateResult();
                                result.status = true;
                                let bo: bo.MaterialBatchJournal[] = that.table.getModel().getOriginalProperty("/rows");
                                if (ibas.strings.isEmpty(oValue)) {
                                    result.status = false;
                                    result.message = ibas.i18n.prop("bo_materialbatch_batchcode_is_empty");
                                } else if (bo.filter(c => c.batchCode === oValue).length > 0) {
                                    result.status = false;
                                    result.message = ibas.i18n.prop("bo_materialbatch_batchcode_is_exist");
                                }
                                return result;
                            }
                        })
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_quantity"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "quantity"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                    template: new sap.m.DatePicker("", {
                        valueFormat: "yyyy-MM-dd",
                    }).bindProperty("dateValue", {
                        path: "ExpirationDate"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                    template: new sap.m.DatePicker("", {
                        valueFormat: "yyyy-MM-dd",
                    }).bindProperty("dateValue", {
                        path: "ManufacturingDate"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatch_admissiondate"),
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
            selectionBehavior: sap.ui.table.SelectionBehavior.RowOnly,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rowSelectionChange: function (): void {
                that.fireViewEvents(that.selectMaterialBatchJournalLineEvent,
                    openui5.utils.getTableSelecteds<bo.MaterialBatchService>(that.journalLineTable).firstOrDefault(), );
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
                    label: ibas.i18n.prop("bo_materialbatchjournal_createdquantity"),
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
            ]
        });
    }
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: bo.MaterialBatchJournal[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // this.table.bindObject("/");
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.table, datas);
    }
    showJournalLineData(datas: bo.MaterialBatchService[]): void {
        this.journalLineTable.setModel(new sap.ui.model.json.JSONModel({ journallinedata: datas }));
        openui5.utils.refreshModelChanged(this.journalLineTable, datas);
    }

}