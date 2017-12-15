/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-10 17:58:50
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-12 18:19:56
 */
import * as ibas from "ibas/index";
import {
    IMaterialReceiptSerialContractLine,
    IMaterialReceiptSerialLine,
    IMaterialReceiptSerials,
} from "../../../api/index";
export class MaterialReceiptSerialJournal extends ibas.BusinessObjectBase<MaterialReceiptSerialJournal> {
    public contract: IMaterialReceiptSerialContractLine;
    constructor(contract: IMaterialReceiptSerialContractLine) {
        super();
        this.contract = contract;
        // this.index = contract.index;
        this.itemCode = contract.itemCode;
        this.warehouse = contract.warehouse;
        this.quantity = contract.quantity;
        this.needSerialQuantity = contract.quantity;
        if (!ibas.objects.isNull(contract.docType)) {
            this.docType = contract.docType;
        } if (!ibas.objects.isNull(contract.docEntry)) {
            this.docEntry = contract.docEntry;
        } if (!ibas.objects.isNull(contract.lineNum)) {
            this.lineNum = contract.lineNum;
        }
        if (!ibas.objects.isNull(contract.materialLineSerials)) {
            for (let contractLine of contract.materialLineSerials.materialReceiptLineSerials) {
                this.materialSerialInfos.create(contractLine);
            }
        }
    }

    /** 映射的属性名称-单据类型 */
    static PROPERTY_DOCTYPE_NAME: string = "DocType";
    /** 获取-单据类型 */
    get docType(): string {
        return this.getProperty<string>(MaterialReceiptSerialJournal.PROPERTY_DOCTYPE_NAME);
    }
    /** 设置-单据类型 */
    set docType(value: string) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_DOCTYPE_NAME, value);
    }
    /** 映射的属性名称-单据号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-单据号 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialReceiptSerialJournal.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-单据号 */
    set docEntry(value: number) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-单据行号 */
    static PROPERTY_LINENUM_NAME: string = "LineNum";
    /** 获取-单据行号 */
    get lineNum(): number {
        return this.getProperty<number>(MaterialReceiptSerialJournal.PROPERTY_LINENUM_NAME);
    }
    /** 设置-单据行号 */
    set lineNum(value: number) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_LINENUM_NAME, value);
    }

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialReceiptSerialJournal.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialReceiptSerialJournal.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this.getProperty<ibas.emDirection>(MaterialReceiptSerialJournal.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialReceiptSerialJournal.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDSerialQUANTITY_NAME: string = "NeedSerialQuantity";
    /** 获取-总需求 */
    get needSerialQuantity(): number {
        return this.getProperty<number>(MaterialReceiptSerialJournal.PROPERTY_NEEDSerialQUANTITY_NAME);
    }
    /** 设置-批次总需求 */
    set needSerialQuantity(value: number) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_NEEDSerialQUANTITY_NAME, value);
    }

    /** 映射的属性名称-选择总批次 */
    static PROPERTY_SELECTEDSERIALQUANTITY_NAME: string = "SelectedSerialQuantity";
    /** 获取-批次总批次 */
    get selectedSerialQuantity(): number {
        return this.getProperty<number>(MaterialReceiptSerialJournal.PROPERTY_SELECTEDSERIALQUANTITY_NAME);
    }
    /** 设置-总批次 */
    set selectedSerialQuantity(value: number) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_SELECTEDSERIALQUANTITY_NAME, value);
    }

    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALSERIALINFOS_NAME: string = "MaterialReceiptSerialInfos";
    /** 获取-行-批次集合 */
    get materialSerialInfos(): MaterialReceiptSerialInfos {
        return this.getProperty<MaterialReceiptSerialInfos>
            (MaterialReceiptSerialJournal.PROPERTY_MATERIALSERIALINFOS_NAME);
    }
    /** 设置-行-批次集合 */
    set materialSerialInfos(value: MaterialReceiptSerialInfos) {
        this.setProperty(MaterialReceiptSerialJournal.PROPERTY_MATERIALSERIALINFOS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.materialSerialInfos = new MaterialReceiptSerialInfos(this);
    }
}

