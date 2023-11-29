/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        const PROPERTY_QUANTITY: symbol = Symbol("quantity");
        const PROPERTY_STATUS: symbol = Symbol("status");
        export enum emNumberChangeStatus {
            NOT,
            PROCESSING,
            DONE,
        }
        export class MaterialNumberItem extends ibas.Bindable {
            constructor(source: bo.MaterialBatch | bo.MaterialSerial) {
                super();
                this.status = emNumberChangeStatus.NOT;
                this.source = source;
                this.target = this.source.clone();
                if (this.source instanceof bo.MaterialBatch) {
                    this.quantity = this.source.quantity;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.quantity = 1;
                }
                this.reservations = new ibas.ArrayList<MaterialNumberReservation>();
            }

            get status(): emNumberChangeStatus {
                return this[PROPERTY_STATUS];
            }
            set status(value: emNumberChangeStatus) {
                this[PROPERTY_STATUS] = value;
                this.firePropertyChanged("status");
            }

            material: bo.Material;

            source: bo.MaterialBatch | bo.MaterialSerial;

            target: bo.MaterialBatch | bo.MaterialSerial;

            get quantity(): number {
                return this[PROPERTY_QUANTITY];
            }
            set quantity(value: number) {
                this[PROPERTY_QUANTITY] = value;
                this.firePropertyChanged("quantity");
            }

            get sourceNumber(): string {
                if (this.source instanceof bo.MaterialBatch) {
                    return this.source.batchCode;
                } else if (this.source instanceof bo.MaterialSerial) {
                    return this.source.serialCode;
                }
                return undefined;
            }
            set sourceNumber(value: string) {
                if (this.source instanceof bo.MaterialBatch) {
                    this.source.batchCode = value;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.source.serialCode = value;
                }
            }
            get targetNumber(): string {
                if (this.target instanceof bo.MaterialBatch) {
                    return this.target.batchCode;
                } else if (this.target instanceof bo.MaterialSerial) {
                    return this.target.serialCode;
                }
                return undefined;
            }
            set targetNumber(value: string) {
                if (this.target instanceof bo.MaterialBatch) {
                    this.target.batchCode = value;
                    for (let item of this.reservations) {
                        item.target.batchCode = this.target.batchCode;
                    }
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.target.serialCode = value;
                    for (let item of this.reservations) {
                        item.target.serialCode = this.target.serialCode;
                    }
                }
            }
            get sourceWarehouse(): string {
                if (this.source instanceof bo.MaterialBatch) {
                    return this.source.warehouse;
                } else if (this.source instanceof bo.MaterialSerial) {
                    return this.source.warehouse;
                }
                return undefined;
            }
            set sourceWarehouse(value: string) {
                if (this.source instanceof bo.MaterialBatch) {
                    this.source.warehouse = value;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.source.warehouse = value;
                }
            }
            get targetWarehouse(): string {
                if (this.target instanceof bo.MaterialBatch) {
                    return this.target.warehouse;
                } else if (this.target instanceof bo.MaterialSerial) {
                    return this.target.warehouse;
                }
                return undefined;
            }
            set targetWarehouse(value: string) {
                if (this.target instanceof bo.MaterialBatch) {
                    this.target.warehouse = value;
                    for (let item of this.reservations) {
                        item.target.warehouse = this.target.warehouse;
                    }
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.target.warehouse = value;
                    for (let item of this.reservations) {
                        item.target.warehouse = this.target.warehouse;
                    }
                }
            }
            reservations: ibas.IList<MaterialNumberReservation>;

            get reservationQuantity(): number {
                let total: number = 0;
                for (let item of this.reservations) {
                    total += item.sourceQuantity;
                }
                return ibas.numbers.round(total);
            }
            get transferQuantity(): number {
                let total: number = 0;
                for (let item of this.reservations) {
                    total += (item.target.quantity - item.target.closedQuantity);
                }
                return ibas.numbers.round(total);
            }

            check(): void {
                if (this.transferQuantity > this.reservationQuantity) {
                    // 转移数量超过预留数量
                    throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_reservation", this.source.itemCode, this.sourceNumber));
                }
                if (this.transferQuantity > this.quantity) {
                    // 转移数量超过改变数量
                    throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_quantity", this.source.itemCode, this.sourceNumber));
                }
            }
        }
        class MaterialNumberItems extends ibas.ArrayList<MaterialNumberItem> {

            create(source: bo.MaterialBatch | bo.MaterialSerial): MaterialNumberItem {
                let item: MaterialNumberItem = new MaterialNumberItem(source);
                this.add(item);
                return item;
            }
        }
        export class MaterialNumberReservation extends ibas.Bindable {
            constructor(data: bo.MaterialInventoryReservation) {
                super();
                this.source = data;
                // 单独记录，防止被污染
                this.sourceQuantity = data.quantity - data.closedQuantity;
                this.target = this.source.clone();
                this.target.quantity = this.source.quantity - this.source.closedQuantity;
            }

            source: bo.MaterialInventoryReservation;

            sourceQuantity: number;

            target: bo.MaterialInventoryReservation;
        }
        /** 应用-物料批次序列号变更 */
        export class MaterialNumberChangeApp extends ibas.Application<IMaterialNumberChangeView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "7a53e697-6799-4064-b8f9-b62068e27b48";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialnumberchange";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialNumberChangeApp.APPLICATION_ID;
                this.name = MaterialNumberChangeApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addMaterialBatchEvent = this.addMaterialBatch;
                this.view.addMaterialSerialEvent = this.addMaterialSerial;
                this.view.removeItemEvent = this.removeItem;
                this.view.editMaterialBatchEvent = this.editMaterialBatch;
                this.view.editMaterialSerialEvent = this.editMaterialSerial;
                this.view.resetEvent = this.reset;
                this.view.changeToEvent = this.changeTo;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (this.changeItems instanceof MaterialNumberItems) {
                    this.changeItems.clear();
                } else {
                    this.changeItems = new MaterialNumberItems();
                }
                this.view.showItems(this.changeItems);
            }
            private changeItems: MaterialNumberItems = new MaterialNumberItems();
            private addMaterialBatch(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                // 有库存
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_QUANTITY_NAME;
                condition.value = "0";
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                // 未锁定
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialBatch.PROPERTY_LOCKED_NAME;
                condition.value = ibas.emYesNo.NO.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.MaterialBatch>({
                    boCode: bo.MaterialBatch.BUSINESS_OBJECT_CODE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.MaterialBatch>): void {
                        let condition: ibas.ICondition;
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let datas: ibas.IList<MaterialNumberItem> = new ibas.ArrayList<MaterialNumberItem>();
                        for (let select of selecteds) {
                            let item: MaterialNumberItem = that.changeItems.create(select);
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_ITEMCODE_NAME;
                            condition.value = select.itemCode;
                            condition.bracketOpen = 1;
                            if (criteria.conditions.length > 1) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_WAREHOUSE_NAME;
                            condition.value = select.warehouse;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_BATCHCODE_NAME;
                            condition.value = select.batchCode;
                            condition.bracketClose = 1;
                            datas.add(item);
                        }
                        if (criteria.conditions.length > 0) {
                            criteria.conditions.firstOrDefault().bracketOpen++;
                            criteria.conditions.lastOrDefault().bracketClose++;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_QUANTITY_NAME;
                            condition.comparedAlias = bo.MaterialInventoryReservation.PROPERTY_CLOSEDQUANTITY_NAME;
                            condition.operation = ibas.emConditionOperation.GRATER_THAN;
                            condition.bracketOpen = 1;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_STATUS_NAME;
                            condition.value = ibas.emBOStatus.OPEN.toString();
                            condition.bracketClose = 1;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchMaterialInventoryReservation({
                                criteria: criteria,
                                onCompleted: (opRslt) => {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        for (let item of datas) {
                                            for (let reservation of opRslt.resultObjects.where(
                                                c => item.source instanceof bo.MaterialBatch
                                                    && c.itemCode === item.source.itemCode
                                                    && c.warehouse === item.source.warehouse
                                                    && c.batchCode === item.source.batchCode
                                            )) {
                                                item.reservations.add(new MaterialNumberReservation(reservation));
                                            }
                                        }
                                        that.showItems(datas);
                                    } catch (error) {
                                        that.messages(error);
                                    }
                                }
                            });
                        } else {
                            that.showItems(datas);
                        }
                    }
                });
            }
            private addMaterialSerial(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                // 有库存
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 未锁定
                condition = criteria.conditions.create();
                condition.alias = bo.MaterialSerial.PROPERTY_LOCKED_NAME;
                condition.value = ibas.emYesNo.NO.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.MaterialSerial>({
                    boCode: bo.MaterialSerial.BUSINESS_OBJECT_CODE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.MaterialSerial>): void {
                        let condition: ibas.ICondition;
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let datas: ibas.IList<MaterialNumberItem> = new ibas.ArrayList<MaterialNumberItem>();
                        for (let select of selecteds) {
                            let item: MaterialNumberItem = that.changeItems.create(select);
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_ITEMCODE_NAME;
                            condition.value = select.itemCode;
                            condition.bracketOpen = 1;
                            if (criteria.conditions.length > 1) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_WAREHOUSE_NAME;
                            condition.value = select.warehouse;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_BATCHCODE_NAME;
                            condition.value = select.serialCode;
                            condition.bracketClose = 1;
                            datas.add(item);
                        }
                        if (criteria.conditions.length > 0) {
                            criteria.conditions.firstOrDefault().bracketOpen++;
                            criteria.conditions.lastOrDefault().bracketClose++;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_QUANTITY_NAME;
                            condition.comparedAlias = bo.MaterialInventoryReservation.PROPERTY_CLOSEDQUANTITY_NAME;
                            condition.operation = ibas.emConditionOperation.GRATER_THAN;
                            condition.bracketOpen = 1;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_STATUS_NAME;
                            condition.value = ibas.emBOStatus.OPEN.toString();
                            condition.bracketClose = 1;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchMaterialInventoryReservation({
                                criteria: criteria,
                                onCompleted: (opRslt) => {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        for (let item of datas) {
                                            for (let reservation of opRslt.resultObjects.where(
                                                c => item.source instanceof bo.MaterialSerial
                                                    && c.itemCode === item.source.itemCode
                                                    && c.warehouse === item.source.warehouse
                                                    && c.serialCode === item.source.serialCode
                                            )) {
                                                item.reservations.add(new MaterialNumberReservation(reservation));
                                            }
                                        }
                                        that.showItems(datas);
                                    } catch (error) {
                                        that.messages(error);
                                    }
                                }
                            });
                        } else {
                            that.showItems(datas);
                        }
                    }
                });
            }
            private removeItem(datas: MaterialNumberItem[]): void {
                for (let item of datas) {
                    this.changeItems.remove(item);
                }
                this.view.showItems(this.changeItems);
            }
            private showItems(datas: MaterialNumberItem[]): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let item of datas) {
                    if (!ibas.objects.isNull(item.material)) {
                        continue;
                    }
                    let exsItem: MaterialNumberItem = this.changeItems.firstOrDefault(c => c.source.itemCode === item.source.itemCode);
                    if (!ibas.objects.isNull(exsItem) && !ibas.objects.isNull(exsItem.material)) {
                        item.material = exsItem.material;
                        continue;
                    }
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Material.PROPERTY_CODE_NAME;
                    condition.value = item.source.itemCode;
                }
                if (criteria.conditions.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            for (let item of datas) {
                                let material: bo.Material = opRslt.resultObjects.firstOrDefault(c => c.code === item.source.itemCode);
                                if (ibas.objects.isNull(material)) {
                                    material = new bo.Material();
                                    material.code = item.source.itemCode;
                                    material.name = material.code;
                                    material.batchManagement = item.source instanceof bo.MaterialBatch ? ibas.emYesNo.YES : ibas.emYesNo.NO;
                                    material.serialManagement = item.source instanceof bo.MaterialSerial ? ibas.emYesNo.YES : ibas.emYesNo.NO;
                                }
                                item.material = material;
                            }
                            this.view.showItems(this.changeItems);
                        }
                    });
                } else {
                    this.view.showItems(this.changeItems);
                }
            }
            private editMaterialSerial(data: bo.MaterialSerial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    )); return;
                }
                if (data instanceof bo.MaterialSerial) {
                    let app: MaterialSerialEditApp = new MaterialSerialEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.viewMode = ibas.emViewMode.VIEW;
                    app.run(data);
                }
            }
            private editMaterialBatch(data: bo.MaterialBatch): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    )); return;
                }
                if (data instanceof bo.MaterialBatch) {
                    let app: MaterialBatchEditApp = new MaterialBatchEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.viewMode = ibas.emViewMode.VIEW;
                    app.run(data);
                }
            }
            private reset(): void {
                this.viewShowed();
            }
            private changeTo(): void {
                let issue: bo.GoodsIssue = new bo.GoodsIssue();
                let receipt: bo.GoodsReceipt = new bo.GoodsReceipt();
                let batchSerials: ibas.IList<bo.MaterialBatch | bo.MaterialSerial> = new ibas.ArrayList<bo.MaterialBatch | bo.MaterialSerial>();
                let reservations: ibas.IList<bo.MaterialInventoryReservation> = new ibas.ArrayList<bo.MaterialInventoryReservation>();

                for (let item of this.changeItems) {
                    if (item.sourceNumber === item.targetNumber && item.sourceWarehouse === item.targetWarehouse) {
                        // 未改变，跳过
                        continue;
                    }
                    if (item.status !== emNumberChangeStatus.NOT) {
                        // 未处理的数据
                        continue;
                    }
                    // 检查数量
                    item.check();
                    // 预留信息（旧的移除才能保存）
                    for (let rItem of item.reservations) {
                        if (!(rItem.target.quantity > 0)) {
                            continue;
                        }
                        rItem.source.quantity = rItem.sourceQuantity - rItem.target.quantity;
                        if (rItem.source.quantity <= 0) {
                            rItem.source.delete();
                        }
                        reservations.add(rItem.source);
                    }
                    // 出库
                    let issueItem: bo.GoodsIssueLine = issue.goodsIssueLines.create();
                    issueItem.baseMaterial(item.material);
                    issueItem.quantity = item.quantity;
                    issueItem.warehouse = item.sourceWarehouse;
                    issueItem.price = item.material.avgPrice;
                    if (issueItem.batchManagement === ibas.emYesNo.YES) {
                        let batchItem: bo.IMaterialBatchItem = issueItem.materialBatches.create();
                        batchItem.batchCode = item.sourceNumber;
                        batchItem.quantity = item.quantity;
                    }
                    if (issueItem.serialManagement === ibas.emYesNo.YES) {
                        let batchItem: bo.IMaterialSerialItem = issueItem.materialSerials.create();
                        batchItem.serialCode = item.sourceNumber;
                    }
                    // 入库
                    let receiptItem: bo.GoodsReceiptLine = receipt.goodsReceiptLines.create();
                    receiptItem.baseMaterial(item.material);
                    receiptItem.quantity = item.quantity;
                    receiptItem.warehouse = item.targetWarehouse;
                    receiptItem.price = item.material.avgPrice;
                    if (receiptItem.batchManagement === ibas.emYesNo.YES) {
                        let batchItem: bo.IMaterialBatchItem = receiptItem.materialBatches.create();
                        batchItem.batchCode = item.targetNumber;
                        batchItem.quantity = item.quantity;
                        if (item.target.isDirty) {
                            batchSerials.add(item.target);
                        }
                    }
                    if (receiptItem.serialManagement === ibas.emYesNo.YES) {
                        let batchItem: bo.IMaterialSerialItem = receiptItem.materialSerials.create();
                        batchItem.serialCode = item.targetNumber;
                        if (item.target.isDirty) {
                            batchSerials.add(item.target);
                        }
                    }
                    // 预留信息（入库后才能存新的）
                    for (let rItem of item.reservations) {
                        if (!(rItem.target.quantity > 0)) {
                            continue;
                        }
                        reservations.add(rItem.target);
                    }
                }
                if (issue.goodsIssueLines.length > 0 && receipt.goodsReceiptLines.length > 0) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_multiple_data_save_continue", receipt.goodsReceiptLines.length),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted: (action) => {
                            if (action !== ibas.emMessageAction.YES) {
                                return;
                            }
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.changeMaterialNumbers({
                                changes: {
                                    issue: issue,
                                    receipt: receipt,
                                    reservations: reservations,
                                },
                                onCompleted: (opRslt) => {
                                    try {
                                        this.busy(false);
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        for (let item of opRslt.informations) {
                                            if (item.name === bo.GoodsIssue.name) {
                                                issue.docEntry = ibas.numbers.valueOf(item.content);
                                            } else if (item.name === bo.GoodsReceipt.name) {
                                                receipt.docEntry = ibas.numbers.valueOf(item.content);
                                            }
                                        }
                                        this.messages(ibas.emMessageType.SUCCESS,
                                            ibas.i18n.prop("materials_number_changed", receipt.docEntry, issue.docEntry));
                                    } catch (error) {
                                        this.messages(error);
                                    }
                                }
                            });
                            this.busy(true);
                        }
                    });
                }
            }
        }
        /** 视图-物料批次序列号变更 */
        export interface IMaterialNumberChangeView extends ibas.IView {
            /** 添加物料批次事件 */
            addMaterialBatchEvent: Function;
            /** 添加物料序列事件 */
            addMaterialSerialEvent: Function;
            /** 移除项目事件 */
            removeItemEvent: Function;
            /** 显示项目 */
            showItems(datas: MaterialNumberItem[]): void;
            /** 编辑批次信息 */
            editMaterialBatchEvent: Function;
            /** 编辑序列信息 */
            editMaterialSerialEvent: Function;
            /** 重置事件 */
            resetEvent: Function;
            /** 改变事件 */
            changeToEvent: Function;
        }
    }
}
