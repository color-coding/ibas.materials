/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        const PROPERTY_DATA: symbol = Symbol("data");
        const PROPERTY_RESULTS: symbol = Symbol("results");
        const PROPERTY_PARENT: symbol = Symbol("parent");
        const PROPERTY_EXTEND: symbol = Symbol("extend");
        const PROPERTY_ISDIRTY: symbol = Symbol("isDirty");
        export class BatchWorkingItem extends ibas.Bindable {
            constructor(data: IMaterialBatchContract) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_RESULTS] = new BatchWorkingItemResults(this);
            }
            get data(): IMaterialBatchContract {
                return this[PROPERTY_DATA];
            }
            /** 物料编码 */
            get itemCode(): string {
                return this.data.itemCode;
            }
            /** 物料描述 */
            get itemDescription(): string {
                return this.data.itemDescription;
            }
            set itemDescription(value: string) {
                this.data.itemDescription = value;
            }
            /** 物料版本 */
            get itemVersion(): string {
                return this.data.itemVersion;
            }
            set itemVersion(value: string) {
                this.data.itemVersion = value;
            }
            /** 仓库编码 */
            get warehouse(): string {
                return this.data.warehouse;
            }
            /** 数量 */
            get quantity(): number {
                return this.data.quantity;
            }
            /** 单位 */
            get uom(): string {
                return this.data.uom;
            }
            /** 剩余数量 */
            get remaining(): number {
                return this.quantity - this.results.total();
            }
            /** 操作结果 */
            get results(): BatchWorkingItemResults {
                return this[PROPERTY_RESULTS];
            }
            fireProcessing(): void {
                this.firePropertyChanged("remaining");
            }
        }
        export class BatchWorkingItemResults extends ibas.ArrayList<BatchWorkingItemResult> {
            constructor(parent: BatchWorkingItem) {
                super();
                if (parent instanceof BatchWorkingItem) {
                    // 数组删除时会创建临时对象
                    this[PROPERTY_PARENT] = parent;
                    let batches: ibas.IList<IExtraResultMaterialBatch> = ibas.arrays.create(this.parent.data.batches);
                    for (let data of this.parent.data.materialBatches) {
                        let extend: IExtraResultMaterialBatch = batches.firstOrDefault(c =>
                            c.itemCode === this.parent.itemCode &&
                            c.warehouse === this.parent.warehouse &&
                            c.batchCode === data.batchCode);
                        if (ibas.objects.isNull(extend)) {
                            extend = new ExtraResultMaterialBatch(this.parent.itemCode, this.parent.warehouse);
                        }
                        this.add(new BatchWorkingItemResult(data, extend));
                    }
                }
            }
            protected get parent(): BatchWorkingItem {
                return this[PROPERTY_PARENT];
            }
            create(batch?: bo.IMaterialBatch): BatchWorkingItemResult {
                let item: BatchWorkingItemResult = new BatchWorkingItemResult(
                    this.parent.data.materialBatches.create(),
                    new ExtraResultMaterialBatch(this.parent.itemCode, this.parent.warehouse)
                );
                if (!ibas.objects.isNull(batch)) {
                    item.batchCode = batch.batchCode;
                    item.supplierSerial = batch.supplierSerial;
                    item.expirationDate = batch.expirationDate;
                    item.manufacturingDate = batch.manufacturingDate;
                    item.specification = batch.specification;
                    item.admissionDate = batch.admissionDate;
                    item.location = batch.location;
                    item.version = batch.version;
                    item.notes = batch.notes;
                    item.quantity = batch.quantity;
                }
                this.add(item);
                this.parent.fireProcessing();
                return item;
            }
            add(item: BatchWorkingItemResult | BatchWorkingItemResult[]): void {
                super.add.apply(this, arguments);
                for (let one of ibas.arrays.create(item)) {
                    one.registerListener(this.listener);
                }
            }
            private listener: ibas.IPropertyChangedListener = {
                caller: this,
                propertyChanged: (property) => {
                    if (property === "quantity") {
                        this.parent.fireProcessing();
                    }
                }
            };
            remove(item: BatchWorkingItemResult): boolean {
                if (!(this.contain(item))) {
                    throw new RangeError();
                }
                item.removeListener(this.listener);
                if (item.data.isNew) {
                    super.remove(item);
                    this.parent.data.materialBatches.remove(item.data);
                    this.parent.fireProcessing();
                    return true;
                } else {
                    item.data.delete();
                    this.parent.fireProcessing();
                    return false;
                }
            }
            filterDeleted(): BatchWorkingItemResult[] {
                return this.where(c => c.data.isDeleted === false);
            }
            total(): number {
                let total: number = 0;
                for (let item of this.filterDeleted()) {
                    total += item.quantity;
                }
                return total;
            }
        }
        export class BatchWorkingItemResult extends ibas.Bindable {
            constructor(data: bo.IMaterialBatchItem, extend: IExtraResultMaterialBatch) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_EXTEND] = extend;
            }
            get data(): bo.IMaterialBatchItem {
                return this[PROPERTY_DATA];
            }
            get extend(): ExtraResultMaterialBatch {
                return this[PROPERTY_EXTEND];
            }
            itemCode(): string {
                return this.extend.itemCode;
            }
            warehouse(): string {
                return this.extend.warehouse;
            }
            get batchCode(): string {
                return this.data.batchCode;
            }
            set batchCode(value: string) {
                this.data.batchCode = value;
                this.extend.batchCode = value;
                this.firePropertyChanged("batchCode");
            }
            /** 数量 */
            get quantity(): number {
                return this.data.quantity;
            }
            set quantity(value: number) {
                this.data.quantity = value;
                this.firePropertyChanged("quantity");
            }
            /** 供应商序号 */
            get supplierSerial(): string {
                return this.extend.supplierSerial;
            }
            set supplierSerial(value: string) {
                this.extend.supplierSerial = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("supplierSerial");
            }
            /** 过期日期 */
            get expirationDate(): Date {
                return this.extend.expirationDate;
            }
            set expirationDate(value: Date) {
                this.extend.expirationDate = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("expirationDate");
            }
            /** 生产日期 */
            get manufacturingDate(): Date {
                return this.extend.manufacturingDate;
            }
            set manufacturingDate(value: Date) {
                this.extend.manufacturingDate = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("manufacturingDate");
            }
            /** 物料规格 */
            get specification(): number {
                return this.extend.specification;
            }
            set specification(value: number) {
                this.extend.specification = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("specification");
            }
            /** 准入日期 */
            get admissionDate(): Date {
                return this.extend.admissionDate;
            }
            set admissionDate(value: Date) {
                this.extend.admissionDate = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("admissionDate");
            }
            /** 版本 */
            get version(): string {
                return this.extend.version;
            }
            set version(value: string) {
                this.extend.version = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("version");
            }
            /** 位置 */
            get location(): string {
                return this.extend.location;
            }
            set location(value: string) {
                this.extend.location = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("location");
            }
            /** 备注 */
            get notes(): string {
                return this.extend.notes;
            }
            set notes(value: string) {
                this.extend.notes = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("notes");
            }
        }
        class ExtraResultMaterialBatch implements IExtraResultMaterialBatch {
            constructor(itemCode: string, warehouse: string) {
                this.itemCode = itemCode;
                this.warehouse = warehouse;
            }
            get isDirty(): boolean {
                return this[PROPERTY_ISDIRTY];
            }
            /** 物料编码 */
            itemCode: string;
            /** 仓库编码 */
            warehouse: string;
            /** 批次编号 */
            batchCode: string;
            /** 供应商序号 */
            supplierSerial: string;
            /** 过期日期 */
            expirationDate: Date;
            /** 生产日期 */
            manufacturingDate: Date;
            /** 物料规格 */
            specification: number;
            /** 准入日期 */
            admissionDate: Date;
            /** 位置 */
            location: string;
            /** 版本 */
            version: string;
            /** 备注 */
            notes: string;
        }
        class ServiceExtraResult extends ibas.ArrayList<IExtraResultMaterialBatch> implements IServiceExtraBatches {
            constructor() {
                super();
            }
            save(fnBack: (error?: Error) => void): void {
                super.push();
                let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                ibas.queues.execute(this, (data, next) => {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                    condition.value = data.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                    condition.value = data.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_BATCHCODE_NAME;
                    condition.value = data.batchCode;
                    boRepository.fetchMaterialBatch({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            if (opRslt.resultCode === 0) {
                                let batch: materials.bo.MaterialBatch = opRslt.resultObjects.firstOrDefault();
                                if (ibas.objects.isNull(batch)) {
                                    // 没有则新建对象，解决计划状态单据保存
                                    batch = new materials.bo.MaterialBatch();
                                    batch.itemCode = data.itemCode;
                                    batch.warehouse = data.warehouse;
                                    batch.batchCode = data.batchCode;
                                }
                                if (!ibas.strings.isEmpty(data.supplierSerial)) { batch.supplierSerial = data.supplierSerial; }
                                if (ibas.dates.isDate(data.manufacturingDate)) { batch.manufacturingDate = data.manufacturingDate; }
                                if (ibas.dates.isDate(data.expirationDate)) { batch.expirationDate = data.expirationDate; }
                                if (ibas.dates.isDate(data.admissionDate)) { batch.admissionDate = data.admissionDate; }
                                if (!ibas.strings.isEmpty(data.location)) { batch.location = data.location; }
                                if (!ibas.strings.isEmpty(data.version)) { batch.version = data.version; }
                                if (!ibas.strings.isEmpty(data.notes)) { batch.notes = data.notes; }
                                if (data.specification > 0) { batch.specification = data.specification; }
                                if (batch.isDirty) {
                                    boRepository.saveMaterialBatch({
                                        beSaved: batch,
                                        onCompleted: (opRslt) => {
                                            if (opRslt.resultCode === 0) {
                                                next();
                                            } else {
                                                if (fnBack instanceof Function) {
                                                    next(new Error(opRslt.message));
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    next();
                                }
                            } else {
                                if (fnBack instanceof Function) {
                                    next(new Error(opRslt.message));
                                }
                            }
                        }
                    });
                }, (error) => {
                    if (fnBack instanceof Function) {
                        fnBack(error);
                    }
                });
            }
            add(item: IExtraResultMaterialBatch): void;
            add(items: IExtraResultMaterialBatch[]): void;
            add(): void {
                for (let item of ibas.arrays.create(arguments[0])) {
                    let eItem: IExtraResultMaterialBatch = <IExtraResultMaterialBatch>item;
                    let tmp: any = this.firstOrDefault(c => c.itemCode === eItem.itemCode
                        && c.warehouse === eItem.warehouse
                        && c.batchCode === eItem.batchCode);
                    if (ibas.objects.isNull(tmp)) {
                        super.add(eItem);
                    } else {
                        this.removeAt(tmp);
                        super.add(eItem);
                    }
                }
            }
        }
        /** 物料批次服务 */
        export abstract class MaterialBatchService<T extends IMaterialBatchServiceView>
            extends ibas.ServiceApplication<T, IMaterialBatchContract[]> {
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.changeWorkingDataEvent = this.changeWorkingData;
                this.view.removeMaterialBatchItemEvent = this.removeMaterialBatchItem;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let item of this.workDatas) {
                    if (!ibas.strings.isEmpty(item.itemDescription)) {
                        continue;
                    }
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Material.PROPERTY_CODE_NAME;
                    condition.value = item.itemCode;
                    condition.relationship = ibas.emConditionRelationship.OR;
                }
                if (criteria.conditions.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            for (let rItem of opRslt.resultObjects) {
                                for (let wItem of this.workDatas) {
                                    if (ibas.strings.equalsIgnoreCase(rItem.code, wItem.itemCode)) {
                                        wItem.itemDescription = rItem.name;
                                    }
                                }
                            }
                            this.view.showWorkDatas(this.workDatas);
                        }
                    });
                } else {
                    this.view.showWorkDatas(this.workDatas);
                }
            }
            protected workDatas: ibas.IList<BatchWorkingItem>;
            protected workingData: BatchWorkingItem;
            /** 运行服务 */
            runService(contracts: IMaterialBatchContract[]): void {
                // 已保存单据，批次号加载逻辑
                let condition: ibas.ICondition = null;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let contract of contracts) {
                    // 有数据则不在检查
                    if (contract.batches instanceof Array) {
                        continue;
                    }
                    for (let item of contract.materialBatches) {
                        if (item.isNew === false) {
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                            condition.value = contract.itemCode;
                            condition.bracketOpen = 1;
                            condition.relationship = ibas.emConditionRelationship.OR;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                            condition.value = contract.warehouse;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialBatch.PROPERTY_BATCHCODE_NAME;
                            condition.value = item.batchCode;
                            condition.bracketClose = 1;
                        }
                    }
                }
                if (criteria.conditions.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterialBatch({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                // 赋值扩展对象
                                for (let contract of contracts) {
                                    if (!(contract.batches instanceof Array)) {
                                        contract.batches = new ibas.ArrayList<IExtraResultMaterialBatch>();
                                    }
                                    for (let batch of opRslt.resultObjects) {
                                        if (!ibas.strings.equals(contract.warehouse, batch.warehouse)) {
                                            continue;
                                        }
                                        if (!ibas.strings.equals(contract.itemCode, batch.itemCode)) {
                                            continue;
                                        }
                                        contract.batches.push({
                                            itemCode: batch.itemCode,
                                            warehouse: batch.warehouse,
                                            batchCode: batch.batchCode,
                                            supplierSerial: batch.supplierSerial,
                                            expirationDate: batch.expirationDate,
                                            manufacturingDate: batch.manufacturingDate,
                                            admissionDate: batch.admissionDate,
                                            specification: batch.specification,
                                            location: batch.location,
                                            version: batch.version,
                                            notes: batch.notes,
                                        });
                                    }
                                }
                                this.runService(contracts);
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                } else {
                    this.workDatas = new ibas.ArrayList<BatchWorkingItem>();
                    for (let item of contracts) {
                        if (ibas.objects.isNull(item)) {
                            continue;
                        }
                        if (item.batchManagement !== ibas.emYesNo.YES) {
                            continue;
                        }
                        if (!(item.quantity > 0)) {
                            continue;
                        }
                        this.workDatas.add(new BatchWorkingItem(item));
                    }
                    if (this.workDatas.length > 0) {
                        super.show();
                    } else {
                        // 没有需要处理的数据
                        this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_work_datas_for_material_batch"));
                    }
                }
            }
            protected changeWorkingData(data: BatchWorkingItem): void {
                if (!ibas.objects.isNull(data) && !this.workDatas.concat(data)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
                }
                this.workingData = data;
                if (ibas.objects.isNull(this.workingData)) {
                    this.view.showMaterialBatchItems([]);
                } else {
                    this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
                }
            }
            protected removeMaterialBatchItem(data: BatchWorkingItemResult | BatchWorkingItemResult[]): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_remove")));
                    return;
                }
                for (let item of ibas.arrays.create(data)) {
                    if (item.data.isNew) {
                        if (ibas.objects.isNull(this.workingData)) {
                            for (let wData of this.workDatas) {
                                if (wData.results.contain(item)) {
                                    wData.results.remove(item);
                                    break;
                                }
                            }
                        } else {
                            this.workingData.results.remove(item);
                        }
                    } else {
                        item.data.delete();
                    }
                }
                if (ibas.objects.isNull(this.workingData)) {
                    let datas: ibas.IList<BatchWorkingItemResult> = new ibas.ArrayList<BatchWorkingItemResult>();
                    for (let wData of this.workDatas) {
                        datas.add(wData.results.filterDeleted());
                    }
                    this.view.showMaterialBatchItems(datas);
                } else {
                    this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
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
            }
            protected changeWorkingData(data: BatchWorkingItem): void {
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
                if (!ibas.strings.isEmpty(this.workingData.itemVersion)) {
                    // 限制了版本
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_VERSION_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = this.workingData.itemVersion;
                }
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
                                    for (let jItem of wItem.results) {
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
                if (data.quantity <= 0) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_available")));
                    return;
                }
                if (ibas.objects.isNull(this.workingData)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
                }
                let total: number = this.workingData.remaining;
                if (total <= 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
                    return;
                }
                let journal: BatchWorkingItemResult = this.workingData.results.create(data);
                if (total > data.quantity) {
                    journal.quantity = data.quantity;
                } else {
                    journal.quantity = total;
                }
                data.quantity = data.quantity - journal.quantity;
                this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
            }
        }
        /** 物料批次收货服务 */
        export class MaterialBatchReceiptService extends MaterialBatchService<IMaterialBatchReceiptView>
            implements ibas.IService<ibas.IServiceWithResultCaller<IMaterialBatchContract[], IServiceExtraBatches>>  {
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
                this.view.chooseVersionEvent = this.chooseVersion;
                this.view.closeEvent = this.fireCompleted;
            }
            protected createMaterialBatchItem(mode: string): void {
                if (mode === "TIME_CODE") {
                    let datas: ibas.IList<BatchWorkingItem> = new ibas.ArrayList<BatchWorkingItem>();
                    if (ibas.objects.isNull(this.workingData)) {
                        // 没有工作的，全部创建
                        for (let item of this.workDatas) {
                            if (item.quantity === item.results.total()) {
                                continue;
                            }
                            datas.add(item);
                        }
                    } else {
                        // 仅创建工作的
                        datas.add(this.workingData);
                    }
                    let journals: ibas.IList<BatchWorkingItemResult> = new ibas.ArrayList<BatchWorkingItemResult>();
                    for (let item of datas) {
                        let total: number = item.results.total();
                        if (total >= item.quantity) {
                            continue;
                        }
                        let journal: BatchWorkingItemResult = item.results.create();
                        journal.quantity = item.quantity - total;
                        journal.batchCode = ibas.dates.toString(ibas.dates.now(), "yyyyMMdd");
                        journal.version = item.itemVersion;
                        journals.add(journal);
                    }
                    if (ibas.objects.isNull(this.workingData)) {
                        // 没选中工作内容，则显示新创建的
                        this.view.showMaterialBatchItems(journals);
                    } else {
                        // 选中工作内容，怎显示工作内容的
                        this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
                    }
                } else if (mode === "TIME_SERIAL_CODE") {
                    let datas: ibas.IList<BatchWorkingItem> = new ibas.ArrayList<BatchWorkingItem>();
                    if (ibas.objects.isNull(this.workingData)) {
                        // 没有工作的，全部创建
                        for (let item of this.workDatas) {
                            if (item.quantity === item.results.total()) {
                                continue;
                            }
                            datas.add(item);
                        }
                    } else {
                        // 仅创建工作的
                        datas.add(this.workingData);
                    }
                    let condition: ibas.ICondition;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let timePart: string = ibas.dates.toString(ibas.dates.now(), "yyyyMMdd");
                    let journals: ibas.IList<BatchWorkingItemResult> = new ibas.ArrayList<BatchWorkingItemResult>();
                    for (let item of datas) {
                        let total: number = item.results.total();
                        if (total >= item.quantity) {
                            continue;
                        }
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                        condition.operation = ibas.emConditionOperation.EQUAL;
                        condition.value = item.itemCode;
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                        condition.operation = ibas.emConditionOperation.EQUAL;
                        condition.value = item.warehouse;
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_BATCHCODE_NAME;
                        condition.operation = ibas.emConditionOperation.START;
                        condition.value = timePart;

                        let journal: BatchWorkingItemResult = item.results.create();
                        journal.quantity = item.quantity - total;
                        journal.batchCode = ibas.strings.format("{0}0001", timePart);
                        journal.version = item.itemVersion;
                        journals.add(journal);
                    }
                    if (criteria.conditions.length > 0) {
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boRepository.fetchMaterialBatch({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                if (opRslt.resultCode !== 0) {
                                    this.proceeding(new Error(opRslt.message));
                                } else {
                                    let serialPart0: number;
                                    let serialPart1: number;
                                    for (let journal of journals) {
                                        try {
                                            serialPart0 = ibas.numbers.valueOf(journal.batchCode.substring(timePart.length));
                                            for (let batch of opRslt.resultObjects) {
                                                if (!ibas.strings.equals(journal.itemCode(), batch.itemCode)) {
                                                    continue;
                                                }
                                                if (!ibas.strings.equals(journal.warehouse(), batch.warehouse)) {
                                                    continue;
                                                }
                                                serialPart1 = ibas.numbers.valueOf(batch.batchCode.substring(timePart.length));
                                                if (serialPart1 >= serialPart0) {
                                                    journal.batchCode = timePart + ibas.strings.fill(serialPart1 + 1, 4, "0");
                                                }
                                            }
                                        } catch (error) {
                                            this.proceeding(error);
                                        }
                                    }
                                }
                                if (ibas.objects.isNull(this.workingData)) {
                                    // 没选中工作内容，则显示新创建的
                                    this.view.showMaterialBatchItems(journals);
                                } else {
                                    // 选中工作内容，怎显示工作内容的
                                    this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
                                }
                            }
                        });
                    } else {
                        if (ibas.objects.isNull(this.workingData)) {
                            // 没选中工作内容，则显示新创建的
                            this.view.showMaterialBatchItems(journals);
                        } else {
                            // 选中工作内容，怎显示工作内容的
                            this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
                        }
                    }
                } else if (mode === "USED_CODE") {
                    if (ibas.objects.isNull(this.workingData)) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                            ibas.i18n.prop("shell_data_edit")
                        ));
                        return;
                    }
                    let that: this = this;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                    condition.value = this.workingData.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                    condition.value = this.workingData.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_LOCKED_NAME;
                    condition.value = ibas.emYesNo.NO.toString();
                    ibas.servicesManager.runChooseService<bo.MaterialBatch>({
                        boCode: bo.BO_CODE_MATERIALBATCH,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: criteria,
                        onCompleted(selecteds: ibas.IList<bo.MaterialBatch>): void {
                            for (let selected of selecteds) {
                                if (that.workingData.results.firstOrDefault(
                                    c => c.batchCode === selected.batchCode) !== null) {
                                    continue;
                                }
                                selected.quantity = that.workingData.remaining;
                                that.workingData.results.create(selected);
                            }
                            that.view.showMaterialBatchItems(that.workingData.results.filterDeleted());
                        }
                    });
                } else if (mode === "BASE_DOCUMENT") {
                    if (ibas.objects.isNull(this.workingData)) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                            ibas.i18n.prop("shell_data_edit")
                        ));
                        return;
                    }
                    if (!(!ibas.strings.isEmpty(this.workingData.data.documentType) && this.workingData.data.documentEntry > 0)) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
                        return;
                    }
                    let that: this = this;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                    condition.value = this.workingData.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                    condition.value = this.workingData.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_BASEDOCUMENTTYPE_NAME;
                    condition.value = this.workingData.data.documentType;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_BASEDOCUMENTENTRY_NAME;
                    condition.value = this.workingData.data.documentEntry.toString();
                    if (this.workingData.data.documentLineId > 0) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_BASEDOCUMENTLINEID_NAME;
                        condition.value = this.workingData.data.documentLineId.toString();
                    }
                    ibas.servicesManager.runChooseService<bo.MaterialBatch>({
                        boCode: bo.BO_CODE_MATERIALBATCH,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: criteria,
                        onCompleted(selecteds: ibas.IList<bo.MaterialBatch>): void {
                            for (let selected of selecteds) {
                                if (that.workingData.results.firstOrDefault(
                                    c => c.batchCode === selected.batchCode) !== null) {
                                    continue;
                                }
                                selected.quantity = that.workingData.remaining;
                                that.workingData.results.create(selected);
                            }
                            that.view.showMaterialBatchItems(that.workingData.results.filterDeleted());
                        }
                    });
                } else if (mode === "AGREEMENTS") {
                    let datas: ibas.IList<BatchWorkingItem> = new ibas.ArrayList<BatchWorkingItem>();
                    if (ibas.objects.isNull(this.workingData)) {
                        // 没有工作的，全部创建
                        for (let item of this.workDatas) {
                            if (item.quantity === item.results.total()) {
                                continue;
                            }
                            datas.add(item);
                        }
                    } else {
                        // 仅创建工作的
                        datas.add(this.workingData);
                    }
                    let journals: ibas.IList<BatchWorkingItemResult> = new ibas.ArrayList<BatchWorkingItemResult>();
                    for (let item of datas) {
                        let total: number = item.results.total();
                        if (total >= item.quantity) {
                            continue;
                        }
                        if (ibas.strings.isEmpty(item.data.agreements)) {
                            continue;
                        }
                        let journal: BatchWorkingItemResult = item.results.create();
                        journal.quantity = item.quantity - total;
                        journal.batchCode = item.data.agreements;
                        journal.version = item.itemVersion;
                        journals.add(journal);
                    }
                    if (ibas.objects.isNull(this.workingData)) {
                        // 没选中工作内容，则显示新创建的
                        this.view.showMaterialBatchItems(journals);
                    } else {
                        // 选中工作内容，怎显示工作内容的
                        this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
                    }
                }
            }

            run(): void {
                if (arguments.length === 1) {
                    // 判断是否为选择契约
                    let caller: ibas.IServiceWithResultCaller<IMaterialBatchContract[], IServiceExtraBatches> = arguments[0];
                    if (ibas.objects.instanceOf(caller.proxy, ibas.ServiceProxy)) {
                        this.onCompleted = caller.onCompleted;
                    }
                }
                // 保持参数原样传递
                super.run.apply(this, arguments);
            }
            /** 完成事件 */
            private onCompleted: Function;
            /** 触发完成事件 */
            protected fireCompleted(): void {
                // 关闭视图
                this.close();
                if (!(this.onCompleted instanceof Function)) {
                    return;
                }
                try {
                    let result: ServiceExtraResult = new ServiceExtraResult();
                    for (let wItem of this.workDatas) {
                        for (let rItem of wItem.results) {
                            if (rItem.data.isDeleted === true) {
                                continue;
                            }
                            if (rItem.extend.isDirty !== true) {
                                continue;
                            }
                            result.add(rItem.extend);
                        }
                    }
                    // 调用完成事件
                    this.onCompleted.call(this.onCompleted, result);
                } catch (error) {
                    // 完成事件出错
                    this.messages(error);
                }
            }
            /** 选择物料版本 */
            private chooseVersion(caller: BatchWorkingItemResult): void {
                if (ibas.objects.isNull(caller)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                ibas.servicesManager.runChooseService<bo.MaterialVersion>({
                    boCode: bo.MaterialVersion.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialVersion.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, caller.itemCode()),
                        new ibas.Condition(bo.MaterialVersion.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.MaterialVersion>): void {
                        let selected: bo.MaterialVersion = selecteds.firstOrDefault();
                        caller.version = selected.name;
                    }
                });
            }
        }
        /** 物料批次列表服务 */
        export class MaterialBatchListService extends MaterialBatchService<IMaterialBatchListsView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "5cf7bf70-fbc6-4655-90be-38cc48f2bfac";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialbatch_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchListService.APPLICATION_ID;
                this.name = MaterialBatchListService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addMaterialBatchItemEvent = this.addMaterialBatchItem;
            }
            protected addMaterialBatchItem(createNew: boolean = true): void {
                if (ibas.objects.isNull(this.workingData)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let total: number = this.workingData.quantity - this.workingData.results.total();
                if (total <= 0) {
                    return;
                }
                if (createNew === true) {
                    let journal: BatchWorkingItemResult = this.workingData.results.create();
                    journal.quantity = total;
                    journal.batchCode = ibas.dates.toString(ibas.dates.now(), "yyyyMMdd");
                    this.view.showMaterialBatchItems(this.workingData.results.filterDeleted());
                } else {
                    let that: this = this;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                    condition.value = this.workingData.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                    condition.value = this.workingData.warehouse;
                    ibas.servicesManager.runChooseService<bo.MaterialBatch>({
                        boCode: bo.BO_CODE_MATERIALBATCH,
                        criteria: criteria,
                        onCompleted(selecteds: ibas.IList<bo.MaterialBatch>): void {
                            for (let selected of selecteds) {
                                if (total <= 0) {
                                    break;
                                }
                                let item: BatchWorkingItemResult = that.workingData.results.create();
                                item.batchCode = selected.batchCode;
                                item.quantity = selected.quantity > total ? total : selected.quantity;
                                total -= item.quantity;
                            }
                            that.view.showMaterialBatchItems(that.workingData.results.filterDeleted());
                        }
                    });
                }
            }
        }
        /** 视图-物料批次服务 */
        export interface IMaterialBatchServiceView extends ibas.IBOView {
            /** 显示待处理数据 */
            showWorkDatas(datas: BatchWorkingItem[]): void;
            /** 切换工作数据 */
            changeWorkingDataEvent: Function;
            /** 显示物料批次记录 */
            showMaterialBatchItems(datas: BatchWorkingItemResult[]): void;
            /** 移出物料批次库存 */
            removeMaterialBatchItemEvent: Function;
        }
        /** 视图-物料批次发货 */
        export interface IMaterialBatchIssueView extends IMaterialBatchServiceView {
            /** 显示物料批次库存 */
            showMaterialBatchInventories(datas: bo.MaterialBatch[]): void;
            /** 使用物料批次库存 */
            useMaterialBatchInventoryEvent: Function;
        }
        /** 视图-物料批次收货 */
        export interface IMaterialBatchReceiptView extends IMaterialBatchServiceView {
            /** 创建批次记录 */
            createMaterialBatchItemEvent: Function;
            /** 选择物料版本 */
            chooseVersionEvent: Function;
        }
        /** 视图-物料批次列表 */
        export interface IMaterialBatchListsView extends IMaterialBatchServiceView {
            /** 添加批次记录 */
            addMaterialBatchItemEvent: Function;
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
        /** 物料批次列表服务映射 */
        export class MaterialBatchListServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchListService.APPLICATION_ID;
                this.name = MaterialBatchListService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialBatchListServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialBatchListService();
            }
        }

    }
}