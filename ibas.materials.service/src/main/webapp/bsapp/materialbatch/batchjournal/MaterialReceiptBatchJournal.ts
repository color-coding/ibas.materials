/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-10 12:05:50
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-21 16:17:03
 */
import * as ibas from "ibas/index";
import {
    IMaterialBatchContract,
    IMaterialBatchLine,
    IMaterialBatchs
} from "../../../api/index";
export class MaterialReceiptBatchJournal implements IMaterialBatchContract {
    public contract: IMaterialBatchContract;
    constructor(contract: IMaterialBatchContract) {
        this.contract = contract;
        this.materialBatchInfos = new MaterialReceiptBatchInfos(this);
        // this.itemCode = contract.itemCode;
        // this.warehouse = contract.warehouse;
        // this.quantity = contract.quantity;
        // this.needBatchQuantity = contract.quantity;
        // if (!ibas.objects.isNull(contract.docType)) {
        //     this.docType = contract.docType;
        // } if (!ibas.objects.isNull(contract.docEntry)) {
        //     this.docEntry = contract.docEntry;
        // } if (!ibas.objects.isNull(contract.lineNum)) {
        //     this.lineNum = contract.lineNum;
        // }
        // if (!ibas.objects.isNull(contract.materialBatchs)) {
        //     for (let contractLine of contract.materialBatchs.materialLineBatchs) {
        //         this.materialBatchInfos.create(contractLine);
        //     }
        // }
    }
    /** 映射的属性名称-单据类型 */
    private _docType: string;
    /** 获取-单据类型 */
    get docType(): string {
        return this._docType;
    }
    /** 设置-单据类型 */
    set docType(value: string) {
        this.docType = value;
    }
    /** 映射的属性名称-单据号 */
    private _docEntry: number;
    /** 获取-单据号 */
    get docEntry(): number {
        return this._docEntry;
    }
    /** 设置-单据号 */
    set docEntry(value: number) {
        this._docEntry = value;
    }

    /** 映射的属性名称-单据行号 */
    private _lineNum: number;
    /** 获取-单据行号 */
    get lineNum(): number {
        return this._lineNum;
    }
    /** 设置-单据行号 */
    set lineNum(value: number) {
        this._lineNum = value;
    }

    /** 映射的属性名称-物料编号 */
    private _itemCode: string;
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.itemCode;
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this._itemCode = value;
    }

    /** 映射的属性名称-仓库编号 */
    private _warehouse: string;
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this._warehouse;
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this._warehouse = value;
    }

    /** 映射的属性名称-方向 */
    private _direction: ibas.emDirection;
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this._direction;
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this._direction = value;
    }

    /** 映射的属性名称-数量 */
    private _quantity: number;
    /** 获取-数量 */
    get quantity(): number {
        return this._quantity;
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this._quantity = value;
    }

    /** 映射的属性名称-总需求 */
    private _needBatchQuantity: number;
    /** 获取-总需求 */
    get needBatchQuantity(): number {
        return this._needBatchQuantity;
    }
    /** 设置-批次总需求 */
    set needBatchQuantity(value: number) {
        this._needBatchQuantity = value;
    }

    /** 映射的属性名称-批次总批次 */
    private _selectedBatchQuantity: number;
    /** 获取-批次总批次 */
    get selectedBatchQuantity(): number {
        return this._selectedBatchQuantity;
    }
    /** 设置-总批次 */
    set selectedBatchQuantity(value: number) {
        this._selectedBatchQuantity = value;
    }

    /** 映射的属性名称-行-批次集合 */
    private _materialReceiptBatchInfos: MaterialReceiptBatchInfos;
    /** 获取-行-批次集合 */
    get materialBatchInfos(): MaterialReceiptBatchInfos {
        return this._materialReceiptBatchInfos;
    }
    /** 设置-行-批次集合 */
    set materialBatchInfos(value: MaterialReceiptBatchInfos) {
        this._materialReceiptBatchInfos = value;
    }

}

