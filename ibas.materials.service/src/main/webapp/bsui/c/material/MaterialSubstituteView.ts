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
            /** 列表视图-物料替代 */
            export class MaterialSubstituteView extends ibas.BOQueryViewWithPanel implements app.IMaterialSubstituteView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Material;
                }
                /** 查询物料事件 */
                fetchDataEvent: Function;
                /** 查询数据事件 */
                fetchSubstituteEvent: Function;
                /** 保存数据事件 */
                saveSubstituteEvent: Function;
                /** 添加数据事件 */
                addSubstituteEvent: Function;
                /** 移除数据事件 */
                removeSubstituteEvent: Function;
                /** 选择数据版本事件 */
                chooseSubstituteVersionEvent: Function;
                /** 选择物料事件 */
                chooseSubstituteMaterialEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableSubstitutes = new sap.extension.table.DataTable("", {
                        enableSelectAll: true,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://sys-cancel",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.removeSubstituteEvent, this.getBindingContext().getObject());
                                    },
                                }),
                            ]
                        }),
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "isDirty",
                            formatter(value: boolean): string {
                                if (!!value) {
                                    return sap.ui.core.MessageType.Warning;
                                } else {
                                    return sap.ui.core.MessageType.Information;
                                }
                            }
                        }),
                        fixedColumnCount: 1,
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_original"),
                                template: new sap.extension.m.RepositoryObjectAttribute("", {
                                    title: {
                                        path: "itemCode",
                                        type: new sap.extension.data.Alphanumeric(),
                                    },
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
                                width: "16rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_position"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "position",
                                    type: new sap.extension.data.Numeric(),
                                }),
                                width: "5rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_substitute"),
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseSubstituteMaterialEvent, this.getBindingContext().getObject());
                                    },
                                    showValueLink: true,
                                    valueLinkRequest: function (event: sap.ui.base.Event): void {
                                        if (ibas.servicesManager.runLinkService({
                                            boCode: bo.Material.BUSINESS_OBJECT_CODE,
                                            linkValue: event.getParameter("value")
                                        })) {
                                            that.fireViewEvents(that.closeEvent);
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "substitute",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_description"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: bo.Material,
                                        key: bo.Material.PROPERTY_CODE_NAME,
                                        text: bo.Material.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "substitute",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_version"),
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseSubstituteVersionEvent, this.getBindingContext().getObject());
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "version",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                visible: config.isEnableMaterialVersions(),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_quantity"),
                                template: new sap.extension.m.Input("", {

                                }).bindProperty("bindingValue", {
                                    path: "quantity",
                                    type: new sap.extension.data.Quantity()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_uom"),
                                template: new sap.extension.m.SelectionInput("", {
                                    showValueHelp: true,
                                    chooseType: ibas.emChooseType.SINGLE,
                                    repository: materials.bo.BORepositoryMaterials,
                                    dataInfo: {
                                        type: materials.bo.Unit,
                                        key: materials.bo.Unit.PROPERTY_NAME_NAME,
                                        text: materials.bo.Unit.PROPERTY_NAME_NAME
                                    },
                                    criteria: [
                                        new ibas.Condition(materials.bo.Unit.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                    ]
                                }).bindProperty("bindingValue", {
                                    path: "uom",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 8
                                    })
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_activated"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emYesNo,
                                }).bindProperty("bindingValue", {
                                    path: "activated",
                                    type: new sap.extension.data.YesNo(),
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_validdate"),
                                template: new sap.extension.m.DatePicker("", {
                                }).bindProperty("bindingValue", {
                                    path: "validDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_invaliddate"),
                                template: new sap.extension.m.DatePicker("", {
                                }).bindProperty("bindingValue", {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_materialsubstitute_remarks"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "20rem",
                            }),
                        ],
                    });
                    this.tableMaterials = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
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
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageMaterials = new sap.m.Page("", {
                                showHeader: true,
                                content: [
                                    this.tableMaterials
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    design: sap.m.ToolbarDesign.Transparent,
                                    style: sap.m.ToolbarStyle.Clear,
                                    content: [
                                        new sap.m.SearchField("", {
                                            search(event: sap.ui.base.Event): void {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.SearchField) {
                                                    if (!ibas.strings.isEmpty(source.getValue())) {
                                                        // 有替代料搜索条件，先查物料
                                                        let criteria: ibas.Criteria = new ibas.Criteria();
                                                        let condition: ibas.ICondition = criteria.conditions.create();
                                                        condition.alias = bo.Material.PROPERTY_CODE_NAME;
                                                        condition.operation = ibas.emConditionOperation.CONTAIN;
                                                        condition.value = ibas.strings.replace(source.getValue(), " ", "%");
                                                        condition.bracketOpen = 1;
                                                        condition = criteria.conditions.create();
                                                        condition.alias = bo.Material.PROPERTY_NAME_NAME;
                                                        condition.operation = ibas.emConditionOperation.CONTAIN;
                                                        condition.value = ibas.strings.replace(source.getValue(), " ", "%");
                                                        condition.relationship = ibas.emConditionRelationship.OR;
                                                        condition.bracketClose = 1;
                                                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                                                        boRepository.fetchMaterial({
                                                            criteria: criteria,
                                                            onCompleted: (opRslt) => {
                                                                criteria = new ibas.Criteria();
                                                                for (let item of that.tableMaterials.getSelecteds<bo.Material>()) {
                                                                    let condition: ibas.ICondition = criteria.conditions.create();
                                                                    condition.alias = bo.MaterialSubstitute.PROPERTY_ITEMCODE_NAME;
                                                                    condition.value = item.code;
                                                                    if (criteria.conditions.length > 1) {
                                                                        condition.relationship = ibas.emConditionRelationship.OR;
                                                                    }
                                                                }
                                                                if (opRslt.resultObjects.length > 0) {
                                                                    if (criteria.conditions.length > 1) {
                                                                        criteria.conditions.firstOrDefault().bracketOpen += 1;
                                                                        criteria.conditions.lastOrDefault().bracketClose += 1;
                                                                    }
                                                                    let count: number = criteria.conditions.length;
                                                                    for (let item of opRslt.resultObjects) {
                                                                        let condition: ibas.ICondition = criteria.conditions.create();
                                                                        condition.alias = bo.MaterialSubstitute.PROPERTY_SUBSTITUTE_NAME;
                                                                        condition.operation = ibas.emConditionOperation.EQUAL;
                                                                        condition.value = item.code;
                                                                        if (criteria.conditions.length > count + 1) {
                                                                            condition.relationship = ibas.emConditionRelationship.OR;
                                                                        }
                                                                    }
                                                                    if (criteria.conditions.length > count + 1) {
                                                                        criteria.conditions[count].bracketOpen += 1;
                                                                        criteria.conditions.lastOrDefault().bracketClose += 1;
                                                                    }
                                                                }
                                                                that.fireViewEvents(that.fetchSubstituteEvent, criteria);
                                                            }
                                                        });
                                                    } else {
                                                        let criteria: ibas.Criteria = new ibas.Criteria();
                                                        for (let item of that.tableMaterials.getSelecteds<bo.Material>()) {
                                                            let condition: ibas.ICondition = criteria.conditions.create();
                                                            condition.alias = bo.MaterialSubstitute.PROPERTY_ITEMCODE_NAME;
                                                            condition.value = item.code;
                                                            if (criteria.conditions.length > 1) {
                                                                condition.relationship = ibas.emConditionRelationship.OR;
                                                            }
                                                        }
                                                        that.fireViewEvents(that.fetchSubstituteEvent, criteria);
                                                    }

                                                }
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_delete"),
                                            icon: "sap-icon://delete",
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                that.fireViewEvents(that.removeSubstituteEvent, that.tableSubstitutes.getSelecteds());
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_save"),
                                            icon: "sap-icon://save",
                                            type: sap.m.ButtonType.Transparent,
                                            press: function (): void {
                                                that.fireViewEvents(that.saveSubstituteEvent);
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://create",
                                            press: function (): void {
                                                that.fireViewEvents(that.addSubstituteEvent, that.tableMaterials.getSelecteds().firstOrDefault());
                                            }
                                        }),
                                    ]
                                }),
                                content: [
                                    this.tableSubstitutes
                                ],
                                showFooter: false,
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
                                    content: []
                                }),
                            })
                        ],
                    });
                }
                private pageMaterials: sap.m.Page;
                private tableSubstitutes: sap.extension.table.Table;
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
                showSubstitutes(datas: bo.MaterialSubstitute[]): void {
                    this.tableSubstitutes.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
