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
            /** 编辑视图-库存收货 */
            export class GoodsReceiptEditView extends ibas.BOEditView implements app.IGoodsReceiptEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加库存收货-行事件 */
                addGoodsReceiptLineEvent: Function;
                /** 删除库存收货-行事件 */
                removeGoodsReceiptLineEvent: Function;
                /** 选择库存收货单价格清单 */
                chooseGoodsReceiptMaterialPriceListEvent: Function;
                /** 选择库存收货单行物料事件 */
                chooseGoodsReceiptLineMaterialEvent: Function;
                /** 选择库存收货单行仓库事件 */
                chooseGoodsReceiptLineWarehouseEvent: Function;
                /** 选择库存收货单行物料序列事件 */
                chooseGoodsReceiptLineMaterialSerialEvent: Function;
                /** 选择库存收货单行物料批次事件 */
                chooseGoodsReceiptLineMaterialBatchEvent: Function;
                /** 选择库存收货单行成本中心事件 */
                chooseGoodsReceiptLineDistributionRuleEvent: Function;
                /** 选择库存收货-行 物料版本 */
                chooseGoodsReceiptLineMaterialVersionEvent: Function;
                /** 测量物料 */
                measuringMaterialsEvent: Function;
                /** 默认仓库 */
                defaultWarehouse: string;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.GoodsReceipt.BUSINESS_OBJECT_CODE,
                        },
                        userFieldsMode: "input",
                        showFooter: sap.ui.getCore().getConfiguration().getVersion().getMajor() >= 1
                            && sap.ui.getCore().getConfiguration().getVersion().getMinor() >= 73 ? false : true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.extension.m.MenuButton("", {
                                    autoHide: true,
                                    icon: "sap-icon://tags",
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_batch"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.chooseGoodsReceiptLineMaterialBatchEvent);
                                                },
                                                visible: shell.app.privileges.canRun({
                                                    id: materials.app.MaterialBatchReceiptService.APPLICATION_ID,
                                                    name: materials.app.MaterialBatchReceiptService.APPLICATION_NAME,
                                                })
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_material_serial"),
                                                press: function (): void {
                                                    that.fireViewEvents(that.chooseGoodsReceiptLineMaterialSerialEvent);
                                                },
                                                visible: shell.app.privileges.canRun({
                                                    id: materials.app.MaterialSerialReceiptService.APPLICATION_ID,
                                                    name: materials.app.MaterialSerialReceiptService.APPLICATION_NAME,
                                                })
                                            }),
                                        ]
                                    })
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    text: ibas.i18n.prop("shell_data_add_line"),
                                    press: function (): void {
                                        that.fireViewEvents(that.addGoodsReceiptLineEvent);
                                    }
                                }),
                            ]
                        }),
                        sectionChange(event: sap.ui.base.Event): void {
                            let section: any = event.getParameter("section");
                            if (section instanceof sap.uxap.ObjectPageSection) {
                                if (section.getTitle() === ibas.i18n.prop("bo_goodsreceiptline")) {
                                    that.page.setShowFooter(true);
                                } else {
                                    that.page.setShowFooter(false);
                                }
                            }
                        },
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "docEntry",
                                type: new sap.extension.data.Numeric(),
                                formatter(data: string): any {
                                    return ibas.strings.format("# {0}", data ? data : "0");
                                }
                            },
                            sideContentButton: new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://save",
                                press(): void {
                                    that.fireViewEvents(that.saveDataEvent);
                                }
                            }),
                            actions: [
                                new sap.uxap.ObjectPageHeaderActionButton("", {
                                    text: ibas.i18n.prop("shell_data_clone"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://copy",
                                    hideText: true,
                                    importance: sap.uxap.Importance.Medium,
                                    press: function (): void {
                                        that.fireViewEvents(that.createDataEvent, true);
                                    }
                                }),
                                new sap.uxap.ObjectPageHeaderActionButton("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    hideText: true,
                                    importance: sap.uxap.Importance.Low,
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.uxap.ObjectPageHeaderActionButton("", {
                                    hideText: true,
                                    importance: sap.uxap.Importance.Medium,
                                    text: ibas.i18n.prop("shell_data_services"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press(event: sap.ui.base.Event): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: that.page.getModel().getData(),
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
                                }),
                            ],
                        }).addStyleClass("sapUiNoContentPadding"),
                        headerContent: [
                            new sap.extension.m.ObjectApprovalStatus("", {
                                title: ibas.i18n.prop("bo_goodsreceipt_approvalstatus"),
                                enumValue: {
                                    path: "approvalStatus",
                                    type: new sap.extension.data.ApprovalStatus(),
                                },
                                visible: {
                                    path: "approvalStatus",
                                    formatter(data: ibas.emApprovalStatus): boolean {
                                        return ibas.objects.isNull(data) || data === ibas.emApprovalStatus.UNAFFECTED ? false : true;
                                    }
                                }
                            }),
                            new sap.extension.m.ObjectDocumentCanceledStatus("", {
                                title: ibas.i18n.prop("bo_goodsreceipt_documentstatus"),
                                canceledStatus: {
                                    path: "canceled",
                                    type: new sap.extension.data.YesNo(),
                                },
                                documentStatus: {
                                    path: "documentStatus",
                                    type: new sap.extension.data.DocumentStatus(),
                                },
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_goodsreceipt_documentdate"),
                                bindingValue: {
                                    path: "documentDate",
                                    type: new sap.extension.data.Date(),
                                },
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_goodsreceipt_documenttotal"),
                                bindingValue: {
                                    parts: [
                                        {
                                            path: "documentTotal",
                                            type: new sap.extension.data.Sum(),
                                        },
                                        {
                                            path: "documentCurrency",
                                            type: new sap.extension.data.Alphanumeric()
                                        },
                                    ]
                                }
                            }),
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_general"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                width: "auto",
                                                content: [
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_ordertype") }),
                                                    new sap.extension.m.PropertySelect("", {
                                                        dataInfo: {
                                                            code: bo.GoodsReceipt.BUSINESS_OBJECT_CODE,
                                                        },
                                                        propertyName: "orderType",
                                                    }).bindProperty("bindingValue", {
                                                        path: "orderType",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        })
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_reference1") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "reference1",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 100
                                                        })
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_reference2") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "reference2",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 200
                                                        })
                                                    }),
                                                ]
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_status"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                width: "auto",
                                                content: [
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_documentstatus") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emDocumentStatus
                                                    }).bindProperty("bindingValue", {
                                                        path: "documentStatus",
                                                        type: new sap.extension.data.DocumentStatus()
                                                    }),
                                                    new sap.extension.m.TipsCheckBox("", {
                                                        text: ibas.i18n.prop("bo_goodsreceipt_canceled"),
                                                        tipsOnSelection: ibas.i18n.prop(["shell_data_cancel", "shell_data_status"]),
                                                    }).bindProperty("bindingValue", {
                                                        path: "canceled",
                                                        type: new sap.extension.data.YesNo()
                                                    }).bindProperty("editable", {
                                                        parts: [
                                                            {
                                                                path: "approvalStatus",
                                                                type: new sap.extension.data.ApprovalStatus(),
                                                            },
                                                            {
                                                                path: "documentStatus",
                                                                type: new sap.extension.data.DocumentStatus(),
                                                            }
                                                        ],
                                                        formatter(apStatus: ibas.emApprovalStatus, docStatus: ibas.emDocumentStatus): boolean {
                                                            if (apStatus === ibas.emApprovalStatus.PROCESSING) {
                                                                return false;
                                                            }
                                                            if (docStatus === ibas.emDocumentStatus.PLANNED) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_documentdate") }),
                                                    new sap.extension.m.DatePicker("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "documentDate",
                                                        type: new sap.extension.data.Date()
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_deliverydate") }),
                                                    new sap.extension.m.DatePicker("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "deliveryDate",
                                                        type: new sap.extension.data.Date()
                                                    }),
                                                ]
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_goodsreceiptline"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.listGoodsReceiptLine = new sap.extension.m.List("", {
                                                inset: false,
                                                width: "auto",
                                                growing: false,
                                                mode: sap.m.ListMode.None,
                                                swipeDirection: sap.m.SwipeDirection.RightToLeft,
                                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                                showNoData: true,
                                                swipeContent: new sap.m.FlexBox("", {
                                                    height: "100%",
                                                    alignItems: sap.m.FlexAlignItems.Start,
                                                    justifyContent: sap.m.FlexJustifyContent.End,
                                                    items: [
                                                        new sap.m.SegmentedButton("", {
                                                            items: [
                                                                new sap.m.SegmentedButtonItem("", {
                                                                    width: "3rem",
                                                                    icon: "sap-icon://copy",
                                                                    press(oEvent: any): void {
                                                                        that.fireViewEvents(that.addGoodsReceiptLineEvent, that.listGoodsReceiptLine.getSelecteds());
                                                                    }
                                                                }),
                                                                new sap.m.SegmentedButtonItem("", {
                                                                    width: "3rem",
                                                                    icon: "sap-icon://delete",
                                                                    press(oEvent: any): void {
                                                                        that.fireViewEvents(that.removeGoodsReceiptLineEvent, that.listGoodsReceiptLine.getSelecteds());
                                                                    }
                                                                }),
                                                            ]
                                                        }),
                                                    ]
                                                }).addStyleClass("sapUiSmallMarginTop"),
                                                items: {
                                                    path: "/rows",
                                                    template: new sap.extension.m.DataObjectListItem("", {
                                                        dataInfo: {
                                                            code: bo.GoodsReceipt.BUSINESS_OBJECT_CODE,
                                                            name: bo.GoodsReceiptLine.name
                                                        },
                                                        title: "# {lineId}",
                                                        number: {
                                                            path: "lineStatus",
                                                            type: new sap.extension.data.DocumentStatus(true),
                                                        },
                                                        attributes: [
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_material"),
                                                                bindingValue: "{itemDescription} ({itemCode})"
                                                            }),
                                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_warehouse"),
                                                                bindingValue: {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                                repository: materials.bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: materials.bo.Warehouse,
                                                                    key: materials.bo.Warehouse.PROPERTY_CODE_NAME,
                                                                    text: materials.bo.Warehouse.PROPERTY_NAME_NAME
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_goodsreceiptline_quantity"),
                                                                bindingValue: {
                                                                    parts: [
                                                                        {
                                                                            path: "quantity",
                                                                            type: new sap.extension.data.Quantity(),
                                                                        },
                                                                        {
                                                                            path: "uom",
                                                                            type: new sap.extension.data.Alphanumeric()
                                                                        },
                                                                    ]
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_goodsreceiptline_price"),
                                                                bindingValue: {
                                                                    parts: [
                                                                        {
                                                                            path: "price",
                                                                            type: new sap.extension.data.Price(),
                                                                        },
                                                                        {
                                                                            path: "currency",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    ]
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_goodsreceiptline_linetotal"),
                                                                bindingValue: {
                                                                    parts: [
                                                                        {
                                                                            path: "lineTotal",
                                                                            type: new sap.extension.data.Sum(),
                                                                        },
                                                                        {
                                                                            path: "currency",
                                                                            type: new sap.extension.data.Alphanumeric(),
                                                                        },
                                                                    ]
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_goodsreceiptline_reference1"),
                                                                bindingValue: {
                                                                    path: "reference1",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_goodsreceiptline_reference2"),
                                                                bindingValue: {
                                                                    path: "reference2",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                }
                                                            }),
                                                        ],
                                                        type: sap.m.ListType.Active,
                                                        press: function (oEvent: sap.ui.base.Event): void {
                                                            that.editGoodsReceiptLine(this.getBindingContext().getObject());
                                                        },
                                                    })
                                                },
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: false,
                                                width: "auto",
                                                content: [
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_documenttotal") }),
                                                    new sap.m.FlexBox("", {
                                                        width: "100%",
                                                        justifyContent: sap.m.FlexJustifyContent.Start,
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        alignContent: sap.m.FlexAlignContent.Center,
                                                        alignItems: sap.m.FlexAlignItems.Center,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                                width: "70%",
                                                                editable: false,
                                                            }).bindProperty("bindingValue", {
                                                                path: "documentTotal",
                                                                type: new sap.extension.data.Sum()
                                                            }).addStyleClass("sapUiTinyMarginEnd"),
                                                            new sap.extension.m.CurrencyRateSelect("", {
                                                                baseCurrency: accounting.config.currency("LOCAL"),
                                                                currency: {
                                                                    path: "documentCurrency",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                },
                                                                rate: {
                                                                    path: "documentRate",
                                                                    type: new sap.extension.data.Rate()
                                                                },
                                                                date: {
                                                                    path: "documentDate",
                                                                    type: new sap.extension.data.Date()
                                                                }
                                                            })
                                                        ]
                                                    }),
                                                ]
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("materials_title_others"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                width: "auto",
                                                content: [
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_dataowner") }),
                                                    new sap.extension.m.DataOwnerInput("", {
                                                        showValueHelp: true,
                                                        organization: {
                                                            path: "organization",
                                                            type: new sap.extension.data.Alphanumeric({
                                                                maxLength: 8
                                                            })
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "dataOwner",
                                                        type: new sap.extension.data.Numeric()
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_project") }),
                                                    new sap.extension.m.SelectionInput("", {
                                                        showValueHelp: true,
                                                        repository: accounting.bo.BORepositoryAccounting,
                                                        dataInfo: {
                                                            type: accounting.bo.Project,
                                                            key: accounting.bo.Project.PROPERTY_CODE_NAME,
                                                            text: accounting.bo.Project.PROPERTY_NAME_NAME,
                                                        },
                                                        criteria: [
                                                            new ibas.Condition(
                                                                accounting.bo.Project.PROPERTY_DELETED_NAME, ibas.emConditionOperation.NOT_EQUAL, ibas.emYesNo.YES.toString())
                                                        ]
                                                    }).bindProperty("bindingValue", {
                                                        path: "project",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 20
                                                        })
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_organization") }),
                                                    new sap.extension.m.DataOrganizationInput("", {
                                                        showValueHelp: true,
                                                    }).bindProperty("bindingValue", {
                                                        path: "organization",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        })
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceipt_remarks") }),
                                                    new sap.extension.m.TextArea("", {
                                                        rows: 3,
                                                    }).bindProperty("bindingValue", {
                                                        path: "remarks",
                                                        type: new sap.extension.data.Alphanumeric()
                                                    }),
                                                ]
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    });
                }

                private page: sap.extension.uxap.ObjectPageLayout;
                private listGoodsReceiptLine: sap.extension.m.List;

                /** 显示数据 */
                showGoodsReceipt(data: bo.GoodsReceipt): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    //   sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据（库存收货-行） */
                showGoodsReceiptLines(datas: bo.GoodsReceiptLine[]): void {
                    this.listGoodsReceiptLine.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 编辑数据（库存收货-行） */
                editGoodsReceiptLine(data: bo.GoodsReceiptLine): void {
                    let that: this = this;
                    let editForm: sap.m.Dialog = <any>sap.ui.getCore().byId(this.id + "_editform");
                    if (!(editForm instanceof sap.m.Dialog)) {
                        editForm = new sap.m.Dialog(this.id + "_editform", {
                            title: ibas.strings.format("{0} - {1}", ibas.i18n.prop("bo_goodsreceiptline"), data.lineId),
                            type: sap.m.DialogType.Standard,
                            state: sap.ui.core.ValueState.None,
                            stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                            horizontalScrolling: true,
                            verticalScrolling: true,
                            content: [
                                new sap.extension.layout.DataSimpleForm("", {
                                    editable: true,
                                    userFieldsTitle: "",
                                    userFieldsMode: "input",
                                    dataInfo: {
                                        code: bo.GoodsReceipt.BUSINESS_OBJECT_CODE,
                                        name: bo.GoodsReceiptLine.name,
                                    },
                                    content: [
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_lineid") }),
                                        new sap.extension.m.Input("", {
                                            editable: false,

                                        }).bindProperty("bindingValue", {
                                            path: "lineId",
                                            type: new sap.extension.data.Numeric(),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_linestatus") }),
                                        new sap.extension.m.EnumSelect("", {
                                            enumType: ibas.emDocumentStatus
                                        }).bindProperty("bindingValue", {
                                            path: "lineStatus",
                                            type: new sap.extension.data.DocumentStatus(),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_itemcode") }),
                                        new sap.extension.m.Input("", {
                                            showValueHelp: true,
                                            valueHelpRequest: function (this: sap.extension.m.Input): void {
                                                let model: any = this.getModel();
                                                if (model instanceof sap.extension.model.JSONModel) {
                                                    let data: any = model.getData();
                                                    if (data) {
                                                        that.fireViewEvents(that.chooseGoodsReceiptLineMaterialEvent, data);
                                                    }
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "itemCode",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 50
                                            }),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_itemdescription") }),
                                        new sap.extension.m.Input("", {
                                            editable: false,
                                        }).bindProperty("bindingValue", {
                                            path: "itemDescription",
                                            type: new sap.extension.data.Alphanumeric()
                                        }),
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("bo_goodsreceiptline_itemversion"),
                                            visible: materials.config.isEnableMaterialVersions(),
                                        }),
                                        new sap.extension.m.Input("", {
                                            showValueHelp: true,
                                            valueHelpRequest: function (): void {
                                                that.fireViewEvents(that.chooseGoodsReceiptLineMaterialVersionEvent,
                                                    this.getBindingContext().getObject()
                                                );
                                            },
                                            visible: materials.config.isEnableMaterialVersions(),
                                        }).bindProperty("bindingValue", {
                                            path: "itemVersion",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 10
                                            }),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_warehouse") }),
                                        new sap.extension.m.RepositoryInput("", {
                                            showValueHelp: true,
                                            repository: materials.bo.BORepositoryMaterials,
                                            dataInfo: {
                                                type: materials.bo.Warehouse,
                                                key: materials.bo.Warehouse.PROPERTY_CODE_NAME,
                                                text: materials.bo.Warehouse.PROPERTY_NAME_NAME
                                            },
                                            valueHelpRequest: function (this: sap.extension.m.Input): void {
                                                let model: any = this.getModel();
                                                if (model instanceof sap.extension.model.JSONModel) {
                                                    let data: any = model.getData();
                                                    if (data) {
                                                        that.fireViewEvents(that.chooseGoodsReceiptLineWarehouseEvent, data);
                                                    }
                                                }
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "warehouse",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            })
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_quantity") }),
                                        new sap.m.FlexBox("", {
                                            width: "100%",
                                            justifyContent: sap.m.FlexJustifyContent.Start,
                                            renderType: sap.m.FlexRendertype.Bare,
                                            items: [
                                                new sap.extension.m.Input("", {

                                                }).bindProperty("bindingValue", {
                                                    path: "quantity",
                                                    type: new sap.extension.data.Quantity(),
                                                }).bindProperty("description", {
                                                    path: "uom",
                                                    type: new sap.extension.data.Alphanumeric({
                                                        maxLength: 8
                                                    }),
                                                }),
                                                new sap.m.Button("", {
                                                    icon: "sap-icon://tags",
                                                    type: sap.m.ButtonType.Transparent,
                                                    visible: {
                                                        path: "serialManagement",
                                                        type: new sap.extension.data.YesNo(),
                                                    },
                                                    press: function (): void {
                                                        that.fireViewEvents(that.chooseGoodsReceiptLineMaterialSerialEvent);
                                                    },
                                                }).addStyleClass("sapUiTinyMarginBegin"),
                                                new sap.m.Button("", {
                                                    icon: "sap-icon://tags",
                                                    type: sap.m.ButtonType.Transparent,
                                                    visible: {
                                                        path: "batchManagement",
                                                        type: new sap.extension.data.YesNo(),
                                                    },
                                                    press: function (): void {
                                                        that.fireViewEvents(that.chooseGoodsReceiptLineMaterialBatchEvent);
                                                    },
                                                }).addStyleClass("sapUiTinyMarginBegin"),
                                            ]
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_price") }),
                                        new sap.extension.m.Input("", {

                                        }).bindProperty("bindingValue", {
                                            path: "price",
                                            type: new sap.extension.data.Price(),
                                        }).bindProperty("description", {
                                            path: "currency",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            }),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_linetotal") }),
                                        new sap.extension.m.Input("", {
                                            editable: false,

                                        }).bindProperty("bindingValue", {
                                            path: "lineTotal",
                                            type: new sap.extension.data.Sum(),
                                        }).bindProperty("description", {
                                            path: "currency",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 8
                                            }),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_reference1") }),
                                        new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reference1",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 100
                                            }),
                                        }),
                                        new sap.m.Label("", { text: ibas.i18n.prop("bo_goodsreceiptline_reference2") }),
                                        new sap.extension.m.Input("", {
                                        }).bindProperty("bindingValue", {
                                            path: "reference2",
                                            type: new sap.extension.data.Alphanumeric({
                                                maxLength: 200
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                            buttons: [
                                new sap.m.Button("", {
                                    width: "20%",
                                    icon: "sap-icon://arrow-left",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        let form: any = editForm.getContent()[0];
                                        if (form instanceof sap.extension.layout.SimpleForm) {
                                            let datas: any = that.listGoodsReceiptLine.getModel().getData("rows");
                                            if (datas instanceof Array && datas.length > 0) {
                                                let index: number = datas.indexOf(form.getModel().getData());
                                                index = index <= 0 ? datas.length - 1 : index - 1;
                                                form.setModel(new sap.extension.model.JSONModel(datas[index]));
                                                editForm.setTitle(ibas.strings.format("{0} - {1}", ibas.i18n.prop("bo_goodsreceiptline"), datas[index].lineId));
                                            } else {
                                                that.application.viewShower.messages({
                                                    title: that.title,
                                                    type: ibas.emMessageType.WARNING,
                                                    message: ibas.i18n.prop(["shell_please", "shell_data_add_line"]),
                                                });
                                            }
                                        }
                                    }
                                }),
                                new sap.m.Button("", {
                                    width: "20%",
                                    icon: "sap-icon://arrow-right",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        let form: any = editForm.getContent()[0];
                                        if (form instanceof sap.extension.layout.SimpleForm) {
                                            let datas: any = that.listGoodsReceiptLine.getModel().getData("rows");
                                            if (datas instanceof Array && datas.length > 0) {
                                                let index: number = datas.indexOf(form.getModel().getData());
                                                index = index >= datas.length - 1 ? 0 : index + 1;
                                                form.setModel(new sap.extension.model.JSONModel(datas[index]));
                                                editForm.setTitle(ibas.strings.format("{0} - {1}", ibas.i18n.prop("bo_goodsreceiptline"), datas[index].lineId));
                                            } else {
                                                that.application.viewShower.messages({
                                                    title: that.title,
                                                    type: ibas.emMessageType.WARNING,
                                                    message: ibas.i18n.prop(["shell_please", "shell_data_add_line"]),
                                                });
                                            }
                                        }
                                    }
                                }),
                                new sap.m.Button("", {
                                    width: "20%",
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        let form: any = editForm.getContent()[0];
                                        if (form instanceof sap.extension.layout.SimpleForm) {
                                            let datas: any = that.listGoodsReceiptLine.getModel().getData("rows");
                                            if (datas instanceof Array && datas.length > 0) {
                                                that.fireViewEvents(that.removeGoodsReceiptLineEvent, form.getModel().getData());
                                                if (datas.length === 1) {
                                                    // 无数据，退出
                                                    (<any>editForm.getButtons()[3]).firePress({});
                                                } else {
                                                    // 下一个
                                                    (<any>editForm.getButtons()[1]).firePress({});
                                                }
                                            }
                                        }
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_exit"),
                                    type: sap.m.ButtonType.Transparent,
                                    press(this: sap.m.Button): void {
                                        if (this.getParent() instanceof sap.m.Dialog) {
                                            (<sap.m.Dialog>this.getParent()).close();
                                        } else {
                                            editForm.close();
                                        }
                                    }
                                }),
                            ]
                        }).addStyleClass("sapUiNoContentPadding");
                    }
                    editForm.getContent()[0].setModel(new sap.extension.model.JSONModel(data));
                    editForm.open();
                }
                protected onClosed(): void {
                    super.onClosed();
                    let form: any = sap.ui.getCore().byId(this.id + "_editform");
                    if (form instanceof sap.m.Dialog) {
                        form.destroy();
                    }
                }
            }
        }
    }
}
