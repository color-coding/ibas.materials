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
                /** 选择物料单位事件 */
                chooseMaterialUOMEvent: Function;
                /** 选择物废品率事件 */
                chooseMaterialScrapEvent: Function;
                /** 选择计划员事件 */
                chooseSchedulerEvent: Function;
                /** 选择物料单位换算率事件 */
                editMaterialUnitRateEvent: Function;
                /** 编辑物料替代事件 */
                editMaterialSubstituteEvent: Function;
                /** 选择总账科目事件 */
                chooseLedgerAccountEvent: Function;
                /** 更多信息 */
                overviewEvent: Function;
                /** 绘制视图 */
                public draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_code") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 50
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
                            }).bindProperty("editable", {
                                path: "isNew",
                                formatter(data: any): any {
                                    return data === false ? false : true;
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_itemtype") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emItemType
                            }).bindProperty("bindingValue", {
                                path: "itemType",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emItemType
                                })
                            }).bindProperty("editable", {
                                path: "referenced",
                                formatter(data: any): boolean {
                                    if (data === ibas.emYesNo.YES) {
                                        return false;
                                    }
                                    return true;
                                }
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
                            new sap.m.Toolbar("", { visible: false }),
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_material_phantomitem") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "phantomItem",
                                type: new sap.extension.data.YesNo()
                            }).bindProperty("editable", {
                                path: "referenced",
                                formatter(data: any): boolean {
                                    if (data === ibas.emYesNo.YES) {
                                        return false;
                                    }
                                    return true;
                                }
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.IconTabBar("", {
                                headerBackgroundDesign: sap.m.BackgroundDesign.Transparent,
                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                expandable: false,
                                items: [
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("materials_title_general"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_sign") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "sign",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 60
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
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_manufacturer") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "manufacturer",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 100
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_remarks") }),
                                                    new sap.extension.m.TextArea("", {
                                                        rows: 3,
                                                    }).bindProperty("bindingValue", {
                                                        path: "remarks",
                                                        type: new sap.extension.data.Alphanumeric()
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_serialmanagement") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "serialManagement",
                                                        type: new sap.extension.data.YesNo()
                                                    }).bindProperty("editable", {
                                                        path: "onHand",
                                                        formatter(data: any): boolean {
                                                            // 有库存不能改此项
                                                            if (data > 0) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_batchmanagement") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "batchManagement",
                                                        type: new sap.extension.data.YesNo()
                                                    }).bindProperty("editable", {
                                                        path: "onHand",
                                                        formatter(data: any): boolean {
                                                            // 有库存不能改此项
                                                            if (data > 0) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.i18n.prop("bo_material_versionmanagement"),
                                                        visible: materials.config.isEnableMaterialVersions(),
                                                    }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo,
                                                        visible: materials.config.isEnableMaterialVersions(),
                                                    }).bindProperty("bindingValue", {
                                                        path: "versionManagement",
                                                        type: new sap.extension.data.YesNo(),
                                                    }).bindProperty("editable", {
                                                        parts: [
                                                            {
                                                                path: "serialManagement"
                                                            }, {
                                                                path: "batchManagement"
                                                            }
                                                        ],
                                                        formatter(serial: ibas.emYesNo, batch: ibas.emYesNo): boolean {
                                                            // 仅序列号批次可版本管理
                                                            if (serial > 0 || batch > 0) {
                                                                return true;
                                                            }
                                                            return false;
                                                        }
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_picture"), }),
                                                    new sap.m.FlexBox("", {
                                                        width: "100%",
                                                        justifyContent: sap.m.FlexJustifyContent.Start,
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                                showValueHelp: true,
                                                                valueHelpRequest: function (): void {
                                                                    ibas.files.open((files) => {
                                                                        if (files.length > 0) {
                                                                            let fileData: FormData = new FormData();
                                                                            fileData.append("file", files[0], encodeURI(files[0].name));
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
                                                                width: "auto",
                                                                icon: "sap-icon://show",
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
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("materials_title_inventory"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onhand") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                    }).bindProperty("bindingValue", {
                                                        path: "onHand",
                                                        type: new sap.extension.data.Quantity()
                                                    }),
                                                    //  new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryuom") }),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseMaterialUOMEvent, bo.Material.PROPERTY_INVENTORYUOM_NAME);
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "inventoryUOM",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }).bindProperty("editable", {
                                                        parts: [
                                                            {
                                                                path: "onHand",
                                                            },
                                                            {
                                                                path: "onCommited",
                                                            },
                                                            {
                                                                path: "onOrdered",
                                                            },
                                                            {
                                                                path: "onReserved",
                                                            }
                                                        ],
                                                        formatter(onHand: number, onCommited: number, onOrdered: number, onReserved: number): boolean {
                                                            // 有库存不能改此项
                                                            if (onHand > 0) {
                                                                return false;
                                                            } else if (onCommited > 0) {
                                                                return false;
                                                            } else if (onOrdered > 0) {
                                                                return false;
                                                            } else if (onReserved > 0) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.strings.format("{0}/{1}",
                                                            ibas.i18n.prop("bo_material_minimuminventory"),
                                                            ibas.i18n.prop("bo_material_maximuminventory"),
                                                        )
                                                    }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "minimumInventory",
                                                                type: new sap.extension.data.Quantity()
                                                            }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "maximumInventory",
                                                                type: new sap.extension.data.Quantity()
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
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
                                                    new sap.m.Label("", {
                                                        text: ibas.strings.format("{0}/{1}/{2}",
                                                            ibas.i18n.prop("bo_material_length"),
                                                            ibas.i18n.prop("bo_material_width"),
                                                            ibas.i18n.prop("bo_material_height")
                                                        )
                                                    }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryLength",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryWidth",
                                                                type: new sap.extension.data.Measurement(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryHeight",
                                                                type: new sap.extension.data.Measurement(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_SIZE)
                                                                ]
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventorySizeUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_volume") }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                                editable: {
                                                                    parts: [
                                                                        {
                                                                            path: "inventoryLength",
                                                                        },
                                                                        {
                                                                            path: "inventoryWidth",
                                                                        },
                                                                        {
                                                                            path: "inventoryHeight",
                                                                        },
                                                                    ],
                                                                    formatter(length: number, width: number, height: number): boolean {
                                                                        if (length > 0) {
                                                                            return false;
                                                                        } if (width > 0) {
                                                                            return false;
                                                                        } if (height > 0) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryVolume",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_VOLUME)
                                                                ],
                                                                editable: {
                                                                    parts: [
                                                                        {
                                                                            path: "inventoryLength",
                                                                        },
                                                                        {
                                                                            path: "inventoryWidth",
                                                                        },
                                                                        {
                                                                            path: "inventoryHeight",
                                                                        },
                                                                    ],
                                                                    formatter(length: number, width: number, height: number): boolean {
                                                                        if (length > 0) {
                                                                            return false;
                                                                        } if (width > 0) {
                                                                            return false;
                                                                        } if (height > 0) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryVolumeUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_weight") }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryWeight",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_WEIGHT)
                                                                ]
                                                            }).bindProperty("bindingValue", {
                                                                path: "inventoryWeightUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_inventoryitem") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "inventoryItem",
                                                        type: new sap.extension.data.YesNo()
                                                    }).bindProperty("editable", {
                                                        path: "referenced",
                                                        formatter(data: any): boolean {
                                                            if (data === ibas.emYesNo.YES) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_managebywarehouse") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "manageByWarehouse",
                                                        type: new sap.extension.data.YesNo(),
                                                    }).bindProperty("editable", {
                                                        path: "referenced",
                                                        formatter(data: any): boolean {
                                                            if (data === ibas.emYesNo.YES) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_avgprice") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                    }).bindProperty("bindingValue", {
                                                        path: "avgPrice",
                                                        type: new sap.extension.data.Quantity(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_valuationmethod") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: bo.emValuationMethod
                                                    }).bindProperty("bindingValue", {
                                                        path: "valuationMethod",
                                                        type: new sap.extension.data.Enum({
                                                            enumType: bo.emValuationMethod
                                                        }),
                                                    }).bindProperty("editable", {
                                                        path: "onHand",
                                                        formatter(data: any): boolean {
                                                            // 有库存不能改此项
                                                            if (data > 0) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("materials_title_purchase"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_onordered") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                    }).bindProperty("bindingValue", {
                                                        parts: [
                                                            {
                                                                path: "onOrdered",
                                                                type: new sap.extension.data.Quantity()
                                                            },
                                                            {
                                                                path: "inventoryUOM",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            },
                                                        ]
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.strings.format("{0}/{1}",
                                                            ibas.i18n.prop("bo_material_minimumorderquantity"),
                                                            ibas.i18n.prop("bo_material_ordermultiple")
                                                        )
                                                    }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "minimumOrderQuantity",
                                                                type: new sap.extension.data.Quantity()
                                                            }),
                                                            // new sap.m.Label("", { text: ibas.i18n.prop("bo_material_ordermultiple") }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "orderMultiple",
                                                                type: new sap.extension.data.Quantity(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_leadtime") }),
                                                    new sap.extension.m.Input("", {

                                                    }).bindProperty("bindingValue", {
                                                        path: "leadTime",
                                                        type: new sap.extension.data.Numeric()
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
                                                    new sap.m.Label("", {
                                                        text: ibas.strings.format("{0}/{1}/{2}",
                                                            ibas.i18n.prop("bo_material_length"),
                                                            ibas.i18n.prop("bo_material_width"),
                                                            ibas.i18n.prop("bo_material_height")
                                                        )
                                                    }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseLength",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseWidth",
                                                                type: new sap.extension.data.Measurement(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseHeight",
                                                                type: new sap.extension.data.Measurement(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_SIZE)
                                                                ]
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseSizeUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_volume") }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                                editable: {
                                                                    parts: [
                                                                        {
                                                                            path: "purchaseLength",
                                                                        },
                                                                        {
                                                                            path: "purchaseWidth",
                                                                        },
                                                                        {
                                                                            path: "purchaseHeight",
                                                                        },
                                                                    ],
                                                                    formatter(length: number, width: number, height: number): boolean {
                                                                        if (length > 0) {
                                                                            return false;
                                                                        } if (width > 0) {
                                                                            return false;
                                                                        } if (height > 0) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseVolume",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_VOLUME)
                                                                ],
                                                                editable: {
                                                                    parts: [
                                                                        {
                                                                            path: "purchaseLength",
                                                                        },
                                                                        {
                                                                            path: "purchaseWidth",
                                                                        },
                                                                        {
                                                                            path: "purchaseHeight",
                                                                        },
                                                                    ],
                                                                    formatter(length: number, width: number, height: number): boolean {
                                                                        if (length > 0) {
                                                                            return false;
                                                                        } if (width > 0) {
                                                                            return false;
                                                                        } if (height > 0) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseVolumeUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_weight") }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseWeight",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_WEIGHT)
                                                                ]
                                                            }).bindProperty("bindingValue", {
                                                                path: "purchaseWeightUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseitem") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "purchaseItem",
                                                        type: new sap.extension.data.YesNo()
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_purchaseuom") }),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseMaterialUOMEvent, bo.Material.PROPERTY_PURCHASEUOM_NAME);
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "purchaseUOM",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
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
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_reserveexcessordered") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "reserveExcessOrdered",
                                                        type: new sap.extension.data.YesNo()
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("materials_title_sales"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_oncommited") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                    }).bindProperty("bindingValue", {
                                                        parts: [
                                                            {
                                                                path: "onCommited",
                                                                type: new sap.extension.data.Quantity()
                                                            },
                                                            {
                                                                path: "inventoryUOM",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            },
                                                        ]
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.strings.format("{0}/{1}/{2}",
                                                            ibas.i18n.prop("bo_material_length"),
                                                            ibas.i18n.prop("bo_material_width"),
                                                            ibas.i18n.prop("bo_material_height")
                                                        )
                                                    }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesLength",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesWidth",
                                                                type: new sap.extension.data.Measurement(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesHeight",
                                                                type: new sap.extension.data.Measurement(),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_SIZE)
                                                                ]
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesSizeUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_volume") }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                                editable: {
                                                                    parts: [
                                                                        {
                                                                            path: "salesLength",
                                                                        },
                                                                        {
                                                                            path: "salesWidth",
                                                                        },
                                                                        {
                                                                            path: "salesHeight",
                                                                        },
                                                                    ],
                                                                    formatter(length: number, width: number, height: number): boolean {
                                                                        if (length > 0) {
                                                                            return false;
                                                                        } if (width > 0) {
                                                                            return false;
                                                                        } if (height > 0) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesVolume",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_VOLUME)
                                                                ],
                                                                editable: {
                                                                    parts: [
                                                                        {
                                                                            path: "salesLength",
                                                                        },
                                                                        {
                                                                            path: "salesWidth",
                                                                        },
                                                                        {
                                                                            path: "salesHeight",
                                                                        },
                                                                    ],
                                                                    formatter(length: number, width: number, height: number): boolean {
                                                                        if (length > 0) {
                                                                            return false;
                                                                        } if (width > 0) {
                                                                            return false;
                                                                        } if (height > 0) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }
                                                                }
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesVolumeUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_weight") }),
                                                    new sap.m.HBox("", {
                                                        width: "100%",
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        items: [
                                                            new sap.extension.m.Input("", {
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesWeight",
                                                                type: new sap.extension.data.Measurement(),
                                                            }),
                                                            new sap.extension.m.SelectionInput("", {
                                                                showValueHelp: true,
                                                                repository: bo.BORepositoryMaterials,
                                                                dataInfo: {
                                                                    type: bo.Unit,
                                                                    key: bo.Unit.PROPERTY_SYMBOL_NAME,
                                                                    text: bo.Unit.PROPERTY_SYMBOL_NAME
                                                                },
                                                                criteria: [
                                                                    new ibas.Condition(bo.Unit.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, bo.Unit.CATEGORY_WEIGHT)
                                                                ]
                                                            }).bindProperty("bindingValue", {
                                                                path: "salesWeightUnit",
                                                                type: new sap.extension.data.Alphanumeric({
                                                                    maxLength: 8
                                                                }),
                                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                                        ]
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesitem") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "salesItem",
                                                        type: new sap.extension.data.YesNo()
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_salesuom") }),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseMaterialUOMEvent, bo.Material.PROPERTY_SALESUOM_NAME);
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "salesUOM",
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
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_productunit") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "productUnit",
                                                        type: new sap.extension.data.YesNo()
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("materials_title_production"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_darwingnumber") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "darwingNumber",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 60
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_matchcode") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "matchCode",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 60
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_procurementmethod") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: bo.emProcurementMethod
                                                    }).bindProperty("bindingValue", {
                                                        path: "procurementMethod",
                                                        type: new sap.extension.data.Enum({
                                                            enumType: bo.emProcurementMethod
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_lotsize") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "lotSize",
                                                        type: new sap.extension.data.Quantity(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_issuemethod") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: bo.emIssueMethod
                                                    }).bindProperty("bindingValue", {
                                                        path: "issueMethod",
                                                        type: new sap.extension.data.Enum({
                                                            enumType: bo.emIssueMethod
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_scraptiered") }),
                                                    new sap.m.CheckBox("", {
                                                        selected: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return !ibas.strings.isEmpty(scrap) ? true : false;
                                                            }
                                                        },
                                                        select(event: sap.ui.base.Event): void {
                                                            let source: any = event.getSource();
                                                            if (source instanceof sap.m.CheckBox) {
                                                                let form: any = source.getParent().getParent().getParent().getParent();
                                                                if (form instanceof sap.ui.layout.form.SimpleForm) {
                                                                    form.setBusy(true);
                                                                    for (let item of form.getContent()) {
                                                                        if (item instanceof sap.m.Input) {
                                                                            let binding: sap.ui.model.Binding = item.getBinding("bindingValue");
                                                                            if (binding?.getPath() === "scrapRate" || binding?.getPath() === "scrapValue") {
                                                                                if (source.getSelected() === true) {
                                                                                    (<sap.m.Label>(<any>item).getLabels()[0])?.setVisible(false);
                                                                                    item.setVisible(false);
                                                                                } else {
                                                                                    (<sap.m.Label>(<any>item).getLabels()[0])?.setVisible(true);
                                                                                    item.setVisible(true);
                                                                                }
                                                                            } else if (binding?.getPath() === "scrap") {
                                                                                if (source.getSelected() === true) {
                                                                                    (<sap.m.Label>(<any>item).getLabels()[0])?.setVisible(true);
                                                                                    item.setVisible(true);
                                                                                } else {
                                                                                    (<sap.m.Label>(<any>item).getLabels()[0])?.setVisible(false);
                                                                                    item.setVisible(false);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    form.setBusy(false);
                                                                }
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.i18n.prop("bo_material_scraprate"),
                                                        visible: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return ibas.strings.isEmpty(scrap) ? true : false;
                                                            }
                                                        }
                                                    }),
                                                    new sap.extension.m.Input("", {
                                                        type: sap.m.InputType.Text,
                                                        visible: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return ibas.strings.isEmpty(scrap) ? true : false;
                                                            }
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "scrapRate",
                                                        type: new sap.extension.data.Percentage(),
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.i18n.prop("bo_material_scrapvalue"),
                                                        visible: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return ibas.strings.isEmpty(scrap) ? true : false;
                                                            }
                                                        }
                                                    }),
                                                    new sap.extension.m.Input("", {
                                                        visible: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return ibas.strings.isEmpty(scrap) ? true : false;
                                                            }
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "scrapValue",
                                                        type: new sap.extension.data.Quantity(),
                                                    }),
                                                    new sap.m.Label("", {
                                                        text: ibas.i18n.prop("bo_material_scrap"),
                                                        visible: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return ibas.strings.isEmpty(scrap) ? false : true;
                                                            }
                                                        }
                                                    }),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseMaterialScrapEvent);
                                                        },
                                                        showValueLink: true,
                                                        valueLinkRequest: function (this: sap.extension.m.Input): void {
                                                            ibas.servicesManager.runLinkService({
                                                                boCode: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                                                                linkValue: this.getBindingValue()
                                                            });
                                                        },
                                                        visible: {
                                                            path: "scrap",
                                                            formatter(scrap: string): boolean {
                                                                return ibas.strings.isEmpty(scrap) ? false : true;
                                                            }
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "scrap",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_productionuom") }),
                                                    new sap.extension.m.Input("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseMaterialUOMEvent, bo.Material.PROPERTY_PRODUCTIONUOM_NAME);
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "productionUOM",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_planningmethod") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: bo.emPlanningMethod
                                                    }).bindProperty("bindingValue", {
                                                        path: "planningMethod",
                                                        type: new sap.extension.data.Enum({
                                                            enumType: bo.emPlanningMethod
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_schedulinggroup") }),
                                                    new sap.extension.m.SelectionInput("", {
                                                        showValueHelp: true,
                                                        repository: bo.BORepositoryMaterials,
                                                        dataInfo: {
                                                            type: bo.SchedulingGroup,
                                                            key: bo.SchedulingGroup.PROPERTY_CODE_NAME,
                                                            text: bo.SchedulingGroup.PROPERTY_NAME_NAME
                                                        },
                                                        criteria: [
                                                            new ibas.Condition(bo.SchedulingGroup.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                                        ]
                                                    }).bindProperty("bindingValue", {
                                                        path: "schedulingGroup",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_scheduler") }),
                                                    new sap.extension.m.RepositoryInput("", {
                                                        showValueHelp: true,
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseSchedulerEvent);
                                                        },
                                                        repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                                        dataInfo: {
                                                            type: initialfantasy.bo.User,
                                                            key: initialfantasy.bo.User.PROPERTY_CODE_NAME,
                                                            text: initialfantasy.bo.User.PROPERTY_NAME_NAME,
                                                        },
                                                    }).bindProperty("bindingValue", {
                                                        path: "scheduler",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 8
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_madetoorder") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "madeToOrder",
                                                        type: new sap.extension.data.YesNo(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_checkcompleteness") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "checkCompleteness",
                                                        type: new sap.extension.data.YesNo(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_mixingbatches") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "mixingBatches",
                                                        type: new sap.extension.data.YesNo(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_material_keycomponent") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "keyComponent",
                                                        type: new sap.extension.data.YesNo(),
                                                    }).bindProperty("editable", {
                                                        parts: [
                                                            {
                                                                path: "batchManagement"
                                                            },
                                                            {
                                                                path: "serialManagement",
                                                            }
                                                        ],
                                                        formatter(batch: any, serial: any): boolean {
                                                            if (batch === ibas.emYesNo.YES) {
                                                                return true;
                                                            }
                                                            if (serial === ibas.emYesNo.YES) {
                                                                return true;
                                                            }
                                                            return false;
                                                        }
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                ]
                            })
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
                                new sap.m.ToolbarSeparator(),
                                new sap.extension.m.MenuButton("", {
                                    autoHide: true,
                                    text: ibas.i18n.prop("shell_quick_to"),
                                    icon: "sap-icon://generate-shortcut",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_app_materialoverview"),
                                                icon: "sap-icon://enter-more",
                                                press: function (): void {
                                                    that.fireViewEvents(that.overviewEvent);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_app_unitrate_edit_list"),
                                                icon: "sap-icon://collections-management",
                                                press: function (): void {
                                                    that.fireViewEvents(that.editMaterialUnitRateEvent);
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("bo_materialsubstitute"),
                                                icon: "sap-icon://add-product",
                                                press: function (): void {
                                                    that.fireViewEvents(that.editMaterialSubstituteEvent);
                                                },
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("materials_ledgeraccount_setting"),
                                                icon: "sap-icon://credit-card",
                                                press: function (): void {
                                                    that.fireViewEvents(that.chooseLedgerAccountEvent);
                                                },
                                                visible: shell.app.privileges.canRun({
                                                    id: accounting.app.LedgerAccountSettingService.APPLICATION_ID,
                                                    name: accounting.app.LedgerAccountSettingService.APPLICATION_NAME,
                                                })
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: that.page.getModel().getData(),
                                                converter: new bo.DataConverter(),
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                    placement: sap.m.PlacementType.Bottom,
                                                    buttons: {
                                                        path: "/",
                                                        template: new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            text: {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? ibas.i18n.prop(data) : "";
                                                                }
                                                            },
                                                            icon: {
                                                                path: "icon",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? data : "sap-icon://e-care";
                                                                }
                                                            },
                                                            press(this: sap.m.Button): void {
                                                                let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                if (service) {
                                                                    service.run();
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                                actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                actionSheet.openBy(event.getSource());
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            formTop,
                            formBottom,
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