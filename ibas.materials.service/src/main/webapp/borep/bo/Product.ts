/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        export class Product extends ibas.BOMasterData<Product> implements IProduct {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_PRODUCT;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string = "Code";
            /** 获取-编码 */
            get code(): string {
                return this.getProperty<string>(Product.PROPERTY_CODE_NAME);
            }
            /** 设置-编码 */
            set code(value: string) {
                this.setProperty(Product.PROPERTY_CODE_NAME, value);
            }

            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(Product.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(Product.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-外文名称 */
            static PROPERTY_FOREIGNNAME_NAME: string = "ForeignName";
            /** 获取-外文名称 */
            get foreignName(): string {
                return this.getProperty<string>(Product.PROPERTY_FOREIGNNAME_NAME);
            }
            /** 设置-外文名称 */
            set foreignName(value: string) {
                this.setProperty(Product.PROPERTY_FOREIGNNAME_NAME, value);
            }

            /** 映射的属性名称-标识 */
            static PROPERTY_SIGN_NAME: string = "Sign";
            /** 获取-标识 */
            get sign(): string {
                return this.getProperty<string>(Product.PROPERTY_SIGN_NAME);
            }
            /** 设置-标识 */
            set sign(value: string) {
                this.setProperty(Product.PROPERTY_SIGN_NAME, value);
            }

            /** 映射的属性名称-物料组 */
            static PROPERTY_GROUP_NAME: string = "Group";
            /** 获取-物料组 */
            get group(): string {
                return this.getProperty<string>(Product.PROPERTY_GROUP_NAME);
            }
            /** 设置-物料组 */
            set group(value: string) {
                this.setProperty(Product.PROPERTY_GROUP_NAME, value);
            }

            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-激活 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-激活 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-条形码 */
            static PROPERTY_BARCODE_NAME: string = "BarCode";
            /** 获取-条形码 */
            get barCode(): string {
                return this.getProperty<string>(Product.PROPERTY_BARCODE_NAME);
            }
            /** 设置-条形码 */
            set barCode(value: string) {
                this.setProperty(Product.PROPERTY_BARCODE_NAME, value);
            }

            /** 映射的属性名称-物料类型 */
            static PROPERTY_ITEMTYPE_NAME: string = "ItemType";
            /** 获取-物料类型 */
            get itemType(): emItemType {
                return this.getProperty<emItemType>(Product.PROPERTY_ITEMTYPE_NAME);
            }
            /** 设置-物料类型 */
            set itemType(value: emItemType) {
                this.setProperty(Product.PROPERTY_ITEMTYPE_NAME, value);
            }

            /** 映射的属性名称-采购物料 */
            static PROPERTY_PURCHASEITEM_NAME: string = "PurchaseItem";
            /** 获取-采购物料 */
            get purchaseItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_PURCHASEITEM_NAME);
            }
            /** 设置-采购物料 */
            set purchaseItem(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_PURCHASEITEM_NAME, value);
            }

            /** 映射的属性名称-销售物料 */
            static PROPERTY_SALESITEM_NAME: string = "SalesItem";
            /** 获取-销售物料 */
            get salesItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_SALESITEM_NAME);
            }
            /** 设置-销售物料 */
            set salesItem(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_SALESITEM_NAME, value);
            }

            /** 映射的属性名称-库存物料 */
            static PROPERTY_INVENTORYITEM_NAME: string = "InventoryItem";
            /** 获取-库存物料 */
            get inventoryItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_INVENTORYITEM_NAME);
            }
            /** 设置-库存物料 */
            set inventoryItem(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_INVENTORYITEM_NAME, value);
            }

            /** 映射的属性名称-虚拟物料 */
            static PROPERTY_PHANTOMITEM_NAME: string = "PhantomItem";
            /** 获取-虚拟物料 */
            get phantomItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_PHANTOMITEM_NAME);
            }
            /** 设置-虚拟物料 */
            set phantomItem(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_PHANTOMITEM_NAME, value);
            }

            /** 映射的属性名称-缺省仓库 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库 */
            get warehouse(): string {
                return this.getProperty<string>(Product.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库 */
            set warehouse(value: string) {
                this.setProperty(Product.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-缺省仓库 */
            static PROPERTY_DEFAULTWAREHOUSE_NAME: string = "DefaultWarehouse";
            /** 获取-缺省仓库 */
            get defaultWarehouse(): string {
                return this.getProperty<string>(Product.PROPERTY_DEFAULTWAREHOUSE_NAME);
            }
            /** 设置-缺省仓库 */
            set defaultWarehouse(value: string) {
                this.setProperty(Product.PROPERTY_DEFAULTWAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-首选供应商 */
            static PROPERTY_PREFERREDVENDOR_NAME: string = "PreferredVendor";
            /** 获取-首选供应商 */
            get preferredVendor(): string {
                return this.getProperty<string>(Product.PROPERTY_PREFERREDVENDOR_NAME);
            }
            /** 设置-首选供应商 */
            set preferredVendor(value: string) {
                this.setProperty(Product.PROPERTY_PREFERREDVENDOR_NAME, value);
            }

            /** 映射的属性名称-生产商 */
            static PROPERTY_MANUFACTURER_NAME: string = "Manufacturer";
            /** 获取-生产商 */
            get manufacturer(): string {
                return this.getProperty<string>(Product.PROPERTY_MANUFACTURER_NAME);
            }
            /** 设置-生产商 */
            set manufacturer(value: string) {
                this.setProperty(Product.PROPERTY_MANUFACTURER_NAME, value);
            }

            /** 映射的属性名称-库存单位 */
            static PROPERTY_INVENTORYUOM_NAME: string = "InventoryUOM";
            /** 获取-库存单位 */
            get inventoryUOM(): string {
                return this.getProperty<string>(Product.PROPERTY_INVENTORYUOM_NAME);
            }
            /** 设置-库存单位 */
            set inventoryUOM(value: string) {
                this.setProperty(Product.PROPERTY_INVENTORYUOM_NAME, value);
            }

            /** 映射的属性名称-价格 */
            static PROPERTY_PRICE_NAME: string = "Price";
            /** 获取-价格 */
            get price(): number {
                return this.getProperty<number>(Product.PROPERTY_PRICE_NAME);
            }
            /** 设置-价格 */
            set price(value: number) {
                this.setProperty(Product.PROPERTY_PRICE_NAME, value);
            }

            /** 映射的属性名称-货币 */
            static PROPERTY_CURRENCY_NAME: string = "Currency";
            /** 获取-货币 */
            get currency(): string {
                return this.getProperty<string>(Product.PROPERTY_CURRENCY_NAME);
            }
            /** 设置-货币 */
            set currency(value: string) {
                this.setProperty(Product.PROPERTY_CURRENCY_NAME, value);
            }

            /** 映射的属性名称-含税 */
            static PROPERTY_TAXED_NAME: string = "Taxed";
            /** 获取-含税 */
            get taxed(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_TAXED_NAME);
            }
            /** 设置-含税 */
            set taxed(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_TAXED_NAME, value);
            }

            /** 映射的属性名称-库存 */
            static PROPERTY_ONHAND_NAME: string = "OnHand";
            /** 获取-库存 */
            get onHand(): number {
                return this.getProperty<number>(Product.PROPERTY_ONHAND_NAME);
            }
            /** 设置-库存 */
            set onHand(value: number) {
                this.setProperty(Product.PROPERTY_ONHAND_NAME, value);
            }

            /** 映射的属性名称-已承诺 */
            static PROPERTY_ONCOMMITED_NAME: string = "OnCommited";
            /** 获取-已承诺 */
            get onCommited(): number {
                return this.getProperty<number>(Product.PROPERTY_ONCOMMITED_NAME);
            }
            /** 设置-已承诺 */
            set onCommited(value: number) {
                this.setProperty(Product.PROPERTY_ONCOMMITED_NAME, value);
            }

            /** 映射的属性名称-已订购 */
            static PROPERTY_ONORDERED_NAME: string = "OnOrdered";
            /** 获取-已订购 */
            get onOrdered(): number {
                return this.getProperty<number>(Product.PROPERTY_ONORDERED_NAME);
            }
            /** 设置-已订购 */
            set onOrdered(value: number) {
                this.setProperty(Product.PROPERTY_ONORDERED_NAME, value);
            }

            /** 映射的属性名称-已预留 */
            static PROPERTY_ONRESERVED_NAME: string = "OnReserved";
            /** 获取-已预留 */
            get onReserved(): number {
                return this.getProperty<number>(Product.PROPERTY_ONRESERVED_NAME);
            }
            /** 设置-已预留 */
            set onReserved(value: number) {
                this.setProperty(Product.PROPERTY_ONRESERVED_NAME, value);
            }

            /** 映射的属性名称-提前期（天） */
            static PROPERTY_LEADTIME_NAME: string = "LeadTime";
            /** 获取-提前期（天） */
            get leadTime(): number {
                return this.getProperty<number>(Product.PROPERTY_LEADTIME_NAME);
            }
            /** 设置-提前期（天） */
            set leadTime(value: number) {
                this.setProperty(Product.PROPERTY_LEADTIME_NAME, value);
            }

            /** 映射的属性名称-序号管理 */
            static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
            /** 获取-序号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_SERIALMANAGEMENT_NAME);
            }
            /** 设置-序号管理 */
            set serialManagement(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_SERIALMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-批号管理 */
            static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
            /** 获取-批号管理 */
            get batchManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_BATCHMANAGEMENT_NAME);
            }
            /** 设置-批号管理 */
            set batchManagement(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_BATCHMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-采购税收组 */
            static PROPERTY_PURCHASETAXGROUP_NAME: string = "PurchaseTaxGroup";
            /** 获取-采购税收组 */
            get purchaseTaxGroup(): string {
                return this.getProperty<string>(Product.PROPERTY_PURCHASETAXGROUP_NAME);
            }
            /** 设置-采购税收组 */
            set purchaseTaxGroup(value: string) {
                this.setProperty(Product.PROPERTY_PURCHASETAXGROUP_NAME, value);
            }

            /** 映射的属性名称-销售税收组 */
            static PROPERTY_SALESTAXGROUP_NAME: string = "SalesTaxGroup";
            /** 获取-销售税收组 */
            get salesTaxGroup(): string {
                return this.getProperty<string>(Product.PROPERTY_SALESTAXGROUP_NAME);
            }
            /** 设置-销售税收组 */
            set salesTaxGroup(value: string) {
                this.setProperty(Product.PROPERTY_SALESTAXGROUP_NAME, value);
            }

            /** 映射的属性名称-采购单位 */
            static PROPERTY_PURCHASEUOM_NAME: string = "PurchaseUOM";
            /** 获取-采购单位 */
            get purchaseUOM(): string {
                return this.getProperty<string>(Product.PROPERTY_PURCHASEUOM_NAME);
            }
            /** 设置-采购单位 */
            set purchaseUOM(value: string) {
                this.setProperty(Product.PROPERTY_PURCHASEUOM_NAME, value);
            }

            /** 映射的属性名称-销售单位 */
            static PROPERTY_SALESUOM_NAME: string = "SalesUOM";
            /** 获取-销售单位 */
            get salesUOM(): string {
                return this.getProperty<string>(Product.PROPERTY_SALESUOM_NAME);
            }
            /** 设置-销售单位 */
            set salesUOM(value: string) {
                this.setProperty(Product.PROPERTY_SALESUOM_NAME, value);
            }

            /** 映射的属性名称-生产单位 */
            static PROPERTY_PRODUCTIONUOM_NAME: string = "ProductionUOM";
            /** 获取-生产单位 */
            get productionUOM(): string {
                return this.getProperty<string>(Product.PROPERTY_PRODUCTIONUOM_NAME);
            }
            /** 设置-生产单位 */
            set productionUOM(value: string) {
                this.setProperty(Product.PROPERTY_PRODUCTIONUOM_NAME, value);
            }

            /** 映射的属性名称-获取方式 */
            static PROPERTY_PROCUREMENTMETHOD_NAME: string = "ProcurementMethod";
            /** 获取-获取方式 */
            get procurementMethod(): emProcurementMethod {
                return this.getProperty<emProcurementMethod>(Product.PROPERTY_PROCUREMENTMETHOD_NAME);
            }
            /** 设置-获取方式 */
            set procurementMethod(value: emProcurementMethod) {
                this.setProperty(Product.PROPERTY_PROCUREMENTMETHOD_NAME, value);
            }

            /** 映射的属性名称-领料方式 */
            static PROPERTY_ISSUEMETHOD_NAME: string = "IssueMethod";
            /** 获取-领料方式 */
            get issueMethod(): emIssueMethod {
                return this.getProperty<emIssueMethod>(Product.PROPERTY_ISSUEMETHOD_NAME);
            }
            /** 设置-领料方式 */
            set issueMethod(value: emIssueMethod) {
                this.setProperty(Product.PROPERTY_ISSUEMETHOD_NAME, value);
            }

            /** 映射的属性名称-计划方式 */
            static PROPERTY_PLANNINGMETHOD_NAME: string = "PlanningMethod";
            /** 获取-计划方式 */
            get planningMethod(): emPlanningMethod {
                return this.getProperty<emPlanningMethod>(Product.PROPERTY_PLANNINGMETHOD_NAME);
            }
            /** 设置-计划方式 */
            set planningMethod(value: emPlanningMethod) {
                this.setProperty(Product.PROPERTY_PLANNINGMETHOD_NAME, value);
            }

            /** 映射的属性名称-齐套检查 */
            static PROPERTY_CHECKCOMPLETENESS_NAME: string = "CheckCompleteness";
            /** 获取-齐套检查 */
            get checkCompleteness(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_CHECKCOMPLETENESS_NAME);
            }
            /** 设置-齐套检查 */
            set checkCompleteness(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_CHECKCOMPLETENESS_NAME, value);
            }

            /** 映射的属性名称-批次混用 */
            static PROPERTY_MIXINGBATCHES_NAME: string = "MixingBatches";
            /** 获取-批次混用 */
            get mixingBatches(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_MIXINGBATCHES_NAME);
            }
            /** 设置-批次混用 */
            set mixingBatches(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_MIXINGBATCHES_NAME, value);
            }

            /** 映射的属性名称-订单生产 */
            static PROPERTY_MADETOORDER_NAME: string = "MadeToOrder";
            /** 获取-订单生产 */
            get madeToOrder(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Product.PROPERTY_MADETOORDER_NAME);
            }
            /** 设置-订单生产 */
            set madeToOrder(value: ibas.emYesNo) {
                this.setProperty(Product.PROPERTY_MADETOORDER_NAME, value);
            }

            /** 映射的属性名称-图号 */
            static PROPERTY_DARWINGNUMBER_NAME: string = "DarwingNumber";
            /** 获取-图号 */
            get darwingNumber(): string {
                return this.getProperty<string>(Product.PROPERTY_DARWINGNUMBER_NAME);
            }
            /** 设置-图号 */
            set darwingNumber(value: string) {
                this.setProperty(Product.PROPERTY_DARWINGNUMBER_NAME, value);
            }

            /** 映射的属性名称-匹配码 */
            static PROPERTY_MATCHCODE_NAME: string = "MatchCode";
            /** 获取-匹配码 */
            get matchCode(): string {
                return this.getProperty<string>(Product.PROPERTY_MATCHCODE_NAME);
            }
            /** 设置-匹配码 */
            set matchCode(value: string) {
                this.setProperty(Product.PROPERTY_MATCHCODE_NAME, value);
            }

            /** 映射的属性名称-生产批量 */
            static PROPERTY_LOTSIZE_NAME: string = "LotSize";
            /** 获取-生产批量 */
            get lotSize(): number {
                return this.getProperty<number>(Product.PROPERTY_LOTSIZE_NAME);
            }
            /** 设置-生产批量 */
            set lotSize(value: number) {
                this.setProperty(Product.PROPERTY_LOTSIZE_NAME, value);
            }

            /** 映射的属性名称-废品率 */
            static PROPERTY_SCRAP_NAME: string = "Scrap";
            /** 获取-废品率 */
            get scrap(): string {
                return this.getProperty<string>(Product.PROPERTY_SCRAP_NAME);
            }
            /** 设置-废品率 */
            set scrap(value: string) {
                this.setProperty(Product.PROPERTY_SCRAP_NAME, value);
            }

            /** 映射的属性名称-计划员 */
            static PROPERTY_SCHEDULER_NAME: string = "Scheduler";
            /** 获取-计划员 */
            get scheduler(): string {
                return this.getProperty<string>(Product.PROPERTY_SCHEDULER_NAME);
            }
            /** 设置-计划员 */
            set scheduler(value: string) {
                this.setProperty(Product.PROPERTY_SCHEDULER_NAME, value);
            }

            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
            /** 获取-生效日期 */
            get validDate(): Date {
                return this.getProperty<Date>(Product.PROPERTY_VALIDDATE_NAME);
            }
            /** 设置-生效日期 */
            set validDate(value: Date) {
                this.setProperty(Product.PROPERTY_VALIDDATE_NAME, value);
            }

            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
            /** 获取-失效日期 */
            get invalidDate(): Date {
                return this.getProperty<Date>(Product.PROPERTY_INVALIDDATE_NAME);
            }
            /** 设置-失效日期 */
            set invalidDate(value: Date) {
                this.setProperty(Product.PROPERTY_INVALIDDATE_NAME, value);
            }

            /** 映射的属性名称-图片 */
            static PROPERTY_PICTURE_NAME: string = "Picture";
            /** 获取-图片 */
            get picture(): string {
                return this.getProperty<string>(Product.PROPERTY_PICTURE_NAME);
            }
            /** 设置-图片 */
            set picture(value: string) {
                this.setProperty(Product.PROPERTY_PICTURE_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
            /** 获取-对象编号 */
            get docEntry(): number {
                return this.getProperty<number>(Product.PROPERTY_DOCENTRY_NAME);
            }
            /** 设置-对象编号 */
            set docEntry(value: number) {
                this.setProperty(Product.PROPERTY_DOCENTRY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(Product.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(Product.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(Product.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(Product.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(Product.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(Product.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(Product.BUSINESS_OBJECT_CODE);
                this.activated = ibas.emYesNo.YES;
                this.itemType = emItemType.ITEM;
                this.salesItem = ibas.emYesNo.YES;
                this.purchaseItem = ibas.emYesNo.YES;
                this.inventoryItem = ibas.emYesNo.YES;
            }
            /** 重置 */
            reset(): void {
                super.reset();
                this.onCommited = 0;
                this.onHand = 0;
                this.onOrdered = 0;
            }
            /** 可用量（库存+已订购-已承诺） */
            onAvailable(): number {
                return ibas.numbers.valueOf(this.onHand)
                    + ibas.numbers.valueOf(this.onOrdered)
                    - ibas.numbers.valueOf(this.onCommited);
            }
        }
    }
}