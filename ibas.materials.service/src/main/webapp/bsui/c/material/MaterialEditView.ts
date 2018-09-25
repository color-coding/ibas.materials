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
            /**
             * 编辑视图-物料
             */
            export class MaterialEditView extends ibas.BOEditView implements app.IMaterialEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 选择物料缺省仓库事件 */
                chooseMaterialWarehouseEvent: Function;
                /** 选择物料组事件 */
                chooseMaterialGroupEvent: Function;
                /** 上传图片事件 */
                uploadPictureEvent: Function;
                /** 绘制视图 */
                public draw(): any {
                    const that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                            }).bindProperty("value", {
                                path: "code",
                            }).bindProperty("editable", {
                                path: "series",
                                formatter(data: any): any {
                                    return data > 0 ? false : true;
                                }
                            }),
                            new sap.m.ex.SeriesSelect("", {
                                objectCode: ibas.config.applyVariables(bo.BO_CODE_MATERIAL),
                                bindingValue: {
                                    path: "series",
                                    type: "sap.ui.model.type.Integer",
                                }
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
                                path: "foreignName",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_itemtype") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(bo.emItemType),
                            }).bindProperty("selectedKey", {
                                path: "itemType",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_group") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseMaterialGroupEvent);
                                }
                            }).bindProperty("value", {
                                path: "group",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                            }).bindProperty("value", {
                                path: "barCode",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_picture"), }),
                            new sap.m.FlexBox("", {
                                width: "100%",
                                direction: sap.m.FlexDirection.Row,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    new sap.ui.unified.FileUploader("", {
                                        buttonOnly: false,
                                        multiple: false,
                                        uploadOnChange: false,
                                        iconOnly: true,
                                        width: "100%",
                                        style: "Transparent",
                                        icon: "sap-icon://upload",
                                        change: function (oEvent: sap.ui.base.Event): void {
                                            let files: File[] = oEvent.getParameter("files");
                                            if (ibas.objects.isNull(files) || files.length === 0) {
                                                return;
                                            }
                                            let fileData: FormData = new FormData();
                                            fileData.append("file", files[0]);
                                            that.fireViewEvents(that.uploadPictureEvent, fileData);
                                        },
                                    }).bindProperty("value", {
                                        path: "picture",
                                    }),
                                    new sap.m.Button("", {
                                        icon: "sap-icon://show",
                                        type: sap.m.ButtonType.Transparent,
                                        width: "auto",
                                        press: function (): void {
                                            let material: bo.IMaterial = that.form.getBindingContext().getObject();
                                            if (!ibas.objects.isNull(material)) {
                                                let lightBox: sap.m.LightBox = new sap.m.LightBox("", {
                                                    imageContent: [
                                                        new sap.m.LightBoxItem("", {
                                                            imageSrc: new bo.BORepositoryMaterials().toUrl(material.picture),
                                                            title: material.name,
                                                            subtitle: material.code,
                                                        })
                                                    ]
                                                });
                                                lightBox.open();
                                            }
                                        }
                                    }),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_remarks") }),
                            new sap.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("value", {
                                path: "remarks",
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_activated") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "activated",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_validdate") }),
                            new sap.m.DatePicker("", {
                                valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                            }).bindProperty("dateValue", {
                                path: "validDate"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_invaliddate") }),
                            new sap.m.DatePicker("", {
                                valueFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                                displayFormat: ibas.config.get(ibas.CONFIG_ITEM_FORMAT_DATE),
                            }).bindProperty("dateValue", {
                                path: "invalidDate"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseitem") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "purchaseItem",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesitem") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "salesItem",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryitem") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "inventoryItem",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "phantomItem",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_productunit") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "productUnit",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_inventory") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onhand") }),
                            new sap.m.Input("", {
                                editable: false,
                            }).bindProperty("value", {
                                path: "onHand",
                                type: new openui5.datatype.Quantity(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onordered") }),
                            new sap.m.Input("", {
                                editable: false,
                            }).bindProperty("value", {
                                path: "onOrdered",
                                type: new openui5.datatype.Quantity(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_oncommited") }),
                            new sap.m.Input("", {
                                editable: false,
                            }).bindProperty("value", {
                                path: "onCommited",
                                type: new openui5.datatype.Quantity(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryuom") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                            }).bindProperty("value", {
                                path: "inventoryUOM",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_serialmanagement") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "serialManagement",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_batchmanagement") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                            }).bindProperty("selectedKey", {
                                path: "batchManagement",
                                type: "sap.ui.model.type.Integer",
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_defaultwarehouse") }),
                            new sap.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseMaterialWarehouseEvent);
                                }
                            }).bindProperty("value", {
                                path: "defaultWarehouse"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_leadtime") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Number,
                            }).bindProperty("value", {
                                path: "leadTime",
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
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
                            openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), true);
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                    // 不可编辑：已批准，
                    if (data.approvalStatus === ibas.emApprovalStatus.APPROVED) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                        openui5.utils.changeFormEditable(this.form, false);
                    }
                }

                /** 显示数据 */
                showMaterial(data: bo.Material): void {
                    this.form.setModel(new sap.ui.model.json.JSONModel(data));
                    this.form.bindContext("/");
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.form, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                }

            }
        }
    }
}