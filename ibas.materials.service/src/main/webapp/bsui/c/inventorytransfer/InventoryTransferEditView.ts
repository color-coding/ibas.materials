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
    private mainLayout: sap.ui.layout.VerticalLayout;
    private viewBottomForm: sap.ui.layout.form.SimpleForm;
    private priceListSelect: sap.m.Select;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.priceListSelect = new sap.m.Select("", {
        });
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
            singleContainerFullSize: false,
            adjustLabelSpan: false,
            labelSpanL: 2,
            labelSpanM: 2,
            labelSpanS: 12,
            columnsXL: 2,
            columnsL: 2,
            columnsM: 1,
            columnsS: 1,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_base_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documentstatus") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emDocumentStatus)
                }).bindProperty("selectedKey", {
                    path: "documentStatus",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_reference1") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "reference1",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_reference2") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "reference2",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_fromwarehouse") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseInventoryTransferWarehouseEvent);
                    }
                }).bindProperty("value", {
                    path: "fromWarehouse",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_pricelist") }),
                that.priceListSelect.bindProperty("selectedKey",{
                    path: "priceList",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_date_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_postingdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "postingDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_deliverydate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "deliveryDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorytransfer_documentdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "documentDate"
                }),
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorytransferline") }));
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
                                openui5.utils.getTableSelecteds<bo.InventoryTransferLine>(that.tableInventoryTransferLine)
                            );
                        }
                    }),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("materials_data_batch_serial"),
                        menu: [
                            new sap.m.Menu("", {
                                items: [
                                    new sap.m.MenuItem("", {
                                        text: ibas.i18n.prop("materials_app_materialbatchissue"),
                                        press: function (): void {
                                            that.fireViewEvents(that.chooseInventoryTransferLineMaterialBatchEvent);
                                        }
                                    }),
                                    new sap.m.MenuItem("", {
                                        text: ibas.i18n.prop("materials_app_materialserialissue"),
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
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rows}",
            columns: [
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
                    template: new sap.m.Input("", {
                        width: "100%",
                        editable: false,
                    }).bindProperty("value", {
                        path: "itemDescription"
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
                    label: ibas.i18n.prop("bo_inventorytransferline_price"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "price"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_inventorytransferline_uom"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "uOM"
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
            ]
        });
        this.form.addContent(this.tableInventoryTransferLine);
        this.viewBottomForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
            labelSpanL: 2,
            labelSpanM: 2,
            labelSpanS: 12,
            columnsXL: 2,
            columnsL: 2,
            columnsM: 1,
            columnsS: 1,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorytransfer_remarks") }),
                new sap.m.TextArea("", {
                    rows: 5,
                }).bindProperty("value", {
                    path: "/remarks"
                }),
            ]
        });
        this.mainLayout = new sap.ui.layout.VerticalLayout("", {
            content: [
                this.form,
                this.tableInventoryTransferLine,
                this.viewBottomForm,
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
            content: [this.mainLayout]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
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
            openui5.utils.changeFormEditable(this.form, false);
        }
    }
    private tableInventoryTransferLine: sap.ui.table.Table;

    /** 显示数据 */
    showInventoryTransfer(data: bo.InventoryTransfer): void {
        this.mainLayout.setModel(new sap.ui.model.json.JSONModel(data));
        this.mainLayout.bindObject("/");
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showInventoryTransferLines(datas: bo.InventoryTransferLine[]): void {
        this.tableInventoryTransferLine.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableInventoryTransferLine, datas);
    }
    /** 添加价格清单List */
    showPriceListSelect(datas: bo.MaterialPriceList[]): void {
        if (!ibas.objects.isNull(datas)) {
            for (let item of datas) {
                this.priceListSelect.addItem(new sap.ui.core.ListItem("", {
                    key: item.objectKey,
                    text: item.name,
                    additionalText: item.objectKey
                }));
            }
        }
    }
}
