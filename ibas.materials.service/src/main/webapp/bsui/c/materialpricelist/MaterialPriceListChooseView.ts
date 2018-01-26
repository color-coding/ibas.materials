/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IMaterialPriceListChooseView } from "../../../bsapp/materialpricelist/index";
/**
 * 选择视图-物料批次
 */
export class MaterialPriceListChooseView extends ibas.BOChooseView implements IMaterialPriceListChooseView {
    /** 返回查询的对象 */
    get queryTarget(): any {
        return bo.MaterialPriceList;
    }
    /** 绘制视图 */
    draw(): any {
        let that: this = this;
        this.table = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            selectionMode: openui5.utils.toSelectionMode(this.chooseType),
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_objectkey"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "objectKey",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_name"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "name",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_currency"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "currency",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_basedonlist"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "basedOnList",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_factor"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "factor",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_validdate"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "validDate",
                        type: "sap.ui.model.type.Date",
                        formatOptions: {
                            style: "short"
                        }
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_materialpricelist_invaliddate"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "invalidDate",
                        type: "sap.ui.model.type.Date",
                        formatOptions: {
                            style: "short"
                        }
                    }),
                }),
            ]
        });
        // 调整选择样式风格
        openui5.utils.changeSelectionStyle(this.table, this.chooseType);
        // 添加列表自动查询事件
        openui5.utils.triggerNextResults({
            listener: this.table,
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
        return new sap.m.Dialog("", {
            title: this.title,
            type: sap.m.DialogType.Standard,
            state: sap.ui.core.ValueState.None,
            stretchOnPhone: true,
            horizontalScrolling: true,
            verticalScrolling: true,
            content: [this.table],
            buttons: [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_data_choose"),
                    type: sap.m.ButtonType.Transparent,
                    // icon: "sap-icon://accept",
                    press: function (): void {
                        that.fireViewEvents(that.chooseDataEvent,
                            // 获取表格选中的对象
                            openui5.utils.getTableSelecteds<bo.MaterialPriceList>(that.table)
                        );
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_exit"),
                    type: sap.m.ButtonType.Transparent,
                    // icon: "sap-icon://inspect-down",
                    press: function (): void {
                        that.fireViewEvents(that.closeEvent);
                    }
                }),
            ]
        });
    }
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: bo.MaterialPriceList[]): void {
        let done: boolean = false;
        let model: sap.ui.model.Model = this.table.getModel(undefined);
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
            this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        }
        this.table.setBusy(false);
    }

    /** 记录上次查询条件，表格滚动时自动触发 */
    query(criteria: ibas.ICriteria): void {
        super.query(criteria);
        // 清除历史数据
        if (this.isDisplayed) {
            this.table.setBusy(true);
            this.table.setFirstVisibleRow(0);
            this.table.setModel(null);
        }
    }
}