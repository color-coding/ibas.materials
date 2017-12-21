/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-10 12:05:50
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-12 18:15:50
 */
import * as ibas from "ibas/index";
import {
    IMaterialBatchContract,
    IMaterialBatchLine,
    IMaterialBatchs
} from "../../../api/index";
export class MaterialReceiptBatchJournal extends ibas.BusinessObjectBase<MaterialReceiptBatchJournal> {
    public contract: IMaterialBatchContract;
    constructor(contract: IMaterialBatchContract) {
        super();
        this.contract = contract;
        this.itemCode = contract.itemCode;
        this.warehouse = contract.warehouse;
        this.quantity = contract.quantity;
        this.needBatchQuantity = contract.quantity;
        if (!ibas.objects.isNull(contract.docType)) {
            this.docType = contract.docType;
        } if (!ibas.objects.isNull(contract.docEntry)) {
            this.docEntry = contract.docEntry;
        } if (!ibas.objects.isNull(contract.lineNum)) {
            this.lineNum = contract.lineNum;
        }
        if (!ibas.objects.isNull(contract.materialBatchs)) {
            for (let contractLine of contract.materialBatchs.materialLineBatchs) {
                this.materialBatchInfos.create(contractLine);
            }
        }
    }
    /** 映射的属性名称-单据类型 */
    static PROPERTY_DOCTYPE_NAME: string = "DocType";
    /** 获取-单据类型 */
    get docType(): string {
        return this.getProperty<string>(MaterialReceiptBatchJournal.PROPERTY_DOCTYPE_NAME);
    }
    /** 设置-单据类型 */
    set docType(value: string) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_DOCTYPE_NAME, value);
    }
    /** 映射的属性名称-单据号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-单据号 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialReceiptBatchJournal.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-单据号 */
    set docEntry(value: number) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-单据行号 */
    static PROPERTY_LINENUM_NAME: string = "LineNum";
    /** 获取-单据行号 */
    get lineNum(): number {
        return this.getProperty<number>(MaterialReceiptBatchJournal.PROPERTY_LINENUM_NAME);
    }
    /** 设置-单据行号 */
    set lineNum(value: number) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_LINENUM_NAME, value);
    }

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialReceiptBatchJournal.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialReceiptBatchJournal.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this.getProperty<ibas.emDirection>(MaterialReceiptBatchJournal.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialReceiptBatchJournal.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDBATCHQUANTITY_NAME: string = "NeedBatchQuantity";
    /** 获取-总需求 */
    get needBatchQuantity(): number {
        return this.getProperty<number>(MaterialReceiptBatchJournal.PROPERTY_NEEDBATCHQUANTITY_NAME);
    }
    /** 设置-批次总需求 */
    set needBatchQuantity(value: number) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_NEEDBATCHQUANTITY_NAME, value);
    }

    /** 映射的属性名称-批次总批次 */
    static PROPERTY_SELECTEDBATCHQUANTITY_NAME: string = "SelectedBatchQuantity";
    /** 获取-批次总批次 */
    get selectedBatchQuantity(): number {
        return this.getProperty<number>(MaterialReceiptBatchJournal.PROPERTY_SELECTEDBATCHQUANTITY_NAME);
    }
    /** 设置-总批次 */
    set selectedBatchQuantity(value: number) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_SELECTEDBATCHQUANTITY_NAME, value);
    }

    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHINFOS_NAME: string = "MaterialReceiptBatchInfos";
    /** 获取-行-批次集合 */
    get materialBatchInfos(): MaterialReceiptBatchInfos {
        return this.getProperty<MaterialReceiptBatchInfos>
            (MaterialReceiptBatchJournal.PROPERTY_MATERIALBATCHINFOS_NAME);
    }
    /** 设置-行-批次集合 */
    set materialBatchInfos(value: MaterialReceiptBatchInfos) {
        this.setProperty(MaterialReceiptBatchJournal.PROPERTY_MATERIALBATCHINFOS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.materialBatchInfos = new MaterialReceiptBatchInfos(this);
    }
}

