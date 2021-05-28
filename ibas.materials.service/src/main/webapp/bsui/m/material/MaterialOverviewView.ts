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
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableMaterials = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.None,
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
                                        title: ibas.i18n.prop("bo_material_onavailable"),
                                        bindingValue: "{=${}.onAvailable()} {inventoryUOM}",
                                    }),
                                ],
                                type: sap.m.ListType.Active,
                                press: function (oEvent: sap.ui.base.Event): void {
                                    that.fireViewEvents(that.viewDataEvent, this.getBindingContext().getObject());
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
                    this.pageMaterials = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.tableMaterials
                        ]
                    });
                    this.pageOverview = new sap.extension.uxap.DataObjectPageLayout("", {
                        showFooter: false,
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "/name",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            objectSubtitle: {
                                path: "/code",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            sideContentButton: new sap.m.Button("", {
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://nav-back",
                                press: function (): void {
                                    that.container.to(that.pageMaterials.getId());
                                }
                            }),
                        }).addStyleClass("sapUiNoContentPadding"),
                        headerContent: [
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_sign"),
                                bindingValue: {
                                    path: "/sign",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_foreignname"),
                                bindingValue: {
                                    path: "/foreignName",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_barcode"),
                                bindingValue: {
                                    path: "/barCode",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                            }),
                            new sap.extension.m.RepositoryObjectAttribute("", {
                                title: ibas.i18n.prop("bo_material_preferredvendor"),
                                bindingValue: {
                                    path: "/preferredVendor",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                                repository: businesspartner.bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: businesspartner.bo.Supplier,
                                    key: businesspartner.bo.Supplier.PROPERTY_CODE_NAME,
                                    text: businesspartner.bo.Supplier.PROPERTY_NAME_NAME
                                },
                            }),
                        ],
                        sections: [
                            this.panelPicture = new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("bo_material_picture"),
                                showTitle: false,
                                visible: {
                                    path: "/picture",
                                    formatter(data: string): boolean {
                                        return ibas.strings.isEmpty(data) ? false : true;
                                    },
                                },
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.m.Image("", {
                                                width: "auto",
                                                height: "12rem",
                                                press(event: sap.ui.base.Event): void {
                                                    let source: any = event.getSource();
                                                    if (source instanceof sap.m.Image) {
                                                        let url: string = source.getSrc();
                                                        if (!ibas.strings.isEmpty(url)) {
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
                                            }).bindProperty("src", {
                                                path: "/picture",
                                                formatter(data: any): any {
                                                    if (ibas.strings.isWith(data, "http", undefined)) {
                                                        return ibas.urls.normalize(data);
                                                    }
                                                    return new bo.BORepositoryMaterials().toUrl(data);
                                                }
                                            }),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                showTitle: false,
                                title: ibas.i18n.prop("bo_materialinventory"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.listInventory = new sap.extension.m.List("", {
                                                inset: false,
                                                growing: false,
                                                mode: sap.m.ListMode.None,
                                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                                showNoData: true,
                                                width: "auto",
                                                headerToolbar: new sap.m.Toolbar("", {
                                                    content: [
                                                        new sap.m.Title("", {
                                                            level: sap.ui.core.TitleLevel.H5,
                                                        }),
                                                        new sap.m.ToolbarSpacer(""),
                                                        new sap.m.Button("", {
                                                            icon: "sap-icon://refresh",
                                                            press: function (): void {
                                                                that.fireViewEvents(that.fetchMaterialInventoryEvent,
                                                                    that.pageOverview.getBindingContext().getObject());
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                items: {
                                                    path: "/rows",
                                                    template: new sap.m.ObjectListItem("", {
                                                        title: {
                                                            path: "warehouse",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        },
                                                        number: {
                                                            path: "onHand",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        attributes: [
                                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                                                bindingValue: {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Warehouse,
                                                                    key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                    text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialinventory_oncommited"),
                                                                bindingValue: {
                                                                    path: "onCommited",
                                                                    type: new sap.extension.data.Quantity()
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialinventory_onordered"),
                                                                bindingValue: {
                                                                    path: "onOrdered",
                                                                    type: new sap.extension.data.Quantity()
                                                                },
                                                            }),
                                                        ],
                                                    })
                                                },
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                showTitle: false,
                                title: ibas.i18n.prop("bo_materialbatch"),
                                visible: {
                                    path: "/batchManagement",
                                    formatter(data: ibas.emYesNo): boolean {
                                        return data === ibas.emYesNo.YES ? true : false;
                                    },
                                },
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.listBatch = new sap.extension.m.List("", {
                                                inset: false,
                                                growing: false,
                                                mode: sap.m.ListMode.None,
                                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                                showNoData: true,
                                                width: "auto",
                                                headerToolbar: new sap.m.Toolbar("", {
                                                    content: [
                                                        new sap.m.Title("", {
                                                            level: sap.ui.core.TitleLevel.H5,
                                                            text: ibas.i18n.prop("bo_materialbatch"),
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
                                                                    that.pageOverview.getBindingContext().getObject(),
                                                                    (<sap.m.CheckBox>(<sap.m.Toolbar>this.getParent()).getContent()[2]).getSelected()
                                                                );
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                items: {
                                                    path: "/rows",
                                                    template: new sap.m.ObjectListItem("", {
                                                        title: {
                                                            path: "batchCode",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        },
                                                        number: {
                                                            path: "quantity",
                                                            type: new sap.extension.data.Quantity()
                                                        },
                                                        attributes: [
                                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                                                bindingValue: {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Warehouse,
                                                                    key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                    text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_supplierserial"),
                                                                bindingValue: {
                                                                    path: "supplierSerial",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_expirationdate"),
                                                                bindingValue: {
                                                                    path: "expirationDate",
                                                                    type: new sap.extension.data.Date()
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_manufacturingdate"),
                                                                bindingValue: {
                                                                    path: "manufacturingDate",
                                                                    type: new sap.extension.data.Date()
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialbatch_notes"),
                                                                bindingValue: {
                                                                    path: "notes",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                },
                                                            }),
                                                        ],
                                                    })
                                                },
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                showTitle: false,
                                title: ibas.i18n.prop("bo_materialserial"),
                                visible: {
                                    path: "/serialManagement",
                                    formatter(data: ibas.emYesNo): boolean {
                                        return data === ibas.emYesNo.YES ? true : false;
                                    },
                                },
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.listSerial = new sap.extension.m.List("", {
                                                inset: false,
                                                growing: false,
                                                mode: sap.m.ListMode.None,
                                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                                showNoData: true,
                                                width: "auto",
                                                headerToolbar: new sap.m.Toolbar("", {
                                                    content: [
                                                        new sap.m.Title("", {
                                                            level: sap.ui.core.TitleLevel.H5,
                                                            text: ibas.i18n.prop("bo_materialserial"),
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
                                                                    that.pageOverview.getBindingContext().getObject(),
                                                                    (<sap.m.CheckBox>(<sap.m.Toolbar>this.getParent()).getContent()[2]).getSelected()
                                                                );
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                items: {
                                                    path: "/rows",
                                                    template: new sap.m.ObjectListItem("", {
                                                        title: {
                                                            path: "serialCode",
                                                            type: new sap.extension.data.Alphanumeric(),
                                                        },
                                                        number: {
                                                            path: "inStock",
                                                            type: new sap.extension.data.YesNo(true),
                                                        },
                                                        attributes: [
                                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_warehouse") + ibas.i18n.prop("bo_warehouse_name"),
                                                                bindingValue: {
                                                                    path: "warehouse",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Warehouse,
                                                                    key: bo.Warehouse.PROPERTY_CODE_NAME,
                                                                    text: bo.Warehouse.PROPERTY_NAME_NAME
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_batchserial"),
                                                                bindingValue: {
                                                                    path: "batchSerial",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_supplierserial"),
                                                                bindingValue: {
                                                                    path: "supplierSerial",
                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_expirationdate"),
                                                                bindingValue: {
                                                                    path: "expirationDate",
                                                                    type: new sap.extension.data.Date()
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_manufacturingdate"),
                                                                bindingValue: {
                                                                    path: "manufacturingDate",
                                                                    type: new sap.extension.data.Date()
                                                                },
                                                            }),
                                                            new sap.extension.m.ObjectAttribute("", {
                                                                title: ibas.i18n.prop("bo_materialserial_notes"),
                                                                bindingValue: {
                                                                    path: "notes",
                                                                    type: new sap.extension.data.Alphanumeric()
                                                                },
                                                            }),
                                                        ],
                                                    })
                                                },
                                            }).addStyleClass("sapUxAPObjectPageSubSectionAlignContent"),
                                        ]
                                    }),
                                ]
                            }),
                        ],
                    });
                    return this.container = new sap.m.NavContainer("", {
                        autoFocus: false,
                        pages: [
                            this.pageMaterials,
                            this.pageOverview
                        ],
                    });
                }
                private container: sap.m.NavContainer;
                private pageMaterials: sap.m.Page;
                private pageOverview: sap.extension.uxap.DataObjectPageLayout;
                private panelPicture: sap.uxap.ObjectPageSection;
                private listInventory: sap.m.List;
                private listBatch: sap.m.List;
                private listSerial: sap.m.List;
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
                private pullToRefresh: sap.m.PullToRefresh;
                /** 嵌入下拉条 */
                embeddedPuller(view: any): void {
                    if (view instanceof sap.m.PullToRefresh) {
                        if (!ibas.objects.isNull(this.pageMaterials)) {
                            this.pageMaterials.insertContent(view, 0);
                            this.pullToRefresh = view;
                        }
                    }
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
                    if (!ibas.objects.isNull(this.pullToRefresh)) {
                        this.pullToRefresh.hide();
                    }
                    this.container.to(this.pageMaterials.getId());
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
                    this.container.to(this.pageOverview.getId());
                    this.pageOverview.setModel(new sap.extension.model.JSONModel(data));
                    if (ibas.strings.isEmpty(data.picture)) {
                        this.panelPicture.setVisible(false);
                    } else {
                        this.panelPicture.setVisible(true);
                    }

                    let title: any = this.listInventory.getHeaderToolbar().getContent()[0];
                    if (title instanceof sap.m.Title) {
                        let builder: ibas.StringBuilder = new ibas.StringBuilder();
                        builder.map(null, "");
                        builder.map(undefined, "");
                        builder.append(ibas.i18n.prop("bo_materialinventory"));
                        builder.append(": ");
                        builder.append(data.onHand);
                        builder.append(" ");
                        builder.append(data.inventoryUOM);
                        title.setText(builder.toString());
                    }
                    this.listInventory.destroyItems();
                    this.listBatch.destroyItems();
                    this.listSerial.destroyItems();
                }
                /** 显示物料库存 */
                showMaterialInventory(datas: bo.IMaterialInventory[]): void {
                    this.listInventory.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料批次信息 */
                showMaterialBatch(datas: bo.IMaterialBatch[]): void {
                    this.listBatch.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示物料序列信息 */
                showMaterialSerial(datas: bo.IMaterialSerial[]): void {
                    this.listSerial.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}