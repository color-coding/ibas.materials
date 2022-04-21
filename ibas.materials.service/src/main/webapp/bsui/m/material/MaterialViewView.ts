/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace m {
            /** 查看视图-物料 */
            export class MaterialViewView extends ibas.BOViewView implements app.IMaterialViewView {
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
                        }),
                        headerContent: [
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_general"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_group"),
                                                bindingValue: {
                                                    path: "group",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                repository: bo.BORepositoryMaterials,
                                                dataInfo: {
                                                    type: bo.MaterialGroup,
                                                    key: bo.MaterialGroup.PROPERTY_CODE_NAME,
                                                    text: bo.MaterialGroup.PROPERTY_NAME_NAME
                                                },
                                            }),
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
                                        ],
                                    }),
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_preferredvendor"),
                                                repository: businesspartner.bo.BORepositoryBusinessPartner,
                                                dataInfo: {
                                                    type: businesspartner.bo.Supplier,
                                                    key: businesspartner.bo.Supplier.PROPERTY_CODE_NAME,
                                                    text: businesspartner.bo.Supplier.PROPERTY_NAME_NAME
                                                },
                                                bindingValue: {
                                                    path: "preferredVendor",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_minimuminventory"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "minimumInventory",
                                                            type: new sap.extension.data.Quantity(),
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    ]
                                                }
                                            }),
                                        ],
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_inventory"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_onhand"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "onHand",
                                                            type: new sap.extension.data.Quantity(),
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    ]
                                                },
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_oncommited"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "onCommited",
                                                            type: new sap.extension.data.Quantity(),
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    ]
                                                }
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_material_onordered"),
                                                bindingValue: {
                                                    parts: [
                                                        {
                                                            path: "onOrdered",
                                                            type: new sap.extension.data.Quantity(),
                                                        },
                                                        {
                                                            path: "inventoryUOM",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        }
                                                    ]
                                                }
                                            }),
                                        ],
                                    })
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_material_remarks"),
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
                                        ]
                                    })
                                ]
                            })
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
