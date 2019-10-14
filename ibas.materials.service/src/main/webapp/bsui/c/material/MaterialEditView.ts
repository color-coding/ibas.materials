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
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                })
                            }).bindProperty("editable", {
                                path: "series",
                                formatter(data: any): any {
                                    return data > 0 ? false : true;
                                }
                            }),
                            new sap.extension.m.SeriesSelect("", {
                                objectCode: bo.BO_CODE_MATERIAL,
                            }).bindProperty("bindingValue", {
                                path: "series",
                                type: new sap.extension.data.Numeric()
                            }).bindProperty("enabled", {
                                path: "isNew",
                                formatter(data: any): any {
                                    return !!data ? true : false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_foreignname") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "foreignName",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_sign") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "sign",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_itemtype") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emItemType
                            }).bindProperty("bindingValue", {
                                path: "itemType",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emItemType
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_group") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.MaterialGroup,
                                    key: bo.MaterialGroup.PROPERTY_CODE_NAME,
                                    text: bo.MaterialGroup.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseMaterialGroupEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "group",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_barcode") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "barCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 15
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_picture"), }),
                            new sap.m.FlexBox("", {
                                width: "100%",
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    new sap.extension.m.Input("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        valueHelpRequest: function (): void {
                                            ibas.files.open((files) => {
                                                if (files.length > 0) {
                                                    let fileData: FormData = new FormData();
                                                    fileData.append("file", files[0]);
                                                    that.fireViewEvents(that.uploadPictureEvent, fileData);
                                                }
                                            }, { accept: "image/gif,image/jpeg,image/jpg,image/png" });
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "picture",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 250
                                        })
                                    }),
                                    new sap.m.Button("", {
                                        icon: "sap-icon://show",
                                        width: "auto",
                                        type: sap.m.ButtonType.Transparent,
                                        press: function (): void {
                                            let material: bo.IMaterial = that.page.getBindingContext().getObject();
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_preferredvendor") }),
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
                                repository: businesspartner.bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: businesspartner.bo.Supplier,
                                    key: businesspartner.bo.Supplier.PROPERTY_CODE_NAME,
                                    text: businesspartner.bo.Supplier.PROPERTY_NAME_NAME,
                                },
                                criteria: [
                                    new ibas.Condition(businesspartner.bo.Supplier.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES.toString())
                                ]
                            }).bindProperty("bindingValue", {
                                path: "preferredVendor",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_status") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_validdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "validDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_invaliddate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "invalidDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseitem") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "purchaseItem",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesitem") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "salesItem",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryitem") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "inventoryItem",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "phantomItem",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_productunit") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "productUnit",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchasetaxgroup") }),
                            new component.TaxGroupInput("", {
                                criteria: [
                                    new ibas.Condition(accounting.bo.TaxGroup.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, accounting.bo.emTaxGroupCategory.INPUT)
                                ]
                            }).bindProperty("bindingValue", {
                                path: "purchaseTaxGroup",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salestaxgroup") }),
                            new component.TaxGroupInput("", {
                                criteria: [
                                    new ibas.Condition(accounting.bo.TaxGroup.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, accounting.bo.emTaxGroupCategory.OUTPUT)
                                ]
                            }).bindProperty("bindingValue", {
                                path: "salesTaxGroup",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_inventory") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onhand") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "onHand",
                                type: new sap.extension.data.Quantity()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_oncommited") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "onCommited",
                                type: new sap.extension.data.Quantity()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onordered") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "onOrdered",
                                type: new sap.extension.data.Quantity()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_minimuminventory") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "minimumInventory",
                                type: new sap.extension.data.Quantity()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_minimumorderquantity") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "minimumOrderQuantity",
                                type: new sap.extension.data.Quantity()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryuom") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "inventoryUOM",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_serialmanagement") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "serialManagement",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_batchmanagement") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "batchManagement",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_defaultwarehouse") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: bo.Warehouse,
                                    key: bo.Warehouse.PROPERTY_CODE_NAME,
                                    text: bo.Warehouse.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseMaterialWarehouseEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "defaultWarehouse",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_leadtime") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "leadTime",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.Material.BUSINESS_OBJECT_CODE,
                        },
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
                        content: [
                            formTop,
                        ]
                    });
                }
                private page: sap.extension.m.Page;

                /** 显示数据 */
                showMaterial(data: bo.Material): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }

            }
        }
    }
}