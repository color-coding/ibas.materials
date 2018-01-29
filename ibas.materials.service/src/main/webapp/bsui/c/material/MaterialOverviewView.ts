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
    /** 编辑物料事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 新建物料事件 */
    newDataEvent: Function;
    /** 查看物料事件，参数：目标数据 */
    viewDataEvent: Function;
    /** 调用服务事件，参数1 IServicesShower显示服务者 */
    callServicesEvent: Function;
    /** 绘制视图 */
    draw(): any {
        let that: this = this;
        this.tableMaterial = new sap.m.List("", {
            inset: false,
            growing: true,
            growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            growingScrollToLoad: true,
            mode: sap.m.ListMode.SingleSelectMaster,
            items: {
                path: "/rows",
                template: new sap.m.ObjectListItem("", {
                    title: "{name}",
                    firstStatus: new sap.m.ObjectStatus("", {
                        text: "{group}"
                    }),
                    markLocked: {
                        path: "activated",
                        formatter(data: any): any {
                            if (data === ibas.emYesNo.NO) {
                                return true;
                            }
                            return false;
                        }
                    },
                    attributes: [
                        new sap.m.ObjectAttribute("", {
                            title: ibas.i18n.prop("bo_material_code"),
                            text: "{code}"
                        }),
                    ]
                })
            }
        });
        // 添加列表自动查询事件
        openui5.utils.triggerNextResults({
            listener: this.tableMaterial,
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
        this.pageMaterial = new sap.m.Page("", {
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
            content: [this.tableMaterial]
        });
        this.pageOverview = new sap.m.Page("", {
            showHeader: true,
            customHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.MultiComboBox("", {

                    }),
                    new sap.m.ex.BOInput("", {
                        boText: "name",
                        boKey: "objectKey",
                        boCode: ibas.config.applyVariables(bo.BO_CODE_MATERIALPRICELIST),
                        repositoryName: bo.BO_REPOSITORY_MATERIALS,
                        valueHelpRequest: function (): void {
                        },
                        bindingValue: {
                            path: "priceList"
                        }
                    }),
                ]
            }),
            content: [
            ]
        });
        return new sap.m.SplitContainer("", {
            masterPages: [
                this.pageMaterial,
            ],
            detailPages: [
                this.pageOverview
            ],
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
    private pageMaterial: sap.m.Page;
    private tableMaterial: sap.m.List;

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
