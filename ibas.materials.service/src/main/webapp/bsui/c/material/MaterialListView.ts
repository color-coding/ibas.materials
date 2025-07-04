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
            /**
             * 列表视图-物料
             */
            export class MaterialListView extends ibas.BOListView implements app.IMaterialListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Material;
                }
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deleteDataEvent: Function;
                /** 物料组事件 */
                materialGroupEvent: Function;
                /** 物料单位事件 */
                materialUnitEvent: Function;
                /** 物料替代事件 */
                materialSubstituteEvent: Function;
                /** 计划组事件 */
                schedulingGroupEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        dataInfo: this.queryTarget,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_picture"),
                                template: new sap.m.Avatar("", {
                                    decorative: true,
                                    showBorder: false,
                                    displayShape: sap.m.AvatarShape.Square,
                                    imageFitType: sap.m.AvatarImageFitType.Contain,
                                    press: function (oEvent: sap.ui.base.Event): void {
                                        let src: string = this.getSrc();
                                        if (!ibas.strings.isEmpty(src)) {
                                            let lightBox: sap.m.LightBox = new sap.m.LightBox("", {
                                                imageContent: [
                                                    new sap.m.LightBoxItem("", {
                                                        imageSrc: src
                                                    })
                                                ]
                                            });
                                            lightBox.open();
                                        }
                                    },
                                    enabled: {
                                        path: "picture",
                                        formatter(value: string): boolean {
                                            return !ibas.strings.isEmpty(value);
                                        }
                                    },
                                    backgroundColor: sap.m.AvatarColor.Transparent,
                                    fallbackIcon: "sap-icon://avatar-icon-none",
                                }).bindProperty("src", {
                                    path: "picture",
                                    formatter: function (value: string): string {
                                        if (ibas.strings.isEmpty(value)) {
                                            return "";
                                        }
                                        if (ibas.strings.isWith(value, "http", undefined)) {
                                            return ibas.urls.normalize(value);
                                        }
                                        return new bo.BORepositoryMaterials().toUrl(value);
                                    }
                                }),
                                visible: false,
                                width: "5rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_code"),
                                template: new sap.extension.m.DataLink("", {
                                    objectCode: bo.Material.BUSINESS_OBJECT_CODE,
                                }).bindProperty("bindingValue", {
                                    path: "code",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_name"),
                                width: "20rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    parts: [
                                        {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                        {
                                            path: "sign",
                                            type: new sap.extension.data.Alphanumeric(),
                                            formatter(data: string): string {
                                                return ibas.strings.isEmpty(data) ? "" : ibas.strings.format(" ({0})", data);
                                            }
                                        },
                                    ]
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_itemtype"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemType",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emItemType,
                                        describe: true,
                                    })
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_group"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.MaterialGroup,
                                        key: bo.MaterialGroup.PROPERTY_CODE_NAME,
                                        text: bo.MaterialGroup.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "group",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_onhand"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
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
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_material_remarks"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "16rem",
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://create",
                                    press: function (): void {
                                        that.fireViewEvents(that.newDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_view"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://display",
                                    press(): void {
                                        that.fireViewEvents(that.viewDataEvent, that.table.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent, that.table.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent, that.table.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.extension.m.MenuButton("", {
                                    autoHide: true,
                                    text: ibas.i18n.prop("shell_quick_to"),
                                    icon: "sap-icon://generate-shortcut",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_func_materialgroup"),
                                                icon: "sap-icon://dimension",
                                                press: function (): void {
                                                    that.fireViewEvents(that.materialGroupEvent);
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("bo_material_schedulinggroup"),
                                                icon: "sap-icon://washing-machine",
                                                press: function (): void {
                                                    that.fireViewEvents(that.schedulingGroupEvent);
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_func_unit"),
                                                icon: "sap-icon://measure",
                                                press: function (): void {
                                                    that.fireViewEvents(that.materialUnitEvent);
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_func_materialsubstitute"),
                                                icon: "sap-icon://add-product",
                                                press: function (): void {
                                                    that.fireViewEvents(that.materialSubstituteEvent);
                                                },
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
                                                data: that.table.getSelecteds(),
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
                            this.table,
                        ]
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.Material[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }

                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setBusy(true);
                        this.table.setFirstVisibleRow(0);
                        this.table.setModel(null);
                    }
                }
            }
        }
    }
}