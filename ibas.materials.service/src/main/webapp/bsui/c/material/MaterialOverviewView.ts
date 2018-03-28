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
             * 列表视图-物料
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
                /** 调用服务事件，参数1 IServicesShower显示服务者 */
                callServicesEvent: Function;
                /** 查询物料相关信息 */
                fetchMaterialAllInformationEvent: Function;

                private pageMaterial: sap.m.Page;
                private tableMaterial: sap.m.List;
                private pageOverview: sap.m.Page;
                private formBasisInformation: sap.ui.layout.form.SimpleForm;
                private formOtherInformation: sap.ui.layout.form.SimpleForm;
                private tableMaterialInventory: sap.ui.table.Table;
                private tableMaterialPrice: sap.ui.table.Table;
                private inputBeShowedPriceList: sap.m.Input;
                private tableMaterialSerial: sap.ui.table.Table;
                private panelMaterialSerial: sap.m.Panel;
                private tableMaterialBatch: sap.ui.table.Table;
                private panelMaterialBatch: sap.m.Panel;
                private textCountInformation: sap.m.Label;
                private multicomboboxWarehouse: sap.m.MultiComboBox;
                private multicomboboxPricelist: sap.m.MultiComboBox;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    that.tableMaterial = new sap.m.List("", {
                        inset: false,
                        growing: true,
                        growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        growingScrollToLoad: true,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name}",
                                number: "{onHand}",
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
                        /* itemPress(oEvent: any): void {
                            var oItem: any = oEvent.getParameter("listItem");
                            that.fireViewEvents(that.fetchMaterialAllInformationEvent,
                                oItem.getBindingContext().getObject()
                            );
                        } */
                    });
                    // 添加列表自动查询事件
                    openui5.utils.triggerNextResults({
                        listener: that.tableMaterial,
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
                    that.pageMaterial = new sap.m.Page("", {
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
                                            openui5.utils.getSelecteds<bo.Material>(that.tableMaterial).firstOrDefault()
                                        );
                                    }
                                }),
                            ]
                        }),
                        content: [that.tableMaterial]
                    });
                    that.multicomboboxWarehouse = new sap.m.MultiComboBox("", {
                        // width: "60%",
                        Deselected: true,
                        filterSecondaryValues: false,
                        showSecondaryValues: true,
                        placement: sap.m.PlacementType.Auto,
                        selectionFinish: function (oEvent: any): void {
                            let selectedItems: any = oEvent.getParameter("selectedItems");
                            let messageText: any[] = [];
                            for (let i: number = 0; i < selectedItems.length; i++) {
                                messageText.push(selectedItems[i].getText());
                            }
                            that.groupsTranslateWarehouse(messageText);
                        },
                    });
                    that.multicomboboxPricelist = new sap.m.MultiComboBox("", {
                        // width: "60%",
                        Deselected: true,
                        filterSecondaryValues: false,
                        showSecondaryValues: true,
                        placement: sap.m.PlacementType.Auto,
                        selectionFinish: function (oEvent: any): void {
                            let selectedItems: any = oEvent.getParameter("selectedItems");
                            let messageText: any[] = [];
                            for (let i: number = 0; i < selectedItems.length; i++) {
                                messageText.push(selectedItems[i].getText());
                            }
                        }
                    });
                    that.pageOverview = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    width: "55px",
                                    text: ibas.i18n.prop("materials_app_warehouse_list")
                                }),
                                that.multicomboboxWarehouse,
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("materials_app_materialpricelist_list"),
                                    width: "100px"
                                }),
                                that.inputBeShowedPriceList = new sap.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseMaterialOverViewPriceListEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "查詢",
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://search",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialAllInformationEvent,
                                            openui5.utils.getSelecteds<bo.Material>(that.tableMaterial).firstOrDefault()
                                        );
                                    }
                                })
                            ]
                        }),
                        content: [
                            that.formBasisInformation = new sap.ui.layout.form.SimpleForm("", {
                                editable: false,
                                layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                                content: [
                                    new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                                    new sap.m.Text("", {
                                    }).bindProperty("text", {
                                        path: "code"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_name") }),
                                    new sap.m.Text("", {
                                    }).bindProperty("text", {
                                        path: "name"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_foreignname") }),
                                    new sap.m.Text("", {
                                    }).bindProperty("text", {
                                        path: "foreignName"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_itemtype") }),
                                    new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: "itemType",
                                        formatter(data: any): any {
                                            return ibas.enums.describe(bo.emItemType, data);
                                        }
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_group") }),
                                    new sap.m.Text("", {
                                    }).bindProperty("text", {
                                        path: "group"
                                    }),
                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                                    new sap.m.Text("", {
                                    }).bindProperty("text", {
                                        path: "barCode"
                                    }),
                                    new sap.ui.core.Title("", {}),
                                ]
                            }),
                            new sap.m.Panel("", {
                                expandable: true,
                                expanded: false,
                                headerToolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("materials_title_others"),
                                        })
                                    ]
                                }),
                                content: [
                                    that.formOtherInformation = new sap.ui.layout.form.SimpleForm("", {
                                        editable: false,
                                        layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                                        content: [
                                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_activated") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "activated",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_validdate") }),
                                            new sap.m.Text("", {
                                            }).bindProperty("text", {
                                                path: "validDate",
                                                type: new sap.ui.model.type.Date({
                                                    pattern: "yyyy-MM-dd",
                                                    strictParsing: true,
                                                }),
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_invaliddate") }),
                                            new sap.m.Text("", {
                                            }).bindProperty("text", {
                                                path: "invalidDate",
                                                type: new sap.ui.model.type.Date({
                                                    pattern: "yyyy-MM-dd",
                                                    strictParsing: true,
                                                }),
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseitem") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "purchaseItem",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesitem") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "salesItem",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryitem") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "inventoryItem",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "phantomItem",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_fixedassets") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "fixedAssets",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_inventory") }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryuom") }),
                                            new sap.m.Text("", {
                                            }).bindProperty("text", {
                                                path: "inventoryUOM"
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_minimuminventory") }),
                                            new sap.m.Text("", {
                                            }).bindProperty("text", {
                                                path: "minimumInventory"
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_defaultwarehouse") }),
                                            new sap.m.Text("", {
                                            }).bindProperty("text", {
                                                path: "defaultWarehouse"
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_serialmanagement") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "serialManagement",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_batchmanagement") }),
                                            new sap.m.Text("", {
                                                wrapping: false
                                            }).bindProperty("text", {
                                                path: "batchManagement",
                                                formatter(data: any): any {
                                                    return ibas.enums.describe(ibas.emYesNo, data);
                                                }
                                            }),
                                            new sap.ui.core.Title("", {}),
                                        ]
                                    })
                                ]
                            }),
                            new sap.m.Panel("", {
                                expandable: true,
                                expanded: false,
                                headerToolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("materials_func_materialpricelist"),
                                        })
                                    ]
                                }),
                                content: [
                                    that.tableMaterialPrice = new sap.ui.table.Table("", {
                                        enableSelectAll: true,
                                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                                        rows: "{/rows}",
                                        columns: [
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialpricelist_basedonlist"),
                                                template: new sap.m.Text("", {
                                                    wrapping: false
                                                }).bindProperty("text", {
                                                    path: "source",
                                                }),
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialprice_price"),
                                                template: new sap.m.Text("", {
                                                    wrapping: false
                                                }).bindProperty("text", {
                                                    path: "price",
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialprice_currency"),
                                                template: new sap.m.Text("", {
                                                    wrapping: false
                                                }).bindProperty("text", {
                                                    path: "currency",
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new sap.m.Panel("", {
                                expandable: true,
                                expanded: false,
                                headerToolbar: new sap.m.Toolbar("", {
                                    content: [
                                        that.textCountInformation = new sap.m.Label("", {
                                            text: ibas.i18n.prop("materials_func_materialinventory")
                                        })
                                    ]
                                }),
                                content: [
                                    that.tableMaterialInventory = new sap.ui.table.Table("", {
                                        rows: "{/rows}",
                                        columns: [
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialinventory_warehouse"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "warehouse"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialinventory_avgprice"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "avgPrice"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_material_onhand"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "onHand"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "onCommited"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialinventory_onordered"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "onOrdered"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            that.panelMaterialSerial = new sap.m.Panel("", {
                                expandable: true,
                                expanded: false,
                                headerToolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("materials_func_materialserial"),
                                        })
                                    ]
                                }),
                                content: [
                                    that.tableMaterialSerial = new sap.ui.table.Table("", {
                                        rows: "{/rows}",
                                        columns: [
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "serialCode"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialserial_warehouse"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "warehouse"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialserial_locked"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "locked",
                                                    formatter(data: any): any {
                                                        return ibas.enums.describe(ibas.emYesNo, data);
                                                    }
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "supplierSerial"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            that.panelMaterialBatch = new sap.m.Panel("", {
                                expandable: true,
                                expanded: false,
                                headerToolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("materials_func_materialbatch"),
                                        })
                                    ]
                                }),
                                content: [
                                    that.tableMaterialBatch = new sap.ui.table.Table("", {
                                        rows: "{/rows}",
                                        columns: [
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "batchCode"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "quantity"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialbatch_locked"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "locked",
                                                    formatter(data: any): any {
                                                        return ibas.enums.describe(ibas.emYesNo, data);
                                                    }
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "supplierSerial"
                                                })
                                            }),
                                            new sap.ui.table.Column("", {
                                                label: ibas.i18n.prop("bo_materialbatch_warehouse"),
                                                template: new sap.m.Text("", {
                                                    width: "100%",
                                                }).bindProperty("text", {
                                                    path: "warehouse"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            that.pageMaterial,
                        ],
                        detailPages: [
                            that.pageOverview
                        ],
                    });
                }
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setHeight("100%");
                    }
                    this.pageMaterial.addHeaderContent(view);
                    this.pageMaterial.setShowHeader(true);
                }

                /** 显示物料数据 */
                showMaterials(datas: bo.Material[]): void {
                    let done: boolean = false;
                    let model: sap.ui.model.Model = this.tableMaterial.getModel(undefined);
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
                        this.tableMaterial.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    }
                    this.tableMaterial.setBusy(false);
                }

                /** 显示物料信息 */
                showMaterial(data: bo.Material): void {
                    this.formBasisInformation.setModel(new sap.ui.model.json.JSONModel(data));
                    this.formBasisInformation.bindObject("/");
                    openui5.utils.refreshModelChanged(this.formBasisInformation, data);
                    this.formOtherInformation.setModel(new sap.ui.model.json.JSONModel(data));
                    this.formOtherInformation.bindObject("/");
                    openui5.utils.refreshModelChanged(this.formOtherInformation, data);
                    if (data.serialManagement === 0) {
                        this.panelMaterialSerial.setVisible(false);
                    } else {
                        this.panelMaterialSerial.setVisible(true);
                    }
                    if (data.batchManagement === 0) {
                        this.panelMaterialBatch.setVisible(false);
                    } else {
                        this.panelMaterialBatch.setVisible(true);
                    }
                }

                /** 显示物料库存、已定购、已承诺总量 */
                showMaterialQuantity(data: bo.MaterialQuantity): void {
                    if (ibas.objects.isNull(data.onHand)) {
                        data.onHand = 0;
                    }
                    if (ibas.objects.isNull(data.onCommited)) {
                        data.onCommited = 0;
                    }
                    if (ibas.objects.isNull(data.onOrdered)) {
                        data.onOrdered = 0;
                    }
                    this.textCountInformation.setText(
                        ibas.i18n.prop("materials_func_materialinventory") + " " +
                        ibas.i18n.prop("bo_material_onhand") + ": " + data.onHand +
                        ibas.i18n.prop("bo_material_oncommited") + ": " + data.onCommited +
                        ibas.i18n.prop("bo_material_onordered") + ": " + data.onOrdered
                    );
                }

                private materialInventory: bo.MaterialInventory[];
                private materialPricelist: bo.MaterialPriceList[];
                private materialBatch: bo.MaterialBatch[];
                private materialSerial: bo.MaterialSerial[];

                /** 显示物料库存信息 */
                showMaterialInventory(datas: bo.MaterialInventory[], dataIsChange: boolean): void {
                    this.tableMaterialInventory.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.tableMaterialInventory.bindObject("/");
                    openui5.utils.refreshModelChanged(this.tableMaterialInventory, datas);
                    if (this.multicomboboxWarehouse.getItems().length === 0 || dataIsChange === true) {
                        let item: string[] = [];
                        for (let data of datas) {
                            item.push(data.warehouse);
                        }
                        this.initMulticomboboxItemWarehouse(item);
                        this.materialInventory = datas;
                    }
                }

                /** 显示用户选择的价格清单 */
                showBeShowedPriceList(datas: bo.MaterialPriceList[]): void {
                    if (ibas.objects.isNull(datas)) {
                        return;
                    }
                    for (let data of datas) {
                        this.inputBeShowedPriceList.setValue(data.objectKey.toString());
                    }
                }

                /** 显示物料价格信息 */
                showMaterialPrice(datas: bo.MaterialPrice[], dataIsChange: boolean): void {
                    this.tableMaterialPrice.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.tableMaterialPrice.bindObject("/");
                    openui5.utils.refreshModelChanged(this.tableMaterialPrice, datas);
                }

                /** 显示物料批次信息 */
                showMaterialBatch(datas: bo.MaterialBatch[]): void {
                    this.tableMaterialBatch.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.tableMaterialBatch.bindObject("/");
                    openui5.utils.refreshModelChanged(this.tableMaterialBatch, datas);
                    this.materialBatch = datas;
                }

                /** 显示物料序列信息 */
                showMaterialSerial(datas: bo.MaterialSerial[]): void {
                    this.tableMaterialSerial.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.tableMaterialSerial.bindObject("/");
                    openui5.utils.refreshModelChanged(this.tableMaterialSerial, datas);
                    this.materialSerial = datas;
                }

                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableMaterial.setBusy(true);
                        this.tableMaterial.setModel(null);
                    }
                }

                /** 筛选出用户选择仓库相关的信息 */
                groupsTranslateWarehouse(warehousegroups: any[]): void {
                    let that: this = this;
                    let beShowedesInventory: bo.MaterialInventory[] = [];
                    let beShowedesBatch: bo.MaterialBatch[] = [];
                    let beShowedesSerial: bo.MaterialSerial[] = [];
                    if (warehousegroups.length > 0 && !ibas.objects.isNull(that.materialInventory)) {
                        for (let i: number = 0; i < warehousegroups.length; i++) {
                            for (let item of that.materialInventory) {
                                if (warehousegroups[i] === item.warehouse) {
                                    beShowedesInventory.push(item);
                                }
                            }
                            if (!ibas.objects.isNull(that.materialBatch)) {
                                for (let item of that.materialBatch) {
                                    if (warehousegroups[i] === item.warehouse) {
                                        beShowedesBatch.push(item);
                                    }
                                }
                            }
                            if (!ibas.objects.isNull(that.materialSerial)) {
                                for (let item of that.materialSerial) {
                                    if (warehousegroups[i] === item.warehouse) {
                                        beShowedesSerial.push(item);
                                    }
                                }
                            }
                        }
                        that.showMaterialInventory(beShowedesInventory, false);
                        that.showMaterialBatch(beShowedesBatch);
                        that.showMaterialSerial(beShowedesSerial);
                    } else if (!ibas.objects.isNull(that.materialInventory)) {
                        // 当用户清空筛选条件，显示所有仓库信息
                        that.showMaterialInventory(that.materialInventory, false);
                    }
                }

                /** 初始化筛选仓库条件下拉框 */
                initMulticomboboxItemWarehouse(list: string[]): void {
                    this.multicomboboxWarehouse.destroyItems();
                    for (let item of list) {
                        this.multicomboboxWarehouse.addItem(new sap.ui.core.Item("", {
                            text: item
                        }));
                    }
                }

                /** 物料总览选择价格清单 */
                chooseMaterialOverViewPriceListEvent: Function;
            }
        }
    }
}