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
            /** 列表视图-业务伙伴物料目录 */
            export class BusinessPartnerMaterialCatalogListView extends ibas.View implements app.IBusinessPartnerMaterialCatalogListView {
                /** 保存数据事件 */
                saveDataEvent: Function;
                /** 检索数据事件 */
                fetchDataEvent: Function;
                /** 添加数据事件 */
                addDataEvent: Function;
                /** 移除数据事件 */
                removeDataEvent: Function;
                /** 检索客户事件 */
                fetchCustomerEvent: Function;
                /** 检索供应商事件 */
                fetchSupplierEvent: Function;
                /** 检索物料事件 */
                fetchMaterialEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableCatalogs = new sap.extension.table.DataTable("", {
                        enableSelectAll: true,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        rows: {
                            path: "/rows",
                            filters: [
                                new sap.ui.model.Filter("isSavable", sap.ui.model.FilterOperator.EQ, true)
                            ]
                        },
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            parts: [
                                {
                                    path: "isDirty"
                                },
                                {
                                    path: "isDeleted"
                                }
                            ],
                            formatter(isDirty: boolean, isDeleted: boolean): sap.ui.core.MessageType {
                                if (isDeleted === true) {
                                    return sap.ui.core.MessageType.Error;
                                }
                                if (isDirty === true) {
                                    return sap.ui.core.MessageType.Warning;
                                }
                                return sap.ui.core.MessageType.Information;
                            }
                        }),
                        columns: [
                            this.columnPartnerCode = new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop(["bo_businesspartnermaterialcatalog_customer", "bo_businesspartnermaterialcatalog_code"]),
                                template: new sap.extension.m.Link("", {
                                    press(this: sap.extension.m.Link): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (data instanceof bo.BusinessPartnerMaterialCatalog && !ibas.strings.isEmpty(data.businessPartnerCode)) {
                                            if (data.businessPartnerType === businesspartner.bo.emBusinessPartnerType.CUSTOMER) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: businesspartner.bo.Customer.BUSINESS_OBJECT_CODE,
                                                    linkValue: data.businessPartnerCode
                                                });
                                            }
                                        } else if (data instanceof bo.BusinessPartnerMaterialCatalog && !ibas.strings.isEmpty(data.businessPartnerCode)) {
                                            if (data.businessPartnerType === businesspartner.bo.emBusinessPartnerType.SUPPLIER) {
                                                ibas.servicesManager.runLinkService({
                                                    boCode: businesspartner.bo.Supplier.BUSINESS_OBJECT_CODE,
                                                    linkValue: data.businessPartnerCode
                                                });
                                            }
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "businessPartnerCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            this.columnPartnerName = new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop(["bo_businesspartnermaterialcatalog_customer", "bo_businesspartnermaterialcatalog_name"]),
                                template: new component.BusinessPartnerText("", {
                                    typeProperty: "businessPartnerType",
                                }).bindProperty("bindingValue", {
                                    path: "businessPartnerCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "14rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_businesspartnermaterialcatalog_itemcode"),
                                template: new sap.extension.m.DataLink("", {
                                    objectCode: bo.Material.BUSINESS_OBJECT_CODE,
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_businesspartnermaterialcatalog_itemname"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Material,
                                        key: bo.Material.PROPERTY_CODE_NAME,
                                        text: bo.Material.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "itemCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "14rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_businesspartnermaterialcatalog_catalogcode"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "catalogCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_businesspartnermaterialcatalog_catalogname"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "catalogName",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "14rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_businesspartnermaterialcatalog_remarks"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "16rem",
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCatalogCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCatalogCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            new sap.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    content: [
                                        this.buttonTab = new sap.m.SegmentedButton("", {
                                            items: [
                                                new sap.m.SegmentedButtonItem("", {
                                                    key: "CUSTOMER",
                                                    icon: "sap-icon://customer",
                                                    text: ibas.i18n.prop("bo_businesspartnermaterialcatalog_customer"),
                                                }),
                                                new sap.m.SegmentedButtonItem("", {
                                                    key: "SUPPLIER",
                                                    icon: "sap-icon://supplier",
                                                    text: ibas.i18n.prop("bo_businesspartnermaterialcatalog_supplier"),
                                                }),
                                                new sap.m.SegmentedButtonItem("", {
                                                    key: "MATERIAL",
                                                    icon: "sap-icon://product",
                                                    text: ibas.i18n.prop("bo_businesspartnermaterialcatalog_material"),
                                                }),
                                            ],
                                            selectedKey: "CUSTOMER",
                                            selectionChange(event: sap.ui.base.Event): void {
                                                let item: any = event.getParameter("item");
                                                let index: number = that.buttonTab.getItems().indexOf(item);
                                                if (index >= 0) {
                                                    that.container.to(that.container.getPages()[index]);
                                                    that.tableCatalogs.setModel(undefined);
                                                    if (item.getKey() === "CUSTOMER" || item.getKey() === "SUPPLIER") {
                                                        that.toolbar.getContent()[0].setVisible(false);
                                                        that.toolbar.getContent()[1].setVisible(true);
                                                    } else if (item.getKey() === "MATERIAL") {
                                                        that.toolbar.getContent()[0].setVisible(true);
                                                        that.toolbar.getContent()[1].setVisible(false);
                                                    }
                                                }
                                            }
                                        }),
                                    ]
                                }),
                                content: [
                                    this.container = new sap.m.NavContainer("", {
                                        height: "100%",
                                        autoFocus: false,
                                        defaultTransitionName: "baseSlide",
                                        pages: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                subHeader: new sap.m.Toolbar("", {
                                                    style: sap.m.ToolbarStyle.Clear,
                                                    design: sap.m.ToolbarDesign.Transparent,
                                                    content: [
                                                        new sap.m.SearchField("", {
                                                            search(event: sap.ui.base.Event): void {
                                                                let searchText: string = event.getParameter("query");
                                                                let criteria: ibas.ICriteria = new ibas.Criteria();
                                                                if (!ibas.strings.isEmpty(searchText)) {
                                                                    let condition: ibas.ICondition = criteria.conditions.create();
                                                                    condition.alias = businesspartner.bo.Customer.PROPERTY_CODE_NAME;
                                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                                    condition.value = ibas.strings.replace(searchText, " ", "%");
                                                                    condition.bracketOpen = 1;
                                                                    condition = criteria.conditions.create();
                                                                    condition.alias = businesspartner.bo.Customer.PROPERTY_NAME_NAME;
                                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                                    condition.value = ibas.strings.replace(searchText, " ", "%");
                                                                    condition.relationship = ibas.emConditionRelationship.OR;
                                                                    condition.bracketClose = 1;
                                                                }
                                                                let sort: ibas.ISort = criteria.sorts.create();
                                                                sort.alias = businesspartner.bo.Customer.PROPERTY_CODE_NAME;
                                                                sort.sortType = ibas.emSortType.DESCENDING;
                                                                that.fireViewEvents(that.fetchCustomerEvent, criteria);
                                                                that.lastCustomerCriteria = criteria;
                                                                that.tableCustomers.setModel(null);
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                content: [
                                                    this.tableCustomers = new sap.extension.m.List("", {
                                                        chooseType: ibas.emChooseType.SINGLE,
                                                        growingThreshold: sap.extension.table.visibleRowCount(15),
                                                        mode: sap.m.ListMode.SingleSelectMaster,
                                                        items: {
                                                            path: "/rows",
                                                            template: new sap.m.ObjectListItem("", {
                                                                title: {
                                                                    path: "name",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                },
                                                                attributes: [
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_code"),
                                                                        bindingValue: {
                                                                            path: "code",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_group"),
                                                                        repository: businesspartner.bo.BORepositoryBusinessPartner,
                                                                        dataInfo: {
                                                                            type: businesspartner.bo.BusinessPartnerGroup,
                                                                            key: businesspartner.bo.BusinessPartnerGroup.PROPERTY_CODE_NAME,
                                                                            text: businesspartner.bo.BusinessPartnerGroup.PROPERTY_NAME_NAME
                                                                        },
                                                                        bindingValue: {
                                                                            path: "group",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_remarks"),
                                                                        bindingValue: {
                                                                            path: "remarks",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                ],
                                                                type: sap.m.ListType.Active
                                                            })
                                                        },
                                                        nextDataSet(event: sap.ui.base.Event): void {
                                                            // 查询下一个数据集
                                                            let data: any = event.getParameter("data");
                                                            if (ibas.objects.isNull(data)) {
                                                                return;
                                                            }
                                                            if (ibas.objects.isNull(that.lastCustomerCriteria)) {
                                                                return;
                                                            }
                                                            let criteria: ibas.ICriteria = that.lastCustomerCriteria.next(data);
                                                            if (ibas.objects.isNull(criteria)) {
                                                                return;
                                                            }
                                                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                                                            that.fireViewEvents(that.fetchCustomerEvent, criteria);
                                                        }
                                                    })
                                                ],
                                            }),
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                subHeader: new sap.m.Toolbar("", {
                                                    content: [
                                                        new sap.m.SearchField("", {
                                                            search(event: sap.ui.base.Event): void {
                                                                let searchText: string = event.getParameter("query");
                                                                let criteria: ibas.ICriteria = new ibas.Criteria();
                                                                if (!ibas.strings.isEmpty(searchText)) {
                                                                    let condition: ibas.ICondition = criteria.conditions.create();
                                                                    condition.alias = businesspartner.bo.Supplier.PROPERTY_CODE_NAME;
                                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                                    condition.value = ibas.strings.replace(searchText, " ", "%");
                                                                    condition.bracketOpen = 1;
                                                                    condition = criteria.conditions.create();
                                                                    condition.alias = businesspartner.bo.Supplier.PROPERTY_NAME_NAME;
                                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                                    condition.value = ibas.strings.replace(searchText, " ", "%");
                                                                    condition.relationship = ibas.emConditionRelationship.OR;
                                                                    condition.bracketClose = 1;
                                                                }
                                                                let sort: ibas.ISort = criteria.sorts.create();
                                                                sort.alias = businesspartner.bo.Supplier.PROPERTY_CODE_NAME;
                                                                sort.sortType = ibas.emSortType.DESCENDING;
                                                                that.fireViewEvents(that.fetchSupplierEvent, criteria);
                                                                that.lastSupplierCriteria = criteria;
                                                                that.tableSuppliers.setModel(null);
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                content: [
                                                    this.tableSuppliers = new sap.extension.m.List("", {
                                                        chooseType: ibas.emChooseType.SINGLE,
                                                        growingThreshold: sap.extension.table.visibleRowCount(15),
                                                        mode: sap.m.ListMode.SingleSelectMaster,
                                                        items: {
                                                            path: "/rows",
                                                            template: new sap.m.ObjectListItem("", {
                                                                title: {
                                                                    path: "name",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                },
                                                                attributes: [
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_code"),
                                                                        bindingValue: {
                                                                            path: "code",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_group"),
                                                                        repository: businesspartner.bo.BORepositoryBusinessPartner,
                                                                        dataInfo: {
                                                                            type: businesspartner.bo.BusinessPartnerGroup,
                                                                            key: businesspartner.bo.BusinessPartnerGroup.PROPERTY_CODE_NAME,
                                                                            text: businesspartner.bo.BusinessPartnerGroup.PROPERTY_NAME_NAME
                                                                        },
                                                                        bindingValue: {
                                                                            path: "group",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_remarks"),
                                                                        bindingValue: {
                                                                            path: "remarks",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                ],
                                                                type: sap.m.ListType.Active
                                                            })
                                                        },
                                                        nextDataSet(event: sap.ui.base.Event): void {
                                                            // 查询下一个数据集
                                                            let data: any = event.getParameter("data");
                                                            if (ibas.objects.isNull(data)) {
                                                                return;
                                                            }
                                                            if (ibas.objects.isNull(that.lastSupplierCriteria)) {
                                                                return;
                                                            }
                                                            let criteria: ibas.ICriteria = that.lastSupplierCriteria.next(data);
                                                            if (ibas.objects.isNull(criteria)) {
                                                                return;
                                                            }
                                                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                                                            that.fireViewEvents(that.fetchSupplierEvent, criteria);
                                                        }
                                                    })
                                                ]
                                            }),
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                subHeader: new sap.m.Toolbar("", {
                                                    content: [
                                                        new sap.m.SearchField("", {
                                                            search(event: sap.ui.base.Event): void {
                                                                let searchText: string = event.getParameter("query");
                                                                let criteria: ibas.ICriteria = new ibas.Criteria();
                                                                if (!ibas.strings.isEmpty(searchText)) {
                                                                    let condition: ibas.ICondition = criteria.conditions.create();
                                                                    condition.alias = materials.bo.Material.PROPERTY_CODE_NAME;
                                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                                    condition.value = ibas.strings.replace(searchText, " ", "%");
                                                                    condition.bracketOpen = 1;
                                                                    condition = criteria.conditions.create();
                                                                    condition.alias = materials.bo.Material.PROPERTY_NAME_NAME;
                                                                    condition.operation = ibas.emConditionOperation.CONTAIN;
                                                                    condition.value = ibas.strings.replace(searchText, " ", "%");
                                                                    condition.relationship = ibas.emConditionRelationship.OR;
                                                                    condition.bracketClose = 1;
                                                                }
                                                                let sort: ibas.ISort = criteria.sorts.create();
                                                                sort.alias = materials.bo.Material.PROPERTY_CODE_NAME;
                                                                sort.sortType = ibas.emSortType.DESCENDING;
                                                                that.fireViewEvents(that.fetchMaterialEvent, criteria);
                                                                that.lastMaterialCriteria = criteria;
                                                                that.tableMaterials.setModel(null);
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                content: [
                                                    this.tableMaterials = new sap.extension.m.List("", {
                                                        chooseType: ibas.emChooseType.SINGLE,
                                                        growingThreshold: sap.extension.table.visibleRowCount(15),
                                                        mode: sap.m.ListMode.SingleSelectMaster,
                                                        items: {
                                                            path: "/rows",
                                                            template: new sap.m.ObjectListItem("", {
                                                                title: {
                                                                    path: "name",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                },
                                                                firstStatus: new sap.m.ObjectStatus("", {
                                                                    text: {
                                                                        parts: [
                                                                            {
                                                                                path: "deleted",
                                                                                type: new sap.extension.data.YesNo(),
                                                                            },
                                                                            {
                                                                                path: "approvalStatus",
                                                                                type: new sap.extension.data.ApprovalStatus(),
                                                                            },
                                                                            {
                                                                                path: "activated",
                                                                                type: new sap.extension.data.YesNo(),
                                                                            },
                                                                            {
                                                                                path: "validDate",
                                                                                type: new sap.extension.data.Date(),
                                                                            },
                                                                            {
                                                                                path: "invalidDate",
                                                                                type: new sap.extension.data.Date(),
                                                                            },
                                                                        ],
                                                                        formatter(deleted: ibas.emYesNo, approvalStatus: ibas.emApprovalStatus,
                                                                            activated: ibas.emYesNo, validDate: Date, invalidDate: Date): string {
                                                                            if (ibas.enums.equals(ibas.emYesNo, deleted, ibas.emYesNo.YES)) {
                                                                                return ibas.i18n.prop("shell_unavailable");
                                                                            }
                                                                            if (ibas.enums.equals(ibas.emApprovalStatus, approvalStatus, ibas.emApprovalStatus.PROCESSING)
                                                                                || ibas.enums.equals(ibas.emApprovalStatus, approvalStatus, ibas.emApprovalStatus.REJECTED)
                                                                                || ibas.enums.equals(ibas.emApprovalStatus, approvalStatus, ibas.emApprovalStatus.CANCELLED)) {
                                                                                return ibas.i18n.prop("shell_unavailable");
                                                                            }
                                                                            if (ibas.enums.equals(ibas.emYesNo, activated, ibas.emYesNo.NO)) {
                                                                                return ibas.i18n.prop("shell_unavailable");
                                                                            }
                                                                            let today: Date = ibas.dates.today();
                                                                            validDate = ibas.dates.valueOf(validDate);
                                                                            invalidDate = ibas.dates.valueOf(invalidDate);
                                                                            if (validDate instanceof Date) {
                                                                                if (ibas.dates.compare(validDate, today) > 0) {
                                                                                    return ibas.i18n.prop("shell_unavailable");
                                                                                }
                                                                            }
                                                                            if (invalidDate instanceof Date) {
                                                                                if (ibas.dates.compare(today, invalidDate) > 0) {
                                                                                    return ibas.i18n.prop("shell_unavailable");
                                                                                }
                                                                            }
                                                                            return ibas.i18n.prop("shell_available");
                                                                        },
                                                                    },
                                                                    state: {
                                                                        parts: [
                                                                            {
                                                                                path: "deleted",
                                                                                type: new sap.extension.data.YesNo(),
                                                                            },
                                                                            {
                                                                                path: "approvalStatus",
                                                                                type: new sap.extension.data.ApprovalStatus(),
                                                                            },
                                                                            {
                                                                                path: "activated",
                                                                                type: new sap.extension.data.YesNo(),
                                                                            },
                                                                            {
                                                                                path: "validDate",
                                                                                type: new sap.extension.data.Date(),
                                                                            },
                                                                            {
                                                                                path: "invalidDate",
                                                                                type: new sap.extension.data.Date(),
                                                                            },
                                                                        ],
                                                                        formatter(deleted: ibas.emYesNo, approvalStatus: ibas.emApprovalStatus,
                                                                            activated: ibas.emYesNo, validDate: Date, invalidDate: Date): string {
                                                                            if (ibas.enums.equals(ibas.emYesNo, deleted, ibas.emYesNo.YES)) {
                                                                                return sap.ui.core.ValueState.Error;
                                                                            }
                                                                            if (ibas.enums.equals(ibas.emApprovalStatus, approvalStatus, ibas.emApprovalStatus.PROCESSING)
                                                                                || ibas.enums.equals(ibas.emApprovalStatus, approvalStatus, ibas.emApprovalStatus.REJECTED)
                                                                                || ibas.enums.equals(ibas.emApprovalStatus, approvalStatus, ibas.emApprovalStatus.CANCELLED)) {
                                                                                return sap.ui.core.ValueState.Error;
                                                                            }
                                                                            if (ibas.enums.equals(ibas.emYesNo, activated, ibas.emYesNo.NO)) {
                                                                                return sap.ui.core.ValueState.Error;
                                                                            }
                                                                            let today: Date = ibas.dates.today();
                                                                            validDate = ibas.dates.valueOf(validDate);
                                                                            invalidDate = ibas.dates.valueOf(invalidDate);
                                                                            if (validDate instanceof Date) {
                                                                                if (ibas.dates.compare(validDate, today) > 0) {
                                                                                    return sap.ui.core.ValueState.Error;
                                                                                }
                                                                            }
                                                                            if (invalidDate instanceof Date) {
                                                                                if (ibas.dates.compare(today, invalidDate) > 0) {
                                                                                    return sap.ui.core.ValueState.Error;
                                                                                }
                                                                            }
                                                                            return sap.ui.core.ValueState.Success;
                                                                        },
                                                                    },
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
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_code"),
                                                                        bindingValue: {
                                                                            path: "code",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_group"),
                                                                        repository: bo.BORepositoryMaterials,
                                                                        dataInfo: {
                                                                            type: bo.MaterialGroup,
                                                                            key: bo.MaterialGroup.PROPERTY_CODE_NAME,
                                                                            text: bo.MaterialGroup.PROPERTY_NAME_NAME
                                                                        },
                                                                        bindingValue: {
                                                                            path: "group",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                    new sap.extension.m.ObjectAttribute("", {
                                                                        title: ibas.i18n.prop("bo_businesspartnermaterialcatalog_remarks"),
                                                                        bindingValue: {
                                                                            path: "remarks",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    }),
                                                                ],
                                                                type: sap.m.ListType.Active
                                                            })
                                                        },
                                                        nextDataSet(event: sap.ui.base.Event): void {
                                                            // 查询下一个数据集
                                                            let data: any = event.getParameter("data");
                                                            if (ibas.objects.isNull(data)) {
                                                                return;
                                                            }
                                                            if (ibas.objects.isNull(that.lastMaterialCriteria)) {
                                                                return;
                                                            }
                                                            let criteria: ibas.ICriteria = that.lastMaterialCriteria.next(data);
                                                            if (ibas.objects.isNull(criteria)) {
                                                                return;
                                                            }
                                                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                                                            that.fireViewEvents(that.fetchMaterialEvent, criteria);
                                                        }
                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.SearchField("", {
                                            search(event: sap.ui.base.Event): void {
                                                if (that.tableCatalogs.hasModel() && that.tableCatalogs.getModel()?.getData<ibas.IList<bo.BusinessPartnerMaterialCatalog>>("rows")?.firstOrDefault(
                                                    c => c.isSavable === true && c.isDirty === true) !== null
                                                ) {
                                                    that.application.viewShower.messages({
                                                        title: that.title,
                                                        type: ibas.emMessageType.QUESTION,
                                                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
                                                        actions: [
                                                            ibas.emMessageAction.YES,
                                                            ibas.emMessageAction.NO,
                                                        ],
                                                        onCompleted: (result) => {
                                                            if (result !== ibas.emMessageAction.YES) {
                                                                return;
                                                            }
                                                            that.fetchData(event.getParameter("query"));
                                                        }
                                                    }); return;
                                                } else {
                                                    that.fetchData(event.getParameter("query"));
                                                }
                                            }
                                        }),
                                    ]
                                }),
                                content: [
                                    this.tableCatalogs,
                                ],
                                enableScrolling: false,
                                showFooter: true,
                                floatingFooter: true,
                                footer: this.toolbar = new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.MenuButton("", {
                                            visible: false,
                                            icon: "sap-icon://add",
                                            type: sap.m.ButtonType.Transparent,
                                            text: ibas.i18n.prop("shell_data_add"),
                                            menuPosition: sap.ui.core.Popup.Dock.EndTop,
                                            buttonMode: sap.m.MenuButtonMode.Regular,
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("bo_businesspartnermaterialcatalog_customer"),
                                                        press: function (): void {
                                                            let data: any = that.tableMaterials.getSelecteds().firstOrDefault();
                                                            if (ibas.objects.isNull(data)) {
                                                                that.application.viewShower.messages({
                                                                    title: that.title,
                                                                    type: ibas.emMessageType.WARNING,
                                                                    message: ibas.i18n.prop("shell_please_chooose_data",
                                                                        ibas.i18n.prop("bo_businesspartnermaterialcatalog_material"),
                                                                    )
                                                                }); return;
                                                            }
                                                            that.fireViewEvents(that.addDataEvent, data, businesspartner.bo.emBusinessPartnerType.CUSTOMER);
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("bo_businesspartnermaterialcatalog_supplier"),
                                                        press: function (): void {
                                                            let data: any = that.tableMaterials.getSelecteds().firstOrDefault();
                                                            if (ibas.objects.isNull(data)) {
                                                                that.application.viewShower.messages({
                                                                    title: that.title,
                                                                    type: ibas.emMessageType.WARNING,
                                                                    message: ibas.i18n.prop("shell_please_chooose_data",
                                                                        ibas.i18n.prop("bo_businesspartnermaterialcatalog_material"),
                                                                    )
                                                                }); return;
                                                            }
                                                            that.fireViewEvents(that.addDataEvent, data, businesspartner.bo.emBusinessPartnerType.SUPPLIER);
                                                        }
                                                    }),
                                                ]
                                            }),
                                        }),
                                        new sap.m.Button("", {
                                            visible: true,
                                            icon: "sap-icon://add",
                                            type: sap.m.ButtonType.Transparent,
                                            text: ibas.i18n.prop("shell_data_add"),
                                            press: function (): void {
                                                if (that.buttonTab.getSelectedKey() === "CUSTOMER") {
                                                    let data: any = that.tableCustomers.getSelecteds().firstOrDefault();
                                                    if (ibas.objects.isNull(data)) {
                                                        that.application.viewShower.messages({
                                                            title: that.title,
                                                            type: ibas.emMessageType.WARNING,
                                                            message: ibas.i18n.prop("shell_please_chooose_data",
                                                                ibas.i18n.prop("bo_businesspartnermaterialcatalog_customer"),
                                                            )
                                                        }); return;
                                                    }
                                                    that.fireViewEvents(that.addDataEvent, data);
                                                } else if (that.buttonTab.getSelectedKey() === "SUPPLIER") {
                                                    let data: any = that.tableSuppliers.getSelecteds().firstOrDefault();
                                                    if (ibas.objects.isNull(data)) {
                                                        that.application.viewShower.messages({
                                                            title: that.title,
                                                            type: ibas.emMessageType.WARNING,
                                                            message: ibas.i18n.prop("shell_please_chooose_data",
                                                                ibas.i18n.prop("bo_businesspartnermaterialcatalog_supplier"),
                                                            )
                                                        }); return;
                                                    }
                                                    that.fireViewEvents(that.addDataEvent, data);
                                                }
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            icon: "sap-icon://less",
                                            type: sap.m.ButtonType.Transparent,
                                            text: ibas.i18n.prop("shell_data_remove"),
                                            press: function (): void {
                                                for (let item of that.tableCatalogs.getSelecteds<bo.BusinessPartnerMaterialCatalog>()) {
                                                    if (item.isNew === true) {
                                                        item.isSavable = false;
                                                    } else {
                                                        item.delete();
                                                    }
                                                }
                                            }
                                        }),
                                        new sap.m.ToolbarSpacer(),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_save"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://save",
                                            press: function (): void {
                                                if (that.tableCatalogs.hasModel()) {
                                                    let datas: ibas.IList<bo.BusinessPartnerMaterialCatalog> = new ibas.ArrayList<bo.BusinessPartnerMaterialCatalog>();
                                                    for (let item of that.tableCatalogs.getModel().getData<ibas.IList<bo.BusinessPartnerMaterialCatalog>>("rows")) {
                                                        if (item.isSavable !== true) {
                                                            continue;
                                                        }
                                                        if (item.isDirty !== true) {
                                                            continue;
                                                        }
                                                        datas.add(item);
                                                    }
                                                    that.fireViewEvents(that.saveDataEvent, datas);
                                                }
                                            }
                                        }),
                                    ]
                                }),
                            })
                        ],
                    });
                }

                private tableCatalogs: sap.extension.table.Table;
                private tableMaterials: sap.extension.m.List;
                private tableCustomers: sap.extension.m.List;
                private tableSuppliers: sap.extension.m.List;
                private container: sap.m.NavContainer;
                private buttonTab: sap.m.SegmentedButton;
                private lastCatalogCriteria: ibas.ICriteria;
                private lastMaterialCriteria: ibas.ICriteria;
                private lastCustomerCriteria: ibas.ICriteria;
                private lastSupplierCriteria: ibas.ICriteria;
                private columnPartnerCode: sap.ui.table.Column;
                private columnPartnerName: sap.ui.table.Column;
                private toolbar: sap.m.Toolbar;

                private fetchData(searchText: string): void {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    if (!ibas.strings.isEmpty(searchText)) {
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_CATALOGCODE_NAME;
                        condition.operation = ibas.emConditionOperation.CONTAIN;
                        condition.value = ibas.strings.replace(searchText, " ", "%");
                        condition.bracketOpen = 1;
                        condition = criteria.conditions.create();
                        condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_CATALOGNAME_NAME;
                        condition.operation = ibas.emConditionOperation.CONTAIN;
                        condition.value = ibas.strings.replace(searchText, " ", "%");
                        condition = criteria.conditions.create();
                        condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_REMARKS_NAME;
                        condition.operation = ibas.emConditionOperation.CONTAIN;
                        condition.value = ibas.strings.replace(searchText, " ", "%");
                        condition.bracketClose = 1;
                    }
                    if (this.buttonTab.getSelectedKey() === "CUSTOMER") {
                        let count: number = criteria.conditions.length;
                        for (let item of this.tableCustomers.getSelecteds<businesspartner.bo.Customer>()) {
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERTYPE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = businesspartner.bo.emBusinessPartnerType.CUSTOMER.toString();
                            condition.bracketOpen = 1;
                            condition = criteria.conditions.create();
                            condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERCODE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = item.code;
                            condition.bracketClose = 1;
                            if (criteria.conditions.length > count + 2) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                        }
                        if (criteria.conditions.length > count + 2) {
                            criteria.conditions[count].bracketOpen += 1;
                            criteria.conditions[criteria.conditions.length - 1].bracketClose += 1;
                        }
                    } else if (this.buttonTab.getSelectedKey() === "SUPPLIER") {
                        let count: number = criteria.conditions.length;
                        for (let item of this.tableSuppliers.getSelecteds<businesspartner.bo.Supplier>()) {
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERTYPE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = businesspartner.bo.emBusinessPartnerType.CUSTOMER.toString();
                            condition.bracketOpen = 1;
                            condition = criteria.conditions.create();
                            condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERCODE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = item.code;
                            condition.bracketClose = 1;
                            if (criteria.conditions.length > count + 2) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                        }
                        if (criteria.conditions.length > count + 2) {
                            criteria.conditions[count].bracketOpen += 1;
                            criteria.conditions[criteria.conditions.length - 1].bracketClose += 1;
                        }
                    } else if (this.buttonTab.getSelectedKey() === "MATERIAL") {
                        let count: number = criteria.conditions.length;
                        for (let item of this.tableMaterials.getSelecteds<materials.bo.Material>()) {
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = materials.bo.BusinessPartnerMaterialCatalog.PROPERTY_ITEMCODE_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = item.code;
                            if (criteria.conditions.length > count + 1) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                        }
                        if (criteria.conditions.length > count + 1) {
                            criteria.conditions[count].bracketOpen += 1;
                            criteria.conditions[criteria.conditions.length - 1].bracketClose += 1;
                        }
                    }
                    this.fireViewEvents(this.fetchDataEvent, criteria);
                    this.lastCatalogCriteria = criteria;
                    this.tableCatalogs.setFirstVisibleRow(0);
                    this.tableCatalogs.setModel(null);
                }
                /** 显示数据 */
                showDatas(datas: bo.BusinessPartnerMaterialCatalog[]): void {
                    let model: sap.ui.model.Model = this.tableCatalogs.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableCatalogs.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableCatalogs.setBusy(false);
                }
                /** 显示客户数据 */
                showCustomers(datas: businesspartner.bo.Customer[]): void {
                    this.buttonTab.setSelectedKey("CUSTOMER");
                    this.columnPartnerCode.setLabel(ibas.i18n.prop(["bo_businesspartnermaterialcatalog_customer", "bo_businesspartnermaterialcatalog_code"]));
                    this.columnPartnerName.setLabel(ibas.i18n.prop(["bo_businesspartnermaterialcatalog_customer", "bo_businesspartnermaterialcatalog_name"]));

                    let model: sap.ui.model.Model = this.tableCustomers.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableCustomers.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableCustomers.setBusy(false);
                }
                /** 显示供应商数据 */
                showSuppliers(datas: businesspartner.bo.Supplier[]): void {
                    this.buttonTab.setSelectedKey("SUPPLIER");
                    this.columnPartnerCode.setLabel(ibas.i18n.prop(["bo_businesspartnermaterialcatalog_supplier", "bo_businesspartnermaterialcatalog_code"]));
                    this.columnPartnerName.setLabel(ibas.i18n.prop(["bo_businesspartnermaterialcatalog_supplier", "bo_businesspartnermaterialcatalog_name"]));

                    let model: sap.ui.model.Model = this.tableSuppliers.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableSuppliers.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableSuppliers.setBusy(false);
                }
                /** 显示物料数据 */
                showMaterials(datas: bo.Material[]): void {
                    this.buttonTab.setSelectedKey("MATERIAL");
                    this.columnPartnerCode.setLabel(ibas.i18n.prop("bo_businesspartnermaterialcatalog_businesspartnercode"));
                    this.columnPartnerName.setLabel(ibas.i18n.prop("bo_businesspartnermaterialcatalog_businesspartnername"));
                    let model: sap.ui.model.Model = this.tableMaterials.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableMaterials.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableMaterials.setBusy(false);
                }
            }
        }
    }
}
