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
import { IMaterialInventoryListView } from "../../../bsapp/material/index";

/**
 * 列表视图-物料库存
 */
export class MaterialInventoryListView extends ibas.BOQueryViewWithPanel implements IMaterialInventoryListView {
    /** 返回查询的对象 */
    get queryTarget(): any {
        return bo.MaterialInventory;
    }
    /** 新建数据事件 */
    newDataEvent: Function;
    /** 查看数据事件，参数：目标数据 */
    viewDataEvent: Function;
    /** 调用服务事件，参数1 IServicesShower显示服务者 */
    callServicesEvent: Function;
    /** 查询物料库存交易记录 */
    fetchInventoryJournalEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.tableInventory = new sap.m.List("", {
            inset: false,
            growing: false,
            growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            growingScrollToLoad: true,
            mode: sap.m.ListMode.SingleSelectMaster,
            items: {
                path: "/rows",
                template: new sap.m.ObjectListItem("", {
                    title: "{itemCode}",
                    firstStatus: new sap.m.ObjectStatus("", {
                        text: "{warehouse}"
                    }),
                    attributes: [
                        new sap.m.ObjectAttribute("", {
                            title: ibas.i18n.prop("bo_materialinventory_onhand"),
                            text: "{onHand}"
                        }),
                        new sap.m.ObjectAttribute("", {
                            title: ibas.i18n.prop("bo_materialinventory_oncommited"),
                            text: "{onCommited}"
                        }),
                        new sap.m.ObjectAttribute("", {
                            title: ibas.i18n.prop("bo_materialinventory_onordered"),
                            text: "{onOrdered}"
                        }),
                    ]
                })
            }
        });
        // 添加列表自动查询事件
        openui5.utils.triggerNextResults({
            listener: this.tableInventory,
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
        this.pageInventory = new sap.m.Page("", {
            showHeader: false,
            content: [this.tableInventory]
        });
        this.tableInventoryJournal = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rows: "{/rows}",
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
                }),
            ]
        });
        // 添加列表自动查询事件
        openui5.utils.triggerNextResults({
            listener: this.tableInventoryJournal,
            next(data: any): void {
                if (ibas.objects.isNull(that.lastJournalCriteria)) {
                    return;
                }
                let criteria: ibas.ICriteria = that.lastJournalCriteria.next(data);
                if (ibas.objects.isNull(criteria)) {
                    return;
                }
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                that.fireViewEvents(that.fetchInventoryJournalEvent, criteria);
            }
        });
        this.searchInventoryJournal = new sap.m.SearchField("", {
            search(): void {
                let Inventory: bo.MaterialInventory =
                    openui5.utils.getSelecteds<bo.MaterialInventory>(that.tableInventory).firstOrDefault();
                if (ibas.objects.isNull(Inventory)) {
                    that.application.viewShower.messages({
                        title: that.application.description,
                        message: ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_materialInventory")),
                        type: ibas.emMessageType.WARNING
                    });
                    return;
                }
                let condition: ibas.ICondition;
                let criteria: ibas.ICriteria = that.getInventoryJournalCriteria().clone();
                let search: string = that.searchInventoryJournal.getValue();
                if (!ibas.strings.isEmpty(search)) {
                    for (let item of criteria.conditions) {
                        if (ibas.strings.isEmpty(item.alias)) {
                            item.value = search;
                        }
                    }
                }
                condition = criteria.conditions.create();
                condition.bracketOpen = 1;
                condition.alias = bo.MaterialInventoryJournal.PROPERTY_ITEMCODE_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = Inventory.itemCode;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryJournal.PROPERTY_WAREHOUSE_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = Inventory.warehouse;
                condition.bracketClose = 1;
                that.fireViewEvents(that.fetchInventoryJournalEvent, criteria);
                that.lastJournalCriteria = criteria;
                that.tableInventoryJournal.setFirstVisibleRow(0);
                that.tableInventoryJournal.setModel(null);
            }
        });
        this.pageInventoryJournal = new sap.m.Page("", {
            showHeader: true,
            customHeader: new sap.m.Toolbar("", {
                content: [
                    this.searchInventoryJournal,
                    new sap.m.Button("", {
                        icon: "sap-icon://filter",
                        type: sap.m.ButtonType.Transparent,
                        press: function (): void {
                            ibas.servicesManager.runApplicationService<ibas.ICriteriaEditorServiceContract, ibas.ICriteria>({
                                proxy: new ibas.CriteriaEditorServiceProxy({
                                    target: bo.MaterialInventoryJournal,
                                    criteria: that.getInventoryJournalCriteria(),
                                }),
                                onCompleted(result: ibas.ICriteria): void {
                                    that.journalCriteria = result;
                                }
                            });
                        }
                    }),
                ]
            }),
            content: [
                this.tableInventoryJournal
            ]
        });
        return new sap.m.SplitContainer("", {
            masterPages: [
                this.pageInventory,
            ],
            detailPages: [
                this.pageInventoryJournal
            ],
        });
    }
    /** 嵌入查询面板 */
    embedded(view: any): void {
        if (view instanceof sap.m.Toolbar) {
            view.setDesign(sap.m.ToolbarDesign.Transparent);
            view.setHeight("100%");
        }
        this.pageInventory.addHeaderContent(view);
        this.pageInventory.setShowHeader(true);
    }
    private pageInventory: sap.m.Page;
    private tableInventory: sap.m.List;

    /** 显示物料库存数据 */
    showInventories(datas: bo.MaterialInventory[]): void {
        let done: boolean = false;
        let model: sap.ui.model.Model = this.tableInventory.getModel(undefined);
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
            this.tableInventory.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        }
        this.tableInventory.setBusy(false);
    }
    /** 记录上次查询条件，表格滚动时自动触发 */
    query(criteria: ibas.ICriteria): void {
        super.query(criteria);
        // 清除历史数据
        if (this.isDisplayed) {
            this.tableInventory.setBusy(true);
            this.tableInventory.setModel(null);
        }
    }
    private pageInventoryJournal: sap.m.Page;
    private searchInventoryJournal: sap.m.SearchField;
    private tableInventoryJournal: sap.ui.table.Table;
    /** 上一次使用的价格查询 */
    private lastJournalCriteria: ibas.ICriteria;
    /** 基础价格查询 */
    private journalCriteria: ibas.ICriteria;
    private getInventoryJournalCriteria(): ibas.ICriteria {
        if (!ibas.objects.isNull(this.journalCriteria)) {
            return this.journalCriteria;
        }
        let condition: ibas.ICondition;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
        this.journalCriteria = criteria;
        return this.journalCriteria;
    }
    /** 显示物料库存交易数据 */
    showInventoryJournals(datas: bo.MaterialInventoryJournal[]): void {
        let done: boolean = false;
        let model: sap.ui.model.Model = this.tableInventoryJournal.getModel(undefined);
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
            this.tableInventoryJournal.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        }
        this.tableInventoryJournal.setBusy(false);
    }
}
