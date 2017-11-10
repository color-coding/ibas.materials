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
    emDirection,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    strings,
    config,
    objects,
} from "ibas/index";
import {
    IMaterialBatchSerialInOutData,
    IMaterialBatchSerialInOutDatas,
    IMaterialBatchSerialServiceData,
    IMaterialBatchSerialInOutDataBatchJournals,
    IMaterialBatchSerialInOutDataSerialJournals,
    BO_CODE_MATERIALBATCH,
    BO_CODE_RECEIPT_MATERIALBATCH,
    BO_CODE_ISSUE_MATERIALBATCH
} from "../../api/index";
import {
    MaterialBatchJournal,
    MaterialSerialJournal
} from "./index";

export class MaterialBatchSerialServiceData extends BOSimple<MaterialBatchSerialServiceData> implements IMaterialBatchSerialServiceData {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCH;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(MaterialBatchSerialServiceData.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(MaterialBatchSerialServiceData.PROPERTY_OBJECTKEY_NAME, value);
    }
    /** 映射的属性名称-行-集合 */
    static PROPERTY_MATERIALBATCHSERIALINOUTDATAS_NAME: string = "MaterialBatchSerialInOutDatas";
    /** 获取-行-序列号集合 */
    get materialBatchSerialInOutDatas(): MaterialBatchSerialInOutDatas {
        return this.getProperty<MaterialBatchSerialInOutDatas>
            (MaterialBatchSerialServiceData.PROPERTY_MATERIALBATCHSERIALINOUTDATAS_NAME);
    }
    /** 设置-行-集合 */
    set materialBatchSerialInOutDatas(value: MaterialBatchSerialInOutDatas) {
        this.setProperty(MaterialBatchSerialServiceData.PROPERTY_MATERIALBATCHSERIALINOUTDATAS_NAME, value);
    }
    protected init(): void {
        this.materialBatchSerialInOutDatas = new MaterialBatchSerialInOutDatas(this);
    }
}

export class MaterialBatchSerialInOutData extends BOSimpleLine<MaterialBatchSerialInOutData> implements IMaterialBatchSerialInOutData {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCH;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    /** 构造函数 */
    constructor() {
        super();
    }

