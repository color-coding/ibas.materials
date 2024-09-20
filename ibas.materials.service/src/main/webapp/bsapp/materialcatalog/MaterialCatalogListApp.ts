/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-业务伙伴物料目录 */
        export class BusinessPartnerMaterialCatalogListApp extends ibas.Application<IBusinessPartnerMaterialCatalogListView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "37a39566-89ec-4398-8ab1-5c348e469f6c";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialcatalog_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BusinessPartnerMaterialCatalogListApp.APPLICATION_ID;
                this.name = BusinessPartnerMaterialCatalogListApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchDataEvent = this.fetchData;
                this.view.addDataEvent = this.addData;
                this.view.removeDataEvent = this.removeData;
                this.view.saveDataEvent = this.saveData;
                this.view.fetchCustomerEvent = this.fetchCustomer;
                this.view.fetchSupplierEvent = this.fetchSupplier;
                this.view.fetchMaterialEvent = this.fetchMaterial;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                if (!ibas.objects.isNull(criteria)) {
                    // 默认不查询子项，有条件则查
                    criteria.noChilds = true;
                    if (criteria.childCriterias.length > 0) {
                        criteria.noChilds = false;
                    }
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchBusinessPartnerMaterialCatalog({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BusinessPartnerMaterialCatalog>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showDatas(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 删除数据，参数：目标数据集合 */
            protected saveData(data: bo.BusinessPartnerMaterialCatalog | bo.BusinessPartnerMaterialCatalog[]): void {
                let beSaveds: ibas.IList<bo.BusinessPartnerMaterialCatalog> = ibas.arrays.create(data);
                if (beSaveds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_save")
                    )); return;
                }
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_save_continue", beSaveds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        ibas.queues.execute(beSaveds, (data, next) => {
                            // 处理数据
                            boRepository.saveBusinessPartnerMaterialCatalog({
                                beSaved: data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.BusinessPartnerMaterialCatalog>): void {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(opRslt.message));
                                    } else {
                                        if (data.isDeleted === true) {
                                            data.markOld();
                                            data.isSavable = false;
                                        } else {
                                            data.markOld();
                                        }
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
                        that.busy(true);
                    }
                });
            }

            protected fetchCustomer(criteria: ibas.ICriteria): void {
                let boRepository: businesspartner.bo.BORepositoryBusinessPartner = new businesspartner.bo.BORepositoryBusinessPartner();
                boRepository.fetchCustomer({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showCustomers(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            protected fetchSupplier(criteria: ibas.ICriteria): void {
                let boRepository: businesspartner.bo.BORepositoryBusinessPartner = new businesspartner.bo.BORepositoryBusinessPartner();
                boRepository.fetchSupplier({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showSuppliers(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            protected fetchMaterial(criteria: ibas.ICriteria): void {
                let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                boRepository.fetchMaterial({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showMaterials(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            protected addData(data: businesspartner.bo.Customer | businesspartner.bo.Supplier | bo.Material, bpType?: businesspartner.bo.emBusinessPartnerType): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.strings.format("[{0}/{1}/{2}]",
                            ibas.i18n.prop("bo_businesspartnermaterialcatalog_customer"),
                            ibas.i18n.prop("bo_businesspartnermaterialcatalog_supplier"),
                            ibas.i18n.prop("bo_businesspartnermaterialcatalog_material")
                        )
                    )); return;
                }
                if (data instanceof bo.Material) {
                    // 选择业务伙伴
                    if (bpType === businesspartner.bo.emBusinessPartnerType.CUSTOMER) {
                        let conditions: ibas.IList<ibas.ICondition> = businesspartner.app.conditions.customer.create();
                        ibas.servicesManager.runChooseService<businesspartner.bo.Customer>({
                            chooseType: ibas.emChooseType.MULTIPLE,
                            boCode: businesspartner.bo.Customer.BUSINESS_OBJECT_CODE,
                            criteria: conditions,
                            onCompleted: (selecteds) => {
                                let items: ibas.IList<bo.BusinessPartnerMaterialCatalog> = new ibas.ArrayList<bo.BusinessPartnerMaterialCatalog>();
                                for (let selected of selecteds) {
                                    let item: bo.BusinessPartnerMaterialCatalog = new bo.BusinessPartnerMaterialCatalog();
                                    item.businessPartnerType = businesspartner.bo.emBusinessPartnerType.CUSTOMER;
                                    item.businessPartnerCode = selected.code;
                                    item.itemCode = data.code;
                                    items.add(item);
                                }
                                this.view.showDatas(items);
                            }
                        });
                    } else if (bpType === businesspartner.bo.emBusinessPartnerType.SUPPLIER) {
                        let conditions: ibas.IList<ibas.ICondition> = businesspartner.app.conditions.supplier.create();
                        ibas.servicesManager.runChooseService<businesspartner.bo.Supplier>({
                            chooseType: ibas.emChooseType.MULTIPLE,
                            boCode: businesspartner.bo.Supplier.BUSINESS_OBJECT_CODE,
                            criteria: conditions,
                            onCompleted: (selecteds) => {
                                let items: ibas.IList<bo.BusinessPartnerMaterialCatalog> = new ibas.ArrayList<bo.BusinessPartnerMaterialCatalog>();
                                for (let selected of selecteds) {
                                    let item: bo.BusinessPartnerMaterialCatalog = new bo.BusinessPartnerMaterialCatalog();
                                    item.businessPartnerType = businesspartner.bo.emBusinessPartnerType.SUPPLIER;
                                    item.businessPartnerCode = selected.code;
                                    item.itemCode = data.code;
                                    items.add(item);
                                }
                                this.view.showDatas(items);
                            }
                        });
                    } else {
                        throw new Error(ibas.i18n.prop("sys_invalid_parameter", "bpType"));
                    }
                } else {
                    // 选择物料
                    let conditions: ibas.IList<ibas.ICondition> = app.conditions.material.create();
                    ibas.servicesManager.runChooseService<bo.Material>({
                        chooseType: ibas.emChooseType.MULTIPLE,
                        boCode: bo.Material.BUSINESS_OBJECT_CODE,
                        criteria: conditions,
                        onCompleted: (selecteds) => {
                            let items: ibas.IList<bo.BusinessPartnerMaterialCatalog> = new ibas.ArrayList<bo.BusinessPartnerMaterialCatalog>();
                            for (let selected of selecteds) {
                                let item: bo.BusinessPartnerMaterialCatalog = new bo.BusinessPartnerMaterialCatalog();
                                if (data instanceof businesspartner.bo.Customer) {
                                    item.businessPartnerType = businesspartner.bo.emBusinessPartnerType.CUSTOMER;
                                    item.businessPartnerCode = data.code;
                                } else if (data instanceof businesspartner.bo.Supplier) {
                                    item.businessPartnerType = businesspartner.bo.emBusinessPartnerType.SUPPLIER;
                                    item.businessPartnerCode = data.code;
                                }
                                item.itemCode = selected.code;
                                items.add(item);
                            }
                            this.view.showDatas(items);
                        }
                    });
                }
            }
            protected removeData(): void {

            }
        }
        /** 视图-业务伙伴物料目录 */
        export interface IBusinessPartnerMaterialCatalogListView extends ibas.IView {
            /** 保存数据事件 */
            saveDataEvent: Function;
            /** 检索数据事件 */
            fetchDataEvent: Function;
            /** 添加数据事件 */
            addDataEvent: Function;
            /** 移除数据事件 */
            removeDataEvent: Function;
            /** 检索客户事件 */
            fetchCustomerEvent: Function;
            /** 检索供应商事件 */
            fetchSupplierEvent: Function;
            /** 检索物料事件 */
            fetchMaterialEvent: Function;
            /** 显示数据 */
            showDatas(datas: bo.BusinessPartnerMaterialCatalog[]): void;
            /** 显示客户数据 */
            showCustomers(datas: businesspartner.bo.Customer[]): void;
            /** 显示供应商数据 */
            showSuppliers(datas: businesspartner.bo.Supplier[]): void;
            /** 显示物料数据 */
            showMaterials(datas: bo.Material[]): void;

        }
    }
}
