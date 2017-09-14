/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { IMaterialEditView } from "../../../bsapp/material/index";

/**
 * 编辑视图-物料
 */
export class MaterialEditView extends ibas.BOEditView implements IMaterialEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 选择物料缺省仓库事件 */
    chooseMaterialWarehouseEvent: Function;
    /** 绘制视图 */
    public darw(): any {
        const that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
            singleContainerFullSize: false,
            adjustLabelSpan: false,
            labelSpanL: 2,
            labelSpanM: 2,
            labelSpanS: 12,
            columnsXL: 2,
            columnsL: 2,
            columnsM: 1,
            columnsS: 1,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_base_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "code",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_name") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "name",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_foreignname") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "ForeignName",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_itemtype") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emItemType),
                }).bindProperty("selectedKey", {
                    path: "ItemType",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_group") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "Group",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "BarCode",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_type_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_activated") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "Activated",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseitem") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "PurchaseItem",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesitem") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "SalesItem",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryitem") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "InventoryItem",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_fixedassets") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "FixedAssets",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_general_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_remarks") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "Remarks",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_picture") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "Picture",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_oncommited") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                }).bindProperty("value", {
                    path: "OnCommited",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onhand") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                }).bindProperty("value", {
                    path: "OnHand",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onorder") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Number,
                }).bindProperty("value", {
                    path: "OnOrder",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_uom") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "UOM",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_onHand_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_minimuminventory") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "MinimumInventory",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_defaultwarehouse") }),
                new sap.m.Input("", {
                    placeholder: ibas.i18n.prop("bo_material_defaultwarehouse"),
                    tooltip: ibas.i18n.prop("bo_material_defaultwarehouse"),
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseMaterialWarehouseEvent);
                    }
                }).bindProperty("value", {
                    path: "DefaultWarehouse"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "PhantomItem",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_serialmanagement") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "SerialManagement",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_material_batchmanagement") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "BatchManagement",
                    type: "sap.ui.model.type.Integer",
                }),
                // new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_technical_information") }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_createdate") }),
                // new sap.m.DatePicker("", {
                //     valueFormat: "yyyy-MM-dd",
                // }).bindProperty("dateValue", {
                //     path: "CreateDate"
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_createusersign") }),
                // new sap.m.Input("", {
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "CreateUserSign",
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_updatedate") }),
                // new sap.m.DatePicker("", {
                //     valueFormat: "yyyy-MM-dd",
                // }).bindProperty("dateValue", {
                //     path: "UpdateDate"
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_updateusersign") }),
                // new sap.m.Input("", {
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "UpdateUserSign",
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_objectcode") }),
                // new sap.m.Input("", {
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "ObjectCode",
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_docentry") }),
                // new sap.m.Input("", {
                //     editable: false,
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "DocEntry",
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_loginst") }),
                // new sap.m.Input("", {
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "LogInst",
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_createactionid") }),
                // new sap.m.Input("", {
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "CreateActionId",
                // }),
                // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_updateactionid") }),
                // new sap.m.Input("", {
                //     type: sap.m.InputType.Text,
                // }).bindProperty("value", {
                //     path: "UpdateActionId",
                // }),
            ],
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("sys_shell_data_new"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://create",
                        buttonMode: sap.m.MenuButtonMode.Split,
                        defaultAction: function (): void {
                            // 触发新建对象
                            that.fireViewEvents(that.createDataEvent, false);
                        },
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("sys_shell_data_new"),
                                    icon: "sap-icon://create"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("sys_shell_data_clone"),
                                    icon: "sap-icon://copy"
                                }),
                            ],
                            itemSelected: function (event: any): void {
                                let item: any = event.getParameter("item");
                                if (item instanceof sap.m.MenuItem) {
                                    if (item.getIcon() === "sap-icon://copy") {
                                        // 触发克隆对象
                                        that.fireViewEvents(that.createDataEvent, true);
                                    } else {
                                        // 触发新建对象
                                        that.fireViewEvents(that.createDataEvent, false);
                                    }
                                }
                            }
                        })
                    }),
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    /** 改变视图状态 */
    private changeViewStatus(data: bo.Material): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
        if (data.approvalStatus === ibas.emApprovalStatus.APPROVED) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
            utils.changeFormEditable(this.form, false);
        }
    }

    /** 显示数据 */
    showMaterial(data: bo.Material): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        this.form.bindObject("/");
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
}