export class MaterialReceiptBatchInfos extends ibas.ArrayList<MaterialReceiptBatchInfo> implements IMaterialBatchs {
    private _parent: MaterialReceiptBatchJournal;
    protected get parent(): MaterialReceiptBatchJournal {
        return this._parent;
    }
    protected set parent(value: MaterialReceiptBatchJournal) {
        this._parent = value;
    }
    constructor(parent: MaterialReceiptBatchJournal) {
        super();
        this._parent = parent;
    }
    materialLineBatchs = this.materialLineBatchs;
    /** 创建并添加子项 */
    create(data?: IMaterialBatchLine): MaterialReceiptBatchInfo {
        let item: MaterialReceiptBatchInfo = new MaterialReceiptBatchInfo();
        this.push(item);
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
        this.parent.contract.materialBatchs.deleteBatchJournal(data);
        this.remove(data);
    }
    /** 修改批次日记账 */
    updateBatchJournal(data: MaterialReceiptBatchInfo): void {
        this.parent.contract.materialBatchs.updateBatchJournal(data);
    }

    /** 监听子项属性改变 */
    // protected onChildPropertyChanged(item: MaterialReceiptBatchInfo, name: string): void {
    //     super.onChildPropertyChanged(item, name);
    //     this.updateBatchJournal(item);
    //     if (ibas.strings.equalsIgnoreCase(name, MaterialReceiptBatchInfo.PROPERTY_QUANTITY_NAME)) {
    //         let totalQuantity: number = 0;
    //         for (let batchJournalLine of this.filterDeleted()) {
    //             if (ibas.objects.isNull(batchJournalLine.quantity)) {
    //                 batchJournalLine.quantity = 0;
    //             }
    //             totalQuantity = Number(totalQuantity) + Number(batchJournalLine.quantity);
    //         }
    //         this.parent.selectedBatchQuantity = totalQuantity;
    //         this.parent.needBatchQuantity = Number(this.parent.quantity) - Number(totalQuantity);
    //     }
    // }
    /** 移除子项 */
    // protected afterRemove(item: MaterialReceiptBatchInfo): void {
    //     // super.afterRemove(item);
    //     if (this.parent.materialBatchInfos.length === 0) {
    //         this.parent.needBatchQuantity = this.parent.quantity;
    //         this.parent.selectedBatchQuantity = 0;
    //     } else {
    //         if (!isNaN(item.quantity)) {
    //             this.parent.selectedBatchQuantity = Number(this.parent.selectedBatchQuantity) - Number(item.quantity);
    //             this.parent.needBatchQuantity = Number(this.parent.needBatchQuantity) + Number(item.quantity);
    //         }
    //     }
    // }
}

export class MaterialReceiptBatchInfo implements IMaterialBatchLine {

    private _caller: any;

    public get caller(): any {
        return this._caller;
    }

    public set caller(value: any) {
        this._caller = value;
    }

    /** 映射的属性名称-物料编号 */
    private _itemCode?: string;
    /** 获取-物料编号 */
    get itemCode(): string {
        return this._itemCode;
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this._itemCode = value;
    }

    /** 映射的属性名称-批次编号 */
    private _batchCode: string;
    /** 获取-批次编号 */
    get batchCode(): string {
        return this._batchCode;
    }
    /** 设置-批次编号 */
    set batchCode(value: string) {
        this._batchCode = value;
    }

    /** 映射的属性名称-仓库编号 */
    private _warehouse: string;
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this._warehouse;
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this._warehouse = value;
    }

    /** 映射的属性名称-方向 */
    private _direction: ibas.emDirection;
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this._direction;
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this._direction = value;
    }

    /** 映射的属性名称-数量 */
    private _quantity: number;
    /** 获取-数量 */
    get quantity(): number {
        return this._quantity;
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this._quantity = value;
    }

}