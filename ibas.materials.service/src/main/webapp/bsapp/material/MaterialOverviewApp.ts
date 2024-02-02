/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 物料总览 */
        export class MaterialOverviewApp extends ibas.BOListApplication<IMaterialOverviewView, bo.Material> {
            /** 应用标识 */
            static APPLICATION_ID: string = "70050fec-f2c8-4cf4-a0ef-770ea7cb6ce4";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialoverview";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOverviewApp.APPLICATION_ID;
                this.name = MaterialOverviewApp.APPLICATION_NAME;
                this.boCode = MaterialOverviewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.viewDataEvent = this.viewData;
                this.view.fetchMaterialInventoryEvent = this.fetchMaterialInventory;
                this.view.fetchMaterialBatchEvent = this.fetchMaterialBatch;
                this.view.editMaterialBatchEvent = this.editMaterialBatch;
                this.view.fetchMaterialSerialEvent = this.fetchMaterialSerial;
                this.view.editMaterialSerialEvent = this.editMaterialSerial;
                this.view.fetchMaterialReservationEvent = this.fetchMaterialReservation;
                this.view.releaseMaterialReservationEvent = this.releaseMaterialReservation;
                this.view.fetchMaterialCommitedEvent = this.fetchMaterialCommited;
                this.view.fetchMaterialOrderedEvent = this.fetchMaterialOrdered;
                this.view.viewMaterialInventoryEvent = this.viewMaterialInventory;
                this.view.viewMaterialOrderedEvent = this.viewMaterialOrdered;
                this.view.viewMaterialCommitedEvent = this.viewMaterialCommited;
                this.view.viewMaterialBatchEvent = this.viewMaterialBatch;
                this.view.viewMaterialSerialEvent = this.viewMaterialSerial;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            run(criteria?: ibas.ICriteria | ibas.ICondition[]): void;
            run(): void {
                let criteria: ibas.ICriteria;
                if (arguments[0] instanceof ibas.Criteria) {
                    criteria = arguments[0];
                } else if (arguments[0] instanceof Array) {
                    criteria = new ibas.Criteria();
                    for (let item of arguments[0]) {
                        if (item instanceof ibas.Condition) {
                            criteria.conditions.add(item);
                        }
                    }
                }
                if (ibas.objects.isNull(criteria)) {
                    super.run.apply(this, arguments);
                } else {
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
                                that.view.showMaterials(opRslt.resultObjects);
                                if (opRslt.resultObjects.length > 0) {
                                    that.viewData(opRslt.resultObjects.firstOrDefault());
                                }
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
                }
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
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
                            that.view.showMaterials(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                let app: MaterialEditApp = new MaterialEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.Material): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    )); return;
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterial({
                    criteria: data.criteria(),
                    onCompleted: (opRslt) => {
                        if (opRslt.resultObjects.length > 0) {
                            this.view.showMaterial(opRslt.resultObjects.firstOrDefault());
                        } else {
                            this.view.showMaterial(data);
                        }
                    }
                });
            }
            /** 编辑物料，参数：目标数据 */
            protected editData(data: bo.Material): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: MaterialEditApp = new MaterialEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            private fetchMaterialInventory(data: bo.IMaterial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ""));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialInventory.PROPERTY_ITEMCODE_NAME;
                condition.value = data.code;
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialInventory({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IMaterialInventory>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showMaterialInventory(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private fetchMaterialBatch(data: bo.IMaterial, validOnly: boolean = true): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ""));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                condition.value = data.code;
                if (validOnly !== false) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_QUANTITY_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_THAN;
                    condition.value = "0";
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialBatch({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IMaterialBatch>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showMaterialBatch(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private editMaterialBatch(data: bo.MaterialBatch | bo.MaterialInventoryReservation): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                if (data instanceof bo.MaterialInventoryReservation) {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                    condition.value = data.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                    condition.value = data.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_BATCHCODE_NAME;
                    condition.value = data.batchCode;
                    let app: MaterialBatchEditApp = new MaterialBatchEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(criteria);
                } else if (data instanceof bo.MaterialBatch) {
                    let app: MaterialBatchEditApp = new MaterialBatchEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(data);
                }
            }
            private fetchMaterialSerial(data: bo.IMaterial, validOnly: boolean = true): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ""));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                condition.value = data.code;
                if (validOnly !== false) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSerial({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IMaterialSerial>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showMaterialSerial(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private editMaterialSerial(data: bo.MaterialSerial | bo.MaterialInventoryReservation): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                if (data instanceof bo.MaterialInventoryReservation) {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                    condition.value = data.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                    condition.value = data.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_SERIALCODE_NAME;
                    condition.value = data.serialCode;
                    let app: MaterialSerialEditApp = new MaterialSerialEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(criteria);
                } else if (data instanceof bo.MaterialSerial) {
                    let app: MaterialSerialEditApp = new MaterialSerialEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(data);
                }
            }
            private fetchMaterialReservation(data: bo.IMaterial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ""));
                    return;
                }
                let materialReservations: ibas.IList<ReservationWorkingItemResult> = new ibas.ArrayList<ReservationWorkingItemResult>();
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryReservation.PROPERTY_ITEMCODE_NAME;
                condition.value = data.code;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryReservation.PROPERTY_STATUS_NAME;
                condition.value = ibas.emBOStatus.OPEN.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryReservation.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.value = "0";
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialInventoryReservation.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.comparedAlias = bo.MaterialInventoryReservation.PROPERTY_CLOSEDQUANTITY_NAME;
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialInventoryReservation({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventoryReservation>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            for (let item of opRslt.resultObjects) {
                                materialReservations.add(new ReservationWorkingItemResult(item));
                            }
                            boRepository.fetchMaterialOrderedReservation({
                                criteria: criteria,
                                onCompleted(opRslt: ibas.IOperationResult<bo.MaterialOrderedReservation>): void {
                                    try {
                                        that.busy(false);
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        if (opRslt.resultObjects.length === 0) {
                                            that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                        }
                                        for (let item of opRslt.resultObjects) {
                                            materialReservations.add(new ReservationWorkingItemResult(item));
                                        }
                                        that.view.showMaterialReservation(materialReservations);
                                    } catch (error) {
                                        that.messages(error);
                                    }
                                }
                            });
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private releaseMaterialReservation(data: ReservationWorkingItemResult[]): void {
                let datas: ibas.IList<ReservationWorkingItemResult> = ibas.arrays.create(data);
                // 没有选择删除的对象
                if (datas.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                // 标记删除对象
                datas.forEach((value) => {
                    value.delete();
                });
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", datas.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        ibas.queues.execute(datas, (data, next) => {
                            // 处理数据
                            if (data.data instanceof bo.MaterialInventoryReservation) {
                                boRepository.saveMaterialInventoryReservation({
                                    beSaved: data.data,
                                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventoryReservation>): void {
                                        if (opRslt.resultCode !== 0) {
                                            next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                        } else {
                                            next();
                                        }
                                    }
                                });
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", data));
                            } else if (data.data instanceof bo.MaterialOrderedReservation) {
                                boRepository.saveMaterialOrderedReservation({
                                    beSaved: data.data,
                                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialOrderedReservation>): void {
                                        if (opRslt.resultCode !== 0) {
                                            next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                        } else {
                                            next();
                                        }
                                    }
                                });
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", data));
                            } else {
                                next();
                            }
                        }, (error) => {
                            // 处理完成
                            if (error instanceof Error) {
                                that.messages(ibas.emMessageType.ERROR, error.message);
                            } else {
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                            }
                            that.busy(false);
                        });
                        that.busy(true);
                    }
                });
            }
            private fetchMaterialOrdered(data: bo.IMaterial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ""));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ITEMCODE_NAME;
                condition.value = data.code;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ESTIMATE_NAME;
                condition.value = bo.emEstimateType.ORDERED.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_STATUS_NAME;
                condition.value = ibas.emBOStatus.OPEN.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.comparedAlias = bo.MaterialEstimateJournal.PROPERTY_CLOSEDQUANTITY_NAME;
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialEstimateJournal({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IMaterialEstimateJournal>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showMaterialOrdered(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private fetchMaterialCommited(data: bo.IMaterial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ""));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ITEMCODE_NAME;
                condition.value = data.code;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_ESTIMATE_NAME;
                condition.value = bo.emEstimateType.COMMITED.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_STATUS_NAME;
                condition.value = ibas.emBOStatus.OPEN.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialEstimateJournal.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.comparedAlias = bo.MaterialEstimateJournal.PROPERTY_CLOSEDQUANTITY_NAME;
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialEstimateJournal({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IMaterialEstimateJournal>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showMaterialCommited(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private viewMaterialInventory(data: bo.IMaterial | bo.IMaterialInventory): void {
                let itemCode: string, warehouse: string;
                if (data instanceof bo.Material) {
                    itemCode = data.code;
                } else if (data instanceof bo.MaterialInventory) {
                    itemCode = data.itemCode;
                    warehouse = data.warehouse;
                }
                let app: MaterialInventoryListApp = new MaterialInventoryListApp();
                app.viewShower = this.viewShower;
                app.navigation = this.navigation;
                app.run("ONHAND", itemCode, warehouse);
            }
            private viewMaterialOrdered(data: bo.IMaterial | bo.IMaterialInventory): void {
                let itemCode: string, warehouse: string;
                if (data instanceof bo.Material) {
                    itemCode = data.code;
                } else if (data instanceof bo.MaterialInventory) {
                    itemCode = data.itemCode;
                    warehouse = data.warehouse;
                }
                let app: MaterialInventoryListApp = new MaterialInventoryListApp();
                app.viewShower = this.viewShower;
                app.navigation = this.navigation;
                app.run("ONORDERED", itemCode, warehouse);
            }
            private viewMaterialCommited(data: bo.IMaterial | bo.IMaterialInventory): void {
                let itemCode: string, warehouse: string;
                if (data instanceof bo.Material) {
                    itemCode = data.code;
                } else if (data instanceof bo.MaterialInventory) {
                    itemCode = data.itemCode;
                    warehouse = data.warehouse;
                }
                let app: MaterialInventoryListApp = new MaterialInventoryListApp();
                app.viewShower = this.viewShower;
                app.navigation = this.navigation;
                app.run("ONCOMMITED", itemCode, warehouse);
            }
            private viewMaterialBatch(data: bo.IMaterialBatch): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_OBJECTKEY_NAME;
                condition.value = data.objectKey.toString();
                let app: MaterialBatchListApp = new MaterialBatchListApp();
                app.viewShower = this.viewShower;
                app.navigation = this.navigation;
                app.run(criteria);
            }
            private viewMaterialSerial(data: bo.IMaterialSerial): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_OBJECTKEY_NAME;
                condition.value = data.objectKey.toString();
                let app: MaterialSerialListApp = new MaterialSerialListApp();
                app.viewShower = this.viewShower;
                app.navigation = this.navigation;
                app.run(criteria);
            }
        }
        /** 视图-物料 */
        export interface IMaterialOverviewView extends ibas.IBOListView {
            /** 编辑物料事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 显示数据 */
            showMaterials(datas: bo.IMaterial[]): void;
            /** 显示物料基础信息 */
            showMaterial(data: bo.IMaterial): void;
            /** 查询库存事件 */
            fetchMaterialInventoryEvent: Function;
            /** 显示物料库存 */
            showMaterialInventory(datas: bo.IMaterialInventory[]): void;
            /** 查看库存明细事件 */
            viewMaterialInventoryEvent: Function;
            /** 查询批次信息 */
            fetchMaterialBatchEvent: Function;
            /** 编辑批次信息 */
            editMaterialBatchEvent: Function;
            /** 查看批次信息 */
            viewMaterialBatchEvent: Function;
            /** 显示物料批次信息 */
            showMaterialBatch(datas: bo.IMaterialBatch[]): void;
            /** 查询序列信息 */
            fetchMaterialSerialEvent: Function;
            /** 编辑序列信息 */
            editMaterialSerialEvent: Function;
            /** 查看序列信息 */
            viewMaterialSerialEvent: Function;
            /** 显示物料序列信息 */
            showMaterialSerial(datas: bo.IMaterialSerial[]): void;
            /** 查询预留信息 */
            fetchMaterialReservationEvent: Function;
            /** 释放预留信息 */
            releaseMaterialReservationEvent: Function;
            /** 显示物料预留信息 */
            showMaterialReservation(datas: ReservationWorkingItemResult[]): void;
            /** 查询订购信息 */
            fetchMaterialOrderedEvent: Function;
            /** 显示订购信息 */
            showMaterialOrdered(datas: bo.IMaterialEstimateJournal[]): void;
            /** 查看订购事件 */
            viewMaterialOrderedEvent: Function;
            /** 查询承诺信息 */
            fetchMaterialCommitedEvent: Function;
            /** 显示承诺信息 */
            showMaterialCommited(datas: bo.IMaterialEstimateJournal[]): void;
            /** 查看承诺事件 */
            viewMaterialCommitedEvent: Function;
        }
    }
}