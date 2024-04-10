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
        export class OrderedReservationWorking extends ibas.Bindable {
            constructor(data: IMaterialOrderedReservationSource) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_ITEMS] = new ibas.ArrayList<ReservationWorkingItem>();
                if (data.items instanceof Array) {
                    for (let item of data.items) {
                        this.items.add(new OrderedReservationWorkingItem(item, this));
                    }
                }
            }
            get data(): IMaterialOrderedReservationSource {
                return this[PROPERTY_DATA];
            }
            get sourceType(): string {
                return this.data.sourceType;
            }
            get sourceEntry(): number {
                return this.data.sourceEntry;
            }
            get items(): ibas.IList<OrderedReservationWorkingItem> {
                return this[PROPERTY_ITEMS];
            }
            fireProcessing(): void {
                super.firePropertyChanged("");
            }
        }
        export class OrderedReservationWorkingItem extends ibas.Bindable {
            constructor(data: IMaterialOrderedReservationSourceLine, parent: OrderedReservationWorking) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_PARENT] = parent;
                this[PROPERTY_RESULTS] = new OrderedReservationWorkingItemResults(this);
            }
            get data(): IMaterialOrderedReservationSourceLine {
                return this[PROPERTY_DATA];
            }
            /** 行号 */
            get lineId(): number {
                return this.data.sourceLineId;
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
            /** 交货日期 */
            get deliveryDate(): Date {
                return this.data.deliveryDate;
            }
            set deliveryDate(value: Date) {
                this.data.deliveryDate = value;
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
            get results(): OrderedReservationWorkingItemResults {
                return this[PROPERTY_RESULTS];
            }
            fireProcessing(): void {
                this.firePropertyChanged("remaining");
                this[PROPERTY_PARENT].fireProcessing();
            }
        }
        export class OrderedReservationWorkingItemResults extends ibas.ArrayList<bo.MaterialOrderedReservation> {
            constructor(parent: OrderedReservationWorkingItem) {
                super();
                this[PROPERTY_PARENT] = parent;
            }
            protected get parent(): OrderedReservationWorkingItem {
                return this[PROPERTY_PARENT];
            }
            add(item: bo.MaterialOrderedReservation | bo.MaterialOrderedReservation[]): void {
                super.add.apply(this, arguments);
                for (let one of ibas.arrays.create(item)) {
                    one.registerListener(this.listener);
                }
                this.parent.fireProcessing();
            }
            private listener: ibas.IPropertyChangedListener = {
                caller: this,
                propertyChanged: (property) => {
                    if (property === "quantity" || property === "isDeleted") {
                        this.parent.fireProcessing();
                    }
                }
            };
            remove(item: bo.MaterialOrderedReservation): boolean {
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
            filterDeleted(): bo.MaterialOrderedReservation[] {
                return this.where(c => c.isDeleted === false);
            }
            total(): number {
                let total: number = 0;
                for (let item of this.filterDeleted()) {
                    if (item.status === ibas.emBOStatus.CLOSED) {
                        continue;
                    }
                    total += (item.quantity - item.closedQuantity);
                }
                return total;
            }
        }
        /** 应用- 物料订购预留 */
        export class MaterialOrderedReservationService extends ibas.ServiceApplication<IMaterialOrderedReservationView, IMaterialOrderedReservationSource | IMaterialOrderedReservationSource[]> {
            /** 应用标识 */
            static APPLICATION_ID: string = "6ff01e73-041c-4400-b518-79e0c54a4fcf";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialorderedreservation";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOrderedReservationService.APPLICATION_ID;
                this.name = MaterialOrderedReservationService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                this.view.changeWorkingItemEvent = this.changeWorkingItem;
                this.view.addTargetDocumentEvent = this.addTargetDocument;
                this.view.removeTargetDocumentEvent = this.removeTargetDocument;
                this.view.saveReservationEvent = this.saveReservation;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                if (ibas.objects.isNull(this.workingDatas)) {
                    this.workingDatas = new ibas.ArrayList<OrderedReservationWorking>();
                    this.view.showWorkingDatas(this.workingDatas);
                } else {
                    this.busy(true);
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    for (let workingData of this.workingDatas) {
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTTYPE_NAME;
                        condition.value = workingData.sourceType;
                        condition.bracketOpen = 1;
                        if (criteria.conditions.length > 1) {
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTENTRY_NAME;
                        condition.value = workingData.sourceEntry.toString();
                        condition.bracketClose = 1;
                    }
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterialOrderedReservation({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                for (let item of opRslt.resultObjects) {
                                    let workingData: OrderedReservationWorking = this.workingDatas.firstOrDefault(
                                        c => c.sourceType === item.sourceDocumentType
                                            && c.sourceEntry === item.sourceDocumentEntry
                                    );
                                    if (ibas.objects.isNull(workingData)) {
                                        continue;
                                    }
                                    for (let wItem of workingData.items) {
                                        if (item.sourceDocumentLineId === wItem.lineId) {
                                            wItem.results.add(item);
                                            break;
                                        }
                                    }
                                }
                                this.view.showWorkingDatas(this.workingDatas);
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                }
            }
            private workingDatas: ibas.IList<OrderedReservationWorking>;
            protected runService(contract: IMaterialOrderedReservationSource | IMaterialOrderedReservationSource[]): void {
                let contracts: ibas.IList<IMaterialOrderedReservationSource> = ibas.arrays.create(contract);
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let contract of contracts) {
                    if (contract?.items instanceof Array) {
                        for (let item of contract.items) {
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = bo.Material.PROPERTY_CODE_NAME;
                            condition.value = item.itemCode;
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                    }
                }
                if (criteria.conditions.length > 0) {
                    this.workingDatas = new ibas.ArrayList<OrderedReservationWorking>();
                    for (let contract of contracts) {
                        this.workingDatas.add(new OrderedReservationWorking(contract));
                    }
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            let beChangeds: ibas.IList<materials.app.IBeChangedUOMSourceEx<OrderedReservationWorkingItem>>
                                = new ibas.ArrayList<materials.app.IBeChangedUOMSourceEx<OrderedReservationWorkingItem>>();
                            for (let workingData of this.workingDatas) {
                                for (let item of workingData.items) {
                                    let material: bo.IMaterial = opRslt.resultObjects.firstOrDefault(c => c.code === item.itemCode);
                                    if (ibas.objects.isNull(material)) {
                                        continue;
                                    }
                                    item.itemDescription = material.name;
                                    item.inventoryUOM = material.inventoryUOM;
                                    beChangeds.add({
                                        caller: item,
                                        sourceUnit: item.uom,
                                        targetUnit: item.inventoryUOM,
                                        material: item.itemCode,
                                        setUnitRate(value: number): void {
                                            this.uomRate = value;
                                        }
                                    });
                                }
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
            private currentWorkingItem: OrderedReservationWorkingItem;
            /** 切换工作数据 */
            private changeWorkingItem(data: OrderedReservationWorkingItem): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                this.currentWorkingItem = data;
                // 获取可用目标单据
                this.view.showTargetDocuments(ibas.servicesManager.getServices({
                    proxy: new MaterialOrderedReservationTargetServiceProxy({
                        itemCode: this.currentWorkingItem.itemCode,
                        itemDescription: this.currentWorkingItem.itemDescription,
                        quantity: this.currentWorkingItem.inventoryQuantity,
                        uom: this.currentWorkingItem.inventoryUOM,
                        warehouse: this.currentWorkingItem.warehouse,
                        deliveryDate: undefined,
                        onReserved: (documentType: string, docEntry: number, lineId: number, quantity: number) => {
                            if (!(this.currentWorkingItem.remaining > 0)) {
                                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_remaining"));
                                return;
                            }
                            let workingData: OrderedReservationWorking = this.workingDatas.firstOrDefault(c => c.items.contain(this.currentWorkingItem));
                            if (ibas.objects.isNull(workingData)) {
                                return;
                            }
                            if (this.currentWorkingItem.results.firstOrDefault(
                                c => c.targetDocumentType === documentType
                                    && c.targetDocumentEntry === docEntry
                                    && c.targetDocumentLineId === lineId
                            ) !== null) {
                                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_already_choosed",
                                    ibas.businessobjects.describe(ibas.strings.format("{[{0}].[DocEntry = {1}]}", documentType, docEntry))
                                    + (lineId > 0 ? ibas.strings.format(", {0}-{1}", ibas.i18n.prop("bo_goodsissueline_lineid"), lineId) : "")));
                                return;
                            }
                            let result: bo.MaterialOrderedReservation = new bo.MaterialOrderedReservation();
                            result.sourceDocumentType = workingData.sourceType;
                            result.sourceDocumentEntry = workingData.sourceEntry;
                            result.sourceDocumentLineId = this.currentWorkingItem.lineId;
                            result.itemCode = this.currentWorkingItem.itemCode;
                            result.warehouse = this.currentWorkingItem.warehouse;
                            result.deliveryDate = this.currentWorkingItem.deliveryDate;
                            result.targetDocumentType = documentType;
                            result.targetDocumentEntry = docEntry;
                            result.targetDocumentLineId = lineId;
                            if (quantity > 0) {
                                if (quantity > this.currentWorkingItem.remaining) {
                                    result.quantity = this.currentWorkingItem.remaining;
                                } else {
                                    result.quantity = quantity;
                                }
                                this.currentWorkingItem.results.add(result);
                                this.view.showReservations(this.currentWorkingItem.results.filterDeleted());
                            }
                        }
                    }),
                }).sort((a, b) => { return a.id.localeCompare(b.id); }));
                this.view.showReservations(this.currentWorkingItem.results.filterDeleted());
            }
            /** 保存预留库存 */
            private saveReservation(): void {
                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                let datas: ibas.ArrayList<bo.MaterialOrderedReservation> = new ibas.ArrayList<bo.MaterialOrderedReservation>();
                for (let workingData of this.workingDatas) {
                    for (let item of workingData.items) {
                        if (item.remaining < 0) {
                            builder.append(ibas.i18n.prop("materials_material_reserved_quantity_exceeds_available_quantity", workingData.sourceEntry, item.itemCode, item.itemDescription));
                            if (builder.length > 0) {
                                builder.append("\n");
                            }
                        }
                        for (let rItem of item.results) {
                            if (rItem.isDirty === true) {
                                datas.add(rItem);
                            }
                        }
                    }
                }
                if (builder.length > 0) {
                    this.messages(ibas.emMessageType.ERROR, builder.toString());
                    return;
                }
                if (datas.length > 0) {
                    this.busy(true);
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    ibas.queues.execute(datas, (data, next) => {
                        // 处理数据
                        boRepository.saveMaterialOrderedReservation({
                            beSaved: data,
                            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialOrderedReservation>): void {
                                if (opRslt.resultCode !== 0) {
                                    next(new Error(opRslt.message));
                                } else {
                                    if (opRslt.resultObjects.length > 0) {
                                        data.objectKey = opRslt.resultObjects.firstOrDefault().objectKey;
                                        data.logInst = opRslt.resultObjects.firstOrDefault().logInst;
                                    }
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
                }
            }
            private addTargetDocument(srvTarget: ibas.IServiceAgent): void {
                if (ibas.objects.isNull(this.currentWorkingItem)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
                    return;
                }
                if (ibas.objects.isNull(srvTarget)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_invalid_parameter", "srvTarget"));
                    return;
                }
                srvTarget.run();
            }
            private removeTargetDocument(data: bo.MaterialOrderedReservation): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                let workingData: OrderedReservationWorking = this.workingDatas.firstOrDefault(c => c.items.contain(this.currentWorkingItem));
                if (ibas.objects.isNull(workingData)) {
                    return;
                }
                for (let wItem of workingData.items) {
                    if (wItem.lineId === data.sourceDocumentLineId) {
                        if (data.isNew === true) {
                            wItem.results.remove(data);
                        } else {
                            data.delete();
                        }
                        this.view.showReservations(wItem.results.filterDeleted());
                    }
                }
            }
            /** 关闭视图 */
            close(): void {
                for (let workingData of this.workingDatas) {
                    for (let wItem of workingData.items) {
                        if (wItem.results.where(c => c.isSavable === true && c.isDirty === true).length > 0) {
                            this.messages({
                                type: ibas.emMessageType.QUESTION,
                                message: ibas.i18n.prop("sys_data_modified_continue_close_view"),
                                actions: [
                                    ibas.emMessageAction.YES,
                                    ibas.emMessageAction.NO
                                ],
                                onCompleted: (action) => {
                                    if (action === ibas.emMessageAction.YES) {
                                        super.close();
                                    }
                                }
                            }); return;
                        }
                    }
                }
                super.close();
            }
        }
        /** 视图- 物料订购预留 */
        export interface IMaterialOrderedReservationView extends ibas.IView {
            /** 切换工作数据 */
            changeWorkingItemEvent: Function;
            /** 添加目标单据 */
            addTargetDocumentEvent: Function;
            /** 移除目标单据 */
            removeTargetDocumentEvent: Function;
            /** 显示可用目标单据 */
            showTargetDocuments(datas: ibas.IServiceAgent[]): void;
            /** 显示工作顺序 */
            showWorkingDatas(data: OrderedReservationWorking[]): void;
            /** 显示预留 */
            showReservations(datas: bo.MaterialOrderedReservation[]): void;
            /** 保存预留库存 */
            saveReservationEvent: Function;
        }
        /**  物料订购预留服务映射 */
        export class MaterialOrderedReservationServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOrderedReservationService.APPLICATION_ID;
                this.name = MaterialOrderedReservationService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialOrderedReservationServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialOrderedReservationService();
            }
        }
    }
}
