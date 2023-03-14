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
            /** 查看视图-物料废品率 */
            export class MaterialScrapViewView extends ibas.BOViewView implements app.IMaterialScrapViewView {

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableMaterialScrapSection = new sap.extension.m.DataTable("", {
                        autoPopinMode: true,
                        dataInfo: {
                            code: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                            name: bo.MaterialScrapSection.name
                        },
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialscrapsection_lineid"),
                                width: "4rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialscrapsection_sectionstart"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialscrapsection_sectionend"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialscrapsection_rate"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialscrapsection_value"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_materialscrapsection_remarks"),
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
                                        bindingValue: {
                                            path: "sectionStart",
                                            type: new sap.extension.data.Quantity(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "sectionEnd",
                                            type: new sap.extension.data.Quantity(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "rate",
                                            type: new sap.extension.data.Percentage(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "value",
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
                            code: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                        },
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            objectSubtitle: {
                                path: "description",
                                type: new sap.extension.data.Alphanumeric(),
                            },
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
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    title: ibas.i18n.prop("bo_materialscrap_activated"),
                                    enumValue: {
                                        path: "activated",
                                        type: new sap.extension.data.YesNo(),
                                    }
                                }),
                            ]
                        }),
                        headerContent: [
                            new sap.extension.m.ObjectYesNoStatus("", {
                                title: ibas.i18n.prop("bo_materialscrap_tiered"),
                                enumValue: {
                                    path: "tiered",
                                    type: new sap.extension.data.YesNo(),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_materialscrap_rate"),
                                bindingValue: {
                                    path: "rate",
                                    type: new sap.extension.data.Percentage(),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_materialscrap_value"),
                                bindingValue: {
                                    path: "value",
                                    type: new sap.extension.data.Quantity(),
                                }
                            }),
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_materialscrapsection"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.tableMaterialScrapSection
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
                                                title: ibas.i18n.prop("bo_materialscrap_remarks"),
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
                private tableMaterialScrapSection: sap.extension.m.Table;

                /** 显示数据 */
                showMaterialScrap(data: bo.MaterialScrap): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据-物料废品率 - 阶梯 */
                showMaterialScrapSections(datas: bo.MaterialScrapSection[]): void {
                    this.tableMaterialScrapSection.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
