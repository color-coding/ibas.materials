/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        export class MaterialsWarehouse {
            constructor(material: bo.IMaterial, warehouses?: bo.IWarehouse[]) {
                this.material = material;
                this.warehouses = new ibas.ArrayList<bo.IWarehouse>();
                if (warehouses instanceof Array) {
                    for (let item of warehouses) {
                        this.warehouses.add(item);
                    }
                }
            }
            material: bo.IMaterial;
            get code(): string {
                return this.material.code;
            }
            get name(): string {
                return this.material.name;
            }
            warehouses: ibas.IList<bo.IWarehouse>;
        }
        /** 列表应用-物料库存 */
        export class MaterialInventoryListApp extends ibas.BOListApplication<IMaterialInventoryListView, bo.Material> {
            /** 应用标识 */
            static APPLICATION_ID: string = "32c45fcd-47cd-4074-a853-4290967bcbbc";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialinventory_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryListApp.APPLICATION_ID;
                this.name = MaterialInventoryListApp.APPLICATION_NAME;
                this.boCode = MaterialInventoryListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                this.view.fetchInventoryJournalEvent = this.fetchInventoryJournal;
                this.view.fetchCommitedJournalEvent = this.fetchCommitedJournal;
                this.view.fetchOrderedJournalEvent = this.fetchOrderedJournal;
                this.view.fetchDataEvent = this.fetchData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            private warehouses: ibas.IList<bo.IWarehouse>;
            run(type?: "ONHAND" | "ONORDERED" | "ONCOMMITED", itemCode?: string, warehouse?: string): void;
            run(criteria?: ibas.ICriteria | ibas.ICondition[]): void;
            run(): void {
                if (ibas.objects.isNull(this.warehouses)) {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Warehouse.PROPERTY_ACTIVATED_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchWarehouse({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            this.warehouses = opRslt.resultObjects;
                            this.run.apply(this, arguments);
                        }
                    });
                } else {
                    if (arguments.length > 0 && typeof arguments[0] === "string") {
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        criteria.conditions.add(conditions.material.create());
                        if (criteria.conditions.length > 1) {
                            criteria.conditions.firstOrDefault().bracketOpen++;
                            criteria.conditions.lastOrDefault().bracketClose++;
                        }
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.Material.PROPERTY_CODE_NAME;
                        condition.value = arguments[1];
                        this.fetchData(criteria, arguments[2], arguments[3]);
                    } else {
                        super.run.apply(this, arguments);
                    }
                }
            }
            protected newData(): void {
                throw new Error("Method not implemented.");
            }
            protected viewData(data: bo.Material): void {
                throw new Error("Method not implemented.");
            }
            protected fetchData(criteria: ibas.ICriteria, warehouse?: string, type?: string): void {
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                    criteria.conditions.add(conditions.material.create());
                }
                if (criteria.sorts.length === 0) {
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.Material.PROPERTY_DOCENTRY_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterial({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
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
                            let datas: ibas.IList<MaterialsWarehouse> = new ibas.ArrayList<MaterialsWarehouse>();
                            for (let item of opRslt.resultObjects) {
                                datas.add(new MaterialsWarehouse(item, that.warehouses.filter(c => ibas.objects.isNull(warehouse) || c.code === warehouse)));
                            }
                            that.view.showDatas(datas, type);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            private fetchInventoryJournal(itemCode: string, warehouse?: string, dateFrom?: Date, dateTo?: Date): void {
                if (ibas.objects.isNull(itemCode)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    )); return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryJournal.PROPERTY_ITEMCODE_NAME;
                condition.value = itemCode;
                if (!ibas.strings.isEmpty(warehouse)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventoryJournal.PROPERTY_WAREHOUSE_NAME;
                    condition.value = warehouse;
                }
                if (dateFrom instanceof Date) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventoryJournal.PROPERTY_DELIVERYDATE_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = ibas.dates.toString(dateFrom, "yyyy-MM-dd");
                }
                if (dateTo instanceof Date) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventoryJournal.PROPERTY_DELIVERYDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = ibas.dates.toString(dateTo, "yyyy-MM-dd");
                }
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = bo.MaterialInventoryJournal.PROPERTY_OBJECTKEY_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialInventoryJournal({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            this.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showInventoryJournals(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
                this.busy(true);
            }
            private fetchOrderedJournal(itemCode: string, warehouse?: string, dateFrom?: Date, dateTo?: Date): void {
                if (ibas.objects.isNull(itemCode)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    )); return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ITEMCODE_NAME;
                condition.value = itemCode;
                if (!ibas.strings.isEmpty(warehouse)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialEstimateJournal.PROPERTY_WAREHOUSE_NAME;
                    condition.value = warehouse;
                }
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ESTIMATE_NAME;
                condition.value = bo.emEstimateType.ORDERED.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_STATUS_NAME;
                condition.value = ibas.emBOStatus.OPEN.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_CLOSEDQUANTITY_NAME;
                condition.comparedAlias = bo.MaterialEstimateJournal.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.LESS_THAN;
                if (dateFrom instanceof Date) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialEstimateJournal.PROPERTY_DELIVERYDATE_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = ibas.dates.toString(dateFrom, "yyyy-MM-dd");
                }
                if (dateTo instanceof Date) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialEstimateJournal.PROPERTY_DELIVERYDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = ibas.dates.toString(dateTo, "yyyy-MM-dd");
                }
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = bo.MaterialEstimateJournal.PROPERTY_OBJECTKEY_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialEstimateJournal({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            this.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showOrderedJournals(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
                this.busy(true);
            }
            private fetchCommitedJournal(itemCode: string, warehouse?: string, dateFrom?: Date, dateTo?: Date): void {
                if (ibas.objects.isNull(itemCode)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    )); return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ITEMCODE_NAME;
                condition.value = itemCode;
                if (!ibas.strings.isEmpty(warehouse)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialEstimateJournal.PROPERTY_WAREHOUSE_NAME;
                    condition.value = warehouse;
                }
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ESTIMATE_NAME;
                condition.value = bo.emEstimateType.COMMITED.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_STATUS_NAME;
                condition.value = ibas.emBOStatus.OPEN.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_CLOSEDQUANTITY_NAME;
                condition.comparedAlias = bo.MaterialEstimateJournal.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.LESS_THAN;
                if (dateFrom instanceof Date) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialEstimateJournal.PROPERTY_DELIVERYDATE_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = ibas.dates.toString(dateFrom, "yyyy-MM-dd");
                }
                if (dateTo instanceof Date) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialEstimateJournal.PROPERTY_DELIVERYDATE_NAME;
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = ibas.dates.toString(dateTo, "yyyy-MM-dd");
                }
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = bo.MaterialEstimateJournal.PROPERTY_OBJECTKEY_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialEstimateJournal({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            this.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showCommitedJournals(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
                this.busy(true);
            }
        }
        /** 视图-物料库存 */
        export interface IMaterialInventoryListView extends ibas.IBOListView {
            /** 显示数据 */
            showDatas(datas: MaterialsWarehouse[], type?: string): void;
            /** 查询物料库存交易记录 */
            fetchInventoryJournalEvent: Function;
            /** 显示物料库存交易数据 */
            showInventoryJournals(datas: bo.MaterialInventoryJournal[]): void;
            /** 查询物料订购交易记录 */
            fetchOrderedJournalEvent: Function;
            /** 显示物料订购交易数据 */
            showOrderedJournals(datas: bo.MaterialEstimateJournal[]): void;
            /** 查询物料承诺交易记录 */
            fetchCommitedJournalEvent: Function;
            /** 显示物料承诺交易数据 */
            showCommitedJournals(datas: bo.MaterialEstimateJournal[]): void;
        }
    }
}