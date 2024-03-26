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
            /** 查看视图-拣配清单 */
            export class PickListsViewView extends ibas.BOViewView implements app.IPickListsViewView {

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tablePickListsLine = new sap.extension.m.DataTable("", {
                        autoPopinMode: true,
                        dataInfo: {
                            code: bo.PickLists.BUSINESS_OBJECT_CODE,
                            name: bo.PickListsLine.name
                        },
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_lineid"),
                                width: "5rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_basedocument"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_pickstatus"),
                                width: "6rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_itemcode"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_itemdescription"),
                                width: "16rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_warehouse"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_inventoryquantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_pickquantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_closedquantity"),
                                width: "8rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_picklistsline_remarks"),
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
                                    new sap.extension.m.ObjectAttribute("", {
                                        active: true,
                                        bindingValue: {
                                            parts: [
                                                {
                                                    path: "baseDocumentType",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                {
                                                    path: "baseDocumentEntry",
                                                    type: new sap.extension.data.Numeric(),
                                                },
                                                {
                                                    path: "baseDocumentLineId",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            ],
                                            formatter(type: string, entry: number, lineId: number): string {
                                                if (ibas.strings.isEmpty(type)) {
                                                    return undefined;
                                                }
                                                if (lineId > 0) {
                                                    return ibas.strings.format("{0}-{1}-{2}", ibas.businessobjects.describe(type), entry, lineId);
                                                }
                                                return ibas.strings.format("{0}-{1}", ibas.businessobjects.describe(type), entry);
                                            }
                                        },
                                        press(this: sap.m.ObjectAttribute): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.PickListsLine && data.baseDocumentEntry > 0) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: data.baseDocumentType,
                                                    linkValue: data.baseDocumentEntry.toString()
                                                });
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectEnumStatus("", {
                                        text: {
                                            path: "pickStatus",
                                            type: new sap.extension.data.Enum({
                                                enumType: bo.emPickStatus,
                                                describe: true,
                                            }),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        active: true,
                                        bindingValue: {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        press(this: sap.m.ObjectAttribute): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (data instanceof bo.PickListsLine && data.baseDocumentEntry > 0) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: materials.bo.BO_CODE_MATERIAL,
                                                    linkValue: data.itemCode
                                                });
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "itemDescription",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        showValueLink: true,
                                        repository: bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: bo.Warehouse,
                                            key: bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: bo.Warehouse.PROPERTY_NAME_NAME
                                        },
                                        bindingValue: {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                    // new sap.extension.m.ObjectAttribute("", {
                                    //     bindingValue: {
                                    //         path: "quantity",
                                    //         type: new sap.extension.data.Quantity(),
                                    //     }
                                    // }),
                                    // new sap.extension.m.ObjectAttribute("", {
                                    //     bindingValue: {
                                    //         path: "uom",
                                    //         type: new sap.extension.data.Alphanumeric(),
                                    //     }
                                    // }),
                                    // new sap.extension.m.ObjectAttribute("", {
                                    //     bindingValue: {
                                    //         path: "inventoryUOM",
                                    //         type: new sap.extension.data.Alphanumeric(),
                                    //     }
                                    // }),
                                    // new sap.extension.m.ObjectAttribute("", {
                                    //     bindingValue: {
                                    //         path: "uomRate",
                                    //         type: new sap.extension.data.Rate(),
                                    //     }
                                    // }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "inventoryQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "pickQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "closedQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "remarks",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                ]
                            }),
                        }
                    });
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.PickLists.BUSINESS_OBJECT_CODE,
                        },
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "objectKey",
                                type: new sap.extension.data.Numeric(),
                                formatter(data: string): any {
                                    return ibas.strings.format("# {0}", data);
                                }
                            },
                            // objectSubtitle: {
                            // },
                            navigationBar: new sap.m.Bar("", {
                                contentLeft: [
                                    new sap.m.Button("", {
                                        text: ibas.i18n.prop("shell_data_edit"),
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://edit",
                                        visible: this.mode === ibas.emViewMode.VIEW ? false : true,
                                        press(): void {
                                            that.fireViewEvents(that.editDataEvent);
                                        }
                                    })
                                ],
                                contentRight: [
                                    new sap.m.Button("", {
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://action",
                                        press(event: sap.ui.base.Event): void {
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
                                new sap.extension.m.ObjectEnumStatus("", {
                                    enumType: bo.emPickStatus,
                                    title: ibas.i18n.prop("bo_picklists_pickstatus"),
                                    negative: true,
                                    enumValue: {
                                        path: "pickStatus",
                                        type: new sap.extension.data.Enum({
                                            enumType: bo.emPickStatus
                                        }),
                                    },
                                }),
                            ]
                        }),
                        headerContent: [
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_picklists_pickdate"),
                                bindingValue: {
                                    path: "pickDate",
                                    type: new sap.extension.data.Date(),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_picklists_picker"),
                                bindingValue: {
                                    path: "picker",
                                    type: new sap.extension.data.Alphanumeric(),
                                }
                            }),
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_picklistsline"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.tablePickListsLine
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
                                                        title: ibas.i18n.prop("bo_picklists_remarks"),
                                                        bindingValue: {
                                                            path: "remarks",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                    new sap.extension.m.ObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_picklists_reference1"),
                                                        bindingValue: {
                                                            path: "reference1",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                    new sap.extension.m.ObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_picklists_reference2"),
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
                                                        title: ibas.i18n.prop("bo_picklists_dataowner"),
                                                        bindingValue: {
                                                            path: "dataOwner",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    }),
                                                    new sap.extension.m.OrganizationObjectAttribute("", {
                                                        title: ibas.i18n.prop("bo_picklists_organization"),
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
                private tablePickListsLine: sap.extension.m.Table;

                /** 显示数据 */
                showPickLists(data: bo.PickLists): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据-拣配清单-行 */
                showPickListsLines(datas: bo.PickListsLine[]): void {
                    this.tablePickListsLine.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
