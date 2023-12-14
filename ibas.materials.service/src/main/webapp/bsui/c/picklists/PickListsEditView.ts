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
            /** 编辑视图-拣配清单 */
            export class PickListsEditView extends ibas.BOEditView implements app.IPickListsEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加拣配清单-行事件 */
                addPickListsLineEvent: Function;
                /** 删除拣配清单-行事件 */
                removePickListsLineEvent: Function;
                /** 选择拣配清单行物料批次事件 */
                choosePickListsLineMaterialBatchEvent: Function;
                /** 选择拣配清单行物料序列事件 */
                choosePickListsLineMaterialSerialEvent: Function;
                /** 转为交货事件 */
                turnToDeliveryEvent: Function;
                /** 使用预留拣配事件 */
                useInventoryReservationToPickEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_picker") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "picker",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_reference1") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "reference1",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_reference2") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "reference2",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                }),
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_objectkey") }),
                            new sap.extension.m.Input("", {
                                editable: false
                            }).bindProperty("bindingValue", {
                                path: "objectKey",
                                type: new sap.extension.data.Numeric(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_pickstatus") }),
                            new sap.extension.m.EnumSelect("", {
                                editable: false,
                                enumType: bo.emPickStatus
                            }).bindProperty("bindingValue", {
                                path: "pickStatus",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emPickStatus
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_pickdate") }),
                            new sap.extension.m.DatePicker("", {
                                required: true
                            }).bindProperty("bindingValue", {
                                path: "pickDate",
                                type: new sap.extension.data.Date(),
                            }),
                        ]
                    });
                    let formPickListsLine: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_picklistsline") }),
                            this.tablePickListsLine = new sap.extension.table.DataTable("", {
                                enableSelectAll: false,
                                visibleRowCount: sap.extension.table.visibleRowCount(8),
                                dataInfo: {
                                    code: bo.PickLists.BUSINESS_OBJECT_CODE,
                                    name: bo.PickListsLine.name
                                },
                                toolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.extension.m.MenuButton("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            icon: "sap-icon://add",
                                            type: sap.m.ButtonType.Transparent,
                                            menu: this.menuSources = new sap.m.Menu("", {
                                                items: {
                                                    path: "/",
                                                    template: new sap.m.MenuItem("", {
                                                        visible: {
                                                            path: "description",
                                                            formatter(text: string): boolean {
                                                                if (typeof text === "string" && !ibas.strings.isEmpty(text)) {
                                                                    if (text.indexOf(",") === -1) {
                                                                        return true;
                                                                    }
                                                                    let descs: string[] = text.split(",");
                                                                    return !ibas.strings.isEmpty(descs[0]);
                                                                }
                                                                return false;
                                                            }
                                                        },
                                                        text: {
                                                            path: "description",
                                                            formatter(text: string): string {
                                                                if (typeof text === "string" && !ibas.strings.isEmpty(text)) {
                                                                    if (text.indexOf(",") === -1) {
                                                                        return text;
                                                                    }
                                                                    let descs: string[] = text.split(",");
                                                                    return descs[0];
                                                                }
                                                                return "";
                                                            }
                                                        },
                                                        press: function (this: sap.m.MenuItem): void {
                                                            that.fireViewEvents(that.addPickListsLineEvent, this.getBindingContext().getObject());
                                                        }
                                                    })
                                                }
                                            }),
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_remove"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://less",
                                            press(): void {
                                                that.fireViewEvents(that.removePickListsLineEvent, that.tablePickListsLine.getSelecteds());
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.extension.m.MenuButton("", {
                                            autoHide: true,
                                            icon: "sap-icon://tags",
                                            text: ibas.strings.format("{0}/{1}",
                                                ibas.i18n.prop("materials_material_batch"), ibas.i18n.prop("materials_material_serial")),
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("materials_material_batch"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.choosePickListsLineMaterialBatchEvent);
                                                        },
                                                        visible: shell.app.privileges.canRun({
                                                            id: materials.app.MaterialBatchIssueService.APPLICATION_ID,
                                                            name: materials.app.MaterialBatchIssueService.APPLICATION_NAME,
                                                        })
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("materials_material_serial"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.choosePickListsLineMaterialSerialEvent);
                                                        },
                                                        visible: shell.app.privileges.canRun({
                                                            id: materials.app.MaterialSerialIssueService.APPLICATION_ID,
                                                            name: materials.app.MaterialSerialIssueService.APPLICATION_NAME,
                                                        })
                                                    }),
                                                ]
                                            })
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("materials_use_inventory_reservation_to_pick"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://product",
                                            press(): void {
                                                that.fireViewEvents(that.useInventoryReservationToPickEvent);
                                            }
                                        }),
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_lineid"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "lineId",
                                            type: new sap.extension.data.Numeric(),
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_basedocument"),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                let data: any = this.getBindingContext().getObject();
                                                if (data instanceof bo.PickListsLine && data.baseDocumentEntry > 0) {
                                                    ibas.servicesManager.runLinkService({
                                                        boCode: data.baseDocumentType,
                                                        linkValue: data.baseDocumentEntry.toString()
                                                    });
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
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
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_deliverydate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "deliveryDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_itemcode"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: bo.Material.BUSINESS_OBJECT_CODE
                                        }).bindProperty("bindingValue", {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 50
                                            }),
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_itemdescription"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "itemDescription",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            }),
                                        }),
                                        width: "16rem",
                                    }),
                                    // new sap.extension.table.DataColumn("", {
                                    //     label: ibas.i18n.prop("bo_picklistsline_uom"),
                                    //     template: new sap.extension.m.Text("", {
                                    //     }).bindProperty("bindingValue", {
                                    //         path: "uom",
                                    //         type: new sap.extension.data.Alphanumeric({
                                    //             maxLength: 8
                                    //         }),
                                    //     }),
                                    // }),
                                    // new sap.extension.table.DataColumn("", {
                                    //     label: ibas.i18n.prop("bo_picklistsline_inventoryuom"),
                                    //     template: new sap.extension.m.Text("", {
                                    //     }).bindProperty("bindingValue", {
                                    //         path: "inventoryUOM",
                                    //         type: new sap.extension.data.Alphanumeric({
                                    //             maxLength: 8
                                    //         }),
                                    //     }),
                                    // }),
                                    // new sap.extension.table.DataColumn("", {
                                    //     label: ibas.i18n.prop("bo_picklistsline_uomrate"),
                                    //     template: new sap.extension.m.Text("", {
                                    //     }).bindProperty("bindingValue", {
                                    //         path: "uomRate",
                                    //         type: new sap.extension.data.Rate(),
                                    //     }),
                                    // }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_warehouse"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            }),
                                        }),
                                    }),
                                    // new sap.extension.table.DataColumn("", {
                                    //     label: ibas.i18n.prop("bo_picklistsline_quantity"),
                                    //     template: new sap.extension.m.Text("", {
                                    //     }).bindProperty("bindingValue", {
                                    //         path: "quantity",
                                    //         type: new sap.extension.data.Quantity(),
                                    //     }),
                                    // }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_inventoryquantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "inventoryQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_pickquantity"),
                                        template: new sap.extension.m.Input("", {
                                            editable: {
                                                path: "pickStatus",
                                                formatter(status: bo.emPickStatus): boolean {
                                                    return status !== bo.emPickStatus.PARTIALLYDELIVERED && status !== bo.emPickStatus.CLOSED;
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "pickQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_picklistsline_closedquantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "closedQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                ]
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_dataowner") }),
                            new sap.extension.m.DataOwnerInput("", {
                                showValueHelp: true,
                                organization: {
                                    path: "organization",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 8
                                    })
                                }
                            }).bindProperty("bindingValue", {
                                path: "dataOwner",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_organization") }),
                            new sap.extension.m.DataOrganizationInput("", {
                                showValueHelp: true,
                            }).bindProperty("bindingValue", {
                                path: "organization",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_picklists_remarks") }),
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
                            code: bo.PickLists.BUSINESS_OBJECT_CODE,
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
                                new sap.m.ToolbarSeparator(""),
                                new sap.extension.m.MenuButton("", {
                                    text: ibas.i18n.prop("shell_quick_to"),
                                    icon: "sap-icon://generate-shortcut",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: this.menuTargets = new sap.m.Menu("", {
                                        items: {
                                            path: "/",
                                            template: new sap.m.MenuItem("", {
                                                visible: {
                                                    path: "description",
                                                    formatter(text: string): boolean {
                                                        if (typeof text === "string" && !ibas.strings.isEmpty(text)) {
                                                            if (text.indexOf(",") === -1) {
                                                                return true;
                                                            }
                                                            let descs: string[] = text.split(",");
                                                            return !ibas.strings.isEmpty(descs[1]);
                                                        }
                                                        return false;
                                                    }
                                                },
                                                text: {
                                                    path: "description",
                                                    formatter(text: string): string {
                                                        if (typeof text === "string" && !ibas.strings.isEmpty(text)) {
                                                            if (text.indexOf(",") === -1) {
                                                                return text;
                                                            }
                                                            let descs: string[] = text.split(",");
                                                            return descs[1];
                                                        }
                                                        return "";
                                                    }
                                                },
                                                press: function (this: sap.m.MenuItem): void {
                                                    that.fireViewEvents(that.turnToDeliveryEvent, this.getBindingContext().getObject());
                                                }
                                            })
                                        }
                                    }),
                                }),
                                new sap.m.ToolbarSpacer(""),
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
                        content: [
                            formTop,
                            formPickListsLine,
                            formBottom,
                        ]
                    });
                }

                private page: sap.extension.m.Page;
                private tablePickListsLine: sap.extension.table.Table;
                private menuSources: sap.m.Menu;
                private menuTargets: sap.m.Menu;

                /** 显示数据 */
                showPickLists(data: bo.PickLists): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据-拣配清单-行 */
                showPickListsLines(datas: bo.PickListsLine[]): void {
                    this.tablePickListsLine.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                showPickers(datas: ibas.IServiceAgent[]): void {
                    this.menuSources.setModel(new sap.extension.model.JSONModel(datas));
                    this.menuTargets.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
