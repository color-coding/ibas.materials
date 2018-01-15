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
} from "ibas/index";
import {
    IProduct,
    BO_CODE_PRODUCT,
    emItemType,
} from "../../api/index";
export class Product extends BOMasterData<Product> implements IProduct {

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
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(Product.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活 */
    set activated(value: emYesNo) {
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

    /** 映射的属性名称-库存物料 */
    static PROPERTY_INVENTORYITEM_NAME: string = "InventoryItem";
    /** 获取-库存物料 */
    get inventoryItem(): emYesNo {
        return this.getProperty<emYesNo>(Product.PROPERTY_INVENTORYITEM_NAME);
    }
    /** 设置-库存物料 */
    set inventoryItem(value: emYesNo) {
        this.setProperty(Product.PROPERTY_INVENTORYITEM_NAME, value);
    }

    /** 映射的属性名称-虚拟物料 */
    static PROPERTY_PHANTOMITEM_NAME: string = "PhantomItem";
    /** 获取-虚拟物料 */
    get phantomItem(): emYesNo {
        return this.getProperty<emYesNo>(Product.PROPERTY_PHANTOMITEM_NAME);
    }
    /** 设置-虚拟物料 */
    set phantomItem(value: emYesNo) {
        this.setProperty(Product.PROPERTY_PHANTOMITEM_NAME, value);
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

    /** 映射的属性名称-币种 */
    static PROPERTY_CURRENCY_NAME: string = "Currency";
    /** 获取-币种 */
    get currency(): string {
        return this.getProperty<string>(Product.PROPERTY_CURRENCY_NAME);
    }
    /** 设置-币种 */
    set currency(value: string) {
        this.setProperty(Product.PROPERTY_CURRENCY_NAME, value);
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

    /** 映射的属性名称-最低库存量 */
    static PROPERTY_MINIMUMINVENTORY_NAME: string = "MinimumInventory";
    /** 获取-最低库存量 */
    get minimumInventory(): number {
        return this.getProperty<number>(Product.PROPERTY_MINIMUMINVENTORY_NAME);
    }
    /** 设置-最低库存量 */
    set minimumInventory(value: number) {
        this.setProperty(Product.PROPERTY_MINIMUMINVENTORY_NAME, value);
    }

    /** 映射的属性名称-序号管理 */
    static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
    /** 获取-序号管理 */
    get serialManagement(): emYesNo {
        return this.getProperty<emYesNo>(Product.PROPERTY_SERIALMANAGEMENT_NAME);
    }
    /** 设置-序号管理 */
    set serialManagement(value: emYesNo) {
        this.setProperty(Product.PROPERTY_SERIALMANAGEMENT_NAME, value);
    }

    /** 映射的属性名称-批号管理 */
    static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
    /** 获取-批号管理 */
    get batchManagement(): emYesNo {
        return this.getProperty<emYesNo>(Product.PROPERTY_BATCHMANAGEMENT_NAME);
    }
    /** 设置-批号管理 */
    set batchManagement(value: emYesNo) {
        this.setProperty(Product.PROPERTY_BATCHMANAGEMENT_NAME, value);
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

    /** 映射的属性名称-备注 */
    static PROPERTY_REMARKS_NAME: string = "Remarks";
    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(Product.PROPERTY_REMARKS_NAME);
    }
    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(Product.PROPERTY_REMARKS_NAME, value);
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
        this.objectCode = config.applyVariables(Product.BUSINESS_OBJECT_CODE);
        this.activated = emYesNo.YES;
        this.itemType = emItemType.ITEM;
        this.inventoryItem = emYesNo.YES;
    }
}