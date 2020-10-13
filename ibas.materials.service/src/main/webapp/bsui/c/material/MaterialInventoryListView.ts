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
             * 列表视图-物料库存
             */
            export class MaterialInventoryListView extends ibas.BOQueryViewWithPanel implements app.IMaterialInventoryListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialInventory;
                }
                /** 新建数据事件 */
                newDataEvent: Function;
                /** 查看数据事件，参数：目标数据 */
                viewDataEvent: Function;
                /** 查询物料库存交易记录 */
                fetchInventoryJournalEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableInventory = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{itemCode}",
                                number: "{onHand}",
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: "{warehouse}"
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialinventory_onhand"),
                                        bindingValue: {
                                            path: "onHand",
                                            type: new sap.extension.data.Quantity(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                        bindingValue: {
                                            path: "onCommited",
                                            type: new sap.extension.data.Quantity(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialinventory_onordered"),
                                        bindingValue: {
                                            path: "onOrdered",
                                            type: new sap.extension.data.Quantity(),
                                        },
                                    }),
                                ]
                            })
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
                    this.pageInventory = new sap.m.Page("", {
                        showHeader: false,
                        content: [this.tableInventory]
                    });
                    this.tableInventoryJournal = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumenttype"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "baseDocumentType",
                                    formatter(data: any): any {
                                        return ibas.businessobjects.describe(data);
                                    }
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumententry"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "baseDocumentEntry",
                                    type: new sap.extension.data.Numeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumentlineid"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "baseDocumentLineId",
                                    type: new sap.extension.data.Numeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_direction"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "direction",
                                    type: new sap.extension.data.Direction(true)
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialinventoryjournal_quantity"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastJournalCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastJournalCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchInventoryJournalEvent, criteria);
                        }
                    });
                    this.searchInventoryJournal = new sap.m.SearchField("", {
                        search(): void {
                            let Inventory: bo.MaterialInventory = that.tableInventory.getSelecteds<bo.MaterialInventory>().firstOrDefault();
                            if (ibas.objects.isNull(Inventory)) {
                                that.application.viewShower.messages({
                                    title: that.application.description,
                                    message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialinventory")),
                                    type: ibas.emMessageType.WARNING
                                });
                                return;
                            }
                            let condition: ibas.ICondition;
                            let criteria: ibas.ICriteria = that.getInventoryJournalCriteria().clone();
                            let search: string = that.searchInventoryJournal.getValue();
                            if (!ibas.strings.isEmpty(search)) {
                                for (let item of criteria.conditions) {
                                    if (ibas.strings.isEmpty(item.alias)) {
                                        item.value = search;
                                    }
                                }
                            }
                            condition = criteria.conditions.create();
                            condition.bracketOpen = 1;
                            condition.alias = bo.MaterialInventoryJournal.PROPERTY_ITEMCODE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = Inventory.itemCode;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryJournal.PROPERTY_WAREHOUSE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = Inventory.warehouse;
                            condition.bracketClose = 1;
                            that.fireViewEvents(that.fetchInventoryJournalEvent, criteria);
                            that.lastJournalCriteria = criteria;
                            that.tableInventoryJournal.setFirstVisibleRow(0);
                            that.tableInventoryJournal.setModel(null);
                        }
                    });
                    this.pageInventoryJournal = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                this.searchInventoryJournal,
                                new sap.m.Button("", {
                                    icon: "sap-icon://filter",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        ibas.servicesManager.runApplicationService<ibas.ICriteriaEditorServiceContract, ibas.ICriteria>({
                                            proxy: new ibas.CriteriaEditorServiceProxy({
                                                target: bo.MaterialInventoryJournal,
                                                criteria: that.getInventoryJournalCriteria(),
                                            }),
                                            onCompleted(result: ibas.ICriteria): void {
                                                that.journalCriteria = result;
                                            }
                                        });
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableInventoryJournal
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageInventory,
                        ],
                        detailPages: [
                            this.pageInventoryJournal
                        ],
                    });
                }
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageInventory.addHeaderContent(view);
                    this.pageInventory.setShowHeader(true);
                }
                private pageInventory: sap.m.Page;
                private tableInventory: sap.extension.m.List;

                /** 显示物料库存数据 */
                showInventories(datas: bo.MaterialInventory[]): void {
                    let model: sap.ui.model.Model = this.tableInventory.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableInventory.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableInventory.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableInventory.setBusy(true);
                        this.tableInventory.setModel(null);
                    }
                }
                private pageInventoryJournal: sap.m.Page;
                private searchInventoryJournal: sap.m.SearchField;
                private tableInventoryJournal: sap.extension.table.Table;
                /** 上一次使用的价格查询 */
                private lastJournalCriteria: ibas.ICriteria;
                /** 基础价格查询 */
                private journalCriteria: ibas.ICriteria;
                private getInventoryJournalCriteria(): ibas.ICriteria {
                    if (!ibas.objects.isNull(this.journalCriteria)) {
                        return this.journalCriteria;
                    }
                    let condition: ibas.ICondition;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.MaterialInventoryJournal.PROPERTY_OBJECTKEY_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    this.journalCriteria = criteria;
                    return this.journalCriteria;
                }
                /** 显示物料库存交易数据 */
                showInventoryJournals(datas: bo.MaterialInventoryJournal[]): void {
                    let model: sap.ui.model.Model = this.tableInventoryJournal.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableInventoryJournal.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableInventoryJournal.setBusy(false);
                }
            }
        }
    }
}