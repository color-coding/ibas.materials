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
             * 物料总览视图
             */
            export class MaterialOverviewView extends ibas.BOQueryViewWithPanel implements app.IMaterialOverviewView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Material;
                }
                get autoQuery(): boolean {
                    return false;
                }
                /** 编辑物料事件，参数：编辑对象 */
                editDataEvent: Function;
                /** 新建物料事件 */
                newDataEvent: Function;
                /** 查看物料事件，参数：目标数据 */
                viewDataEvent: Function;
                /** 查询库存事件 */
                fetchMaterialInventoryEvent: Function;
                /** 查询批次信息 */
                fetchMaterialBatchEvent: Function;
                /** 编辑批次信息 */
                editMaterialBatchEvent: Function;
                /** 查询序列信息 */
                fetchMaterialSerialEvent: Function;
                /** 编辑序列信息 */
                editMaterialSerialEvent: Function;
                /** 查询预留信息 */
                fetchMaterialReservationEvent: Function;
                /** 释放预留信息 */
                releaseMaterialReservationEvent: Function;
                /** 查询订购信息 */
                fetchMaterialOrderedEvent: Function;
                /** 查询承诺信息 */
                fetchMaterialCommitedEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
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
                                        title: ibas.i18n.prop("bo_material_code"),
                                        bindingValue: {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_sign"),
                                        bindingValue: {
                                            path: "sign",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }).bindProperty("visible", {
                                        path: "sign",
                                        formatter(data: any): boolean {
                                            return ibas.strings.isEmpty(data) ? false : true;
                                        },
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_group"),
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
                                        title: ibas.i18n.prop("bo_material_remarks"),
                                        bindingValue: {
                                            path: "remarks",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
                                ],
                                type: sap.m.ListType.Active
                            })
                        },
                        selectionChange(event: sap.ui.base.Event): void {
                            let selected: boolean = event.getParameter("selected");
                            if (selected === true) {
                                that.fireViewEvents(that.viewDataEvent, that.tableMaterials.getSelecteds().firstOrDefault());
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
                    this.pageMaterials = new sap.m.Page("", {
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
                                        that.fireViewEvents(that.editDataEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.tableMaterials
                        ]
                    });
                    this.panelInventory = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("materials_material_inventory"),
                                }),
                                new sap.extension.m.ObjectNumber("", {
                                    number: {
                                        path: "onHand",
                                        type: new sap.extension.data.Quantity()
                                    },
                                    unit: {
                                        path: "inventoryUOM",
                                        type: new sap.extension.data.Alphanumeric()
                                    },
                                    state: {
                                        parts: [
                                            {
                                                path: "onHand",
                                                type: new sap.extension.data.Quantity()
                                            },
                                            {
                                                path: "minimumInventory",
                                                type: new sap.extension.data.Quantity()
                                            }
                                        ],
                                        formatter(onHand: number, minimumInventory: number): sap.ui.core.ValueState {
                                            if (onHand <= 0) {
                                                return sap.ui.core.ValueState.Error;
                                            }
                                            if (onHand < minimumInventory) {
                                                return sap.ui.core.ValueState.Warning;
                                            }
                                            return sap.ui.core.ValueState.Information;
                                        }
                                    },
                                }).addStyleClass("sapUiSmallMarginBegin"),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialInventoryEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        expand(event: sap.ui.base.Event): void {
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialInventoryEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.DataTable("", {
                                dataInfo: {
                                    code: bo.MaterialInventory.BUSINESS_OBJECT_CODE,
                                },
                                chooseType: ibas.emChooseType.MULTIPLE,
                                visibleRowCount: 4,
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_code"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "100%",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onhand"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onHand",
                                            type: new sap.extension.data.Quantity()
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onCommited",
                                            type: new sap.extension.data.Quantity()
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onordered"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onOrdered",
                                            type: new sap.extension.data.Quantity()
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialinventory_onreserved"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "onReserved",
                                            type: new sap.extension.data.Quantity()
                                        }),
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelOrdered = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("materials_material_ordered"),
                                }),
                                new sap.extension.m.ObjectNumber("", {
                                    number: {
                                        path: "onOrdered",
                                        type: new sap.extension.data.Quantity()
                                    },
                                    unit: {
                                        path: "inventoryUOM",
                                        type: new sap.extension.data.Alphanumeric()
                                    },
                                    state: sap.ui.core.ValueState.Information,
                                }).addStyleClass("sapUiSmallMarginBegin"),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (this: sap.m.Button): void {
                                        that.fireViewEvents(that.fetchMaterialOrderedEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialOrderedEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.DataTable("", {
                                dataInfo: {
                                    code: bo.MaterialEstimateJournal.BUSINESS_OBJECT_CODE,
                                },
                                chooseType: ibas.emChooseType.MULTIPLE,
                                visibleRowCount: 6,
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialestimatejournal_basedocument"),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                let data: any = this.getBindingContext().getObject();
                                                if (data instanceof bo.MaterialEstimateJournal && data.baseDocumentEntry > 0) {
                                                    ibas.servicesManager.runLinkService({
                                                        boCode: data.baseDocumentType,
                                                        linkValue: data.baseDocumentEntry.toString()
                                                    });
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "baseDocumentType",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                {
                                                    path: "baseDocumentEntry",
                                                    type: new sap.extension.data.Numeric(),
                                                },
                                                {
                                                    path: "baseDocumentLineId",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            ],
                                            formatter(type: string, entry: number, lineId: number): string {
                                                return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                                    + (lineId > 0 ? ibas.strings.format("-{0}", lineId) : "");
                                            }
                                        }),
                                        width: "60%",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "40%",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialinventoryreservation_quantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "",
                                            formatter(data: any): string {
                                                let quantity: number = 0;
                                                if (data instanceof bo.MaterialEstimateJournal) {
                                                    quantity = data.onAvailable();
                                                }
                                                return sap.extension.data.formatValue(sap.extension.data.Quantity, quantity, "string");
                                            }
                                        }),
                                        width: "10rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialestimatejournal_reservedquantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reservedQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                        width: "10rem",
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelCommited = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("materials_material_commited"),
                                }),
                                new sap.extension.m.ObjectNumber("", {
                                    number: {
                                        path: "onCommited",
                                        type: new sap.extension.data.Quantity()
                                    },
                                    unit: {
                                        path: "inventoryUOM",
                                        type: new sap.extension.data.Alphanumeric()
                                    },
                                    state: sap.ui.core.ValueState.Information,
                                }).addStyleClass("sapUiSmallMarginBegin"),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (this: sap.m.Button): void {
                                        that.fireViewEvents(that.fetchMaterialCommitedEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialCommitedEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.DataTable("", {
                                dataInfo: {
                                    code: bo.MaterialEstimateJournal.BUSINESS_OBJECT_CODE,
                                },
                                chooseType: ibas.emChooseType.MULTIPLE,
                                visibleRowCount: 6,
                                rows: "{/rows}",
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialestimatejournal_basedocument"),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                let data: any = this.getBindingContext().getObject();
                                                if (data instanceof bo.MaterialEstimateJournal && data.baseDocumentEntry > 0) {
                                                    ibas.servicesManager.runLinkService({
                                                        boCode: data.baseDocumentType,
                                                        linkValue: data.baseDocumentEntry.toString()
                                                    });
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "baseDocumentType",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                {
                                                    path: "baseDocumentEntry",
                                                    type: new sap.extension.data.Numeric(),
                                                },
                                                {
                                                    path: "baseDocumentLineId",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            ],
                                            formatter(type: string, entry: number, lineId: number): string {
                                                return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                                    + (lineId > 0 ? ibas.strings.format("-{0}", lineId) : "");
                                            }
                                        }),
                                        width: "60%",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "40%",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialinventoryreservation_quantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "",
                                            formatter(data: any): string {
                                                let quantity: number = 0;
                                                if (data instanceof bo.MaterialEstimateJournal) {
                                                    quantity = data.onAvailable();
                                                }
                                                return sap.extension.data.formatValue(sap.extension.data.Quantity, quantity, "string");
                                            }
                                        }),
                                        width: "10rem",
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelReservation = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: true,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("materials_material_reservation"),
                                }),
                                /*
                                new sap.extension.m.ObjectNumber("", {
                                    number: {
                                        path: "onReserved",
                                        type: new sap.extension.data.Quantity()
                                    },
                                    unit: {
                                        path: "inventoryUOM",
                                        type: new sap.extension.data.Alphanumeric()
                                    },
                                    state: sap.ui.core.ValueState.Information,
                                }).addStyleClass("sapUiSmallMarginBegin"),
                                */
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://sys-cancel",
                                    tooltip: ibas.i18n.prop("materials_release_reservation"),
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.releaseMaterialReservationEvent, (<any>that.panelReservation.getContent()[0]).getSelecteds());
                                    },
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (this: sap.m.Button): void {
                                        that.fireViewEvents(that.fetchMaterialReservationEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialReservationEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.DataTable("", {
                                dataInfo: {
                                    code: bo.MaterialInventoryReservation.BUSINESS_OBJECT_CODE,
                                },
                                chooseType: ibas.emChooseType.MULTIPLE,
                                visibleRowCount: 6,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction("", {
                                    items: [
                                        new sap.ui.table.RowActionItem("", {
                                            icon: "sap-icon://sys-cancel",
                                            tooltip: ibas.i18n.prop("materials_release_reservation"),
                                            press: function (oEvent: any): void {
                                                that.fireViewEvents(that.releaseMaterialReservationEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            },
                                        }),
                                    ]
                                }),
                                columns: [
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.strings.format("{0} / {1}",
                                            ibas.i18n.prop("bo_warehouse"),
                                            ibas.i18n.prop("bo_materialorderedreservation_sourcedocument")
                                        ),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                let data: app.ReservationWorkingItemResult = this.getBindingContext().getObject();
                                                if (data?.data instanceof bo.MaterialInventoryReservation) {
                                                    ibas.servicesManager.runLinkService({
                                                        boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                                                        linkValue: data?.data.warehouse
                                                    });
                                                } else if (data?.data instanceof bo.MaterialOrderedReservation) {
                                                    if (data?.data.sourceDocumentEntry > 0) {
                                                        ibas.servicesManager.runLinkService({
                                                            boCode: data?.data.sourceDocumentType,
                                                            linkValue: data?.data.sourceDocumentEntry.toString(),
                                                        });
                                                    }
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "source",
                                            type: new sap.extension.data.Alphanumeric(),
                                            formatter(this: sap.m.Text, data: string): string {
                                                if (ibas.strings.isWith(data, "DOC:", undefined)) {
                                                    let values: string[] = data.substring(4).split("-");
                                                    if (values.length > 0) {
                                                        let objectCode: string = values[0];
                                                        let docEntry: string = values[1];
                                                        let lineId: string = values[2];
                                                        return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", objectCode, docEntry))
                                                            + (!ibas.strings.isEmpty(lineId) ? ibas.strings.format("-{0}", lineId) : "");
                                                    }
                                                } else if (ibas.strings.isWith(data, "WHS:", undefined)) {
                                                    let code: string = data.substring(4);
                                                    let criteria: ibas.Criteria = new ibas.Criteria();
                                                    let condition: ibas.ICondition = criteria.conditions.create();
                                                    condition.alias = bo.Warehouse.PROPERTY_CODE_NAME;
                                                    condition.value = code;
                                                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                                                    boRepository.fetchWarehouse({
                                                        criteria: criteria,
                                                        onCompleted: (opRslt) => {
                                                            for (let item of opRslt.resultObjects) {
                                                                this.setText(ibas.strings.format("{0}: {1}", ibas.i18n.prop("bo_warehouse"), item.name));
                                                            }
                                                        }
                                                    });
                                                }
                                                return data;
                                            }
                                        }),
                                        width: "14rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.strings.format("{0} / {1}",
                                            ibas.i18n.prop("bo_materialinventoryreservation_batchcode"),
                                            ibas.i18n.prop("bo_materialinventoryreservation_serialcode"),
                                        ),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                let data: any = this.getBindingContext().getObject();
                                                if (data instanceof bo.MaterialInventoryReservation) {
                                                    if (!ibas.strings.isEmpty(data.serialCode)) {
                                                        that.fireViewEvents(that.editMaterialSerialEvent, data);
                                                    } else if (!ibas.strings.isEmpty(data.batchCode)) {
                                                        that.fireViewEvents(that.editMaterialBatchEvent, data);
                                                    }
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "batchCode",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }, {
                                                    path: "serialCode",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            ]
                                        }),
                                        width: "12rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialinventoryreservation_deliverydate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "source",
                                                },
                                                {
                                                    path: "deliveryDate",
                                                },
                                            ],
                                            formatter(source: string, deliveryDate: any): string {
                                                if (ibas.strings.isWith(source, "WHS:", undefined)) {
                                                    return ibas.i18n.prop("materials_spot");
                                                }
                                                if (deliveryDate instanceof Date) {
                                                    return sap.extension.data.formatValue(sap.extension.data.Date, deliveryDate, "string");
                                                }
                                                return "";
                                            }
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialinventoryreservation_quantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialinventoryreservation_targetdocument"),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                let data: any = this.getBindingContext().getObject();
                                                if ((data?.data instanceof bo.MaterialInventoryReservation || data?.data instanceof bo.MaterialOrderedReservation)
                                                    && data?.data.targetDocumentEntry > 0) {
                                                    ibas.servicesManager.runLinkService({
                                                        boCode: data?.data.targetDocumentType,
                                                        linkValue: data?.data.targetDocumentEntry.toString()
                                                    });
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            parts: [
                                                {
                                                    path: "targetDocumentType",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                {
                                                    path: "targetDocumentEntry",
                                                    type: new sap.extension.data.Numeric(),
                                                },
                                                {
                                                    path: "targetDocumentLineId",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            ],
                                            formatter(type: string, entry: number, lineId: number): string {
                                                return ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", type, entry))
                                                    + (lineId > 0 ? ibas.strings.format("-{0}", lineId) : "");
                                            }
                                        }),
                                        width: "12rem",
                                    }),
                                    new sap.extension.table.DataColumn("", {
                                        label: ibas.i18n.prop("bo_materialinventoryreservation_remarks"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "remarks",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "100%",
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelBatch = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("materials_material_batch"),
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.CheckBox("", {
                                    text: ibas.i18n.prop("materials_valid_data_only"),
                                    selected: true,
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.fetchMaterialBatchEvent,
                                            that.tableMaterials.getSelecteds().firstOrDefault(),
                                            (<sap.m.CheckBox>(<sap.m.Toolbar>this.getParent()).getContent()[2]).getSelected()
                                        );
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialBatchEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.DataTable("", {
                                dataInfo: {
                                    code: bo.MaterialBatch.BUSINESS_OBJECT_CODE,
                                },
                                chooseType: ibas.emChooseType.MULTIPLE,
                                visibleRowCount: 6,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction("", {
                                    items: [
                                        new sap.ui.table.RowActionItem("", {
                                            icon: "sap-icon://show-edit",
                                            press: function (oEvent: any): void {
                                                that.fireViewEvents(that.editMaterialBatchEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            },
                                        }),
                                    ]
                                }),
                                columns: [
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_code"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_batchcode"),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                that.fireViewEvents(that.editMaterialBatchEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "batchCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "batchCode",
                                        filterProperty: "batchCode"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_locked"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "locked",
                                            type: new sap.extension.data.YesNo(true),
                                        }),
                                        width: "4rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_quantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "quantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_reservedquantity"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reservedQuantity",
                                            type: new sap.extension.data.Quantity(),
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "supplierSerial",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "supplierSerial",
                                        filterProperty: "supplierSerial"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_version"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "version",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "6rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "expirationDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "expirationDate",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "manufacturingDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "manufacturingDate",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialbatch_notes"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "notes",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "14rem",
                                        filterProperty: "notes"
                                    }),
                                ],
                            })
                        ],
                    });
                    this.panelSerial = new sap.m.Panel("", {
                        expandable: true,
                        expanded: false,
                        visible: false,
                        width: "auto",
                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H5,
                                    text: ibas.i18n.prop("materials_material_serial"),
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.CheckBox("", {
                                    text: ibas.i18n.prop("materials_valid_data_only"),
                                    selected: true,
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (this: sap.m.Button): void {
                                        that.fireViewEvents(that.fetchMaterialSerialEvent,
                                            that.tableMaterials.getSelecteds().firstOrDefault(),
                                            (<sap.m.CheckBox>(<sap.m.Toolbar>this.getParent()).getContent()[2]).getSelected()
                                        );
                                    }
                                }),
                            ]
                        }),
                        expand(this: sap.m.Panel, event: sap.ui.base.Event): void {
                            if (this.getBusy() === true) {
                                return;
                            }
                            let expand: boolean = event.getParameter("expand");
                            if (expand === true) {
                                that.fireViewEvents(that.fetchMaterialSerialEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                            }
                        },
                        content: [
                            new sap.extension.table.DataTable("", {
                                dataInfo: {
                                    code: bo.MaterialSerial.BUSINESS_OBJECT_CODE,
                                },
                                chooseType: ibas.emChooseType.MULTIPLE,
                                visibleRowCount: 6,
                                rows: "{/rows}",
                                rowActionCount: 1,
                                rowActionTemplate: new sap.ui.table.RowAction("", {
                                    items: [
                                        new sap.ui.table.RowActionItem("", {
                                            icon: "sap-icon://show-edit",
                                            press: function (oEvent: any): void {
                                                that.fireViewEvents(that.editMaterialSerialEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            },
                                        }),
                                    ]
                                }),
                                columns: [
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_warehouse"),
                                        template: new sap.extension.m.DataLink("", {
                                            objectCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "8rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                        template: new sap.extension.m.RepositoryText("", {
                                            repository: bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: bo.Warehouse,
                                                key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_serialcode"),
                                        template: new sap.extension.m.Link("", {
                                            press(this: sap.m.Link): void {
                                                that.fireViewEvents(that.editMaterialSerialEvent
                                                    , this.getBindingContext().getObject()
                                                );
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "serialCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "serialCode",
                                        filterProperty: "serialCode"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_locked"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "locked",
                                            type: new sap.extension.data.YesNo(true),
                                        }),
                                        width: "4rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_instock"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "inStock",
                                            type: new sap.extension.data.YesNo(true),
                                        }),
                                        width: "4rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_reserved"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reserved",
                                            type: new sap.extension.data.YesNo(true),
                                        }),
                                        width: "4rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "supplierSerial",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        sortProperty: "supplierSerial",
                                        filterProperty: "supplierSerial"
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_version"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "version",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "6rem",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "expirationDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "expirationDate",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "manufacturingDate",
                                            type: new sap.extension.data.Date(),
                                        }),
                                        sortProperty: "manufacturingDate",
                                    }),
                                    new sap.extension.table.Column("", {
                                        label: ibas.i18n.prop("bo_materialserial_notes"),
                                        template: new sap.extension.m.Text("", {
                                        }).bindProperty("bindingValue", {
                                            path: "notes",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }),
                                        width: "14rem",
                                        filterProperty: "notes"
                                    }),
                                ],
                            })
                        ],
                    });
                    this.pageOverview = new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                this.panelButton = new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://navigation-right-arrow",
                                    press: function (this: sap.m.Button): void {
                                        if (this.getIcon() === "sap-icon://navigation-right-arrow") {
                                            for (let pItem of that.pageOverview.getContent()) {
                                                if (pItem instanceof sap.m.Panel) {
                                                    pItem.setExpanded(true);
                                                }
                                            }
                                            this.setIcon("sap-icon://navigation-down-arrow");
                                        } else {
                                            for (let pItem of that.pageOverview.getContent()) {
                                                if (pItem instanceof sap.m.Panel) {
                                                    pItem.setExpanded(false);
                                                }
                                            }
                                            this.setIcon("sap-icon://navigation-right-arrow");
                                        }
                                    }
                                }),
                                new sap.m.ToolbarSeparator(),
                                new sap.m.Button("", {
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.viewDataEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: (<any>that.pageOverview.getModel()).getData(),
                                                converter: new bo.DataConverter(),
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                    placement: sap.m.PlacementType.Bottom,
                                                    buttons: {
                                                        path: "/",
                                                        template: new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            text: {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? ibas.i18n.prop(data) : "";
                                                                }
                                                            },
                                                            icon: {
                                                                path: "icon",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? data : "sap-icon://e-care";
                                                                }
                                                            },
                                                            press(this: sap.m.Button): void {
                                                                let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                if (service) {
                                                                    service.run();
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                                actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                actionSheet.openBy(event.getSource());
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            new sap.m.ObjectHeader("", {
                                responsive: true,
                                fullScreenOptimized: true,
                                backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                imageShape: sap.m.ObjectHeaderPictureShape.Square,
                                icon: {
                                    path: "picture",
                                    formatter(data: any): any {
                                        if (ibas.strings.isEmpty(data)) {
                                            return "sap-icon://product";
                                        }
                                        if (ibas.strings.isWith(data, "http", undefined)) {
                                            return ibas.urls.normalize(data);
                                        }
                                        return new bo.BORepositoryMaterials().toUrl(data);
                                    }
                                },
                                iconActive: true,
                                iconPress(this: sap.m.ObjectHeader): void {
                                    let data: any = this.getBindingContext().getObject();
                                    if (data instanceof bo.Material) {
                                        let url: string = data.picture;
                                        if (!ibas.strings.isEmpty(url)) {
                                            if (ibas.strings.isWith(url, "http", undefined)) {
                                                url = ibas.urls.normalize(url);
                                            } else {
                                                url = new bo.BORepositoryMaterials().toUrl(url);
                                            }
                                            let lightBox: sap.m.LightBox = new sap.m.LightBox("", {
                                                imageContent: [
                                                    new sap.m.LightBoxItem("", {
                                                        imageSrc: url,
                                                    })
                                                ]
                                            });
                                            lightBox.open();
                                        }
                                    }
                                },
                                title: {
                                    path: "name",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                                titleLevel: sap.ui.core.TitleLevel.H3,
                                titleActive: true,
                                titlePress(this: sap.m.ObjectHeader): void {
                                    let data: any = this.getBindingContext().getObject();
                                    if (data instanceof bo.Material) {
                                        ibas.servicesManager.runLinkService({
                                            boCode: data.objectCode,
                                            linkValue: data.code
                                        });
                                    }
                                },
                                intro: {
                                    parts: [
                                        {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                        {
                                            path: "sign",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                    ]
                                },
                                introActive: false,
                                introPress(): void {

                                },
                                number: {
                                    path: "",
                                    formatter(data: bo.Material): string {
                                        return sap.extension.data.formatValue(sap.extension.data.Quantity, data ? data.onAvailable() : 0.0, "string");
                                    }
                                },
                                numberUnit: {
                                    path: "inventoryUOM",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                                numberState: sap.ui.core.ValueState.Success,
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_foreignname"),
                                        bindingValue: {
                                            path: "foreignName",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_barcode"),
                                        bindingValue: {
                                            path: "barCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_manufacturer"),
                                        bindingValue: {
                                            path: "manufacturer",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.RepositoryObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_preferredvendor"),
                                        bindingValue: {
                                            path: "preferredVendor",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                        repository: businesspartner.bo.BORepositoryBusinessPartner,
                                        dataInfo: {
                                            type: businesspartner.bo.Supplier,
                                            key: businesspartner.bo.Supplier.PROPERTY_CODE_NAME,
                                            text: businesspartner.bo.Supplier.PROPERTY_NAME_NAME,
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_procurementmethod"),
                                        text: {
                                            path: "procurementMethod",
                                            type: new sap.extension.data.Enum({
                                                enumType: bo.emProcurementMethod,
                                                describe: true,
                                            }),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_planningmethod"),
                                        text: {
                                            path: "planningMethod",
                                            type: new sap.extension.data.Enum({
                                                enumType: bo.emPlanningMethod,
                                                describe: true,
                                            }),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_darwingnumber"),
                                        bindingValue: {
                                            path: "darwingNumber",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_material_matchcode"),
                                        bindingValue: {
                                            path: "matchCode",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                ]
                            }).addStyleClass("sapUiResponsivePadding--header"),
                            this.panelInventory,
                            this.panelBatch,
                            this.panelSerial,
                            this.panelOrdered,
                            this.panelCommited,
                            this.panelReservation,
                        ]
                    });
                    return this.split = new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageMaterials,
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: false,
                                content: [
                                    new sap.m.MessagePage("", {
                                        text: ibas.i18n.prop("materials_please_search_materials"),
                                        description: "",
                                        showHeader: false,
                                        showNavButton: false,
                                        textDirection: sap.ui.core.TextDirection.Inherit
                                    })
                                ]
                            }),
                            this.pageOverview
                        ],
                    });
                }
                private split: sap.m.SplitContainer;
                private pageMaterials: sap.m.Page;
                private pageOverview: sap.m.Page;
                private panelInventory: sap.m.Panel;
                private panelBatch: sap.m.Panel;
                private panelSerial: sap.m.Panel;
                private panelReservation: sap.m.Panel;
                private panelOrdered: sap.m.Panel;
                private panelCommited: sap.m.Panel;
                private panelButton: sap.m.Button;
                private tableMaterials: sap.extension.m.List;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageMaterials.addHeaderContent(view);
                    this.pageMaterials.setShowHeader(true);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableMaterials.setBusy(true);
                        this.tableMaterials.setModel(null);
                    }
                }
                /** 显示数据 */
                showMaterials(datas: bo.IMaterial[]): void {
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
                /** 显示物料基础信息 */
                showMaterial(data: bo.IMaterial): void {
                    this.split.to(this.pageOverview.getId(), null, null, null);
                    this.pageOverview.setModel(new sap.extension.model.JSONModel(data));
                    this.panelInventory.setVisible(data.itemType === bo.emItemType.ITEM && data.inventoryItem === ibas.emYesNo.YES ? true : false);
                    this.panelInventory.getContent()[0].setModel(undefined);
                    this.panelInventory.setExpanded(false);
                    this.panelBatch.setVisible(data.batchManagement === ibas.emYesNo.YES ? true : false);
                    this.panelBatch.getContent()[0].setModel(undefined);
                    this.panelBatch.setExpanded(false);
                    this.panelSerial.setVisible(data.serialManagement === ibas.emYesNo.YES ? true : false);
                    this.panelSerial.getContent()[0].setModel(undefined);
                    this.panelSerial.setExpanded(false);
                    this.panelOrdered.setVisible(data.itemType === bo.emItemType.ITEM && data.inventoryItem === ibas.emYesNo.YES && data.onOrdered > 0 ? true : false);
                    this.panelOrdered.getContent()[0].setModel(undefined);
                    this.panelOrdered.setExpanded(false);
                    this.panelCommited.setVisible(data.itemType === bo.emItemType.ITEM && data.inventoryItem === ibas.emYesNo.YES && data.onCommited > 0 ? true : false);
                    this.panelCommited.getContent()[0].setModel(undefined);
                    this.panelCommited.setExpanded(false);
                    // this.panelReservation.setVisible(data.itemType === bo.emItemType.ITEM && data.inventoryItem === ibas.emYesNo.YES && data.onReserved > 0 ? true : false);
                    this.panelReservation.getContent()[0].setModel(undefined);
                    this.panelReservation.setExpanded(false);
                    this.panelButton.setIcon("sap-icon://navigation-right-arrow");
                    if (this.tableMaterials.getSelecteds().length === 0) {
                        for (let item of this.tableMaterials.getItems()) {
                            if (item.getBindingContext().getObject().code === data.code) {
                                this.tableMaterials.setSelectedItem(item);
                                break;
                            }
                        }
                    }
                }
                /** 显示物料库存 */
                showMaterialInventory(datas: bo.IMaterialInventory[]): void {
                    this.panelInventory.setVisible(true);
                    this.panelInventory.getContent()[0].setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.panelInventory.setExpanded(true);
                }
                /** 显示物料批次信息 */
                showMaterialBatch(datas: bo.IMaterialBatch[]): void {
                    this.panelBatch.setVisible(true);
                    this.panelBatch.setBusy(true);
                    this.panelBatch.getContent()[0].setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.panelBatch.setExpanded(true);
                    this.panelBatch.setBusy(false);
                }
                /** 显示物料序列信息 */
                showMaterialSerial(datas: bo.IMaterialSerial[]): void {
                    this.panelSerial.setVisible(true);
                    this.panelSerial.setBusy(true);
                    this.panelSerial.getContent()[0].setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.panelSerial.setExpanded(true);
                    this.panelSerial.setBusy(false);
                }
                /** 显示物料预留信息 */
                showMaterialReservation(datas: app.ReservationWorkingItemResult[]): void {
                    this.panelReservation.setVisible(true);
                    this.panelReservation.setBusy(true);
                    this.panelReservation.getContent()[0].setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.panelReservation.setExpanded(true);
                    this.panelReservation.setBusy(false);
                }
                showMaterialOrdered(datas: bo.IMaterialEstimateJournal[]): void {
                    this.panelOrdered.setVisible(true);
                    this.panelOrdered.setBusy(true);
                    this.panelOrdered.getContent()[0].setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.panelOrdered.setExpanded(true);
                    this.panelOrdered.setBusy(false);
                }
                showMaterialCommited(datas: bo.IMaterialEstimateJournal[]): void {
                    this.panelCommited.setVisible(true);
                    this.panelCommited.setBusy(true);
                    this.panelCommited.getContent()[0].setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.panelCommited.setExpanded(true);
                    this.panelCommited.setBusy(false);
                }
            }
        }
    }
}