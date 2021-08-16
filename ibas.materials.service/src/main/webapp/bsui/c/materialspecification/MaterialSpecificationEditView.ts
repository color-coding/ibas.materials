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
            /** 编辑视图-物料规格 */
            export class MaterialSpecificationEditView extends ibas.BOEditView implements app.IMaterialSpecificationEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加物料规格-项目事件 */
                addMaterialSpecificationItemEvent: Function;
                /** 删除物料规格-项目事件 */
                removeMaterialSpecificationItemEvent: Function;
                /** 选择业务伙伴事件 */
                chooseBusinessPartnerEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_itemcode") }),
                            new sap.extension.m.RepositoryInput("", {
                                editable: false,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.Material,
                                    key: bo.Material.PROPERTY_CODE_NAME,
                                    text: bo.Material.PROPERTY_NAME_NAME
                                },
                            }).bindProperty("bindingValue", {
                                path: "itemCode",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_reference1") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "reference1",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_reference2") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "reference2",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                })
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_businesspartnercode") }),
                            new sap.m.FlexBox("", {
                                items: [
                                    // 客户
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: businesspartner.bo.BORepositoryBusinessPartner,
                                        dataInfo: {
                                            type: businesspartner.bo.Customer,
                                            key: businesspartner.bo.Customer.PROPERTY_CODE_NAME,
                                            text: businesspartner.bo.Customer.PROPERTY_NAME_NAME
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseBusinessPartnerEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "businessPartnerType",
                                        formatter(data: any): any {
                                            if (data === businesspartner.bo.emBusinessPartnerType.CUSTOMER) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "businessPartnerCode",
                                        type: new sap.extension.data.Alphanumeric()
                                    }),
                                    // 供应商
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: businesspartner.bo.BORepositoryBusinessPartner,
                                        dataInfo: {
                                            type: businesspartner.bo.Supplier,
                                            key: businesspartner.bo.Supplier.PROPERTY_CODE_NAME,
                                            text: businesspartner.bo.Supplier.PROPERTY_NAME_NAME
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseBusinessPartnerEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "businessPartnerType",
                                        formatter(data: any): any {
                                            if (data === businesspartner.bo.emBusinessPartnerType.SUPPLIER) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "businessPartnerCode",
                                        type: new sap.extension.data.Alphanumeric()
                                    }),
                                ]
                            }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: businesspartner.bo.emBusinessPartnerType
                            }).bindProperty("bindingValue", {
                                path: "businessPartnerType",
                                type: new sap.extension.data.Enum({
                                    enumType: businesspartner.bo.emBusinessPartnerType
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_project") }),
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
                                repository: accounting.bo.BORepositoryAccounting,
                                dataInfo: {
                                    type: accounting.bo.Project,
                                    key: accounting.bo.Project.PROPERTY_CODE_NAME,
                                    text: accounting.bo.Project.PROPERTY_NAME_NAME
                                },
                                criteria: [
                                    new ibas.Condition(accounting.bo.Project.PROPERTY_DELETED_NAME, ibas.emConditionOperation.NOT_EQUAL, ibas.emYesNo.YES.toString())
                                ]
                            }).bindProperty("bindingValue", {
                                path: "project",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_specification") }),
                            new sap.extension.m.RepositoryInput("", {
                                editable: false,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.Specification,
                                    key: bo.Specification.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.Specification.PROPERTY_NAME_NAME
                                },
                            }).bindProperty("bindingValue", {
                                path: "specification",
                                type: new sap.extension.data.Numeric()
                            }),
                        ]
                    });
                    let formMaterialSpecificationItem: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_materialspecificationitem") }),
                            this.tableMaterialSpecificationItem = new sap.extension.table.DataTable("", {
                                enableSelectAll: false,
                                visibleRowCount: sap.extension.table.visibleRowCount(8),
                                dataInfo: {
                                    code: bo.MaterialSpecification.BUSINESS_OBJECT_CODE,
                                    name: bo.MaterialSpecificationItem.name
                                },
                                toolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://add",
                                            press: function (): void {
                                                that.fireViewEvents(that.addMaterialSpecificationItemEvent);
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_remove"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://less",
                                            press: function (): void {
                                                that.fireViewEvents(that.removeMaterialSpecificationItemEvent, that.tableMaterialSpecificationItem.getSelecteds());
                                            }
                                        })
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_lineid"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "lineId",
                                            type: new sap.extension.data.Numeric()
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_parentsign"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "parentSign",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_sign"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "sign",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_description"),
                                        width: "10rem",
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "description",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            })
                                        })
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_content"),
                                        width: "16rem",
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "content",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            })
                                        }),
                                    }),
                                    /*
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_value"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "value",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 30
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_associated"),
                                        width: "20rem",
                                        template: new sap.extension.m.SelectionInput("", {
                                            showValueHelp: true,
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Material,
                                                key: bo.Material.PROPERTY_CODE_NAME,
                                                text: bo.Material.PROPERTY_NAME_NAME
                                            },
                                            criteria: app.conditions.material.create()
                                        }).bindProperty("bindingValue", {
                                            path: "associated",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 20
                                            })
                                        }),
                                    }),
                                    */
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialspecificationitem_note"),
                                        width: "16rem",
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "note",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 200
                                            })
                                        }),
                                    }),
                                ]
                            })
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_materialspecification_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.MaterialSpecification.BUSINESS_OBJECT_CODE,
                        },
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
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
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formMaterialSpecificationItem,
                            formBottom,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableMaterialSpecificationItem: sap.extension.table.Table;

                /** 显示数据 */
                showMaterialSpecification(data: bo.MaterialSpecification): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据-物料规格-项目 */
                showMaterialSpecificationItems(datas: bo.MaterialSpecificationItem[]): void {
                    this.tableMaterialSpecificationItem.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
