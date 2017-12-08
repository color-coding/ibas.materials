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
    BusinessObjectListBase,
} from "ibas/index";
import {
    IMaterialIssueBatchContractLine,
    IMaterialIssueBatchLine,
    IMaterialBatch,
    IMaterialBatchJournal,
    IMaterialIssueBatchService,
    IMaterialIssueBatchJournals,
    BO_CODE_MATERIALBATCHSERVICE,
    BO_CODE_RECEIPT_MATERIALBATCH,
    BO_CODE_ISSUE_MATERIALBATCH
} from "../../api/index";
import {
    MaterialBatch,
    MaterialBatchJournal,
    MaterialSerialJournal
} from "./index";
export class MaterialIssueBatchService extends BusinessObjectBase<MaterialIssueBatchService> implements IMaterialIssueBatchService {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCHSERVICE;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    public contract: IMaterialIssueBatchContractLine;
    /** 构造函数 */
    constructor(contract: IMaterialIssueBatchContractLine) {
        super();
        this.contract = contract;
        this.index = contract.index;
        this.itemCode = contract.itemCode;
        this.warehouse = contract.warehouse;
        this.quantity = contract.quantity;
        this.needBatchQuantity = contract.quantity;
        if (!objects.isNull(contract.docType)) {
            this.docType = contract.docType;
        } if (!objects.isNull(contract.docEntry)) {
            this.docEntry = contract.docEntry;
        } if (!objects.isNull(contract.lineNum)) {
            this.lineNum = contract.lineNum;
        }
        if (!objects.isNull(contract.materialIssueBatchs)) {
            for (let contractLine of contract.materialIssueBatchs.materialIssueLineBatchs) {
                this.materialBatchJournals.create(contractLine);
            }
        }
    }

    /** 映射的属性名称-行索引 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-行索引 */
    get index(): number {
        return this.getProperty<number>(MaterialIssueBatchService.PROPERTY_INDEX_NAME);
    }
    /** 设置-行索引 */
    set index(value: number) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_INDEX_NAME, value);
    }

    /** 映射的属性名称-单据类型 */
    static PROPERTY_DOCTYPE_NAME: string = "DocType";
    /** 获取-单据类型 */
    get docType(): string {
        return this.getProperty<string>(MaterialIssueBatchService.PROPERTY_DOCTYPE_NAME);
    }
    /** 设置-单据类型 */
    set docType(value: string) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_DOCTYPE_NAME, value);
    }

    /** 映射的属性名称-单据号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-单据号 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialIssueBatchService.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-单据号 */
    set docEntry(value: number) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-单据行号 */
    static PROPERTY_LINENUM_NAME: string = "LineNum";
    /** 获取-单据行号 */
    get lineNum(): number {
        return this.getProperty<number>(MaterialIssueBatchService.PROPERTY_LINENUM_NAME);
    }
    /** 设置-单据行号 */
    set lineNum(value: number) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_LINENUM_NAME, value);
    }

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialIssueBatchService.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialIssueBatchService.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialIssueBatchService.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialIssueBatchService.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDBATCHQUANTITY_NAME: string = "NeedBatchQuantity";
    /** 获取-总需求 */
    get needBatchQuantity(): number {
        return this.getProperty<number>(MaterialIssueBatchService.PROPERTY_NEEDBATCHQUANTITY_NAME);
    }
    /** 设置-批次总需求 */
    set needBatchQuantity(value: number) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_NEEDBATCHQUANTITY_NAME, value);
    }

    /** 映射的属性名称-批次总批次 */
    static PROPERTY_SELECTEDBATCHQUANTITY_NAME: string = "SelectedBatchQuantity";
    /** 获取-批次总批次 */
    get selectedBatchQuantity(): number {
        return this.getProperty<number>(MaterialIssueBatchService.PROPERTY_SELECTEDBATCHQUANTITY_NAME);
    }
    /** 设置-总批次 */
    set selectedBatchQuantity(value: number) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_SELECTEDBATCHQUANTITY_NAME, value);
    }


    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHSERVICEJOURNALS_NAME: string = "MaterialIssueBatchServiceJournals";
    /** 获取-行-批次集合 */
    get materialBatchJournals(): MaterialIssueBatchJournals {
        return this.getProperty<MaterialIssueBatchJournals>
            (MaterialIssueBatchService.PROPERTY_MATERIALBATCHSERVICEJOURNALS_NAME);
    }
    /** 设置-行-批次集合 */
    set materialBatchJournals(value: MaterialIssueBatchJournals) {
        this.setProperty(MaterialIssueBatchService.PROPERTY_MATERIALBATCHSERVICEJOURNALS_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
        this.materialBatchJournals = new MaterialIssueBatchJournals(this);
    }
}

/** 批次日记账 集合 */
export class MaterialIssueBatchJournals extends BusinessObjects<MaterialBatchJournal, MaterialIssueBatchService>
    implements IMaterialIssueBatchJournals {

    /** 创建并添加子项 */
    create(data?: IMaterialIssueBatchLine): MaterialBatchJournal {
        let item: MaterialBatchJournal = new MaterialBatchJournal();
        this.add(item);
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        if (!objects.isNull(data)) {
            item.batchCode = data.batchCode;
            item.quantity = data.quantity;
        }
        return item;
    }
    /** 创建并添加子项 */
    createBatchJournal(data: MaterialBatchJournal): MaterialBatchJournal {
        this.parent.contract.materialIssueBatchs.createBatchJournal(data);
        if (objects.instanceOf(data, MaterialBatchJournal)) {
            return this.create(data);
            // let item: MaterialBatchJournal = new MaterialBatchJournal();
            // item.itemCode = this.parent.itemCode;
            // item.warehouse = this.parent.warehouse;
            // item.direction = this.parent.direction;
            // item.batchCode = data.batchCode;
            // item.quantity = data.quantity;
            // this.add(item);
            // return item;
        }
    }
    /** 删除批次日记账 */
    deleteBatchJournal(data: IMaterialBatchJournal): void {
        this.parent.contract.materialIssueBatchs.deleteBatchJournal(data);
        let item: MaterialBatchJournal = this.find(c => c.batchCode === data.batchCode);
        if (!objects.isNull(item)) {
            this.remove(item);
        }
    }
    /** 修改批次日记账 */
    updateBatchJournal(data: IMaterialBatchJournal): void {
        this.parent.contract.materialIssueBatchs.updateBatchJournal(data);
        let item: MaterialBatchJournal = this.find(c => c.batchCode === data.batchCode);
        if (!objects.isNull(item)) {
            item.itemCode = this.parent.itemCode;
            item.warehouse = this.parent.warehouse;
            item.direction = this.parent.direction;
            item.quantity = data.quantity;
        }
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
        if (this.parent.materialBatchJournals.length === 0) {
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