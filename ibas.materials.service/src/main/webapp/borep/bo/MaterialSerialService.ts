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
    BusinessObjectBase,
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
    IMaterialSerial,
    IMaterialSerialService,
    IMaterialSerialServiceJournals,
    IMaterialIssueSerialLine,
    IMaterialSerialJournal,
    IMaterialIssueSerialContractLine,
    BO_CODE_MATERIALSERIALSERVICE,
    BO_CODE_RECEIPT_MATERIALBATCH,
    BO_CODE_ISSUE_MATERIALBATCH
} from "../../api/index";
import {
    MaterialBatchJournal,
    MaterialSerialJournal
} from "./index";


export class MaterialSerialService extends BusinessObjectBase<MaterialSerialService> implements IMaterialSerialService {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSERIALSERVICE;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    /** 构造函数 */
    constructor() {
        super();
    }
    public static create(data: IMaterialIssueSerialContractLine): MaterialSerialService {
        let serialServiceData: MaterialSerialService = new MaterialSerialService();
        serialServiceData.index = data.index;
        serialServiceData.itemCode = data.itemCode;
        serialServiceData.warehouse = data.warehouse;
        serialServiceData.quantity = data.quantity;
        serialServiceData.needSerialQuantity = data.quantity;
        return serialServiceData;
    }
    /** 映射的属性名称-行索引 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-行索引 */
    get index(): number {
        return this.getProperty<number>(MaterialSerialService.PROPERTY_INDEX_NAME);
    }
    /** 设置-行索引 */
    set index(value: number) {
        this.setProperty(MaterialSerialService.PROPERTY_INDEX_NAME, value);
    }

    /** 映射的属性名称-行 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行索引 */
    get lineId(): number {
        return this.getProperty<number>(MaterialSerialService.PROPERTY_LINEID_NAME);
    }
    /** 设置-行索引 */
    set lineId(value: number) {
        this.setProperty(MaterialSerialService.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialSerialService.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialSerialService.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialSerialService.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialSerialService.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialSerialService.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialSerialService.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-总序列号需求 */
    static PROPERTY_NEEDSERIALQUANTITY_NAME: string = "NeedSerialQuantity";
    /** 获取-总需求 */
    get needSerialQuantity(): number {
        return this.getProperty<number>(MaterialSerialService.PROPERTY_NEEDSERIALQUANTITY_NAME);
    }
    /** 设置-序列号总需求 */
    set needSerialQuantity(value: number) {
        this.setProperty(MaterialSerialService.PROPERTY_NEEDSERIALQUANTITY_NAME, value);
    }

    /** 映射的属性名称-总序列 */
    static PROPERTY_SELECTEDSERIALQUANTITY_NAME: string = "SelectedSerialQuantity";
    /** 获取-总序列 */
    get selectedSerialQuantity(): number {
        return this.getProperty<number>(MaterialSerialService.PROPERTY_SELECTEDSERIALQUANTITY_NAME);
    }
    /** 设置-总序列 */
    set selectedSerialQuantity(value: number) {
        this.setProperty(MaterialSerialService.PROPERTY_SELECTEDSERIALQUANTITY_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialSerialService.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialSerialService.PROPERTY_QUANTITY_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALSERIALSERVICEJOURNALS_NAME: string = "MaterialSerialServiceJournals";
    /** 获取-行-序列号集合 */
    get materialSerialServiceJournals(): MaterialSerialServiceJournals {
        return this.getProperty<MaterialSerialServiceJournals>
            (MaterialSerialService.PROPERTY_MATERIALSERIALSERVICEJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialSerialServiceJournals(value: MaterialSerialServiceJournals) {
        this.setProperty(MaterialSerialService.PROPERTY_MATERIALSERIALSERVICEJOURNALS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.materialSerialServiceJournals = new MaterialSerialServiceJournals(this);
    }
}

/** 序列日记账 集合 */
export class MaterialSerialServiceJournals extends BusinessObjects<MaterialSerialJournal, MaterialSerialService>
    implements IMaterialSerialServiceJournals {
    /** 创建并添加子项 */
    create(): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        this.add(item);
        return item;
    }
    createJournal(data: IMaterialSerial): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        item.itemCode = this.parent.itemCode;
        item.serialCode = data.serialCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        this.add(item);
        return item;
    }
    /** 创建并添加子项集合 */
    createJournals(data: IMaterialIssueSerialLine[]): IMaterialSerialJournal[] {
        let serialJournals: IMaterialSerialJournal[] = [];
        for (let item of data) {
            let JournalItem: MaterialSerialJournal = this.create();
            JournalItem.serialCode = item.serialCode;
            JournalItem.itemCode = this.parent.itemCode;
            JournalItem.warehouse = this.parent.warehouse;
            JournalItem.direction = this.parent.direction;
            serialJournals.push(JournalItem);
        }
        return serialJournals;
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialSerialJournal): void {
        super.afterRemove(item);
        if (this.parent.materialSerialServiceJournals.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialServiceJournals.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }

    protected afterAdd(item: MaterialSerialJournal): void {
        super.afterRemove(item);
        if (this.parent.materialSerialServiceJournals.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialServiceJournals.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }
}