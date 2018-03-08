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
                /** 调用服务事件，参数1 IServicesShower显示服务者 */
                callServicesEvent: Function;
                /** 查询价格事件 */
                fetchPriceEvent: Function;
                /** 保存价格项目事件 */
                savePriceListItemEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tablePriceList = new sap.m.List("", {
                        inset: false,
                        growing: true,
                        growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        growingScrollToLoad: true,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "# {objectKey}",
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: "{currency}"
                                }),
                                secondStatus: new sap.m.ObjectStatus("", {
                                    text: ibas.i18n.prop("bo_materialpricelist_factor") + ": " + "{factor}"
                                }),
                                attributes: [
                                    new sap.m.ObjectAttribute("", {
                                        text: "{name}"
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_basedonlist"),
                                        text: "# {basedOnList}"
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_validdate"),
                                        text: {
                                            path: "validDate",
                                            type: new sap.ui.model.type.Date("", {
                                                pattern: "yyyy-MM-dd",
                                            })
                                        }
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_invaliddate"),
                                        text: {
                                            path: "invalidDate",
                                            type: new sap.ui.model.type.Date("", {
                                                pattern: "yyyy-MM-dd",
                                            })
                                        }
                                    }),
                                ]
                            })
                        }
                    });
                    // 添加列表自动查询事件
                    openui5.utils.triggerNextResults({
                        listener: this.tablePriceList,
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
                    this.pagePriceList = new sap.m.Page("", {
                        showHeader: false,
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.MaterialPriceList>(that.tablePriceList)
                                        );
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.MaterialPriceList>(that.tablePriceList).firstOrDefault()
                                        );
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://create",
                                    press: function (): void {
                                        that.fireViewEvents(that.newDataEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [this.tablePriceList]
                    });
                    this.tablePrices = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemcode"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "itemCode",
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemname"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "itemName",
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
                            }),
                        ]
                    });
                    // 添加列表自动查询事件
                    openui5.utils.triggerNextResults({
                        listener: this.tablePrices,
                        next(data: any): void {
                            if (ibas.objects.isNull(that.lastPriceCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastPriceCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchPriceEvent, criteria);
                        }
                    });
                    this.searchPrice = new sap.m.SearchField("", {
                        search(): void {
                            let priceList: bo.MaterialPriceList =
                                openui5.utils.getSelecteds<bo.MaterialPriceList>(that.tablePriceList).firstOrDefault();
                            if (ibas.objects.isNull(priceList)) {
                                that.application.viewShower.messages({
                                    title: that.application.description,
                                    message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialpricelist")),
                                    type: ibas.emMessageType.WARNING
                                });
                                return;
                            }
                            let condition: ibas.ICondition;
                            let criteria: ibas.ICriteria = that.getPriceCriteria().clone();
                            let search: string = that.searchPrice.getValue();
                            if (!ibas.strings.isEmpty(search)) {
                                for (let item of criteria.conditions) {
                                    if (ibas.strings.equalsIgnoreCase(item.alias, app.conditions.materialprice.CONDITION_ALIAS_ITEMCODE)
                                        || ibas.strings.equalsIgnoreCase(item.alias,app. conditions.materialprice.CONDITION_ALIAS_ITEMNAME)) {
                                        item.value = search;
                                    }
                                }
                            }
                            condition = criteria.conditions.create();
                            condition.relationship = ibas.emConditionRelationship.AND;
                            condition.alias =app. conditions.materialprice.CONDITION_ALIAS_PRICELIST;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = priceList.objectKey.toLocaleString();
                            that.fireViewEvents(that.fetchPriceEvent, criteria);
                            that.lastPriceCriteria = criteria;
                            that.tablePrices.setFirstVisibleRow(0);
                            that.tablePrices.setModel(null);
                        }
                    });
                    this.pagePrices = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                this.searchPrice,
                                new sap.m.Button("", {
                                    icon: "sap-icon://filter",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        ibas.servicesManager.runApplicationService<ibas.ICriteriaEditorServiceContract, ibas.ICriteria>({
                                            proxy: new ibas.CriteriaEditorServiceProxy({
                                                target: bo.MaterialPrice,
                                                criteria: that.getPriceCriteria(),
                                                aliases: [
                                                    new ibas.KeyText(
                                                        bo.MaterialPrice.PROPERTY_ITEMCODE_NAME,
                                                        ibas.i18n.prop(
                                                            ibas.strings.format("bo_{0}_{1}",
                                                                bo.MaterialPrice.name,
                                                                bo.MaterialPrice.PROPERTY_ITEMCODE_NAME).toLowerCase()
                                                        )
                                                    ),
                                                    new ibas.KeyText(
                                                        bo.MaterialPrice.PROPERTY_ITEMNAME_NAME,
                                                        ibas.i18n.prop(
                                                            ibas.strings.format("bo_{0}_{1}",
                                                                bo.MaterialPrice.name,
                                                                bo.MaterialPrice.PROPERTY_ITEMNAME_NAME).toLowerCase()
                                                        )
                                                    ),
                                                ]
                                            }),
                                            onCompleted(result: ibas.ICriteria): void {
                                                that.priceCriteria = result;
                                            }
                                        });
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.SegmentedButton("", {
                                    items: [
                                        new sap.m.SegmentedButtonItem("", {
                                            icon: "sap-icon://show",
                                            press(): void {
                                                that.tablePrices.getColumns()[2].setTemplate(
                                                    new sap.m.Text("", {
                                                        wrapping: false,
                                                        text: {
                                                            path: "price"
                                                        },
                                                    })
                                                );
                                            }
                                        }),
                                        new sap.m.SegmentedButtonItem("", {
                                            icon: "sap-icon://edit",
                                            press(): void {
                                                that.tablePrices.getColumns()[2].setTemplate(
                                                    new sap.m.Input("", {
                                                        type: sap.m.InputType.Number,
                                                        value: {
                                                            path: "price"
                                                        },
                                                    })
                                                );
                                            }
                                        }),
                                    ]
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://save",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        let datas: ibas.IList<bo.MaterialPriceItem> = new ibas.ArrayList<bo.MaterialPriceItem>();
                                        for (let item of openui5.utils.getSelecteds<bo.MaterialPrice>(that.tablePrices)) {
                                            if (!item.isDirty) {
                                                continue;
                                            }
                                            // 先删除
                                            let data: bo.MaterialPriceItem = new bo.MaterialPriceItem();
                                            data.objectKey = Number(item.source);
                                            data.itemCode = item.itemCode;
                                            data.price = item.price;
                                            data.delete();
                                            datas.add(data);
                                            // 再添加
                                            data = new bo.MaterialPriceItem();
                                            data.objectKey = Number(item.source);
                                            data.itemCode = item.itemCode;
                                            data.price = item.price;
                                            datas.add(data);
                                        }
                                        that.fireViewEvents(that.savePriceListItemEvent, datas);
                                    }
                                }),
                                new sap.m.Button("", {
                                    icon: "sap-icon://delete",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        let datas: ibas.IList<bo.MaterialPriceItem> = new ibas.ArrayList<bo.MaterialPriceItem>();
                                        for (let item of openui5.utils.getSelecteds<bo.MaterialPrice>(that.tablePrices)) {
                                            if (!item.isDirty) {
                                                continue;
                                            }
                                            let data: bo.MaterialPriceItem = new bo.MaterialPriceItem();
                                            data.objectKey = Number(item.source);
                                            data.itemCode = item.itemCode;
                                            data.price = item.price;
                                            data.delete();
                                            datas.add(data);
                                        }
                                        that.fireViewEvents(that.savePriceListItemEvent, datas);
                                    }
                                })
                            ]
                        }),
                        content: [
                            this.tablePrices
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pagePriceList,
                        ],
                        detailPages: [
                            this.pagePrices
                        ],
                    });
                }
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setHeight("100%");
                    }
                    this.pagePriceList.addHeaderContent(view);
                    this.pagePriceList.setShowHeader(true);
                }
                private pagePriceList: sap.m.Page;
                private tablePriceList: sap.m.List;
                /** 显示数据 */
                showPriceList(datas: bo.MaterialPriceList[]): void {
                    let done: boolean = false;
                    let model: sap.ui.model.Model = this.tablePriceList.getModel(undefined);
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
                        this.tablePriceList.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    }
                    this.tablePriceList.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tablePriceList.setBusy(true);
                        this.tablePriceList.setModel(null);
                    }
                }
                private pagePrices: sap.m.Page;
                private searchPrice: sap.m.SearchField;
                private tablePrices: sap.ui.table.Table;
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
                    condition.bracketClose = 1;
                    condition.alias =app. conditions.materialprice.CONDITION_ALIAS_ITEMNAME;
                    condition.operation = ibas.emConditionOperation.CONTAIN;
                    condition.value = "";
                    condition.relationship = ibas.emConditionRelationship.OR;
                    this.priceCriteria = criteria;
                    return this.priceCriteria;
                }
                /** 显示数据 */
                showPrices(datas: bo.MaterialPrice[]): void {
                    let done: boolean = false;
                    let model: sap.ui.model.Model = this.tablePrices.getModel(undefined);
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
                        this.tablePrices.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    }
                    this.tablePrices.setBusy(false);
                }
            }
        }
    }
}