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
        const PROPERTY_ITEMS: symbol = Symbol("items");
        const PROPERTY_RESULTS: symbol = Symbol("results");
        const PROPERTY_PARENT: symbol = Symbol("parent");
        const PROPERTY_INVENTORY_QUANTITY: symbol = Symbol("inventoryQuantity");
        const PROPERTY_INVENTORY_UOM: symbol = Symbol("inventoryUOM");
        const PROPERTY_UOM_RATE: symbol = Symbol("uomRate");
        export class ReservationWorking extends ibas.Bindable {
            constructor(data: IMaterialInventoryReservationTarget) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_ITEMS] = new ibas.ArrayList<ReservationWorkingItem>();
                if (data.items instanceof Array) {
                    for (let item of data.items) {
                        this.items.add(new ReservationWorkingItem(item));
                    }
                }
            }
            get data(): IMaterialInventoryReservationTarget {
                return this[PROPERTY_DATA];
            }
            get targetType(): string {
                return this.data.targetType;
            }
            get targetEntry(): number {
                return this.data.targetEntry;
            }
            get businessPartner(): string {
                return this.data.businessPartner;
            }
            get items(): ibas.IList<ReservationWorkingItem> {
                return this[PROPERTY_ITEMS];
            }
        }
        export class ReservationWorkingItem extends ibas.Bindable {
            constructor(data: IMaterialInventoryReservationTargetLine) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_RESULTS] = new ReservationWorkingItemResults(this);
            }
            get data(): IMaterialInventoryReservationTargetLine {
                return this[PROPERTY_DATA];
            }
            /** 行号 */
            get lineId(): number {
                return this.data.targetLineId;
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
            /** 序列号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.data.serialManagement;
            }
            set serialManagement(value: ibas.emYesNo) {
                this.data.serialManagement = value;
            }
            /** 批次管理 */
            get batchManagement(): ibas.emYesNo {
                return this.data.batchManagement;
            }
            set batchManagement(value: ibas.emYesNo) {
                this.data.batchManagement = value;
            }
            /** 混用批次 */
            get mixingBatches(): ibas.emYesNo {
                return this.data.mixingBatches;
            }
            set mixingBatches(value: ibas.emYesNo) {
                this.data.mixingBatches = value;
            }
            /** 库存数量 */
            get inventoryQuantity(): number {
                return this[PROPERTY_INVENTORY_QUANTITY];
            }
            /** 库存单位 */
            get inventoryUOM(): string {
                return this[PROPERTY_INVENTORY_UOM];
            }
            set inventoryUOM(value: string) {
                this[PROPERTY_INVENTORY_UOM] = value;
            }
            /** 单位汇率 */
            get uomRate(): number {
                return this[PROPERTY_UOM_RATE];
            }
            set uomRate(value: number) {
                this[PROPERTY_UOM_RATE] = value;
                this[PROPERTY_INVENTORY_QUANTITY] = this.quantity * this.uomRate;
            }
            /** 剩余数量 */
            get remaining(): number {
                return this.inventoryQuantity - this.results.total();
            }
            /** 操作结果 */
            get results(): ReservationWorkingItemResults {
                return this[PROPERTY_RESULTS];
            }
            fireProcessing(): void {
                this.firePropertyChanged("remaining");
            }
        }
        export class ReservationWorkingItemResults extends ibas.ArrayList<bo.MaterialInventoryReservation> {
            constructor(parent: ReservationWorkingItem) {
                super();
                this[PROPERTY_PARENT] = parent;
            }
            protected get parent(): ReservationWorkingItem {
                return this[PROPERTY_PARENT];
            }
            add(item: bo.MaterialInventoryReservation | bo.MaterialInventoryReservation[]): void {
                super.add.apply(this, arguments);
                for (let one of ibas.arrays.create(item)) {
                    one.registerListener(this.listener);
                }
                this.parent.fireProcessing();
            }
            private listener: ibas.IPropertyChangedListener = {
                caller: this,
                propertyChanged: (property) => {
                    if (property === "quantity") {
                        this.parent.fireProcessing();
                    }
                }
            };
            remove(item: bo.MaterialInventoryReservation): boolean {
                if (!(this.contain(item))) {
                    throw new RangeError();
                }
                item.removeListener(this.listener);
                if (item.isNew) {
                    super.remove(item);
                    this.parent.fireProcessing();
                    return true;
                } else {
                    item.delete();
                    this.parent.fireProcessing();
                    return false;
                }
            }
            filterDeleted(): bo.MaterialInventoryReservation[] {
                return this.where(c => c.isDeleted === false);
            }
            total(): number {
                let total: number = 0;
                for (let item of this.filterDeleted()) {
                    total += item.quantity;
                }
                return total;
            }
        }
        /** 应用-物料库存预留 */
        export class MaterialInventoryReservationService extends ibas.ServiceApplication<IMaterialInventoryReservationView, IMaterialInventoryReservationTarget> {
            /** 应用标识 */
            static APPLICATION_ID: string = "70eb084a-06cb-4208-9b58-abaf1825a38c";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialinventoryreservation";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryReservationService.APPLICATION_ID;
                this.name = MaterialInventoryReservationService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                this.view.changeWorkingItemEvent = this.changeWorkingItem;
                this.view.releaseReservationEvent = this.releaseReservation;
                this.view.reserveInventoryEvent = this.reserveInventory;
                this.view.saveReservationEvent = this.saveReservation;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                if (ibas.objects.isNull(this.workingData)) {
                    this.workingData = new ReservationWorking({
                        targetType: "",
                        targetEntry: 0,
                        items: []
                    });
                    this.view.showWorkingData(this.workingData);
                } else {
                    this.busy(true);
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE_NAME;
                    condition.value = this.workingData.targetType;
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY_NAME;
                    condition.value = this.workingData.targetEntry.toString();
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterialInventoryReservation({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                for (let item of opRslt.resultObjects) {
                                    for (let wItem of this.workingData.items) {
                                        if (item.targetDocumentLineId === wItem.lineId) {
                                            wItem.results.add(item);
                                            break;
                                        }
                                    }
                                }
                                this.view.showWorkingData(this.workingData);
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                }
            }
            private workingData: ReservationWorking;
            protected runService(contract: IMaterialInventoryReservationTarget): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                if (contract?.items instanceof Array) {
                    for (let item of contract.items) {
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.Material.PROPERTY_CODE_NAME;
                        condition.value = item.itemCode;
                        condition.relationship = ibas.emConditionRelationship.OR;
                    }
                }
                if (criteria.conditions.length > 0) {
                    this.workingData = new ReservationWorking(contract);
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            let beChangeds: ibas.IList<materials.app.IBeChangedUOMSource> = new ibas.ArrayList<materials.app.IBeChangedUOMSource>();
                            for (let item of this.workingData.items) {
                                let material: bo.IMaterial = opRslt.resultObjects.firstOrDefault(c => c.code === item.itemCode);
                                if (ibas.objects.isNull(material)) {
                                    continue;
                                }
                                item.itemDescription = material.name;
                                item.batchManagement = material.batchManagement;
                                item.serialManagement = material.serialManagement;
                                item.inventoryUOM = material.inventoryUOM;
                                beChangeds.add({
                                    caller: item,
                                    sourceUnit: item.uom,
                                    targetUnit: item.inventoryUOM,
                                    material: item.itemCode,
                                    setUnitRate(this: ReservationWorkingItem, value: number): void {
                                        this.uomRate = value;
                                    }
                                });
                            }
                            if (beChangeds.length > 0) {
                                changeMaterialsUnitRate({
                                    data: beChangeds,
                                    onCompleted: (error) => {
                                        if (error instanceof Error) {
                                            this.messages(error);
                                        } else {
                                            super.show();
                                        }
                                    }
                                });
                            } else {
                                super.show();
                            }
                        }
                    });
                } else {
                    super.show();
                }
            }
            private warehouses: ibas.IList<bo.Warehouse>;
            private currentWorkingItem: ReservationWorkingItem;
            /** 切换工作数据 */
            private changeWorkingItem(data: ReservationWorkingItem, restricted: boolean = true): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                this.busy(true);
                if (ibas.objects.isNull(this.warehouses)) {
                    // 获取可用仓库
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Warehouse.PROPERTY_RESERVABLE_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchWarehouse({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length <= 0) {
                                    throw new Error(ibas.i18n.prop("materials_no_warehouses_for_reservation"));
                                }
                                this.warehouses = opRslt.resultObjects;
                                this.changeWorkingItem(data, restricted);
                            } catch (error) {
                                this.busy(false);
                                this.messages(error);
                            }
                        }
                    }); return;
                }
                this.currentWorkingItem = data;
                let condition: ibas.ICondition;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                // 可以预留的仓库
                for (let item of this.warehouses) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventory.PROPERTY_WAREHOUSE_NAME;
                    condition.value = item.code;
                    if (criteria.conditions.length > 1) {
                        condition.relationship = ibas.emConditionRelationship.OR;
                    }
                }
                if (criteria.conditions.length > 1) {
                    criteria.conditions.firstOrDefault().bracketOpen += 1;
                    criteria.conditions.lastOrDefault().bracketClose += 1;
                }
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialInventory.PROPERTY_ITEMCODE_NAME;
                condition.value = data.itemCode;
                if (restricted === true && !ibas.strings.isEmpty(data.warehouse)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventory.PROPERTY_WAREHOUSE_NAME;
                    condition.value = data.warehouse;
                }
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = bo.MaterialInventory.PROPERTY_WAREHOUSE_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                if (data.batchManagement === ibas.emYesNo.YES) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_LOCKED_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialBatch.PROPERTY_QUANTITY_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_THAN;
                    condition.value = "0";
                    if (!ibas.strings.isEmpty(data.itemVersion)) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_VERSION_NAME;
                        condition.value = data.itemVersion;
                    }
                    boRepository.fetchMaterialBatch({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                for (let item of opRslt.resultObjects) {
                                    for (let rItem of data.results) {
                                        if (item.itemCode !== rItem.itemCode) {
                                            continue;
                                        }
                                        if (item.warehouse !== rItem.warehouse) {
                                            continue;
                                        }
                                        if (item.batchCode !== rItem.batchCode) {
                                            continue;
                                        }
                                        if (item.quantity <= 0) {
                                            continue;
                                        }
                                        if (rItem.isDeleted === true && rItem.isNew === false) {
                                            // 本次释放未更新的
                                            item.reservedQuantity -= rItem.quantity;
                                        } else {
                                            // 本次占用的
                                            item.reservedQuantity += rItem.quantity;
                                        }
                                        if (data.mixingBatches === ibas.emYesNo.NO) {
                                            // 不能混批，则可用量不满足的跳过
                                            if (item.quantity < data.remaining) {
                                                item.isDeleted = true;
                                            }
                                        }
                                    }
                                }
                                this.view.showInventories(opRslt.resultObjects.filter(c => c.quantity > c.reservedQuantity && c.isDeleted === false));
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                } else if (data.serialManagement === ibas.emYesNo.YES) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_LOCKED_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                    if (!ibas.strings.isEmpty(data.itemVersion)) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialSerial.PROPERTY_VERSION_NAME;
                        condition.value = data.itemVersion;
                    }
                    boRepository.fetchMaterialSerial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                for (let item of opRslt.resultObjects) {
                                    for (let rItem of data.results) {
                                        if (item.itemCode !== rItem.itemCode) {
                                            continue;
                                        }
                                        if (item.warehouse !== rItem.warehouse) {
                                            continue;
                                        }
                                        if (item.serialCode !== rItem.serialCode) {
                                            continue;
                                        }
                                        if (item.inStock !== ibas.emYesNo.YES) {
                                            continue;
                                        }
                                        if (rItem.isDeleted === true && rItem.isNew === false) {
                                            // 本次释放未更新的
                                            item.reserved = ibas.emYesNo.NO;
                                        } else {
                                            // 本次占用的
                                            item.reserved = ibas.emYesNo.YES;
                                        }
                                    }
                                }
                                this.view.showInventories(opRslt.resultObjects.filter(c => c.reserved !== ibas.emYesNo.YES));
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                } else {
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventory.PROPERTY_ONHAND_NAME;
                    condition.operation = ibas.emConditionOperation.GRATER_THAN;
                    condition.value = "0";
                    boRepository.fetchMaterialInventory({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                for (let item of opRslt.resultObjects) {
                                    for (let rItem of data.results) {
                                        if (item.itemCode !== rItem.itemCode) {
                                            continue;
                                        }
                                        if (item.warehouse !== rItem.warehouse) {
                                            continue;
                                        }
                                        if (item.onHand <= 0) {
                                            continue;
                                        }
                                        if (rItem.isDeleted === true && rItem.isNew === false) {
                                            // 本次释放未更新的
                                            item.onReserved -= rItem.quantity;
                                        } else {
                                            // 本次占用的
                                            item.onReserved += rItem.quantity;
                                        }
                                    }
                                }
                                this.view.showInventories(opRslt.resultObjects.filter(c => c.onHand > c.onReserved));
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                }
                this.view.showReservations(this.currentWorkingItem.results.filterDeleted());
            }
            /** 预留库存 */
            private reserveInventory(data: bo.MaterialInventory | bo.MaterialBatch | bo.MaterialSerial): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                if (!(this.currentWorkingItem.remaining > 0)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_remaining"));
                    return;
                }
                let reservation: bo.MaterialInventoryReservation = new bo.MaterialInventoryReservation();
                reservation.dataOwner = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_ID);
                reservation.targetDocumentType = this.workingData.targetType;
                reservation.targetDocumentEntry = this.workingData.targetEntry;
                reservation.targetDocumentLineId = this.currentWorkingItem.lineId;
                reservation.quantity = this.currentWorkingItem.remaining;
                if (data instanceof bo.MaterialInventory) {
                    if (data.onReserved > data.onHand) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_insufficient_inventory"));
                        return;
                    }
                    reservation.baseBusinessObject(data);
                    if (data.onHand > this.currentWorkingItem.remaining) {
                        reservation.quantity = this.currentWorkingItem.remaining;
                    } else {
                        reservation.quantity = data.onHand;
                    }
                    data.onReserved += reservation.quantity;
                } else if (data instanceof bo.MaterialBatch) {
                    if (data.reservedQuantity > data.quantity) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_insufficient_inventory"));
                        return;
                    }
                    reservation.baseBusinessObject(data);
                    if (data.quantity > this.currentWorkingItem.remaining) {
                        reservation.quantity = this.currentWorkingItem.remaining;
                    } else {
                        reservation.quantity = data.quantity;
                    }
                    data.reservedQuantity += reservation.quantity;
                } else if (data instanceof bo.MaterialSerial) {
                    if (data.reserved === ibas.emYesNo.YES) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_insufficient_inventory"));
                        return;
                    }
                    reservation.baseBusinessObject(data);
                    reservation.quantity = 1;
                    data.reserved = ibas.emYesNo.YES;
                }
                this.currentWorkingItem.results.add(reservation);
                this.view.showReservations(this.currentWorkingItem.results.filterDeleted());
            }
            /** 释放预留库存 */
            private releaseReservation(data: bo.MaterialInventoryReservation): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                for (let wItem of this.workingData.items) {
                    if (wItem.lineId === data.targetDocumentLineId) {
                        if (data.isNew === true) {
                            wItem.results.remove(data);
                        } else {
                            data.delete();
                        }
                        this.view.showReservations(wItem.results.filterDeleted());
                    }
                }
            }
            /** 保存预留库存 */
            private saveReservation(): void {
                let datas: ibas.ArrayList<bo.MaterialInventoryReservation> = new ibas.ArrayList<bo.MaterialInventoryReservation>();
                for (let item of this.workingData.items) {
                    for (let rItem of item.results) {
                        if (rItem.isDirty === true) {
                            datas.add(rItem);
                        }
                    }
                }
                if (datas.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    ibas.queues.execute(datas, (data, next) => {
                        // 处理数据
                        boRepository.saveMaterialInventoryReservation({
                            beSaved: data,
                            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventoryReservation>): void {
                                if (opRslt.resultCode !== 0) {
                                    next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                } else {
                                    data.markOld();
                                    next();
                                }
                            }
                        });
                    }, (error) => {
                        // 处理完成
                        if (error instanceof Error) {
                            this.messages(ibas.emMessageType.ERROR, error.message);
                        } else {
                            this.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                        }
                        this.busy(false);
                    });
                    this.busy(true);
                }
            }
        }
        /** 视图-物料库存预留 */
        export interface IMaterialInventoryReservationView extends ibas.IView {
            /** 切换工作数据 */
            changeWorkingItemEvent: Function;
            /** 预留库存 */
            reserveInventoryEvent: Function;
            /** 释放预留库存 */
            releaseReservationEvent: Function;
            /** 显示工作顺序 */
            showWorkingData(data: ReservationWorking): void;
            /** 显示物料库存 */
            showInventories(datas: bo.MaterialInventory[] | bo.MaterialBatch[] | bo.MaterialSerial[]): void;
            /** 显示预留 */
            showReservations(datas: bo.MaterialInventoryReservation[]): void;
            /** 保存预留库存 */
            saveReservationEvent: Function;
        }
        /** 物料库存预留服务映射 */
        export class MaterialInventoryReservationServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryReservationService.APPLICATION_ID;
                this.name = MaterialInventoryReservationService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialInventoryReservationServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialInventoryReservationService();
            }
        }
    }
}
