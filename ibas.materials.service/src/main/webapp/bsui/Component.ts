/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace component {
            /**
             * 仓库选择-选择框
             */
            sap.extension.m.ComboBox.extend("materials.ui.component.WarehouseSelect", {
                metadata: {
                    properties: {
                        branch: { type: "string" },
                    },
                    events: {
                    },
                },
                renderer: {
                },
                getBranch(this: WarehouseSelect): string {
                    return this.getProperty("branch");
                },
                setBranch(this: WarehouseSelect, value: string): WarehouseSelect {
                    this.setProperty("branch", value);
                    this.destroyItems();
                    this.fireLoadItems({});
                    return this;
                },
                applySettings(this: WarehouseSelect, mSettings: any, oScope?: any): WarehouseSelect {
                    !mSettings ? mSettings = {} : mSettings = mSettings;
                    if (mSettings.showSecondaryValues === undefined) {
                        mSettings.showSecondaryValues = true;
                    }
                    if (mSettings.filterSecondaryValues === undefined) {
                        mSettings.filterSecondaryValues = true;
                    }
                    sap.extension.m.ComboBox.prototype.applySettings.apply(this, arguments);
                    // 包含筛选
                    this.setFilterFunction(function (sTerm: string, oItem: sap.ui.core.Item): any {
                        return oItem.getText().match(new RegExp(sTerm, "i")) || oItem.getKey().match(new RegExp(sTerm, "i"));
                    });
                    return this;
                },
                /** 加载可选值 */
                loadItems(this: WarehouseSelect): WarehouseSelect {
                    if (this.getItems().length > 0) {
                        if (arguments.length > 0) {

                        } else {
                            sap.extension.m.ComboBox.prototype.loadItems.apply(this, arguments);
                        }
                        return this;
                    }
                    if (WAREHOUSE_CACHE.length > 0) {
                        let branch: any = this.getBranch();
                        for (let item of WAREHOUSE_CACHE) {
                            if (branch === null || branch === undefined
                                || (branch !== undefined && branch === item.branch)
                                || ibas.strings.isEmpty(item.branch)) {
                                this.addItem(new sap.extension.m.SelectItem("", {
                                    key: item.code,
                                    text: item.name,
                                    additionalText: item.code,
                                    tooltip: ibas.strings.format("{0} - {1}", item.code, item.name)
                                }));
                            }
                        }
                    } else {
                        let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                        boRepository.fetchWarehouse({
                            criteria: [
                                new ibas.Condition(materials.bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                            ],
                            onCompleted: (opRslt) => {
                                if (opRslt.resultObjects.length > 0) {
                                    for (let item of opRslt.resultObjects) {
                                        WAREHOUSE_CACHE.add(item);
                                    }
                                    this.loadItems();
                                }
                            }
                        });
                    }
                    return this;
                },
            });
            const WAREHOUSE_CACHE: ibas.IList<materials.bo.Warehouse> = new ibas.ArrayList<materials.bo.Warehouse>();
            /**
             * 物料或物料组-文本框
             */
            sap.extension.m.ConversionText.extend("materials.ui.component.MaterialOrMaterialGroupText", {
                metadata: {
                    properties: {
                        typeProperty: { type: "string" },
                    },
                    events: {
                    },
                },
                renderer: {
                },
                getTypeProperty(this: MaterialOrMaterialGroupText): string {
                    return this.getProperty("typeProperty");
                },
                setTypeProperty(this: MaterialOrMaterialGroupText, value: string): MaterialOrMaterialGroupText {
                    return this.setProperty("typeProperty", value);
                },
                init(this: MaterialOrMaterialGroupText): void {
                    (<any>sap.extension.m.ConversionText.prototype).init.apply(this, arguments);
                    this.attachConvert(undefined, (event: sap.ui.base.Event) => {
                        let value: string = event.getParameter("value");
                        let done: (newValue: string) => void = event.getParameter("done");
                        let bindingData: any = event.getParameter("bindingData");
                        let type: bo.emSpecificationTarget = bindingData[this.getTypeProperty()];
                        if (ibas.objects.isNull(type) || ibas.strings.isEmpty(value)) {
                            return;
                        }
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = "Code";
                        condition.value = value;
                        let fetched: (values: ibas.IList<ibas.KeyText> | Error) => void = (values) => {
                            if (values instanceof Error) {
                                ibas.logger.log(values);
                            } else {
                                let keyBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                keyBudilder.map(null, "");
                                keyBudilder.map(undefined, "");
                                let textBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                textBudilder.map(null, "");
                                textBudilder.map(undefined, "");
                                for (let item of values) {
                                    if (keyBudilder.length > 0) {
                                        keyBudilder.append(ibas.DATA_SEPARATOR);
                                    }
                                    if (textBudilder.length > 0) {
                                        textBudilder.append(ibas.DATA_SEPARATOR);
                                        textBudilder.append(" ");
                                    }
                                    keyBudilder.append(item.key);
                                    textBudilder.append(item.text);
                                }
                                done(ibas.strings.format("{0} - {1}", keyBudilder.toString(), textBudilder.toString()));
                            }
                        };
                        let boRepository: materials.bo.BORepositoryMaterials = sap.extension.variables.get(MaterialOrMaterialGroupText, "repository");
                        if (ibas.objects.isNull(boRepository)) {
                            boRepository = new materials.bo.BORepositoryMaterials();
                            sap.extension.variables.set(boRepository, MaterialOrMaterialGroupText, "repository");
                        }
                        if (type === bo.emSpecificationTarget.MATERIAL) {
                            let materialInfo: any = sap.extension.variables.get(MaterialOrMaterialGroupText, "materialInfo");
                            if (ibas.objects.isNull(materialInfo)) {
                                materialInfo = {
                                    type: materials.bo.Material,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(materialInfo, MaterialOrMaterialGroupText, "materialInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, materialInfo, criteria, fetched);
                        } else if (type === bo.emSpecificationTarget.MATERIAL_GROUP) {
                            let groupInfo: any = sap.extension.variables.get(MaterialOrMaterialGroupText, "groupInfo");
                            if (ibas.objects.isNull(groupInfo)) {
                                groupInfo = {
                                    type: materials.bo.MaterialGroup,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(groupInfo, MaterialOrMaterialGroupText, "groupInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, groupInfo, criteria, fetched);
                        }
                    });
                }
            });
            /**
             * 业务伙伴或组-文本框
             */
            sap.extension.m.ConversionText.extend("materials.ui.component.BusinessPartnerOrGroupText", {
                metadata: {
                    properties: {
                        typeProperty: { type: "string" },
                    },
                    events: {
                    },
                },
                renderer: {
                },
                getTypeProperty(this: BusinessPartnerOrGroupText): string {
                    return this.getProperty("typeProperty");
                },
                setTypeProperty(this: BusinessPartnerOrGroupText, value: string): BusinessPartnerOrGroupText {
                    return this.setProperty("typeProperty", value);
                },
                init(this: BusinessPartnerOrGroupText): void {
                    (<any>sap.extension.m.ConversionText.prototype).init.apply(this, arguments);
                    this.attachConvert(undefined, (event: sap.ui.base.Event) => {
                        let value: string = event.getParameter("value");
                        let done: (newValue: string) => void = event.getParameter("done");
                        let bindingData: any = event.getParameter("bindingData");
                        let type: bo.emSpecificationAssigned = bindingData[this.getTypeProperty()];
                        if (ibas.objects.isNull(type) || ibas.strings.isEmpty(value)) {
                            return;
                        }
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = "Code";
                        condition.value = value;
                        let fetched: (values: ibas.IList<ibas.KeyText> | Error) => void = (values) => {
                            if (values instanceof Error) {
                                ibas.logger.log(values);
                            } else {
                                let keyBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                keyBudilder.map(null, "");
                                keyBudilder.map(undefined, "");
                                let textBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                textBudilder.map(null, "");
                                textBudilder.map(undefined, "");
                                for (let item of values) {
                                    if (keyBudilder.length > 0) {
                                        keyBudilder.append(ibas.DATA_SEPARATOR);
                                    }
                                    if (textBudilder.length > 0) {
                                        textBudilder.append(ibas.DATA_SEPARATOR);
                                        textBudilder.append(" ");
                                    }
                                    keyBudilder.append(item.key);
                                    textBudilder.append(item.text);
                                }
                                done(textBudilder.toString());
                            }
                        };
                        let boRepository: businesspartner.bo.BORepositoryBusinessPartner = sap.extension.variables.get(BusinessPartnerOrGroupText, "repository");
                        if (ibas.objects.isNull(boRepository)) {
                            boRepository = new businesspartner.bo.BORepositoryBusinessPartner();
                            sap.extension.variables.set(boRepository, BusinessPartnerOrGroupText, "repository");
                        }
                        if (type === bo.emSpecificationAssigned.BUSINESS_PARTNER_GROUP) {
                            let groupInfo: any = sap.extension.variables.get(BusinessPartnerOrGroupText, "groupInfo");
                            if (ibas.objects.isNull(groupInfo)) {
                                groupInfo = {
                                    type: businesspartner.bo.BusinessPartnerGroup,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(groupInfo, BusinessPartnerOrGroupText, "groupInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, groupInfo, criteria, fetched);
                        } else if (type === bo.emSpecificationAssigned.CUSTOMER) {
                            let customerInfo: any = sap.extension.variables.get(BusinessPartnerOrGroupText, "customerInfo");
                            if (ibas.objects.isNull(customerInfo)) {
                                customerInfo = {
                                    type: businesspartner.bo.Customer,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(customerInfo, BusinessPartnerOrGroupText, "customerInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, customerInfo, criteria, fetched);
                        } else if (type === bo.emSpecificationAssigned.SUPPLIER) {
                            let supplierInfo: any = sap.extension.variables.get(BusinessPartnerOrGroupText, "supplierInfo");
                            if (ibas.objects.isNull(supplierInfo)) {
                                supplierInfo = {
                                    type: businesspartner.bo.Supplier,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(supplierInfo, BusinessPartnerOrGroupText, "supplierInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, supplierInfo, criteria, fetched);
                        }
                    });
                }
            });
            /**
             * 业务伙伴-文本框
             */
            sap.extension.m.ConversionText.extend("materials.ui.component.BusinessPartnerText", {
                metadata: {
                    properties: {
                        /** 业务伙伴类型属性名 */
                        typeProperty: { type: "string" },
                    },
                    events: {
                    },
                },
                renderer: {
                },
                /** 获取-业务伙伴类型属性名 */
                getTypeProperty(this: BusinessPartnerText): string {
                    return this.getProperty("typeProperty");
                },
                /** 设置-业务伙伴类型属性名 */
                setTypeProperty(this: BusinessPartnerText, value: string): BusinessPartnerText {
                    return this.setProperty("typeProperty", value);
                },
                init(this: BusinessPartnerText): void {
                    (<any>sap.extension.m.ConversionText.prototype).init.apply(this, arguments);
                    this.attachConvert(undefined, (event: sap.ui.base.Event) => {
                        let value: string = event.getParameter("value");
                        let done: (newValue: string) => void = event.getParameter("done");
                        let bindingData: any = event.getParameter("bindingData");
                        let type: businesspartner.bo.emBusinessPartnerType = bindingData[this.getTypeProperty()];
                        if (ibas.objects.isNull(type) || ibas.strings.isEmpty(value)) {
                            return;
                        }
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = "Code";
                        condition.value = value;
                        let fetched: (values: ibas.IList<ibas.KeyText> | Error) => void = (values) => {
                            if (values instanceof Error) {
                                ibas.logger.log(values);
                            } else {
                                let keyBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                keyBudilder.map(null, "");
                                keyBudilder.map(undefined, "");
                                let textBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                textBudilder.map(null, "");
                                textBudilder.map(undefined, "");
                                for (let item of values) {
                                    if (keyBudilder.length > 0) {
                                        keyBudilder.append(ibas.DATA_SEPARATOR);
                                    }
                                    if (textBudilder.length > 0) {
                                        textBudilder.append(ibas.DATA_SEPARATOR);
                                        textBudilder.append(" ");
                                    }
                                    keyBudilder.append(item.key);
                                    textBudilder.append(item.text);
                                }
                                done(textBudilder.toString());
                            }
                        };
                        let boRepository: businesspartner.bo.BORepositoryBusinessPartner = sap.extension.variables.get(BusinessPartnerText, "repository");
                        if (ibas.objects.isNull(boRepository)) {
                            boRepository = new businesspartner.bo.BORepositoryBusinessPartner();
                            sap.extension.variables.set(boRepository, BusinessPartnerText, "repository");
                        }
                        if (type === businesspartner.bo.emBusinessPartnerType.CUSTOMER) {
                            let customerInfo: any = sap.extension.variables.get(BusinessPartnerText, "customerInfo");
                            if (ibas.objects.isNull(customerInfo)) {
                                customerInfo = {
                                    type: businesspartner.bo.Customer,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(customerInfo, BusinessPartnerText, "customerInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, customerInfo, criteria, fetched);
                        } else if (type === businesspartner.bo.emBusinessPartnerType.SUPPLIER) {
                            let supplierInfo: any = sap.extension.variables.get(BusinessPartnerText, "supplierInfo");
                            if (ibas.objects.isNull(supplierInfo)) {
                                supplierInfo = {
                                    type: businesspartner.bo.Supplier,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(supplierInfo, BusinessPartnerText, "supplierInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, supplierInfo, criteria, fetched);
                        }
                    });
                }
            });
            /**
             * 组织数据-输入框
             */
            sap.extension.m.SelectionInput.extend("materials.ui.component.TaxGroupInput", {
                metadata: {
                    properties: {
                        /** 显示选择钮 */
                        showValueHelp: { type: "boolean", defaultValue: true },
                    },
                    events: {}
                },
                renderer: {},
                /** 重构设置 */
                applySettings(this: TaxGroupInput): TaxGroupInput {
                    sap.extension.m.SelectionInput.prototype.applySettings.apply(this, arguments);
                    let boRepository: ibas.BORepositoryApplication = this.getRepository();
                    if (ibas.objects.isNull(boRepository)) {
                        boRepository = sap.extension.variables.get(TaxGroupInput, "repository");
                        if (ibas.objects.isNull(boRepository)) {
                            boRepository = new accounting.bo.BORepositoryAccounting();
                            sap.extension.variables.set(boRepository, TaxGroupInput, "repository");
                        }
                        this.setRepository(boRepository);
                    }
                    let dataInfo: sap.extension.repository.IDataInfo = this.getDataInfo();
                    if (ibas.objects.isNull(dataInfo)) {
                        dataInfo = sap.extension.variables.get(TaxGroupInput, "dataInfo");
                        if (ibas.objects.isNull(dataInfo)) {
                            dataInfo = {
                                type: accounting.bo.TaxGroup,
                                key: "Code",
                                text: "Name",
                            };
                            sap.extension.variables.set(dataInfo, TaxGroupInput, "dataInfo");
                        }
                        this.setDataInfo(dataInfo);
                    }
                    let criteria: ibas.ICriteria | ibas.ICondition[] = this.getCriteria();
                    if (ibas.objects.isNull(criteria)) {
                        criteria = sap.extension.variables.get(TaxGroupInput, "criteria");
                        if (ibas.objects.isNull(criteria)) {
                            criteria = [
                                new ibas.Condition("Activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES.toString())
                            ];
                            sap.extension.variables.set(criteria, TaxGroupInput, "criteria");
                        }
                        this.setCriteria(criteria);
                    }
                    return this;
                }
            });
            /**
             * 物料规格-输入框
             */
            sap.extension.core.EditableControl.extend("materials.ui.component.SpecificationInput", {
                metadata: {
                    properties: {
                        /** 物料 */
                        material: { type: "string" },
                        /** 规格 */
                        specification: { type: "int" },
                    },
                    aggregations: {
                        "_input": { type: "sap.extension.m.Input", multiple: false },
                        "_textarea": { type: "sap.m.TextArea", multiple: false },
                    },
                },
                renderer: function (this: SpecificationInput, oRm: sap.ui.core.RenderManager, oControl: SpecificationInput): void {
                    oRm.openStart("div", oControl).openEnd();
                    oRm.openStart("div");
                    oRm.class("sapMInputBaseContentWrapper");
                    oRm.class("sapMInputBaseHasEndIcons");
                    oRm.style("display", "inline-flex");
                    oRm.style("width", "100%");
                    oRm.style("height", "100%");
                    oRm.style("border", "0");
                    oRm.style("background-color", "transparent");
                    oRm.openEnd();
                    oRm.renderControl(<sap.ui.core.Control>oControl.getAggregation("_input", undefined));
                    oRm.close("div");
                    oRm.openStart("div").openEnd();
                    oRm.renderControl(<sap.ui.core.Control>oControl.getAggregation("_textarea", undefined));
                    oRm.close("div");
                    oRm.close("div");
                },
                init(this: SpecificationInput): void {
                    (<any>sap.extension.core.EditableControl.prototype).init.apply(this, arguments);
                    this.setAggregation("_input", new sap.extension.m.Input("", {
                        width: "100%",
                        editable: this.getEditable(),
                        showValueHelp: this.getEditable(),
                        valueHelpRequest: function (event: sap.ui.base.Event): void {
                            let source: any = sap.ui.getCore().byId(event.getParameter("id"));
                            if (source instanceof sap.m.Input) {
                                let that: any = source.getParent();
                                if (that instanceof SpecificationInput) {
                                    sap.extension.m.MessageBox.show(
                                        ibas.i18n.prop("materials_create_continue", ibas.i18n.prop("bo_materialspecification")), {
                                        type: ibas.emMessageType.QUESTION,
                                        actions: [
                                            ibas.emMessageAction.YES,
                                            ibas.emMessageAction.NO
                                        ],
                                        /** 调用完成 */
                                        onCompleted(action: ibas.emMessageAction): void {
                                            if (action === ibas.emMessageAction.YES) {
                                                ibas.servicesManager.runApplicationService<materials.app.ISpecificationTreeContract, materials.bo.MaterialSpecification>({
                                                    proxy: new materials.app.SpecificationTreeServiceProxy({
                                                        target: that.getMaterial(),
                                                    }),
                                                    onCompleted(result: materials.bo.MaterialSpecification): void {
                                                        that.setSpecification(<any>result);
                                                    }
                                                });
                                            } else {
                                                ibas.servicesManager.runChooseService<materials.bo.IMaterialSpecification>({
                                                    boCode: materials.bo.BO_CODE_MATERIALSPECIFICATION,
                                                    chooseType: ibas.emChooseType.SINGLE,
                                                    criteria: [
                                                        new ibas.Condition(materials.bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                                            ibas.emConditionOperation.GRATER_THAN, "0"),
                                                        new ibas.Condition(materials.bo.MaterialSpecification.PROPERTY_ITEMCODE_NAME,
                                                            ibas.emConditionOperation.EQUAL, that.getMaterial()),
                                                    ],
                                                    onCompleted(selecteds: ibas.IList<materials.bo.IMaterialSpecification>): void {
                                                        for (let selected of selecteds) {
                                                            that.setSpecification(<any>selected);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }));
                    this.setAggregation("_textarea", new sap.m.TextArea("", {
                        editable: false,
                        rows: 3,
                        width: "100%",
                    }));
                },
                /** 是否可编辑 */
                setEditable(this: SpecificationInput, value: boolean): SpecificationInput {
                    this.setProperty("editable", value, true);
                    let input: any = this.getAggregation("_input", undefined);
                    if (input instanceof sap.extension.m.Input) {
                        input.setEditable(value);
                        input.setShowValueHelp(value);
                    }
                    return this;
                },
                setMaterial(this: SpecificationInput, value: string): SpecificationInput {
                    this.setProperty("material", value, true);
                    return this;
                },
                getMaterial(this: SpecificationInput): string {
                    return this.getProperty("material");
                },
                setSpecification(this: SpecificationInput, value: number | materials.bo.IMaterialSpecification): SpecificationInput {
                    if (ibas.objects.isNull(value)) {
                        let input: any = this.getAggregation("_input", undefined);
                        if (input instanceof sap.extension.m.Input) {
                            input.setValue(undefined);
                        }
                        let textArea: any = this.getAggregation("_textarea", undefined);
                        if (textArea instanceof sap.m.TextArea) {
                            textArea.setValue(undefined);
                        }
                    } else if (typeof value === "number") {
                        let criteria: ibas.Criteria = new ibas.Criteria();
                        criteria.result = 1;
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = materials.bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME;
                        condition.value = value.toString();
                        let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                        boRepository.fetchMaterialSpecification({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                let result: any = opRslt.resultObjects.firstOrDefault();
                                if (ibas.objects.isNull(result)) {
                                    let input: any = this.getAggregation("_input", undefined);
                                    if (input instanceof sap.extension.m.Input) {
                                        input.setValue(value.toString());
                                    }
                                } else {
                                    this.setSpecification(<any>opRslt.resultObjects.firstOrDefault());
                                }
                            }
                        });
                    } else {
                        let specification: materials.bo.IMaterialSpecification = value;
                        let input: any = this.getAggregation("_input", undefined);
                        if (input instanceof sap.extension.m.Input) {
                            let item: sap.ui.core.ListItem = new sap.ui.core.ListItem("", {
                                key: specification.objectKey,
                                text: specification.name,
                            });
                            input.addSuggestionItem(item);
                            input.setSelectedItem(item);
                        }
                        let textArea: any = this.getAggregation("_textarea", undefined);
                        if (textArea instanceof sap.m.TextArea) {
                            if (ibas.objects.isNull(specification)) {
                                textArea.setValue("");
                            } else {
                                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                builder.map(null, "");
                                builder.map(undefined, "");
                                for (let item of specification.materialSpecificationItems) {
                                    if (builder.length > 0) {
                                        builder.append("; ");
                                    }
                                    builder.append(item.description);
                                    builder.append(": ");
                                    builder.append(item.content);
                                }
                                textArea.setValue(builder.toString());
                            }
                        }
                        this.setProperty("specification", specification.objectKey);
                    }
                    return this;
                },
                getSpecification(this: SpecificationInput): string {
                    return this.getProperty("specification");
                },
                applySettings(this: SpecificationInput, mSettings: any, oScope?: any): SpecificationInput {
                    return sap.extension.core.EditableControl.prototype.applySettings.apply(this, arguments);
                }
            });
            /**
             * 区域
             */
            sap.ui.layout.Splitter.extend("materials.ui.component.Splitter", {
                metadata: {
                    properties: {
                    },
                    events: {
                    },
                },
                renderer: {
                },
                onAfterRendering(this: Splitter): void {
                    (<any>sap.ui.layout.Splitter.prototype).onAfterRendering.apply(this, arguments);
                    let dom: JQuery = this.$();
                    if (dom) {
                        dom.css("white-space", "normal");
                    }
                }
            });
        }
    }
}