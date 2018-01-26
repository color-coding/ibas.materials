/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IMaterialPriceListEditView } from "../../../bsapp/materialpricelist/index";

/**
 * 编辑视图-物料价格清单
 */
export class MaterialPriceListEditView extends ibas.BODialogView implements IMaterialPriceListEditView {
    /** 保存数据事件 */
    saveDataEvent: Function;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 选择基于的价格清单 */
    chooseBasedOnMaterialPriceListEvent: Function;

    /** 绘制视图 */
    draw(): any {
        let that: this = this;
        this.layoutMain = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_objectkey") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "objectKey",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_name") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "name",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_group") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "group",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_currency") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "currency",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_basedonlist") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseBasedOnMaterialPriceListEvent);
                    }
                }).bindProperty("value", {
                    path: "basedOnList",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_factor") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "factor",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_validdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("dateValue", {
                    path: "validDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialpricelist_invaliddate") }),
                new sap.m.DatePicker("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("dateValue", {
                    path: "invalidDate"
                }),
            ]
        });
        return new sap.m.Dialog("", {
            title: this.title,
            type: sap.m.DialogType.Standard,
            state: sap.ui.core.ValueState.None,
            stretchOnPhone: true,
            horizontalScrolling: true,
            verticalScrolling: true,
            content: [this.layoutMain],
            buttons: [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_data_delete"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://delete",
                    press: function (): void {
                        that.fireViewEvents(that.deleteDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_data_save"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://save",
                    press: function (): void {
                        that.fireViewEvents(that.saveDataEvent);
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

    private layoutMain: sap.ui.layout.form.SimpleForm;

    /** 显示数据 */
    showMaterialPriceList(data: bo.MaterialPriceList): void {
        this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
        this.layoutMain.bindObject("/");
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.layoutMain, data);
    }
}
