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
            /** 查看视图-物料废品率 */
            export class MaterialScrapViewView extends ibas.BOViewView implements app.IMaterialScrapViewView {
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                        },
                        userFieldsMode: "text",
                        showFooter: false,
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            objectSubtitle: {
                                path: "description",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            sideContentButton: new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_edit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://edit",
                                press(): void {
                                    that.fireViewEvents(that.editDataEvent);
                                }
                            }),
                            actions: [
                                new sap.uxap.ObjectPageHeaderActionButton("", {
                                    hideText: true,
                                    importance: sap.uxap.Importance.Medium,
                                    text: ibas.i18n.prop("shell_data_services"),
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
                                }),
                            ],
                        }),
                        headerContent: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_tiered") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "tiered",
                                type: new sap.extension.data.YesNo(true),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_rate") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "rate",
                                type: new sap.extension.data.Percentage(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_value") }),
                            new sap.extension.m.Text("", {
                            }).bindProperty("bindingValue", {
                                path: "value",
                                type: new sap.extension.data.Quantity(),
                            }),
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_materialscrapsection"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.listMaterialScrapSection = new sap.extension.m.List("", {
                                                inset: false,
                                                width: "auto",
                                                growing: false,
                                                mode: sap.m.ListMode.None,
                                                swipeDirection: sap.m.SwipeDirection.RightToLeft,
                                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                                showNoData: true,
                                                items: {
                                                    path: "/rows",
                                                    template: new sap.extension.m.DataObjectListItem("", {
                                                        dataInfo: {
                                                            code: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                                                            name: bo.MaterialScrapSection.name
                                                        },
                                                        title: "# {lineId}",
                                                        attributes: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialscrapsection_sectionstart"),
                                                                bindingValue: {
                                                                    path: "sectionStart",
                                                                    type: new sap.extension.data.Quantity(),
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialscrapsection_sectionend"),
                                                                bindingValue: {
                                                                    path: "sectionEnd",
                                                                    type: new sap.extension.data.Quantity(),
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialscrapsection_rate"),
                                                                bindingValue: {
                                                                    path: "rate",
                                                                    type: new sap.extension.data.Percentage(),
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialscrapsection_value"),
                                                                bindingValue: {
                                                                    path: "value",
                                                                    type: new sap.extension.data.Quantity(),
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialscrapsection_remarks"),
                                                                bindingValue: {
                                                                    path: "remarks",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }
                                                            }),
                                                        ],
                                                        type: sap.m.ListType.Inactive,
                                                    })
                                                },
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_others"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: false,
                                                width: "auto",
                                                content: [
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_remarks") }),
                                                    new sap.extension.m.Text("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "remarks",
                                                        type: new sap.extension.data.Alphanumeric(),
                                                    }),
                                                ]
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    });
                }

                private page: sap.extension.uxap.ObjectPageLayout;
                private listMaterialScrapSection: sap.extension.m.List;

                /** 显示数据 */
                showMaterialScrap(data: bo.MaterialScrap): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据（物料废品率 - 阶梯） */
                showMaterialScrapSections(datas: bo.MaterialScrapSection[]): void {
                    this.listMaterialScrapSection.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
