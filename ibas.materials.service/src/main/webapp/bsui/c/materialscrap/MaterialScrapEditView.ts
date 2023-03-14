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
            /** 编辑视图-物料废品率 */
            export class MaterialScrapEditView extends ibas.BOEditView implements app.IMaterialScrapEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加物料废品率 - 阶梯事件 */
                addMaterialScrapSectionEvent: Function;
                /** 删除物料废品率 - 阶梯事件 */
                removeMaterialScrapSectionEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.leftForm = new sap.extension.layout.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_description") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "description",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric(),
                            }),
                        ]
                    });
                    this.commonList = new sap.extension.m.List("", {
                        growing: false,
                        mode: sap.m.ListMode.None,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.extension.m.CheckBox("", {
                                    text: ibas.i18n.prop("bo_materialscrap_tiered"),
                                    select(this: sap.m.CheckBox): void {
                                        if (this.getSelected() === true) {
                                            that.sectionList.setVisible(true);
                                            that.commonList.setVisible(false);
                                        } else {
                                            that.sectionList.setVisible(false);
                                            that.commonList.setVisible(true);
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "/tiered",
                                    type: new sap.extension.data.YesNo(),
                                }),
                            ]
                        }),
                        items: {
                            path: "/",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    new sap.ui.layout.form.SimpleForm("", {
                                        editable: true,
                                        content: [
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_rate") }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "rate",
                                                type: new sap.extension.data.Percentage(),
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_value") }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "value",
                                                type: new sap.extension.data.Quantity(),
                                            }),
                                        ]
                                    }),
                                ],
                                type: sap.m.ListType.Inactive
                            })
                        },
                    });
                    this.sectionList = new sap.extension.m.List("", {
                        growing: false,
                        mode: sap.m.ListMode.Delete,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.extension.m.CheckBox("", {
                                    text: ibas.i18n.prop("bo_materialscrap_tiered"),
                                    select(this: sap.m.CheckBox): void {
                                        if (this.getSelected() === true) {
                                            that.sectionList.setVisible(true);
                                            that.commonList.setVisible(false);
                                        } else {
                                            that.sectionList.setVisible(false);
                                            that.commonList.setVisible(true);
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "/tiered",
                                    type: new sap.extension.data.YesNo(),
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    icon: "sap-icon://sys-add",
                                    text: ibas.i18n.prop("shell_data_add"),
                                    press(): void {
                                        that.fireViewEvents(that.addMaterialScrapSectionEvent);
                                    }
                                }),
                            ]
                        }),
                        items: {
                            path: "/",
                            template: new sap.m.CustomListItem("", {
                                content: [
                                    new sap.ui.layout.form.SimpleForm("", {
                                        editable: true,
                                        content: [
                                            new sap.m.Label("", {
                                                text:
                                                    ibas.strings.format("{0} / {1}",
                                                        ibas.i18n.prop("bo_materialscrapsection_sectionstart"),
                                                        ibas.i18n.prop("bo_materialscrapsection_sectionend")
                                                    )
                                            }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "sectionStart",
                                                type: new sap.extension.data.Quantity(),
                                            }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "sectionEnd",
                                                type: new sap.extension.data.Quantity(),
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_rate") }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "rate",
                                                type: new sap.extension.data.Percentage(),
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrap_value") }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "value",
                                                type: new sap.extension.data.Quantity(),
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialscrapsection_remarks") }),
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "remarks",
                                                type: new sap.extension.data.Alphanumeric(),
                                            }),
                                        ]
                                    }),
                                ],
                                type: sap.m.ListType.Inactive
                            })
                        },
                        delete(event: sap.ui.base.Event): void {
                            let listItem: any = event.getParameter("listItem");
                            if (listItem instanceof sap.m.CustomListItem) {
                                let data: any = listItem.getBindingContext().getObject();
                                if (data instanceof bo.MaterialScrapSection) {
                                    that.fireViewEvents(that.removeMaterialScrapSectionEvent, data);
                                }
                            }
                        },
                    });
                    return new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                        },
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press(): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press(): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press(): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press(): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: that.leftForm.getModel().getData(),
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
                        content: [
                            new sap.m.SplitContainer("", {
                                masterPages: [
                                    new sap.extension.m.Page("", {
                                        showHeader: false,
                                        content: [
                                            this.leftForm
                                        ]
                                    })
                                ],
                                detailPages: [
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        content: [
                                            this.commonList,
                                            this.sectionList,
                                        ],
                                    })
                                ],
                            })
                        ]
                    });
                }

                private leftForm: sap.extension.layout.SimpleForm;
                private commonList: sap.extension.m.List;
                private sectionList: sap.extension.m.List;

                /** 显示数据 */
                showMaterialScrap(data: bo.MaterialScrap): void {
                    this.leftForm.setModel(new sap.extension.model.JSONModel(data));
                    this.commonList.getHeaderToolbar().setModel(new sap.extension.model.JSONModel(data));
                    this.sectionList.getHeaderToolbar().setModel(new sap.extension.model.JSONModel(data));
                    this.commonList.setModel(new sap.extension.model.JSONModel([data]));
                    if (data.tiered === ibas.emYesNo.YES) {
                        this.commonList.setVisible(false);
                        this.sectionList.setVisible(true);
                    } else {
                        this.commonList.setVisible(true);
                        this.sectionList.setVisible(false);
                    }
                }
                /** 显示数据-物料废品率 - 阶梯 */
                showMaterialScrapSections(datas: bo.MaterialScrapSection[]): void {
                    this.sectionList.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
