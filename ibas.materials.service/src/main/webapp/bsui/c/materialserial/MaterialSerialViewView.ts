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
import { IMaterialSerialViewView } from "../../../bsapp/materialserial/index";

/**
 * 查看视图-物料
 */
export class MaterialSerialViewView extends ibas.BOViewView implements IMaterialSerialViewView {

    /** 绘制视图 */
    public darw(): any {
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
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_serialcode") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "serialCode"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_supplierserial") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "supplierSerial"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_instock") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "inStock",
                    formatter(data: any): any {
                        return ibas.enums.describe(ibas.emYesNo, data);
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_expirationdate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "expirationDate",
                    type: "sap.ui.model.type.Date",
                    formatOptions: {
                        style: "short"
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_manufacturingdate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "manufacturingDate",
                    type: "sap.ui.model.type.Date",
                    formatOptions: {
                        style: "short"
                    }
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialserial_admissiondate") }),
                new sap.m.Text("", {
                }).bindProperty("text", {
                    path: "admissionDate",
                    type: "sap.ui.model.type.Date",
                    formatOptions: {
                        style: "short"
                    }
                })
            ],
        });
        this.leftTable = new sap.ui.table.Table("", {

        });
        this.rightTable = new sap.ui.table.Table("", {
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 5),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_basedocumenttype"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "baseDocumentType"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_basedocumententry"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentEntry"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_basedocumentlineid"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "baseDocumentLineId"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_itemcode"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "itemCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_warehousecode"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "warehouse"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_direction"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "direction",
                        formatter(data: any): any {
                            return ibas.enums.describe(ibas.emDirection, data);
                        }
                    })
                })
            ]
        });
        this.splitter = new sap.ui.layout.Splitter("", {
            orientation: sap.ui.core.Orientation.Horizontal,
            contentAreas: [
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "20%",
                    }),
                    contentAreas: [
                        this.form
                    ]
                }),
                new sap.ui.layout.Splitter("", {
                    layoutData: new sap.ui.layout.SplitterLayoutData("", {
                        resizable: false,
                        size: "80%",
                    }),
                    contentAreas: [
                        this.rightTable
                    ]
                }),
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Bar("", {
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
            content: [this.splitter]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private splitter: sap.ui.layout.Splitter;
    private leftTable: sap.ui.table.Table;
    private rightTable: sap.ui.table.Table;

    /** 显示数据 */
    public showMaterialSerial(data: bo.MaterialSerial): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        this.form.bindObject("/");
    }

    public showMaterialSerialJournal(data: bo.MaterialSerialJournal[]): void {
        this.rightTable.setModel(new sap.ui.model.json.JSONModel({ rows: data }));
        this.form.bindObject("/");
    }
}
