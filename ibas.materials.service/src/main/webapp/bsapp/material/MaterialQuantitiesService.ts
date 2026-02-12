/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 物料数量服务 */
        export class MaterialQuantitiesService extends ibas.ServiceApplication<IMaterialQuantitiesView, IMaterialQuantitiesContract> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e1da0255-6ae6-47bd-ab4b-15591bd08528";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_material_quantities";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialQuantitiesService.APPLICATION_ID;
                this.name = MaterialQuantitiesService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.applyEvent = this.apply;
                this.view.fetchInventoryEvent = this.fetchInventoryEvent;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.contract)) {
                    this.material = new bo.Material();
                    this.material.code = "UNKNOWN";
                    this.material.name = ibas.i18n.prop("em_dbfieldtype_unknown");
                    this.view.showMaterial(this.material);
                } else {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    if (!ibas.strings.isEmpty(this.contract.itemCode)) {
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.Material.PROPERTY_CODE_NAME;
                        condition.value = this.contract.itemCode;
                    }
                    if (criteria.conditions.length > 0) {
                        let boReposiorty: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boReposiorty.fetchMaterial({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                try {
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    if (opRslt.resultObjects.length > 0) {
                                        this.material = opRslt.resultObjects.firstOrDefault();
                                    } else {
                                        this.material = new bo.Material();
                                        this.material.code = this.contract.itemCode;
                                        this.material.name = this.contract.itemDescription;
                                        this.material.serialManagement = this.contract.serialManagement;
                                        this.material.batchManagement = this.contract.batchManagement;
                                    }
                                    this.view.showMaterial(this.material);
                                } catch (error) {
                                    this.messages(error);
                                }
                            }
                        });
                    } else {
                        this.material = new bo.Material();
                        this.material.code = this.contract.itemCode;
                        this.material.name = this.contract.itemDescription;
                        this.material.serialManagement = this.contract.serialManagement;
                        this.material.batchManagement = this.contract.batchManagement;
                        this.view.showMaterial(this.material);
                    }
                }
            }
            protected contract: IMaterialQuantitiesContract;
            protected material: bo.IMaterial;
            protected runService(contract: IMaterialQuantitiesContract): void {
                this.contract = contract;
                this.show();
            }
            protected fetchInventoryEvent(criteria?: ibas.ICriteria): void {
                if (this.material.batchManagement === ibas.emYesNo.YES) {
                    if (ibas.objects.isNull(criteria)) {
                        criteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                        condition.value = this.material.code;
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_LOCKED_NAME;
                        condition.value = ibas.emYesNo.NO.toString();
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_QUANTITY_NAME;
                        condition.operation = ibas.emConditionOperation.GRATER_THAN;
                        condition.value = "0";
                        let sort: ibas.ISort = criteria.sorts.create();
                        sort.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                        sort.sortType = ibas.emSortType.ASCENDING;
                    }
                    if (criteria.conditions.length > 0) {
                        this.busy(true);
                        let boReposiorty: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boReposiorty.fetchMaterialBatch({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                this.view.showInventories(opRslt.resultObjects);
                                this.busy(false);
                            }
                        });
                    }
                } else if (this.material.serialManagement === ibas.emYesNo.YES) {
                    if (ibas.objects.isNull(criteria)) {
                        criteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                        condition.value = this.material.code;
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialSerial.PROPERTY_LOCKED_NAME;
                        condition.value = ibas.emYesNo.NO.toString();
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
                        condition.value = ibas.emYesNo.YES.toString();
                        let sort: ibas.ISort = criteria.sorts.create();
                        sort.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                        sort.sortType = ibas.emSortType.ASCENDING;
                    }
                    if (criteria.conditions.length > 0) {
                        this.busy(true);
                        let boReposiorty: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boReposiorty.fetchMaterialSerial({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                this.view.showInventories(opRslt.resultObjects);
                                this.busy(false);
                            }
                        });
                    }
                } else {
                    if (ibas.objects.isNull(criteria)) {
                        criteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.MaterialInventory.PROPERTY_ITEMCODE_NAME;
                        condition.value = this.material.code;
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialInventory.PROPERTY_FROZEN_NAME;
                        condition.value = ibas.emYesNo.NO.toString();
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialInventory.PROPERTY_ONHAND_NAME;
                        condition.operation = ibas.emConditionOperation.GRATER_THAN;
                        condition.value = "0";
                        let sort: ibas.ISort = criteria.sorts.create();
                        sort.alias = bo.MaterialInventory.PROPERTY_WAREHOUSE_NAME;
                        sort.sortType = ibas.emSortType.ASCENDING;
                    }
                    if (criteria.conditions.length > 0) {
                        this.busy(true);
                        let boReposiorty: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boReposiorty.fetchMaterialInventory({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                this.view.showInventories(opRslt.resultObjects);
                                this.busy(false);
                            }
                        });
                    }
                }
            }
            protected apply(datas: bo.MaterialInventory[] | bo.MaterialBatch[] | bo.MaterialSerial[]): void {
                if (!(this.contract.applyQuantity instanceof Function)) {
                    this.close();
                    return;
                }
                if (ibas.objects.isNull(datas)) {
                    return;
                }
                let quantity: number = 0;
                let uom: string = "";
                let warehouse: string = "";
                for (let data of datas) {
                    if (data instanceof bo.MaterialInventory) {
                        quantity += data.onHand;
                        warehouse = data.warehouse;
                        uom = this.material.inventoryUOM;
                    } else if (data instanceof bo.MaterialBatch) {
                        let batchItem: bo.IMaterialBatchItem = this.contract.materialBatches.firstOrDefault(
                            c => c.batchCode === (<any>data).batchCode
                        );
                        if (ibas.objects.isNull(batchItem)) {
                            batchItem = this.contract.materialBatches.create();
                            batchItem.batchCode = data.batchCode;
                            batchItem.quantity = data.quantity;
                        } else {
                            batchItem.quantity += data.quantity;
                        }
                        quantity += data.quantity;
                        warehouse = data.warehouse;
                        uom = this.material.inventoryUOM;
                    } else if (data instanceof bo.MaterialSerial) {
                        let serialItem: bo.IMaterialSerialItem = this.contract.materialSerials.firstOrDefault(
                            c => c.serialCode === (<any>data).serialCode
                        );
                        if (ibas.objects.isNull(serialItem)) {
                            serialItem = this.contract.materialSerials.create();
                            serialItem.serialCode = data.serialCode;
                        } else {
                            continue;
                        }
                        quantity += 1;
                        warehouse = data.warehouse;
                        uom = this.material.inventoryUOM;
                    }
                }
                this.contract.applyQuantity(quantity, uom, warehouse);
                this.close();
            }
        }
        /** 视图-物料数量 */
        export interface IMaterialQuantitiesView extends ibas.IView {
            /** 应用价格事件 */
            applyEvent: Function;
            /** 显示物料 */
            showMaterial(data: bo.IMaterial): void;
            /** 查询库存事件 */
            fetchInventoryEvent: Function;
            /** 显示物料库存 */
            showInventories(datas: bo.IMaterialInventory[] | bo.IMaterialBatch[] | bo.IMaterialSerial[]): void;
        }
        /**  物料数量服务映射 */
        export class MaterialQuantitiesServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialQuantitiesService.APPLICATION_ID;
                this.name = MaterialQuantitiesService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialQuantitiesServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialQuantitiesService();
            }
        }
    }
}