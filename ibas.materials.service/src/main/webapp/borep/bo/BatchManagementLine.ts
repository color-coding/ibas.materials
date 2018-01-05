/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: Fancy
 * @Date: 2017-12-28 11:40:23
 * @Last Modified by: Fancy
 * @Last Modified time: 2018-01-05 16:40:14
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
    IBatchManagementLine,
    IBatchManagementLines,
    BO_CODE_BATCHMANAGEMENTLINE,
} from "../../api/index";
import {
    MaterialBatchJournals,
    MaterialSerialJournals
} from "./index";
export abstract class BatchManagementLine
    extends BODocumentLine<BatchManagementLine>
    implements IBatchManagementLine {
    /** 映射的属性名称-编码 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-编码 */
    get docEntry(): number {
        return this.getProperty<number>(BatchManagementLine.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-编码 */
    set docEntry(value: number) {
        this.setProperty(BatchManagementLine.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(BatchManagementLine.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(BatchManagementLine.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-显示顺序 */
    static PROPERTY_VISORDER_NAME: string = "VisOrder";
    /** 获取-显示顺序 */
    get visOrder(): number {
        return this.getProperty<number>(BatchManagementLine.PROPERTY_VISORDER_NAME);
    }
    /** 设置-显示顺序 */
    set visOrder(value: number) {
        this.setProperty(BatchManagementLine.PROPERTY_VISORDER_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(BatchManagementLine.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(BatchManagementLine.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-状态 */
    static PROPERTY_STATUS_NAME: string = "Status";
    /** 获取-状态 */
    get status(): emBOStatus {
        return this.getProperty<emBOStatus>(BatchManagementLine.PROPERTY_STATUS_NAME);
    }
    /** 设置-状态 */
    set status(value: emBOStatus) {
        this.setProperty(BatchManagementLine.PROPERTY_STATUS_NAME, value);
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(BatchManagementLine.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(BatchManagementLine.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(BatchManagementLine.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(BatchManagementLine.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouse(): string {
        return this.getProperty<string>(BatchManagementLine.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库 */
    set warehouse(value: string) {
        this.setProperty(BatchManagementLine.PROPERTY_WAREHOUSE_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHJOURNALS_NAME: string = "MaterialBatchJournals";
    /** 获取-行-序列号集合 */
    get materialBatchs(): MaterialBatchJournals<IBatchManagementLine> {
        return this.getProperty<MaterialBatchJournals<IBatchManagementLine>>
            (BatchManagementLine.PROPERTY_MATERIALBATCHJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialBatchs(value: MaterialBatchJournals<IBatchManagementLine>) {
        this.setProperty(BatchManagementLine.PROPERTY_MATERIALBATCHJOURNALS_NAME, value);
    }
}

export class BatchManagementLines implements IBatchManagementLines {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_BATCHMANAGEMENTLINE;
    materialBatchs: IBatchManagementLine[];
    constructor(materialBatchs: IBatchManagementLine[]) {
        this.materialBatchs = materialBatchs;
    }
    /**
     * 检查批次管理物料的数量与创建/选择的批次数量是否一致
     */
    checkBatchQuantity(): boolean {
        for (let item of this.materialBatchs) {
            let batchQuantity: number = Number(0);
            for (let journal of item.materialBatchs) {
                batchQuantity = batchQuantity + numbers.toFloat(journal.quantity);
            }
            if (Number(item.quantity) !== Number(batchQuantity)) {
                return false;
            }
        }
        return true;
    }
}