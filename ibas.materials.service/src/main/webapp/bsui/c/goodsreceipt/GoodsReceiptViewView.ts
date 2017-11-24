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
import { IGoodsReceiptViewView } from "../../../bsapp/goodsreceipt/index";

/**
 * 查看视图-库存收货
 */
export class GoodsReceiptViewView extends ibas.BOViewView implements IGoodsReceiptViewView {
    private mainLayout: sap.ui.layout.VerticalLayout;
    private viewBottomForm: sap.ui.layout.form.SimpleForm;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: false,
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
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_docentry") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "docEntry"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_documentstatus") }),
                new sap.m.Text("", {
                    wrapping: false
                }).bindProperty("text", {
                    path: "documentStatus",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emDocumentStatus, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_reference1") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "reference1"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_reference2") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "reference2"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_date_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_postingdate") }),
                new sap.m.Text("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    showFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("text", {
                    path: "PostingDate",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_deliverydate") }),
                new sap.m.Text("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    showFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("text", {
                    path: "DeliveryDate",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_documentdate") }),
                new sap.m.Text("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    showFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("text", {
                    path: "documentDate",
                }),
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_goodsreceiptline") }));
        this.tableGoodsReceiptLine = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.RowOnly,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_lineid"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "lineId"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_linestatus"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "lineStatus",
                        formatter(data: any): any {
                            return ibas.enums.describe(ibas.emDocumentStatus, data);
                        }
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_itemcode"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "itemCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_itemdescription"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "ItemDescription"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_quantity"),
                    template: new sap.m.Text("", {
                        width: "100%",
                        type: sap.m.InputType.Number,
                    }).bindProperty("text", {
                        path: "quantity"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_uom"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "UOM"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_goodsreceiptline_warehouse"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "Warehouse"
                    })
                })
            ]
        });
        this.form.addContent(this.tableGoodsReceiptLine);
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
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "/remarks"
                }),
            ]
        });
        this.mainLayout = new sap.ui.layout.VerticalLayout("", {
            content: [
                this.form,
                this.tableGoodsReceiptLine,
                this.viewBottomForm,
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
                contentLeft: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_edit"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://edit",
                        press: function (): void {
                            that.fireViewEvents(that.editDataEvent);
                        }
                    })
                ],
                contentRight: [
                    new sap.m.Button("", {
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://action",
                        press: function (event: any): void {
                            that.fireViewEvents(that.callServicesEvent, {
                                displayServices(services: ibas.IServiceAgent[]): void {
                                    if (ibas.objects.isNull(services) || services.length === 0) {
                                        return;
                                    }
                                    let popover: sap.m.Popover = new sap.m.Popover("", {
                                        showHeader: false,
                                        placement: sap.m.PlacementType.Bottom,
                                    });
                                    for (let service of services) {
                                        popover.addContent(new sap.m.Button({
                                            text: ibas.i18n.prop(service.name),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: service.icon,
                                            press: function (): void {
                                                service.run();
                                                popover.close();
                                            }
                                        }));
                                    }
                                    (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                    popover.openBy(event.getSource(), true);
                                }
                            });
                        }
                    })
                ]
            }),
            content: [this.mainLayout]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private tableGoodsReceiptLine: sap.ui.table.Table;

    /** 显示数据 */
    showGoodsReceipt(data: bo.GoodsReceipt): void {
        this.mainLayout.setModel(new sap.ui.model.json.JSONModel(data));
        this.mainLayout.bindObject("/");
    }
    /** 显示数据 */
    showGoodsReceiptLines(datas: bo.GoodsReceiptLine[]): void {
        this.tableGoodsReceiptLine.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
    }
}
