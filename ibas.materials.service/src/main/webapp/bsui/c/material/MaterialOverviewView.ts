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
                    this.tableMaterials = new sap.m.List("", {
                        inset: false,
                        growing: true,
                        growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        growingScrollToLoad: true,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name}",
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
                                    })
                                ],
                                type: sap.m.ListType.Active
                            })
                        },
                        selectionChange(): void {
                            that.fireViewEvents(that.viewDataEvent,
                                // 获取表格选中的对象
                                openui5.utils.getSelecteds<bo.Material>(that.tableMaterials).firstOrDefault()
                            );
                        }
                    });
                    // 添加列表自动查询事件
                    openui5.utils.triggerNextResults({
                        listener: this.tableMaterials,
                        next(data: any): void {
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
                                        that.fireViewEvents(that.editDataEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.Material>(that.tableMaterials).firstOrDefault()
                                        );
                                    }
                                }),
                            ]
                        }),
                        content: [this.tableMaterials]
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
                                            builder.append(": ");
                                            builder.append(material.onHand);
                                            builder.append(material.inventoryUOM);
                                            return builder.toString();
                                        }
                                    },
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialInventoryEvent,
                                            openui5.utils.getSelecteds<bo.Material>(that.tableMaterials).firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.table.Table("", {
                                enableSelectAll: false,
                                selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                                visibleRowCount: 4,
                                rows: "{/rows}",
                                columns: [
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_warehouse"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "warehouse",
                                        }),
                                        sortProperty: "warehouse",
                                        filterProperty: "warehouse"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onhand"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "onHand",
                                            type: new openui5.datatype.Quantity(),
                                        }),
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "onCommited",
                                            type: new openui5.datatype.Quantity(),
                                        }),
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onordered"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "onOrdered",
                                            type: new openui5.datatype.Quantity(),
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
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialBatchEvent,
                                            openui5.utils.getSelecteds<bo.Material>(that.tableMaterials).firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.table.Table("", {
                                enableSelectAll: false,
                                selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                                visibleRowCount: 8,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction({
                                    items: [
                                        new sap.ui.table.RowActionItem({
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
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_warehouse"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "warehouse",
                                        }),
                                        sortProperty: "warehouse",
                                        filterProperty: "warehouse"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "batchCode",
                                        }),
                                        sortProperty: "batchCode",
                                        filterProperty: "batchCode"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_locked"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "locked",
                                            formatter(data: any): any {
                                                return ibas.enums.describe(ibas.emYesNo, data);
                                            }
                                        }),
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "quantity",
                                            type: new openui5.datatype.Quantity(),
                                        }),
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "supplierSerial",
                                        }),
                                        sortProperty: "supplierSerial",
                                        filterProperty: "supplierSerial"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "expirationDate",
                                            type: new sap.ui.model.type.Date({
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
                                        }),
                                        sortProperty: "expirationDate",
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "manufacturingDate",
                                            type: new sap.ui.model.type.Date({
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
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
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialSerialEvent,
                                            openui5.utils.getSelecteds<bo.Material>(that.tableMaterials).firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.table.Table("", {
                                enableSelectAll: false,
                                selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                                visibleRowCount: 8,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction({
                                    items: [
                                        new sap.ui.table.RowActionItem({
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
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_warehouse"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "warehouse",
                                        }),
                                        sortProperty: "warehouse",
                                        filterProperty: "warehouse"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "serialCode",
                                        }),
                                        sortProperty: "serialCode",
                                        filterProperty: "serialCode"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_locked"),
                                        template: new sap.m.Text("", {
                                            wrapping: false
                                        }).bindProperty("text", {
                                            path: "locked",
                                            formatter(data: any): any {
                                                return ibas.enums.describe(ibas.emYesNo, data);
                                            }
                                        }),
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "supplierSerial",
                                        }),
                                        sortProperty: "supplierSerial",
                                        filterProperty: "supplierSerial"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_batchserial"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "batchSerial",
                                        }),
                                        sortProperty: "batchSerial",
                                        filterProperty: "batchSerial"
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "expirationDate",
                                            type: new sap.ui.model.type.Date({
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
                                        }),
                                        sortProperty: "expirationDate",
                                    }),
                                    new sap.ui.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                        template: new sap.m.Text("", {
                                            wrapping: false,
                                        }).bindProperty("text", {
                                            path: "manufacturingDate",
                                            type: new sap.ui.model.type.Date({
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
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
                                    new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: "code"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_name") }),
                                    new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: "name"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_foreignname") }),
                                    new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: "foreignName"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                                    new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: "barCode"
                                    }),
                                    new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_material_picture") }),
                                    new sap.m.Image("", {
                                        width: "100%",
                                        height: "100%",
                                    }).bindProperty("src", {
                                        path: "picture",
                                        formatter(data: any): any {
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
                private tableMaterials: sap.m.List;
                private pageOverview: sap.m.Page;
                private panelInventory: sap.m.Panel;
                private panelBatch: sap.m.Panel;
                private panelSerial: sap.m.Panel;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
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
                    let done: boolean = false;
                    let model: sap.ui.model.Model = this.tableMaterials.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        // 已存在绑定数据，添加新的
                        let hDatas: any = (<any>model).getData();
                        if (!ibas.objects.isNull(hDatas) && hDatas.rows instanceof Array) {
                            for (let item of datas) {
                                hDatas.rows.push(item);
                            }
                            model.refresh(false);
                            done = true;
                        }
                    }
                    if (!done) {
                        // 没有显示数据
                        this.tableMaterials.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    }
                    this.tableMaterials.setBusy(false);
                }
                /** 显示物料基础信息 */
                showMaterial(data: bo.IMaterial): void {
                    this.pageOverview.setModel(new sap.ui.model.json.JSONModel(data));
                    this.pageOverview.bindContext("/");
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
                    this.panelBatch.getContent()[0].setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.panelBatch.setExpanded(true);
                }
                /** 显示物料序列信息 */
                showMaterialSerial(datas: bo.IMaterialSerial[]): void {
                    this.panelSerial.setVisible(true);
                    this.panelSerial.getContent()[0].setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.panelSerial.setExpanded(true);
                }
            }
        }
    }
}