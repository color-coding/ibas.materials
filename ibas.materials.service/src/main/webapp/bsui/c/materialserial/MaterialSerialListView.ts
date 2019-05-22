/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /**
             * 列表视图-物料
             */
            export class MaterialSerialListView extends ibas.BOQueryViewWithPanel implements app.IMaterialSerialListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialSerial;
                }
                /** 新建数据 */
                newDataEvent: Function;
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
                /** 显示数据，参数：目标数据 */
                viewDataEvent: Function;
                /** 查询物料批次交易记录 */
                fetchSerialJournalEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableSerial = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{serialCode}",
                                number: {
                                    path: "inStock",
                                    formatter(data: any): any {
                                        if (data === ibas.emYesNo.YES) {
                                            return ibas.i18n.prop("bo_materialserial_instock");
                                        }
                                    }
                                },
                                markers: new sap.m.ObjectMarker("", {
                                    type: {
                                        path: "locked",
                                        formatter(data: any): any {
                                            if (data === ibas.emYesNo.YES) {
                                                return sap.m.ObjectMarkerType.Locked;
                                            } else {
                                                return null;
                                            }
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatch_itemcode"),
                                        text: "{itemCode}"
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatch_warehouse"),
                                        text: "{warehouse}"
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                        text: "{supplierSerial}"
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
                    this.pageSerial = new sap.m.Page("", {
                        showHeader: false,
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent, that.tableSerial.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [this.tableSerial]
                    });
                    this.tableSerialJournal = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialjournal_basedocumenttype"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "baseDocumentType",
                                    formatter(data: any): any {
                                        return ibas.businessobjects.describe(data);
                                    }
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialjournal_basedocumententry"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "baseDocumentEntry",
                                    type: new sap.extension.data.Numeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialjournal_basedocumentlineid"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "baseDocumentLineId",
                                    type: new sap.extension.data.Numeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialserialjournal_direction"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "direction",
                                    type: new sap.extension.data.Direction(true)
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
                            that.fireViewEvents(that.fetchSerialJournalEvent, criteria);
                        }
                    });
                    this.searchSerialJournal = new sap.m.SearchField("", {
                        search(): void {
                            let batch: bo.MaterialSerial = that.tableSerial.getSelecteds<bo.MaterialSerial>().firstOrDefault();
                            if (ibas.objects.isNull(batch)) {
                                that.application.viewShower.messages({
                                    title: that.application.description,
                                    message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialbatch")),
                                    type: ibas.emMessageType.WARNING
                                });
                                return;
                            }
                            let condition: ibas.ICondition;
                            let criteria: ibas.ICriteria = that.getSerialJournalCriteria().clone();
                            let search: string = that.searchSerialJournal.getValue();
                            if (!ibas.strings.isEmpty(search)) {
                                for (let item of criteria.conditions) {
                                    if (ibas.strings.isEmpty(item.alias)) {
                                        item.value = search;
                                    }
                                }
                            }
                            condition = criteria.conditions.create();
                            condition.bracketOpen = 1;
                            condition.alias = bo.MaterialSerialJournal.PROPERTY_ITEMCODE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = batch.itemCode;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialSerialJournal.PROPERTY_WAREHOUSE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = batch.warehouse;
                            condition = criteria.conditions.create();
                            condition.bracketClose = 1;
                            condition.alias = bo.MaterialSerialJournal.PROPERTY_SERIALCODE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = batch.serialCode;
                            that.fireViewEvents(that.fetchSerialJournalEvent, criteria);
                            that.lastJournalCriteria = criteria;
                            that.tableSerialJournal.setFirstVisibleRow(0);
                            that.tableSerialJournal.setModel(null);
                        }
                    });
                    this.pageSerialJournal = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                this.searchSerialJournal,
                                new sap.m.Button("", {
                                    icon: "sap-icon://filter",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        ibas.servicesManager.runApplicationService<ibas.ICriteriaEditorServiceContract, ibas.ICriteria>({
                                            proxy: new ibas.CriteriaEditorServiceProxy({
                                                target: bo.MaterialSerialJournal,
                                                criteria: that.getSerialJournalCriteria(),
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
                            this.tableSerialJournal
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageSerial,
                        ],
                        detailPages: [
                            this.pageSerialJournal
                        ],
                    });
                }
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setHeight("100%");
                    }
                    this.pageSerial.addHeaderContent(view);
                    this.pageSerial.setShowHeader(true);
                }
                private pageSerial: sap.m.Page;
                private tableSerial: sap.extension.m.List;

                /** 显示物料批次数据 */
                showSerials(datas: bo.MaterialSerial[]): void {
                    let model: sap.ui.model.Model = this.tableSerial.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableSerial.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableSerial.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableSerial.setBusy(true);
                        this.tableSerial.setModel(null);
                    }
                }
                private pageSerialJournal: sap.m.Page;
                private searchSerialJournal: sap.m.SearchField;
                private tableSerialJournal: sap.extension.table.Table;
                /** 上一次使用的价格查询 */
                private lastJournalCriteria: ibas.ICriteria;
                /** 基础价格查询 */
                private journalCriteria: ibas.ICriteria;
                private getSerialJournalCriteria(): ibas.ICriteria {
                    if (!ibas.objects.isNull(this.journalCriteria)) {
                        return this.journalCriteria;
                    }
                    let condition: ibas.ICondition;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.MaterialSerialJournal.PROPERTY_OBJECTKEY_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    this.journalCriteria = criteria;
                    return this.journalCriteria;
                }
                /** 显示物料批次交易数据 */
                showSerialJournals(datas: bo.MaterialSerialJournal[]): void {
                    let model: sap.ui.model.Model = this.tableSerialJournal.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableSerialJournal.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableSerialJournal.setBusy(false);
                }
            }
        }
    }
}