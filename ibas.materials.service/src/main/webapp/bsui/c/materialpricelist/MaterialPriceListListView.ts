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
                fetchPriceItemEvent: Function;
                /** 选中价格清单事件 */
                selectedPriceListEvent: Function;
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
                    this.tablePriceList = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        mode: sap.m.ListMode.SingleSelectLeft,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
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
                                        bindingValue: "#{basedOnList} × {factor}",
                                        wrapping: false,
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
                            })
                        },
                        selectionChange(): void {
                            let priceList: bo.MaterialPriceList = that.tablePriceList.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
                            that.fireViewEvents(that.selectedPriceListEvent, priceList);
                            if (priceList?.objectKey < 0) {
                                let firstItem: sap.m.SegmentedButtonItem = that.segmentedButton.getItems()[0];
                                if (that.segmentedButton.getSelectedItem() !== firstItem.getId()) {
                                    that.segmentedButton.setSelectedItem(firstItem);
                                    (<any>firstItem).firePress();
                                }
                                that.segmentedButton.getItems()[1].setEnabled(false);
                            } else {
                                that.segmentedButton.getItems()[1].setEnabled(true);
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
                    this.tablePrices = new sap.extension.table.Table("", {
                        enableSelectAll: true,
                        visibleRowCount: sap.extension.table.visibleRowCount(15) - 1,
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: {
                            path: "/rows",
                            filters: [
                                new sap.ui.model.Filter("isDeleted", sap.ui.model.FilterOperator.NE, true)
                            ],
                        },
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                            highlight: {
                                parts: [
                                    {
                                        path: "isNew",
                                    }, {
                                        path: "isDirty",
                                    }, {
                                        path: "price",
                                    }
                                ],
                                formatter(isNew: boolean, isDirty: boolean, price: number): sap.ui.core.ValueState {
                                    if (isNew === true) {
                                        return sap.ui.core.ValueState.Warning;
                                    }
                                    if (!(ibas.numbers.valueOf(price) >= 0)) {
                                        return sap.ui.core.ValueState.Error;
                                    }
                                    return isDirty === true ? sap.ui.core.ValueState.Warning : sap.ui.core.ValueState.Information;
                                }
                            }
                        }),
                        fixedColumnCount: 2,
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemcode"),
                                template: new sap.extension.m.DataLink("", {
                                    objectCode: bo.BO_CODE_MATERIAL,
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "itemCode",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemname"),
                                width: "20rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemName",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "itemName",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_itemsign"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "itemSign",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "itemSign",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_uom"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "uom",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "uom",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialprice_price"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "price",
                                    type: new sap.extension.data.Price()
                                }),
                                sortProperty: "price",
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
                            if (data.isNew === true) {
                                let datas: bo.MaterialPrice[] = that.tablePrices.getModel().getData("rows");
                                if (datas instanceof Array && datas.length > 0) {
                                    let index: number = datas.lastIndexOf(data);
                                    for (let i: number = index; i >= 0; i--) {
                                        if (datas[i].isNew === true) {
                                            continue;
                                        }
                                        data = datas[i];
                                        break;
                                    }
                                } else {
                                    data = null;
                                }
                            }
                            if (ibas.objects.isNull(data)) {
                                let source: any = event.getSource();
                                if (source instanceof sap.extension.table.Table) {
                                    if (source.getBusy() === true) {
                                        source.setBusy(false);
                                    }
                                } return;
                            }
                            if (ibas.objects.isNull(that.lastPriceCriteria)) {
                                let source: any = event.getSource();
                                if (source instanceof sap.extension.table.Table) {
                                    if (source.getBusy() === true) {
                                        source.setBusy(false);
                                    }
                                } return;
                            }
                            let criteria: ibas.ICriteria = that.lastPriceCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            if (that.isBusy === true) {
                                let source: any = event.getSource();
                                if (source.getBusy() === true) {
                                    source.setBusy(false);
                                }
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchPriceItemEvent, criteria);
                        }
                    });
                    this.searchPrice = new sap.m.SearchField("", {
                        search(): void {
                            let criteria: ibas.ICriteria;
                            let condition: ibas.ICondition;

                            let search: string = that.searchPrice.getValue();
                            if (!ibas.strings.isEmpty(search)) {
                                criteria = that.getPriceCriteria().clone();
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
                            let group: string = that.groupComboBox.getBindingValue();
                            if (!ibas.strings.isEmpty(group)) {
                                let count: number = criteria.conditions.length;
                                for (let gItem of group.split(ibas.DATA_SEPARATOR)) {
                                    if (ibas.strings.isEmpty(gItem)) {
                                        continue;
                                    }
                                    condition = criteria.conditions.create();
                                    if (criteria.conditions.length > count + 1) {
                                        condition.relationship = ibas.emConditionRelationship.OR;
                                    }
                                    condition.alias = app.conditions.materialprice.CONDITION_ALIAS_GROUP;
                                    condition.operation = ibas.emConditionOperation.EQUAL;
                                    condition.value = gItem;
                                }
                                if (criteria.conditions.length > count + 2) {
                                    criteria.conditions[count].bracketOpen = 1;
                                    criteria.conditions[criteria.conditions.length - 1].bracketClose = 1;
                                }
                            }
                            that.fireViewEvents(that.fetchPriceItemEvent, criteria);
                            that.lastPriceCriteria = criteria;
                            that.tablePrices.setFirstVisibleRow(0);
                            that.tablePrices.setModel(null);
                        }
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            new sap.m.Page("", {
                                showHeader: false,
                                showFooter: false,
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
                                content: [
                                    this.tablePriceList
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    content: [
                                        this.segmentedButton = new sap.m.SegmentedButton("", {
                                            items: [
                                                new sap.m.SegmentedButtonItem("", {
                                                    icon: "sap-icon://show",
                                                    press(): void {
                                                        that.tablePrices.getColumns()[3].setTemplate(
                                                            new sap.extension.m.Text("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "uom",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            })
                                                        );
                                                        that.tablePrices.getColumns()[4].setTemplate(
                                                            new sap.extension.m.Text("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "price",
                                                                type: new sap.extension.data.Price()
                                                            })
                                                        );
                                                        that.tablePrices.getColumns()[5].setTemplate(
                                                            new sap.extension.m.Text("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "currency",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            })
                                                        );
                                                        (<sap.m.Toolbar>this.getParent().getParent()).getContent()[6].setVisible(false);
                                                        (<sap.m.Toolbar>this.getParent().getParent()).getContent()[7].setVisible(false);
                                                        (<sap.m.Page>that.tablePriceList.getParent()).setShowFooter(false);
                                                        (<sap.m.Page>that.tablePrices.getParent()).setShowFooter(false);
                                                    }
                                                }),
                                                new sap.m.SegmentedButtonItem("", {
                                                    visible: shell.app.privileges.canRun({
                                                        id: app.ELEMENT_MATERIAL_PRICE_LIST_EDIT.id,
                                                        name: app.ELEMENT_MATERIAL_PRICE_LIST_EDIT.name,
                                                    }),
                                                    icon: "sap-icon://edit",
                                                    press(): void {
                                                        that.tablePrices.getColumns()[3].setTemplate(
                                                            new sap.extension.m.Input("", {
                                                                showValueHelp: true,
                                                                valueHelpOnly: false,
                                                                valueHelpRequest(this: sap.m.Input): void {
                                                                    that.fireViewEvents(that.choosePriceItemUnitEvent, this.getBindingContext().getObject());
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "uom",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            })
                                                        );
                                                        that.tablePrices.getColumns()[4].setTemplate(
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "price",
                                                                type: new sap.extension.data.Price()
                                                            })
                                                        );
                                                        that.tablePrices.getColumns()[5].setTemplate(
                                                            new component.CurrencySelect("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "currency",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            })
                                                        );
                                                        (<sap.m.Toolbar>this.getParent().getParent()).getContent()[6].setVisible(true);
                                                        (<sap.m.Toolbar>this.getParent().getParent()).getContent()[7].setVisible(true);
                                                        (<sap.m.Page>that.tablePriceList.getParent()).setShowFooter(true);
                                                        (<sap.m.Page>that.tablePrices.getParent()).setShowFooter(true);
                                                    }
                                                }),
                                            ]
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        this.groupComboBox = new sap.extension.m.RepositoryMultiComboBox("", {
                                            width: "24rem",
                                            placeholder: ibas.i18n.prop("bo_materialgroup"),
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.MaterialGroup,
                                                key: bo.MaterialGroup.PROPERTY_CODE_NAME,
                                                text: bo.MaterialGroup.PROPERTY_NAME_NAME
                                            },
                                            selectionChange(): void {
                                                // 物料组改变，则清理上次查询
                                                that.lastPriceCriteria = null;
                                            }
                                        }),
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
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            visible: false,
                                            icon: "sap-icon://save",
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                let priceList: bo.MaterialPriceList = that.tablePriceList.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
                                                let datas: ibas.IList<bo.MaterialPrice> = new ibas.ArrayList<bo.MaterialPrice>();
                                                for (let item of ibas.arrays.create(that.tablePrices.getModel().getData<bo.MaterialPrice[]>("rows"))) {
                                                    if (!item.isDirty) {
                                                        continue;
                                                    }
                                                    if (item.price < 0) {
                                                        continue;
                                                    }
                                                    if (item.isNew) {
                                                        item.source = String(priceList?.objectKey);
                                                    }
                                                    datas.add(item);
                                                }
                                                that.fireViewEvents(that.savePriceItemEvent, datas);
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            visible: false,
                                            icon: "sap-icon://delete",
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                try {
                                                    let priceList: bo.MaterialPriceList = that.tablePriceList.getSelecteds<any>().firstOrDefault();
                                                    let datas: ibas.IList<bo.MaterialPrice> = new ibas.ArrayList<bo.MaterialPrice>();
                                                    for (let item of that.tablePrices.getSelecteds<bo.MaterialPrice>()) {
                                                        if (!ibas.strings.isWith(item.source, priceList?.objectKey + "-", undefined)) {
                                                            throw new Error(ibas.i18n.prop("materials_from_based_list_unsupported_operation", item.itemCode, item.uom));
                                                        }
                                                        item.delete();
                                                        if (!item.isDirty) {
                                                            continue;
                                                        }
                                                        if (item.isNew) {
                                                            continue;
                                                        }
                                                        datas.add(item);
                                                    }
                                                    if (datas.length > 0) {
                                                        that.fireViewEvents(that.savePriceItemEvent, datas);
                                                    }
                                                } catch (error) {
                                                    that.application.viewShower.messages({
                                                        title: that.title,
                                                        type: ibas.emMessageType.WARNING,
                                                        message: error.message
                                                    });
                                                }
                                            }
                                        })
                                    ]
                                }),
                                content: [
                                    this.tablePrices
                                ],
                                showFooter: false,
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
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
                                        new sap.m.ToolbarSeparator(),
                                        new sap.m.MenuButton("", {
                                            icon: "sap-icon://add",
                                            useDefaultActionOnly: true,
                                            type: sap.m.ButtonType.Transparent,
                                            buttonMode: sap.m.MenuButtonMode.Split,
                                            menuPosition: sap.ui.core.Popup.Dock.EndTop,
                                            text: ibas.i18n.prop(["shell_data_add", "bo_material"]),
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("materials_clone_selected"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.addPriceItemEvent, that.tablePrices.getSelecteds());
                                                        }
                                                    }),
                                                ]
                                            }),
                                            defaultAction(): void {
                                                that.fireViewEvents(that.addPriceItemEvent);
                                            }
                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.MenuButton("", {
                                            icon: "sap-icon://repost",
                                            text: ibas.i18n.prop("shell_batch"),
                                            type: sap.m.ButtonType.Transparent,
                                            menuPosition: sap.ui.core.Popup.Dock.EndTop,
                                            buttonMode: sap.m.MenuButtonMode.Regular,
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("materials_export_prices"),
                                                        icon: "sap-icon://action",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.exportPriceItemEvent);
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

                                                            ibas.servicesManager.runApplicationService<any, ibas.DataTable>({
                                                                proxy: new importexport.app.FileParsingServiceProxy({
                                                                    outType: "array"
                                                                }),
                                                                onCompleted(result: any): void {
                                                                    try {
                                                                        that.tablePrices.setModel(null);
                                                                        let datas: bo.MaterialPrice[] =
                                                                            sap.extension.tables.parseObject(that.tablePrices, result, bo.MaterialPrice);
                                                                        datas.forEach(c => c.source = String(priceList.objectKey));
                                                                        that.showPriceItems(datas);
                                                                    } catch (error) {
                                                                        that.application.viewShower.messages({
                                                                            title: that.application.description,
                                                                            message: error.message,
                                                                            type: ibas.emMessageType.ERROR
                                                                        });
                                                                    }
                                                                }
                                                            });
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
                                        new sap.m.Label("", {
                                            width: "auto",
                                            text: "+",
                                        }),
                                        new sap.m.Input("", {
                                            width: "6rem",
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
                                                        press(this: sap.m.MenuItem): void {
                                                            (<sap.m.Label>(<sap.m.Toolbar>this.getParent().getParent().getParent()).getContent()[7]).setText("+");
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("materials_adjust_price_less"),
                                                        icon: "sap-icon://less",
                                                        press(this: sap.m.MenuItem): void {
                                                            (<sap.m.Label>(<sap.m.Toolbar>this.getParent().getParent().getParent()).getContent()[7]).setText("-");
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("materials_adjust_price_multiply"),
                                                        icon: "sap-icon://decline",
                                                        press(): void {
                                                            (<sap.m.Label>(<sap.m.Toolbar>this.getParent().getParent().getParent()).getContent()[7]).setText("×");
                                                        }
                                                    }),
                                                ],
                                            }),
                                            useDefaultActionOnly: true,
                                            defaultAction(event: sap.ui.base.Event): void {
                                                let value: number = ibas.numbers.valueOf((<sap.m.Input>(<sap.m.Toolbar>this.getParent()).getContent()[8]).getValue());
                                                let operation: string | "+" | "-" | "×" = (<sap.m.Label>(<sap.m.Toolbar>this.getParent()).getContent()[7]).getText();
                                                let selecteds: bo.MaterialPrice[] = that.tablePrices.getSelecteds();
                                                if (selecteds.length === 0) {
                                                    selecteds = that.tablePrices.getModel().getData<bo.MaterialPrice[]>("rows");
                                                }
                                                for (let item of selecteds) {
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
                                }),
                            })
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
                    (<sap.m.Page>this.tablePriceList.getParent()).addHeaderContent(view);
                    (<sap.m.Page>this.tablePriceList.getParent()).setShowHeader(true);
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

                private tablePriceList: sap.extension.m.List;
                private searchPrice: sap.m.SearchField;
                private tablePrices: sap.extension.table.Table;
                private groupComboBox: sap.extension.m.MultiComboBox;
                private segmentedButton: sap.m.SegmentedButton;

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
                /** 显示数据 */
                showPriceItems(datas: bo.MaterialPrice[]): void {
                    if (ibas.objects.isNull(datas)) {
                        this.tablePrices.setModel(new sap.extension.model.JSONModel({ rows: [] }));
                    } else {
                        let model: sap.ui.model.Model = this.tablePrices.getModel();
                        if (model instanceof sap.extension.model.JSONModel) {
                            // 已绑定过数据
                            model.addData(datas);
                        } else {
                            // 未绑定过数据
                            this.tablePrices.setModel(new sap.extension.model.JSONModel({ rows: datas }).setForcedRefresh(true));
                        }
                        this.tablePrices.setBusy(false);
                    }
                }
                /** 保存数据 */
                savePrices(datas: bo.MaterialPrice[]): void {
                    let table: ibas.DataTable;
                    let column: ibas.DataTableColumn;

                    table = new ibas.DataTable();
                    table.name = bo.MaterialPrice.name;
                    table.description = ibas.i18n.prop(ibas.strings.format("bo_{0}", bo.MaterialPrice.name).toLowerCase());
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialPrice.PROPERTY_ITEMCODE_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialPrice.PROPERTY_ITEMNAME_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialPrice.PROPERTY_ITEMSIGN_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialPrice.PROPERTY_UOM_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialPrice.PROPERTY_PRICE_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialPrice.PROPERTY_CURRENCY_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);

                    for (let item of datas) {
                        let row: ibas.DataTableRow = new ibas.DataTableRow();
                        for (let col of table.columns) {
                            row.cells.add(item[col.name]);
                        }
                        table.rows.add(row);
                    }

                    ibas.servicesManager.runApplicationService({
                        proxy: new importexport.app.DataTableServiceProxy({
                            data: table
                        }),
                    });
                }
            }
        }
    }
}