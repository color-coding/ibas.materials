/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 物料批次服务 */
        export abstract class MaterialBatchService<T extends IMaterialBatchServiceView>
            extends ibas.ServiceApplication<T, IMaterialBatchContract[]> {
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.changeWorkingDataEvent = this.changeWorkingData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showWorkDatas(this.workDatas);
            }
            protected workDatas: ibas.IList<IMaterialBatchContract>;
            protected workingData: IMaterialBatchContract;
            /** 运行服务 */
            runService(contracts: IMaterialBatchContract[]): void {
                this.workDatas = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of contracts) {
                    if (ibas.objects.isNull(item)) {
                        continue;
                    }
                    if (item.batchManagement !== ibas.emYesNo.YES) {
                        continue;
                    }
                    this.workDatas.add(item);
                }
                if (this.workDatas.length > 0) {
                    super.show();
                } else {
                    // 没有需要处理的数据
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_work_datas_for_material_batch"));
                }
            }
            protected changeWorkingData(data: IMaterialBatchContract): void {
                if (!ibas.objects.isNull(data) && !this.workDatas.concat(data)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
                }
                this.workingData = data;
                if (ibas.objects.isNull(this.workingData)) {
                    this.view.showMaterialBatchItems([]);
                } else {
                    this.view.showMaterialBatchItems(this.workingData.materialBatches.filterDeleted());
                }
            }
        }
        /** 物料批次发货服务 */
        export class MaterialBatchIssueService extends MaterialBatchService<IMaterialBatchIssueView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "141e2a0f-3120-40a3-9bb4-f8b61672ed9c";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialbatch_issue";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchIssueService.APPLICATION_ID;
                this.name = MaterialBatchIssueService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }

            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.useMaterialBatchInventoryEvent = this.useMaterialBatchInventory;
                this.view.removeMaterialBatchItemEvent = this.removeMaterialBatchItem;
            }
            protected changeWorkingData(data: IMaterialBatchContract): void {
                super.changeWorkingData(data);
                if (ibas.objects.isNull(this.workingData)) {
                    this.view.showMaterialBatchInventories([]);
                    return;
                }
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = this.workingData.itemCode;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = this.workingData.warehouse;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_LOCKED_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emYesNo.NO.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.value = "0";
                this.busy(true);
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialBatch({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let results: ibas.ArrayList<bo.MaterialBatch> = new ibas.ArrayList<bo.MaterialBatch>();
                            // 修正可用的数量
                            for (let item of opRslt.resultObjects) {
                                for (let wItem of that.workDatas) {
                                    for (let jItem of wItem.materialBatches) {
                                        if (item.warehouse !== wItem.warehouse) {
                                            continue;
                                        }
                                        if (item.itemCode !== wItem.itemCode) {
                                            continue;
                                        }
                                        if (item.batchCode !== jItem.batchCode) {
                                            continue;
                                        }
                                        if (item.isDeleted) {
                                            // 已释放的加回
                                            item.quantity += jItem.quantity;
                                        } else {
                                            // 已被使用的减去
                                            item.quantity -= jItem.quantity;
                                        }
                                    }
                                }
                                if (item.quantity > 0) {
                                    results.add(item);
                                }
                            }
                            // 显示可用结果
                            that.view.showMaterialBatchInventories(results);
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            protected useMaterialBatchInventory(data: bo.IMaterialBatch): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_using")));
                    return;
                }
                if (ibas.objects.isNull(this.workingData)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
                }
                let total: number = this.workingData.materialBatches.total();
                if (total >= this.workingData.quantity) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
                    return;
                }
                let journal: bo.IMaterialBatchItem = this.workingData.materialBatches.create(data.batchCode);
                journal.quantity = this.workingData.quantity - total;
                this.view.showMaterialBatchItems(this.workingData.materialBatches.filterDeleted());
            }
            protected removeMaterialBatchItem(data: bo.IMaterialBatchItem): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_remove")));
                    return;
                }
                if (data.isNew) {
                    if (ibas.objects.isNull(this.workingData)) {
                        for (let wData of this.workDatas) {
                            if (wData.materialBatches.contain(data)) {
                                wData.materialBatches.remove(data);
                                break;
                            }
                        }
                    } else {
                        this.workingData.materialBatches.remove(data);
                    }
                } else {
                    data.delete();
                }
                if (ibas.objects.isNull(this.workingData)) {
                    let datas: ibas.IList<bo.IMaterialBatchItem> = new ibas.ArrayList<bo.IMaterialBatchItem>();
                    for (let wData of this.workDatas) {
                        datas.add(wData.materialBatches.filterDeleted());
                    }
                    this.view.showMaterialBatchItems(datas);
                } else {
                    this.view.showMaterialBatchItems(this.workingData.materialBatches.filterDeleted());
                }
            }
        }
        /** 物料批次收货服务 */
        export class MaterialBatchReceiptService extends MaterialBatchService<IMaterialBatchReceiptView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialbatch_receipt";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchReceiptService.APPLICATION_ID;
                this.name = MaterialBatchReceiptService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.createMaterialBatchItemEvent = this.createMaterialBatchItem;
                this.view.deleteMaterialBatchItemEvent = this.deleteMaterialBatchItem;
            }
            protected deleteMaterialBatchItem(data: bo.IMaterialBatchItem): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_remove")));
                    return;
                }
                if (data.isNew) {
                    if (ibas.objects.isNull(this.workingData)) {
                        for (let wData of this.workDatas) {
                            if (wData.materialBatches.contain(data)) {
                                wData.materialBatches.remove(data);
                                break;
                            }
                        }
                    } else {
                        this.workingData.materialBatches.remove(data);
                    }
                } else {
                    data.delete();
                }
                if (ibas.objects.isNull(this.workingData)) {
                    let datas: ibas.IList<bo.IMaterialBatchItem> = new ibas.ArrayList<bo.IMaterialBatchItem>();
                    for (let wData of this.workDatas) {
                        datas.add(wData.materialBatches.filterDeleted());
                    }
                    this.view.showMaterialBatchItems(datas);
                } else {
                    this.view.showMaterialBatchItems(this.workingData.materialBatches.filterDeleted());
                }
            }
            protected createMaterialBatchItem(): void {
                let datas: ibas.IList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                if (ibas.objects.isNull(this.workingData)) {
                    // 没有工作的，全部创建
                    for (let item of this.workDatas) {
                        if (item.quantity === item.materialBatches.total()) {
                            continue;
                        }
                        datas.add(item);
                    }
                } else {
                    // 仅创建工作的
                    datas.add(this.workingData);
                }
                let journals: ibas.IList<bo.IMaterialBatchItem> = new ibas.ArrayList<bo.IMaterialBatchItem>();
                for (let item of datas) {
                    let total: number = item.materialBatches.total();
                    if (total >= item.quantity) {
                        continue;
                    }
                    let journal: bo.IMaterialBatchItem = item.materialBatches.create();
                    journal.quantity = item.quantity - total;
                    journal.batchCode = ibas.dates.toString(ibas.dates.now(), "yyyyMMdd");
                    journals.add(journal);
                }
                this.view.showMaterialBatchItems(journals);
            }
        }
        /** 视图-物料批次服务 */
        export interface IMaterialBatchServiceView extends ibas.IBOView {
            /** 显示待处理数据 */
            showWorkDatas(datas: IMaterialBatchContract[]): void;
            /** 切换工作数据 */
            changeWorkingDataEvent: Function;
            /** 显示物料批次记录 */
            showMaterialBatchItems(datas: bo.IMaterialBatchItem[]): void;
        }
        /** 视图-物料批次发货 */
        export interface IMaterialBatchIssueView extends IMaterialBatchServiceView {
            /** 显示物料批次库存 */
            showMaterialBatchInventories(datas: bo.MaterialBatch[]): void;
            /** 使用物料批次库存 */
            useMaterialBatchInventoryEvent: Function;
            /** 移出物料批次库存 */
            removeMaterialBatchItemEvent: Function;
        }
        /** 视图-物料批次收货 */
        export interface IMaterialBatchReceiptView extends IMaterialBatchServiceView {
            /** 创建批次记录 */
            createMaterialBatchItemEvent: Function;
            /** 删除物料批次库存 */
            deleteMaterialBatchItemEvent: Function;
        }
        /** 物料批次发货服务映射 */
        export class MaterialBatchIssueServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchIssueService.APPLICATION_ID;
                this.name = MaterialBatchIssueService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialBatchIssueServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialBatchIssueService();
            }
        }
        /** 物料批次收货服务映射 */
        export class MaterialBatchReceiptServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchReceiptService.APPLICATION_ID;
                this.name = MaterialBatchReceiptService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialBatchReceiptServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialBatchReceiptService();
            }
        }

    }
}