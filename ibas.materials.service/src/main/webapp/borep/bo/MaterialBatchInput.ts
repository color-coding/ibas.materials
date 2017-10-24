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
    config,
} from "ibas/index";
import {
    IMaterialBatchInput,
    IMaterialBatchInputBatchJournals,
    IMaterialBatchInputSerialJournals,
    BO_CODE_MATERIALBATCH,
    BO_CODE_RECEIEPT_MATERIALBATCH,
    BO_CODE_ISSUE_MATERIALBATCH
} from "../../api/index";
import {
    MaterialBatchJournal,
    MaterialSerialJournal
} from "./index";
export class MaterialBatchInput extends BOSimple<MaterialBatchInput> implements IMaterialBatchInput {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCH;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIEPT_MATERIALBATCH;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALBATCH;
    /** 构造函数 */
    constructor() {
        super();
    }

    /** 映射的属性名称-行索引 */
    static PROPERTY_INDEX_NAME: string = "Index";
    /** 获取-行索引 */
    get index(): number {
        return this.getProperty<number>(MaterialBatchInput.PROPERTY_INDEX_NAME);
    }
    /** 设置-行索引 */
    set index(value: number) {
        this.setProperty(MaterialBatchInput.PROPERTY_INDEX_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialBatchInput.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialBatchInput.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialBatchInput.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialBatchInput.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialBatchInput.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialBatchInput.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialBatchInput.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialBatchInput.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_NEEDQUANTITY_NAME: string = "NeedQuantity";
    /** 获取-总需求 */
    get needQuantity(): number {
        return this.getProperty<number>(MaterialBatchInput.PROPERTY_NEEDQUANTITY_NAME);
    }
    /** 设置-总需求 */
    set needQuantity(value: number) {
        this.setProperty(MaterialBatchInput.PROPERTY_NEEDQUANTITY_NAME, value);
    }

    /** 映射的属性名称-总需求 */
    static PROPERTY_SELECTEDQUANTITY_NAME: string = "SelectedQuantity";
    /** 获取-总需求 */
    get selectedQuantity(): number {
        return this.getProperty<number>(MaterialBatchInput.PROPERTY_SELECTEDQUANTITY_NAME);
    }
    /** 设置-总需求 */
    set selectedQuantity(value: number) {
        this.setProperty(MaterialBatchInput.PROPERTY_SELECTEDQUANTITY_NAME, value);
    }
    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(MaterialBatchInput.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(MaterialBatchInput.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
        // this.objectCode = config.applyVariables(MaterialBatchInput.BUSINESS_OBJECT_CODE);
    }
    /** 映射的属性名称-库存发货-行-序列号集合 */
    static PROPERTY_MATERIALBATCHINPUTBATCHJOURNALS_NAME: string = "MaterialBatchInputBatchJournals";
    /** 获取-库存发货-行-序列号集合 */
    get materialBatchInputBatchJournals(): MaterialBatchInputBatchJournals {
        return this.getProperty<MaterialBatchInputBatchJournals>(MaterialBatchInput.PROPERTY_MATERIALBATCHINPUTBATCHJOURNALS_NAME);
    }
    /** 设置-库存发货-行-序列号集合 */
    set materialBatchInputBatchJournals(value: MaterialBatchInputBatchJournals) {
        this.setProperty(MaterialBatchInput.PROPERTY_MATERIALBATCHINPUTBATCHJOURNALS_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHINPUTSERIALJOURNALS_NAME: string = "MaterialBatchInputSerialJournals";
    /** 获取-行-序列号集合 */
    get goodsIssueMaterialBatchJournals(): MaterialBatchInputSerialJournals {
        return this.getProperty<MaterialBatchInputSerialJournals>(MaterialBatchInput.PROPERTY_MATERIALBATCHINPUTSERIALJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialBatchInputSerialJournals(value: MaterialBatchInputSerialJournals) {
        this.setProperty(MaterialBatchInput.PROPERTY_MATERIALBATCHINPUTSERIALJOURNALS_NAME, value);
    }
}

/** 批次日记账 集合 */
export class MaterialBatchInputBatchJournals extends BusinessObjects<MaterialBatchJournal,MaterialBatchInput>
                                             implements IMaterialBatchInputBatchJournals {
    /** 创建并添加子项 */
    create(): MaterialBatchJournal {
    let item: MaterialBatchJournal = new MaterialBatchJournal();
    this.add(item);
    return item;
    }
}
/** 序列日记账 集合 */
export class MaterialBatchInputSerialJournals extends BusinessObjects<MaterialSerialJournal,MaterialBatchInput>
                                              implements IMaterialBatchInputSerialJournals {
    /** 创建并添加子项 */
    create(): MaterialSerialJournal {
    let item: MaterialSerialJournal = new MaterialSerialJournal();
    this.add(item);
    return item;
    }
}