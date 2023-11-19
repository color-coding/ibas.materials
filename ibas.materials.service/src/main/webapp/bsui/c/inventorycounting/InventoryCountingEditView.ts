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
            /** 编辑视图-库存盘点 */
            export class InventoryCountingEditView extends ibas.BOEditView implements app.IInventoryCountingEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 关闭数据事件 */
                closeDataEvent: Function;
                /** 添加库存盘点-行事件 */
                addInventoryCountingLineEvent: Function;
                /** 删除库存盘点-行事件 */
                removeInventoryCountingLineEvent: Function;
                /** 选择库存盘点行物料事件 */
                chooseInventoryCountingLineMaterialEvent: Function;
                /** 选择库存盘点行仓库事件 */
                chooseInventoryCountingLineWarehouseEvent: Function;
                /** 选择库存盘点行物料批次事件 */
                chooseInventoryCountingLineMaterialBatchEvent: Function;
                /** 选择库存盘点行物料序列事件 */
                chooseInventoryCountingLineMaterialSerialEvent: Function;
                /** 选择库存盘点库存记录事件 */
                chooseInventoryCountingMaterialInventoryEvent: Function;
                /** 刷新库存 */
                refreshMaterialInventoryEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_counttype") }),
                            new sap.extension.m.PropertySelect("", {
                                dataInfo: {
                                    code: bo.InventoryCounting.BUSINESS_OBJECT_CODE,
                                },
                                propertyName: "countType",
                            }).bindProperty("bindingValue", {
                                path: "countType",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_countdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "countDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_counttime") }),
                            new sap.extension.m.TimePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "countTime",
                                type: new sap.extension.data.Time()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_ordertype") }),
                            new sap.extension.m.PropertySelect("", {
                                dataInfo: {
                                    code: bo.InventoryCounting.BUSINESS_OBJECT_CODE,
                                },
                                propertyName: "orderType",
                            }).bindProperty("bindingValue", {
                                path: "orderType",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_reference1") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "reference1",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_reference2") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "reference2",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                })
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_docentry") }),
                            new sap.extension.m.Input("", {
                                editable: false,

                            }).bindProperty("bindingValue", {
                                path: "docEntry",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_documentstatus") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emDocumentStatus
                            }).bindProperty("bindingValue", {
                                path: "documentStatus",
                                type: new sap.extension.data.DocumentStatus()
                            }),
                            new sap.extension.m.TipsCheckBox("", {
                                text: ibas.i18n.prop("bo_inventorycounting_canceled"),
                                tipsOnSelection: ibas.i18n.prop(["shell_data_cancel", "shell_data_status"]),
                            }).bindProperty("bindingValue", {
                                path: "canceled",
                                type: new sap.extension.data.YesNo()
                            }).bindProperty("editable", {
                                path: "approvalStatus",
                                type: new sap.extension.data.ApprovalStatus(),
                                formatter(data: ibas.emApprovalStatus): boolean {
                                    if (data === ibas.emApprovalStatus.PROCESSING) {
                                        return false;
                                    } return true;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_documentdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "documentDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_postingdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "postingDate",
                                type: new sap.extension.data.Date()
                            }),
                        ]
                    });
                    let formInventoryCountingLine: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorycountingline") }),
                            this.tableInventoryCountingLine = new sap.extension.table.DataTable("", {
                                enableSelectAll: false,
                                visibleRowCount: sap.extension.table.visibleRowCount(8),
                                dataInfo: {
                                    code: bo.InventoryCounting.BUSINESS_OBJECT_CODE,
                                    name: bo.InventoryCountingLine.name
                                },
                                toolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://add",
                                            press: function (): void {
                                                that.fireViewEvents(that.addInventoryCountingLineEvent);
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_remove"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://less",
                                            press: function (): void {
                                                that.fireViewEvents(that.removeInventoryCountingLineEvent, that.tableInventoryCountingLine.getSelecteds());
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.extension.m.MenuButton("", {
                                            autoHide: true,
                                            icon: "sap-icon://tags",
                                            text: ibas.strings.format("{0}/{1}",
                                                ibas.i18n.prop("purchase_material_batch"), ibas.i18n.prop("purchase_material_serial")),
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("purchase_material_batch"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseInventoryCountingLineMaterialBatchEvent);
                                                        },
                                                        visible: shell.app.privileges.canRun({
                                                            id: materials.app.MaterialBatchListService.APPLICATION_ID,
                                                            name: materials.app.MaterialBatchListService.APPLICATION_NAME,
                                                        })
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("purchase_material_serial"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseInventoryCountingLineMaterialSerialEvent);
                                                        },
                                                        visible: shell.app.privileges.canRun({
                                                            id: materials.app.MaterialSerialListService.APPLICATION_ID,
                                                            name: materials.app.MaterialSerialListService.APPLICATION_NAME,
                                                        })
                                                    }),
                                                ]
                                            })
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("materials_refresh_inventory"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://refresh",
                                            press: function (): void {
                                                that.fireViewEvents(that.refreshMaterialInventoryEvent);
                                            }
                                        }).bindProperty("enabled", {
                                            path: "/rows/0/lineStatus",
                                            formatter(data: any): boolean {
                                                if (data === ibas.emDocumentStatus.CLOSED) {
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Label("", {
                                            wrapping: false,
                                            text: ibas.i18n.prop("bo_warehouse"),
                                            visible: shell.app.privileges.canRun({
                                                id: app.ELEMENT_DOCUMENT_WAREHOUSE.id,
                                                name: app.ELEMENT_DOCUMENT_WAREHOUSE.name,
                                            })
                                        }),
                                        this.selectWarehouse = new component.WarehouseSelect("", {
                                            width: "auto",
                                            change(this: sap.m.Select, event: sap.ui.base.Event): void {
                                                let sItem: any = this.getSelectedItem();
                                                if (sItem instanceof sap.ui.core.Item && !ibas.strings.isEmpty(sItem.getKey())) {
                                                    let model: any = that.tableInventoryCountingLine.getModel();
                                                    if (model instanceof sap.extension.model.JSONModel) {
                                                        let data: any[] = model.getData("rows");
                                                        if (data instanceof Array) {
                                                            let items: ibas.IList<bo.InventoryCountingLine> = new ibas.ArrayList<bo.InventoryCountingLine>();
                                                            for (let item of data) {
                                                                if (item instanceof bo.InventoryCountingLine) {
                                                                    if (item.warehouse !== sItem.getKey()) {
                                                                        items.add(item);
                                                                    }
                                                                }
                                                            }
                                                            if (items.length > 0) {
                                                                that.application.viewShower.messages({
                                                                    title: that.title,
                                                                    type: ibas.emMessageType.QUESTION,
                                                                    message: ibas.i18n.prop("materials_change_item_warehouse_continue", sItem.getText()),
                                                                    actions: [
                                                                        ibas.emMessageAction.YES,
                                                                        ibas.emMessageAction.NO,
                                                                    ],
                                                                    onCompleted: (reslut) => {
                                                                        if (reslut === ibas.emMessageAction.YES) {
                                                                            for (let item of items) {
                                                                                item.warehouse = sItem.getKey();
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            visible: shell.app.privileges.canRun({
                                                id: app.ELEMENT_DOCUMENT_WAREHOUSE.id,
                                                name: app.ELEMENT_DOCUMENT_WAREHOUSE.name,
                                            })
                                        })
                                    ]
                                }),
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_lineid"),
                                        width: "6rem",
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "lineId",
                                            type: new sap.extension.data.Numeric()
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_itemcode"),
                                        template: new sap.extension.m.Input("", {
                                            showValueHelp: true,
                                            valueHelpRequest: function (): void {
                                                that.fireViewEvents(that.chooseInventoryCountingLineMaterialEvent,
                                                    // 获取当前对象
                                                    this.getBindingContext().getObject()
                                                );
                                            },
                                            showValueLink: true,
                                            valueLinkRequest: function (event: sap.ui.base.Event): void {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: materials.bo.Material.BUSINESS_OBJECT_CODE,
                                                    linkValue: event.getParameter("value")
                                                });
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 20
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_itemdescription"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "itemDescription",
                                            type: new sap.extension.data.Alphanumeric()
                                        })
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_freeze"),
                                        width: "6rem",
                                        template: new sap.extension.m.CheckBox("", {
                                        }).bindProperty("bindingValue", {
                                            path: "freeze",
                                            type: new sap.extension.data.YesNo()
                                        })
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_warehouse"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_inventoryquantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "inventoryQuantity",
                                            type: new sap.extension.data.Quantity()
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_uom"),
                                        width: "8rem",
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "uom",
                                            type: new sap.extension.data.Alphanumeric()
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_counted"),
                                        width: "6rem",
                                        template: new sap.extension.m.CheckBox("", {
                                        }).bindProperty("bindingValue", {
                                            path: "counted",
                                            type: new sap.extension.data.YesNo()
                                        })
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_countquantity"),
                                        template: new sap.extension.m.Input("", {

                                        }).bindProperty("bindingValue", {
                                            path: "countQuantity",
                                            type: new sap.extension.data.Quantity()
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_difference"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "difference",
                                            type: new sap.extension.data.Quantity()
                                        })
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_reference1"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reference1",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            })
                                        }),
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_inventorycountingline_reference2"),
                                        template: new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reference2",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 200
                                            })
                                        }),
                                    }),
                                ],
                                sortProperty: "visOrder",
                            })
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_dataowner") }),
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_organization") }),
                            new sap.m.FlexBox("", {
                                width: "100%",
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    new sap.extension.m.DataOrganizationInput("", {
                                        width: "100%",
                                        showValueHelp: true,
                                    }).bindProperty("bindingValue", {
                                        path: "organization",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 8
                                        })
                                    }),
                                    new sap.extension.m.SelectionInput("", {
                                        width: "100%",
                                        placeholder: ibas.i18n.prop("bo_branch"),
                                        showValueHelp: true,
                                        repository: accounting.bo.BORepositoryAccounting,
                                        dataInfo: {
                                            type: accounting.bo.Branch,
                                            key: accounting.bo.Branch.PROPERTY_CODE_NAME,
                                            text: accounting.bo.Branch.PROPERTY_NAME_NAME
                                        },
                                        criteria: [
                                            new ibas.Condition(accounting.bo.Branch.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES.toString())
                                        ],
                                        visible: accounting.config.isEnableBranch(),
                                    }).bindProperty("bindingValue", {
                                        path: "branch",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 8
                                        })
                                    }).addStyleClass("sapUiTinyMarginBegin"),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_remarks") }),
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
                            code: bo.InventoryCounting.BUSINESS_OBJECT_CODE,
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
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_read"),
                                                icon: "sap-icon://excel-attachment",
                                                press: function (): void {
                                                    // 读取当前对象
                                                    ibas.files.open((files) => {
                                                        that.fireViewEvents(that.createDataEvent, files[0]);
                                                    }, {
                                                        accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                                        multiple: false
                                                    });
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("em_documentstatus_closed"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://task",
                                    press: function (): void {
                                        that.fireViewEvents(that.closeDataEvent);
                                    }
                                }).bindProperty("enabled", {
                                    path: "documentStatus",
                                    formatter(data: any): boolean {
                                        if (data === ibas.emDocumentStatus.CLOSED
                                            || data === ibas.emDocumentStatus.PLANNED) {
                                            return false;
                                        }
                                        return true;
                                    }
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formInventoryCountingLine,
                            formBottom,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableInventoryCountingLine: sap.extension.table.Table;
                private selectWarehouse: sap.extension.m.Select;
                get defaultWarehouse(): string {
                    return this.selectWarehouse.getSelectedKey();
                }
                set defaultWarehouse(value: string) {
                    this.selectWarehouse.setSelectedKey(value);
                }
                /** 显示数据 */
                showInventoryCounting(data: bo.InventoryCounting): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据 */
                showInventoryCountingLines(datas: bo.InventoryCountingLine[]): void {
                    this.tableInventoryCountingLine.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
