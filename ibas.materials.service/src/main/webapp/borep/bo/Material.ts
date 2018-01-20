/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
    StringBuilder,
    ICriteria,
    Criteria,
    ICondition,
} from "ibas/index";
import {
    IMaterial,
    BO_CODE_MATERIAL,
    emItemType,
    IMaterialPrice,
    IMaterialQuantity,
} from "../../api/index";

/** 物料 */
export class Material extends BOMasterData<Material> implements IMaterial {

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
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活 */
    set activated(value: emYesNo) {
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
    get purchaseItem(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_PURCHASEITEM_NAME);
    }
    /** 设置-采购物料 */
    set purchaseItem(value: emYesNo) {
        this.setProperty(Material.PROPERTY_PURCHASEITEM_NAME, value);
    }

    /** 映射的属性名称-销售物料 */
    static PROPERTY_SALESITEM_NAME: string = "SalesItem";
    /** 获取-销售物料 */
    get salesItem(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_SALESITEM_NAME);
    }
    /** 设置-销售物料 */
    set salesItem(value: emYesNo) {
        this.setProperty(Material.PROPERTY_SALESITEM_NAME, value);
    }

    /** 映射的属性名称-库存物料 */
    static PROPERTY_INVENTORYITEM_NAME: string = "InventoryItem";
    /** 获取-库存物料 */
    get inventoryItem(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_INVENTORYITEM_NAME);
    }
    /** 设置-库存物料 */
    set inventoryItem(value: emYesNo) {
        this.setProperty(Material.PROPERTY_INVENTORYITEM_NAME, value);
    }

    /** 映射的属性名称-虚拟物料 */
    static PROPERTY_PHANTOMITEM_NAME: string = "PhantomItem";
    /** 获取-虚拟物料 */
    get phantomItem(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_PHANTOMITEM_NAME);
    }
    /** 设置-虚拟物料 */
    set phantomItem(value: emYesNo) {
        this.setProperty(Material.PROPERTY_PHANTOMITEM_NAME, value);
    }

    /** 映射的属性名称-固定资产 */
    static PROPERTY_FIXEDASSETS_NAME: string = "FixedAssets";
    /** 获取-固定资产 */
    get fixedAssets(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_FIXEDASSETS_NAME);
    }
    /** 设置-固定资产 */
    set fixedAssets(value: emYesNo) {
        this.setProperty(Material.PROPERTY_FIXEDASSETS_NAME, value);
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

    /** 映射的属性名称-序号管理 */
    static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
    /** 获取-序号管理 */
    get serialManagement(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_SERIALMANAGEMENT_NAME);
    }
    /** 设置-序号管理 */
    set serialManagement(value: emYesNo) {
        this.setProperty(Material.PROPERTY_SERIALMANAGEMENT_NAME, value);
    }

    /** 映射的属性名称-批号管理 */
    static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
    /** 获取-批号管理 */
    get batchManagement(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_BATCHMANAGEMENT_NAME);
    }
    /** 设置-批号管理 */
    set batchManagement(value: emYesNo) {
        this.setProperty(Material.PROPERTY_BATCHMANAGEMENT_NAME, value);
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
    get referenced(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_REFERENCED_NAME);
    }
    /** 设置-已引用 */
    set referenced(value: emYesNo) {
        this.setProperty(Material.PROPERTY_REFERENCED_NAME, value);
    }

    /** 映射的属性名称-已删除 */
    static PROPERTY_DELETED_NAME: string = "Deleted";
    /** 获取-已删除 */
    get deleted(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_DELETED_NAME);
    }
    /** 设置-已删除 */
    set deleted(value: emYesNo) {
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
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(Material.PROPERTY_APPROVALSTATUS_NAME);
    }
    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
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
        this.objectCode = config.applyVariables(Material.BUSINESS_OBJECT_CODE);
        this.activated = emYesNo.YES;
        this.itemType = emItemType.ITEM;
        this.inventoryItem = emYesNo.YES;
        this.purchaseItem = emYesNo.YES;
        this.salesItem = emYesNo.YES;
    }
}


/** 物料数量 */
export class MaterialQuantity extends BusinessObject<MaterialQuantity> implements IMaterialQuantity {

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialQuantity.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
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
        let builder: StringBuilder = new StringBuilder();
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
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = MaterialPrice.PROPERTY_ITEMCODE_NAME;
        condition.value = this.itemCode;
        return criteria;
    }
    /** 初始化数据 */
    protected init(): void {
    }


}
/** 物料价格 */
export class MaterialPrice extends BusinessObject<MaterialPrice> implements IMaterialPrice {

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

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialPrice.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
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

    /** 字符串 */
    toString(): string {
        let builder: StringBuilder = new StringBuilder();
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
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = MaterialPrice.PROPERTY_ITEMCODE_NAME;
        condition.value = this.itemCode;
        return criteria;
    }
    /** 初始化数据 */
    protected init(): void {
    }

}
