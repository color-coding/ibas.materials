/*
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IMaterialOverviewView } from "../../../bsapp/material/index";

/**
 * 列表视图-物料
 */
export class MaterialOverviewView extends ibas.BOQueryViewWithPanel implements IMaterialOverviewView {
    /** 返回查询的对象 */
    get queryTarget(): any {
        return bo.Material;
    }

    private pageMaterial: sap.m.Page;
    private tableMaterial: sap.m.List;
    private tableMaterialPrice: sap.ui.table.Table;
    private tableMaterialInventory: sap.ui.table.Table;
    private tableMaterialBatch: sap.ui.table.Table;
    private tableMaterialSerial: sap.ui.table.Table;
    private labelMaterialInventory: sap.m.Label;

    /** 编辑物料事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 新建物料事件 */
    newDataEvent: Function;
    /** 查看物料事件，参数：目标数据 */
    viewDataEvent: Function;
    /** 调用服务事件，参数1 IServicesShower显示服务者 */
    callServicesEvent: Function;
    /** 查询物料所有相关信息 */
    fetchMaterialAllInformationEvent: Function;

    /** 绘制视图 */
    draw(): any {
        let that: this = this;
        that.tableMaterial = new sap.m.List("", {
            inset: false,
            growing: true,
            growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            growingScrollToLoad: true,
            mode: sap.m.ListMode.SingleSelectMaster,
            items: {
                path: "/rows",
                template: new sap.m.ObjectListItem("", {
                    title: "{name}",
                    number: "{group}",
                    firstStatus: [
                        new sap.m.ObjectStatus("", {
                            text: {
                                path: "activated",
                                formatter(): any {
                                    if (!ibas.objects.isNull(this.getBindingContext())) {
                                        let material: bo.Material = this.getBindingContext().getObject();
                                        if (material) {
                                            if (material.activated === ibas.emYesNo.YES) {
                                                let today: Date = ibas.dates.now();
                                                // 已激活-无生效日期-无失效日期
                                                if (ibas.objects.isNull(material.validDate) && ibas.objects.isNull(material.invalidDate)) {
                                                    return ibas.i18n.prop("bo_material_can_use");
                                                } else if (ibas.objects.isNull(material.validDate) &&
                                                    // 已激活-无生效日期-失效日期大于等于当前日期
                                                    material.invalidDate >= today) {
                                                    return ibas.i18n.prop("bo_material_can_use");
                                                } else if (material.validDate < today &&
                                                    // 已激活-生效日期小于等于当前日期-失效日期大于等于当前日期
                                                    material.invalidDate >= today) {
                                                    return ibas.i18n.prop("bo_material_can_use");
                                                } else if (material.validDate <= today &&
                                                    // 已激活-生效日期小于等于当前日期-无失效日期
                                                    ibas.objects.isNull(material.invalidDate)) {
                                                    return ibas.i18n.prop("bo_material_can_use");
                                                } else {
                                                    // 已激活-其他
                                                    //  that.materialIsCanBeUse.setState(sap.ui.core.ValueState.Warning);
                                                    return ibas.i18n.prop("bo_material_can_not_use");
                                                }
                                            } else {
                                                // 未激活
                                                // that.materialIsCanBeUse.setState(sap.ui.core.ValueState.Warning);
                                                return ibas.i18n.prop("bo_material_can_not_use");
                                            }
                                        }
                                    }
                                }
                            },
                            state: sap.ui.core.ValueState.Success
                        })
                    ],
                    attributes: [
                        new sap.m.ObjectAttribute("", {
                            title: ibas.i18n.prop("bo_material_code"),
                            text: "{code}"
                        }),
                        new sap.m.ObjectAttribute("", {
                            title: ibas.i18n.prop("bo_material_group"),
                            text: "{group}"
                        })
                    ],
                    type: sap.m.ListType.Active,
                })
            },
            itemPress: function (oEvent: any): void {
                var oItem: any = oEvent.getParameter("listItem");
                that.fireViewEvents(that.fetchMaterialAllInformationEvent,
                    oItem.getBindingContext().getObject()
                );
            }
        });
        // 添加列表自动查询事件
        openui5.utils.triggerNextResults({
            listener: that.tableMaterial,
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
        that.pageMaterial = new sap.m.Page("", {
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
                            that.fireViewEvents(that.editDataEvent,
                                // 获取表格选中的对象
                                openui5.utils.getSelecteds<bo.MaterialPriceList>(that.tableMaterial).firstOrDefault()
                            );
                        }
                    }),
                ]
            }),
            content: [that.tableMaterial]
        });
        // 物料价格
        that.tableMaterialPrice = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 12),
            rows: "{/rows}",
            selectionMode: sap.ui.table.SelectionMode.None,
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpriceitem_price"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "price"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialprice_currency"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "currency"
                    })
                }),
                new sap.ui.table.Column("", {
                    // 来源于哪条价格清单
                    label: ibas.i18n.prop("bo_materialpriceitem_objectkey"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "objectKey"
                    })
                })
            ]
        });
        // 物料库存
        that.tableMaterialInventory = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 12),
            rows: "{/rows}",
            selectionMode: sap.ui.table.SelectionMode.None,
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumenttype"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentType",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumententry"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentEntry",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialinventoryjournal_basedocumentlineid"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentLineId",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialinventoryjournal_direction"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "direction",
                        formatter(data: any): any {
                            return ibas.enums.describe(ibas.emDirection, data);
                        }
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialinventoryjournal_quantity"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "quantity",
                    })
                })
            ]
        });
        // 物料批次
        that.tableMaterialBatch = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 12),
            rows: "{/rows}",
            selectionMode: sap.ui.table.SelectionMode.None,
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_basedocumenttype"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentType",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_basedocumententry"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentEntry",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_basedocumentlineid"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentLineId",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_direction"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "direction",
                        formatter(data: any): any {
                            return ibas.enums.describe(ibas.emDirection, data);
                        }
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialbatchjournal_quantity"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "quantity",
                    })
                })
            ]
        });
        // 物料序列
        that.tableMaterialSerial = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 12),
            rows: "{/rows}",
            selectionMode: sap.ui.table.SelectionMode.None,
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_basedocumenttype"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentType",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_basedocumententry"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentEntry",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_basedocumentlineid"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "baseDocumentLineId",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialserialjournal_direction"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "direction",
                        formatter(data: any): any {
                            return ibas.enums.describe(ibas.emDirection, data);
                        }
                    })
                })
            ]
        });
        that.pageOverview = new sap.m.Page("", {
            showHeader: false,
            customHeader: new sap.m.Toolbar("", {
                content: [
                    /* new sap.m.MultiComboBox("", {
                        items: [
                            new sap.ui.core.Item("", {
                                text: "库存"
                            }),
                            new sap.ui.core.Item("", {
                                text: "批次"
                            }),
                            new sap.ui.core.Item("", {
                                text: "序列"
                            }),
                            new sap.ui.core.Item("", {
                                text: "价格"
                            }),
                        ]
                    }), */
                    /* new sap.m.ex.BOInput("", {
                        boText: "name",
                        boKey: "objectKey",
                        boCode: ibas.config.applyVariables(bo.BO_CODE_MATERIALPRICELIST),
                        repositoryName: bo.BO_REPOSITORY_MATERIALS,
                        valueHelpRequest: function (): void {
                            //
                        },
                        bindingValue: {
                            path: "priceList"
                        }
                    }), */
                ]
            }),
            content: [
                new sap.m.IconTabBar("", {
                    items: [
                        new sap.m.IconTabFilter("", {
                            text: ibas.i18n.prop("materials_func_materialpricelist"),
                            content: [
                                new sap.m.SearchField("", {
                                }),
                                that.tableMaterialPrice
                            ]
                        }),
                        new sap.m.IconTabFilter("", {
                            text: ibas.i18n.prop("materials_func_materialinventory"),
                            content: [
                                new sap.m.SearchField("", {
                                }),
                                new sap.m.Toolbar("", {
                                    content: [
                                        that.labelMaterialInventory = new sap.m.Label("", {
                                        }),
                                        new sap.m.ToolbarSeparator("", {}),
                                        new sap.m.MultiComboBox("", {
                                            width: "20%",
                                            Deselected: true,
                                            filterSecondaryValues: false,
                                            showSecondaryValues: true,
                                            placement: sap.m.PlacementType.Auto,
                                            selectionFinish: function (oEvent: any): void {
                                                let selectedItems: any = oEvent.getParameter("selectedItems");
                                                let messageText: any[] = [];
                                                for (let i: number = 0; i < selectedItems.length; i++) {
                                                    messageText.push(selectedItems[i].getText());
                                                }
                                                // that.groupsTranslateReports(messageText);
                                            },
                                            items: [
                                                new sap.ui.core.Item("", {
                                                    text: "默认全部仓库"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                that.tableMaterialInventory
                            ]
                        }),
                        new sap.m.IconTabFilter("", {
                            text: ibas.i18n.prop("materials_func_materialbatch"),
                            content: [
                                new sap.m.SearchField("", {
                                }),
                                that.tableMaterialBatch
                            ]
                        }),
                        new sap.m.IconTabFilter("", {
                            text: ibas.i18n.prop("materials_func_materialserial"),
                            content: [
                                new sap.m.SearchField("", {
                                }),
                                that.tableMaterialSerial
                            ]
                        })
                    ]
                })
            ]
        });
        return new sap.m.SplitContainer("", {
            masterPages: [
                that.pageMaterial,
            ],
            detailPages: [
                that.pageOverview
            ]
        });
    }
    /** 嵌入查询面板 */
    embedded(view: any): void {
        if (view instanceof sap.m.Toolbar) {
            view.setDesign(sap.m.ToolbarDesign.Transparent);
            view.setHeight("100%");
        }
        this.pageMaterial.addHeaderContent(view);
        this.pageMaterial.setShowHeader(true);
    }

    /** 显示物料数据 */
    showMaterials(datas: bo.Material[]): void {
        let done: boolean = false;
        let model: sap.ui.model.Model = this.tableMaterial.getModel(undefined);
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
            this.tableMaterial.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        }
        this.tableMaterial.setBusy(false);
    }

    /** 显示物料价格 */
    showMaterialPrices(datas: bo.MaterialPrice[]): void {
        this.tableMaterialPrice.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableMaterialPrice, datas);
    }

    /** 显示物料库存行 */
    /** 显示物料库存 */
    showMaterialInventoryJournal(itemdatas: bo.MaterialInventoryJournal[], datas: bo.MaterialInventory[]): void {
        this.tableMaterialInventory.setModel(new sap.ui.model.json.JSONModel({ rows: itemdatas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableMaterialInventory, itemdatas);
        let onHandCount: any = 0;
        let onCommitedCount: any = 0;
        let onOrderedCount: any = 0;
        for (let data of datas) {
            onHandCount += data.onHand;
            onCommitedCount += data.onCommited;
            onOrderedCount += data.onOrdered;
        }
        this.labelMaterialInventory.setText(ibas.strings.format("当前库存总量：{0}，当前仓库量：{1}，已承诺：{2}，已订购：{3}",
            onHandCount, 0, onCommitedCount, onOrderedCount), );
    }

    /** 显示物料批次 */
    showMaterialBatch(datas: bo.MaterialBatch[]): void {
        this.tableMaterialBatch.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableMaterialBatch, datas);
    }

    /** 显示物料序列 */
    showMaterialSerial(datas: bo.MaterialSerial[]): void {
        this.tableMaterialSerial.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableMaterialSerial, datas);
    }

    /** 记录上次查询条件，表格滚动时自动触发 */
    query(criteria: ibas.ICriteria): void {
        super.query(criteria);
        // 清除历史数据
        if (this.isDisplayed) {
            this.tableMaterial.setBusy(true);
            this.tableMaterial.setModel(null);
        }
    }
    private pageOverview: sap.m.Page;
}
