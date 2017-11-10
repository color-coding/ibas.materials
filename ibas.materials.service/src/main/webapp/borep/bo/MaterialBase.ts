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
    IMaterialBase,
    BO_CODE_MATERIAL,
    emItemType,
} from "../../api/index";
export  abstract class MaterialBase<T extends IMaterialBase> extends BOMasterData<T> implements IMaterialBase {
    protected init(): void {
        // this.objectCode = config.applyVariables(MaterialBase.BUSINESS_OBJECT_CODE);
    }
    /** 业务对象编码 */
    // static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIAL;
    /** 构造函数 */
    constructor() {
        super();
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(MaterialBase.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-编号 */
    static PROPERTY_CODE_NAME: string = "Code";
    /** 获取-编号 */
    get code(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_CODE_NAME);
    }
    /** 设置-编号 */
    set code(value: string) {
        this.setProperty(MaterialBase.PROPERTY_CODE_NAME, value);
    }

    /** 映射的属性名称-名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-名称 */
    get name(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_NAME_NAME);
    }
    /** 设置-名称 */
    set name(value: string) {
        this.setProperty(MaterialBase.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-外文名称 */
    static PROPERTY_FOREIGNNAME_NAME: string = "ForeignName";
    /** 获取-外文名称 */
    get foreignName(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_FOREIGNNAME_NAME);
    }
    /** 设置-外文名称 */
    set foreignName(value: string) {
        this.setProperty(MaterialBase.PROPERTY_FOREIGNNAME_NAME, value);
    }

    /** 映射的属性名称-物料组 */
    static PROPERTY_GROUP_NAME: string = "Group";
    /** 获取-物料组 */
    get group(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_GROUP_NAME);
    }
    /** 设置-物料组 */
    set group(value: string) {
        this.setProperty(MaterialBase.PROPERTY_GROUP_NAME, value);
    }

    /** 映射的属性名称-条形码 */
    static PROPERTY_BARCODE_NAME: string = "BarCode";
    /** 获取-条形码 */
    get barCode(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_BARCODE_NAME);
    }
    /** 设置-条形码 */
    set barCode(value: string) {
        this.setProperty(MaterialBase.PROPERTY_BARCODE_NAME, value);
    }

    /** 映射的属性名称-物料类型 */
    static PROPERTY_ITEMTYPE_NAME: string = "ItemType";
    /** 获取-物料类型 */
    get itemType(): emItemType {
        return this.getProperty<emItemType>(MaterialBase.PROPERTY_ITEMTYPE_NAME);
    }
    /** 设置-物料类型 */
    set itemType(value: emItemType) {
        this.setProperty(MaterialBase.PROPERTY_ITEMTYPE_NAME, value);
    }

    /** 映射的属性名称-采购物料 */
    static PROPERTY_PURCHASEITEM_NAME: string = "PurchaseItem";
    /** 获取-采购物料 */
    get purchaseItem(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_PURCHASEITEM_NAME);
    }
    /** 设置-采购物料 */
    set purchaseItem(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_PURCHASEITEM_NAME, value);
    }

    /** 映射的属性名称-销售物料 */
    static PROPERTY_SALESITEM_NAME: string = "SalesItem";
    /** 获取-销售物料 */
    get salesItem(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_SALESITEM_NAME);
    }
    /** 设置-销售物料 */
    set salesItem(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_SALESITEM_NAME, value);
    }

    /** 映射的属性名称-库存物料 */
    static PROPERTY_INVENTORYITEM_NAME: string = "InventoryItem";
    /** 获取-库存物料 */
    get inventoryItem(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_INVENTORYITEM_NAME);
    }
    /** 设置-库存物料 */
    set inventoryItem(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_INVENTORYITEM_NAME, value);
    }

    /** 映射的属性名称-虚拟物料 */
    static PROPERTY_PHANTOMITEM_NAME: string = "PhantomItem";
    /** 获取-虚拟物料 */
    get phantomItem(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_PHANTOMITEM_NAME);
    }
    /** 设置-虚拟物料 */
    set phantomItem(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_PHANTOMITEM_NAME, value);
    }

    /** 映射的属性名称-固定资产 */
    static PROPERTY_FIXEDASSETS_NAME: string = "FixedAssets";
    /** 获取-固定资产 */
    get fixedAssets(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_FIXEDASSETS_NAME);
    }
    /** 设置-固定资产 */
    set fixedAssets(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_FIXEDASSETS_NAME, value);
    }

    /** 映射的属性名称-缺省仓库 */
    static PROPERTY_DEFAULTWAREHOUSE_NAME: string = "DefaultWarehouse";
    /** 获取-缺省仓库 */
    get defaultWarehouse(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_DEFAULTWAREHOUSE_NAME);
    }
    /** 设置-缺省仓库 */
    set defaultWarehouse(value: string) {
        this.setProperty(MaterialBase.PROPERTY_DEFAULTWAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-首选供应商 */
    static PROPERTY_PREFERREDVENDOR_NAME: string = "PreferredVendor";
    /** 获取-首选供应商 */
    get preferredVendor(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_PREFERREDVENDOR_NAME);
    }
    /** 设置-首选供应商 */
    set preferredVendor(value: string) {
        this.setProperty(MaterialBase.PROPERTY_PREFERREDVENDOR_NAME, value);
    }

    /** 映射的属性名称-库存单位 */
    static PROPERTY_INVENTORYUOM_NAME: string = "InventoryUOM";
    /** 获取-库存单位 */
    get inventoryUOM(): string {
        return this.getProperty<string>(MaterialBase.PROPERTY_INVENTORYUOM_NAME);
    }
    /** 设置-库存单位 */
    set inventoryUOM(value: string) {
        this.setProperty(MaterialBase.PROPERTY_INVENTORYUOM_NAME, value);
    }
    /** 映射的属性名称-序号管理 */
    static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
    /** 获取-序号管理 */
    get serialManagement(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_SERIALMANAGEMENT_NAME);
    }
    /** 设置-序号管理 */
    set serialManagement(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_SERIALMANAGEMENT_NAME, value);
    }

    /** 映射的属性名称-批号管理 */
    static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
    /** 获取-批号管理 */
    get batchManagement(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_BATCHMANAGEMENT_NAME);
    }
    /** 设置-批号管理 */
    set batchManagement(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_BATCHMANAGEMENT_NAME, value);
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-对象编号 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialBase.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-对象编号 */
    set docEntry(value: number) {
        this.setProperty(MaterialBase.PROPERTY_DOCENTRY_NAME, value);
    }
    /** 映射的属性名称-已删除 */
    static PROPERTY_DELETED_NAME: string = "Deleted";
    /** 获取-已删除 */
    get deleted(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_DELETED_NAME);
    }
    /** 设置-已删除 */
    set deleted(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_DELETED_NAME, value);
    }
    /** 映射的属性名称-激活 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-激活 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBase.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活 */
    set activated(value: emYesNo) {
        this.setProperty(MaterialBase.PROPERTY_ACTIVATED_NAME, value);
    }
}