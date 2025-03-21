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
        export class MaterialHistoricalPrice extends ibas.Bindable {
            constructor(original: IMaterialHistoricalPricesContract) {
                super();
                this[PROPERTY_ORIGINAL] = original;
            }

            get original(): IMaterialHistoricalPricesContract {
                return this[PROPERTY_ORIGINAL];
            }
            set original(value: IMaterialHistoricalPricesContract) {
                this[PROPERTY_ORIGINAL] = value;
            }

            get businessPartnerType(): businesspartner.bo.emBusinessPartnerType {
                return this.original.businessPartnerType;
            }
            set businessPartnerType(value: businesspartner.bo.emBusinessPartnerType) {
                this.original.businessPartnerType = value;
            }
            get businessPartnerCode(): string {
                return this.original.businessPartnerCode;
            }
            set businessPartnerCode(value: string) {
                this.original.businessPartnerCode = value;
            }
            get businessPartnerName(): string {
                return this.original.businessPartnerName;
            }
            set businessPartnerName(value: string) {
                this.original.businessPartnerName = value;
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
            get documentLineId(): number {
                return this.original.documentLineId;
            }
            set documentLineId(value: number) {
                this.original.documentLineId = value;
            }
            get documentDate(): Date {
                return this.original.documentDate;
            }
            set documentDate(value: Date) {
                this.original.documentDate = value;
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
        }
        /** 物料历史价格服务 */
        export class MaterialHistoricalPricesService extends ibas.ServiceApplication<IMaterialHistoricalPricesView, IMaterialHistoricalPricesContract> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e53c4fc0-29c8-4f41-ab7e-99a3f002481e";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_material_historicalprices";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialHistoricalPricesService.APPLICATION_ID;
                this.name = MaterialHistoricalPricesService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.obtainDocumentAgentsEvent = this.obtainDocumentAgents;
                this.view.fetchDocumentDatasEvent = this.fetchDocumentDatas;
                this.view.applyEvent = this.apply;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.contract)) {
                    this.contract = new MaterialHistoricalPrice({
                        businessPartnerType: businesspartner.bo.emBusinessPartnerType.CUSTOMER,
                        businessPartnerCode: "",
                        businessPartnerName: "",
                        documentType: undefined,
                        documentEntry: 0,
                        documentLineId: 0,
                        documentDate: ibas.dates.today(),
                        itemCode: "",
                        itemDescription: "",
                        quantity: 0,
                        uom: "",
                        applyPrice: (type, price, currency) => {
                        }
                    });
                }
                this.view.showDocument(this.contract);
            }
            private contract: MaterialHistoricalPrice;
            protected runService(contract: IMaterialHistoricalPricesContract): void {
                this.contract = new MaterialHistoricalPrice(contract);
                this.show();
            }
            protected obtainDocumentAgents(bpType: businesspartner.bo.emBusinessPartnerType, resultCount?: number, bpCode?: string): void {
                this.view.showDocumentAgents(ibas.servicesManager.getServices({
                    trigger: this,
                    category: ibas.enums.toString(businesspartner.bo.emBusinessPartnerType, bpType),
                    proxy: new DocumentMaterialPriceServiceProxy({
                        businessPartnerType: bpType,
                        businessPartnerCode: bpCode ? bpCode : undefined,
                        documentDate: this.contract.documentDate,
                        itemCode: this.contract.itemCode,
                        resultCount: resultCount,
                        onCompleted: (results: Error | IDocumentMaterialPriceData[]) => {
                            if (results instanceof Error) {
                                this.proceeding(results);
                            } else {
                                this.view.showDocumentDatas(results);
                            }
                        }
                    })
                }));
            }
            protected fetchDocumentDatas(agents: ibas.IServiceAgent[]): void {
                if (agents instanceof Array) {
                    this.busy(true);
                    ibas.queues.execute(agents,
                        (agent, next) => {
                            agent.run();
                            setTimeout(() => {
                                next();
                            }, 300);
                        },
                        (result) => {
                            this.busy(false);
                            if (result instanceof Error) {
                                this.messages(result);
                            }
                        }
                    );
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
                }
            }
            protected apply(data: IDocumentMaterialPriceData, type: "PRICE" | "PRETAXPRICE" | "UNITPRICE"): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_apply")
                    )); return;
                }
                if (!(this.contract.original.applyPrice instanceof Function)) {
                    return;
                }
                let price: number = 0;
                if (ibas.strings.equalsIgnoreCase(type, "PRICE")) {
                    price = data.price;
                } else if (ibas.strings.equalsIgnoreCase(type, "PRETAXPRICE")) {
                    price = data.preTaxPrice;
                } else {
                    price = data.unitPrice;
                }
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    message: ibas.i18n.prop("materials_document_apply_price_continue", price, data.currency),
                    actions: [
                        ibas.emMessageAction.YES,
                        ibas.emMessageAction.NO
                    ],
                    onCompleted: (action) => {
                        if (action === ibas.emMessageAction.YES) {
                            this.contract.original.applyPrice(type, price, data.currency);
                            this.close();
                        }
                    }
                }); return;
            }
        }
        /** 视图-物料历史价格 */
        export interface IMaterialHistoricalPricesView extends ibas.IView {
            /** 应用价格事件 */
            applyEvent: Function;
            /** 显示单据数据 */
            showDocument(data: MaterialHistoricalPrice): void;
            /** 获取单据代理事件 */
            obtainDocumentAgentsEvent: Function;
            /** 显示单据服务代理 */
            showDocumentAgents(agents: ibas.IServiceAgent[]): void;
            /** 查询单据数据事件 */
            fetchDocumentDatasEvent: Function;
            /** 显示单据数据 */
            showDocumentDatas(datas: IDocumentMaterialPriceData[]): void;
        }
        /**  物料历史价格服务映射 */
        export class MaterialHistoricalPricesServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialHistoricalPricesService.APPLICATION_ID;
                this.name = MaterialHistoricalPricesService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialHistoricalPricesServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialHistoricalPricesService();
            }
        }
    }
}