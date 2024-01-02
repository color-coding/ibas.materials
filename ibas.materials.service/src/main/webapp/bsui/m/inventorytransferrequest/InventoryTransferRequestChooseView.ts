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
            /** 选择视图-库存转储申请 */
            export class InventoryTransferRequestChooseView extends ibas.BOChooseView implements app.IInventoryTransferRequestChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.InventoryTransferRequest;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.list = new sap.extension.m.List("", {
                        chooseType: this.chooseType,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.None,
                        items: {
                            path: "/rows",
                            template: new sap.extension.m.DataObjectListItem("", {
                                dataInfo: {
                                    code: bo.InventoryTransferRequest.BUSINESS_OBJECT_CODE,
                                },
                                title: "# {docEntry}",
                                number: {
                                    path: "documentTotal",
                                    type: new sap.extension.data.Sum(),
                                },
                                numberUnit: {
                                    path: "documentCurrency",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                                firstStatus: new sap.extension.m.ObjectDocumentCanceledStatus("", {
                                    canceledStatus: {
                                        path: "canceled",
                                        type: new sap.extension.data.YesNo(),
                                    },
                                    documentStatus: {
                                        path: "documentStatus",
                                        type: new sap.extension.data.DocumentStatus(),
                                    },
                                }),
                                secondStatus: new sap.extension.m.ObjectApprovalStatus("", {
                                    enumValue: {
                                        path: "approvalStatus",
                                        type: new sap.extension.data.ApprovalStatus(),
                                    },
                                    visible: {
                                        path: "approvalStatus",
                                        formatter(data: ibas.emApprovalStatus): boolean {
                                            return data === ibas.emApprovalStatus.UNAFFECTED ? false : true;
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_inventorytransferrequest_documentdate"),
                                        bindingValue: {
                                            path: "documentDate",
                                            type: new sap.extension.data.Date(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_inventorytransferrequest_deliverydate"),
                                        bindingValue: {
                                            path: "deliveryDate",
                                            type: new sap.extension.data.Date(),
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_inventorytransferrequest_fromwarehouse"),
                                        bindingValue: {
                                            path: "fromWarehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        repository: materials.bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: materials.bo.Warehouse,
                                            key: materials.bo.Warehouse.PROPERTY_CODE_NAME,
                                            text: materials.bo.Warehouse.PROPERTY_NAME_NAME
                                        },
                                    }),
                                    new sap.extension.m.PropertyObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_inventorytransferrequest_ordertype"),
                                        bindingValue: {
                                            path: "orderType",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        dataInfo: {
                                            code: bo.InventoryTransferRequest.BUSINESS_OBJECT_CODE,
                                        },
                                        propertyName: "orderType",
                                        visible: {
                                            path: "orderType",
                                            formatter(data: string): boolean {
                                                return ibas.strings.isEmpty(data) ? false : true;
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_inventorytransferrequest_reference1"),
                                        bindingValue: {
                                            path: "reference1",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        visible: {
                                            path: "reference1",
                                            formatter(data: string): boolean {
                                                return ibas.strings.isEmpty(data) ? false : true;
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_inventorytransferrequest_reference2"),
                                        bindingValue: {
                                            path: "reference2",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        visible: {
                                            path: "reference2",
                                            formatter(data: string): boolean {
                                                return ibas.strings.isEmpty(data) ? false : true;
                                            }
                                        }
                                    }),
                                ],
                                type: sap.m.ListType.Active,
                                press: function (oEvent: sap.ui.base.Event): void {
                                    that.fireViewEvents(that.chooseDataEvent, this.getBindingContext().getObject());
                                },
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
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.page = new sap.m.Page("", {
                                showHeader: false,
                                showSubHeader: false,
                                floatingFooter: true,
                                content: [
                                    this.list
                                ],
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Button("", {
                                            width: "50%",
                                            text: ibas.i18n.prop("shell_data_choose"),
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                that.fireViewEvents(that.chooseDataEvent, that.list.getSelecteds());
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            width: "50%",
                                            text: ibas.i18n.prop("shell_exit"),
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                that.fireViewEvents(that.closeEvent);
                                            }
                                        }),
                                    ]
                                })
                            })
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private page: sap.m.Page;
                private list: sap.extension.m.List;
                private pullToRefresh: sap.m.PullToRefresh;
                /** 嵌入下拉条 */
                embeddedPuller(view: any): void {
                    if (view instanceof sap.m.PullToRefresh) {
                        if (!ibas.objects.isNull(this.page)) {
                            this.page.insertContent(view, 0);
                            this.pullToRefresh = view;
                        }
                    }
                }
                /** 显示数据 */
                showData(datas: bo.InventoryTransferRequest[]): void {
                    if (!ibas.objects.isNull(this.pullToRefresh)) {
                        this.pullToRefresh.hide();
                    }
                    let model: sap.ui.model.Model = this.list.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.list.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.list.setBusy(true);
                        this.list.setModel(null);
                    }
                }
            }
        }
    }
}
