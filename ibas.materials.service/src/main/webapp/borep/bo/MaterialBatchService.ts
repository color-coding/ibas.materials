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
    IMaterialIssueBatchContractLine,
    IMaterialIssueBatchLine,
    IMaterialBatch,
    IMaterialBatchJournal,
    IMaterialBatchService,
    IMaterialBatchServiceJournals,
    BO_CODE_MATERIALBATCHSERVICE,
    BO_CODE_RECEIPT_MATERIALBATCH,
    BO_CODE_ISSUE_MATERIALBATCH
} from "../../api/index";
import {
    MaterialBatch,
    MaterialBatchJournal,
    MaterialSerialJournal
} from "./index";
export class MaterialBatchService extends BusinessObjectBase<MaterialBatchService> implements IMaterialBatchService {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCHSERVICE;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    /** 构造函数 */
    constructor() {
        super();
    }

    public static create(data: IMaterialIssueBatchContractLine): MaterialBatchService {
        let batchServiceData: MaterialBatchService = new MaterialBatchService();
        batchServiceData.index = data.index;
        batchServiceData.itemCode = data.itemCode;
        batchServiceData.warehouse = data.warehouse;
        batchServiceData.quantity = data.quantity;
        batchServiceData.needBatchQuantity = data.quantity;
        return batchServiceData;
    }

    /** 映射的属性名称-行索引 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-行索引 */
    get index(): number {
        return this.getProperty<number>(MaterialBatchService.PROPERTY_INDEX_NAME);
    }
    /** 设置-行索引 */
    set index(value: number) {
        this.setProperty(MaterialBatchService.PROPERTY_INDEX_NAME, value);
    }

    /** 映射的属性名称-行 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行索引 */
    get lineId(): number {
        return this.getProperty<number>(MaterialBatchService.PROPERTY_LINEID_NAME);
    }
    /** 设置-行索引 */
    set lineId(value: number) {
        this.setProperty(MaterialBatchService.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialBatchService.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialBatchService.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialBatchService.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialBatchService.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialBatchService.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialBatchService.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialBatchService.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialBatchService.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDBATCHQUANTITY_NAME: string = "NeedBatchQuantity";
    /** 获取-总需求 */
    get needBatchQuantity(): number {
        return this.getProperty<number>(MaterialBatchService.PROPERTY_NEEDBATCHQUANTITY_NAME);
    }
    /** 设置-批次总需求 */
    set needBatchQuantity(value: number) {
        this.setProperty(MaterialBatchService.PROPERTY_NEEDBATCHQUANTITY_NAME, value);
    }

    /** 映射的属性名称-批次总批次 */
    static PROPERTY_SELECTEDBATCHQUANTITY_NAME: string = "SelectedBatchQuantity";
    /** 获取-批次总批次 */
    get selectedBatchQuantity(): number {
        return this.getProperty<number>(MaterialBatchService.PROPERTY_SELECTEDBATCHQUANTITY_NAME);
    }
    /** 设置-总批次 */
    set selectedBatchQuantity(value: number) {
        this.setProperty(MaterialBatchService.PROPERTY_SELECTEDBATCHQUANTITY_NAME, value);
    }


    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHSERVICEJOURNALS_NAME: string = "MaterialBatchServiceJournals";
    /** 获取-行-批次集合 */
    get materialBatchServiceJournals(): MaterialBatchServiceJournals {
        return this.getProperty<MaterialBatchServiceJournals>
            (MaterialBatchService.PROPERTY_MATERIALBATCHSERVICEJOURNALS_NAME);
    }
    /** 设置-行-批次集合 */
    set materialBatchServiceJournals(value: MaterialBatchServiceJournals) {
        this.setProperty(MaterialBatchService.PROPERTY_MATERIALBATCHSERVICEJOURNALS_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
        this.materialBatchServiceJournals = new MaterialBatchServiceJournals(this);
    }
}

/** 批次日记账 集合 */
export class MaterialBatchServiceJournals extends BusinessObjects<MaterialBatchJournal, MaterialBatchService>
    implements IMaterialBatchServiceJournals {
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
    createJournal(data: IMaterialBatch): MaterialBatchJournal {
        let item: MaterialBatchJournal = new MaterialBatchJournal();
        if (objects.instanceOf(data, MaterialBatch)) {
            item.quantity = 0;
            item.batchCode = data.batchCode;
            item.itemCode = this.parent.itemCode;
            item.warehouse = this.parent.warehouse;
            item.direction = this.parent.direction;
            item.expirationDate = data.expirationDate;
            item.admissionDate = data.admissionDate;
            item.manufacturingDate = data.manufacturingDate;
            this.add(item);
        }
        return item;
    }
    /** 创建并添加子项集合 */
    createJournals(data: IMaterialIssueBatchLine[]): IMaterialBatchJournal[] {
        let batchJournals: IMaterialBatchJournal[] = [];
        for (let item of data) {
            let JournalItem: MaterialBatchJournal = this.create();
            JournalItem.quantity = item.quantity;
            JournalItem.batchCode = item.batchCode;
            JournalItem.itemCode = this.parent.itemCode;
            JournalItem.warehouse = this.parent.warehouse;
            JournalItem.direction = this.parent.direction;
            batchJournals.push(JournalItem);
        }
        return batchJournals;
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
        if (this.parent.materialBatchServiceJournals.length === 0) {
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