export class MaterialReceiptBatchInfos extends ibas.BusinessObjects<MaterialReceiptBatchInfo, MaterialReceiptBatchJournal>
    implements IMaterialBatchs {

    materialLineBatchs = this;
    /** 创建并添加子项 */
    create(data?: IMaterialBatchLine): MaterialReceiptBatchInfo {
        let item: MaterialReceiptBatchInfo = new MaterialReceiptBatchInfo();
        this.add(item);
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        if (!ibas.objects.isNull(data)) {
            item.batchCode = data.batchCode;
            item.quantity = data.quantity;
            item.caller = data.caller;
        }
        return item;
    }
    /** 创建并添加子项 */
    createBatchJournal(data: MaterialReceiptBatchInfo): MaterialReceiptBatchInfo {
        if (ibas.objects.instanceOf(data, MaterialReceiptBatchInfo)) {
            data = this.create(data);
            let caller: any = this.parent.contract.materialBatchs.createBatchJournal(data);
            data.caller = caller;
            return data;
        }
    }
    /** 删除批次日记账 */
    deleteBatchJournal(data: MaterialReceiptBatchInfo): void {
        data.index = this.indexOf(data);
        this.parent.contract.materialBatchs.deleteBatchJournal(data);
        if (data.isNew) {
            this.remove(data);
        } else {
            data.markDeleted(true);
        }
    }
    /** 修改批次日记账 */
    updateBatchJournal(data: MaterialReceiptBatchInfo): void {
        data.index = this.indexOf(data);
        this.parent.contract.materialBatchs.updateBatchJournal(data);
    }

    /** 监听子项属性改变 */
    protected onChildPropertyChanged(item: MaterialReceiptBatchInfo, name: string): void {
        super.onChildPropertyChanged(item, name);
        this.updateBatchJournal(item);
        if (ibas.strings.equalsIgnoreCase(name, MaterialReceiptBatchInfo.PROPERTY_QUANTITY_NAME)) {
            let totalQuantity: number = 0;
            for (let batchJournalLine of this.filterDeleted()) {
                if (ibas.objects.isNull(batchJournalLine.quantity)) {
                    batchJournalLine.quantity = 0;
                }
                totalQuantity = Number(totalQuantity) + Number(batchJournalLine.quantity);
            }
            this.parent.selectedBatchQuantity = totalQuantity;
            this.parent.needBatchQuantity = Number(this.parent.quantity) - Number(totalQuantity);
        }
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialReceiptBatchInfo): void {
        super.afterRemove(item);
        if (this.parent.materialBatchInfos.length === 0) {
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

export class MaterialReceiptBatchInfo extends ibas.BusinessObjectBase<MaterialReceiptBatchInfo> {

    private _caller: any;

    public get caller(): any {
        return this._caller;
    }

    public set caller(value: any) {
        this._caller = value;
    }

    /** 索引-数量 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-数量 */
    get index(): number {
        return this.getProperty<number>(MaterialReceiptBatchInfo.PROPERTY_INDEX_NAME);
    }
    /** 设置-数量 */
    set index(value: number) {
        this.setProperty(MaterialReceiptBatchInfo.PROPERTY_INDEX_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialReceiptBatchInfo.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialReceiptBatchInfo.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-批次编号 */
    static PROPERTY_BATCH_NAME: string = "BatchCode";
    /** 获取-批次编号 */
    get batchCode(): string {
        return this.getProperty<string>(MaterialReceiptBatchInfo.PROPERTY_BATCH_NAME);
    }
    /** 设置-批次编号 */
    set batchCode(value: string) {
        this.setProperty(MaterialReceiptBatchInfo.PROPERTY_BATCH_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialReceiptBatchInfo.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialReceiptBatchInfo.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this.getProperty<ibas.emDirection>(MaterialReceiptBatchInfo.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this.setProperty(MaterialReceiptBatchInfo.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialReceiptBatchInfo.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialReceiptBatchInfo.PROPERTY_QUANTITY_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        // this.objectCode = config.applyVariables(MaterialReceiptBatchJournal.BUSINESS_OBJECT_CODE);
    }
}