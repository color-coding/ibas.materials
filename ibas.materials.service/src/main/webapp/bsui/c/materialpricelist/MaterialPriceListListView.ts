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
                /** 查询价格事件 */
                fetchPriceEvent: Function;
                /** 保存价格项目事件 */
                savePriceListItemEvent: Function;
                /** 导出价格事件 */
                exportPriceEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tablePriceList = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "# {objectKey}",
                                tooltip: "{name}",
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
                                                strictParsing: true,
                                            })
                                        }
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_invaliddate"),
                                        text: {
                                            path: "invalidDate",
                                            type: new sap.ui.model.type.Date("", {
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
                                        }
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
                                        that.fireViewEvents(that.deleteDataEvent, that.tablePriceList.getSelecteds());
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent, that.tablePriceList.getSelecteds().firstOrDefault());
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
                    this.tablePrices = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15) - 1,
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemcode"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemname"),
                                width: "20rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemName",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemsign"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemSign",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_price"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "price",
                                    type: new sap.extension.data.Price()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_currency"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "currency",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastPriceCriteria)) {
                                let source: any = event.getSource();
                                if (source instanceof sap.extension.table.Table) {
                                    if (source.getBusy() === true) {
                                        source.setBusy(false);
                                    }
                                }
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
                            let priceList: bo.MaterialPriceList = that.tablePriceList.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
                            if (ibas.objects.isNull(priceList)) {
                                that.application.viewShower.messages({
                                    title: that.application.description,
                                    message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialpricelist")),
                                    type: ibas.emMessageType.WARNING
                                });
                                return;
                            }
                            let criteria: ibas.ICriteria;
                            let condition: ibas.ICondition;
                            let search: string = that.searchPrice.getValue();
                            if (!ibas.strings.isEmpty(search)) {
                                criteria = that.getPriceCriteria().clone();
                                for (let item of criteria.conditions) {
                                    if (ibas.strings.equalsIgnoreCase(item.alias, app.conditions.materialprice.CONDITION_ALIAS_ITEMCODE)
                                        || ibas.strings.equalsIgnoreCase(item.alias, app.conditions.materialprice.CONDITION_ALIAS_ITEMNAME)) {
                                        item.value = search;
                                    }
                                }
                            } else {
                                criteria = new ibas.Criteria();
                                criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                            }
                            condition = criteria.conditions.create();
                            if (criteria.conditions.length > 0) {
                                condition.relationship = ibas.emConditionRelationship.AND;
                            }
                            condition.alias = app.conditions.materialprice.CONDITION_ALIAS_PRICELIST;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = priceList.objectKey.toString();
                            that.fireViewEvents(that.fetchPriceEvent, criteria);
                            that.lastPriceCriteria = criteria;
                            that.tablePrices.setFirstVisibleRow(0);
                            that.tablePrices.setModel(null);
                        }
                    });
                    this.pagePrices = new sap.extension.m.Page("", {
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
                                                    new ibas.KeyText(
                                                        bo.MaterialPrice.PROPERTY_ITEMSIGN_NAME,
                                                        ibas.i18n.prop(
                                                            ibas.strings.format("bo_{0}_{1}",
                                                                bo.MaterialPrice.name,
                                                                bo.MaterialPrice.PROPERTY_ITEMSIGN_NAME).toLowerCase()
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
                                                that.tablePrices.getColumns()[3].setTemplate(
                                                    new sap.extension.m.Text("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "price",
                                                        type: new sap.extension.data.Price()
                                                    })
                                                );
                                                that.pagePrices.destroyFooter();
                                            }
                                        }),
                                        new sap.m.SegmentedButtonItem("", {
                                            icon: "sap-icon://edit",
                                            press(): void {
                                                that.tablePrices.getColumns()[3].setTemplate(
                                                    new sap.extension.m.Input("", {
                                                        type: sap.m.InputType.Number,
                                                        change(event: any): void {
                                                            this.getParent().getParent().addSelectionInterval(this.getParent().getIndex(), this.getParent().getIndex());
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "price",
                                                        type: new sap.extension.data.Price()
                                                    })
                                                );
                                                let input: sap.m.Input;
                                                let label: sap.m.Label;
                                                that.pagePrices.setFooter(new sap.m.Toolbar("", {
                                                    content: [
                                                        new sap.m.MenuButton("", {
                                                            text: ibas.i18n.prop("shell_data_choose"),
                                                            icon: "sap-icon://bullet-text",
                                                            type: sap.m.ButtonType.Transparent,
                                                            menu: new sap.m.Menu("", {
                                                                items: [
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("shell_all"),
                                                                        icon: "sap-icon://multiselect-all",
                                                                        press: function (): void {
                                                                            let model: any = that.tablePrices.getModel();
                                                                            if (model instanceof sap.extension.model.JSONModel) {
                                                                                for (let index: number = 0; index < model.size(); index++) {
                                                                                    if (!that.tablePrices.isIndexSelected(index)) {
                                                                                        that.tablePrices.addSelectionInterval(index, index);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }),
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("shell_reverse"),
                                                                        icon: "sap-icon://multi-select",
                                                                        press: function (): void {
                                                                            let model: any = that.tablePrices.getModel();
                                                                            if (model instanceof sap.extension.model.JSONModel) {
                                                                                let selects: ibas.IList<number> = ibas.arrays.create(that.tablePrices.getSelectedIndices());
                                                                                that.tablePrices.clearSelection();
                                                                                for (let index: number = 0; index < model.size(); index++) {
                                                                                    if (!selects.contain(index)) {
                                                                                        that.tablePrices.addSelectionInterval(index, index);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }),
                                                                ],
                                                            })
                                                        }),
                                                        new sap.m.ToolbarSpacer(""),
                                                        new sap.m.MenuButton("", {
                                                            text: ibas.i18n.prop("shell_batch"),
                                                            type: sap.m.ButtonType.Transparent,
                                                            menuPosition: sap.ui.core.Popup.Dock.BeginTop,
                                                            buttonMode: sap.m.MenuButtonMode.Regular,
                                                            menu: new sap.m.Menu("", {
                                                                items: [
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("materials_export_prices"),
                                                                        icon: "sap-icon://action",
                                                                        press: function (): void {
                                                                            let priceList: bo.MaterialPriceList
                                                                                = that.tablePriceList.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
                                                                            if (ibas.objects.isNull(priceList)) {
                                                                                that.application.viewShower.messages({
                                                                                    title: that.application.description,
                                                                                    message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialpricelist")),
                                                                                    type: ibas.emMessageType.WARNING
                                                                                }); return;
                                                                            }
                                                                            let criteria: ibas.ICriteria = new ibas.Criteria();
                                                                            let condition: ibas.ICondition = criteria.conditions.create();
                                                                            condition.alias = app.conditions.materialprice.CONDITION_ALIAS_PRICELIST;
                                                                            condition.operation = ibas.emConditionOperation.EQUAL;
                                                                            condition.value = priceList.objectKey.toString();
                                                                            that.fireViewEvents(that.exportPriceEvent, criteria);
                                                                        }
                                                                    }),
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("materials_import_prices"),
                                                                        icon: "sap-icon://cause",
                                                                        press: function (event: sap.ui.base.Event): void {
                                                                            let priceList: bo.MaterialPriceList
                                                                                = that.tablePriceList.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
                                                                            if (ibas.objects.isNull(priceList)) {
                                                                                that.application.viewShower.messages({
                                                                                    title: that.application.description,
                                                                                    message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialpricelist")),
                                                                                    type: ibas.emMessageType.WARNING
                                                                                }); return;
                                                                            }
                                                                            ibas.files.open((files) => {
                                                                                let require: Require = ibas.requires.create({
                                                                                    context: ibas.requires.naming(materials.CONSOLE_NAME),
                                                                                });
                                                                                require([
                                                                                    "3rdparty/papaparse/papaparse.min"
                                                                                ], function (Papa: any): void {
                                                                                    Papa.parse(files.firstOrDefault(), {
                                                                                        complete(results: Papa.ParseResult, file?: File): void {
                                                                                            that.tablePrices.setModel(null);
                                                                                            let datas: bo.MaterialPrice[] = sap.extension.tables.parseObject(
                                                                                                that.tablePrices, results.data, bo.MaterialPrice);
                                                                                            datas.forEach(c => c.source = String(priceList.objectKey));
                                                                                            that.showPrices(datas);
                                                                                        },
                                                                                        error(error: Papa.ParseError, file?: File): void {
                                                                                            that.application.viewShower.messages({
                                                                                                title: that.application.description,
                                                                                                message: error.message,
                                                                                                type: ibas.emMessageType.ERROR
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }, function (error: RequireError): void {
                                                                                    that.application.viewShower.messages({
                                                                                        title: that.application.description,
                                                                                        message: error.message,
                                                                                        type: ibas.emMessageType.ERROR
                                                                                    });
                                                                                });
                                                                            }, { accept: ".csv" });
                                                                        }
                                                                    }),
                                                                ],
                                                            }),
                                                        }),
                                                        new sap.m.ToolbarSeparator(""),
                                                        new sap.m.Label("", {
                                                            width: "auto",
                                                            text: ibas.i18n.prop("bo_materialprice_price"),
                                                        }),
                                                        label = new sap.m.Label("", {
                                                            width: "auto",
                                                            text: "+",
                                                        }),
                                                        input = new sap.m.Input("", {
                                                            width: "6rem",
                                                            type: sap.m.InputType.Number,
                                                            textAlign: sap.ui.core.TextAlign.Right,
                                                            valueState: sap.ui.core.ValueState.Success,
                                                            value: "0",
                                                        }),
                                                        new sap.m.MenuButton("", {
                                                            text: ibas.i18n.prop("shell_apply"),
                                                            type: sap.m.ButtonType.Accept,
                                                            menuPosition: sap.ui.core.Popup.Dock.BeginTop,
                                                            buttonMode: sap.m.MenuButtonMode.Split,
                                                            width: "auto",
                                                            menu: new sap.m.Menu("", {
                                                                items: [
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("materials_adjust_price_add"),
                                                                        icon: "sap-icon://add",
                                                                        press: function (): void {
                                                                            label.setText("+");
                                                                        }
                                                                    }),
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("materials_adjust_price_less"),
                                                                        icon: "sap-icon://less",
                                                                        press: function (): void {
                                                                            label.setText("-");
                                                                        }
                                                                    }),
                                                                    new sap.m.MenuItem("", {
                                                                        text: ibas.i18n.prop("materials_adjust_price_multiply"),
                                                                        icon: "sap-icon://decline",
                                                                        press: function (): void {
                                                                            label.setText("×");
                                                                        }
                                                                    }),
                                                                ],
                                                            }),
                                                            useDefaultActionOnly: true,
                                                            defaultAction(event: sap.ui.base.Event): void {
                                                                let value: number = ibas.numbers.valueOf(input.getValue());
                                                                let operation: string | "+" | "-" | "×" = label.getText();
                                                                for (let item of that.tablePrices.getSelecteds<bo.MaterialPrice>()) {
                                                                    if (operation === "-") {
                                                                        item.price = item.price - value;
                                                                    } else if (operation === "×") {
                                                                        item.price = item.price * value;
                                                                    } else {
                                                                        item.price = item.price + value;
                                                                    }
                                                                }
                                                                that.tablePrices.getModel().updateBindings(false);
                                                            },
                                                        }),
                                                    ]
                                                }));
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
                                        for (let item of that.tablePrices.getSelecteds<bo.MaterialPrice>()) {
                                            if (!item.isDirty) {
                                                continue;
                                            }
                                            // 先删除
                                            let data: bo.MaterialPriceItem = new bo.MaterialPriceItem();
                                            data.objectKey = Number(item.source);
                                            data.itemCode = item.itemCode;
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
                                        for (let item of that.tablePrices.getSelecteds<bo.MaterialPrice>()) {
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
                        ],
                        floatingFooter: true,
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
                private tablePriceList: sap.extension.m.List;
                /** 显示数据 */
                showPriceList(datas: bo.MaterialPriceList[]): void {
                    let model: sap.ui.model.Model = this.tablePriceList.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tablePriceList.setModel(new sap.extension.model.JSONModel({ rows: datas }));
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
                private tablePrices: sap.extension.table.Table;
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
                showPrices(datas: bo.MaterialPrice[]): void {
                    let model: sap.ui.model.Model = this.tablePrices.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tablePrices.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tablePrices.setBusy(false);
                }
                /** 保存数据 */
                savePrices(datas: bo.MaterialPrice[]): void {
                    let builder: StringBuilder = new StringBuilder();
                    builder.map(undefined, "");
                    builder.map(null, "");
                    builder.append(
                        ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", bo.MaterialPrice.name.toLowerCase(), bo.MaterialPrice.PROPERTY_ITEMCODE_NAME.toLowerCase())));
                    builder.separator();
                    builder.append(
                        ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", bo.MaterialPrice.name.toLowerCase(), bo.MaterialPrice.PROPERTY_ITEMNAME_NAME.toLowerCase())));
                    builder.separator();
                    builder.append(
                        ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", bo.MaterialPrice.name.toLowerCase(), bo.MaterialPrice.PROPERTY_ITEMSIGN_NAME.toLowerCase())));
                    builder.separator();
                    builder.append(
                        ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", bo.MaterialPrice.name.toLowerCase(), bo.MaterialPrice.PROPERTY_PRICE_NAME.toLowerCase())));
                    builder.separator();
                    builder.append(
                        ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", bo.MaterialPrice.name.toLowerCase(), bo.MaterialPrice.PROPERTY_CURRENCY_NAME.toLowerCase())));
                    builder.newLine();
                    for (let item of datas) {
                        builder.append(item.itemCode);
                        builder.separator();
                        builder.append(item.itemName);
                        builder.separator();
                        builder.append(item.itemSign);
                        builder.separator();
                        builder.append(item.price);
                        builder.separator();
                        builder.append(item.currency);
                        builder.newLine();
                    }
                    jQuery.sap.require("sap.ui.core.util.File");
                    let fileName: string = ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmm");
                    let priceList: bo.MaterialPriceList = this.tablePriceList.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
                    if (!ibas.objects.isNull(priceList)) {
                        fileName = ibas.strings.format("{0}_{1}_{2}", priceList.objectKey, priceList.name, fileName);
                    }
                    sap.ui.core.util.File.save(builder.toString(), fileName, "csv", "text/plain", "utf-8");
                }
            }
            class StringBuilder extends ibas.StringBuilder {
                static NEW_LINE: string = function (): string {
                    if (navigator.appVersion) {
                        if (navigator.appVersion.indexOf("Windows") > 0) {
                            return "\r\n";
                        } else if (navigator.appVersion.indexOf("Mac OS") > 0) {
                            return "\r";
                        }
                        return "\n";
                    }
                }();
                static SEPARATOR: string = ",";
                /**
                 * 添加字符
                 */
                append(value: any): void {
                    if (typeof value === "string") {
                        if (value.indexOf("\"") > 0) {
                            value = value.replace("\"", "\"\"");
                        }
                        value = "\"" + value + "\"";
                    }
                    super.append(value);
                }
                /**
                 * 新行
                 */
                newLine(): void {
                    super.append(StringBuilder.NEW_LINE);
                }
                /**
                 * 分隔
                 */
                separator(): void {
                    super.append(StringBuilder.SEPARATOR);
                }
            }
        }
    }
}