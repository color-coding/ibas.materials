/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: Fancy
 * @Date: 2017-12-28 11:40:30
 * @Last Modified by: Fancy
 * @Last Modified time: 2018-01-09 13:38:25
 */

import {
    numbers,
    enums,
    emYesNo,
    objects,
    strings,
    emBOStatus,
    emDocumentStatus,
    BusinessObjects,
    BODocumentLine,
    IBODocument,
    IBODocumentLine,
    BusinessObject,
    IBusinessObject,
    ArrayList
} from "ibas/index";
import {
    IMaterialSerialJournal,
    IMaterialSerialJournals,
    IMaterialSerialDocument,
    IMaterialSerialDocuments,
    BO_CODE_MATERIALSERIALDOCUMENT,
} from "../../api/index";
import {
    MaterialSerialJournals
} from "./index";
export abstract class MaterialSerialDocument
    extends BusinessObject<MaterialSerialDocument>
    implements IMaterialSerialDocument {
    /** 映射的属性名称-编码 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(MaterialSerialDocument.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(MaterialSerialDocument.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 获取-编码 */
    get docEntry(): number {
        return this.getProperty<number>(MaterialSerialDocument.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-编码 */
    set docEntry(value: number) {
        this.setProperty(MaterialSerialDocument.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(MaterialSerialDocument.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(MaterialSerialDocument.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(MaterialSerialDocument.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(MaterialSerialDocument.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialSerialDocument.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialSerialDocument.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialSerialDocument.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialSerialDocument.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialSerialDocument.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库 */
    set warehouse(value: string) {
        this.setProperty(MaterialSerialDocument.PROPERTY_WAREHOUSE_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHJOURNALS_NAME: string = "MaterialSerialJournals";
    /** 获取-行-序列号集合 */
    get materialSerials(): MaterialSerialJournals<IMaterialSerialDocument> {
        return this.getProperty<MaterialSerialJournals<IMaterialSerialDocument>>
            (MaterialSerialDocument.PROPERTY_MATERIALBATCHJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialSerials(value: MaterialSerialJournals<IMaterialSerialDocument>) {
        this.setProperty(MaterialSerialDocument.PROPERTY_MATERIALBATCHJOURNALS_NAME, value);
    }
}

export class MaterialSerialDocuments implements IMaterialSerialDocuments {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSERIALDOCUMENT;
    materialSerials: IMaterialSerialDocument[];
    constructor(materialSerials: IMaterialSerialDocument[]) {
        this.materialSerials = materialSerials;
    }
    /**
     * 检查序列管理物料的数量与创建/选择的批次数量是否一致
     */
    checkSerialQuantity(): boolean {
        for (let item of this.materialSerials.filter(c => c.isDeleted === false)) {
            if (Number(item.quantity) !== Number(item.materialSerials.filterDeleted().length)) {
                return false;
            }
        }
        return true;
    }
}
