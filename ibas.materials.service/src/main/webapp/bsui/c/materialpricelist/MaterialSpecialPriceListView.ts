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
             * 列表视图-物料特殊价格
             */
            export class MaterialSpecialPriceListView extends ibas.BOQueryViewWithPanel implements app.IMaterialSpecialPriceListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialSpecialPrice;
                }
                /** 查看数据事件，参数：目标数据 */
                viewDataEvent: Function;
                /** 新建数据事件 */
                newDataEvent: Function;
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deleteDataEvent: Function;
                /** 查询业务伙伴事件 */
                fetchBusinessPartnerEvent: Function;
                /** 选中价格清单事件 */
                selectedBusinessPartnerEvent: Function;
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
                                label: ibas.i18n.prop("bo_materialspecialprice_itemcode"),
                                template: new sap.extension.m.DataLink("", {
                                    objectCode: bo.BO_CODE_MATERIAL,
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "itemCode",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_itemname"),
                                width: "20rem",
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Material,
                                        key: bo.Material.PROPERTY_CODE_NAME,
                                        text: bo.Material.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_uom"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "uom",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "uom",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_price"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "price",
                                    type: new sap.extension.data.Price()
                                }),
                                sortProperty: "price",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_currency"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "currency",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_validdate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "validDate",
                                    type: new sap.extension.data.Date()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_invaliddate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_materialspecialprice_remarks"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
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
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                let source: any = event.getSource();
                                if (source instanceof sap.extension.table.Table) {
                                    if (source.getBusy() === true) {
                                        source.setBusy(false);
                                    }
                                } return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    this.tablePartners = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        mode: sap.m.ListMode.SingleSelectLeft,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name}",
                                tooltip: "# {code} - {name}",
                                secondStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "",
                                        formatter(data: any): string {
                                            if (data instanceof businesspartner.bo.Supplier) {
                                                return ibas.i18n.prop("bo_materialspecialprice_supplier");
                                            }
                                            return ibas.i18n.prop("bo_materialspecialprice_customer");
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialspecialprice_code"),
                                        bindingValue: {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        active: true,
                                        press(this: sap.m.ObjectAttribute): void {
                                            ibas.servicesManager.runLinkService({
                                                boCode: this.getBindingContext().getObject().objectCode,
                                                linkValue: this.getBindingContext().getObject().code,
                                            });
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialspecialprice_businesspartnergroup"),
                                        bindingValue: {
                                            path: "group",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        repository: businesspartner.bo.BORepositoryBusinessPartner,
                                        dataInfo: {
                                            type: businesspartner.bo.BusinessPartnerGroup,
                                            key: businesspartner.bo.BusinessPartnerGroup.PROPERTY_CODE_NAME,
                                            text: businesspartner.bo.BusinessPartnerGroup.PROPERTY_NAME_NAME
                                        },
                                        visible: {
                                            path: "group",
                                            formatter(data: string): boolean {
                                                return ibas.strings.isEmpty(data) ? false : true;
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialspecialprice_channel"),
                                        bindingValue: {
                                            path: "channel",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        visible: {
                                            path: "channel",
                                            formatter(data: string): boolean {
                                                return ibas.strings.isEmpty(data) ? false : true;
                                            }
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialspecialprice_organizationalunit"),
                                        bindingValue: {
                                            path: "organizationalUnit",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                        dataInfo: {
                                            type: initialfantasy.bo.Organization,
                                            key: initialfantasy.bo.Organization.PROPERTY_CODE_NAME,
                                            text: initialfantasy.bo.Organization.PROPERTY_NAME_NAME
                                        },
                                        visible: {
                                            path: "organizationalUnit",
                                            formatter(data: string): boolean {
                                                return ibas.strings.isEmpty(data) ? false : true;
                                            }
                                        }
                                    }),
                                ],
                            })
                        },
                        selectionChange(): void {
                            that.fireViewEvents(that.selectedBusinessPartnerEvent, that.tablePartners.getSelecteds().firstOrDefault());
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastPartnerCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastPartnerCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchBusinessPartnerEvent, criteria);
                            that.lastPartnerCriteria = criteria;
                        }
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            new sap.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.SearchField("", {
                                            search(this: sap.m.SearchField): void {
                                                let search: string = this.getValue();
                                                if (!ibas.strings.isEmpty(search)) {
                                                    // 拆词，替换查询空格为%
                                                    search = ibas.strings.replace(search, " ", "%");
                                                }
                                                let condition: ibas.ICondition;
                                                let criteria: ibas.ICriteria = new ibas.Criteria();
                                                criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                                                criteria.businessObject = that.selectBpType.getSelectedKey();
                                                condition = criteria.conditions.create();
                                                condition.alias = businesspartner.bo.Customer.PROPERTY_ACTIVATED_NAME;
                                                condition.value = ibas.emYesNo.YES.toString();
                                                if (!ibas.strings.isEmpty(search)) {
                                                    condition = criteria.conditions.create();
                                                    condition.bracketOpen = 1;
                                                    condition.alias = businesspartner.bo.Customer.PROPERTY_CODE_NAME;
                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                    condition.value = search;
                                                    condition = criteria.conditions.create();
                                                    condition.alias = businesspartner.bo.Customer.PROPERTY_NAME_NAME;
                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                    condition.value = search;
                                                    condition.relationship = ibas.emConditionRelationship.OR;
                                                    condition.bracketClose = 1;
                                                }
                                                let sort: ibas.ISort = criteria.sorts.create();
                                                sort.alias = businesspartner.bo.Customer.PROPERTY_DOCENTRY_NAME;
                                                sort.sortType = ibas.emSortType.DESCENDING;

                                                that.partnerChanged = false;

                                                that.fireViewEvents(that.fetchBusinessPartnerEvent, criteria);

                                                that.lastPartnerCriteria = criteria;
                                                that.tablePrices.setFirstVisibleRow(0);
                                                that.tablePrices.setModel(null);
                                            }
                                        }),
                                        this.selectBpType = new sap.extension.m.Select("", {
                                            items: [
                                                new sap.extension.m.SelectItem("", {
                                                    key: ibas.config.applyVariables(businesspartner.bo.Customer.BUSINESS_OBJECT_CODE),
                                                    text: ibas.i18n.prop("bo_materialspecialprice_customer"),
                                                }),
                                                new sap.extension.m.SelectItem("", {
                                                    key: ibas.config.applyVariables(businesspartner.bo.Supplier.BUSINESS_OBJECT_CODE),
                                                    text: ibas.i18n.prop("bo_materialspecialprice_supplier"),
                                                })
                                            ],
                                            change(): void {
                                                that.partnerChanged = false;
                                            }
                                        })
                                    ]
                                }),
                                content: [
                                    this.tablePartners
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: true,
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
                                                                = that.tablePartners.getSelecteds<bo.MaterialPriceList>().firstOrDefault();
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
                                                                        let datas: bo.MaterialSpecialPrice[] =
                                                                            sap.extension.tables.parseObject(that.tablePrices, result, bo.MaterialSpecialPrice);
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
                        let that: this = this;
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                        view.insertContent(new sap.m.ToolbarSeparator(""), 0);
                        view.insertContent(new sap.m.SegmentedButton("", {
                            items: [
                                new sap.m.SegmentedButtonItem("", {
                                    icon: "sap-icon://show",
                                    press(): void {
                                        that.tablePrices.getColumns()[2].setTemplate(
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "uom",
                                                type: new sap.extension.data.Alphanumeric()
                                            })
                                        );
                                        that.tablePrices.getColumns()[3].setTemplate(
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "price",
                                                type: new sap.extension.data.Price()
                                            })
                                        );
                                        that.tablePrices.getColumns()[4].setTemplate(
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "currency",
                                                type: new sap.extension.data.Alphanumeric()
                                            })
                                        );
                                        that.tablePrices.getColumns()[5].setTemplate(
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "validDate",
                                                type: new sap.extension.data.Date()
                                            })
                                        );
                                        that.tablePrices.getColumns()[6].setTemplate(
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "invalidDate",
                                                type: new sap.extension.data.Date()
                                            })
                                        );
                                        that.tablePrices.getColumns()[7].setTemplate(
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "remarks",
                                                type: new sap.extension.data.Alphanumeric()
                                            })
                                        );
                                        let toolbar: sap.m.Toolbar = (<sap.m.Toolbar>this.getParent().getParent());
                                        toolbar.getContent()[toolbar.getContent().length - 1].setVisible(false);
                                        toolbar.getContent()[toolbar.getContent().length - 2].setVisible(false);
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
                                        that.tablePrices.getColumns()[2].setTemplate(
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
                                        that.tablePrices.getColumns()[3].setTemplate(
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "price",
                                                type: new sap.extension.data.Price()
                                            })
                                        );
                                        that.tablePrices.getColumns()[4].setTemplate(
                                            new sap.extension.m.CurrencySelect("", {
                                            }).bindProperty("bindingValue", {
                                                path: "currency",
                                                type: new sap.extension.data.Alphanumeric()
                                            })
                                        );
                                        that.tablePrices.getColumns()[5].setTemplate(
                                            new sap.extension.m.DatePicker("", {
                                            }).bindProperty("bindingValue", {
                                                path: "validDate",
                                                type: new sap.extension.data.Date()
                                            })
                                        );
                                        that.tablePrices.getColumns()[6].setTemplate(
                                            new sap.extension.m.DatePicker("", {
                                            }).bindProperty("bindingValue", {
                                                path: "invalidDate",
                                                type: new sap.extension.data.Date()
                                            })
                                        );
                                        that.tablePrices.getColumns()[7].setTemplate(
                                            new sap.extension.m.Input("", {
                                            }).bindProperty("bindingValue", {
                                                path: "remarks",
                                                type: new sap.extension.data.Alphanumeric()
                                            })
                                        );
                                        let toolbar: sap.m.Toolbar = (<sap.m.Toolbar>this.getParent().getParent());
                                        toolbar.getContent()[toolbar.getContent().length - 1].setVisible(true);
                                        toolbar.getContent()[toolbar.getContent().length - 2].setVisible(true);
                                        (<sap.m.Page>that.tablePrices.getParent()).setShowFooter(true);
                                    }
                                }),
                            ]
                        }), 0);
                        view.addContent(new sap.m.ToolbarSeparator(""));
                        view.addContent(new sap.m.Button("", {
                            visible: false,
                            icon: "sap-icon://save",
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                let datas: ibas.IList<bo.MaterialSpecialPrice> = new ibas.ArrayList<bo.MaterialSpecialPrice>();
                                for (let item of ibas.arrays.create(that.tablePrices.getModel().getData<bo.MaterialSpecialPrice[]>("rows"))) {
                                    if (!item.isDirty) {
                                        continue;
                                    }
                                    if (item.price < 0) {
                                        continue;
                                    }
                                    datas.add(item);
                                }
                                that.fireViewEvents(that.savePriceItemEvent, datas);
                            }
                        }));
                        view.addContent(new sap.m.Button("", {
                            visible: false,
                            icon: "sap-icon://delete",
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                try {
                                    let datas: ibas.IList<bo.MaterialSpecialPrice> = new ibas.ArrayList<bo.MaterialSpecialPrice>();
                                    for (let item of that.tablePrices.getSelecteds<bo.MaterialSpecialPrice>()) {
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
                        }));
                    }
                    (<sap.m.Page>this.tablePrices.getParent()).addHeaderContent(view);
                    (<sap.m.Page>this.tablePrices.getParent()).setShowHeader(true);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tablePrices.setBusy(true);
                        this.tablePrices.setModel(null);
                    }
                }

                private tablePartners: sap.extension.m.List;
                private tablePrices: sap.extension.table.Table;
                private selectBpType: sap.extension.m.Select;

                /** 上一次使用的价格查询 */
                private lastPartnerCriteria: ibas.ICriteria;
                private partnerChanged: boolean = false;

                /** 显示数据 */
                showBusinessPartners(datas: businesspartner.bo.Customer[] | businesspartner.bo.Supplier[]): void {
                    let model: sap.ui.model.Model = this.tablePartners.getModel();
                    if (model instanceof sap.extension.model.JSONModel && this.partnerChanged === true) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tablePartners.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        this.partnerChanged = true;
                    }
                    this.tablePartners.setBusy(false);
                }
                /** 显示数据 */
                showPriceItems(datas: bo.MaterialSpecialPrice[]): void {
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
                savePrices(datas: bo.MaterialSpecialPrice[]): void {
                    let table: ibas.DataTable;
                    let column: ibas.DataTableColumn;

                    table = new ibas.DataTable();
                    table.name = bo.MaterialSpecialPrice.name;
                    table.description = ibas.i18n.prop(ibas.strings.format("bo_{0}", bo.MaterialSpecialPrice.name).toLowerCase());
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_ITEMCODE_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = "ItemName";
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_UOM_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_PRICE_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_CURRENCY_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_VALIDDATE_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_INVALIDDATE_NAME;
                    column.description = ibas.i18n.prop(ibas.strings.format("bo_{0}_{1}", table.name, column.name).toLowerCase());
                    table.columns.add(column);
                    column = new ibas.DataTableColumn();
                    column.name = bo.MaterialSpecialPrice.PROPERTY_REMARKS_NAME;
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