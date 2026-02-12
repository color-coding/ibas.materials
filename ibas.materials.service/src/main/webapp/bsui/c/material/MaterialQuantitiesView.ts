/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 视图-物料数量服务 */
            export class MaterialQuantitiesView extends ibas.DialogView implements app.IMaterialQuantitiesView {
                /** 应用改变事件 */
                applyEvent: Function;
                /** 查询库存事件 */
                fetchInventoryEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        contentHeight: ibas.strings.format("{0}px", window.innerHeight * 0.6),
                        contentWidth: ibas.strings.format("{0}px", window.innerWidth * 0.6),
                        content: [
                            new sap.m.VBox("", {
                                width: "100%",
                                height: "100%",
                                renderType: sap.m.FlexRendertype.Bare,
                                alignItems: sap.m.FlexAlignItems.Stretch,
                                alignContent: sap.m.FlexAlignItems.Stretch,
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                items: [
                                    this.itemHeader = new sap.m.ObjectHeader("", {
                                        responsive: true,
                                        fullScreenOptimized: true,
                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                        imageShape: sap.m.ObjectHeaderPictureShape.Square,
                                        icon: {
                                            path: "/picture",
                                            formatter(data: any): any {
                                                if (ibas.strings.isEmpty(data)) {
                                                    return "sap-icon://product";
                                                }
                                                if (ibas.strings.isWith(data, "http", undefined)) {
                                                    return ibas.urls.normalize(data);
                                                }
                                                return new bo.BORepositoryMaterials().toUrl(data);
                                            }
                                        },
                                        iconActive: true,
                                        iconPress(this: sap.m.ObjectHeader): void {
                                            let data: any = (<any>this.getModel()).getData();
                                            if (data instanceof bo.Material) {
                                                let url: string = data.picture;
                                                if (!ibas.strings.isEmpty(url)) {
                                                    if (ibas.strings.isWith(url, "http", undefined)) {
                                                        url = ibas.urls.normalize(url);
                                                    } else {
                                                        url = new bo.BORepositoryMaterials().toUrl(url);
                                                    }
                                                    let lightBox: sap.m.LightBox = new sap.m.LightBox("", {
                                                        imageContent: [
                                                            new sap.m.LightBoxItem("", {
                                                                imageSrc: url,
                                                            })
                                                        ]
                                                    });
                                                    lightBox.open();
                                                }
                                            }
                                        },
                                        title: {
                                            path: "/name",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        titleLevel: sap.ui.core.TitleLevel.H3,
                                        titleActive: true,
                                        titlePress(this: sap.m.ObjectHeader): void {
                                            let data: any = (<any>this.getModel()).getData();
                                            if (data instanceof bo.Material) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: data.objectCode,
                                                    linkValue: data.code
                                                });
                                            }
                                        },
                                        intro: {
                                            parts: [
                                                {
                                                    path: "/code",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                                {
                                                    path: "/sign",
                                                    type: new sap.extension.data.Alphanumeric()
                                                },
                                            ]
                                        },
                                        introActive: false,
                                        introPress(): void {
                                        },
                                        number: {
                                            path: "/onHand",
                                            type: new sap.extension.data.Quantity()
                                        },
                                        numberUnit: {
                                            path: "/inventoryUOM",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        numberState: sap.ui.core.ValueState.Success,
                                        attributes: [
                                        ]
                                    }).addStyleClass("sapUiResponsivePadding--header"),
                                    this.container = new sap.m.NavContainer("", {
                                        height: "100%",
                                        autoFocus: false,
                                        defaultTransitionName: "baseSlide",
                                        pages: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                content: [
                                                    this.tableInventory = new sap.extension.table.DataTable("", {
                                                        alternateRowColors: true,
                                                        chooseType: ibas.emChooseType.SINGLE,
                                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
                                                        rows: "{/rows}",
                                                        fixedColumnCount: 1,
                                                        columns: [
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                                                template: new sap.extension.m.RepositoryText("", {
                                                                    repository: bo.BORepositoryMaterials,
                                                                    dataInfo: {
                                                                        type: bo.Warehouse,
                                                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                    },
                                                                }).bindProperty("bindingValue", {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                width: "100%",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialinventory_onhand"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "onHand",
                                                                    type: new sap.extension.data.Quantity()
                                                                }),
                                                                sortProperty: "onHand",
                                                                filterProperty: "onHand"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "onCommited",
                                                                    type: new sap.extension.data.Quantity()
                                                                }),
                                                                sortProperty: "onCommited",
                                                                filterProperty: "onCommited"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialinventory_onordered"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "onOrdered",
                                                                    type: new sap.extension.data.Quantity()
                                                                }),
                                                                sortProperty: "onOrdered",
                                                                filterProperty: "onOrdered"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialinventory_onreserved"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "onReserved",
                                                                    type: new sap.extension.data.Quantity()
                                                                }),
                                                                sortProperty: "onReserved",
                                                                filterProperty: "onReserved"
                                                            }),
                                                        ],
                                                    })
                                                ],
                                            }),
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                content: [
                                                    this.tableBatch = new sap.extension.table.DataTable("", {
                                                        alternateRowColors: true,
                                                        chooseType: ibas.emChooseType.MULTIPLE,
                                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
                                                        rows: "{/rows}",
                                                        fixedColumnCount: 2,
                                                        columns: [
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "batchCode",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                sortProperty: "batchCode",
                                                                filterProperty: "batchCode"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                                                template: new sap.extension.m.RepositoryText("", {
                                                                    repository: bo.BORepositoryMaterials,
                                                                    dataInfo: {
                                                                        type: bo.Warehouse,
                                                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                    },
                                                                }).bindProperty("bindingValue", {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_locked"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "locked",
                                                                    type: new sap.extension.data.YesNo(true),
                                                                }),
                                                                width: "4rem",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "quantity",
                                                                    type: new sap.extension.data.Quantity(),
                                                                }),
                                                                width: "8rem",
                                                                sortProperty: "quantity",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_reservedquantity"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "reservedQuantity",
                                                                    type: new sap.extension.data.Quantity(),
                                                                }),
                                                                width: "8rem",
                                                                sortProperty: "reservedQuantity",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "supplierSerial",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                sortProperty: "supplierSerial",
                                                                filterProperty: "supplierSerial"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_version"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "version",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                width: "6rem",
                                                                sortProperty: "version",
                                                                filterProperty: "version"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "expirationDate",
                                                                    type: new sap.extension.data.Date(),
                                                                }),
                                                                sortProperty: "expirationDate",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "manufacturingDate",
                                                                    type: new sap.extension.data.Date(),
                                                                }),
                                                                sortProperty: "manufacturingDate",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialbatch_notes"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "notes",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                width: "14rem",
                                                                filterProperty: "notes"
                                                            }),
                                                        ],
                                                    }),
                                                ]
                                            }),
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                content: [
                                                    this.tableSerial = new sap.extension.table.DataTable("", {
                                                        enableSelectAll: true,
                                                        alternateRowColors: true,
                                                        chooseType: ibas.emChooseType.MULTIPLE,
                                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
                                                        rows: "{/rows}",
                                                        fixedColumnCount: 2,
                                                        columns: [
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "serialCode",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                sortProperty: "serialCode",
                                                                filterProperty: "serialCode"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                                                template: new sap.extension.m.RepositoryText("", {
                                                                    repository: bo.BORepositoryMaterials,
                                                                    dataInfo: {
                                                                        type: bo.Warehouse,
                                                                        key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                        text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                    },
                                                                }).bindProperty("bindingValue", {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_locked"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "locked",
                                                                    type: new sap.extension.data.YesNo(true),
                                                                }),
                                                                width: "4rem",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_instock"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "inStock",
                                                                    type: new sap.extension.data.YesNo(true),
                                                                }),
                                                                width: "4rem",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_reserved"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "reserved",
                                                                    type: new sap.extension.data.YesNo(true),
                                                                }),
                                                                width: "4rem",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "supplierSerial",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                sortProperty: "supplierSerial",
                                                                filterProperty: "supplierSerial"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_version"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "version",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                width: "6rem",
                                                                sortProperty: "version",
                                                                filterProperty: "version"
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "expirationDate",
                                                                    type: new sap.extension.data.Date(),
                                                                }),
                                                                sortProperty: "expirationDate",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "manufacturingDate",
                                                                    type: new sap.extension.data.Date(),
                                                                }),
                                                                sortProperty: "manufacturingDate",
                                                            }),
                                                            new sap.extension.table.Column("", {
                                                                label: ibas.i18n.prop("bo_materialserial_notes"),
                                                                template: new sap.extension.m.Text("", {
                                                                }).bindProperty("bindingValue", {
                                                                    path: "notes",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }),
                                                                width: "14rem",
                                                                filterProperty: "notes"
                                                            }),
                                                        ],
                                                    }),
                                                ]
                                            }),
                                        ]
                                    }),
                                ]
                            }),
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_apply"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireApplyEvent();
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
                    }).addStyleClass("sapUiNoContentPadding");
                }

                private itemHeader: sap.m.ObjectHeader;
                showMaterial(data: bo.IMaterial): void {
                    this.itemHeader.setModel(new sap.extension.model.JSONModel(data));
                    if (data.batchManagement === ibas.emYesNo.YES) {
                        this.container.to(this.tableBatch.getParent().getId());
                    } else if (data.serialManagement === ibas.emYesNo.YES) {
                        this.container.to(this.tableSerial.getParent().getId());
                    } else {
                        this.container.to(this.tableInventory.getParent().getId());
                    }
                    // 自动触发查询库存
                    this.fireViewEvents(this.fetchInventoryEvent);
                }
                protected container: sap.m.NavContainer;
                private tableInventory: sap.extension.table.Table;
                private tableBatch: sap.extension.table.Table;
                private tableSerial: sap.extension.table.Table;
                /** 显示物料库存 */
                showInventories(datas: bo.IMaterialInventory[] | bo.IMaterialBatch[] | bo.IMaterialSerial[]): void {
                    if (datas.length > 0) {
                        if (datas[0] instanceof bo.MaterialInventory) {
                            this.tableInventory.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        } else if (datas[0] instanceof bo.MaterialBatch) {
                            this.tableBatch.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        } else if (datas[0] instanceof bo.MaterialSerial) {
                            this.tableSerial.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        }
                    } else {
                        this.tableInventory.setModel(undefined);
                        this.tableBatch.setModel(undefined);
                        this.tableSerial.setModel(undefined);
                    }
                }
                /** 触发应用事件 */
                protected fireApplyEvent(): void {
                    let page: any = this.container.getCurrentPage();
                    if (page instanceof sap.m.Page) {
                        let table: any = page.getContent()[0];
                        if (table instanceof sap.extension.table.Table) {
                            let warehouse: string = null;
                            let selecteds: ibas.ArrayList<any> = new ibas.ArrayList<any>();
                            for (let item of table.getSelecteds()) {
                                if (item instanceof bo.MaterialInventory) {
                                    if (ibas.objects.isNull(warehouse)) {
                                        warehouse = item.warehouse;
                                    }
                                    if (warehouse !== item.warehouse) {
                                        continue;
                                    }
                                } else if (item instanceof bo.MaterialBatch) {
                                    if (ibas.objects.isNull(warehouse)) {
                                        warehouse = item.warehouse;
                                    }
                                    if (warehouse !== item.warehouse) {
                                        continue;
                                    }
                                } else if (item instanceof bo.MaterialSerial) {
                                    if (ibas.objects.isNull(warehouse)) {
                                        warehouse = item.warehouse;
                                    }
                                    if (warehouse !== item.warehouse) {
                                        continue;
                                    }
                                } else {
                                    continue;
                                }
                                selecteds.add(item);
                            }
                            this.fireViewEvents(this.applyEvent, selecteds);
                        }
                    }
                }
            }
        }
    }
}