/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace m {
            /**
             * 列表视图-物料价格清单
             */
            export class MaterialPriceListListView extends ibas.BOQueryViewWithPanel implements app.IMaterialPriceListListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialPriceList;
                }
                /** 查看数据事件，参数：目标数据 */
                viewDataEvent: Function;
                /** 新建数据事件 */
                newDataEvent: Function;
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deleteDataEvent: Function;
                /** 选中价格清单事件 */
                selectedPriceListEvent: Function;
                /** 查询价格事件 */
                fetchPriceItemEvent: Function;
                /** 保存价格项目事件 */
                savePriceItemEvent: Function;
                /** 导出价格事件 */
                exportPriceItemEvent: Function;
                /** 添加价格项目事件 */
                addPriceItemEvent: Function;
                /** 选择价格项目单位事件 */
                choosePriceItemUnitEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.listPriceList = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name}",
                                tooltip: "# {objectKey} - {name}",
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: "{currency}"
                                }),
                                secondStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "taxed",
                                        formatter(data: ibas.emYesNo): string {
                                            if (data === ibas.emYesNo.YES) {
                                                return ibas.i18n.prop("materials_taxed");
                                            }
                                            return ibas.i18n.prop("materials_no_tax");
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpriceitem_objectkey"),
                                        bindingValue: {
                                            path: "objectKey",
                                            type: new sap.extension.data.Numeric(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_basedonlist"),
                                        bindingValue: "#{basedOnList} × {factor}"
                                    }).bindProperty("visible", {
                                        path: "basedOnList",
                                        formatter(data: number): boolean {
                                            if (data > 0) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_validdate"),
                                        bindingValue: {
                                            path: "validDate",
                                            type: new sap.extension.data.Date()
                                        }
                                    }).bindProperty("visible", {
                                        path: "validDate",
                                        formatter(data: Date): boolean {
                                            if (data instanceof Date) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_invaliddate"),
                                        bindingValue: {
                                            path: "invalidDate",
                                            type: new sap.extension.data.Date()
                                        }
                                    }).bindProperty("visible", {
                                        path: "invalidDate",
                                        formatter(data: Date): boolean {
                                            if (data instanceof Date) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_remarks"),
                                        bindingValue: {
                                            path: "remarks",
                                            type: new sap.extension.data.Alphanumeric()
                                        }
                                    }).bindProperty("visible", {
                                        path: "remarks",
                                        formatter(data: any): boolean {
                                            return !ibas.objects.isNull(data);
                                        }
                                    }),
                                ],
                                type: sap.m.ListType.Active,
                            })
                        },
                        itemPress: function (this: sap.m.ObjectListItem, oEvent: sap.ui.base.Event): void {
                            that.fireViewEvents(that.selectedPriceListEvent, oEvent.getParameter("listItem").getBindingContext().getObject());
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
                    this.searchPrice = new sap.m.SearchField("", {
                        search(): void {
                            that.searchPrices();
                        }
                    });
                    this.listPrices = new sap.extension.m.List("", {
                        mode: sap.m.ListMode.None,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                },
                                number: {
                                    path: "price",
                                    type: new sap.extension.data.Price()
                                },
                                numberUnit: {
                                    path: "currency",
                                    type: new sap.extension.data.Alphanumeric()
                                },
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "uom",
                                        type: new sap.extension.data.Alphanumeric()
                                    }
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialprice_itemname"),
                                        bindingValue: {
                                            path: "itemName",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialprice_itemsign"),
                                        bindingValue: {
                                            path: "itemSign",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                    }).bindProperty("visible", {
                                        path: "itemSign",
                                        formatter(data: string): boolean {
                                            return !ibas.strings.isEmpty(data);
                                        }
                                    }),
                                ],
                            })
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                let source: any = event.getSource();
                                if (source instanceof sap.extension.m.List) {
                                    if (source.getBusy() === true) {
                                        source.setBusy(false);
                                    }
                                } return;
                            }
                            if (ibas.objects.isNull(that.lastPriceCriteria)) {
                                let source: any = event.getSource();
                                if (source instanceof sap.extension.m.List) {
                                    if (source.getBusy() === true) {
                                        source.setBusy(false);
                                    }
                                } return;
                            }
                            let criteria: ibas.ICriteria = that.lastPriceCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchPriceItemEvent, criteria);
                        }
                    }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent");
                    return this.container = new sap.m.NavContainer("", {
                        autoFocus: false,
                        pages: [
                            new sap.m.Page("", {
                                showHeader: false,
                                content: [
                                    this.listPriceList
                                ]
                            }),
                            new sap.extension.m.Page("", {
                                showHeader: false,
                                showSubHeader: true,
                                subHeader: new sap.m.Toolbar("", {
                                    content: [
                                        this.searchPrice,
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Button("", {
                                            icon: "sap-icon://navigation-left-arrow",
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                that.container.to(that.listPriceList.getParent().getId());
                                                that.listPrices.setModel(null);
                                                that.listPrices.destroyItems();
                                            }
                                        }),
                                    ]
                                }),
                                content: [
                                    this.pullToRefresh2 = new sap.m.PullToRefresh("", {
                                        refresh: function (event: sap.ui.base.Event): void {
                                            that.searchPrices();
                                        }
                                    }),
                                    this.listPrices
                                ],
                            })
                        ],
                    });
                }
                private container: sap.m.NavContainer;
                private pullToRefresh: sap.m.PullToRefresh;
                private pullToRefresh2: sap.m.PullToRefresh;
                private listPriceList: sap.extension.m.List;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    (<sap.m.Page>this.listPriceList.getParent()).addHeaderContent(view);
                    (<sap.m.Page>this.listPriceList.getParent()).setShowHeader(true);
                }
                /** 嵌入下拉条 */
                embeddedPuller(view: any): void {
                    if (view instanceof sap.m.PullToRefresh) {
                        if (!ibas.objects.isNull(this.listPriceList.getParent())) {
                            (<sap.m.Page>this.listPriceList.getParent()).insertContent(view, 0);
                            this.pullToRefresh = view;
                        }
                    }
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.listPriceList.setBusy(true);
                        this.listPriceList.setModel(null);
                    }
                }
                /** 显示数据 */
                showPriceList(datas: bo.MaterialPriceList[]): void {
                    if (!ibas.objects.isNull(this.pullToRefresh)) {
                        this.pullToRefresh.hide();
                    }
                    this.container.to(this.listPriceList.getParent().getId());
                    let model: sap.ui.model.Model = this.listPriceList.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.listPriceList.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.listPriceList.setBusy(false);
                }
                private listPrices: sap.extension.m.List;
                private searchPrice: sap.m.SearchField;
                /** 上一次使用的价格查询 */
                private lastPriceCriteria: ibas.ICriteria;
                /** 基础价格查询 */
                private priceCriteria: ibas.ICriteria;
                private getPriceCriteria(): ibas.ICriteria {
                    if (!ibas.objects.isNull(this.priceCriteria) && this.priceCriteria.conditions.length > 0) {
                        return this.priceCriteria;
                    }
                    let condition: ibas.ICondition;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                    // 添加默认查询条件
                    condition = criteria.conditions.create();
                    condition.bracketOpen = 1;
                    condition.alias = app.conditions.materialprice.CONDITION_ALIAS_ITEMCODE;
                    condition.operation = ibas.emConditionOperation.CONTAIN;
                    condition.value = "";
                    condition = criteria.conditions.create();
                    condition.alias = app.conditions.materialprice.CONDITION_ALIAS_ITEMSIGN;
                    condition.operation = ibas.emConditionOperation.CONTAIN;
                    condition.value = "";
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition = criteria.conditions.create();
                    condition.bracketClose = 1;
                    condition.alias = app.conditions.materialprice.CONDITION_ALIAS_ITEMNAME;
                    condition.operation = ibas.emConditionOperation.CONTAIN;
                    condition.value = "";
                    condition.relationship = ibas.emConditionRelationship.OR;
                    this.priceCriteria = criteria;
                    return this.priceCriteria;
                }
                /** 显示数据 */
                showPriceItems(datas: bo.MaterialPrice[]): void {
                    if (!ibas.objects.isNull(this.pullToRefresh2)) {
                        this.pullToRefresh2.hide();
                    }
                    this.container.to(this.listPrices.getParent().getId());
                    if (ibas.objects.isNull(datas)) {
                        this.listPrices.setModel(new sap.extension.model.JSONModel({ rows: [] }));
                    } else {
                        let model: sap.ui.model.Model = this.listPrices.getModel();
                        if (model instanceof sap.extension.model.JSONModel) {
                            // 已绑定过数据
                            model.addData(datas);
                        } else {
                            // 未绑定过数据
                            this.listPrices.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        }
                        this.listPrices.setBusy(false);
                    }
                }
                private searchPrices(): void {
                    let criteria: ibas.ICriteria;
                    let condition: ibas.ICondition;
                    let search: string = this.searchPrice.getValue();
                    if (!ibas.strings.isEmpty(search)) {
                        criteria = this.getPriceCriteria().clone();
                        for (let item of criteria.conditions) {
                            if (ibas.strings.equalsIgnoreCase(item.alias, app.conditions.materialprice.CONDITION_ALIAS_ITEMCODE)
                                || ibas.strings.equalsIgnoreCase(item.alias, app.conditions.materialprice.CONDITION_ALIAS_ITEMNAME)
                                || ibas.strings.equalsIgnoreCase(item.alias, app.conditions.materialprice.CONDITION_ALIAS_ITEMSIGN)) {
                                item.value = search;
                            }
                        }
                    } else {
                        criteria = new ibas.Criteria();
                        criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                    }
                    this.fireViewEvents(this.fetchPriceItemEvent, criteria);
                    this.lastPriceCriteria = criteria;
                    this.listPrices.setModel(null);
                }
                /** 保存数据 */
                savePrices(datas: bo.MaterialPrice[]): void {
                }
            }
        }
    }
}