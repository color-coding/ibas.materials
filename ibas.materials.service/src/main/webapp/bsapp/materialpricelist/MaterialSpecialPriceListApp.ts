/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-物料特殊价格 */
        export class MaterialSpecialPriceListApp extends ibas.BOListApplication<IMaterialSpecialPriceListView, bo.MaterialSpecialPrice> {
            /** 应用标识 */
            static APPLICATION_ID: string = "2aec02c2-1afe-4d61-aa8f-6384b40e837c";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialspecialprice_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialSpecialPrice.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSpecialPriceListApp.APPLICATION_ID;
                this.name = MaterialSpecialPriceListApp.APPLICATION_NAME;
                this.boCode = MaterialSpecialPriceListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.deleteDataEvent = this.deleteData;
                this.view.selectedBusinessPartnerEvent = this.selectedBusinessPartner;
                this.view.fetchBusinessPartnerEvent = this.fetchBusinessPartner;
                this.view.exportPriceItemEvent = this.exportPriceItem;
                this.view.savePriceItemEvent = this.savePriceItem;
                this.view.addPriceItemEvent = this.addPriceItem;
                this.view.choosePriceItemUnitEvent = this.choosePriceItemUnit;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                }
                let condition: ibas.ICondition;
                if (criteria.conditions.length > 1) {
                    criteria.conditions.firstOrDefault().bracketOpen += 1;
                    criteria.conditions.lastOrDefault().bracketClose += 1;
                }
                if (!ibas.objects.isNull(this.currentBusinessPartner)
                    && !criteria.conditions.contain(c => c.alias === bo.MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERTYPE_NAME)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERTYPE_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = String(this.currentBusinessPartner instanceof businesspartner.bo.Supplier
                        ? businesspartner.bo.emBusinessPartnerType.SUPPLIER : businesspartner.bo.emBusinessPartnerType.CUSTOMER);
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERCODE_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = String(this.currentBusinessPartner.code);
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSpecialPrice({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSpecialPrice>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showPriceItems(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.MaterialSpecialPrice): void {
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.MaterialSpecialPrice): void {
            }
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.MaterialSpecialPrice | bo.MaterialSpecialPrice[]): void {
            }
            protected currentBusinessPartner: businesspartner.bo.Customer | businesspartner.bo.Supplier = null;
            protected selectedBusinessPartner(data: businesspartner.bo.Customer | businesspartner.bo.Supplier): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialspecialprice_businesspartner")
                    )); return;
                }
                this.currentBusinessPartner = data;
                this.view.showPriceItems(undefined);
            }
            /** 查询价格 */
            protected fetchBusinessPartner(criteria: ibas.ICriteria): void {
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                    criteria.businessObject = ibas.config.applyVariables(businesspartner.bo.Customer.BUSINESS_OBJECT_CODE);
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                }
                if (ibas.strings.equalsIgnoreCase(ibas.config.applyVariables(businesspartner.bo.Supplier.BUSINESS_OBJECT_CODE), criteria.businessObject)) {
                    this.busy(true);
                    let that: this = this;
                    let boRepository: businesspartner.bo.BORepositoryBusinessPartner = new businesspartner.bo.BORepositoryBusinessPartner();
                    boRepository.fetchSupplier({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<businesspartner.bo.Supplier>): void {
                            try {
                                that.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showBusinessPartners(opRslt.resultObjects);
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
                } else {
                    this.busy(true);
                    let that: this = this;
                    let boRepository: businesspartner.bo.BORepositoryBusinessPartner = new businesspartner.bo.BORepositoryBusinessPartner();
                    boRepository.fetchCustomer({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<businesspartner.bo.Customer>): void {
                            try {
                                that.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showBusinessPartners(opRslt.resultObjects);
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
                }
            }
            /** 保存价格清单项目 */
            protected savePriceItem(data: bo.MaterialSpecialPrice | bo.MaterialSpecialPrice[]): void {
                // 没有选择删除的对象
                let datas: ibas.IList<bo.MaterialSpecialPrice> = ibas.arrays.create(data);
                if (datas.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_save")
                    )); return;
                }
                let that: this = this;
                that.busy(true);
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                ibas.queues.execute(datas, (data, next) => {
                    // 处理数据
                    boRepository.saveMaterialSpecialPrice({
                        beSaved: data,
                        onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSpecialPrice>): void {
                            if (opRslt.resultCode !== 0) {
                                next(new Error(opRslt.message));
                            } else {
                                data.markOld();
                                next();
                            }
                        }
                    });
                }, (error) => {
                    // 处理完成
                    if (error instanceof Error) {
                        that.messages(ibas.emMessageType.ERROR, error.message);
                    } else {
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                    }
                    that.busy(false);
                });
                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 导出价格 */
            protected exportPriceItem(): void {
                if (ibas.objects.isNull(this.currentBusinessPartner)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialspecialprice_businesspartner")
                    )); return;
                }
                let condition: ibas.ICondition;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                if (!ibas.objects.isNull(this.currentBusinessPartner)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERTYPE_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = String(this.currentBusinessPartner instanceof businesspartner.bo.Supplier
                        ? businesspartner.bo.emBusinessPartnerType.SUPPLIER : businesspartner.bo.emBusinessPartnerType.CUSTOMER);
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERCODE_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = String(this.currentBusinessPartner.code);
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSpecialPrice({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSpecialPrice>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.savePrices(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 添加价格 */
            protected addPriceItem(items: bo.MaterialSpecialPrice[]): void {
                if (ibas.objects.isNull(this.currentBusinessPartner)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialspecialprice_businesspartner")
                    )); return;
                }
                if (items instanceof Array && items.length > 0) {
                    let newItems: ibas.IList<bo.MaterialSpecialPrice> = new ibas.ArrayList<bo.MaterialSpecialPrice>();
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.append(ibas.i18n.prop("shell_data_new_line"));
                    builder.append(" [");
                    for (let item of items) {
                        let newItem: bo.MaterialSpecialPrice = item.clone();
                        newItem.businessPartnerType = this.currentBusinessPartner instanceof businesspartner.bo.Supplier
                            ? businesspartner.bo.emBusinessPartnerType.SUPPLIER : businesspartner.bo.emBusinessPartnerType.CUSTOMER;
                        newItem.businessPartnerCode = this.currentBusinessPartner.code;
                        if (builder.length > 2) {
                            builder.append(", ");
                        }
                        builder.append(newItem.itemCode);
                        newItems.add(newItem);
                    }
                    builder.append("] ");
                    if (builder.length > 3) {
                        this.proceeding(ibas.emMessageType.WARNING, builder.toString());
                    }
                    if (newItems.length > 0) {
                        this.view.showPriceItems(newItems);
                    }
                } else {
                    let that: this = this;
                    let conditions: ibas.IList<ibas.ICondition> = app.conditions.material.create();
                    // 调用选择服务
                    ibas.servicesManager.runChooseService<bo.Material | bo.Product>({
                        boCode: bo.BO_CODE_MATERIAL,
                        criteria: conditions,
                        onCompleted(selecteds: ibas.IList<bo.Material | bo.Product>): void {
                            let newItems: ibas.IList<bo.MaterialSpecialPrice> = new ibas.ArrayList<bo.MaterialSpecialPrice>();
                            for (let selected of selecteds) {
                                let newItem: bo.MaterialSpecialPrice = new bo.MaterialSpecialPrice();
                                newItem.businessPartnerType = that.currentBusinessPartner instanceof businesspartner.bo.Supplier
                                    ? businesspartner.bo.emBusinessPartnerType.SUPPLIER : businesspartner.bo.emBusinessPartnerType.CUSTOMER;
                                newItem.businessPartnerCode = that.currentBusinessPartner.code;
                                newItem.itemCode = selected.code;
                                newItem.uom = selected.inventoryUOM;
                                newItem.price = -1;
                                newItem.currency = accounting.config.currency("LOCAL");
                                newItems.add(newItem);
                            }
                            if (newItems.length > 0) {
                                that.view.showPriceItems(newItems);
                            }
                        }
                    });
                }
            }
            /** 选择价格项目单位 */
            private choosePriceItemUnit(data: bo.MaterialPrice): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = materials.bo.Unit.PROPERTY_ACTIVATED_NAME;
                condition.value = String(ibas.emYesNo.YES);
                ibas.servicesManager.runChooseService<materials.bo.IUnit>({
                    boCode: materials.bo.BO_CODE_UNIT,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<materials.bo.IUnit>): void {
                        for (let selected of selecteds) {
                            if (data.price > 0 && selected.name !== data.uom) {
                                // 根据汇率计算价格
                                materials.app.changeMaterialsUnitRate({
                                    data: {
                                        sourceUnit: selected.name,
                                        targetUnit: data.uom,
                                        material: data.itemCode,
                                        setUnitRate(rate: number): void {
                                            data.price = data.price * rate;
                                        }
                                    }
                                });
                            }
                            data.uom = selected.name;
                        }
                    }
                });
            }
        }
        /** 视图-物料特殊价格 */
        export interface IMaterialSpecialPriceListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 查询业务伙伴事件 */
            fetchBusinessPartnerEvent: Function;
            /** 显示数据 */
            showBusinessPartners(datas: businesspartner.bo.Customer[] | businesspartner.bo.Supplier[]): void;
            /** 选中价格清单事件 */
            selectedBusinessPartnerEvent: Function;
            /** 保存价格项目事件 */
            savePriceItemEvent: Function;
            /** 添加价格项目事件 */
            addPriceItemEvent: Function;
            /** 显示数据 */
            showPriceItems(datas: bo.MaterialSpecialPrice[]): void;
            /** 导出价格事件 */
            exportPriceItemEvent: Function;
            /** 保存数据 */
            savePrices(datas: bo.MaterialSpecialPrice[]): void;
            /** 选择价格项目单位事件 */
            choosePriceItemUnitEvent: Function;
        }
    }
}