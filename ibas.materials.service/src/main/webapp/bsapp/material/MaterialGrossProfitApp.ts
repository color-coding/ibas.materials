/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        const PROPERTY_ORIGINAL: symbol = Symbol("original");
        const PROPERTY_LINES: symbol = Symbol("lines");
        const PROPERTY_PARENT: symbol = Symbol("parent");
        const PROPERTY_ISDIRTY: symbol = Symbol("isDirty");
        const PROPERTY_DATE: symbol = Symbol("date");
        const PROPERTY_GROSSPROFIT: symbol = Symbol("grossProfit");
        const PROPERTY_GROSSPROFITLIST: symbol = Symbol("grossProfitList");
        const PROPERTY_GROSSPROFITPRICE: symbol = Symbol("grossProfitPrice");
        const PROPERTY_GROSSPROFITRATE: symbol = Symbol("grossProfitRate");

        export class MaterialGrossProfit extends ibas.Bindable {

            static BUSINESS_OBJECT_CODE: string = "${Company}_MM_GROSSPROFIT";

            constructor(original: IMaterialGrossProfitContract) {
                super();
                this[PROPERTY_ORIGINAL] = original;
                this[PROPERTY_GROSSPROFITLIST] = original.getGrossProfitList() === 0 ? undefined : original.getGrossProfitList();
                this[PROPERTY_GROSSPROFIT] = original.getGrossProfit();
                this[PROPERTY_DATE] = original.documentDate instanceof Date ? original.documentDate : ibas.dates.today();
                if (original.lines instanceof Array) {
                    for (let line of original.lines) {
                        let item: MaterialGrossProfitLine = new MaterialGrossProfitLine(line);
                        item[PROPERTY_PARENT] = this;
                        item[PROPERTY_GROSSPROFITLIST] = line.getGrossProfitSource();
                        item[PROPERTY_GROSSPROFITPRICE] = line.getGrossProfitPrice();
                        this.lines.add(item);
                        item.calculate(true);
                    }
                }
                this.isDirty = false;
            }

            get isDirty(): boolean {
                return this[PROPERTY_ISDIRTY];
            }
            set isDirty(value: boolean) {
                this[PROPERTY_ISDIRTY] = value;
                this.firePropertyChanged("isDirty");
            }

            get original(): IMaterialGrossProfitContract {
                return this[PROPERTY_ORIGINAL];
            }
            set original(value: IMaterialGrossProfitContract) {
                this[PROPERTY_ORIGINAL] = value;
            }

            get documentType(): string {
                return this.original.documentType;
            }
            set documentType(value: string) {
                this.original.documentType = value;
            }
            get documentEntry(): number {
                return this.original.documentEntry;
            }
            set documentEntry(value: number) {
                this.original.documentEntry = value;
            }
            get documentDate(): Date {
                return this[PROPERTY_DATE];
            }
            set documentDate(value: Date) {
                this[PROPERTY_DATE] = value;
                this.firePropertyChanged("documentDate");
            }
            get grossProfitList(): number {
                return this[PROPERTY_GROSSPROFITLIST];
            }
            set grossProfitList(value: number) {
                this[PROPERTY_GROSSPROFITLIST] = value;
                this.firePropertyChanged("grossProfitList");
            }
            get grossProfit(): number {
                return this[PROPERTY_GROSSPROFIT];
            }
            set grossProfit(value: number) {
                this[PROPERTY_GROSSPROFIT] = value;
                this.firePropertyChanged("grossProfit");
            }
            get grossProfitRate(): number {
                return this[PROPERTY_GROSSPROFITRATE];
            }
            get lines(): ibas.IList<MaterialGrossProfitLine> {
                if (ibas.objects.isNull(this[PROPERTY_LINES])) {
                    this[PROPERTY_LINES] = new ibas.ArrayList<MaterialGrossProfitLine>();
                }
                return this[PROPERTY_LINES];
            }
            /** 应用修改 */
            apply(): void {
                if (this.grossProfitList !== 0) {
                    if (this.grossProfitList !== this.original.getGrossProfitList()) {
                        this.original.setGrossProfitList(this.grossProfitList);
                    }
                }
                let total: number = 0;
                for (let line of this.lines) {
                    if (line.grossProfitSource !== 0) {
                        if (line.grossProfitSource !== line.original.getGrossProfitSource()) {
                            line.original.setGrossProfitSource(line.grossProfitSource);
                        }
                    }
                    if (line.grossProfitPrice !== line.original.getGrossProfitPrice()) {
                        line.original.setGrossProfitPrice(line.grossProfitPrice);
                    }
                    total += line.grossProfitPrice * line.quantity;
                }
                if (total !== this.original.getGrossProfit()) {
                    this.original.setGrossProfit(total);
                }
            }

            calculate(slient?: boolean): void {
                let totalProfit: number = 0, totalDocument: number = 0;
                for (let line of this.lines) {
                    totalProfit += ibas.numbers.valueOf(line.grossProfit);
                    totalDocument += ibas.numbers.valueOf(line.quantity) * ibas.numbers.valueOf(line.price);
                }
                this[PROPERTY_GROSSPROFITRATE] =
                    ibas.numbers.round(totalProfit / ibas.numbers.round(totalDocument, ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES_PERCENTAGE)));
                if (slient !== true) {
                    this[PROPERTY_ISDIRTY] = true;
                    this.grossProfit = totalProfit;
                } else {
                    this[PROPERTY_ISDIRTY] = true;
                    this[PROPERTY_GROSSPROFIT] = totalProfit;
                }
            }
        }
        export class MaterialGrossProfitLine extends ibas.Bindable {
            constructor(original: IMaterialGrossProfitContractLine) {
                super();
                this[PROPERTY_ORIGINAL] = original;
            }
            get original(): IMaterialGrossProfitContractLine {
                return this[PROPERTY_ORIGINAL];
            }
            set original(value: IMaterialGrossProfitContractLine) {
                this[PROPERTY_ORIGINAL] = value;
            }

            get lineId(): number {
                return this.original.lineId;
            }
            set lineId(value: number) {
                this.original.lineId = value;
            }
            get itemCode(): string {
                return this.original.itemCode;
            }
            set itemCode(value: string) {
                this.original.itemCode = value;
            }
            get itemDescription(): string {
                return this.original.itemDescription;
            }
            set itemDescription(value: string) {
                this.original.itemDescription = value;
            }
            get quantity(): number {
                return this.original.quantity;
            }
            set quantity(value: number) {
                this.original.quantity = value;
            }
            get uom(): string {
                return this.original.uom;
            }
            set uom(value: string) {
                this.original.uom = value;
            }
            get price(): number {
                return this.original.price;
            }
            set price(value: number) {
                this.original.price = value;
            }
            get currency(): string {
                return this.original.currency;
            }
            set currency(value: string) {
                this.original.currency = value;
            }
            get grossProfitSource(): number {
                return this[PROPERTY_GROSSPROFITLIST];
            }
            set grossProfitSource(value: number) {
                this[PROPERTY_GROSSPROFITLIST] = value;
                this.firePropertyChanged("grossProfitSource");
            }
            get grossProfitPrice(): number {
                return this[PROPERTY_GROSSPROFITPRICE];
            }
            set grossProfitPrice(value: number) {
                this[PROPERTY_GROSSPROFITPRICE] = value;
                this[PROPERTY_GROSSPROFITLIST] = 0;
                this.calculate();
                this.firePropertyChanged("grossProfitPrice");
            }
            get grossProfit(): number {
                return this[PROPERTY_GROSSPROFIT];
            }
            get grossProfitRate(): number {
                return this[PROPERTY_GROSSPROFITRATE];
            }

            calculate(slient?: boolean): void {
                let quantity: number = ibas.numbers.valueOf(this.quantity);
                let price: number = ibas.numbers.valueOf(this.price);
                let grossPrice: number = ibas.numbers.valueOf(this.grossProfitPrice);

                this[PROPERTY_GROSSPROFIT] =
                    ibas.numbers.round((price - grossPrice) * quantity, ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES_SUM));
                this[PROPERTY_GROSSPROFITRATE] =
                    ibas.numbers.round(price > 0 ? this.grossProfit / (price * quantity) : 0,
                        ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES_PERCENTAGE));
                if (slient !== true) {
                    this.firePropertyChanged("grossProfitPrice");
                }
                this[PROPERTY_PARENT].calculate(slient);
            }
        }

        /** 物料毛利润服务 */
        export class MaterialGrossProfitService extends ibas.ServiceApplication<IMaterialGrossProfitView, IMaterialGrossProfitContract> {
            /** 应用标识 */
            static APPLICATION_ID: string = "45066e66-4a3f-4d3c-b3f0-ccc40cff5ef9";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_material_grossprofit";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialGrossProfitService.APPLICATION_ID;
                this.name = MaterialGrossProfitService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.applyEvent = this.apply;
                this.view.changePriceListEvent = this.changePriceList;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.grossProfitData)) {
                    this.grossProfitData = new MaterialGrossProfit({
                        documentType: "",
                        documentEntry: -1,
                        documentCurrency: "",
                        documentDate: ibas.dates.today(),
                        getGrossProfitList(): number {
                            return undefined;
                        },
                        setGrossProfitList(value: number): void {
                        },
                        getGrossProfit(): number {
                            return 0;
                        },
                        setGrossProfit(value: number): void {
                        },
                        lines: [],
                    });
                }
                this.view.showData(this.grossProfitData);
                this.view.showDataLines(this.grossProfitData.lines);
            }
            private grossProfitData: MaterialGrossProfit = null;
            protected runService(contract: IMaterialGrossProfitContract): void {
                this.grossProfitData = new MaterialGrossProfit(contract);
                this.show();
            }

            protected apply(): void {
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    message: ibas.i18n.prop("materials_document_apply_changes_continue"),
                    actions: [
                        ibas.emMessageAction.YES,
                        ibas.emMessageAction.NO
                    ],
                    onCompleted: (action) => {
                        if (action === ibas.emMessageAction.YES) {
                            this.grossProfitData.apply();
                            this.close();
                        }
                    }
                }); return;
            }
            protected changePriceList(priceList: number, caller?: MaterialGrossProfit | MaterialGrossProfitLine): void {
                if (ibas.numbers.valueOf(priceList) === 0) {
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME;
                condition.value = priceList.toString();
                let cCriteria: ibas.IChildCriteria = criteria.childCriterias.create();
                cCriteria.propertyPath = bo.MaterialPriceList.PROPERTY_MATERIALPRICEITEMS_NAME;
                if (caller instanceof MaterialGrossProfitLine) {
                    condition = cCriteria.conditions.create();
                    condition.alias = bo.MaterialPriceItem.PROPERTY_ITEMCODE_NAME;
                    condition.value = caller.itemCode;
                    condition.bracketOpen = 1;
                    condition = cCriteria.conditions.create();
                    condition.alias = bo.MaterialPriceItem.PROPERTY_UOM_NAME;
                    // tslint:disable-next-line: triple-equals
                    condition.value = priceList == bo.MaterialPriceList.PRICE_LIST_COST_PRICE ? "" : caller.uom;
                    condition.bracketClose = 1;
                } else {
                    for (let item of this.grossProfitData.lines) {
                        condition = cCriteria.conditions.create();
                        condition.alias = bo.MaterialPriceItem.PROPERTY_ITEMCODE_NAME;
                        condition.value = item.itemCode;
                        condition.bracketOpen = 1;
                        if (cCriteria.conditions.length > 2) {
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                        condition = cCriteria.conditions.create();
                        condition.alias = bo.MaterialPriceItem.PROPERTY_UOM_NAME;
                        // tslint:disable-next-line: triple-equals
                        condition.value = priceList == bo.MaterialPriceList.PRICE_LIST_COST_PRICE ? "" : item.uom;
                        condition.bracketClose = 1;
                    }
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialPriceList({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        // 默认系统币
                        for (let item of opRslt.resultObjects) {
                            if (ibas.strings.isEmpty(item.currency)) {
                                item.currency = accounting.config.currency("LOCAL");
                            }
                            for (let sItem of item.materialPriceItems) {
                                if (ibas.strings.isEmpty(sItem.currency)) {
                                    sItem.currency = item.currency;
                                }
                            }
                        }
                        if (caller instanceof MaterialGrossProfitLine) {
                            for (let item of opRslt.resultObjects) {
                                for (let sItem of item.materialPriceItems) {
                                    if (sItem.itemCode !== caller.itemCode) {
                                        continue;
                                    }
                                    // tslint:disable-next-line: triple-equals
                                    if (sItem.uom !== caller.uom && item.objectKey != bo.MaterialPriceList.PRICE_LIST_COST_PRICE) {
                                        continue;
                                    }
                                    caller[PROPERTY_GROSSPROFITLIST] = item.objectKey;
                                    accounting.currency.exchange(
                                        {
                                            currency: sItem.currency,
                                            amount: sItem.price,
                                        },
                                        caller.currency,
                                        (result) => {
                                            if (result instanceof Error) {
                                                this.messages(result);
                                            } else {
                                                caller[PROPERTY_GROSSPROFITPRICE] = result.amount;
                                                caller.calculate();
                                            }
                                        },
                                        this.grossProfitData.documentDate
                                    ); return;
                                }
                            }
                            // 未找到价格的，设置为0
                            caller[PROPERTY_GROSSPROFITLIST] = priceList;
                            caller[PROPERTY_GROSSPROFITPRICE] = 0;
                            caller.calculate();
                        } else {
                            let lines: ibas.IList<MaterialGrossProfitLine> = ibas.arrays.create(this.grossProfitData.lines);
                            ibas.queues.execute(lines, (line, next) => {
                                for (let item of opRslt.resultObjects) {
                                    for (let sItem of item.materialPriceItems) {
                                        if (sItem.itemCode !== line.itemCode) {
                                            continue;
                                        }
                                        // tslint:disable-next-line: triple-equals
                                        if (sItem.uom !== line.uom && item.objectKey != bo.MaterialPriceList.PRICE_LIST_COST_PRICE) {
                                            continue;
                                        }
                                        line[PROPERTY_GROSSPROFITLIST] = item.objectKey;
                                        accounting.currency.exchange(
                                            {
                                                currency: sItem.currency,
                                                amount: sItem.price,
                                            },
                                            line.currency,
                                            (result) => {
                                                if (result instanceof Error) {
                                                    this.messages(result);
                                                } else {
                                                    line[PROPERTY_GROSSPROFITPRICE] = result.amount;
                                                    line.calculate();
                                                    lines.remove(line);
                                                    next();
                                                }
                                            },
                                            this.grossProfitData.documentDate
                                        ); return;
                                    }
                                }
                                next();
                            }, (result) => {
                                if (result instanceof Error) {
                                    this.messages(result);
                                } else {
                                    // 未找到价格的，设置为0
                                    for (let line of lines) {
                                        line[PROPERTY_GROSSPROFITLIST] = priceList;
                                        line[PROPERTY_GROSSPROFITPRICE] = 0;
                                        line.calculate();
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        /** 视图-物料毛利润 */
        export interface IMaterialGrossProfitView extends ibas.IView {
            /** 显示数据 */
            showData(data: MaterialGrossProfit): void;
            /** 显示数据行 */
            showDataLines(datas: MaterialGrossProfitLine[]): void;
            /** 改变价格清单事件 */
            changePriceListEvent: Function;
            /** 应用改变事件 */
            applyEvent: Function;
        }
        /**  物料毛利润服务映射 */
        export class MaterialGrossProfitServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialGrossProfitService.APPLICATION_ID;
                this.name = MaterialGrossProfitService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialGrossProfitServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialGrossProfitService();
            }
        }
    }
}