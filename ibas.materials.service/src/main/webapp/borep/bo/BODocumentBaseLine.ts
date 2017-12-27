/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-26 09:52:58
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-27 15:50:06
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
    IBODocumentLine
} from "ibas/index";
import {
    IMaterialBatchJournals,
    IMaterialSerialJournals,
    IBODocumentBaseLine,
    IBODocumentBaseLines,
} from "../../api/index";
import { MaterialBatchJournals } from "./MaterialBatchJournal";
import { MaterialSerialJournals } from "./MaterialSerialJournal";
// 发生出入库业务单据基本行
export abstract class BODocumentBaseLine<T extends IBODocumentBaseLine>
    extends BODocumentLine<T>
    implements IBODocumentBaseLine {
    constructor() {
        super();
    }
    /** 映射的属性名称-编码 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-编码 */
    get docEntry(): number {
        return this.getProperty<number>(BODocumentBaseLine.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-编码 */
    set docEntry(value: number) {
        this.setProperty(BODocumentBaseLine.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(BODocumentBaseLine.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(BODocumentBaseLine.PROPERTY_LINEID_NAME, value);
    }
    /** 映射的属性名称-显示顺序 */
    static PROPERTY_VISORDER_NAME: string = "VisOrder";
    /** 获取-显示顺序 */
    get visOrder(): number {
        return this.getProperty<number>(BODocumentBaseLine.PROPERTY_VISORDER_NAME);
    }
    /** 设置-显示顺序 */
    set visOrder(value: number) {
        this.setProperty(BODocumentBaseLine.PROPERTY_VISORDER_NAME, value);
    }

    /** 映射的属性名称-状态 */
    static PROPERTY_STATUS_NAME: string = "Status";
    /** 获取-状态 */
    get status(): emBOStatus {
        return this.getProperty<emBOStatus>(BODocumentBaseLine.PROPERTY_STATUS_NAME);
    }
    /** 设置-状态 */
    set status(value: emBOStatus) {
        this.setProperty(BODocumentBaseLine.PROPERTY_STATUS_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(BODocumentBaseLine.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(BODocumentBaseLine.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-序号管理 */
    static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
    /** 获取-序号管理 */
    get serialManagement(): emYesNo {
        return this.getProperty<emYesNo>(BODocumentBaseLine.PROPERTY_SERIALMANAGEMENT_NAME);
    }
    /** 设置-序号管理 */
    set serialManagement(value: emYesNo) {
        this.setProperty(BODocumentBaseLine.PROPERTY_SERIALMANAGEMENT_NAME, value);
    }

    /** 映射的属性名称-批号管理 */
    static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
    /** 获取-批号管理 */
    get batchManagement(): emYesNo {
        return this.getProperty<emYesNo>(BODocumentBaseLine.PROPERTY_BATCHMANAGEMENT_NAME);
    }
    /** 设置-批号管理 */
    set batchManagement(value: emYesNo) {
        this.setProperty(BODocumentBaseLine.PROPERTY_BATCHMANAGEMENT_NAME, value);
    }


    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(BODocumentBaseLine.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(BODocumentBaseLine.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(BODocumentBaseLine.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(BODocumentBaseLine.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouse(): string {
        return this.getProperty<string>(BODocumentBaseLine.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库 */
    set warehouse(value: string) {
        this.setProperty(BODocumentBaseLine.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-行-序列号集合 */
    static PROPERTY_MATERIALSERIALJOURNALS_NAME: string = "MaterialSerialJournals";
    /** 获取-行-序列号集合 */
    get materialSerialJournals(): MaterialSerialJournals<T> {
        return this.getProperty<MaterialSerialJournals<T>>(BODocumentBaseLine.PROPERTY_MATERIALSERIALJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialSerialJournals(value: MaterialSerialJournals<T>) {
        this.setProperty(BODocumentBaseLine.PROPERTY_MATERIALSERIALJOURNALS_NAME, value);
    }
    /** 映射的属性名称-行-批次集合 */
    static PROPERTY_MATERIALBATCHJOURNALS_NAME: string = "MaterialBatchJournals";
    /** 获取-行-序列号集合 */
    get materialBatchJournals(): MaterialBatchJournals<T> {
        return this.getProperty<MaterialBatchJournals<T>>(BODocumentBaseLine.PROPERTY_MATERIALBATCHJOURNALS_NAME);
    }
    /** 设置-行-序列号集合 */
    set materialBatchJournals(value: MaterialBatchJournals<T>) {
        this.setProperty(BODocumentBaseLine.PROPERTY_MATERIALBATCHJOURNALS_NAME, value);
    }
}

export abstract class BODocumentBaseLines<T extends IBODocumentBaseLine, P extends IBODocument>
    extends BusinessObjects<T, P>
    implements IBODocumentBaseLines<T, P> {
    /** 取出需要添加批次的行 */
    filterBatchLine(): T[] {
        let lines: T[] = this.filter(
            c => c.isDeleted === false
                && !objects.isNull(c.lineStatus)
                && c.batchManagement !== undefined
                && c.batchManagement === emYesNo.YES
                && !strings.isEmpty(c.itemCode)
                && !strings.isEmpty(c.warehouse));
        return lines;
    }

    /** 取出需要添加序列的行 */
    filterSerialLine(): T[] {
        let lines: T[] = this.filter(
            c => c.isDeleted === false
                && !objects.isNull(c.lineStatus)
                && c.serialManagement !== undefined
                && c.serialManagement === emYesNo.YES
                && !strings.isEmpty(c.itemCode)
                && !strings.isEmpty(c.warehouse));
        return lines;
    }

    /**
     * 检查批次管理物料的数量与创建/选择的批次数量是否一致
     */
    checkBatchQuantity(): boolean {
        for (let item of this) {
            if (item.batchManagement === emYesNo.YES) {
                let batchQuantity: number = Number(0);
                for (let journal of item.materialBatchJournals) {
                    batchQuantity = batchQuantity + numbers.toFloat(journal.quantity);
                }
                if (Number(item.quantity) !== Number(batchQuantity)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 检查序列管理物料的数量与创建/选择的序列数量是否一致
     */
    checkSerialQuantity(): boolean {
        for (let item of this) {
            if (item.serialManagement === emYesNo.YES) {
                let batchQuantity: number = Number(0);
                if (Number(item.quantity) !== item.materialSerialJournals.length) {
                    return false;
                }
            }
        }
        return true;
    }

    afterAdd(item: T): void {
        super.afterAdd(item);
        item.lineStatus = this.parent.documentStatus;
    }

    /** 监听父项属性改变 */
    protected onParentPropertyChanged(name: string): void {
        super.onParentPropertyChanged(name);

    }
}