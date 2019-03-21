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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_docentry") }),
                            new sap.m.Input("", {
                                editable: false,
                            }).bindProperty("value", {
                                path: "docEntry",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_countdate") }),
                            new sap.m.DatePicker("", {
                                valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                            }).bindProperty("dateValue", {
                                path: "countDate",
                            }),
                            new sap.m.TimePicker("", {
                            }).bindProperty("dateValue", {
                                path: "countTime",
                                type: new openui5.datatype.Time({
                                    description: ibas.i18n.prop("bo_inventorycounting_counttime")
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_counttype") }),
                            new sap.m.ex.SmartField("", {
                                width: "100%",
                                boCode: ibas.config.applyVariables(bo.InventoryCounting.BUSINESS_OBJECT_CODE),
                                propertyName: "CountType",
                                bindingValue: {
                                    path: "countType"
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_reference1") }),
                            new sap.m.Input("", {}).bindProperty("value", {
                                path: "reference1"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_reference2") }),
                            new sap.m.Input("", {}).bindProperty("value", {
                                path: "reference2"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_documentstatus") }),
                            new sap.m.Select("", {
                                enabled: false,
                                items: openui5.utils.createComboBoxItems(ibas.emDocumentStatus),
                            }).bindProperty("selectedKey", {
                                path: "documentStatus",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_documentdate") }),
                            new sap.m.DatePicker("", {
                                valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                            }).bindProperty("dateValue", {
                                path: "documentDate",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_postingdate") }),
                            new sap.m.DatePicker("", {
                                editable: false,
                                valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                            }).bindProperty("dateValue", {
                                path: "postingDate",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_ordertype") }),
                            new sap.m.ex.SmartField("", {
                                width: "100%",
                                boCode: ibas.config.applyVariables(bo.InventoryCounting.BUSINESS_OBJECT_CODE),
                                propertyName: "OrderType",
                                bindingValue: {
                                    path: "orderType"
                                }
                            }),
                        ]
                    });
                    this.tableInventoryCountingLine = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.MenuButton("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    text: ibas.i18n.prop("shell_data_add"),
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_add"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.addInventoryCountingLineEvent);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("bo_materialinventory"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.chooseInventoryCountingMaterialInventoryEvent);
                                                }
                                            }),
                                        ]
                                    })
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeInventoryCountingLineEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.InventoryCountingLine>(that.tableInventoryCountingLine)
                                        );
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    icon: "sap-icon://tags",
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("materials_material_batch"), ibas.i18n.prop("materials_material_serial")),
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_batch"),
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("em_inventoryadjustment_over"),
                                                        icon: "sap-icon://trend-up",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseInventoryCountingLineMaterialBatchEvent, bo.emInventoryAdjustment.OVER);
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("em_inventoryadjustment_short"),
                                                        icon: "sap-icon://trend-down",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseInventoryCountingLineMaterialBatchEvent, bo.emInventoryAdjustment.SHORT);
                                                        }
                                                    }),
                                                ]
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_serial"),
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("em_inventoryadjustment_over"),
                                                        icon: "sap-icon://trend-up",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseInventoryCountingLineMaterialSerialEvent, bo.emInventoryAdjustment.OVER);
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("em_inventoryadjustment_short"),
                                                        icon: "sap-icon://trend-down",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseInventoryCountingLineMaterialSerialEvent, bo.emInventoryAdjustment.SHORT);
                                                        }
                                                    }),
                                                ]
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
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Label("", {
                                    wrapping: false,
                                    text: ibas.i18n.prop("bo_warehouse")
                                }),
                                this.selectWarehouse = new sap.m.ex.BOSelect("", {
                                    boText: "name",
                                    boKey: "code",
                                    blank: true,
                                    boCode: ibas.config.applyVariables(bo.BO_CODE_WAREHOUSE),
                                    repositoryName: bo.BO_REPOSITORY_MATERIALS,
                                    criteria: app.conditions.warehouse.create(),
                                }),
                            ]
                        }),
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_lineid"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "lineId",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_itemcode"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseInventoryCountingLineMaterialEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("value", {
                                    path: "itemCode"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_itemdescription"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "itemDescription"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_freeze"),
                                template: new sap.m.CheckBox("", {
                                    width: "100%",
                                }).bindProperty("selected", {
                                    path: "freeze",
                                    type: new openui5.datatype.Unknown({
                                        formatValue(oValue: any): any {
                                            if (oValue === ibas.emYesNo.YES) {
                                                return true;
                                            }
                                            if (typeof oValue === "string" &&
                                                (oValue === String(ibas.emYesNo.YES)
                                                    || oValue === String(ibas.emYesNo[ibas.emYesNo.YES]))
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                        parseValue(oValue: any): any {
                                            return oValue === true ? ibas.emYesNo.YES : ibas.emYesNo.NO;
                                        }
                                    }),
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_warehouse"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    showValueHelp: true,
                                    editable: false,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseInventoryCountingLineWarehouseEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("value", {
                                    path: "warehouse"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_inventoryquantity"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "inventoryQuantity",
                                    type: new openui5.datatype.Quantity(),
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_uom"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "uom"
                                })
                            }), ,
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_counted"),
                                template: new sap.m.CheckBox("", {
                                    width: "100%",
                                }).bindProperty("selected", {
                                    path: "counted",
                                    type: new openui5.datatype.Unknown({
                                        formatValue(oValue: any): boolean {
                                            if (oValue === ibas.emYesNo.YES) {
                                                return true;
                                            }
                                            if (typeof oValue === "string" &&
                                                (oValue === String(ibas.emYesNo.YES)
                                                    || oValue === String(ibas.emYesNo[ibas.emYesNo.YES]))
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                        parseValue(oValue: boolean): any {
                                            return oValue === true ? ibas.emYesNo.YES : ibas.emYesNo.NO;
                                        }
                                    }),
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_countquantity"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    type: sap.m.InputType.Number
                                }).bindProperty("value", {
                                    path: "countQuantity",
                                    type: new openui5.datatype.Quantity(),
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_difference"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "difference",
                                    type: new openui5.datatype.Quantity(),
                                })
                            }),
                            /*
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_reference1"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "reference1",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_inventorycountingline_reference2"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "reference2",
                                }),
                            }),
                            */
                        ]
                    });
                    let formInventoryCountingLine: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_inventorycountingline") }),
                            this.tableInventoryCountingLine,
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_dataowner") }),
                            new sap.m.ex.DataOwnerInput("", {
                                bindingValue: {
                                    path: "dataOwner"
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_organization") }),
                            new sap.m.ex.OrganizationInput("", {
                                bindingValue: {
                                    path: "organization"
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_inventorycounting_remarks") }),
                            new sap.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("value", {
                                path: "remarks",
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
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
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("em_documentstatus_closed"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://task",
                                    press: function (): void {
                                        that.fireViewEvents(that.closeDataEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.layout.VerticalLayout("", {
                                width: "100%",
                                content: [
                                    formTop,
                                    formInventoryCountingLine,
                                    formBottom,
                                ]
                            })
                        ]
                    });
                    return this.page;
                }

                private page: sap.m.Page;
                private tableInventoryCountingLine: sap.ui.table.Table;
                private selectWarehouse: sap.m.Select;
                get defaultWarehouse(): string {
                    return this.selectWarehouse.getSelectedKey();
                }
                set defaultWarehouse(value: string) {
                    this.selectWarehouse.setSelectedKey(value);
                }

                /** 改变视图状态 */
                private changeViewStatus(data: bo.InventoryCounting): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), true);
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                    // 不可编辑：已批准，
                    if (data.approvalStatus === ibas.emApprovalStatus.APPROVED
                        || data.documentStatus === ibas.emDocumentStatus.CLOSED) {
                        let toolbar: sap.m.IBar = this.page.getSubHeader();
                        if (toolbar instanceof sap.m.Toolbar) {
                            for (let item of toolbar.getContent()) {
                                if (item instanceof sap.m.Button) {
                                    item.setEnabled(false);
                                }
                            }
                        }
                        openui5.utils.changeFormEditable(this.page, false);
                    }
                }

                /** 显示数据 */
                showInventoryCounting(data: bo.InventoryCounting): void {
                    this.page.setModel(new sap.ui.model.json.JSONModel(data));
                    this.page.bindObject("/");
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.page, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                }
                /** 显示数据 */
                showInventoryCountingLines(datas: bo.InventoryCountingLine[]): void {
                    this.tableInventoryCountingLine.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableInventoryCountingLine, datas);
                }
            }
        }
    }
}
