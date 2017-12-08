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
    IMaterialIssueSerialService,
    IMaterialIssueSerialJournals,
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


export class MaterialIssueSerialService extends BusinessObjectBase<MaterialIssueSerialService> implements IMaterialIssueSerialService {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSERIALSERVICE;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    public contract: IMaterialIssueSerialContractLine;
    /** 构造函数 */
    constructor(contract: IMaterialIssueSerialContractLine) {
        super();
        this.contract = contract;
        this.index = contract.index;
        this.itemCode = contract.itemCode;
        this.warehouse = contract.warehouse;
        this.quantity = contract.quantity;
        this.needSerialQuantity = contract.quantity;
        // if (!objects.isNull(contract.docType)) {
        //     this.docType = contract.docType;
        // } if (!objects.isNull(contract.docEntry)) {
        //     this.docEntry = contract.docEntry;
        // } if (!objects.isNull(contract.lineNum)) {
        //     this.lineNum = contract.lineNum;
        // }
        if (!objects.isNull(contract.materialLineSerials)) {
            for (let contractLine of contract.materialLineSerials.materialIssueLineSerials) {
                this.materialSerialJournals.create(contractLine);
            }
        }
    }

    /** 映射的属性名称-行索引 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-行索引 */
    get index(): number {
        return this.getProperty<number>(MaterialIssueSerialService.PROPERTY_INDEX_NAME);
    }
    /** 设置-行索引 */
    set index(value: number) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_INDEX_NAME, value);
    }

    /** 映射的属性名称-行 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行索引 */
    get lineId(): number {
        return this.getProperty<number>(MaterialIssueSerialService.PROPERTY_LINEID_NAME);
    }
    /** 设置-行索引 */
    set lineId(value: number) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialIssueSerialService.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialIssueSerialService.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialIssueSerialService.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-总序列号需求 */
    static PROPERTY_NEEDSERIALQUANTITY_NAME: string = "NeedSerialQuantity";
    /** 获取-总需求 */
    get needSerialQuantity(): number {
        return this.getProperty<number>(MaterialIssueSerialService.PROPERTY_NEEDSERIALQUANTITY_NAME);
    }
    /** 设置-序列号总需求 */
    set needSerialQuantity(value: number) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_NEEDSERIALQUANTITY_NAME, value);
    }

    /** 映射的属性名称-总序列 */
    static PROPERTY_SELECTEDSERIALQUANTITY_NAME: string = "SelectedSerialQuantity";
    /** 获取-总序列 */
    get selectedSerialQuantity(): number {
        return this.getProperty<number>(MaterialIssueSerialService.PROPERTY_SELECTEDSERIALQUANTITY_NAME);
    }
    /** 设置-总序列 */
    set selectedSerialQuantity(value: number) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_SELECTEDSERIALQUANTITY_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialIssueSerialService.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_QUANTITY_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALSERIALJOURNALS_NAME: string = "MaterialIssueSerialServiceJournals";
    /** 获取-行-序列号集合 */
    get materialSerialJournals(): MaterialIssueSerialJournals {
        return this.getProperty<MaterialIssueSerialJournals>
            (MaterialIssueSerialService.PROPERTY_MATERIALSERIALJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialSerialJournals(value: MaterialIssueSerialJournals) {
        this.setProperty(MaterialIssueSerialService.PROPERTY_MATERIALSERIALJOURNALS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.materialSerialJournals = new MaterialIssueSerialJournals(this);
    }
}

/** 序列日记账 集合 */
export class MaterialIssueSerialJournals extends BusinessObjects<MaterialSerialJournal, MaterialIssueSerialService>
    implements IMaterialIssueSerialJournals {
    /** 创建并添加子项 */
    create(data?: IMaterialIssueSerialLine): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        this.add(item);
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.direction = this.parent.direction;
        if (!objects.isNull(data)) {
            item.serialCode = data.serialCode;
        }
        return item;
    }
    /** 创建并添加子项 */
    createSerialJournal(data: IMaterialSerialJournal): MaterialSerialJournal {
        this.parent.contract.materialLineSerials.createSerialJournal(data);
        if (objects.instanceOf(data, MaterialBatchJournal)) {
            return this.create(data);
        }
    }
    /** 删除序列日记账 */
    deleteSerialJournal(data: IMaterialSerialJournal): void {
        this.parent.contract.materialLineSerials.deleteSerialJournal(data);
        let item: MaterialSerialJournal = this.find(c => c.serialCode === data.serialCode);
        if (!objects.isNull(item)) {
            this.remove(item);
        }
    }
    /** 修改序列日记账 */
    updateSerialJournal(data: IMaterialSerialJournal): void {
        this.parent.contract.materialLineSerials.updateSerialJournal(data);
        let item: MaterialSerialJournal = this.find(c => c.serialCode === data.serialCode);
        if (!objects.isNull(item)) {
            item.itemCode = this.parent.itemCode;
            item.warehouse = this.parent.warehouse;
            item.direction = this.parent.direction;
        }
    }
    /** 移除子项 */
    protected afterRemove(item: MaterialSerialJournal): void {
        super.afterRemove(item);
        if (this.parent.materialSerialJournals.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialJournals.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }

    protected afterAdd(item: MaterialSerialJournal): void {
        super.afterRemove(item);
        if (this.parent.materialSerialJournals.length === 0) {
            this.parent.needSerialQuantity = this.parent.quantity;
            this.parent.selectedSerialQuantity = 0;
        } else {
            this.parent.selectedSerialQuantity = this.parent.materialSerialJournals.length;
            this.parent.needSerialQuantity = Number(this.parent.quantity) - Number(this.parent.selectedSerialQuantity);
        }
    }
}