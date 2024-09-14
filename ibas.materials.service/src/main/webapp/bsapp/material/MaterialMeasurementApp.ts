/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        const PROPERTY_MATERIAL: symbol = Symbol("material");
        const PROPERTY_QUANTITY: symbol = Symbol("quantity");
        const PROPERTY_VOLUME: symbol = Symbol("volume");
        const PROPERTY_VOLUME_UNIT: symbol = Symbol("volumeUnit");
        const PROPERTY_WEIGHT: symbol = Symbol("weight");
        const PROPERTY_WEIGHT_UNIT: symbol = Symbol("weightUnit");
        const PROPERTY_UOM: symbol = Symbol("uom");

        export class MaterialMeasurement extends ibas.Bindable {
            /** 模式 */
            mode: "INVENTORY" | "PURCHASE" | "SALES";
            /** 单据类型 */
            documentType: string;
            /** 单据编号 */
            documentEntry: number;
            /** 单据行号 */
            documentLineId: number;
            /** 单据物料编码 */
            documentItemCode: string;
            /** 单据物料描述 */
            documentItemDescription: string;
            /** 单据数量 */
            documentQuantity: number;
            /** 单据单位 */
            documentUOM: string;
            /** 单位库 */
            units: ibas.IList<bo.Unit>;

            get material(): bo.Material {
                if (ibas.objects.isNull(this[PROPERTY_MATERIAL])) {
                    this[PROPERTY_MATERIAL] = new bo.Material();
                    this[PROPERTY_MATERIAL].code = this.documentItemCode;
                    this[PROPERTY_MATERIAL].name = this.documentItemDescription;
                }
                return this[PROPERTY_MATERIAL];
            }
            set material(value: bo.Material) {
                this[PROPERTY_MATERIAL] = value;
            }

            /** 获取-长 */
            get length(): number {
                if (this.mode === "PURCHASE") {
                    return ibas.numbers.valueOf(this.material.purchaseLength);
                } else if (this.mode === "SALES") {
                    return ibas.numbers.valueOf(this.material.salesLength);
                }
                return ibas.numbers.valueOf(this.material.inventoryLength);
            }

            /** 获取-宽 */
            get width(): number {
                if (this.mode === "PURCHASE") {
                    return ibas.numbers.valueOf(this.material.purchaseWidth);
                } else if (this.mode === "SALES") {
                    return ibas.numbers.valueOf(this.material.salesWidth);
                }
                return ibas.numbers.valueOf(this.material.inventoryWidth);
            }

            /** 获取-销售-高 */
            get height(): number {
                if (this.mode === "PURCHASE") {
                    return ibas.numbers.valueOf(this.material.purchaseHeight);
                } else if (this.mode === "SALES") {
                    return ibas.numbers.valueOf(this.material.salesHeight);
                }
                return ibas.numbers.valueOf(this.material.inventoryHeight);
            }

            /** 获取-销售-尺寸单位 */
            get sizeUnit(): string {
                if (this.mode === "PURCHASE") {
                    return this.material.purchaseSizeUnit;
                } else if (this.mode === "SALES") {
                    return this.material.salesSizeUnit;
                }
                return this.material.inventorySizeUnit;
            }
            /** 获取-销售-体积 */
            get volume(): number {
                return this[PROPERTY_VOLUME];
            }
            set volume(value: number) {
                this[PROPERTY_VOLUME] = value;
                this.firePropertyChanged("volume");
            }

            /** 获取-体积单位 */
            get volumeUnit(): string {
                return this[PROPERTY_VOLUME_UNIT];
            }
            set volumeUnit(value: string) {
                this[PROPERTY_VOLUME_UNIT] = value;
                this.calculateVolume();
            }

            /** 获取-重量 */
            get weight(): number {
                return this[PROPERTY_WEIGHT];
            }
            set weight(value: number) {
                this[PROPERTY_WEIGHT] = value;
                this.firePropertyChanged("weight");
            }

            /** 获取-重量单位 */
            get weightUnit(): string {
                return this[PROPERTY_WEIGHT_UNIT];
            }
            set weightUnit(value: string) {
                this[PROPERTY_WEIGHT_UNIT] = value;
                this.calculateWeight();
            }

            /** 数量 */
            get quantity(): number {
                return this[PROPERTY_QUANTITY];
            }
            set quantity(value: number) {
                this[PROPERTY_QUANTITY] = value;
                this.firePropertyChanged("quantity");
            }
            /** 单位 */
            get uom(): string {
                return this[PROPERTY_UOM];
            }
            set uom(value: string) {
                this[PROPERTY_UOM] = value;
            }

            protected unitName(unit: string): string {
                if (this.units instanceof Array) {
                    for (let item of this.units) {
                        if (item.name === unit) {
                            return item.name;
                        }
                        if (item.foreignName === unit) {
                            return item.name;
                        }
                        if (item.symbol === unit) {
                            return item.name;
                        }
                    }
                }
                return unit;
            }
            /**
             * 计算体积
             */
            public calculateVolume(): void {
                let volume: number = 0;
                let unit: string = null;
                if (this.mode === "PURCHASE") {
                    volume = ibas.numbers.valueOf(this.material.purchaseVolume);
                    unit = this.material.purchaseVolumeUnit;
                } else if (this.mode === "SALES") {
                    volume = ibas.numbers.valueOf(this.material.salesVolume);
                    unit = this.material.salesVolumeUnit;
                } else {
                    volume = ibas.numbers.valueOf(this.material.inventoryVolume);
                    unit = this.material.inventoryVolumeUnit;
                }
                if (volume <= 0) {
                    volume = this.length * this.width * this.height;
                    unit = ibas.strings.format("{0}³", ibas.strings.isEmpty(this.sizeUnit) ? "cm" : this.sizeUnit);
                }
                volume = volume * this.documentQuantity;
                if (ibas.objects.isNull(this[PROPERTY_VOLUME_UNIT])) {
                    this[PROPERTY_VOLUME_UNIT] = unit;
                }
                if (this.volumeUnit === unit) {
                    this.volume = volume;
                } else {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.UnitRate.PROPERTY_SOURCE_NAME;
                    condition.value = this.unitName(unit);
                    condition = criteria.conditions.create();
                    condition.alias = bo.UnitRate.PROPERTY_TARGET_NAME;
                    condition.value = this.unitName(this.volumeUnit);
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.UnitRate.PROPERTY_CONDITION_NAME;
                    sort.sortType = ibas.emSortType.ASCENDING;
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchUnitRate({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            for (let item of opRslt.resultObjects) {
                                this.volume = volume * item.rate;
                            }
                        }
                    });
                    this.volume = NaN;
                }
            }
            /**
             * 计算体积
             */
            public calculateWeight(): void {
                let weight: number = 0;
                let unit: string = null;
                if (this.mode === "PURCHASE") {
                    weight = this.material.purchaseWeight;
                    unit = this.material.purchaseWeightUnit;
                } else if (this.mode === "SALES") {
                    weight = this.material.salesWeight;
                    unit = this.material.salesWeightUnit;
                } else {
                    weight = this.material.inventoryWeight;
                    unit = this.material.inventoryWeightUnit;
                }
                weight = weight * this.documentQuantity;
                if (ibas.objects.isNull(this[PROPERTY_WEIGHT_UNIT])) {
                    this[PROPERTY_WEIGHT_UNIT] = unit;
                }
                if (this.weightUnit === unit) {
                    this.weight = weight;
                } else {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.UnitRate.PROPERTY_SOURCE_NAME;
                    condition.value = this.unitName(unit);
                    condition = criteria.conditions.create();
                    condition.alias = bo.UnitRate.PROPERTY_TARGET_NAME;
                    condition.value = this.unitName(this.weightUnit);
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.UnitRate.PROPERTY_CONDITION_NAME;
                    sort.sortType = ibas.emSortType.ASCENDING;
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchUnitRate({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            for (let item of opRslt.resultObjects) {
                                this.weight = weight * item.rate;
                            }
                        }
                    });
                    this.weight = NaN;
                }
            }
        }
        /** 选择应用-物料 */
        export class MaterialMeasurementService extends ibas.ServiceApplication<IMaterialMeasurementView, IMaterialMeasurementContract> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e7501a32-730d-4aa5-bc7a-05fd7b9d0510";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_material_measurement";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialMeasurementService.APPLICATION_ID;
                this.name = MaterialMeasurementService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.changeUnitEvent = this.changeUnit;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                let criteria: ibas.Criteria = new ibas.Criteria();
                for (let item of this.measurements) {
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Material.PROPERTY_CODE_NAME;
                    condition.value = item.documentItemCode;
                    if (criteria.conditions.length > 1) {
                        condition.relationship = ibas.emConditionRelationship.OR;
                    }
                }
                if (criteria.conditions.length > 0) {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                for (let item of this.measurements) {
                                    let material: bo.Material =
                                        opRslt.resultObjects.firstOrDefault(c => c.code === item.documentItemCode);
                                    if (ibas.objects.isNull(material)) {
                                        continue;
                                    }
                                    item.material = material;
                                    if (item.material.itemType !== bo.emItemType.ITEM) {
                                        this.measurements.remove(item);
                                    } else {
                                        item.calculateVolume();
                                        item.calculateWeight();
                                    }
                                }
                                this.view.showDatas(this.measurements);
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                } else {
                    this.view.showDatas(this.measurements);
                }
            }
            private measurements: ibas.IList<MaterialMeasurement> = new ibas.ArrayList<MaterialMeasurement>();
            private units: ibas.IList<bo.Unit> = new ibas.ArrayList<bo.Unit>();
            protected runService(contract: IMaterialMeasurementContract): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.Unit.PROPERTY_CATEGORY_NAME;
                condition.value = bo.Unit.CATEGORY_VOLUME;
                condition = criteria.conditions.create();
                condition.alias = bo.Unit.PROPERTY_CATEGORY_NAME;
                condition.value = bo.Unit.CATEGORY_WEIGHT;
                condition.relationship = ibas.emConditionRelationship.OR;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchUnit({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        this.units = opRslt.resultObjects;
                        if (contract?.lines instanceof Array) {
                            for (let line of contract.lines) {
                                let item: MaterialMeasurement = new MaterialMeasurement();
                                item.units = this.units;
                                item.mode = contract.mode;
                                item.documentType = contract.documentType;
                                item.documentEntry = contract.documentEntry;
                                item.documentLineId = line.lineId;
                                item.documentItemCode = line.itemCode;
                                item.documentItemDescription = line.itemDescription;
                                item.documentQuantity = line.quantity;
                                item.documentUOM = line.uom;
                                this.measurements.add(item);
                            }
                        }
                        this.show();
                    }
                });
            }
            protected changeUnit(category: string, unit: string): void {
                if (ibas.strings.equals(bo.Unit.CATEGORY_VOLUME, category)) {
                    this.measurements.forEach(c => c.volumeUnit = unit);
                } else if (ibas.strings.equals(bo.Unit.CATEGORY_WEIGHT, category)) {
                    this.measurements.forEach(c => c.weightUnit = unit);
                }
            }
        }
        /** 视图-物料测量 */
        export interface IMaterialMeasurementView extends ibas.IView {
            /** 显示数据 */
            showDatas(datas: MaterialMeasurement[]): void;
            /**
             * 改变单位事件
             */
            changeUnitEvent: Function;
        }

        /**  物料测量服务映射 */
        export class MaterialMeasurementServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialMeasurementService.APPLICATION_ID;
                this.name = MaterialMeasurementService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialMeasurementServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialMeasurementService();
            }
        }
    }
}