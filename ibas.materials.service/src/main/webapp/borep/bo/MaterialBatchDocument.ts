/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: Fancy
 * @Date: 2017-12-28 11:40:23
 * @Last Modified by: Fancy
 * @Last Modified time: 2018-01-09 11:06:46
 */

import {
    numbers,
    enums,
    emYesNo,
    objects,
    strings,
    emBOStatus,
    emDocumentStatus,
    ArrayList,
    BusinessObjects,
    BODocumentLine,
    IBODocument,
    IBODocumentLine,
    BusinessObject,
    IBusinessObject
} from "ibas/index";
import {
    IMaterialBatchJournal,
    IMaterialBatchJournals,
    IMaterialSerialJournal,
    IMaterialSerialJournals,
    IMaterialBatchDocument,
    IMaterialBatchDocuments,
    BO_CODE_MATERIALBATCHDOCUMENT,
} from "../../api/index";
import {
    MaterialBatchJournals,
    MaterialSerialJournals
} from "./index";
export abstract class MaterialBatchDocument
    extends BODocumentLine<MaterialBatchDocument>
    implements IMaterialBatchDocument {
    /** 映射的属性名称-编码 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-编码 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialBatchDocument.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-编码 */
    set docEntry(value: number) {
        this.setProperty(MaterialBatchDocument.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(MaterialBatchDocument.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(MaterialBatchDocument.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-基于类型 */
    static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
    /** 获取-基于类型 */
    get baseDocumentType(): string {
        return this.getProperty<string>(MaterialBatchDocument.PROPERTY_BASEDOCUMENTTYPE_NAME);
    }
    /** 设置-基于类型 */
    set baseDocumentType(value: string) {
        this.setProperty(MaterialBatchDocument.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
    }

    /** 映射的属性名称-基于标识 */
    static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
    /** 获取-基于标识 */
    get baseDocumentEntry(): number {
        return this.getProperty<number>(MaterialBatchDocument.PROPERTY_BASEDOCUMENTENTRY_NAME);
    }
    /** 设置-基于标识 */
    set baseDocumentEntry(value: number) {
        this.setProperty(MaterialBatchDocument.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
    }

    /** 映射的属性名称-基于行号 */
    static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
    /** 获取-基于行号 */
    get baseDocumentLineId(): number {
        return this.getProperty<number>(MaterialBatchDocument.PROPERTY_BASEDOCUMENTLINEID_NAME);
    }
    /** 设置-基于行号 */
    set baseDocumentLineId(value: number) {
        this.setProperty(MaterialBatchDocument.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
    }
    /** 映射的属性名称-显示顺序 */
    static PROPERTY_VISORDER_NAME: string = "VisOrder";
    /** 获取-显示顺序 */
    get visOrder(): number {
        return this.getProperty<number>(MaterialBatchDocument.PROPERTY_VISORDER_NAME);
    }
    /** 设置-显示顺序 */
    set visOrder(value: number) {
        this.setProperty(MaterialBatchDocument.PROPERTY_VISORDER_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(MaterialBatchDocument.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(MaterialBatchDocument.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-状态 */
    static PROPERTY_STATUS_NAME: string = "Status";
    /** 获取-状态 */
    get status(): emBOStatus {
        return this.getProperty<emBOStatus>(MaterialBatchDocument.PROPERTY_STATUS_NAME);
    }
    /** 设置-状态 */
    set status(value: emBOStatus) {
        this.setProperty(MaterialBatchDocument.PROPERTY_STATUS_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialBatchDocument.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialBatchDocument.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialBatchDocument.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialBatchDocument.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialBatchDocument.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库 */
    set warehouse(value: string) {
        this.setProperty(MaterialBatchDocument.PROPERTY_WAREHOUSE_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHJOURNALS_NAME: string = "MaterialBatchJournals";
    /** 获取-行-序列号集合 */
    get materialBatchs(): MaterialBatchJournals<IMaterialBatchDocument> {
        return this.getProperty<MaterialBatchJournals<IMaterialBatchDocument>>
            (MaterialBatchDocument.PROPERTY_MATERIALBATCHJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialBatchs(value: MaterialBatchJournals<IMaterialBatchDocument>) {
        this.setProperty(MaterialBatchDocument.PROPERTY_MATERIALBATCHJOURNALS_NAME, value);
    }
}

export class MaterialBatchDocuments implements IMaterialBatchDocuments {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCHDOCUMENT;
    materialBatchs: IMaterialBatchDocument[];
    constructor(materialBatchs: IMaterialBatchDocument[]) {
        this.materialBatchs = materialBatchs;
    }
    /**
     * 检查批次管理物料的数量与创建/选择的批次数量是否一致
     */
    checkBatchQuantity(): boolean {
        for (let item of this.materialBatchs) {
            let batchQuantity: number = Number(0);
            for (let journal of item.materialBatchs.filterDeleted()) {
                batchQuantity = batchQuantity + numbers.toFloat(journal.quantity);
            }
            if (Number(item.quantity) !== Number(batchQuantity)) {
                return false;
            }
        }
        return true;
    }
}