    /** 映射的属性名称-行索引 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-行索引 */
    get index(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_INDEX_NAME);
    }
    /** 设置-行索引 */
    set index(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_INDEX_NAME, value);
    }

    /** 映射的属性名称-行 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行索引 */
    get lineId(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_LINEID_NAME);
    }
    /** 设置-行索引 */
    set lineId(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialBatchSerialInOutData.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialBatchSerialInOutData.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialBatchSerialInOutData.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDBATCHQUANTITY_NAME: string = "NeedBatchQuantity";
    /** 获取-总需求 */
    get needBatchQuantity(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_NEEDBATCHQUANTITY_NAME);
    }
    /** 设置-批次总需求 */
    set needBatchQuantity(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_NEEDBATCHQUANTITY_NAME, value);
    }

    /** 映射的属性名称-批次总批次 */
    static PROPERTY_SELECTEDBATCHQUANTITY_NAME: string = "SelectedBatchQuantity";
    /** 获取-批次总批次 */
    get selectedBatchQuantity(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_SELECTEDBATCHQUANTITY_NAME);
    }
    /** 设置-总批次 */
    set selectedBatchQuantity(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_SELECTEDBATCHQUANTITY_NAME, value);
    }
    /** 映射的属性名称-总序列号需求 */
    static PROPERTY_NEEDSERIALQUANTITY_NAME: string = "NeedSerialQuantity";
    /** 获取-总需求 */
    get needSerialQuantity(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_NEEDSERIALQUANTITY_NAME);
    }
    /** 设置-序列号总需求 */
    set needSerialQuantity(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_NEEDSERIALQUANTITY_NAME, value);
    }

    /** 映射的属性名称-总序列 */
    static PROPERTY_SELECTEDSERIALQUANTITY_NAME: string = "SelectedSerialQuantity";
    /** 获取-总序列 */
    get selectedSerialQuantity(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_SELECTEDSERIALQUANTITY_NAME);
    }
    /** 设置-总序列 */
    set selectedSerialQuantity(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_SELECTEDSERIALQUANTITY_NAME, value);
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(MaterialBatchSerialInOutData.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-库存发货-行-序列号集合 */
    static PROPERTY_MATERIALBATCHINPUTBATCHJOURNALS_NAME: string = "MaterialBatchSerialInOutDataBatchJournals";
    /** 获取-库存发货-行-序列号集合 */
    get materialBatchSerialInOutDataBatchJournals(): MaterialBatchSerialInOutDataBatchJournals {
        return this.getProperty<MaterialBatchSerialInOutDataBatchJournals>
            (MaterialBatchSerialInOutData.PROPERTY_MATERIALBATCHINPUTBATCHJOURNALS_NAME);
    }
    /** 设置-库存发货-行-序列号集合 */
    set materialBatchSerialInOutDataBatchJournals(value: MaterialBatchSerialInOutDataBatchJournals) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_MATERIALBATCHINPUTBATCHJOURNALS_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHINPUTSERIALJOURNALS_NAME: string = "MaterialBatchSerialInOutDataSerialJournals";
    /** 获取-行-序列号集合 */
    get materialBatchSerialInOutDataSerialJournals(): MaterialBatchSerialInOutDataSerialJournals {
        return this.getProperty<MaterialBatchSerialInOutDataSerialJournals>
            (MaterialBatchSerialInOutData.PROPERTY_MATERIALBATCHINPUTSERIALJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialBatchSerialInOutDataSerialJournals(value: MaterialBatchSerialInOutDataSerialJournals) {
        this.setProperty(MaterialBatchSerialInOutData.PROPERTY_MATERIALBATCHINPUTSERIALJOURNALS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.materialBatchSerialInOutDataBatchJournals = new MaterialBatchSerialInOutDataBatchJournals(this);
        this.materialBatchSerialInOutDataSerialJournals = new MaterialBatchSerialInOutDataSerialJournals(this);
    }
}

export class MaterialBatchSerialInOutDatas extends BusinessObjects<MaterialBatchSerialInOutData, MaterialBatchSerialServiceData>
    implements IMaterialBatchSerialInOutDatas {
    create(): MaterialBatchSerialInOutData {
        let item: MaterialBatchSerialInOutData = new MaterialBatchSerialInOutData();
        this.add(item);
        return item;
    }

}

/** 批次日记账 集合 */
export class MaterialBatchSerialInOutDataBatchJournals extends BusinessObjects<MaterialBatchJournal, MaterialBatchSerialInOutData>
    implements IMaterialBatchSerialInOutDataBatchJournals {
    /** 创建并添加子项 */
    create(): MaterialBatchJournal {
        let item: MaterialBatchJournal = new MaterialBatchJournal();
        item.quantity = 0;
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        this.add(item);
        return item;
    }
    /** 创建并添加子项 */
    createBatchJournal(journal: MaterialBatchJournal): MaterialBatchJournal {
        let item: MaterialBatchJournal = new MaterialBatchJournal();
        item.quantity = 0;
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        this.add(item);
        return item;
    }
    /** 监听子项属性改变 */
    protected onChildPropertyChanged(item: MaterialBatchJournal, name: string): void {
        super.onChildPropertyChanged(item, name);
        if (strings.equalsIgnoreCase(name, MaterialBatchJournal.PROPERTY_QUANTITY_NAME)) {
            let totalQuantity: number = 0;
            for (let batchJournalLine of this.filterDeleted()) {
                if (objects.isNull(batchJournalLine.quantity)) {
                    batchJournalLine.quantity = 0;
                }
                totalQuantity = Number(totalQuantity) + Number(batchJournalLine.quantity);
            }
            this.parent.selectedBatchQuantity = totalQuantity;
            this.parent.needBatchQuantity = Number(this.parent.quantity) - Number(totalQuantity);
        }
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialBatchJournal): void {
        super.afterRemove(item);
        if (this.parent.materialBatchSerialInOutDataBatchJournals.length === 0) {
            this.parent.needBatchQuantity = this.parent.quantity;
            this.parent.selectedBatchQuantity = 0;
        } else {
            if (!isNaN(item.quantity)) {
                this.parent.selectedBatchQuantity = Number(this.parent.selectedBatchQuantity) - Number(item.quantity);
                this.parent.needBatchQuantity = Number(this.parent.needBatchQuantity) + Number(item.quantity);
            }
        }
    }
}
/** 序列日记账 集合 */
export class MaterialBatchSerialInOutDataSerialJournals extends BusinessObjects<MaterialSerialJournal, MaterialBatchSerialInOutData>
    implements IMaterialBatchSerialInOutDataSerialJournals {
    /** 创建并添加子项 */
    create(): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        this.add(item);
        return item;
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialSerialJournal): void {
        super.afterRemove(item);
        if (this.parent.materialBatchSerialInOutDataSerialJournals.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialBatchSerialInOutDataSerialJournals.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }

    protected afterAdd(item: MaterialSerialJournal): void {
        super.afterRemove(item);
        if (this.parent.materialBatchSerialInOutDataSerialJournals.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialBatchSerialInOutDataSerialJournals.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }
}