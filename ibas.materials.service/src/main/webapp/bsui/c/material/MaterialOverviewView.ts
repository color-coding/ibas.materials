/*
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
             * 物料总览视图
             */
            export class MaterialOverviewView extends ibas.BOQueryViewWithPanel implements app.IMaterialOverviewView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Material;
                }
                /** 编辑物料事件，参数：编辑对象 */
                editDataEvent: Function;
                /** 新建物料事件 */
                newDataEvent: Function;
                /** 查看物料事件，参数：目标数据 */
                viewDataEvent: Function;
                /** 查询库存事件 */
                fetchMaterialInventoryEvent: Function;
                /** 查询批次信息 */
                fetchMaterialBatchEvent: Function;
                /** 编辑批次信息 */
                editMaterialBatchEvent: Function;
                /** 查询序列信息 */
                fetchMaterialSerialEvent: Function;
                /** 编辑序列信息 */
                editMaterialSerialEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableMaterials = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: {
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
                                },
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "activated",
                                        formatter(): any {
                                            if (!ibas.objects.isNull(this.getBindingContext())) {
                                                let material: bo.Material = this.getBindingContext().getObject();
                                                if (material) {
                                                    if (material.activated === ibas.emYesNo.YES) {
                                                        let today: Date = ibas.dates.now();
                                                        // 已激活-无生效日期-无失效日期
                                                        if (ibas.objects.isNull(material.validDate) &&
                                                            ibas.objects.isNull(material.invalidDate)) {
                                                            return ibas.i18n.prop("shell_available");
                                                        } else if (ibas.objects.isNull(material.validDate) &&
                                                            // 已激活-无生效日期-失效日期大于等于当前日期
                                                            material.invalidDate >= today) {
                                                            return ibas.i18n.prop("shell_available");
                                                        } else if (material.validDate < today &&
                                                            // 已激活-生效日期小于等于当前日期-失效日期大于等于当前日期
                                                            material.invalidDate >= today) {
                                                            return ibas.i18n.prop("shell_available");
                                                        } else if (material.validDate <= today &&
                                                            // 已激活-生效日期小于等于当前日期-无失效日期
                                                            ibas.objects.isNull(material.invalidDate)) {
                                                            return ibas.i18n.prop("shell_available");
                                                        } else {
                                                            // 已激活-其他
                                                            return ibas.i18n.prop("shell_unavailable");
                                                        }
                                                    } else {
                                                        // 未激活
                                                        return ibas.i18n.prop("shell_unavailable");
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    state: sap.ui.core.ValueState.Success
                                }),
                                secondStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "itemType",
                                        formatter(data: any): any {
                                            return ibas.enums.describe(bo.emItemType, data);
                                        }
                                    },
                                    state: {
                                        path: "itemType",
                                        formatter(data: any): any {
                                            return data === bo.emItemType.ITEM ? sap.ui.core.ValueState.Success : sap.ui.core.ValueState.Warning;
                                        }
                                    },
                                }),
                                attributes: [
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_code"),
                                        text: "{code}"
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_group"),
                                        text: "{group}"
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_onavailable"),
                                        text: "{=${}.onAvailable()} {inventoryUOM}",
                                    }),
                                ],
                                type: sap.m.ListType.Active
                            })
                        },
                        selectionChange(event: sap.ui.base.Event): void {
                            let selected: boolean = event.getParameter("selected");
                            if (selected === true) {
                                that.fireViewEvents(that.viewDataEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
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
                    this.pageMaterials = new sap.m.Page("", {
                        showHeader: false,
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://create",
                                    press: function (): void {
                                        that.fireViewEvents(that.newDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableMaterials
                        ]
                    });
                    this.panelInventory = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    level: sap.ui.core.TitleLevel.H5,
                                    text: {
                                        path: "onHand",
                                        formatter(data: any): any {
                                            if (ibas.objects.isNull(this.getBindingContext())) {
                                                return data;
                                            }
                                            let material: bo.Material = this.getBindingContext().getObject();
                                            if (ibas.objects.isNull(material)) {
                                                return data;
                                            }
                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                            builder.map(null, "");
                                            builder.map(undefined, "");
                                            builder.append(ibas.i18n.prop("bo_materialinventory"));
                                            builder.append(" - ");
                                            builder.append(material.onHand);
                                            builder.append(" ");
                                            builder.append(material.inventoryUOM);
                                            return builder.toString();
                                        }
                                    },
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialInventoryEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        expand(event: sap.ui.base.Event): void {
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialInventoryEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.Table("", {
                                chooseType: ibas.emChooseType.NONE,
                                visibleRowCount: 4,
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_code"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onhand"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onHand",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onCommited",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onordered"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onOrdered",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelBatch = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    level: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("bo_materialbatch"),
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.CheckBox("", {
                                    text: ibas.i18n.prop("materials_valid_data_only"),
                                    selected: true,
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialBatchEvent,
                                            that.tableMaterials.getSelecteds().firstOrDefault(),
                                            (<sap.m.CheckBox>(<sap.m.Toolbar>this.getParent()).getContent()[2]).getSelected()
                                        );
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialBatchEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.Table("", {
                                chooseType: ibas.emChooseType.NONE,
                                visibleRowCount: 8,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction("", {
                                    items: [
                                        new sap.ui.table.RowActionItem("", {
                                            icon: "sap-icon://show-edit",
                                            press: function (oEvent: any): void {
                                                that.fireViewEvents(that.editMaterialBatchEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            },
                                        }),
                                    ]
                                }),
                                columns: [
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_code"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "batchCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "batchCode",
                                        filterProperty: "batchCode"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_locked"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "locked",
                                            type: new sap.extension.data.YesNo(true),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "supplierSerial",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "supplierSerial",
                                        filterProperty: "supplierSerial"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_specification"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.MaterialSpecification,
                                                key: bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                                text: bo.MaterialSpecification.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "specification",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "expirationDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "expirationDate",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "manufacturingDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "manufacturingDate",
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelSerial = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    level: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("bo_materialserial"),
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.CheckBox("", {
                                    text: ibas.i18n.prop("materials_valid_data_only"),
                                    selected: true,
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (this: sap.m.Button): void {
                                        that.fireViewEvents(that.fetchMaterialSerialEvent,
                                            that.tableMaterials.getSelecteds().firstOrDefault(),
                                            (<sap.m.CheckBox>(<sap.m.Toolbar>this.getParent()).getContent()[2]).getSelected()
                                        );
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialSerialEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.Table("", {
                                chooseType: ibas.emChooseType.NONE,
                                visibleRowCount: 8,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction("", {
                                    items: [
                                        new sap.ui.table.RowActionItem("", {
                                            icon: "sap-icon://show-edit",
                                            press: function (oEvent: any): void {
                                                that.fireViewEvents(that.editMaterialSerialEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            },
                                        }),
                                    ]
                                }),
                                columns: [
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_warehouse"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "serialCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "serialCode",
                                        filterProperty: "serialCode"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_locked"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "locked",
                                            type: new sap.extension.data.YesNo(true),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "supplierSerial",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "supplierSerial",
                                        filterProperty: "supplierSerial"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_batchserial"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "batchSerial",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "batchSerial",
                                        filterProperty: "batchSerial"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_specification"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.MaterialSpecification,
                                                key: bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                                text: bo.MaterialSpecification.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "specification",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "expirationDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "expirationDate",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "manufacturingDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "manufacturingDate",
                                    }),
                                ],
                            })
                        ],
                    });
                    this.pageOverview = new sap.m.Page("", {
                        content: [
                            new sap.ui.layout.form.SimpleForm("", {
                                editable: false,
                                layout: "ResponsiveGridLayout",
                                labelSpanL: 3,
                                labelSpanM: 3,
                                emptySpanL: 4,
                                emptySpanM: 4,
                                columnsL: 2,
                                columnsM: 2,
                                content: [
                                    new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "code",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_name") }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "name",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_foreignname") }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "foreignName",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                                    new sap.extension.m.Text("", {
                                    }).bindProperty("bindingValue", {
                                        path: "barCode",
                                        type: new sap.extension.data.Alphanumeric(),
                                    }),
                                    new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_material_picture") }),
                                    new sap.m.Image("", {
                                        width: "100%",
                                        height: "16rem",
                                    }).bindProperty("src", {
                                        path: "picture",
                                        formatter(data: any): any {
                                            if (ibas.strings.isWith(data, "http", undefined)) {
                                                return ibas.urls.normalize(data);
                                            }
                                            return new bo.BORepositoryMaterials().toUrl(data);
                                        }
                                    }),
                                ],
                            }),
                            this.panelInventory,
                            this.panelBatch,
                            this.panelSerial,
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageMaterials,
                        ],
                        detailPages: [
                            this.pageOverview
                        ],
                    });
                }
                private pageMaterials: sap.m.Page;
                private pageOverview: sap.m.Page;
                private panelInventory: sap.m.Panel;
                private panelBatch: sap.m.Panel;
                private panelSerial: sap.m.Panel;
                private tableMaterials: sap.extension.m.List;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageMaterials.addHeaderContent(view);
                    this.pageMaterials.setShowHeader(true);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableMaterials.setBusy(true);
                        this.tableMaterials.setModel(null);
                    }
                }
                /** 显示数据 */
                showMaterials(datas: bo.IMaterial[]): void {
                    let model: sap.ui.model.Model = this.tableMaterials.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableMaterials.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableMaterials.setBusy(false);
                }
                /** 显示物料基础信息 */
                showMaterial(data: bo.IMaterial): void {
                    this.pageOverview.setModel(new sap.ui.model.json.JSONModel(data));
                    this.pageOverview.bindObject("/");
                    this.panelInventory.setVisible(data.itemType === bo.emItemType.ITEM ? true : false);
                    this.panelInventory.getContent()[0].setModel(undefined);
                    this.panelInventory.setExpanded(false);
                    this.panelBatch.setVisible(data.batchManagement === ibas.emYesNo.YES ? true : false);
                    this.panelBatch.getContent()[0].setModel(undefined);
                    this.panelBatch.setExpanded(false);
                    this.panelSerial.setVisible(data.serialManagement === ibas.emYesNo.YES ? true : false);
                    this.panelSerial.getContent()[0].setModel(undefined);
                    this.panelSerial.setExpanded(false);
                }
                /** 显示物料库存 */
                showMaterialInventory(datas: bo.IMaterialInventory[]): void {
                    this.panelInventory.setVisible(true);
                    this.panelInventory.getContent()[0].setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.panelInventory.setExpanded(true);
                }
                /** 显示物料批次信息 */
                showMaterialBatch(datas: bo.IMaterialBatch[]): void {
                    this.panelBatch.setVisible(true);
                    this.panelBatch.setBusy(true);
                    this.panelBatch.getContent()[0].setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.panelBatch.setExpanded(true);
                    this.panelBatch.setBusy(false);
                }
                /** 显示物料序列信息 */
                showMaterialSerial(datas: bo.IMaterialSerial[]): void {
                    this.panelSerial.setVisible(true);
                    this.panelSerial.setBusy(true);
                    this.panelSerial.getContent()[0].setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.panelSerial.setExpanded(true);
                    this.panelSerial.setBusy(false);
                }
            }
        }
    }
}