export class MaterialReceiptSerialInfos extends ibas.BusinessObjects<MaterialReceiptSerialInfo, MaterialReceiptSerialJournal>
    implements IMaterialReceiptSerials {
    materialReceiptLineSerials = this;
    /** 创建并添加子项 */
    create(data?: IMaterialReceiptSerialLine): MaterialReceiptSerialInfo {
        let item: MaterialReceiptSerialInfo = new MaterialReceiptSerialInfo();
        this.add(item);
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = ibas.emDirection.IN;
        if (!ibas.objects.isNull(data)) {
            item.serialCode = data.serialCode;
            item.supplierSerial = data.supplierSerial;
            item.caller = data.caller;
        }
        return item;
    }
    /** 创建并添加子项 */
    createSerialJournal(data: MaterialReceiptSerialInfo): MaterialReceiptSerialInfo {
        if (ibas.objects.instanceOf(data, MaterialReceiptSerialInfo)) {
            data = this.create(data);
            let caller: any = this.parent.contract.materialLineSerials.createSerialJournal(data);
            data.caller = caller;
            return data;
        }
    }
    /** 删除序列日记账 */
    deleteSerialJournal(data: MaterialReceiptSerialInfo): void {
        data.index = this.indexOf(data);
        this.parent.contract.materialLineSerials.deleteSerialJournal(data);
        if (data.isNew) {
            this.remove(data);
        } else {
            data.markDeleted(true);
        }
    }
    /** 修改序列日记账 */
    updateSerialJournal(data: MaterialReceiptSerialInfo): void {
        this.parent.contract.materialLineSerials.updateSerialJournal(data);
    }
    /** 监听子项属性改变 */
    protected onChildPropertyChanged(item: MaterialReceiptSerialInfo, name: string): void {
        super.onChildPropertyChanged(item, name);
        this.updateSerialJournal(item);
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialReceiptSerialInfo): void {
        super.afterRemove(item);
        if (this.parent.materialSerialInfos.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialInfos.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }

    protected afterAdd(item: MaterialReceiptSerialInfo): void {
        super.afterAdd(item);
        if (this.parent.materialSerialInfos.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialInfos.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }
}

export class MaterialReceiptSerialInfo extends ibas.BusinessObjectBase<MaterialReceiptSerialInfo> {


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
        return this.getProperty<number>(MaterialReceiptSerialInfo.PROPERTY_INDEX_NAME);
    }
    /** 设置-数量 */
    set index(value: number) {
        this.setProperty(MaterialReceiptSerialInfo.PROPERTY_INDEX_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialReceiptSerialInfo.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialReceiptSerialInfo.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-批次编号 */
    static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
    /** 获取-序列编号 */
    get serialCode(): string {
        return this.getProperty<string>(MaterialReceiptSerialInfo.PROPERTY_SERIALCODE_NAME);
    }
    /** 设置-序列编号 */
    set serialCode(value: string) {
        this.setProperty(MaterialReceiptSerialInfo.PROPERTY_SERIALCODE_NAME, value);
    }

    /** 映射的属性名称-供应商序号 */
    static PROPERTY_SUPPLIERSERIAL_NAME: string = "SupplierSerial";
    /** 获取-供应商序号 */
    get supplierSerial(): string {
        return this.getProperty<string>(MaterialReceiptSerialInfo.PROPERTY_SUPPLIERSERIAL_NAME);
    }
    /** 设置-供应商序号 */
    set supplierSerial(value: string) {
        this.setProperty(MaterialReceiptSerialInfo.PROPERTY_SUPPLIERSERIAL_NAME, value);
    }
    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialReceiptSerialInfo.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialReceiptSerialInfo.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this.getProperty<ibas.emDirection>(MaterialReceiptSerialInfo.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this.setProperty(MaterialReceiptSerialInfo.PROPERTY_DIRECTION_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
        // this.objectCode = config.applyVariables(MaterialReceiptSerialJournal.BUSINESS_OBJECT_CODE);
    }
}