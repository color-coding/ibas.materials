/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-10 17:57:47
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-11 16:50:49
 */
import * as ibas from "ibas/index";
import {
    IMaterialIssueSerialContractLine,
    IMaterialIssueSerialLine,
    IMaterialIssueSerials,
} from "../../../api/index";
export class MaterialIssueSerialJournal extends ibas.BusinessObjectBase<MaterialIssueSerialJournal> {
    public contract: IMaterialIssueSerialContractLine;
    constructor(contract: IMaterialIssueSerialContractLine) {
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
            for (let contractLine of contract.materialLineSerials.materialIssueLineSerials) {
                this.materialSerialInfos.create(contractLine);
            }
        }
    }

    /** 映射的属性名称-单据类型 */
    static PROPERTY_DOCTYPE_NAME: string = "DocType";
    /** 获取-单据类型 */
    get docType(): string {
        return this.getProperty<string>(MaterialIssueSerialJournal.PROPERTY_DOCTYPE_NAME);
    }
    /** 设置-单据类型 */
    set docType(value: string) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_DOCTYPE_NAME, value);
    }
    /** 映射的属性名称-单据号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-单据号 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialIssueSerialJournal.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-单据号 */
    set docEntry(value: number) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-单据行号 */
    static PROPERTY_LINENUM_NAME: string = "LineNum";
    /** 获取-单据行号 */
    get lineNum(): number {
        return this.getProperty<number>(MaterialIssueSerialJournal.PROPERTY_LINENUM_NAME);
    }
    /** 设置-单据行号 */
    set lineNum(value: number) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_LINENUM_NAME, value);
    }

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialIssueSerialJournal.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialIssueSerialJournal.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this.getProperty<ibas.emDirection>(MaterialIssueSerialJournal.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialIssueSerialJournal.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDSerialQUANTITY_NAME: string = "NeedSerialQuantity";
    /** 获取-总需求 */
    get needSerialQuantity(): number {
        return this.getProperty<number>(MaterialIssueSerialJournal.PROPERTY_NEEDSerialQUANTITY_NAME);
    }
    /** 设置-批次总需求 */
    set needSerialQuantity(value: number) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_NEEDSerialQUANTITY_NAME, value);
    }

    /** 映射的属性名称-选择总批次 */
    static PROPERTY_SELECTEDSerialQUANTITY_NAME: string = "SelectedSerialQuantity";
    /** 获取-批次总批次 */
    get selectedSerialQuantity(): number {
        return this.getProperty<number>(MaterialIssueSerialJournal.PROPERTY_SELECTEDSerialQUANTITY_NAME);
    }
    /** 设置-总批次 */
    set selectedSerialQuantity(value: number) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_SELECTEDSerialQUANTITY_NAME, value);
    }

    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALSerialINFOS_NAME: string = "MaterialIssueSerialInfos";
    /** 获取-行-批次集合 */
    get materialSerialInfos(): MaterialIssueSerialInfos {
        return this.getProperty<MaterialIssueSerialInfos>
            (MaterialIssueSerialJournal.PROPERTY_MATERIALSerialINFOS_NAME);
    }
    /** 设置-行-批次集合 */
    set materialSerialInfos(value: MaterialIssueSerialInfos) {
        this.setProperty(MaterialIssueSerialJournal.PROPERTY_MATERIALSerialINFOS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.materialSerialInfos = new MaterialIssueSerialInfos(this);
    }
}

export class MaterialIssueSerialInfos extends ibas.BusinessObjects<MaterialIssueSerialInfo, MaterialIssueSerialJournal>
    implements IMaterialIssueSerials {

    materialIssueLineSerials = this;

    /** 创建并添加子项 */
    create(data?: IMaterialIssueSerialLine): MaterialIssueSerialInfo {
        let item: MaterialIssueSerialInfo = new MaterialIssueSerialInfo();
        this.add(item);
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        if (!ibas.objects.isNull(data)) {
            item.serialCode = data.serialCode;
        }
        return item;
    }
    /** 创建并添加子项 */
    createSerialJournal(data: MaterialIssueSerialInfo): MaterialIssueSerialInfo {
        if (ibas.objects.instanceOf(data, MaterialIssueSerialInfo)) {
            data = this.create(data);
            this.parent.contract.materialLineSerials.createSerialJournal(data);
            return data;
        }
    }
    /** 删除序列日记账 */
    deleteSerialJournal(data: MaterialIssueSerialInfo): void {
        this.parent.contract.materialLineSerials.deleteSerialJournal(data);
        let item: MaterialIssueSerialInfo = this.find(c => c.serialCode === data.serialCode);
        if (!ibas.objects.isNull(item)) {
            this.remove(item);
        }
    }
    /** 修改序列日记账 */
    updateSerialJournal(data: MaterialIssueSerialInfo): void {
        this.parent.contract.materialLineSerials.updateSerialJournal(data);
        let item: MaterialIssueSerialInfo = this.find(c => c.serialCode === data.serialCode);
        if (!ibas.objects.isNull(item)) {
            item.itemCode = this.parent.itemCode;
            item.warehouse = this.parent.warehouse;
            item.direction = this.parent.direction;
        }
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialIssueSerialInfo): void {
        super.afterRemove(item);
        if (this.parent.materialSerialInfos.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialInfos.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }

    protected afterAdd(item: MaterialIssueSerialInfo): void {
        super.afterRemove(item);
        if (this.parent.materialSerialInfos.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialInfos.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }
}

export class MaterialIssueSerialInfo extends ibas.BusinessObjectBase<MaterialIssueSerialInfo> {
    /** 索引-数量 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-数量 */
    get index(): number {
        return this.getProperty<number>(MaterialIssueSerialInfo.PROPERTY_INDEX_NAME);
    }
    /** 设置-数量 */
    set index(value: number) {
        this.setProperty(MaterialIssueSerialInfo.PROPERTY_INDEX_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialIssueSerialInfo.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialIssueSerialInfo.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-批次编号 */
    static PROPERTY_Serial_NAME: string = "SerialCode";
    /** 获取-批次编号 */
    get serialCode(): string {
        return this.getProperty<string>(MaterialIssueSerialInfo.PROPERTY_Serial_NAME);
    }
    /** 设置-批次编号 */
    set serialCode(value: string) {
        this.setProperty(MaterialIssueSerialInfo.PROPERTY_Serial_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialIssueSerialInfo.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialIssueSerialInfo.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): ibas.emDirection {
        return this.getProperty<ibas.emDirection>(MaterialIssueSerialInfo.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: ibas.emDirection) {
        this.setProperty(MaterialIssueSerialInfo.PROPERTY_DIRECTION_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
        // this.objectCode = config.applyVariables(MaterialIssueSerialJournal.BUSINESS_OBJECT_CODE);
    }
}