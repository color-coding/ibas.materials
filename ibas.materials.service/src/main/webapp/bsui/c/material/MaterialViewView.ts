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
            /** 查看视图-物料 */
            export class MaterialViewView extends ibas.BOViewView implements app.IMaterialViewView {
                /** 更多信息 */
                overviewEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.Material.BUSINESS_OBJECT_CODE,
                        },
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            objectSubtitle: {
                                parts: [
                                    {
                                        path: "code",
                                        type: new sap.extension.data.Alphanumeric(),
                                    },
                                    {
                                        path: "sign",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }
                                ]
                            },
                            objectImageShape: sap.uxap.ObjectPageHeaderPictureShape.Square,
                            objectImageURI: {
                                path: "picture",
                                type: new sap.extension.data.Alphanumeric(),
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
                                    }),
                                    new sap.m.ToolbarSeparator(),
                                    new sap.m.Button("", {
                                        text: ibas.i18n.prop("materials_overview"),
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://enter-more",
                                        press: function (): void {
                                            that.fireViewEvents(that.overviewEvent);
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
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    title: ibas.i18n.prop("bo_material_activated"),
                                    enumValue: {
                                        path: "activated",
                                        type: new sap.extension.data.YesNo(),
                                    }
                                }),
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    negative: true,
                                    title: ibas.i18n.prop("bo_material_phantomitem"),
                                    enumValue: {
                                        path: "phantomItem",
                                        type: new sap.extension.data.YesNo(),
                                    }
                                }),
                            ]
                        }),
                        headerContent: [
                            new sap.extension.m.ObjectEnumStatus("", {
                                title: ibas.i18n.prop("bo_material_itemtype"),
                                text: {
                                    path: "itemType",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emItemType,
                                        describe: true,
                                    }),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_group"),
                                bindingValue: {
                                    path: "group",
                                    type: new sap.extension.data.Alphanumeric(),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_validdate"),
                                bindingValue: {
                                    path: "validDate",
                                    type: new sap.extension.data.Date(),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_invaliddate"),
                                bindingValue: {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date(),
                                }
                            }),
                        ],
                        subSectionLayout: sap.uxap.ObjectPageSubSectionLayout.TitleOnLeft,
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_general"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_foreignname"),
                                                bindingValue: {
                                                    path: "foreignName",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_barcode"),
                                                bindingValue: {
                                                    path: "barCode",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_manufacturer"),
                                                bindingValue: {
                                                    path: "manufacturer",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_serialmanagement"),
                                                text: {
                                                    path: "serialManagement",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: ibas.emYesNo,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_batchmanagement"),
                                                text: {
                                                    path: "batchManagement",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: ibas.emYesNo,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_inventory"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectYesNoStatus("", {
                                                title: ibas.i18n.prop("bo_material_inventoryitem"),
                                                enumValue: {
                                                    path: "inventoryItem",
                                                    type: new sap.extension.data.YesNo(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_onhand"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "onHand",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                    ]
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_minimuminventory"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "minimumInventory",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                    ]
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_maximuminventory"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "maximumInventory",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                    ]
                                                }
                                            }),
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_defaultwarehouse"),
                                                repository: bo.BORepositoryMaterials,
                                                dataInfo: {
                                                    type: bo.Warehouse,
                                                    key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                    text: bo.Warehouse.PROPERTY_NAME_NAME,
                                                },
                                                bindingValue: {
                                                    path: "defaultWarehouse",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),

                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_purchase"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectYesNoStatus("", {
                                                title: ibas.i18n.prop("bo_material_purchaseitem"),
                                                enumValue: {
                                                    path: "purchaseItem",
                                                    type: new sap.extension.data.YesNo(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_onordered"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "onOrdered",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                    ]
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_purchaseuom"),
                                                bindingValue: {
                                                    path: "purchaseUOM",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_preferredvendor"),
                                                bindingValue: {
                                                    path: "preferredVendor",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                repository: businesspartner.bo.BORepositoryBusinessPartner,
                                                dataInfo: {
                                                    type: businesspartner.bo.Supplier,
                                                    key: businesspartner.bo.Supplier.PROPERTY_CODE_NAME,
                                                    text: businesspartner.bo.Supplier.PROPERTY_NAME_NAME,
                                                },
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_minimumorderquantity"),
                                                bindingValue: {
                                                    path: "minimumOrderQuantity",
                                                    type: new sap.extension.data.Quantity(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_ordermultiple"),
                                                bindingValue: {
                                                    path: "orderMultiple",
                                                    type: new sap.extension.data.Quantity(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_leadtime"),
                                                bindingValue: {
                                                    path: "leadTime",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_purchasetaxgroup"),
                                                bindingValue: {
                                                    path: "purchaseTaxGroup",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),

                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_sales"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectYesNoStatus("", {
                                                title: ibas.i18n.prop("bo_material_salesitem"),
                                                enumValue: {
                                                    path: "salesItem",
                                                    type: new sap.extension.data.YesNo(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_oncommited"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "onCommited",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                    ]
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_salesuom"),
                                                bindingValue: {
                                                    path: "salesUOM",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_salestaxgroup"),
                                                bindingValue: {
                                                    path: "salesTaxGroup",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_productunit"),
                                                text: {
                                                    path: "productUnit",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: ibas.emYesNo,
                                                        describe: true,
                                                    }),
                                                }
                                            }),

                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_production"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_procurementmethod"),
                                                text: {
                                                    path: "procurementMethod",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: bo.emProcurementMethod,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_lotsize"),
                                                bindingValue: {
                                                    path: "lotSize",
                                                    type: new sap.extension.data.Quantity(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_productionuom"),
                                                bindingValue: {
                                                    path: "productionUOM",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_planningmethod"),
                                                text: {
                                                    path: "planningMethod",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: bo.emPlanningMethod,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_issuemethod"),
                                                text: {
                                                    path: "issueMethod",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: bo.emIssueMethod,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_scrap"),
                                                bindingValue: {
                                                    path: "scrap",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                visible: {
                                                    path: "scrap",
                                                    formatter(data: number): boolean {
                                                        return !ibas.strings.isEmpty(data) ? true : false;
                                                    }
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_scraprate"),
                                                bindingValue: {
                                                    path: "scrapRate",
                                                    type: new sap.extension.data.Percentage(),
                                                },
                                                visible: {
                                                    path: "scrapRate",
                                                    formatter(data: number): boolean {
                                                        return data > 0 ? true : false;
                                                    }
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_scrapvalue"),
                                                bindingValue: {
                                                    path: "scrapValue",
                                                    type: new sap.extension.data.Quantity(),
                                                },
                                                visible: {
                                                    path: "scrapValue",
                                                    formatter(data: number): boolean {
                                                        return data > 0 ? true : false;
                                                    }
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_madetoorder"),
                                                text: {
                                                    path: "madeToOrder",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: ibas.emYesNo,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_checkcompleteness"),
                                                text: {
                                                    path: "checkCompleteness",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: ibas.emYesNo,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectEnumStatus("", {
                                                title: ibas.i18n.prop("bo_material_mixingbatches"),
                                                text: {
                                                    path: "mixingBatches",
                                                    type: new sap.extension.data.Enum({
                                                        enumType: ibas.emYesNo,
                                                        describe: true,
                                                    }),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_darwingnumber"),
                                                bindingValue: {
                                                    path: "darwingNumber",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_matchcode"),
                                                bindingValue: {
                                                    path: "matchCode",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_scheduler"),
                                                bindingValue: {
                                                    path: "scheduler",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                                dataInfo: {
                                                    type: initialfantasy.bo.User,
                                                    key: initialfantasy.bo.User.PROPERTY_CODE_NAME,
                                                    text: initialfantasy.bo.User.PROPERTY_NAME_NAME,
                                                },
                                            }),

                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_others"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_remarks"),
                                                bindingValue: {
                                                    path: "remarks",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                        ],
                                    })
                                ]
                            }),
                        ]
                    });
                }

                private page: sap.extension.uxap.ObjectPageLayout;

                /** 显示数据 */
                showMaterial(data: bo.Material): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
            }
        }
    }
}
