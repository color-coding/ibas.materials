/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: Fancy
 * @Date: 2017-12-28 11:40:30
 * @Last Modified by: Fancy
 * @Last Modified time: 2017-12-29 13:01:36
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
    ISerialManagementLine,
    ISerialManagementLines,
    BO_CODE_SERIALMANAGEMENTLINE,
} from "../../api/index";
import {
    MaterialSerialJournals
} from "./index";
export abstract class SerialManagementLine
    extends BODocumentLine<SerialManagementLine>
    implements ISerialManagementLine {
    /** 映射的属性名称-编码 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-编码 */
    get docEntry(): number {
        return this.getProperty<number>(SerialManagementLine.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-编码 */
    set docEntry(value: number) {
        this.setProperty(SerialManagementLine.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(SerialManagementLine.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(SerialManagementLine.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-显示顺序 */
    static PROPERTY_VISORDER_NAME: string = "VisOrder";
    /** 获取-显示顺序 */
    get visOrder(): number {
        return this.getProperty<number>(SerialManagementLine.PROPERTY_VISORDER_NAME);
    }
    /** 设置-显示顺序 */
    set visOrder(value: number) {
        this.setProperty(SerialManagementLine.PROPERTY_VISORDER_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(SerialManagementLine.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(SerialManagementLine.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-状态 */
    static PROPERTY_STATUS_NAME: string = "Status";
    /** 获取-状态 */
    get status(): emBOStatus {
        return this.getProperty<emBOStatus>(SerialManagementLine.PROPERTY_STATUS_NAME);
    }
    /** 设置-状态 */
    set status(value: emBOStatus) {
        this.setProperty(SerialManagementLine.PROPERTY_STATUS_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(SerialManagementLine.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(SerialManagementLine.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(SerialManagementLine.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(SerialManagementLine.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouse(): string {
        return this.getProperty<string>(SerialManagementLine.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库 */
    set warehouse(value: string) {
        this.setProperty(SerialManagementLine.PROPERTY_WAREHOUSE_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHJOURNALS_NAME: string = "MaterialSerialJournals";
    /** 获取-行-序列号集合 */
    get materialSerials(): MaterialSerialJournals<ISerialManagementLine> {
        return this.getProperty<MaterialSerialJournals<ISerialManagementLine>>(SerialManagementLine.PROPERTY_MATERIALBATCHJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialSerials(value: MaterialSerialJournals<ISerialManagementLine>) {
        this.setProperty(SerialManagementLine.PROPERTY_MATERIALBATCHJOURNALS_NAME, value);
    }
}

export class SerialManagementLines implements ISerialManagementLines {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_SERIALMANAGEMENTLINE;
    materialSerials: ISerialManagementLine[];
    constructor(materialSerials: ISerialManagementLine[]) {
        this.materialSerials = materialSerials;
    }
    /**
     * 检查序列管理物料的数量与创建/选择的批次数量是否一致
     */
    checkSerialQuantity(): boolean {
        for (let item of this.materialSerials) {
            if (Number(item.quantity) !== Number(item.materialSerials.length)) {
                return false;
            }
        }
        return true;
    }
}
