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
import { IInventoryTransferEditView } from "../../../bsapp/inventorytransfer/index";

/**
 * 编辑视图-库存转储
 */
export class InventoryTransferEditView extends ibas.BOEditView implements IInventoryTransferEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 选择库存转储单从仓库事件 */
    chooseInventoryTransferWarehouseEvent: Function;
    /** 选择库存转储单物料价格清单 */
    chooseeInventoryTransferMaterialPriceListEvent: Function;
    /** 添加库存转储-行事件 */
    addInventoryTransferLineEvent: Function;
    /** 删除库存转储-行事件 */
    removeInventoryTransferLineEvent: Function;
    /** 选择库存转储单行物料事件 */
    chooseInventoryTransferLineMaterialEvent: Function;
    /** 选择库存转储单行仓库事件 */
    chooseInventoryTransferLineWarehouseEvent: Function;
    /** 选择库存转储单行物料批次事件 */
    chooseInventoryTransferLineMaterialBatchEvent: Function;
    /** 选择库存转储单行物料序列事件 */
    chooseInventoryTransferLineMaterialSerialEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_docentry") }),
                new sap.m.Input("", {
                    editable: false,
                }).bindProperty("value", {
                    path: "docEntry",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_fromwarehouse") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseInventoryTransferWarehouseEvent);
                    }
                }).bindProperty("value", {
                    path: "fromWarehouse"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_pricelist") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseeInventoryTransferMaterialPriceListEvent);
                    }
                }).bindProperty("value", {
                    path: "priceList"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_reference1") }),
                new sap.m.Input("", {}).bindProperty("value", {
                    path: "reference1"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_reference2") }),
                new sap.m.Input("", {}).bindProperty("value", {
                    path: "reference2"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documentstatus") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emDocumentStatus),
                }).bindProperty("selectedKey", {
                    path: "documentStatus",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_canceled") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "canceled",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documentdate") }),
                new sap.m.DatePicker("", {
                }).bindProperty("dateValue", {
                    path: "documentDate",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_dataowner") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                }).bindProperty("value", {
                    path: "dataOwner",
                }),
            ]
        });
        this.tableInventoryTransferLine = new sap.ui.table.Table("", {
            toolbar: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addInventoryTransferLineEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeInventoryTransferLineEvent,
                                // 获取表格选中的对象
                                openui5.utils.getSelecteds<bo.InventoryTransferLine>(that.tableInventoryTransferLine)
                            );
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.strings.format("{0}/{1}",
                            ibas.i18n.prop("materials_material_batch"), ibas.i18n.prop("materials_material_serial")),
                        menu: [
                            new sap.m.Menu("", {
                                items: [
                                    new sap.m.MenuItem("", {
                                        text: ibas.i18n.prop("materials_material_batch"),
                                        press: function (): void {
                                            that.fireViewEvents(that.chooseInventoryTransferLineMaterialBatchEvent);
                                        }
                                    }),
                                    new sap.m.MenuItem("", {
                                        text: ibas.i18n.prop("materials_material_serial"),
                                        press: function (): void {
                                            that.fireViewEvents(that.chooseInventoryTransferLineMaterialSerialEvent);
                                        }
                                    }),
                                ]
                            })
                        ]
                    })
                ]
            }),
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_lineid"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "lineId",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_linestatus"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: openui5.utils.createComboBoxItems(ibas.emDocumentStatus),
                    }).bindProperty("selectedKey", {
                        path: "lineStatus",
                        type: "sap.ui.model.type.Integer",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_itemcode"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        showValueHelp: true,
                        valueHelpRequest: function (): void {
                            that.fireViewEvents(that.chooseInventoryTransferLineMaterialEvent,
                                // 获取当前对象
                                this.getBindingContext().getObject()
                            );
                        }
                    }).bindProperty("value", {
                        path: "itemCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_itemdescription"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "itemDescription"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_warehouse"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        showValueHelp: true,
                        valueHelpRequest: function (): void {
                            that.fireViewEvents(that.chooseInventoryTransferLineWarehouseEvent,
                                // 获取当前对象
                                this.getBindingContext().getObject()
                            );
                        }
                    }).bindProperty("value", {
                        path: "warehouse"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_quantity"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "quantity"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_uom"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "uom"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_price"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "price"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_currency"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "currency"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_linetotal"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "lineTotal"
                    })
                }),
            ]
        });
        let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorytransferline") }),
                this.tableInventoryTransferLine,
            ]
        });
        let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_remarks") }),
                new sap.m.TextArea("", {
                    rows: 5,
                }).bindProperty("value", {
                    path: "remarks",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_total") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documenttotal") }),
                new sap.m.Input("", {
                    editable: false,
                }).bindProperty("value", {
                    path: "documentTotal"
                }),
            ]
        });
        this.layoutMain = new sap.ui.layout.VerticalLayout("", {
            content: [
                formTop,
                formMiddle,
                formBottom,
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("shell_data_new"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://create",
                        buttonMode: sap.m.MenuButtonMode.Split,
                        defaultAction: function (): void {
                            // 触发新建对象
                            that.fireViewEvents(that.createDataEvent, false);
                        },
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    icon: "sap-icon://create"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_clone"),
                                    icon: "sap-icon://copy"
                                }),
                            ],
                            itemSelected: function (event: any): void {
                                let item: any = event.getParameter("item");
                                if (item instanceof sap.m.MenuItem) {
                                    if (item.getIcon() === "sap-icon://copy") {
                                        // 触发克隆对象
                                        that.fireViewEvents(that.createDataEvent, true);
                                    } else {
                                        // 触发新建对象
                                        that.fireViewEvents(that.createDataEvent, false);
                                    }
                                }
                            }
                        })
                    }),
                ]
            }),
            content: [this.layoutMain]
        });
        return this.page;
    }
    private page: sap.m.Page;
    private layoutMain: sap.ui.layout.VerticalLayout;
    /** 改变视图状态 */
    private changeViewStatus(data: bo.InventoryTransfer): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
        if (data.approvalStatus === ibas.emApprovalStatus.APPROVED) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
            openui5.utils.changeFormEditable(this.layoutMain, false);
        }
    }
    private tableInventoryTransferLine: sap.ui.table.Table;

    /** 显示数据 */
    showInventoryTransfer(data: bo.InventoryTransfer): void {
        this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
        this.layoutMain.bindObject("/");
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.layoutMain, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showInventoryTransferLines(datas: bo.InventoryTransferLine[]): void {
        this.tableInventoryTransferLine.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableInventoryTransferLine, datas);
    }
}
