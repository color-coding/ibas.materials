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
            /** 查看视图-库存发货 */
            export class GoodsIssueViewView extends ibas.BOViewView implements app.IGoodsIssueViewView {

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableGoodsIssueLine = new sap.extension.m.DataTable("", {
                        autoPopinMode: true,
                        dataInfo: {
                            code: bo.GoodsIssue.BUSINESS_OBJECT_CODE,
                            name: bo.GoodsIssueLine.name
                        },
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_lineid"),
                                width: "5rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_itemdescription"),
                                width: "20rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_quantity"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_warehouse"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_price"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_linetotal"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_reference1"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_goodsissueline_reference2"),
                            }),
                        ],
                        items: {
                            path: "/rows",
                            template: new sap.m.ColumnListItem("", {
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "lineId",
                                            type: new sap.extension.data.Numeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectIdentifier("", {
                                        title: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        text: {
                                            path: "itemDescription",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        titleActive: true,
                                        titlePress(this: sap.extension.m.ObjectIdentifier): void {
                                            let data: any = this.getTitle();
                                            if (!ibas.strings.isEmpty(data)) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: materials.bo.Material.BUSINESS_OBJECT_CODE,
                                                    linkValue: data,
                                                });
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectNumber("", {
                                        number: {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity(),
                                        },
                                        unit: {
                                            path: "uom",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        bindingValue: {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Warehouse,
                                            key: bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: bo.Warehouse.PROPERTY_NAME_NAME
                                        },
                                    }),
                                    new sap.extension.m.ObjectNumber("", {
                                        number: {
                                            path: "price",
                                            type: new sap.extension.data.Price(),
                                        },
                                        unit: {
                                            path: "currency",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectNumber("", {
                                        number: {
                                            path: "lineTotal",
                                            type: new sap.extension.data.Sum(),
                                        },
                                        unit: {
                                            path: "currency",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "reference1",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "reference2",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                ]
                            }),
                        },
                        sortProperty: "visOrder",
                    });
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.GoodsIssue.BUSINESS_OBJECT_CODE,
                        },
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "docEntry",
                                type: new sap.extension.data.Numeric(),
                                formatter(data: string): any {
                                    return ibas.strings.format("# {0}", data);
                                }
                            },
                            navigationBar: new sap.m.Bar("", {
                                contentLeft: [
                                    new sap.m.Button("", {
                                        text: ibas.i18n.prop("shell_data_edit"),
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://edit",
                                        visible: this.mode === ibas.emViewMode.VIEW ? false : true,
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
                                            ibas.servicesManager.showServices({
                                                proxy: new ibas.BOServiceProxy({
                                                    data: that.page.getModel().getData(),
                                                    converter: new bo.DataConverter(),
                                                }),
                                                displayServices(services: ibas.IServiceAgent[]): void {
                                                    if (ibas.objects.isNull(services) || services.length === 0) {
                                                        return;
                                                    }
                                                    let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                        placement: sap.m.PlacementType.Bottom,
                                                        buttons: {
                                                            path: "/",
                                                            template: new sap.m.Button("", {
                                                                type: sap.m.ButtonType.Transparent,
                                                                text: {
                                                                    path: "name",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                    formatter(data: string): string {
                                                                        return data ? ibas.i18n.prop(data) : "";
                                                                    }
                                                                },
                                                                icon: {
                                                                    path: "icon",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                    formatter(data: string): string {
                                                                        return data ? data : "sap-icon://e-care";
                                                                    }
                                                                },
                                                                press(this: sap.m.Button): void {
                                                                    let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                    if (service) {
                                                                        service.run();
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    });
                                                    actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                    actionSheet.openBy(event.getSource());
                                                }
                                            });
                                        }
                                    })
                                ]
                            }),
                            actions: [
                                new sap.extension.m.ObjectDocumentStatus("", {
                                    title: ibas.i18n.prop("bo_goodsissue_documentstatus"),
                                    enumValue: {
                                        path: "documentStatus",
                                        type: new sap.extension.data.DocumentStatus(),
                                    },
                                }),
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    title: ibas.i18n.prop("bo_goodsissue_canceled"),
                                    negative: true,
                                    enumValue: {
                                        path: "canceled",
                                        type: new sap.extension.data.YesNo(),
                                    },
                                }),
                                new sap.extension.m.ObjectNumber("", {
                                    number: {
                                        path: "documentTotal",
                                        type: new sap.extension.data.Sum()
                                    },
                                    unit: {
                                        path: "documentCurrency",
                                        type: new sap.extension.data.Alphanumeric()
                                    },
                                }).addStyleClass("sapMObjectNumberLarge"),
                            ]
                        }),
                        headerContent: [
                            new sap.ui.layout.VerticalLayout("", {
                                width: "30%",
                                content: [
                                    new sap.extension.m.PropertyObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_goodsissue_ordertype"),
                                        bindingValue: {
                                            path: "orderType",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        dataInfo: {
                                            code: bo.GoodsIssue.BUSINESS_OBJECT_CODE,
                                        },
                                        propertyName: "orderType",
                                    }),
                                ],
                            }),
                            new sap.ui.layout.VerticalLayout("", {
                                width: "30%",
                                content: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_goodsissue_documentdate"),
                                        bindingValue: {
                                            path: "documentDate",
                                            type: new sap.extension.data.Date(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_goodsissue_deliverydate"),
                                        bindingValue: {
                                            path: "deliveryDate",
                                            type: new sap.extension.data.Date(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_goodsissue_postingdate"),
                                        bindingValue: {
                                            path: "postingDate",
                                            type: new sap.extension.data.Date(),
                                        }
                                    }),
                                ]
                            }),
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_goodsissueline"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.tableGoodsIssueLine
                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_others"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.ui.layout.VerticalLayout("", {
                                                content: [
                                                    new sap.extension.m.ObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_goodsissue_remarks"),
                                                        bindingValue: {
                                                            path: "remarks",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                    new sap.extension.m.ObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_goodsissue_reference1"),
                                                        bindingValue: {
                                                            path: "reference1",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                    new sap.extension.m.ObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_goodsissue_reference2"),
                                                        bindingValue: {
                                                            path: "reference2",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                ]
                                            }),
                                            new sap.ui.layout.VerticalLayout("", {
                                                content: [
                                                    new sap.extension.m.UserObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_goodsissue_dataowner"),
                                                        bindingValue: {
                                                            path: "dataOwner",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_goodsissue_project"),
                                                        bindingValue: {
                                                            path: "project",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        },
                                                        repository: accounting.bo.BORepositoryAccounting,
                                                        dataInfo: {
                                                            type: accounting.bo.Project,
                                                            key: accounting.bo.Project.PROPERTY_CODE_NAME,
                                                            text: accounting.bo.Project.PROPERTY_NAME_NAME,
                                                        },
                                                    }),
                                                    new sap.extension.m.OrganizationObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_goodsissue_organization"),
                                                        bindingValue: {
                                                            path: "organization",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                ]
                                            }),
                                        ],
                                    })
                                ]
                            }),
                        ]
                    });
                }

                private page: sap.extension.uxap.ObjectPageLayout;
                private tableGoodsIssueLine: sap.extension.m.Table;

                /** 显示数据 */
                showGoodsIssue(data: bo.GoodsIssue): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据-库存发货-行 */
                showGoodsIssueLines(datas: bo.GoodsIssueLine[]): void {
                    this.tableGoodsIssueLine.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
