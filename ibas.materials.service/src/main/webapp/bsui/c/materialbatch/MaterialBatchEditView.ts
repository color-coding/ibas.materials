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
import { IMaterialBatchEditView } from "../../../bsapp/materialbatch/index";

/**
 * 编辑视图-物料批次
 */
export class MaterialBatchEditView extends ibas.BODialogView implements IMaterialBatchEditView {
    /** 保存数据事件 */
    saveDataEvent: Function;

    /** 绘制视图 */
    draw(): any {
        let that: this = this;
        this.layoutMain = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_itemcode") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "itemCode",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_warehouse") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "warehouse",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_batchcode") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "batchCode",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_locked") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "locked",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_quantity") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "quantity",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_supplierserial") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "supplierSerial",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_manufacturingdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("dateValue", {
                    path: "manufacturingDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_expirationdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("dateValue", {
                    path: "expirationDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_materialbatch_admissiondate") }),
                new sap.m.DatePicker("", {
                    valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                    displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                }).bindProperty("dateValue", {
                    path: "admissionDate"
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
    showMaterialBatch(data: bo.MaterialBatch): void {
        this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
        this.layoutMain.bindObject("/");
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.layoutMain, data);
    }
}
