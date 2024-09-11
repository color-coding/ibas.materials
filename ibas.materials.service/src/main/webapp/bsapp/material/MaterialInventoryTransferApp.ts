/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        const DATASOURCE_TYPE_INVENTORY_TRANSFER: string = "MM_IVT";
        const PROPERTY_QUANTITY: symbol = Symbol("quantity");
        const PROPERTY_STATUS: symbol = Symbol("status");
        const PROPERTY_MATERIAL: symbol = Symbol("material");
        const PROPERTY_WAREHOUSE: symbol = Symbol("warehouse");
        const PROPERTY_REMARKS: symbol = Symbol("remarks");
        export enum emMaterialTransferStatus {
            NOT,
            PROCESSING,
            DONE,
        }
        export class MaterialInventoryItem extends ibas.Bindable {
            constructor(source: bo.MaterialBatch | bo.MaterialSerial | bo.MaterialInventory | bo.Product) {
                super();
                this.status = emMaterialTransferStatus.NOT;
                this.source = source;
                if (this.source instanceof bo.MaterialBatch) {
                    this.quantity = this.source.quantity;
                    this.targetWarehouse = this.source.warehouse;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.quantity = 1;
                    this.targetWarehouse = this.source.warehouse;
                } else if (this.source instanceof bo.MaterialInventory) {
                    this.quantity = this.source.onHand;
                    this.targetWarehouse = this.source.warehouse;
                } else if (this.source instanceof bo.Product) {
                    this.quantity = this.source.onHand;
                    this.targetWarehouse = this.source.warehouse;
                }
                this.reservations = new ibas.ArrayList<MaterialInventoryReservation>();
            }

            get status(): emMaterialTransferStatus {
                return this[PROPERTY_STATUS];
            }
            set status(value: emMaterialTransferStatus) {
                this[PROPERTY_STATUS] = value;
                this.firePropertyChanged("status");
            }

            get material(): bo.Material {
                return this[PROPERTY_MATERIAL];
            }
            set material(value: bo.Material) {
                this[PROPERTY_MATERIAL] = value;
                this.firePropertyChanged("material");
            }

            source: bo.MaterialBatch | bo.MaterialSerial | bo.MaterialInventory | bo.Product;

            get itemCode(): string {
                if (this.source instanceof bo.MaterialBatch) {
                    return this.source.itemCode;
                } else if (this.source instanceof bo.MaterialSerial) {
                    return this.source.itemCode;
                } else if (this.source instanceof bo.MaterialInventory) {
                    return this.source.itemCode;
                } else if (this.source instanceof bo.Product) {
                    return this.source.code;
                }
                return undefined;
            }
            set itemCode(value: string) {
                if (this.source instanceof bo.MaterialBatch) {
                    this.source.itemCode = value;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.source.itemCode = value;
                } else if (this.source instanceof bo.MaterialInventory) {
                    this.source.itemCode = value;
                } else if (this.source instanceof bo.Product) {
                    this.source.code = value;
                }
                this.firePropertyChanged("itemCode");
            }
            get quantity(): number {
                return this[PROPERTY_QUANTITY];
            }
            set quantity(value: number) {
                this[PROPERTY_QUANTITY] = value;
                this.firePropertyChanged("quantity");
            }
            get sourceQuantity(): number {
                if (this.source instanceof bo.MaterialBatch) {
                    return this.source.quantity;
                } else if (this.source instanceof bo.MaterialSerial) {
                    return 1;
                } else if (this.source instanceof bo.MaterialInventory) {
                    return this.source.onHand;
                } else if (this.source instanceof bo.Product) {
                    return this.source.onHand;
                }
                return undefined;
            }

            get sourceNumber(): string {
                if (this.source instanceof bo.MaterialBatch) {
                    return this.source.batchCode;
                } else if (this.source instanceof bo.MaterialSerial) {
                    return this.source.serialCode;
                }
                return "";
            }
            set sourceNumber(value: string) {
                if (this.source instanceof bo.MaterialBatch) {
                    this.source.batchCode = value;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.source.serialCode = value;
                }
                this.firePropertyChanged("sourceNumber");
            }

            get sourceWarehouse(): string {
                if (this.source instanceof bo.MaterialBatch) {
                    return this.source.warehouse;
                } else if (this.source instanceof bo.MaterialSerial) {
                    return this.source.warehouse;
                } else if (this.source instanceof bo.MaterialInventory) {
                    return this.source.warehouse;
                } else if (this.source instanceof bo.Product) {
                    return this.source.warehouse;
                }
                return undefined;
            }
            set sourceWarehouse(value: string) {
                if (this.source instanceof bo.MaterialBatch) {
                    this.source.warehouse = value;
                } else if (this.source instanceof bo.MaterialSerial) {
                    this.source.warehouse = value;
                } else if (this.source instanceof bo.MaterialInventory) {
                    this.source.warehouse = value;
                } else if (this.source instanceof bo.Product) {
                    this.source.warehouse = value;
                }
                this.firePropertyChanged("sourceWarehouse");
            }
            get targetWarehouse(): string {
                return this[PROPERTY_WAREHOUSE];
            }
            set targetWarehouse(value: string) {
                this[PROPERTY_WAREHOUSE] = value;
                if (this.reservations instanceof Array) {
                    for (let item of this.reservations) {
                        item.target.warehouse = this.targetWarehouse;
                    }
                }
                this.firePropertyChanged("targetWarehouse");
            }
            reservations: ibas.IList<MaterialInventoryReservation>;

            get remarks(): string {
                return this[PROPERTY_REMARKS];
            }
            set remarks(value: string) {
                this[PROPERTY_REMARKS] = value;
                this.firePropertyChanged("remarks");
            }

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

            check(blocked: boolean): void {
                if (this.source instanceof bo.MaterialSerial) {
                    if (this.quantity > 1) {
                        // 序列号数量不能大于1
                        throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_onhand", this.itemCode, this.sourceNumber));
                    }
                    // 序列被预留
                    if (blocked === true && this.source.reserved === ibas.emYesNo.YES) {
                        throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_availabled", this.itemCode, this.sourceNumber));
                    }
                }
                if (this.source instanceof bo.MaterialBatch) {
                    if (this.quantity > this.source.quantity) {
                        // 批次数量不能大于库存量
                        throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_onhand", this.itemCode, this.sourceNumber));
                    }
                    // 批次数量不能大于可用量
                    if (blocked === true && this.quantity > (this.source.quantity - this.source.reservedQuantity)) {
                        throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_availabled", this.itemCode, this.sourceNumber));
                    }
                }
                if (this.source instanceof bo.Product || this.source instanceof bo.MaterialInventory) {
                    if (this.quantity > this.source.onHand) {
                        // 批次数量不能大于库存量
                        throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_onhand", this.itemCode, this.sourceNumber));
                    }
                    // 批次数量不能大于可用量
                    if (blocked === true && this.quantity > (this.source.onHand - this.source.onReserved)) {
                        throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_availabled", this.itemCode, this.sourceNumber));
                    }
                }
                if (this.transferQuantity > this.reservationQuantity) {
                    // 转移数量超过预留数量
                    throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_reservation", this.itemCode, this.sourceNumber));
                }
                if (this.transferQuantity > this.quantity) {
                    // 转移数量超过改变数量
                    throw new Error(ibas.i18n.prop("materials_transfer_quantity_grater_than_quantity", this.itemCode, this.sourceNumber));
                }
            }
        }
        class MaterialInventoryItems extends ibas.ArrayList<MaterialInventoryItem> {

            create(source: bo.MaterialBatch | bo.MaterialSerial | bo.MaterialInventory | bo.Product): MaterialInventoryItem {
                let item: MaterialInventoryItem = new MaterialInventoryItem(source);
                this.add(item);
                return item;
            }
        }
        export class MaterialInventoryReservation extends ibas.Bindable {
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
        /** 应用-物料库存调拨 */
        export class MaterialInventoryTransferApp extends ibas.Application<IMaterialInventoryTransferView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "b68c4580-d3f7-44f9-8451-5311145559c2";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialinventorytransfer";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryTransferApp.APPLICATION_ID;
                this.name = MaterialInventoryTransferApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addMaterialBatchEvent = this.addMaterialBatch;
                this.view.addMaterialSerialEvent = this.addMaterialSerial;
                this.view.addMaterialInventoryEvent = this.addMaterialInventory;
                this.view.removeItemEvent = this.removeItem;
                this.view.editMaterialBatchEvent = this.editMaterialBatch;
                this.view.editMaterialSerialEvent = this.editMaterialSerial;
                this.view.chooseTargetWarehouseEvent = this.chooseTargetWarehouse;
                this.view.resetEvent = this.reset;
                this.view.transferToEvent = this.transferTo;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (this.changeItems instanceof MaterialInventoryItems) {
                    this.changeItems.clear();
                } else {
                    this.changeItems = new MaterialInventoryItems();
                }
                this.view.showItems(this.changeItems);
            }
            private changeItems: MaterialInventoryItems = new MaterialInventoryItems();
            private addMaterialInventory(warehouses?: string): void {
                let that: this = this; let condition: ibas.ICondition;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                // 限定仓库
                if (!ibas.strings.isEmpty(warehouses)) {
                    for (let item of warehouses.split(ibas.DATA_SEPARATOR)) {
                        if (ibas.strings.isEmpty(item)) {
                            continue;
                        }
                        condition = criteria.conditions.create();
                        condition.alias = materials.app.conditions.product.CONDITION_ALIAS_WAREHOUSE;
                        condition.value = item;
                        if (criteria.conditions.length > 1) {
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                    }
                    if (criteria.conditions.length > 1) {
                        criteria.conditions.firstOrDefault().bracketOpen += 1;
                        criteria.conditions.lastOrDefault().bracketClose += 1;
                    }
                }
                // 库存物料
                condition = criteria.conditions.create();
                condition.alias = app.conditions.material.CONDITION_ALIAS_INVENTORY_ITEM;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 物料类型
                condition = criteria.conditions.create();
                condition.alias = app.conditions.material.CONDITION_ALIAS_ITEM_TYPE;
                condition.value = bo.emItemType.ITEM.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 非虚拟的
                condition = criteria.conditions.create();
                condition.alias = app.conditions.material.CONDITION_ALIAS_PHANTOM_ITEM;
                condition.value = ibas.emYesNo.NO.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 非批次管理
                condition = criteria.conditions.create();
                condition.alias = bo.Product.PROPERTY_BATCHMANAGEMENT_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                // 非序列管理
                condition = criteria.conditions.create();
                condition.alias = bo.Product.PROPERTY_SERIALMANAGEMENT_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                // 有库存
                condition = criteria.conditions.create();
                condition.alias = bo.Product.PROPERTY_ONHAND_NAME;
                condition.value = "0";
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.Product>({
                    boCode: bo.BO_CODE_PRODUCT_INVENTORY,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.Product>): void {
                        let condition: ibas.ICondition;
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let datas: ibas.IList<MaterialInventoryItem> = new ibas.ArrayList<MaterialInventoryItem>();
                        for (let select of selecteds) {
                            let item: MaterialInventoryItem = that.changeItems.create(select);
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_ITEMCODE_NAME;
                            condition.value = select.code;
                            condition.bracketOpen = 1;
                            if (criteria.conditions.length > 1) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialInventoryReservation.PROPERTY_WAREHOUSE_NAME;
                            condition.value = select.warehouse;
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
                                                c => (item.source instanceof bo.MaterialInventory || item.source instanceof bo.Product)
                                                    && c.itemCode === item.itemCode
                                                    && c.warehouse === item.source.warehouse
                                            )) {
                                                item.reservations.add(new MaterialInventoryReservation(reservation));
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
            private addMaterialBatch(warehouses?: string): void {
                let that: this = this; let condition: ibas.ICondition;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                // 限定仓库
                if (!ibas.strings.isEmpty(warehouses)) {
                    for (let item of warehouses.split(ibas.DATA_SEPARATOR)) {
                        if (ibas.strings.isEmpty(item)) {
                            continue;
                        }
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                        condition.value = item;
                        if (criteria.conditions.length > 1) {
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                    }
                    if (criteria.conditions.length > 1) {
                        criteria.conditions.firstOrDefault().bracketOpen += 1;
                        criteria.conditions.lastOrDefault().bracketClose += 1;
                    }
                }
                // 有库存
                condition = criteria.conditions.create();
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
                        let datas: ibas.IList<MaterialInventoryItem> = new ibas.ArrayList<MaterialInventoryItem>();
                        for (let select of selecteds) {
                            let item: MaterialInventoryItem = that.changeItems.create(select);
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
                                                item.reservations.add(new MaterialInventoryReservation(reservation));
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
            private addMaterialSerial(warehouses?: string): void {
                let that: this = this; let condition: ibas.ICondition;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                // 限定仓库
                if (!ibas.strings.isEmpty(warehouses)) {
                    for (let item of warehouses.split(ibas.DATA_SEPARATOR)) {
                        if (ibas.strings.isEmpty(item)) {
                            continue;
                        }
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                        condition.value = item;
                        if (criteria.conditions.length > 1) {
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                    }
                    if (criteria.conditions.length > 1) {
                        criteria.conditions.firstOrDefault().bracketOpen += 1;
                        criteria.conditions.lastOrDefault().bracketClose += 1;
                    }
                }
                // 有库存
                condition = criteria.conditions.create();
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
                        let datas: ibas.IList<MaterialInventoryItem> = new ibas.ArrayList<MaterialInventoryItem>();
                        for (let select of selecteds) {
                            let item: MaterialInventoryItem = that.changeItems.create(select);
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
                                                item.reservations.add(new MaterialInventoryReservation(reservation));
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
            private removeItem(datas: MaterialInventoryItem[]): void {
                for (let item of datas) {
                    this.changeItems.remove(item);
                }
                this.view.showItems(this.changeItems);
            }
            private showItems(datas: MaterialInventoryItem[]): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let item of datas) {
                    if (!ibas.objects.isNull(item.material)) {
                        continue;
                    }
                    let exsItem: MaterialInventoryItem = this.changeItems.firstOrDefault(c => c.itemCode === item.itemCode);
                    if (!ibas.objects.isNull(exsItem) && !ibas.objects.isNull(exsItem.material)) {
                        item.material = exsItem.material;
                        continue;
                    }
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Material.PROPERTY_CODE_NAME;
                    condition.value = item.itemCode;
                    if (criteria.conditions.length > 1) {
                        condition.relationship = ibas.emConditionRelationship.OR;
                    }
                }
                if (criteria.conditions.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            for (let item of datas) {
                                let material: bo.Material = opRslt.resultObjects.firstOrDefault(c => c.code === item.itemCode);
                                if (ibas.objects.isNull(material)) {
                                    material = new bo.Material();
                                    material.code = item.itemCode;
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
                    let app: MaterialSerialViewApp = new MaterialSerialViewApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
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
                    let app: MaterialBatchViewApp = new MaterialBatchViewApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(data);
                }
            }
            private reset(): void {
                this.viewShowed();
            }
            private transferTo(remarks: string, blocked: boolean = true): void {
                let transfer: bo.InventoryTransfer = new bo.InventoryTransfer();
                transfer.dataSource = DATASOURCE_TYPE_INVENTORY_TRANSFER;
                transfer.remarks = remarks;
                let reservations: ibas.IList<bo.MaterialInventoryReservation> = new ibas.ArrayList<bo.MaterialInventoryReservation>();
                for (let item of this.changeItems) {
                    if (item.sourceWarehouse === item.targetWarehouse) {
                        // 未改变，跳过
                        continue;
                    }
                    if (item.status !== emMaterialTransferStatus.NOT) {
                        // 未处理的数据
                        continue;
                    }
                    // 检查数量
                    item.check(blocked);
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
                    let transferItem: bo.InventoryTransferLine = transfer.inventoryTransferLines.create();
                    transferItem.baseMaterial(item.material);
                    transferItem.quantity = item.quantity;
                    transferItem.fromWarehouse = item.sourceWarehouse;
                    transferItem.price = item.material.avgPrice;
                    transferItem.warehouse = item.targetWarehouse;
                    if (transferItem.batchManagement === ibas.emYesNo.YES) {
                        let batchItem: bo.IMaterialBatchItem = transferItem.materialBatches.create();
                        batchItem.batchCode = item.sourceNumber;
                        batchItem.quantity = item.quantity;
                        batchItem.remarks = item.remarks;
                    } else if (transferItem.serialManagement === ibas.emYesNo.YES) {
                        let serialItem: bo.IMaterialSerialItem = transferItem.materialSerials.create();
                        serialItem.serialCode = item.sourceNumber;
                        serialItem.remarks = item.remarks;
                    } else {
                        transferItem.reference1 = item.remarks;
                    }
                    // 预留信息（入库后才能存新的）
                    for (let rItem of item.reservations) {
                        if (!(rItem.target.quantity > 0)) {
                            continue;
                        }
                        reservations.add(rItem.target);
                    }
                }
                if (transfer.inventoryTransferLines.length > 0) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_multiple_data_save_continue", transfer.inventoryTransferLines.length),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted: (action) => {
                            if (action !== ibas.emMessageAction.YES) {
                                return;
                            }
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.transferMaterialInventories({
                                transfers: {
                                    transfer: transfer,
                                    reservations: reservations,
                                },
                                onCompleted: (opRslt) => {
                                    try {
                                        this.busy(false);
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        for (let item of opRslt.informations) {
                                            if (item.name === bo.InventoryTransfer.name) {
                                                transfer.docEntry = ibas.numbers.valueOf(item.content);
                                            }
                                        }
                                        this.messages(ibas.emMessageType.SUCCESS,
                                            ibas.i18n.prop("materials_inventory_transfer", transfer.docEntry));
                                    } catch (error) {
                                        this.messages(error);
                                    }
                                }
                            });
                            this.busy(true);
                        }
                    });
                } else {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
                }
            }
            private chooseTargetWarehouse(caller: MaterialInventoryItem): void {
                let that: this = this;
                let condition: ibas.ICondition;
                let conditions: ibas.IList<ibas.ICondition> = app.conditions.warehouse.create();
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.Warehouse>({
                    chooseType: ibas.emChooseType.SINGLE,
                    boCode: bo.BO_CODE_WAREHOUSE,
                    criteria: conditions,
                    onCompleted(selecteds: ibas.IList<bo.Warehouse>): void {
                        for (let selected of selecteds) {
                            caller.targetWarehouse = selected.code;
                        }
                    }
                });
            }
        }
        /** 视图-物物料库存调拨 */
        export interface IMaterialInventoryTransferView extends ibas.IView {
            /** 添加物料库存事件 */
            addMaterialInventoryEvent: Function;
            /** 添加物料批次事件 */
            addMaterialBatchEvent: Function;
            /** 添加物料序列事件 */
            addMaterialSerialEvent: Function;
            /** 移除项目事件 */
            removeItemEvent: Function;
            /** 显示项目 */
            showItems(datas: MaterialInventoryItem[]): void;
            /** 编辑批次信息 */
            editMaterialBatchEvent: Function;
            /** 编辑序列信息 */
            editMaterialSerialEvent: Function;
            /** 选择变更物料 */
            chooseTargetWarehouseEvent: Function;
            /** 重置事件 */
            resetEvent: Function;
            /** 调拨事件 */
            transferToEvent: Function;
        }
    }
}
