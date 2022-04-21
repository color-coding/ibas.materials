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
        export class SerialWorkingItem extends ibas.Bindable {
            constructor(data: IMaterialSerialContract) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_RESULTS] = new SerialWorkingItemResults(this);
            }
            get data(): IMaterialSerialContract {
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
            get results(): SerialWorkingItemResults {
                return this[PROPERTY_RESULTS];
            }
            fireProcessing(): void {
                this.firePropertyChanged("remaining");
            }
        }
        export class SerialWorkingItemResults extends ibas.ArrayList<SerialWorkingItemResult> {
            constructor(parent: SerialWorkingItem) {
                super();
                if (parent instanceof SerialWorkingItem) {
                    // 数组删除时会创建临时对象
                    this[PROPERTY_PARENT] = parent;
                    let serials: ibas.IList<IExtraResultMaterialSerial> = ibas.arrays.create(this.parent.data.serials);
                    for (let data of this.parent.data.materialSerials) {
                        let extend: IExtraResultMaterialSerial = serials.firstOrDefault(c =>
                            c.itemCode === this.parent.itemCode &&
                            c.warehouse === this.parent.warehouse &&
                            c.serialCode === data.serialCode);
                        if (ibas.objects.isNull(extend)) {
                            extend = new ExtraResultMaterialSerial(this.parent.itemCode, this.parent.warehouse);
                        }
                        this.add(new SerialWorkingItemResult(data, extend));
                    }
                }
            }
            protected get parent(): SerialWorkingItem {
                return this[PROPERTY_PARENT];
            }
            create(serial?: bo.IMaterialSerial): SerialWorkingItemResult {
                let item: SerialWorkingItemResult = new SerialWorkingItemResult(
                    this.parent.data.materialSerials.create(),
                    new ExtraResultMaterialSerial(this.parent.itemCode, this.parent.warehouse)
                );
                if (!ibas.objects.isNull(serial)) {
                    item.serialCode = serial.serialCode;
                    item.supplierSerial = serial.supplierSerial;
                    item.batchSerial = serial.batchSerial;
                    item.expirationDate = serial.expirationDate;
                    item.manufacturingDate = serial.manufacturingDate;
                    item.specification = serial.specification;
                    item.admissionDate = serial.admissionDate;
                    item.warrantyStartDate = serial.warrantyStartDate;
                    item.warrantyEndDate = serial.warrantyEndDate;
                    item.location = serial.location;
                    item.notes = serial.notes;
                }
                this.add(item);
                this.parent.fireProcessing();
                return item;
            }
            remove(item: SerialWorkingItemResult): boolean {
                if (!(this.contain(item))) {
                    throw new RangeError();
                }
                if (item.data.isNew) {
                    super.remove(item);
                    this.parent.data.materialSerials.remove(item.data);
                    this.parent.fireProcessing();
                    return true;
                } else {
                    item.data.delete();
                    this.parent.fireProcessing();
                    return false;
                }
            }
            filterDeleted(): SerialWorkingItemResult[] {
                return this.where(c => c.data.isDeleted === false);
            }
            total(): number {
                return this.filterDeleted().length;
            }
        }
        export class SerialWorkingItemResult extends ibas.Bindable {
            constructor(data: bo.IMaterialSerialItem, extend: IExtraResultMaterialSerial) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_EXTEND] = extend;
            }
            get data(): bo.IMaterialSerialItem {
                return this[PROPERTY_DATA];
            }
            get extend(): ExtraResultMaterialSerial {
                return this[PROPERTY_EXTEND];
            }
            itemCode(): string {
                return this.extend.itemCode;
            }
            warehouse(): string {
                return this.extend.warehouse;
            }
            get serialCode(): string {
                return this.data.serialCode;
            }
            set serialCode(value: string) {
                this.data.serialCode = value;
                this.extend.serialCode = value;
                this.firePropertyChanged("serialCode");
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
            /** 批次序号 */
            get batchSerial(): string {
                return this.extend.batchSerial;
            }
            set batchSerial(value: string) {
                this.extend.batchSerial = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("batchSerial");
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
            /** 保修开始日期 */
            get warrantyStartDate(): Date {
                return this.extend.warrantyStartDate;
            }
            set warrantyStartDate(value: Date) {
                this.extend.warrantyStartDate = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("warrantyStartDate");
            }
            /** 保修结束日期 */
            get warrantyEndDate(): Date {
                return this.extend.warrantyEndDate;
            }
            set warrantyEndDate(value: Date) {
                this.extend.warrantyEndDate = value;
                this.extend[PROPERTY_ISDIRTY] = true;
                this.firePropertyChanged("warrantyEndDate");
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
        class ExtraResultMaterialSerial implements IExtraResultMaterialSerial {
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
            /** 序列编号 */
            serialCode: string;
            /** 供应商序号 */
            supplierSerial: string;
            /** 批次序号 */
            batchSerial: string;
            /** 过期日期 */
            expirationDate: Date;
            /** 生产日期 */
            manufacturingDate: Date;
            /** 物料规格 */
            specification: number;
            /** 准入日期 */
            admissionDate: Date;
            /** 保修开始日期 */
            warrantyStartDate: Date;
            /** 保修结束日期 */
            warrantyEndDate: Date;
            /** 位置 */
            location: string;
            /** 备注 */
            notes: string;
        }
        class ServiceExtraResult extends ibas.ArrayList<IExtraResultMaterialSerial> implements IServiceExtraSerials {
            constructor() {
                super();
            }
            save(fnBack: (error?: Error) => void): void {
                super.push();
                let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                ibas.queues.execute(this, (data, next) => {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                    condition.value = data.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                    condition.value = data.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_SERIALCODE_NAME;
                    condition.value = data.serialCode;
                    boRepository.fetchMaterialSerial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            if (opRslt.resultCode === 0) {
                                let serial: materials.bo.MaterialSerial = opRslt.resultObjects.firstOrDefault();
                                if (ibas.objects.isNull(serial)) {
                                    // 没有则新建对象，解决计划状态单据保存
                                    serial = new materials.bo.MaterialSerial();
                                    serial.itemCode = data.itemCode;
                                    serial.warehouse = data.warehouse;
                                    serial.serialCode = data.serialCode;
                                }
                                if (!ibas.strings.isEmpty(data.supplierSerial)) { serial.supplierSerial = data.supplierSerial; }
                                if (!ibas.strings.isEmpty(data.batchSerial)) { serial.batchSerial = data.batchSerial; }
                                if (ibas.dates.isDate(data.manufacturingDate)) { serial.manufacturingDate = data.manufacturingDate; }
                                if (ibas.dates.isDate(data.expirationDate)) { serial.expirationDate = data.expirationDate; }
                                if (ibas.dates.isDate(data.admissionDate)) { serial.admissionDate = data.admissionDate; }
                                if (ibas.dates.isDate(data.warrantyStartDate)) { serial.warrantyStartDate = data.warrantyStartDate; }
                                if (ibas.dates.isDate(data.warrantyEndDate)) { serial.warrantyEndDate = data.warrantyEndDate; }
                                if (!ibas.strings.isEmpty(data.location)) { serial.location = data.location; }
                                if (!ibas.strings.isEmpty(data.notes)) { serial.notes = data.notes; }
                                if (data.specification > 0) { serial.specification = data.specification; }
                                if (serial.isDirty) {
                                    boRepository.saveMaterialSerial({
                                        beSaved: serial,
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
            add(item: IExtraResultMaterialSerial): void;
            add(items: IExtraResultMaterialSerial[]): void;
            add(): void {
                for (let item of ibas.arrays.create(arguments[0])) {
                    let eItem: IExtraResultMaterialSerial = <IExtraResultMaterialSerial>item;
                    let tmp: any = this.firstOrDefault(c => c.itemCode === eItem.itemCode
                        && c.warehouse === eItem.warehouse
                        && c.serialCode === eItem.serialCode);
                    if (ibas.objects.isNull(tmp)) {
                        super.add(eItem);
                    } else {
                        this.removeAt(tmp);
                        super.add(eItem);
                    }
                }
            }
        }
        /** 物料序列服务 */
        export abstract class MaterialSerialService<T extends IMaterialSerialServiceView>
            extends ibas.ServiceApplication<T, IMaterialSerialContract[]> {
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.changeWorkingDataEvent = this.changeWorkingData;
                this.view.removeMaterialSerialItemEvent = this.removeMaterialSerialItem;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showWorkDatas(this.workDatas);
            }
            protected workDatas: ibas.IList<SerialWorkingItem>;
            protected workingData: SerialWorkingItem;
            /** 运行服务 */
            runService(contracts: IMaterialSerialContract[]): void {
                // 已保存单据，序列号加载逻辑
                let condition: ibas.ICondition = null;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let contract of contracts) {
                    // 有数据则不在检查
                    if (contract.serials instanceof Array) {
                        continue;
                    }
                    for (let item of contract.materialSerials) {
                        if (item.isNew === false) {
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                            condition.value = contract.itemCode;
                            condition.bracketOpen = 1;
                            condition.relationship = ibas.emConditionRelationship.OR;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                            condition.value = contract.warehouse;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialSerial.PROPERTY_SERIALCODE_NAME;
                            condition.value = item.serialCode;
                            condition.bracketClose = 1;
                        }
                    }
                }
                if (criteria.conditions.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterialSerial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                // 赋值扩展对象
                                for (let contract of contracts) {
                                    if (!(contract.serials instanceof Array)) {
                                        contract.serials = new ibas.ArrayList<IExtraResultMaterialSerial>();
                                    }
                                    for (let serial of opRslt.resultObjects) {
                                        if (!ibas.strings.equals(contract.warehouse, serial.warehouse)) {
                                            continue;
                                        }
                                        if (!ibas.strings.equals(contract.itemCode, serial.itemCode)) {
                                            continue;
                                        }
                                        contract.serials.push({
                                            itemCode: serial.itemCode,
                                            warehouse: serial.warehouse,
                                            serialCode: serial.serialCode,
                                            supplierSerial: serial.supplierSerial,
                                            batchSerial: serial.batchSerial,
                                            expirationDate: serial.expirationDate,
                                            manufacturingDate: serial.manufacturingDate,
                                            specification: serial.specification,
                                            admissionDate: serial.admissionDate,
                                            warrantyStartDate: serial.warrantyStartDate,
                                            warrantyEndDate: serial.warrantyEndDate,
                                            location: serial.location,
                                            notes: serial.notes,
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
                    this.workDatas = new ibas.ArrayList<SerialWorkingItem>();
                    for (let item of contracts) {
                        if (ibas.objects.isNull(item)) {
                            continue;
                        }
                        if (item.serialManagement !== ibas.emYesNo.YES) {
                            continue;
                        }
                        if (!(item.quantity > 0)) {
                            continue;
                        }
                        this.workDatas.add(new SerialWorkingItem(item));
                    }
                    if (this.workDatas.length > 0) {
                        super.show();
                    } else {
                        // 没有需要处理的数据
                        this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_work_datas_for_material_serial"));
                    }
                }
            }
            protected changeWorkingData(data: SerialWorkingItem): void {
                if (!ibas.objects.isNull(data) && !this.workDatas.concat(data)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
                }
                this.workingData = data;
                if (ibas.objects.isNull(this.workingData)) {
                    this.view.showMaterialSerialItems([]);
                } else {
                    this.view.showMaterialSerialItems(this.workingData.results.filterDeleted());
                }
            }
            protected removeMaterialSerialItem(data: SerialWorkingItemResult | SerialWorkingItemResult[]): void {
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
                    let datas: ibas.IList<SerialWorkingItemResult> = new ibas.ArrayList<SerialWorkingItemResult>();
                    for (let wData of this.workDatas) {
                        datas.add(wData.results.filterDeleted());
                    }
                    this.view.showMaterialSerialItems(datas);
                } else {
                    this.view.showMaterialSerialItems(this.workingData.results.filterDeleted());
                }
            }
        }
        /** 物料序列发货服务 */
        export class MaterialSerialIssueService extends MaterialSerialService<IMaterialSerialIssueView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "a8542551-c39a-4e11-abbc-cfa9eff6de8b";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialserial_issue";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialIssueService.APPLICATION_ID;
                this.name = MaterialSerialIssueService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }

            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.useMaterialSerialInventoryEvent = this.useMaterialSerialInventory;
            }
            protected changeWorkingData(data: SerialWorkingItem): void {
                super.changeWorkingData(data);
                if (ibas.objects.isNull(this.workingData)) {
                    this.view.showMaterialSerialInventories([]);
                    return;
                }
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = this.workingData.itemCode;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = this.workingData.warehouse;
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_LOCKED_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emYesNo.NO.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emYesNo.YES.toString();
                this.busy(true);
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSerial({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let results: ibas.ArrayList<bo.MaterialSerial> = new ibas.ArrayList<bo.MaterialSerial>();
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
                                        if (item.serialCode !== jItem.serialCode) {
                                            continue;
                                        }
                                        if (item.isDeleted) {
                                            // 已释放的加回
                                            item.inStock = ibas.emYesNo.YES;
                                        } else {
                                            // 已被使用的减去
                                            item.inStock = ibas.emYesNo.NO;
                                        }
                                    }
                                }
                                if (item.inStock === ibas.emYesNo.YES) {
                                    results.add(item);
                                }
                            }
                            // 显示可用结果
                            that.view.showMaterialSerialInventories(results);
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
            protected useMaterialSerialInventory(data: bo.IMaterialSerial): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_using")));
                    return;
                }
                if (data.inStock !== ibas.emYesNo.YES) {
                    this.messages(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_available")));
                    return;
                }
                if (ibas.objects.isNull(this.workingData)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
                }
                if (this.workingData.remaining <= 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
                    return;
                }
                this.workingData.results.create(data);
                data.inStock = ibas.emYesNo.NO;
                this.view.showMaterialSerialItems(this.workingData.results.filterDeleted());
            }
        }
        /** 物料序列收货服务 */
        export class MaterialSerialReceiptService extends MaterialSerialService<IMaterialSerialReceiptView>
            implements ibas.IService<ibas.IServiceWithResultCaller<IMaterialSerialContract[], IServiceExtraSerials>>  {
            /** 应用标识 */
            static APPLICATION_ID: string = "ff8f4173-77f6-4f92-bfc5-697e6d8ff545";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialserial_receipt";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialReceiptService.APPLICATION_ID;
                this.name = MaterialSerialReceiptService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.createMaterialSerialItemEvent = this.createMaterialSerialItem;
                this.view.closeEvent = this.fireCompleted;
            }
            protected createMaterialSerialItem(mode: string): void {
                if (mode === "TIME_CODE") {
                    let datas: ibas.IList<SerialWorkingItem> = new ibas.ArrayList<SerialWorkingItem>();
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
                    let journals: ibas.IList<SerialWorkingItemResult> = new ibas.ArrayList<SerialWorkingItemResult>();
                    for (let item of datas) {
                        let total: number = item.results.total();
                        if (total >= item.quantity) {
                            continue;
                        }
                        total = item.quantity - total;
                        for (let index: number = 0; index < total; index++) {
                            let journal: SerialWorkingItemResult = item.results.create();
                            journal.serialCode = ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmm") + ibas.strings.fill(index + 1, 4, "0");
                            journals.add(journal);
                        }
                    }
                    if (ibas.objects.isNull(this.workingData)) {
                        // 没选中工作内容，则显示新创建的
                        this.view.showMaterialSerialItems(journals);
                    } else {
                        // 选中工作内容，怎显示工作内容的
                        this.view.showMaterialSerialItems(this.workingData.results.filterDeleted());
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
                    condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                    condition.value = this.workingData.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                    condition.value = this.workingData.warehouse;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
                    condition.value = ibas.emYesNo.NO.toString();
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_LOCKED_NAME;
                    condition.value = ibas.emYesNo.NO.toString();
                    ibas.servicesManager.runChooseService<bo.MaterialSerial>({
                        boCode: bo.BO_CODE_MATERIALSERIAL,
                        chooseType: ibas.emChooseType.MULTIPLE,
                        criteria: criteria,
                        onCompleted(selecteds: ibas.IList<bo.MaterialSerial>): void {
                            for (let selected of selecteds) {
                                if (that.workingData.results.firstOrDefault(
                                    c => c.serialCode === selected.serialCode) !== null) {
                                    continue;
                                }
                                that.workingData.results.create(selected);
                            }
                            that.view.showMaterialSerialItems(that.workingData.results.filterDeleted());
                        }
                    });
                }
            }
            run(): void {
                if (arguments.length === 1) {
                    // 判断是否为选择契约
                    let caller: ibas.IServiceWithResultCaller<IMaterialSerialContract[], IServiceExtraSerials> = arguments[0];
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
        }
        /** 物料序列列表服务 */
        export class MaterialSerialListService extends MaterialSerialService<IMaterialSerialListsView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "d15aab9e-4eb2-4e62-8564-946341e987b1";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialserial_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialListService.APPLICATION_ID;
                this.name = MaterialSerialListService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addMaterialSerialItemEvent = this.addMaterialSerialItem;
            }
            protected addMaterialSerialItem(createNew: boolean = true): void {
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
                    for (let index: number = 0; index < total; index++) {
                        let journal: SerialWorkingItemResult = this.workingData.results.create();
                        journal.serialCode = ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmm") + ibas.strings.fill(index + 1, 4, "0");
                    }
                    this.view.showMaterialSerialItems(this.workingData.results.filterDeleted());
                } else {
                    let that: this = this;
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
                    condition.value = this.workingData.itemCode;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
                    condition.value = this.workingData.warehouse;
                    ibas.servicesManager.runChooseService<bo.MaterialSerial>({
                        boCode: bo.BO_CODE_MATERIALSERIAL,
                        criteria: criteria,
                        onCompleted(selecteds: ibas.IList<bo.MaterialSerial>): void {
                            for (let selected of selecteds) {
                                if (total <= 0) {
                                    break;
                                }
                                let item: SerialWorkingItemResult = that.workingData.results.create();
                                item.serialCode = selected.serialCode;
                                total -= 1;
                            }
                            that.view.showMaterialSerialItems(that.workingData.results.filterDeleted());
                        }
                    });
                }
            }
        }
        /** 视图-物料序列服务 */
        export interface IMaterialSerialServiceView extends ibas.IBOView {
            /** 显示待处理数据 */
            showWorkDatas(datas: SerialWorkingItem[]): void;
            /** 切换工作数据 */
            changeWorkingDataEvent: Function;
            /** 显示物料序列记录 */
            showMaterialSerialItems(datas: SerialWorkingItemResult[]): void;
            /** 移出物料序列库存 */
            removeMaterialSerialItemEvent: Function;
        }
        /** 视图-物料序列发货 */
        export interface IMaterialSerialIssueView extends IMaterialSerialServiceView {
            /** 显示物料序列库存 */
            showMaterialSerialInventories(datas: bo.MaterialSerial[]): void;
            /** 使用物料序列库存 */
            useMaterialSerialInventoryEvent: Function;
        }
        /** 视图-物料序列收货 */
        export interface IMaterialSerialReceiptView extends IMaterialSerialServiceView {
            /** 创建序列编码记录 */
            createMaterialSerialItemEvent: Function;
        }
        /** 视图-物料序列列表 */
        export interface IMaterialSerialListsView extends IMaterialSerialServiceView {
            /** 添加序列编码记录 */
            addMaterialSerialItemEvent: Function;
        }
        /** 物料序列发货服务映射 */
        export class MaterialSerialIssueServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialIssueService.APPLICATION_ID;
                this.name = MaterialSerialIssueService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialSerialIssueServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialSerialIssueService();
            }
        }
        /** 物料序列收货服务映射 */
        export class MaterialSerialReceiptServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialReceiptService.APPLICATION_ID;
                this.name = MaterialSerialReceiptService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialSerialReceiptServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialSerialReceiptService();
            }
        }
        /** 物料序列列表服务映射 */
        export class MaterialSerialListServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialListService.APPLICATION_ID;
                this.name = MaterialSerialListService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialSerialListServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialSerialListService();
            }
        }

    }
}