/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料 */
        export class Material extends ibas.BOMasterData<Material> implements IMaterial {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIAL;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string = "Code";
            /** 获取-编码 */
            get code(): string {
                return this.getProperty<string>(Material.PROPERTY_CODE_NAME);
            }
            /** 设置-编码 */
            set code(value: string) {
                this.setProperty(Material.PROPERTY_CODE_NAME, value);
            }

            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(Material.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(Material.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-外文名称 */
            static PROPERTY_FOREIGNNAME_NAME: string = "ForeignName";
            /** 获取-外文名称 */
            get foreignName(): string {
                return this.getProperty<string>(Material.PROPERTY_FOREIGNNAME_NAME);
            }
            /** 设置-外文名称 */
            set foreignName(value: string) {
                this.setProperty(Material.PROPERTY_FOREIGNNAME_NAME, value);
            }

            /** 映射的属性名称-标识 */
            static PROPERTY_SIGN_NAME: string = "Sign";
            /** 获取-标识 */
            get sign(): string {
                return this.getProperty<string>(Material.PROPERTY_SIGN_NAME);
            }
            /** 设置-标识 */
            set sign(value: string) {
                this.setProperty(Material.PROPERTY_SIGN_NAME, value);
            }

            /** 映射的属性名称-物料组 */
            static PROPERTY_GROUP_NAME: string = "Group";
            /** 获取-物料组 */
            get group(): string {
                return this.getProperty<string>(Material.PROPERTY_GROUP_NAME);
            }
            /** 设置-物料组 */
            set group(value: string) {
                this.setProperty(Material.PROPERTY_GROUP_NAME, value);
            }

            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-激活 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-激活 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-条形码 */
            static PROPERTY_BARCODE_NAME: string = "BarCode";
            /** 获取-条形码 */
            get barCode(): string {
                return this.getProperty<string>(Material.PROPERTY_BARCODE_NAME);
            }
            /** 设置-条形码 */
            set barCode(value: string) {
                this.setProperty(Material.PROPERTY_BARCODE_NAME, value);
            }

            /** 映射的属性名称-物料类型 */
            static PROPERTY_ITEMTYPE_NAME: string = "ItemType";
            /** 获取-物料类型 */
            get itemType(): emItemType {
                return this.getProperty<emItemType>(Material.PROPERTY_ITEMTYPE_NAME);
            }
            /** 设置-物料类型 */
            set itemType(value: emItemType) {
                this.setProperty(Material.PROPERTY_ITEMTYPE_NAME, value);
            }

            /** 映射的属性名称-采购物料 */
            static PROPERTY_PURCHASEITEM_NAME: string = "PurchaseItem";
            /** 获取-采购物料 */
            get purchaseItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_PURCHASEITEM_NAME);
            }
            /** 设置-采购物料 */
            set purchaseItem(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_PURCHASEITEM_NAME, value);
            }

            /** 映射的属性名称-销售物料 */
            static PROPERTY_SALESITEM_NAME: string = "SalesItem";
            /** 获取-销售物料 */
            get salesItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_SALESITEM_NAME);
            }
            /** 设置-销售物料 */
            set salesItem(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_SALESITEM_NAME, value);
            }

            /** 映射的属性名称-库存物料 */
            static PROPERTY_INVENTORYITEM_NAME: string = "InventoryItem";
            /** 获取-库存物料 */
            get inventoryItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_INVENTORYITEM_NAME);
            }
            /** 设置-库存物料 */
            set inventoryItem(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_INVENTORYITEM_NAME, value);
            }

            /** 映射的属性名称-虚拟物料 */
            static PROPERTY_PHANTOMITEM_NAME: string = "PhantomItem";
            /** 获取-虚拟物料 */
            get phantomItem(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_PHANTOMITEM_NAME);
            }
            /** 设置-虚拟物料 */
            set phantomItem(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_PHANTOMITEM_NAME, value);
            }

            /** 映射的属性名称-固定资产 */
            static PROPERTY_FIXEDASSET_NAME: string = "FixedAsset";
            /** 获取-固定资产 */
            get fixedAsset(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_FIXEDASSET_NAME);
            }
            /** 设置-固定资产 */
            set fixedAsset(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_FIXEDASSET_NAME, value);
            }

            /** 映射的属性名称-产品单元 */
            static PROPERTY_PRODUCTUNIT_NAME: string = "ProductUnit";
            /** 获取-产品单元 */
            get productUnit(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_PRODUCTUNIT_NAME);
            }
            /** 设置-产品单元 */
            set productUnit(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_PRODUCTUNIT_NAME, value);
            }

            /** 映射的属性名称-缺省仓库 */
            static PROPERTY_DEFAULTWAREHOUSE_NAME: string = "DefaultWarehouse";
            /** 获取-缺省仓库 */
            get defaultWarehouse(): string {
                return this.getProperty<string>(Material.PROPERTY_DEFAULTWAREHOUSE_NAME);
            }
            /** 设置-缺省仓库 */
            set defaultWarehouse(value: string) {
                this.setProperty(Material.PROPERTY_DEFAULTWAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-首选供应商 */
            static PROPERTY_PREFERREDVENDOR_NAME: string = "PreferredVendor";
            /** 获取-首选供应商 */
            get preferredVendor(): string {
                return this.getProperty<string>(Material.PROPERTY_PREFERREDVENDOR_NAME);
            }
            /** 设置-首选供应商 */
            set preferredVendor(value: string) {
                this.setProperty(Material.PROPERTY_PREFERREDVENDOR_NAME, value);
            }

            /** 映射的属性名称-生产商 */
            static PROPERTY_MANUFACTURER_NAME: string = "Manufacturer";
            /** 获取-生产商 */
            get manufacturer(): string {
                return this.getProperty<string>(Material.PROPERTY_MANUFACTURER_NAME);
            }
            /** 设置-生产商 */
            set manufacturer(value: string) {
                this.setProperty(Material.PROPERTY_MANUFACTURER_NAME, value);
            }

            /** 映射的属性名称-库存单位 */
            static PROPERTY_INVENTORYUOM_NAME: string = "InventoryUOM";
            /** 获取-库存单位 */
            get inventoryUOM(): string {
                return this.getProperty<string>(Material.PROPERTY_INVENTORYUOM_NAME);
            }
            /** 设置-库存单位 */
            set inventoryUOM(value: string) {
                this.setProperty(Material.PROPERTY_INVENTORYUOM_NAME, value);
            }

            /** 映射的属性名称-价格 */
            static PROPERTY_AVGPRICE_NAME: string = "AvgPrice";
            /** 获取-价格 */
            get avgPrice(): number {
                return this.getProperty<number>(Material.PROPERTY_AVGPRICE_NAME);
            }
            /** 设置-价格 */
            set avgPrice(value: number) {
                this.setProperty(Material.PROPERTY_AVGPRICE_NAME, value);
            }
            /** 映射的属性名称-评估方法 */
            static PROPERTY_VALUATIONMETHOD_NAME: string = "ValuationMethod";
            /** 获取-评估方法 */
            get valuationMethod(): emValuationMethod {
                return this.getProperty<emValuationMethod>(Material.PROPERTY_VALUATIONMETHOD_NAME);
            }
            /** 设置-评估方法 */
            set valuationMethod(value: emValuationMethod) {
                this.setProperty(Material.PROPERTY_VALUATIONMETHOD_NAME, value);
            }

            /** 映射的属性名称-库存 */
            static PROPERTY_ONHAND_NAME: string = "OnHand";
            /** 获取-库存 */
            get onHand(): number {
                return this.getProperty<number>(Material.PROPERTY_ONHAND_NAME);
            }
            /** 设置-库存 */
            set onHand(value: number) {
                this.setProperty(Material.PROPERTY_ONHAND_NAME, value);
            }

            /** 映射的属性名称-已承诺 */
            static PROPERTY_ONCOMMITED_NAME: string = "OnCommited";
            /** 获取-已承诺 */
            get onCommited(): number {
                return this.getProperty<number>(Material.PROPERTY_ONCOMMITED_NAME);
            }
            /** 设置-已承诺 */
            set onCommited(value: number) {
                this.setProperty(Material.PROPERTY_ONCOMMITED_NAME, value);
            }

            /** 映射的属性名称-已订购 */
            static PROPERTY_ONORDERED_NAME: string = "OnOrdered";
            /** 获取-已订购 */
            get onOrdered(): number {
                return this.getProperty<number>(Material.PROPERTY_ONORDERED_NAME);
            }
            /** 设置-已订购 */
            set onOrdered(value: number) {
                this.setProperty(Material.PROPERTY_ONORDERED_NAME, value);
            }

            /** 映射的属性名称-已预留 */
            static PROPERTY_ONRESERVED_NAME: string = "OnReserved";
            /** 获取-已预留 */
            get onReserved(): number {
                return this.getProperty<number>(Material.PROPERTY_ONRESERVED_NAME);
            }
            /** 设置-已预留 */
            set onReserved(value: number) {
                this.setProperty(Material.PROPERTY_ONRESERVED_NAME, value);
            }

            /** 映射的属性名称-库存价值 */
            static PROPERTY_INVENTORYVALUE_NAME: string = "InventoryValue";
            /** 获取-库存价值 */
            get inventoryValue(): number {
                return this.getProperty<number>(Material.PROPERTY_INVENTORYVALUE_NAME);
            }
            /** 设置-库存价值 */
            set inventoryValue(value: number) {
                this.setProperty(Material.PROPERTY_INVENTORYVALUE_NAME, value);
            }

            /** 映射的属性名称-按仓库管理 */
            static PROPERTY_MANAGEBYWAREHOUSE_NAME: string = "ManageByWarehouse";
            /** 获取-按仓库管理 */
            get manageByWarehouse(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_MANAGEBYWAREHOUSE_NAME);
            }
            /** 设置-按仓库管理 */
            set manageByWarehouse(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_MANAGEBYWAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-最低库存量 */
            static PROPERTY_MINIMUMINVENTORY_NAME: string = "MinimumInventory";
            /** 获取-最低库存量 */
            get minimumInventory(): number {
                return this.getProperty<number>(Material.PROPERTY_MINIMUMINVENTORY_NAME);
            }
            /** 设置-最低库存量 */
            set minimumInventory(value: number) {
                this.setProperty(Material.PROPERTY_MINIMUMINVENTORY_NAME, value);
            }

            /** 映射的属性名称-最高库存量 */
            static PROPERTY_MAXIMUMINVENTORY_NAME: string = "MaximumInventory";
            /** 获取-最高库存量 */
            get maximumInventory(): number {
                return this.getProperty<number>(Material.PROPERTY_MAXIMUMINVENTORY_NAME);
            }
            /** 设置-最高库存量 */
            set maximumInventory(value: number) {
                this.setProperty(Material.PROPERTY_MAXIMUMINVENTORY_NAME, value);
            }

            /** 映射的属性名称-最低订购数量 */
            static PROPERTY_MINIMUMORDERQUANTITY_NAME: string = "MinimumOrderQuantity";
            /** 获取-最低订购数量 */
            get minimumOrderQuantity(): number {
                return this.getProperty<number>(Material.PROPERTY_MINIMUMORDERQUANTITY_NAME);
            }
            /** 设置-最低订购数量 */
            set minimumOrderQuantity(value: number) {
                this.setProperty(Material.PROPERTY_MINIMUMORDERQUANTITY_NAME, value);
            }

            /** 映射的属性名称-订购倍数 */
            static PROPERTY_ORDERMULTIPLE_NAME: string = "OrderMultiple";
            /** 获取-订购倍数 */
            get orderMultiple(): number {
                return this.getProperty<number>(Material.PROPERTY_ORDERMULTIPLE_NAME);
            }
            /** 设置-订购倍数 */
            set orderMultiple(value: number) {
                this.setProperty(Material.PROPERTY_ORDERMULTIPLE_NAME, value);
            }

            /** 映射的属性名称-提前期（天） */
            static PROPERTY_LEADTIME_NAME: string = "LeadTime";
            /** 获取-提前期（天） */
            get leadTime(): number {
                return this.getProperty<number>(Material.PROPERTY_LEADTIME_NAME);
            }
            /** 设置-提前期（天） */
            set leadTime(value: number) {
                this.setProperty(Material.PROPERTY_LEADTIME_NAME, value);
            }

            /** 映射的属性名称-序号管理 */
            static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
            /** 获取-序号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_SERIALMANAGEMENT_NAME);
            }
            /** 设置-序号管理 */
            set serialManagement(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_SERIALMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-批号管理 */
            static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
            /** 获取-批号管理 */
            get batchManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_BATCHMANAGEMENT_NAME);
            }
            /** 设置-批号管理 */
            set batchManagement(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_BATCHMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-版本管理 */
            static PROPERTY_VERSIONMANAGEMENT_NAME: string = "VersionManagement";
            /** 获取-版本管理 */
            get versionManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_VERSIONMANAGEMENT_NAME);
            }
            /** 设置-版本管理 */
            set versionManagement(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_VERSIONMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-采购税收组 */
            static PROPERTY_PURCHASETAXGROUP_NAME: string = "PurchaseTaxGroup";
            /** 获取-采购税收组 */
            get purchaseTaxGroup(): string {
                return this.getProperty<string>(Material.PROPERTY_PURCHASETAXGROUP_NAME);
            }
            /** 设置-采购税收组 */
            set purchaseTaxGroup(value: string) {
                this.setProperty(Material.PROPERTY_PURCHASETAXGROUP_NAME, value);
            }

            /** 映射的属性名称-销售税收组 */
            static PROPERTY_SALESTAXGROUP_NAME: string = "SalesTaxGroup";
            /** 获取-销售税收组 */
            get salesTaxGroup(): string {
                return this.getProperty<string>(Material.PROPERTY_SALESTAXGROUP_NAME);
            }
            /** 设置-销售税收组 */
            set salesTaxGroup(value: string) {
                this.setProperty(Material.PROPERTY_SALESTAXGROUP_NAME, value);
            }

            /** 映射的属性名称-采购单位 */
            static PROPERTY_PURCHASEUOM_NAME: string = "PurchaseUOM";
            /** 获取-采购单位 */
            get purchaseUOM(): string {
                return this.getProperty<string>(Material.PROPERTY_PURCHASEUOM_NAME);
            }
            /** 设置-采购单位 */
            set purchaseUOM(value: string) {
                this.setProperty(Material.PROPERTY_PURCHASEUOM_NAME, value);
            }

            /** 映射的属性名称-销售单位 */
            static PROPERTY_SALESUOM_NAME: string = "SalesUOM";
            /** 获取-销售单位 */
            get salesUOM(): string {
                return this.getProperty<string>(Material.PROPERTY_SALESUOM_NAME);
            }
            /** 设置-销售单位 */
            set salesUOM(value: string) {
                this.setProperty(Material.PROPERTY_SALESUOM_NAME, value);
            }


            /** 映射的属性名称-生产单位 */
            static PROPERTY_PRODUCTIONUOM_NAME: string = "ProductionUOM";
            /** 获取-生产单位 */
            get productionUOM(): string {
                return this.getProperty<string>(Material.PROPERTY_PRODUCTIONUOM_NAME);
            }
            /** 设置-生产单位 */
            set productionUOM(value: string) {
                this.setProperty(Material.PROPERTY_PRODUCTIONUOM_NAME, value);
            }

            /** 映射的属性名称-获取方式 */
            static PROPERTY_PROCUREMENTMETHOD_NAME: string = "ProcurementMethod";
            /** 获取-获取方式 */
            get procurementMethod(): emProcurementMethod {
                return this.getProperty<emProcurementMethod>(Material.PROPERTY_PROCUREMENTMETHOD_NAME);
            }
            /** 设置-获取方式 */
            set procurementMethod(value: emProcurementMethod) {
                this.setProperty(Material.PROPERTY_PROCUREMENTMETHOD_NAME, value);
            }

            /** 映射的属性名称-领料方式 */
            static PROPERTY_ISSUEMETHOD_NAME: string = "IssueMethod";
            /** 获取-领料方式 */
            get issueMethod(): emIssueMethod {
                return this.getProperty<emIssueMethod>(Material.PROPERTY_ISSUEMETHOD_NAME);
            }
            /** 设置-领料方式 */
            set issueMethod(value: emIssueMethod) {
                this.setProperty(Material.PROPERTY_ISSUEMETHOD_NAME, value);
            }

            /** 映射的属性名称-计划方式 */
            static PROPERTY_PLANNINGMETHOD_NAME: string = "PlanningMethod";
            /** 获取-计划方式 */
            get planningMethod(): emPlanningMethod {
                return this.getProperty<emPlanningMethod>(Material.PROPERTY_PLANNINGMETHOD_NAME);
            }
            /** 设置-计划方式 */
            set planningMethod(value: emPlanningMethod) {
                this.setProperty(Material.PROPERTY_PLANNINGMETHOD_NAME, value);
            }

            /** 映射的属性名称-齐套检查 */
            static PROPERTY_CHECKCOMPLETENESS_NAME: string = "CheckCompleteness";
            /** 获取-齐套检查 */
            get checkCompleteness(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_CHECKCOMPLETENESS_NAME);
            }
            /** 设置-齐套检查 */
            set checkCompleteness(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_CHECKCOMPLETENESS_NAME, value);
            }

            /** 映射的属性名称-批次混用 */
            static PROPERTY_MIXINGBATCHES_NAME: string = "MixingBatches";
            /** 获取-批次混用 */
            get mixingBatches(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_MIXINGBATCHES_NAME);
            }
            /** 设置-批次混用 */
            set mixingBatches(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_MIXINGBATCHES_NAME, value);
            }

            /** 映射的属性名称-订单生产 */
            static PROPERTY_MADETOORDER_NAME: string = "MadeToOrder";
            /** 获取-订单生产 */
            get madeToOrder(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_MADETOORDER_NAME);
            }
            /** 设置-订单生产 */
            set madeToOrder(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_MADETOORDER_NAME, value);
            }

            /** 映射的属性名称-图号 */
            static PROPERTY_DARWINGNUMBER_NAME: string = "DarwingNumber";
            /** 获取-图号 */
            get darwingNumber(): string {
                return this.getProperty<string>(Material.PROPERTY_DARWINGNUMBER_NAME);
            }
            /** 设置-图号 */
            set darwingNumber(value: string) {
                this.setProperty(Material.PROPERTY_DARWINGNUMBER_NAME, value);
            }

            /** 映射的属性名称-匹配码 */
            static PROPERTY_MATCHCODE_NAME: string = "MatchCode";
            /** 获取-匹配码 */
            get matchCode(): string {
                return this.getProperty<string>(Material.PROPERTY_MATCHCODE_NAME);
            }
            /** 设置-匹配码 */
            set matchCode(value: string) {
                this.setProperty(Material.PROPERTY_MATCHCODE_NAME, value);
            }

            /** 映射的属性名称-生产批量 */
            static PROPERTY_LOTSIZE_NAME: string = "LotSize";
            /** 获取-生产批量 */
            get lotSize(): number {
                return this.getProperty<number>(Material.PROPERTY_LOTSIZE_NAME);
            }
            /** 设置-生产批量 */
            set lotSize(value: number) {
                this.setProperty(Material.PROPERTY_LOTSIZE_NAME, value);
            }

            /** 映射的属性名称-损耗率 */
            static PROPERTY_SCRAP_NAME: string = "Scrap";
            /** 获取-损耗率 */
            get scrap(): string {
                return this.getProperty<string>(Material.PROPERTY_SCRAP_NAME);
            }
            /** 设置-损耗率 */
            set scrap(value: string) {
                this.setProperty(Material.PROPERTY_SCRAP_NAME, value);
            }

            /** 映射的属性名称-变动损耗 */
            static PROPERTY_SCRAPRATE_NAME: string = "ScrapRate";
            /** 获取-变动损耗 */
            get scrapRate(): number {
                return this.getProperty<number>(Material.PROPERTY_SCRAPRATE_NAME);
            }
            /** 设置-变动损耗 */
            set scrapRate(value: number) {
                this.setProperty(Material.PROPERTY_SCRAPRATE_NAME, value);
            }

            /** 映射的属性名称-固定损耗 */
            static PROPERTY_SCRAPVALUE_NAME: string = "ScrapValue";
            /** 获取-固定损耗 */
            get scrapValue(): number {
                return this.getProperty<number>(Material.PROPERTY_SCRAPVALUE_NAME);
            }
            /** 设置-固定损耗 */
            set scrapValue(value: number) {
                this.setProperty(Material.PROPERTY_SCRAPVALUE_NAME, value);
            }

            /** 映射的属性名称-计划员 */
            static PROPERTY_SCHEDULER_NAME: string = "Scheduler";
            /** 获取-计划员 */
            get scheduler(): string {
                return this.getProperty<string>(Material.PROPERTY_SCHEDULER_NAME);
            }
            /** 设置-计划员 */
            set scheduler(value: string) {
                this.setProperty(Material.PROPERTY_SCHEDULER_NAME, value);
            }

            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
            /** 获取-生效日期 */
            get validDate(): Date {
                return this.getProperty<Date>(Material.PROPERTY_VALIDDATE_NAME);
            }
            /** 设置-生效日期 */
            set validDate(value: Date) {
                this.setProperty(Material.PROPERTY_VALIDDATE_NAME, value);
            }

            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
            /** 获取-失效日期 */
            get invalidDate(): Date {
                return this.getProperty<Date>(Material.PROPERTY_INVALIDDATE_NAME);
            }
            /** 设置-失效日期 */
            set invalidDate(value: Date) {
                this.setProperty(Material.PROPERTY_INVALIDDATE_NAME, value);
            }

            /** 映射的属性名称-图片 */
            static PROPERTY_PICTURE_NAME: string = "Picture";
            /** 获取-图片 */
            get picture(): string {
                return this.getProperty<string>(Material.PROPERTY_PICTURE_NAME);
            }
            /** 设置-图片 */
            set picture(value: string) {
                this.setProperty(Material.PROPERTY_PICTURE_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(Material.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(Material.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string = "Referenced";
            /** 获取-已引用 */
            get referenced(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_REFERENCED_NAME);
            }
            /** 设置-已引用 */
            set referenced(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_REFERENCED_NAME, value);
            }

            /** 映射的属性名称-已删除 */
            static PROPERTY_DELETED_NAME: string = "Deleted";
            /** 获取-已删除 */
            get deleted(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Material.PROPERTY_DELETED_NAME);
            }
            /** 设置-已删除 */
            set deleted(value: ibas.emYesNo) {
                this.setProperty(Material.PROPERTY_DELETED_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
            /** 获取-对象编号 */
            get docEntry(): number {
                return this.getProperty<number>(Material.PROPERTY_DOCENTRY_NAME);
            }
            /** 设置-对象编号 */
            set docEntry(value: number) {
                this.setProperty(Material.PROPERTY_DOCENTRY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(Material.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(Material.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(Material.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(Material.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(Material.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(Material.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(Material.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(Material.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(Material.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(Material.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(Material.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(Material.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(Material.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(Material.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(Material.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(Material.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(Material.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(Material.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(Material.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(Material.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(Material.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(Material.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(Material.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(Material.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
            /** 获取-审批状态 */
            get approvalStatus(): ibas.emApprovalStatus {
                return this.getProperty<ibas.emApprovalStatus>(Material.PROPERTY_APPROVALSTATUS_NAME);
            }
            /** 设置-审批状态 */
            set approvalStatus(value: ibas.emApprovalStatus) {
                this.setProperty(Material.PROPERTY_APPROVALSTATUS_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(Material.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(Material.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(Material.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(Material.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(Material.BUSINESS_OBJECT_CODE);
                this.activated = ibas.emYesNo.YES;
                this.itemType = emItemType.ITEM;
                this.inventoryItem = ibas.emYesNo.YES;
                this.purchaseItem = ibas.emYesNo.YES;
                this.salesItem = ibas.emYesNo.YES;
                this.manageByWarehouse = ibas.emYesNo.YES;
                this.valuationMethod = bo.emValuationMethod.MOVING_AVERAGE;
            }
            /** 重置 */
            reset(): void {
                super.reset();
                this.onCommited = 0;
                this.onHand = 0;
                this.onOrdered = 0;
            }
            /** 可用量（库存 + 已订购 - 已承诺） */
            onAvailable(): number {
                return ibas.numbers.round(
                    ibas.numbers.valueOf(this.onHand)
                    + ibas.numbers.valueOf(this.onOrdered)
                    - ibas.numbers.valueOf(this.onCommited)
                );
            }
        }

        /** 物料数量 */
        export class MaterialQuantity extends ibas.BusinessObject<MaterialQuantity> implements IMaterialQuantity {
            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(MaterialQuantity.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(MaterialQuantity.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-物料名称 */
            static PROPERTY_ITEMNAME_NAME: string = "ItemName";
            /** 获取-物料名称 */
            get itemName(): string {
                return this.getProperty<string>(MaterialQuantity.PROPERTY_ITEMNAME_NAME);
            }
            /** 设置-物料名称 */
            set itemName(value: string) {
                this.setProperty(MaterialQuantity.PROPERTY_ITEMNAME_NAME, value);
            }

            /** 映射的属性名称-库存 */
            static PROPERTY_ONHAND_NAME: string = "OnHand";
            /** 获取-库存 */
            get onHand(): number {
                return this.getProperty<number>(MaterialQuantity.PROPERTY_ONHAND_NAME);
            }
            /** 设置-库存 */
            set onHand(value: number) {
                this.setProperty(MaterialQuantity.PROPERTY_ONHAND_NAME, value);
            }

            /** 映射的属性名称-库存 */
            static PROPERTY_ONORDERED_NAME: string = "OnOrdered";
            /** 获取-库存 */
            get onOrdered(): number {
                return this.getProperty<number>(MaterialQuantity.PROPERTY_ONORDERED_NAME);
            }
            /** 设置-库存 */
            set onOrdered(value: number) {
                this.setProperty(MaterialQuantity.PROPERTY_ONORDERED_NAME, value);
            }

            /** 映射的属性名称-库存 */
            static PROPERTY_ONCOMMITED_NAME: string = "OnCommited";
            /** 获取-库存 */
            get onCommited(): number {
                return this.getProperty<number>(MaterialQuantity.PROPERTY_ONCOMMITED_NAME);
            }
            /** 设置-库存 */
            set onCommited(value: number) {
                this.setProperty(MaterialQuantity.PROPERTY_ONCOMMITED_NAME, value);
            }

            /** 映射的属性名称-已预留 */
            static PROPERTY_ONRESERVED_NAME: string = "OnReserved";
            /** 获取-已预留 */
            get onReserved(): number {
                return this.getProperty<number>(MaterialQuantity.PROPERTY_ONRESERVED_NAME);
            }
            /** 设置-已预留 */
            set onReserved(value: number) {
                this.setProperty(MaterialQuantity.PROPERTY_ONRESERVED_NAME, value);
            }

            /** 映射的属性名称-计量单位 */
            static PROPERTY_UOM_NAME: string = "UOM";
            /** 获取-计量单位 */
            get uom(): string {
                return this.getProperty<string>(MaterialQuantity.PROPERTY_UOM_NAME);
            }
            /** 设置-计量单位 */
            set uom(value: string) {
                this.setProperty(MaterialQuantity.PROPERTY_UOM_NAME, value);
            }

            /** 字符串 */
            toString(): string {
                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                builder.append("{");
                builder.append("[");
                builder.append(MaterialQuantity.name);
                builder.append("].");
                builder.append("[");
                builder.append(MaterialQuantity.PROPERTY_ITEMCODE_NAME);
                builder.append(" ");
                builder.append("=");
                builder.append(" ");
                builder.append(this.itemCode);
                builder.append("]");
                builder.append("&");
                builder.append("[");
                builder.append(MaterialQuantity.PROPERTY_ONHAND_NAME);
                builder.append(" ");
                builder.append("=");
                builder.append(" ");
                builder.append(this.onHand);
                builder.append(" ");
                builder.append(this.uom);
                builder.append("]");
                builder.append("}");
                return builder.toString();
            }
            /** 获取查询 */
            criteria(): ibas.ICriteria {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = MaterialPrice.PROPERTY_ITEMCODE_NAME;
                condition.value = this.itemCode;
                return criteria;
            }
            /** 初始化数据 */
            protected init(): void {
                //
            }

            /** 可用量（库存 + 已订购 - 已承诺） */
            onAvailable(): number {
                return ibas.numbers.valueOf(this.onHand)
                    + ibas.numbers.valueOf(this.onOrdered)
                    - ibas.numbers.valueOf(this.onCommited);
            }

        }
        /** 物料价格 */
        export class MaterialPrice extends ibas.BusinessObject<MaterialPrice> implements IMaterialPrice {
            /** 映射的属性名称-数据源 */
            static PROPERTY_SOURCE_NAME: string = "Source";
            /** 获取-数据源 */
            get source(): string {
                return this.getProperty<string>(MaterialPrice.PROPERTY_SOURCE_NAME);
            }
            /** 设置-数据源 */
            set source(value: string) {
                this.setProperty(MaterialPrice.PROPERTY_SOURCE_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(MaterialPrice.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(MaterialPrice.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-物料名称 */
            static PROPERTY_ITEMNAME_NAME: string = "ItemName";
            /** 获取-物料名称 */
            get itemName(): string {
                return this.getProperty<string>(MaterialPrice.PROPERTY_ITEMNAME_NAME);
            }
            /** 设置-物料名称 */
            set itemName(value: string) {
                this.setProperty(MaterialPrice.PROPERTY_ITEMNAME_NAME, value);
            }

            /** 映射的属性名称-物料标识 */
            static PROPERTY_ITEMSIGN_NAME: string = "ItemSign";
            /** 获取-物料标识 */
            get itemSign(): string {
                return this.getProperty<string>(MaterialPrice.PROPERTY_ITEMSIGN_NAME);
            }
            /** 设置-物料标识 */
            set itemSign(value: string) {
                this.setProperty(MaterialPrice.PROPERTY_ITEMSIGN_NAME, value);
            }

            /** 映射的属性名称-单位 */
            static PROPERTY_UOM_NAME: string = "UOM";
            /** 获取-单位 */
            get uom(): string {
                return this.getProperty<string>(MaterialPrice.PROPERTY_UOM_NAME);
            }
            /** 设置-单位 */
            set uom(value: string) {
                this.setProperty(MaterialPrice.PROPERTY_UOM_NAME, value);
            }

            /** 映射的属性名称-价格 */
            static PROPERTY_PRICE_NAME: string = "Price";
            /** 获取-价格 */
            get price(): number {
                return this.getProperty<number>(MaterialPrice.PROPERTY_PRICE_NAME);
            }
            /** 设置-价格 */
            set price(value: number) {
                this.setProperty(MaterialPrice.PROPERTY_PRICE_NAME, value);
            }

            /** 映射的属性名称-货币 */
            static PROPERTY_CURRENCY_NAME: string = "Currency";
            /** 获取-货币 */
            get currency(): string {
                return this.getProperty<string>(MaterialPrice.PROPERTY_CURRENCY_NAME);
            }
            /** 设置-货币 */
            set currency(value: string) {
                this.setProperty(MaterialPrice.PROPERTY_CURRENCY_NAME, value);
            }
            /** 映射的属性名称-含税 */
            static PROPERTY_TAXED_NAME: string = "Taxed";
            /** 获取-含税 */
            get taxed(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(MaterialPriceList.PROPERTY_TAXED_NAME);
            }
            /** 设置-含税 */
            set taxed(value: ibas.emYesNo) {
                this.setProperty(MaterialPriceList.PROPERTY_TAXED_NAME, value);
            }

            /** 字符串 */
            toString(): string {
                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                builder.append("{");
                builder.append("[");
                builder.append(MaterialPrice.name);
                builder.append("].");
                builder.append("[");
                builder.append(MaterialPrice.PROPERTY_ITEMCODE_NAME);
                builder.append(" ");
                builder.append("=");
                builder.append(" ");
                builder.append(this.itemCode);
                builder.append("]");
                builder.append("&");
                builder.append("[");
                builder.append(MaterialPrice.PROPERTY_PRICE_NAME);
                builder.append(" ");
                builder.append("=");
                builder.append(" ");
                builder.append(this.price);
                builder.append(" ");
                builder.append(this.currency);
                builder.append("]");
                builder.append("}");
                return builder.toString();
            }
            /** 获取查询 */
            criteria(): ibas.ICriteria {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = MaterialPrice.PROPERTY_ITEMCODE_NAME;
                condition.value = this.itemCode;
                return criteria;
            }
            /** 初始化数据 */
            protected init(): void {
                //
            }
            markOld(): void {
                super.markOld();
                if (this.isLoading === false) {
                    (<any>ibas.Bindable.prototype).firePropertyChanged.call(this, "isDirty");
                }
            }
        }
    }
}