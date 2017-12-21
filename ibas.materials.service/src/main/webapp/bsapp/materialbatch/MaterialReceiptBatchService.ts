/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 * @Author: fancy
 * @Date: 2017-11-30 17:59:05
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-21 16:56:31
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialBatchBaseLine,
    IMaterialBatchs,
    IMaterialBatchLine,
    IMaterialBatchContract,
} from "../../api/bo/index";
import {
    MaterialReceiptBatchServiceProxy,
} from "../../api/Datas";
import * as batch from "./index";
export class MaterialReceiptBatchService extends ibas.ServiceApplication<IMaterialReceiptBatchView, IMaterialBatchContract[]> {

    /** 应用标识 */
    static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchreceipt";
    /** 业务对象编码 */
    // static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_RECEIPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialReceiptBatchService.APPLICATION_ID;
        this.name = MaterialReceiptBatchService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 服务契约 */
    private contract: IMaterialBatchContract[];
    /** 批次服务数据 */
    protected batchServiceDatas: batch.MaterialReceiptBatchJournal[];
    /** 批次信息 */
    protected batchData: bo.MaterialBatchJournal[];
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addBatchEvent = this.addBatch;
        this.view.removeBatchEvent = this.removeBatch;
        this.view.autoCreateBatchEvent = this.autoCreateBatch;
        this.view.saveDataEvent = this.saveData;
        this.view.selectMaterialBatchJournalLineEvent = this.selectMaterialBatchJournalLine;
    }
    /** 添加批次 */
    protected addBatch(select: batch.MaterialReceiptBatchJournal): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 存在了数量0批次行不能继续添加
        if (select.materialBatchInfos.filter(c => ibas.numbers.toFloat(c.quantity) === 0).length !== 0) {
            return;
        }
        // 找到输入数据的批次集合
        let index: number = this.batchServiceDatas.indexOf(select);
        let item: batch.MaterialReceiptBatchJournal = this.batchServiceDatas[index];
        if (item.needBatchQuantity === 0) {
            return;
        }
        let batchInfo: batch.MaterialReceiptBatchInfo = new batch.MaterialReceiptBatchInfo();
        item.materialBatchInfos.createBatchJournal(batchInfo);
        // 仅显示没有标记删除的
        this.view.showData(item.materialBatchInfos);
    }
    /** 移除批次 */
    protected removeBatch(batch: batch.MaterialReceiptBatchJournal, items: batch.MaterialReceiptBatchInfo[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(batch)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 找到输入数据的批次集合
        let index: number = this.batchServiceDatas.indexOf(batch);
        let batchData: batch.MaterialReceiptBatchJournal = this.batchServiceDatas[index];
        // 移除项目
        for (let item of items) {
            if (batchData.materialBatchInfos.indexOf(item) >= 0) {
                batchData.materialBatchInfos.deleteBatchJournal(item);
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(batchData.materialBatchInfos);
    }
    /** 自动创建批次 */
    protected autoCreateBatch(item: batch.MaterialReceiptBatchJournal): void {
        // 未选择凭证行
        if (ibas.objects.isNull(item)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let index: number = this.batchServiceDatas.indexOf(item);
        let batchItem: batch.MaterialReceiptBatchJournal = this.batchServiceDatas[index];
        // 不需要创建批次了
        if (batchItem.needBatchQuantity === 0) {
            this.view.showData(batchItem.materialBatchInfos);
            return;
        }
        let batchLine: batch.MaterialReceiptBatchInfo;
        let allcationQuantity: number = Number(0);
        // 如果该凭证已经开始创建批次
        let batchInfo: batch.MaterialReceiptBatchInfo = new batch.MaterialReceiptBatchInfo();
        if (batchItem.materialBatchInfos.length !== 0) {
            // 存在数量为0的行，就不新建行
            batchLine = batchItem.materialBatchInfos.find(c => ibas.numbers.toFloat(c.quantity) === 0.0);
            for (let batch of batchItem.materialBatchInfos) {
                allcationQuantity = allcationQuantity + ibas.numbers.toFloat(batch.quantity);
                // 过滤掉为0的
                if (batch.quantity === 0) {
                    batchItem.materialBatchInfos.remove(batch);
                }
            }
            if (ibas.objects.isNull(batchLine)) {
                batchInfo.quantity = batchItem.quantity - Number(allcationQuantity);
                batchLine = batchItem.materialBatchInfos.createBatchJournal(batchInfo);
            } else {
                batchLine.quantity = batchItem.quantity - Number(allcationQuantity);
            }
        } else {
            batchInfo.quantity = batchItem.needBatchQuantity;
            batchItem.materialBatchInfos.createBatchJournal(batchInfo);
        }
        this.view.showData(batchItem.materialBatchInfos);
    }
    /** 选择凭证行事件 */
    protected selectMaterialBatchJournalLine(selected: batch.MaterialReceiptBatchJournal): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let index: number = this.batchServiceDatas.indexOf(selected);
        let batchJournal: batch.MaterialReceiptBatchJournal = this.batchServiceDatas[index];
        // let batchJournal: batch.MaterialReceiptBatchJournal = this.batchServiceDatas
        //     .find(c => c.itemCode === selected.itemCode && c.warehouse === selected.warehouse);
        if (!ibas.objects.isNull(batchJournal)) {
            this.view.showData(batchJournal.materialBatchInfos);
        }
    }
    /** 绑定服务数据 */
    bindBatchServiceData(contract: IMaterialBatchContract[]): void {
        let batchServiceDatas: batch.MaterialReceiptBatchJournal[] = Array<batch.MaterialReceiptBatchJournal>();
        for (let item of contract) {
            let batchServiceData: batch.MaterialReceiptBatchJournal = new batch.MaterialReceiptBatchJournal(item);
            batchServiceData.direction = ibas.emDirection.IN;
            batchServiceDatas.push(batchServiceData);
        }
        this.batchServiceDatas = batchServiceDatas;
    }
    /** 运行服务 */
    runService(contract: IMaterialBatchContract[]): void {
        // 行数据
        if (contract.length >= 1) {
            this.bindBatchServiceData(contract);
        }
        super.show();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.batchServiceDatas);
    }

    protected saveData(): void {
        // 批次数量错误
        for (let batchJournalLine of this.batchServiceDatas) {
            if (batchJournalLine.needBatchQuantity !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
            if (batchJournalLine.materialBatchInfos.filter(c => ibas.strings.isEmpty(c.batchCode)).length !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batchcode_is_empty"));
                return;
            }
        }
        this.close();
    }
}


/** 视图-新建批次 */
export interface IMaterialReceiptBatchView extends ibas.IBOView {
    /** 显示数据 */
    // showData(datas: batch.MaterialReceiptBatchInfo[]): void;
    showData(datas: IMaterialBatchContract[]): void;
    showJournalLineData(datas: batch.MaterialReceiptBatchJournal[]): void;
    /** 添加批次事件 */
    addBatchEvent: Function;
    /** 移除批次事件 */
    removeBatchEvent: Function;
    /** 自动创建批次事件 */
    autoCreateBatchEvent: Function;
    /** 返回数据 */
    saveDataEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialBatchJournalLineEvent: Function;
}

/** 新建批次服务映射 */
export class MaterialReceiptBatchServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialReceiptBatchService.APPLICATION_ID;
        this.name = MaterialReceiptBatchService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialReceiptBatchServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
        return new MaterialReceiptBatchService();
    }
}

export class MaterialBatchJournal implements IMaterialBatchContract {

    docType?: string;

    docEntry?: number;

    lineNum?: number;

    itemCode: string;

    warehouse: string;

    quantity: number;

    needBatchQuantity: number;

    selectedBatchQuantity: number;

    materialBatchs?: IMaterialBatchs;
}
export class MaterialReceiptBatchs implements IMaterialBatchs {

    materialLineBatchs: IMaterialBatchLine[];

    createBatchJournal(data: IMaterialBatchBaseLine): MaterialReceiptBatch {
        throw new Error("Method not implemented.");
    }

    deleteBatchJournal(data: IMaterialBatchBaseLine): MaterialReceiptBatch {
        throw new Error("Method not implemented.");
    }

    updateBatchJournal(data: IMaterialBatchBaseLine): void {
        throw new Error("Method not implemented.");
    }
}
export class MaterialReceiptBatch implements IMaterialBatchBaseLine {

    caller?: any;

    batchCode: string;

    quantity: number;
}
